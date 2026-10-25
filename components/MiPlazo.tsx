'use client';

// Franja con el plazo que la persona pidió recordar en la herramienta de plazos. Se guarda solo en su navegador.
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { diasHabilesRestantes } from '@/lib/calculos';
import { hoyMadrid } from '@/lib/hoy';
import { DESPACHO, fechaLarga } from '@/lib/despacho';

export const CLAVE_PLAZO = 'tc-mi-plazo';
type Guardado = { nombre: string; ultimo: string; agostoHabil: boolean; madrid?: boolean };

export default function MiPlazo() {
  const ruta = usePathname();
  const [p, setP] = useState<Guardado | null>(null);
  useEffect(() => {
    const leer = () => {
      try {
        const g = JSON.parse(localStorage.getItem(CLAVE_PLAZO) || 'null') as Guardado | null;
        setP(g && g.ultimo >= hoyMadrid() ? g : null);
      } catch {
        setP(null);
      }
    };
    leer();
    window.addEventListener('tc-plazo', leer);
    return () => window.removeEventListener('tc-plazo', leer);
  }, []);
  if (!p || ruta.startsWith('/guia-jesus') || ruta.startsWith('/en') || ruta === '/crm') return null;
  const quedan = diasHabilesRestantes(hoyMadrid(), p.ultimo, p.agostoHabil, Boolean(p.madrid));
  if (quedan < 0) return null;
  const urgente = quedan <= 5;
  return (
    <aside className={`mi-plazo${urgente ? ' urgente' : ''}`} aria-label="Tu plazo para reclamar">
      <p>
        <b>Tu plazo ({p.nombre.toLowerCase()}):</b> {quedan === 1 ? 'te queda 1 día hábil' : `te quedan ${quedan} días hábiles`}, hasta el {fechaLarga(p.ultimo)}.
      </p>
      <span className="mi-plazo-acciones">
        <a href={DESPACHO.telefonoHref}>Llamar</a>
        <button
          type="button"
          onClick={() => {
            try {
              localStorage.removeItem(CLAVE_PLAZO);
            } catch {}
            setP(null);
          }}
        >
          Quitar
        </button>
      </span>
    </aside>
  );
}
