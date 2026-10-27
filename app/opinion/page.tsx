import type { Metadata } from 'next';
import { OpinionTarjeta } from '@/components/OpinionGoogle';

// /opinion: el enlace propio que reciben los clientes por WhatsApp o correo para dejar su opinión en Google.
// Sin menú ni chat: una sola cosa que hacer. No se indexa (no es una página para Google, es para quien ya es cliente).
export const metadata: Metadata = {
  title: '¿Nos ayuda con su opinión?',
  description: 'Una breve opinión sobre la atención recibida nos ayuda mucho. Le lleva un minuto.',
  robots: { index: false, follow: false },
  alternates: { canonical: '/opinion' },
  openGraph: {
    title: '¿Nos ayuda con su opinión?',
    description: 'Tierno Centella Abogados · Le lleva un minuto.',
    url: '/opinion',
    images: [{ url: '/img/opinion-og.png', width: 1200, height: 630, alt: 'Tierno Centella Abogados: ¿nos ayuda con su opinión?' }],
  },
};

export default function Opinion() {
  return (
    <>
      <style>{'body > *:not(main){display:none!important} main#contenido{padding:0!important;margin:0!important;max-width:none!important}'}</style>
      <div className="op-fondo">
        <OpinionTarjeta />
      </div>
    </>
  );
}
