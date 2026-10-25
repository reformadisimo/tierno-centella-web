import { correoConfirmacion, enviarCorreo, rpc, secreto } from '@/lib/alertas';
import { hoyMadrid } from '@/lib/hoy';

export const runtime = 'nodejs';

const texto = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

export async function POST(req: Request) {
  const s = secreto();
  if (!s) return Response.json({ ok: false, error: 'Los avisos aún no están disponibles.' }, { status: 503 });
  try {
    const d = await req.json();
    if (texto(d?.web, 50)) return Response.json({ ok: true }); // campo trampa
    const email = texto(d?.email, 200).toLowerCase();
    const nombre = texto(d?.nombre, 200);
    const ultimo = texto(d?.ultimo, 10);
    if (!d?.consentimiento) return Response.json({ ok: false, error: 'Marca la casilla para que podamos avisarte.' }, { status: 400 });
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || !nombre || !/^\d{4}-\d{2}-\d{2}$/.test(ultimo) || ultimo < hoyMadrid()) {
      return Response.json({ ok: false, error: 'Revisa el correo: no parece válido.' }, { status: 400 });
    }
    const token = await rpc<string | null>('alerta_registrar', {
      p_secreto: s, p_email: email, p_nombre: nombre, p_ultimo: ultimo, p_agosto: d?.agostoHabil !== false, p_madrid: d?.madrid !== false,
    });
    if (!token) return Response.json({ ok: false, error: 'No hemos podido guardar el aviso. Prueba más tarde o llámanos.' }, { status: 400 });
    const enviado = await enviarCorreo(email, 'Confirma tus avisos de plazo', correoConfirmacion(token, nombre, ultimo));
    return Response.json({ ok: enviado, error: enviado ? undefined : 'No hemos podido enviar el correo. Prueba más tarde.' }, { status: enviado ? 200 : 502 });
  } catch {
    return Response.json({ ok: false, error: 'Petición no válida.' }, { status: 400 });
  }
}
