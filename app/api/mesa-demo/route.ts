import { detalleDemo } from '@/lib/mesaDemo';
import { detalleVisitas } from '@/lib/visitasReales';

export const dynamic = 'force-dynamic';

/* Detalle inventado de la mesa de DEMOSTRACIÓN (páginas, búsquedas, lupa, CRM por fechas). Con base de datos, páginas más vistas, personas y orígenes salen del contador propio sin cookies (31-oct-2026). */
export async function GET(req: Request) {
  const q = new URL(req.url).searchParams;
  const ok = (d: string | null) => /^\d{4}-\d{2}-\d{2}$/.test(d ?? '');
  if (!ok(q.get('desde')) || !ok(q.get('hasta'))) return Response.json({ error: 'fechas' }, { status: 400 });
  const d = detalleDemo(q.get('desde')!, q.get('hasta')!);
  const real = q.get('solo') === 'crm' ? null : await detalleVisitas(q.get('desde')!, q.get('hasta')!);
  if (real) Object.assign(d, real);
  return Response.json(q.get('solo') === 'crm' ? { crm: d.crm } : d, { headers: { 'Cache-Control': 'no-store' } });
}
