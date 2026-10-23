'use client';

import { useEffect, useRef } from 'react';

// El vídeo de portada se carga cuando la página ya ha pintado lo importante, y nunca con ahorro de datos
// ni con "reducir movimiento". Así la foto de portada es lo primero que se ve y el vídeo no compite con ella.
export default function VideoPortada() {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const conexion = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    if (conexion?.saveData || /2g/.test(conexion?.effectiveType ?? '') || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const cargar = () => {
      const movil = matchMedia('(max-width: 700px)').matches;
      v.src = movil ? '/video/portada-movil.webm' : '/video/portada.webm';
      v.play().catch(() => {});
    };
    const tras = () => ('requestIdleCallback' in window ? (window as Window & { requestIdleCallback: (f: () => void) => void }).requestIdleCallback(cargar) : setTimeout(cargar, 300));
    if (document.readyState === 'complete') tras();
    else window.addEventListener('load', tras, { once: true });
  }, []);
  return <video ref={ref} muted loop playsInline preload="none" aria-hidden="true" onPlaying={(e) => e.currentTarget.classList.add('reproduciendo')} />;
}
