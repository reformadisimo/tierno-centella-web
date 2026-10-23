import type { Metadata } from 'next';
import Link from 'next/link';
import { meta, esquemaHerramienta, esquemaMigas } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import CalendarioPermisosEn from '@/components/en/CalendarioPermisosEn';

const TITULO = "Birth leave calendar 2026";
const NOMBRE = "Birth leave calendar 2026";
const DESCRIPCION = "Enter the date of birth and we will tell you until when you can take the 19 weeks, breastfeeding leave, parental leave and reduced working hours, and until when your job is protected.";
const DESCRIPCION_HERRAMIENTA = "Enter the date of birth and we will tell you until when you can take the 19 weeks, breastfeeding leave, parental leave and reduced working hours, and until when your job is protected.";
const RUTA = '/en/tools/birth-leave-calendar';

export const metadata: Metadata = meta({ titulo: TITULO, descripcion: DESCRIPCION, ruta: RUTA, imagen: '/img/reunion-cliente.webp' });

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
            <h1>Your birth leave, in a calendar.</h1>
            <p className="entradilla">{DESCRIPCION}</p>
          </div>
          <div className="foto-cabeza">
            <img
              className="foto"
              src="/img/madre-hijo.webp"
              srcSet="/img/madre-hijo-640.webp 640w, /img/madre-hijo.webp 1200w"
              sizes="(max-width: 860px) 100vw, 50vw"
              alt="A mother plays with her young son"
              width={640}
              height={480}
              fetchPriority="high"
            />
          </div>
        </div>
      </header>
      <section className="seccion">
        <div className="contenedor">
          <CalendarioPermisosEn />
          <p style={{ marginTop: 24 }}>
            To understand each type of leave, read <Link href="/en/women-at-work/birth-and-breastfeeding-leave">the guide to birth and breastfeeding leave</Link>.
          </p>
        </div>
      </section>
    </>
  );
}
