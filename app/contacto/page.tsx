import type { Metadata } from 'next';
import { DESPACHO, enlaceWhatsapp } from '@/lib/despacho';

export const metadata: Metadata = {
  title: 'Contacto y citas',
  description: 'Llámanos, escríbenos por WhatsApp o reserva una consulta presencial en Madrid o por videollamada.',
};

export default function Contacto() {
  return (
    <>
      <header className="cabeza-pagina">
        <div className="contenedor">
          <h1>Habla con un abogado</h1>
          <p className="entradilla">
            Cuéntanos tu caso por teléfono o WhatsApp sin coste. Si necesitas que lo estudiemos a fondo, reserva una consulta.
          </p>
        </div>
      </header>
      <section className="seccion">
        <div className="contenedor dos-columnas">
          <div className="texto">
            <h2 style={{ marginTop: 0 }}>Primera llamada</h2>
            <p>Te decimos si tu caso tiene recorrido y qué plazos corren.</p>
            <div className="acciones">
              <a className="boton" href={DESPACHO.telefonoHref}>
                Llamar al {DESPACHO.telefono}
              </a>
              <a className="boton boton-claro" href={enlaceWhatsapp('Hola, quiero consultar un caso laboral.')}>
                WhatsApp {DESPACHO.whatsapp}
              </a>
            </div>
            <h2>Dónde estamos</h2>
            <p>
              {DESPACHO.direccion}
              <br />
              {DESPACHO.ciudad}
              <br />
              <a href={DESPACHO.mapa}>Ver en el mapa</a>
            </p>
            <p>
              <a href={`mailto:${DESPACHO.email}`}>{DESPACHO.email}</a>
            </p>
          </div>
          <div className="texto">
            <h2 style={{ marginTop: 0 }}>Consulta de una hora</h2>
            <p>
              Estudiamos tus documentos y te damos un plan de acción. Presencial en el despacho o por videollamada; eliges día y
              hora al reservar.
            </p>
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
    </>
  );
}
