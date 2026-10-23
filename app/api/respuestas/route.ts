// Avisos de la guía de Jesús, por correo a Ignacio con Resend. Tres tipos, cada uno con su asunto:
// visita a la guía, reacción a un apartado y respuestas del cuestionario.
// Necesita RESEND_API_KEY y RESPUESTAS_PARA. Sin ellas responde 503 y la guía ofrece copiar o enviar por correo.
export const runtime = 'nodejs';

const GUIA = 'https://tierno-centella-web.vercel.app/guia-jesus';
const visitas = new Map<string, number[]>();
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function caja(titulo: string, cuerpo: string, enlace: string) {
  return (
    `<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.5;color:#0d2c48;max-width:640px">` +
    `<h2 style="font-size:19px;margin:0 0 12px">${titulo}</h2>${cuerpo}` +
    `<p style="margin:22px 0 0"><a href="${enlace}" style="background:#003a5f;color:#fff;padding:10px 16px;border-radius:6px;text-decoration:none">Abrir la guía</a></p>` +
    `<p style="color:#5c6f82;font-size:12px;margin-top:22px">Aviso automático de la guía de Tierno Centella.</p></div>`
  );
}

type Aviso = { tipo: 'visita' | 'reaccion' | 'comentario' | 'respuestas'; dispositivo?: string; seccion?: string; id?: string; reaccion?: string; texto?: string };

function preparar(a: Aviso) {
  const hora = new Intl.DateTimeFormat('es-ES', { dateStyle: 'short', timeStyle: 'short', timeZone: 'Europe/Madrid' }).format(new Date());
  if (a.tipo === 'visita') {
    return {
      asunto: `Tierno Centella: Jesús ha abierto la guía (${a.dispositivo ?? 'dispositivo'}, ${hora})`,
      html: caja(
        'Jesús ha abierto la guía',
        `<p>Desde el <b>${esc(a.dispositivo ?? '')}</b>, el ${hora}.</p><p style="color:#3b5168">Avisa una vez cada 4 horas por dispositivo. Si has sido tú, abre la guía una vez con <b>?yo=1</b> al final de la dirección en ese navegador y no volverá a avisarte.</p>`,
        GUIA,
      ),
      texto: `Jesús ha abierto la guía (${a.dispositivo}), ${hora}.`,
    };
  }
  if (a.tipo === 'reaccion') {
    return {
      asunto: `Tierno Centella: Jesús dice "${a.reaccion}" en "${a.seccion}"`,
      html: caja('Jesús ha reaccionado a un apartado', `<p style="font-size:17px"><b>${esc(a.reaccion ?? '')}</b></p><p>Apartado: ${esc(a.seccion ?? '')}</p>`, `${GUIA}#${a.id ?? ''}`),
      texto: `Jesús dice "${a.reaccion}" en "${a.seccion}".`,
    };
  }
  if (a.tipo === 'comentario') {
    return {
      asunto: `Tierno Centella: Jesús ha escrito en "${a.seccion}"`,
      html: caja(
        'Comentario de Jesús',
        `<p>Apartado: <b>${esc(a.seccion ?? '')}</b>${a.reaccion ? ` (había marcado: ${esc(a.reaccion)})` : ''}</p><p style="font-size:16px;background:#f5ede4;border-left:4px solid #d9694d;padding:12px 14px;white-space:pre-wrap">${esc(a.texto ?? '')}</p>`,
        `${GUIA}#${a.id ?? ''}`,
      ),
      texto: `Jesús ha escrito en "${a.seccion}": ${a.texto}`,
    };
  }
  const t = (a.texto ?? '').trim();
  const bloques = t.split(/\n\s*\n/).slice(1);
  const vacias = bloques.filter((b) => b.includes('(sin respuesta)')).length;
  const cuerpo = bloques
    .map((b) => {
      const [p, ...r] = b.split('\n');
      const resp = r.join(' ').trim();
      const sin = resp.includes('(sin respuesta)');
      return `<p style="margin:0 0 12px"><b>${esc(p)}</b><br><span style="color:${sin ? '#9aa7b2' : '#0d2c48'}">${esc(sin ? 'Sin contestar' : resp)}</span></p>`;
    })
    .join('');
  return {
    asunto: `Tierno Centella: respuestas de Jesús al cuestionario (${bloques.length - vacias} de ${bloques.length} contestadas)`,
    html: caja('Respuestas de Jesús', cuerpo, `${GUIA}#24-preguntas-para-ti`),
    texto: t,
  };
}

export async function POST(req: Request) {
  const clave = process.env.RESEND_API_KEY;
  const para = process.env.RESPUESTAS_PARA;
  if (!clave || !para) return Response.json({ ok: false, motivo: 'sin-configurar' }, { status: 503 });
  const ip = (req.headers.get('x-forwarded-for') ?? 'x').split(',')[0];
  const ahora = Date.now();
  const lista = (visitas.get(ip) ?? []).filter((t) => ahora - t < 3600000);
  if (lista.length >= 30) return Response.json({ ok: false }, { status: 429 });
  visitas.set(ip, [...lista, ahora]);
  let aviso: Aviso;
  try {
    const cuerpo = await req.json();
    aviso = { ...cuerpo, tipo: ['visita', 'reaccion', 'comentario'].includes(cuerpo?.tipo) ? cuerpo.tipo : 'respuestas' };
    for (const k of ['dispositivo', 'seccion', 'id', 'reaccion', 'texto'] as const) if (aviso[k] != null) aviso[k] = String(aviso[k]).slice(0, k === 'texto' ? 20000 : 200);
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }
  if (['respuestas', 'comentario'].includes(aviso.tipo) && (aviso.texto ?? '').trim().length < 2) return Response.json({ ok: false }, { status: 400 });
  const { asunto, html, texto } = preparar(aviso);
  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${clave}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: process.env.RESPUESTAS_DE || 'Guía de Jesús (Tierno Centella) <guia@send.miestela.app>',
      to: [para],
      subject: asunto,
      html,
      text: texto,
    }),
  }).catch(() => null);
  return Response.json({ ok: !!r?.ok }, { status: r?.ok ? 200 : 502 });
}
