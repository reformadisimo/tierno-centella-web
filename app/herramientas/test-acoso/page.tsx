import type { Metadata } from 'next';
import { meta, esquemaHerramienta, esquemaMigas } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import Link from 'next/link';
import TestAcoso from '@/components/TestAcoso';

export const metadata: Metadata = meta({
  titulo: '¿Es acoso lo que me pasa? Test de acoso laboral',
  descripcion: 'Test gratuito y anónimo de siete preguntas para saber si lo que vives en el trabajo tiene los rasgos del acoso laboral y qué hacer ahora.',
  ruta: '/herramientas/test-acoso',
});

export default function Pagina() {
  return (
    <>
      <JsonLd datos={esquemaHerramienta('¿Es acoso lo que me pasa? Test de acoso laboral', 'Test gratuito y anónimo de siete preguntas para saber si lo que vives en el trabajo tiene los rasgos del acoso laboral y qué hacer ahora.', '/herramientas/test-acoso')} />
      <JsonLd datos={esquemaMigas([{ href: '/', texto: 'Inicio' }, { href: '/herramientas', texto: 'Herramientas' }, { href: '/herramientas/test-acoso', texto: '¿Es acoso lo que me pasa? Test de acoso laboral' }])} />
      <header className="cabeza-pagina">
        <div className="contenedor">
          <nav className="migas" aria-label="Estás en">
            <Link href="/">Inicio</Link> / <Link href="/herramientas">Herramientas</Link>
          </nav>
          <h1>¿Es acoso lo que me pasa?</h1>
          <p className="entradilla">Siete preguntas, un minuto y ningún dato personal. Te decimos si lo que vives tiene los rasgos del acoso y cuál es tu siguiente paso.</p>
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
