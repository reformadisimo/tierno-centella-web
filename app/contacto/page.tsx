import Icono from '@/components/Iconos';
import { Etiqueta } from '@/components/Etiqueta';
import type { Metadata } from 'next';
import FotoCabeza from '@/components/FotoCabeza';
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
      <header className="cabeza-pagina cabeza-contacto">
        <div className="contenedor cabeza-con-foto">
          <div>
            <nav className="migas" aria-label="Estás en">
              <Link href="/">Inicio</Link> / Contacto
            </nav>
            <Etiqueta icono="pin" tono="oro">Contacto</Etiqueta>
            <h1>Habla con un abogado</h1>
            <p className="entradilla">
              Cuéntanos qué te pasa por teléfono o WhatsApp y te decimos con claridad si tu caso necesita una consulta y cuánto cuesta antes de
              reservarla. Sin sorpresas.
            </p>
            <div className="acciones">
              <a className="boton" href={DESPACHO.telefonoHref}>
                <Icono nombre="telefono" tam={17} /> Llamar al {DESPACHO.telefono}
              </a>
              <a className="boton boton-wa" href={enlaceWhatsapp('Hola, quiero consultar un caso laboral.')}>
                <Icono nombre="whatsapp" tam={18} /> WhatsApp {DESPACHO.whatsapp}
              </a>
            </div>
          </div>
          <FotoCabeza ruta="/contacto" />
        </div>
      </header>
      <section className="seccion seccion-blanca formas-seccion">
        <div className="contenedor">
          <ul className="formas-contacto">
            <li className="fc-tel">
              <a href={DESPACHO.telefonoHref}>
                <span className="fc-icono"><Icono nombre="telefono" tam={24} /></span>
                <strong>Llámanos</strong>
                <span>{DESPACHO.telefono}</span>
                <small>De lunes a viernes. Te decimos al momento si tu caso necesita consulta.</small>
              </a>
            </li>
            <li className="fc-wa">
              <a href={enlaceWhatsapp('Hola, quiero consultar un caso laboral.')} target="_blank" rel="noopener">
                <span className="fc-icono"><Icono nombre="whatsapp" tam={26} /></span>
                <strong>Escríbenos por WhatsApp</strong>
                <span>{DESPACHO.whatsapp}</span>
                <small>Si prefieres escribir o no puedes hablar ahora. Te contestamos en el día.</small>
              </a>
            </li>
            <li className="fc-cita">
              <a href="#cita">
                <span className="fc-icono"><Icono nombre="calendario" tam={24} /></span>
                <strong>Reserva una consulta</strong>
                <span>Presencial o por videollamada</span>
                <small>Una hora con tus documentos y un plan de acción al salir.</small>
              </a>
            </li>
          </ul>
        </div>
      </section>
      <section className="seccion">
        <div className="contenedor dos-columnas">
          <FormularioContacto />
          <div className="texto">
            <VideoAmbiente src="/video/consulta.webm" poster="/img/consulta-poster.webp" alt="Jesús Tierno reunido con una clienta en el despacho" />
            <h2 id="cita">Consulta de una hora</h2>
            <p>Estudiamos tus documentos y sales con un plan de acción. Presencial en el despacho o por videollamada.</p>
            <ul className="precios-cita">
              <li>
                <span className="pc-icono"><Icono nombre="personas" tam={20} /></span>
                <span className="pc-texto"><b>Con un abogado del despacho</b><small>Una hora, con tus documentos</small></span>
                <strong className="precio-nowrap">{DESPACHO.precioCita} €{DESPACHO.iva}</strong>
              </li>
              <li>
                <span className="pc-icono"><Icono nombre="premio" tam={20} /></span>
                <span className="pc-texto"><b>Con Jesús Tierno</b><small>Para los casos más complejos</small></span>
                <strong className="precio-nowrap">{DESPACHO.precioCitaJesus} €{DESPACHO.iva}</strong>
              </li>
            </ul>
            <ul className="incluye-cita">
              <li><Icono nombre="check" tam={16} /> Revisión de tus documentos antes de la cita</li>
              <li><Icono nombre="check" tam={16} /> Plazos y vías posibles, explicados sin tecnicismos</li>
              <li><Icono nombre="check" tam={16} /> Presupuesto cerrado si decides seguir adelante</li>
              <li><Icono nombre="check" tam={16} /> Por videollamada, desde cualquier punto de España</li>
            </ul>
            <div className="acciones">
              <a className="boton boton-marcador" href={DESPACHO.citaAbogado}>
                <Icono nombre="calendario" tam={17} /> Reservar consulta
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
            <Etiqueta icono="pin" tono="oro">Dónde estamos</Etiqueta>
            <h2>En Jorge Juan, en el barrio de Salamanca</h2>
            <ul className="donde-lista">
              <li><Icono nombre="pin" tam={18} /><span>{DESPACHO.direccion}, {DESPACHO.ciudad}</span></li>
              <li><Icono nombre="telefono" tam={18} /><a href={DESPACHO.telefonoHref}>{DESPACHO.telefono}</a></li>
              <li><Icono nombre="whatsapp" tam={18} /><a href={enlaceWhatsapp('Hola, quiero consultar un caso laboral.')}>{DESPACHO.whatsapp}</a></li>
              <li><Icono nombre="correo" tam={18} /><a href={`mailto:${DESPACHO.email}`}>{DESPACHO.email}</a></li>
              <li><Icono nombre="video" tam={18} /><span>Atendemos casos de toda España por videollamada.</span></li>
            </ul>
          </div>
          <Mapa />
        </div>
      </section>
    </>
  );
}
