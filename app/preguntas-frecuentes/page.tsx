import type { Metadata } from 'next';
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
  { id: 'acoso', nombre: 'Acoso laboral' },
  { id: 'despido', nombre: 'Despido' },
  { id: 'incapacidad', nombre: 'Incapacidad permanente' },
  { id: 'despacho', nombre: 'El despacho y la consulta' },
] as const;

export default function Preguntas() {
  return (
    <>
      <JsonLd datos={esquemaFaq(FAQ)} />
      <JsonLd datos={esquemaMigas([{ href: '/', texto: 'Inicio' }, { href: '/preguntas-frecuentes', texto: 'Preguntas frecuentes' }])} />
      <header className="cabeza-pagina">
        <div className="contenedor">
          <nav className="migas" aria-label="Estás en">
            <Link href="/">Inicio</Link> / Preguntas frecuentes
          </nav>
          <h1>Preguntas frecuentes</h1>
          <p className="entradilla">Lo que más nos preguntan en la primera llamada.</p>
        </div>
      </header>
      <section className="seccion">
        <div className="contenedor prosa">
          {TEMAS.map((t) => (
            <section key={t.id} id={t.id}>
              <h2>{t.nombre}</h2>
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
