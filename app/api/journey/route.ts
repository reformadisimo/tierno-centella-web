import { entrarEnJourney, JOURNEY_ACTIVO } from '@/lib/journey';

// Alta en el seguimiento por correo desde el aviso de salida ("te mandamos los pasos para tu caso").
export const runtime = 'nodejs';

const limpiar = (v: unknown, max = 200) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

export async function POST(req: Request) {
  let d: Record<string, unknown> = {};
  try {
    d = await req.json();
  } catch {
    return Response.json({ error: 'Petición no válida.' }, { status: 400 });
  }
  if (limpiar(d.web)) return Response.json({ ok: true });
  const email = limpiar(d.email, 160);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !d.acepto) {
    return Response.json({ error: 'Escribe un correo válido y acepta recibir los correos.' }, { status: 400 });
  }
  if (!JOURNEY_ACTIVO()) {
    return Response.json({ error: 'En esta demostración los correos aún no están activados.' }, { status: 503 });
  }
  const ok = await entrarEnJourney('guia.solicitada', { email, tema: limpiar(d.tema, 60), origen: limpiar(d.origen, 120) || 'aviso de salida' });
  return ok ? Response.json({ ok: true }) : Response.json({ error: 'No se pudo apuntar ahora mismo.' }, { status: 502 });
}
