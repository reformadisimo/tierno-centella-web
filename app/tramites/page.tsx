import type { Metadata } from 'next';
import Link from 'next/link';
import FotoCabeza from '@/components/FotoCabeza';
import JsonLd from '@/components/JsonLd';
import { esquemaMigas, meta } from '@/lib/seo';
import { TRAMITES } from '@/lib/tramites';

export const metadata: Metadata = meta({
  titulo: 'Trámites que puedes hacer tú: paro, conciliación, vida laboral, Inspección',
  descripcion: 'Cómo pedir el paro, presentar la papeleta de conciliación, pedir tu vida laboral o denunciar ante la Inspección de Trabajo, paso a paso, sin abogado y sin coste.',
  ruta: '/tramites',
});

export default function Tramites() {
  return (
    <>
      <JsonLd datos={esquemaMigas([{ href: '/', texto: 'Inicio' }, { href: '/tramites', texto: 'Trámites que puedes hacer tú' }])} />
      <header className="cabeza-pagina">
        <div className="contenedor cabeza-con-foto">
          <div>
            <nav className="migas" aria-label="Estás en">
              <Link href="/">Inicio</Link> / Trámites
            </nav>
            <h1>Trámites que puedes hacer tú</h1>
            <p className="entradilla">No todo exige un abogado. Aquí tienes, paso a paso, lo que puedes gestionar tú misma o tú mismo, aunque no pienses contratarnos. Si en algún punto te atascas, estamos aquí.</p>
            <nav aria-label="Trámites" className="glosario-letras">
              {TRAMITES.map((t) => (
                <a key={t.id} href={`#${t.id}`} style={{ padding: '0 12px', fontSize: '.9rem' }}>
                  {t.titulo.split(' (')[0]}
                </a>
              ))}
            </nav>
          </div>
          <FotoCabeza ruta="/tramites" />
        </div>
      </header>
      <section className="seccion">
        <div className="contenedor">
          <aside className="recuadro">
            <p>
              <strong>Antes de empezar:</strong> si hay un plazo corriendo, <Link href="/herramientas/plazos">míralo primero</Link>. Y puedes preparar tus cartas en{' '}
              <Link href="/herramientas/genera-tu-carta">Genera tu carta</Link> y reunir tus pruebas con <Link href="/herramientas/que-guardar">la lista de lo que hay que guardar</Link>.
            </p>
          </aside>
          <ul className="recursos-lista">
            {TRAMITES.map((t) => (
              <li key={t.id} id={t.id} className="recurso-tarjeta">
                <h2 style={{ fontSize: '1.3rem' }}>{t.titulo}</h2>
                <p>{t.para}</p>
                <h3 style={{ fontSize: '1rem', margin: '10px 0 4px' }}>Qué necesitas</h3>
                <ul className="prosa">{t.llevas.map((x) => <li key={x}>{x}</li>)}</ul>
                <h3 style={{ fontSize: '1rem', margin: '10px 0 4px' }}>Los pasos</h3>
                <ol className="prosa">{t.pasos.map((x) => <li key={x}>{x}</li>)}</ol>
                {t.consejo && <p className="recurso-consejo">{t.consejo}</p>}
                <ul className="prosa">
                  {t.enlaces.map((e) => (
                    <li key={e.href}>
                      <Link href={e.href}>{e.texto}</Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
          <p>Los requisitos y los plazos pueden cambiar; confirma siempre en la web oficial. Hay más enlaces en <Link href="/recursos">recursos útiles</Link>.</p>
        </div>
      </section>
    </>
  );
}
