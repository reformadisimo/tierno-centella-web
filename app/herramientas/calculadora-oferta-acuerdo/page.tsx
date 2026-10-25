import type { Metadata } from 'next';
import FotoCabeza from '@/components/FotoCabeza';
import { meta, esquemaHerramienta, esquemaMigas } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import Link from 'next/link';
import OfertaAcuerdo from '@/components/OfertaAcuerdo';

const TITULO = '¿Es buena la oferta de la empresa por tu despido?';
const DESC = 'Compara lo que te ofrece la empresa con la indemnización legal de un despido improcedente y descubre qué conviene mirar antes de firmar.';

export const metadata: Metadata = meta({ titulo: TITULO, descripcion: DESC, ruta: '/herramientas/calculadora-oferta-acuerdo' });

export default function Pagina() {
  return (
    <>
      <JsonLd datos={esquemaHerramienta(TITULO, DESC, '/herramientas/calculadora-oferta-acuerdo')} />
      <JsonLd datos={esquemaMigas([{ href: '/', texto: 'Inicio' }, { href: '/herramientas', texto: 'Herramientas' }, { href: '/herramientas/calculadora-oferta-acuerdo', texto: TITULO }])} />
      <header className="cabeza-pagina">
        <div className="contenedor cabeza-con-foto">
          <div>
            <nav className="migas" aria-label="Estás en">
              <Link href="/">Inicio</Link> / <Link href="/herramientas">Herramientas</Link>
            </nav>
            <h1>¿Es buena la oferta de tu empresa?</h1>
            <p className="entradilla">Pon lo que te ofrecen y lo comparamos con la indemnización legal. Antes de firmar, merece la pena.</p>
          </div>
          <FotoCabeza ruta="/herramientas/calculadora-oferta-acuerdo" />
        </div>
      </header>
      <section className="seccion">
        <div className="contenedor">
          <OfertaAcuerdo />
        </div>
      </section>
    </>
  );
}
