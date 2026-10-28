import type { Metadata } from 'next';
import FotoCabeza from '@/components/FotoCabeza';
import Link from 'next/link';
import { meta, esquemaHerramienta, esquemaMigas } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import CalculadoraFogasa from '@/components/CalculadoraFogasa';

const TITULO = 'Calculadora del FOGASA 2026';
const DESCRIPCION = 'Si tu empresa no paga o ha cerrado, calcula cuánto te cubre el FOGASA de salarios e indemnización, con los topes de 2026.';
const RUTA = '/herramientas/calculadora-fogasa';

export const metadata: Metadata = meta({ titulo: TITULO, descripcion: DESCRIPCION, ruta: RUTA, imagen: '/img/jubilado-papeles.webp' });
// Pendiente de visto bueno: sin indexar ni enlazar desde el menú hasta que se apruebe.
metadata.robots = { index: false, follow: false };

export default function Pagina() {
  return (
    <>
      <JsonLd datos={esquemaHerramienta(TITULO, DESCRIPCION, RUTA)} />
      <JsonLd datos={esquemaMigas([{ href: '/', texto: 'Inicio' }, { href: '/herramientas', texto: 'Herramientas' }, { href: RUTA, texto: TITULO }])} />
      <header className="cabeza-pagina">
        <div className="contenedor cabeza-con-foto">
          <div>
            <nav className="migas" aria-label="Estás en">
              <Link href="/">Inicio</Link> / <Link href="/herramientas">Herramientas</Link>
            </nav>
            <h1>Tu empresa no paga: ¿cuánto te cubre el FOGASA?</h1>
            <p className="entradilla">{DESCRIPCION}</p>
          </div>
          <FotoCabeza ruta="/herramientas/calculadora-fogasa" />
        </div>
      </header>
      <section className="seccion">
        <div className="contenedor">
          <CalculadoraFogasa />
        </div>
      </section>
    </>
  );
}
