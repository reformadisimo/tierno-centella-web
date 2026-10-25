import { entrarEnCrm } from './crm-entrada';

// Si alguien escribe su teléfono en el chat, el despacho lo sabe al momento: entra en el CRM y llega un correo con la conversación.
// Solo avisa la primera vez que aparece el teléfono en la conversación.
const TELEFONO = /(?<![\d])(?:\+?34[\s.-]?)?[6789](?:[\s.-]?\d){8}(?![\d])/;
const escapar = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

type Mensaje = { role: string; content: string };

export async function avisarSiDejaTelefono(mensajes: Mensaje[], pagina: string) {
  try {
    const delUsuario = mensajes.filter((m) => m.role === 'user');
    const ultimo = delUsuario[delUsuario.length - 1]?.content ?? '';
    const tel = ultimo.match(TELEFONO)?.[0];
    if (!tel) return;
    if (delUsuario.slice(0, -1).some((m) => TELEFONO.test(m.content))) return; // ya se avisó antes
    const telefono = tel.replace(/[^\d+]/g, '');
    const resumen = delUsuario.map((m) => m.content).join('\n').slice(0, 1500);
    await entrarEnCrm({ nombre: 'Persona del chat (sin nombre)', telefono, email: '', tema: resumen, origen: `Chat de la web${pagina ? ` (${pagina})` : ''}`, mensaje: resumen, chat: true });
    const clave = process.env.RESEND_API_KEY;
    const destino = process.env.CONTACTO_EMAIL;
    if (!clave || !destino) return;
    const remitente = process.env.CONTACTO_REMITENTE || 'Web Tierno Centella <onboarding@resend.dev>';
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${clave}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: remitente,
        to: destino.split(',').map((s) => s.trim()),
        subject: `Chat de la web: ha dejado su teléfono (${telefono})`,
        html: `<h2>Alguien ha dejado su teléfono en el chat</h2><p><strong>Teléfono:</strong> ${escapar(telefono)}<br><strong>Página:</strong> ${escapar(pagina || '-')}</p><p><strong>Lo que ha escrito:</strong><br>${escapar(resumen).replace(/\n/g, '<br>')}</p><p>Conviene llamarle cuanto antes: quien contesta primero se queda con la consulta.</p>`,
      }),
    });
  } catch (e) {
    console.error('Aviso del chat no enviado:', e instanceof Error ? e.message : e);
  }
}
