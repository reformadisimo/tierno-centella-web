import EsquemaPagina from '@/components/EsquemaPagina';
import { Etiqueta } from '@/components/Etiqueta';
import type { Metadata } from 'next';
import FotoCabeza from '@/components/FotoCabeza';
import { meta } from '@/lib/seo';
import Link from 'next/link';
import VideoYoutube from '@/components/VideoYoutube';
import { VIDEOS } from '@/lib/videos';

export const metadata: Metadata = meta({
  titulo: 'Vídeos sobre acoso laboral y derecho del trabajo',
  descripcion: 'Entrevistas de Jesús Tierno con el psicólogo Iñaki Piñuel sobre el acoso laboral, casos ganados y consejos para trabajadores y empresas.',
  ruta: '/videos',
});

export default function Videos() {
  return (
    <>
      <EsquemaPagina ruta="/videos" />
      <header className="cabeza-pagina cabeza-videos">
        <div className="contenedor cabeza-con-foto">
          <div>
            <nav className="migas" aria-label="Estás en">
              <Link href="/">Inicio</Link> / Vídeos
            </nav>
            <Etiqueta icono="video" tono="oro">Vídeos</Etiqueta>
            <h1>Vídeos</h1>
            <p className="entradilla">Jesús Tierno explica en vídeo lo que más preguntan quienes sufren acoso o un despido.</p>
          </div>
          <FotoCabeza ruta="/videos" />
        </div>
      </header>
      <section className="seccion">
        <div className="contenedor rejilla-videos">
          {VIDEOS.map((v) => (
            <div key={v.id}>
              <VideoYoutube id={v.id} titulo={v.titulo} />
              <p style={{ fontSize: '0.95rem' }}>{v.descripcion}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
