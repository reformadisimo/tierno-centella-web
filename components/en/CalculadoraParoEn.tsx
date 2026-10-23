'use client';

import { useState } from 'react';
import Link from 'next/link';
import { calcularParo, IPREM_2026, leerImporte } from '@/lib/calculos';
import { DESPACHO, enlaceWhatsapp } from '@/lib/despacho';
import { useIrAlResultado } from '../Utiles';
import { BotonImprimirEn, eurosEn, eurosCentimosEn } from './UtilesCalcEn';

const numero = leerImporte;
const meses = (dias: number) => Math.round(dias / 30);

export default function CalculadoraParoEn() {
  const [salario, setSalario] = useState('');
  const [anios, setAnios] = useState('');
  const [hijos, setHijos] = useState<0 | 1 | 2>(0);
  const [parcial, setParcial] = useState('100');
  const [enviado, setEnviado] = useState(false);

  const s = numero(salario);
  const a = numero(anios);
  const p = numero(parcial);
  const error = !enviado
    ? ''
    : !(s > 0)
      ? 'Enter your gross annual salary, for example 24000.'
      : !(a > 0)
        ? 'Tell us how long you have worked in the last six years.'
        : !(p > 0 && p <= 100)
          ? 'The percentage of your working hours must be between 1 and 100.'
          : '';
  // Aproximaciones: base mensual = salario anual / 12 (las bases incluyen la prorrata de pagas); días cotizados = años x 365.
  const r = enviado && !error ? calcularParo(s / 12, hijos, Math.round(Math.min(a, 6) * 365), p) : null;
  useIrAlResultado(r ? JSON.stringify(r) : '');

  return (
    <form
      className="calculadora"
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        setEnviado(true);
      }}
    >
      <div className="campos-fila">
        <div className="campo">
          <label htmlFor="salario">Gross annual salary in your last job (€)</label>
          <input id="salario" type="text" inputMode="decimal" placeholder="24000" value={salario} onChange={(e) => setSalario(e.target.value)} />
          <span className="campo-ayuda">Including the extra payments, without overtime.</span>
        </div>
        <div className="campo">
          <label htmlFor="anios">Years worked in the last 6 years</label>
          <input id="anios" type="text" inputMode="decimal" placeholder="3.5" value={anios} onChange={(e) => setAnios(e.target.value)} />
          <span className="campo-ayuda">Not counting periods when you were already receiving unemployment benefit. Decimals are allowed.</span>
        </div>
      </div>

      <fieldset>
        <legend className="campo">
          <strong>Dependent children under 26</strong>
        </legend>
        <div className="opciones">
          {([0, 1, 2] as const).map((h) => (
            <label key={h} className="opcion">
              <input type="radio" name="hijos" checked={hijos === h} onChange={() => setHijos(h)} />
              <span>
                <strong>{h === 0 ? 'None' : h === 1 ? 'One' : 'Two or more'}</strong>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="campo" style={{ maxWidth: 320 }}>
        <label htmlFor="parcial">Percentage of your working hours</label>
        <input id="parcial" type="text" inputMode="numeric" value={parcial} onChange={(e) => setParcial(e.target.value)} />
        <span className="campo-ayuda">100 if you worked full time.</span>
      </div>

      <button type="submit" className="boton boton-marcador">
        Calculate my unemployment benefit
      </button>
      {error && (
        <p className="error" role="alert" style={{ marginTop: 16 }}>
          {error}
        </p>
      )}

      {r && r.dias === 0 && (
        <section className="resultado" aria-live="polite">
          <h2>With less than a year of contributions there is no contributory benefit</h2>
          <p>
            You need at least 360 days of contributions in the last six years. You may be entitled to an allowance (subsidio): ask the public
            employment service (SEPE) or call us on {DESPACHO.telefono}.
          </p>
        </section>
      )}

      {r && r.dias > 0 && (
        <section className="resultado" aria-live="polite">
          <h2>
            About {eurosEn(r.mensualPrimeros6)} a month for {Math.min(6, meses(r.dias))} months
          </h2>
          <div className="resultado-cifras">
            <div className="cifra-principal">
              <span className="cifra-nombre">Duration</span>
              <span className="cifra-valor">{meses(r.dias)} months</span>
              <span className="cifra-detalle">{r.dias} days of benefit</span>
            </div>
            <div>
              <span className="cifra-nombre">{r.dias > 180 ? 'First 6 months (70%)' : `The ${meses(r.dias)} months (70%)`}</span>
              <span className="cifra-valor">{eurosCentimosEn(r.mensualPrimeros6)}</span>
              <span className="cifra-detalle">gross per month</span>
            </div>
            {r.dias > 180 && (
              <div>
                <span className="cifra-nombre">From the seventh month (60%)</span>
                <span className="cifra-valor">{eurosCentimosEn(r.mensualDespues)}</span>
                <span className="cifra-detalle">gross per month</span>
              </div>
            )}
          </div>
          <p>
            In total, about <strong>{eurosEn(r.totalBruto)}</strong> gross.
            {r.topeAplicado === 'maximo' && ' Your figure is capped at the maximum amount set by law.'}
            {r.topeAplicado === 'minimo' && ' Your figure is raised to the minimum amount set by law.'}
          </p>
          <p className="recuadro">
            Apply for unemployment benefit (paro) within the <strong>15 working days</strong> after the dismissal so you do not lose any days.
            And if the dismissal is unfair, do not let it go: challenging it does not stop you receiving unemployment benefit.{' '}
            <Link href="/en/dismissal/deadline-to-challenge-a-dismissal">Deadline to challenge a dismissal</Link>.
          </p>
          <div className="acciones">
            <a
              className="boton"
              href={enlaceWhatsapp(
                'Hello, I have been dismissed and I have calculated my unemployment benefit on your website. I would like to know whether I can challenge the dismissal.',
              )}
            >
              Ask about my dismissal
            </a>
            <BotonImprimirEn />
          </div>
          <p className="letra-pequena">
            An estimate using the 2026 figures (IPREM of €{IPREM_2026}; limits calculated on the IPREM plus one sixth). The SEPE uses your real
            contribution bases for the last 180 days. Your Social Security contribution and, where applicable, income tax (IRPF) withholding are
            deducted from the amount.
          </p>
        </section>
      )}
    </form>
  );
}
