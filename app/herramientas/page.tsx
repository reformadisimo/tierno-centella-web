import type { Metadata } from 'next';
import { meta } from '@/lib/seo';
import Link from 'next/link';

export const metadata: Metadata = meta({
  titulo: 'Herramientas gratuitas',
  descripcion: 'Calculadora de indemnización, test de acoso, mapa de pruebas, revisión de la carta de despido, plazos e incapacidad. Gratis y sin datos personales.',
  ruta: '/herramientas',
});

const HERRAMIENTAS = [
  { href: '/herramientas/test-acoso', titulo: '¿Es acoso lo que me pasa?', texto: 'Siete preguntas para saber si lo que vives tiene los rasgos del acoso laboral.' },
  { href: '/herramientas/test-nulidad', titulo: '¿Mi despido puede ser nulo?', texto: 'Embarazo, permisos, represalias, enfermedad: cuándo la empresa tiene que readmitirte.' },
  { href: '/herramientas/test-extincion', titulo: '¿Puedo irme con indemnización?', texto: 'Si la empresa no paga, te acosa o te deja sin funciones, puedes pedir al juez que extinga tu contrato.' },
  { href: '/herramientas/test-baja-laboral', titulo: '¿Mi baja es accidente de trabajo?', texto: 'Si tu baja viene del trabajo, cobras más y antes. Compruébalo.' },
  { href: '/herramientas/mapa-de-pruebas', titulo: 'Mapa de pruebas del acoso', texto: 'Marca lo que tienes y descubre qué te falta para demostrarlo.' },
  { href: '/calculadora-indemnizacion', titulo: 'Calculadora de indemnización', texto: 'Cuánto te corresponde por despido objetivo o improcedente, al momento.' },
  { href: '/herramientas/revisa-tu-carta-de-despido', titulo: 'Revisa tu carta de despido', texto: 'Los defectos de forma que pueden hacer improcedente tu despido.' },
  { href: '/herramientas/plazos', titulo: 'Plazos para reclamar', texto: 'El último día para reclamar un despido, una sanción, una deuda o una incapacidad.' },
  { href: '/herramientas/comprobador-incapacidad', titulo: 'Comprobador de incapacidad', texto: 'Qué grado podría corresponderte, cuánto se cobra y qué plazo tienes.' },
];

export default function Herramientas() {
  return (
    <>
      <header className="cabeza-pagina">
        <div className="contenedor">
          <h1>Herramientas gratuitas</h1>
          <p className="entradilla">Respuestas al momento, sin dejar tu teléfono. Cuando quieras, un abogado revisa el resultado contigo.</p>
        </div>
      </header>
      <section className="seccion">
        <div className="contenedor">
          <div className="rejilla-guias">
            {HERRAMIENTAS.map((h) => (
              <Link key={h.href} href={h.href}>
                <strong>{h.titulo}</strong>
                <span>{h.texto}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
