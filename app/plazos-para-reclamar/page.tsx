import type { Metadata } from 'next';
import Link from 'next/link';
import FotoCabeza from '@/components/FotoCabeza';
import JsonLd from '@/components/JsonLd';
import { esquemaFaq, esquemaMigas, meta } from '@/lib/seo';
import { PLAZOS_RECLAMAR } from '@/lib/plazos-reclamar';

export const metadata: Metadata = meta({
  titulo: 'Plazos para reclamar: despido, indemnización, dinero que te deben, accidente',
  descripcion: 'Cuánto tiempo tienes para reclamar un despido, una indemnización por accidente de trabajo, una sanción, el dinero que te deben o una incapacidad permanente. Tabla clara y calculadora.',
  ruta: '/plazos-para-reclamar',
});

export default function PlazosReclamar() {
  const faq = PLAZOS_RECLAMAR.map((p) => ({ pregunta: `¿Cuánto tiempo tengo para reclamar: ${p.que.charAt(0).toLowerCase()}${p.que.slice(1)}?`, respuesta: `${p.plazo}. ${p.desde}` }));
  return (
    <>
      <JsonLd datos={esquemaMigas([{ href: '/', texto: 'Inicio' }, { href: '/plazos-para-reclamar', texto: 'Plazos para reclamar' }])} />
      <JsonLd datos={esquemaFaq(faq)} />
      <header className="cabeza-pagina">
        <div className="contenedor cabeza-con-foto">
          <div>
            <nav className="migas" aria-label="Estás en">
              <Link href="/">Inicio</Link> / Plazos para reclamar
            </nav>
            <h1>¿Cuánto tiempo tienes para reclamar?</h1>
            <p className="entradilla">Los plazos son lo que más se pierde sin querer. Aquí tienes los más habituales, en una sola tabla y con palabras normales.</p>
            <div className="acciones">
              <Link className="boton" href="/herramientas/plazos">Calcular mi plazo</Link>
              <Link className="boton boton-claro" href="/mi-caso">Buscar mi situación</Link>
            </div>
          </div>
          <FotoCabeza ruta="/plazos-para-reclamar" />
        </div>
      </header>
      <section className="seccion">
        <div className="contenedor">
          <aside className="recuadro">
            <p>
              <strong>Importante:</strong> son plazos orientativos. Cada caso tiene matices (cuándo empieza a contar, si se interrumpe, qué festivos cuentan) que solo un abogado puede valorar viendo tus documentos. Ante la duda, cuenta siempre por el plazo más corto y escríbenos pronto.
            </p>
          </aside>
          <ul className="recursos-lista">
            {PLAZOS_RECLAMAR.map((p) => (
              <li key={p.id} id={p.id} className="recurso-tarjeta">
                <h2 style={{ fontSize: '1.2rem' }}>{p.que}</h2>
                <p><b>Plazo.</b> {p.plazo}</p>
                <p><b>Desde cuándo.</b> {p.desde}</p>
                {p.nota && <p className="recurso-consejo">{p.nota}</p>}
                {p.enlace && <p><Link href={p.enlace.href}>{p.enlace.texto}</Link></p>}
              </li>
            ))}
          </ul>
          <p>
            ¿Y si ya se te ha pasado? Llámanos de todos modos: a veces el plazo se interrumpió o no había empezado a contar cuando parece. Y los festivos de Madrid ya los descuenta <Link href="/herramientas/plazos">la calculadora</Link>.
          </p>
        </div>
      </section>
    </>
  );
}
