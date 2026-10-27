import type { Metadata } from 'next';
import MapaCalorDemo from '@/components/MapaCalorDemo';

export const metadata: Metadata = {
  title: 'La lupa de tu web (demostración) | Guía para Jesús',
  description: 'Mapa de calor de la web de Tierno Centella: dónde toca la gente, hasta dónde baja y dónde se va. Datos de ejemplo.',
  robots: { index: false, follow: false },
};

export default function MapaCalor() {
  return <MapaCalorDemo />;
}
