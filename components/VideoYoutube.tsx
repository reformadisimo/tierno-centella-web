'use client';

import { useState } from 'react';

// Carga el reproductor solo al pulsar: la página no paga el peso de YouTube hasta que alguien quiere verlo.
export default function VideoYoutube({ id, titulo }: { id: string; titulo: string }) {
  const [activo, setActivo] = useState(false);
  return (
    <div className="video">
      {activo ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={titulo}
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button type="button" className="video-portada" onClick={() => setActivo(true)} aria-label={`Ver el vídeo: ${titulo}`}>
          <img
            src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
            alt=""
            loading="lazy"
            onError={(e) => {
              // Si YouTube no sirve la miniatura (bloqueos, red lenta), ponemos una foto del despacho.
              const img = e.currentTarget;
              if (!img.src.includes('/img/')) img.src = '/img/jesus-mesa-640.webp';
            }}
          />
          <span className="video-play" aria-hidden="true" />
        </button>
      )}
      <p className="video-titulo">{titulo}</p>
    </div>
  );
}
