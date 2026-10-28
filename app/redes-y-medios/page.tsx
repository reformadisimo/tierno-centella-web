import { ChipVivo } from '@/components/Vida';
import { Etiqueta } from '@/components/Etiqueta';
import type { Metadata } from 'next';
import Link from 'next/link';
import { meta, esquemaMigas, REDES } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import ReelInstagram from '@/components/ReelInstagram';
import VideoYoutube from '@/components/VideoYoutube';
import { REELS, MEDIOS } from '@/lib/redes';

export const metadata: Metadata = meta({
  titulo: 'Jesús Tierno en redes y en los medios',
  descripcion:
    'Vídeos cortos sobre acoso laboral, despido e incapacidad, apariciones en radio, jornadas y entrevistas de Jesús Tierno y el equipo de Tierno Centella Abogados.',
  ruta: '/redes-y-medios',
  imagen: '/img/jesus-camisa.webp',
});

export default function RedesYMedios() {
  return (
    <>
      <JsonLd datos={esquemaMigas([{ href: '/', texto: 'Inicio' }, { href: '/redes-y-medios', texto: 'Redes y medios' }])} />
      <header className="cabeza-pagina cabeza-videos">
        <div className="contenedor cabeza-con-foto">
          <div>
            <nav className="migas" aria-label="Estás en">
              <Link href="/">Inicio</Link> / Redes y medios
            </nav>
            <Etiqueta icono="micro" tono="oro">Redes y medios</Etiqueta>
            <h1>Lo que contamos fuera del despacho.</h1>
            <p className="entradilla">
              Vídeos de un minuto para entender tus derechos, la radio, las jornadas y las conversaciones con especialistas. Todo con el mismo
              objetivo: que nadie se enfrente solo a un problema en su trabajo.
            </p>
            <div className="acciones">
              <a className="boton" href={REDES.instagram} target="_blank" rel="noopener">
                Seguir en Instagram
              </a>
              <a className="boton boton-claro" href={REDES.youtube} target="_blank" rel="noopener">
                Canal de YouTube
              </a>
            </div>
          </div>
          <img className="foto" src="/img/jesus-camisa.webp" srcSet="/img/jesus-camisa-640.webp 640w, /img/jesus-camisa.webp 1067w" sizes="(max-width: 860px) 100vw, 50vw" alt="Jesús Tierno en el despacho" fetchPriority="high" />
        </div>
      </header>

      <section className="seccion">
        <div className="contenedor">
          <h2 className="tv"><ChipVivo texto="Un minuto para entender tus derechos" i={0} /><span className="tv-texto">Un minuto para entender tus derechos</span></h2>
          <p>Los vídeos más vistos del Instagram del despacho. Pulsa en cualquiera para verlo aquí mismo.</p>
          <div className="rejilla-reels">
            {REELS.map((r) => (
              <ReelInstagram key={r.id} reel={r} />
            ))}
          </div>
        </div>
      </section>

      <section className="seccion seccion-arena">
        <div className="contenedor dos-columnas">
          <div>
            <h2 className="tv"><ChipVivo texto="En los medios y en las aulas" i={1} /><span className="tv-texto">En los medios y en las aulas</span></h2>
            <ul className="lista-medios">
              {MEDIOS.map((m) => (
                <li key={m.titulo}>
                  <a href={m.url} {...(m.url.startsWith('http') ? { target: '_blank', rel: 'noopener' } : {})}>
                    <small>{m.fecha}</small>
                    <strong>{m.titulo}</strong>
                    <span>{m.texto}</span>
                  </a>
                </li>
              ))}
            </ul>
            <p className="letra-pequena">¿Eres periodista? Escríbenos a info@tiernocentella.es o llama al 913 24 97 97.</p>
          </div>
          <div>
            <VideoYoutube id="lVoi2ijP1bA" titulo="Jesús Tierno entrevista al psicólogo Iñaki Piñuel sobre el acoso laboral" />
          </div>
        </div>
      </section>

      <section className="seccion">
        <div className="contenedor">
          <h2 className="tv"><ChipVivo texto="Dónde encontrarnos" i={2} /><span className="tv-texto">Dónde encontrarnos</span></h2>
          <div className="redes-grandes">
            <a href={REDES.instagram} target="_blank" rel="noopener">
              <strong>Instagram</strong>
              <span>Vídeos semanales sobre acoso, despido e incapacidad.</span>
            </a>
            <a href={REDES.youtube} target="_blank" rel="noopener">
              <strong>YouTube</strong>
              <span>Entrevistas largas y casos explicados.</span>
            </a>
            <a href={REDES.facebook} target="_blank" rel="noopener">
              <strong>Facebook</strong>
              <span>Las novedades del despacho.</span>
            </a>
            <a href={REDES.linkedin} target="_blank" rel="noopener">
              <strong>LinkedIn</strong>
              <span>El perfil profesional de Jesús Tierno.</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
