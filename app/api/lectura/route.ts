import { SUPABASE_CRM_CLAVE, SUPABASE_CRM_URL } from '@/lib/crm';

// La lupa de la guía: recibe, cada pocos segundos, qué apartados tiene delante cada visitante y cuánto tiempo,
// y lo guarda en la base de datos (Supabase, Europa) para verlo después en /guia-jesus/lectura.
// Solo guarda un identificador anónimo del navegador, el aparato, la ciudad aproximada y los tiempos.
export const runtime = 'nodejs';

const porIp = new Map<string, number[]>();

export async function POST(req: Request) {
  const ip = (req.headers.get('x-forwarded-for') ?? 'x').split(',')[0];
  const ahora = Date.now();
  const lista = (porIp.get(ip) ?? []).filter((t) => ahora - t < 60000);
  if (lista.length >= 90) return Response.json({ ok: false }, { status: 429 });
  porIp.set(ip, [...lista, ahora]);

  let d: Record<string, unknown>;
  try {
    d = await req.json();
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }
  const ua = req.headers.get('user-agent') ?? '';
  const so = /iPhone|iPad/.test(ua) ? 'iPhone o iPad' : /Android/.test(ua) ? 'Android' : /Mac OS X/.test(ua) ? 'Mac' : /Windows/.test(ua) ? 'Windows' : '';
  const nav = /Edg\//.test(ua) ? 'Edge' : /CriOS|Chrome\//.test(ua) ? 'Chrome' : /Firefox\//.test(ua) ? 'Firefox' : /Safari\//.test(ua) ? 'Safari' : '';
  const ciudad = decodeURIComponent(req.headers.get('x-vercel-ip-city') ?? '');
  const region = decodeURIComponent(req.headers.get('x-vercel-ip-country-region') ?? '');
  const p = {
    guia: 'jesus',
    pantalla: String(d.pantalla ?? 'guia').slice(0, 40),
    visitante: String(d.visitante ?? '').slice(0, 80),
    sesion: String(d.sesion ?? '').slice(0, 80),
    propio: Boolean(d.propio),
    dispositivo: String(d.dispositivo ?? '').slice(0, 40),
    navegador: [so, nav].filter(Boolean).join(', '),
    ciudad: ciudad ? `${ciudad}${region ? ` (${region})` : ''}` : '',
    total: Number(d.total) || 0,
    maxScroll: Math.max(0, Math.min(100, Number(d.maxScroll) || 0)),
    secciones: Array.isArray(d.secciones) ? d.secciones.slice(0, 80).map((s) => ({ id: String((s as { id?: unknown }).id ?? '').slice(0, 120), titulo: String((s as { titulo?: unknown }).titulo ?? '').slice(0, 200), segundos: Math.max(0, Math.min(600, Number((s as { segundos?: unknown }).segundos) || 0)) })) : [],
    ...(d.evento && typeof d.evento === 'object' ? { evento: { tipo: String((d.evento as { tipo?: unknown }).tipo ?? '').slice(0, 40), seccion: String((d.evento as { seccion?: unknown }).seccion ?? '').slice(0, 200), texto: String((d.evento as { texto?: unknown }).texto ?? '').slice(0, 4000) } } : {}),
  };
  if (!p.visitante || !p.sesion) return Response.json({ ok: false }, { status: 400 });
  try {
    const r = await fetch(`${SUPABASE_CRM_URL}/rest/v1/rpc/guia_lectura_entrada`, {
      method: 'POST',
      headers: { apikey: SUPABASE_CRM_CLAVE, Authorization: `Bearer ${SUPABASE_CRM_CLAVE}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ p }),
    });
    if (!r.ok) console.error('Lupa: no se pudo guardar', r.status, await r.text().catch(() => ''));
    return Response.json({ ok: r.ok }, { status: r.ok ? 200 : 502 });
  } catch (e) {
    console.error('Lupa:', e instanceof Error ? e.message : e);
    return Response.json({ ok: false }, { status: 502 });
  }
}
