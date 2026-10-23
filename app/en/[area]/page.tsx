import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { meta } from '@/lib/seo';
import { leerColeccion } from '@/lib/contenido';
import { AREAS_EN, areaEn } from '@/lib/areas-en';
import { DESPACHO, enlaceWhatsapp } from '@/lib/despacho';

export const dynamicParams = false;

export function generateStaticParams() {
  return AREAS_EN.map((a) => ({ area: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ area: string }> }): Promise<Metadata> {
  const { area } = await params;
  const a = areaEn(area);
  if (!a) return {};
  return meta({ titulo: a.titulo, tituloSeo: a.tituloSeo, descripcion: a.descripcion, ruta: `/en/${a.slug}`, imagen: `/img/${a.foto}.webp` });
}

export default async function Area({ params }: { params: Promise<{ area: string }> }) {
  const { area } = await params;
  const a = areaEn(area);
  if (!a) notFound();
  const guias = leerColeccion(`en/${a.carpeta}`);
  return (
    <>
      <header className="cabeza-pagina">
        <div className="contenedor cabeza-con-foto">
          <div>
            <nav className="migas" aria-label="You are here">
              <Link href="/en">Home</Link> / {a.menu}
            </nav>
            <h1>{a.h1}</h1>
            <p className="entradilla">{a.entradilla}</p>
            <div className="acciones">
              <a className="boton boton-marcador" href={DESPACHO.telefonoHref}>
                Call +34 {DESPACHO.telefono}
              </a>
              <a className="boton boton-claro" href={enlaceWhatsapp(`Hello, I am writing from the website about ${a.menu.toLowerCase()}.`)}>
                WhatsApp
              </a>
            </div>
          </div>
          <div>
            <img className="foto" src={`/img/${a.foto}.webp`} srcSet={`/img/${a.foto}-640.webp 640w, /img/${a.foto}.webp 1200w`} sizes="(max-width: 860px) 100vw, 50vw" alt={a.fotoAlt} />
          </div>
        </div>
      </header>

      <section className="seccion">
        <div className="contenedor">
          <div className="lp-plazo en-plazo">
            <strong>{a.plazo.cifra}</strong> <span>{a.plazo.texto}</span>
          </div>
          <h2 style={{ marginTop: 32 }}>What you should know</h2>
          <ul className="hitos">
            {a.puntos.map((p) => (
              <li key={p}>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="seccion seccion-blanca">
        <div className="contenedor">
          <h2>Guides in English</h2>
          <p>Written for people going through it, with the firm&apos;s experience of over 25 years.</p>
          {guias.length ? (
            <div className="rejilla-guias">
              {guias.map((g) => (
                <Link key={g.slug} href={`/en/${a.slug}/${g.slug}`}>
                  <strong>{g.titulo}</strong>
                  <span>{g.descripcion}</span>
                </Link>
              ))}
            </div>
          ) : (
            <p>
              The English guides are being prepared. Meanwhile, you can read them <Link href={a.es}>in Spanish</Link> or ask our assistant in English.
            </p>
          )}
        </div>
      </section>

      <section className="seccion">
        <div className="contenedor">
          <h2>Free tools</h2>
          <p>Our calculators and tests are in Spanish for now. The assistant can explain any result to you in English.</p>
          <div className="acciones">
            {a.herramientas.map((h) => (
              <Link key={h.href} className="boton boton-claro" href={h.href}>
                {h.texto}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="seccion seccion-blanca">
        <div className="contenedor">
          <h2>Tell us about your case</h2>
          <p>
            We tell you over the phone or on WhatsApp whether it has a chance. If it does, we study your documents in a one-hour consultation ({DESPACHO.precioCita} euros
            + VAT). We speak English, in our office in Madrid or by video call from anywhere in Spain.
          </p>
          <div className="acciones">
            <a className="boton" href={DESPACHO.telefonoHref}>
              Call +34 {DESPACHO.telefono}
            </a>
            <a className="boton boton-claro" href={enlaceWhatsapp('Hello, I would like to ask about my case.')}>
              Write on WhatsApp
            </a>
            <Link className="boton boton-claro" href="/en/contact">
              Book a consultation
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
