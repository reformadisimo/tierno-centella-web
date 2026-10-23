import type { Metadata } from 'next';
import Link from 'next/link';
import { meta, esquemaHerramienta, esquemaMigas } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import MapaPruebasEn from '@/components/en/MapaPruebasEn';

const TITULO = "Workplace harassment evidence map";
const DESCRIPCION = "Tick the evidence of workplace harassment you already have and find out what is missing and where to start. Free and with no personal data.";
const RUTA = "/en/tools/harassment-evidence-map";

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
            <h1>Harassment evidence map</h1>
            <p className="entradilla">Harassment cases are won with evidence. Tick what you already have and we will tell you what is missing and where to start today.</p>
          </div>
          <div>
            <img
              className="foto"
              src="/img/documentos-mesa.webp"
              srcSet="/img/documentos-mesa-640.webp 640w, /img/documentos-mesa.webp 1200w"
              sizes="(max-width: 860px) 100vw, 50vw"
              alt="Documents on a desk at the firm"
            />
          </div>
        </div>
      </header>
      <section className="seccion">
        <div className="contenedor">
          <MapaPruebasEn />
        </div>
      </section>
    </>
  );
}
