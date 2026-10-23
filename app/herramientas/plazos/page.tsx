import type { Metadata } from 'next';
import Link from 'next/link';
import Plazos from '@/components/Plazos';

export const metadata: Metadata = { title: 'Plazos para reclamar en lo laboral', description: 'Calcula el último día para reclamar un despido, una sanción, una cantidad, una incapacidad denegada o los daños por acoso.' };

export default function Pagina() {
  return (
    <>
      <header className="cabeza-pagina">
        <div className="contenedor">
          <nav className="migas" aria-label="Estás en">
            <Link href="/">Inicio</Link> / <Link href="/herramientas">Herramientas</Link>
          </nav>
          <h1>¿Hasta cuándo puedes reclamar?</h1>
          <p className="entradilla">En lo laboral los plazos son cortos y no perdonan. Elige tu situación y te decimos el último día.</p>
        </div>
      </header>
      <section className="seccion">
        <div className="contenedor">
          <Plazos />
        </div>
      </section>
    </>
  );
}
