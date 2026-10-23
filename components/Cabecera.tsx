'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { DESPACHO } from '@/lib/despacho';
import { MENU } from '@/lib/navegacion';

export default function Cabecera() {
  const ruta = usePathname();
  const [abierto, setAbierto] = useState(false);

  useEffect(() => setAbierto(false), [ruta]);
  useEffect(() => {
    document.body.style.overflow = abierto ? 'hidden' : '';
  }, [abierto]);

  return (
    <header className="cabecera">
      <div className="contenedor cabecera-fila">
        <Link href="/" className="marca" aria-label="Tierno Centella Abogados, inicio">
          <img src="/img/logo-tc.webp" alt="Tierno Centella Abogados" width={192} height={46} />
        </Link>

        <nav className="menu" aria-label="Principal">
          {MENU.map((g) => (
            <div className="menu-grupo" key={g.titulo}>
              <Link href={g.href} aria-current={ruta.startsWith(g.href) && g.href !== '/' ? 'page' : undefined}>
                {g.titulo}
              </Link>
              <div className="menu-desplegable">
                {g.enlaces.map((e) => (
                  <Link key={e.href + e.texto} href={e.href}>
                    {e.texto}
                  </Link>
                ))}
              </div>
            </div>
          ))}
          <Link href="/contacto" aria-current={ruta === '/contacto' ? 'page' : undefined}>
            Contacto
          </Link>
        </nav>

        <div className="cabecera-acciones">
          <a className="boton boton-telefono" href={DESPACHO.telefonoHref} aria-label={`Llamar al ${DESPACHO.telefono}`}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />
            </svg>
            <span className="tel-numero">{DESPACHO.telefono}</span>
          </a>
          <button
            type="button"
            className="boton-menu"
            aria-expanded={abierto}
            aria-controls="menu-movil"
            onClick={() => setAbierto((a) => !a)}
          >
            {abierto ? 'Cerrar' : 'Menú'}
          </button>
        </div>
      </div>

      {abierto && (
        <div id="menu-movil" className="menu-movil">
          <div className="contenedor">
            {MENU.map((g) => (
              <section key={g.titulo}>
                <h2>{g.titulo}</h2>
                <ul>
                  {g.enlaces.map((e) => (
                    <li key={e.href + e.texto}>
                      <Link href={e.href}>{e.texto}</Link>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
            <section>
              <h2>Contacto</h2>
              <ul>
                <li>
                  <Link href="/contacto">Pedir cita</Link>
                </li>
                <li>
                  <a href={DESPACHO.telefonoHref}>Llamar al {DESPACHO.telefono}</a>
                </li>
              </ul>
            </section>
          </div>
        </div>
      )}
    </header>
  );
}
