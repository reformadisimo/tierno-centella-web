import type { Metadata } from 'next';
import { meta, esquemaHerramienta, esquemaMigas } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import Link from 'next/link';
import Plazos from '@/components/Plazos';

export const metadata: Metadata = meta({
  titulo: 'Plazos para reclamar en lo laboral',
  descripcion: 'Calcula el último día para reclamar un despido, una sanción, una cantidad, una incapacidad denegada o los daños por acoso.',
  ruta: '/herramientas/plazos',
});

export default function Pagina() {
  return (
    <>
      <JsonLd datos={esquemaHerramienta('Plazos para reclamar en lo laboral', 'Calcula el último día para reclamar un despido, una sanción, una cantidad, una incapacidad denegada o los daños por acoso.', '/herramientas/plazos')} />
      <JsonLd datos={esquemaMigas([{ href: '/', texto: 'Inicio' }, { href: '/herramientas', texto: 'Herramientas' }, { href: '/herramientas/plazos', texto: 'Plazos para reclamar en lo laboral' }])} />
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
