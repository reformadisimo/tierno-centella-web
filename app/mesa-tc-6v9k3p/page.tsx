import type { Metadata } from 'next';
import MesaTierno from '@/components/MesaTierno';
import { mesaDemo } from '@/lib/mesa-tierno';

// Mesa de control de Tierno Centella (demostración). Privada: dirección difícil de adivinar, sin enlaces desde la web,
// noindex y sin la cabecera ni el pie de la web.
export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Mesa de control (demostración) | Tierno Centella', robots: { index: false, follow: false, nocache: true } };

export default function Page() {
  return (
    <>
      <style>{'body > *:not(main){display:none!important} main#contenido{padding:0!important} main#contenido > *:not(.mx){display:none!important}'}</style>
      <MesaTierno m={mesaDemo()} />
    </>
  );
}
