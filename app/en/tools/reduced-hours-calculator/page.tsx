import type { Metadata } from 'next';
import Link from 'next/link';
import { meta, esquemaHerramienta, esquemaMigas } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import CalculadoraReduccionEn from '@/components/en/CalculadoraReduccionEn';

const TITULO = "Reduced working hours for childcare calculator";
const NOMBRE = "Reduced working hours for childcare calculator";
const DESCRIPCION = "How much you will earn if you reduce your working hours (reducción de jornada) to care for your children, what hours the law allows and which rights you keep.";
const DESCRIPCION_HERRAMIENTA = "How much you will earn if you reduce your working hours (reducción de jornada) to care for your children, what hours the law allows and which rights you keep.";
const RUTA = '/en/tools/reduced-hours-calculator';

export const metadata: Metadata = meta({ titulo: TITULO, descripcion: DESCRIPCION, ruta: RUTA, imagen: '/img/abogada-sonrie.webp' });

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
            <h1>How much will you earn if you reduce your working hours?</h1>
            <p className="entradilla">{DESCRIPCION}</p>
          </div>
          <div className="foto-cabeza">
            <img
              className="foto"
              src="/img/familia-siluetas.webp"
              srcSet="/img/familia-siluetas-640.webp 640w, /img/familia-siluetas.webp 1200w"
              sizes="(max-width: 860px) 100vw, 50vw"
              alt="Silhouettes of a family with their children"
              width={640}
              height={480}
              fetchPriority="high"
            />
          </div>
        </div>
      </header>
      <section className="seccion">
        <div className="contenedor">
          <CalculadoraReduccionEn />
        </div>
      </section>
    </>
  );
}
