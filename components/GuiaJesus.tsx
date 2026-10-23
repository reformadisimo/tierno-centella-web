'use client';

import { useEffect, useMemo, useState } from 'react';
import CuestionarioGuia from './CuestionarioGuia';

export type SeccionGuia = {
  id: string;
  titulo: string;
  html: string;
  texto: string;
  foto: string;
  frase: string;
  grupo: string;
  claveGrupo: string;
  abierta: boolean;
};
const LOGOS: { src: string; nombre: string; texto: string }[] = [
  { src: 'google-analytics.png', nombre: 'Google Analytics', texto: 'El contador de visitas: cuánta gente entra y de dónde viene.' },
  { src: 'google-search-console.png', nombre: 'Search Console', texto: 'Cómo te ve Google: con qué búsquedas sales y en qué puesto.' },
  { src: 'googletagmanager.svg', nombre: 'Tag Manager', texto: 'La caja donde se enchufan Analytics y los anuncios.' },
  { src: 'google-ads.png', nombre: 'Google Ads', texto: 'Los anuncios que salen arriba en Google. Pagas por clic.' },
  { src: 'google-business-profile.jpg', nombre: 'Ficha de Google', texto: 'Tu tarjeta en Maps: fotos, horario, teléfono y reseñas.' },
  { src: 'semrush.svg', nombre: 'Semrush', texto: 'Qué busca la gente, cómo van tus rivales y qué dicen las IA de ti.' },
  { src: 'pagespeedinsights.svg', nombre: 'PageSpeed', texto: 'La nota oficial de Google a la velocidad de tu web.' },
  { src: 'pingdom.svg', nombre: 'Pingdom', texto: 'Cronómetro: cuánto tarda en cargar tu web y cuánto pesa.' },
  { src: 'vercel.svg', nombre: 'Vercel', texto: 'Donde vive la web nueva: rápida, segura y con su propio contador.' },
  { src: 'resend.svg', nombre: 'Resend', texto: 'El cartero: envía los correos de seguimiento desde tu dominio.' },
  { src: 'whatsapp-business.jpg', nombre: 'WhatsApp Business', texto: 'Tu WhatsApp del despacho, con respuestas rápidas.' },
  { src: 'instagram.jpg', nombre: 'Instagram', texto: 'Tus reels: el acoso explicado en un minuto.' },
  { src: 'linkedin.svg', nombre: 'LinkedIn', texto: 'Donde están los colegios, empresas e instituciones.' },
  { src: 'facebook.png', nombre: 'Facebook', texto: 'Tu página y la comunidad de siempre.' },
];

function BloqueLogos() {
  return (
    <div className="gj-logos">
      {LOGOS.map((l) => (
        <div key={l.nombre}>
          <img src={`/img/guia/${l.src}`} alt={`Logotipo de ${l.nombre}`} width={40} height={40} loading="lazy" />
          <strong>{l.nombre}</strong>
          <span>{l.texto}</span>
        </div>
      ))}
    </div>
  );
}

// Marcador circular de 0 a 100, en verde, naranja o rojo como PageSpeed.
function Marcador({ valor, etiqueta }: { valor: number; etiqueta: string }) {
  const color = valor >= 90 ? '#0c8a4a' : valor >= 50 ? '#d97a0b' : '#c8321f';
  const r = 26;
  const c = 2 * Math.PI * r;
  return (
    <div className="gj-marcador">
      <svg width="68" height="68" viewBox="0 0 68 68" aria-hidden="true">
        <circle cx="34" cy="34" r={r} fill="none" stroke="#e8edf2" strokeWidth="6" />
        <circle cx="34" cy="34" r={r} fill="none" stroke={color} strokeWidth="6" strokeLinecap="round" strokeDasharray={`${(valor / 100) * c} ${c}`} transform="rotate(-90 34 34)" />
        <text x="34" y="40" textAnchor="middle" fontSize="18" fontWeight="800" fill={color}>
          {valor}
        </text>
      </svg>
      <span>{etiqueta}</span>
    </div>
  );
}

