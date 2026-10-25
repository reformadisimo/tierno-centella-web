import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { meta, BASE, ID_DESPACHO, ID_JESUS, esquemaMigas } from '@/lib/seo';
import { CASOS } from '@/lib/casos';
import { DEMO } from '@/lib/despacho';
import JsonLd from '@/components/JsonLd';
import Llamada from '@/components/Llamada';
import { Compartir } from '@/components/BotonesAccion';

// Una página por caso: es la mejor prueba de experiencia del despacho y el tipo de contenido que citan Google y las IA.
export function generateStaticParams() {
  return CASOS.map((c) => ({ slug: c.slug }));
}

// Títulos para Google (caben en 60 caracteres con la marca o sin ella).
const TITULO_SEO: Record<string, string> = {
  'primera-condena-al-acosador-2005': 'Primera condena al acosador en España (2005)',
  'acoso-administracion-educativa-castilla-y-leon-2011': 'Acoso en la educación: condena a la Junta (2011)',
  'urjc-123000-euros-docente-2024': 'URJC condenada a pagar 123.000 € por acoso (2024)',
  'despido-represalia-permiso-hija-2025': 'Despedida por pedir un permiso por su hija',
  'degradada-tras-pedir-permisos-2025': 'Degradada por pedir permisos para cuidar',
};

const FOTOS_JESUS = ['jesus-firmando', 'jesus-retrato', 'jesus-camisa', 'jesus-puerta', 'reunion-cliente'];

const GUIA: Record<string, { href: string; texto: string }> = {
  'Acoso laboral': { href: '/herramientas/test-acoso', texto: '¿Es acoso lo que me pasa? Haz el test' },
  Despido: { href: '/herramientas/test-nulidad', texto: '¿Mi despido puede ser nulo? Compruébalo' },
  Incapacidad: { href: '/herramientas/comprobador-incapacidad', texto: 'Comprueba tu incapacidad' },
  Conciliación: { href: '/mujer-y-trabajo/reduccion-y-adaptacion-de-jornada', texto: 'Tus derechos de conciliación' },
  'Prevención de riesgos': { href: '/herramientas/mapa-de-pruebas', texto: 'Mapa de pruebas del acoso' },
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = CASOS.find((x) => x.slug === slug);
  if (!c) return {};
  const i = CASOS.indexOf(c);
  return meta({
    titulo: c.titulo,
    tituloSeo: TITULO_SEO[c.slug],
    descripcion: c.resumen,
    ruta: `/sentencias/${c.slug}`,
    tipo: 'article',
    imagen: `/img/${FOTOS_JESUS[i % FOTOS_JESUS.length]}.webp`,
  });
}

export default async function Sentencia({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = CASOS.find((x) => x.slug === slug);
  if (!c) notFound();
  const i = CASOS.indexOf(c);
  const foto = FOTOS_JESUS[i % FOTOS_JESUS.length];
  const organo = c.organo.replace(/^Pendiente de confirmar con el despacho\.?\s*/, '');
  const fecha = c.fecha === 'Pendiente' ? '' : c.fecha;
  const otros = CASOS.filter((x) => x.slug !== c.slug).sort((a, b) => Number(b.materia === c.materia) - Number(a.materia === c.materia)).slice(0, 3);
  const herramienta = GUIA[c.materia];
  const migas = [
    { href: '/', texto: 'Inicio' },
    { href: '/sentencias', texto: 'Sentencias' },
    { href: `/sentencias/${c.slug}`, texto: c.titulo },
  ];

  return (
    <>
      <JsonLd
        datos={[
          {
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: c.titulo,
            description: c.resumen,
            image: `${BASE}/img/${foto}.webp`,
            author: { '@id': ID_JESUS },
            publisher: { '@id': ID_DESPACHO },
            about: c.materia,
            mainEntityOfPage: `${BASE}/sentencias/${c.slug}`,
          },
          esquemaMigas(migas),
        ]}
      />
      <header className="cabeza-pagina">
        <div className="contenedor cabeza-con-foto">
          <div>
            <nav className="migas" aria-label="Estás en">
              <Link href="/">Inicio</Link> / <Link href="/sentencias">Sentencias</Link>
            </nav>
            <p className="etiqueta-calida">
              {c.materia}
              {c.anio ? ` · ${c.anio}` : ''}
            </p>
            <h1>{c.titulo}</h1>
            <p className="entradilla">{c.resumen}</p>
            {(organo || fecha) && <p className="ficha-organo">{[organo, fecha].filter(Boolean).join('. ')}.</p>}
            
          </div>
          <figure className="foto-cabeza">
            <img src={`/img/${foto}-640.webp`} alt="Jesús Tierno Centella, socio director del despacho" width={640} height={480} fetchPriority="high" />
          </figure>
        </div>
      </header>

      <section className="seccion">
        <div className="contenedor guia">
          <div className="prosa">
            <h2>Qué pasó</h2>
            <ul>
              {c.hechos.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
            <h2>Qué decidió el tribunal</h2>
            <p>{c.resultado}</p>
            <div className="ficha-importa">
              <strong>Por qué importa si hoy te pasa algo parecido</strong>
              <span>{c.porQueImporta}</span>
            </div>
            <p className="lp-nota">
              Cada caso es distinto y el resultado depende de las pruebas y del tribunal. Contamos estos casos sin datos que permitan identificar a
              nadie.
              {c.fuente && (
                <>
                  {' '}
                  Fuente: <a href={c.fuente.url}>{c.fuente.nombre}</a>.
                </>
              )}
            </p>
            <Compartir titulo={c.titulo} />
          </div>
          <div className="guia-lateral">
            {herramienta && (
              <div className="lateral-caja">
                <h2>Herramienta gratuita</h2>
                <Link href={herramienta.href}>{herramienta.texto}</Link>
              </div>
            )}
            <div className="lateral-caja">
              <h2>Otros casos</h2>
              <ul>
                {otros.map((o) => (
                  <li key={o.slug}>
                    <Link href={`/sentencias/${o.slug}`}>{o.titulo}</Link>
                  </li>
                ))}
              </ul>
              <p style={{ marginTop: 12 }}>
                <Link href="/sentencias">Ver todos los casos</Link>
              </p>
            </div>
          </div>
        </div>
      </section>
      <Llamada asunto={c.materia.toLowerCase()} />
    </>
  );
}
