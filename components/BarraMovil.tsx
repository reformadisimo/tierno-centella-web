'use client';

import { usePathname } from 'next/navigation';
import { DESPACHO, enlaceWhatsapp } from '@/lib/despacho';
import { idiomaDe } from '@/lib/idioma';
import Icono from './Iconos';

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
      <a href={DESPACHO.telefonoHref}>
        <Icono nombre="telefono" tam={20} />
        <span>{en ? 'Call' : 'Llamar'}</span>
      </a>
      <a href={enlaceWhatsapp(mensaje)} className="bm-wa">
        <Icono nombre="whatsapp" tam={21} />
        <span>WhatsApp</span>
      </a>
      {enLanding ? (
        <a href="#lf-arriba">
          <Icono nombre="campana" tam={20} />
          <span>Te llamamos</span>
        </a>
      ) : (
        <a href={tema?.href || (en ? '/en/tools' : '/calculadora-indemnizacion')}>
          <Icono nombre={tema?.boton === 'Test' ? 'checkCirculo' : tema?.boton === 'Permisos' || tema?.boton === 'Leave' ? 'calendario' : tema?.boton === 'Comprobar' || tema?.boton === 'Check' ? 'escudo' : 'calculadora'} tam={20} />
          <span>{tema?.boton || (en ? 'Tools' : 'Calcular')}</span>
        </a>
      )}
      <button type="button" onClick={() => window.dispatchEvent(new Event('abrir-asistente'))} aria-label={en ? 'Open the chat' : 'Abrir el chat'}>
        <Icono nombre="chat" tam={20} />
        <span>Chat</span>
      </button>
    </nav>
  );
}
