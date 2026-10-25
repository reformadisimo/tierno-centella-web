'use client';

import { useEffect, useState } from 'react';
import { DESPACHO } from '@/lib/despacho';
import { usePathname } from 'next/navigation';
import { idiomaDe } from '@/lib/idioma';

// El mapa de Google solo se carga al pulsar: no frena la página ni instala cookies antes de tiempo.
export default function Mapa() {
  const en = idiomaDe(usePathname()) === 'en';
  const [activo, setActivo] = useState(false);
  const [video, setVideo] = useState(false);
  useEffect(() => {
    const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
    if (nav.connection?.saveData || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = window.setTimeout(() => setVideo(true), 1500);
    return () => window.clearTimeout(t);
  }, []);
  const q = encodeURIComponent('Tierno Centella Abogados, Calle de Jorge Juan 78, 28009 Madrid');
  return activo ? (
    <iframe
      className="mapa"
      title={en ? 'Map of the office on Jorge Juan street, Madrid' : 'Mapa del despacho en la calle Jorge Juan, Madrid'}
      src={`https://www.google.com/maps?q=${q}&output=embed`}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
  ) : (
    <button type="button" className="mapa mapa-boton" onClick={() => setActivo(true)}>
      {video && (
        <video className="mapa-video" autoPlay muted loop playsInline aria-hidden="true">
          <source src="/video/paginas/fachada.webm" type="video/webm" />
          <source src="/video/paginas/fachada.mp4" type="video/mp4" />
        </video>
      )}
      <span className="mapa-velo" aria-hidden="true" />
      <span>
        <strong>{DESPACHO.direccion}</strong>
        <br />
        {DESPACHO.ciudad}.
        <br />
        <span className="boton" style={{ marginTop: 12 }}>{en ? 'See the map' : 'Ver el mapa'}</span>
      </span>
    </button>
  );
}
