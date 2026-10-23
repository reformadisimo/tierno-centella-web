import type { Metadata } from 'next';
import Link from 'next/link';
import { meta, esquemaHerramienta, esquemaMigas } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import RevisaCartaEn from '@/components/en/RevisaCartaEn';

const TITULO = "Check your dismissal letter";
const DESCRIPCION = "Check in two minutes whether your dismissal letter (carta de despido) has formal defects that make it unfair, or whether your dismissal could be void.";
const RUTA = "/en/tools/check-your-dismissal-letter";

export const metadata: Metadata = meta({ titulo: TITULO, descripcion: DESCRIPCION, ruta: RUTA });

export default function Pagina() {
  return (
    <>
      <JsonLd datos={{ ...esquemaHerramienta(TITULO, DESCRIPCION, RUTA), inLanguage: 'en-GB', operatingSystem: 'Any (web browser)' }} />
      <JsonLd datos={esquemaMigas([{ href: '/en', texto: 'Home' }, { href: '/en/tools', texto: 'Tools' }, { href: RUTA, texto: TITULO }])} />
      <header className="cabeza-pagina">
        <div className="contenedor cabeza-con-foto">
          <div>
            <nav className="migas" aria-label="You are here">
              <Link href="/en">Home</Link> / <Link href="/en/tools">Tools</Link>
            </nav>
            <h1>Check your dismissal letter</h1>
            <p className="entradilla">Many dismissal cases are won because of mistakes in the letter. Answer a few questions with the letter in front of you and we will tell you what may be wrong.</p>
          </div>
          <div>
            <img
              className="foto"
              src="/img/documento-pluma.webp"
              srcSet="/img/documento-pluma-640.webp 640w, /img/documento-pluma.webp 1200w"
              sizes="(max-width: 860px) 100vw, 50vw"
              alt="A document and a fountain pen"
            />
          </div>
        </div>
      </header>
      <section className="seccion">
        <div className="contenedor">
          <RevisaCartaEn />
        </div>
      </section>
    </>
  );
}
