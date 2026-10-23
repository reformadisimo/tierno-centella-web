'use client';

import { useMemo, useState } from 'react';
import { calcularIndemnizacion, ultimoDiaParaReclamar, diasHabilesRestantes, leerImporte } from '@/lib/calculos';
import { hoyMadrid, diaSiguiente } from '@/lib/hoy';
import { DESPACHO, enlaceWhatsapp } from '@/lib/despacho';
import { useIrAlResultado } from '../Utiles';
import { BotonImprimirEn, avisoSalarioAnualEn, eurosEn, eurosCentimosEn, fechaLargaEn, fechaCortaEn, numeroEn } from './UtilesCalcEn';

function tiempoTrabajado(desde: string, hasta: string) {
  const [a1, m1, d1] = desde.split('-').map(Number);
  const [a2, m2, d2] = hasta.split('-').map(Number);
  let anos = a2 - a1;
  let meses = m2 - m1;
  let dias = d2 - d1;
  if (dias < 0) {
    meses -= 1;
    dias += new Date(Date.UTC(a2, m2 - 1, 0)).getUTCDate();
  }
  if (meses < 0) {
    anos -= 1;
    meses += 12;
  }
  return { anos, meses, dias };
}

function describeTiempo(t: { anos: number; meses: number; dias: number }) {
  const partes = [] as string[];
  if (t.anos) partes.push(`${t.anos} ${t.anos === 1 ? 'year' : 'years'}`);
  if (t.meses) partes.push(`${t.meses} ${t.meses === 1 ? 'month' : 'months'}`);
  if (t.dias) partes.push(`${t.dias} ${t.dias === 1 ? 'day' : 'days'}`);
  if (partes.length < 2) return partes.join('') || 'less than a day';
  return `${partes.slice(0, -1).join(', ')} and ${partes[partes.length - 1]}`;
}

const SENALES = [
  { id: 'embarazo', texto: 'I was pregnant or had a child less than 12 months ago' },
  { id: 'reduccion', texto: 'I had reduced working hours, a leave of absence (excedencia) or childcare leave' },
  { id: 'baja', texto: 'I was on sick leave (baja médica) or had just come back' },
  { id: 'reclamacion', texto: 'I had made a claim against the company, filed a complaint or gone to the Labour Inspectorate' },
  { id: 'representante', texto: "I am a workers' representative" },
  { id: 'acoso', texto: 'Before the dismissal I was being harassed or treated differently from everyone else' },
];

type Tipo = 'objetivo' | 'disciplinario';

const NOMBRE_TIPO: Record<Tipo, string> = { objetivo: 'objective', disciplinario: 'disciplinary' };

