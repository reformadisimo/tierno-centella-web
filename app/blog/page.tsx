import type { Metadata } from 'next';
import { meta } from '@/lib/seo';
import { leerColeccion } from '@/lib/contenido';
import BlogFiltro from '@/components/BlogFiltro';
import { fotoDePieza } from '@/components/PaginaGuia';

export const metadata: Metadata = meta({
  titulo: 'Blog de derecho laboral',
  descripcion: 'Novedades y guías prácticas sobre despidos, acoso laboral, incapacidad permanente y conciliación, explicadas sin jerga.',
  ruta: '/blog',
});

export default function Blog() {
  const piezas = leerColeccion('blog').sort((a, b) => b.fecha.localeCompare(a.fecha));
  return (
    <>
      <header className="cabeza-pagina">
        <div className="contenedor">
          <h1>Blog</h1>
          <p className="entradilla">Lo que cambia en la ley laboral y cómo te afecta, explicado sin jerga.</p>
        </div>
      </header>
      <section className="seccion">
        <div className="contenedor">
          <BlogFiltro
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
