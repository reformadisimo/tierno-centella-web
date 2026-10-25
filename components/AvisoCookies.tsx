'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { idiomaDe } from '@/lib/idioma';

type Eleccion = { analitica: boolean; externos: boolean; publicidad?: boolean; fecha: string };
const CLAVE = 'tc-cookies';

export function leerEleccion(): Eleccion | null {
  try {
    const v = localStorage.getItem(CLAVE);
    return v ? (JSON.parse(v) as Eleccion) : null;
  } catch {
    return null;
  }
}

export default function AvisoCookies() {
  const en = idiomaDe(usePathname()) === 'en';
  const [visible, setVisible] = useState(false);
  const [detalle, setDetalle] = useState(false);
  const [analitica, setAnalitica] = useState(false);
  const [externos, setExternos] = useState(true);
  const [publicidad, setPublicidad] = useState(false);

  useEffect(() => {
    if (!leerEleccion()) setVisible(true);
    const abrir = () => {
      setDetalle(true);
      setVisible(true);
    };
    window.addEventListener('abrir-cookies', abrir);
    return () => window.removeEventListener('abrir-cookies', abrir);
  }, []);

  function guardar(e: Omit<Eleccion, 'fecha'>) {
    try {
      localStorage.setItem(CLAVE, JSON.stringify({ ...e, fecha: new Date().toISOString() }));
    } catch {}
    window.dispatchEvent(new Event('cookies-guardadas'));
    setVisible(false);
  }

  if (!visible) return null;
  return (
    <div className="cookies" role="dialog" aria-label="Cookies" aria-live="polite">
      <div className="cookies-caja">
        <p>
          {en ? (
            <>
              <strong>Your privacy.</strong> We use the cookies needed for the website to work. With your permission, also visit measurement cookies and
              those of external services such as YouTube or Google Maps, which only load when you open them.{' '}
              <Link href="/cookies">More about cookies (in Spanish)</Link>.
            </>
          ) : (
            <>
              <strong>Tu privacidad.</strong> Solo usamos las cookies necesarias; con tu permiso, también las que miden visitas y los servicios externos.{' '}
              <Link href="/cookies">Más información</Link>.
            </>
          )}
        </p>
        {detalle && (
          <div className="cookies-detalle">
            <label className="casilla">
              <input type="checkbox" checked disabled />
              <span>{en ? 'Necessary. Remember your choice and keep the website working. Always on.' : 'Necesarias. Recordar tu elección y que la web funcione. Siempre activas.'}</span>
            </label>
            <label className="casilla">
              <input type="checkbox" checked={analitica} onChange={(e) => setAnalitica(e.target.checked)} />
              <span>{en ? 'Measurement. Count visits in aggregate to improve the website.' : 'Medición. Contar visitas de forma agregada para mejorar la web.'}</span>
            </label>
            <label className="casilla">
              <input type="checkbox" checked={externos} onChange={(e) => setExternos(e.target.checked)} />
              <span>{en ? 'External services. YouTube videos and Google Maps, when you click them.' : 'Servicios externos. Vídeos de YouTube y mapa de Google, al pulsarlos.'}</span>
            </label>
            <label className="casilla">
              <input type="checkbox" checked={publicidad} onChange={(e) => setPublicidad(e.target.checked)} />
              <span>{en ? 'Advertising. Know whether you came from a Google ad and whether you contacted us, so we do not spend on ads that help nobody. We do not show you personalised ads.' : 'Publicidad. Saber si llegaste desde un anuncio de Google y si nos contactaste, para no gastar en anuncios que no ayudan a nadie. No te mostramos anuncios personalizados.'}</span>
            </label>
          </div>
        )}
        <div className="cookies-botones">
          <button type="button" className="boton" onClick={() => guardar({ analitica: true, externos: true, publicidad: true })}>
            {en ? 'Accept all' : 'Aceptar todas'}
          </button>
          <button type="button" className="boton boton-claro" onClick={() => guardar({ analitica: false, externos: false, publicidad: false })}>
            {en ? 'Reject' : 'Rechazar'}
          </button>
          {detalle ? (
            <button type="button" className="boton boton-claro" onClick={() => guardar({ analitica, externos, publicidad })}>
              {en ? 'Save my choice' : 'Guardar mi elección'}
            </button>
          ) : (
            <button type="button" className="boton-enlace" onClick={() => setDetalle(true)}>
              {en ? 'Settings' : 'Configurar'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
