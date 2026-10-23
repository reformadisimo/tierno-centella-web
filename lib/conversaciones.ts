// Guarda cada conversación del chat en la base de datos del despacho (Supabase), para el seguimiento
// y para mejorar el asistente. Solo se activa si están SUPABASE_URL y SUPABASE_SERVICE_KEY; si no, no hace nada.
type Mensaje = { role: 'user' | 'assistant'; content: string };

const URL_BASE = process.env.SUPABASE_URL;
const CLAVE = process.env.SUPABASE_SERVICE_KEY;
export const conversacionesActivas = () => !!(URL_BASE && CLAVE);

const esId = (v: unknown): v is string => typeof v === 'string' && /^[0-9a-f-]{36}$/i.test(v);

async function upsert(fila: Record<string, unknown>) {
  if (!URL_BASE || !CLAVE) return;
  try {
    const r = await fetch(`${URL_BASE}/rest/v1/conversaciones?on_conflict=id`, {
      method: 'POST',
      headers: {
        apikey: CLAVE,
        Authorization: `Bearer ${CLAVE}`,
        'Content-Type': 'application/json',
        Prefer: 'resolution=merge-duplicates,return=minimal',
      },
      body: JSON.stringify(fila),
    });
    if (!r.ok) console.error('No se pudo guardar la conversación:', r.status, await r.text().catch(() => ''));
  } catch (e) {
    console.error('No se pudo guardar la conversación:', e instanceof Error ? e.message : e);
  }
}

export async function guardarConversacion(datos: { id: unknown; idioma: string; pagina?: string; mensajes: Mensaje[] }) {
  if (!esId(datos.id)) return;
  const primera = datos.mensajes.find((m) => m.role === 'user')?.content ?? '';
  await upsert({
    id: datos.id,
    actualizada: new Date().toISOString(),
    idioma: datos.idioma,
    ultima_pagina: datos.pagina?.slice(0, 300),
    ...(datos.mensajes.length <= 2 ? { pagina_inicio: datos.pagina?.slice(0, 300) } : {}),
    num_mensajes: datos.mensajes.length,
    primera_pregunta: primera.slice(0, 500),
    mensajes: datos.mensajes.map((m) => ({ role: m.role, content: m.content.slice(0, 6000) })),
  });
}

export async function marcarLlamada(datos: { id: unknown; nombre: string; telefono: string; origen?: string }) {
  if (!esId(datos.id)) return;
  await upsert({ id: datos.id, actualizada: new Date().toISOString(), pidio_llamada: true, nombre: datos.nombre.slice(0, 120), telefono: datos.telefono.slice(0, 40), origen: datos.origen?.slice(0, 300) });
}
