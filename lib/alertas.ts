// Avisos por correo del plazo para reclamar. Solo servidor.
// Guardan el correo y la fecha límite, con confirmación por correo y enlace de baja en cada mensaje.
import { createHash } from 'crypto';
import { SUPABASE_CRM_CLAVE, SUPABASE_CRM_URL } from '@/lib/crm';
import { DESPACHO, enlaceWhatsapp, fechaLarga } from '@/lib/despacho';
import { BASE } from '@/lib/seo';

export const UMBRALES = [10, 5, 2];

// El secreto se deriva de la clave de Resend del servidor: nunca sale de aquí.
export function secreto(): string | null {
  const k = process.env.RESEND_API_KEY;
  return k ? createHash('sha256').update(`${k}:alertas-plazo`).digest('hex') : null;
}

export function urlPublica(): string {
  if (process.env.URL_PUBLICA) return process.env.URL_PUBLICA.replace(/\/$/, '');
  const v = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  return v ? `https://${v}` : BASE;
}

export async function rpc<T>(nombre: string, cuerpo: Record<string, unknown>): Promise<T | null> {
  const r = await fetch(`${SUPABASE_CRM_URL}/rest/v1/rpc/${nombre}`, {
    method: 'POST',
    headers: { apikey: SUPABASE_CRM_CLAVE, Authorization: `Bearer ${SUPABASE_CRM_CLAVE}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(cuerpo),
    cache: 'no-store',
  });
  if (!r.ok) return null;
  const t = await r.text();
  return t ? (JSON.parse(t) as T) : (null as T);
}

export async function enviarCorreo(para: string, asunto: string, html: string): Promise<boolean> {
  const clave = process.env.RESEND_API_KEY;
  if (!clave) return false;
  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${clave}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: process.env.CONTACTO_REMITENTE || 'Tierno Centella Abogados <onboarding@resend.dev>',
      to: [para],
      subject: asunto,
      html,
    }),
  });
  if (!r.ok) console.error('Resend avisos:', r.status, await r.text().catch(() => ''));
  return r.ok;
}

const escapar = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function marco(titulo: string, cuerpo: string, token: string) {
  const baja = `${urlPublica()}/aviso-plazo?e=baja&t=${token}`;
  return `<div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:0 auto;color:#1a2733;line-height:1.55">
<div style="background:#0d2c48;color:#fff;padding:18px 22px;font-size:18px;font-weight:bold">${escapar(DESPACHO.nombre)}</div>
<div style="padding:22px;border:1px solid #dfe5ea;border-top:0">
<h1 style="font-size:20px;margin:0 0 14px;color:#0d2c48">${titulo}</h1>
${cuerpo}
<p style="font-size:13px;color:#5b6875;margin-top:24px">Este cálculo es orientativo: confirma tu plazo con un abogado antes de que se agote. Solo usamos tu correo para estos avisos. <a href="${baja}" style="color:#5b6875">Darme de baja</a>.</p>
</div></div>`;
}

const contacto = () =>
  `<p>Si quieres que lo miremos contigo, llámanos al <a href="${DESPACHO.telefonoHref}">${DESPACHO.telefono}</a> o escríbenos por <a href="${enlaceWhatsapp('Hola, he recibido un aviso de mi plazo y me gustaría consultar mi caso.')}">WhatsApp</a>.</p>`;

export function correoConfirmacion(token: string, nombre: string, ultimo: string) {
  const enlace = `${urlPublica()}/api/alerta-plazo/confirmar?t=${token}`;
  return marco(
    'Confirma que quieres los avisos',
    `<p>Has pedido que te avisemos por correo de tu plazo: <strong>${escapar(nombre.toLowerCase())}</strong>, con último día aproximado el <strong>${fechaLarga(ultimo)}</strong>.</p>
<p>Para empezar, confirma que este correo es tuyo:</p>
<p><a href="${enlace}" style="display:inline-block;background:#d9694d;color:#fff;padding:12px 20px;border-radius:6px;text-decoration:none;font-weight:bold">Sí, avisadme</a></p>
<p>Te escribiremos pocas veces: cuando queden unos 10, 5 y 2 días hábiles. Si no has sido tú, ignora este mensaje y no recibirás nada más.</p>`,
    token,
  );
}

export function correoAviso(token: string, nombre: string, ultimo: string, quedan: number) {
  return marco(
    quedan <= 1 ? 'Te queda 1 día hábil' : `Te quedan ${quedan} días hábiles`,
    `<p>Recordatorio de tu plazo: <strong>${escapar(nombre.toLowerCase())}</strong>.</p>
<p>El último día aproximado es el <strong>${fechaLarga(ultimo)}</strong>.</p>
${contacto()}`,
    token,
  );
}
