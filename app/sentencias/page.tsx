import type { Metadata } from 'next';
import { meta } from '@/lib/seo';
import Link from 'next/link';
import Llamada from '@/components/Llamada';
import { CASOS, JURISPRUDENCIA } from '@/lib/casos';

export const metadata: Metadata = meta({
  titulo: 'Sentencias y casos ganados',
  descripcion: 'Fichas de los casos del despacho: la primera condena en España a la empresa y al acosador (2005), Castilla y León (2011) y la URJC (2024).',
  ruta: '/sentencias',
});

const FOTO_MATERIA: Record<string, string> = {
  'Acoso laboral': 'abogada-escucha',
  Despido: 'jesus-firmando',
  Conciliación: 'abogada-sonrie',
  'Prevención de riesgos': 'biblioteca',
  Incapacidad: 'abogada-documentos',
};

export default function Sentencias() {
  return (
    <>
      <header className="cabeza-pagina">
        <div className="contenedor">
          <nav className="migas" aria-label="Estás en">
            <Link href="/">Inicio</Link> / Sentencias
          </nav>
          <h1>Casos que han abierto camino</h1>
          <p className="entradilla">
            Cada ficha cuenta qué pasó, qué decidió el tribunal y por qué importa a quien hoy está en una situación parecida. Sin nombres de
            clientes que no hayan dado su permiso.
          </p>
        </div>
      </header>
      <section className="seccion">
        <div className="contenedor fichas">
          {CASOS.map((c) => {
            const foto = FOTO_MATERIA[c.materia] ?? FOTO_MATERIA['Acoso laboral'];
            return (
              <article className="ficha" key={c.slug} id={c.slug}>
                <div className="ficha-lado">
                  <img src={`/img/${foto}-640.webp`} alt="" width={640} height={480} loading="lazy" />
                  <div className="ficha-sello">
                    <span>{c.anio || 'Caso'}</span>
                    <small>{c.materia}</small>
                  </div>
                </div>
                <div className="ficha-cuerpo">
                  <h3>{c.titulo}</h3>
                  <span className="ficha-organo">
                    {c.organo}. {c.fecha}.
                  </span>
                  <p>{c.resumen}</p>
                  <div>
                    <strong>Qué pasó</strong>
                    <ul>
                      {c.hechos.map((h) => (
                        <li key={h}>{h}</li>
                      ))}
                    </ul>
                  </div>
                  <p>
                    <strong>Resultado.</strong> {c.resultado}
                  </p>
                  <div className="ficha-importa">
                    <strong>Por qué importa</strong>
                    <span>{c.porQueImporta}</span>
                  </div>
                  <div className="ficha-pie">
                    {c.fuente && <a href={c.fuente.url}>Fuente: {c.fuente.nombre}</a>}
                    {c.pendiente && <span className="ficha-pendiente">Pendiente de confirmar con el despacho</span>}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
      <section className="seccion seccion-blanca">
        <div className="contenedor">
          <h2>Jurisprudencia que conviene conocer</h2>
          <p>Sentencias de otros tribunales que explican bien cómo funciona la ley. No son casos del despacho.</p>
          <div className="rejilla-guias">
            {JURISPRUDENCIA.map((j) => (
              <Link key={j.titulo} href={j.enlace}>
                <span className="campo-ayuda">{j.organo}</span>
                <strong>{j.titulo}</strong>
                <span>{j.texto}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Llamada asunto="laboral" />
    </>
  );
}
