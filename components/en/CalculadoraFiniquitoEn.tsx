'use client';

import { useState } from 'react';
import Link from 'next/link';
import { calcularFiniquito, leerImporte } from '@/lib/calculos';
import { hoyMadrid } from '@/lib/hoy';
import { DESPACHO, enlaceWhatsapp } from '@/lib/despacho';
import { useIrAlResultado } from '../Utiles';
import { BotonImprimirEn, avisoSalarioAnualEn, eurosCentimosEn, fechaLargaEn, numeroEn } from './UtilesCalcEn';

const numero = leerImporte;

export default function CalculadoraFiniquitoEn() {
  const [baja, setBaja] = useState(hoyMadrid());
  const [alta, setAlta] = useState('');
  const [salario, setSalario] = useState('');
  const [pagas, setPagas] = useState<12 | 14>(14);
  const [devengo, setDevengo] = useState<'semestral' | 'anual'>('semestral');
  const [vacAnuales, setVacAnuales] = useState('30');
  const [vacDisfrutadas, setVacDisfrutadas] = useState('0');
  const [enviado, setEnviado] = useState(false);

  const s = numero(salario);
  const error = !enviado
    ? ''
    : !baja
      ? 'Enter the date of your last day at work.'
      : !(s > 0)
        ? 'Enter your gross annual salary, for example 24000.'
        : alta && alta > baja
          ? 'The start date must be earlier than your last day.'
          : !/^\d*([.,]\d+)?$/.test(vacAnuales.trim()) || !/^\d*([.,]\d+)?$/.test(vacDisfrutadas.trim())
            ? 'For the holiday days, write numbers only, for example 30 and 5.'
            : '';
  const r =
    enviado && !error
      ? calcularFiniquito({
          baja,
          salarioAnual: s,
          pagas,
          devengoPagas: devengo,
          vacacionesAnuales: numero(vacAnuales) || 30,
          vacacionesDisfrutadas: numero(vacDisfrutadas) || 0,
          alta: alta || undefined,
        })
      : null;
  useIrAlResultado(r ? JSON.stringify(r) : '');
  const avisoSalario = r ? avisoSalarioAnualEn(s) : '';

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
          <label htmlFor="baja">Last day at work</label>
          <input id="baja" type="date" value={baja} onChange={(e) => setBaja(e.target.value)} />
        </div>
        <div className="campo">
          <label htmlFor="alta">Start date (if it was this year or last year)</label>
          <input id="alta" type="date" value={alta} onChange={(e) => setAlta(e.target.value)} />
          <span className="campo-ayuda">If you have been there longer, leave it blank.</span>
        </div>
        <div className="campo">
          <label htmlFor="salario">Gross annual salary (€)</label>
          <input id="salario" type="text" inputMode="decimal" placeholder="24000" value={salario} onChange={(e) => setSalario(e.target.value)} />
          <span className="campo-ayuda">Including the extra payments (pagas extra).</span>
        </div>
      </div>

      <fieldset>
        <legend className="campo">
          <strong>How are your extra payments paid?</strong>
        </legend>
        <div className="opciones">
          <label className="opcion">
            <input type="radio" name="pagas" checked={pagas === 14} onChange={() => setPagas(14)} />
            <span>
              <strong>Separately, in June and December</strong>
              <br />
              <span className="campo-ayuda">14 payments a year</span>
            </span>
          </label>
          <label className="opcion">
            <input type="radio" name="pagas" checked={pagas === 12} onChange={() => setPagas(12)} />
            <span>
              <strong>Spread across every payslip (prorrateadas)</strong>
              <br />
              <span className="campo-ayuda">12 payments a year: you have already received them</span>
            </span>
          </label>
        </div>
      </fieldset>

      {pagas === 14 && (
        <fieldset>
          <legend className="campo">
            <strong>What period does each extra payment cover?</strong>
          </legend>
          <div className="opciones">
            <label className="opcion">
              <input type="radio" name="devengo" checked={devengo === 'semestral'} onChange={() => setDevengo('semestral')} />
              <span>
                <strong>Half a year each</strong>
                <br />
                <span className="campo-ayuda">Summer: January to June. Christmas: July to December. This is the most common.</span>
              </span>
            </label>
            <label className="opcion">
              <input type="radio" name="devengo" checked={devengo === 'anual'} onChange={() => setDevengo('anual')} />
              <span>
                <strong>A full year each</strong>
                <br />
                <span className="campo-ayuda">Summer: July to June. Christmas: January to December. Your collective agreement (convenio) says so.</span>
              </span>
            </label>
          </div>
        </fieldset>
      )}

      <div className="campos-fila">
        <div className="campo">
          <label htmlFor="vac">Holiday days per year</label>
          <input id="vac" type="text" inputMode="numeric" value={vacAnuales} onChange={(e) => setVacAnuales(e.target.value)} />
          <span className="campo-ayuda">
            By law, 30 calendar days. If your collective agreement counts 22 working days, enter 22 and the days taken in working days.
          </span>
        </div>
        <div className="campo">
          <label htmlFor="disf">Days you have already taken this year</label>
          <input id="disf" type="text" inputMode="numeric" value={vacDisfrutadas} onChange={(e) => setVacDisfrutadas(e.target.value)} />
        </div>
      </div>

      <button type="submit" className="boton boton-marcador">
        Calculate my final settlement
      </button>
      {error && (
        <p className="error" role="alert" style={{ marginTop: 16 }}>
          {error}
        </p>
      )}

      {r && (
        <section className="resultado" aria-live="polite">
          {avisoSalario && <p className="aviso-salario">{avisoSalario}</p>}
          <h2>Your estimated final settlement (finiquito): {eurosCentimosEn(r.total)} gross</h2>
          <table className="tabla">
            <tbody>
              <tr>
                <td>Salary for {r.diasMes} days of the last month</td>
                <td style={{ textAlign: 'right' }}>{eurosCentimosEn(r.salarioMes)}</td>
              </tr>
              <tr>
                <td>Holidays not taken ({numeroEn(r.diasVacaciones)} days)</td>
                <td style={{ textAlign: 'right' }}>{eurosCentimosEn(r.importeVacaciones)}</td>
              </tr>
              {pagas === 14 && (
                <>
                  <tr>
                    <td>Proportional part of the summer extra payment</td>
                    <td style={{ textAlign: 'right' }}>{eurosCentimosEn(r.pagaVerano)}</td>
                  </tr>
                  <tr>
                    <td>Proportional part of the Christmas extra payment</td>
                    <td style={{ textAlign: 'right' }}>{eurosCentimosEn(r.pagaNavidad)}</td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
          <p className="recuadro">
            The final settlement is not the compensation (indemnización): it is what you were already owed. If you have been dismissed, the
            compensation is separate. Work it out with <Link href="/en/tools/compensation-calculator">the compensation calculator</Link>. And when
            you sign, write <strong>"no conforme"</strong> (not in agreement) if you do not agree:{' '}
            <Link href="/en/blog/signing-the-final-settlement-not-in-agreement">we explain why</Link>.
          </p>
          <div className="acciones">
            <a
              className="boton"
              href={enlaceWhatsapp(
                `Hello, I have calculated my final settlement on your website: ${eurosCentimosEn(r.total)} gross, with my last day on ${fechaLargaEn(baja)}. I would like you to review it.`,
              )}
            >
              Have a lawyer review it
            </a>
            <BotonImprimirEn />
          </div>
          <p className="letra-pequena">
            A gross estimate, before tax and deductions. It does not include bonuses, commissions, overtime or arrears under your collective
            agreement, which are also owed. Questions: {DESPACHO.telefono}.
          </p>
        </section>
      )}
    </form>
  );
}