function BloqueVelocidad() {
  const filas: { titulo: string; nueva: boolean; notas: number[]; etiquetas: string[] }[] = [
    { titulo: 'Tu web actual, en el móvil', nueva: false, notas: [49, 84, 73, 100], etiquetas: ['Velocidad', 'Accesibilidad', 'Buenas prácticas', 'SEO'] },
    { titulo: 'La web nueva, en el móvil', nueva: true, notas: [94, 100, 100, 100], etiquetas: ['Velocidad', 'Accesibilidad', 'Buenas prácticas', 'SEO al publicarla'] },
  ];
  return (
    <div className="gj-velocidad">
      <p className="gj-bloque-titulo">
        <img src="/img/guia/pagespeedinsights.svg" alt="" width={22} height={22} /> PageSpeed Insights, la nota oficial de Google
      </p>
      {filas.map((f) => (
        <div key={f.titulo} className={`gj-vel-fila${f.nueva ? ' nueva' : ''}`}>
          <strong>{f.titulo}</strong>
          <div className="gj-vel-marcadores">
            {f.notas.map((n, i) => (
              <Marcador key={i} valor={n} etiqueta={f.etiquetas[i]} />
            ))}
          </div>
        </div>
      ))}
      <p className="gj-nota">
        El SEO de la web nueva marca 100 en cuanto se publica en tu dominio. En la dirección de prueba sale 69 porque le pedimos a Google que no la
        indexe, para que no compita con tu web real.
      </p>
      <p className="gj-bloque-titulo">
        <img src="/img/guia/pingdom.svg" alt="" width={22} height={22} /> Pingdom, el cronómetro (medido el 23 de octubre de 2026)
      </p>
      <div className="gj-pingdom">
        <div>
          <span>Nota</span>
          <b className="mal">C · 78</b>
          <b className="bien">B · 84</b>
        </div>
        <div>
          <span>Tiempo de carga</span>
          <b className="mal">3,14 s</b>
          <b className="bien">1,58 s</b>
        </div>
        <div>
          <span>Peso de la página</span>
          <b className="mal">1,8 MB</b>
          <b className="bien">1,0 MB</b>
        </div>
        <div>
          <span>Peticiones al servidor</span>
          <b className="mal">88</b>
          <b className="bien">28</b>
        </div>
      </div>
      <p className="gj-leyenda">
        <i className="mal" /> Web actual <i className="bien" /> Web nueva
      </p>
    </div>
  );
}

function BloqueIA() {
  return (
    <div className="gj-ia">
      <div className="gj-ia-cifra">
        <Marcador valor={14} etiqueta="Visibilidad en la IA" />
        <p>
          <strong>14 sobre 100: baja.</strong> Semrush dice que las IA casi nunca te mencionan cuando alguien pregunta por abogados laboralistas,
          comparado con tus competidores.
        </p>
      </div>
      <div className="gj-ia-plataformas">
        <div>
          <b>ChatGPT</b>
          <span>1 mención</span>
        </div>
        <div>
          <b>Respuestas de IA de Google</b>
          <span>1 mención</span>
        </div>
        <div>
          <b>Modo IA de Google</b>
          <span>0</span>
        </div>
        <div>
          <b>Gemini</b>
          <span>0</span>
        </div>
      </div>
    </div>
  );
}

const BLOQUES: Record<string, () => React.ReactElement> = { logos: BloqueLogos, velocidad: BloqueVelocidad, ia: BloqueIA };

function Contenido({ html }: { html: string }) {
  if (html.includes('<p>CUESTIONARIO</p>'))
    return (
      <>
        <div className="prosa" dangerouslySetInnerHTML={{ __html: html.replace('<p>CUESTIONARIO</p>', '') }} />
        <CuestionarioGuia />
      </>
    );
  const partes = html.split(/<p>\[\[(\w+)\]\]<\/p>/);
  return (
    <>
      {partes.map((p, i) => {
        if (i % 2 === 1) {
          const B = BLOQUES[p];
          return B ? <B key={i} /> : null;
        }
        return p.trim() ? <div key={i} className="prosa" dangerouslySetInnerHTML={{ __html: p }} /> : null;
      })}
    </>
  );
}

// Novedades de la guía: al añadir algo, se sube VERSION y se describe aquí. Quien ya la había visto recibe el aviso.
const VERSION = 2;
const NOVEDADES: { texto: string; clave: string }[] = [
  { texto: 'Cómo te ven ChatGPT, Gemini y Google frente a tu competencia, y cómo vamos a mejorarlo', clave: '4 bis' },
  { texto: 'Respuestas listas para copiar y pegar en tus reseñas de Google', clave: '5' },
  { texto: 'Tu velocidad, con las notas de PageSpeed y de Pingdom', clave: '12' },
  { texto: 'Así sería el primer correo de seguimiento a un cliente', clave: '17' },
  { texto: 'Tres páginas nuevas para que tus anuncios conviertan', clave: '18 ter' },
];

