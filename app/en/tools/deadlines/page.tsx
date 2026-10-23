import type { Metadata } from 'next';
import Link from 'next/link';
import { meta, esquemaHerramienta, esquemaMigas } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import PlazosEn from '@/components/en/PlazosEn';

const TITULO = "Deadlines for employment claims";
const NOMBRE = "Deadlines for employment claims";
const DESCRIPCION = "Work out the last day to challenge a dismissal or a sanction, claim money owed, appeal a refused disability claim or claim damages for harassment.";
const DESCRIPCION_HERRAMIENTA = "Work out the last day to challenge a dismissal or a sanction, claim money owed, appeal a refused disability claim or claim damages for harassment.";
const RUTA = '/en/tools/deadlines';

export const metadata: Metadata = meta({ titulo: TITULO, descripcion: DESCRIPCION, ruta: RUTA });

export default function Pagina() {
  return (
    <>
      <JsonLd datos={{ ...esquemaHerramienta(NOMBRE, DESCRIPCION_HERRAMIENTA, RUTA), inLanguage: 'en-GB', operatingSystem: 'Any (web browser)' }} />
      <JsonLd datos={esquemaMigas([{ href: '/en', texto: 'Home' }, { href: '/en/tools', texto: 'Tools' }, { href: RUTA, texto: NOMBRE }])} />
      <header className="cabeza-pagina">
        <div className="contenedor cabeza-con-foto">
          <div>
            <nav className="migas" aria-label="You are here">
              <Link href="/en">Home</Link> / <Link href="/en/tools">Tools</Link>
            </nav>
            <h1>How long do you have to make a claim?</h1>
            <p className="entradilla">In employment law the deadlines are short and unforgiving. Choose your situation and we will tell you the last day.</p>
          </div>
          <div className="foto-cabeza">
            <img
              className="foto"
              src="/img/papeleria.webp"
              srcSet="/img/papeleria-640.webp 640w, /img/papeleria.webp 1200w"
              sizes="(max-width: 860px) 100vw, 50vw"
              alt="Paperwork with the firm’s logo"
              width={640}
              height={480}
              fetchPriority="high"
            />
          </div>
        </div>
      </header>
      <section className="seccion">
        <div className="contenedor">
          <PlazosEn />
        </div>
      </section>
    </>
  );
}
