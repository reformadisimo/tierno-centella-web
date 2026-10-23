import Link from 'next/link';
import type { Metadata } from 'next';
import { meta } from '@/lib/seo';
import Llamada from '@/components/Llamada';
import LateralHub from '@/components/LateralHub';
import { leerColeccion } from '@/lib/contenido';

export const metadata: Metadata = meta({
  titulo: 'Abogados de incapacidad permanente en Madrid',
  descripcion: 'Grados de incapacidad permanente, cuánto se cobra en cada uno y cómo recurrir si la Seguridad Social te la deniega.',
  ruta: '/incapacidad-permanente',
});

export default function Incapacidad() {
  return (
    <>
      <header className="cabeza-pagina">
        <div className="contenedor cabeza-con-foto">
          <div>
            <nav className="migas" aria-label="Estás en">
              <Link href="/">Inicio</Link> / Incapacidad permanente
            </nav>
            <h1>Te han denegado la incapacidad. Se puede recurrir.</h1>
            <p className="entradilla">
              Muchas incapacidades que la Seguridad Social deniega se acaban reconociendo en el juzgado. Revisamos tu expediente y te
              decimos qué grado te puede corresponder.
            </p>
            <div className="acciones">
              <Link className="boton boton-marcador" href="/herramientas/comprobador-incapacidad">
                Comprobar mi caso
              </Link>
              <Link className="boton boton-claro" href="/incapacidad-permanente/reclamacion-previa-y-demanda">
                Si te la han denegado
              </Link>
            </div>
          </div>
          <div>
            <img
              className="foto"
              src="/img/incapacidad-ventana.webp" srcSet="/img/incapacidad-ventana-640.webp 640w, /img/incapacidad-ventana.webp 1000w" sizes="(max-width: 860px) 100vw, 50vw"
              alt="Una mujer, a contraluz junto a una ventana de oficina, se lleva la mano a la frente con un café en la otra"
              width={1000}
              height={676}
              fetchPriority="high"
            />
            <p className="foto-pie">Imagen ilustrativa.</p>
          </div>
        </div>
      </header>

      <section className="seccion">
        <div className="contenedor con-lateral">
          <div className="texto">
          <div className="recuadro">
            <p>
              <strong>Tienes 30 días hábiles para la reclamación previa</strong> desde que te notifican la resolución. Es el primer
              paso obligatorio antes de ir a juicio.
            </p>
          </div>

          <div className="recuadro">
            <p>
              <strong>Novedad de 2025.</strong> Desde la Ley 2/2025, la incapacidad permanente ya no extingue automáticamente tu contrato. Puedes
              pedir seguir en la empresa, y esta debe intentar adaptar tu puesto o recolocarte.
            </p>
          </div>

          <h2>Los cuatro grados y lo que se cobra</h2>
          <table className="tabla tabla-fichas">
            <thead>
              <tr>
                <th>Grado</th>
                <th>Cuándo se reconoce</th>
                <th>Qué cobras</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td data-label="Grado">Parcial</td>
                <td data-label="Cuándo se reconoce">Tu rendimiento en tu profesión baja al menos un 33 %, pero puedes seguir en ella.</td>
                <td data-label="Qué cobras">Un pago único de 24 mensualidades de tu base reguladora.</td>
              </tr>
              <tr>
                <td data-label="Grado">Total</td>
                <td data-label="Cuándo se reconoce">No puedes hacer tu profesión habitual, pero sí otra distinta.</td>
                <td data-label="Qué cobras">El 55 % de tu base reguladora cada mes; el 75 % desde los 55 años si no encuentras otro empleo.</td>
              </tr>
              <tr>
                <td data-label="Grado">Absoluta</td>
                <td data-label="Cuándo se reconoce">No puedes hacer ningún trabajo.</td>
                <td data-label="Qué cobras">El 100 % de tu base reguladora cada mes.</td>
              </tr>
              <tr>
                <td data-label="Grado">Gran incapacidad</td>
                <td data-label="Cuándo se reconoce">Además necesitas ayuda de otra persona para la vida diaria.</td>
                <td data-label="Qué cobras">La pensión de la absoluta más un complemento para pagar esa ayuda.</td>
              </tr>
            </tbody>
          </table>

          <h2>Cómo trabajamos un caso de incapacidad</h2>
          <ol>
            <li>Estudiamos la resolución del INSS y tus informes médicos.</li>
            <li>Te decimos qué grado es realista pedir y qué informes faltan.</li>
            <li>Presentamos la reclamación previa dentro de plazo.</li>
            <li>Si la deniegan, presentamos la demanda y te defendemos en el juicio.</li>
          </ol>
          </div>
          <LateralHub plazo="Si te la han denegado, tienes 30 días hábiles para la reclamación previa." herramienta={{ href: '/herramientas/comprobador-incapacidad', texto: 'Comprueba tu grado y tu plazo' }} whatsapp="Hola, quiero consultar un caso de incapacidad permanente." />
        </div>
      </section>
      <section className="seccion seccion-blanca">
        <div className="contenedor">
          <h2>Guías para tu caso</h2>
          <div className="rejilla-guias">
            {leerColeccion('incapacidad').map((g) => (
              <Link key={g.slug} href={`/incapacidad-permanente/${g.slug}`}>
                <strong>{g.titulo}</strong>
                <span>{g.descripcion}</span>
              </Link>
            ))}
            {leerColeccion('blog')
              .filter((g) => g.categoria === 'incapacidad')
              .map((g) => (
                <Link key={g.slug} href={`/blog/${g.slug}`}>
                  <strong>{g.titulo}</strong>
                  <span>{g.descripcion}</span>
                </Link>
              ))}
          </div>
        </div>
      </section>
      <Llamada asunto="incapacidad permanente" />
    </>
  );
}
