// Iconos sencillos para el menú y las tarjetas de herramientas: se eligen solos por la dirección o el texto del enlace.

const P: Record<string, string> = {
  test: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3M12 17h.01',
  calc: 'M6 2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zM8 6h8v4H8zM8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01',
  mapa: 'M9 11l3 3 8-8M20 12v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h9',
  plazo: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 6v6l4 2',
  calendario: 'M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zM16 2v4M8 2v4M3 10h18',
  carta: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M11 18a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM15 19l-1.8-1.8',
  comprobador: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10zM9 12l2 2 4-4',
  guia: 'M2 4h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 4h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z',
  sentencia: 'M12 3v18M5 7h14M5 7l-3 7a3 3 0 0 0 6 0zM19 7l-3 7a3 3 0 0 0 6 0zM8 21h8',
  video: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM10 8l6 4-6 4z',
  blog: 'M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z',
  persona: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
  empresa: 'M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6M9 10h.01M15 10h.01',
  redes: 'M18 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM6 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM18 22a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM8.6 13.5l6.8 4M15.4 6.5l-6.8 4',
  faq: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2zM9.5 8.5a2.5 2.5 0 0 1 4.8 1c0 1.5-2.3 2-2.3 2M12 14h.01',
  euro: 'M18 7a7 7 0 1 0 0 10M4 10h10M4 14h10',
  lupa: 'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM21 21l-4.3-4.3M8 11h6M11 8v6',
  documento: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M8 13h8M8 17h5',
  flecha: 'M5 12h14M13 6l6 6-6 6',
  pin: 'M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11zM12 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4z',
  salud: 'M12 21s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.6-7 10-7 10zM9 11h2l1-2 2 4 1-2h2',
};

export function tipoIcono(href: string, texto = ''): string {
  const h = href.toLowerCase();
  const t = texto.toLowerCase();
  if (h.includes('mi-caso')) return 'lupa';
  if (h.includes('donde-ir')) return 'pin';
  if (h.includes('acompanar')) return 'salud';
  if (h.includes('tramites')) return 'documento';
  if (h.includes('primera-consulta')) return 'persona';
  if (h.includes('barometro')) return 'comprobador';
  if (h.includes('glosario')) return 'guia';
  if (h.includes('test') || t.startsWith('¿')) return 'test';
  if (h.includes('calculadora')) return 'calc';
  if (h.includes('mapa')) return 'mapa';
  if (h.includes('plazo')) return 'plazo';
  if (h.includes('calendario') || h.includes('permisos')) return 'calendario';
  if (h.includes('carta')) return 'carta';
  if (h.includes('comprobador') || h.includes('autodiagnostico')) return 'comprobador';
  if (h.includes('sentencias')) return 'sentencia';
  if (h.includes('videos')) return 'video';
  if (h.includes('blog')) return 'blog';
  if (h.includes('jesus-tierno')) return 'persona';
  if (h.includes('empresas')) return 'empresa';
  if (h.includes('redes')) return 'redes';
  if (h.includes('preguntas')) return 'faq';
  if (h.includes('brecha') || h.includes('reclamar') || h.includes('grados')) return 'euro';
  return 'guia';
}

export default function IconoMenu({ tipo, tam = 18 }: { tipo: string; tam?: number }) {
  return (
    <svg width={tam} height={tam} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={P[tipo] || P.guia} />
    </svg>
  );
}
