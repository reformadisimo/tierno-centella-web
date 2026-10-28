import type { Metadata } from 'next';
import FotoCabeza from '@/components/FotoCabeza';
import Link from 'next/link';
import { meta, esquemaHerramienta, esquemaMigas } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import TribunalMedico from '@/components/TribunalMedico';

const TITULO = '¿Llevas preparado el tribunal médico? Lista para la cita';
const DESCRIPCION = 'La lista para ir preparado al tribunal médico del INSS: qué informes llevar, cómo explicar tu trabajo y qué hacer después.';
const RUTA = '/herramientas/tribunal-medico';

export const metadata: Metadata = meta({ titulo: TITULO, descripcion: DESCRIPCION, ruta: RUTA, imagen: '/img/medico-informe.webp' });

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
            <h1>¿Llevas preparado el tribunal médico?</h1>
            <p className="entradilla">Lo que más pesa en la decisión, en una lista que puedes ir marcando mientras lo reúnes. Y al final, lo que te falta.</p>
          </div>
          <FotoCabeza ruta="/herramientas/tribunal-medico" />
        </div>
      </header>
      <section className="seccion">
        <div className="contenedor">
          <TribunalMedico />
        </div>
      </section>
    </>
  );
}
