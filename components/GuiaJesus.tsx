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

// Visitas al mes desde Google (Semrush, España, octubre de 2026).
const VISITAS: { nombre: string; visitas: number; tu?: boolean }[] = [
  { nombre: 'Campmany Abogados', visitas: 69866 },
  { nombre: 'Bufete Toro', visitas: 47134 },
  { nombre: 'García de la Santa', visitas: 9164 },
  { nombre: 'Abogados Durán', visitas: 2457 },
  { nombre: 'Tierno Centella', visitas: 239, tu: true },
];

function BloqueCompetencia() {
  const max = Math.max(...VISITAS.map((v) => v.visitas));
  return (
    <div className="gj-barras" role="img" aria-label="Visitas al mes desde Google: Campmany 69.866, Bufete Toro 47.134, García de la Santa 9.164, Abogados Durán 2.457, Tierno Centella 239">
      {VISITAS.map((v) => (
        <div key={v.nombre} className={`gj-barra${v.tu ? ' tu' : ''}`}>
          <span className="gj-barra-nombre">{v.nombre}</span>
          <span className="gj-barra-pista">
            <span className="gj-barra-relleno" style={{ width: `${Math.max(0.8, (v.visitas / max) * 100)}%` }} />
            <b>{v.visitas.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</b>
          </span>
        </div>
      ))}
      <p className="gj-nota">Visitas al mes que llegan desde Google. Fuente: Semrush, octubre de 2026.</p>
    </div>
  );
}

// Semáforo de la situación de hoy, área por área.
const SEMAFORO: { area: string; color: 'rojo' | 'ambar' | 'verde'; hoy: string; haremos: string }[] = [
  { area: 'Google', color: 'rojo', hoy: '239 visitas al mes, un 38 % menos que en julio (384). Puesto 18 en "abogado laboralista madrid".', haremos: '45 guías nuevas, 39 artículos en 13 semanas y las 220 direcciones antiguas redirigidas.' },
  { area: 'Inteligencia artificial', color: 'rojo', hoy: '14 sobre 100. ChatGPT y Gemini casi nunca te nombran.', haremos: 'Respuestas que las IA puedan citar, datos iguales en todas partes, alta en Bing y medición mensual.' },
  { area: 'Autoridad (quién te enlaza)', color: 'rojo', hoy: '8 sobre 100. García de la Santa tiene 30 y Bufete Toro, 37.', haremos: 'Enlaces de medios, universidades y colegios profesionales, donde ya tienes relación.' },
  { area: 'Tu web', color: 'rojo', hoy: '18 segundos en cargar en el móvil, 49 sobre 100 de velocidad, "consulta gratuita" que no lo es.', haremos: 'Hecho: 94 de velocidad, 14 herramientas, asistente, precio claro.' },
  { area: 'Anuncios de Google', color: 'rojo', hoy: 'Activos, pero llevan a una página genérica y no se sabe qué consulta trae cada anuncio.', haremos: 'Hecho: tres páginas por tema. Falta medir cada consulta y ajustar las campañas.' },
  { area: 'Reseñas', color: 'ambar', hoy: '4,2 con 59 reseñas: 44 de cinco estrellas, pero 11 de una sin contestar.', haremos: 'Responderlas todas, pedir reseñas al cerrar cada caso y llegar a 4,5 en un año.' },
  { area: 'Blog', color: 'rojo', hoy: 'Parado desde 2022, con temas que no son tuyos.', haremos: 'Tres artículos a la semana sobre lo que de verdad busca la gente.' },
  { area: 'Redes sociales', color: 'ambar', hoy: 'Instagram con buenos vídeos pero un parón de 2021 a 2024; dos cuentas de X abandonadas.', haremos: 'Un ritmo constante, reels con tus casos y LinkedIn para colegios e instituciones.' },
  { area: 'Saber de dónde vienen tus clientes', color: 'rojo', hoy: 'No se mide.', haremos: 'Cada llamada, WhatsApp y formulario con su origen, y un informe sencillo cada semana.' },
];

function BloqueSemaforo() {
  return (
    <div className="gj-semaforo">
      {SEMAFORO.map((f) => (
        <div key={f.area} className={`gj-sem-fila gj-sem-${f.color}`}>
          <span className="gj-sem-luz" aria-label={f.color === 'rojo' ? 'Mal' : f.color === 'ambar' ? 'Mejorable' : 'Bien'} />
          <div>
            <strong>{f.area}</strong>
            <p>
              <span>Hoy:</span> {f.hoy}
            </p>
            <p>
              <span>Lo que haremos:</span> {f.haremos}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

const BLOQUES: Record<string, () => React.ReactElement> = {
  logos: BloqueLogos,
  velocidad: BloqueVelocidad,
  ia: BloqueIA,
  competencia: BloqueCompetencia,
  semaforo: BloqueSemaforo,
};

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
// Vacía hasta que Jesús entre por primera vez: su primera visita le enseña la bienvenida, no novedades.
const VERSION = 5;
const NOVEDADES: { texto: string; clave: string }[] = [];

function AvisoGuia({ secciones }: { secciones: SeccionGuia[] }) {
  const [modo, setModo] = useState<'' | 'bienvenida' | 'novedades'>('');
  useEffect(() => {
    try {
      const vista = Number(localStorage.getItem('tc-guia-version') || 0);
      if (vista === 0) setModo('bienvenida');
      else if (vista < VERSION && NOVEDADES.length) setModo('novedades');
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
  const [escribir, setEscribir] = useState(false);
  return (
    <div className="gj-reaccion">
      <span>¿Qué te ha parecido?</span>
      {['Me encanta', 'Me gusta', 'Tengo una duda', 'No lo veo claro'].map((r) => (
        <button
          key={r}
          type="button"
          className={elegida === r ? 'activo' : ''}
          aria-pressed={elegida === r}
          onClick={async () => {
            setElegida(r);
            if (r === 'Tengo una duda' || r === 'No lo veo claro') setEscribir(true);
            setMsg('Enviando...');
            const ok = await avisar({ tipo: 'reaccion', id, seccion, reaccion: r });
            setMsg(ok ? 'Gracias. Lo vemos enseguida.' : 'Apuntado. Si quieres, cuéntanoslo por WhatsApp.');
          }}
        >
          {r}
        </button>
      ))}
      {!escribir && (
        <button type="button" className="gj-escribir" onClick={() => setEscribir(true)}>
          Escribirnos algo
        </button>
      )}
      {msg && <em role="status">{msg}</em>}
      {escribir && (
        <div className="gj-comentario">
          <textarea
            rows={3}
            autoFocus
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            placeholder={elegida === 'Tengo una duda' ? '¿Cuál es tu duda? Te contestamos enseguida.' : 'Una duda, un cambio, algo que te guste o no. Nos llega al momento.'}
            aria-label={`Comentario sobre ${seccion}`}
          />
          <button
            type="button"
            onClick={async () => {
              if (!texto.trim()) return setMsgTexto('Escribe tu comentario y pulsa enviar.');
              setMsgTexto('Enviando...');
              const ok = await avisar({ tipo: 'comentario', id, seccion, reaccion: elegida, texto });
              setMsgTexto(ok ? 'Enviado. Gracias, Jesús: ya lo tenemos.' : 'No se ha podido enviar. Cuéntanoslo por WhatsApp, por favor.');
              if (ok) setTexto('');
            }}
          >
            Enviar
          </button>
          {msgTexto && <em role="status">{msgTexto}</em>}
        </div>
      )}
    </div>
  );
}

// Apartados ya vistos: se marcan en el índice y alimentan la barra de progreso (solo en este navegador).
function useVistos(ids: string[]) {
  const [vistos, setVistos] = useState<Set<string>>(new Set());
  useEffect(() => {
    let guardados: string[] = [];
    try {
      guardados = JSON.parse(localStorage.getItem('tc-guia-vistos') || '[]');
    } catch {}
    const v = new Set(guardados);
    setVistos(new Set(v));
    const obs = new IntersectionObserver(
      (entradas) => {
        let cambio = false;
        for (const e of entradas) {
          if (e.isIntersecting && !v.has(e.target.id)) {
            v.add(e.target.id);
            cambio = true;
          }
        }
        if (cambio) {
          setVistos(new Set(v));
          try {
            localStorage.setItem('tc-guia-vistos', JSON.stringify([...v]));
          } catch {}
        }
      },
      { rootMargin: '0px 0px -40% 0px', threshold: 0 },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id)?.querySelector('h2');
      if (el) obs.observe(el.closest('section')!);
    });
    return () => obs.disconnect();
  }, [ids]);
  return vistos;
}

export default function GuiaJesus({ secciones }: { secciones: SeccionGuia[] }) {
  useAvisoVisita();
  const [q, setQ] = useState('');
  const busca = normal(q.trim());
  const visibles = useMemo(
    () => (busca.length < 2 ? secciones : secciones.filter((s) => normal(s.titulo + ' ' + s.texto).includes(busca))),
    [busca, secciones],
  );
  const ids = useMemo(() => secciones.map((x) => x.id), [secciones]);
  const vistos = useVistos(ids);
  const [indice, setIndice] = useState(false);
  const total = secciones.length;
  const hechos = secciones.filter((x) => vistos.has(x.id)).length;
  const preguntas = secciones.find((x) => /preguntas para ti/i.test(x.titulo))?.id;
  const abrirIndice = () => {
    if (q) setQ('');
    setTimeout(() => document.getElementById('indice')?.scrollIntoView({ block: 'start' }), 30);
  };
  return (
    <div className="guia-jesus">
      <AvisoGuia secciones={secciones} />
      <aside className="gj-lateral" id="gj-indice">
        <div className="gj-progreso" aria-label={`Has visto ${hechos} de ${total} apartados`}>
          <div>
            <strong>Tu lectura</strong>
            <span>
              {hechos} de {total} apartados
            </span>
          </div>
          <div className="gj-progreso-barra">
            <i style={{ width: `${Math.round((hechos / total) * 100)}%` }} />
          </div>
        </div>
        <button type="button" className="gj-indice-boton" aria-expanded={indice} onClick={() => setIndice((v) => !v)}>
          {indice ? 'Ocultar el índice' : `Ver el índice (${total} apartados)`}
        </button>
        <div className={`gj-indice-caja${indice ? ' abierto' : ''}`}>
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
                    <li key={s.id} className={vistos.has(s.id) ? 'visto' : ''}>
                      <a href={`#${s.id}`} onClick={() => setIndice(false)}>
                        {s.titulo}
                      </a>
                    </li>
                  ))}
              </ol>
            </div>
          ))}
        </nav>
        </div>
      </aside>
      <div className="gj-cuerpo">
        {busca.length < 2 && (
          <section className="gj-mapa" id="indice" aria-labelledby="gj-mapa-titulo">
            <div className="gj-mapa-cabeza">
              <h2 id="gj-mapa-titulo">Índice de la guía</h2>
              <p>
                {total} apartados en seis bloques. Empieza por el primero y salta a lo que más te interese; los que ya has visto se marcan en verde.
              </p>
            </div>
            <div className="gj-mapa-rejilla">
              {[...new Set(secciones.map((x) => x.claveGrupo))].map((g, n) => {
                const del = secciones.filter((x) => x.claveGrupo === g);
                const vistosG = del.filter((x) => vistos.has(x.id)).length;
                return (
                  <div key={g} className={`gj-mapa-grupo gj-g-${g}`}>
                    <div className="gj-mapa-grupo-cabeza">
                      <span className="gj-mapa-num">{n + 1}</span>
                      <strong>{del[0].grupo}</strong>
                      <small>
                        {vistosG}/{del.length}
                      </small>
                    </div>
                    <ol>
                      {del.map((x) => (
                        <li key={x.id} className={vistos.has(x.id) ? 'visto' : ''}>
                          <a href={`#${x.id}`}>{x.titulo}</a>
                        </li>
                      ))}
                    </ol>
                  </div>
                );
              })}
            </div>
          </section>
        )}
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
            <a className="gj-arriba" href="#indice">
              Volver al índice
            </a>
          </section>
        ))}
      </div>
      <nav className="gj-barra" aria-label="Moverse por la guía">
        <button type="button" onClick={abrirIndice}>
          Índice
          <small>
            {hechos}/{total}
          </small>
        </button>
        {preguntas && <a href={`#${preguntas}`}>Tus preguntas</a>}
        <button type="button" onClick={() => window.dispatchEvent(new Event('abrir-asistente'))}>
          Probar el chat
        </button>
      </nav>
    </div>
  );
}
