// Guarda cada conversación del chat en la base de datos (Supabase), una fila por mensaje, para el seguimiento
// y para mejorar el asistente. La tabla solo admite escribir desde la web; leerla requiere acceso de administrador.
// Usa la clave publicable de Supabase, que es pública por diseño: con ella solo se puede insertar en esta tabla
// (la regla de seguridad no deja leerla). Se puede cambiar con SUPABASE_URL y SUPABASE_CLAVE_PUBLICA.
type Mensaje = { role: 'user' | 'assistant'; content: string };

const URL_BASE = process.env.SUPABASE_URL || 'https://thzntlymcsazcjrddqjm.supabase.co';
const CLAVE = process.env.SUPABASE_CLAVE_PUBLICA || 'sb_publishable_rkrwbrgbW_ebOtWTSoY_mA_LZu8SsT5';
const TABLA = 'tc_chat';

const esId = (v: unknown): v is string => typeof v === 'string' && /^[0-9a-f-]{20,40}$/i.test(v);

async function insertar(filas: Record<string, unknown>[]) {
  if (!URL_BASE || !CLAVE || !filas.length) return;
  try {
    const r = await fetch(`${URL_BASE}/rest/v1/${TABLA}`, {
      method: 'POST',
      headers: { apikey: CLAVE, Authorization: `Bearer ${CLAVE}`, 'Content-Type': 'application/json', Prefer: 'return=minimal' },
      body: JSON.stringify(filas),
    });
    if (!r.ok) console.error('No se pudo guardar la conversación:', r.status, await r.text().catch(() => ''));
  } catch (e) {
    console.error('No se pudo guardar la conversación:', e instanceof Error ? e.message : e);
  }
}

// Guarda la última pregunta y su respuesta.
export async function guardarConversacion(datos: { id: unknown; idioma: string; pagina?: string; mensajes: Mensaje[] }) {
  if (!esId(datos.id)) return;
  const ultimos = datos.mensajes.slice(-2);
  await insertar(
    ultimos.map((m) => ({ conversacion: datos.id, rol: m.role, contenido: m.content.slice(0, 8000), pagina: datos.pagina?.slice(0, 300), idioma: datos.idioma })),
  );
}

// Cuando la persona deja su teléfono en el chat.
export async function marcarLlamada(datos: { id: unknown; nombre: string; telefono: string; origen?: string }) {
  if (!esId(datos.id)) return;
  await insertar([{ conversacion: datos.id, rol: 'llamada', contenido: `Pide que le llamen. Nombre: ${datos.nombre.slice(0, 120)}. Teléfono: ${datos.telefono.slice(0, 40)}.`, pagina: datos.origen?.slice(0, 300) }]);
}
