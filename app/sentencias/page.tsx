import { ChipVivo } from '@/components/Vida';
import EsquemaPagina from '@/components/EsquemaPagina';
import { Etiqueta } from '@/components/Etiqueta';
import type { Metadata } from 'next';
import { meta } from '@/lib/seo';
import Link from 'next/link';
import FiltroSentencias from '@/components/FiltroSentencias';
import Llamada from '@/components/Llamada';
import { CASOS, JURISPRUDENCIA } from '@/lib/casos';
import { DEMO } from '@/lib/despacho';

export const metadata: Metadata = meta({
  titulo: 'Sentencias y casos ganados',
  descripcion: 'Fichas de los casos del despacho: la primera condena en España a la empresa y al acosador (2005), Castilla y León (2011) y la URJC (2024).',
  ruta: '/sentencias',
});

// Los casos son del despacho que dirige Jesús Tierno: la cara que los acompaña es la suya.
const FOTOS_JESUS = ['jesus-firmando', 'jesus-retrato', 'jesus-camisa', 'jesus-puerta', 'reunion-cliente'];
// Cada ficha lleva una foto de su tema; Jesús solo en la primera, para no repetirlo cinco veces seguidas.
const FOTOS_MATERIA: Record<string, string[]> = {
  'Acoso laboral': ['mujer-pensativa', 'acoso-ventana', 'hombre-estres', 'jefe-senala'],
  Despido: ['despido-caja', 'documentos-mesa'],
  Incapacidad: ['incapacidad-ventana', 'medico-informe'],
  Conciliación: ['madre-hijo', 'familia-siluetas'],
  'Prevención de riesgos': ['obrero-grua', 'placa'],
};
const usadas: Record<string, number> = {};
const fotoDeCaso = (materia: string, i: number) => {
  if (i === 0) return FOTOS_JESUS[1];
  const lista = FOTOS_MATERIA[materia] || ['mazo'];
  const n = usadas[materia] || 0;
  usadas[materia] = n + 1;
  return lista[n % lista.length];
};

// Quita los avisos internos del órgano y la fecha: el aviso de "pendiente" ya va en su etiqueta (y solo en la demo).
function lineaOrgano(organo: string, fecha: string) {
  const o = organo.replace(/^Pendiente de confirmar con el despacho\.?\s*/, '');
  const f = fecha === 'Pendiente' ? '' : fecha;
  const linea = [o, f].filter(Boolean).join('. ');
  return linea ? `${linea}.` : 'Caso del despacho.';
}

export default function Sentencias() {
  return (
    <>
      <EsquemaPagina ruta="/sentencias" />
      <header className="cabeza-pagina cabeza-sentencias">
        <div className="contenedor">
          <nav className="migas" aria-label="Estás en">
            <Link href="/">Inicio</Link> / Sentencias
          </nav>
          <Etiqueta icono="balanza" tono="oro">Sentencias</Etiqueta>
          <h1>Casos que han abierto camino</h1>
          <p className="entradilla">
            Cada ficha cuenta qué pasó, qué decidió el tribunal y por qué importa a quien hoy está en una situación parecida. Sin nombres de
            clientes que no hayan dado su permiso.
          </p>
        </div>
      </header>
      <section className="seccion">
        <div className="contenedor">
          <FiltroSentencias materias={Object.entries(CASOS.reduce<Record<string, number>>((a, c) => ((a[c.materia] = (a[c.materia] || 0) + 1), a), {})).map(([nombre, total]) => ({ nombre, total }))} />
        </div>
        <div className="contenedor fichas">
          {CASOS.map((c, i) => {
            const foto = fotoDeCaso(c.materia, i);
            return (
              <article className="ficha" key={c.slug} id={c.slug} data-materia={c.materia}>
                <div className="ficha-lado">
                  <img src={`/img/${foto}-640.webp`} alt={i === 0 ? "Jesús Tierno Centella, socio director del despacho" : ""} width={640} height={480} loading={i === 0 ? 'eager' : 'lazy'} fetchPriority={i === 0 ? 'high' : 'auto'} sizes="(max-width: 700px) 100vw, 300px" />
                  <div className="ficha-sello">
                    <span>{c.anio || 'Caso'}</span>
                    <small>{c.materia}</small>
                  </div>
                </div>
                <div className="ficha-cuerpo">
                  <h2 className="ficha-titulo">
                    <Link href={`/sentencias/${c.slug}`}>{c.titulo}</Link>
                  </h2>
                  <span className="ficha-organo">{lineaOrgano(c.organo, c.fecha)}</span>
                  <p>{c.resumen}</p>
                  <details className="ficha-mas" open={i < 2}>
                    <summary>Qué pasó, resultado y por qué importa</summary>
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
                  </details>
                  <div className="ficha-pie">
                    <Link href={`/sentencias/${c.slug}`}>Leer la ficha completa</Link>
                    {c.fuente && <a href={c.fuente.url}>Fuente: {c.fuente.nombre}</a>}
                    
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
      <section className="seccion seccion-blanca">
        <div className="contenedor">
          <h2 className="tv"><ChipVivo texto="Jurisprudencia que conviene conocer" i={0} /><span className="tv-texto">Jurisprudencia que conviene conocer</span></h2>
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
