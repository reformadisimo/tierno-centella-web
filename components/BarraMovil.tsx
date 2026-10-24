'use client';

import { usePathname } from 'next/navigation';
import { DESPACHO, enlaceWhatsapp } from '@/lib/despacho';
import { idiomaDe } from '@/lib/idioma';

// El WhatsApp llega con el tema ya escrito y el tercer botón lleva a la herramienta de esa sección:
// quien lee sobre acoso no necesita la calculadora de despido.
const SEGUN_TEMA: { ruta: string; tema: string; boton: string; href: string }[] = [
  { ruta: '/acoso-laboral', tema: 'acoso laboral', boton: 'Test', href: '/herramientas/test-acoso' },
  { ruta: '/consulta/acoso-laboral', tema: 'acoso laboral', boton: '', href: '' },
  { ruta: '/incapacidad-permanente', tema: 'incapacidad permanente', boton: 'Comprobar', href: '/herramientas/comprobador-incapacidad' },
  { ruta: '/consulta/incapacidad-permanente', tema: 'incapacidad permanente', boton: '', href: '' },
  { ruta: '/mujer-y-trabajo', tema: 'embarazo o conciliación', boton: 'Permisos', href: '/herramientas/calendario-permisos' },
  { ruta: '/despido', tema: 'despido', boton: 'Calcular', href: '/calculadora-indemnizacion' },
  { ruta: '/consulta/despido', tema: 'despido', boton: '', href: '' },
  { ruta: '/en/workplace-harassment', tema: 'workplace harassment', boton: 'Test', href: '/en/tools/harassment-test' },
  { ruta: '/en/permanent-disability', tema: 'permanent disability', boton: 'Check', href: '/en/tools/permanent-disability-checker' },
  { ruta: '/en/women-at-work', tema: 'pregnancy or work-life balance', boton: 'Leave', href: '/en/tools/birth-leave-calendar' },
  { ruta: '/en/dismissal', tema: 'dismissal', boton: 'Calculate', href: '/en/tools/compensation-calculator' },
];

export default function BarraMovil() {
  const ruta = usePathname();
  if (ruta?.startsWith('/crm') || ruta?.startsWith('/guia-jesus/crm')) return null;
  // En las landings de anuncios no sacamos a nadie de la página: el tercer botón lleva al formulario.
  const enLanding = ruta.startsWith('/consulta/');
  const tema = SEGUN_TEMA.find((t) => ruta.startsWith(t.ruta));
  const en = idiomaDe(ruta) === 'en';
  const mensaje = en
    ? tema
      ? `Hello, I am writing from the website about ${tema.tema}.`
      : 'Hello, I would like to ask about an employment matter.'
    : tema
      ? `Hola, escribo desde la web por un tema de ${tema.tema}.`
      : 'Hola, quiero consultar un caso laboral.';
  return (
    <nav className="barra-movil" aria-label={en ? 'Quick contact' : 'Contacto rápido'}>
      <a href={DESPACHO.telefonoHref}>{en ? 'Call' : 'Llamar'}</a>
      <a href={enlaceWhatsapp(mensaje)}>WhatsApp</a>
      {enLanding ? (
        <a href="#lf-arriba">Te llamamos</a>
      ) : (
        <a href={tema?.href || (en ? '/en/tools' : '/calculadora-indemnizacion')}>{tema?.boton || (en ? 'Tools' : 'Calcular')}</a>
      )}
      <button type="button" onClick={() => window.dispatchEvent(new Event('abrir-asistente'))} aria-label={en ? 'Open the chat' : 'Abrir el chat'}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ verticalAlign: '-3px', marginRight: 5 }}>
          <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20.5l1.4-5A8 8 0 1 1 21 12z" />
        </svg>
        Chat
      </button>
    </nav>
  );
}
