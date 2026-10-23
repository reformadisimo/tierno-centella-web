'use client';

import { useState } from 'react';
import Link from 'next/link';
import { DESPACHO, enlaceWhatsapp } from '@/lib/despacho';
import { BotonImprimir } from './Utiles';

type Pregunta = { id: string; texto: string; ayuda?: string; fallo: string; peso: 'grave' | 'revisar'; solo?: 'objetivo' | 'disciplinario' };

const PREGUNTAS: Pregunta[] = [
  { id: 'escrita', texto: '¿Te dieron la carta por escrito?', fallo: 'Un despido sin carta escrita es, como mínimo, improcedente.', peso: 'grave' },
  { id: 'fecha', texto: '¿La carta dice la fecha desde la que tiene efecto el despido?', fallo: 'La carta debe fijar la fecha de efectos. Si falta, es un defecto de forma.', peso: 'grave' },
  {
    id: 'hechos',
    texto: '¿Explica hechos concretos, con fechas, y no solo frases generales?',
    ayuda: 'Por ejemplo "bajo rendimiento" sin datos es una frase general.',
    fallo: 'Una carta genérica no permite defenderse. Los jueces suelen declarar improcedente el despido cuando la carta no concreta los hechos.',
    peso: 'grave',
  },
  {
    id: 'audiencia',
    texto: '¿Te dieron la oportunidad de explicarte antes de despedirte?',
    ayuda: 'Desde el 18 de noviembre de 2024 el despido disciplinario exige esta audiencia previa.',
    fallo: 'Sin audiencia previa, el Supremo considera que el despido disciplinario es improcedente.',
    peso: 'grave',
    solo: 'disciplinario',
  },
  {
    id: 'indemnizacion',
    texto: '¿Te pagaron la indemnización de 20 días por año el mismo día de la carta?',
    fallo: 'En el despido objetivo, no poner la indemnización a tu disposición a la vez que la carta lo hace improcedente, salvo que la carta justifique falta de liquidez.',
    peso: 'grave',
    solo: 'objetivo',
  },
  {
    id: 'cantidad',
    texto: '¿El importe de la indemnización es correcto?',
    ayuda: 'Compruébalo con nuestra calculadora.',
    fallo: 'Si la indemnización es menor de lo que toca y no es un error excusable, el despido objetivo puede ser improcedente.',
    peso: 'revisar',
    solo: 'objetivo',
  },
  {
    id: 'preaviso',
    texto: '¿Te avisaron con 15 días de antelación, o te pagaron esos días?',
    fallo: 'La falta de preaviso no anula el despido, pero te deben esos 15 días de salario.',
    peso: 'revisar',
    solo: 'objetivo',
  },
  {
    id: 'causa',
    texto: '¿La carta explica la causa económica, técnica, organizativa o de producción con datos?',
    fallo: 'Si la causa no se concreta ni se acredita con datos, el despido objetivo puede ser improcedente.',
    peso: 'grave',
    solo: 'objetivo',
  },
];

const PROTEGIDAS = [
  'Embarazo, o haber tenido un hijo hace menos de 12 meses',
  'Reducción de jornada o permiso por cuidado de hijos o familiares',
  'Había reclamado o denunciado a la empresa poco antes',
  'Estaba de baja médica',
  'Soy representante de los trabajadores',
];

