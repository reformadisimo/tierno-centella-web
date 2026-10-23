import type { Metadata } from 'next';
import Link from 'next/link';
import { meta } from '@/lib/seo';
import VideoYoutube from '@/components/VideoYoutube';
import { DEMO, DESPACHO } from '@/lib/despacho';

export const metadata: Metadata = meta({
  titulo: 'Jesús Tierno Centella, workplace harassment lawyer in Madrid',
  tituloSeo: 'Jesús Tierno Centella, employment lawyer',
  descripcion:
    'Managing partner of Tierno Centella Abogados. Over 25 years in employment law, behind the first ruling in Spain against a workplace harasser (2005) and co-author of a book on work values.',
  ruta: '/en/jesus-tierno',
});

export default function JesusEn() {
  return (
    <>
      <header className="cabeza-pagina">
        <div className="contenedor cabeza-con-foto">
          <div>
            <nav className="migas" aria-label="You are here">
              <Link href="/en">Home</Link> / Jesús Tierno
            </nav>
            <h1>Jesús Tierno Centella</h1>
            <p className="entradilla">
              Employment lawyer and managing partner of the firm. He has defended workers for over 25 years, most of them focused on workplace harassment.
            </p>
            <div className="acciones">
              <Link className="boton" href="/en/contact">
                Book a consultation with Jesús ({DESPACHO.precioCitaJesus} euros + VAT)
              </Link>
            </div>
          </div>
          <img className="foto" src="/img/jesus-retrato.webp" srcSet="/img/jesus-retrato-640.webp 640w, /img/jesus-retrato.webp 1080w" sizes="(max-width: 860px) 100vw, 50vw" alt="Jesús Tierno Centella in a grey suit with his arms crossed" style={{ aspectRatio: '4 / 5', objectPosition: 'top' }} />
        </div>
      </header>

      <section className="seccion">
        <div className="contenedor dos-columnas">
          <div className="prosa">
            <h2 style={{ marginTop: 0 }}>Career</h2>
            <p>Law graduate from the University of Alcalá. He has devoted his career to employment law, with workplace harassment as his speciality.</p>
            <p>
              In 2005, at Social Court No. 29 of Madrid, he obtained the first ruling in Spain that ordered both the company and the person who harassed to
              compensate the victim. The High Court of Justice of Madrid upheld it. Since then he has handled harassment cases in private companies, in public
              administration and in education.
            </p>
            <p>The firm works with the law degree practicum at Universidad Carlos III de Madrid, training future lawyers.</p>
            <h2>A book about decent work</h2>
            <p>
              He co-authored, with the psychologist Bernabé Tierno, <em>Valores en el trabajo</em> (Values at work, La Esfera de los Libros, 2002), about how work can
              enrich the person who does it instead of destroying them.
            </p>
            {DEMO && (
              <div className="recuadro">
                <p>To be completed with Jesús: bar association number, talks, press appearances and cases that can be told.</p>
              </div>
            )}
          </div>
          <div style={{ display: 'grid', gap: 20, alignContent: 'start' }}>
            <img className="foto" src="/img/jesus-firmando.webp" srcSet="/img/jesus-firmando-640.webp 640w, /img/jesus-firmando.webp 1280w" sizes="(max-width: 860px) 100vw, 50vw" alt="Jesús Tierno reviewing a document at his desk" />
            <img className="foto" src="/img/equipo.webp" srcSet="/img/equipo-640.webp 640w, /img/equipo.webp 1600w" sizes="(max-width: 860px) 100vw, 50vw" alt="Jesús Tierno with the team" />
          </div>
        </div>
      </section>

      <section className="seccion seccion-blanca">
        <div className="contenedor">
          <h2>Jesús Tierno and Iñaki Piñuel on workplace harassment (in Spanish)</h2>
          <p>Two conversations with one of the psychologists who has studied mobbing most in Spain.</p>
          <div className="rejilla-videos">
            <VideoYoutube id="TwKRGi1LISY" titulo="If you are harassed at work: Iñaki Piñuel interviews Jesús Tierno (2022)" />
            <VideoYoutube id="lVoi2ijP1bA" titulo="Jesús Tierno interviews Iñaki Piñuel about workplace harassment (2024)" />
          </div>
        </div>
      </section>
    </>
  );
}
