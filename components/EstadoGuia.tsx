'use client';

// Estado de la guía de Jesús (3-nov-2026, como la guía de Javi en AMS): «Lo que te toca a ti», «Lo último», los dos botones
// flotantes y el aviso corto al entrar salen de public/estado-guia.json, para ponerlos al día sin tocar la página.
// Lo que ya ha visto cada persona se guarda en su navegador (localStorage), nunca en la web.
// Clases propias (tg-…, gnav, gni, gnt) para que ningún script ni estilo de la guía las toque.

import { useEffect, useState } from 'react';

export type TareaGuia = { t: string; prio?: string; u?: string; b?: string; u2?: string; b2?: string; hecho?: boolean };
export type EstadoGuia = {
  version?: string;
  fecha?: string;
  aviso?: string;
  enlace?: string;
  popup?: { etiqueta?: string; titulo: string; intro?: string; items: { t: string; h: string }[] } | null;
  ultimo?: { f: string; t: string; u?: string }[];
  tareas?: TareaGuia[];
};

let promesa: Promise<EstadoGuia | null> | null = null;
function cargar() {
  promesa ??= fetch(`/estado-guia.json?t=${Date.now()}`, { cache: 'no-store' })
    .then((r) => (r.ok ? (r.json() as Promise<EstadoGuia>) : null))
    .catch(() => null);
  return promesa;
}
/** undefined mientras carga; null si no se pudo leer. */
export function useEstadoGuia() {
  const [e, setE] = useState<EstadoGuia | null | undefined>(undefined);
  useEffect(() => {
    let vivo = true;
    cargar().then((d) => vivo && setE(d));
    return () => {
      vivo = false;
    };
  }, []);
  return e;
}

export function irATareas() {
  const el = document.getElementById('tareas');
  if (!el) return;
  history.replaceState(null, '', '#tareas');
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

const COLOR_PRIO: Record<string, string> = { Hoy: 'tg-p-hoy', 'Muy importante': 'tg-p-muy', Importante: 'tg-p-imp', 'En diciembre': 'tg-p-luego' };
const fuera = (u: string) => !u.startsWith('#');

function Boton({ u, b }: { u: string; b: string }) {
  return (
    <a className="tg-boton" href={u} {...(fuera(u) ? { target: '_blank', rel: 'noopener' } : {})}>
      {b}
    </a>
  );
}

function Tarea({ x, n }: { x: TareaGuia; n: number }) {
  return (
    <li className={`tg-tarea${x.hecho ? ' tg-hecha' : ''}`}>
      <span className="tg-num" aria-hidden="true">
        {x.hecho ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12l5 5 9-10" />
          </svg>
        ) : (
          n
        )}
      </span>
      <div>
        {x.hecho ? <span className="tg-prio tg-p-hecha">Hecho</span> : x.prio ? <span className={`tg-prio ${COLOR_PRIO[x.prio] ?? 'tg-p-imp'}`}>{x.prio}</span> : null}
        <p>{x.t}</p>
        {!x.hecho && (x.u || x.u2) && (
          <div className="tg-botones">
            {x.u && x.b && <Boton u={x.u} b={x.b} />}
            {x.u2 && x.b2 && <Boton u={x.u2} b={x.b2} />}
          </div>
        )}
      </div>
    </li>
  );
}

/** «Lo que te toca a ti: tus tareas pendientes». Solo tres a la vista; el resto, plegado. */
export function TareasGuia() {
  const e = useEstadoGuia();
  const [mas, setMas] = useState(false);
  const todas = e?.tareas ?? [];
  const pendientes = todas.filter((x) => !x.hecho);
  const hechas = todas.filter((x) => x.hecho);
  const resto = pendientes.length - 3;
  if (e === null || (e && !todas.length)) return null;
  return (
    <section className="tg-caja" id="tareas" aria-labelledby="tg-titulo">
      <h2 id="tg-titulo">Lo que te toca a ti: tus tareas pendientes</h2>
      {e === undefined ? (
        <p className="tg-entradilla">Cargando…</p>
      ) : pendientes.length ? (
        <>
          <p className="tg-entradilla">Empieza por estas tres, son rápidas. Lo demás lo hacemos nosotros. Cuando hagas una, cuéntanoslo y la tachamos.</p>
          <ol className="tg-lista">
            {pendientes.slice(0, 3).map((x, i) => (
              <Tarea key={x.t} x={x} n={i + 1} />
            ))}
          </ol>
        </>
      ) : (
        <p className="tg-entradilla">Ahora mismo no tienes nada pendiente. Lo demás lo hacemos nosotros.</p>
      )}
      {(resto > 0 || hechas.length > 0) && (
        <>
          {mas && (
            <ol className="tg-lista tg-resto" start={4}>
              {pendientes.slice(3).map((x, i) => (
                <Tarea key={x.t} x={x} n={i + 4} />
              ))}
              {hechas.map((x) => (
                <Tarea key={x.t} x={x} n={0} />
              ))}
            </ol>
          )}
          <button type="button" className="tg-mas" aria-expanded={mas} onClick={() => setMas((v) => !v)}>
            {mas ? 'Ocultar las demás' : resto > 0 ? `Ver las demás (${resto}), sin prisa` : 'Ver las que ya has hecho'}
          </button>
        </>
      )}
    </section>
  );
}

