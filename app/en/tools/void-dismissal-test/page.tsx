import type { Metadata } from 'next';
import Link from 'next/link';
import { meta, esquemaHerramienta, esquemaMigas } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import TestNulidadEn from '@/components/en/TestNulidadEn';

const TITULO = "Could my dismissal be void? Free test";
const DESCRIPCION = "Check in one minute whether your dismissal could be void (despido nulo) because of pregnancy, leave, retaliation, illness or discrimination, and what to do before the deadline runs out.";
const RUTA = "/en/tools/void-dismissal-test";

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
            <h1>Could my dismissal be void?</h1>
            <p className="entradilla">A void dismissal (despido nulo) means the company must take you back and pay you what you did not receive. Four questions to find out whether yours could be.</p>
          </div>
          <div>
            <img
              className="foto"
              src="/img/despido-caja.webp"
              srcSet="/img/despido-caja-640.webp 640w, /img/despido-caja.webp 1200w"
              sizes="(max-width: 860px) 100vw, 50vw"
              alt="A person packs their things into a box after a dismissal"
            />
          </div>
        </div>
      </header>
      <section className="seccion">
        <div className="contenedor">
          <TestNulidadEn />
        </div>
      </section>
    </>
  );
}
