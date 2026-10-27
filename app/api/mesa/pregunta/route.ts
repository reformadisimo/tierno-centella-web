import { mesaDemo, datosParaPreguntar } from '@/lib/mesa-tierno';

/* Pregúntale a la mesa (demostración): una pregunta en lenguaje normal y Claude contesta en dos a cuatro frases
   SOLO con los datos de la mesa de ejemplo. Nunca inventa: si el dato no está, lo dice y dice dónde mirarlo. */
export const runtime = 'nodejs';
export const maxDuration = 60;

const porIp = new Map<string, number[]>();

export async function POST(req: Request) {
  const ip = (req.headers.get('x-forwarded-for') ?? 'x').split(',')[0];
  const ahora = Date.now();
  const lista = (porIp.get(ip) ?? []).filter((t) => ahora - t < 3600000);
  if (lista.length >= 20) return Response.json({ ok: false, error: 'Demasiadas preguntas seguidas. Prueba dentro de un rato.' }, { status: 429 });
  porIp.set(ip, [...lista, ahora]);
  const b = (await req.json().catch(() => ({}))) as { pregunta?: unknown };
  const pregunta = String(b.pregunta ?? '').trim().slice(0, 500);
  if (!pregunta) return Response.json({ ok: false, error: 'Escribe una pregunta.' }, { status: 400 });
  const clave = (process.env.ANTHROPIC_API_KEY ?? '').trim();
  if (!clave) return Response.json({ ok: false, error: 'Ahora mismo no puedo contestar.' }, { status: 503 });

  const sistema = `Eres el ayudante de la mesa de control de Tierno Centella Abogados, el despacho laboralista de Jesús Tierno en Madrid. Contestas a Jesús y a su equipo, que no son técnicos de marketing.
Reglas: español, tuteo, frases cortas y claras, sin jerga (si usas una palabra técnica, explícala en tres palabras). Entre 2 y 4 frases. Sin emojis, sin guiones largos, sin listas salvo que pidan una lista.
Usa SOLO los datos que te doy. Si la respuesta no está en los datos, dilo con sencillez y di en qué parte de la mesa mirarlo (el resumen, las cinco partes de "Cómo está cada parte": La web, Reputación e IA, Competencia, Anuncios y Consultas y plazos; o "Ver todas las cifras"). Nunca inventes cifras.
Si te piden una recomendación, da una sola, concreta, y di por qué con el dato.
Si Anuncios tiene la medición incompleta, no recomiendes pausar ninguna campaña: primero hay que completar la medición.
Es un despacho de abogados: nunca prometas resultados ni sugieras publicidad que no pueda hacer un abogado. No critiques a otros despachos ni los nombres.
Son datos de demostración: si te preguntan, explica que lo público del despacho es real y el resto, de ejemplo.`;

  const datos = datosParaPreguntar(mesaDemo());
  const modelos = [process.env.ASISTENTE_MODELO || 'claude-sonnet-5-5', 'claude-sonnet-4-5'];
  for (const modelo of modelos) {
    try {
      const r = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'content-type': 'application/json', 'x-api-key': clave, 'anthropic-version': '2023-06-01' },
        body: JSON.stringify({ model: modelo, max_tokens: 500, system: sistema, messages: [{ role: 'user', content: `Datos de la mesa:\n${JSON.stringify(datos)}\n\nPregunta: ${pregunta}` }] }),
      });
      const j = (await r.json().catch(() => null)) as { content?: { type?: string; text?: string }[] } | null;
      if (r.ok && j) {
        const texto = String(j.content?.find((c) => c.type === 'text')?.text ?? '').replace(/ — /g, ', ').trim();
        return Response.json({ ok: true, texto });
      }
      console.error('[mesa-pregunta]', modelo, r.status, JSON.stringify(j).slice(0, 300));
    } catch (e) {
      console.error('[mesa-pregunta]', e instanceof Error ? e.message : e);
    }
  }
  return Response.json({ ok: false, error: 'Ahora mismo no puedo contestar. Prueba otra vez en un momento.' }, { status: 502 });
}
