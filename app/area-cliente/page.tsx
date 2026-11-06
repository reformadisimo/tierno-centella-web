import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import AreaCliente from '@/components/AreaCliente';
import { esquemaMigas, meta } from '@/lib/seo';

export const metadata: Metadata = meta({
  titulo: 'Tu área de cliente: tu caso, siempre a mano',
  descripcion: 'Así sigues tu caso con Tierno Centella: en qué fase está, tu próxima cita, lo que nos falta, tus documentos y un chat con tu abogado. Míralo con un caso de ejemplo.',
  ruta: '/area-cliente',
});

export default function PaginaAreaCliente() {
  return (
    <>
      <JsonLd datos={esquemaMigas([{ href: '/', texto: 'Inicio' }, { href: '/area-cliente', texto: 'Tu área de cliente' }])} />
      <header className="cabeza-pagina">
        <div className="contenedor">
          <nav className="migas" aria-label="Estás en">
            <Link href="/">Inicio</Link> / Tu área de cliente
          </nav>
          <h1>Tu caso, siempre a mano</h1>
          <p className="entradilla">
            Saber en qué punto está tu caso quita mucha angustia. Por eso, cuando eres cliente, lo ves todo desde el móvil: en qué fase está, tu
            próxima cita, lo que nos falta y un chat con tu abogado. Así se ve, con un caso de ejemplo.
          </p>
        </div>
      </header>
      <section className="seccion seccion-ac">
        <div className="contenedor">
          <AreaCliente />
        </div>
      </section>
    </>
  );
}
