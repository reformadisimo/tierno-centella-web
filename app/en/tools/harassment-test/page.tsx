import type { Metadata } from 'next';
import Link from 'next/link';
import { meta, esquemaHerramienta, esquemaMigas } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import TestAcosoEn from '@/components/en/TestAcosoEn';

const TITULO = "Is it harassment? Workplace harassment test";
const DESCRIPCION = "A free, anonymous seven-question test to find out whether what you are going through at work has the features of workplace harassment, and what to do now.";
const RUTA = "/en/tools/harassment-test";

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
            <h1>Is what is happening to me harassment?</h1>
            <p className="entradilla">Seven questions, one minute and no personal data. We tell you whether what you are going through has the features of harassment and what your next step is.</p>
          </div>
          <div>
            <img
              className="foto"
              src="/img/mujer-agobiada.webp"
              srcSet="/img/mujer-agobiada-640.webp 640w, /img/mujer-agobiada.webp 1200w"
              sizes="(max-width: 860px) 100vw, 50vw"
              alt="A worker under pressure while someone hands her papers"
            />
          </div>
        </div>
      </header>
      <section className="seccion">
        <div className="contenedor">
          <TestAcosoEn />
        </div>
      </section>
    </>
  );
}
