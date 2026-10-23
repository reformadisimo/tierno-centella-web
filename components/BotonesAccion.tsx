'use client';

import { useState } from 'react';

// Botones pequeños que necesitan el navegador: abrir el chat y compartir la página.
export function BotonChat({ texto = 'Preguntar al chat', clase = 'boton boton-claro' }: { texto?: string; clase?: string }) {
  return (
    <button type="button" className={clase} onClick={() => window.dispatchEvent(new Event('abrir-asistente'))}>
      {texto}
    </button>
  );
}

export function Compartir({ titulo }: { titulo: string }) {
  const [copiado, setCopiado] = useState(false);
  const url = () => window.location.href.split('#')[0];
  return (
    <div className="compartir">
      <p>
        <strong>¿Conoces a alguien que esté pasando por esto?</strong> Mándaselo: a veces lo más difícil es saber por dónde empezar.
      </p>
      <div className="compartir-botones">
        <button
          type="button"
          className="boton compartir-wa"
          onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(`${titulo} ${url()}`)}`, '_blank', 'noopener')}
        >
          Enviar por WhatsApp
        </button>
        <button
          type="button"
          className="boton boton-claro"
          onClick={async () => {
            try {
              if (navigator.share) await navigator.share({ title: titulo, url: url() });
              else {
                await navigator.clipboard.writeText(url());
                setCopiado(true);
              }
            } catch {}
          }}
        >
          {copiado ? 'Enlace copiado' : 'Compartir enlace'}
        </button>
      </div>
    </div>
  );
}