export default function CalculadoraEn({ despidoInicial = '' }: { despidoInicial?: string }) {
  const [inicio, setInicio] = useState('');
  const [despido, setDespido] = useState(despidoInicial);
  const [salario, setSalario] = useState('');
  const [tipo, setTipo] = useState<Tipo>('objetivo');
  const [recibido, setRecibido] = useState('');
  const [senales, setSenales] = useState<string[]>([]);
  const [enviado, setEnviado] = useState(false);

  const salarioNum = leerImporte(salario);
  const recibidoNum = recibido ? leerImporte(recibido) : 0;

  const error = useMemo(() => {
    if (!enviado) return '';
    if (!inicio || !despido || !salario) return 'Fill in both dates and your salary to see the calculation.';
    if (inicio >= despido) return 'The date you joined the company must be earlier than the dismissal date.';
    if (despido > hoyMadrid()) return 'The dismissal date cannot be later than today.';
    if (!(salarioNum > 0)) return 'Enter your gross annual salary in euros, for example 28000.';
    return '';
  }, [enviado, inicio, despido, salario, salarioNum]);

  const listo = enviado && !error;
  const r = listo ? calcularIndemnizacion(inicio, despido, salarioNum) : null;
  useIrAlResultado(r ? `${inicio}|${despido}|${salarioNum}` : '');
  const avisoSalario = listo ? avisoSalarioAnualEn(salarioNum) : '';

  let quedan = 0;
  let ultimo = '';
  if (listo) {
    const hoy = hoyMadrid();
    ultimo = ultimoDiaParaReclamar(despido);
    quedan = diasHabilesRestantes(hoy > despido ? hoy : diaSiguiente(despido), ultimo);
  }

  const posibleNulidad = senales.length > 0;
  const t = listo ? tiempoTrabajado(inicio, despido) : { anos: 0, meses: 0, dias: 0 };

  const resumen = r
    ? `Hello, I have used the calculator on your website. ${NOMBRE_TIPO[tipo][0].toUpperCase() + NOMBRE_TIPO[tipo].slice(1)} dismissal on ${fechaCortaEn(
        despido,
      )}, with the company since ${fechaCortaEn(inicio)}, salary ${eurosEn(salarioNum)} a year. It comes to ${eurosEn(
        r.importeImprocedente,
      )} if the dismissal were unfair.${posibleNulidad ? ' I ticked signs of a possibly void dismissal.' : ''} I would like a lawyer to review my case.`
    : '';

  function alternarSenal(id: string) {
    setSenales((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  }

  return (
    <form
      className="calculadora"
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        setEnviado(true);
      }}
    >
      <fieldset>
        <legend className="campo">
          <strong>Type of dismissal</strong>
        </legend>
        <div className="opciones">
          <label className="opcion">
            <input type="radio" name="tipo" checked={tipo === 'objetivo'} onChange={() => setTipo('objetivo')} />
            <span>
              <strong>Objective (despido objetivo)</strong>
              <br />
              <span className="campo-ayuda">For economic, technical, organisational or production reasons</span>
            </span>
          </label>
          <label className="opcion">
            <input type="radio" name="tipo" checked={tipo === 'disciplinario'} onChange={() => setTipo('disciplinario')} />
            <span>
              <strong>Disciplinary (despido disciplinario)</strong>
              <br />
              <span className="campo-ayuda">You are accused of serious misconduct: absences, disobedience, performance</span>
            </span>
          </label>
        </div>
      </fieldset>

      <div className="campos-fila">
        <div className="campo">
          <label htmlFor="inicio">You joined the company on</label>
          <input id="inicio" type="date" value={inicio} onChange={(e) => setInicio(e.target.value)} />
        </div>
        <div className="campo">
          <label htmlFor="despido">You were dismissed on</label>
          <input id="despido" type="date" value={despido} onChange={(e) => setDespido(e.target.value)} />
        </div>
      </div>

      <div className="campos-fila">
        <div className="campo">
          <label htmlFor="salario">Gross annual salary (€)</label>
          <input
            id="salario"
            type="text"
            inputMode="decimal"
            placeholder="28000"
            value={salario}
            onChange={(e) => setSalario(e.target.value)}
          />
          <span className="campo-ayuda">Including the extra payments (pagas extra). You will find it on your payslip or in your contract.</span>
        </div>
        {tipo === 'objetivo' && (
          <div className="campo">
            <label htmlFor="recibido">Compensation you have been paid (€)</label>
            <input
              id="recibido"
              type="text"
              inputMode="decimal"
              placeholder="0"
              value={recibido}
              onChange={(e) => setRecibido(e.target.value)}
            />
            <span className="campo-ayuda">If you have not been paid anything, leave it blank.</span>
          </div>
        )}
      </div>

      <fieldset>
        <legend className="campo">
          <strong>Did any of these apply to you when you were dismissed?</strong>
        </legend>
        <div className="casillas">
          {SENALES.map((s) => (
            <label key={s.id} className="casilla">
              <input type="checkbox" checked={senales.includes(s.id)} onChange={() => alternarSenal(s.id)} />
              <span>{s.texto}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <button type="submit" className="boton boton-marcador">
        Calculate my compensation
      </button>

      {error && (
        <p className="error" role="alert" style={{ marginTop: 16 }}>
          {error}
        </p>
      )}

      {r && (
        <section className="resultado" aria-live="polite">
          {avisoSalario && <p className="aviso-salario">{avisoSalario}</p>}
          <h2>Your estimate</h2>
          <p>
            You have worked {describeTiempo(t)}. Your daily salary is {eurosCentimosEn(r.salarioDiario)}.
          </p>

          <div className="resultado-cifras">
            <div className="cifra-principal">
              <span className="cifra-nombre">If the dismissal is unfair (improcedente)</span>
              <span className="cifra-valor">{eurosEn(r.importeImprocedente)}</span>
              <span className="cifra-detalle">
                {numeroEn(r.diasImprocedente)} days of salary
                {r.aplicaTramo2012 ? ' (45 days per year until February 2012 and 33 after that)' : ' (33 days per year)'}
              </span>
            </div>
            <div>
              <span className="cifra-nombre">{tipo === 'objetivo' ? 'What you are owed for an objective dismissal' : 'If it is ruled fair (procedente)'}</span>
              <span className="cifra-valor">{tipo === 'objetivo' ? eurosEn(r.importeObjetivo) : eurosEn(0)}</span>
              <span className="cifra-detalle">
                {tipo === 'objetivo'
                  ? `${numeroEn(r.diasObjetivo)} days of salary (20 days per year)`
                  : 'A fair disciplinary dismissal does not entitle you to compensation'}
              </span>
            </div>
          </div>

          {tipo === 'objetivo' && recibidoNum > 0 && recibidoNum < r.importeObjetivo - 1 && (
            <p className="recuadro">
              You have been paid {eurosEn(recibidoNum)}, {eurosEn(r.importeObjetivo - recibidoNum)} less than the law sets for an objective
              dismissal. Unless it is an excusable mistake, that can make the dismissal unfair.
            </p>
          )}
          {tipo === 'objetivo' && !recibido && (
            <p className="recuadro">
              If you were not paid the compensation on the same day you were given the letter, the objective dismissal may be unfair.
            </p>
          )}

          {posibleNulidad && (
            <div className="alerta-nulidad">
              <p>
                <strong>Your dismissal could be void (despido nulo).</strong> You have ticked a situation that the law gives special protection. If
                it is ruled void, the company has to take you back and pay the wages you have missed, and you can also claim compensation for
                damages.
              </p>
            </div>
          )}

          {quedan > 0 ? (
            <p>
              <strong>
                You have {quedan === 1 ? '1 working day' : `${quedan} working days`} left to challenge it
              </strong>{' '}
              (approximate last day: {fechaLargaEn(ultimo)}).
            </p>
          ) : (
            <p className="cuenta-vencida">The 20-working-day deadline ended on {fechaLargaEn(ultimo)}. Call us anyway.</p>
          )}

          <div className="acciones">
            <a className="boton" href={enlaceWhatsapp(resumen)}>
              Send my case on WhatsApp
            </a>
            <BotonImprimirEn />
            <a className="boton boton-claro" href={DESPACHO.telefonoHref}>
              Call {DESPACHO.telefono}
            </a>
          </div>
          <p className="letra-pequena">
            An estimate based on the general law. Your collective agreement (convenio), salary supplements or a different recognised length of
            service can change the figure. Call us and we will tell you whether your case needs a consultation.
          </p>
        </section>
      )}
    </form>
  );
}
