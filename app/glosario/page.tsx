import type { Metadata } from 'next';
import FotoCabeza from '@/components/FotoCabeza';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import { GLOSARIO, slugTermino } from '@/lib/glosario';
import { Fragment } from 'react';
import BuscadorGlosario from '@/components/BuscadorGlosario';

const FOTOS_GLOSARIO: [string, string][] = [
  ['abogada-escucha', 'Una abogada del despacho escucha a una clienta'],
  ['despido-caja', 'Una persona recoge sus cosas en una caja tras un despido'],
  ['medico-informe', 'Un médico rellena un informe'],
  ['mazo', 'Un mazo de juez'],
  ['madre-hijo', 'Una madre juega con su hijo pequeño'],
  ['firma-contrato', 'Una persona firma un documento'],
  ['acoso-tension', 'Un superior señala a una trabajadora que se lleva la mano a la cabeza'],
  ['biblioteca', 'Reunión en la biblioteca del despacho'],
  ['calculadora-papeles', 'Cuentas con calculadora, cuaderno y portátil'],
  ['reunion-equipo', 'El equipo del despacho reunido'],
];
import { BASE, esquemaMigas, meta } from '@/lib/seo';

export const metadata: Metadata = meta({
  titulo: 'Glosario de derecho laboral explicado sin jerga',
  descripcion: `${GLOSARIO.length} términos de despidos, acoso laboral, bajas e incapacidad permanente explicados en lenguaje sencillo por abogados laboralistas.`,
  ruta: '/glosario',
});

const slug = (t: string) =>
  t
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

export default function Glosario() {
  const letras = Array.from(new Set(GLOSARIO.map((t) => t.termino[0].toUpperCase())));
  const datos = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    name: 'Glosario de derecho laboral',
    url: `${BASE}/glosario`,
    hasDefinedTerm: GLOSARIO.map((t) => ({ '@type': 'DefinedTerm', name: t.termino, description: t.definicion, url: `${BASE}/glosario#${slug(t.termino)}` })),
  };
  return (
    <>
      <JsonLd datos={datos} />
      <JsonLd datos={esquemaMigas([{ href: '/', texto: 'Inicio' }, { href: '/glosario', texto: 'Glosario' }])} />
      <header className="cabeza-pagina">
        <div className="contenedor cabeza-con-foto">
          <div>
            <nav className="migas" aria-label="Estás en">
              <Link href="/">Inicio</Link> / Glosario
            </nav>
            <h1>Glosario laboral</h1>
            <p className="entradilla">Las palabras que vas a oír en tu caso, explicadas como te las explicaríamos en el despacho. ¿Prefieres frases muy cortas y dibujos? Mira el <Link href="/glosario/facil">glosario con dibujos</Link>.</p>
            <BuscadorGlosario total={GLOSARIO.length} />
            <nav aria-label="Letras" className="glosario-letras">
              {letras.map((l) => (
                <a key={l} href={`#letra-${l}`}>
                  {l}
                </a>
              ))}
            </nav>
          </div>
          <FotoCabeza ruta="/glosario" />
        </div>
      </header>
      <section className="seccion">
        <div className="contenedor">
          <div className="prosa" style={{ maxWidth: '72ch' }}>
            {GLOSARIO.map((t, i) => {
              const nuevaLetra = i === 0 || GLOSARIO[i - 1].termino[0].toUpperCase() !== t.termino[0].toUpperCase();
              const foto = i > 0 && i % 12 === 0 ? FOTOS_GLOSARIO[(i / 12 - 1) % FOTOS_GLOSARIO.length] : null;
              return (
                <Fragment key={t.termino}>
                {foto && (
                  <figure className="prosa-foto prosa-foto-ancha">
                    <img src={`/img/${foto[0]}-640.webp`} srcSet={`/img/${foto[0]}-640.webp 640w, /img/${foto[0]}.webp 1200w`} sizes="(max-width: 1000px) 100vw, 720px" alt={foto[1]} width={1200} height={514} loading="lazy" decoding="async" />
                  </figure>
                )}
                {nuevaLetra && (
                  <h2 className="glosario-letra" id={`letra-${t.termino[0].toUpperCase()}`}>
                    {t.termino[0].toUpperCase()}
                  </h2>
                )}
                <dl id={slug(t.termino)} data-termino={`${t.termino} ${t.definicion}`} data-letra={t.termino[0].toUpperCase()} style={{ padding: '14px 0', borderBottom: '1px solid var(--linea)', margin: 0 }}>
                  <dt style={{ fontWeight: 700, fontSize: '1.1rem' }}><Link href={`/glosario/${slug(t.termino)}`} style={{ color: 'inherit' }}>{t.termino}</Link></dt>
                  <dd style={{ margin: '4px 0 0' }}>
                    {t.definicion} {t.enlace && <Link href={t.enlace}>Saber más</Link>}
                    <a className="glosario-ancla" href={`#${slug(t.termino)}`} aria-label={`Enlace a ${t.termino}`}>#</a>
                  </dd>
                </dl>
                </Fragment>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
