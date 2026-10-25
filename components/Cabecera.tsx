'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { DESPACHO, enlaceWhatsapp } from '@/lib/despacho';
import { MENU, MENU_EN } from '@/lib/navegacion';
import IconoMenu, { tipoIcono } from './IconoMenu';
import Icono from './Iconos';
import { GUIAS_ES_EN, idiomaDe, rutaEnOtroIdioma } from '@/lib/idioma';

// En inglés, solo se enlazan las guías que ya están traducidas.
const EN_EXISTEN = new Set(Object.values(GUIAS_ES_EN));
const MENU_EN_VISIBLE = MENU_EN.map((g) => ({ ...g, enlaces: g.enlaces.filter((e) => e.href.split('/').length < 4 || !e.href.startsWith('/en/') || EN_EXISTEN.has(e.href)) }));

const T = {
  es: { inicio: '/', inicioAria: 'Tierno Centella Abogados, inicio', principal: 'Principal', contacto: 'Contacto', contactoHref: '/contacto', citaHref: '/reservar', llamarAria: 'Llamar al', menu: 'Menú', cerrar: 'Cerrar', pasando: '¿Qué te está pasando?', jesusHref: '/jesus-tierno', jesusSub: 'Más de 25 años defendiendo a trabajadores', hablamos: '¿Hablamos de tu caso?', consulta: 'Primera consulta de una hora:', video: 'Madrid, o por videollamada.', llamar: 'Llamar', cita: 'Pedir cita', wa: 'Hola, quiero consultar mi caso.', buscar: 'Buscar en la web', buscarHref: '/buscar', otro: 'EN', otroAria: 'EN, English version', otroLang: 'en' },
  en: { inicio: '/en', inicioAria: 'Tierno Centella Abogados, home', principal: 'Main', contacto: 'Contact', contactoHref: '/en/contact', citaHref: '/en/contact', llamarAria: 'Call', menu: 'Menu', cerrar: 'Close', pasando: 'What is happening to you?', jesusHref: '/en/jesus-tierno', jesusSub: 'Over 25 years defending workers', hablamos: 'Shall we talk about your case?', consulta: 'One-hour first consultation:', video: 'Madrid, or by video call. We speak English.', llamar: 'Call', cita: 'Book a consultation', wa: 'Hello, I would like to ask about my case.', buscar: 'Search the website', buscarHref: '/en/search', otro: 'ES', otroAria: 'ES, versión en español', otroLang: 'es' },
};

// Un color por grupo del menú: acoso, despido, incapacidad, mujer y trabajo, herramientas y el despacho.
const MENU_COLOR = [0, 1, 2, 3, 4, 5];
// Icono y color de cada bloque del menú del móvil, según su sección.
function visualGrupo(href: string): { icono: string; c: number } {
  if (/acoso|harassment/.test(href)) return { icono: 'personas', c: 0 };
  if (/despido|dismissal/.test(href)) return { icono: 'caja', c: 1 };
  if (/incapacidad|disability/.test(href)) return { icono: 'sillaRuedas', c: 2 };
  if (/mujer|women/.test(href)) return { icono: 'corazon', c: 3 };
  if (/herramientas|tools/.test(href)) return { icono: 'calculadora', c: 4 };
  if (/mi-caso/.test(href)) return { icono: 'mano', c: 5 };
  return { icono: 'balanza', c: 6 };
}

export default function Cabecera() {
  const ruta = usePathname() || '/';
  const idioma = idiomaDe(ruta);
  const t = T[idioma];
  const menu = idioma === 'en' ? MENU_EN_VISIBLE : MENU;
  const [abierto, setAbierto] = useState(false);
  const cabecera = useRef<HTMLElement>(null);

  useEffect(() => {
    setAbierto(false);
    // Al navegar desde el menú, se quita el foco del enlace pulsado para que su desplegable no se quede abierto.
    const activo = document.activeElement as HTMLElement | null;
    if (activo && activo.closest('.menu')) activo.blur();
  }, [ruta]);
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
          {menu.map((g, i) => (
            <div className="menu-grupo" key={g.titulo}>
              <Link href={g.href} aria-current={ruta.startsWith(g.href) && g.href !== '/' ? 'page' : undefined}>
                {g.titulo}
              </Link>
              <div className={`menu-desplegable md-c${MENU_COLOR[i] ?? 0}${g.enlaces.length > 8 ? ' menu-ancho' : ''}`}>
                <Link href={g.href} className="md-cabeza">
                  <span className="md-cabeza-texto">
                    <strong>{g.titulo}</strong>
                    <small>{g.sub}</small>
                    <em>Ver todo</em>
                  </span>
                </Link>
                <div className="md-enlaces">
                {g.enlaces.map((e) => (
                  <Link key={e.href + e.texto} href={e.href}>
                    <span className="md-icono"><IconoMenu tipo={tipoIcono(e.href, e.texto)} /></span>
                    <span>{e.texto}</span>
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
          <Link className="boton boton-marcador cabecera-cita" href={t.citaHref}>
            <Icono nombre="calendario" tam={17} />
            <span>{t.cita}</span>
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
            <div className="mm-rapido">
              <a href={DESPACHO.telefonoHref} className="mm-r-tel"><Icono nombre="telefono" tam={20} /><span>{t.llamar}</span></a>
              <a href={enlaceWhatsapp(t.wa)} className="mm-r-wa"><Icono nombre="whatsapp" tam={20} /><span>WhatsApp</span></a>
              <Link href={t.citaHref} className="mm-r-cita"><Icono nombre="calendario" tam={20} /><span>{t.cita}</span></Link>
            </div>
            <p className="mm-intro">{t.pasando}</p>
            <div className="mm-grupos">
              {menu.map((g, n) => (
                <details key={g.titulo} className={`mm-grupo mm-c${visualGrupo(g.href).c}`} open={g.titulo === grupoActual} style={{ '--mm-i': n } as React.CSSProperties}>
                  <summary>
                    <span className="mm-icono" aria-hidden="true"><Icono nombre={visualGrupo(g.href).icono} tam={22} /></span>
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
                          <span className="mm-li-icono" aria-hidden="true"><IconoMenu tipo={tipoIcono(e.href, e.texto)} tam={16} /></span>
                          {e.texto}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </details>
              ))}
            </div>

            <div className="mm-donde">
              <span className="mm-donde-icono" aria-hidden="true"><Icono nombre="pin" tam={22} /></span>
              <div>
                <strong>{idioma === 'en' ? 'Contact and how to get here' : 'Contacto y cómo llegar'}</strong>
                <small>{DESPACHO.direccion}, {DESPACHO.ciudad}</small>
                <div className="mm-donde-botones">
                  <a href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent('Tierno Centella Abogados, Calle de Jorge Juan 78, 28009 Madrid')}`} target="_blank" rel="noopener noreferrer">
                    <Icono nombre="mapa" tam={16} /> {idioma === 'en' ? 'Directions' : 'Cómo llegar'}
                  </a>
                  <Link href={t.contactoHref}>
                    <Icono nombre="correo" tam={16} /> {idioma === 'en' ? 'Contact page' : 'Ver contacto'}
                  </Link>
                </div>
              </div>
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
                <Link className="boton mm-cita" href={t.citaHref}>
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