/** «Lo último»: novedades con fecha, la más reciente arriba, como mucho seis. */
export function LoUltimo() {
  const e = useEstadoGuia();
  const lista = (e?.ultimo ?? []).slice(0, 6);
  if (!lista.length) return null;
  return (
    <section className="tg-ultimo" aria-labelledby="tg-ultimo-titulo">
      <h2 id="tg-ultimo-titulo">Lo último</h2>
      <ul>
        {lista.map((x) => (
          <li key={x.f + x.t}>
            <span className="tg-fecha">{x.f}</span>
            {x.u ? (
              <a href={x.u} {...(fuera(x.u) ? { target: '_blank', rel: 'noopener' } : {})}>
                {x.t}
              </a>
            ) : (
              <span>{x.t}</span>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

/** Dos botones flotantes al bajar 500 px: «Volver al inicio» y «Tus tareas pendientes». Sin número de tareas. */
export function AtajosGuia() {
  const e = useEstadoGuia();
  const [on, setOn] = useState(false);
  const [pulso, setPulso] = useState(false);
  const [izq, setIzq] = useState<number | null>(null);
  const hay = (e?.tareas ?? []).some((x) => !x.hecho);
  useEffect(() => {
    const mira = () => {
      setOn(window.scrollY > 500);
      // En ordenador, a la derecha del índice lateral para no taparlo.
      const lat = document.getElementById('gj-indice');
      setIzq(window.innerWidth >= 1000 && lat ? Math.round(lat.getBoundingClientRect().right + 24) : null);
    };
    mira();
    window.addEventListener('scroll', mira, { passive: true });
    window.addEventListener('resize', mira);
    return () => {
      window.removeEventListener('scroll', mira);
      window.removeEventListener('resize', mira);
    };
  }, []);
  // Late tres veces la primera vez que aparece, si hay tareas sin hacer.
  useEffect(() => {
    if (on && hay && !pulso) setPulso(true);
  }, [on, hay, pulso]);
  useEffect(() => {
    document.body.classList.toggle('gnav-on', on);
    return () => document.body.classList.remove('gnav-on');
  }, [on]);
  return (
    <nav className={`gnav${on ? ' on' : ''}`} aria-label="Atajos de la guía" aria-hidden={!on} style={izq !== null ? { left: izq } : undefined}>
      <a
        className="gni"
        href="#"
        tabIndex={on ? 0 : -1}
        onClick={(ev) => {
          ev.preventDefault();
          history.replaceState(null, '', location.pathname + location.search);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M3 11l9-8 9 8" />
          <path d="M5 10v10h14V10" />
        </svg>
        Volver al inicio
      </a>
      <a
        className={`gnt${pulso ? ' pulso' : ''}`}
        href="#tareas"
        tabIndex={on ? 0 : -1}
        onClick={(ev) => {
          ev.preventDefault();
          irATareas();
        }}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M9 11l3 3 8-8" />
          <path d="M20 12v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h9" />
        </svg>
        Tus tareas pendientes
      </a>
    </nav>
  );
}

/** Aviso corto de una frase al entrar, una vez por versión del estado. No sale si ya hay una ventana abierta. */
export function AvisoEstado({ bloqueado }: { bloqueado: boolean }) {
  const e = useEstadoGuia();
  const [ver, setVer] = useState(false);
  const v = e?.version ?? '';
  useEffect(() => {
    if (!e?.aviso || !v || bloqueado) return;
    let visto = '';
    try {
      visto = localStorage.getItem('tc-est-aviso') || '';
    } catch {}
    if (visto === v) return;
    const t = setTimeout(() => setVer(true), 1200);
    return () => clearTimeout(t);
  }, [e, v, bloqueado]);
  if (!ver || !e?.aviso) return null;
  const cerrar = () => {
    try {
      localStorage.setItem('tc-est-aviso', v);
    } catch {}
    setVer(false);
  };
  return (
    <div className="tg-aviso" role="status">
      <p>{e.aviso}</p>
      <a
        href={e.enlace || '#tareas'}
        onClick={(ev) => {
          cerrar();
          if ((e.enlace || '#tareas') === '#tareas') {
            ev.preventDefault();
            irATareas();
          }
        }}
      >
        Verlo
      </a>
      <button type="button" onClick={cerrar} aria-label="Cerrar el aviso">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" aria-hidden="true">
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>
    </div>
  );
}
