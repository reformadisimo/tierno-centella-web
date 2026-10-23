import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { meta } from '@/lib/seo';
import { CASOS } from '@/lib/casos';
import { CASOS_EN } from '@/lib/casos-en';
import { DEMO, DESPACHO, enlaceWhatsapp } from '@/lib/despacho';
import { Compartir } from '@/components/BotonesAccion';

export const dynamicParams = false;
const FOTOS_JESUS = ['jesus-firmando', 'jesus-retrato', 'jesus-camisa', 'jesus-puerta', 'reunion-cliente'];

export function generateStaticParams() {
  return CASOS.filter((c) => CASOS_EN[c.slug]).map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const e = CASOS_EN[slug];
  const i = CASOS.findIndex((c) => c.slug === slug);
  if (!e) return {};
  return meta({ titulo: e.titulo, tituloSeo: TITULO_SEO_EN[slug], descripcion: e.resumen, ruta: `/en/rulings/${slug}`, tipo: 'article', imagen: `/img/${FOTOS_JESUS[i % FOTOS_JESUS.length]}.webp` });
}

const TITULO_SEO_EN: Record<string, string> = {
  'primera-condena-al-acosador-2005': 'First ruling against a harasser in Spain (2005)',
  'acoso-administracion-educativa-castilla-y-leon-2011': 'Harassment in education: the region held liable',
  'urjc-123000-euros-docente-2024': '123,000 euros for a harassed professor (2024)',
  'despido-represalia-permiso-hija-2025': "Dismissed for taking leave for her daughter",
  'despido-nulo-represalia-denuncia-interna-2025': 'Retaliatory dismissal declared null and void',
};

export default async function RulingEn({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const i = CASOS.findIndex((c) => c.slug === slug);
  const c = CASOS[i];
  const e = CASOS_EN[slug];
  if (!c || !e) notFound();
  const otros = CASOS.filter((x) => x.slug !== slug && CASOS_EN[x.slug]).slice(0, 3);
  return (
    <>
      <header className="cabeza-pagina">
        <div className="contenedor cabeza-con-foto">
          <div>
            <nav className="migas" aria-label="You are here">
              <Link href="/en">Home</Link> / <Link href="/en/rulings">Rulings</Link>
            </nav>
            <p className="etiqueta-calida">
              {e.materia}
              {c.anio ? ` · ${c.anio}` : ''}
            </p>
            <h1>{e.titulo}</h1>
            <p className="entradilla">{e.resumen}</p>
            <p className="ficha-organo">{[e.organo, e.fecha === 'Pending' ? '' : e.fecha].filter(Boolean).join('. ')}.</p>
            {DEMO && c.pendiente && <span className="ficha-pendiente">Pending confirmation with the firm</span>}
          </div>
          <figure className="foto-cabeza">
            <img src={`/img/${FOTOS_JESUS[i % FOTOS_JESUS.length]}-640.webp`} alt="Jesús Tierno Centella, managing partner" width={640} height={480} />
          </figure>
        </div>
      </header>
      <section className="seccion">
        <div className="contenedor guia">
          <div className="prosa">
            <h2>What happened</h2>
            <ul>
              {e.hechos.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
            <h2>What the court decided</h2>
            <p>{e.resultado}</p>
            <div className="ficha-importa">
              <strong>Why it matters if something similar is happening to you</strong>
              <span>{e.porQueImporta}</span>
            </div>
            <p className="lp-nota">Every case is different and the outcome depends on the evidence and the court. We tell these cases without details that could identify anyone.</p>
            <Compartir titulo={e.titulo} />
          </div>
          <div className="guia-lateral">
            <div className="lateral-caja">
              <h2>Talk to us</h2>
              <div style={{ display: 'grid', gap: 8 }}>
                <a className="boton" href={DESPACHO.telefonoHref}>
                  +34 {DESPACHO.telefono}
                </a>
                <a className="boton boton-claro" href={enlaceWhatsapp(`Hello, I have read "${e.titulo}" and I would like to ask about my case.`)}>
                  WhatsApp
                </a>
              </div>
            </div>
            <div className="lateral-caja">
              <h2>Other cases</h2>
              <ul>
                {otros.map((o) => (
                  <li key={o.slug}>
                    <Link href={`/en/rulings/${o.slug}`}>{CASOS_EN[o.slug].titulo}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
