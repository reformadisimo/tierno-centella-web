import type { Metadata } from 'next';
import Link from 'next/link';
import { meta } from '@/lib/seo';
import { CASOS } from '@/lib/casos';
import { CASOS_EN } from '@/lib/casos-en';
import { DEMO } from '@/lib/despacho';

export const metadata: Metadata = meta({
  titulo: 'Rulings and cases won by the firm',
  descripcion: "The firm's cases: the first ruling in Spain against both the company and the harasser (2005), Castilla y León (2011) and the URJC (2024).",
  ruta: '/en/rulings',
});

const FOTOS_JESUS = ['jesus-firmando', 'jesus-retrato', 'jesus-camisa', 'jesus-puerta', 'reunion-cliente'];

export default function RulingsEn() {
  return (
    <>
      <header className="cabeza-pagina">
        <div className="contenedor">
          <nav className="migas" aria-label="You are here">
            <Link href="/en">Home</Link> / Rulings
          </nav>
          <h1>Cases that opened the way</h1>
          <p className="entradilla">
            Each case explains what happened, what the court decided and why it matters to anyone in a similar situation today. No client names without their
            permission.
          </p>
        </div>
      </header>
      <section className="seccion">
        <div className="contenedor fichas">
          {CASOS.map((c, i) => {
            const e = CASOS_EN[c.slug];
            if (!e) return null;
            return (
              <article className="ficha" key={c.slug} id={c.slug}>
                <div className="ficha-lado">
                  <img src={`/img/${FOTOS_JESUS[i % FOTOS_JESUS.length]}-640.webp`} alt="Jesús Tierno Centella, managing partner" width={640} height={480} loading="lazy" />
                  <div className="ficha-sello">
                    <span>{c.anio || 'Case'}</span>
                    <small>{e.materia}</small>
                  </div>
                </div>
                <div className="ficha-cuerpo">
                  <h2 className="ficha-titulo">
                    <Link href={`/en/rulings/${c.slug}`}>{e.titulo}</Link>
                  </h2>
                  <span className="ficha-organo">{[e.organo, e.fecha === 'Pending' ? '' : e.fecha].filter(Boolean).join('. ')}.</span>
                  <p>{e.resumen}</p>
                  <p>
                    <strong>Outcome.</strong> {e.resultado}
                  </p>
                  <div className="ficha-pie">
                    <Link href={`/en/rulings/${c.slug}`}>Read the full case</Link>
                    {DEMO && c.pendiente && <span className="ficha-pendiente">Pending confirmation with the firm</span>}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}
