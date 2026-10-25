// Logos de las herramientas y redes, para que la guía de Jesús se lea de un vistazo.
// Los ficheros están en /public/img/guia (los mismos que usa el apartado 2).

const FICHERO: Record<string, string> = {
  'Google Analytics': 'google-analytics-icono.png',
  'Search Console': 'google-search-console.png',
  'Tag Manager': 'googletagmanager.svg',
  'Google Ads': 'google-ads-icono.png',
  'Ficha de Google': 'google-business-profile-icono.png',
  Semrush: 'semrush.svg',
  PageSpeed: 'pagespeedinsights.svg',
  Pingdom: 'pingdom.svg',
  Vercel: 'vercel.svg',
  Resend: 'resend.svg',
  WhatsApp: 'whatsapp-business.jpg',
  Instagram: 'instagram.jpg',
  LinkedIn: 'linkedin.svg',
  Facebook: 'facebook.png',
  X: 'x.svg',
  YouTube: 'youtube.svg',
  TikTok: 'tiktok.png',
  ChatGPT: 'openai.svg',
  Gemini: 'googlegemini.svg',
  Bing: 'bing.svg',
};

export function Logo({ nombre, tam = 28 }: { nombre: string; tam?: number }) {
  const f = FICHERO[nombre];
  if (!f) return null;
  return <img className="lg-logo" src={`/img/guia/${f}`} alt={`Logotipo de ${nombre}`} width={tam} height={tam} loading="lazy" />;
}

const REDES: { red: string; cifra: string; hoy: string; luego: string; por?: string; url?: string; tono: 'bien' | 'medio' | 'mal' }[] = [
  { red: 'Instagram', url: 'https://www.instagram.com/tiernocentella_abogados/', cifra: '4.007 seguidores', hoy: 'Tus reels con Irene son lo mejor que tienes, pero hubo tres años de silencio.', luego: 'Un reel por semana y campañas con el test de acoso.', tono: 'medio' },
  { red: 'LinkedIn', url: 'https://www.linkedin.com/in/jes%C3%BAs-tierno-centella-13ba92188/', cifra: '2.371 seguidores en tu perfil', hoy: 'Publicas muy poco, y hay tres páginas de empresa (80, 224 y 154 seguidores) sin ninguna publicación.', luego: 'Una sola página de empresa, al día cada semana, y tu perfil como canal para trabajadores, empresas y colegios.', tono: 'mal' },
  { red: 'Facebook', url: 'https://www.facebook.com/TiernoCentellaAbogados/', cifra: '285 + 161 seguidores, en dos páginas', hoy: 'Dos páginas: una repite Instagram de tarde en tarde y la otra lleva desde 2017 sin publicar, con el piso y el teléfono mal.', luego: 'Una sola página, con los datos bien y publicaciones cada semana para el público de más de 45 años. Anuncios, si quieres.', tono: 'mal' },
  { red: 'YouTube', url: 'https://www.youtube.com/@tiernocentella', cifra: 'Canal con entrevistas', hoy: 'La entrevista a Iñaki Piñuel y casos ganados, poco visibles.', luego: 'Cada vídeo, dentro de la guía de la web que le toca.', tono: 'medio' },
  { red: 'TikTok', cifra: 'Sin cuenta del despacho', hoy: 'No hemos encontrado ninguna cuenta del despacho.', luego: 'Vídeos de un minuto que responden una duda ("¿me pueden despedir estando de baja?"). Se aprovechan los reels de Instagram.', por: 'Ahí está quien empieza a trabajar: primer empleo, periodo de prueba, contratos temporales y, a veces, acoso. El 61 % de los españoles de 18 a 30 años usa TikTok cada mes. Y no es solo cosa de jóvenes: ya lo usa el 41 % de los internautas, 6 puntos más que hace un año. Facebook va al revés: el 62 % de quien entra cada mes tiene más de 45 años. Es un público que crece y se hace mayor cada año: quien empiece ahora llegará antes a esa gente. (IAB Spain, Estudio de Redes Sociales 2026.)', tono: 'mal' },
  { red: 'X', url: 'https://x.com/TiernoCentella1', cifra: 'Dos cuentas', hoy: 'Abandonadas.', luego: 'O se reactiva una, o se deja de enlazar.', tono: 'mal' },
];

