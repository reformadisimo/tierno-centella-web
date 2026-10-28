'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { DESPACHO, enlaceWhatsapp } from '@/lib/despacho';
import { BotonImprimir } from './Utiles';

type Punto = { id: string; texto: string; porque: string; clave?: boolean; enlace?: { href: string; texto: string } };
const GRUPOS: { titulo: string; puntos: Punto[] }[] = [
  {
    titulo: 'Los papeles que llevas',
    puntos: [
      { id: 'dni', texto: 'DNI y la carta de citación', porque: 'Sin identificarte no te atienden.' },
      { id: 'informes', texto: 'Informes de tus especialistas de los últimos meses', porque: 'Pesan más los recientes y los de especialista que los de atención primaria.', clave: true },
      { id: 'limitaciones', texto: 'Al menos un informe que diga qué NO puedes hacer', porque: 'El tribunal valora limitaciones, no diagnósticos: cuánto peso, cuánto tiempo de pie, qué movimientos.', clave: true, enlace: { href: '/herramientas/genera-tu-carta?carta=historial', texto: 'Pedir tu historial médico' } },
      { id: 'pruebas', texto: 'Pruebas: resonancias, analíticas, informes de urgencias', porque: 'Dan base objetiva a lo que cuentas.' },
      { id: 'medicacion', texto: 'Lista de tu medicación y sus efectos', porque: 'Somnolencia, mareos o falta de concentración también limitan para trabajar.' },
      { id: 'copias', texto: 'Copias, nunca los originales', porque: 'Lo que entregas puede no volver.' },
    ],
  },
  {
    titulo: 'Tu trabajo, explicado',
    puntos: [
      { id: 'tareas', texto: 'Una descripción por escrito de tus tareas reales', porque: 'Tu categoría no dice lo que haces. El grado depende de tu profesión habitual.', clave: true },
      { id: 'prevencion', texto: 'Informes del servicio de prevención o de la mutua, si los hay', porque: 'Un "no apto" o una adaptación del puesto ayudan mucho.' },
      { id: 'vida', texto: 'Tu vida laboral', porque: 'Para comprobar que cumples la cotización mínima.' },
    ],
  },
  {
    titulo: 'Cómo vas preparado',
    puntos: [
      { id: 'dia', texto: 'Sé contar un día normal tuyo: qué puedes y qué no', porque: 'Con ejemplos concretos: vestirte, conducir, subir escaleras, concentrarte.', clave: true },
      { id: 'sinexagerar', texto: 'Ni exagerar ni quitarle importancia', porque: 'Los médicos lo notan. Cuenta tus días malos, que también cuentan.' },
      { id: 'acompanante', texto: 'Ir acompañado si lo necesitas', porque: 'Suelen permitirlo, y ayuda a no olvidar nada.' },
      { id: 'notas', texto: 'Una nota con lo que no quieres olvidar decir', porque: 'Con los nervios se olvida lo importante.' },
    ],
  },
  {
    titulo: 'Para después',
    puntos: [
      { id: 'alegaciones', texto: 'Sabes que puedes alegar al dictamen-propuesta', porque: 'Si te lo notifican, tienes unos días para aportar informes nuevos antes de la resolución.' },
      { id: 'plazo', texto: 'Sabes que si te lo deniegan tienes 30 días hábiles', porque: 'Para la reclamación previa, obligatoria antes de ir al juzgado.', enlace: { href: '/herramientas/plazos', texto: 'Calcular el plazo' } },
    ],
  },
];
const TODOS = GRUPOS.flatMap((g) => g.puntos);
const CLAVE = 'tc-tribunal-medico';

