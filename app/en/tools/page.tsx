import type { Metadata } from 'next';
import Link from 'next/link';
import { meta } from '@/lib/seo';
import { HERRAMIENTAS_EN as TOOLS } from '@/lib/herramientas-en';

export const metadata: Metadata = meta({
  titulo: 'Free employment law tools (Spain)',
  descripcion: 'Compensation calculator, harassment test, evidence map, deadlines, unemployment benefit and permanent disability checker. Free, in English, no personal data.',
  ruta: '/en/tools',
});



export default function ToolsEn() {
  return (
    <>
      <header className="cabeza-pagina">
        <div className="contenedor cabeza-con-foto">
          <div>
          <nav className="migas" aria-label="You are here">
            <Link href="/en">Home</Link> / Tools
          </nav>
          <h1>Free tools</h1>
          <p className="entradilla">
            Fourteen calculators and tests, free and without leaving your details. If you have any doubt about a result, our assistant will explain it to you.
          </p>
          </div>
          <div>
            <img className="foto" src="/img/portatil-manos.webp" srcSet="/img/portatil-manos-640.webp 640w, /img/portatil-manos.webp 1200w" sizes="(max-width: 860px) 100vw, 50vw" alt="A person checks their papers next to a laptop" />
          </div>
        </div>
      </header>
      <section className="seccion">
        <div className="contenedor rejilla-guias">
          {TOOLS.map((t) => (
            <Link key={t.href} href={t.href}>
              <strong>{t.titulo}</strong>
              <span>{t.texto}</span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
