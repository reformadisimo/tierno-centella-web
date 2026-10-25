'use client';

// Barra fina bajo la cabecera que se llena al leer la página.
import { useEffect, useRef } from 'react';

export default function ProgresoLectura() {
  const barra = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let raf = 0;
    const pinta = () => {
      raf = 0;
      const h = document.documentElement;
      const total = h.scrollHeight - h.clientHeight;
      const r = total > 0 ? Math.min(1, Math.max(0, window.scrollY / total)) : 0;
      if (barra.current) barra.current.style.transform = `scaleX(${r})`;
    };
    const pide = () => {
      if (!raf) raf = requestAnimationFrame(pinta);
    };
    pinta();
    window.addEventListener('scroll', pide, { passive: true });
    window.addEventListener('resize', pide);
    return () => {
      window.removeEventListener('scroll', pide);
      window.removeEventListener('resize', pide);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <div className="progreso-lectura" aria-hidden="true">
      <div ref={barra} />
    </div>
  );
}
