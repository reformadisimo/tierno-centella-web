import type { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import AvisoPlazoEstado from '@/components/AvisoPlazoEstado';

export const metadata: Metadata = { title: 'Avisos de plazo', robots: { index: false, follow: false } };

export default function Pagina() {
  return (
    <>
      <header className="cabeza-pagina">
        <div className="contenedor">
          <h1>Avisos de plazo</h1>
        </div>
      </header>
      <section className="seccion">
        <div className="contenedor prosa">
          <Suspense fallback={null}>
            <AvisoPlazoEstado />
          </Suspense>
          <p><Link href="/herramientas/plazos">Volver a la herramienta de plazos</Link></p>
        </div>
      </section>
    </>
  );
}
