// Piezas del kit "dar vida" para usar desde React (ver lib/vida.ts).
import { ICONO_VIDA, iconoPorTexto } from '@/lib/vida';

export function ChipVivo({ texto, icono, i = 0 }: { texto?: string; icono?: string; i?: number }) {
  const ic = icono ?? iconoPorTexto(texto ?? '', i);
  return (
    <span className={`chip-vivo cv-${i % 6}`} aria-hidden="true">
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
        <path d={ICONO_VIDA[ic] ?? ICONO_VIDA.estrella} />
      </svg>
    </span>
  );
}

/** Una frase serena dentro de un bocadillo con el monograma del despacho. Nunca promesas. */
export function Bocadillo({ children, claro = false }: { children: React.ReactNode; claro?: boolean }) {
  return (
    <div className={`bocadillo${claro ? ' bocadillo-claro' : ''}`}>
      <img src="/apple-icon.png" alt="" width={38} height={38} />
      <p>{children}</p>
    </div>
  );
}
