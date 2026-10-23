import type { Metadata } from 'next';
import Link from 'next/link';
import { meta, esquemaHerramienta, esquemaMigas } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import TestExtincionEn from '@/components/en/TestExtincionEn';

const TITULO = "Can I leave the company with compensation? Test";
const DESCRIPCION = "If the company does not pay you, harasses you or leaves you without duties, you can ask the judge to end your contract (extinción del contrato) with compensation and unemployment benefit. Check it.";
const RUTA = "/en/tools/leave-with-compensation-test";

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
            <h1>Can I leave the company with compensation?</h1>
            <p className="entradilla">If the company seriously breaches its obligations, you do not have to wait for it to dismiss you. Check whether you can ask the judge to end your contract.</p>
          </div>
          <div>
            <img
              className="foto"
              src="/img/acuerdo.webp"
              srcSet="/img/acuerdo-640.webp 640w, /img/acuerdo.webp 1200w"
              sizes="(max-width: 860px) 100vw, 50vw"
              alt="Two people shake hands after reaching an agreement"
            />
          </div>
        </div>
      </header>
      <section className="seccion">
        <div className="contenedor">
          <TestExtincionEn />
        </div>
      </section>
    </>
  );
}
