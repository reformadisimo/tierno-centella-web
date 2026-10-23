import type { Metadata } from 'next';
import { meta } from '@/lib/seo';
import { notFound } from 'next/navigation';
import PaginaGuia, { fotoDePieza } from '@/components/PaginaGuia';
import { leerColeccion, leerPieza } from '@/lib/contenido';

const HERRAMIENTA: Record<string, { href: string; texto: string }> = {
  acoso: { href: '/en/tools/harassment-test', texto: 'Is it harassment? Take the test' },
  despido: { href: '/en/tools/compensation-calculator', texto: 'Work out your compensation' },
  incapacidad: { href: '/en/tools/permanent-disability-checker', texto: 'Permanent disability checker' },
  empresas: { href: '/en/tools/company-self-assessment', texto: 'Self-assessment for companies' },
};

export function generateStaticParams() {
  return leerColeccion('en/blog').map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = leerPieza('en/blog', slug);
  return p
    ? meta({ titulo: p.titulo, tituloSeo: p.tituloSeo, descripcion: p.descripcion, imagen: fotoDePieza(p).src, ruta: `/en/blog/${slug}`, tipo: 'article', publicado: p.fecha, modificado: p.actualizado })
    : {};
}

export default async function ArticleEn({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pieza = leerPieza('en/blog', slug);
  if (!pieza) notFound();
  const otras = leerColeccion('en/blog')
    .filter((p) => p.slug !== slug && p.categoria === pieza.categoria)
    .slice(0, 5)
    .map((p) => ({ href: `/en/blog/${p.slug}`, titulo: p.titulo }));
  return (
    <PaginaGuia
      idioma="en"
      pieza={pieza}
      migas={[
        { href: '/en', texto: 'Home' },
        { href: '/en/blog', texto: 'Blog' },
      ]}
      relacionadas={otras}
      herramienta={HERRAMIENTA[pieza.categoria ?? '']}
    />
  );
}
