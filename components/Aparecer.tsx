'use client';

// Las tarjetas que están más abajo aparecen con un fundido suave al llegar a ellas. Sin JavaScript o con movimiento reducido, se ven siempre.
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const OBJETIVOS = '.pasando-tarjeta, .herr-tarjetas > li, .tarjetas-foto > a, .hitos > li, .equipo-valores > li, .rejilla-guias > a, .ficha, .tarjeta, .tarjeta-situacion, .paso, .cifra, .rejilla-herramientas > a, .sentencia, .faq-item, .pasos-numerados > li';

export default function Aparecer() {
  const ruta = usePathname();
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
    const alto = window.innerHeight;
    const io = new IntersectionObserver(
      (es) => {
        for (const e of es) {
          if (e.isIntersecting) {
            e.target.classList.remove('ap-oculto');
            e.target.classList.add('ap-visto');
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px' },
    );
    let i = 0;
    document.querySelectorAll<HTMLElement>(OBJETIVOS).forEach((el) => {
      if (el.getBoundingClientRect().top < alto) return;
      el.style.setProperty('--ap-retraso', `${(i++ % 4) * 70}ms`);
      el.classList.add('ap-oculto');
      io.observe(el);
    });
    return () => io.disconnect();
  }, [ruta]);
  return null;
}
