'use client';

// Foto que se anima con un clip corto en bucle. La foto es lo primero que se ve (y lo que cuenta para la velocidad);
// el vídeo se pide después, con la página ya cargada, y no se carga si el móvil ahorra datos o la persona prefiere menos movimiento.
import { useEffect, useRef, useState } from 'react';

export default function FotoVideo({ foto, alt, video, sizes, prioridad = false }: { foto: string; alt: string; video: { webm: string; mp4?: string }; sizes: string; prioridad?: boolean }) {
  const [listo, setListo] = useState(false);
  const [quiere, setQuiere] = useState(false);
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
    if (nav.connection?.saveData || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = window.setTimeout(() => setQuiere(true), 1200);
    return () => window.clearTimeout(t);
  }, []);
  return (
    <div className="foto-video">
      <img
        className="foto"
        src={`/img/${foto}.webp`}
        srcSet={`/img/${foto}-640.webp 640w, /img/${foto}.webp 1200w`}
        sizes={sizes}
        alt={alt}
        width={640}
        height={480}
        fetchPriority={prioridad ? 'high' : undefined}
      />
      {quiere && (
        <video ref={ref} className={listo ? 'listo' : ''} autoPlay muted loop playsInline preload="auto" aria-hidden="true" onCanPlay={() => setListo(true)}>
          <source src={video.webm} type="video/webm" />
          {video.mp4 && <source src={video.mp4} type="video/mp4" />}
        </video>
      )}
    </div>
  );
}
