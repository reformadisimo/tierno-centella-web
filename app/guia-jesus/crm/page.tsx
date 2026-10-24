import type { Metadata } from 'next';
import CrmPrueba from '@/components/crm/CrmPrueba';

export const metadata: Metadata = {
  title: 'Tu CRM (modo prueba) | Guía para Jesús',
  description: 'El CRM del despacho con datos inventados: da de alta, mueve y apunta para probarlo.',
  robots: { index: false, follow: false },
};

export default function Crm() {
  return <CrmPrueba />;
}
