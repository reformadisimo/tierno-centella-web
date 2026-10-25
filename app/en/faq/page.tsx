import type { Metadata } from 'next';
import FotoCabeza from '@/components/FotoCabeza';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import Icono from '@/components/Iconos';
import { FAQ_EN as FAQ } from '@/lib/faq-en';
import { DESPACHO, enlaceWhatsapp } from '@/lib/despacho';
import { esquemaFaq, esquemaMigas, meta } from '@/lib/seo';

export const metadata: Metadata = meta({
  titulo: 'Frequently asked questions about dismissal, harassment and disability',
  tituloSeo: 'FAQ: dismissal, harassment and disability',
  descripcion: 'Clear answers to the most common questions about dismissal, workplace harassment, permanent disability in Spain and how our firm works.',
  ruta: '/en/faq',
});

const TEMAS = [
  { id: 'acoso', nombre: 'Workplace harassment', foto: 'acoso-tension', alt: 'A manager points at a worker who holds her hand to her head', lema: 'What carries weight is evidence: start keeping it today.' },
  { id: 'despido', nombre: 'Dismissal', foto: 'despido-caja', alt: 'A person packs their belongings into a box after a dismissal', lema: 'The clock starts when you are told: do not let it run out.' },
  { id: 'incapacidad', nombre: 'Permanent disability', foto: 'medico-informe', alt: 'A doctor fills in a report', lema: 'Each case is studied with its medical report and its history.' },
  { id: 'despacho', nombre: 'The firm and the consultation', foto: 'recepcion', alt: 'The reception of the Tierno Centella law firm', lema: 'What the first call is like and what you can expect from us.' },
] as const;

export default function FaqEn() {
  return (
    <>
      <JsonLd datos={{ ...esquemaFaq(FAQ), inLanguage: 'en-GB' }} />
      <JsonLd datos={esquemaMigas([{ href: '/en', texto: 'Home' }, { href: '/en/faq', texto: 'Frequently asked questions' }])} />
      <header className="cabeza-pagina">
        <div className="contenedor cabeza-con-foto">
          <div>
            <nav className="migas" aria-label="You are here">
              <Link href="/en">Home</Link> / Frequently asked questions
            </nav>
            <h1>Frequently asked questions</h1>
            <p className="entradilla">What people ask us most on the first call.</p>
          </div>
          <FotoCabeza ruta="/en/faq" />
        </div>
      </header>
      <section className="seccion faq-seccion">
        <div className="contenedor">
          {TEMAS.map((t) => {
            const preguntas = FAQ.filter((f) => f.tema === t.id);
            return (
              <section key={t.id} id={t.id} className={`faq-tema faq-${t.id}`} aria-labelledby={`faq-t-${t.id}`}>
                <aside className="faq-lateral">
                  <figure className="faq-foto">
                    <img src={`/img/${t.foto}-640.webp`} srcSet={`/img/${t.foto}-640.webp 640w, /img/${t.foto}.webp 1200w`} sizes="(max-width: 900px) 100vw, 360px" alt={t.alt} width={640} height={480} loading="lazy" decoding="async" />
                  </figure>
                  <p className="faq-cifra" aria-hidden="true"><b>{preguntas.length}</b> questions</p>
                  <h2 id={`faq-t-${t.id}`}>{t.nombre}</h2>
                  <p className="faq-lema">{t.lema}</p>
                  <div className="faq-botones">
                    <Link className="boton" href="/en/contact">Tell us about your case</Link>
                    <a className="boton boton-claro" href={DESPACHO.telefonoHref}>+34 {DESPACHO.telefono}</a>
                  </div>
                </aside>
                <div className="faq-lista">
                  {preguntas.map((f, i) => (
                    <details key={f.pregunta} className="pregunta-faq" open={i === 0}>
                      <summary>
                        <span className="faq-num" aria-hidden="true">{i + 1}</span>
                        <span className="faq-q">{f.pregunta}</span>
                        <span className="faq-mas" aria-hidden="true" />
                      </summary>
                      <p>{f.respuesta}</p>
                    </details>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </section>
      {/* Same markup as components/Llamada, in English. */}
      <section className="seccion llamada-seccion">
        <div className="contenedor">
          <div className="llamada-banda">
            <img className="llamada-avatar" src="/img/abogada-sonrie-640.webp" alt="" width={120} height={120} loading="lazy" decoding="async" />
            <div className="llamada-texto">
              <h2>Tell us about your case</h2>
              <p>We tell you by phone or WhatsApp whether it has a chance. If it does, we study your documents in a one-hour consultation.</p>
              <div className="acciones">
                <a className="boton" href={DESPACHO.telefonoHref}>
                  <Icono nombre="telefono" tam={17} /> Call +34 {DESPACHO.telefono}
                </a>
                <a className="boton boton-wa" href={enlaceWhatsapp('Hello, I would like to ask about an employment matter.')}>
                  <Icono nombre="whatsapp" tam={18} /> Message us on WhatsApp
                </a>
                <Link className="boton boton-claro" href="/en/contact">
                  <Icono nombre="calendario" tam={17} /> Book an appointment
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
