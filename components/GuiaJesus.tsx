'use client';

import FotoVideo from './FotoVideo';
import ProgresoGuia from './ProgresoGuia';
import { DOLORES } from '@/lib/guia-dolores';
import { BloqueWeb, BloqueLandings, BloqueCorreosEnlace, BloquePanelEnlace, BloqueCrmEnlace, BloqueRedesEnlace, BloqueLupaEnlace, BloqueOpinionEnlace } from './EnlacesGuia';
import RedesHoyLuego, { GoogleNombre } from './RedesGuia';
import ResenasGuia from './ResenasGuia';
import ProveedoresGuia from './ProveedoresGuia';
import CostesGuia from './CostesGuia';
import MercadoGuia from './MercadoGuia';
import CambioGuia from './CambioGuia';
import CompromisoVelocidad from './CompromisoVelocidad';
import ComisionesGuia from './ComisionesGuia';
import GarantiaGuia from './GarantiaGuia';
import PlazosWeb from './PlazosWeb';
import TodoGuia from './TodoGuia';
import SeguridadGuia from './SeguridadGuia';
import { useEffect, useMemo, useRef, useState } from 'react';
import Lupa, { enviarLupa } from './Lupa';
import CuestionarioGuia from './CuestionarioGuia';
import AnunciosGuia from './AnunciosGuia';
import OficiosGuia from './OficiosGuia';
import { BloqueAccesos, BloqueConexiones, BloquePrompts, BloqueRedes } from './LogosGuia';
import { MockupAvisoChat, MockupFicha, MockupIA, MockupInforme, MockupCorreos, MockupResenaWhatsApp, MockupVelocidad } from './MockupsGuia';

