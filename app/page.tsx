import Link from 'next/link';
import Plazo from '@/components/Plazo';
import VideoYoutube from '@/components/VideoYoutube';
import { DESPACHO } from '@/lib/despacho';
import { CASOS } from '@/lib/casos';
import { leerColeccion } from '@/lib/contenido';
import { fotoDePieza } from '@/components/PaginaGuia';
import ReelInstagram from '@/components/ReelInstagram';
import VideoPortada from '@/components/VideoPortada';
import { REELS } from '@/lib/redes';

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
          <img className="poster" src="/img/portada-poster.webp" alt="" fetchPriority="high" />
        </picture>
        <VideoPortada />
        <div className="contenedor">
          <h1>Abogados laboralistas en Madrid, especialistas en acoso laboral.</h1>
          <p className="entradilla">
            Más de 25 años con despidos, acoso e incapacidad permanente. En 2005 conseguimos la primera condena en España al propio acosador. Hoy seguimos
            defendiendo a trabajadoras y trabajadores de toda España, en nuestro despacho de Jorge Juan o por videollamada.
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

      <section className="avales" aria-label="Nuestra trayectoria">
        <div className="contenedor avales-fila">
          <div>
            <strong>2005</strong>
            <span>Primera condena en España a la empresa y al acosador a la vez</span>
          </div>
          <div>
            <strong>+25 años</strong>
            <span>Dedicados al derecho laboral, sobre todo al acoso</span>
          </div>
          <div>
            <strong>Un libro</strong>
            <span>Coautor de &quot;Valores en el trabajo&quot; con Bernabé Tierno</span>
          </div>
          <div>
            <strong>Iñaki Piñuel</strong>
            <span>Dos entrevistas con uno de los mayores expertos en mobbing</span>
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


      <section className="seccion seccion-arena">
        <div className="contenedor bloque-foto invertido">
          <img src="/img/abogada-escucha.webp" srcSet="/img/abogada-escucha-640.webp 640w, /img/abogada-escucha-960.webp 720w, /img/abogada-escucha.webp 872w" sizes="(max-width: 860px) 100vw, 50vw" alt="Una abogada del despacho escucha a una clienta" loading="lazy" />
          <div>
            <span className="etiqueta-calida">Mujer y trabajo</span>
            <h2 style={{ maxWidth: '22ch' }}>Embarazada, con hijos o cuidando a alguien: tu trabajo está protegido.</h2>
            <p>
              Un despido durante el embarazo o en el año siguiente a tu vuelta es nulo salvo causa real. Reducir la jornada para cuidar es un derecho. Y el acoso
              sexual o por ser mujer no se tolera. Te lo explicamos sin letra pequeña.
            </p>
            <ul className="lista-enlaces">
              <li>
                <Link href="/mujer-y-trabajo/despido-embarazada">Despido durante el embarazo o la lactancia</Link>
              </li>
              <li>
                <Link href="/mujer-y-trabajo/reduccion-y-adaptacion-de-jornada">Reducción y adaptación de jornada</Link>
              </li>
              <li>
                <Link href="/mujer-y-trabajo/acoso-sexual-y-por-razon-de-sexo">Acoso sexual y por razón de sexo</Link>
              </li>
              <li>
                <Link href="/mujer-y-trabajo/brecha-salarial-registro-retributivo">Cobro menos que un compañero</Link>
              </li>
            </ul>
            <div className="acciones">
              <Link className="boton" href="/herramientas/calendario-permisos">
                Calcular mis permisos
              </Link>
              <Link className="boton boton-claro" href="/mujer-y-trabajo">
                Ver todo
              </Link>
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
        <div className="contenedor dos-columnas" style={{ alignItems: 'center' }}>
          <div className="foto-destacada">
            <img width={1600} height={1019} src="/img/reunion-cliente.webp" srcSet="/img/reunion-cliente-640.webp 640w, /img/reunion-cliente-960.webp 960w, /img/reunion-cliente.webp 1600w" sizes="(max-width: 860px) 100vw, 50vw" alt="Jesús Tierno entrega documentación a una clienta en el despacho" loading="lazy" />
            <div className="sello">
              <strong>2005</strong>
              Primera condena en España a la empresa y al acosador a la vez
            </div>
          </div>
          <div>
            <h2>Te atiende un equipo especialista, no una centralita</h2>
            <p>
              Jesús Tierno dirige el despacho y lleva personalmente los casos más complejos. Es coautor, con el psicólogo Bernabé Tierno, de{' '}
              <em>Valores en el trabajo</em>, y ha conversado en dos entrevistas con Iñaki Piñuel, uno de los mayores expertos en mobbing.
            </p>
            <p>
              Con él trabaja un equipo de abogadas y abogados dedicado solo al derecho laboral. Desde la primera llamada sabes quién lleva tu caso, qué plazos
              corren y qué vas a pagar.
            </p>
            <VideoYoutube id="TwKRGi1LISY" titulo="Si te acosan en tu trabajo: entrevista a Jesús Tierno" />
            <p style={{ marginTop: 16 }}>
              <Link href="/jesus-tierno">Conoce a Jesús Tierno</Link>
            </p>
          </div>
        </div>
      </section>

      <section className="seccion seccion-cielo">
        <div className="contenedor">
          <h2>Así es el despacho</h2>
          <p>En la calle Jorge Juan, en el barrio de Salamanca. Un equipo pequeño que conoce cada caso por su nombre.</p>
          <div className="galeria" style={{ marginTop: 24 }}>
            <figure className="g-grande">
              <img src="/img/equipo.webp" srcSet="/img/equipo-640.webp 640w, /img/equipo.webp 1600w" sizes="(max-width: 860px) 100vw, 50vw" alt="Jesús Tierno con el equipo del despacho" loading="lazy" />
              <figcaption>El equipo de Tierno Centella</figcaption>
            </figure>
            <figure className="g-alta">
              <img src="/img/abogada-sonrie.webp" srcSet="/img/abogada-sonrie-640.webp 640w, /img/abogada-sonrie.webp 1067w" sizes="(max-width: 860px) 100vw, 50vw" alt="Una abogada del despacho sonríe durante una reunión" loading="lazy" />
            </figure>
            <figure>
              <img src="/img/biblioteca.webp" srcSet="/img/biblioteca-640.webp 640w, /img/biblioteca.webp 1080w" sizes="(max-width: 860px) 100vw, 50vw" alt="Reunión en la biblioteca del despacho" loading="lazy" />
            </figure>
            <figure>
              <img src="/img/jesus-firmando.webp" srcSet="/img/jesus-firmando-640.webp 640w, /img/jesus-firmando.webp 1280w" sizes="(max-width: 860px) 100vw, 50vw" alt="Jesús Tierno revisa un documento" loading="lazy" style={{ objectPosition: 'top' }} />
            </figure>
            <figure className="g-alta">
              <img src="/img/abogado-joven.webp" srcSet="/img/abogado-joven-640.webp 640w, /img/abogado-joven.webp 1067w" sizes="(max-width: 860px) 100vw, 50vw" alt="Un abogado del despacho trabaja con documentos" loading="lazy" />
            </figure>
            <figure className="g-grande">
              <img src="/img/reunion-equipo.webp" srcSet="/img/reunion-equipo-640.webp 640w, /img/reunion-equipo.webp 1600w" sizes="(max-width: 860px) 100vw, 50vw" alt="El equipo reunido alrededor de la mesa" loading="lazy" />
              <figcaption>Cada caso se estudia en equipo</figcaption>
            </figure>
            <figure className="g-alta">
              <img src="/img/papeleria.webp" srcSet="/img/papeleria-640.webp 640w, /img/papeleria.webp 1600w" sizes="(max-width: 860px) 100vw, 50vw" alt="Documentación con el logotipo del despacho" loading="lazy" />
            </figure>
          </div>
        </div>
      </section>

      <section className="seccion">
        <div className="contenedor">
          <h2>Herramientas gratuitas, sin dejar tu teléfono</h2>
          <ul className="servicios">
            <li>
              <Link href="/herramientas/test-acoso">
                <strong>¿Es acoso?</strong>
                <span>Siete preguntas para saber si lo que vives es acoso laboral.</span>
              </Link>
            </li>
            <li>
              <Link href="/calculadora-indemnizacion">
                <strong>Indemnización</strong>
                <span>Lo que te corresponde por despido objetivo o improcedente.</span>
              </Link>
            </li>
            <li>
              <Link href="/herramientas/calculadora-finiquito">
                <strong>Finiquito</strong>
                <span>Último mes, vacaciones y pagas extra que te deben.</span>
              </Link>
            </li>
            <li>
              <Link href="/herramientas/calculadora-paro">
                <strong>Paro</strong>
                <span>Cuánto cobrarás y durante cuántos meses.</span>
              </Link>
            </li>
            <li>
              <Link href="/herramientas/plazos">
                <strong>Plazos</strong>
                <span>El último día para reclamar, calculado con los días hábiles.</span>
              </Link>
            </li>
            <li>
              <Link href="/herramientas/calendario-permisos">
                <strong>Permisos por nacimiento</strong>
                <span>Las fechas de tus 19 semanas y de la protección de tu puesto.</span>
              </Link>
            </li>
            <li>
              <Link href="/herramientas/mapa-de-pruebas">
                <strong>Mapa de pruebas</strong>
                <span>Qué pruebas de acoso tienes y cuáles te faltan.</span>
              </Link>
            </li>
            <li>
              <Link href="/herramientas/revisa-tu-carta-de-despido">
                <strong>Revisa tu carta</strong>
                <span>Los defectos que pueden hacer improcedente tu despido.</span>
              </Link>
            </li>
          </ul>
          <p style={{ marginTop: 20 }}>
            <Link href="/herramientas">Ver todas las herramientas (14)</Link>
          </p>
        </div>
      </section>

      <section className="seccion seccion-arena">
        <div className="contenedor">
          <h2>Un minuto para entender tus derechos</h2>
          <p>Jesús Tierno y el equipo resuelven en Instagram las dudas que más llegan al despacho.</p>
          <div className="rejilla-reels">
            {REELS.slice(0, 4).map((r) => (
              <ReelInstagram key={r.id} reel={r} />
            ))}
          </div>
          <p style={{ marginTop: 20 }}>
            <Link href="/redes-y-medios">Más vídeos, radio y jornadas</Link>
          </p>
        </div>
      </section>

      {ultimos.length > 0 && (
        <section className="seccion">
          <div className="contenedor">
            <h2>Lo último en el blog</h2>
            <div className="tarjetas-foto">
              {ultimos.map((p) => {
                const f = fotoDePieza(p);
                return (
                  <Link key={p.slug} href={`/blog/${p.slug}`}>
                    <img src={f.src} srcSet={f.srcSet} sizes="(max-width: 760px) 100vw, 380px" alt={f.alt} width={640} height={480} loading="lazy" />
                    <div>
                      <strong>{p.titulo}</strong>
                      <span>{p.descripcion}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <section className="seccion seccion-blanca">
        <div className="contenedor dos-columnas">
          <div>
            <h2>En Jorge Juan, en el centro de Madrid</h2>
            <p>
              Consulta de una hora con documentos, presencial o por videollamada: {DESPACHO.precioCita} €{DESPACHO.iva} con un abogado del despacho o{' '}
              {DESPACHO.precioCitaJesus} €{DESPACHO.iva} con Jesús Tierno. Antes de reservar te decimos por teléfono o WhatsApp si tu caso la necesita.
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
          <img className="foto" width={1600} height={1067} src="/img/fachada.webp" srcSet="/img/fachada-640.webp 640w, /img/fachada-960.webp 960w, /img/fachada.webp 1600w" sizes="(max-width: 860px) 100vw, 50vw" alt="Edificios del centro de Madrid" loading="lazy" />
        </div>
      </section>
    </>
  );
}
