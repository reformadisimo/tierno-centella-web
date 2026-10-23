import Link from 'next/link';
import type { Pieza } from '@/lib/contenido';
import { videoPorId } from '@/lib/videos';
import VideoYoutube from './VideoYoutube';
import { DESPACHO, DEMO, enlaceWhatsapp } from '@/lib/despacho';
import JsonLd from './JsonLd';
import { Compartir } from './BotonesAccion';
import { Escuchar } from './Utiles';
import { BASE, ID_DESPACHO, ID_JESUS, esquemaFaq, esquemaMigas } from '@/lib/seo';
import { fotosParaTexto, temaDe } from '@/lib/fotos-texto';

const escapar = (t: string) => t.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

// Intercala fotos (y, una vez, la tarjeta de Jesús) dentro del texto, aproximadamente cada tres pantallas de móvil.
function conImagenes(html: string, fotos: { src: string; es: string; en: string }[], en: boolean, tarjeta: string) {
  const trozos = html.split(/(?=<h2[ >]|<h3[ >])/);
  const bloques: string[] = [];
  for (const t of trozos) {
    if (t.length < 2600) { bloques.push(t); continue; }
    // Secciones muy largas: se pueden cortar también entre párrafos o listas.
    const partes = t.split(/(?<=<\/p>\n|<\/ul>\n|<\/ol>\n|<\/table>\n|<\/blockquote>\n)/);
    bloques.push(...partes);
  }
  const total = bloques.reduce((n, b) => n + b.replace(/<[^>]+>/g, '').length, 0);
  let acumulado = 0, recorrido = 0, i = 0, puesta = false;
  let salida = '';
  for (const b of bloques) {
    const largo = b.replace(/<[^>]+>/g, '').length;
    const esCabecera = /^<h[23][ >]/.test(b);
    const puedeCortar = esCabecera || /^<p[ >]|^<ul|^<ol|^<blockquote|^<table/.test(b);
    if (acumulado > (i === 0 && !puesta ? 900 : 1400) && puedeCortar && total - recorrido > 700) {
      if (!puesta && i >= 1 && tarjeta) {
        salida += tarjeta;
        puesta = true;
      } else if (fotos.length) {
        const f = fotos[i % fotos.length];
        const alt = escapar(en ? f.en : f.es);
        salida += `<figure class="prosa-foto"><img src="/img/${f.src}-640.webp" srcset="/img/${f.src}-640.webp 640w, /img/${f.src}.webp 1200w" sizes="(max-width: 1000px) 100vw, 720px" width="1200" height="800" loading="lazy" decoding="async" alt="${alt}"></figure>`;
        i++;
      }
      acumulado = 0;
    }
    salida += b;
    acumulado += largo;
    recorrido += largo;
  }
  return salida;
}

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
  const wa = enlaceWhatsapp(en ? `Hello, I have read "${pieza.titulo}" and I would like to ask about my case.` : `Hola, he leído "${pieza.titulo}" y quiero consultar mi caso.`);
  const tarjeta = `<div class="prosa-jesus"><img src="/img/jesus-mesa-640.webp" width="640" height="427" loading="lazy" decoding="async" alt="${en ? 'Jesús Tierno Centella at his desk' : 'Jesús Tierno Centella en su mesa del despacho'}"><div><p class="prosa-jesus-titulo">${
    en ? 'Does your case sound like this?' : '¿Tu caso se parece a esto?'
  }</p><p>${
    en
      ? 'Jesús Tierno and his team have been defending workers for more than 25 years. Tell us what is happening and we will tell you which deadlines apply.'
      : 'Jesús Tierno y su equipo llevan más de 25 años defendiendo a trabajadoras y trabajadores. Cuéntanos qué te pasa y te decimos qué plazos corren.'
  }</p><div class="prosa-jesus-botones"><a class="boton" href="${escapar(wa)}">${en ? 'Write on WhatsApp' : 'Escribir por WhatsApp'}</a><a class="boton boton-claro" href="${DESPACHO.telefonoHref}">${DESPACHO.telefono}</a></div></div></div>`;
  const htmlConFotos = conImagenes(pieza.html, fotosParaTexto(temaDe(ruta, pieza.categoria), pieza.slug, foto.src + (video ? '' : '')), en, tarjeta);
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
            <img src="/img/jesus-avatar.webp" alt="" width={48} height={48} />
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
            <div className="prosa" dangerouslySetInnerHTML={{ __html: htmlConFotos }} />
            <Compartir titulo={pieza.titulo} />
          </article>
          <div className="guia-lateral">
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
          </div>
        </div>
      </section>
    </>
  );
}

// Miniatura de una guía o artículo para los listados: la misma foto que abre la pieza.
export function Miniatura({ pieza }: { pieza: Pieza }) {
  const f = fotoDePieza(pieza);
  return <img className="miniatura" src={f.src.replace('.webp', '-640.webp')} alt="" width={640} height={427} loading="lazy" decoding="async" />;
}
