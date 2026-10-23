'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { DESPACHO } from '@/lib/despacho';

const ENLACES = [
  { href: '/despido', texto: 'Despido' },
  { href: '/acoso-laboral', texto: 'Acoso laboral' },
  { href: '/incapacidad-permanente', texto: 'Incapacidad' },
  { href: '/calculadora-indemnizacion', texto: 'Calculadora' },
  { href: '/sentencias', texto: 'Sentencias' },
  { href: '/jesus-tierno', texto: 'Jesús Tierno' },
  { href: '/contacto', texto: 'Contacto' },
];

export default function Cabecera() {
  const ruta = usePathname();
  return (
    <header className="cabecera">
      <div className="contenedor cabecera-fila">
        <Link href="/" className="marca" aria-label="Tierno Centella Abogados, inicio">
          <span className="marca-nombre">Tierno Centella</span>
          <span className="marca-oficio">Abogados laboralistas</span>
        </Link>
        <nav className="menu" aria-label="Principal">
          {ENLACES.map((e) => (
            <Link key={e.href} href={e.href} aria-current={ruta === e.href ? 'page' : undefined}>
              {e.texto}
            </Link>
          ))}
        </nav>
        <a className="boton" href={DESPACHO.telefonoHref}>
          {DESPACHO.telefono}
        </a>
      </div>
    </header>
  );
}
