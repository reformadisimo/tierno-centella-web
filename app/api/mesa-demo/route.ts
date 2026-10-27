import { detalleDemo } from '@/lib/mesaDemo';

/* Detalle inventado de la mesa de DEMOSTRACIÓN (páginas, búsquedas, lupa, CRM por fechas). No lee ningún dato real. */
export async function GET(req: Request) {
  const q = new URL(req.url).searchParams;
  const ok = (d: string | null) => /^\d{4}-\d{2}-\d{2}$/.test(d ?? '');
  if (!ok(q.get('desde')) || !ok(q.get('hasta'))) return Response.json({ error: 'fechas' }, { status: 400 });
  const d = detalleDemo(q.get('desde')!, q.get('hasta')!);
  return Response.json(q.get('solo') === 'crm' ? { crm: d.crm } : d, { headers: { 'Cache-Control': 'no-store' } });
}
