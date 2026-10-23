import type { Metadata } from 'next';
import Link from 'next/link';
import VideoYoutube from '@/components/VideoYoutube';
import { DESPACHO } from '@/lib/despacho';

export const metadata: Metadata = {
  title: 'Jesús Tierno Centella, abogado especialista en acoso laboral',
  description:
    'Socio director de Tierno Centella Abogados. Más de 25 años en derecho laboral, autor de la primera condena en España al acosador laboral (2005) y coautor de "Valores en el trabajo".',
};

export default function Jesus() {
  const persona = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Jesús Tierno Centella',
    jobTitle: 'Abogado laboralista, socio director',
    worksFor: { '@type': 'LegalService', name: DESPACHO.nombre },
    alumniOf: 'Universidad de Alcalá',
    sameAs: ['https://www.youtube.com/@tiernocentella', 'https://www.instagram.com/tiernocentella_abogados/'],
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(persona) }} />
      <header className="cabeza-pagina">
        <div className="contenedor cabeza-con-foto">
          <div>
            <nav className="migas" aria-label="Estás en">
              <Link href="/">Inicio</Link> / Jesús Tierno
            </nav>
            <h1>Jesús Tierno Centella</h1>
            <p className="entradilla">
              Abogado laboralista y socio director del despacho. Lleva más de 25 años defendiendo a trabajadores, y la mayor parte de ellos
              dedicado al acoso laboral.
            </p>
            <div className="acciones">
              <a className="boton" href={DESPACHO.citaJesus}>
                Reservar consulta con Jesús ({DESPACHO.precioCitaJesus} €)
              </a>
            </div>
          </div>
          <img className="foto" src="/img/jesus-retrato.webp" alt="Jesús Tierno Centella, de traje gris, con los brazos cruzados" style={{ aspectRatio: '4 / 5', objectPosition: 'top' }} />
        </div>
      </header>

      <section className="seccion">
        <div className="contenedor dos-columnas">
          <div className="prosa">
            <h2 style={{ marginTop: 0 }}>Trayectoria</h2>
            <p>
              Licenciado en Derecho por la Universidad de Alcalá. Ha dedicado su carrera al derecho laboral, con el acoso laboral como
              especialidad.
            </p>
            <p>
              En 2005 consiguió en el Juzgado de lo Social n.º 29 de Madrid la primera sentencia en España que condenó a la vez a la empresa y
              a la persona que acosaba a pagar a la víctima. El Tribunal Superior de Justicia de Madrid la confirmó. Desde entonces ha llevado
              casos de acoso en empresas privadas, en la Administración y en la enseñanza.
            </p>
            <p>
              El despacho colabora con el Prácticum del Grado en Derecho de la Universidad Carlos III de Madrid, formando a futuros abogados.
            </p>
            <h2>Un libro sobre el trabajo digno</h2>
            <p>
              Es coautor, con el psicólogo Bernabé Tierno, de <em>Valores en el trabajo: estrategias para afrontar y superar los nuevos retos
              laborales</em> (La Esfera de los Libros, 2002), sobre cómo el trabajo puede enriquecer a quien lo hace en lugar de destruirle.
            </p>
            <div className="recuadro">
              <p>Pendiente de completar con Jesús: número de colegiado, ponencias, apariciones en prensa y casos que se puedan contar.</p>
            </div>
          </div>
          <div style={{ display: 'grid', gap: 20, alignContent: 'start' }}>
            <img className="foto" src="/img/jesus-firmando.webp" alt="Jesús Tierno revisando un documento en su mesa" />
            <img className="foto" src="/img/equipo.webp" alt="Jesús Tierno con el equipo del despacho" />
          </div>
        </div>
      </section>

      <section className="seccion seccion-blanca">
        <div className="contenedor">
          <h2>Jesús Tierno e Iñaki Piñuel hablan de acoso laboral</h2>
          <p>Dos conversaciones con uno de los psicólogos que más ha estudiado el mobbing en España.</p>
          <div className="rejilla-videos">
            <VideoYoutube id="TwKRGi1LISY" titulo="Si te acosan en tu trabajo: Iñaki Piñuel entrevista a Jesús Tierno (2022)" />
            <VideoYoutube id="lVoi2ijP1bA" titulo="Jesús Tierno entrevista a Iñaki Piñuel sobre el acoso laboral (2024)" />
          </div>
        </div>
      </section>
    </>
  );
}
