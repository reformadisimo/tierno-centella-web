import type { Metadata } from 'next';
import Link from 'next/link';
import FotoCabeza from '@/components/FotoCabeza';
import JsonLd from '@/components/JsonLd';
import { esquemaMigas, meta } from '@/lib/seo';
import { GRUPOS_CASO } from '@/lib/mi-caso';

export const metadata: Metadata = meta({
  titulo: 'Mi caso es... encuentra tu situación laboral y qué hacer',
  descripcion: 'Despido estando de baja, embarazada, acoso, incapacidad denegada, finiquito: busca tu situación y ve directo a la guía, la herramienta o el plazo que necesitas.',
  ruta: '/mi-caso',
});

export default function MiCaso() {
  return (
    <>
      <JsonLd datos={esquemaMigas([{ href: '/', texto: 'Inicio' }, { href: '/mi-caso', texto: 'Mi caso es...' }])} />
      <header className="cabeza-pagina">
        <div className="contenedor cabeza-con-foto">
          <div>
            <nav className="migas" aria-label="Estás en">
              <Link href="/">Inicio</Link> / Mi caso es...
            </nav>
            <h1>Mi caso es...</h1>
            <p className="entradilla">Busca la frase que más se parezca a lo que te está pasando. Cada una te lleva a la guía, la herramienta o el plazo que necesitas, sin datos personales.</p>
            <nav aria-label="Temas" className="glosario-letras">
              {GRUPOS_CASO.map((g) => (
                <a key={g.id} href={`#${g.id}`} style={{ padding: '0 14px', fontSize: '.9rem' }}>
                  {g.titulo.split(',')[0]}
                </a>
              ))}
            </nav>
          </div>
          <FotoCabeza ruta="/mi-caso" />
        </div>
      </header>
      <section className="seccion">
        <div className="contenedor">
          <aside className="recuadro">
            <p>
              <strong>Si hay un plazo corriendo,</strong> <Link href="/herramientas/plazos">míralo primero</Link>. Y si no encuentras tu situación, <Link href="/contacto">cuéntanosla</Link> y te orientamos.
            </p>
          </aside>
          {GRUPOS_CASO.map((g) => (
            <div key={g.id} id={g.id} className="recursos-grupo">
              <h2>{g.titulo}</h2>
              <ul className="recursos-lista">
                {g.situaciones.map((s) => (
                  <li key={s.id} className="recurso-tarjeta">
                    <h3>{s.titulo}</h3>
                    <p>{s.texto}</p>
                    <ul className="prosa">
                      {s.enlaces.map((e) => (
                        <li key={e.href}>
                          <Link href={e.href}>{e.texto}</Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <p>
            ¿Vas a un trámite en Madrid? <Link href="/donde-ir">Mira dónde y cómo llegar</Link>.
          </p>
        </div>
      </section>
    </>
  );
}
