import { rpc } from '@/lib/alertas';

// Seguimiento opcional por tema (28-oct-2026): quien quiere, deja su correo para que le acompañemos en su tema.
// De momento solo se guarda; los correos saldrán cuando el dominio de envío esté listo.
export const runtime = 'nodejs';
const TEMAS = ['incapacidad', 'despido', 'acoso', 'mujer', 'baja', 'sanciones', 'cantidad', 'empresas', 'general'];
const texto = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

export async function POST(req: Request) {
  try {
    const d = await req.json();
    if (texto(d?.web, 50)) return Response.json({ ok: true }); // campo trampa
    const email = texto(d?.email, 200).toLowerCase();
    const tema = TEMAS.includes(d?.tema) ? d.tema : 'general';
    if (!d?.consentimiento) return Response.json({ ok: false, error: 'Marca la casilla para que podamos escribirte.' }, { status: 400 });
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return Response.json({ ok: false, error: 'Revisa el correo: no parece válido.' }, { status: 400 });
    const ok = await rpc<boolean>('tc_seguimiento_registrar', { p_email: email, p_tema: tema, p_pagina: texto(d?.pagina, 200) });
    return Response.json({ ok: !!ok, error: ok ? undefined : 'No hemos podido guardarlo. Prueba más tarde o llámanos.' }, { status: ok ? 200 : 502 });
  } catch {
    return Response.json({ ok: false, error: 'Petición no válida.' }, { status: 400 });
  }
}
