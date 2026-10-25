// Pictogramas sencillos y propios para el glosario en lenguaje fácil. Mismo trazo y colores en todos.
const N = '#0d2c48';
const C = '#d9694d';
const A = '#f2c14e';

const DIBUJOS: Record<string, React.ReactNode> = {
  documento: (<><path d="M16 8h24l10 10v38H16z" fill="#fff" /><path d="M40 8v10h10" /><path d="M23 28h20M23 36h20M23 44h13" stroke={C} /></>),
  euro: (<><circle cx="32" cy="32" r="22" fill={A} /><path d="M41 22a12 12 0 1 0 0 20M18 28h18M18 36h18" /></>),
  calendario: (<><rect x="10" y="14" width="44" height="40" rx="4" fill="#fff" /><path d="M10 26h44M22 8v10M42 8v10" /><path d="M20 35h4M30 35h4M40 35h4M20 44h4M30 44h4" stroke={C} /></>),
  persona: (<><circle cx="32" cy="20" r="9" fill={A} /><path d="M14 54c0-11 8-18 18-18s18 7 18 18z" fill="#fff" /></>),
  dos: (<><circle cx="22" cy="22" r="7" fill={A} /><circle cx="43" cy="22" r="7" fill="#fff" /><path d="M8 52c0-9 6-15 14-15s14 6 14 15zM30 52c0-9 5-15 13-15s13 6 13 15z" fill="#fff" /><path d="M27 31l5 5 7-8" stroke={C} /></>),
  balanza: (<><path d="M32 10v40M20 50h24M14 20h36" /><path d="M14 20l-8 16h16zM50 20l-8 16h16z" fill="#fff" /><circle cx="32" cy="10" r="3" fill={C} /></>),
  mazo: (<><rect x="10" y="12" width="26" height="14" rx="3" transform="rotate(35 23 19)" fill={A} /><path d="M30 30l22 22" strokeWidth="5" /><path d="M10 56h26" stroke={C} /></>),
  bocadillo: (<><path d="M10 12h44v30H30l-10 10v-10h-10z" fill="#fff" /><path d="M20 22h24M20 31h14" stroke={C} /></>),
  puerta: (<><path d="M14 8h26v48H14z" fill="#fff" /><circle cx="34" cy="32" r="2" fill={N} /><path d="M44 32h14M52 25l7 7-7 7" stroke={C} /></>),
  cruz: (<><rect x="10" y="10" width="44" height="44" rx="8" fill="#fff" /><path d="M32 20v24M20 32h24" stroke={C} strokeWidth="6" /></>),
  reloj: (<><circle cx="32" cy="32" r="22" fill="#fff" /><path d="M32 18v15l10 6" stroke={C} /></>),
  lupa: (<><circle cx="27" cy="27" r="16" fill="#fff" /><path d="M39 39l16 16" strokeWidth="5" /><path d="M19 24a9 9 0 0 1 8-6" stroke={C} /></>),
  escudo: (<><path d="M32 6l20 7v16c0 14-9 23-20 28C21 52 12 43 12 29V13z" fill="#fff" /><path d="M23 31l7 7 12-14" stroke={C} strokeWidth="4" /></>),
  libro: (<><path d="M8 14c8-3 16-3 24 2v36c-8-5-16-5-24-2zM56 14c-8-3-16-3-24 2v36c8-5 16-5 24-2z" fill="#fff" /><path d="M15 24c4-1 8-1 12 1M15 33c4-1 8-1 12 1M37 25c4-2 8-2 12-1" stroke={C} /></>),
  recurso: (<><path d="M50 26a19 19 0 0 0-34-6M14 38a19 19 0 0 0 34 6" /><path d="M16 8v13h13M48 56V43H35" stroke={C} /></>),
  alerta: (<><path d="M32 8l26 46H6z" fill={A} /><path d="M32 24v14" stroke={N} strokeWidth="5" /><circle cx="32" cy="46" r="2.5" fill={N} /></>),
  megafono: (<><path d="M10 26h12l24-12v36L22 38H10z" fill="#fff" /><path d="M22 38l4 14h8l-4-14" fill={A} /><path d="M52 24c3 4 3 12 0 16" stroke={C} /></>),
  sol: (<><circle cx="32" cy="32" r="11" fill={A} /><path d="M32 6v8M32 50v8M6 32h8M50 32h8M14 14l6 6M44 44l6 6M14 50l6-6M44 20l6-6" stroke={C} /></>),
  maleta: (<><rect x="8" y="20" width="48" height="32" rx="5" fill="#fff" /><path d="M23 20v-7h18v7M8 34h48" /><rect x="28" y="31" width="8" height="7" fill={C} stroke={N} /></>),
};

export default function Pictograma({ nombre, tam = 64 }: { nombre: string; tam?: number }) {
  return (
    <svg viewBox="0 0 64 64" width={tam} height={tam} fill="none" stroke={N} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      {DIBUJOS[nombre] ?? DIBUJOS.documento}
    </svg>
  );
}
