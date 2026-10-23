'use client';

import { useState } from 'react';
import Link from 'next/link';
import { sumarHabiles } from '@/lib/calculos';
import { hoyMadrid } from '@/lib/hoy';
import { DESPACHO, enlaceWhatsapp, fechaLarga } from '@/lib/despacho';
import { BotonImprimir } from './Utiles';

const SITUACIONES = [
  { id: 'denegada', texto: 'Me la han denegado' },
  { id: 'menor', texto: 'Me han dado un grado menor del que creo que me corresponde' },
  { id: 'sinpedir', texto: 'Todavía no la he pedido' },
  { id: 'concedida', texto: 'Me la han concedido y no sé qué pasa con mi trabajo' },
];

const CAPACIDADES = [
  { id: 'algo', texto: 'Puedo hacer mi trabajo, pero rindo bastante menos' },
  { id: 'mio', texto: 'No puedo hacer mi trabajo habitual, pero sí otros' },
  { id: 'ninguno', texto: 'No puedo trabajar en nada' },
  { id: 'ayuda', texto: 'Además necesito ayuda de otra persona para el día a día' },
];

const GRADO: Record<string, { nombre: string; cuantia: string }> = {
  algo: { nombre: 'incapacidad permanente parcial', cuantia: 'un pago único de 24 mensualidades de tu base reguladora' },
  mio: { nombre: 'incapacidad permanente total', cuantia: 'el 55 % de tu base reguladora cada mes (el 75 % desde los 55 años si no encuentras otro empleo)' },
  ninguno: { nombre: 'incapacidad permanente absoluta', cuantia: 'el 100 % de tu base reguladora cada mes' },
  ayuda: { nombre: 'gran incapacidad', cuantia: 'la pensión de la absoluta más un complemento para pagar esa ayuda' },
};

export default function ComprobadorIncapacidad() {
  const [situacion, setSituacion] = useState('');
  const [capacidad, setCapacidad] = useState('');
  const [origen, setOrigen] = useState('');
  const [fecha, setFecha] = useState('');
  const hoy = hoyMadrid();

  const necesitaFecha = situacion === 'denegada' || situacion === 'menor';
  const listo = situacion && (situacion === 'concedida' || capacidad) && (!necesitaFecha || fecha);
  const ultimo = necesitaFecha && fecha ? sumarHabiles(fecha, 30) : '';
  const grado = GRADO[capacidad];

  return (
    <div className="herramienta">
      <fieldset className="pregunta-test">
        <legend>¿En qué punto estás?</legend>
        <div className="opciones">
          {SITUACIONES.map((s) => (
            <label key={s.id} className="opcion">
              <input type="radio" name="sit" checked={situacion === s.id} onChange={() => setSituacion(s.id)} />
              <span>{s.texto}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {situacion && situacion !== 'concedida' && (
        <fieldset className="pregunta-test">
          <legend>¿Cuál de estas frases describe mejor tu situación?</legend>
          <div className="opciones">
            {CAPACIDADES.map((c) => (
              <label key={c.id} className="opcion">
                <input type="radio" name="cap" checked={capacidad === c.id} onChange={() => setCapacidad(c.id)} />
                <span>{c.texto}</span>
              </label>
            ))}
          </div>
        </fieldset>
      )}

      {situacion && situacion !== 'concedida' && (
        <fieldset className="pregunta-test">
          <legend>¿De dónde viene tu problema de salud?</legend>
          <div className="escala">
            {['Una enfermedad común', 'Un accidente o una enfermedad por el trabajo', 'Ansiedad o depresión por acoso laboral'].map((o) => (
              <label key={o}>
                <input type="radio" name="origen" checked={origen === o} onChange={() => setOrigen(o)} />
                {o}
              </label>
            ))}
          </div>
        </fieldset>
      )}

      {necesitaFecha && (
        <div className="campo">
          <label htmlFor="fecha-inss">Fecha en que recibiste la resolución del INSS</label>
          <input id="fecha-inss" type="date" max={hoy} value={fecha} onChange={(e) => setFecha(e.target.value)} />
        </div>
      )}

      {listo && (
        <section className="resultado" aria-live="polite">
          {situacion === 'concedida' ? (
            <div className="veredicto">
              <h3>Tu contrato no se extingue automáticamente</h3>
              <p>
                Desde la Ley 2/2025, la incapacidad permanente ya no pone fin al contrato de forma automática. Puedes pedir seguir en la
                empresa y esta debe intentar adaptar tu puesto o recolocarte. Los plazos son cortos.{' '}
                <Link href="/incapacidad-permanente/incapacidad-y-contrato-ley-2-2025">Cómo funciona</Link>.
              </p>
            </div>
          ) : (
            <>
              {ultimo && (
                <div className={ultimo < hoy ? 'cuenta-vencida' : 'veredicto veredicto-alto'}>
                  <h3>
                    {ultimo < hoy
                      ? `El plazo de reclamación previa terminó el ${fechaLarga(ultimo)}`
                      : `Tienes hasta el ${fechaLarga(ultimo)} para la reclamación previa`}
                  </h3>
                  <p style={{ margin: 0 }}>
                    {ultimo < hoy
                      ? 'Llámanos: a veces se puede volver a solicitar o hay otras vías.'
                      : 'Son 30 días hábiles desde que recibiste la resolución. Es el paso obligatorio antes de ir a juicio.'}
                  </p>
                </div>
              )}
              {grado && (
                <div className="veredicto">
                  <h3>Por lo que cuentas, podrías encajar en una {grado.nombre}</h3>
                  <p style={{ margin: 0 }}>Se cobra {grado.cuantia}. El grado lo decide el tribunal médico o el juez con tus informes.</p>
                </div>
              )}
              {origen === 'Ansiedad o depresión por acoso laboral' && (
                <p className="recuadro">
                  Si tu enfermedad viene del acoso, conviene pedir que se reconozca como derivada del trabajo: cambia la base reguladora y los
                  requisitos. Es una de nuestras especialidades. <Link href="/acoso-laboral/baja-por-ansiedad-por-acoso">Cómo pedir que tu baja sea accidente de trabajo</Link>.
                </p>
              )}
            </>
          )}
          <div className="acciones">
            <a
              className="boton"
              href={enlaceWhatsapp(
                `Hola, he usado el comprobador de incapacidad. Situación: ${SITUACIONES.find((s) => s.id === situacion)?.texto}. ${
                  grado ? `Creo que encajo en ${grado.nombre}. ` : ''
                }${origen ? `Origen: ${origen}. ` : ''}${fecha ? `Resolución recibida el ${fecha.split('-').reverse().join('/')}.` : ''}`,
              )}
            >
              Contar mi caso por WhatsApp
            </a>
            <BotonImprimir />
            <a className="boton boton-claro" href={DESPACHO.telefonoHref}>
              Llamar al {DESPACHO.telefono}
            </a>
          </div>
          <p className="letra-pequena">Orientativo. Las cuantías son las generales; la base reguladora depende de tus cotizaciones.</p>
        </section>
      )}
    </div>
  );
}
