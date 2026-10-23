import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PaginaGuia from '@/components/PaginaGuia';
import { leerColeccion, leerPieza } from '@/lib/contenido';

export function generateStaticParams() {
  return leerColeccion('incapacidad').map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = leerPieza('incapacidad', slug);
  return p ? { title: p.titulo, description: p.descripcion } : {};
}

export default async function Guia({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pieza = leerPieza('incapacidad', slug);
  if (!pieza) notFound();
  const otras = leerColeccion('incapacidad')
    .filter((p) => p.slug !== slug)
    .slice(0, 5)
    .map((p) => ({ href: '/incapacidad-permanente/' + p.slug, titulo: p.titulo }));
  return (
    <PaginaGuia
      pieza={pieza}
      migas={[
        { href: '/', texto: 'Inicio' },
        { href: '/incapacidad-permanente', texto: 'Incapacidad permanente' },
      ]}
      relacionadas={otras}
      herramienta={{ href: '/herramientas/comprobador-incapacidad', texto: 'Comprueba qué grado podría corresponderte' }}
    />
  );
}
