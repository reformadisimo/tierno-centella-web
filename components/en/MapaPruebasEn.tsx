'use client';

import { useState } from 'react';
import { DESPACHO, enlaceWhatsapp } from '@/lib/despacho';

type Prueba = { id: string; nombre: string; peso: 'Very useful' | 'Useful' | 'Supporting'; consejo: string };

const GRUPOS: { titulo: string; pruebas: Prueba[] }[] = [
  {
    titulo: 'What you put in writing',
    pruebas: [
      { id: 'diario', nombre: 'A diary of each incident: date, time, who, what happened and who saw it', peso: 'Very useful', consejo: 'Start today. Write it on the same day, by hand or in an email you send to yourself.' },
      { id: 'comunicacion', nombre: 'A written complaint to the company or to Human Resources describing the harassment', peso: 'Very useful', consejo: 'By email or with an entry stamp (registro de entrada). That way the company cannot say it knew nothing.' },
      { id: 'protocolo', nombre: 'Activation of the company’s anti-harassment protocol', peso: 'Useful', consejo: 'Ask in writing for it to be activated and keep the reply, or the lack of one.' },
    ],
  },
  {
    titulo: 'What was sent to you',
    pruebas: [
      { id: 'correos', nombre: 'Emails, WhatsApp messages or company chat messages showing the hostile treatment', peso: 'Very useful', consejo: 'Take screenshots with the date visible and forward them to a personal account if company policy allows it.' },
      { id: 'ordenes', nombre: 'Changes to your duties, schedule or job communicated in writing', peso: 'Useful', consejo: 'Compare them with what you did before: this is how being stripped of your duties is proved.' },
      { id: 'sanciones', nombre: 'Unfair sanctions, warnings or appraisals', peso: 'Useful', consejo: 'Keep them even if you disagree, and always reply in writing.' },
      { id: 'grabaciones', nombre: 'Recordings of conversations you took part in', peso: 'Useful', consejo: 'They are valid if you were in the conversation. Do not record other people’s conversations.' },
    ],
  },
  {
    titulo: 'What others can tell',
    pruebas: [
      { id: 'testigos', nombre: 'Co-workers who have seen what happened and would be willing to testify', peso: 'Very useful', consejo: 'Note down who was present at each incident. Many witnesses only speak once they no longer work there.' },
      { id: 'otrasvictimas', nombre: 'Other people who have suffered the same from the same person', peso: 'Useful', consejo: 'A repeated pattern greatly strengthens your case.' },
      { id: 'inspeccion', nombre: 'A complaint to, or report from, the Labour Inspectorate (Inspección de Trabajo)', peso: 'Useful', consejo: 'The Inspectorate can investigate inside the company what you cannot see.' },
    ],
  },
  {
    titulo: 'What your health shows',
    pruebas: [
      { id: 'medico', nombre: 'Reports from your GP or A&E that mention the work-related origin', peso: 'Very useful', consejo: 'Tell your doctor what is happening to you at work so it is recorded in your medical history.' },
      { id: 'psicologo', nombre: 'A psychology or psychiatry report', peso: 'Useful', consejo: 'It helps to assess the harm and to quantify the compensation.' },
      { id: 'baja', nombre: 'Sick leave certificates for anxiety, depression or stress', peso: 'Supporting', consejo: 'If the sick leave comes from the harassment, you can ask for it to be treated as a work accident (accidente de trabajo).' },
    ],
  },
];

const TODAS = GRUPOS.flatMap((g) => g.pruebas);

export default function MapaPruebasEn() {
  const [tengo, setTengo] = useState<string[]>([]);
  const alternar = (id: string) => setTengo((t) => (t.includes(id) ? t.filter((x) => x !== id) : [...t, id]));

  const muyUtiles = TODAS.filter((p) => p.peso === 'Very useful');
  const tengoMuyUtiles = muyUtiles.filter((p) => tengo.includes(p.id)).length;
  const faltan = TODAS.filter((p) => !tengo.includes(p.id) && p.peso === 'Very useful');

  const resumen = `Hello, I have done the harassment evidence map. I have: ${
    TODAS.filter((p) => tengo.includes(p.id)).map((p) => p.nombre.split(':')[0].toLowerCase()).join('; ') || 'nothing yet'
  }. I would like a lawyer to tell me whether it is enough.`;

  return (
    <div className="herramienta">
      <p>Tick what you already have. At the end you will see what is missing and where to start.</p>
      {GRUPOS.map((g) => (
        <section key={g.titulo} style={{ marginBottom: 24 }}>
          <h2 style={{ fontSize: '1.15rem', marginBottom: 10 }}>{g.titulo}</h2>
          <ul className="lista-pruebas">
            {g.pruebas.map((p) => (
              <li key={p.id} className={tengo.includes(p.id) ? 'tengo' : ''}>
                <input
                  id={p.id}
                  type="checkbox"
                  checked={tengo.includes(p.id)}
                  onChange={() => alternar(p.id)}
                  style={{ width: 20, height: 20, marginTop: 3, accentColor: '#003a5f' }}
                />
                <label htmlFor={p.id}>
                  <strong style={{ display: 'block' }}>{p.nombre}</strong>
                  <span className="etiqueta-peso">{p.peso}. </span>
                  <span style={{ fontSize: '0.93rem', color: 'var(--tinta-media)' }}>{p.consejo}</span>
                </label>
              </li>
            ))}
          </ul>
        </section>
      ))}

      <section className="resultado" aria-live="polite">
        <h2>Your map</h2>
        <p>
          You have <strong>{tengo.length}</strong> of {TODAS.length} types of evidence, and <strong>{tengoMuyUtiles}</strong> of the{' '}
          {muyUtiles.length} that carry most weight before a judge.
        </p>
        {faltan.length > 0 ? (
          <>
            <p>
              <strong>Start here:</strong>
            </p>
            <ol className="prosa">
              {faltan.slice(0, 3).map((p) => (
                <li key={p.id}>
                  {p.nombre}. <span style={{ color: 'var(--tinta-media)' }}>{p.consejo}</span>
                </li>
              ))}
            </ol>
          </>
        ) : (
          <p className="recuadro">You have the evidence that carries most weight. It is a good time for a lawyer to review it and choose the way forward.</p>
        )}
        <div className="acciones">
          <a className="boton" href={enlaceWhatsapp(resumen)}>
            Send my map by WhatsApp
          </a>
          <button type="button" className="boton boton-claro" onClick={() => window.print()}>
            Print my list
          </button>
        </div>
        <p className="letra-pequena">For guidance only. Every case is different: call us on {DESPACHO.telefono} and we will look at it with you.</p>
      </section>
    </div>
  );
}
