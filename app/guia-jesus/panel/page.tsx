import type { Metadata } from 'next';
import PanelDemo from '@/components/PanelDemo';
import Lupa from '@/components/Lupa';

export const metadata: Metadata = {
  title: 'Tu panel de control (demostración) | Guía para Jesús',
  description: 'Así vería Jesús Tierno sus consultas, anuncios, posiciones en Google, IA y reseñas en un solo panel. Datos de ejemplo.',
  robots: { index: false, follow: false },
};

export default function Panel() {
  return (
    <>
      <Lupa pantalla="panel" selector="section[id], [data-lupa]" />
      <PanelDemo />
    </>
  );
}
