'use client';

import { useState } from 'react';
import Link from 'next/link';
import { calcularReduccion, leerImporte } from '@/lib/calculos';
import { DESPACHO, enlaceWhatsapp } from '@/lib/despacho';
import { useIrAlResultado } from '../Utiles';
import { BotonImprimirEn, eurosEn, eurosCentimosEn, numeroEn } from './UtilesCalcEn';

const numero = leerImporte;

export default function CalculadoraReduccionEn() {
  const [salario, setSalario] = useState('');
  const [actuales, setActuales] = useState('40');
  const [nuevas, setNuevas] = useState('');
  const [edad, setEdad] = useState('');
  const [enviado, setEnviado] = useState(false);

  const s = numero(salario);
  const a = numero(actuales);
  const n = numero(nuevas);
  const e = edad === '' ? NaN : numero(edad);
  const error = !enviado
    ? ''
    : !(s > 0)
      ? 'Enter your gross annual salary, for example 26000.'
      : !(a > 0)
        ? 'Enter the weekly hours you work now.'
        : !(n > 0)
          ? 'Enter the weekly hours you want to work.'
          : !(n < a)
          ? 'The new hours must be fewer than your current hours.'
          : '';
  const r = enviado && !error ? calcularReduccion(s, a, n) : null;
  useIrAlResultado(r ? JSON.stringify(r) : '');
  const minimo = a > 0 ? Math.round(a * 0.5 * 100) / 100 : 0;
  const maximo = a > 0 ? Math.round(a * 0.875 * 100) / 100 : 0;

  return (
    <form
      className="calculadora"
      noValidate
      onSubmit={(ev) => {
        ev.preventDefault();
        setEnviado(true);
      }}
    >
      <div className="campos-fila">
        <div className="campo">
          <label htmlFor="salario">Gross annual salary working full time (€)</label>
          <input id="salario" type="text" inputMode="decimal" placeholder="26000" value={salario} onChange={(ev) => setSalario(ev.target.value)} />
        </div>
        <div className="campo">
          <label htmlFor="edad">Your child's age (years)</label>
          <input id="edad" type="text" inputMode="numeric" placeholder="4" value={edad} onChange={(ev) => setEdad(ev.target.value)} />
          <span className="campo-ayuda">Leave it blank if you are caring for a relative.</span>
        </div>
      </div>
      <div className="campos-fila">
        <div className="campo">
          <label htmlFor="actuales">Weekly hours you work now</label>
          <input id="actuales" type="text" inputMode="decimal" value={actuales} onChange={(ev) => setActuales(ev.target.value)} />
        </div>
        <div className="campo">
          <label htmlFor="nuevas">Weekly hours you want to work</label>
          <input id="nuevas" type="text" inputMode="decimal" placeholder="30" value={nuevas} onChange={(ev) => setNuevas(ev.target.value)} />
          {a > 0 && (
            <span className="campo-ayuda">
              The law allows between {numeroEn(minimo)} and {numeroEn(maximo)} hours.
            </span>
          )}
        </div>
      </div>

      <button type="submit" className="boton boton-marcador">
        Calculate
      </button>
      {error && (
        <p className="error" role="alert" style={{ marginTop: 16 }}>
          {error}
        </p>
      )}

      {r && (
        <section className="resultado" aria-live="polite">
          <h2>
            You reduce your hours by {numeroEn(r.porcentaje)}%: you would earn about {eurosEn(r.salarioAnual)} gross a year
          </h2>
          {!r.valida && (
            <p className="recuadro">
              Note: a reduction for caring for someone must be between one eighth (12.5%) and half (50%) of your working hours. With these hours
              it does not fall within the legal right, although you can ask for it as an adaptation of your working hours or agree it with the
              company.
            </p>
          )}
          {!Number.isNaN(e) && e >= 12 && (
            <p className="recuadro">
              With a child aged 12 or over, the reduction for legal guardianship (guarda legal) no longer applies, unless the child has a disability
              or a serious illness. You can still ask for an adaptation of your working hours.
            </p>
          )}
          <table className="tabla">
            <tbody>
              <tr>
                <td>Gross salary per year</td>
                <td style={{ textAlign: 'right' }}>{eurosCentimosEn(r.salarioAnual)}</td>
              </tr>
              <tr>
                <td>Per month, in 12 payments</td>
                <td style={{ textAlign: 'right' }}>{eurosCentimosEn(r.salarioMensual12)}</td>
              </tr>
              <tr>
                <td>Hours per day (5 days)</td>
                <td style={{ textAlign: 'right' }}>{numeroEn(r.horasDiarias)}</td>
              </tr>
            </tbody>
          </table>
          <h3 style={{ fontSize: '1.1rem', margin: '20px 0 8px' }}>What you do not lose</h3>
          <ul className="prosa">
            <li>If you are dismissed, the compensation is calculated on your full-time salary.</li>
            <li>For unemployment benefit (paro), contributions made during a reduction for childcare count as if you were working full time.</li>
            <li>For your retirement pension, the first three years of reduction for caring for a child under 12 count as full-time contributions.</li>
            <li>While you have it, your dismissal is void (nulo) unless there is a real reason unrelated to it.</li>
          </ul>
          <div className="acciones">
            <Link className="boton" href="/en/women-at-work/reduced-and-adapted-working-hours">
              How to ask for it
            </Link>
            <a className="boton boton-claro" href={enlaceWhatsapp('Hello, I want to ask for reduced working hours and I have some questions.')}>
              Ask on WhatsApp
            </a>
            <BotonImprimirEn />
          </div>
          <p className="letra-pequena">
            An estimate: your collective agreement (convenio) may treat some salary supplements differently. Questions: {DESPACHO.telefono}.
          </p>
        </section>
      )}
    </form>
  );
}
