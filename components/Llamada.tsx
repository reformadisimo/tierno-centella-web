import Link from 'next/link';
import { DESPACHO, enlaceWhatsapp } from '@/lib/despacho';

export default function Llamada({ asunto }: { asunto: string }) {
  return (
    <section className="seccion seccion-blanca">
      <div className="contenedor">
        <h2>Cuéntanos tu caso</h2>
        <p>Te decimos por teléfono o WhatsApp si tiene recorrido. Si lo tiene, estudiamos tus documentos en una consulta de una hora.</p>
        <div className="acciones">
          <a className="boton" href={DESPACHO.telefonoHref}>
            Llamar al {DESPACHO.telefono}
          </a>
          <a className="boton boton-claro" href={enlaceWhatsapp(`Hola, quiero consultar un caso de ${asunto}.`)}>
            Escribir por WhatsApp
          </a>
          <Link className="boton boton-claro" href="/contacto">
            Pedir cita
          </Link>
        </div>
      </div>
    </section>
  );
}
