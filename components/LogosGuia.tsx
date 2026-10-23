// Logos de las herramientas y redes, para que la guía de Jesús se lea de un vistazo.
// Los ficheros están en /public/img/guia (los mismos que usa el apartado 2).

const FICHERO: Record<string, string> = {
  'Google Analytics': 'google-analytics-icono.png',
  'Search Console': 'google-search-console.png',
  'Tag Manager': 'googletagmanager.svg',
  'Google Ads': 'google-ads-icono.png',
  'Ficha de Google': 'google-business-profile.jpg',
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
  ChatGPT: 'openai.svg',
  Gemini: 'googlegemini.svg',
};

export function Logo({ nombre, tam = 28 }: { nombre: string; tam?: number }) {
  const f = FICHERO[nombre];
  if (!f) return null;
  return <img className="lg-logo" src={`/img/guia/${f}`} alt={`Logotipo de ${nombre}`} width={tam} height={tam} loading="lazy" />;
}

const REDES: { red: string; cifra: string; hoy: string; luego: string; tono: 'bien' | 'medio' | 'mal' }[] = [
  { red: 'Instagram', cifra: '4.007 seguidores', hoy: 'Tus reels con Irene son lo mejor que tienes, pero hubo tres años de silencio.', luego: 'Un reel por semana y campañas con el test de acoso.', tono: 'medio' },
  { red: 'LinkedIn', cifra: '2.371 seguidores', hoy: 'Publicas muy poco y hay dos páginas de empresa.', luego: 'Una sola página y el canal para colegios, empresas e instituciones.', tono: 'medio' },
  { red: 'Facebook', cifra: '285 seguidores', hoy: 'Repite Instagram y no tiene anuncios.', luego: 'Anuncios sencillos para quien lo está pasando mal en el trabajo.', tono: 'mal' },
  { red: 'YouTube', cifra: 'Canal con entrevistas', hoy: 'La entrevista a Iñaki Piñuel y casos ganados, poco visibles.', luego: 'Cada vídeo, dentro de la guía de la web que le toca.', tono: 'medio' },
  { red: 'X', cifra: 'Dos cuentas', hoy: 'Abandonadas.', luego: 'O se reactiva una, o se deja de enlazar.', tono: 'mal' },
];

export function BloqueRedes() {
  return (
    <div className="lg-redes">
      {REDES.map((r) => (
        <div key={r.red} className={`lg-red lg-${r.tono}`}>
          <div className="lg-red-cabeza">
            <Logo nombre={r.red} tam={40} />
            <span>
              <strong>{r.red}</strong>
              <small>{r.cifra}</small>
            </span>
          </div>
          <p className="lg-hoy">
            <b>Hoy</b> {r.hoy}
          </p>
          <p className="lg-luego">
            <b>Con nosotros</b> {r.luego}
          </p>
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
  { nombre: 'Dominio tiernocentella.es', logos: [], para: 'Hacer el cambio de web', como: 'Nos dices dónde está contratado y lo hacemos contigo', permiso: 'Contigo' },
  { nombre: 'Instagram, Facebook y LinkedIn', logos: ['Instagram', 'Facebook', 'LinkedIn'], para: 'Programar, anunciar y medir (si quieres)', como: 'Meta Business Suite y administrador de la página de LinkedIn', permiso: 'Si quieres' },
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
                www
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
