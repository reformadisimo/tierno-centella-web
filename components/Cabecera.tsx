'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { DESPACHO, enlaceWhatsapp } from '@/lib/despacho';
import { MENU } from '@/lib/navegacion';

export default function Cabecera() {
  const ruta = usePathname();
  const [abierto, setAbierto] = useState(false);
  const cabecera = useRef<HTMLElement>(null);

  useEffect(() => setAbierto(false), [ruta]);
  useEffect(() => {
    document.body.style.overflow = abierto ? 'hidden' : '';
    // El menú empieza justo debajo de la cabecera, esté donde esté (con o sin la franja de demo encima).
    if (abierto && cabecera.current) {
      document.documentElement.style.setProperty('--menu-arriba', `${Math.round(cabecera.current.getBoundingClientRect().bottom)}px`);
    }
    if (!abierto) return;
    const tecla = (e: KeyboardEvent) => e.key === 'Escape' && setAbierto(false);
    window.addEventListener('keydown', tecla);
    return () => window.removeEventListener('keydown', tecla);
  }, [abierto]);

  const grupoActual = MENU.find((g) => g.enlaces.some((e) => e.href !== '/' && ruta.startsWith(e.href)))?.titulo;

  return (
    <header className="cabecera" ref={cabecera}>
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
              <div className={`menu-desplegable${g.enlaces.length > 8 ? ' menu-ancho' : ''}`}>
                <Link href={g.href} className="md-cabeza">
                  <img src={`/img/${g.foto}-640.webp`} alt="" width={220} height={140} loading="lazy" />
                  <strong>{g.titulo}</strong>
                  <small>{g.sub}</small>
                </Link>
                <div className="md-enlaces">
                {g.enlaces.map((e) => (
                  <Link key={e.href + e.texto} href={e.href}>
                    {e.texto}
                  </Link>
                ))}
                </div>
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
            <p className="mm-intro">¿Qué te está pasando?</p>
            <div className="mm-grupos">
              {MENU.map((g) => (
                <details key={g.titulo} className="mm-grupo" open={g.titulo === grupoActual}>
                  <summary>
                    <img src={`/img/${g.foto}-640.webp`} alt="" width={64} height={64} loading="lazy" />
                    <span className="mm-texto">
                      <strong>{g.titulo}</strong>
                      <small>{g.sub}</small>
                    </span>
                    <svg className="mm-flecha" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </summary>
                  <ul>
                    {g.enlaces.map((e) => (
                      <li key={e.href + e.texto}>
                        <Link href={e.href} aria-current={ruta === e.href ? 'page' : undefined}>
                          {e.texto}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </details>
              ))}
            </div>

            <Link href="/jesus-tierno" className="mm-jesus">
              <img src="/img/jesus-avatar.webp" alt="" width={56} height={56} loading="lazy" />
              <span>
                <strong>Jesús Tierno Centella</strong>
                <small>Más de 25 años defendiendo a trabajadores</small>
              </span>
            </Link>

            <div className="mm-contacto">
              <strong>¿Hablamos de tu caso?</strong>
              <p>
                Primera consulta de una hora: {DESPACHO.precioCita} €{DESPACHO.iva}. {DESPACHO.direccion}, Madrid, o por videollamada.
              </p>
              <div className="mm-botones">
                <a className="boton boton-marcador" href={DESPACHO.telefonoHref}>
                  Llamar
                </a>
                <a className="boton mm-wa" href={enlaceWhatsapp('Hola, quiero consultar mi caso.')}>
                  WhatsApp
                </a>
                <Link className="boton mm-cita" href="/contacto">
                  Pedir cita
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
