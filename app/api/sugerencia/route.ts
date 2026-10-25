import { SUPABASE_CRM_CLAVE, SUPABASE_CRM_URL } from '@/lib/crm';

// Buzón de sugerencias: guarda el texto, la página y, si la persona quiere, una forma de contestarle. Sin IP ni cookies.
export const runtime = 'nodejs';

const limpiar = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
const escapar = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export async function POST(req: Request) {
  try {
    const d = await req.json();
    if (limpiar(d?.web, 50)) return Response.json({ ok: true }); // campo trampa
    const texto = limpiar(d?.texto, 2000);
    const pagina = limpiar(d?.pagina, 200);
    const contacto = limpiar(d?.contacto, 200);
    const valoracion = Number.isInteger(d?.valoracion) && d.valoracion >= 1 && d.valoracion <= 5 ? d.valoracion : 0;
    if (texto.length < 3) return Response.json({ ok: false }, { status: 400 });
    const r = await fetch(`${SUPABASE_CRM_URL}/rest/v1/rpc/sugerencia_registrar`, {
      method: 'POST',
      headers: { apikey: SUPABASE_CRM_CLAVE, Authorization: `Bearer ${SUPABASE_CRM_CLAVE}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ p_texto: texto, p_pagina: pagina, p_valoracion: valoracion, p_contacto: contacto }),
    });
    const clave = process.env.RESEND_API_KEY;
    const destino = process.env.CONTACTO_EMAIL;
    if (clave && destino) {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${clave}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: process.env.CONTACTO_REMITENTE || 'Web Tierno Centella <onboarding@resend.dev>',
          to: destino.split(',').map((s) => s.trim()),
          subject: `Sugerencia desde la web${valoracion ? ` (${valoracion}/5)` : ''}`,
          html: `<h2>Alguien nos ha dejado una sugerencia</h2><p><strong>Página:</strong> ${escapar(pagina || '-')}<br><strong>Valoración:</strong> ${valoracion || '-'}<br><strong>Contacto:</strong> ${escapar(contacto || '(anónima)')}</p><p>${escapar(texto).replace(/\n/g, '<br>')}</p>`,
        }),
      }).catch(() => {});
    }
    return Response.json({ ok: r.ok });
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }
}
