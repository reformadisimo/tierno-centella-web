import type { Metadata } from 'next';
import CrmDemo from '@/components/CrmDemo';

export const metadata: Metadata = {
  title: 'Tu CRM (ejemplo) | Guía para Jesús',
  description: 'Así entrarían y se seguirían las consultas del despacho en un CRM sencillo. Datos inventados.',
  robots: { index: false, follow: false },
};

export default function Crm() {
  return <CrmDemo />;
}
