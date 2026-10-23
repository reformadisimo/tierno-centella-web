'use client';

import dynamic from 'next/dynamic';

// Piezas que no hacen falta para pintar la página: se cargan después, para que lo primero que se vea llegue antes.
const Asistente = dynamic(() => import('./Asistente'), { ssr: false });
const AvisoSalida = dynamic(() => import('./AvisoSalida'), { ssr: false });
const VentanaContextual = dynamic(() => import('./VentanaContextual'), { ssr: false });

export default function Diferidos() {
  return (
    <>
      <Asistente />
      <AvisoSalida />
      <VentanaContextual />
    </>
  );
}
