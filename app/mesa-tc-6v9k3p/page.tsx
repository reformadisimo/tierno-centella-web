import type { Metadata } from 'next';
import Mesa from '@/components/mesa/Mesa';
import ChivatoMesa from '@/components/mesa/ChivatoMesa';
import { datosDemo } from '@/lib/mesaDemo';
import { panelDemo, hoyMadrid } from '@/lib/panelDemo';
import { serieVisitas } from '@/lib/visitasReales';
import { VERSION } from '@/lib/version';
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


export default async function Page() {
  const hoy = hoyMadrid();
  const d = datosDemo(hoy);
  // 31-oct-2026: las visitas (personas, visitas, páginas y tiempo) son REALES en cuanto hay base de datos (contador propio
  // sin cookies, como en Reformadísimo y Casiopea). Lo demás sigue de ejemplo hasta tener los accesos del despacho.
  const real = await serieVisitas();
  let extra: { inicioVisitas?: string; presetInicial?: 'hoy' | '28' } = {};
  if (real) {
    const web = d.web as Record<string, Record<string, unknown>>;
    for (const dia of Object.keys(web)) Object.assign(web[dia], real.dias[dia] ?? { vistas: 0, entradas: 0, personas: 0, segundos: 0 });
    extra = { inicioVisitas: real.inicio, presetInicial: Object.keys(real.dias).some((x) => x < hoy) ? '28' : 'hoy' };
  }
  const p = panelDemo(hoy);
  return (
    <>
      <style>{'body > *:not(main){display:none!important} main#contenido{padding:0!important;margin:0!important;max-width:none!important} main#contenido > *:not(#mesa-rd):not(style){display:none!important}'}</style>
      <div id="mesa-rd">
        <ChivatoMesa />
        <div style={{ background: "#1a3d47", color: "#fff", padding: "8px 16px", textAlign: "center", fontSize: 14 }}>
          Demostración de tu mesa de control con <b>cifras de ejemplo</b>. Lo público del despacho es real.{real ? <> Las visitas a la web, también.</> : null} <span style={{ opacity: 0.6, fontSize: 12 }}>{VERSION}</span>
        </div>
        <Mesa datos={{ ...(d as unknown as Parameters<typeof Mesa>[0]['datos']), hoy, clave: 'demo', ...extra }} temas={p.modulos} resumenHoy={p.resumen} tareas={p.tareas} relojes={p.relojes} base={p.base} />
      </div>
    </>
  );
}
