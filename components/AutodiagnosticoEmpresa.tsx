'use client';

import { useState } from 'react';
import { DESPACHO, enlaceWhatsapp } from '@/lib/despacho';

type Tipo = 'empresa' | 'colegio' | 'administracion';
type Punto = { id: string; texto: string; ayuda: string; obligatorio: (t: Tipo, grande: boolean) => boolean; aplica?: (t: Tipo) => boolean };

const PUNTOS: Punto[] = [
  {
    id: 'psico',
    texto: 'Evaluación de riesgos psicosociales hecha y actualizada',
    ayuda: 'La Ley de Prevención de Riesgos Laborales obliga a evaluar todos los riesgos, también el estrés, la carga de trabajo y el acoso.',
    obligatorio: () => true,
  },
  {
    id: 'sexual',
    texto: 'Protocolo frente al acoso sexual y por razón de sexo',
    ayuda: 'Obligatorio para todas las organizaciones, sea cual sea su tamaño (Ley Orgánica 3/2007, art. 48).',
    obligatorio: () => true,
  },
  {
    id: 'moral',
    texto: 'Procedimiento frente al acoso laboral (moral o mobbing)',
    ayuda: 'Deriva del deber de prevención y del Convenio 190 de la OIT. Es la herramienta que más protege a la organización cuando llega una denuncia.',
    obligatorio: () => false,
  },
  {
    id: 'lgtbi',
    texto: 'Protocolo frente al acoso y la violencia contra personas LGTBI',
    ayuda: 'Obligatorio para las empresas de más de 50 personas (Ley 4/2023 y Real Decreto 1026/2024).',
    obligatorio: (t, grande) => grande && t !== 'administracion',
  },
  {
    id: 'canal',
    texto: 'Canal interno de denuncias con persona responsable',
    ayuda: 'Obligatorio con 50 o más personas y en todo el sector público (Ley 2/2023).',
    obligatorio: (t, grande) => grande || t === 'administracion',
  },
  {
    id: 'igualdad',
    texto: 'Plan de igualdad registrado',
    ayuda: 'Obligatorio con 50 o más personas en plantilla.',
    obligatorio: (t, grande) => grande,
  },
  {
    id: 'registro',
    texto: 'Registro retributivo con los salarios medios de mujeres y hombres',
    ayuda: 'Obligatorio para todas las empresas (art. 28.2 del Estatuto de los Trabajadores).',
    obligatorio: (t) => t !== 'administracion',
  },
  {
    id: 'instructor',
    texto: 'Persona o comisión instructora formada e imparcial',
    ayuda: 'Una investigación mal hecha es la causa más habitual de condenas a la organización.',
    obligatorio: () => false,
  },
  {
    id: 'formacion',
    texto: 'Formación de mandos y equipo directivo en acoso',
    ayuda: 'Saber reconocer las primeras señales evita la mayoría de los conflictos.',
    obligatorio: () => false,
  },
  {
    id: 'difusion',
    texto: 'El protocolo es conocido por toda la plantilla',
    ayuda: 'Un protocolo guardado en un cajón no protege a nadie ni a la organización.',
    obligatorio: () => false,
  },
  {
    id: 'bienestar',
    texto: 'Coordinador o coordinadora de bienestar y protección del alumnado',
    ayuda: 'Obligatorio en todos los centros educativos (Ley Orgánica 8/2021, de protección a la infancia).',
    obligatorio: () => true,
    aplica: (t) => t === 'colegio',
  },
  {
    id: 'convivencia',
    texto: 'Plan de convivencia actualizado',
    ayuda: 'Obligatorio en los centros educativos. Conviene coordinarlo con el protocolo de acoso al personal.',
    obligatorio: () => true,
    aplica: (t) => t === 'colegio',
  },
];

const NOMBRE: Record<Tipo, string> = { empresa: 'Empresa', colegio: 'Centro educativo', administracion: 'Administración u organismo público' };

