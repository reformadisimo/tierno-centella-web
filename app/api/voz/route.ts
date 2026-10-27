// Voz del asistente con ElevenLabs (la misma integración que la de Reformadísimo).
// Es un extra opcional con coste por uso: solo funciona si en Vercel está ELEVENLABS_API_KEY.
// Sin la clave, GET /api/voz?estado=1 dice que no está disponible y el chat no enseña el botón.
// VOZ_ID permite cambiar de voz sin tocar código (por defecto, la misma que Clara).
export const runtime = 'nodejs';

const VOZ_ID = process.env.VOZ_ID || 'RN21UDW82pAS9bWvJkGP';
const MODELO = 'eleven_flash_v2_5'; // baja latencia, habla español e inglés
const LIMITE = 1500; // caracteres por audio
const POR_HORA = 60; // audios por hora y conexión
const TOPE_DIA = Number(process.env.VOZ_TOPE_DIARIO) > 0 ? Number(process.env.VOZ_TOPE_DIARIO) : 100000; // caracteres al día

const porIp = new Map<string, number[]>();
let dia = '';
let usadosHoy = 0;

export async function GET(req: Request) {
  const url = new URL(req.url);
  const clave = process.env.ELEVENLABS_API_KEY;
  if (url.searchParams.get('estado')) return Response.json({ disponible: !!clave }, { headers: { 'Cache-Control': 'no-store' } });
  if (!clave) return Response.json({ error: 'Voz no configurada' }, { status: 503 });

  // Solo desde nuestra propia web
  const origen = req.headers.get('referer') || req.headers.get('origin') || '';
  const host = req.headers.get('host') || '';
  if (origen && host && !origen.includes(host)) return Response.json({ error: 'No permitido' }, { status: 403 });

  const texto = (url.searchParams.get('text') || '').trim().slice(0, LIMITE);
  if (!texto) return Response.json({ error: 'Falta el texto' }, { status: 400 });

  const ip = (req.headers.get('x-forwarded-for') ?? 'x').split(',')[0];
  const ahora = Date.now();
  const lista = (porIp.get(ip) ?? []).filter((t) => ahora - t < 3600000);
  if (lista.length >= POR_HORA) return Response.json({ error: 'Demasiados audios seguidos' }, { status: 429 });
  porIp.set(ip, [...lista, ahora]);
  const hoy = new Intl.DateTimeFormat('es-ES', { timeZone: 'Europe/Madrid' }).format(new Date());
  if (hoy !== dia) {
    dia = hoy;
    usadosHoy = 0;
  }
  if (usadosHoy + texto.length > TOPE_DIA) return Response.json({ error: 'Tope diario de voz alcanzado' }, { status: 429 });
  usadosHoy += texto.length;

  try {
    const r = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOZ_ID}/stream`, {
      method: 'POST',
      headers: { 'xi-api-key': clave, 'Content-Type': 'application/json', Accept: 'audio/mpeg' },
      body: JSON.stringify({
        text: texto,
        model_id: MODELO,
        voice_settings: { stability: 0.5, similarity_boost: 0.75, style: 0, use_speaker_boost: true, speed: 1.05 },
      }),
    });
    if (!r.ok || !r.body) {
      console.error('Voz: ElevenLabs respondió', r.status, await r.text().catch(() => ''));
      return Response.json({ error: 'No se pudo generar el audio' }, { status: 502 });
    }
    return new Response(r.body, { headers: { 'Content-Type': 'audio/mpeg', 'Cache-Control': 'no-store' } });
  } catch (e) {
    console.error('Voz:', e instanceof Error ? e.message : e);
    return Response.json({ error: 'Error generando la voz' }, { status: 500 });
  }
}
