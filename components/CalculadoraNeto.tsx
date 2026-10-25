'use client';

// Con cuánto te quedas de una indemnización por despido, después del IRPF. Es una estimación orientativa: no sustituye a un asesor fiscal.
import { useState } from 'react';
import { calcularIndemnizacion, leerImporte, mesesTrabajados } from '@/lib/calculos';
import { hoyMadrid } from '@/lib/hoy';
import { DESPACHO, enlaceWhatsapp, euros } from '@/lib/despacho';
import { BotonImprimir, avisoSalarioAnual } from './Utiles';

const LIMITE_EXENTO = 180000;
const LIMITE_REDUCCION = 300000;

type Tipo = 'improcedente' | 'objetivo' | 'acuerdo';

export default function CalculadoraNeto() {
  const hoy = hoyMadrid();
  const [tipo, setTipo] = useState<Tipo>('improcedente');
  const [inicio, setInicio] = useState('');
  const [despido, setDespido] = useState('');
  const [salario, setSalario] = useState('');
  const [cobrado, setCobrado] = useState('');
  const [tipoIrpf, setTipoIrpf] = useState('24');
  const sal = leerImporte(salario);
  const cob = leerImporte(cobrado);
  const listo = inicio && despido && despido > inicio && sal > 0 && cob > 0 && despido <= hoy;
  const r = listo ? calcularIndemnizacion(inicio, despido, sal) : null;
  const aviso = avisoSalarioAnual(sal);

  let exento = 0, tributable = 0, reduccion = 0, baseTrib = 0, impuesto = 0, neto = 0, anios = 0;
  if (r) {
    const legal = r.importeImprocedente;
    exento = tipo === 'acuerdo' ? 0 : Math.min(cob, legal, LIMITE_EXENTO);
    tributable = cob - exento;
    anios = mesesTrabajados(inicio, despido) / 12;
    reduccion = anios > 2 ? Math.min(tributable, LIMITE_REDUCCION) * 0.3 : 0;
    baseTrib = tributable - reduccion;
    impuesto = baseTrib * (Number(tipoIrpf) / 100);
    neto = cob - impuesto;
  }
  return (
    <div className="herramienta">
      <fieldset className="pregunta-test">
        <legend>¿Cómo ha terminado tu contrato?</legend>
        <div className="opciones">
          {([
            ['improcedente', 'Despido declarado improcedente (por sentencia o reconocido en conciliación)'],
            ['objetivo', 'Despido objetivo o despido colectivo (ERE)'],
            ['acuerdo', 'Acuerdo o mutuo acuerdo, sin reconocer que el despido es improcedente'],
          ] as [Tipo, string][]).map(([v, t]) => (
            <label key={v} className="opcion">
              <input type="radio" name="tipo-neto" checked={tipo === v} onChange={() => setTipo(v)} />
              <span>{t}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <div className="campo">
        <label htmlFor="n-inicio">Cuándo empezaste en la empresa</label>
        <input id="n-inicio" type="date" value={inicio} max={hoy} onChange={(e) => setInicio(e.target.value)} />
      </div>
      <div className="campo">
        <label htmlFor="n-despido">Fecha del cese</label>
        <input id="n-despido" type="date" value={despido} max={hoy} onChange={(e) => setDespido(e.target.value)} />
      </div>
      <div className="campo">
        <label htmlFor="n-salario">Salario bruto anual, con pagas extra (€)</label>
        <input type="text" id="n-salario" inputMode="decimal" value={salario} onChange={(e) => setSalario(e.target.value)} placeholder="Por ejemplo, 30000" />
        {aviso && <p className="campo-ayuda">{aviso}</p>}
      </div>
      <div className="campo">
        <label htmlFor="n-cobrado">Indemnización que cobras o te ofrecen (€ brutos)</label>
        <input type="text" id="n-cobrado" inputMode="decimal" value={cobrado} onChange={(e) => setCobrado(e.target.value)} placeholder="Por ejemplo, 30000" />
      </div>
      <div className="campo">
        <label htmlFor="n-tipo">Tu tipo aproximado de IRPF (lo que pagas por cada euro extra)</label>
        <select id="n-tipo" value={tipoIrpf} onChange={(e) => setTipoIrpf(e.target.value)}>
          {['19', '24', '30', '37', '45'].map((x) => (
            <option key={x} value={x}>{x} %</option>
          ))}
        </select>
        <p className="campo-ayuda">Si no lo sabes, deja el 24 %: es una media razonable para ingresos medios. Tu asesor fiscal puede afinarlo.</p>
      </div>

      {r && (
        <section aria-live="polite" className="veredicto con-euro">
          <h3>Te quedarían aproximadamente {euros(neto)} netos</h3>
          <table className="tabla">
            <tbody>
              <tr><td>Indemnización bruta</td><td style={{ textAlign: 'right' }}>{euros(cob)}</td></tr>
              <tr><td>Parte exenta de IRPF</td><td style={{ textAlign: 'right' }}>{euros(exento)}</td></tr>
              <tr><td>Parte que tributa</td><td style={{ textAlign: 'right' }}>{euros(tributable)}</td></tr>
              {reduccion > 0 && <tr><td>Reducción del 30 % (por superar dos años de antigüedad)</td><td style={{ textAlign: 'right' }}>-{euros(reduccion)}</td></tr>}
              <tr><td>Impuesto estimado ({tipoIrpf} % sobre {euros(baseTrib)})</td><td style={{ textAlign: 'right' }}>{impuesto > 0 ? "-" : ""}{euros(impuesto)}</td></tr>
            </tbody>
          </table>
          <p style={{ margin: '8px 0 0' }}>
            El tope legal de un despido improcedente con tus datos es de <strong>{euros(r.importeImprocedente)}</strong>.
            {tipo === 'acuerdo' && ' En un acuerdo sin reconocimiento de improcedencia, esta calculadora no aplica la exención: si el despido se reconoce improcedente en conciliación o sentencia, puede cambiar mucho.'}
          </p>
        </section>
      )}
      {r && (
        <div className="recuadro">
          <p><strong>Esto es una estimación.</strong> No sustituye a un asesor fiscal y no podemos garantizar que sea exacta: depende de tus otros ingresos, de tu comunidad y de cómo lo presente la empresa. Consúltalo con tu asesor antes de decidir. Además:</p>
          <ul>
            <li>La exención solo cubre hasta la cuantía legal de un despido improcedente y hasta 180.000 euros. Lo que se pacta por encima tributa.</li>
            <li>Se exige una desvinculación real con la empresa: si vuelves a trabajar para ella o una vinculada en los tres años siguientes, Hacienda puede cuestionar la exención.</li>
            <li>No incluye salarios de tramitación, que tributan como salario, ni otros conceptos como el finiquito o las vacaciones.</li>
          </ul>
        </div>
      )}
      <div className="acciones">
        {r && (
          <a className="boton" href={enlaceWhatsapp(`Hola, he calculado con cuánto me quedaría de una indemnización de ${euros(cob)} brutos y me gustaría que un abogado lo revisara.`)}>
            Que lo revise un abogado
          </a>
        )}
        {r && <BotonImprimir />}
        <a className="boton boton-claro" href={DESPACHO.telefonoHref}>Llamar al {DESPACHO.telefono}</a>
      </div>
      <p className="letra-pequena">Estimación orientativa con las reglas generales del IRPF (artículos 7.e y 18.2 de la Ley del IRPF). No es asesoramiento fiscal.</p>
    </div>
  );
}
