import type { Metadata } from 'next';
import Link from 'next/link';
import { meta, esquemaHerramienta, esquemaMigas } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import ComprobadorIncapacidadEn from '@/components/en/ComprobadorIncapacidadEn';

const TITULO = "Permanent disability checker";
const NOMBRE = "Permanent disability checker";
const DESCRIPCION = "Which degree of permanent disability (incapacidad permanente) you might be entitled to, how much it pays and until when you can challenge a refusal by the social security office (INSS).";
const DESCRIPCION_HERRAMIENTA = "Which degree of permanent disability (incapacidad permanente) you might be entitled to, how much it pays and until when you can challenge a refusal by the social security office (INSS).";
const RUTA = '/en/tools/permanent-disability-checker';

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
            <h1>Permanent disability checker</h1>
            <p className="entradilla">We give you a guide to the degree you might be entitled to, how much it pays and what deadline you have if it has been refused.</p>
          </div>
          <div className="foto-cabeza">
            <img
              className="foto"
              src="/img/medico-informe.webp"
              srcSet="/img/medico-informe-640.webp 640w, /img/medico-informe.webp 1200w"
              sizes="(max-width: 860px) 100vw, 50vw"
              alt="A doctor fills in a report"
              width={640}
              height={480}
              fetchPriority="high"
            />
          </div>
        </div>
      </header>
      <section className="seccion">
        <div className="contenedor">
          <ComprobadorIncapacidadEn />
        </div>
      </section>
    </>
  );
}
