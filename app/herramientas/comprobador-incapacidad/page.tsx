import type { Metadata } from 'next';
import Link from 'next/link';
import ComprobadorIncapacidad from '@/components/ComprobadorIncapacidad';

export const metadata: Metadata = { title: 'Comprobador de incapacidad permanente', description: 'Qué grado de incapacidad permanente podría corresponderte, cuánto se cobra y hasta cuándo puedes reclamar si el INSS te la deniega.' };

export default function Pagina() {
  return (
    <>
      <header className="cabeza-pagina">
        <div className="contenedor">
          <nav className="migas" aria-label="Estás en">
            <Link href="/">Inicio</Link> / <Link href="/herramientas">Herramientas</Link>
          </nav>
          <h1>Comprobador de incapacidad permanente</h1>
          <p className="entradilla">Te orientamos sobre el grado que podría corresponderte, cuánto se cobra y qué plazo tienes si te la han denegado.</p>
        </div>
      </header>
      <section className="seccion">
        <div className="contenedor">
          <ComprobadorIncapacidad />
        </div>
      </section>
    </>
  );
}
