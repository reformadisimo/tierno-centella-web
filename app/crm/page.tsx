import type { Metadata } from 'next';
import CrmReal from '@/components/crm/CrmReal';

export const metadata: Metadata = {
  title: 'CRM | Tierno Centella Abogados',
  robots: { index: false, follow: false },
};

export default function Crm() {
  return <CrmReal />;
}
