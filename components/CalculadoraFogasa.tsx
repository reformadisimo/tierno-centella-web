'use client';

import { useState } from 'react';
import Link from 'next/link';
import { calcularFogasa, leerImporte, TOPE_DIARIO_FOGASA, SMI_ANUAL_2026, type TipoIndemnizacionFogasa } from '@/lib/calculos';
import { hoyMadrid } from '@/lib/hoy';
import { DESPACHO, enlaceWhatsapp, euros, eurosConCentimos } from '@/lib/despacho';
import { BotonImprimir, useIrAlResultado, avisoSalarioAnual } from './Utiles';

const TIPOS: { id: TipoIndemnizacionFogasa; titulo: string; texto: string }[] = [
  { id: 'ninguna', titulo: 'No, solo me deben salarios', texto: 'Nóminas, pagas extra o el finiquito.' },
  { id: 'objetivo', titulo: 'Despido objetivo o ERE', texto: 'Por causas económicas, de producción o por cierre: 20 días por año.' },
  { id: 'improcedente', titulo: 'Despido improcedente, o me fui porque no pagaban', texto: 'Reconocido por el juez o en conciliación.' },
];

export default function CalculadoraFogasa() {
  const [salario, setSalario] = useState('');
  const [deuda, setDeuda] = useState('');
  const [meses, setMeses] = useState('');
  const [tipo, setTipo] = useState<TipoIndemnizacionFogasa>('ninguna');
  const [alta, setAlta] = useState('');
  const [despido, setDespido] = useState(hoyMadrid());
  const [reconocida, setReconocida] = useState('');
  const [enviado, setEnviado] = useState(false);

  const s = leerImporte(salario);
  const dd = deuda.trim() ? leerImporte(deuda) : 0;
  const m = meses.trim() ? leerImporte(meses) : 0;
  const rec = reconocida.trim() ? leerImporte(reconocida) : 0;
  const conIndemnizacion = tipo !== 'ninguna';
  const error = !enviado
    ? ''
    : !(s > 0)
      ? 'Escribe tu salario bruto anual, por ejemplo 24000.'
      : !(dd >= 0) || !(m >= 0)
        ? 'Revisa lo que te deben: escribe solo números.'
        : dd > 0 && !(m > 0)
          ? 'Indica cuántos meses de sueldo te deben (admite decimales, por ejemplo 2,5).'
          : !conIndemnizacion && !(dd > 0)
            ? 'Escribe cuánto te deben de salarios, o marca si te deben también una indemnización.'
            : conIndemnizacion && (!alta || !despido || alta >= despido)
              ? 'Pon la fecha en que empezaste y la del despido (la de entrada, antes).'
              : '';
  const r =
    enviado && !error
      ? calcularFogasa({ salarioAnual: s, salariosDebidos: dd, diasSalarios: Math.round(m * 30), tipo, alta, despido, indemnizacionReconocida: rec || undefined })
      : null;
  useIrAlResultado(r ? JSON.stringify(r) : '');
  const aviso = r ? avisoSalarioAnual(s) : '';

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
          <label htmlFor="salario">Salario bruto anual (€)</label>
          <input id="salario" type="text" inputMode="decimal" placeholder="24000" value={salario} onChange={(e) => setSalario(e.target.value)} />
          <span className="campo-ayuda">Con las pagas extra incluidas.</span>
        </div>
        <div className="campo">
          <label htmlFor="deuda">Salarios que te deben (€ brutos)</label>
          <input id="deuda" type="text" inputMode="decimal" placeholder="4000" value={deuda} onChange={(e) => setDeuda(e.target.value)} />
          <span className="campo-ayuda">Nóminas, pagas extra, finiquito. Déjalo vacío si no te deben.</span>
        </div>
        <div className="campo">
          <label htmlFor="meses">¿Cuántos meses de sueldo son?</label>
          <input id="meses" type="text" inputMode="decimal" placeholder="2" value={meses} onChange={(e) => setMeses(e.target.value)} />
          <span className="campo-ayuda">Admite decimales: 2,5 son dos meses y medio.</span>
        </div>
      </div>

      <fieldset>
        <legend className="campo">
          <strong>¿Te deben también una indemnización?</strong>
        </legend>
        <div className="opciones">
          {TIPOS.map((t) => (
            <label key={t.id} className="opcion">
              <input type="radio" name="tipo" checked={tipo === t.id} onChange={() => setTipo(t.id)} />
              <span>
                <strong>{t.titulo}</strong>
                <br />
                {t.texto}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      {conIndemnizacion && (
        <div className="campos-fila">
          <div className="campo">
            <label htmlFor="alta">Fecha en que empezaste</label>
            <input id="alta" type="date" value={alta} onChange={(e) => setAlta(e.target.value)} />
          </div>
          <div className="campo">
            <label htmlFor="despido">Fecha del despido o de la salida</label>
            <input id="despido" type="date" value={despido} onChange={(e) => setDespido(e.target.value)} />
          </div>
          <div className="campo">
            <label htmlFor="reconocida">Indemnización reconocida (€), si la sabes</label>
            <input id="reconocida" type="text" inputMode="decimal" placeholder="Opcional" value={reconocida} onChange={(e) => setReconocida(e.target.value)} />
            <span className="campo-ayuda">La que pone la sentencia o el acta. Si no, la calculamos.</span>
          </div>
        </div>
      )}

      <button type="submit" className="boton boton-marcador">
        Calcular lo que paga el FOGASA
      </button>
      {error && (
        <p className="error" role="alert" style={{ marginTop: 16 }}>
          {error}
        </p>
      )}

      {r && (
        <section className="resultado con-euro" aria-live="polite">
          {aviso && <p className="aviso-salario">{aviso}</p>}
          <h2>El FOGASA te pagaría como mucho unos {euros(r.total)} brutos</h2>
          <div className="resultado-cifras">
            <div className="cifra-principal">
              <span className="cifra-nombre">Total del FOGASA</span>
              <span className="cifra-valor">{eurosConCentimos(r.total)}</span>
              <span className="cifra-detalle">brutos, como máximo</span>
            </div>
            {r.salariosDebidos > 0 && (
              <div>
                <span className="cifra-nombre">De los salarios</span>
                <span className="cifra-valor">{eurosConCentimos(r.salariosFogasa)}</span>
                <span className="cifra-detalle">de {euros(r.salariosDebidos)} que te deben</span>
              </div>
            )}
            {conIndemnizacion && (
              <div>
                <span className="cifra-nombre">De la indemnización</span>
                <span className="cifra-valor">{eurosConCentimos(r.indemnizacionFogasa)}</span>
                <span className="cifra-detalle">de {euros(r.indemnizacionDebida)} que te corresponden</span>
              </div>
            )}
          </div>

          <table className="tabla">
            <tbody>
              <tr>
                <td>Tu salario diario</td>
                <td style={{ textAlign: 'right' }}>{eurosConCentimos(r.salarioDiario)}</td>
              </tr>
              <tr>
                <td>Lo que el FOGASA cuenta por día{r.topeDiarioAplicado ? ' (tope de 2026)' : ''}</td>
                <td style={{ textAlign: 'right' }}>{eurosConCentimos(r.salarioDiarioComputado)}</td>
              </tr>
              {r.salariosDebidos > 0 && (
                <tr>
                  <td>Días de salario que cubre (máximo 120)</td>
                  <td style={{ textAlign: 'right' }}>{r.diasSalarioComputados}</td>
                </tr>
              )}
              {conIndemnizacion && (
                <tr>
                  <td>Días de indemnización que cubre ({tipo === 'objetivo' ? '20' : '30'} por año, máximo 365)</td>
                  <td style={{ textAlign: 'right' }}>{r.diasIndemnizacion.toLocaleString('es-ES')}</td>
                </tr>
              )}
            </tbody>
          </table>

          {r.resto > 0.5 && (
            <p className="recuadro">
              Quedarían unos <strong>{euros(r.resto)}</strong> sin cubrir. No se pierden: se siguen reclamando a la empresa, a sus administradores en
              algunos casos, o en el concurso de acreedores.
            </p>
          )}

          <p className="recuadro">
            <strong>El FOGASA no paga solo con pedirlo.</strong> Antes hace falta que lo que te deben esté reconocido (en una conciliación o una sentencia) y
            que la empresa sea insolvente o esté en concurso. Tienes <strong>un año</strong> desde el acta, la sentencia o el auto para pedirlo. Si la
            empresa aún existe, empieza por reclamarle: <Link href="/herramientas/calculadora-salarios-impagados">calcula lo que te debe con intereses</Link>.
          </p>

          <div className="acciones">
            <a
              className="boton"
              href={enlaceWhatsapp(`Hola, mi empresa no me paga y he calculado en la web que el FOGASA me cubriría unos ${euros(r.total)}. Quiero consultar cómo reclamarlo.`)}
            >
              Consultar mi caso
            </a>
            <BotonImprimir />
          </div>
          <p className="letra-pequena">
            Cálculo bruto y orientativo con el salario mínimo de 2026 ({euros(SMI_ANUAL_2026)} al año): el FOGASA cuenta como mucho el doble del salario
            mínimo diario con las pagas extra, unos {eurosConCentimos(TOPE_DIARIO_FOGASA)} al día. No cubre mejoras pactadas por encima de la ley ni conceptos que no sean salario. Dudas: {DESPACHO.telefono}.
          </p>
        </section>
      )}
    </form>
  );
}
