'use client';

import { useState } from 'react';
import Link from 'next/link';
import { calcularFiniquito, leerImporte } from '@/lib/calculos';
import { hoyMadrid } from '@/lib/hoy';
import { DESPACHO, enlaceWhatsapp, eurosConCentimos, fechaLarga } from '@/lib/despacho';
import { BotonImprimir, useIrAlResultado, avisoSalarioAnual } from './Utiles';

const numero = leerImporte;

export default function CalculadoraFiniquito() {
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
      ? 'Pon la fecha de tu último día de trabajo.'
      : !(s > 0)
        ? 'Escribe tu salario bruto anual, por ejemplo 24000.'
        : alta && alta > baja
          ? 'La fecha de entrada tiene que ser anterior a la de tu último día.'
          : !/^\d*([.,]\d+)?$/.test(vacAnuales.trim()) || !/^\d*([.,]\d+)?$/.test(vacDisfrutadas.trim())
            ? 'En los días de vacaciones escribe solo números, por ejemplo 30 y 5.'
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
  const avisoSalario = r ? avisoSalarioAnual(s) : '';

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
          <label htmlFor="baja">Último día de trabajo</label>
          <input id="baja" type="date" value={baja} onChange={(e) => setBaja(e.target.value)} />
        </div>
        <div className="campo">
          <label htmlFor="alta">Fecha de entrada (si fue este año o el pasado)</label>
          <input id="alta" type="date" value={alta} onChange={(e) => setAlta(e.target.value)} />
          <span className="campo-ayuda">Si llevas más tiempo, déjala vacía.</span>
        </div>
        <div className="campo">
          <label htmlFor="salario">Salario bruto anual (€)</label>
          <input id="salario" type="text" inputMode="decimal" placeholder="24000" value={salario} onChange={(e) => setSalario(e.target.value)} />
          <span className="campo-ayuda">Con las pagas extra incluidas.</span>
        </div>
      </div>

      <fieldset>
        <legend className="campo">
          <strong>¿Cómo cobras las pagas extra?</strong>
        </legend>
        <div className="opciones">
          <label className="opcion">
            <input type="radio" name="pagas" checked={pagas === 14} onChange={() => setPagas(14)} />
            <span>
              <strong>Aparte, en junio y diciembre</strong>
              <br />
              <span className="campo-ayuda">14 pagas al año</span>
            </span>
          </label>
          <label className="opcion">
            <input type="radio" name="pagas" checked={pagas === 12} onChange={() => setPagas(12)} />
            <span>
              <strong>Prorrateadas en cada nómina</strong>
              <br />
              <span className="campo-ayuda">12 pagas al año: ya las has cobrado</span>
            </span>
          </label>
        </div>
      </fieldset>

      {pagas === 14 && (
        <fieldset>
          <legend className="campo">
            <strong>¿Qué periodo cubre cada paga extra?</strong>
          </legend>
          <div className="opciones">
            <label className="opcion">
              <input type="radio" name="devengo" checked={devengo === 'semestral'} onChange={() => setDevengo('semestral')} />
              <span>
                <strong>Medio año cada una</strong>
                <br />
                <span className="campo-ayuda">Verano: enero a junio. Navidad: julio a diciembre. Es lo más habitual.</span>
              </span>
            </label>
            <label className="opcion">
              <input type="radio" name="devengo" checked={devengo === 'anual'} onChange={() => setDevengo('anual')} />
              <span>
                <strong>Un año cada una</strong>
                <br />
                <span className="campo-ayuda">Verano: julio a junio. Navidad: enero a diciembre. Lo dice tu convenio.</span>
              </span>
            </label>
          </div>
        </fieldset>
      )}

      <div className="campos-fila">
        <div className="campo">
          <label htmlFor="vac">Días de vacaciones al año</label>
          <input id="vac" type="text" inputMode="numeric" value={vacAnuales} onChange={(e) => setVacAnuales(e.target.value)} />
          <span className="campo-ayuda">Por ley, 30 naturales. Si tu convenio cuenta 22 laborables, pon 22 y los días disfrutados en laborables.</span>
        </div>
        <div className="campo">
          <label htmlFor="disf">Días que ya has disfrutado este año</label>
          <input id="disf" type="text" inputMode="numeric" value={vacDisfrutadas} onChange={(e) => setVacDisfrutadas(e.target.value)} />
        </div>
      </div>

      <button type="submit" className="boton boton-marcador">
        Calcular mi finiquito
      </button>
      {error && (
        <p className="error" role="alert" style={{ marginTop: 16 }}>
          {error}
        </p>
      )}

      {r && (
        <section className="resultado" aria-live="polite">
          {avisoSalario && <p className="aviso-salario">{avisoSalario}</p>}
          <h2>Tu finiquito orientativo: {eurosConCentimos(r.total)} brutos</h2>
          <table className="tabla">
            <tbody>
              <tr>
                <td>Salario de {r.diasMes} días del último mes</td>
                <td style={{ textAlign: 'right' }}>{eurosConCentimos(r.salarioMes)}</td>
              </tr>
              <tr>
                <td>Vacaciones no disfrutadas ({r.diasVacaciones.toLocaleString('es-ES')} días)</td>
                <td style={{ textAlign: 'right' }}>{eurosConCentimos(r.importeVacaciones)}</td>
              </tr>
              {pagas === 14 && (
                <>
                  <tr>
                    <td>Parte proporcional de la paga de verano</td>
                    <td style={{ textAlign: 'right' }}>{eurosConCentimos(r.pagaVerano)}</td>
                  </tr>
                  <tr>
                    <td>Parte proporcional de la paga de Navidad</td>
                    <td style={{ textAlign: 'right' }}>{eurosConCentimos(r.pagaNavidad)}</td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
          <p className="recuadro">
            El finiquito no es la indemnización: es lo que ya te debían. Si te han despedido, la indemnización va aparte. Calcúlala en{' '}
            <Link href="/calculadora-indemnizacion">la calculadora de indemnización</Link>. Y al firmar, escribe <strong>"no conforme"</strong> si no estás de
            acuerdo: <Link href="/blog/finiquito-firmar-no-conforme">te explicamos por qué</Link>.
          </p>
          <div className="acciones">
            <a
              className="boton"
              href={enlaceWhatsapp(
                `Hola, he calculado mi finiquito en la web: ${eurosConCentimos(r.total)} brutos, con baja el ${fechaLarga(baja)}. Me gustaría que lo revisarais.`,
              )}
            >
              Que lo revise un abogado
            </a>
            <BotonImprimir />
          </div>
          <p className="letra-pequena">
            Cálculo bruto y orientativo, antes de retenciones. No incluye pluses, comisiones, horas extra ni atrasos de convenio, que también se deben.
            Dudas: {DESPACHO.telefono}.
          </p>
        </section>
      )}
    </form>
  );
}
