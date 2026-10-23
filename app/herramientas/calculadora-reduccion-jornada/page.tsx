import type { Metadata } from 'next';
import FotoCabeza from '@/components/FotoCabeza';
import Link from 'next/link';
import { meta, esquemaHerramienta, esquemaMigas } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import CalculadoraReduccion from '@/components/CalculadoraReduccion';

const TITULO = 'Calculadora de reducción de jornada por cuidado de hijos';
const DESCRIPCION = 'Cuánto cobrarás si reduces tu jornada para cuidar a tus hijos, qué horas permite la ley y qué derechos no pierdes.';
const RUTA = '/herramientas/calculadora-reduccion-jornada';

export const metadata: Metadata = meta({ titulo: TITULO, descripcion: DESCRIPCION, ruta: RUTA, imagen: '/img/abogada-sonrie.webp' });

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
            <h1>¿Cuánto cobrarás si reduces tu jornada?</h1>
            <p className="entradilla">{DESCRIPCION}</p>
          </div>
          <FotoCabeza ruta="/herramientas/calculadora-reduccion-jornada" />
        </div>
      </header>
      <section className="seccion">
        <div className="contenedor">
          <CalculadoraReduccion />
        </div>
      </section>
    </>
  );
}
