'use client';

import { useMemo, useState } from 'react';
import CuestionarioGuia from './CuestionarioGuia';

export type SeccionGuia = { id: string; titulo: string; html: string; texto: string };
const normal = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

export default function GuiaJesus({ secciones }: { secciones: SeccionGuia[] }) {
  const [q, setQ] = useState('');
  const busca = normal(q.trim());
  const visibles = useMemo(
    () => (busca.length < 2 ? secciones : secciones.filter((s) => normal(s.titulo + ' ' + s.texto).includes(busca))),
    [busca, secciones],
  );
  return (
    <div className="guia-jesus">
      <aside className="gj-lateral">
        <label className="gj-buscar">
          <span>Buscar en la guía</span>
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="reseñas, blog, precio, Instagram..." />
        </label>
        {busca.length >= 2 && (
          <p className="letra-pequena" role="status">
            {visibles.length ? `${visibles.length} apartado${visibles.length > 1 ? 's' : ''} con "${q}"` : `Nada con "${q}"`}
          </p>
        )}
        <nav aria-label="Índice de la guía">
          <strong className="gj-indice-titulo">Índice</strong>
          <ol className="gj-indice">
            {visibles.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`}>{s.titulo}</a>
              </li>
            ))}
          </ol>
        </nav>
      </aside>
      <div className="gj-cuerpo">
        {visibles.map((s) => (
          <section key={s.id} id={s.id} className="gj-seccion">
            <h2>{s.titulo}</h2>
            {s.html.includes('<p>CUESTIONARIO</p>') ? (
              <>
                <div className="prosa" dangerouslySetInnerHTML={{ __html: s.html.replace('<p>CUESTIONARIO</p>', '') }} />
                <CuestionarioGuia />
              </>
            ) : (
              <div className="prosa" dangerouslySetInnerHTML={{ __html: s.html }} />
            )}
            <a className="gj-arriba" href="#indice-guia">
              Volver arriba
            </a>
          </section>
        ))}
      </div>
    </div>
  );
}
