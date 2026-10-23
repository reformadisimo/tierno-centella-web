'use client';

import { BotonImprimir } from '../Utiles';

// English version of the print button used by the tools.
export function BotonImprimirEn({ texto }: { texto?: string }) {
  return <BotonImprimir texto={texto ?? 'Save or print my result'} />;
}
