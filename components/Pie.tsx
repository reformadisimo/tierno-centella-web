import Link from 'next/link';
import { DESPACHO } from '@/lib/despacho';
import { REDES } from '@/lib/seo';

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
                <Link href="/herramientas/test-acoso">Test de acoso laboral</Link>
              </li>
              <li>
                <Link href="/herramientas">Todas las herramientas</Link>
              </li>
              <li>
                <Link href="/glosario">Glosario laboral</Link>
              </li>
              <li>
                <Link href="/preguntas-frecuentes">Preguntas frecuentes</Link>
              </li>
              <li>
                <Link href="/contacto">Pedir cita</Link>
              </li>
            </ul>
          </div>
        </div>
        <nav className="pie-redes" aria-label="Redes sociales">
          <a href={REDES.instagram} rel="me noopener" target="_blank">Instagram</a>
          <a href={REDES.youtube} rel="me noopener" target="_blank">YouTube</a>
          <a href={REDES.facebook} rel="me noopener" target="_blank">Facebook</a>
          <a href={REDES.x} rel="me noopener" target="_blank">X</a>
          <a href={REDES.linkedin} rel="me noopener" target="_blank">LinkedIn de Jesús Tierno</a>
        </nav>
        <p className="pie-legal">
          La información de esta web es orientativa y no sustituye el consejo de un abogado sobre tu caso concreto.
        </p>
      </div>
    </footer>
  );
}
