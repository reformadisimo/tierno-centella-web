import type { Metadata } from 'next';
import FotoCabeza from '@/components/FotoCabeza';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import Llamada from '@/components/Llamada';
import { FAQ } from '@/lib/faq';
import { esquemaFaq, esquemaMigas, meta } from '@/lib/seo';

export const metadata: Metadata = meta({
  titulo: 'Preguntas frecuentes sobre despido, acoso e incapacidad',
  descripcion: 'Respuestas claras a las dudas más habituales sobre despidos, acoso laboral, incapacidad permanente y cómo trabaja el despacho.',
  ruta: '/preguntas-frecuentes',
});

const TEMAS = [
  { id: 'acoso', nombre: 'Acoso laboral', foto: 'acoso-tension', alt: 'Un superior señala a una trabajadora que se lleva la mano a la cabeza' },
  { id: 'despido', nombre: 'Despido', foto: 'despido-caja', alt: 'Una persona recoge sus cosas en una caja tras un despido' },
  { id: 'incapacidad', nombre: 'Incapacidad permanente', foto: 'medico-informe', alt: 'Un médico rellena un informe' },
  { id: 'despacho', nombre: 'El despacho y la consulta', foto: 'recepcion', alt: 'La recepción del despacho Tierno Centella' },
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
      <section className="seccion">
        <div className="contenedor prosa">
          {TEMAS.map((t) => (
            <section key={t.id} id={t.id}>
              <h2>{t.nombre}</h2>
              <figure className="prosa-foto prosa-foto-ancha">
                <img src={`/img/${t.foto}-640.webp`} srcSet={`/img/${t.foto}-640.webp 640w, /img/${t.foto}.webp 1200w`} sizes="(max-width: 1000px) 100vw, 720px" alt={t.alt} width={1200} height={514} loading="lazy" decoding="async" />
              </figure>
              {FAQ.filter((f) => f.tema === t.id).map((f) => (
                <details key={f.pregunta} className="pregunta-faq">
                  <summary>{f.pregunta}</summary>
                  <p>{f.respuesta}</p>
                </details>
              ))}
            </section>
          ))}
        </div>
      </section>
      <Llamada asunto="laboral" />
    </>
  );
}
