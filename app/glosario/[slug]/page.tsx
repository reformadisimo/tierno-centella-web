import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import JsonLd from '@/components/JsonLd';
import { GLOSARIO, relacionados, slugTermino } from '@/lib/glosario';
import { BASE, esquemaFaq, esquemaMigas, meta } from '@/lib/seo';
import { DESPACHO, enlaceWhatsapp } from '@/lib/despacho';

export function generateStaticParams() {
  return GLOSARIO.map((t) => ({ slug: slugTermino(t.termino) }));
}

const buscar = (slug: string) => GLOSARIO.find((t) => slugTermino(t.termino) === slug);

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const t = buscar((await params).slug);
  if (!t) return {};
  return meta({
    titulo: `Qué es ${t.termino.toLowerCase()} en derecho laboral`,
    tituloSeo: `${t.termino}: qué es y cómo te afecta`.length <= 60 ? `${t.termino}: qué es y cómo te afecta` : t.termino,
    descripcion: t.definicion,
    ruta: `/glosario/${slugTermino(t.termino)}`,
  });
}

export default async function Pagina({ params }: { params: Promise<{ slug: string }> }) {
  const t = buscar((await params).slug);
  if (!t) notFound();
  const ruta = `/glosario/${slugTermino(t.termino)}`;
  const rel = relacionados(t);
  const datos = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    name: t.termino,
    description: t.definicion,
    url: BASE + ruta,
    inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Glosario de derecho laboral', url: `${BASE}/glosario` },
  };
  return (
    <>
      <JsonLd datos={datos} />
      <JsonLd datos={esquemaFaq([{ pregunta: `¿Qué es ${t.termino.toLowerCase()} en derecho laboral?`, respuesta: t.definicion }])} />
      <JsonLd datos={esquemaMigas([{ href: '/', texto: 'Inicio' }, { href: '/glosario', texto: 'Glosario' }, { href: ruta, texto: t.termino }])} />
      <header className="cabeza-pagina">
        <div className="contenedor">
          <nav className="migas" aria-label="Estás en">
            <Link href="/">Inicio</Link> / <Link href="/glosario">Glosario</Link> / {t.termino}
          </nav>
          <h1>{t.termino}: qué es</h1>
        </div>
      </header>
      <section className="seccion">
        <div className="contenedor">
          <div className="prosa" style={{ maxWidth: '72ch' }}>
            <p className="entradilla">{t.definicion}</p>
            {t.enlace && (
              <p>
                Si te afecta, tienes más información en <Link href={t.enlace}>nuestra guía sobre este tema</Link>.
              </p>
            )}
            {rel.length > 0 && (
              <>
                <h2>Términos relacionados</h2>
                <ul>
                  {rel.map((r) => (
                    <li key={r.termino}>
                      <Link href={`/glosario/${slugTermino(r.termino)}`}>{r.termino}</Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
            <aside className="recuadro">
              <p>
                <strong>¿Te suena porque te está pasando?</strong> Cuéntanoslo y te decimos qué significa en tu caso. También puedes probar las{' '}
                <Link href="/herramientas">herramientas gratuitas</Link>.
              </p>
              <div className="acciones">
                <a className="boton" href={enlaceWhatsapp(`Hola, tengo una duda sobre "${t.termino}".`)}>Escribir por WhatsApp</a>
                <a className="boton boton-claro" href={DESPACHO.telefonoHref}>Llamar al {DESPACHO.telefono}</a>
              </div>
            </aside>
            <p>
              <Link href="/glosario">Ver todo el glosario</Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
