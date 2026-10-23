import type { Metadata } from 'next';
import Link from 'next/link';
import TestNulidad from '@/components/TestNulidad';
import JsonLd from '@/components/JsonLd';
import { meta, esquemaHerramienta, esquemaMigas } from '@/lib/seo';

export const metadata: Metadata = meta({
  titulo: '¿Mi despido puede ser nulo? Test gratuito',
  descripcion: 'Comprueba en un minuto si tu despido podría ser nulo por embarazo, permisos, represalia, enfermedad o discriminación, y qué hacer antes de que pase el plazo.',
  ruta: '/herramientas/test-nulidad',
});

export default function Pagina() {
  return (
    <>
      <JsonLd datos={esquemaHerramienta('¿Mi despido puede ser nulo? Test gratuito', 'Comprueba en un minuto si tu despido podría ser nulo por embarazo, permisos, represalia, enfermedad o discriminación, y qué hacer antes de que pase el plazo.', '/herramientas/test-nulidad')} />
      <JsonLd datos={esquemaMigas([{ href: '/', texto: 'Inicio' }, { href: '/herramientas', texto: 'Herramientas' }, { href: '/herramientas/test-nulidad', texto: '¿Mi despido puede ser nulo? Test gratuito' }])} />
      <header className="cabeza-pagina">
        <div className="contenedor">
          <nav className="migas" aria-label="Estás en">
            <Link href="/">Inicio</Link> / <Link href="/herramientas">Herramientas</Link>
          </nav>
          <h1>¿Mi despido puede ser nulo?</h1>
          <p className="entradilla">Un despido nulo obliga a readmitirte y a pagarte lo que dejaste de cobrar. Cuatro preguntas para saber si el tuyo podría serlo.</p>
        </div>
      </header>
      <section className="seccion">
        <div className="contenedor">
          <TestNulidad />
        </div>
      </section>
    </>
  );
}
