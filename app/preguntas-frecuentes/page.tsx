import type { Metadata } from 'next';
import FotoCabeza from '@/components/FotoCabeza';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import Llamada from '@/components/Llamada';
import { FAQ } from '@/lib/faq';
import { DESPACHO } from '@/lib/despacho';
import { esquemaFaq, esquemaMigas, meta } from '@/lib/seo';

export const metadata: Metadata = meta({
  titulo: 'Preguntas frecuentes sobre despido, acoso e incapacidad',
  descripcion: 'Respuestas claras a las dudas más habituales sobre despidos, acoso laboral, incapacidad permanente y cómo trabaja el despacho.',
  ruta: '/preguntas-frecuentes',
});

const TEMAS = [
  { id: 'acoso', nombre: 'Acoso laboral', foto: 'acoso-tension', alt: 'Un superior señala a una trabajadora que se lleva la mano a la cabeza', lema: 'Lo que pesa son las pruebas: empieza a guardarlas hoy.' },
  { id: 'despido', nombre: 'Despido', foto: 'despido-caja', alt: 'Una persona recoge sus cosas en una caja tras un despido', lema: 'El plazo corre desde que te lo comunican: no lo dejes pasar.' },
  { id: 'incapacidad', nombre: 'Incapacidad permanente', foto: 'medico-informe', alt: 'Un médico rellena un informe', lema: 'Cada caso se estudia con su informe médico y su historial.' },
  { id: 'despacho', nombre: 'El despacho y la consulta', foto: 'recepcion', alt: 'La recepción del despacho Tierno Centella', lema: 'Cómo es la primera llamada y qué puedes esperar de nosotros.' },
] as const;

export default function Preguntas() {
  return (
    <>
      <JsonLd datos={esquemaFaq(FAQ)} />
      <JsonLd datos={esquemaMigas([{ href: '/', texto: 'Inicio' }, { href: '/preguntas-frecuentes', texto: 'Preguntas frecuentes' }])} />
      <header className="cabeza-pagina">
        <div className="contenedor cabeza-con-foto">
          <div>
            <nav className="migas" aria-label="Estás en">
              <Link href="/">Inicio</Link> / Preguntas frecuentes
            </nav>
            <h1>Preguntas frecuentes</h1>
            <p className="entradilla">Lo que más nos preguntan en la primera llamada.</p>
          </div>
          <FotoCabeza ruta="/preguntas-frecuentes" />
        </div>
      </header>
      <section className="seccion faq-seccion">
        <div className="contenedor">
          {TEMAS.map((t) => {
            const preguntas = FAQ.filter((f) => f.tema === t.id);
            return (
              <section key={t.id} id={t.id} className={`faq-tema faq-${t.id}`} aria-labelledby={`faq-t-${t.id}`}>
                <aside className="faq-lateral">
                  <figure className="faq-foto">
                    <img src={`/img/${t.foto}-640.webp`} srcSet={`/img/${t.foto}-640.webp 640w, /img/${t.foto}.webp 1200w`} sizes="(max-width: 900px) 100vw, 360px" alt={t.alt} width={640} height={480} loading="lazy" decoding="async" />
                  </figure>
                  <p className="faq-cifra" aria-hidden="true"><b>{preguntas.length}</b> preguntas</p>
                  <h2 id={`faq-t-${t.id}`}>{t.nombre}</h2>
                  <p className="faq-lema">{t.lema}</p>
                  <div className="faq-botones">
                    <Link className="boton" href="/contacto">Cuéntanos tu caso</Link>
                    <a className="boton boton-claro" href={DESPACHO.telefonoHref}>{DESPACHO.telefono}</a>
                  </div>
                </aside>
                <div className="faq-lista">
                  {preguntas.map((f, i) => (
                    <details key={f.pregunta} className="pregunta-faq" open={i === 0}>
                      <summary>
                        <span className="faq-num" aria-hidden="true">{i + 1}</span>
                        <span className="faq-q">{f.pregunta}</span>
                        <span className="faq-mas" aria-hidden="true" />
                      </summary>
                      <p>{f.respuesta}</p>
                    </details>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </section>
      <Llamada asunto="laboral" />
    </>
  );
}