function AvisoGuia({ secciones }: { secciones: SeccionGuia[] }) {
  const [modo, setModo] = useState<'' | 'bienvenida' | 'novedades'>('');
  useEffect(() => {
    try {
      const vista = Number(localStorage.getItem('tc-guia-version') || 0);
      if (vista < VERSION) setModo(vista === 0 ? 'bienvenida' : 'novedades');
      localStorage.setItem('tc-guia-version', String(VERSION));
    } catch {}
  }, []);
  if (!modo) return null;
  const cerrar = () => setModo('');
  const idDe = (clave: string) => secciones.find((s) => s.titulo.startsWith(clave + '.'))?.id;
  return (
    <div className="salida-fondo" onClick={cerrar}>
      <div className="salida gj-aviso" role="dialog" aria-modal="true" aria-labelledby="gj-aviso-titulo" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="salida-cerrar" onClick={cerrar} aria-label="Cerrar">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
        {modo === 'bienvenida' ? (
          <>
            <p className="etiqueta-calida">Hola, Jesús</p>
            <h2 id="gj-aviso-titulo">Bienvenido a tu guía</h2>
            <p>
              Aquí te contamos tu web nueva sin tecnicismos. Cada apartado empieza con una foto y una frase; si quieres más, pulsa &quot;Ver el
              detalle&quot;.
            </p>
            <p>
              <strong>Pregúntanos todo lo que quieras.</strong> Debajo de cada apartado puedes decirnos qué te parece y escribirnos: nos llega al
              momento y te contestamos rápido. Y si prefieres hablarlo, una llamada de diez minutos y listo.
            </p>
          </>
        ) : (
          <>
            <p className="etiqueta-calida">Novedades</p>
            <h2 id="gj-aviso-titulo">La guía se ha actualizado</h2>
            <p>Desde tu última visita hemos añadido:</p>
            <ul className="gj-novedades">
              {NOVEDADES.map((n) => (
                <li key={n.clave}>
                  <a href={`#${idDe(n.clave) ?? ''}`} onClick={cerrar}>
                    {n.texto}
                  </a>
                </li>
              ))}
            </ul>
            <p>Cualquier duda, escríbenos debajo de cada apartado: nos llega al momento.</p>
          </>
        )}
        <button type="button" className="boton boton-marcador" onClick={cerrar}>
          {modo === 'bienvenida' ? 'Empezar a leer' : 'Verlo'}
        </button>
      </div>
    </div>
  );
}

const normal = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

const avisar = (datos: Record<string, string>) =>
  fetch('/api/respuestas', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(datos), keepalive: true })
    .then((r) => r.ok)
    .catch(() => false);

// Aviso de visita: no avisa si quien abre es Ignacio (?yo=1 una vez en ese navegador) ni más de una vez cada 4 horas.
function useAvisoVisita() {
  useEffect(() => {
    try {
      const q = location.search;
      if (/[?&]yo=1/.test(q)) return localStorage.setItem('tc-guia-yo', '1');
      if (/[?&]yo=0/.test(q)) localStorage.removeItem('tc-guia-yo');
      if (localStorage.getItem('tc-guia-yo')) return;
      const ultima = Number(localStorage.getItem('tc-guia-visita') || 0);
      if (Date.now() - ultima < 4 * 3600000) return;
      localStorage.setItem('tc-guia-visita', String(Date.now()));
      avisar({ tipo: 'visita', dispositivo: /Mobi|Android|iPhone/i.test(navigator.userAgent) ? 'móvil' : 'ordenador' });
    } catch {}
  }, []);
}

