import type { Metadata } from 'next';
import { meta } from '@/lib/seo';
import { notFound } from 'next/navigation';
import PaginaGuia, { fotoDePieza } from '@/components/PaginaGuia';
import { leerColeccion, leerPieza } from '@/lib/contenido';

export function generateStaticParams() {
  return leerColeccion('mujer').map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = leerPieza('mujer', slug);
  return p
    ? meta({ titulo: p.titulo, descripcion: p.descripcion, imagen: fotoDePieza(p).src, ruta: `/mujer-y-trabajo/${slug}`, tipo: 'article', publicado: p.fecha, modificado: p.actualizado })
    : {};
}

export default async function Guia({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pieza = leerPieza('mujer', slug);
  if (!pieza) notFound();
  const otras = leerColeccion('mujer')
    .filter((p) => p.slug !== slug)
    .slice(0, 5)
    .map((p) => ({ href: '/mujer-y-trabajo/' + p.slug, titulo: p.titulo }));
  return (
    <PaginaGuia
      pieza={pieza}
      migas={[
        { href: '/', texto: 'Inicio' },
        { href: '/mujer-y-trabajo', texto: 'Mujer y trabajo' },
      ]}
      relacionadas={otras}
      herramienta={{ href: '/herramientas/calendario-permisos', texto: 'Calcula las fechas de tus permisos' }}
    />
  );
}
