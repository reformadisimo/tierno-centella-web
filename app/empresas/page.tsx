import type { Metadata } from 'next';
import Link from 'next/link';
import Llamada from '@/components/Llamada';
import VideoYoutube from '@/components/VideoYoutube';

export const metadata: Metadata = {
  title: 'Asesoría laboral para empresas y centros educativos',
  description:
    'Protocolos de acoso, investigación de denuncias internas, canal de denuncias y asesoría laboral para empresas, colegios y entidades del tercer sector.',
};

const SERVICIOS = [
  {
    t: 'Protocolo de acoso a medida',
    d: 'Obligatorio frente al acoso sexual y por razón de sexo en todas las empresas, y la mejor defensa frente al acoso moral. Lo redactamos para tu organización, no copiado de una plantilla.',
  },
  {
    t: 'Investigación de denuncias internas',
    d: 'Cuando alguien denuncia acoso, actuamos como instructores externos e imparciales: entrevistas, informe y propuesta de medidas. Protege a la víctima y a la empresa.',
  },
  {
    t: 'Canal de denuncias',
    d: 'Te ayudamos a cumplir la ley de protección del informante: diseño del canal, procedimiento y gestión de las comunicaciones.',
  },
  {
    t: 'Riesgos psicosociales',
    d: 'Coordinamos con tu servicio de prevención la evaluación del estrés, la carga y el clima laboral, que es donde empieza a prevenirse el acoso.',
  },
  {
    t: 'Asesoría laboral continuada',
    d: 'Una cuota fija al mes para resolver dudas, revisar despidos y sanciones antes de comunicarlos y defenderte si hay juicio.',
  },
  {
    t: 'Formación a directivos',
    d: 'Sesiones prácticas para mandos: cómo detectar el acoso, cómo actuar ante una queja y qué no hacer nunca.',
  },
];

export default function Empresas() {
  return (
    <>
      <header className="cabeza-pagina">
        <div className="contenedor cabeza-con-foto">
          <div>
            <nav className="migas" aria-label="Estás en">
              <Link href="/">Inicio</Link> / Empresas
            </nav>
            <h1>Prevenir el acoso cuesta mucho menos que perder un juicio.</h1>
            <p className="entradilla">
              Llevamos décadas viendo el acoso desde el lado de la víctima. Por eso sabemos qué falla en las empresas y en los colegios, y
              cómo evitarlo.
            </p>
          </div>
          <img className="foto" src="/img/reunion-equipo.webp" alt="El equipo del despacho reunido con documentación" />
        </div>
      </header>
      <section className="seccion">
        <div className="contenedor">
          <h2>Qué hacemos por tu organización</h2>
          <ul className="hitos">
            {SERVICIOS.map((s) => (
              <li key={s.t}>
                <strong>{s.t}</strong>
                <span>{s.d}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="seccion seccion-blanca">
        <div className="contenedor dos-columnas">
          <div>
            <h2>Colegios, universidades y tercer sector</h2>
            <p>
              Hemos defendido a docentes frente a la propia administración educativa y sabemos cómo se vive el conflicto en un claustro.
              Ayudamos a centros concertados, privados y entidades sin ánimo de lucro a tener protocolos que funcionen de verdad.
            </p>
          </div>
          <VideoYoutube id="4AC0H2oNl6s" titulo="Canal de denuncias: la responsabilidad de la empresa" />
        </div>
      </section>
      <Llamada asunto="asesoría para empresas" />
    </>
  );
}
