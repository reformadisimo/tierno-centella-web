import type { Metadata } from 'next';
import MercadoGuia from '@/components/MercadoGuia';

// Borrador para que Ig revise la tabla antes de meterla en la guía. Sin enlaces desde ningún sitio.
export const metadata: Metadata = {
  title: 'Borrador: lo que costaría por separado',
  robots: { index: false, follow: false },
};

export default function Borrador() {
  return (
    <div className="guia-borrador" style={{ maxWidth: 900, margin: '0 auto', padding: '20px 16px 60px' }}>
      <p style={{ background: '#fff8ec', border: '1px solid #f1dfb8', borderRadius: 12, padding: '10px 14px' }}>
        <b>Borrador para revisar.</b> Esta tabla todavía no está en la guía de Jesús.
      </p>
      <MercadoGuia />
    </div>
  );
}
