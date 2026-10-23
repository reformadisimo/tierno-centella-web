'use client';

import { useState } from 'react';
import Link from 'next/link';
import { sumarHabiles } from '@/lib/calculos';
import { hoyMadrid } from '@/lib/hoy';
import { DESPACHO, enlaceWhatsapp } from '@/lib/despacho';
import { useIrAlResultado } from '../Utiles';
import { BotonImprimirEn, fechaLargaEn, fechaCortaEn } from './UtilesCalcEn';

const SITUACIONES = [
  { id: 'denegada', texto: 'It has been refused' },
  { id: 'menor', texto: 'I have been given a lower degree than I think I should have' },
  { id: 'sinpedir', texto: 'I have not applied for it yet' },
  { id: 'concedida', texto: 'It has been granted and I do not know what happens to my job' },
];

const CAPACIDADES = [
  { id: 'algo', texto: 'I can do my job, but my performance is much lower' },
  { id: 'mio', texto: 'I cannot do my usual job, but I can do others' },
  { id: 'ninguno', texto: 'I cannot do any work at all' },
  { id: 'ayuda', texto: 'I also need another person’s help with everyday life' },
];

const GRADO: Record<string, { nombre: string; cuantia: string }> = {
  algo: { nombre: 'partial permanent disability (incapacidad permanente parcial)', cuantia: 'a single payment of 24 months of your benefit base (base reguladora)' },
  mio: {
    nombre: 'total permanent disability (incapacidad permanente total)',
    cuantia: '55% of your benefit base (base reguladora) each month (75% from age 55 if you do not find another job)',
  },
  ninguno: { nombre: 'absolute permanent disability (incapacidad permanente absoluta)', cuantia: '100% of your benefit base (base reguladora) each month' },
  ayuda: { nombre: 'severe disability (gran incapacidad)', cuantia: 'the absolute disability pension plus a supplement to pay for that help' },
};

const ORIGEN_ACOSO = 'Anxiety or depression caused by workplace harassment';
const ORIGENES = ['A common illness', 'An accident or illness caused by work', ORIGEN_ACOSO];

export default function ComprobadorIncapacidadEn() {
  const [situacion, setSituacion] = useState('');
  const [capacidad, setCapacidad] = useState('');
  const [origen, setOrigen] = useState('');
  const [fecha, setFecha] = useState('');
  const hoy = hoyMadrid();

  const necesitaFecha = situacion === 'denegada' || situacion === 'menor';
  const listo = situacion && (situacion === 'concedida' || capacidad) && (!necesitaFecha || fecha);
  const ultimo = necesitaFecha && fecha ? sumarHabiles(fecha, 30) : '';
  const grado = GRADO[capacidad];
  useIrAlResultado(listo ? `${situacion}|${capacidad}|${origen}|${fecha}` : '');

  return (
    <div className="herramienta">
      <fieldset className="pregunta-test">
        <legend>Where are you in the process?</legend>
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
          <legend>Which of these best describes your situation?</legend>
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
          <legend>Where does your health problem come from?</legend>
          <div className="escala">
            {ORIGENES.map((o) => (
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
          <label htmlFor="fecha-inss">Date you received the decision from the social security office (INSS)</label>
          <input id="fecha-inss" type="date" max={hoy} value={fecha} onChange={(e) => setFecha(e.target.value)} />
          {!fecha && <span className="campo-ayuda">Enter the date to see your result and the last day to file a claim.</span>}
        </div>
      )}

      {listo && (
        <section className="resultado" aria-live="polite">
          {situacion === 'concedida' ? (
            <div className="veredicto">
              <h3>Your contract does not end automatically</h3>
              <p>
                Since Law 2/2025 (Ley 2/2025), permanent disability no longer ends the contract automatically. You can ask to stay with the
                company, and the company must try to adapt your job or move you to another one. The deadlines are short.{' '}
                <Link href="/en/permanent-disability/permanent-disability-and-your-contract">How it works</Link>.
              </p>
            </div>
          ) : (
            <>
              {ultimo && (
                <div className={ultimo < hoy ? 'cuenta-vencida' : 'veredicto veredicto-alto'}>
                  <h3>
                    {ultimo < hoy
                      ? `The deadline for the prior claim (reclamación previa) ended on ${fechaLargaEn(ultimo)}`
                      : `You have until ${fechaLargaEn(ultimo)} to file the prior claim (reclamación previa)`}
                  </h3>
                  <p style={{ margin: 0 }}>
                    {ultimo < hoy
                      ? 'Call us: sometimes you can apply again or there are other routes.'
                      : 'That is 30 working days from when you received the decision. It is the compulsory step before going to court.'}
                  </p>
                </div>
              )}
              {grado && (
                <div className="veredicto">
                  <h3>From what you tell us, you could fit a {grado.nombre}</h3>
                  <p style={{ margin: 0 }}>
                    It pays {grado.cuantia}. The degree is decided by the medical board (tribunal médico) or the judge, based on your medical
                    reports.
                  </p>
                </div>
              )}
              {origen === ORIGEN_ACOSO && (
                <p className="recuadro">
                  If your illness comes from harassment, it is worth asking for it to be recognised as work-related: that changes the benefit base
                  and the requirements. It is one of our specialities.{' '}
                  <Link href="/en/workplace-harassment/sick-leave-for-anxiety-due-to-harassment">How to have your sick leave treated as a workplace accident</Link>.
                </p>
              )}
            </>
          )}
          <div className="acciones">
            <a
              className="boton"
              href={enlaceWhatsapp(
                `Hello, I have used the disability checker. Situation: ${SITUACIONES.find((s) => s.id === situacion)?.texto}. ${
                  grado ? `I think I fit ${grado.nombre}. ` : ''
                }${origen ? `Cause: ${origen}. ` : ''}${fecha ? `Decision received on ${fechaCortaEn(fecha)}.` : ''}`,
              )}
            >
              Tell us about my case on WhatsApp
            </a>
            <BotonImprimirEn />
            <a className="boton boton-claro" href={DESPACHO.telefonoHref}>
              Call {DESPACHO.telefono}
            </a>
          </div>
          <p className="letra-pequena">A guide only. The amounts are the general ones; the benefit base depends on your contributions.</p>
        </section>
      )}
    </div>
  );
}
