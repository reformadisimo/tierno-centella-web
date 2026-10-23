import Link from 'next/link';
import Plazo from '@/components/Plazo';
import { DESPACHO } from '@/lib/despacho';

export default function Inicio() {
  return (
    <>
      <section className="portada">
        <div className="contenedor portada-rejilla">
          <h1 className="portada-titulo">Si te han despedido, tienes 20 días hábiles para reclamar.</h1>
          <div className="portada-plazo">
            <Plazo />
          </div>
          <div className="portada-texto">
            <p className="entradilla">
              Somos un despacho de abogados laboralistas en Madrid. Desde hace más de 25 años defendemos a trabajadores frente a
              despidos, acoso laboral e incapacidades denegadas.
            </p>
            <div className="acciones">
              <Link className="boton boton-marcador" href="/calculadora-indemnizacion">
                Calcular mi indemnización
              </Link>
              <a className="boton boton-claro" href={DESPACHO.telefonoHref}>
                Llamar al {DESPACHO.telefono}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="seccion">
        <div className="contenedor">
          <h2>En qué te ayudamos</h2>
          <ul className="servicios">
            <li>
              <Link href="/despido">
                <strong>Despido</strong>
                <span>Revisamos tu carta y calculamos lo que te deben. Si el despido es improcedente o nulo, lo reclamamos.</span>
              </Link>
            </li>
            <li>
              <Link href="/acoso-laboral">
                <strong>Acoso laboral</strong>
                <span>Te ayudamos a reunir las pruebas, a protegerte mientras sigues trabajando y a reclamar a la empresa y al acosador.</span>
              </Link>
            </li>
            <li>
              <Link href="/incapacidad-permanente">
                <strong>Incapacidad permanente</strong>
                <span>Si la Seguridad Social te la ha denegado o te ha dado un grado menor del que te corresponde, la recurrimos.</span>
              </Link>
            </li>
            <li>
              <Link href="/contacto">
                <strong>Empresas</strong>
                <span>Asesoramiento laboral a pymes y centros educativos, protocolos de acoso e investigaciones internas.</span>
              </Link>
            </li>
          </ul>
        </div>
      </section>

      <section className="seccion seccion-blanca">
        <div className="contenedor">
          <h2>Casos que han abierto camino</h2>
          <ul className="hitos">
            <li>
              <strong>Primera condena en España a la empresa y al acosador a la vez</strong>
              <span>Los dos fueron condenados a pagar los daños de forma solidaria a la víctima de acoso laboral.</span>
            </li>
            <li>
              <strong>123.000 € para una docente acosada</strong>
              <span>
                La Universidad Rey Juan Carlos, condenada por no evitar el acoso que sufría una profesora.{' '}
                <a href="https://www.elespanol.com/reportajes/20240402/universidad-rey-juan-carlos-condenada-pagar-eur-docente-no-evitar-acoso-laboral/844415900_0.html">
                  Lo contó El Español
                </a>
                .
              </span>
            </li>
            <li>
              <strong>Primera condena por acoso en la administración educativa de Castilla y León</strong>
              <span>Un precedente para el profesorado de la enseñanza pública.</span>
            </li>
          </ul>
          <div className="acciones">
            <Link className="boton boton-claro" href="/sentencias">
              Ver más sentencias
            </Link>
          </div>
        </div>
      </section>

      <section className="seccion">
        <div className="contenedor dos-columnas">
          <div>
            <h2>Hablas con un abogado desde el primer día</h2>
            <p>
              Cuéntanos tu caso por teléfono o WhatsApp y te diremos si tiene recorrido. Si quieres que lo estudiemos a fondo, con tus
              documentos, reservas una consulta de una hora, presencial en Jorge Juan o por videollamada.
            </p>
          </div>
          <div>
            <p>
              <strong>Consulta con un abogado del despacho:</strong> {DESPACHO.precioCita} €.
              <br />
              <strong>Consulta con Jesús Tierno:</strong> {DESPACHO.precioCitaJesus} €.
            </p>
            <div className="acciones">
              <Link className="boton" href="/contacto">
                Pedir cita
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
