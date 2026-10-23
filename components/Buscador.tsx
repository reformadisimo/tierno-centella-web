'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import type { Resultado } from '@/lib/buscador';

const normal = (s: string) =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase();

// Raíz sencilla para que "despedido", "despidieron" y "despido", o "embarazada" y "embarazo", se encuentren entre sí.
const SINONIMOS: [RegExp, string][] = [
  [/^desp[ei]d/, 'despid'],
  [/^embaraz/, 'embaraz'],
  [/^acos/, 'acos'],
  [/^indemniz/, 'indemniz'],
  [/^incapacid/, 'incapacid'],
  [/^mobbing$/, 'acos'],
  [/^echa(do|da|ron|n)?$/, 'despid'],
  [/^fired$/, 'dismiss'],
  [/^sacked$/, 'dismiss'],
];
function raizDe(w: string) {
  for (const [re, r] of SINONIMOS) if (re.test(w)) return r;
  if (w.length <= 5) return w;
  return w.replace(/(aciones|iciones|ciones|cion|mente|ados|adas|idos|idas|ado|ada|ido|ida|ar|er|ir|es|s)$/, '').slice(0, Math.max(5, w.length - 3)) || w;
}

// Palabras vacías que no ayudan a buscar.
const VACIAS = new Set(
  'a al ante con de del el en la las lo los me mi mis o para por que se si sin su sus te tu un una y es como cuando cual donde qué ha han has he hemos estoy esta estan soy tengo tiene puedo puede quiero hacer hago hace muy mucho pero ya le les nos ser fue era hay algo the of to and in on for my is it at an or be do i what how can have has was am are with'.split(' '),
);

export default function Buscador({ indice, idioma = 'es' }: { indice: Resultado[]; idioma?: 'es' | 'en' }) {
  const en = idioma === 'en';
  const [q, setQ] = useState('');
  const campo = useRef<HTMLInputElement>(null);
  const preparados = useMemo(
    () => indice.map((r) => ({ r, titulo: normal(r.titulo), resumen: normal(r.resumen), texto: normal(r.texto), tipo: normal(r.tipo) })),
    [indice],
  );

  useEffect(() => {
    const inicial = new URLSearchParams(location.search).get('q') || '';
    setQ(inicial);
    campo.current?.focus();
  }, []);

  useEffect(() => {
    const t = setTimeout(() => {
      const url = new URL(location.href);
      if (q) url.searchParams.set('q', q);
      else url.searchParams.delete('q');
      history.replaceState(null, '', url);
    }, 400);
    return () => clearTimeout(t);
  }, [q]);

  const palabras = normal(q)
    .split(/[^a-z0-9ñ]+/)
    .filter((p) => p.length > 1 && !VACIAS.has(p));

  const resultados = useMemo(() => {
    if (!palabras.length) return [];
    const puntuados = preparados
      .map((p) => {
        let puntos = 0;
        let faltan = 0;
        for (const w of palabras) {
          const raiz = raizDe(w);
          if (p.titulo.includes(raiz)) puntos += 10;
          if (p.resumen.includes(raiz)) puntos += 4;
          if (p.tipo.includes(raiz)) puntos += 2;
          if (p.texto.includes(raiz)) puntos += 1;
          else if (!p.titulo.includes(raiz) && !p.resumen.includes(raiz) && !p.tipo.includes(raiz)) faltan += 1;
        }
        return { r: p.r, puntos, faltan };
      });
    // Primero, lo que contiene todas las palabras (si son muchas, se tolera que falte una).
    // Si nada las contiene todas, se enseña lo que más se parece, para no dejar a nadie con las manos vacías.
    const tolerancia = palabras.length >= 4 ? 1 : 0;
    const completos = puntuados.filter((x) => x.puntos > 0 && x.faltan <= tolerancia);
    const lista = completos.length ? completos : puntuados.filter((x) => x.puntos > 0 && x.faltan < palabras.length);
    return lista.sort((a, b) => a.faltan - b.faltan || b.puntos - a.puntos).slice(0, 30);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [palabras.join(' '), preparados]);

  const ejemplos = en
    ? ['dismissal compensation', 'harassment evidence', 'pregnancy', 'deadline', 'permanent disability']
    : ['indemnización', 'pruebas de acoso', 'embarazo', 'plazo', 'baja por ansiedad', 'finiquito'];

  return (
    <div className="buscador">
      <label className="buscador-campo">
        <span className="salta">{en ? 'Search' : 'Buscar'}</span>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
        <input
          ref={campo}
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={en ? 'What are you looking for? E.g. unfair dismissal' : '¿Qué buscas? Por ejemplo: despido improcedente'}
        />
      </label>
      {!q && (
        <div className="buscador-ejemplos">
          <span>{en ? 'Try:' : 'Prueba con:'}</span>
          {ejemplos.map((e) => (
            <button key={e} type="button" onClick={() => setQ(e)}>
              {e}
            </button>
          ))}
        </div>
      )}
      {q && palabras.length > 0 && (
        <p className="buscador-cuenta" role="status">
          {resultados.length
            ? en
              ? `${resultados.length} result${resultados.length > 1 ? 's' : ''}`
              : `${resultados.length} resultado${resultados.length > 1 ? 's' : ''}`
            : en
              ? 'Nothing found.'
              : 'No hemos encontrado nada.'}
        </p>
      )}
      <ul className="buscador-lista">
        {resultados.map(({ r }) => (
          <li key={r.href + r.titulo}>
            <Link href={r.href}>
              <small>{r.tipo}</small>
              <strong>{r.titulo}</strong>
              <span>{r.resumen}</span>
            </Link>
          </li>
        ))}
      </ul>
      {q && palabras.length > 0 && (
        <div className="buscador-chat">
          <p>{en ? "Can't find it? Ask the assistant: it knows the whole website." : '¿No lo encuentras? Pregúntaselo al asistente: conoce toda la web.'}</p>
          <button type="button" className="boton" onClick={() => window.dispatchEvent(new Event('abrir-asistente'))}>
            {en ? 'Ask the chat' : 'Preguntar al chat'}
          </button>
        </div>
      )}
    </div>
  );
}
