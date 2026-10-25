import Link from 'next/link';
import Icono from './Iconos';
import { DESPACHO, enlaceWhatsapp } from '@/lib/despacho';

export default function Llamada({ asunto }: { asunto: string }) {
  return (
    <section className="seccion llamada-seccion">
      <div className="contenedor">
        <div className="llamada-banda">
          <img className="llamada-avatar" src="/img/abogada-sonrie-640.webp" alt="" width={120} height={120} loading="lazy" decoding="async" />
          <div className="llamada-texto">
            <h2>Cuéntanos tu caso</h2>
            <p>Te decimos por teléfono o WhatsApp si tiene recorrido. Si lo tiene, estudiamos tus documentos en una consulta de una hora.</p>
            <div className="acciones">
              <a className="boton" href={DESPACHO.telefonoHref}>
                <Icono nombre="telefono" tam={17} /> Llamar al {DESPACHO.telefono}
              </a>
              <a className="boton boton-wa" href={enlaceWhatsapp(`Hola, quiero consultar un caso de ${asunto}.`)}>
                <Icono nombre="whatsapp" tam={18} /> Escribir por WhatsApp
              </a>
              <Link className="boton boton-claro" href="/reservar">
                <Icono nombre="calendario" tam={17} /> Pedir cita
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
