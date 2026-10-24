// Cada consulta de la web entra sola en el CRM del despacho (Supabase, servidores en Europa).
// Usa la clave publicable: con ella solo se puede llamar a la función de entrada, nunca leer el CRM.
import { SUPABASE_CRM_CLAVE, SUPABASE_CRM_URL } from '@/lib/crm';

function tema(t: string) {
  const s = t.toLowerCase();
  if (s.includes('despid')) return 'Despido';
  if (s.includes('acoso') || s.includes('mobbing')) return 'Acoso laboral';
  if (s.includes('incapacidad') || s.includes('baja')) return 'Incapacidad';
  if (s.includes('embaraz') || s.includes('mujer') || s.includes('concilia') || s.includes('jornada') || s.includes('lactancia')) return 'Mujer y trabajo';
  if (s.includes('dinero') || s.includes('deben') || s.includes('cantidad') || s.includes('nómina')) return 'Reclamación de cantidad';
  if (s.includes('empresa') || s.includes('colegio')) return 'Empresa';
  return 'Otro';
}

function origen(o: string, chat: boolean) {
  const s = o.toLowerCase();
  if (s.includes('google ads')) return 'Google Ads';
  if (s.includes('chatgpt') || s.includes('perplexity') || s.includes('openai')) return 'ChatGPT u otra IA';
  if (s.includes('bing')) return 'Bing';
  if (s.includes('instagram')) return 'Instagram';
  if (s.includes('facebook')) return 'Facebook';
  if (s.includes('linkedin')) return 'LinkedIn';
  if (s.includes('tiktok')) return 'TikTok';
  if (chat || s.startsWith('chat')) return 'Chat de la web';
  return 'Formulario de la web';
}

export async function entrarEnCrm(d: { nombre: string; telefono: string; email: string; tema: string; origen: string; mensaje: string; chat: boolean; herramienta?: string }) {
  try {
    const r = await fetch(`${SUPABASE_CRM_URL}/rest/v1/rpc/crm_entrada`, {
      method: 'POST',
      headers: { apikey: SUPABASE_CRM_CLAVE, Authorization: `Bearer ${SUPABASE_CRM_CLAVE}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        p_nombre: d.nombre,
        p_telefono: d.telefono || null,
        p_email: d.email || null,
        p_tema: tema(d.tema || d.mensaje),
        p_origen: origen(d.origen, d.chat),
        p_detalle: d.origen || null,
        p_herramienta: d.herramienta || null,
        p_mensaje: [d.tema && `Tema: ${d.tema}`, d.mensaje].filter(Boolean).join('. '),
        p_consentimiento: true,
      }),
    });
    if (!r.ok) console.error('CRM: no se pudo guardar la consulta', r.status, await r.text().catch(() => ''));
    return r.ok;
  } catch (e) {
    console.error('CRM: no se pudo guardar la consulta', e instanceof Error ? e.message : e);
    return false;
  }
}
