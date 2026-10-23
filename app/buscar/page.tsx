import type { Metadata } from 'next';
import Link from 'next/link';
import { meta } from '@/lib/seo';
import { indiceEs } from '@/lib/buscador';
import Buscador from '@/components/Buscador';

export const metadata: Metadata = {
  ...meta({ titulo: 'Buscar en la web', descripcion: 'Busca en todas las guías, artículos, herramientas, sentencias y preguntas frecuentes del despacho.', ruta: '/buscar' }),
  robots: { index: false, follow: true },
};

export default function Buscar() {
  return (
    <>
      <header className="cabeza-pagina">
        <div className="contenedor">
          <nav className="migas" aria-label="Estás en">
            <Link href="/">Inicio</Link> / Buscar
          </nav>
          <h1>Buscar en la web</h1>
          <p className="entradilla">Guías, artículos, herramientas, sentencias, glosario y preguntas frecuentes, en un solo sitio.</p>
        </div>
      </header>
      <section className="seccion">
        <div className="contenedor lp-estrecho">
          <Buscador indice={indiceEs()} />
        </div>
      </section>
    </>
  );
}
