import { rpc, urlPublica } from '@/lib/alertas';

export const runtime = 'nodejs';

export async function GET(req: Request) {
  const t = new URL(req.url).searchParams.get('t') ?? '';
  const ok = /^[0-9a-f-]{36}$/i.test(t) ? await rpc<boolean>('alerta_confirmar', { p_token: t }) : false;
  return Response.redirect(`${urlPublica()}/aviso-plazo?e=${ok ? 'confirmado' : 'error'}`, 303);
}
