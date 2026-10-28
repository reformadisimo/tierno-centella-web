import type { Metadata } from 'next';
import FotoCabeza from '@/components/FotoCabeza';
import Link from 'next/link';
import { meta, esquemaHerramienta, esquemaMigas } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import CalculadoraBaja from '@/components/CalculadoraBaja';

const TITULO = 'Calculadora de la baja 2026';
const DESCRIPCION = 'Calcula cuánto cobrarás estando de baja, día a día y quién te lo paga, con las cifras de 2026.';
const RUTA = '/herramientas/calculadora-baja-laboral';

export const metadata: Metadata = meta({ titulo: TITULO, descripcion: DESCRIPCION, ruta: RUTA, imagen: '/img/medico-informe.webp' });
// Pendiente de visto bueno: sin indexar ni enlazar desde el menú hasta que se apruebe.
metadata.robots = { index: false, follow: false };

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
            <h1>¿Cuánto cobras estando de baja?</h1>
            <p className="entradilla">{DESCRIPCION}</p>
          </div>
          <FotoCabeza ruta="/herramientas/calculadora-baja-laboral" />
        </div>
      </header>
      <section className="seccion">
        <div className="contenedor">
          <CalculadoraBaja />
        </div>
      </section>
    </>
  );
}
