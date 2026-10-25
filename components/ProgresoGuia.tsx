'use client';

// Progreso de lectura de la guía: porcentaje leído, minutos que faltan y "seguir donde lo dejaste".
import { useEffect, useRef, useState } from 'react';

const CLAVE = 'gj-ultimo-apartado';
type Ultimo = { id: string; titulo: string };

export default function ProgresoGuia() {
  const [pct, setPct] = useState(0);
  const [min, setMin] = useState(0);
  const [visible, setVisible] = useState(false);
  const [retomar, setRetomar] = useState<Ultimo | null>(null);
  const ultimo = useRef<Ultimo | null>(null);

  useEffect(() => {
    try {
      const g = localStorage.getItem(CLAVE);
      if (g && !location.hash && window.scrollY < 400) {
        const u = JSON.parse(g) as Ultimo;
        if (u?.id && document.getElementById(u.id)) setRetomar(u);
      }
    } catch {}
  }, []);

  useEffect(() => {
    let raf = 0;
    let t = 0;
    const calcula = () => {
      raf = 0;
      const secs = [...document.querySelectorAll<HTMLElement>('section.gj-seccion')];
      if (!secs.length) return;
      const primera = secs[0].getBoundingClientRect().top + window.scrollY;
      const ultima = secs[secs.length - 1];
      const fin = ultima.getBoundingClientRect().bottom + window.scrollY - window.innerHeight;
      const total = Math.max(1, fin - primera + window.innerHeight * 0.5);
      const hecho = window.scrollY + window.innerHeight * 0.5 - primera;
      const p = Math.max(0, Math.min(100, Math.round((hecho / total) * 100)));
      setPct(p);
      setVisible(window.scrollY + window.innerHeight * 0.5 > primera);
      let faltan = 0;
      let actual: HTMLElement | null = null;
      for (const s of secs) {
        const r = s.getBoundingClientRect();
        if (r.top < window.innerHeight * 0.5 && r.bottom > 0) actual = s;
        if (r.top > window.innerHeight * 0.5) faltan++;
      }
      setMin(faltan);
      if (actual?.id) {
        ultimo.current = { id: actual.id, titulo: actual.querySelector('h2')?.textContent || actual.id };
        window.clearTimeout(t);
        t = window.setTimeout(() => {
          try {
            if (ultimo.current && window.scrollY > 600) localStorage.setItem(CLAVE, JSON.stringify(ultimo.current));
          } catch {}
        }, 1200);
      }
    };
    const pide = () => {
      if (!raf) raf = requestAnimationFrame(calcula);
    };
    pide();
    window.addEventListener('scroll', pide, { passive: true });
    window.addEventListener('resize', pide);
    return () => {
      window.removeEventListener('scroll', pide);
      window.removeEventListener('resize', pide);
      if (raf) cancelAnimationFrame(raf);
      window.clearTimeout(t);
    };
  }, []);

  return (
    <>
      {retomar && (
        <div className="gj-retomar" role="status">
          <span>
            ¿Seguimos donde lo dejaste? <b>{retomar.titulo}</b>
          </span>
          <button
            type="button"
            className="boton"
            onClick={() => {
              document.getElementById(retomar.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              setRetomar(null);
            }}
          >
            Seguir
          </button>
          <button type="button" className="boton boton-claro" onClick={() => setRetomar(null)}>
            Ahora no
          </button>
        </div>
      )}
      <div className={`gj-flota${visible ? ' visible' : ''}`} aria-hidden={!visible} role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct} aria-label="Lo que llevas leído de la guía">
        <span className="gj-prog-num">{pct} %</span>
        <span className="gj-prog-barra">
          <i style={{ width: `${pct}%` }} />
        </span>
        <span className="gj-prog-resto">{pct >= 98 || min === 0 ? 'Guía leída. Gracias.' : min === 1 ? 'Te queda 1 apartado' : `Te quedan ${min} apartados`}</span>
      </div>
    </>
  );
}
