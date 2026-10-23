'use client';

import { useState } from 'react';
import type { Reel } from '@/lib/redes';

// Fachada: no se carga nada de Instagram (ni cookies de Meta) hasta que la persona pulsa.
export default function ReelInstagram({ reel }: { reel: Reel }) {
  const [abierto, setAbierto] = useState(false);
  const ruta = reel.tipo === 'reel' ? 'reel' : 'p';
  if (abierto) {
    return (
      <div className="reel reel-abierto">
        <iframe
          src={`https://www.instagram.com/${ruta}/${reel.id}/embed/`}
          title={reel.texto}
          loading="lazy"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }
  return (
    <button type="button" className="reel" onClick={() => setAbierto(true)}>
      <span className="reel-tema">{reel.tema}</span>
      <span className="reel-texto">{reel.texto}</span>
      <span className="reel-pie">
        <span className="reel-play" aria-hidden="true" />
        <span>
          {reel.quien}
          <small>Vídeo de Instagram. Se abre aquí al pulsar.</small>
        </span>
      </span>
    </button>
  );
}
