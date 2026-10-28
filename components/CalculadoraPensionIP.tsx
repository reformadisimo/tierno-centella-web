'use client';

import { useState } from 'react';
import Link from 'next/link';
import { calcularPensionIP, leerImporte, PENSION_MAXIMA_2026, type GradoIP, type OrigenIP } from '@/lib/calculos';
import { DESPACHO, enlaceWhatsapp, euros, eurosConCentimos } from '@/lib/despacho';
import { BotonImprimir, useIrAlResultado, avisoSalarioAnual } from './Utiles';

const GRADOS: { id: GradoIP; titulo: string; texto: string }[] = [
  { id: 'parcial', titulo: 'Parcial', texto: 'Rindes al menos un 33 % menos en tu trabajo, pero puedes seguir en él.' },
  { id: 'total', titulo: 'Total', texto: 'No puedes hacer tu trabajo de siempre, pero sí otro distinto.' },
  { id: 'absoluta', titulo: 'Absoluta', texto: 'No puedes hacer ningún trabajo.' },
  { id: 'gran', titulo: 'Gran incapacidad', texto: 'Además necesitas ayuda de otra persona para lo básico: vestirte, comer, moverte.' },
];

const ORIGENES: { id: OrigenIP; titulo: string; texto: string }[] = [
  { id: 'comun', titulo: 'Enfermedad común', texto: 'Una enfermedad que no ha causado el trabajo.' },
  { id: 'no-laboral', titulo: 'Accidente fuera del trabajo', texto: 'En casa, haciendo deporte, de vacaciones...' },
  { id: 'trabajo', titulo: 'Accidente de trabajo o enfermedad profesional', texto: 'Ocurrió trabajando o lo causó el trabajo.' },
];

const FRASE: Record<GradoIP, string> = { parcial: 'una incapacidad parcial', total: 'una incapacidad total', absoluta: 'una incapacidad absoluta', gran: 'una gran incapacidad' };

