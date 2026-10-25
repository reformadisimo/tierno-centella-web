import type { Metadata } from 'next';
import Link from 'next/link';
import FotoCabeza from '@/components/FotoCabeza';
import JsonLd from '@/components/JsonLd';
import { esquemaMigas, meta } from '@/lib/seo';
import { GRUPOS_RECURSOS, TELEFONOS_AYUDA } from '@/lib/recursos';

export const metadata: Metadata = meta({
  titulo: 'Recursos útiles de derecho laboral: CENDOJ, SEPE y más',
  descripcion: 'Enlaces oficiales para buscar sentencias en el CENDOJ, consultar el BOE, pedir el paro o conciliar en el SMAC, explicados con cuándo usar cada uno.',
  ruta: '/recursos',
});

export default function Recursos() {
  return (
    <>
      <JsonLd datos={esquemaMigas([{ href: '/', texto: 'Inicio' }, { href: '/recursos', texto: 'Recursos útiles' }])} />
      <header className="cabeza-pagina">
        <div className="contenedor cabeza-con-foto">
          <div>
            <nav className="migas" aria-label="Estás en">
              <Link href="/">Inicio</Link> / Recursos útiles
            </nav>
            <h1>Recursos útiles</h1>
            <p className="entradilla">
              Las webs oficiales que más vas a necesitar, cada una con una frase que te dice cuándo te sirve. Para que no te pierdas entre tantas ventanillas.
            </p>
            <nav aria-label="Temas" className="glosario-letras">
              {GRUPOS_RECURSOS.map((g) => (
                <a key={g.id} href={`#${g.id}`} style={{ padding: '0 14px', fontSize: '.9rem' }}>
                  {g.titulo.split(':')[0]}
                </a>
              ))}
            </nav>
          </div>
          <FotoCabeza ruta="/recursos" />
        </div>
      </header>

      <section className="seccion">
        <div className="contenedor">
          <aside className="recuadro">
            <p>
              <strong>Un consejo antes de empezar:</strong> estas webs son oficiales y gratuitas, pero no te dicen qué te conviene en tu caso. Si tienes un plazo
              corriendo, <Link href="/herramientas/plazos">míralo primero</Link> y escríbenos.
            </p>
          </aside>
          {GRUPOS_RECURSOS.map((g) => (
            <div key={g.id} id={g.id} className="recursos-grupo">
              <h2>{g.titulo}</h2>
              <p className="recursos-intro">{g.intro}</p>
              <ul className="recursos-lista">
                {g.recursos.map((r) => (
                  <li key={r.url} className="recurso-tarjeta">
                    <h3>{r.nombre}</h3>
                    <p><b>Cuándo usarlo.</b> {r.cuando}</p>
                    {r.consejo && <p className="recurso-consejo">{r.consejo}</p>}
                    <a className="boton boton-claro" href={r.url} target="_blank" rel="noopener noreferrer">
                      Abrir la web oficial<span className="sr-only"> (se abre en otra pestaña)</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div id="como-buscar-cendoj" className="recursos-grupo">
            <h2>Cómo buscar una sentencia en el CENDOJ</h2>
            <ol className="pasos-numerados">
              <li>Entra en el buscador de jurisprudencia y elige la jurisdicción <b>Social</b>.</li>
              <li>Escribe una o dos palabras clave: &quot;acoso laboral&quot;, &quot;despido nulo&quot; o &quot;incapacidad permanente&quot;.</li>
              <li>Ordena por fecha y abre las más recientes: son las que mejor reflejan cómo piensan hoy los tribunales.</li>
              <li>Fíjate en el <b>fallo</b>, que es la decisión final, y en los <b>fundamentos de derecho</b>, que explican el porqué.</li>
            </ol>
            <p>
              Si algún término se te atraganta, lo tienes en el <Link href="/glosario">glosario laboral</Link>. Y puedes leer sentencias que ha ganado el despacho en{' '}
              <Link href="/sentencias">nuestra página de sentencias</Link>.
            </p>
          </div>

          <div className="recursos-grupo" id="telefonos">
            <h2>Teléfonos que conviene tener a mano</h2>
            <ul className="recursos-lista recursos-telefonos">
              {TELEFONOS_AYUDA.map((t) => (
                <li key={t.numero} className="recurso-tarjeta">
                  <h3>{t.numero}</h3>
                  <p>{t.texto}</p>
                  <a className="boton boton-claro" href={t.href}>Llamar al {t.numero}</a>
                </li>
              ))}
            </ul>
          </div>
          <p className="letra-pequena">
            Enlaces a páginas de terceros, que no controlamos. Pueden cambiar de dirección. La información de esta página es orientativa y no sustituye el consejo de un abogado.
          </p>
        </div>
      </section>
    </>
  );
}
