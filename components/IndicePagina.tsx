'use client';

// Índice fijo de la página: los títulos de sección, en una fila que se desliza, con el apartado actual marcado.
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

type Item = { id: string; texto: string };
const SIN_INDICE = ['/', '/en', '/guia-jesus', '/reservar', '/contacto', '/buscar'];

const quitar = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 48);

export default function IndicePagina() {
  const ruta = usePathname();
  const [items, setItems] = useState<Item[]>([]);
  const [activo, setActivo] = useState('');
  const [arriba, setArriba] = useState(64);
  const fila = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setItems([]);
    setActivo('');
    if (SIN_INDICE.some((r) => ruta === r || ruta.startsWith('/guia-jesus')) || ruta.startsWith('/herramientas') || ruta.startsWith('/en') || ruta.startsWith('/consulta/')) return;
    const t = window.setTimeout(() => {
      const hs = [...document.querySelectorAll<HTMLElement>('#contenido h2')].filter((h) => !h.closest('.cq, form, dialog, [role="dialog"], .asistente') && (h.textContent || '').trim().length > 2);
      if (hs.length < 4) return;
      const usados = new Set<string>();
      const lista: Item[] = hs.map((h, n) => {
        let id = h.id || quitar(h.textContent || '') || `seccion-${n}`;
        while (usados.has(id)) id += '-b';
        usados.add(id);
        h.id = id;
        h.style.scrollMarginTop = '140px';
        return { id, texto: (h.textContent || '').trim() };
      });
      setItems(lista);
    }, 400);
    return () => window.clearTimeout(t);
  }, [ruta]);

  useEffect(() => {
    const cab = document.querySelector<HTMLElement>('.cabecera');
    const medir = () => setArriba(cab ? Math.round(cab.getBoundingClientRect().height) : 64);
    medir();
    window.addEventListener('resize', medir);
    return () => window.removeEventListener('resize', medir);
  }, []);

  useEffect(() => {
    if (!items.length) return;
    const io = new IntersectionObserver(
      (es) => {
        const v = es.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (v) setActivo(v.target.id);
      },
      { rootMargin: '-140px 0px -60% 0px' },
    );
    items.forEach((i) => {
      const el = document.getElementById(i.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [items]);

  useEffect(() => {
    const a = fila.current?.querySelector<HTMLElement>('[aria-current="true"]');
    if (a && fila.current) fila.current.scrollTo({ left: a.offsetLeft - 24, behavior: 'smooth' });
  }, [activo]);

  if (!items.length) return null;
  return (
    <nav className="indice-pagina" aria-label="En esta página" style={{ top: arriba }}>
      <div className="indice-fila" ref={fila}>
        <span className="indice-etiqueta">En esta página</span>
        {items.map((i) => (
          <a key={i.id} href={`#${i.id}`} aria-current={activo === i.id ? 'true' : undefined}>
            {i.texto}
          </a>
        ))}
      </div>
    </nav>
  );
}
