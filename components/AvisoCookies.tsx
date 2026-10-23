'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

type Eleccion = { analitica: boolean; externos: boolean; fecha: string };
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
  const [visible, setVisible] = useState(false);
  const [detalle, setDetalle] = useState(false);
  const [analitica, setAnalitica] = useState(false);
  const [externos, setExternos] = useState(true);

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
          <strong>Tu privacidad.</strong> Usamos las cookies imprescindibles para que la web funcione. Con tu permiso, también las de
          medición de visitas y las de servicios externos como YouTube o Google Maps, que solo se cargan cuando los abres.{' '}
          <Link href="/cookies">Más información</Link>.
        </p>
        {detalle && (
          <div className="cookies-detalle">
            <label className="casilla">
              <input type="checkbox" checked disabled />
              <span>Necesarias. Recordar tu elección y que la web funcione. Siempre activas.</span>
            </label>
            <label className="casilla">
              <input type="checkbox" checked={analitica} onChange={(e) => setAnalitica(e.target.checked)} />
              <span>Medición. Contar visitas de forma agregada para mejorar la web.</span>
            </label>
            <label className="casilla">
              <input type="checkbox" checked={externos} onChange={(e) => setExternos(e.target.checked)} />
              <span>Servicios externos. Vídeos de YouTube y mapa de Google, al pulsarlos.</span>
            </label>
          </div>
        )}
        <div className="cookies-botones">
          <button type="button" className="boton" onClick={() => guardar({ analitica: true, externos: true })}>
            Aceptar todas
          </button>
          <button type="button" className="boton boton-claro" onClick={() => guardar({ analitica: false, externos: false })}>
            Rechazar
          </button>
          {detalle ? (
            <button type="button" className="boton boton-claro" onClick={() => guardar({ analitica, externos })}>
              Guardar mi elección
            </button>
          ) : (
            <button type="button" className="boton-enlace" onClick={() => setDetalle(true)}>
              Configurar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
