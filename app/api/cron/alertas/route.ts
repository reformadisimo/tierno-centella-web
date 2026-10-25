import { UMBRALES, correoAviso, enviarCorreo, rpc, secreto } from '@/lib/alertas';
import { diasHabilesRestantes } from '@/lib/calculos';
import { hoyMadrid } from '@/lib/hoy';

export const runtime = 'nodejs';
export const maxDuration = 60;

type Fila = { id: string; email: string; nombre: string; ultimo: string; agosto_habil: boolean; madrid: boolean; token: string; avisos: number[] };

// Lo llama el cron diario de Vercel. Es idempotente: cada umbral se envía una sola vez por aviso.
export async function GET(req: Request) {
  const cs = process.env.CRON_SECRET;
  if (cs && req.headers.get('authorization') !== `Bearer ${cs}`) return new Response('No autorizado', { status: 401 });
  const s = secreto();
  if (!s) return Response.json({ ok: false }, { status: 503 });
  const filas = (await rpc<Fila[]>('alertas_pendientes', { p_secreto: s })) ?? [];
  const hoy = hoyMadrid();
  let enviados = 0;
  for (const f of filas) {
    const quedan = diasHabilesRestantes(hoy, f.ultimo, f.agosto_habil, f.madrid);
    if (quedan < 0) continue;
    const umbral = [...UMBRALES].reverse().find((u) => quedan <= u);
    if (umbral === undefined || f.avisos.includes(umbral)) continue;
    if (await enviarCorreo(f.email, quedan <= 1 ? 'Te queda 1 día hábil para reclamar' : `Te quedan ${quedan} días hábiles para reclamar`, correoAviso(f.token, f.nombre, f.ultimo, quedan))) {
      const nuevos = Array.from(new Set([...f.avisos, ...UMBRALES.filter((u) => u >= umbral)]));
      await rpc('alerta_marcar', { p_secreto: s, p_id: f.id, p_avisos: nuevos });
      enviados++;
    }
  }
  return Response.json({ ok: true, revisados: filas.length, enviados });
}
