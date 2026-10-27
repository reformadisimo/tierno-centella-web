// Accesos directos de la guía a la web nueva y a las tres páginas de los anuncios.
// Se abren en otra pestaña para que Jesús no pierda el sitio en la guía.

type Tarjeta = { ruta: string; titulo: string; texto: string; foto: string };

const WEB: Tarjeta[] = [
  { ruta: '/', titulo: 'Portada', texto: 'Lo primero que ve quien te busca', foto: 'portada-poster-movil' },
  { ruta: '/acoso-laboral', titulo: 'Acoso laboral', texto: '9 guías, el test y el mapa de pruebas', foto: 'acoso-tension-640' },
  { ruta: '/despido', titulo: 'Despido', texto: '4 guías y la calculadora', foto: 'despido-caja-640' },
  { ruta: '/incapacidad-permanente', titulo: 'Incapacidad permanente', texto: '3 guías con la Ley 2/2025', foto: 'incapacidad-ventana-640' },
  { ruta: '/mujer-y-trabajo', titulo: 'Mujer y trabajo', texto: 'Embarazo, permisos y conciliación', foto: 'madre-hijo-640' },
  { ruta: '/herramientas', titulo: 'Herramientas', texto: '18 calculadoras y tests', foto: 'portatil-manos-640' },
  { ruta: '/sentencias', titulo: 'Sentencias', texto: 'Una página por cada caso', foto: 'mazo-640' },
  { ruta: '/jesus-tierno', titulo: 'Jesús Tierno', texto: 'Tu trayectoria, el libro y la prensa', foto: 'jesus-retrato-640' },
  { ruta: '/blog', titulo: 'Blog', texto: '26 artículos con buscador', foto: 'abogada-lee-640' },
  { ruta: '/empresas', titulo: 'Empresas y colegios', texto: 'Protocolos y formación', foto: 'empresas-firma-640' },
  { ruta: '/contacto', titulo: 'Contacto', texto: 'Formulario, WhatsApp, mapa y precios', foto: 'recepcion-640' },
  { ruta: '/en', titulo: 'Versión en inglés', texto: 'Toda la web, en inglés', foto: 'equipo-640' },
];

const LANDINGS: (Tarjeta & { busqueda: string })[] = [
  { ruta: '/consulta/incapacidad-permanente', titulo: 'Incapacidad permanente', texto: 'La principal: es la que más búsquedas tiene de las que anuncias.', busqueda: '"abogados incapacidad permanente"', foto: 'incapacidad-ventana-640' },
  { ruta: '/consulta/acoso-laboral', titulo: 'Acoso laboral', texto: 'Con el test de acoso dentro.', busqueda: '"abogado acoso laboral Madrid"', foto: 'acoso-tension-640' },
  { ruta: '/consulta/despido', titulo: 'Despidos', texto: 'Con la calculadora de indemnización dentro.', busqueda: '"abogado despido Madrid"', foto: 'despido-caja-640' },
];

function Flecha() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 17L17 7M9 7h8v8" />
    </svg>
  );
}

