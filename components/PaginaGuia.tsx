import Link from 'next/link';
import type { Pieza } from '@/lib/contenido';
import { videoPorId } from '@/lib/videos';
import VideoYoutube from './VideoYoutube';
import { DESPACHO, DEMO, enlaceWhatsapp } from '@/lib/despacho';
import JsonLd from './JsonLd';
import { Compartir } from './BotonesAccion';
import { Escuchar } from './Utiles';
import { BASE, ID_DESPACHO, ID_JESUS, esquemaFaq, esquemaMigas } from '@/lib/seo';

// Fotos reales del despacho. Cada pieza sin foto propia recibe una fija según su nombre, para que no se repitan todas.
const FOTOS: { src: string; alt: string }[] = [
  { src: 'abogada-escucha', alt: 'Una abogada del despacho escucha a una clienta' },
  { src: 'jesus-firmando', alt: 'Jesús Tierno revisa documentación en su mesa' },
  { src: 'abogada-documentos', alt: 'Una abogada del despacho revisa un expediente' },
  { src: 'biblioteca', alt: 'Reunión en la biblioteca del despacho' },
  { src: 'abogada-lee', alt: 'Una abogada del despacho estudia un caso' },
  { src: 'reunion-cliente', alt: 'Jesús Tierno entrega documentación a una clienta' },
  { src: 'abogada-sonrie', alt: 'Una abogada del despacho sonríe durante una reunión' },
  { src: 'reunion-equipo', alt: 'El equipo del despacho reunido' },
  { src: 'abogado-joven', alt: 'Un abogado del despacho trabaja con documentos' },
  { src: 'jesus-camisa', alt: 'Jesús Tierno en el despacho' },
];

const conVariantes = (nombre: string, alt: string) => ({
  src: `/img/${nombre}.webp`,
  srcSet: `/img/${nombre}-640.webp 640w, /img/${nombre}.webp 1200w`,
  alt,
});

export function fotoDePieza(pieza: Pieza) {
  if (pieza.imagen) return conVariantes(pieza.imagen, pieza.imagenAlt ?? '');
  let h = 0;
  for (const c of pieza.slug) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  const f = FOTOS[h % FOTOS.length];
  return conVariantes(f.src, f.alt);
}

const fechaCorta = (iso: string, en = false) =>
  new Intl.DateTimeFormat(en ? 'en-GB' : 'es-ES', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${iso}T00:00:00Z`));

export default function PaginaGuia({
  pieza,
  migas,
  relacionadas,
  herramienta,
  idioma = 'es',
}: {
  pieza: Pieza;
  migas: { href: string; texto: string }[];
  relacionadas: { href: string; titulo: string }[];
  herramienta?: { href: string; texto: string };
  idioma?: 'es' | 'en';
}) {
  const en = idioma === 'en';
  const video = videoPorId(pieza.video);
  const foto = fotoDePieza(pieza);
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
    inLanguage: en ? 'en' : 'es-ES',
    mainEntityOfPage: BASE + ruta,
    image: video ? `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg` : `${BASE}${foto.src}`,
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
          <nav className="migas" aria-label={en ? "You are here" : "Estás en"}>
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
            <img src="/img/jesus-retrato.webp" srcSet="/img/jesus-retrato-640.webp 640w, /img/jesus-retrato.webp 1080w" sizes="(max-width: 860px) 100vw, 50vw" alt="" />
            <span>
              {en
                ? DEMO
                  ? 'Pending review by Jesús Tierno Centella.'
                  : 'Reviewed by Jesús Tierno Centella, employment lawyer.'
                : DEMO
                  ? 'Pendiente de revisión por Jesús Tierno Centella.'
                  : 'Revisado por Jesús Tierno Centella, abogado laboralista.'}{' '}
              {en ? 'Updated' : 'Actualizado el'} {fechaCorta(pieza.actualizado ?? pieza.fecha, en)}. {pieza.minutos} {en ? 'min read' : 'min de lectura'}.
            </span>
          </div>
        </div>
      </header>
      <section className="seccion">
        <div className="contenedor guia">
          <article>
            {video ? (
              <div style={{ marginBottom: 32 }}>
                <VideoYoutube id={video.id} titulo={video.titulo} prioridad />
              </div>
            ) : (
              <figure className="guia-foto">
                <img src={foto.src} srcSet={foto.srcSet} sizes="(max-width: 1000px) 100vw, 720px" alt={foto.alt} width={1200} height={800} fetchPriority="high" />
              </figure>
            )}
            <Escuchar />
            {pieza.apartados.length >= 4 && (
              <nav className="en-esta-guia" aria-label={en ? 'In this guide' : 'En esta guía'}>
                <strong>{en ? 'In this guide' : 'En esta guía'}</strong>
                <ul>
                  {pieza.apartados.map((a) => (
                    <li key={a.id}>
                      <a href={`#${a.id}`}>{a.texto}</a>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
            <div className="prosa" dangerouslySetInnerHTML={{ __html: pieza.html }} />
            <Compartir titulo={pieza.titulo} />
          </article>
          <aside className="guia-lateral">
            <div className="lateral-caja lateral-humana">
              {foto.src.includes('abogada-escucha') ? (
                <img src="/img/abogada-sonrie-640.webp" alt={en ? "A lawyer from the firm smiles during a consultation" : "Una abogada del despacho sonríe durante una consulta"} loading="lazy" />
              ) : (
                <img src="/img/abogada-escucha.webp" srcSet="/img/abogada-escucha-640.webp 640w, /img/abogada-escucha.webp 872w" sizes="(max-width: 860px) 100vw, 50vw" alt={en ? "A lawyer from the firm during a consultation" : "Una abogada del despacho atiende una consulta"} loading="lazy" />
              )}
              <h2>{en ? 'Shall we talk about your case?' : '¿Hablamos de tu caso?'}</h2>
              <p style={{ fontSize: '0.95rem' }}>
                {en ? 'We tell you over the phone whether it has a chance and which deadlines apply. We speak English.' : 'Te decimos por teléfono si tiene recorrido y qué plazos corren.'}
              </p>
              <div style={{ display: 'grid', gap: 8 }}>
                <a className="boton" href={DESPACHO.telefonoHref}>
                  {DESPACHO.telefono}
                </a>
                <a className="boton boton-claro" href={enlaceWhatsapp(en ? `Hello, I have read "${pieza.titulo}" and I would like to ask about my case.` : `Hola, he leído "${pieza.titulo}" y quiero consultar mi caso.`)}>
                  WhatsApp
                </a>
              </div>
            </div>
            {herramienta && (
              <div className="lateral-caja">
                <h2>{en ? 'Free tool' : 'Herramienta gratuita'}</h2>
                <Link href={herramienta.href}>{herramienta.texto}</Link>
              </div>
            )}
            {relacionadas.length > 0 && (
              <div className="lateral-caja">
                <h2>{en ? 'Keep reading' : 'Sigue leyendo'}</h2>
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
