import type { Metadata } from 'next';
import Link from 'next/link';
import RevisaCarta from '@/components/RevisaCarta';

export const metadata: Metadata = { title: 'Revisa tu carta de despido', description: 'Comprueba en dos minutos si tu carta de despido tiene defectos de forma que la hagan improcedente o si tu despido podría ser nulo.' };

export default function Pagina() {
  return (
    <>
      <header className="cabeza-pagina">
        <div className="contenedor">
          <nav className="migas" aria-label="Estás en">
            <Link href="/">Inicio</Link> / <Link href="/herramientas">Herramientas</Link>
          </nav>
          <h1>Revisa tu carta de despido</h1>
          <p className="entradilla">Muchos despidos se ganan por fallos en la carta. Contesta unas preguntas con la carta delante y te decimos qué puede fallar.</p>
        </div>
      </header>
      <section className="seccion">
        <div className="contenedor">
          <RevisaCarta />
        </div>
      </section>
    </>
  );
}
