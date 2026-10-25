'use client';

// Ajustes de lectura para quien visita la web: tamaño de letra, letra fácil de leer, más espacio, contraste y sin movimiento.
// Se guardan solo en el navegador de la persona.
import { useEffect, useRef, useState } from 'react';

type Ajustes = { texto: 0 | 1 | 2; legible: boolean; espacio: boolean; contraste: boolean; quieto: boolean };
const BASE: Ajustes = { texto: 0, legible: false, espacio: false, contraste: false, quieto: false };
const CLAVE = 'tc-accesibilidad';

function aplicar(a: Ajustes) {
  const c = document.documentElement.classList;
  c.toggle('a11y-t1', a.texto === 1);
  c.toggle('a11y-t2', a.texto === 2);
  c.toggle('a11y-legible', a.legible);
  c.toggle('a11y-espacio', a.espacio);
  c.toggle('a11y-contraste', a.contraste);
  c.toggle('a11y-quieto', a.quieto);
}

export default function Accesibilidad({ en = false }: { en?: boolean }) {
  const [abierto, setAbierto] = useState(false);
  const [a, setA] = useState<Ajustes>(BASE);
  const caja = useRef<HTMLDivElement>(null);
  useEffect(() => {
    try {
      const g = { ...BASE, ...JSON.parse(localStorage.getItem(CLAVE) || '{}') } as Ajustes;
      setA(g);
      aplicar(g);
    } catch {}
  }, []);
  useEffect(() => {
    if (!abierto) return;
    const fuera = (e: MouseEvent) => !caja.current?.contains(e.target as Node) && setAbierto(false);
    const tecla = (e: KeyboardEvent) => e.key === 'Escape' && setAbierto(false);
    document.addEventListener('mousedown', fuera);
    document.addEventListener('keydown', tecla);
    return () => {
      document.removeEventListener('mousedown', fuera);
      document.removeEventListener('keydown', tecla);
    };
  }, [abierto]);
  function cambia(p: Partial<Ajustes>) {
    const n = { ...a, ...p };
    setA(n);
    aplicar(n);
    try {
      localStorage.setItem(CLAVE, JSON.stringify(n));
    } catch {}
  }
  const t = en
    ? { boton: 'Reading options', titulo: 'Make it easier to read', texto: 'Text size', normal: 'Normal', grande: 'Large', muygrande: 'Extra large', legible: 'Easy-to-read font', espacio: 'More spacing', contraste: 'High contrast', quieto: 'Stop animations and videos', reset: 'Reset' }
    : { boton: 'Ajustes de lectura', titulo: 'Lee más cómodo', texto: 'Tamaño del texto', normal: 'Normal', grande: 'Grande', muygrande: 'Muy grande', legible: 'Letra fácil de leer', espacio: 'Más espacio entre líneas', contraste: 'Más contraste', quieto: 'Parar animaciones y vídeos', reset: 'Volver a lo normal' };
  return (
    <div className="a11y" ref={caja}>
      <button type="button" className="a11y-boton" aria-expanded={abierto} aria-controls="a11y-panel" onClick={() => setAbierto(!abierto)}>
        <span aria-hidden="true">Aa</span>
        <span className="sr-only">{t.boton}</span>
      </button>
      {abierto && (
        <div className="a11y-panel" id="a11y-panel" role="group" aria-label={t.titulo}>
          <b>{t.titulo}</b>
          <div className="a11y-fila" role="group" aria-label={t.texto}>
            <span>{t.texto}</span>
            {([['normal', 0], ['grande', 1], ['muygrande', 2]] as const).map(([k, v]) => (
              <button key={k} type="button" aria-pressed={a.texto === v} onClick={() => cambia({ texto: v })}>
                {t[k]}
              </button>
            ))}
          </div>
          {([['legible', t.legible], ['espacio', t.espacio], ['contraste', t.contraste], ['quieto', t.quieto]] as const).map(([k, txt]) => (
            <label key={k} className="a11y-opcion">
              <input type="checkbox" checked={a[k]} onChange={(e) => cambia({ [k]: e.target.checked })} />
              <span>{txt}</span>
            </label>
          ))}
          <button type="button" className="a11y-reset" onClick={() => cambia(BASE)}>
            {t.reset}
          </button>
        </div>
      )}
    </div>
  );
}