export function BloqueWeb() {
  return (
    <div className="ew">
      <a className="ew-grande" href="/" target="_blank" rel="noopener">
        <span>
          <small>La web nueva</small>
          <strong>Abrir la web nueva entera</strong>
          <em>Se abre en otra pestaña. Mejor en el móvil.</em>
        </span>
        <Flecha />
      </a>
      <div className="ew-rejilla">
        {WEB.map((t) => (
          <a key={t.ruta} className="ew-tarjeta" href={t.ruta} target="_blank" rel="noopener">
            <img src={`/img/${t.foto}.webp`} alt="" width={320} height={180} loading="lazy" />
            <span className="ew-texto">
              <strong>
                {t.titulo} <Flecha />
              </strong>
              <small>{t.texto}</small>
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}

export function BloqueLandings() {
  return (
    <div className="ew">
      <div className="ew-landings">
        {LANDINGS.map((t) => (
          <a key={t.ruta} className="ew-landing" href={t.ruta} target="_blank" rel="noopener">
            <img src={`/img/${t.foto}.webp`} alt="" width={320} height={180} loading="lazy" />
            <span className="ew-texto">
              <small>Para quien busca {t.busqueda}</small>
              <strong>
                {t.titulo} <Flecha />
              </strong>
              <span>{t.texto}</span>
              <b className="ew-boton">Abrir la página</b>
            </span>
          </a>
        ))}
      </div>
      <a className="ew-actual" href="https://tiernocentella.es/abogados-acoso-laboral-o-mobbing/" target="_blank" rel="noopener">
        <span>
          <small>Para comparar</small>
          <strong>Tu página actual del anuncio</strong>
          <em>Ábrela al lado de la nueva, mejor en el móvil.</em>
        </span>
        <Flecha />
      </a>
    </div>
  );
}

export function BloqueCorreosEnlace() {
  return (
    <div className="ew">
      <a className="ew-grande" href="/guia-jesus/correos" target="_blank" rel="noopener">
        <span>
          <small>Ejemplo completo · Acoso laboral</small>
          <strong>Ver los 8 correos de Laura, uno a uno</strong>
          <em>Cuándo llega cada uno, qué dice, sus fotos, su vídeo y sus botones. Se abre en otra pestaña.</em>
        </span>
        <Flecha />
      </a>
    </div>
  );
}

export function BloquePanelEnlace() {
  return (
    <div className="ew">
      <a className="ew-grande" href="/mesa-tc-6v9k3p" target="_blank" rel="noopener">
        <span>
          <small>Demostración · cifras de ejemplo y tus datos públicos</small>
          <strong>Ver tu mesa de control</strong>
          <em>Cómo va el despacho en diez segundos. La primera vez te la enseña una guía de 9 pasos cortos. Pensada para el móvil. Se abre en otra pestaña.</em>
        </span>
        <Flecha />
      </a>
      <a className="ew-grande" href="/guia-jesus/panel" target="_blank" rel="noopener">
        <span>
          <small>Demostración · datos de ejemplo</small>
          <strong>Ver todas las cifras, en ocho pestañas</strong>
          <em>Consultas, anuncios, Google, IA, redes, tu web, gastos y nuestro trabajo, con todo el detalle. Se abre en otra pestaña.</em>
        </span>
        <Flecha />
      </a>
    </div>
  );
}

export function BloqueLupaEnlace() {
  return (
    <div className="ew">
      <a className="ew-grande" href="/guia-jesus/mapa-calor" target="_blank" rel="noopener">
        <span>
          <small>Demostración · datos de ejemplo sobre tu propia web</small>
          <strong>Abrir la lupa de tu web</strong>
          <em>Dónde toca la gente, lo que toca y no funciona, hasta dónde baja y las conclusiones. Prueba también a dejarnos una nota. Se abre en otra pestaña.</em>
        </span>
        <Flecha />
      </a>
    </div>
  );
}

export function BloqueCrmEnlace() {
  return (
    <div className="ew">
      <a className="ew-grande" href="/guia-jesus/crm" target="_blank" rel="noopener">
        <span>
          <small>Funciona de verdad · modo prueba con datos inventados</small>
          <strong>Probar tu CRM</strong>
          <em>Da de alta una consulta, arrástrala de fase, apunta una llamada, mira los plazos de despido y qué canal te trae clientes. No rompes nada. Se abre en otra pestaña.</em>
        </span>
        <Flecha />
      </a>
    </div>
  );
}

export function BloqueRedesEnlace() {
  return (
    <div className="ew">
      <a className="ew-grande" href="/guia-jesus/redes" target="_blank" rel="noopener">
        <span>
          <small>Hoy y con nosotros · publicaciones de ejemplo</small>
          <strong>Ver cómo quedarían tu Facebook y tu LinkedIn</strong>
          <em>Tus páginas tal y como están hoy, al lado de cómo quedarían: una sola página por red, datos correctos y publicaciones cada semana. Se abre en otra pestaña.</em>
        </span>
        <Flecha />
      </a>
    </div>
  );
}
