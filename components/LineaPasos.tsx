'use client';

// Recorrido interactivo: cada paso se abre para ver qué pasa y qué conviene hacer.
import { useState } from 'react';

export type PasoLinea = { cuando: string; titulo: string; texto: string; enlace?: { href: string; texto: string } };

export default function LineaPasos({ titulo, ayuda, pasos, etiqueta }: { titulo: string; ayuda?: string; pasos: PasoLinea[]; etiqueta: string }) {
  const [abierto, setAbierto] = useState(0);
  const p = pasos[abierto];
  return (
    <div className="linea-despido" aria-label={etiqueta}>
      <h2 className="linea-titulo">{titulo}</h2>
      <p className="linea-ayuda">{ayuda ?? 'Pulsa en cada paso para ver qué pasa y qué hacer.'}</p>
      <ol className="linea-pasos">
        {pasos.map((x, i) => (
          <li key={x.titulo}>
            <button type="button" aria-current={i === abierto ? 'step' : undefined} className={i === abierto ? 'activo' : i < abierto ? 'hecho' : ''} onClick={() => setAbierto(i)}>
              <b>{i + 1}</b>
              <span>{x.titulo}</span>
            </button>
          </li>
        ))}
      </ol>
      <div className="linea-detalle" aria-live="polite" key={abierto}>
        <small>{p.cuando}</small>
        <h3>{p.titulo}</h3>
        <p>{p.texto}</p>
        <div className="acciones">
          {abierto > 0 && <button type="button" className="boton boton-claro" onClick={() => setAbierto(abierto - 1)}>Paso anterior</button>}
          {abierto < pasos.length - 1 && <button type="button" className="boton" onClick={() => setAbierto(abierto + 1)}>Siguiente paso</button>}
          {p.enlace && <a className="boton boton-claro" href={p.enlace.href}>{p.enlace.texto}</a>}
        </div>
      </div>
    </div>
  );
}
