import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { meta } from '@/lib/seo';
import PaginaGuia, { fotoDePieza } from '@/components/PaginaGuia';
import { leerColeccion, leerPieza } from '@/lib/contenido';
import { AREAS_EN, areaEn } from '@/lib/areas-en';

export const dynamicParams = false;

export function generateStaticParams() {
  return AREAS_EN.flatMap((a) => leerColeccion(`en/${a.carpeta}`).map((p) => ({ area: a.slug, slug: p.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ area: string; slug: string }> }): Promise<Metadata> {
  const { area, slug } = await params;
  const a = areaEn(area);
  const p = a && leerPieza(`en/${a.carpeta}`, slug);
  return p && a
    ? meta({ titulo: p.titulo, tituloSeo: p.tituloSeo, descripcion: p.descripcion, imagen: fotoDePieza(p).src, ruta: `/en/${a.slug}/${slug}`, tipo: 'article', publicado: p.fecha, modificado: p.actualizado })
    : {};
}

export default async function GuiaEn({ params }: { params: Promise<{ area: string; slug: string }> }) {
  const { area, slug } = await params;
  const a = areaEn(area);
  const pieza = a && leerPieza(`en/${a.carpeta}`, slug);
  if (!a || !pieza) notFound();
  const otras = leerColeccion(`en/${a.carpeta}`)
    .filter((p) => p.slug !== slug)
    .slice(0, 5)
    .map((p) => ({ href: `/en/${a.slug}/${p.slug}`, titulo: p.titulo }));
  return (
    <PaginaGuia
      idioma="en"
      pieza={pieza}
      migas={[
        { href: '/en', texto: 'Home' },
        { href: `/en/${a.slug}`, texto: a.menu },
      ]}
      relacionadas={otras}
      herramienta={a.herramientas[0]}
    />
  );
}
