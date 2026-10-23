'use client';

import { useState } from 'react';
import Link from 'next/link';
import { DESPACHO, enlaceWhatsapp } from '@/lib/despacho';
import { useIrAlResultado } from '../Utiles';
import { BotonImprimirEn } from './UtilesEn';

type Pregunta = { id: string; texto: string; ayuda?: string; fallo: string; peso: 'grave' | 'revisar'; solo?: 'objetivo' | 'disciplinario' };

const PREGUNTAS: Pregunta[] = [
  { id: 'escrita', texto: 'Were you given the letter in writing?', fallo: 'A dismissal without a written letter is, at the very least, unfair (improcedente).', peso: 'grave' },
  {
    id: 'fecha',
    texto: 'Does the letter state the date from which the dismissal takes effect?',
    fallo: 'The letter must set the effective date. If it is missing, it is a formal defect.',
    peso: 'grave',
  },
  {
    id: 'hechos',
    texto: 'Does it explain specific facts, with dates, and not just general phrases?',
    ayuda: 'For example, "poor performance" without any data is a general phrase.',
    fallo: 'A generic letter does not allow you to defend yourself. Judges usually declare the dismissal unfair when the letter does not specify the facts.',
    peso: 'grave',
  },
  {
    id: 'audiencia',
    texto: 'Were you given the chance to explain yourself before being dismissed?',
    ayuda: 'Since 18 November 2024, a disciplinary dismissal requires this prior hearing (audiencia previa).',
    fallo: 'Without a prior hearing, the Supreme Court considers the disciplinary dismissal unfair.',
    peso: 'grave',
    solo: 'disciplinario',
  },
  {
    id: 'indemnizacion',
    texto: 'Were you paid the compensation of 20 days per year on the same day as the letter?',
    fallo:
      'In an objective dismissal, failing to make the compensation available to you at the same time as the letter makes it unfair, unless the letter justifies a lack of liquidity.',
    peso: 'grave',
    solo: 'objetivo',
  },
  {
    id: 'cantidad',
    texto: 'Is the amount of compensation correct?',
    ayuda: 'Check it with our calculator.',
    fallo: 'If the compensation is lower than it should be and it is not an excusable error, the objective dismissal can be unfair.',
    peso: 'revisar',
    solo: 'objetivo',
  },
  {
    id: 'preaviso',
    texto: 'Were you given 15 days’ notice, or paid for those days?',
    fallo: 'Lack of notice does not cancel the dismissal, but you are owed those 15 days of salary.',
    peso: 'revisar',
    solo: 'objetivo',
  },
  {
    id: 'causa',
    texto: 'Does the letter explain the economic, technical, organisational or production reason with data?',
    fallo: 'If the reason is not specified and backed up with data, the objective dismissal can be unfair.',
    peso: 'grave',
    solo: 'objetivo',
  },
];

const PROTEGIDAS = [
  'Pregnancy, or having had a child less than 12 months ago',
  'Reduced hours or leave to care for children or relatives',
  'I had made a claim or complaint against the company shortly before',
  'I was on sick leave',
  'I am a workers’ representative',
];

const NOMBRE_TIPO: Record<'objetivo' | 'disciplinario', string> = { disciplinario: 'disciplinary', objetivo: 'objective' };

function IrAlResultado({ activo }: { activo: boolean }) {
  useIrAlResultado(activo ? 'si' : '');
  return null;
}

export default function RevisaCartaEn() {
  const [tipo, setTipo] = useState<'objetivo' | 'disciplinario'>('disciplinario');
  const [resp, setResp] = useState<Record<string, boolean>>({});
  const [protegidas, setProtegidas] = useState<string[]>([]);

  const visibles = PREGUNTAS.filter((p) => !p.solo || p.solo === tipo);
  const contestadas = visibles.filter((p) => p.id in resp).length;
  const fallos = visibles.filter((p) => resp[p.id] === false);
  const graves = fallos.filter((p) => p.peso === 'grave');

  const resumen = `Hello, I have checked my ${NOMBRE_TIPO[tipo]} dismissal letter with the tool on your website. Possible defects: ${
    fallos.map((f) => f.texto.replace(/[¿?]/g, '')).join('; ') || 'none ticked'
  }.${protegidas.length ? ` Protected situation: ${protegidas.join(', ')}.` : ''} I would like a lawyer to review it.`;

  return (
    <div className="herramienta">
      <fieldset className="pregunta-test">
        <legend>What type of dismissal is it, according to the letter?</legend>
        <div className="escala">
          {(['disciplinario', 'objetivo'] as const).map((t) => (
            <label key={t}>
              <input type="radio" name="tipo" checked={tipo === t} onChange={() => setTipo(t)} />
              {t === 'disciplinario' ? 'Disciplinary' : 'Objective'}
            </label>
          ))}
        </div>
      </fieldset>

      {visibles.map((p) => (
        <fieldset className="pregunta-test" key={p.id}>
          <legend>{p.texto}</legend>
          {p.ayuda && (
            <p className="campo-ayuda" style={{ marginTop: -4 }}>
              {p.ayuda} {p.id === 'cantidad' && <Link href="/en/tools/compensation-calculator">Open the calculator</Link>}
            </p>
          )}
          <div className="escala">
            {[
              { v: true, t: 'Yes' },
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
        <legend>Were you in any of these situations?</legend>
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

      <IrAlResultado activo={contestadas === visibles.length} />
      {contestadas === visibles.length && (
        <section className="resultado" aria-live="polite">
          {graves.length > 0 ? (
            <div className="veredicto veredicto-alto">
              <h3>
                Your letter has {graves.length === 1 ? 'a defect that could' : `${graves.length} defects that could`} make the dismissal unfair
              </h3>
            </div>
          ) : fallos.length > 0 ? (
            <div className="veredicto">
              <h3>There are points worth reviewing</h3>
            </div>
          ) : (
            <div className="veredicto">
              <h3>We see no clear formal defects</h3>
              <p>That does not mean the dismissal is fair: what matters is whether the company can prove what it says.</p>
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
                <strong>Your dismissal could also be void (despido nulo).</strong> You have ticked a specially protected situation. If it is declared
                void, the company has to take you back and pay you the wages you did not receive.
              </p>
            </div>
          )}
          <div className="acciones">
            <a className="boton" href={enlaceWhatsapp(resumen)}>
              Send the letter to a lawyer by WhatsApp
            </a>
            <BotonImprimirEn />
            <a className="boton boton-claro" href={DESPACHO.telefonoHref}>
              Call {DESPACHO.telefono}
            </a>
          </div>
          <p className="letra-pequena">
            For guidance only. Remember that you have 20 working days to challenge it: <Link href="/en/tools/deadlines">work out your deadline</Link>.
          </p>
        </section>
      )}
    </div>
  );
}
