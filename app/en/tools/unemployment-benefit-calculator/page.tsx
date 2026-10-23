import type { Metadata } from 'next';
import Link from 'next/link';
import { meta, esquemaHerramienta, esquemaMigas } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import CalculadoraParoEn from '@/components/en/CalculadoraParoEn';

const TITULO = "Unemployment benefit (paro) calculator 2026";
const NOMBRE = "Unemployment benefit (paro) calculator 2026";
const DESCRIPCION = "Work out how much unemployment benefit you will receive and for how many months, with the 2026 percentages and limits.";
const DESCRIPCION_HERRAMIENTA = "Work out how much unemployment benefit you will receive and for how many months, with the 2026 percentages and limits.";
const RUTA = '/en/tools/unemployment-benefit-calculator';

export const metadata: Metadata = meta({ titulo: TITULO, descripcion: DESCRIPCION, ruta: RUTA, imagen: '/img/despido-caja.webp' });

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
            <h1>How much unemployment benefit (paro) will you get, and for how long?</h1>
            <p className="entradilla">{DESCRIPCION}</p>
          </div>
          <div className="foto-cabeza">
            <img
              className="foto"
              src="/img/jubilado-papeles.webp"
              srcSet="/img/jubilado-papeles-640.webp 640w, /img/jubilado-papeles.webp 1200w"
              sizes="(max-width: 860px) 100vw, 50vw"
              alt="A man goes through his papers with a calculator"
              width={640}
              height={480}
              fetchPriority="high"
            />
          </div>
        </div>
      </header>
      <section className="seccion">
        <div className="contenedor">
          <CalculadoraParoEn />
        </div>
      </section>
    </>
  );
}
