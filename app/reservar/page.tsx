import type { Metadata } from 'next';
import Link from 'next/link';
import { Etiqueta } from '@/components/Etiqueta';
import Icono from '@/components/Iconos';
import ReservarCita from '@/components/ReservarCita';
import { DESPACHO } from '@/lib/despacho';
import { meta } from '@/lib/seo';

export const metadata: Metadata = meta({
  titulo: 'Reservar una consulta con abogados laboralistas en Madrid',
  descripcion: 'Reserva tu consulta de una hora, online o en Jorge Juan (Madrid), con un abogado del despacho o con Jesús Tierno.',
  ruta: '/reservar',
});

export default async function Reservar({ searchParams }: { searchParams: Promise<{ con?: string }> }) {
  const { con } = await searchParams;
  return (
    <>
      <header className="cabeza-pagina cabeza-contacto">
        <div className="contenedor">
          <nav className="migas" aria-label="Estás en">
            <Link href="/">Inicio</Link> / Reservar
          </nav>
          <Etiqueta icono="calendario" tono="oro">Reserva tu consulta</Etiqueta>
          <h1>Reserva tu consulta en cuatro pasos</h1>
          <p className="entradilla">Una hora con tus documentos y un plan de acción al salir. Online desde cualquier punto de España o en el despacho.</p>
        </div>
      </header>
      <section className="seccion">
        <div className="contenedor dos-columnas">
          <ReservarCita inicial={con === 'jesus' ? 'jesus' : 'abogado'} />
          <div className="texto">
            <h2>Qué incluye</h2>
            <ul className="incluye-cita">
              <li><Icono nombre="check" tam={16} /> Revisión de tus documentos antes de la cita</li>
              <li><Icono nombre="check" tam={16} /> Plazos y vías posibles, explicados sin tecnicismos</li>
              <li><Icono nombre="check" tam={16} /> Presupuesto cerrado si decides seguir adelante</li>
              <li><Icono nombre="check" tam={16} /> Online desde cualquier punto de España, o en Jorge Juan</li>
            </ul>
            <p className="letra-pequena">
              {DESPACHO.precioCita} €{DESPACHO.iva} con un abogado del despacho; {DESPACHO.precioCitaJesus} €{DESPACHO.iva} con Jesús Tierno. Si tu plazo corre, llámanos primero al{' '}
              <a href={DESPACHO.telefonoHref}>{DESPACHO.telefono}</a>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
