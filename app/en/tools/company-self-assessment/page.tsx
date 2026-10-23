import type { Metadata } from 'next';
import Link from 'next/link';
import { meta, esquemaHerramienta, esquemaMigas } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import AutodiagnosticoEmpresaEn from '@/components/en/AutodiagnosticoEmpresaEn';

const TITULO = "Harassment protocol self-assessment for companies and schools";
const DESCRIPCION = "Check in two minutes whether your company, school or public body meets its legal obligations against harassment: protocols, whistleblowing channel, equality plan and psychosocial risks.";
const RUTA = "/en/tools/company-self-assessment";

export const metadata: Metadata = meta({ titulo: TITULO, descripcion: DESCRIPCION, ruta: RUTA, imagen: "/img/empresas-firma.webp" });

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
            <h1>Does your organisation meet what the law requires against harassment?</h1>
            <p className="entradilla">{DESCRIPCION}</p>
          </div>
          <div>
            <img
              className="foto"
              src="/img/reunion-oficina.webp"
              srcSet="/img/reunion-oficina-640.webp 640w, /img/reunion-oficina.webp 1200w"
              sizes="(max-width: 860px) 100vw, 50vw"
              alt="A company meeting in an office meeting room"
            />
          </div>
        </div>
      </header>
      <section className="seccion">
        <div className="contenedor">
          <AutodiagnosticoEmpresaEn />
        </div>
      </section>
    </>
  );
}