export default function AutodiagnosticoEmpresa() {
  const [tipo, setTipo] = useState<Tipo>('empresa');
  const [grande, setGrande] = useState(false);
  const [tiene, setTiene] = useState<string[]>([]);
  const [visto, setVisto] = useState(false);
  const puntos = PUNTOS.filter((p) => !p.aplica || p.aplica(tipo));
  const obligatorios = puntos.filter((p) => p.obligatorio(tipo, grande));
  const faltanObl = obligatorios.filter((p) => !tiene.includes(p.id));
  const faltanRec = puntos.filter((p) => !p.obligatorio(tipo, grande) && !tiene.includes(p.id));
  const alternar = (id: string) => setTiene((t) => (t.includes(id) ? t.filter((x) => x !== id) : [...t, id]));
  const resumen = `Hola, he hecho el autodiagnóstico de la web (${NOMBRE[tipo]}, ${grande ? '50 o más personas' : 'menos de 50 personas'}). Nos faltan: ${
    [...faltanObl, ...faltanRec].map((p) => p.texto.toLowerCase()).join('; ') || 'nada'
  }. Queremos que nos ayudéis.`;

  return (
    <div className="herramienta">
      <fieldset className="pregunta-test">
        <legend className="campo">
          <strong>¿Qué sois?</strong>
        </legend>
        <div className="opciones">
          {(Object.keys(NOMBRE) as Tipo[]).map((t) => (
            <label key={t} className="opcion">
              <input type="radio" name="tipo" checked={tipo === t} onChange={() => setTipo(t)} />
              <span>
                <strong>{NOMBRE[t]}</strong>
              </span>
            </label>
          ))}
        </div>
      </fieldset>
      <fieldset className="pregunta-test">
        <legend className="campo">
          <strong>¿Cuántas personas trabajan en la organización?</strong>
        </legend>
        <div className="opciones">
          <label className="opcion">
            <input type="radio" name="tamano" checked={!grande} onChange={() => setGrande(false)} />
            <span>
              <strong>Menos de 50</strong>
            </span>
          </label>
          <label className="opcion">
            <input type="radio" name="tamano" checked={grande} onChange={() => setGrande(true)} />
            <span>
              <strong>50 o más</strong>
            </span>
          </label>
        </div>
      </fieldset>

      <h2 style={{ fontSize: '1.15rem', margin: '8px 0 10px' }}>Marca lo que ya tenéis</h2>
      <ul className="lista-pruebas">
        {puntos.map((p) => (
          <li key={p.id} className={tiene.includes(p.id) ? 'tengo' : ''}>
            <input id={p.id} type="checkbox" checked={tiene.includes(p.id)} onChange={() => alternar(p.id)} style={{ width: 20, height: 20, marginTop: 3, accentColor: '#003a5f' }} />
            <label htmlFor={p.id}>
              <strong style={{ display: 'block' }}>{p.texto}</strong>
              <span className="etiqueta-peso">{p.obligatorio(tipo, grande) ? 'Obligatorio. ' : 'Muy recomendable. '}</span>
              <span style={{ fontSize: '0.93rem', color: 'var(--tinta-media)' }}>{p.ayuda}</span>
            </label>
          </li>
        ))}
      </ul>
      <button type="button" className="boton boton-marcador" onClick={() => setVisto(true)}>
        Ver nuestro resultado
      </button>

      {visto && (
        <section className="resultado" aria-live="polite">
          <div className={`veredicto${faltanObl.length ? ' veredicto-alto' : ''}`}>
            <h3>
              {faltanObl.length === 0
                ? 'Cumplís con lo obligatorio'
                : `Os falta${faltanObl.length > 1 ? 'n' : ''} ${faltanObl.length} obligación${faltanObl.length > 1 ? 'es' : ''} legal${faltanObl.length > 1 ? 'es' : ''}`}
            </h3>
            <p style={{ margin: 0 }}>
              {faltanObl.length === 0
                ? 'Buen punto de partida. Lo que marca la diferencia ante una denuncia es cómo se aplica: quién investiga, en cuánto tiempo y con qué garantías.'
                : 'Ante una denuncia de acoso, la Inspección de Trabajo y los juzgados miran primero si la organización cumplía estas obligaciones. No tenerlas agrava la responsabilidad.'}
            </p>
          </div>
          {faltanObl.length > 0 && (
            <>
              <p>
                <strong>Lo obligatorio que falta:</strong>
              </p>
              <ul className="prosa">
                {faltanObl.map((p) => (
                  <li key={p.id}>{p.texto}</li>
                ))}
              </ul>
            </>
          )}
          {faltanRec.length > 0 && (
            <>
              <p>
                <strong>Lo recomendable que falta:</strong>
              </p>
              <ul className="prosa">
                {faltanRec.map((p) => (
                  <li key={p.id}>{p.texto}</li>
                ))}
              </ul>
            </>
          )}
          <div className="acciones">
            <a className="boton" href={enlaceWhatsapp(resumen)}>
              Pedir una revisión de nuestros protocolos
            </a>
            <a className="boton boton-claro" href={DESPACHO.telefonoHref}>
              Llamar al {DESPACHO.telefono}
            </a>
          </div>
          <p className="letra-pequena">Orientativo. Algunos convenios y normas autonómicas añaden obligaciones. No guardamos ninguna respuesta.</p>
        </section>
      )}
    </div>
  );
}
