'use client';

import { usePathname } from 'next/navigation';
import { DESPACHO, enlaceWhatsapp } from '@/lib/despacho';

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
];

export default function BarraMovil() {
  const ruta = usePathname();
  // En las landings de anuncios no sacamos a nadie de la página: el tercer botón lleva al formulario.
  const enLanding = ruta.startsWith('/consulta/');
  const tema = SEGUN_TEMA.find((t) => ruta.startsWith(t.ruta));
  const mensaje = tema ? `Hola, escribo desde la web por un tema de ${tema.tema}.` : 'Hola, quiero consultar un caso laboral.';
  return (
    <nav className="barra-movil" aria-label="Contacto rápido">
      <a href={DESPACHO.telefonoHref}>Llamar</a>
      <a href={enlaceWhatsapp(mensaje)}>WhatsApp</a>
      {enLanding ? (
        <a href="#lf-arriba">Te llamamos</a>
      ) : (
        <a href={tema?.href || '/calculadora-indemnizacion'}>{tema?.boton || 'Calcular'}</a>
      )}
      <button type="button" onClick={() => window.dispatchEvent(new Event('abrir-asistente'))} aria-label="Abrir el chat">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ verticalAlign: '-3px', marginRight: 5 }}>
          <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20.5l1.4-5A8 8 0 1 1 21 12z" />
        </svg>
        Chat
      </button>
    </nav>
  );
}
