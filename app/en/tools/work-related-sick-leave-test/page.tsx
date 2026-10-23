import type { Metadata } from 'next';
import Link from 'next/link';
import { meta, esquemaHerramienta, esquemaMigas } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import TestContingenciaEn from '@/components/en/TestContingenciaEn';

const TITULO = "Should my sick leave be a work accident? Test";
const DESCRIPCION = "Check whether your sick leave for anxiety, stress or an injury should be recognised as a work accident (accidente de trabajo) and how much it changes what you receive.";
const RUTA = "/en/tools/work-related-sick-leave-test";

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
            <h1>Should my sick leave be a work accident?</h1>
            <p className="entradilla">Many sick leaves caused by work are registered as ordinary illness, and you receive less. Four questions to find out whether that is your case.</p>
          </div>
          <div>
            <img
              className="foto"
              src="/img/mujer-cafe.webp"
              srcSet="/img/mujer-cafe-640.webp 640w, /img/mujer-cafe.webp 1200w"
              sizes="(max-width: 860px) 100vw, 50vw"
              alt="A tired woman at her desk"
            />
          </div>
        </div>
      </header>
      <section className="seccion">
        <div className="contenedor">
          <TestContingenciaEn />
        </div>
      </section>
    </>
  );
}
