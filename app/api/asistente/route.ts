import Anthropic from '@anthropic-ai/sdk';
import { promptAsistente } from '@/lib/prompt-asistente';

export const runtime = 'nodejs';
export const maxDuration = 60;

type Mensaje = { role: 'user' | 'assistant'; content: string };

// Límite sencillo por IP y por instancia: 30 mensajes cada 10 minutos.
const usos = new Map<string, number[]>();
function permitido(ip: string) {
  const ahora = Date.now();
  const lista = (usos.get(ip) ?? []).filter((t) => ahora - t < 10 * 60 * 1000);
  if (lista.length >= 30) return false;
  lista.push(ahora);
  usos.set(ip, lista);
  return true;
}

export async function POST(req: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json({ error: 'El asistente aún no está configurado en este servidor.' }, { status: 503 });
  }
  const ip = (req.headers.get('x-forwarded-for') ?? 'anonimo').split(',')[0].trim();
  if (!permitido(ip)) {
    return Response.json({ error: 'Has enviado muchos mensajes seguidos. Espera unos minutos o llámanos.' }, { status: 429 });
  }

  let mensajes: Mensaje[] = [];
  try {
    const cuerpo = await req.json();
    mensajes = Array.isArray(cuerpo?.mensajes) ? cuerpo.mensajes : [];
  } catch {
    return Response.json({ error: 'Petición no válida.' }, { status: 400 });
  }
  mensajes = mensajes
    .filter((m) => (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string' && m.content.trim())
    .slice(-20)
    .map((m) => ({ role: m.role, content: m.content.slice(0, 4000) }));
  if (!mensajes.length || mensajes[mensajes.length - 1].role !== 'user') {
    return Response.json({ error: 'Falta tu mensaje.' }, { status: 400 });
  }
  while (mensajes[0]?.role === 'assistant') mensajes.shift();

  const hoy = new Intl.DateTimeFormat('es-ES', { dateStyle: 'full', timeZone: 'Europe/Madrid' }).format(new Date());
  const cliente = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  const codificador = new TextEncoder();
  const flujo = new ReadableStream({
    async start(controlador) {
      try {
        const stream = cliente.messages.stream({
          model: process.env.ASISTENTE_MODELO || 'claude-sonnet-4-5',
          max_tokens: 1500,
          system: promptAsistente(hoy),
          messages: mensajes,
        });
        for await (const evento of stream) {
          if (evento.type === 'content_block_delta' && evento.delta.type === 'text_delta') {
            controlador.enqueue(codificador.encode(evento.delta.text));
          }
        }
      } catch (e) {
        console.error('Error del asistente:', e instanceof Error ? e.message : e);
        controlador.enqueue(
          codificador.encode('\n\nAhora mismo no puedo responder. Llámanos al 913 24 97 97 o escríbenos por WhatsApp al 608 13 93 37.'),
        );
      } finally {
        controlador.close();
      }
    },
  });

  return new Response(flujo, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store', 'X-Accel-Buffering': 'no' },
  });
}
