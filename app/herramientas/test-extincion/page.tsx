import type { Metadata } from 'next';
import FotoCabeza from '@/components/FotoCabeza';
import Link from 'next/link';
import TestExtincion from '@/components/TestExtincion';
import JsonLd from '@/components/JsonLd';
import { meta, esquemaHerramienta, esquemaMigas } from '@/lib/seo';

export const metadata: Metadata = meta({
  titulo: '¿Puedo irme de la empresa con indemnización? Test',
  descripcion: 'Si la empresa no te paga, te acosa o te deja sin funciones, puedes pedir al juez la extinción del contrato con indemnización y paro. Compruébalo.',
  ruta: '/herramientas/test-extincion',
});

export default function Pagina() {
  return (
    <>
      <JsonLd datos={esquemaHerramienta('¿Puedo irme de la empresa con indemnización? Test', 'Si la empresa no te paga, te acosa o te deja sin funciones, puedes pedir al juez la extinción del contrato con indemnización y paro. Compruébalo.', '/herramientas/test-extincion')} />
      <JsonLd datos={esquemaMigas([{ href: '/', texto: 'Inicio' }, { href: '/herramientas', texto: 'Herramientas' }, { href: '/herramientas/test-extincion', texto: '¿Puedo irme de la empresa con indemnización? Test' }])} />
      <header className="cabeza-pagina">
        <div className="contenedor cabeza-con-foto">
          <div>
            <nav className="migas" aria-label="Estás en">
              <Link href="/">Inicio</Link> / <Link href="/herramientas">Herramientas</Link>
            </nav>
            <h1>¿Puedo irme de la empresa con indemnización?</h1>
            <p className="entradilla">Si la empresa incumple gravemente, no tienes que esperar a que te despida. Comprueba si puedes pedir al juez que extinga tu contrato.</p>
          </div>
          <FotoCabeza ruta="/herramientas/test-extincion" />
        </div>
      </header>
      <section className="seccion">
        <div className="contenedor">
          <TestExtincion />
        </div>
      </section>
    </>
  );
}
