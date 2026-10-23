'use client';

import { useState } from 'react';
import { DESPACHO, enlaceWhatsapp } from '@/lib/despacho';
import { BotonImprimirEn } from './UtilesEn';

type Tipo = 'empresa' | 'colegio' | 'administracion';
type Punto = { id: string; texto: string; ayuda: string; obligatorio: (t: Tipo, grande: boolean) => boolean; aplica?: (t: Tipo) => boolean };

const PUNTOS: Punto[] = [
  {
    id: 'psico',
    texto: 'Psychosocial risk assessment carried out and up to date',
    ayuda: 'The Occupational Risk Prevention Act (Ley de Prevención de Riesgos Laborales) requires all risks to be assessed, including stress, workload and harassment.',
    obligatorio: () => true,
  },
  {
    id: 'sexual',
    texto: 'Protocol against sexual and sex-based harassment',
    ayuda: 'For all organisations, whatever their size (Organic Law 3/2007, Article 48).',
    obligatorio: () => true,
  },
  {
    id: 'moral',
    texto: 'Procedure against workplace harassment (psychological harassment or mobbing)',
    ayuda: 'It derives from the duty of prevention and from ILO Convention 190. It is the tool that best protects the organisation when a complaint arrives.',
    obligatorio: () => false,
  },
  {
    id: 'lgtbi',
    texto: 'Protocol against harassment and violence towards LGTBI people',
    ayuda: 'In companies with more than 50 people (Law 4/2023 and Royal Decree 1026/2024).',
    obligatorio: (t, grande) => grande && t !== 'administracion',
  },
  {
    id: 'canal',
    texto: 'Internal whistleblowing channel with a designated person in charge',
    ayuda: 'With 50 or more people, and throughout the public sector (Law 2/2023).',
    obligatorio: (t, grande) => grande || t === 'administracion',
  },
  {
    id: 'igualdad',
    texto: 'Registered equality plan (plan de igualdad)',
    ayuda:
      'With 50 or more people on the workforce, and always in public administrations (Basic Statute of Public Employees, Additional Provision 7).',
    obligatorio: (t, grande) => grande || t === 'administracion',
  },
  {
    id: 'registro',
    texto: 'Pay register (registro retributivo) with the average salaries of women and men',
    ayuda: 'For all companies (Article 28.2 of the Workers’ Statute).',
    obligatorio: (t) => t !== 'administracion',
  },
  {
    id: 'instructor',
    texto: 'A trained and impartial investigating person or committee',
    ayuda: 'A badly conducted investigation is the most common reason organisations are found liable.',
    obligatorio: () => false,
  },
  {
    id: 'formacion',
    texto: 'Harassment training for managers and the management team',
    ayuda: 'Knowing how to recognise the first signs prevents most conflicts.',
    obligatorio: () => false,
  },
  {
    id: 'difusion',
    texto: 'The protocol is known by the whole workforce',
    ayuda: 'A protocol kept in a drawer protects no one, not even the organisation.',
    obligatorio: () => false,
  },
  {
    id: 'bienestar',
    texto: 'Wellbeing and student protection coordinator',
    ayuda: 'In all schools and educational centres (Organic Law 8/2021 on the protection of children).',
    obligatorio: () => true,
    aplica: (t) => t === 'colegio',
  },
  {
    id: 'convivencia',
    texto: 'Up-to-date school coexistence plan (plan de convivencia)',
    ayuda: 'In educational centres. It is advisable to coordinate it with the protocol on harassment of staff.',
    obligatorio: () => true,
    aplica: (t) => t === 'colegio',
  },
];

const NOMBRE: Record<Tipo, string> = { empresa: 'Company', colegio: 'School or educational centre', administracion: 'Public administration or public body' };

