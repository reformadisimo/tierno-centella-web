import { SUPABASE_CRM_CLAVE, SUPABASE_CRM_URL } from '@/lib/crm';

// Reserva de consulta desde la web: queda apuntada en el CRM como "reservada" (con el día y la franja que prefiere)
// y avisa al despacho por correo si hay claves de Resend. Nunca se pierde una reserva en silencio.
export const runtime = 'nodejs';

const limpiar = (v: unknown, max = 300) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
const escapar = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const porIp = new Map<string, number[]>();

export async function POST(req: Request) {
  const ip = (req.headers.get('x-forwarded-for') ?? 'x').split(',')[0];
  const ahora = Date.now();
  const lista = (porIp.get(ip) ?? []).filter((t) => ahora - t < 600000);
  if (lista.length >= 6) return Response.json({ error: 'Demasiados intentos. Llámanos y lo vemos.' }, { status: 429 });
  porIp.set(ip, [...lista, ahora]);

  let d: Record<string, unknown>;
  try {
    d = await req.json();
  } catch {
    return Response.json({ error: 'Petición no válida.' }, { status: 400 });
  }
  if (limpiar(d.web)) return Response.json({ ok: true }); // trampa para robots
  const con = d.con === 'jesus' ? 'Jesús Tierno' : 'un abogado del despacho';
  const precio = d.con === 'jesus' ? 250 : 150;
  const modalidad = d.modalidad === 'presencial' ? 'Presencial en Jorge Juan, 78' : 'Online por videollamada';
  const nombre = limpiar(d.nombre, 120);
  const telefono = limpiar(d.telefono, 40);
  const email = limpiar(d.email, 160);
  const tema = limpiar(d.tema, 80);
  const dia = /^\d{4}-\d{2}-\d{2}$/.test(limpiar(d.dia, 10)) ? limpiar(d.dia, 10) : '';
  const franja = limpiar(d.franja, 40) || 'Cuanto antes';
  const mensaje = limpiar(d.mensaje, 1500);
  if (!nombre || !telefono || !d.acepto) return Response.json({ error: 'Faltan tu nombre, tu teléfono o aceptar la política de privacidad.' }, { status: 400 });

  // Día preferido a las 10:00 (mañana) o 17:00 (tarde) hora de Madrid, solo como referencia para el CRM.
  const hora = franja.toLowerCase().includes('tarde') ? '17:00' : '10:00';
  const consultaEn = dia ? new Date(`${dia}T${hora}:00+01:00`).toISOString() : null;
  const resumen = `RESERVA de consulta con ${con} (${precio} € + IVA). Modalidad: ${modalidad}. Prefiere: ${dia || 'cuanto antes'}, ${franja}.${mensaje ? ` Cuenta: ${mensaje}` : ''}`;

  let guardado = false;
  try {
    const r = await fetch(`${SUPABASE_CRM_URL}/rest/v1/rpc/crm_reserva`, {
      method: 'POST',
      headers: { apikey: SUPABASE_CRM_CLAVE, Authorization: `Bearer ${SUPABASE_CRM_CLAVE}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ p_nombre: nombre, p_telefono: telefono, p_email: email || null, p_tema: tema || 'Otro', p_consulta_en: consultaEn, p_mensaje: resumen, p_consentimiento: true }),
    });
    guardado = r.ok;
    if (!r.ok) console.error('Reserva: no se pudo guardar en el CRM', r.status, await r.text().catch(() => ''));
  } catch (e) {
    console.error('Reserva:', e instanceof Error ? e.message : e);
  }

  const clave = process.env.RESEND_API_KEY;
  const destino = process.env.CONTACTO_EMAIL;
  if (clave && destino) {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${clave}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: process.env.CONTACTO_REMITENTE || 'Web Tierno Centella <onboarding@resend.dev>',
        to: destino.split(',').map((s) => s.trim()),
        reply_to: email || undefined,
        subject: `Reserva de consulta: ${nombre} (${con})`,
        html: `<h2>Nueva reserva desde la web</h2><p><strong>${escapar(nombre)}</strong> · ${escapar(telefono)}${email ? ` · ${escapar(email)}` : ''}<br>${escapar(resumen)}</p>`,
      }),
    }).catch(() => null);
    if (r?.ok) return Response.json({ ok: true });
    if (r) console.error('Reserva: Resend', r.status);
  }
  if (guardado) return Response.json({ ok: true });
  return Response.json({ error: 'No hemos podido guardar la reserva. Llámanos al 913 24 97 97 o escríbenos por WhatsApp.' }, { status: 502 });
}
