import type { Metadata } from 'next';
import LecturaPanel from '@/components/LecturaPanel';
import { indiceGuia } from '@/lib/guia-indice';

export const metadata: Metadata = {
  title: 'La lupa: qué ha visto el cliente',
  robots: { index: false, follow: false },
};

export default function Lectura() {
  return <LecturaPanel indice={indiceGuia()} />;
}
