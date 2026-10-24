'use client';

import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';

// Piezas que no hacen falta para pintar la página: se cargan después, para que lo primero que se vea llegue antes.
const Asistente = dynamic(() => import('./Asistente'), { ssr: false });
const AvisoSalida = dynamic(() => import('./AvisoSalida'), { ssr: false });
const VentanaContextual = dynamic(() => import('./VentanaContextual'), { ssr: false });

export default function Diferidos() {
  const ruta = usePathname() || '/';
  // En el CRM no hay chat ni avisos: es una herramienta de trabajo.
  if (ruta.startsWith('/crm') || ruta.startsWith('/guia-jesus/crm')) return null;
  return (
    <>
      <Asistente />
      <AvisoSalida />
      <VentanaContextual />
    </>
  );
}
