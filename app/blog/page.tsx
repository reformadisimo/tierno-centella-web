import type { Metadata } from 'next';
import Link from 'next/link';
import { leerColeccion } from '@/lib/contenido';

export const metadata: Metadata = {
  title: 'Blog de derecho laboral',
  description: 'Novedades y guías prácticas sobre despidos, acoso laboral e incapacidad permanente, revisadas por Jesús Tierno.',
};

const NOMBRES: Record<string, string> = { acoso: 'Acoso laboral', despido: 'Despido', incapacidad: 'Incapacidad', empresas: 'Empresas' };

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
          <div className="rejilla-guias">
            {piezas.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`}>
                <span className="campo-ayuda">
                  {NOMBRES[p.categoria ?? ''] ?? 'Laboral'} · {p.minutos} min
                </span>
                <strong>{p.titulo}</strong>
                <span>{p.descripcion}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
