import type { Metadata } from 'next';
import Link from 'next/link';
import TestAcoso from '@/components/TestAcoso';

export const metadata: Metadata = { title: '¿Es acoso lo que me pasa? Test de acoso laboral', description: 'Test gratuito y anónimo de 13 preguntas para saber si lo que vives en el trabajo tiene los rasgos del acoso laboral y qué hacer ahora.' };

export default function Pagina() {
  return (
    <>
      <header className="cabeza-pagina">
        <div className="contenedor">
          <nav className="migas" aria-label="Estás en">
            <Link href="/">Inicio</Link> / <Link href="/herramientas">Herramientas</Link>
          </nav>
          <h1>¿Es acoso lo que me pasa?</h1>
          <p className="entradilla">Trece preguntas, dos minutos y ningún dato personal. Te decimos si lo que vives tiene los rasgos del acoso y cuál es tu siguiente paso.</p>
        </div>
      </header>
      <section className="seccion">
        <div className="contenedor">
          <TestAcoso />
        </div>
      </section>
    </>
  );
}
