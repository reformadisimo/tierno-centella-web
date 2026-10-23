import type { Metadata } from 'next';
import { meta } from '@/lib/seo';
import { DESPACHO } from '@/lib/despacho';

export const metadata: Metadata = { ...meta({ titulo: 'Política de cookies', descripcion: 'Qué cookies usa la web de Tierno Centella Abogados y cómo cambiar tu elección.', ruta: '/cookies' }), robots: { index: false } };

export default function Pagina() {
  return (
    <>
      <header className="cabeza-pagina">
        <div className="contenedor">
          <h1>Política de cookies</h1>
        </div>
      </header>
      <section className="seccion">
        <div className="contenedor prosa">
          <div className="recuadro">
            <p>Borrador para la demostración. El texto definitivo lo revisará el despacho con sus datos registrales.</p>
          </div>
          <h2>Las que usamos</h2>
          <ul>
            <li>Necesarias: guardan tu elección sobre las cookies. Se guardan en tu navegador.</li>
            <li>
              Medición sin cookies: Vercel Web Analytics y Speed Insights cuentan visitas y miden la velocidad de forma agregada, sin cookies ni datos
              que te identifiquen.
            </li>
            <li>
              Medición con cookies, solo si las aceptas: Microsoft Clarity, que crea mapas de calor y grabaciones anónimas de cómo se usa la web (dónde se
              pulsa, hasta dónde se lee) para mejorarla. No graba lo que escribes en los formularios.
            </li>
            <li>Instagram: carga sus cookies solo si pulsas para ver uno de los vídeos.</li>
            <li>Servicios externos: YouTube y Google Maps instalan las suyas cuando pulsas para ver un vídeo o el mapa.</li>
          </ul>
          <h2>Cambiar tu elección</h2>
          <p>Puedes cambiarla cuando quieras desde el enlace “Configurar cookies” del pie de página.</p>
        </div>
      </section>
    </>
  );
}