export default function RevisaCarta() {
  const [tipo, setTipo] = useState<'objetivo' | 'disciplinario'>('disciplinario');
  const [resp, setResp] = useState<Record<string, boolean>>({});
  const [protegidas, setProtegidas] = useState<string[]>([]);

  const visibles = PREGUNTAS.filter((p) => !p.solo || p.solo === tipo);
  const contestadas = visibles.filter((p) => p.id in resp).length;
  const fallos = visibles.filter((p) => resp[p.id] === false);
  const graves = fallos.filter((p) => p.peso === 'grave');

  const resumen = `Hola, he revisado mi carta de despido ${tipo} con la herramienta de la web. Posibles defectos: ${
    fallos.map((f) => f.texto.replace(/[¿?]/g, '')).join('; ') || 'ninguno marcado'
  }.${protegidas.length ? ` Situación protegida: ${protegidas.join(', ')}.` : ''} Quiero que la revise un abogado.`;

  return (
    <div className="herramienta">
      <fieldset className="pregunta-test">
        <legend>¿Qué tipo de despido es, según la carta?</legend>
        <div className="escala">
          {(['disciplinario', 'objetivo'] as const).map((t) => (
            <label key={t}>
              <input type="radio" name="tipo" checked={tipo === t} onChange={() => setTipo(t)} />
              {t === 'disciplinario' ? 'Disciplinario' : 'Objetivo'}
            </label>
          ))}
        </div>
      </fieldset>

      {visibles.map((p) => (
        <fieldset className="pregunta-test" key={p.id}>
          <legend>{p.texto}</legend>
          {p.ayuda && (
            <p className="campo-ayuda" style={{ marginTop: -4 }}>
              {p.ayuda} {p.id === 'cantidad' && <Link href="/calculadora-indemnizacion">Abrir la calculadora</Link>}
            </p>
          )}
          <div className="escala">
            {[
              { v: true, t: 'Sí' },
              { v: false, t: 'No' },
            ].map((o) => (
              <label key={o.t}>
                <input type="radio" name={p.id} checked={resp[p.id] === o.v} onChange={() => setResp((r) => ({ ...r, [p.id]: o.v }))} />
                {o.t}
              </label>
            ))}
          </div>
        </fieldset>
      ))}

      <fieldset className="pregunta-test">
        <legend>¿Estabas en alguna de estas situaciones?</legend>
        <div className="casillas">
          {PROTEGIDAS.map((s) => (
            <label key={s} className="casilla">
              <input
                type="checkbox"
                checked={protegidas.includes(s)}
                onChange={() => setProtegidas((x) => (x.includes(s) ? x.filter((y) => y !== s) : [...x, s]))}
              />
              <span>{s}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {contestadas === visibles.length && (
        <section className="resultado" aria-live="polite">
          {graves.length > 0 ? (
            <div className="veredicto veredicto-alto">
              <h3>
                Tu carta tiene {graves.length === 1 ? 'un defecto que puede' : `${graves.length} defectos que pueden`} hacer el despido
                improcedente
              </h3>
            </div>
          ) : fallos.length > 0 ? (
            <div className="veredicto">
              <h3>Hay puntos que conviene revisar</h3>
            </div>
          ) : (
            <div className="veredicto">
              <h3>En la forma no vemos fallos claros</h3>
              <p>Eso no significa que el despido sea justo: lo importante es si la empresa puede probar lo que dice.</p>
            </div>
          )}
          {fallos.length > 0 && (
            <ul className="prosa">
              {fallos.map((f) => (
                <li key={f.id}>{f.fallo}</li>
              ))}
            </ul>
          )}
          {protegidas.length > 0 && (
            <div className="alerta-nulidad">
              <p>
                <strong>Además, tu despido podría ser nulo.</strong> Has marcado una situación especialmente protegida. Si se declara nulo, la
                empresa tiene que readmitirte y pagarte los salarios que dejaste de cobrar.
              </p>
            </div>
          )}
          <div className="acciones">
            <a className="boton" href={enlaceWhatsapp(resumen)}>
              Mandar la carta a un abogado por WhatsApp
            </a>
            <BotonImprimir />
            <a className="boton boton-claro" href={DESPACHO.telefonoHref}>
              Llamar al {DESPACHO.telefono}
            </a>
          </div>
          <p className="letra-pequena">
            Orientativo. Recuerda que tienes 20 días hábiles para reclamar: <Link href="/herramientas/plazos">calcula tu plazo</Link>.
          </p>
        </section>
      )}
    </div>
  );
}