export type SeccionGuia = {
  video?: { webm: string; mp4?: string };
  id: string;
  titulo: string;
  html: string;
  texto: string;
  foto: string;
  frase: string;
  grupo: string;
  claveGrupo: string;
  abierta: boolean;
  franja?: { hoy: string; luego: string };
};
const LOGOS: { src: string; nombre: string; texto: string }[] = [
  { src: 'google-analytics-icono.png', nombre: 'Google Analytics', texto: 'El contador de visitas: cuánta gente entra y de dónde viene.' },
  { src: 'google-search-console.png', nombre: 'Search Console', texto: 'Cómo te ve Google: con qué búsquedas sales y en qué puesto.' },
  { src: 'googletagmanager.svg', nombre: 'Tag Manager', texto: 'La caja donde se enchufan Analytics y los anuncios.' },
  { src: 'google-ads-icono.png', nombre: 'Google Ads', texto: 'Los anuncios que salen arriba en Google. Pagas por clic.' },
  { src: 'google-business-profile-icono.png', nombre: 'Ficha de Google', texto: 'Tu tarjeta en Maps: fotos, horario, teléfono y reseñas.' },
  { src: 'semrush.svg', nombre: 'Semrush', texto: 'Qué busca la gente, cómo van tus rivales y qué dicen las IA de ti.' },
  { src: 'pagespeedinsights.svg', nombre: 'PageSpeed', texto: 'La nota oficial de Google a la velocidad de tu web.' },
  { src: 'pingdom.svg', nombre: 'Pingdom', texto: 'Cronómetro: cuánto tarda en cargar tu web y cuánto pesa.' },
  { src: 'vercel.svg', nombre: 'Vercel', texto: 'Donde vive la web nueva: rápida, segura y con su propio contador.' },
  { src: 'resend.svg', nombre: 'Resend', texto: 'El cartero: envía los correos de seguimiento desde tu dominio.' },
  { src: 'whatsapp-business.jpg', nombre: 'WhatsApp Business', texto: 'Tu WhatsApp del despacho, con respuestas rápidas.' },
  { src: 'instagram.jpg', nombre: 'Instagram', texto: 'Tus reels: el acoso explicado en un minuto.' },
  { src: 'linkedin.svg', nombre: 'LinkedIn', texto: 'Donde están los colegios, empresas e instituciones.' },
  { src: 'facebook.png', nombre: 'Facebook', texto: 'Tu página y la comunidad de siempre.' },
  { src: 'youtube.svg', nombre: 'YouTube', texto: 'Tus entrevistas y casos ganados, en vídeo.' },
  { src: 'x.svg', nombre: 'X', texto: 'La antigua Twitter: hoy tus dos cuentas están paradas.' },
  { src: 'openai.svg', nombre: 'ChatGPT', texto: 'La IA a la que cada vez más gente le pregunta por un abogado.' },
  { src: 'googlegemini.svg', nombre: 'Gemini', texto: 'La IA de Google: también responde y recomienda.' },
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
  const filas: { titulo: string; nueva: boolean; notas: number[]; etiquetas: string[]; agentes: number }[] = [
    { titulo: 'Tu web actual, en el móvil', nueva: false, notas: [49, 84, 73, 100], etiquetas: ['Velocidad', 'Accesibilidad', 'Buenas prácticas', 'SEO'], agentes: 1 },
    { titulo: 'La web nueva, en el móvil', nueva: true, notas: [94, 100, 100, 100], etiquetas: ['Velocidad', 'Accesibilidad', 'Buenas prácticas', 'SEO al publicarla'], agentes: 3 },
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
            <div className="gj-agentes">
              <span className={f.agentes === 3 ? 'bien' : 'mal'}>{f.agentes}/3</span>
              <small>Navegación agéntica (IA)</small>
            </div>
          </div>
        </div>
      ))}
      <p className="gj-nota">
        El SEO de la web nueva marca 100 en cuanto se publica en tu dominio. En la dirección de prueba sale 69 porque le pedimos a Google que no la
        indexe, para que no compita con tu web real.
      </p>
      <p className="gj-nota">
        <strong>Navegación agéntica</strong> es la nota nueva de Google para los agentes de IA, los asistentes que ya entran en las webs por ti a buscar
        información, comparar o pedir cita. Comprueba tres cosas: que un agente entiende cómo está construida cada página, que nada se mueve mientras
        carga y que existe la ficha para las IA (llms.txt). Tu web actual saca 1 de 3; la nueva, 3 de 3. De nueve despachos de Madrid que hemos medido, ninguno
        llega al 3 de 3 (el 23 de octubre de 2026; la tabla está un poco más abajo).
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
const VISITAS: { nombre: string; visitas: number; tu?: boolean; web: string }[] = [
  { nombre: 'Campmany Abogados', visitas: 69866, web: 'https://campmanyabogados.com/' },
  { nombre: 'Bufete Toro', visitas: 47134, web: 'https://www.bufetetoro.com/' },
  { nombre: 'García de la Santa', visitas: 9164, web: 'https://garciadelasantaabogados.es/' },
  { nombre: 'Abogados Durán', visitas: 2457, web: 'https://abogadosduran.com/' },
  { nombre: 'Tierno Centella', visitas: 239, tu: true, web: 'https://tiernocentella.es/' },
];

