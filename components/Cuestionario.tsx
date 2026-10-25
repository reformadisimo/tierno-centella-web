'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { DESPACHO, enlaceWhatsapp } from '@/lib/despacho';
import { BotonImprimir } from './Utiles';
import Buzon from './Buzon';

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
  const [pulsada, setPulsada] = useState('');
  const ruta = usePathname() || '';
  const [guardar, setGuardar] = useState(true);
  const enviado = useRef(false);
  // Progreso: se guarda solo en este dispositivo (localStorage), nunca se envía. Permite retomar un test dejado a medias.
  const claveProgreso = `tc-progreso:${ruta}`;
  const [retomar, setRetomar] = useState<Record<string, string[]> | null>(null);
  useEffect(() => {
    try {
      const g = localStorage.getItem(claveProgreso);
      if (g) {
        const o = JSON.parse(g) as Record<string, string[]>;
        if (o && Object.keys(o).length) setRetomar(o);
      }
    } catch {}
  }, [claveProgreso]);

  // Un paso condicional se decide en cuanto están respondidos los pasos activos anteriores (los saltados no cuentan);
  // mientras tanto se cuenta, para que el contador no prometa menos preguntas de las que habrá.
  const activos = useMemo(() => {
    const lista: Paso[] = [];
    for (const p of pasos) {
      const anterioresRespondidos = lista.every((q) => q.id in resp);
      if (!p.si || !anterioresRespondidos || p.si(resp)) lista.push(p);
    }
    return lista;
  }, [pasos, resp]);
  const terminado = indice >= activos.length;
  useEffect(() => {
    try {
      if (terminado || !Object.keys(resp).length) {
        if (terminado) localStorage.removeItem(claveProgreso);
        return;
      }
      const o: Record<string, string[]> = {};
      for (const [id, ops] of Object.entries(resp)) o[id] = ops.map((x) => x.texto);
      localStorage.setItem(claveProgreso, JSON.stringify(o));
    } catch {}
  }, [resp, terminado, claveProgreso]);
  function retomarTest(o: Record<string, string[]>) {
    const nuevas: Respuestas = {};
    for (const p of pasos) {
      const t = o[p.id];
      if (!t) continue;
      const ops = p.opciones.filter((x) => t.includes(x.texto));
      if (ops.length) nuevas[p.id] = ops;
    }
    // Continúa en el primer paso activo sin respuesta.
    const lista: Paso[] = [];
    for (const p of pasos) if (!p.si || p.si(nuevas) || p.id in nuevas) lista.push(p);
    const i = lista.findIndex((p) => !(p.id in nuevas));
    setResp(nuevas);
    setIndice(i === -1 ? Math.max(0, lista.length - 1) : i);
    setRetomar(null);
  }
  function descartarProgreso() {
    try { localStorage.removeItem(claveProgreso); } catch {}
    setRetomar(null);
  }
  const paso = activos[indice];
  // Al terminar, el veredicto se ve desde su título.
  useEffect(() => {
    if (terminado) requestAnimationFrame(() => document.getElementById('cuestionario')?.scrollIntoView({ block: 'start', behavior: 'smooth' }));
  }, [terminado]);

  function responder(opciones: Opcion[]) {
    // Al responder, se olvidan las respuestas de los pasos siguientes: si alguien vuelve atrás y cambia algo,
    // no se arrastran respuestas que ya no proceden.
    const posicion = pasos.findIndex((p) => p.id === paso.id);
    const nuevas: Respuestas = {};
    for (const p of pasos.slice(0, posicion)) if (p.id in resp) nuevas[p.id] = resp[p.id];
    nuevas[paso.id] = opciones;
    setResp(nuevas);
    setElegidas([]);
    setPulsada('');
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
    try { localStorage.removeItem(claveProgreso); } catch {}
    setResp({});
    setElegidas([]);
    setIndice(0);
  }

  const res = terminado ? resultado(resp) : null;
  // Barómetro: al terminar, y salvo que la persona lo desactive, se guarda de forma anónima el nivel del resultado y unas etiquetas generales.
  useEffect(() => {
    if (!res || !guardar || enviado.current) return;
    const herramienta = ruta.split('/').filter(Boolean).pop() || '';
    if (!['test-acoso', 'test-nulidad', 'test-extincion', 'test-baja-laboral'].includes(herramienta)) return;
    enviado.current = true;
    fetch('/api/barometro', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ herramienta, nivel: res.nivel, marcas: Array.from(marcas(resp)) }) }).catch(() => {});
  }, [res, guardar, ruta, resp]);
  function compartir() {
    const url = typeof window !== 'undefined' ? window.location.href.split('#')[0] : '';
    const texto = 'Mira esta herramienta gratuita de Tierno Centella Abogados, a mí me ha servido para entender mi situación:';
    const nav = navigator as Navigator & { share?: (d: { title?: string; text?: string; url?: string }) => Promise<void> };
    if (nav.share) nav.share({ title: 'Tierno Centella Abogados', text: texto, url }).catch(() => {});
    else window.open(`https://wa.me/?text=${encodeURIComponent(texto + ' ' + url)}`, '_blank', 'noopener');
  }

  return (
    <div className="herramienta cq" id="cuestionario">
      {!terminado && paso && (
        <>
          <div className="cq-progreso" aria-hidden="true">
            <span style={{ width: `${Math.max(4, (indice / activos.length) * 100)}%` }}>
              <i />
            </span>
          </div>
          <p className="campo-ayuda" style={{ marginTop: -8 }}>
            Pregunta {indice + 1} de {activos.length}. Sin datos personales. Si te vas, tu avance se queda guardado solo en este dispositivo.
          </p>
          {indice === 0 && retomar && Object.keys(resp).length === 0 && (
            <div className="recuadro cq-retomar" role="region" aria-label="Retomar el test">
              <p style={{ margin: 0 }}>
                <strong>Dejaste este test a medias.</strong> ¿Quieres seguir donde lo dejaste? Tu progreso solo está en este dispositivo.
              </p>
              <div className="acciones" style={{ marginTop: 8 }}>
                <button type="button" className="boton" onClick={() => retomarTest(retomar)}>Seguir donde lo dejé</button>
                <button type="button" className="boton boton-claro" onClick={descartarProgreso}>Empezar de cero</button>
              </div>
            </div>
          )}
          {indice === 0 && (
            <p className="campo-ayuda cq-barometro">
              Al terminar guardamos, sin ningún dato que te identifique, el tipo de resultado para nuestras estadísticas (<a href="/barometro">el barómetro</a>).{' '}
              <button type="button" className="boton-enlace" onClick={() => setGuardar(!guardar)} aria-pressed={!guardar}>
                {guardar ? 'No guardarlo' : 'No se guardará. Pulsa para permitirlo'}
              </button>
            </p>
          )}
          <fieldset className="pregunta-test paso" key={paso.id}>
            <legend>
              <span className="paso-pregunta">{paso.pregunta}</span>
            </legend>
            {paso.ayuda && <p className="campo-ayuda">{paso.ayuda}</p>}
            <div className="paso-opciones">
              {paso.opciones.map((o, n) =>
                paso.multiple ? (
                  <label key={o.texto} className="paso-opcion">
                    <b className="cq-letra" aria-hidden="true">{String.fromCharCode(65 + n)}</b>
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
                    className={`paso-opcion${(resp[paso.id] ?? []).some((e) => e.texto === o.texto) || pulsada === o.texto ? ' elegida' : ''}`}
                    onClick={() => {
                      if (pulsada) return;
                      setPulsada(o.texto);
                      setTimeout(() => responder([o]), 240);
                    }}
                  >
                    <b className="cq-letra" aria-hidden="true">{String.fromCharCode(65 + n)}</b>
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
          <div className={`veredicto cq-veredicto cq-${res.nivel}${res.nivel === 'alto' ? ' veredicto-alto' : ''}`}>
            <span className="cq-ola">{res.nivel === 'alto' ? 'Gracias por contarlo. No estás sola ni solo en esto.' : res.nivel === 'medio' ? 'Vamos viendo tu caso con calma.' : 'Buena noticia: esto es lo que vemos por ahora.'}</span>
            <span className="cq-sello" aria-hidden="true">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                {res.nivel === 'alto' ? <path d="M12 9v4M12 17h.01M10.3 3.9L1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" /> : res.nivel === 'medio' ? <path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 16v-4M12 8h.01" /> : <path d="M20 6L9 17l-5-5" />}
              </svg>
            </span>
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
          <ol className="cq-pasos" aria-label="Tus próximos pasos">
            <li><b>Guarda todo</b><span>Cartas, correos, mensajes y partes médicos, tal como están.</span></li>
            <li><b>Apunta tu fecha</b><span>Si hay un plazo corriendo, es lo primero que miramos.</span></li>
            <li><b>Cuéntanoslo</b><span>Llámanos o escríbenos y te decimos si tu caso necesita consulta.</span></li>
          </ol>
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
            <button type="button" className="boton boton-claro" onClick={compartir}>
              Enviarlo a una amiga
            </button>
            <BotonImprimir />
            <a className="boton boton-claro" href={DESPACHO.telefonoHref}>
              Llamar al {DESPACHO.telefono}
            </a>
            <button type="button" className="boton boton-claro" onClick={reiniciar}>
              Empezar de nuevo
            </button>
          </div>
          <p className="campo-ayuda cq-guardado">
            {guardar && ['test-acoso', 'test-nulidad', 'test-extincion', 'test-baja-laboral'].includes(ruta.split('/').filter(Boolean).pop() || '')
              ? 'Esto es lo que hemos anotado: solo el tipo de resultado y unas etiquetas generales, de forma anónima, para el barómetro. No guardamos tus respuestas ni quién eres. Lo demás se queda en tu pantalla.'
              : 'No hemos guardado nada de tu test: se queda en tu pantalla.'}
          </p>
          <Buzon titulo="¿Te ha servido? Cuéntanoslo" />
          <p className="letra-pequena">
            Resultado orientativo, no sustituye la valoración de un abogado. Si en algún momento piensas en hacerte daño, llama al 024: es
            gratuito y atiende las 24 horas.
          </p>
        </section>
      )}
    </div>
  );
}
