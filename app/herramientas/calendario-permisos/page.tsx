import type { Metadata } from 'next';
import Link from 'next/link';
import { meta, esquemaHerramienta, esquemaMigas } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import CalendarioPermisos from '@/components/CalendarioPermisos';

const TITULO = 'Calendario de permisos por nacimiento 2026';
const DESCRIPCION =
  'Pon la fecha de nacimiento y te decimos hasta cuándo puedes disfrutar las 19 semanas, la lactancia, el permiso parental y la reducción de jornada, y hasta cuándo está protegido tu puesto.';

export const metadata: Metadata = meta({ titulo: TITULO, descripcion: DESCRIPCION, ruta: '/herramientas/calendario-permisos', imagen: '/img/reunion-cliente.webp' });

export default function Pagina() {
  return (
    <>
      <JsonLd datos={esquemaHerramienta(TITULO, DESCRIPCION, '/herramientas/calendario-permisos')} />
      <JsonLd
        datos={esquemaMigas([
          { href: '/', texto: 'Inicio' },
          { href: '/herramientas', texto: 'Herramientas' },
          { href: '/herramientas/calendario-permisos', texto: TITULO },
        ])}
      />
      <header className="cabeza-pagina">
        <div className="contenedor">
          <nav className="migas" aria-label="Estás en">
            <Link href="/">Inicio</Link> / <Link href="/herramientas">Herramientas</Link>
          </nav>
          <h1>Tus permisos por nacimiento, en un calendario.</h1>
          <p className="entradilla">{DESCRIPCION}</p>
        </div>
      </header>
      <section className="seccion">
        <div className="contenedor">
          <CalendarioPermisos />
          <p style={{ marginTop: 24 }}>
            Para entender cada permiso, lee <Link href="/mujer-y-trabajo/permisos-por-nacimiento-y-lactancia">la guía de permisos por nacimiento y lactancia</Link>.
          </p>
        </div>
      </section>
    </>
  );
}
