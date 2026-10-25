'use client';

// Chips para ver solo las sentencias de una materia (acoso, despido, incapacidad...). Filtra las fichas por su atributo data-materia.
import { useState } from 'react';

export default function FiltroSentencias({ materias }: { materias: { nombre: string; total: number }[] }) {
  const [activa, setActiva] = useState('Todas');
  function elige(m: string) {
    setActiva(m);
    document.querySelectorAll<HTMLElement>('.fichas .ficha').forEach((f) => {
      f.hidden = m !== 'Todas' && f.dataset.materia !== m;
    });
  }
  const total = materias.reduce((a, b) => a + b.total, 0);
  return (
    <div className="filtro-sentencias" role="group" aria-label="Filtrar sentencias por materia">
      {[{ nombre: 'Todas', total }, ...materias].map((m) => (
        <button key={m.nombre} type="button" aria-pressed={activa === m.nombre} onClick={() => elige(m.nombre)}>
          {m.nombre} <small>{m.total}</small>
        </button>
      ))}
    </div>
  );
}
