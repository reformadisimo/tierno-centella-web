import type { Metadata } from 'next';
import { meta, esquemaHerramienta, esquemaMigas } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import Link from 'next/link';
import RevisaCarta from '@/components/RevisaCarta';

export const metadata: Metadata = meta({
  titulo: 'Revisa tu carta de despido',
  descripcion: 'Comprueba en dos minutos si tu carta de despido tiene defectos de forma que la hagan improcedente o si tu despido podría ser nulo.',
  ruta: '/herramientas/revisa-tu-carta-de-despido',
});

export default function Pagina() {
  return (
    <>
      <JsonLd datos={esquemaHerramienta('Revisa tu carta de despido', 'Comprueba en dos minutos si tu carta de despido tiene defectos de forma que la hagan improcedente o si tu despido podría ser nulo.', '/herramientas/revisa-tu-carta-de-despido')} />
      <JsonLd datos={esquemaMigas([{ href: '/', texto: 'Inicio' }, { href: '/herramientas', texto: 'Herramientas' }, { href: '/herramientas/revisa-tu-carta-de-despido', texto: 'Revisa tu carta de despido' }])} />
      <header className="cabeza-pagina">
        <div className="contenedor">
          <nav className="migas" aria-label="Estás en">
            <Link href="/">Inicio</Link> / <Link href="/herramientas">Herramientas</Link>
          </nav>
          <h1>Revisa tu carta de despido</h1>
          <p className="entradilla">Muchos despidos se ganan por fallos en la carta. Contesta unas preguntas con la carta delante y te decimos qué puede fallar.</p>
        </div>
      </header>
      <section className="seccion">
        <div className="contenedor">
          <RevisaCarta />
        </div>
      </section>
    </>
  );
}
