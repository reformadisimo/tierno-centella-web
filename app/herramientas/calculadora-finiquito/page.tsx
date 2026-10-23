import type { Metadata } from 'next';
import Link from 'next/link';
import { meta, esquemaHerramienta, esquemaMigas } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import CalculadoraFiniquito from '@/components/CalculadoraFiniquito';

const TITULO = 'Calculadora de finiquito 2026';
const DESCRIPCION = 'Calcula lo que te deben al dejar la empresa: los días del último mes, las vacaciones no disfrutadas y la parte de las pagas extra.';
const RUTA = '/herramientas/calculadora-finiquito';

export const metadata: Metadata = meta({ titulo: TITULO, descripcion: DESCRIPCION, ruta: RUTA, imagen: '/img/documentos-mesa.webp' });

export default function Pagina() {
  return (
    <>
      <JsonLd datos={esquemaHerramienta(TITULO, DESCRIPCION, RUTA)} />
      <JsonLd datos={esquemaMigas([{ href: '/', texto: 'Inicio' }, { href: '/herramientas', texto: 'Herramientas' }, { href: RUTA, texto: TITULO }])} />
      <header className="cabeza-pagina">
        <div className="contenedor">
          <nav className="migas" aria-label="Estás en">
            <Link href="/">Inicio</Link> / <Link href="/herramientas">Herramientas</Link>
          </nav>
          <h1>¿Cuánto te corresponde de finiquito?</h1>
          <p className="entradilla">{DESCRIPCION}</p>
        </div>
      </header>
      <section className="seccion">
        <div className="contenedor">
          <CalculadoraFiniquito />
        </div>
      </section>
    </>
  );
}
