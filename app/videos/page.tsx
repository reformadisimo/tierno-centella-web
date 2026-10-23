import type { Metadata } from 'next';
import Link from 'next/link';
import VideoYoutube from '@/components/VideoYoutube';
import { VIDEOS } from '@/lib/videos';

export const metadata: Metadata = {
  title: 'Vídeos sobre acoso laboral y derecho del trabajo',
  description: 'Entrevistas de Jesús Tierno con el psicólogo Iñaki Piñuel sobre el acoso laboral, casos ganados y consejos para trabajadores y empresas.',
};

export default function Videos() {
  return (
    <>
      <header className="cabeza-pagina">
        <div className="contenedor">
          <nav className="migas" aria-label="Estás en">
            <Link href="/">Inicio</Link> / Vídeos
          </nav>
          <h1>Vídeos</h1>
          <p className="entradilla">Jesús Tierno explica en vídeo lo que más preguntan quienes sufren acoso o un despido.</p>
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
