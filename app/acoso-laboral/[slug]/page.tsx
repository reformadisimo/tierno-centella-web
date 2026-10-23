import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PaginaGuia from '@/components/PaginaGuia';
import { leerColeccion, leerPieza } from '@/lib/contenido';

export function generateStaticParams() {
  return leerColeccion('acoso').map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = leerPieza('acoso', slug);
  return p ? { title: p.titulo, description: p.descripcion } : {};
}

export default async function Guia({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pieza = leerPieza('acoso', slug);
  if (!pieza) notFound();
  const otras = leerColeccion('acoso')
    .filter((p) => p.slug !== slug)
    .slice(0, 5)
    .map((p) => ({ href: '/acoso-laboral/' + p.slug, titulo: p.titulo }));
  return (
    <PaginaGuia
      pieza={pieza}
      migas={[
        { href: '/', texto: 'Inicio' },
        { href: '/acoso-laboral', texto: 'Acoso laboral' },
      ]}
      relacionadas={otras}
      herramienta={{ href: '/herramientas/test-acoso', texto: '¿Es acoso lo que me pasa? Haz el test' }}
    />
  );
}
