import type { Metadata } from 'next';
import { meta, esquemaHerramienta, esquemaMigas } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import Link from 'next/link';
import ComprobadorIncapacidad from '@/components/ComprobadorIncapacidad';

export const metadata: Metadata = meta({
  titulo: 'Comprobador de incapacidad permanente',
  descripcion: 'Qué grado de incapacidad permanente podría corresponderte, cuánto se cobra y hasta cuándo puedes reclamar si el INSS te la deniega.',
  ruta: '/herramientas/comprobador-incapacidad',
});

export default function Pagina() {
  return (
    <>
      <JsonLd datos={esquemaHerramienta('Comprobador de incapacidad permanente', 'Qué grado de incapacidad permanente podría corresponderte, cuánto se cobra y hasta cuándo puedes reclamar si el INSS te la deniega.', '/herramientas/comprobador-incapacidad')} />
      <JsonLd datos={esquemaMigas([{ href: '/', texto: 'Inicio' }, { href: '/herramientas', texto: 'Herramientas' }, { href: '/herramientas/comprobador-incapacidad', texto: 'Comprobador de incapacidad permanente' }])} />
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
