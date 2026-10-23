'use client';

import { useEffect } from 'react';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { leerEleccion } from './AvisoCookies';
import { medir } from '@/lib/medir';

// Medición:
// - Vercel Web Analytics y Speed Insights: sin cookies ni datos personales; visitas, páginas y velocidad real.
// - Microsoft Clarity (mapas de calor y grabaciones anónimas): solo si la persona acepta las cookies de medición
//   y si está configurado NEXT_PUBLIC_CLARITY_ID.
// - Google Tag Manager (GA4 y conversiones de Google Ads): solo con consentimiento y si está NEXT_PUBLIC_GTM_ID.
//   Conviene reutilizar el contenedor que ya usa la web antigua para no perder el historial ni las conversiones.
const CLARITY = process.env.NEXT_PUBLIC_CLARITY_ID;
const GTM = process.env.NEXT_PUBLIC_GTM_ID;

function cargarGtm() {
  if (!GTM || document.getElementById('gtm')) return;
  const w = window as unknown as { dataLayer?: unknown[] };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
  const s = document.createElement('script');
  s.id = 'gtm';
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtm.js?id=${GTM}`;
  document.head.appendChild(s);
}

// Cuenta los clics en llamar, WhatsApp y correo de toda la web, estén donde estén.
function escucharContactos(e: MouseEvent) {
  const a = (e.target as HTMLElement | null)?.closest?.('a');
  const href = a?.getAttribute('href') || '';
  const donde = a?.closest('header') ? 'cabecera' : a?.closest('footer') ? 'pie' : a?.closest('.barra-movil') ? 'barra-movil' : 'contenido';
  if (href.startsWith('tel:')) medir('llamada', { donde });
  else if (href.includes('wa.me')) medir('whatsapp', { donde });
  else if (href.startsWith('mailto:')) medir('correo', { donde });
}

function cargarClarity() {
  if (!CLARITY || document.getElementById('clarity')) return;
  const w = window as unknown as { clarity?: { (...a: unknown[]): void; q?: unknown[] } };
  w.clarity =
    w.clarity ||
    function (...a: unknown[]) {
      (w.clarity!.q = w.clarity!.q || []).push(a);
    };
  const s = document.createElement('script');
  s.id = 'clarity';
  s.async = true;
  s.src = `https://www.clarity.ms/tag/${CLARITY}`;
  document.head.appendChild(s);
}

export default function Medicion() {
  useEffect(() => {
    const revisar = () => {
      if (leerEleccion()?.analitica) {
        cargarClarity();
        cargarGtm();
      }
    };
    revisar();
    window.addEventListener('cookies-guardadas', revisar);
    document.addEventListener('click', escucharContactos, true);
    return () => {
      window.removeEventListener('cookies-guardadas', revisar);
      document.removeEventListener('click', escucharContactos, true);
    };
  }, []);
  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  );
}
