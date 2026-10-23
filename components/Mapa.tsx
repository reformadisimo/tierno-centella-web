'use client';

import { useState } from 'react';
import { DESPACHO } from '@/lib/despacho';

// El mapa de Google solo se carga al pulsar: no frena la página ni instala cookies antes de tiempo.
export default function Mapa() {
  const [activo, setActivo] = useState(false);
  const q = encodeURIComponent('Tierno Centella Abogados, Calle de Jorge Juan 78, 28009 Madrid');
  return activo ? (
    <iframe
      className="mapa"
      title="Mapa del despacho en la calle Jorge Juan, Madrid"
      src={`https://www.google.com/maps?q=${q}&output=embed`}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
  ) : (
    <button type="button" className="mapa mapa-boton" onClick={() => setActivo(true)}>
      <span>
        <strong>{DESPACHO.direccion}</strong>
        <br />
        {DESPACHO.ciudad}.
        <br />
        <span className="boton" style={{ marginTop: 12 }}>Ver el mapa</span>
      </span>
    </button>
  );
}
