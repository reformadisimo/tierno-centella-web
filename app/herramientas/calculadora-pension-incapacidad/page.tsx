import type { Metadata } from 'next';
import FotoCabeza from '@/components/FotoCabeza';
import Link from 'next/link';
import { meta, esquemaHerramienta, esquemaMigas } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import CalculadoraPensionIP from '@/components/CalculadoraPensionIP';

const TITULO = 'Calculadora de la pensión de incapacidad permanente 2026';
const DESCRIPCION = 'Calcula cuánto cobrarías con una incapacidad permanente parcial, total, absoluta o gran incapacidad, paso a paso y con las cifras de 2026.';
const RUTA = '/herramientas/calculadora-pension-incapacidad';

export const metadata: Metadata = meta({ titulo: TITULO, descripcion: DESCRIPCION, ruta: RUTA, imagen: '/img/jubilado-papeles.webp' });

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
            <h1>¿Cuánto cobrarías con una incapacidad permanente?</h1>
            <p className="entradilla">{DESCRIPCION}</p>
          </div>
          <FotoCabeza ruta="/herramientas/calculadora-pension-incapacidad" />
        </div>
      </header>
      <section className="seccion">
        <div className="contenedor">
          <CalculadoraPensionIP />
        </div>
      </section>
    </>
  );
}
