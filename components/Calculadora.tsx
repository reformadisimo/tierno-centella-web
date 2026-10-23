'use client';

import { useMemo, useState } from 'react';
import { calcularIndemnizacion, ultimoDiaParaReclamar, diasHabilesRestantes, leerImporte } from '@/lib/calculos';
import { hoyMadrid, diaSiguiente } from '@/lib/hoy';
import { DESPACHO, enlaceWhatsapp, euros, eurosConCentimos, fechaLarga } from '@/lib/despacho';
import { BotonImprimir, useIrAlResultado, avisoSalarioAnual } from './Utiles';

const corta = (iso: string) => iso.split('-').reverse().join('/');

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
  if (t.anos) partes.push(`${t.anos} ${t.anos === 1 ? 'año' : 'años'}`);
  if (t.meses) partes.push(`${t.meses} ${t.meses === 1 ? 'mes' : 'meses'}`);
  if (t.dias) partes.push(`${t.dias} ${t.dias === 1 ? 'día' : 'días'}`);
  if (partes.length < 2) return partes.join('') || 'menos de un día';
  return `${partes.slice(0, -1).join(', ')} y ${partes[partes.length - 1]}`;
}

const SENALES = [
  { id: 'embarazo', texto: 'Estaba embarazada o he tenido un hijo hace menos de 12 meses' },
  { id: 'reduccion', texto: 'Tenía reducción de jornada, excedencia o permiso por cuidado de hijos' },
  { id: 'baja', texto: 'Estaba de baja médica o acababa de volver' },
  { id: 'reclamacion', texto: 'Había reclamado algo a la empresa, denunciado o ido a Inspección' },
  { id: 'representante', texto: 'Soy representante de los trabajadores' },
  { id: 'acoso', texto: 'Antes del despido sufría acoso o un trato distinto al resto' },
];

type Tipo = 'objetivo' | 'disciplinario';

