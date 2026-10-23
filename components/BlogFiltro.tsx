'use client';

import { useState } from 'react';
import Link from 'next/link';

export type Ficha = { slug: string; titulo: string; descripcion: string; categoria: string; minutos: number; foto: { src: string; srcSet?: string; alt: string } };

const NOMBRES: Record<string, string> = { acoso: 'Acoso laboral', despido: 'Despido', incapacidad: 'Incapacidad', empresas: 'Empresas' };
const sinAcentos = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

export default function BlogFiltro({ piezas }: { piezas: Ficha[] }) {
  const [cat, setCat] = useState('');
  const [q, setQ] = useState('');
  const categorias = [...new Set(piezas.map((p) => p.categoria))];
  const busca = sinAcentos(q.trim());
  const vistas = piezas.filter((p) => (!cat || p.categoria === cat) && (!busca || sinAcentos(p.titulo + ' ' + p.descripcion).includes(busca)));
  return (
    <>
      <div className="filtros-blog">
        <input type="search" placeholder="Buscar en el blog: finiquito, baja, embarazo..." value={q} onChange={(e) => setQ(e.target.value)} aria-label="Buscar en el blog" />
        <div className="filtros-chips">
          <button type="button" className={!cat ? 'activo' : ''} onClick={() => setCat('')}>
            Todo
          </button>
          {categorias.map((c) => (
            <button key={c} type="button" className={cat === c ? 'activo' : ''} onClick={() => setCat(c)}>
              {NOMBRES[c] ?? c}
            </button>
          ))}
        </div>
      </div>
      {vistas.length === 0 && <p>No hay artículos con esa búsqueda. Prueba con otra palabra o pregunta al asistente.</p>}
      <div className="tarjetas-foto">
        {vistas.map((p, i) => (
          <Link key={p.slug} href={`/blog/${p.slug}`}>
            <img src={p.foto.src} srcSet={p.foto.srcSet} sizes="(max-width: 760px) 100vw, 380px" alt={p.foto.alt} width={640} height={480} loading={i < 3 ? 'eager' : 'lazy'} fetchPriority={i === 0 ? 'high' : 'auto'} />
            <div>
              <small className="tarjeta-meta">
                {NOMBRES[p.categoria] ?? 'Laboral'} · {p.minutos} min
              </small>
              <strong>{p.titulo}</strong>
              <span>{p.descripcion}</span>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
