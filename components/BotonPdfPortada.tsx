'use client';

// Atajo en la portada al botón de descarga del lateral, que abre todo y lanza la impresión.
export default function BotonPdfPortada() {
  return (
    <button type="button" className="boton gj-boton-pdf" onClick={() => document.getElementById('descargar-guia')?.click()}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 3v12M7 10l5 5 5-5M5 21h14" />
      </svg>
      Descargar en PDF
    </button>
  );
}
