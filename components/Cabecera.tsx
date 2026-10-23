'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { DESPACHO, enlaceWhatsapp } from '@/lib/despacho';
import { MENU, MENU_EN } from '@/lib/navegacion';
import { idiomaDe, rutaEnOtroIdioma } from '@/lib/idioma';

const T = {
  es: { inicio: '/', inicioAria: 'Tierno Centella Abogados, inicio', principal: 'Principal', contacto: 'Contacto', contactoHref: '/contacto', llamarAria: 'Llamar al', menu: 'Menú', cerrar: 'Cerrar', pasando: '¿Qué te está pasando?', jesusHref: '/jesus-tierno', jesusSub: 'Más de 25 años defendiendo a trabajadores', hablamos: '¿Hablamos de tu caso?', consulta: 'Primera consulta de una hora:', video: 'Madrid, o por videollamada.', llamar: 'Llamar', cita: 'Pedir cita', wa: 'Hola, quiero consultar mi caso.', buscar: 'Buscar en la web', buscarHref: '/buscar', otro: 'EN', otroAria: 'English version', otroLang: 'en' },
  en: { inicio: '/en', inicioAria: 'Tierno Centella Abogados, home', principal: 'Main', contacto: 'Contact', contactoHref: '/en/contact', llamarAria: 'Call', menu: 'Menu', cerrar: 'Close', pasando: 'What is happening to you?', jesusHref: '/en/jesus-tierno', jesusSub: 'Over 25 years defending workers', hablamos: 'Shall we talk about your case?', consulta: 'One-hour first consultation:', video: 'Madrid, or by video call. We speak English.', llamar: 'Call', cita: 'Book a consultation', wa: 'Hello, I would like to ask about my case.', buscar: 'Search the website', buscarHref: '/en/search', otro: 'ES', otroAria: 'Versión en español', otroLang: 'es' },
};

export default function Cabecera() {
  const ruta = usePathname() || '/';
  const idioma = idiomaDe(ruta);
  const t = T[idioma];
  const menu = idioma === 'en' ? MENU_EN : MENU;
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

  const grupoActual = menu.find((g) => g.enlaces.some((e) => e.href !== '/' && ruta.startsWith(e.href)))?.titulo;

  return (
    <header className="cabecera" ref={cabecera}>
      <div className="contenedor cabecera-fila">
        <Link href={t.inicio} className="marca" aria-label={t.inicioAria}>
          <img src="/img/logo-tc.webp" alt="Tierno Centella Abogados" width={192} height={46} />
        </Link>

        <nav className="menu" aria-label={t.principal}>
          {menu.map((g) => (
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
          <Link href={t.contactoHref} aria-current={ruta === t.contactoHref ? 'page' : undefined}>
            {t.contacto}
          </Link>
        </nav>

        <div className="cabecera-acciones">
          <a className="cabecera-idioma" href={rutaEnOtroIdioma(ruta)} hrefLang={t.otroLang} lang={t.otroLang} aria-label={t.otroAria}>
            {t.otro}
          </a>
          <Link className="boton-buscar" href={t.buscarHref} aria-label={t.buscar} title={t.buscar}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
          </Link>
          <a className="boton boton-telefono" href={DESPACHO.telefonoHref} aria-label={`${t.llamarAria} ${DESPACHO.telefono}`}>
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
            {abierto ? t.cerrar : t.menu}
          </button>
        </div>
      </div>

      {abierto && (
        <div id="menu-movil" className="menu-movil">
          <div className="contenedor">
            <p className="mm-intro">{t.pasando}</p>
            <div className="mm-grupos">
              {menu.map((g) => (
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

            <Link href={t.jesusHref} className="mm-jesus">
              <img src="/img/jesus-avatar.webp" alt="" width={56} height={56} loading="lazy" />
              <span>
                <strong>Jesús Tierno Centella</strong>
                <small>{t.jesusSub}</small>
              </span>
            </Link>

            <div className="mm-contacto">
              <strong>{t.hablamos}</strong>
              <p>
                {t.consulta} {DESPACHO.precioCita} €{DESPACHO.iva === ' + IVA' && idioma === 'en' ? ' + VAT' : DESPACHO.iva}. {DESPACHO.direccion}, {t.video}
              </p>
              <div className="mm-botones">
                <a className="boton boton-marcador" href={DESPACHO.telefonoHref}>
                  {t.llamar}
                </a>
                <a className="boton mm-wa" href={enlaceWhatsapp(t.wa)}>
                  WhatsApp
                </a>
                <Link className="boton mm-cita" href={t.contactoHref}>
                  {t.cita}
                </Link>
              </div>
              <div className="mm-extra">
                <Link href={t.buscarHref}>{t.buscar}</Link>
                <a href={rutaEnOtroIdioma(ruta)} hrefLang={t.otroLang} lang={t.otroLang}>
                  {idioma === 'en' ? 'Versión en español' : 'English version'}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
