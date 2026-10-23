'use client';

import { useState } from 'react';
import { DESPACHO, enlaceWhatsapp } from '@/lib/despacho';

type Prueba = { id: string; nombre: string; peso: 'Muy útil' | 'Útil' | 'Complementa'; consejo: string };

const GRUPOS: { titulo: string; pruebas: Prueba[] }[] = [
  {
    titulo: 'Lo que dejaste por escrito',
    pruebas: [
      { id: 'diario', nombre: 'Un diario con cada episodio: fecha, hora, quién, qué pasó y quién lo vio', peso: 'Muy útil', consejo: 'Empieza hoy. Escríbelo el mismo día, a mano o en un correo que te envíes a ti.' },
      { id: 'comunicacion', nombre: 'Un escrito a la empresa o a Recursos Humanos contando el acoso', peso: 'Muy útil', consejo: 'Por correo o con registro de entrada. Así la empresa no puede decir que no sabía nada.' },
      { id: 'protocolo', nombre: 'La activación del protocolo de acoso de la empresa', peso: 'Útil', consejo: 'Pide por escrito que se active y guarda la respuesta, o la falta de respuesta.' },
    ],
  },
  {
    titulo: 'Lo que te hicieron llegar',
    pruebas: [
      { id: 'correos', nombre: 'Correos, mensajes de WhatsApp o del chat de empresa con el trato hostil', peso: 'Muy útil', consejo: 'Haz capturas con la fecha visible y reenvíatelos a una cuenta personal si la política de la empresa lo permite.' },
      { id: 'ordenes', nombre: 'Cambios de funciones, horario o puesto comunicados por escrito', peso: 'Útil', consejo: 'Compáralos con lo que hacías antes: el vaciado de funciones se prueba así.' },
      { id: 'sanciones', nombre: 'Sanciones, amonestaciones o evaluaciones injustas', peso: 'Útil', consejo: 'Guárdalas aunque no estés de acuerdo y responde siempre por escrito.' },
      { id: 'grabaciones', nombre: 'Grabaciones de conversaciones en las que tú participabas', peso: 'Útil', consejo: 'Son válidas si estabas en la conversación. No grabes conversaciones ajenas.' },
    ],
  },
  {
    titulo: 'Lo que otros pueden contar',
    pruebas: [
      { id: 'testigos', nombre: 'Compañeros que han visto los hechos y estarían dispuestos a declarar', peso: 'Muy útil', consejo: 'Apunta quién estaba en cada episodio. Muchos testigos solo hablan cuando ya no trabajan allí.' },
      { id: 'otrasvictimas', nombre: 'Otras personas que han sufrido lo mismo con la misma persona', peso: 'Útil', consejo: 'Un patrón repetido refuerza mucho tu caso.' },
      { id: 'inspeccion', nombre: 'Denuncia o informe de la Inspección de Trabajo', peso: 'Útil', consejo: 'La Inspección puede investigar dentro de la empresa lo que tú no puedes ver.' },
    ],
  },
  {
    titulo: 'Lo que dice tu salud',
    pruebas: [
      { id: 'medico', nombre: 'Informes del médico de cabecera o de urgencias que mencionen el origen laboral', peso: 'Muy útil', consejo: 'Cuenta al médico qué te pasa en el trabajo para que quede en tu historial.' },
      { id: 'psicologo', nombre: 'Informe de psicología o psiquiatría', peso: 'Útil', consejo: 'Ayuda a valorar el daño y a cuantificar la indemnización.' },
      { id: 'baja', nombre: 'Partes de baja por ansiedad, depresión o estrés', peso: 'Complementa', consejo: 'Si la baja viene del acoso, se puede pedir que sea accidente de trabajo.' },
    ],
  },
];

const TODAS = GRUPOS.flatMap((g) => g.pruebas);

export default function MapaPruebas() {
  const [tengo, setTengo] = useState<string[]>([]);
  const alternar = (id: string) => setTengo((t) => (t.includes(id) ? t.filter((x) => x !== id) : [...t, id]));

  const muyUtiles = TODAS.filter((p) => p.peso === 'Muy útil');
  const tengoMuyUtiles = muyUtiles.filter((p) => tengo.includes(p.id)).length;
  const faltan = TODAS.filter((p) => !tengo.includes(p.id) && p.peso === 'Muy útil');

  const resumen = `Hola, he hecho el mapa de pruebas de acoso. Tengo: ${
    TODAS.filter((p) => tengo.includes(p.id)).map((p) => p.nombre.split(':')[0].toLowerCase()).join('; ') || 'nada todavía'
  }. Quiero que un abogado me diga si es suficiente.`;

  return (
    <div className="herramienta">
      <p>Marca lo que ya tienes. Al final verás qué te falta y por dónde empezar.</p>
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
        <h2>Tu mapa</h2>
        <p>
          Tienes <strong>{tengo.length}</strong> de {TODAS.length} tipos de prueba, y <strong>{tengoMuyUtiles}</strong> de las{' '}
          {muyUtiles.length} que más pesan ante un juez.
        </p>
        {faltan.length > 0 ? (
          <>
            <p>
              <strong>Empieza por aquí:</strong>
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
          <p className="recuadro">Tienes las pruebas que más pesan. Es buen momento para que un abogado las revise y elija la vía.</p>
        )}
        <div className="acciones">
          <a className="boton" href={enlaceWhatsapp(resumen)}>
            Enviar mi mapa por WhatsApp
          </a>
          <button type="button" className="boton boton-claro" onClick={() => window.print()}>
            Imprimir mi lista
          </button>
        </div>
        <p className="letra-pequena">Orientativo. Cada caso es distinto: llámanos al {DESPACHO.telefono} y lo vemos contigo.</p>
      </section>
    </div>
  );
}
