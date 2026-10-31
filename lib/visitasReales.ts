import { asegurarTablas, hayBaseDeDatos, sql } from '@/lib/db';

/* Visitas REALES de la web de Tierno Centella para la mesa (31-oct-2026), con la misma forma y las mismas consultas
   que la mesa real de Casiopea (lib/mesaReal.ts allí). Salen del contador propio sin cookies (tablas vistas y tiempos).
   El resto de la mesa sigue con cifras de ejemplo hasta tener los accesos de Analytics, Search Console y anuncios. */

/** Origen guardado a los nombres de canal que usa la mesa. */
export function canalMesa(f: string | null | undefined): string {
  const v = (f ?? '').toLowerCase();
  if (v === 'google-ads') return 'Google Ads';
  if (v === 'meta') return 'Meta / Instagram';
  if (v === 'chatgpt') return 'ChatGPT Ads';
  if (!v || v === 'directo' || /tiernocentella|tierno-centella-web/.test(v)) return 'Directo o sin dato';
  if (/google\.|^google$|bing\.|^bing$|duckduckgo|yahoo|ecosia/.test(v)) return 'Google (búsqueda)';
  if (/chatgpt\.com|openai|perplexity|gemini|claude\.ai|copilot/.test(v)) return 'Asistentes de IA';
  if (/instagram|facebook|^fb$|^ig$|tiktok|linkedin|youtube/.test(v)) return 'Redes sin pagar';
  return 'Referidos y otras webs';
}

const hoyMadrid = () => new Date().toLocaleDateString('sv-SE', { timeZone: 'Europe/Madrid' });
const suma = (s: string, n: number) => { const d = new Date(`${s}T12:00:00Z`); d.setUTCDate(d.getUTCDate() + n); return d.toISOString().slice(0, 10); };

export type DiaVisitas = { vistas: number; entradas: number; personas: number; segundos: number };

/** Serie diaria del contador y su primer día. Sin base de datos, null (la mesa sigue entera de ejemplo). */
export async function serieVisitas(): Promise<{ dias: Record<string, DiaVisitas>; inicio: string; hoy: string } | null> {
  if (!hayBaseDeDatos()) return null;
  try {
    await asegurarTablas();
    const q = sql();
    const hoy = hoyMadrid();
    const desde = suma(hoy, -400);
    const [vistas, tiempos, primero] = await Promise.all([
      q`SELECT to_char((creado AT TIME ZONE 'Europe/Madrid')::date, 'YYYY-MM-DD') AS dia, count(*)::int AS n,
               count(*) FILTER (WHERE entrada)::int AS e, count(*) FILTER (WHERE nuevo)::int AS u
        FROM vistas WHERE (creado AT TIME ZONE 'Europe/Madrid')::date >= ${desde}::date GROUP BY 1`,
      q`SELECT to_char((creado AT TIME ZONE 'Europe/Madrid')::date, 'YYYY-MM-DD') AS dia, sum(segundos)::int AS s
        FROM tiempos WHERE (creado AT TIME ZONE 'Europe/Madrid')::date >= ${desde}::date GROUP BY 1`,
      q`SELECT to_char(min(creado AT TIME ZONE 'Europe/Madrid')::date, 'YYYY-MM-DD') AS d FROM vistas`,
    ]);
    const dias: Record<string, DiaVisitas> = {};
    const dia = (d: string) => (dias[d] ??= { vistas: 0, entradas: 0, personas: 0, segundos: 0 });
    for (const r of vistas) { const w = dia(String(r.dia)); w.vistas = Number(r.n); w.entradas = Number(r.e); w.personas = Number(r.u); }
    for (const r of tiempos) dia(String(r.dia)).segundos = Number(r.s ?? 0);
    return { dias, inicio: String(primero[0]?.d ?? '') || hoy, hoy };
  } catch (e) {
    console.error('[visitas] no leídas:', e);
    return null;
  }
}

/** Detalle de un periodo: páginas más vistas, personas y de dónde vienen (con tiempo y rebote). */
export async function detalleVisitas(desde: string, hasta: string) {
  if (!hayBaseDeDatos()) return null;
  try {
    await asegurarTablas();
    const q = sql();
    const [pags, ori, pers, tf] = await Promise.all([
      q`SELECT pagina, count(*)::int AS n, count(*) FILTER (WHERE disp = 'movil')::int AS movil FROM vistas
        WHERE (creado AT TIME ZONE 'Europe/Madrid')::date BETWEEN ${desde}::date AND ${hasta}::date
        GROUP BY pagina ORDER BY n DESC LIMIT 30`,
      q`SELECT fuente, disp, count(*)::int AS n, count(*) FILTER (WHERE entrada)::int AS e, count(*) FILTER (WHERE nuevo)::int AS u FROM vistas
        WHERE (creado AT TIME ZONE 'Europe/Madrid')::date BETWEEN ${desde}::date AND ${hasta}::date GROUP BY fuente, disp`,
      q`SELECT count(*) FILTER (WHERE nuevo)::int AS u FROM vistas WHERE (creado AT TIME ZONE 'Europe/Madrid')::date BETWEEN ${desde}::date AND ${hasta}::date`,
      q`SELECT fuente, sum(segundos)::int AS s, count(*) FILTER (WHERE rebote)::int AS r FROM tiempos
        WHERE (creado AT TIME ZONE 'Europe/Madrid')::date BETWEEN ${desde}::date AND ${hasta}::date GROUP BY fuente`,
    ]);
    const seg: Record<string, number> = {}, reb: Record<string, number> = {};
    for (const r of tf) { const k = canalMesa(r.fuente); seg[k] = (seg[k] ?? 0) + Number(r.s ?? 0); reb[k] = (reb[k] ?? 0) + Number(r.r ?? 0); }
    const o: Record<string, { n: number; movil: number; visitas: number; personas: number }> = {};
    for (const r of ori) {
      const k = canalMesa(r.fuente);
      const x = (o[k] ??= { n: 0, movil: 0, visitas: 0, personas: 0 });
      x.n += Number(r.n); x.visitas += Number(r.e); x.personas += Number(r.u);
      if (r.disp === 'movil') x.movil += Number(r.n);
    }
    return {
      paginas: pags.map((r) => ({ pagina: String(r.pagina), n: Number(r.n), movil: Number(r.movil) })),
      personas: Number(pers[0]?.u ?? 0),
      origenes: Object.entries(o).map(([origen, x]) => ({ origen, ...x, segundos: seg[origen] ?? 0, rebotes: reb[origen] ?? 0 })).sort((a, b) => b.n - a.n),
    };
  } catch (e) {
    console.error('[visitas] detalle no leído:', e);
    return null;
  }
}
