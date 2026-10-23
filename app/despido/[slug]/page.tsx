import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PaginaGuia from '@/components/PaginaGuia';
import { leerColeccion, leerPieza } from '@/lib/contenido';

export function generateStaticParams() {
  return leerColeccion('despido').map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = leerPieza('despido', slug);
  return p ? { title: p.titulo, description: p.descripcion } : {};
}

export default async function Guia({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pieza = leerPieza('despido', slug);
  if (!pieza) notFound();
  const otras = leerColeccion('despido')
    .filter((p) => p.slug !== slug)
    .slice(0, 5)
    .map((p) => ({ href: '/despido/' + p.slug, titulo: p.titulo }));
  return (
    <PaginaGuia
      pieza={pieza}
      migas={[
        { href: '/', texto: 'Inicio' },
        { href: '/despido', texto: 'Despido' },
      ]}
      relacionadas={otras}
      herramienta={{ href: '/calculadora-indemnizacion', texto: 'Calcula tu indemnización' }}
    />
  );
}
