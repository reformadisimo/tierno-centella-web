// Seguimiento por correo (journey) con Resend Automations.
// La web solo avisa a Resend de que alguien ha entrado en el journey (un "evento" con su correo y su tema);
// los correos, sus textos y los días de espera se configuran una vez en la automatización de Resend.
// Apagado hasta que el despacho conecte su dominio: JOURNEY_ACTIVO=1 lo enciende.
export type Entrada = { email: string; nombre?: string; tema?: string; origen?: string };

export const JOURNEY_ACTIVO = () => process.env.JOURNEY_ACTIVO === '1' && !!process.env.RESEND_API_KEY;

// Temas normalizados para que cada persona reciba la secuencia de su caso.
export function temaJourney(t = ''): 'despido' | 'acoso' | 'incapacidad' | 'mujer' | 'empresa' | 'general' {
  const x = t.toLowerCase();
  if (x.includes('despid')) return 'despido';
  if (x.includes('acoso')) return 'acoso';
  if (x.includes('incapacidad') || x.includes('baja')) return 'incapacidad';
  if (x.includes('embaraz') || x.includes('concilia') || x.includes('mujer')) return 'mujer';
  if (x.includes('empresa')) return 'empresa';
  return 'general';
}

export async function entrarEnJourney(evento: 'consulta.web' | 'guia.solicitada', e: Entrada): Promise<boolean> {
  if (!JOURNEY_ACTIVO() || !e.email) return false;
  const r = await fetch('https://api.resend.com/events/send', {
    method: 'POST',
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      event: evento,
      email: e.email,
      payload: { nombre: (e.nombre || '').split(' ')[0], tema: temaJourney(e.tema), origen: e.origen || 'web' },
    }),
  }).catch(() => null);
  return !!r?.ok;
}
