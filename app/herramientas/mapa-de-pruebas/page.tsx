import type { Metadata } from 'next';
import Link from 'next/link';
import MapaPruebas from '@/components/MapaPruebas';

export const metadata: Metadata = { title: 'Mapa de pruebas del acoso laboral', description: 'Marca las pruebas de acoso laboral que ya tienes y descubre cuáles te faltan y por cuál empezar. Gratis y sin datos personales.' };

export default function Pagina() {
  return (
    <>
      <header className="cabeza-pagina">
        <div className="contenedor">
          <nav className="migas" aria-label="Estás en">
            <Link href="/">Inicio</Link> / <Link href="/herramientas">Herramientas</Link>
          </nav>
          <h1>Mapa de pruebas del acoso</h1>
          <p className="entradilla">El acoso se gana con pruebas. Marca las que ya tienes y te decimos cuáles faltan y por dónde empezar hoy.</p>
        </div>
      </header>
      <section className="seccion">
        <div className="contenedor">
          <MapaPruebas />
        </div>
      </section>
    </>
  );
}
