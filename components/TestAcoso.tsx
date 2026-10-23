'use client';

import { useState } from 'react';
import Link from 'next/link';
import { DESPACHO, enlaceWhatsapp } from '@/lib/despacho';

// Conductas típicas de acoso laboral, agrupadas como en la literatura sobre mobbing (aislamiento,
// ataques al trabajo, a la persona y a la comunicación). El test orienta; no diagnostica.
const CONDUCTAS = [
  'Te gritan, te insultan o te hablan con desprecio.',
  'Te critican o ridiculizan delante de otras personas.',
  'Te han quitado funciones o te dejan sin trabajo que hacer.',
  'Te mandan tareas imposibles, absurdas o muy por debajo de tu puesto.',
  'Te excluyen de reuniones, correos o información que necesitas.',
  'Te cambian de sitio, de horario o de turno para apartarte.',
  'Te vigilan o controlan más que al resto.',
  'Se difunden rumores o mentiras sobre ti.',
  'Te amenazan con el despido o con sanciones sin motivo.',
  'Te niegan permisos, vacaciones o formación que a otros sí conceden.',
];

const FRECUENCIAS = [
  { valor: 0, texto: 'Nunca' },
  { valor: 1, texto: 'Alguna vez' },
  { valor: 2, texto: 'Cada semana' },
  { valor: 3, texto: 'Casi a diario' },
];

const DURACIONES = [
  { valor: 0, texto: 'Menos de un mes' },
  { valor: 1, texto: 'De uno a seis meses' },
  { valor: 2, texto: 'Más de seis meses' },
];

