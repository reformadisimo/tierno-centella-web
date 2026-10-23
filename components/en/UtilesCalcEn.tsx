'use client';

import { BotonImprimir } from '../Utiles';

// Utilidades en inglés para las calculadoras de /en/tools. La lógica de cálculo sigue en lib/calculos.ts.

// Importe sin decimales con formato inglés: €28,000.
export const eurosEn = (n: number) =>
  new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n);

// Importe con céntimos con formato inglés: €1,234.56.
export const eurosCentimosEn = (n: number) =>
  new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'EUR', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);

// Número con formato inglés (decimales con punto, miles con coma).
export const numeroEn = (n: number) => n.toLocaleString('en-GB');

// Fecha larga en inglés: Monday, 2 March 2026.
export const fechaLargaEn = (iso: string) =>
  new Intl.DateTimeFormat('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(
    new Date(`${iso}T00:00:00Z`),
  );

// Fecha corta dd/mm/aaaa.
export const fechaCortaEn = (iso: string) => iso.split('-').reverse().join('/');

// Botón para guardar o imprimir el resultado, con el texto en inglés.
export function BotonImprimirEn({ texto }: { texto?: string }) {
  return <BotonImprimir texto={texto ?? 'Save or print my result'} />;
}

// Aviso si el salario parece mensual (o con un cero de más) en una casilla que pide el anual.
export function avisoSalarioAnualEn(n: number) {
  if (!(n > 0)) return '';
  if (n < 6000)
    return `Did you enter your monthly salary? This box needs your annual salary, including the extra payments: for example, ${Math.round(n).toLocaleString('en-GB')} × 14 = ${eurosEn(Math.round(n * 14))}.`;
  if (n > 300000) return 'Check the salary: it looks very high. If you used a full stop for decimals, write it without them (for example, 28000).';
  return '';
}
