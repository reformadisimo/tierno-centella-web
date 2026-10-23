'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { idiomaDe } from '@/lib/idioma';

// Botones pequeños que necesitan el navegador: abrir el chat y compartir la página.
export function BotonChat({ texto, clase = 'boton boton-claro' }: { texto?: string; clase?: string }) {
  const en = idiomaDe(usePathname()) === 'en';
  return (
    <button type="button" className={clase} onClick={() => window.dispatchEvent(new Event('abrir-asistente'))}>
      {texto ?? (en ? 'Ask the chat' : 'Preguntar al chat')}
    </button>
  );
}

export function Compartir({ titulo }: { titulo: string }) {
  const en = idiomaDe(usePathname()) === 'en';
  const [copiado, setCopiado] = useState(false);
  const url = () => window.location.href.split('#')[0];
  return (
    <div className="compartir">
      <p>
        {en ? (
          <>
            <strong>Do you know someone going through this?</strong> Send it to them: sometimes the hardest part is knowing where to start.
          </>
        ) : (
          <>
            <strong>¿Conoces a alguien que esté pasando por esto?</strong> Mándaselo: a veces lo más difícil es saber por dónde empezar.
          </>
        )}
      </p>
      <div className="compartir-botones">
        <button
          type="button"
          className="boton compartir-wa"
          onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(`${titulo} ${url()}`)}`, '_blank', 'noopener')}
        >
          {en ? 'Send on WhatsApp' : 'Enviar por WhatsApp'}
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
          {copiado ? (en ? 'Link copied' : 'Enlace copiado') : en ? 'Share link' : 'Compartir enlace'}
        </button>
      </div>
    </div>
  );
}
