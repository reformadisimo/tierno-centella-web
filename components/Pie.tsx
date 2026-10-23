'use client';

import Link from 'next/link';
import { DESPACHO, lineaColegiado } from '@/lib/despacho';
import { REDES } from '@/lib/seo';
import { usePathname } from 'next/navigation';
import { idiomaDe } from '@/lib/idioma';

export default function Pie() {
  const en = idiomaDe(usePathname()) === 'en';
  return (
    <footer className="pie">
      <div className="contenedor">
        <div className="pie-rejilla">
          <div>
            <img className="pie-logo" src="/img/logo-tc-blanco.webp" alt={DESPACHO.nombre} width={230} height={55} loading="lazy" />
            <p>
              {en
                ? 'Employment law firm in Madrid. We defend workers in dismissals, workplace harassment and permanent disability, and advise companies. We speak English.'
                : 'Despacho especializado en derecho laboral. Defendemos a trabajadores en despidos, acoso laboral e incapacidad permanente, y asesoramos a empresas.'}
            </p>
          </div>
          <div>
            <h2>{en ? 'Where we are' : 'Dónde estamos'}</h2>
            <ul>
              <li>
                <a href={DESPACHO.mapa}>
                  {DESPACHO.direccion}, {DESPACHO.ciudad}
                </a>
              </li>
              <li>
                <a href={DESPACHO.telefonoHref}>{DESPACHO.telefono}</a>
              </li>
              <li>
                <a href={`mailto:${DESPACHO.email}`}>{DESPACHO.email}</a>
              </li>
            </ul>
          </div>
          <div>
            <h2>{en ? 'Tools (in Spanish)' : 'Herramientas'}</h2>
            <ul>
              <li>
                <Link href="/calculadora-indemnizacion">{en ? 'Compensation calculator' : 'Calculadora de indemnización'}</Link>
              </li>
              <li>
                <Link href="/herramientas/test-acoso">{en ? 'Harassment test' : 'Test de acoso laboral'}</Link>
              </li>
              <li>
                <Link href={en ? '/en/tools' : '/herramientas'}>{en ? 'All tools' : 'Todas las herramientas'}</Link>
              </li>
              <li>
                <Link href={en ? '/en/search' : '/glosario'}>{en ? 'Search the website' : 'Glosario laboral'}</Link>
              </li>
              <li>
                <Link href={en ? '/en/rulings' : '/preguntas-frecuentes'}>{en ? 'Rulings' : 'Preguntas frecuentes'}</Link>
              </li>
              <li>
                <Link href={en ? '/en/contact' : '/contacto'}>{en ? 'Book a consultation' : 'Pedir cita'}</Link>
              </li>
            </ul>
          </div>
        </div>
        <nav className="pie-redes" aria-label={en ? 'Social media' : 'Redes sociales'}>
          <a href={REDES.instagram} rel="me noopener" target="_blank">Instagram</a>
          <a href={REDES.youtube} rel="me noopener" target="_blank">YouTube</a>
          <a href={REDES.facebook} rel="me noopener" target="_blank">Facebook</a>
          <a href={REDES.linkedin} rel="me noopener" target="_blank">{en ? "Jesús Tierno's LinkedIn" : 'LinkedIn de Jesús Tierno'}</a>
          <a href="/redes-y-medios">{en ? 'Social media and press (ES)' : 'Redes y medios'}</a>
          <a href={en ? '/' : '/en'} hrefLang={en ? 'es' : 'en'}>{en ? 'Versión en español' : 'English version'}</a>
        </nav>
        <nav className="pie-redes" aria-label={en ? 'Legal information' : 'Información legal'} style={{ marginTop: 16 }}>
          <Link href="/aviso-legal">{en ? 'Legal notice (ES)' : 'Aviso legal'}</Link>
          <Link href="/privacidad">{en ? 'Privacy (ES)' : 'Privacidad'}</Link>
          <Link href="/cookies">Cookies</Link>
          <button type="button" className="boton-enlace" style={{ color: 'inherit', padding: 0 }} onClick={() => window.dispatchEvent(new Event('abrir-cookies'))}>
            {en ? 'Cookie settings' : 'Configurar cookies'}
          </button>
        </nav>
        <p className="pie-legal">
          {en
            ? 'The information on this website is general guidance and does not replace a lawyer’s advice on your specific case.'
            : 'La información de esta web es orientativa y no sustituye el consejo de un abogado sobre tu caso concreto.'}
        </p>
        {lineaColegiado() && (
          <p className="pie-legal">{en && lineaColegiado().startsWith('Colegio y número') ? 'Bar association and membership number: pending confirmation with the firm' : lineaColegiado()}</p>
        )}
      </div>
    </footer>
  );
}
