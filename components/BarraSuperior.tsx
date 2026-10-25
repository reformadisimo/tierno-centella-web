'use client';

// Barra fina sobre la cabecera, como la de la web actual del despacho: dirección, teléfono y redes.
// Mientras la web sea una demostración, lo dice en una etiqueta pequeña a la derecha.
import { usePathname } from 'next/navigation';
import { DEMO, DESPACHO } from '@/lib/despacho';
import { REDES } from '@/lib/seo';
import { idiomaDe } from '@/lib/idioma';
import Icono, { IconosRedes } from './Iconos';
import Accesibilidad from './Accesibilidad';

export default function BarraSuperior() {
  const ruta = usePathname() || '/';
  if (ruta.startsWith('/crm') || ruta.startsWith('/guia-jesus')) return null;
  const en = idiomaDe(ruta) === 'en';
  return (
    <div className="barra-sup" role="region" aria-label={en ? 'Contact details' : 'Datos de contacto'}>
      <div className="contenedor barra-sup-fila">
        <div className="barra-sup-datos">
          <a href={DESPACHO.mapa} target="_blank" rel="noopener" className="barra-sup-dir">
            <Icono nombre="pin" tam={15} />
            <span>{DESPACHO.direccion}, Madrid</span>
          </a>
          <a href={DESPACHO.telefonoHref} className="barra-sup-tel">
            <Icono nombre="telefono" tam={15} />
            <span>{DESPACHO.telefono}</span>
          </a>
          <a href={`mailto:${DESPACHO.email}`} className="barra-sup-mail">
            <Icono nombre="correo" tam={15} />
            <span>{DESPACHO.email}</span>
          </a>
        </div>
        <div className="barra-sup-dcha">
          <Accesibilidad en={en} />
          <IconosRedes urls={REDES} tono="claro" tam={15} etiqueta={en ? 'Social media' : 'Redes sociales'} />
          {DEMO && <span className="barra-sup-demo">{en ? 'Demo version' : 'Versión de demostración'}</span>}
        </div>
      </div>
    </div>
  );
}
