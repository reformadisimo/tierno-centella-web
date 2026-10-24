import { entrarEnJourney } from '@/lib/journey';
import { marcarLlamada } from '@/lib/conversaciones';
import { entrarEnCrm } from '@/lib/crm-entrada';

// Envía la consulta del formulario por correo con Resend. Sin claves configuradas,
// responde 503 y el formulario ofrece WhatsApp: nunca se pierde un contacto en silencio.
export const runtime = 'nodejs';

const limpiar = (v: unknown, max = 2000) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
const escapar = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export async function POST(req: Request) {
  let datos: Record<string, unknown> = {};
  try {
    datos = await req.json();
  } catch {
    return Response.json({ error: 'Petición no válida.' }, { status: 400 });
  }
  if (limpiar(datos.web)) return Response.json({ ok: true }); // campo trampa para robots

  const nombre = limpiar(datos.nombre, 120);
  const telefono = limpiar(datos.telefono, 40);
  const email = limpiar(datos.email, 160);
  const tema = limpiar(datos.tema, 80);
  const mensaje = limpiar(datos.mensaje, 3000);
  const cuando = limpiar(datos.cuando, 80);
  const origen = limpiar(datos.origen, 400);
  if (!nombre || (!telefono && !email) || !datos.acepto) {
    return Response.json({ error: 'Faltan tu nombre, un teléfono o correo, o aceptar la política de privacidad.' }, { status: 400 });
  }

  // Primero, al CRM: así la consulta queda apuntada aunque el correo falle.
  const enCrm = await entrarEnCrm({ nombre, telefono, email, tema, origen, mensaje: [mensaje, cuando && `Cuándo llamar: ${cuando}`].filter(Boolean).join(' · '), chat: Boolean(datos.conversacion) });

  const clave = process.env.RESEND_API_KEY;
  const destino = process.env.CONTACTO_EMAIL;
  const remitente = process.env.CONTACTO_REMITENTE || 'Web Tierno Centella <onboarding@resend.dev>';
  if (!clave || !destino) {
    if (enCrm) return Response.json({ ok: true });
    return Response.json({ error: 'El envío por correo aún no está activado en la demo.' }, { status: 503 });
  }

  const html = `<h2>Nueva consulta desde la web</h2>
<p><strong>Nombre:</strong> ${escapar(nombre)}<br><strong>Teléfono:</strong> ${escapar(telefono || '-')}<br><strong>Correo:</strong> ${escapar(
    email || '-',
  )}<br><strong>Tema:</strong> ${escapar(tema || '-')}<br><strong>Cuándo llamar:</strong> ${escapar(cuando || '-')}<br><strong>Origen:</strong> ${escapar(origen || 'Web')}</p>
<p>${escapar(mensaje || '(sin mensaje)').replace(/\n/g, '<br>')}</p>`;

  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${clave}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: remitente,
      to: destino.split(',').map((s) => s.trim()),
      reply_to: email || undefined,
      subject: `Consulta web: ${tema || 'laboral'} - ${nombre}`,
      html,
    }),
  });
  if (!r.ok) {
    console.error('Error de Resend:', r.status, await r.text().catch(() => ''));
    if (enCrm) return Response.json({ ok: true });
    return Response.json({ error: 'No se pudo enviar ahora mismo.' }, { status: 502 });
  }
  // Si viene del chat, la conversación guardada queda marcada como "pidió llamada", con su nombre y teléfono.
  if (datos.conversacion) await marcarLlamada({ id: datos.conversacion, nombre, telefono, origen });
  // Si dejó su correo y aceptó el seguimiento, entra en el journey de su tema.
  if (email && datos.seguimiento) await entrarEnJourney('consulta.web', { email, nombre, tema, origen });
  return Response.json({ ok: true });
}
