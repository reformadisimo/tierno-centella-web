import type { Metadata } from 'next';
import FotoCabeza from '@/components/FotoCabeza';
import Link from 'next/link';
import { meta, esquemaHerramienta, esquemaMigas } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import CalculadoraImpagados from '@/components/CalculadoraImpagados';

const TITULO = 'Calculadora de salarios impagados';
const DESCRIPCION = 'Calcula lo que te debe tu empresa con el 10 % de interés por retraso y hasta qué día puedes reclamar cada mes.';
const RUTA = '/herramientas/calculadora-salarios-impagados';

export const metadata: Metadata = meta({ titulo: TITULO, descripcion: DESCRIPCION, ruta: RUTA, imagen: '/img/calculadora-papeles.webp' });

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
            <h1>Te deben el sueldo: ¿cuánto puedes reclamar?</h1>
            <p className="entradilla">{DESCRIPCION}</p>
          </div>
          <FotoCabeza ruta="/herramientas/calculadora-salarios-impagados" />
        </div>
      </header>
      <section className="seccion">
        <div className="contenedor">
          <CalculadoraImpagados />
        </div>
      </section>
    </>
  );
}
