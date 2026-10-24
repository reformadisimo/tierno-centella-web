import type { Metadata } from 'next';
import PanelDemo from '@/components/PanelDemo';

export const metadata: Metadata = {
  title: 'Tu panel de control (demostración) | Guía para Jesús',
  description: 'Así vería Jesús Tierno sus consultas, anuncios, posiciones en Google, IA y reseñas en un solo panel. Datos de ejemplo.',
  robots: { index: false, follow: false },
};

export default function Panel() {
  return <PanelDemo />;
}
