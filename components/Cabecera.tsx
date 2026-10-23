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
          <span className="marca-nombre">Tierno Centella</span>
          <span className="marca-oficio">Abogados laboralistas</span>
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
          <a className="boton boton-telefono" href={DESPACHO.telefonoHref}>
            {DESPACHO.telefono}
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
