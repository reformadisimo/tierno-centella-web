import { FOTOS_PAGINA } from '@/lib/fotos-paginas';
import { videoDeFoto } from '@/lib/video-foto';
import FotoVideo from './FotoVideo';

export default function FotoCabeza({ ruta }: { ruta: string }) {
  const f = FOTOS_PAGINA[ruta];
  if (!f) return null;
  const video = videoDeFoto(f.foto);
  if (video) {
    return (
      <div className="foto-cabeza">
        <FotoVideo foto={f.foto} alt={f.alt} video={video} sizes="(max-width: 900px) 100vw, 45vw" prioridad />
      </div>
    );
  }
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
