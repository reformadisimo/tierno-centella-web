import type { Metadata } from 'next';
import Link from 'next/link';
import { meta } from '@/lib/seo';
import { indiceEn } from '@/lib/buscador';
import Buscador from '@/components/Buscador';

export const metadata: Metadata = {
  ...meta({ titulo: 'Search the website', descripcion: 'Search all the English guides and pages of Tierno Centella Abogados, employment lawyers in Madrid.', ruta: '/en/search' }),
  robots: { index: false, follow: true },
};

export default function SearchEn() {
  return (
    <>
      <header className="cabeza-pagina">
        <div className="contenedor">
          <nav className="migas" aria-label="You are here">
            <Link href="/en">Home</Link> / Search
          </nav>
          <h1>Search the website</h1>
          <p className="entradilla">
            Guides, tools, blog articles and rulings in English. For the glossary and FAQs in Spanish, use the <Link href="/buscar">Spanish search</Link>.
          </p>
        </div>
      </header>
      <section className="seccion">
        <div className="contenedor lp-estrecho">
          <Buscador indice={indiceEn()} idioma="en" />
        </div>
      </section>
    </>
  );
}