export default function TestAcoso() {
  const [respuestas, setRespuestas] = useState<Record<number, number>>({});
  const [duracion, setDuracion] = useState<number | null>(null);
  const [quien, setQuien] = useState('');
  const [salud, setSalud] = useState<boolean | null>(null);
  const [verResultado, setVerResultado] = useState(false);

  const respondidas = Object.keys(respuestas).length + (duracion !== null ? 1 : 0) + (quien ? 1 : 0) + (salud !== null ? 1 : 0);
  const total = CONDUCTAS.length + 3;
  const completo = respondidas === total;

  const frecuentes = Object.values(respuestas).filter((v) => v >= 2).length;
  const presentes = Object.values(respuestas).filter((v) => v >= 1).length;

  let nivel: 'alto' | 'medio' | 'bajo' = 'bajo';
  if (frecuentes >= 2 && (duracion ?? 0) >= 1) nivel = 'alto';
  else if (presentes >= 3 || frecuentes >= 1) nivel = 'medio';

  const resumen = `Hola, he hecho el test de acoso de la web. Conductas que sufro cada semana o a diario: ${frecuentes}. Desde hace: ${
    DURACIONES.find((d) => d.valor === duracion)?.texto.toLowerCase() ?? '-'
  }. Viene de: ${quien || '-'}. ${salud ? 'Me está afectando a la salud.' : ''} Quiero que un abogado lo valore.`;

  return (
    <div className="herramienta">
      <div className="progreso" aria-hidden="true">
        <span style={{ width: `${(respondidas / total) * 100}%` }} />
      </div>
      <p className="campo-ayuda" style={{ marginTop: -8 }}>
        {respondidas} de {total} preguntas. No pedimos ningún dato personal.
      </p>

      <h2 style={{ fontSize: '1.2rem', margin: '16px 0' }}>¿Con qué frecuencia te pasa?</h2>
      {CONDUCTAS.map((c, i) => (
        <fieldset className="pregunta-test" key={c}>
          <legend>{c}</legend>
          <div className="escala">
            {FRECUENCIAS.map((f) => (
              <label key={f.valor}>
                <input
                  type="radio"
                  name={`c${i}`}
                  checked={respuestas[i] === f.valor}
                  onChange={() => setRespuestas((r) => ({ ...r, [i]: f.valor }))}
                />
                {f.texto}
              </label>
            ))}
          </div>
        </fieldset>
      ))}

      <fieldset className="pregunta-test">
        <legend>¿Desde cuándo?</legend>
        <div className="escala">
          {DURACIONES.map((d) => (
            <label key={d.valor}>
              <input type="radio" name="duracion" checked={duracion === d.valor} onChange={() => setDuracion(d.valor)} />
              {d.texto}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="pregunta-test">
        <legend>¿De quién viene sobre todo?</legend>
        <div className="escala">
          {['Un jefe o superior', 'Compañeros', 'Personas a mi cargo', 'Varios a la vez'].map((q) => (
            <label key={q}>
              <input type="radio" name="quien" checked={quien === q} onChange={() => setQuien(q)} />
              {q}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="pregunta-test">
        <legend>¿Te está afectando a la salud (sueño, ansiedad, bajas)?</legend>
        <div className="escala">
          {[
            { v: true, t: 'Sí' },
            { v: false, t: 'No' },
          ].map((o) => (
            <label key={o.t}>
              <input type="radio" name="salud" checked={salud === o.v} onChange={() => setSalud(o.v)} />
              {o.t}
            </label>
          ))}
        </div>
      </fieldset>

      <button type="button" className="boton boton-marcador" disabled={!completo} onClick={() => setVerResultado(true)}>
        {completo ? 'Ver mi resultado' : `Faltan ${total - respondidas} respuestas`}
      </button>

      {verResultado && completo && (
        <section className="resultado" aria-live="polite">
          {nivel === 'alto' && (
            <div className="veredicto veredicto-alto">
              <h3>Lo que describes tiene los rasgos del acoso laboral</h3>
              <p>
                Conductas hostiles que se repiten cada semana o a diario y que duran meses: eso es lo que los jueces llaman acoso. No es
                una certeza, pero sí motivo para actuar ya y empezar a reunir pruebas.
              </p>
            </div>
          )}
          {nivel === 'medio' && (
            <div className="veredicto">
              <h3>Hay señales que conviene vigilar</h3>
              <p>
                Varias conductas se repiten, aunque aún no con la frecuencia o la duración del acoso típico. Apunta cada episodio con fecha:
                si siguen, tendrás la prueba.
              </p>
            </div>
          )}
          {nivel === 'bajo' && (
            <div className="veredicto">
              <h3>Por lo que cuentas, parece más un conflicto puntual</h3>
              <p>
                Un mal ambiente o una discusión no son acoso, pero también pueden tener solución. Si algo de lo que vives no aparece en el
                test, cuéntanoslo.
              </p>
            </div>
          )}
          {salud && (
            <p className="recuadro">
              Si te está afectando a la salud, ve al médico y explícale el origen. Ese informe es una prueba, y la baja puede reconocerse como
              accidente de trabajo. <Link href="/acoso-laboral/baja-por-ansiedad-por-acoso">Cómo funciona la baja por ansiedad</Link>.
            </p>
          )}
          <h3 style={{ margin: '20px 0 8px' }}>Tu siguiente paso</h3>
          <ul className="prosa">
            <li>
              <Link href="/herramientas/mapa-de-pruebas">Revisa qué pruebas tienes y cuáles te faltan</Link>.
            </li>
            <li>
              <Link href="/acoso-laboral/que-puedo-reclamar">Qué puedes reclamar</Link> y por qué vía.
            </li>
          </ul>
          <div className="acciones">
            <a className="boton" href={enlaceWhatsapp(resumen)}>
              Enviar mi resultado por WhatsApp
            </a>
            <a className="boton boton-claro" href={DESPACHO.telefonoHref}>
              Llamar al {DESPACHO.telefono}
            </a>
          </div>
          <p className="letra-pequena">
            Este test orienta y no sustituye la valoración de un abogado. Si en algún momento sientes que no puedes más o piensas en hacerte
            daño, llama al 024: es gratuito y atiende las 24 horas.
          </p>
        </section>
      )}
    </div>
  );
}
