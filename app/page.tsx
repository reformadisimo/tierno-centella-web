import Link from 'next/link';
import Plazo from '@/components/Plazo';
import VideoYoutube from '@/components/VideoYoutube';
import { DESPACHO } from '@/lib/despacho';
import { CASOS } from '@/lib/casos';
import { leerColeccion } from '@/lib/contenido';

export default function Inicio() {
  const hitos = CASOS.filter((c) => c.materia === 'Acoso laboral');
  const ultimos = leerColeccion('blog')
    .sort((a, b) => b.fecha.localeCompare(a.fecha))
    .slice(0, 3);

  return (
    <>
      <section className="portada-video">
        <picture>
          <source media="(max-width: 700px)" srcSet="/img/portada-poster-movil.webp" />
          <img className="poster" src="/img/portada-poster.webp" alt="" />
        </picture>
        <video autoPlay muted loop playsInline poster="/img/portada-poster.webp" aria-hidden="true">
          <source media="(max-width: 700px)" src="/video/portada-movil.webm" type="video/webm" />
          <source src="/video/portada.webm" type="video/webm" />
        </video>
        <div className="contenedor">
          <h1>Abogados laboralistas en Madrid, especialistas en acoso laboral.</h1>
          <p className="entradilla">
            Más de 25 años con despidos, acoso e incapacidad permanente. En 2005 conseguimos la primera condena en España al propio acosador. Hoy seguimos
            defendiendo a trabajadores de toda España, en nuestro despacho de Jorge Juan o por videollamada.
          </p>
          <div className="acciones">
            <Link className="boton boton-marcador" href="/herramientas/test-acoso">
              ¿Es acoso lo que me pasa?
            </Link>
            <Link className="boton boton-claro" href="/calculadora-indemnizacion">
              Calcular mi indemnización
            </Link>
          </div>
        </div>
      </section>

      <section className="seccion">
        <div className="contenedor">
          <h2>¿Qué te está pasando?</h2>
          <div className="dos-columnas" style={{ marginTop: 24 }}>
            <div>
              <h3 style={{ fontSize: '1.35rem', marginBottom: 10 }}>Me han despedido</h3>
              <p>Tienes 20 días hábiles para reclamar. Pon la fecha de tu carta y te decimos cuántos te quedan.</p>
              <Plazo />
            </div>
            <div style={{ display: 'grid', gap: 28, alignContent: 'start' }}>
              <div>
                <h3 style={{ fontSize: '1.35rem', marginBottom: 10 }}>Sufro acoso en el trabajo</h3>
                <p>No es un mal día ni un mal jefe: es un trato hostil que se repite. Se puede demostrar, y aquí te enseñamos cómo.</p>
                <div className="acciones" style={{ marginTop: 12 }}>
                  <Link className="boton" href="/herramientas/test-acoso">
                    Hacer el test
                  </Link>
                  <Link className="boton boton-claro" href="/acoso-laboral">
                    Guía del acoso laboral
                  </Link>
                </div>
              </div>
              <div>
                <h3 style={{ fontSize: '1.35rem', marginBottom: 10 }}>Me han denegado la incapacidad</h3>
                <p>Tienes 30 días hábiles para la reclamación previa. Muchas incapacidades denegadas se ganan después en el juzgado.</p>
                <div className="acciones" style={{ marginTop: 12 }}>
                  <Link className="boton" href="/herramientas/comprobador-incapacidad">
                    Comprobar mi caso
                  </Link>
                  <Link className="boton boton-claro" href="/incapacidad-permanente">
                    Guía de incapacidad
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="seccion seccion-blanca">
        <div className="contenedor">
          <h2>Casos que han abierto camino</h2>
          <ul className="hitos">
            {hitos.map((c) => (
              <li key={c.slug}>
                <strong>
                  {c.anio}. {c.titulo}
                </strong>
                <span>{c.resumen}</span>
              </li>
            ))}
          </ul>
          <div className="acciones">
            <Link className="boton boton-claro" href="/sentencias">
              Ver las fichas de cada caso
            </Link>
          </div>
        </div>
      </section>

      <section className="seccion">
        <div className="contenedor dos-columnas">
          <div>
            <img className="foto" src="/img/jesus-retrato.webp" alt="Jesús Tierno Centella" style={{ aspectRatio: '4 / 5', objectPosition: 'top', maxWidth: 440 }} />
          </div>
          <div>
            <h2>Te atiende un especialista, no una centralita</h2>
            <p>
              Jesús Tierno dirige el despacho y lleva personalmente los casos más complejos. Es coautor, con el psicólogo Bernabé Tierno, de{' '}
              <em>Valores en el trabajo</em>, y ha conversado en dos entrevistas con Iñaki Piñuel, uno de los mayores expertos en mobbing.
            </p>
            <VideoYoutube id="TwKRGi1LISY" titulo="Si te acosan en tu trabajo: entrevista a Jesús Tierno" />
            <p style={{ marginTop: 16 }}>
              <Link href="/jesus-tierno">Conoce a Jesús Tierno</Link>
            </p>
          </div>
        </div>
      </section>

      <section className="seccion seccion-blanca">
        <div className="contenedor">
          <h2>Herramientas gratuitas, sin dejar tu teléfono</h2>
          <ul className="servicios">
            <li>
              <Link href="/herramientas/mapa-de-pruebas">
                <strong>Mapa de pruebas</strong>
                <span>Qué pruebas de acoso tienes ya y cuáles te faltan.</span>
              </Link>
            </li>
            <li>
              <Link href="/herramientas/revisa-tu-carta-de-despido">
                <strong>Revisa tu carta</strong>
                <span>Los defectos de forma que pueden hacer improcedente tu despido.</span>
              </Link>
            </li>
            <li>
              <Link href="/calculadora-indemnizacion">
                <strong>Calculadora</strong>
                <span>Tu indemnización por despido objetivo o improcedente, al momento.</span>
              </Link>
            </li>
            <li>
              <Link href="/herramientas/plazos">
                <strong>Plazos</strong>
                <span>El último día para reclamar un despido, una sanción, una deuda o una incapacidad.</span>
              </Link>
            </li>
          </ul>
        </div>
      </section>

      {ultimos.length > 0 && (
        <section className="seccion">
          <div className="contenedor">
            <h2>Lo último en el blog</h2>
            <div className="rejilla-guias">
              {ultimos.map((p) => (
                <Link key={p.slug} href={`/blog/${p.slug}`}>
                  <strong>{p.titulo}</strong>
                  <span>{p.descripcion}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="seccion seccion-blanca">
        <div className="contenedor dos-columnas">
          <div>
            <h2>En Jorge Juan, en el centro de Madrid</h2>
            <p>
              Consulta de una hora con documentos, presencial o por videollamada: {DESPACHO.precioCita} € con un abogado del despacho o{' '}
              {DESPACHO.precioCitaJesus} € con Jesús Tierno. La primera orientación por teléfono o WhatsApp no tiene coste.
            </p>
            <div className="acciones">
              <Link className="boton" href="/contacto">
                Pedir cita
              </Link>
              <a className="boton boton-claro" href={DESPACHO.telefonoHref}>
                {DESPACHO.telefono}
              </a>
            </div>
          </div>
          <img className="foto" src="/img/fachada.webp" alt="Edificios del centro de Madrid" loading="lazy" />
        </div>
      </section>
    </>
  );
}
