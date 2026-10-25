import { rpc } from '@/lib/alertas';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const { t } = await req.json();
    const ok = typeof t === 'string' && /^[0-9a-f-]{36}$/i.test(t) ? await rpc<boolean>('alerta_baja', { p_token: t }) : false;
    return Response.json({ ok: Boolean(ok) });
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }
}
