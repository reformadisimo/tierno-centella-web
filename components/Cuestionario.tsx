'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { DESPACHO, enlaceWhatsapp } from '@/lib/despacho';

export type Opcion = { texto: string; ayuda?: string; valor?: number; marca?: string };
export type Paso = {
  id: string;
  pregunta: string;
  ayuda?: string;
  opciones: Opcion[];
  multiple?: boolean;
  // Si devuelve false, el paso se salta.
  si?: (r: Respuestas) => boolean;
};
export type Respuestas = Record<string, Opcion[]>;
export type Resultado = {
  nivel: 'alto' | 'medio' | 'bajo';
  titulo: string;
  texto: string;
  puntos?: string[];
  aviso?: string;
  enlaces?: { href: string; texto: string }[];
  whatsapp: string;
};

// Utilidades para que cada test calcule su resultado con claridad.
export const marcas = (r: Respuestas) => new Set(Object.values(r).flat().map((o) => o.marca).filter(Boolean) as string[]);
export const suma = (r: Respuestas) => Object.values(r).flat().reduce((t, o) => t + (o.valor ?? 0), 0);
export const texto = (r: Respuestas, id: string) => (r[id] ?? []).map((o) => o.texto).join(', ');

export default function Cuestionario({ pasos, resultado }: { pasos: Paso[]; resultado: (r: Respuestas) => Resultado }) {
  const [resp, setResp] = useState<Respuestas>({});
  const [indice, setIndice] = useState(0);
  const [elegidas, setElegidas] = useState<Opcion[]>([]);

  // Un paso condicional solo se descarta cuando ya están respondidos todos los anteriores;
  // así el contador no promete menos preguntas de las que habrá.
  const activos = useMemo(
    () => pasos.filter((p, i) => !p.si || !pasos.slice(0, i).every((q) => q.id in resp) || p.si(resp)),
    [pasos, resp],
  );
  const terminado = indice >= activos.length;
  const paso = activos[indice];

  function responder(opciones: Opcion[]) {
    const nuevas = { ...resp, [paso.id]: opciones };
    setResp(nuevas);
    setElegidas([]);
    setIndice((i) => i + 1);
    requestAnimationFrame(() => document.getElementById('cuestionario')?.scrollIntoView({ block: 'nearest', behavior: 'smooth' }));
  }

  function atras() {
    if (indice === 0) return;
    const anterior = activos[indice - 1];
    setElegidas(resp[anterior.id] ?? []);
    setIndice((i) => i - 1);
  }

  function reiniciar() {
    setResp({});
    setElegidas([]);
    setIndice(0);
  }

  const res = terminado ? resultado(resp) : null;

  return (
    <div className="herramienta" id="cuestionario">
      {!terminado && paso && (
        <>
          <div className="progreso" aria-hidden="true">
            <span style={{ width: `${(indice / activos.length) * 100}%` }} />
          </div>
          <p className="campo-ayuda" style={{ marginTop: -8 }}>
            Pregunta {indice + 1} de {activos.length}. Sin datos personales.
          </p>
          <fieldset className="pregunta-test paso" key={paso.id}>
            <legend>
              <span className="paso-pregunta">{paso.pregunta}</span>
            </legend>
            {paso.ayuda && <p className="campo-ayuda">{paso.ayuda}</p>}
            <div className="paso-opciones">
              {paso.opciones.map((o) =>
                paso.multiple ? (
                  <label key={o.texto} className="paso-opcion">
                    <input
                      type="checkbox"
                      checked={elegidas.some((e) => e.texto === o.texto)}
                      onChange={() =>
                        setElegidas((x) => (x.some((e) => e.texto === o.texto) ? x.filter((e) => e.texto !== o.texto) : [...x, o]))
                      }
                    />
                    <span>
                      {o.texto}
                      {o.ayuda && <small>{o.ayuda}</small>}
                    </span>
                  </label>
                ) : (
                  <button
                    key={o.texto}
                    type="button"
                    className={`paso-opcion${(resp[paso.id] ?? []).some((e) => e.texto === o.texto) ? ' elegida' : ''}`}
                    onClick={() => responder([o])}
                  >
                    <span>
                      {o.texto}
                      {o.ayuda && <small>{o.ayuda}</small>}
                    </span>
                  </button>
                ),
              )}
            </div>
          </fieldset>
          <div className="acciones" style={{ marginTop: 8 }}>
            {indice > 0 && (
              <button type="button" className="boton boton-claro" onClick={atras}>
                Volver
              </button>
            )}
            {paso.multiple && (
              <button type="button" className="boton" onClick={() => responder(elegidas)}>
                {elegidas.length ? 'Siguiente' : 'Ninguna de estas'}
              </button>
            )}
          </div>
        </>
      )}

      {res && (
        <section aria-live="polite">
          <div className={`veredicto${res.nivel === 'alto' ? ' veredicto-alto' : ''}`}>
            <h3>{res.titulo}</h3>
            <p style={{ margin: 0 }}>{res.texto}</p>
          </div>
          {res.puntos && res.puntos.length > 0 && (
            <ul className="prosa">
              {res.puntos.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          )}
          {res.aviso && <p className="recuadro">{res.aviso}</p>}
          {res.enlaces && res.enlaces.length > 0 && (
            <>
              <h3 style={{ margin: '20px 0 8px', fontSize: '1.1rem' }}>Para seguir</h3>
              <ul className="prosa">
                {res.enlaces.map((e) => (
                  <li key={e.href}>
                    <Link href={e.href}>{e.texto}</Link>
                  </li>
                ))}
              </ul>
            </>
          )}
          <div className="acciones">
            <a className="boton" href={enlaceWhatsapp(res.whatsapp)}>
              Enviar mi resultado por WhatsApp
            </a>
            <a className="boton boton-claro" href={DESPACHO.telefonoHref}>
              Llamar al {DESPACHO.telefono}
            </a>
            <button type="button" className="boton boton-claro" onClick={reiniciar}>
              Empezar de nuevo
            </button>
          </div>
          <p className="letra-pequena">
            Resultado orientativo, no sustituye la valoración de un abogado. Si en algún momento piensas en hacerte daño, llama al 024: es
            gratuito y atiende las 24 horas.
          </p>
        </section>
      )}
    </div>
  );
}
