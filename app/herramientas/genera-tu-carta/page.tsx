import type { Metadata } from 'next';
import FotoCabeza from '@/components/FotoCabeza';
import { meta, esquemaHerramienta, esquemaMigas } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import Link from 'next/link';
import GeneraCarta from '@/components/GeneraCarta';

const TITULO = 'Genera tu carta para empezar a defenderte';
const DESC = '16 cartas listas para rellenar y descargar: despido, salarios, baja y alta médica, incapacidad, sanciones, permisos, excedencias y acoso.';

export const metadata: Metadata = meta({ titulo: TITULO, descripcion: DESC, ruta: '/herramientas/genera-tu-carta' });

export default function Pagina() {
  return (
    <>
      <JsonLd datos={esquemaHerramienta(TITULO, DESC, '/herramientas/genera-tu-carta')} />
      <JsonLd datos={esquemaMigas([{ href: '/', texto: 'Inicio' }, { href: '/herramientas', texto: 'Herramientas' }, { href: '/herramientas/genera-tu-carta', texto: TITULO }])} />
      <header className="cabeza-pagina">
        <div className="contenedor cabeza-con-foto">
          <div>
            <nav className="migas" aria-label="Estás en">
              <Link href="/">Inicio</Link> / <Link href="/herramientas">Herramientas</Link>
            </nav>
            <h1>¿Qué carta necesitas?</h1>
            <p className="entradilla">Cartas listas, para rellenar en un minuto: sin datos que enviar y sin jerga.</p>
          </div>
          <FotoCabeza ruta="/herramientas/genera-tu-carta" />
        </div>
      </header>
      <section className="seccion">
        <div className="contenedor">
          <GeneraCarta />
        </div>
      </section>
    </>
  );
}
