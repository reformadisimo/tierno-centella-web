import EsquemaPagina from '@/components/EsquemaPagina';
import FotoVideo from '@/components/FotoVideo';
import { videoDeFoto } from '@/lib/video-foto';
import Link from 'next/link';
import IconoMenu, { tipoIcono } from '@/components/IconoMenu';
import Icono from '@/components/Iconos';
import { Etiqueta } from '@/components/Etiqueta';
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
      <EsquemaPagina ruta="/" />
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
              <Icono nombre="checkCirculo" tam={18} /> ¿Es acoso lo que me pasa?
            </Link>
            <Link className="boton boton-claro" href="/calculadora-indemnizacion">
              <Icono nombre="calculadora" tam={18} /> Calcular mi indemnización
            </Link>
          </div>
        </div>
      </section>

      <nav className="areas-franja" aria-label="En qué te ayudamos">
        <div className="contenedor areas-fila">
          {[
            ['/acoso-laboral', 'personas', 'Acoso laboral', 'Demostrarlo y reclamar'],
            ['/despido', 'caja', 'Despido', 'Plazos e indemnización'],
            ['/incapacidad-permanente', 'sillaRuedas', 'Incapacidad', 'Grados y recursos'],
            ['/mujer-y-trabajo', 'embarazo', 'Mujer y trabajo', 'Embarazo y conciliación'],
            ['/empresas', 'edificio', 'Empresas y colegios', 'Protocolos y formación'],
          ].map(([href, icono, titulo, sub]) => (
            <Link key={href} href={href}>
              <span className="af-icono"><Icono nombre={icono} tam={22} /></span>
              <span className="af-texto">
                <strong>{titulo}</strong>
                <small>{sub}</small>
              </span>
            </Link>
          ))}
        </div>
      </nav>

      <section className="seccion">
        <div className="contenedor">
          <Etiqueta icono="corazon">Empieza por aquí</Etiqueta>
          <h2>¿Qué te está pasando?</h2>
          <p className="intro-seccion">Elige tu situación y te decimos, sin dejar datos, cuál es tu siguiente paso.</p>
          <p className="desliza-pista" aria-hidden="true">Desliza para ver más &rarr;</p>
          <div className="pasando">
            <article className="pasando-tarjeta pt-despido">
              <span className="pt-icono"><Icono nombre="caja" tam={26} /></span>
              <h3>Me han despedido</h3>
              <p>Tienes 20 días hábiles para reclamar. Pon la fecha de tu carta y te decimos cuántos te quedan.</p>
              <Plazo />
            </article>
            <article className="pasando-tarjeta pt-acoso">
              <span className="pt-icono"><Icono nombre="personas" tam={26} /></span>
              <h3>Sufro acoso en el trabajo</h3>
              <p>No es un mal día ni un mal jefe: es un trato hostil que se repite. Se puede demostrar, y aquí te enseñamos cómo.</p>
              <div className="pt-panel pt-panel-acoso">
                <strong>Señales que suelen repetirse</strong>
                <ul>
                  <li>Te aíslan o dejan de hablarte</li>
                  <li>Te quitan funciones sin explicación</li>
                  <li>Críticas o burlas delante de otros</li>
                  <li>Órdenes que cambian para que falles</li>
                </ul>
                <small>Si te suena, el test te dice en dos minutos qué pasos tienes.</small>
              </div>
              <div className="acciones">
                <Link className="boton" href="/herramientas/test-acoso"><Icono nombre="checkCirculo" tam={17} /> Hacer el test</Link>
                <Link className="boton boton-claro" href="/acoso-laboral">Guía del acoso laboral</Link>
              </div>
            </article>
            <article className="pasando-tarjeta pt-incapacidad">
              <span className="pt-icono"><Icono nombre="escudo" tam={26} /></span>
              <h3>Me han denegado la incapacidad</h3>
              <p>Tienes 30 días hábiles para la reclamación previa. Muchas incapacidades denegadas se ganan después en el juzgado.</p>
              <div className="pt-panel pt-panel-incap">
                <strong>Qué suele venir después</strong>
                <ul>
                  <li>Reclamación previa al INSS (30 días hábiles)</li>
                  <li>Si te la deniegan, demanda en el juzgado de lo social</li>
                  <li>Informes médicos al día y bien explicados</li>
                  <li>Te decimos qué grado podría corresponderte</li>
                </ul>
                <small>El comprobador te orienta en un minuto, sin dejar datos.</small>
              </div>
              <div className="acciones">
                <Link className="boton" href="/herramientas/comprobador-incapacidad"><Icono nombre="escudo" tam={17} /> Comprobar mi caso</Link>
                <Link className="boton boton-claro" href="/incapacidad-permanente">Guía de incapacidad</Link>
              </div>
            </article>
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
                <Icono nombre="calendario" tam={17} /> Calcular mis permisos
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
          <Etiqueta icono="balanza">Sentencias</Etiqueta>
          <h2>Casos que han abierto camino</h2>
          <p className="desliza-pista" aria-hidden="true">Desliza para ver más &rarr;</p>
          <ul className="hitos">
            {hitos.map((c) => (
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
            <Etiqueta icono="personas">El despacho</Etiqueta>
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
        <div className="contenedor">
          <ul className="cifras-oro" aria-label="Nuestra trayectoria">
            <li>
              <span className="co-icono"><Icono nombre="premio" tam={28} /></span>
              <strong>+25 años</strong>
              <i />
              <span>dedicados al derecho laboral, sobre todo al acoso</span>
            </li>
            <li>
              <span className="co-icono"><Icono nombre="balanza" tam={28} /></span>
              <strong>2005</strong>
              <i />
              <span>primera condena en España a la empresa y al acosador a la vez</span>
            </li>
            <li>
              <span className="co-icono"><Icono nombre="libro" tam={28} /></span>
              <strong>Un libro</strong>
              <i />
              <span>coautor de &quot;Valores en el trabajo&quot; con Bernabé Tierno</span>
            </li>
            <li>
              <span className="co-icono"><Icono nombre="micro" tam={28} /></span>
              <strong>Iñaki Piñuel</strong>
              <i />
              <span>dos entrevistas con uno de los mayores expertos en mobbing</span>
            </li>
          </ul>
        </div>
      </section>

      <section className="seccion seccion-cielo">
        <div className="contenedor">
          <Etiqueta icono="corazon">El equipo</Etiqueta>
          <h2>Las personas que van a llevar tu caso</h2>
          <p className="intro-seccion">En la calle Jorge Juan, en el barrio de Salamanca. Un equipo de abogadas y abogados que conoce cada caso por su nombre y te cuenta en qué punto está sin que tengas que preguntar.</p>
          <div className="equipo">
            <figure className="equipo-grupo">
              <img src="/img/equipo.webp" srcSet="/img/equipo-640.webp 640w, /img/equipo.webp 1600w" sizes="(max-width: 860px) 100vw, 60vw" alt="Jesús Tierno con el equipo del despacho" loading="lazy" />
              <figcaption>El equipo de Tierno Centella, en el despacho de Jorge Juan</figcaption>
            </figure>
            <ul className="equipo-valores">
              <li><Icono nombre="telefono" tam={18} /><span><b>Te llamamos nosotros.</b> Sin centralita: hablas con quien lleva tu caso.</span></li>
              <li><Icono nombre="reloj" tam={18} /><span><b>Los plazos, vigilados.</b> Te avisamos antes de que venza cada uno.</span></li>
              <li><Icono nombre="euro" tam={18} /><span><b>Sabes lo que vas a pagar</b> antes de empezar. Sin sorpresas.</span></li>
              <li><Icono nombre="video" tam={18} /><span><b>Presencial o por videollamada</b>, desde cualquier punto de España.</span></li>
            </ul>
            <ul className="equipo-retratos" aria-label="El equipo">
              {[
                ['jesus-retrato', 'Jesús Tierno', 'Socio director', 'top'],
                ['abogada-sonrie', '', 'Abogada laboralista', 'top'],
                ['abogada-lee', '', 'Abogada laboralista', 'top'],
                ['abogado-joven', '', 'Abogado laboralista', 'top'],
                ['abogada-escucha', '', 'Atención a clientes', 'center'],
              ].map(([foto, nombre, cargo, pos]) => (
                <li key={foto}>
                  <img src={`/img/${foto}-640.webp`} alt="" width={120} height={120} loading="lazy" style={{ objectPosition: pos }} />
                  {nombre ? <strong>{nombre}</strong> : null}
                  <small>{cargo}</small>
                </li>
              ))}
            </ul>
          </div>
          <div className="galeria galeria-mini" style={{ marginTop: 18 }}>
            <figure>
              <img src="/img/biblioteca.webp" srcSet="/img/biblioteca-640.webp 640w, /img/biblioteca.webp 1080w" sizes="(max-width: 860px) 50vw, 33vw" alt="Reunión en la biblioteca del despacho" loading="lazy" />
            </figure>
            <figure>
              <img src="/img/reunion-equipo.webp" srcSet="/img/reunion-equipo-640.webp 640w, /img/reunion-equipo.webp 1600w" sizes="(max-width: 860px) 50vw, 33vw" alt="El equipo reunido alrededor de la mesa" loading="lazy" />
              <figcaption>Cada caso se estudia en equipo</figcaption>
            </figure>
            <figure>
              <img src="/img/papeleria.webp" srcSet="/img/papeleria-640.webp 640w, /img/papeleria.webp 1600w" sizes="(max-width: 860px) 50vw, 33vw" alt="Documentación con el logotipo del despacho" loading="lazy" />
            </figure>
          </div>
        </div>
      </section>

      <section className="seccion">
        <div className="contenedor">
          <Etiqueta icono="calculadora">Herramientas</Etiqueta>
          <h2>Resuelve tus dudas ahora, sin dejar tu teléfono</h2>
          <p className="desliza-pista" aria-hidden="true">Desliza para ver más &rarr;</p>
          <ul className="herr-tarjetas">
            <li className="ht-c0">
              <Link href="/herramientas/test-acoso">
                <span className="ht-icono"><IconoMenu tipo={tipoIcono('/herramientas/test-acoso', '¿Es acoso?')} tam={24} /></span>
                <strong>¿Es acoso?</strong>
                <span>Siete preguntas para saber si lo que vives es acoso laboral.</span>
                <em>Probar</em>
              </Link>
            </li>
            <li className="ht-c1">
              <Link href="/calculadora-indemnizacion">
                <span className="ht-icono"><IconoMenu tipo={tipoIcono('/calculadora-indemnizacion', 'Indemnización')} tam={24} /></span>
                <strong>Indemnización</strong>
                <span>Lo que te corresponde por despido objetivo o improcedente.</span>
                <em>Probar</em>
              </Link>
            </li>
            <li className="ht-c2">
              <Link href="/herramientas/calculadora-finiquito">
                <span className="ht-icono"><IconoMenu tipo={tipoIcono('/herramientas/calculadora-finiquito', 'Finiquito')} tam={24} /></span>
                <strong>Finiquito</strong>
                <span>Último mes, vacaciones y pagas extra que te deben.</span>
                <em>Probar</em>
              </Link>
            </li>
            <li className="ht-c3">
              <Link href="/herramientas/calculadora-paro">
                <span className="ht-icono"><IconoMenu tipo={tipoIcono('/herramientas/calculadora-paro', 'Paro')} tam={24} /></span>
                <strong>Paro</strong>
                <span>Cuánto cobrarás y durante cuántos meses.</span>
                <em>Probar</em>
              </Link>
            </li>
            <li className="ht-c0">
              <Link href="/herramientas/plazos">
                <span className="ht-icono"><IconoMenu tipo={tipoIcono('/herramientas/plazos', 'Plazos')} tam={24} /></span>
                <strong>Plazos</strong>
                <span>El último día para reclamar, calculado con los días hábiles.</span>
                <em>Probar</em>
              </Link>
            </li>
            <li className="ht-c1">
              <Link href="/herramientas/calendario-permisos">
                <span className="ht-icono"><IconoMenu tipo={tipoIcono('/herramientas/calendario-permisos', 'Permisos por nacimiento')} tam={24} /></span>
                <strong>Permisos por nacimiento</strong>
                <span>Las fechas de tus 19 semanas y de la protección de tu puesto.</span>
                <em>Probar</em>
              </Link>
            </li>
            <li className="ht-c2">
              <Link href="/herramientas/mapa-de-pruebas">
                <span className="ht-icono"><IconoMenu tipo={tipoIcono('/herramientas/mapa-de-pruebas', 'Mapa de pruebas')} tam={24} /></span>
                <strong>Mapa de pruebas</strong>
                <span>Qué pruebas de acoso tienes y cuáles te faltan.</span>
                <em>Probar</em>
              </Link>
            </li>
            <li className="ht-c3">
              <Link href="/herramientas/revisa-tu-carta-de-despido">
                <span className="ht-icono"><IconoMenu tipo={tipoIcono('/herramientas/revisa-tu-carta-de-despido', 'Revisa tu carta')} tam={24} /></span>
                <strong>Revisa tu carta</strong>
                <span>Los defectos que pueden hacer improcedente tu despido.</span>
                <em>Probar</em>
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
          <Etiqueta icono="video">Vídeos</Etiqueta>
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
            <Etiqueta icono="documento">Blog</Etiqueta>
            <h2>Para leer con calma: lo último del blog</h2>
            <p className="desliza-pista" aria-hidden="true">Desliza para ver más &rarr;</p>
          <div className="tarjetas-foto">
              {ultimos.map((p) => {
                const f = fotoDePieza(p);
                return (
                  <Link key={p.slug} href={`/blog/${p.slug}`}>
                    <img src={f.src} srcSet={f.srcSet} sizes="(max-width: 760px) 100vw, 380px" alt={f.alt} width={640} height={480} loading="lazy" />
                    <div>
                      <span className="tf-meta">
                        {p.categoria && <em className="tf-chip">{p.categoria}</em>}
                        <small><Icono nombre="reloj" tam={13} /> {p.minutos} min de lectura</small>
                      </span>
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
            <Etiqueta icono="pin">Contacto</Etiqueta>
            <h2>En Jorge Juan, en el centro de Madrid</h2>
            <p>
              Consulta de una hora con documentos, presencial o por videollamada: {DESPACHO.precioCita} €{DESPACHO.iva} con un abogado del despacho o{' '}
              {DESPACHO.precioCitaJesus} €{DESPACHO.iva} con Jesús Tierno. Antes de reservar te decimos por teléfono o WhatsApp si tu caso la necesita.
            </p>
            <div className="acciones">
              <Link className="boton" href="/reservar">
                <Icono nombre="calendario" tam={17} /> Pedir cita
              </Link>
              <a className="boton boton-claro" href={DESPACHO.telefonoHref}>
                <Icono nombre="telefono" tam={17} /> {DESPACHO.telefono}
              </a>
            </div>
          </div>
          <div className="foto-viva">
            {videoDeFoto('fachada') ? (
              <FotoVideo foto="fachada" alt="Vista desde el despacho de Jorge Juan, en Madrid" video={videoDeFoto('fachada')!} sizes="(max-width: 860px) 100vw, 50vw" />
            ) : (
              <img className="foto" width={1600} height={1067} src="/img/fachada.webp" srcSet="/img/fachada-640.webp 640w, /img/fachada-960.webp 960w, /img/fachada.webp 1600w" sizes="(max-width: 860px) 100vw, 50vw" alt="Edificios del centro de Madrid" loading="lazy" />
            )}
          </div>
        </div>
      </section>
    </>
  );
}
