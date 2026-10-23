import type { Metadata } from 'next';
import Link from 'next/link';
import { meta, esquemaMigas } from '@/lib/seo';
import { DESPACHO, enlaceWhatsapp } from '@/lib/despacho';
import VideoAmbiente from '@/components/VideoAmbiente';
import FormularioContacto from '@/components/FormularioContacto';
import Mapa from '@/components/Mapa';
import JsonLd from '@/components/JsonLd';

export const metadata: Metadata = meta({
  titulo: 'Contacto y citas con abogados laboralistas en Madrid',
  descripcion:
    'Llámanos, escríbenos por WhatsApp o déjanos tu teléfono. Consulta de una hora en Jorge Juan, Madrid, o por videollamada desde toda España.',
  ruta: '/contacto',
});

export default function Contacto() {
  return (
    <>
      <JsonLd datos={esquemaMigas([{ href: '/', texto: 'Inicio' }, { href: '/contacto', texto: 'Contacto' }])} />
      <header className="cabeza-pagina">
        <div className="contenedor">
          <nav className="migas" aria-label="Estás en">
            <Link href="/">Inicio</Link> / Contacto
          </nav>
          <h1>Habla con un abogado</h1>
          <p className="entradilla">
            La primera orientación por teléfono o WhatsApp no tiene coste. Si tu caso lo necesita, lo estudiamos a fondo en una consulta de una
            hora.
          </p>
          <div className="acciones">
            <a className="boton" href={DESPACHO.telefonoHref}>
              Llamar al {DESPACHO.telefono}
            </a>
            <a className="boton boton-claro" href={enlaceWhatsapp('Hola, quiero consultar un caso laboral.')}>
              WhatsApp {DESPACHO.whatsapp}
            </a>
          </div>
        </div>
      </header>
      <section className="seccion">
        <div className="contenedor dos-columnas">
          <FormularioContacto />
          <div className="texto">
            <VideoAmbiente src="/video/consulta.webm" poster="/img/consulta-poster.webp" alt="Jesús Tierno reunido con una clienta en el despacho" />
            <h2>Consulta de una hora</h2>
            <p>Estudiamos tus documentos y sales con un plan de acción. Presencial en el despacho o por videollamada.</p>
            <table className="tabla">
              <tbody>
                <tr>
                  <td>Con un abogado del despacho</td>
                  <td>
                    <strong>{DESPACHO.precioCita} €</strong>
                  </td>
                </tr>
                <tr>
                  <td>Con Jesús Tierno</td>
                  <td>
                    <strong>{DESPACHO.precioCitaJesus} €</strong>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="acciones">
              <a className="boton boton-marcador" href={DESPACHO.citaAbogado}>
                Reservar consulta
              </a>
              <a className="boton boton-claro" href={DESPACHO.citaJesus}>
                Reservar con Jesús Tierno
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="seccion seccion-cielo">
        <div className="contenedor dos-columnas">
          <div>
            <h2>Dónde estamos</h2>
            <p>
              {DESPACHO.direccion}
              <br />
              {DESPACHO.ciudad}
            </p>
            <p>
              <a href={DESPACHO.telefonoHref}>{DESPACHO.telefono}</a>
              <br />
              <a href={`mailto:${DESPACHO.email}`}>{DESPACHO.email}</a>
            </p>
            <p>Atendemos casos de toda España por videollamada.</p>
          </div>
          <Mapa />
        </div>
      </section>
    </>
  );
}