export default function AutodiagnosticoEmpresaEn() {
  const [tipo, setTipo] = useState<Tipo>('empresa');
  const [grande, setGrande] = useState(false);
  const [tiene, setTiene] = useState<string[]>([]);
  const [visto, setVisto] = useState(false);
  const puntos = PUNTOS.filter((p) => !p.aplica || p.aplica(tipo));
  const obligatorios = puntos.filter((p) => p.obligatorio(tipo, grande));
  const faltanObl = obligatorios.filter((p) => !tiene.includes(p.id));
  const faltanRec = puntos.filter((p) => !p.obligatorio(tipo, grande) && !tiene.includes(p.id));
  const alternar = (id: string) => setTiene((t) => (t.includes(id) ? t.filter((x) => x !== id) : [...t, id]));
  const resumen = `Hello, we have done the self-assessment on your website (${NOMBRE[tipo]}, ${grande ? '50 or more people' : 'fewer than 50 people'}). We are missing: ${
    [...faltanObl, ...faltanRec].map((p) => p.texto.toLowerCase()).join('; ') || 'nothing'
  }. We would like your help.`;

  return (
    <div className="herramienta">
      <fieldset className="pregunta-test">
        <legend className="campo">
          <strong>What kind of organisation are you?</strong>
        </legend>
        <div className="opciones">
          {(Object.keys(NOMBRE) as Tipo[]).map((t) => (
            <label key={t} className="opcion">
              <input type="radio" name="tipo" checked={tipo === t} onChange={() => setTipo(t)} />
              <span>
                <strong>{NOMBRE[t]}</strong>
              </span>
            </label>
          ))}
        </div>
      </fieldset>
      <fieldset className="pregunta-test">
        <legend className="campo">
          <strong>How many people work in the organisation?</strong>
        </legend>
        <div className="opciones">
          <label className="opcion">
            <input type="radio" name="tamano" checked={!grande} onChange={() => setGrande(false)} />
            <span>
              <strong>Fewer than 50</strong>
            </span>
          </label>
          <label className="opcion">
            <input type="radio" name="tamano" checked={grande} onChange={() => setGrande(true)} />
            <span>
              <strong>50 or more</strong>
            </span>
          </label>
        </div>
      </fieldset>

      <h2 style={{ fontSize: '1.15rem', margin: '8px 0 10px' }}>Tick what you already have</h2>
      <ul className="lista-pruebas">
        {puntos.map((p) => (
          <li key={p.id} className={tiene.includes(p.id) ? 'tengo' : ''}>
            <input id={p.id} type="checkbox" checked={tiene.includes(p.id)} onChange={() => alternar(p.id)} style={{ width: 20, height: 20, marginTop: 3, accentColor: '#003a5f' }} />
            <label htmlFor={p.id}>
              <strong style={{ display: 'block' }}>{p.texto}</strong>
              <span className="etiqueta-peso">{p.obligatorio(tipo, grande) ? 'Mandatory. ' : 'Highly recommended. '}</span>
              <span style={{ fontSize: '0.93rem', color: 'var(--tinta-media)' }}>{p.ayuda}</span>
            </label>
          </li>
        ))}
      </ul>
      <button type="button" className="boton boton-marcador" onClick={() => setVisto(true)}>
        See our result
      </button>

      {visto && (
        <section className="resultado" aria-live="polite">
          <div className={`veredicto${faltanObl.length ? ' veredicto-alto' : ''}`}>
            <h3>
              {faltanObl.length === 0
                ? 'You meet the mandatory requirements'
                : faltanObl.length > 1 ? `You are missing ${faltanObl.length} legal obligations` : 'You are missing 1 legal obligation'}
            </h3>
            <p style={{ margin: 0 }}>
              {faltanObl.length === 0
                ? 'A good starting point. What makes the difference when a complaint arrives is how it is applied: who investigates, how quickly and with what safeguards.'
                : 'When there is a harassment complaint, the Labour Inspectorate (Inspección de Trabajo) and the courts first check whether the organisation met these obligations. Not having them increases its liability.'}
            </p>
          </div>
          {faltanObl.length > 0 && (
            <>
              <p>
                <strong>Mandatory items missing:</strong>
              </p>
              <ul className="prosa">
                {faltanObl.map((p) => (
                  <li key={p.id}>{p.texto}</li>
                ))}
              </ul>
            </>
          )}
          {faltanRec.length > 0 && (
            <>
              <p>
                <strong>Recommended items missing:</strong>
              </p>
              <ul className="prosa">
                {faltanRec.map((p) => (
                  <li key={p.id}>{p.texto}</li>
                ))}
              </ul>
            </>
          )}
          <div className="acciones">
            <a className="boton" href={enlaceWhatsapp(resumen)}>
              Ask for a review of our protocols
            </a>
            <BotonImprimirEn />
            <a className="boton boton-claro" href={DESPACHO.telefonoHref}>
              Call {DESPACHO.telefono}
            </a>
          </div>
          <p className="letra-pequena">For guidance only. Some collective agreements and regional rules add further obligations. We do not store any answers.</p>
        </section>
      )}
    </div>
  );
}
