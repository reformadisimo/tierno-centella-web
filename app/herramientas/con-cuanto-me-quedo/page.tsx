import type { Metadata } from 'next';
import FotoCabeza from '@/components/FotoCabeza';
import { meta, esquemaHerramienta, esquemaMigas } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import Link from 'next/link';
import CalculadoraNeto from '@/components/CalculadoraNeto';

const TITULO = '¿Con cuánto dinero me quedo de mi indemnización?';
const DESC = 'Calcula de forma orientativa cuánto de tu indemnización por despido está exenta de IRPF y con cuánto te quedas, con un aviso claro de que es una estimación.';

export const metadata: Metadata = meta({ titulo: TITULO, descripcion: DESC, ruta: '/herramientas/con-cuanto-me-quedo' });

export default function Pagina() {
  return (
    <>
      <JsonLd datos={esquemaHerramienta(TITULO, DESC, '/herramientas/con-cuanto-me-quedo')} />
      <JsonLd datos={esquemaMigas([{ href: '/', texto: 'Inicio' }, { href: '/herramientas', texto: 'Herramientas' }, { href: '/herramientas/con-cuanto-me-quedo', texto: TITULO }])} />
      <header className="cabeza-pagina">
        <div className="contenedor cabeza-con-foto">
          <div>
            <nav className="migas" aria-label="Estás en">
              <Link href="/">Inicio</Link> / <Link href="/herramientas">Herramientas</Link>
            </nav>
            <h1>¿Con cuánto me quedo?</h1>
            <p className="entradilla">Una estimación de cuánto de tu indemnización queda exenta de IRPF y cuánto te quedaría después. Orientativa: consúltalo con tu asesor fiscal.</p>
          </div>
          <FotoCabeza ruta="/herramientas/con-cuanto-me-quedo" />
        </div>
      </header>
      <section className="seccion">
        <div className="contenedor">
          <CalculadoraNeto />
        </div>
      </section>
    </>
  );
}
