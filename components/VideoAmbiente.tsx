// Vídeo corto, mudo y en bucle, del propio despacho. Sin controles: es ambiente, no contenido.
export default function VideoAmbiente({ src, poster, alt }: { src: string; poster: string; alt: string }) {
  return (
    <div className="video-ambiente">
      <video autoPlay muted loop playsInline preload="metadata" poster={poster} aria-label={alt}>
        <source src={src} type="video/webm" />
      </video>
    </div>
  );
}
