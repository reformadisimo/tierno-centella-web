import type { Metadata } from 'next';
import Link from 'next/link';
import { meta } from '@/lib/seo';
import { DESPACHO, enlaceWhatsapp } from '@/lib/despacho';
import FormularioContactoEn from '@/components/FormularioContactoEn';
import Mapa from '@/components/Mapa';
import FotoCabeza from '@/components/FotoCabeza';

export const metadata: Metadata = meta({
  titulo: 'Contact an English-speaking employment lawyer in Madrid',
  tituloSeo: 'Contact: English-speaking employment lawyers',
  descripcion: 'Call us, message us on WhatsApp or leave your number. One-hour consultation at Jorge Juan, Madrid, or by video call from anywhere in Spain. We speak English.',
  ruta: '/en/contact',
});

export default function ContactEn() {
  return (
    <>
      <header className="cabeza-pagina">
        <div className="contenedor cabeza-con-foto">
          <div>
            <nav className="migas" aria-label="You are here">
              <Link href="/en">Home</Link> / Contact
            </nav>
            <h1>Talk to a lawyer, in English</h1>
            <p className="entradilla">
              Tell us what is happening by phone or WhatsApp and we will tell you clearly whether your case needs a consultation and what it costs before you book.
              No surprises.
            </p>
            <div className="acciones">
              <a className="boton" href={DESPACHO.telefonoHref}>
                Call +34 {DESPACHO.telefono}
              </a>
              <a className="boton boton-claro" href={enlaceWhatsapp('Hello, I would like to ask about an employment matter.')}>
                WhatsApp +34 {DESPACHO.whatsapp}
              </a>
            </div>
          </div>
          <FotoCabeza ruta="/contacto" />
        </div>
      </header>
      <section className="seccion">
        <div className="contenedor dos-columnas">
          <FormularioContactoEn />
          <div className="texto">
            <h2>One-hour consultation</h2>
            <p>We study your documents and you leave with an action plan. In person at our office or by video call.</p>
            <table className="tabla">
              <tbody>
                <tr>
                  <td>With a lawyer from the firm</td>
                  <td>
                    <strong className="precio-nowrap">{DESPACHO.precioCita} euros + VAT</strong>
                  </td>
                </tr>
                <tr>
                  <td>With Jesús Tierno</td>
                  <td>
                    <strong className="precio-nowrap">{DESPACHO.precioCitaJesus} euros + VAT</strong>
                  </td>
                </tr>
              </tbody>
            </table>
            <p>After the consultation, if we take your case, you receive a written quote before we start.</p>
          </div>
        </div>
      </section>
      <section className="seccion seccion-cielo">
        <div className="contenedor dos-columnas">
          <div>
            <h2>Where we are</h2>
            <p>
              {DESPACHO.direccion}
              <br />
              {DESPACHO.ciudad} (Spain)
            </p>
            <p>
              <a href={DESPACHO.telefonoHref}>+34 {DESPACHO.telefono}</a>
              <br />
              <a href={`mailto:${DESPACHO.email}`}>{DESPACHO.email}</a>
            </p>
            <p>We handle cases from all over Spain by video call.</p>
          </div>
          <Mapa />
        </div>
      </section>
    </>
  );
}
