import type { Metadata } from 'next';
import Link from 'next/link';
import { meta } from '@/lib/seo';
import { leerColeccion } from '@/lib/contenido';
import BlogFiltro from '@/components/BlogFiltro';
import { fotoDePieza } from '@/components/PaginaGuia';

export const metadata: Metadata = meta({
  titulo: 'Employment law blog (Spain)',
  descripcion: 'Practical articles on dismissal, workplace harassment, sick leave and permanent disability in Spain, explained in plain English by Madrid employment lawyers.',
  ruta: '/en/blog',
});

export default function BlogEn() {
  const piezas = leerColeccion('en/blog').sort((a, b) => b.fecha.localeCompare(a.fecha));
  return (
    <>
      <header className="cabeza-pagina">
        <div className="contenedor">
          <nav className="migas" aria-label="You are here">
            <Link href="/en">Home</Link> / Blog
          </nav>
          <h1>Blog</h1>
          <p className="entradilla">What changes in Spanish employment law and how it affects you, explained without jargon.</p>
        </div>
      </header>
      <section className="seccion">
        <div className="contenedor">
          <BlogFiltro
            idioma="en"
            piezas={piezas.map((p) => ({
              slug: p.slug,
              titulo: p.titulo,
              descripcion: p.descripcion,
              categoria: p.categoria ?? '',
              minutos: p.minutos,
              foto: fotoDePieza(p),
            }))}
          />
        </div>
      </section>
    </>
  );
}
