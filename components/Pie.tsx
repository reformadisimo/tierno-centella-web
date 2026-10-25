'use client';

import Link from 'next/link';
import { DESPACHO, lineaColegiado } from '@/lib/despacho';
import { REDES } from '@/lib/seo';
import { usePathname } from 'next/navigation';
import { idiomaDe } from '@/lib/idioma';
import Icono, { IconosRedes } from './Iconos';

export default function Pie() {
  const en = idiomaDe(usePathname()) === 'en';
  return (
    <footer className="pie">
      <div className="contenedor">
        <div className="pie-rejilla pie-cuatro">
          <div className="pie-marca">
            <img className="pie-logo" src="/img/logo-tc-blanco.webp" alt={DESPACHO.nombre} width={230} height={55} loading="lazy" />
            <p>
              {en
                ? 'Employment law firm in Madrid. We defend workers in dismissals, workplace harassment and permanent disability, and advise companies. We speak English.'
                : 'Despacho especializado en derecho laboral. Defendemos a trabajadores en despidos, acoso laboral e incapacidad permanente, y asesoramos a empresas.'}
            </p>
            <IconosRedes urls={REDES} tono="claro" tam={18} etiqueta={en ? 'Social media' : 'Redes sociales'} />
          </div>
          <div>
            <h2><Icono nombre="pin" tam={16} /> {en ? 'Find us' : 'Encuéntranos'}</h2>
            <ul className="pie-lista-iconos">
              <li>
                <Icono nombre="pin" tam={15} />
                <a href={DESPACHO.mapa} target="_blank" rel="noopener">
                  {DESPACHO.direccion}, {DESPACHO.ciudad}
                </a>
              </li>
              <li>
                <Icono nombre="telefono" tam={15} />
                <a href={DESPACHO.telefonoHref}>{DESPACHO.telefono}</a>
              </li>
              <li>
                <Icono nombre="whatsapp" tam={15} />
                <a href={`https://wa.me/${DESPACHO.whatsappNumero}`} target="_blank" rel="noopener">{DESPACHO.whatsapp}</a>
              </li>
              <li>
                <Icono nombre="correo" tam={15} />
                <a href={`mailto:${DESPACHO.email}`}>{DESPACHO.email}</a>
              </li>
              <li>
                <Icono nombre="edificio" tam={15} />
                <span>{en ? 'Salamanca district, Madrid. In person or by video call.' : 'Barrio de Salamanca, Madrid. Presencial o por videollamada.'}</span>
              </li>
            </ul>
          </div>
          <div>
            <h2><Icono nombre="calendario" tam={16} /> {en ? 'Book your consultation' : 'Pide tu cita'}</h2>
            <p className="pie-cita-texto">
              {en
                ? 'A one-hour consultation with your documents, in person or by video call. We tell you beforehand whether your case needs one.'
                : 'Consulta de una hora con tus documentos, presencial o por videollamada. Antes te decimos si tu caso la necesita.'}
            </p>
            <ul className="pie-precios">
              <li><span>{en ? 'With a lawyer of the firm' : 'Con un abogado del despacho'}</span><b>{DESPACHO.precioCita} €{DESPACHO.iva}</b></li>
              <li><span>{en ? 'With Jesús Tierno' : 'Con Jesús Tierno'}</span><b>{DESPACHO.precioCitaJesus} €{DESPACHO.iva}</b></li>
            </ul>
            <Link className="boton boton-marcador pie-boton" href={en ? '/en/contact' : '/reservar'}>
              <Icono nombre="calendario" tam={17} /> {en ? 'Book a consultation' : 'Pedir cita'}
            </Link>
          </div>
          <div>
            <h2><Icono nombre="personas" tam={16} /> {en ? 'Get to know us' : 'Conócenos'}</h2>
            <ul className="pie-lista-iconos">
              <li><Icono nombre="flecha" tam={14} /><Link href={en ? '/en/jesus-tierno' : '/jesus-tierno'}>{en ? 'Jesús Tierno' : 'Jesús Tierno'}</Link></li>
              <li><Icono nombre="flecha" tam={14} /><Link href={en ? '/en/rulings' : '/sentencias'}>{en ? 'Rulings' : 'Sentencias ganadas'}</Link></li>
              <li><Icono nombre="flecha" tam={14} /><Link href={en ? '/en/tools' : '/herramientas'}>{en ? 'Free tools' : 'Herramientas gratuitas'}</Link></li>
              <li><Icono nombre="flecha" tam={14} /><Link href={en ? '/redes-y-medios' : '/redes-y-medios'}>{en ? 'Videos and press (ES)' : 'Vídeos, radio y medios'}</Link></li>
              <li><Icono nombre="flecha" tam={14} /><Link href={en ? '/blog' : '/blog'}>{en ? 'Blog (ES)' : 'Blog'}</Link></li>
              <li><Icono nombre="flecha" tam={14} /><Link href={en ? '/en/search' : '/preguntas-frecuentes'}>{en ? 'Search the website' : 'Preguntas frecuentes'}</Link></li>
              <li><Icono nombre="flecha" tam={14} /><Link href={en ? '/empresas' : '/empresas'}>{en ? 'For companies (ES)' : 'Empresas y colegios'}</Link></li>
            </ul>
          </div>
        </div>
        <nav className="pie-redes pie-redes-texto" aria-label={en ? 'Other versions' : 'Otras versiones'}>
          <a href={en ? '/' : '/en'} hrefLang={en ? 'es' : 'en'}>{en ? 'Versión en español' : 'English version'}</a>
          <Link href="/glosario">{en ? 'Glossary (ES)' : 'Glosario laboral'}</Link>
          {!en && <Link href="/recursos">Recursos útiles</Link>}
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