export function BloqueRedes() {
  return (
    <div className="lg-redes">
      {REDES.map((r) => (
        <div key={r.red} className={`lg-red lg-${r.tono}`}>
          <div className="lg-red-cabeza">
            <Logo nombre={r.red} tam={40} />
            <span>
              {r.url ? (
                <a href={r.url} target="_blank" rel="noopener">
                  <strong>{r.red}</strong>
                </a>
              ) : (
                <strong>{r.red}</strong>
              )}
              <small>{r.cifra}</small>
            </span>
          </div>
          <p className="lg-hoy">
            <b>Hoy</b> {r.hoy}
          </p>
          <p className="lg-luego">
            <b>Con nosotros</b> {r.luego}
          </p>
          {r.por && (
            <p className="lg-por">
              <b>Por qué</b> {r.por}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

const CONECTAMOS = ['Google Analytics', 'Search Console', 'Tag Manager', 'Google Ads', 'Ficha de Google', 'Semrush', 'Instagram', 'Facebook', 'LinkedIn', 'WhatsApp', 'Resend', 'Vercel'];

export function BloqueConexiones() {
  return (
    <div className="lg-conexiones">
      <p className="lg-titulo">Todo conectado en un mismo informe</p>
      <div className="lg-tira">
        {CONECTAMOS.map((n) => (
          <span key={n} className="lg-chip">
            <Logo nombre={n} tam={24} />
            {n}
          </span>
        ))}
      </div>
    </div>
  );
}

const ACCESOS: { nombre: string; logos: string[]; para: string; como: string; permiso: string }[] = [
  { nombre: 'Google Analytics', logos: ['Google Analytics'], para: 'Medir visitas', como: 'Administrar > Gestión de acceso > añadir nuestro correo como lector', permiso: 'Solo lectura' },
  { nombre: 'Google Tag Manager', logos: ['Tag Manager'], para: 'Mantener el mismo contenedor en la web nueva', como: 'Administrador > Gestión de usuarios > añadir nuestro correo con permiso para publicar (solo en este contenedor)', permiso: 'Publicar' },
  { nombre: 'Google Ads', logos: ['Google Ads'], para: 'Ver cuánto cuesta cada consulta y proponer mejoras', como: 'Herramientas > Acceso y seguridad > añadir nuestro correo con acceso de solo lectura', permiso: 'Solo lectura' },
  { nombre: 'Search Console', logos: ['Search Console'], para: 'Ver búsquedas y redirecciones', como: 'Configuración > Usuarios y permisos > añadir usuario', permiso: 'Solo lectura' },
  { nombre: 'Ficha de Google', logos: ['Ficha de Google'], para: 'Responder reseñas y publicar', como: 'Perfil de Empresa > Gestores > añadir gestor', permiso: 'Gestor' },
  { nombre: 'Bing (ficha, Webmaster Tools y anuncios)', logos: ['Bing'], para: 'Mejorar tu ficha en Bing y, si quieres, anunciarte allí', como: 'Bing Places y Bing Webmaster Tools: añadir nuestro correo como usuario. Microsoft Advertising, solo si hacemos campañas', permiso: 'Gestor' },
  { nombre: 'Dominio tiernocentella.es', logos: [], para: 'Hacer el cambio de web', como: 'Nos dices dónde está contratado y lo hacemos contigo', permiso: 'Contigo' },
  { nombre: 'Instagram, Facebook y LinkedIn', logos: ['Instagram', 'Facebook', 'LinkedIn'], para: 'Unificar tus páginas, corregir los datos, publicar, responder y medir', como: 'Meta Business Suite: añadirnos como administradores de las dos páginas de Facebook y de Instagram. LinkedIn: administradores de las tres páginas de empresa, para fusionarlas en una', permiso: 'Administrador' },
];

export function BloqueAccesos() {
  return (
    <div className="lg-accesos">
      {ACCESOS.map((a) => (
        <div key={a.nombre} className="lg-acceso">
          <div className="lg-acceso-logos">
            {a.logos.length ? (
              a.logos.map((l) => <Logo key={l} nombre={l} tam={32} />)
            ) : (
              <span className="lg-dominio" aria-hidden="true">
                {a.nombre.startsWith('Bing') ? 'Bing' : 'www'}
              </span>
            )}
          </div>
          <div>
            <strong>{a.nombre}</strong>
            <span className="lg-para">{a.para}</span>
            <span className="lg-como">{a.como}</span>
          </div>
          <span className="lg-permiso">{a.permiso}</span>
        </div>
      ))}
    </div>
  );
}

// Las 15 preguntas que vigilamos cada día en ChatGPT (Semrush, rastreo de prompts desde el 23 de octubre de 2026).
const PROMPTS: [string, string][] = [
  ['Acoso', '¿Qué abogado de acoso laboral me recomiendas en Madrid?'],
  ['Acoso', 'Mejor abogado laboralista en Madrid para un caso de mobbing'],
  ['Acoso', '¿Qué despacho de abogados laboralistas de Madrid tiene experiencia en acoso laboral?'],
  ['Acoso', '¿Cómo demuestro que sufro acoso laboral y a qué abogado acudo en Madrid?'],
  ['Acoso', 'Abogado para acoso laboral en la administración pública o en un colegio en Madrid'],
  ['Acoso', '¿Puedo dejar la empresa con indemnización por acoso? Abogado en Madrid'],
  ['Incapacidad', 'Abogado para reclamar una incapacidad permanente denegada en Madrid'],
  ['Incapacidad', 'Abogado en Madrid para que mi baja por ansiedad se reconozca como accidente de trabajo'],
  ['Despido', 'Me han despedido estando embarazada en Madrid: ¿qué abogado me puede ayudar?'],
  ['Despido', 'Abogado laboralista en Madrid para un despido improcedente'],
  ['Despido', 'Abogado de despidos en Madrid con precio claro de la primera consulta'],
  ['Empresas', 'Abogados para protocolos de acoso laboral en empresas y colegios de Madrid'],
  ['Tu marca', '¿Quién es Jesús Tierno Centella?'],
  ['Tu marca', 'Opiniones sobre Tierno Centella Abogados'],
  ['Inglés', 'English-speaking employment lawyer in Madrid for workplace harassment'],
];

export function BloquePrompts() {
  return (
    <div className="lg-prompts">
      <div className="lg-prompts-cabeza">
        <span className="lg-barra">
          <Logo nombre="ChatGPT" tam={28} />
          <Logo nombre="Gemini" tam={28} />
          <Logo nombre="Semrush" tam={28} />
        </span>
        <span>
          <strong>Las 15 preguntas que vigilamos cada día</strong>
          <small>Desde el 23 de octubre de 2026, en ChatGPT y desde Madrid. Así sabremos si te nombra hoy y cómo cambia cada semana.</small>
        </span>
      </div>
      <ol className="lg-prompts-lista">
        {PROMPTS.map(([tema, p]) => (
          <li key={p}>
            <span className={`lg-tema lg-tema-${tema.replace(' ', '-').toLowerCase()}`}>{tema}</span>
            <span className="lg-pregunta">{p}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
