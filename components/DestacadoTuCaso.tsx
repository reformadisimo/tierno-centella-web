import Link from 'next/link';
import Icono from './Iconos';

/** Puerta de entrada a todas las herramientas: "Tu caso en 2 minutos". Va arriba en Herramientas y en la portada. */
export default function DestacadoTuCaso() {
  return (
    <Link href="/herramientas/tu-caso" className="destacado-tu-caso">
      <span className="dtc-icono" aria-hidden="true">
        <Icono nombre="reloj" tam={30} />
      </span>
      <span className="dtc-texto">
        <span className="dtc-chip">Empieza por aquí</span>
        <strong>Tu caso en 2 minutos</strong>
        <span>Cuéntanos qué te pasa y te damos tu plan: tu plazo con fecha, lo que te puede corresponder y la carta para el primer paso.</span>
      </span>
      <span className="dtc-boton">Ver mi plan</span>
    </Link>
  );
}
