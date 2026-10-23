import Link from 'next/link';
import type { Pieza } from '@/lib/contenido';
import { videoPorId } from '@/lib/videos';
import VideoYoutube from './VideoYoutube';
import { DESPACHO, DEMO, enlaceWhatsapp } from '@/lib/despacho';
import JsonLd from './JsonLd';
import { BASE, ID_DESPACHO, ID_JESUS, esquemaFaq, esquemaMigas } from '@/lib/seo';

const fechaCorta = (iso: string) =>
  new Intl.DateTimeFormat('es-ES', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${iso}T00:00:00Z`));

export default function PaginaGuia({
  pieza,
  migas,
  relacionadas,
  herramienta,
}: {
  pieza: Pieza;
  migas: { href: string; texto: string }[];
  relacionadas: { href: string; titulo: string }[];
  herramienta?: { href: string; texto: string };
}) {
  const video = videoPorId(pieza.video);
  const ruta = migas[migas.length - 1].href + '/' + pieza.slug;
  const datos = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: pieza.titulo,
    description: pieza.descripcion,
    datePublished: pieza.fecha,
    dateModified: pieza.actualizado ?? pieza.fecha,
    author: { '@id': ID_JESUS },
    publisher: { '@id': ID_DESPACHO },
    inLanguage: 'es-ES',
    mainEntityOfPage: BASE + ruta,
    image: video ? `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg` : `${BASE}/img/jesus-firmando.webp`,
    ...(video
      ? { video: { '@type': 'VideoObject', name: video.titulo, description: video.descripcion, thumbnailUrl: `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`, embedUrl: `https://www.youtube.com/embed/${video.id}`, ...(video.fecha ? { uploadDate: video.fecha } : {}) } }
      : {}),
  };
  return (
    <>
      <JsonLd datos={datos} />
      <JsonLd datos={esquemaMigas([...migas, { href: ruta, texto: pieza.titulo }])} />
      {pieza.faq.length > 0 && <JsonLd datos={esquemaFaq(pieza.faq)} />}
      <header className="cabeza-pagina">
        <div className="contenedor">
          <nav className="migas" aria-label="Estás en">
            {migas.map((m, i) => (
              <span key={m.href}>
                {i > 0 && ' / '}
                <Link href={m.href}>{m.texto}</Link>
              </span>
            ))}
          </nav>
          <h1>{pieza.titulo}</h1>
          <p className="entradilla">{pieza.descripcion}</p>
          <div className="firma">
            <img src="/img/jesus-retrato.webp" alt="" />
            <span>
              {DEMO ? 'Pendiente de revisión por Jesús Tierno Centella.' : 'Revisado por Jesús Tierno Centella, abogado laboralista.'}{' '}
              Actualizado el {fechaCorta(pieza.actualizado ?? pieza.fecha)}. {pieza.minutos} min de lectura.
            </span>
          </div>
        </div>
      </header>
      <section className="seccion">
        <div className="contenedor guia">
          <article>
            {video && (
              <div style={{ marginBottom: 32 }}>
                <VideoYoutube id={video.id} titulo={video.titulo} />
              </div>
            )}
            <div className="prosa" dangerouslySetInnerHTML={{ __html: pieza.html }} />
          </article>
          <aside className="guia-lateral">
            <div className="lateral-caja">
              <h2>¿Hablamos de tu caso?</h2>
              <p style={{ fontSize: '0.95rem' }}>Te decimos por teléfono si tiene recorrido y qué plazos corren.</p>
              <div style={{ display: 'grid', gap: 8 }}>
                <a className="boton" href={DESPACHO.telefonoHref}>
                  {DESPACHO.telefono}
                </a>
                <a className="boton boton-claro" href={enlaceWhatsapp(`Hola, he leído "${pieza.titulo}" y quiero consultar mi caso.`)}>
                  WhatsApp
                </a>
              </div>
            </div>
            {herramienta && (
              <div className="lateral-caja">
                <h2>Herramienta gratuita</h2>
                <Link href={herramienta.href}>{herramienta.texto}</Link>
              </div>
            )}
            {relacionadas.length > 0 && (
              <div className="lateral-caja">
                <h2>Sigue leyendo</h2>
                <ul>
                  {relacionadas.map((r) => (
                    <li key={r.href}>
                      <Link href={r.href}>{r.titulo}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </section>
    </>
  );
}
