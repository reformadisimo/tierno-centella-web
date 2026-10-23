import type { Metadata } from 'next';
import { meta } from '@/lib/seo';
import { notFound } from 'next/navigation';
import PaginaGuia from '@/components/PaginaGuia';
import { leerColeccion, leerPieza } from '@/lib/contenido';

const HERRAMIENTA: Record<string, { href: string; texto: string }> = {
  acoso: { href: '/herramientas/test-acoso', texto: '¿Es acoso lo que me pasa? Haz el test' },
  despido: { href: '/calculadora-indemnizacion', texto: 'Calcula tu indemnización' },
  incapacidad: { href: '/herramientas/comprobador-incapacidad', texto: 'Comprobador de incapacidad' },
};

export function generateStaticParams() {
  return leerColeccion('blog').map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = leerPieza('blog', slug);
  return p
    ? meta({ titulo: p.titulo, descripcion: p.descripcion, ruta: `/blog/${slug}`, tipo: 'article', publicado: p.fecha, modificado: p.actualizado })
    : {};
}

export default async function Articulo({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pieza = leerPieza('blog', slug);
  if (!pieza) notFound();
  const otras = leerColeccion('blog')
    .filter((p) => p.slug !== slug && p.categoria === pieza.categoria)
    .slice(0, 5)
    .map((p) => ({ href: `/blog/${p.slug}`, titulo: p.titulo }));
  return (
    <PaginaGuia
      pieza={pieza}
      migas={[
        { href: '/', texto: 'Inicio' },
        { href: '/blog', texto: 'Blog' },
      ]}
      relacionadas={otras}
      herramienta={HERRAMIENTA[pieza.categoria ?? ''] }
    />
  );
}
