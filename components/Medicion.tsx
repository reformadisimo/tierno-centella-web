'use client';

import { useEffect } from 'react';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { leerEleccion } from './AvisoCookies';

// Medición:
// - Vercel Web Analytics y Speed Insights: sin cookies ni datos personales; visitas, páginas y velocidad real.
// - Microsoft Clarity (mapas de calor y grabaciones anónimas): solo si la persona acepta las cookies de medición
//   y si está configurado NEXT_PUBLIC_CLARITY_ID.
const CLARITY = process.env.NEXT_PUBLIC_CLARITY_ID;

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
      if (leerEleccion()?.analitica) cargarClarity();
    };
    revisar();
    window.addEventListener('cookies-guardadas', revisar);
    return () => window.removeEventListener('cookies-guardadas', revisar);
  }, []);
  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  );
}