export default function CalculadoraPensionIP() {
  const [grado, setGrado] = useState<GradoIP>('total');
  const [origen, setOrigen] = useState<OrigenIP>('comun');
  const [salario, setSalario] = useState('');
  const [edad, setEdad] = useState('');
  const [anios, setAnios] = useState('');
  const [cualificada, setCualificada] = useState(false);
  const [enviado, setEnviado] = useState(false);

  const s = leerImporte(salario);
  const e = Math.round(leerImporte(edad));
  const a = leerImporte(anios);
  const error = !enviado
    ? ''
    : !(s > 0)
      ? 'Escribe tu salario bruto anual, por ejemplo 24000.'
      : !(e >= 16 && e <= 70)
        ? 'Escribe tu edad (entre 16 y 70 años).'
        : !(a >= 0 && a <= e - 14)
          ? 'Escribe cuántos años has cotizado en total, por ejemplo 20.'
          : '';
  const r = enviado && !error ? calcularPensionIP({ grado, origen, salarioAnual: s, edad: e, aniosCotizados: a, cualificada }) : null;
  useIrAlResultado(enviado && !error ? JSON.stringify(r) : '');
  const aviso = r ? avisoSalarioAnual(s) : '';

  return (
    <form
      className="calculadora"
      noValidate
      onSubmit={(ev) => {
        ev.preventDefault();
        setEnviado(true);
      }}
    >
      <fieldset>
        <legend className="campo">
          <strong>¿Qué grado te han reconocido, o crees que te corresponde?</strong>
        </legend>
        <div className="opciones">
          {GRADOS.map((t) => (
            <label key={t.id} className="opcion">
              <input type="radio" name="grado" checked={grado === t.id} onChange={() => setGrado(t.id)} />
              <span>
                <strong>{t.titulo}</strong>
                <br />
                {t.texto}
              </span>
            </label>
          ))}
        </div>
        <span className="campo-ayuda">
          ¿No lo sabes? <Link href="/herramientas/comprobador-incapacidad">El comprobador de incapacidad</Link> te orienta en un minuto.
        </span>
      </fieldset>

      <fieldset>
        <legend className="campo">
          <strong>¿De dónde viene?</strong>
        </legend>
        <div className="opciones">
          {ORIGENES.map((t) => (
            <label key={t.id} className="opcion">
              <input type="radio" name="origen" checked={origen === t.id} onChange={() => setOrigen(t.id)} />
              <span>
                <strong>{t.titulo}</strong>
                <br />
                {t.texto}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="campos-fila">
        <div className="campo">
          <label htmlFor="salario">Salario bruto anual (€)</label>
          <input id="salario" type="text" inputMode="decimal" placeholder="24000" value={salario} onChange={(ev) => setSalario(ev.target.value)} />
          <span className="campo-ayuda">El de los últimos años, con las pagas extra.</span>
        </div>
        <div className="campo">
          <label htmlFor="edad">Tu edad</label>
          <input id="edad" type="text" inputMode="numeric" placeholder="50" value={edad} onChange={(ev) => setEdad(ev.target.value)} />
        </div>
        <div className="campo">
          <label htmlFor="anios">Años cotizados en total</label>
          <input id="anios" type="text" inputMode="decimal" placeholder="20" value={anios} onChange={(ev) => setAnios(ev.target.value)} />
          <span className="campo-ayuda">Lo ves en tu vida laboral.</span>
        </div>
      </div>

      {grado === 'total' && (
        <label className="opcion" style={{ maxWidth: 560, marginBottom: 20 }}>
          <input type="checkbox" checked={cualificada} onChange={(ev) => setCualificada(ev.target.checked)} />
          <span>Tengo 55 años o más y no creo que encuentre otro trabajo (la llamada total cualificada: un 20 % más)</span>
        </label>
      )}

      <button type="submit" className="boton boton-marcador">
        Calcular mi pensión
      </button>
      {error && (
        <p className="error" role="alert" style={{ marginTop: 16 }}>
          {error}
        </p>
      )}

      {r && grado === 'parcial' && (
        <section className="resultado con-euro" aria-live="polite">
          {aviso && <p className="aviso-salario">{aviso}</p>}
          <h2>La parcial no es una pensión: es un pago único de unos {euros(r.pagoUnico)}</h2>
          <div className="resultado-cifras">
            <div className="cifra-principal">
              <span className="cifra-nombre">Pago único</span>
              <span className="cifra-valor">{eurosConCentimos(r.pagoUnico)}</span>
              <span className="cifra-detalle">24 veces tu base mensual</span>
            </div>
          </div>
          <p className="recuadro">
            Con la parcial sigues en tu trabajo y la empresa tiene que mantenerte el puesto. Si en realidad no puedes hacer tus tareas principales, quizá te
            corresponda la total: <Link href="/incapacidad-permanente/grados-de-incapacidad-permanente">mira la diferencia entre grados</Link>.
          </p>
          <Acciones texto={`Hola, he calculado en la web una incapacidad parcial de unos ${euros(r.pagoUnico)}. Quiero consultar mi caso.`} />
        </section>
      )}

      {r && grado !== 'parcial' && (
        <section className="resultado con-euro" aria-live="polite">
          {aviso && <p className="aviso-salario">{aviso}</p>}
          <h2>
            Con {FRASE[grado]} cobrarías unos {euros(r.porPaga + r.complementoGran)} al mes, en {r.pagas} pagas
          </h2>
          <div className="resultado-cifras">
            <div className="cifra-principal">
              <span className="cifra-nombre">Cada paga</span>
              <span className="cifra-valor">{eurosConCentimos(r.porPaga + r.complementoGran)}</span>
              <span className="cifra-detalle">brutos, {r.pagas} pagas al año</span>
            </div>
            <div>
              <span className="cifra-nombre">Al año</span>
              <span className="cifra-valor">{eurosConCentimos(r.anual)}</span>
              <span className="cifra-detalle">brutos</span>
            </div>
            <div>
              <span className="cifra-nombre">Porcentaje</span>
              <span className="cifra-valor">{r.porcentajeGrado} %</span>
              <span className="cifra-detalle">de tu base reguladora</span>
            </div>
          </div>

          <table className="tabla tabla-fichas">
            <thead>
              <tr>
                <th>Paso</th>
                <th>Cálculo</th>
                <th>Resultado</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Base reguladora</td>
                <td data-label="Cálculo">
                  {origen === 'comun'
                    ? 'Tus bases de cotización de los últimos 8 años, divididas entre 112'
                    : origen === 'no-laboral'
                      ? 'Tus bases de 24 meses de los últimos 7 años, divididas entre 28'
                      : 'Tu salario real del último año, dividido entre 12'}
                </td>
                <td data-label="Resultado">{eurosConCentimos(origen === 'comun' ? (r.baseReguladora * 100) / r.porcentajeAnios : r.baseReguladora)}</td>
              </tr>
              {origen === 'comun' && (
                <tr>
                  <td>Por años cotizados</td>
                  <td data-label="Cálculo">
                    Cuentan los que has cotizado y los que te faltan hasta jubilarte: unos {Math.round(r.aniosComputados)} años
                  </td>
                  <td data-label="Resultado">{r.porcentajeAnios} %</td>
                </tr>
              )}
              <tr>
                <td>Por el grado</td>
                <td data-label="Cálculo">
                  {grado === 'total' ? (r.porcentajeGrado === 75 ? 'Total cualificada: 55 % + 20 %' : 'Total: 55 %') : 'Absoluta: 100 %'}
                </td>
                <td data-label="Resultado">{eurosConCentimos(r.porPaga)}</td>
              </tr>
              {grado === 'gran' && (
                <tr>
                  <td>Complemento por ayuda</td>
                  <td data-label="Cálculo">45 % de la base mínima de cotización más 30 % de tu última base</td>
                  <td data-label="Resultado">{eurosConCentimos(r.complementoGran)}</td>
                </tr>
              )}
            </tbody>
          </table>

          {r.topeAplicado && (
            <p className="recuadro">
              Tu cálculo pasa de la pensión máxima de 2026 ({eurosConCentimos(PENSION_MAXIMA_2026)} en 14 pagas), así que te hemos aplicado ese tope.
            </p>
          )}

          {origen !== 'trabajo' && (
            <p className="recuadro">
              <strong>Si tu incapacidad viniera del trabajo, podrías cobrar más:</strong> se calcula con tu salario real del último año (horas extra
              incluidas), sin la reducción por años cotizados, y se puede pedir un recargo del 30 % al 50 % si la empresa falló en prevención. Pasa mucho con lesiones de espalda o con la ansiedad por acoso.{' '}
              <Link href="/herramientas/genera-tu-carta?carta=contingencia">Carta para pedir que se revise el origen</Link>
            </p>
          )}

          {origen === 'comun' && r.porcentajeAnios < 100 && (
            <p className="recuadro">
              Te aplicamos el {r.porcentajeAnios} % por los años cotizados: no llegas a los 36 años y medio que dan el 100 %, ni sumando los que te faltan hasta
              jubilarte.
            </p>
          )}

          <p className="recuadro">
            Si la cifra queda por debajo de la pensión mínima y tus ingresos son bajos, la Seguridad Social te puede completar hasta ella. Y si el INSS te
            reconoce menos de lo que crees, tienes 30 días hábiles para reclamar:{' '}
            <Link href="/incapacidad-permanente/reclamacion-previa-y-demanda">cómo se hace</Link>.
          </p>

          <Acciones
            texto={`Hola, he calculado en la web que con ${FRASE[grado]} cobraría unos ${euros(r.porPaga + r.complementoGran)} al mes. Quiero consultar mi caso.`}
          />
          <p className="letra-pequena">
            Cálculo bruto y orientativo con las cifras de 2026. Suponemos que has cotizado por una base parecida en los últimos años: la Seguridad Social usa
            tus bases reales, actualiza las más antiguas con el IPC y rellena los meses sin cotizar, así que tu cifra puede variar. Del importe se descuenta
            el IRPF, aunque la absoluta y la gran incapacidad están exentas. Tienes todas las dudas en{' '}
            <Link href="/incapacidad-permanente/preguntas-frecuentes-incapacidad-permanente">las 50 preguntas frecuentes</Link>. Dudas: {DESPACHO.telefono}.
          </p>
        </section>
      )}
    </form>
  );
}

function Acciones({ texto }: { texto: string }) {
  return (
    <div className="acciones">
      <a className="boton" href={enlaceWhatsapp(texto)}>
        Consultar mi caso
      </a>
      <BotonImprimir />
    </div>
  );
}
