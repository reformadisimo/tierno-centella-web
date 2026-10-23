'use client';

import { usePathname } from 'next/navigation';

// Botón de "salida rápida" en las páginas de acoso y de Mujer y trabajo, como en las webs de atención a víctimas:
// quien lee esto puede estar en el trabajo, cerca de quien le acosa. Un clic (o pulsar Esc dos veces seguidas)
// le lleva a una página neutra y sustituye esta en el historial.
const RUTAS = ['/acoso-laboral', '/mujer-y-trabajo', '/consulta/acoso-laboral', '/herramientas/test-acoso'];
const DESTINO = 'https://www.google.com/search?q=el+tiempo+en+madrid';

function salir() {
  try {
    window.location.replace(DESTINO);
  } catch {
    window.location.href = DESTINO;
  }
}

let ultimoEsc = 0;
if (typeof window !== 'undefined') {
  window.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape' || !RUTAS.some((r) => window.location.pathname.startsWith(r))) return;
    const ahora = Date.now();
    if (ahora - ultimoEsc < 600) salir();
    ultimoEsc = ahora;
  });
}

export default function SalidaRapida() {
  const ruta = usePathname();
  if (!RUTAS.some((r) => ruta.startsWith(r))) return null;
  return (
    <button type="button" className="salida-rapida" onClick={salir} title="Sale de esta web al instante (o pulsa Esc dos veces)">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
        <path d="M6 6l12 12M18 6L6 18" />
      </svg>
      Salir rápido
    </button>
  );
}
