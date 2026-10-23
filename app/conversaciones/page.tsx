import type { Metadata } from 'next';
import PanelConversaciones from '@/components/PanelConversaciones';

export const metadata: Metadata = {
  title: { absolute: 'Conversaciones del chat | Tierno Centella' },
  robots: { index: false, follow: false },
};

export default function Conversaciones() {
  return (
    <section className="seccion">
      <div className="contenedor">
        <h1>Conversaciones del chat</h1>
        <p className="entradilla">Todo lo que la gente pregunta al asistente de la web, con quién pidió que le llamarais. Solo para el despacho.</p>
        <PanelConversaciones />
      </div>
    </section>
  );
}
