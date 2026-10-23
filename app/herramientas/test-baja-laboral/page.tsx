import type { Metadata } from 'next';
import Link from 'next/link';
import TestContingencia from '@/components/TestContingencia';
import JsonLd from '@/components/JsonLd';
import { meta, esquemaHerramienta, esquemaMigas } from '@/lib/seo';

export const metadata: Metadata = meta({
  titulo: '¿Mi baja debería ser accidente de trabajo? Test',
  descripcion: 'Comprueba si tu baja por ansiedad, estrés o lesión debería reconocerse como accidente de trabajo y cuánto cambia lo que cobras.',
  ruta: '/herramientas/test-baja-laboral',
});

export default function Pagina() {
  return (
    <>
      <JsonLd datos={esquemaHerramienta('¿Mi baja debería ser accidente de trabajo? Test', 'Comprueba si tu baja por ansiedad, estrés o lesión debería reconocerse como accidente de trabajo y cuánto cambia lo que cobras.', '/herramientas/test-baja-laboral')} />
      <JsonLd datos={esquemaMigas([{ href: '/', texto: 'Inicio' }, { href: '/herramientas', texto: 'Herramientas' }, { href: '/herramientas/test-baja-laboral', texto: '¿Mi baja debería ser accidente de trabajo? Test' }])} />
      <header className="cabeza-pagina">
        <div className="contenedor">
          <nav className="migas" aria-label="Estás en">
            <Link href="/">Inicio</Link> / <Link href="/herramientas">Herramientas</Link>
          </nav>
          <h1>¿Mi baja debería ser accidente de trabajo?</h1>
          <p className="entradilla">Muchas bajas causadas por el trabajo se registran como comunes, y se cobra menos. Cuatro preguntas para saber si es tu caso.</p>
        </div>
      </header>
      <section className="seccion">
        <div className="contenedor">
          <TestContingencia />
        </div>
      </section>
    </>
  );
}
