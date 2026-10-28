import { ChipVivo } from '@/components/Vida';
import EsquemaPagina from '@/components/EsquemaPagina';
import LineaAcoso from '@/components/LineaAcoso';
import { Etiqueta } from '@/components/Etiqueta';
import type { Metadata } from 'next';
import FotoVideo from '@/components/FotoVideo';
import { videoDeFoto } from '@/lib/video-foto';
import { meta } from '@/lib/seo';
import Link from 'next/link';
import IconoGuia from '@/components/IconoGuia';
import Llamada from '@/components/Llamada';
import VideoYoutube from '@/components/VideoYoutube';
import { leerColeccion } from '@/lib/contenido';
import { CASOS } from '@/lib/casos';

export const metadata: Metadata = meta({
  titulo: 'Abogados de acoso laboral en Madrid',
  descripcion: 'Más de 25 años en derecho laboral, la mayor parte en casos de acoso. Cómo saber si lo sufres, cómo demostrarlo y qué puedes reclamar. Primera condena en España a la empresa y al acosador a la vez, en 2005.',
  ruta: '/acoso-laboral',
});

export default function Acoso() {
  const guias = leerColeccion('acoso');
  const casosAcoso = CASOS.filter((c) => c.materia === 'Acoso laboral');
  return (
    <>
      <EsquemaPagina ruta="/acoso-laboral" />
      <header className="cabeza-pagina cabeza-acoso">
        <div className="contenedor cabeza-con-foto">
          <div>
            <nav className="migas" aria-label="Estás en">
              <Link href="/">Inicio</Link> / Acoso laboral
            </nav>
            <Etiqueta icono="personas" tono="oro">Acoso laboral</Etiqueta>
            <h1>Acoso laboral: se puede demostrar y se puede reclamar.</h1>
            <p className="entradilla">
              Llevamos más de 25 años en derecho laboral, la mayor parte centrados en el acoso. En 2005 conseguimos que, por primera vez en España, un juez condenara
              a la empresa y al propio acosador a pagar a la víctima.
            </p>
            <div className="acciones">
              <Link className="boton boton-marcador" href="/herramientas/test-acoso">
                ¿Es acoso lo que me pasa?
              </Link>
              <Link className="boton boton-claro" href="/herramientas/mapa-de-pruebas">
                Qué pruebas tengo
              </Link>
            </div>
          </div>
          <div>
            {videoDeFoto('acoso-tension') ? (
              <FotoVideo foto="acoso-tension" alt="Una trabajadora agotada se lleva la mano a la cara en la oficina" video={videoDeFoto('acoso-tension')!} sizes="(max-width: 860px) 100vw, 50vw" prioridad />
            ) : (
              <img className="foto" src="/img/acoso-tension.webp" srcSet="/img/acoso-tension-640.webp 640w, /img/acoso-tension.webp 1254w" sizes="(max-width: 860px) 100vw, 50vw" alt="Un superior señala con el dedo a una trabajadora que se lleva la mano a la cabeza" />
            )}
            <p className="foto-pie">Imagen ilustrativa.</p>
          </div>
        </div>
      </header>
      <aside className="mensaje-calido">
        <span className="mc-flor" aria-hidden="true">&#10048;</span>
        <p><strong>No es una exageración tuya.</strong> Lo que sientes importa. Anota con calma lo que ha pasado y haz el test: en dos minutos sabrás si lo que vives puede ser acoso.</p>
        <a className="boton boton-claro" href="/herramientas/test-acoso">Hacer el test</a>
      </aside>

      <section className="seccion">
        <div className="contenedor">
          <h2 className="tv"><ChipVivo texto="Tres sentencias que marcaron el camino" i={0} /><span className="tv-texto">Tres sentencias que marcaron el camino</span></h2>
          <ul className="hitos">
            {casosAcoso.map((c) => (
              <li key={c.slug}>
                <strong><span className="hito-anio">{c.anio}</span>{c.titulo}</strong>
                <span>{c.resumen}</span>
              </li>
            ))}
          </ul>
          <div className="acciones">
            <Link className="boton boton-claro" href="/sentencias">
              Ver las fichas de cada caso
            </Link>
          </div>
          <figure className="prosa-foto prosa-foto-ancha" style={{ maxWidth: 820 }}>
            {videoDeFoto('mazo') ? (
              <FotoVideo foto="mazo" alt="Un mazo de juez" video={videoDeFoto('mazo')!} sizes="(max-width: 1000px) 100vw, 820px" />
            ) : (
              <img src="/img/mazo-640.webp" srcSet="/img/mazo-640.webp 640w, /img/mazo.webp 1200w" sizes="(max-width: 1000px) 100vw, 820px" alt="Un mazo de juez" width={1200} height={514} loading="lazy" decoding="async" />
            )}
          </figure>
        </div>
      </section>

      <section className="seccion">
        <div className="contenedor">
          <LineaAcoso />
        </div>
      </section>

      <section className="seccion seccion-blanca">
        <div className="contenedor">
          <h2 className="tv"><ChipVivo texto="Todo lo que necesitas saber" i={1} /><span className="tv-texto">Todo lo que necesitas saber</span></h2>
          <p>Guías escritas para quien lo está viviendo, con la experiencia de más de 25 años del despacho.</p>
          <div className="rejilla-guias con-icono">
            {guias.map((g) => (
              <Link key={g.slug} href={`/acoso-laboral/${g.slug}`}>
                <IconoGuia pieza={g} tono="coral" />
                <div><strong>{g.titulo}</strong>
                <span>{g.descripcion}</span></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="seccion">
        <div className="contenedor dos-columnas">
          <div>
            <h2 className="tv"><ChipVivo texto="Lo que hacemos cuando nos llamas" i={2} /><span className="tv-texto">Lo que hacemos cuando nos llamas</span></h2>
            <ol className="pasos-numerados">
              <li>Te escuchamos y vemos si lo que vives es acoso o un conflicto de otro tipo. Las dos cosas tienen salida, pero distinta.</li>
              <li>Te decimos qué pruebas conviene reunir desde hoy y cómo hacerlo sin ponerte en riesgo.</li>
              <li>Si te afecta a la salud, te orientamos para que la baja se reconozca como accidente de trabajo.</li>
              <li>Elegimos contigo la vía: que cese el acoso, salir de la empresa con indemnización, reclamar daños o denunciar.</li>
              <li>Te acompañamos en la conciliación y en el juicio, contra la empresa y, si procede, contra quien te acosa.</li>
            </ol>
          </div>
          <div>
            <VideoYoutube id="lVoi2ijP1bA" titulo="Jesús Tierno entrevista al psicólogo Iñaki Piñuel sobre el acoso laboral" />
          </div>
        </div>
      </section>

      <section className="seccion seccion-blanca">
        <div className="contenedor dos-columnas">
          <div>
            <h2 className="tv"><ChipVivo texto="¿Trabajas en la Administración o en un centro educativo?" i={3} /><span className="tv-texto">¿Trabajas en la Administración o en un centro educativo?</span></h2>
            <p>
              El acoso en la función pública se reclama por otra vía y con otros plazos. En 2011 defendimos ante el Tribunal Superior de Justicia de
              Castilla y León a una profesora acosada frente a la Consejería de Educación, y conocemos bien cómo responden las
              administraciones.
            </p>
            <Link href="/acoso-laboral/acoso-en-la-administracion-publica-y-educacion">Acoso en la Administración y la educación</Link>
          </div>
          <div>
            <h2 className="tv"><ChipVivo texto="¿Eres una empresa o un colegio?" i={4} /><span className="tv-texto">¿Eres una empresa o un colegio?</span></h2>
            <p>
              Diseñamos protocolos de acoso, investigamos denuncias internas con imparcialidad y formamos a los equipos directivos para
              prevenir antes de que haya víctimas.
            </p>
            <Link href="/empresas">Servicios para empresas y centros educativos</Link>
          </div>
        </div>
      </section>
      <Llamada asunto="acoso laboral" />
    </>
  );
}
