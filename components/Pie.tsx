import Link from 'next/link';
import { DESPACHO } from '@/lib/despacho';

export default function Pie() {
  return (
    <footer className="pie">
      <div className="contenedor">
        <div className="pie-rejilla">
          <div>
            <h2>{DESPACHO.nombre}</h2>
            <p>
              Despacho especializado en derecho laboral. Defendemos a trabajadores en despidos, acoso laboral e incapacidad
              permanente, y asesoramos a empresas.
            </p>
          </div>
          <div>
            <h2>Dónde estamos</h2>
            <ul>
              <li>
                <a href={DESPACHO.mapa}>
                  {DESPACHO.direccion}, {DESPACHO.ciudad}
                </a>
              </li>
              <li>
                <a href={DESPACHO.telefonoHref}>{DESPACHO.telefono}</a>
              </li>
              <li>
                <a href={`mailto:${DESPACHO.email}`}>{DESPACHO.email}</a>
              </li>
            </ul>
          </div>
          <div>
            <h2>Herramientas</h2>
            <ul>
              <li>
                <Link href="/calculadora-indemnizacion">Calculadora de indemnización</Link>
              </li>
              <li>
                <Link href="/#plazo">Plazo para reclamar un despido</Link>
              </li>
              <li>
                <Link href="/contacto">Pedir cita</Link>
              </li>
            </ul>
          </div>
        </div>
        <p className="pie-legal">
          La información de esta web es orientativa y no sustituye el consejo de un abogado sobre tu caso concreto.
        </p>
      </div>
    </footer>
  );
}
