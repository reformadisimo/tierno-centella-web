import { FOTOS_PAGINA } from '@/lib/fotos-paginas';

export default function FotoCabeza({ ruta }: { ruta: string }) {
  const f = FOTOS_PAGINA[ruta];
  if (!f) return null;
  return (
    <div className="foto-cabeza">
      <img
        className="foto"
        src={`/img/${f.foto}.webp`}
        srcSet={`/img/${f.foto}-640.webp 640w, /img/${f.foto}.webp 1200w`}
        sizes="(max-width: 900px) 100vw, 45vw"
        alt={f.alt}
        width={640}
        height={480}
        fetchPriority="high"
      />
    </div>
  );
}
