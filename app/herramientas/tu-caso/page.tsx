import type { Metadata } from 'next';
import FotoCabeza from '@/components/FotoCabeza';
import Link from 'next/link';
import { meta, esquemaHerramienta, esquemaMigas } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import TuCaso from '@/components/TuCaso';

const TITULO = 'Tu caso en 2 minutos';
const DESCRIPCION = 'Cuéntanos qué te pasa y te damos tu plan: tu plazo con fecha, lo que te puede corresponder y la carta para dar el primer paso.';
const RUTA = '/herramientas/tu-caso';

export const metadata: Metadata = meta({ titulo: TITULO, descripcion: DESCRIPCION, ruta: RUTA, imagen: '/img/abogada-escucha.webp' });

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
            <h1>Tu caso en 2 minutos</h1>
            <p className="entradilla">Dos pasos y tienes tu plan: cuándo acaba tu plazo, cuánto te puede corresponder y qué hacer primero. Sin dejar tus datos.</p>
          </div>
          <FotoCabeza ruta="/herramientas/tu-caso" />
        </div>
      </header>
      <section className="seccion">
        <div className="contenedor">
          <TuCaso />
        </div>
      </section>
    </>
  );
}
