import type { Metadata } from 'next';
import Link from 'next/link';
import { meta, esquemaHerramienta, esquemaMigas } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import CalculadoraEn from '@/components/en/CalculadoraEn';

const TITULO = "Dismissal compensation calculator 2026";
const NOMBRE = "Dismissal compensation calculator";
const DESCRIPCION = "Work out your compensation for an unfair dismissal (33 and 45 days) or an objective dismissal (20 days) in a minute, including the pre-2012 period and the time left to challenge it.";
const DESCRIPCION_HERRAMIENTA = "Work out your compensation for an objective or unfair dismissal straight away, and the days you have left to challenge it.";
const RUTA = '/en/tools/compensation-calculator';

export const metadata: Metadata = meta({ titulo: TITULO, descripcion: DESCRIPCION, ruta: RUTA });

export default async function PaginaCalculadoraEn({ searchParams }: { searchParams: Promise<{ despido?: string }> }) {
  const { despido } = await searchParams;
  const despidoInicial = despido && /^\d{4}-\d{2}-\d{2}$/.test(despido) ? despido : '';
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
            <h1>Work out your dismissal compensation</h1>
            <p className="entradilla">With three details from your payslip you will know how much you are owed and how many days you have left to challenge the dismissal. Without giving us your phone number.</p>
          </div>
          <div className="foto-cabeza">
            <img
              className="foto"
              src="/img/calculadora-papeles.webp"
              srcSet="/img/calculadora-papeles-640.webp 640w, /img/calculadora-papeles.webp 1200w"
              sizes="(max-width: 860px) 100vw, 50vw"
              alt="Calculations with a calculator, notebook and laptop"
              width={640}
              height={480}
              fetchPriority="high"
            />
          </div>
        </div>
      </header>
      <section className="seccion">
        <div className="contenedor">
          <CalculadoraEn despidoInicial={despidoInicial} />
        </div>
      </section>
    </>
  );
}
