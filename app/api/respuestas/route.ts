// Recibe las respuestas de Jesús a la guía y las manda por correo con Resend.
// Necesita RESEND_API_KEY y RESPUESTAS_PARA (correo de destino). Sin ellas responde 503 y la guía ofrece copiar o enviar por correo.
export const runtime = 'nodejs';

const visitas = new Map<string, number[]>();

export async function POST(req: Request) {
  const clave = process.env.RESEND_API_KEY;
  const para = process.env.RESPUESTAS_PARA;
  if (!clave || !para) return Response.json({ ok: false, motivo: 'sin-configurar' }, { status: 503 });
  const ip = (req.headers.get('x-forwarded-for') ?? 'x').split(',')[0];
  const ahora = Date.now();
  const lista = (visitas.get(ip) ?? []).filter((t) => ahora - t < 3600000);
  if (lista.length >= 20) return Response.json({ ok: false }, { status: 429 });
  visitas.set(ip, [...lista, ahora]);
  let texto = '';
  try {
    texto = String((await req.json())?.texto ?? '').slice(0, 20000);
  } catch {}
  if (texto.trim().length < 5) return Response.json({ ok: false }, { status: 400 });
  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${clave}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: process.env.RESPUESTAS_DE || 'Guía Tierno Centella <onboarding@resend.dev>',
      to: [para],
      subject: 'Guía de Jesús Tierno: respuestas y comentarios',
      text: texto,
    }),
  }).catch(() => null);
  return Response.json({ ok: !!r?.ok }, { status: r?.ok ? 200 : 502 });
}