function BloqueCompetencia() {
  const max = Math.max(...VISITAS.map((v) => v.visitas));
  return (
    <div className="gj-barras" role="img" aria-label="Visitas al mes desde Google: Campmany 69.866, Bufete Toro 47.134, García de la Santa 9.164, Abogados Durán 2.457, Tierno Centella 239">
      {VISITAS.map((v) => (
        <div key={v.nombre} className={`gj-barra${v.tu ? ' tu' : ''}`}>
          <a className="gj-barra-nombre" href={v.web} target="_blank" rel="noopener">
            {v.nombre}
          </a>
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


// Lo que hemos visto, uno a uno: qué pasa hoy, qué te está costando y cómo te ayudamos. Con cariño y con datos.

function BloqueDolor() {
  return (
    <div className="gj-dolores">
      {DOLORES.map((d, i) => (
        <article key={d.titulo} className="gj-dolor">
          <header>
            <span className="gj-dolor-icono" aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d={d.icono} />
              </svg>
            </span>
            <span className="gj-dolor-num">{String(i + 1).padStart(2, '0')}</span>
            <h4>{d.titulo}</h4>
          </header>
          <div className="gj-dolor-cifras">
            <div className="gj-dolor-hoy">
              <small>Hoy</small>
              <strong>{d.hoyDato}</strong>
              <span>{d.hoy}</span>
            </div>
            <svg className="gj-dolor-flecha" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
            <div className="gj-dolor-luego">
              <small>Con nosotros</small>
              <strong>{d.luegoDato}</strong>
              <span>{d.luego}</span>
            </div>
          </div>
          <dl>
            <dt>Lo que hemos visto</dt>
            <dd>{d.visto}</dd>
            <dt>Lo que te está costando</dt>
            <dd>{d.cuesta}</dd>
            <dt>Cómo te ayudamos</dt>
            <dd>{d.ayudamos}</dd>
          </dl>
          {d.ancla && (
            <a
              className="gj-dolor-ir"
              href="#indice"
              onClick={(e) => {
                const destino = document.querySelector(`[id^="${d.ancla!.replace(' ', '-')}-"]`);
                if (!destino) return;
                e.preventDefault();
                destino.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
            >
              Verlo en detalle: apartado {d.ancla}
            </a>
          )}
        </article>
      ))}
    </div>
  );
}

// Semáforo de la situación de hoy, área por área.
const SEMAFORO: { area: string; color: 'rojo' | 'ambar' | 'verde'; hoy: string; haremos: string }[] = [
  { area: 'Google', color: 'rojo', hoy: '239 visitas al mes, un 38 % menos que en julio (384). Puesto 18 en "abogado laboralista madrid".', haremos: '47 guías y artículos nuevos, 39 artículos en 13 semanas y las 220 direcciones antiguas redirigidas.' },
  { area: 'Inteligencia artificial', color: 'rojo', hoy: '14 sobre 100. ChatGPT y Gemini casi nunca te nombran.', haremos: 'Respuestas que las IA puedan citar, datos iguales en todas partes, alta en Bing y medición mensual.' },
  { area: 'Autoridad (quién te enlaza)', color: 'rojo', hoy: '8 sobre 100. García de la Santa tiene 30 y Bufete Toro, 37.', haremos: 'Enlaces de medios, universidades y colegios profesionales, donde ya tienes relación.' },
  { area: 'Tu web', color: 'rojo', hoy: '18 segundos en cargar en el móvil, 49 sobre 100 de velocidad, "consulta gratuita" que no lo es.', haremos: 'Hecho: 94 de velocidad, 21 herramientas, asistente, precio claro.' },
  { area: 'Anuncios de Google', color: 'rojo', hoy: 'Activos, pero llevan a una página genérica y no se sabe qué consulta trae cada anuncio.', haremos: 'Hecho: tres páginas por tema. Falta medir cada consulta y ajustar las campañas.' },
  { area: 'Reseñas', color: 'ambar', hoy: '4,2 con 59 reseñas: 44 de cinco estrellas, pero 11 de una sin contestar.', haremos: 'Responderlas todas con tu aprobación, pedirlas por WhatsApp al cerrar cada caso y llegar a 4,5.' },
  { area: 'Blog', color: 'rojo', hoy: 'Parado desde 2022, con temas que no son tuyos.', haremos: 'Tres artículos a la semana sobre lo que de verdad busca la gente.' },
  { area: 'Redes sociales', color: 'rojo', hoy: 'Instagram con buenos vídeos pero un parón de 2021 a 2024; una página de Facebook parada desde 2017 con el piso y el teléfono mal; tres páginas de LinkedIn sin publicaciones.', haremos: 'Un ritmo constante en Instagram, una sola página de Facebook y una de LinkedIn al día cada semana, y LinkedIn para empresas, colegios e instituciones.' },
  { area: 'Seguimiento de cada contacto', color: 'rojo', hoy: 'Quien deja sus datos o se va sin decidirse no vuelve a saber de ti.', haremos: 'Una serie de correos automáticos con Resend, según su tema, desde que deja sus datos hasta la consulta.' },
  { area: 'Saber de dónde vienen tus clientes', color: 'rojo', hoy: 'No se mide.', haremos: 'Cada llamada, WhatsApp y formulario con su origen, y un informe sencillo cada semana.' },
];

function BloqueSemaforo() {
  return (
    <div className="gj-semaforo">
      {SEMAFORO.map((f) => (
        <div key={f.area} className={`gj-sem-fila gj-sem-${f.color}`}>
          <span className="gj-sem-luz" role="img" aria-label={f.color === 'rojo' ? 'Mal' : f.color === 'ambar' ? 'Mejorable' : 'Bien'} />
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
  dolor: BloqueDolor,
  anuncios: AnunciosGuia,
  oficios: OficiosGuia,
  redes: BloqueRedes,
  conexiones: BloqueConexiones,
  accesos: BloqueAccesos,
  prompts: BloquePrompts,
  'mock-ficha': MockupFicha,
  'mock-ia': MockupIA,
  'mock-velocidad': MockupVelocidad,
  'mock-aviso': MockupAvisoChat,
  'mock-informe': MockupInforme,
  'mock-resena': MockupResenaWhatsApp,
  'mock-correos': MockupCorreos,
  'correos-enlace': BloqueCorreosEnlace,
  'panel-enlace': BloquePanelEnlace,
  'lupa-enlace': BloqueLupaEnlace,
  'opinion-enlace': BloqueOpinionEnlace,
  'crm-enlace': BloqueCrmEnlace,
  'redes-hoy-luego': RedesHoyLuego,
  'google-nombre': GoogleNombre,
  'redes-enlace': BloqueRedesEnlace,
  mercado: MercadoGuia,
  cambio: CambioGuia,
  'compromiso-velocidad': CompromisoVelocidad,
  comisiones: ComisionesGuia,
  garantia: GarantiaGuia,
  'plazos-web': PlazosWeb,
  resenas: ResenasGuia,
  proveedores: ProveedoresGuia,
  costes: CostesGuia,
  todo: TodoGuia,
  seguridad: SeguridadGuia,
  web: BloqueWeb,
  landings: BloqueLandings,
};

function Contenido({ html }: { html: string }) {
  if (html.includes('<p>CUESTIONARIO</p>'))
    return (
      <>
        <div className="prosa" dangerouslySetInnerHTML={{ __html: html.replace('<p>CUESTIONARIO</p>', '') }} />
        <CuestionarioGuia />
      </>
    );
  const partes = html.split(/<p>\[\[([\w-]+)\]\]<\/p>/);
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

// Novedades de la guía: al añadir algo, se sube VERSION y se añade aquí con su versión (v). Cada aviso sale una sola vez:
// quien entra solo ve las novedades posteriores a su última visita, nunca las que ya vio (petición de Ig, 27-oct-2026).
// Jesús entró por primera vez el 26 de octubre de 2026 (versión 12). Cuando llegue el aviso de que ha vuelto a entrar,
// se borran de aquí las que ya ha visto.
const VERSION = 20;
const NOVEDADES: { texto: string; clave: string; v: number }[] = [
  { texto: 'Nuestra forma de trabajar: sin reuniones ni llamadas, por correo y WhatsApp, y cada vez robándote menos tiempo.', clave: '21 ter', v: 20 },
  { texto: '¿Miedo al cambio? Te explicamos el test A/B: tu web actual y la nueva a la vez, con el reparto que prefieras. Nuestro consejo: ir directamente al 100 % con la nueva.', clave: '21 bis', v: 19 },
  { texto: 'Tres herramientas nuevas en tu web: cuánto se cobra de baja, los salarios que debe la empresa con sus intereses y lo que cubre el FOGASA.', clave: '11', v: 18 },
  { texto: 'No te pedimos tu facturación: te pedimos dos números, cuántos contactos acaban siendo clientes y lo que deja cada uno.', clave: '23 bis', v: 17 },
  { texto: 'Tu ficha de Google, en nuestras manos: cómo pediríamos las reseñas a tus clientes por WhatsApp y por correo (con ejemplos), y todo lo que haríamos en tu ficha.', clave: '5', v: 16 },
  { texto: 'Tu mesa de control, renovada: te la enseña una guía de 9 pasos cortos, y en «Tus sueños y tus cuentas» nos dices hasta dónde quieres llegar.', clave: '19', v: 15 },
  { texto: 'Nuevo: la lupa de tu web. Ves dónde toca la gente, hasta dónde baja y dónde se va, y puedes dejarnos notas en el sitio exacto.', clave: '19 ter', v: 14 },
  { texto: 'Tu cuenta de X lleva parada desde 2020: qué ve quien la abre y cómo la pondríamos al día.', clave: '6', v: 13 },
];

function AvisoGuia({ secciones }: { secciones: SeccionGuia[] }) {
  const [modo, setModo] = useState<'' | 'bienvenida' | 'novedades'>('');
  const [nuevas, setNuevas] = useState<typeof NOVEDADES>([]);
  useEffect(() => {
    try {
      const vista = Number(localStorage.getItem('tc-guia-version') || 0);
      const pendientes = NOVEDADES.filter((n) => n.v > vista);
      if (vista === 0) setModo('bienvenida');
      else if (pendientes.length) {
        setNuevas(pendientes);
        setModo('novedades');
      }
      localStorage.setItem('tc-guia-version', String(VERSION));
    } catch {}
  }, []);
  const caja = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!modo) return;
    caja.current?.focus();
    const tecla = (e: KeyboardEvent) => e.key === 'Escape' && setModo('');
    window.addEventListener('keydown', tecla);
    return () => window.removeEventListener('keydown', tecla);
  }, [modo]);
  if (!modo) return null;
  const cerrar = () => setModo('');
  const idDe = (clave: string) => secciones.find((s) => s.titulo.startsWith(clave + '.'))?.id;
  return (
    <div className="salida-fondo" onClick={cerrar}>
      <div className="salida gj-aviso" role="dialog" aria-modal="true" aria-labelledby="gj-aviso-titulo" tabIndex={-1} ref={caja} onClick={(e) => e.stopPropagation()}>
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
              Aquí te contamos tu web nueva sin tecnicismos. Justo debajo de la portada tienes el <strong>índice</strong>; cada apartado empieza con una foto y una
              frase, y si quieres más, pulsas &quot;Ver el detalle&quot;.
            </p>
            <ul className="gj-bienvenida-lista">
              <li>
                <strong>La guía está viva.</strong> Irá cambiando, y cada novedad te la contaremos aquí mismo, al entrar.
              </li>
              <li>
                <strong>Pregúntanos lo que quieras</strong> debajo de cada apartado: nos llega al momento, y verás nuestras respuestas en la propia
                guía, en &quot;Tus dudas, respondidas&quot;.
              </li>
              <li>
                <strong>Todo online, para no quitarte tiempo.</strong> Sin reuniones ni llamadas innecesarias: tu tiempo es para tus clientes.
                Nuestro objetivo es que tengas la máxima visibilidad y el máximo trabajo, ocupándote de nosotros lo menos posible.
              </li>
            </ul>
          </>
        ) : (
          <>
            <p className="etiqueta-calida">Hola de nuevo, Jesús</p>
            <h2 id="gj-aviso-titulo">La guía ha seguido creciendo</h2>
            <p>
              Te dijimos que esta guía estaba viva, y es verdad: cada vez que entres encontrarás cosas nuevas, porque seguimos mirando tu caso y mejorando la web.
              Esto es lo último que hemos añadido (pulsa en cada punto para ir directo):
            </p>
            <ul className="gj-novedades">
              {nuevas.map((n) => (
                <li key={n.clave}>
                  <a href={`#${idDe(n.clave) ?? ''}`} onClick={cerrar}>
                    {n.texto}
                  </a>
                </li>
              ))}
            </ul>
            <p>
              Y una cosa importante: la web nueva tampoco se queda quieta. Cada semana vemos por dónde navega la gente, qué pregunta al chat y dónde se atasca, y
              la vamos ajustando. Cualquier duda, escríbenos debajo de cada apartado: nos llega al momento.
            </p>
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

// Si quien prueba la guía es Ignacio (?yo=1), no se envía nada: así sus pruebas no llegan como si fueran de Jesús.
const esYo = () => {
  try {
    return !!localStorage.getItem('tc-guia-yo');
  } catch {
    return false;
  }
};
const avisar = (datos: Record<string, string>) => {
  // Cada reacción, duda, respuesta o visita queda también en la lupa (si es Ignacio, marcada como propia).
  if (datos.tipo !== 'tiempo') {
    try {
      enviarLupa({ pantalla: 'guia', evento: { tipo: datos.tipo, seccion: datos.seccion ?? '', texto: [datos.reaccion, datos.texto].filter(Boolean).join(' · ') } });
    } catch {}
  }
  return esYo()
    ? Promise.resolve(true)
    : fetch('/api/respuestas', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(datos), keepalive: true })
        .then((r) => r.ok)
        .catch(() => false);
};

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

// Tiempo de lectura: cuenta solo el tiempo con la guía delante (pestaña visible y sin estar parado más de 3 minutos),
// qué apartados ha tenido en pantalla y hasta dónde ha llegado. Al salir o cambiar de pestaña manda un resumen,
// la primera vez a partir de 20 segundos y luego solo si ha leído 2 minutos más. No avisa si quien lee es Ignacio (?yo=1).
function useTiempoLectura() {
  useEffect(() => {
    if (esYo()) return;
    let activo = 0;
    let enviado = -1;
    let maxScroll = 0;
    let ultimaAccion = Date.now();
    const porApartado: Record<string, number> = {};
    const titulos: Record<string, string> = {};
    const tocar = () => (ultimaAccion = Date.now());
    const eventos = ['scroll', 'click', 'keydown', 'touchstart', 'mousemove'];
    eventos.forEach((e) => window.addEventListener(e, tocar, { passive: true }));
    const reloj = setInterval(() => {
      if (document.visibilityState !== 'visible' || Date.now() - ultimaAccion > 180000) return;
      activo++;
      const alto = document.documentElement.scrollHeight - innerHeight;
      if (alto > 0) maxScroll = Math.max(maxScroll, Math.round((scrollY / alto) * 100));
      // El apartado que ocupa el centro de la pantalla suma un segundo.
      const el = document.elementFromPoint(innerWidth / 2, innerHeight / 2)?.closest('section.gj-seccion') as HTMLElement | null;
      if (el?.id) {
        porApartado[el.id] = (porApartado[el.id] || 0) + 1;
        titulos[el.id] = el.querySelector('h2')?.textContent || el.id;
      }
    }, 1000);
    const enviar = () => {
      if (activo < 20 || (enviado >= 0 && activo - enviado < 120)) return;
      enviado = activo;
      const lista = Object.entries(porApartado)
        .filter(([, t]) => t >= 5)
        .sort((a, b) => b[1] - a[1])
        .map(([id, t]) => `${titulos[id]}: ${t >= 60 ? `${Math.floor(t / 60)} min ${t % 60} s` : `${t} s`}`);
      avisar({
        tipo: 'tiempo',
        dispositivo: /Mobi|Android|iPhone/i.test(navigator.userAgent) ? 'móvil' : 'ordenador',
        reaccion: String(activo),
        seccion: String(maxScroll),
        texto: lista.join('\n') || '(no se paró en ningún apartado más de 5 segundos)',
      });
    };
    const alOcultar = () => document.visibilityState === 'hidden' && enviar();
    document.addEventListener('visibilitychange', alOcultar);
    window.addEventListener('pagehide', enviar);
    return () => {
      clearInterval(reloj);
      eventos.forEach((e) => window.removeEventListener(e, tocar));
      document.removeEventListener('visibilitychange', alOcultar);
      window.removeEventListener('pagehide', enviar);
    };
  }, []);
}

// Las dudas que escribe Jesús se guardan en su navegador y aparecen al momento en "Tus dudas, respondidas".
type Duda = { seccion: string; texto: string; tipo: string; fecha: string };
function leerDudas(): Duda[] {
  try {
    return JSON.parse(localStorage.getItem('tc-guia-dudas') || '[]');
  } catch {
    return [];
  }
}
function guardarDuda(seccion: string, texto: string, tipo: string) {
  try {
    const lista = [...leerDudas(), { seccion, texto: texto.trim(), tipo, fecha: new Date().toISOString() }];
    localStorage.setItem('tc-guia-dudas', JSON.stringify(lista));
    window.dispatchEvent(new Event('gj-dudas'));
  } catch {}
}

function MisDudas() {
  const [dudas, setDudas] = useState<Duda[]>([]);
  useEffect(() => {
    const leer = () => setDudas(leerDudas());
    leer();
    window.addEventListener('gj-dudas', leer);
    return () => window.removeEventListener('gj-dudas', leer);
  }, []);
  if (!dudas.length) return <p className="gj-dudas-vacio">Todavía no nos has escrito ninguna pregunta. Cuando lo hagas, aparecerá aquí al momento.</p>;
  return (
    <ul className="gj-dudas">
      {[...dudas].reverse().map((d) => (
        <li key={d.fecha}>
          <span className="gj-dudas-cabeza">
            <strong>{d.seccion}</strong>
            <small>{new Intl.DateTimeFormat('es-ES', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' }).format(new Date(d.fecha))}</small>
          </span>
          <p>&quot;{d.texto}&quot;</p>
          <em>Recibida. Te contestamos enseguida y la respuesta aparecerá aquí.</em>
        </li>
      ))}
    </ul>
  );
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
              if (ok) guardarDuda(seccion, texto, elegida);
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
function useVistos(ids: string[], version: string) {
  const [vistos, setVistos] = useState<Set<string>>(new Set());
  useEffect(() => {
    let guardados: string[] = [];
    try {
      guardados = JSON.parse(localStorage.getItem('tc-guia-vistos') || '[]');
    } catch {}
    const v = new Set(guardados);
    setVistos(new Set(v));
    // Un apartado cuenta como visto si se queda a la vista unos segundos, no si solo pasa de largo.
    const relojes = new Map<string, number>();
    const marcar = (id: string) => {
      if (v.has(id)) return;
      v.add(id);
      setVistos(new Set(v));
      try {
        localStorage.setItem('tc-guia-vistos', JSON.stringify([...v]));
      } catch {}
    };
    const obs = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          const id = e.target.id;
          if (e.isIntersecting && !v.has(id) && !relojes.has(id)) relojes.set(id, window.setTimeout(() => marcar(id), 2500));
          if (!e.isIntersecting && relojes.has(id)) {
            clearTimeout(relojes.get(id));
            relojes.delete(id);
          }
        }
      },
      { rootMargin: '0px 0px -40% 0px', threshold: 0 },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id)?.querySelector('h2');
      if (el) obs.observe(el.closest('section')!);
    });
    return () => {
      obs.disconnect();
      relojes.forEach((t) => clearTimeout(t));
    };
  }, [ids, version]);
  return vistos;
}

export default function GuiaJesus({ secciones, actualizada = '' }: { secciones: SeccionGuia[]; actualizada?: string }) {
  useAvisoVisita();
  useTiempoLectura();
  // Los enlaces internos de la guía ("apartado 17", "pregunta 34") abren el detalle plegado antes de llevar al sitio.
  useEffect(() => {
    const abrir = () => {
      const id = decodeURIComponent(location.hash.slice(1));
      if (!id) return;
      const el = document.getElementById(id);
      if (!el) return;
      el.querySelector<HTMLDetailsElement>(':scope > details.gj-detalle')?.setAttribute('open', '');
      let a: HTMLElement | null = el;
      while (a) {
        if (a.tagName === 'DETAILS') (a as HTMLDetailsElement).open = true;
        a = a.parentElement;
      }
      setTimeout(() => el.scrollIntoView({ block: 'start' }), 30);
    };
    abrir();
    window.addEventListener('hashchange', abrir);
    return () => window.removeEventListener('hashchange', abrir);
  }, []);
  const [q, setQ] = useState('');
  const busca = normal(q.trim());
  const visibles = useMemo(
    () => (busca.length < 2 ? secciones : secciones.filter((s) => normal(s.titulo + ' ' + s.texto).includes(busca))),
    [busca, secciones],
  );
  const ids = useMemo(() => secciones.map((x) => x.id), [secciones]);
  const vistos = useVistos(ids, busca);
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
      <Lupa pantalla="guia" />
      <AvisoGuia secciones={secciones} />
      <ProgresoGuia />
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
        <button
          type="button"
          className="gj-pdf"
          id="descargar-guia"
          onClick={() => {
            if (q) setQ('');
            setTimeout(() => {
              document.querySelectorAll<HTMLDetailsElement>('.gj-detalle').forEach((d) => (d.open = true));
              window.print();
            }, 80);
          }}
        >
          <span className="gj-pdf-icono" aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3v12M7 10l5 5 5-5M5 21h14" />
            </svg>
          </span>
          <span className="gj-pdf-texto">
            <b>Descargar la guía en PDF</b>
            <small>Siempre la versión más reciente{actualizada ? ` · actualizada el ${actualizada}` : ''}</small>
          </span>
        </button>
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
        <div className="gj-buscador-caja">
        <p className="gj-buscador-titulo">¿Buscas algo concreto?</p>
        <p className="gj-buscador-texto">Escribe una palabra y te enseñamos solo los apartados que hablan de ello. Es la forma más rápida de leer la guía.</p>
        <div className="gj-buscador" role="search">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM21 21l-4.3-4.3" />
          </svg>
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Por ejemplo: reseñas, precio, TikTok..."
            aria-label="Buscar en la guía"
          />
          {q && (
            <button type="button" onClick={() => setQ('')} aria-label="Borrar la búsqueda">
              Borrar
            </button>
          )}
        </div>
        {busca.length >= 2 && (
          <p className="gj-buscador-res" role="status">
            {visibles.length
              ? `${visibles.length} apartado${visibles.length > 1 ? 's' : ''} hablan de "${q}". Pulsa "Ver el detalle" en cada uno.`
              : `Ningún apartado habla de "${q}". Prueba con otra palabra.`}
          </p>
        )}
        <div className="gj-buscador-sugerencias">
          <span>Lo más buscado:</span>
          {['Reseñas', 'Precio', 'Anuncios', 'Correos', 'Seguridad', 'IA', 'Inglés'].map((t) => (
            <button key={t} type="button" onClick={() => setQ(t.toLowerCase())} className={busca === normal(t) ? 'activo' : ''}>
              {t}
            </button>
          ))}
        </div>
        </div>
        {busca.length >= 2 && <span id="indice" />}
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
              {s.video ? (
                <FotoVideo foto={s.foto} alt="" video={s.video} sizes="(max-width: 900px) 100vw, 760px" />
              ) : (
                <img src={`/img/${s.foto}-640.webp`} srcSet={`/img/${s.foto}-640.webp 640w, /img/${s.foto}.webp 1200w`} sizes="(max-width: 900px) 100vw, 760px" alt="" loading="lazy" />
              )}
              {s.frase && <figcaption>{s.frase}</figcaption>}
            </figure>
            {s.franja && (
              <div className="gj-franja">
                <div className="gj-franja-hoy">
                  <small>Hoy</small>
                  <span>{s.franja.hoy}</span>
                </div>
                <svg className="gj-dolor-flecha" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
                <div className="gj-franja-luego">
                  <small>Con nosotros</small>
                  <span>{s.franja.luego}</span>
                </div>
              </div>
            )}
            <details className="gj-detalle" open={s.abierta || busca.length >= 2}>
              <summary>
                <span className="gj-abrir">Ver el detalle de este apartado</span>
                <span className="gj-cerrar">Plegar</span>
              </summary>
              <Contenido html={s.html} />
              {s.titulo.startsWith('24 bis') && <MisDudas />}
            </details>
            <Reaccion id={s.id} seccion={s.titulo} />
            <a className="gj-arriba" href="#indice">
              Volver al índice
            </a>
          </section>
        ))}
      </div>
      <nav className="gj-barra-inferior" aria-label="Moverse por la guía">
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
