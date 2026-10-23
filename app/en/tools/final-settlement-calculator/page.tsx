import type { Metadata } from 'next';
import Link from 'next/link';
import { meta, esquemaHerramienta, esquemaMigas } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import CalculadoraFiniquitoEn from '@/components/en/CalculadoraFiniquitoEn';

const TITULO = "Final settlement (finiquito) calculator 2026";
const NOMBRE = "Final settlement (finiquito) calculator 2026";
const DESCRIPCION = "Work out what you are owed when you leave the company: the days of your last month, holidays not taken and your share of the extra payments.";
const DESCRIPCION_HERRAMIENTA = "Work out what you are owed when you leave the company: the days of your last month, holidays not taken and your share of the extra payments.";
const RUTA = '/en/tools/final-settlement-calculator';

export const metadata: Metadata = meta({ titulo: TITULO, descripcion: DESCRIPCION, ruta: RUTA, imagen: '/img/documentos-mesa.webp' });

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
            <h1>How much is your final settlement (finiquito)?</h1>
            <p className="entradilla">{DESCRIPCION}</p>
          </div>
          <div className="foto-cabeza">
            <img
              className="foto"
              src="/img/firma-contrato.webp"
              srcSet="/img/firma-contrato-640.webp 640w, /img/firma-contrato.webp 1200w"
              sizes="(max-width: 860px) 100vw, 50vw"
              alt="A person signs a document"
              width={640}
              height={480}
              fetchPriority="high"
            />
          </div>
        </div>
      </header>
      <section className="seccion">
        <div className="contenedor">
          <CalculadoraFiniquitoEn />
        </div>
      </section>
    </>
  );
}