export default function Calculadora({ despidoInicial = '' }: { despidoInicial?: string }) {
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
    if (!inicio || !despido || !salario) return 'Rellena las dos fechas y el salario para ver el cálculo.';
    if (inicio >= despido) return 'La fecha de entrada en la empresa tiene que ser anterior a la del despido.';
    if (despido > hoyMadrid()) return 'La fecha del despido no puede ser posterior a hoy.';
    if (!(salarioNum > 0)) return 'Escribe el salario bruto anual en euros, por ejemplo 28000.';
    return '';
  }, [enviado, inicio, despido, salario, salarioNum]);

  const listo = enviado && !error;
  const r = listo ? calcularIndemnizacion(inicio, despido, salarioNum) : null;
  useIrAlResultado(r ? `${inicio}|${despido}|${salarioNum}` : '');
  const avisoSalario = listo ? avisoSalarioAnual(salarioNum) : '';

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
    ? `Hola, he usado la calculadora de la web. Despido ${tipo} el ${corta(despido)}, en la empresa desde ${corta(inicio)}, salario ${euros(
        salarioNum,
      )} al año. Me sale ${euros(r.importeImprocedente)} si fuera improcedente.${
        posibleNulidad ? ' Marqué señales de posible nulidad.' : ''
      } Quiero que un abogado revise mi caso.`
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
          <strong>Tipo de despido</strong>
        </legend>
        <div className="opciones">
          <label className="opcion">
            <input type="radio" name="tipo" checked={tipo === 'objetivo'} onChange={() => setTipo('objetivo')} />
            <span>
              <strong>Objetivo</strong>
              <br />
              <span className="campo-ayuda">Por causas económicas, técnicas, organizativas o de producción</span>
            </span>
          </label>
          <label className="opcion">
            <input type="radio" name="tipo" checked={tipo === 'disciplinario'} onChange={() => setTipo('disciplinario')} />
            <span>
              <strong>Disciplinario</strong>
              <br />
              <span className="campo-ayuda">Te acusan de una falta grave: ausencias, desobediencia, rendimiento</span>
            </span>
          </label>
        </div>
      </fieldset>

      <div className="campos-fila">
        <div className="campo">
          <label htmlFor="inicio">Entraste en la empresa el</label>
          <input id="inicio" type="date" value={inicio} onChange={(e) => setInicio(e.target.value)} />
        </div>
        <div className="campo">
          <label htmlFor="despido">Te despidieron el</label>
          <input id="despido" type="date" value={despido} onChange={(e) => setDespido(e.target.value)} />
        </div>
      </div>

      <div className="campos-fila">
        <div className="campo">
          <label htmlFor="salario">Salario bruto anual (€)</label>
          <input
            id="salario"
            type="text"
            inputMode="decimal"
            placeholder="28000"
            value={salario}
            onChange={(e) => setSalario(e.target.value)}
          />
          <span className="campo-ayuda">Con las pagas extra incluidas. Lo encuentras en tu nómina o en tu contrato.</span>
        </div>
        {tipo === 'objetivo' && (
          <div className="campo">
            <label htmlFor="recibido">Indemnización que te han pagado (€)</label>
            <input
              id="recibido"
              type="text"
              inputMode="decimal"
              placeholder="0"
              value={recibido}
              onChange={(e) => setRecibido(e.target.value)}
            />
            <span className="campo-ayuda">Si no te han pagado nada, déjalo vacío.</span>
          </div>
        )}
      </div>

      <fieldset>
        <legend className="campo">
          <strong>¿Te pasaba alguna de estas cosas cuando te despidieron?</strong>
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
        Calcular mi indemnización
      </button>

      {error && (
        <p className="error" role="alert" style={{ marginTop: 16 }}>
          {error}
        </p>
      )}

      {r && (
        <section className="resultado" aria-live="polite">
          {avisoSalario && <p className="aviso-salario">{avisoSalario}</p>}
          <h2>Tu cálculo orientativo</h2>
          <p>
            Has trabajado {describeTiempo(t)}. Tu salario diario es de {eurosConCentimos(r.salarioDiario)}.
          </p>

          <div className="resultado-cifras">
            <div className="cifra-principal">
              <span className="cifra-nombre">Si el despido es improcedente</span>
              <span className="cifra-valor">{euros(r.importeImprocedente)}</span>
              <span className="cifra-detalle">
                {r.diasImprocedente.toLocaleString('es-ES')} días de salario
                {r.aplicaTramo2012 ? ' (45 días por año hasta febrero de 2012 y 33 después)' : ' (33 días por año)'}
              </span>
            </div>
            <div>
              <span className="cifra-nombre">{tipo === 'objetivo' ? 'Lo que te corresponde por despido objetivo' : 'Si se declara procedente'}</span>
              <span className="cifra-valor">{tipo === 'objetivo' ? euros(r.importeObjetivo) : euros(0)}</span>
              <span className="cifra-detalle">
                {tipo === 'objetivo'
                  ? `${r.diasObjetivo.toLocaleString('es-ES')} días de salario (20 días por año)`
                  : 'El despido disciplinario procedente no da derecho a indemnización'}
              </span>
            </div>
          </div>

          {tipo === 'objetivo' && recibidoNum > 0 && recibidoNum < r.importeObjetivo - 1 && (
            <p className="recuadro">
              Te han pagado {euros(recibidoNum)}, {euros(r.importeObjetivo - recibidoNum)} menos de lo que marca la ley para un
              despido objetivo. Si no es un error excusable, eso puede convertir el despido en improcedente.
            </p>
          )}
          {tipo === 'objetivo' && !recibido && (
            <p className="recuadro">
              Si no te pagaron la indemnización el mismo día que te dieron la carta, el despido objetivo puede ser improcedente.
            </p>
          )}

          {posibleNulidad && (
            <div className="alerta-nulidad">
              <p>
                <strong>Tu despido podría ser nulo.</strong> Has marcado una situación que la ley protege especialmente. Si se
                declara nulo, la empresa tiene que readmitirte y pagarte los salarios que has dejado de cobrar, y puedes reclamar
                además una indemnización por daños.
              </p>
            </div>
          )}

          {quedan > 0 ? (
            <p>
              <strong>
                Te {quedan === 1 ? 'queda 1 día hábil' : `quedan ${quedan} días hábiles`} para reclamar
              </strong>{' '}
              (último día aproximado: {fechaLarga(ultimo)}).
            </p>
          ) : (
            <p className="cuenta-vencida">El plazo de 20 días hábiles terminó el {fechaLarga(ultimo)}. Llámanos igualmente.</p>
          )}

          <div className="acciones">
            <a className="boton" href={enlaceWhatsapp(resumen)}>
              Enviar mi caso por WhatsApp
            </a>
            <BotonImprimir />
            <a className="boton boton-claro" href={DESPACHO.telefonoHref}>
              Llamar al {DESPACHO.telefono}
            </a>
          </div>
          <p className="letra-pequena">
            Cálculo orientativo con la ley general. Tu convenio, los complementos salariales o una antigüedad reconocida distinta
            pueden cambiar la cifra. Llámanos y te decimos si tu caso necesita una consulta.
          </p>
        </section>
      )}
    </form>
  );
}
