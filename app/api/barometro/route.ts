import { SUPABASE_CRM_CLAVE, SUPABASE_CRM_URL } from '@/lib/crm';

// Registra, sin ningún dato personal, el resultado de un test para el barómetro. No guarda IP, ni cookies, ni identificadores.
export const runtime = 'nodejs';

const TESTS = ['test-acoso', 'test-nulidad', 'test-extincion', 'test-baja-laboral'];
const NIVELES = ['alto', 'medio', 'bajo'];

export async function POST(req: Request) {
  try {
    const d = await req.json();
    if (!TESTS.includes(d?.herramienta) || !NIVELES.includes(d?.nivel)) return Response.json({ ok: false }, { status: 400 });
    const marcas = Array.isArray(d.marcas) ? d.marcas.filter((m: unknown) => typeof m === 'string' && /^[a-z0-9_-]{1,40}$/.test(m)).slice(0, 20) : [];
    await fetch(`${SUPABASE_CRM_URL}/rest/v1/rpc/barometro_registrar`, {
      method: 'POST',
      headers: { apikey: SUPABASE_CRM_CLAVE, Authorization: `Bearer ${SUPABASE_CRM_CLAVE}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ p_herramienta: d.herramienta, p_nivel: d.nivel, p_marcas: marcas }),
    });
    return Response.json({ ok: true });
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }
}