export default function TribunalMedico() {
  const [hecho, setHecho] = useState<string[]>([]);
  const [listo, setListo] = useState(false);
  useEffect(() => {
    try {
      const g = JSON.parse(localStorage.getItem(CLAVE) || '[]');
      if (Array.isArray(g)) setHecho(g.filter((x) => typeof x === 'string'));
    } catch {}
  }, []);
  function cambiar(id: string) {
    setHecho((h) => {
      const n = h.includes(id) ? h.filter((x) => x !== id) : [...h, id];
      try {
        localStorage.setItem(CLAVE, JSON.stringify(n));
      } catch {}
      return n;
    });
  }
  const pct = Math.round((hecho.length / TODOS.length) * 100);
  const faltan = TODOS.filter((p) => !hecho.includes(p.id));
  const faltanClave = faltan.filter((p) => p.clave);

  return (
    <div className="herramienta tribunal">
      <div className="tribunal-barra" aria-label={`Llevas preparado el ${pct} %`}>
        <span style={{ width: `${Math.max(3, pct)}%` }} />
        <b>{pct} % preparado</b>
      </div>
      <p className="campo-ayuda">Marca lo que ya tienes. Se guarda solo en este dispositivo, para que puedas volver mientras lo reúnes.</p>
      {GRUPOS.map((g) => (
        <fieldset key={g.titulo} className="tribunal-grupo">
          <legend>{g.titulo}</legend>
          {g.puntos.map((p) => (
            <label key={p.id} className={`opcion tribunal-punto${hecho.includes(p.id) ? ' hecho' : ''}`}>
              <input type="checkbox" checked={hecho.includes(p.id)} onChange={() => cambiar(p.id)} />
              <span>
                <strong>
                  {p.texto}
                  {p.clave && <em className="tribunal-clave">Clave</em>}
                </strong>
                <br />
                {p.porque}
                {p.enlace && (
                  <>
                    {' '}
                    <Link href={p.enlace.href}>{p.enlace.texto}</Link>
                  </>
                )}
              </span>
            </label>
          ))}
        </fieldset>
      ))}
      <button type="button" className="boton boton-marcador" onClick={() => setListo(true)}>
        Ver cómo voy
      </button>

      {listo && (
        <section className="resultado" aria-live="polite">
          <div className={`veredicto cq-veredicto ${faltanClave.length ? 'cq-medio' : 'cq-bajo'}`}>
            <span className="cq-ola">Así vas para la cita.</span>
            <h3>
              {faltan.length === 0
                ? 'Lo llevas todo: vas bien preparado'
                : faltanClave.length
                  ? `Te faltan ${faltanClave.length} ${faltanClave.length === 1 ? 'cosa clave' : 'cosas clave'}`
                  : `Lo esencial lo tienes. Te ${faltan.length === 1 ? 'falta 1 detalle' : `faltan ${faltan.length} detalles`}`}
            </h3>
            <p style={{ margin: 0 }}>
              {faltanClave.length
                ? 'Son las que más pesan en la decisión. Si puedes, consíguelas antes de la cita.'
                : 'Repasa la lista la víspera y lleva todo en una carpeta, por orden.'}
            </p>
          </div>
          {faltan.length > 0 && (
            <ul className="prosa">
              {faltan.map((p) => (
                <li key={p.id}>
                  <strong>{p.texto}</strong>
                  {p.clave ? ' (clave)' : ''}: {p.porque}
                </li>
              ))}
            </ul>
          )}
          <p className="recuadro">
            Te lo contamos con calma en <Link href="/incapacidad-permanente/tribunal-medico-evi">la guía del tribunal médico</Link>, y cuánto cobrarías en{' '}
            <Link href="/herramientas/calculadora-pension-incapacidad">la calculadora de la pensión</Link>.
          </p>
          <div className="acciones">
            <a className="boton" href={enlaceWhatsapp(`Hola, tengo cita con el tribunal médico y llevo preparado el ${pct} % de la lista de la web. Quiero que me ayudéis a prepararlo.`)}>
              Que me ayudéis a prepararlo
            </a>
            <BotonImprimir />
          </div>
          <p className="letra-pequena">Lista orientativa. Cada caso tiene sus informes clave: si quieres, lo revisamos contigo. Dudas: {DESPACHO.telefono}.</p>
        </section>
      )}
    </div>
  );
}
