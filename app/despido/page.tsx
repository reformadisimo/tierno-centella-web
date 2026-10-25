import FotoVideo from '@/components/FotoVideo';
import { videoDeFoto } from '@/lib/video-foto';
import { Etiqueta } from '@/components/Etiqueta';
import type { Metadata } from 'next';
import FotoCabeza from '@/components/FotoCabeza';
import { meta } from '@/lib/seo';
import Link from 'next/link';
import IconoGuia from '@/components/IconoGuia';
import Llamada from '@/components/Llamada';
import LateralHub from '@/components/LateralHub';
import { leerColeccion } from '@/lib/contenido';
import VideoYoutube from '@/components/VideoYoutube';

export const metadata: Metadata = meta({
  titulo: 'Abogados de despido en Madrid',
  descripcion: 'Qué hacer si te despiden: plazo de 20 días hábiles, tipos de despido, indemnización y cuándo es nulo o improcedente.',
  ruta: '/despido',
});

export default function Despido() {
  return (
    <>
      <header className="cabeza-pagina cabeza-despido">
        <div className="contenedor cabeza-con-foto">
          <div>
            <Etiqueta icono="caja" tono="oro">Despido</Etiqueta>
            <h1>Te han despedido. Esto es lo que tienes que saber.</h1>
            <p className="entradilla">
              La empresa puede despedirte, pero tiene que justificarlo y cumplir unos requisitos. Si no lo hace, el despido es
              improcedente o nulo, y puedes reclamar.
            </p>
            <div className="acciones">
              <Link className="boton boton-marcador" href="/calculadora-indemnizacion">
                Calcular mi indemnización
              </Link>
            </div>
          </div>
          <FotoCabeza ruta="/despido" />
        </div>
      </header>

      <section className="seccion">
        <div className="contenedor con-lateral">
          <div className="texto">
          <div className="recuadro">
            <p>
              <strong>Tienes 20 días hábiles para reclamar</strong>, contados desde el día siguiente al despido. No cuentan los
              sábados, los domingos ni los festivos; agosto sí cuenta. Si se pasa el plazo, el despido ya no se puede impugnar.
            </p>
          </div>

          <h2>Los dos tipos de despido</h2>
          <h3>Despido objetivo</h3>
          <p>
            Se basa en causas económicas, técnicas, organizativas o de producción. Para que sea válido, la empresa tiene que cumplir
            tres requisitos a la vez:
          </p>
          <ul>
            <li>Darte una carta que explique la causa con detalle.</li>
            <li>Avisarte con 15 días de antelación, o pagarte esos días.</li>
            <li>Pagarte la indemnización de 20 días por año trabajado el mismo día que te entrega la carta.</li>
          </ul>
          <p>Si falla cualquiera de los tres, o la causa no se puede demostrar, el despido puede ser improcedente.</p>

          <h3>Despido disciplinario</h3>
          <p>
            La empresa te acusa de una falta grave: ausencias, retrasos, desobediencia o bajo rendimiento. Tiene que probarla y la
            sanción tiene que ser proporcionada. Desde noviembre de 2024, además, debe darte la oportunidad de explicarte antes de
            despedirte.
          </p>

          <figure className="prosa-foto">
            {videoDeFoto('firma-contrato') ? (
              <FotoVideo foto="firma-contrato" alt="Una pareja firma un documento sobre una mesa" video={videoDeFoto('firma-contrato')!} sizes="(max-width: 1000px) 100vw, 720px" />
            ) : (
              <img src="/img/firma-contrato-640.webp" srcSet="/img/firma-contrato-640.webp 640w, /img/firma-contrato.webp 1200w" sizes="(max-width: 1000px) 100vw, 720px" alt="Una persona firma un documento" width={1200} height={800} loading="lazy" decoding="async" />
            )}
          </figure>
          <h2>Qué puede decidir el juez</h2>
          <table className="tabla">
            <thead>
              <tr>
                <th>Si el despido es</th>
                <th>Qué pasa</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Procedente</td>
                <td>La causa está probada. En el objetivo cobras 20 días por año; en el disciplinario, nada.</td>
              </tr>
              <tr>
                <td>Improcedente</td>
                <td>
                  La empresa elige entre readmitirte o pagarte 33 días por año trabajado, con un máximo de 24 mensualidades. Para el
                  tiempo trabajado antes del 12 de febrero de 2012 se cuentan 45 días por año.
                </td>
              </tr>
              <tr>
                <td>Nulo</td>
                <td>
                  El despido vulnera un derecho fundamental. La empresa tiene que readmitirte y pagarte los salarios que no has
                  cobrado, y puedes reclamar una indemnización por daños.
                </td>
              </tr>
            </tbody>
          </table>

          <figure className="prosa-foto">
            {videoDeFoto('despido-caja') ? (
              <FotoVideo foto="despido-caja" alt="Una persona recoge sus cosas en una caja tras un despido" video={videoDeFoto('despido-caja')!} sizes="(max-width: 1000px) 100vw, 720px" />
            ) : (
              <img src="/img/despido-caja-640.webp" srcSet="/img/despido-caja-640.webp 640w, /img/despido-caja.webp 1200w" sizes="(max-width: 1000px) 100vw, 720px" alt="Una persona recoge sus cosas en una caja tras un despido" width={1200} height={800} loading="lazy" decoding="async" />
            )}
          </figure>
          <h2>Cuándo un despido puede ser nulo</h2>
          <p>La ley protege especialmente a quien estaba en alguna de estas situaciones al ser despedido:</p>
          <ul>
            <li>Embarazo, o haber tenido un hijo en los 12 meses anteriores.</li>
            <li>Reducción de jornada, excedencia o permisos por cuidado de hijos o familiares.</li>
            <li>Haber reclamado a la empresa, denunciado o acudido a la Inspección de Trabajo.</li>
            <li>Ser representante de los trabajadores.</li>
            <li>Sufrir acoso o discriminación antes del despido.</li>
          </ul>

          <h2>Qué hacer hoy</h2>
          <ol className="pasos-numerados">
            <li>Firma la carta como “recibido, no conforme”. Firmar no significa aceptar el despido.</li>
            <li>Guarda la carta, tus últimas nóminas y el contrato.</li>
            <li>No firmes el finiquito como conforme sin que lo revise un abogado.</li>
            <li>Llámanos o calcula tu indemnización para saber cuánto está en juego.</li>
          </ol>
          </div>
          <LateralHub plazo="Tienes 20 días hábiles desde el despido para reclamar. Lo primero que miramos es tu plazo." herramienta={{ href: '/calculadora-indemnizacion', texto: 'Calcula tu indemnización' }} whatsapp="Hola, me han despedido y quiero consultar mi caso." />
        </div>
      </section>
      <section className="seccion seccion-blanca">
        <div className="contenedor">
          <h2>Guías para tu caso</h2>
          <div className="rejilla-guias con-icono">
            {leerColeccion('despido').map((g) => (
              <Link key={g.slug} href={`/despido/${g.slug}`}>
                <IconoGuia pieza={g} tono="azul" />
                <div><strong>{g.titulo}</strong>
                <span>{g.descripcion}</span></div>
              </Link>
            ))}
            {leerColeccion('blog')
              .filter((g) => g.categoria === 'despido')
              .map((g) => (
                <Link key={g.slug} href={`/blog/${g.slug}`}>
                  <IconoGuia pieza={g} tono="azul" />
                  <div><strong>{g.titulo}</strong>
                  <span>{g.descripcion}</span></div>
                </Link>
              ))}
          </div>
          <div style={{ marginTop: 40 }}>
            <h2>Un caso del despacho en vídeo</h2>
            <VideoYoutube id="IoBEF41_SCI" titulo="Sentencia ganada: la prueba del GPS en un despido" />
          </div>
        </div>
      </section>
      <Llamada asunto="despido" />
    </>
  );
}
