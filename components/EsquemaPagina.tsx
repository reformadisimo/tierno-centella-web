import JsonLd from './JsonLd';
import { esquemaPaginaDe } from '@/lib/esquemas-paginas';

// Datos estructurados de una página principal (tipo de página, migas, servicio y listado).
export default function EsquemaPagina({ ruta }: { ruta: string }) {
  const d = esquemaPaginaDe(ruta);
  return d ? <JsonLd datos={d} /> : null;
}
