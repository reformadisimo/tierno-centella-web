'use client';

// El CRM en modo prueba: mismos botones que el real, con personas inventadas guardadas en este navegador.
import { useMemo } from 'react';
import CrmApp from './CrmApp';
import { AlmacenPrueba } from '@/lib/crm';

export default function CrmPrueba() {
  const almacen = useMemo(() => new AlmacenPrueba(), []);
  return <CrmApp almacen={almacen} usuario="Jesús" alRestablecer={() => almacen.restablecer()} />;
}
