import type { Metadata } from 'next';
import FotoCabeza from '@/components/FotoCabeza';
import Link from 'next/link';
import { meta, esquemaHerramienta, esquemaMigas } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import PrescripcionFaltas from '@/components/PrescripcionFaltas';

const TITULO = '¿Ha prescrito la falta? Comprobador de sanciones';
const DESCRIPCION = 'Comprueba si la empresa te ha sancionado a tiempo: las faltas leves prescriben a los 10 días, las graves a los 20 y las muy graves a los 60.';
const RUTA = '/herramientas/prescripcion-faltas';

export const metadata: Metadata = meta({ titulo: TITULO, descripcion: DESCRIPCION, ruta: RUTA, imagen: '/img/jefe-senala.webp' });

export default function Pagina() {
  return (
    <>
      <JsonLd datos={esquemaHerramienta(TITULO, DESCRIPCION, RUTA)} />
      <JsonLd datos={esquemaMigas([{ href: '/', texto: 'Inicio' }, { href: '/herramientas', texto: 'Herramientas' }, { href: RUTA, texto: TITULO }])} />
      <header className="cabeza-pagina">
        <div className="contenedor cabeza-con-foto">
          <div>
            <nav className="migas" aria-label="Estás en">
              <Link href="/">Inicio</Link> / <Link href="/herramientas">Herramientas</Link>
            </nav>
            <h1>¿Ha prescrito la falta?</h1>
            <p className="entradilla">Si la empresa tarda demasiado en sancionarte, la sanción no vale. Pon tres fechas y lo comprobamos.</p>
          </div>
          <FotoCabeza ruta="/herramientas/prescripcion-faltas" />
        </div>
      </header>
      <section className="seccion">
        <div className="contenedor">
          <PrescripcionFaltas />
        </div>
      </section>
    </>
  );
}
