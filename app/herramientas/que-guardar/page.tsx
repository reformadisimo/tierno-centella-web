import type { Metadata } from 'next';
import FotoCabeza from '@/components/FotoCabeza';
import { meta, esquemaHerramienta, esquemaMigas } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import Link from 'next/link';
import QueGuardar from '@/components/QueGuardar';

const TITULO = 'Qué documentos guardar para tu caso laboral';
const DESC = 'Lista interactiva de lo que conviene guardar si te despiden, sufres acoso, estás de baja o te deben dinero. Marca lo que ya tienes y descarga o imprime la lista.';

export const metadata: Metadata = meta({ titulo: TITULO, descripcion: DESC, ruta: '/herramientas/que-guardar' });

export default function Pagina() {
  return (
    <>
      <JsonLd datos={esquemaHerramienta(TITULO, DESC, '/herramientas/que-guardar')} />
      <JsonLd datos={esquemaMigas([{ href: '/', texto: 'Inicio' }, { href: '/herramientas', texto: 'Herramientas' }, { href: '/herramientas/que-guardar', texto: TITULO }])} />
      <header className="cabeza-pagina">
        <div className="contenedor cabeza-con-foto">
          <div>
            <nav className="migas" aria-label="Estás en">
              <Link href="/">Inicio</Link> / <Link href="/herramientas">Herramientas</Link>
            </nav>
            <h1>¿Qué tengo que guardar?</h1>
            <p className="entradilla">Lo que guardes hoy puede marcar la diferencia en tu caso. Elige tu situación y ve marcando lo que ya tienes.</p>
          </div>
          <FotoCabeza ruta="/herramientas/que-guardar" />
        </div>
      </header>
      <section className="seccion">
        <div className="contenedor">
          <QueGuardar />
        </div>
      </section>
    </>
  );
}
