'use client';

import { useIrAlResultado } from '../Utiles';
import { BotonImprimirEn, fechaLargaEn } from './UtilesCalcEn';

import { useState } from 'react';
import Link from 'next/link';
import { sumarHabiles, sumarAnios, diasHabilesRestantes } from '@/lib/calculos';
import { hoyMadrid } from '@/lib/hoy';
import { DESPACHO } from '@/lib/despacho';

type Situacion = {
  id: string;
  nombre: string;
  fechaDe: string;
  tipo: 'habiles' | 'anio';
  n: number;
  explicacion: string;
  enlace?: { href: string; texto: string };
};

const SITUACIONES: Situacion[] = [
  {
    id: 'despido',
    nombre: 'I have been dismissed',
    fechaDe: 'Date of the dismissal',
    tipo: 'habiles',
    n: 20,
    explicacion:
      '20 working days to file the conciliation claim (papeleta de conciliación), which stops the clock. It is a strict time limit (caducidad): once it runs out, the dismissal can no longer be challenged.',
    enlace: { href: '/en/tools/compensation-calculator', texto: 'Calculate your compensation' },
  },
  {
    id: 'sancion',
    nombre: 'I have been given a disciplinary sanction',
    fechaDe: 'Date you were notified of the sanction',
    tipo: 'habiles',
    n: 20,
    explicacion: '20 working days to challenge the sanction in court, starting with the conciliation claim.',
  },
  {
    id: 'modificacion',
    nombre: 'My hours, pay or duties have been changed',
    fechaDe: 'Date you were notified',
    tipo: 'habiles',
    n: 20,
    explicacion:
      'A substantial change to your working conditions (modificación sustancial) is challenged within 20 working days of being notified. If it is serious, you can also ask for your contract to be ended with compensation.',
  },
  {
    id: 'incapacidad',
    nombre: 'The social security office (INSS) has refused my disability claim',
    fechaDe: 'Date you received the decision',
    tipo: 'habiles',
    n: 30,
    explicacion:
      '30 working days to file the prior administrative claim (reclamación previa) with the INSS, a compulsory step before going to court.',
    enlace: { href: '/en/tools/permanent-disability-checker', texto: 'Permanent disability checker' },
  },
  {
    id: 'cantidad',
    nombre: 'I am owed money: wages, overtime, holidays',
    fechaDe: 'Date it should have been paid',
    tipo: 'anio',
    n: 1,
    explicacion: 'One year to claim amounts owed, counted from when they should have been paid. Each unpaid month has its own deadline.',
  },
  {
    id: 'acoso',
    nombre: 'I am being harassed and want to claim damages',
    fechaDe: 'Date of the last episode of harassment',
    tipo: 'anio',
    n: 1,
    explicacion:
      'In general, one year to claim damages from the last act of harassment or from when you left the company. In the public administration, one year for the claim for state liability (responsabilidad patrimonial). This is a guide only: how the time is counted depends on the route you take.',
    enlace: { href: '/en/workplace-harassment/what-you-can-claim-for-harassment', texto: 'What you can claim for harassment' },
  },
];

export default function PlazosEn() {
  const [id, setId] = useState('despido');
  const [fecha, setFecha] = useState('');
  const s = SITUACIONES.find((x) => x.id === id)!;
  const hoy = hoyMadrid();

  let ultimo = '';
  let quedan: number | null = null;
  if (fecha && fecha <= hoy) {
    // Agosto es hábil para despidos y modificaciones (art. 43.4 LRJS) y en la vía administrativa del INSS; no para las sanciones.
    const agostoHabil = s.id !== 'sancion';
    ultimo = s.tipo === 'habiles' ? sumarHabiles(fecha, s.n, agostoHabil) : sumarAnios(fecha, s.n);
    if (s.tipo === 'habiles') quedan = diasHabilesRestantes(hoy > fecha ? hoy : sumarHabiles(fecha, 1, agostoHabil), ultimo, agostoHabil);
  }
  const vencido = ultimo !== '' && ultimo < hoy;
  useIrAlResultado(ultimo ? `${id}|${fecha}` : '');

  return (
    <div className="herramienta">
      <fieldset className="pregunta-test">
        <legend>What has happened to you?</legend>
        <div className="opciones">
          {SITUACIONES.map((x) => (
            <label key={x.id} className="opcion">
              <input type="radio" name="situacion" checked={id === x.id} onChange={() => setId(x.id)} />
              <span>{x.nombre}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <div className="campo">
        <label htmlFor="fecha-plazo">{s.fechaDe}</label>
        <input id="fecha-plazo" type="date" value={fecha} max={hoy} onChange={(e) => setFecha(e.target.value)} />
      </div>
      <p>{s.explicacion}</p>
      {fecha > hoy && <p className="error">The date cannot be later than today.</p>}
      {ultimo && (
        <div className={`resultado-plazo ${vencido ? 'cuenta-vencida' : 'veredicto'}`} aria-live="polite">
          {vencido ? (
            <p style={{ margin: 0 }}>
              The general deadline ended on {fechaLargaEn(ultimo)}. Call us anyway: sometimes the deadline was interrupted or did not start
              running when it seems.
            </p>
          ) : (
            <>
              <h3>Approximate last day: {fechaLargaEn(ultimo)}</h3>
              {quedan !== null && (
                <p style={{ margin: 0 }}>
                  You have {quedan === 1 ? '1 working day' : `${quedan} working days`} left, counting today if it is a working day.
                </p>
              )}
            </>
          )}
        </div>
      )}
      <div className="acciones">
        <a className="boton" href={DESPACHO.telefonoHref}>
          Call {DESPACHO.telefono}
        </a>
        {s.enlace && (
          <Link className="boton boton-claro" href={s.enlace.href}>
            {s.enlace.texto}
          </Link>
        )}
        {ultimo && <BotonImprimirEn />}
      </div>
      <p className="letra-pequena">
        An estimate: it leaves out weekends and national public holidays (including Good Friday), but not regional or local ones. For a dismissal
        or a change to your working conditions, August counts as working days; for a sanction, it does not. Confirm your deadline with a lawyer
        before it runs out.
      </p>
    </div>
  );
}
