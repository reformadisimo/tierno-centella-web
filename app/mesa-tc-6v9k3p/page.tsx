import type { Metadata } from 'next';
import Mesa from '@/components/mesa/Mesa';
import { datosDemo } from '@/lib/mesaDemo';
import { panelDemo, hoyMadrid } from '@/lib/panelDemo';
import '@fontsource/lora/latin-400-italic.css';
import '@fontsource/lora/latin-500-italic.css';
import '@fontsource/lora/latin-500.css';
import '@fontsource/roboto/latin-400.css';
import '@fontsource/roboto/latin-500.css';
import '@fontsource/roboto/latin-700.css';
import './mesa.css';

// Mesa de control de Tierno Centella (demostración): la misma pantalla que la de Reformadísimo, con cifras de ejemplo
// y los datos públicos reales del despacho. Privada: dirección difícil de adivinar, sin enlaces desde la web, noindex
// y sin la cabecera ni el pie de la web.
export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Mesa de control (demostración)', robots: { index: false, follow: false, nocache: true } };


export default function Page() {
  const hoy = hoyMadrid();
  const d = datosDemo(hoy);
  const p = panelDemo(hoy);
  return (
    <>
      <style>{'body > *:not(main){display:none!important} main#contenido{padding:0!important;margin:0!important;max-width:none!important} main#contenido > *:not(#mesa-rd):not(style){display:none!important}'}</style>
      <div id="mesa-rd">
        <div style={{ background: "#1a3d47", color: "#fff", padding: "8px 16px", textAlign: "center", fontSize: 14 }}>
          Demostración de tu mesa de control con <b>cifras de ejemplo</b>. Lo público de tu despacho es real: nota y reseñas de Google, Instagram y tu puesto en Google.
        </div>
        <Mesa datos={{ ...(d as unknown as Parameters<typeof Mesa>[0]['datos']), hoy, clave: 'demo' }} temas={p.modulos} resumenHoy={p.resumen} tareas={p.tareas} relojes={p.relojes} />
      </div>
    </>
  );
}