function Reaccion({ id, seccion }: { id: string; seccion: string }) {
  const [elegida, setElegida] = useState('');
  const [msg, setMsg] = useState('');
  const [texto, setTexto] = useState('');
  const [msgTexto, setMsgTexto] = useState('');
  return (
    <div className="gj-reaccion">
      <span>¿Qué te ha parecido esta parte?</span>
      {['Me encanta', 'Me gusta', 'Tengo una duda', 'No lo veo claro'].map((r) => (
        <button
          key={r}
          type="button"
          className={elegida === r ? 'activo' : ''}
          onClick={async () => {
            setElegida(r);
            setMsg('Enviando...');
            const ok = await avisar({ tipo: 'reaccion', id, seccion, reaccion: r });
            setMsg(ok ? 'Gracias. Ignacio lo verá.' : 'Apuntado. Si quieres, cuéntaselo por WhatsApp.');
          }}
        >
          {r}
        </button>
      ))}
      {msg && <em role="status">{msg}</em>}
      <div className="gj-comentario">
        <textarea
          rows={2}
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder="Si quieres, escríbenos lo que piensas de esta parte: una duda, un cambio, algo que te guste o no. Le llega a Ignacio."
          aria-label={`Comentario sobre ${seccion}`}
        />
        <button
          type="button"
          onClick={async () => {
            if (!texto.trim()) return setMsgTexto('Escribe tu comentario y pulsa enviar.');
            setMsgTexto('Enviando...');
            const ok = await avisar({ tipo: 'comentario', id, seccion, reaccion: elegida, texto });
            setMsgTexto(ok ? 'Enviado. Gracias, Jesús: Ignacio ya lo tiene.' : 'No se ha podido enviar. Cuéntaselo por WhatsApp, por favor.');
            if (ok) setTexto('');
          }}
        >
          Enviar comentario
        </button>
        {msgTexto && <em role="status">{msgTexto}</em>}
      </div>
    </div>
  );
}

export default function GuiaJesus({ secciones }: { secciones: SeccionGuia[] }) {
  useAvisoVisita();
  const [q, setQ] = useState('');
  const busca = normal(q.trim());
  const visibles = useMemo(
    () => (busca.length < 2 ? secciones : secciones.filter((s) => normal(s.titulo + ' ' + s.texto).includes(busca))),
    [busca, secciones],
  );
  return (
    <div className="guia-jesus">
      <AvisoGuia secciones={secciones} />
      <aside className="gj-lateral">
        <label className="gj-buscar">
          <span>Buscar en la guía</span>
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="reseñas, blog, precio, Instagram..." />
        </label>
        {busca.length >= 2 && (
          <p className="letra-pequena" role="status">
            {visibles.length ? `${visibles.length} apartado${visibles.length > 1 ? 's' : ''} con "${q}"` : `Nada con "${q}"`}
          </p>
        )}
        <nav aria-label="Índice de la guía">
          <strong className="gj-indice-titulo">Índice</strong>
          {[...new Set(visibles.map((s) => s.claveGrupo))].map((g) => (
            <div key={g} className={`gj-indice-grupo gj-g-${g}`}>
              <span>{visibles.find((s) => s.claveGrupo === g)?.grupo}</span>
              <ol className="gj-indice">
                {visibles
                  .filter((s) => s.claveGrupo === g)
                  .map((s) => (
                    <li key={s.id}>
                      <a href={`#${s.id}`}>{s.titulo}</a>
                    </li>
                  ))}
              </ol>
            </div>
          ))}
        </nav>
      </aside>
      <div className="gj-cuerpo">
        {visibles.map((s) => (
          <section key={s.id} id={s.id} className={`gj-seccion gj-g-${s.claveGrupo}`}>
            <span className="gj-etiqueta">{s.grupo}</span>
            <h2>{s.titulo}</h2>
            <figure className="gj-banner">
              <img src={`/img/${s.foto}-640.webp`} srcSet={`/img/${s.foto}-640.webp 640w, /img/${s.foto}.webp 1200w`} sizes="(max-width: 900px) 100vw, 760px" alt="" loading="lazy" />
              {s.frase && <figcaption>{s.frase}</figcaption>}
            </figure>
            <details className="gj-detalle" open={s.abierta || busca.length >= 2}>
              <summary>
                <span className="gj-abrir">Ver el detalle de este apartado</span>
                <span className="gj-cerrar">Plegar</span>
              </summary>
              <Contenido html={s.html} />
            </details>
            <Reaccion id={s.id} seccion={s.titulo} />
            <a className="gj-arriba" href="#indice-guia">
              Volver arriba
            </a>
          </section>
        ))}
      </div>
    </div>
  );
}
