import type { Metadata } from 'next';
import FotoCabeza from '@/components/FotoCabeza';
import Link from 'next/link';
import { meta, esquemaHerramienta, esquemaMigas } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import CalculadoraParo from '@/components/CalculadoraParo';

const TITULO = 'Calculadora del paro 2026';
const DESCRIPCION = 'Calcula cuánto cobrarás de paro y durante cuántos meses, con los porcentajes y los topes de 2026.';
const RUTA = '/herramientas/calculadora-paro';

export const metadata: Metadata = meta({ titulo: TITULO, descripcion: DESCRIPCION, ruta: RUTA, imagen: '/img/despido-caja.webp' });

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
            <h1>¿Cuánto paro te queda y cuánto vas a cobrar?</h1>
            <p className="entradilla">{DESCRIPCION}</p>
          </div>
          <FotoCabeza ruta="/herramientas/calculadora-paro" />
        </div>
      </header>
      <section className="seccion">
        <div className="contenedor">
          <CalculadoraParo />
        </div>
      </section>
    </>
  );
}
