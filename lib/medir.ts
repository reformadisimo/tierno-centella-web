'use client';

import { track } from '@vercel/analytics';

// Un solo punto para medir las acciones que importan (llamar, WhatsApp, formulario, chat).
// Va a Vercel Analytics siempre (sin cookies) y, si la persona aceptó la medición,
// también a Google Tag Manager / GA4 / Google Ads (dataLayer) y a Microsoft Clarity.
type Datos = Record<string, string | number | boolean | null>;

export function medir(evento: string, datos: Datos = {}) {
  try {
    track(evento, datos);
  } catch {}
  try {
    const w = window as unknown as { dataLayer?: unknown[]; clarity?: (...a: unknown[]) => void };
    w.dataLayer = w.dataLayer || [];
    w.dataLayer.push({ event: evento, pagina: location.pathname, ...datos });
    w.clarity?.('event', evento);
  } catch {}
}
