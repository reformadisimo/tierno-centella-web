'use client';

// Las tarjetas que están más abajo aparecen con un fundido suave al llegar a ellas. Sin JavaScript o con movimiento reducido, se ven siempre.
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const OBJETIVOS = '.lp-situacion, .equipo-retratos > li, .cifras-oro > li, .rejilla-reels > *, .galeria figure, .lista-enlaces li, .rejilla-guias > a, .pasando-tarjeta, .herr-tarjetas > li, .tarjetas-foto > a, .hitos > li, .equipo-valores > li, .rejilla-guias > a, .ficha, .tarjeta, .tarjeta-situacion, .paso, .cifra, .rejilla-herramientas > a, .sentencia, .faq-item, .pasos-numerados > li, .pc-pasos > li, .pc-precio, .pc-no > li, .tr-tarjeta, .faq-tema .pregunta-faq, .faq-lateral, .lateral-caja, .prosa > p, .prosa > ul, .prosa > ol, .prosa > h3, .prosa > blockquote, .prosa > table, .prosa > aside, .prosa > div, .prosa > details, .recuadro, .acciones, .formas-contacto > *, .bloque-foto > *, .linea-pasos > *, .linea-tiempo > li, .resultado, .herramienta';
const FOTOS = '.prosa-foto, .guia-foto, .foto-viva, .galeria-foto, figure:not(.faq-foto)';
const TITULOS = 'main h2';

export default function Aparecer() {
  const ruta = usePathname();
  // Idioma del documento según la sección (la versión inglesa vive bajo /en).
  useEffect(() => {
    document.documentElement.lang = ruta === '/en' || ruta?.startsWith('/en/') ? 'en' : 'es';
  }, [ruta]);
  // Los carruseles con scroll horizontal se pueden recorrer también con el teclado.
  useEffect(() => {
    document.querySelectorAll<HTMLElement>('.pasando, .herr-tarjetas, .tarjetas-foto, .hitos, .cifras-oro, .equipo-valores, .rejilla-reels, .equipo-retratos, .linea-pasos').forEach((el) => {
      if (el.scrollWidth > el.clientWidth + 2 && !el.hasAttribute('tabindex')) el.tabIndex = 0;
    });
  }, [ruta]);
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
    const marcar = (sel: string, extra: string) => {
      document.querySelectorAll<HTMLElement>(sel).forEach((el) => {
        if (el.classList.contains('ap-oculto') || el.classList.contains('ap-visto')) return;
        if (el.parentElement?.closest('.ap-oculto, .ap-visto')) return;
        if (el.closest('header, nav, .chat-ventana, .sx-ventana, [role="dialog"]')) return;
        if (el.getBoundingClientRect().top < alto) return;
        el.style.setProperty('--ap-retraso', `${(i++ % 4) * 70}ms`);
        el.classList.add('ap-oculto');
        if (extra) el.classList.add(extra);
        io.observe(el);
      });
    };
    marcar(TITULOS, 'ap-titulo');
    marcar(FOTOS, 'ap-foto');
    marcar(OBJETIVOS, '');
    return () => io.disconnect();
  }, [ruta]);
  return null;
}
