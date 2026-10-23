'use client';

import { usePathname } from 'next/navigation';
import { DESPACHO, enlaceWhatsapp } from '@/lib/despacho';

export default function BarraMovil() {
  // En las landings de anuncios no sacamos a nadie de la página: el tercer botón lleva al formulario.
  const enLanding = usePathname().startsWith('/consulta/');
  return (
    <nav className="barra-movil" aria-label="Contacto rápido">
      <a href={DESPACHO.telefonoHref}>Llamar</a>
      <a href={enlaceWhatsapp('Hola, quiero consultar un caso laboral.')}>WhatsApp</a>
      {enLanding ? <a href="#lf-arriba">Te llamamos</a> : <a href="/calculadora-indemnizacion">Calcular</a>}
      <button type="button" onClick={() => window.dispatchEvent(new Event('abrir-asistente'))} aria-label="Abrir el chat">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ verticalAlign: '-3px', marginRight: 5 }}>
          <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20.5l1.4-5A8 8 0 1 1 21 12z" />
        </svg>
        Chat
      </button>
    </nav>
  );
}
