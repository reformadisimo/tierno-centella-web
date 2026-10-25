// Facebook y LinkedIn de Tierno Centella: cómo están hoy (visto el 25 de octubre de 2026) y cómo quedarían.
// Las publicaciones de "con nosotros" son ejemplos hechos con contenidos reales de la web; cada una lo dice.
// Los estilos están en app/guia-redes.css (prefijo rd-).

const PATH = {
  pin: 'M12 22s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12zM12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z',
  tel: 'M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z',
  megusta: 'M7 10v12M15 5.9 14 10h5.8a2 2 0 0 1 1.9 2.6l-2.3 7a2 2 0 0 1-1.9 1.4H7V10l4.3-7.7A2 2 0 0 1 15 3.6z',
  comentario: 'M21 12a8 8 0 0 1-11.6 7.1L4 20.5l1.4-5A8 8 0 1 1 21 12z',
  compartir: 'M4 12v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7M16 6l-4-4-4 4M12 2v13',
  play: 'M8 5v14l11-7z',
  aviso: 'M12 9v4M12 17h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z',
  check: 'M20 6 9 17l-5-5',
  mensaje: 'M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zM2.5 7l9.5 6 9.5-6',
  calendario: 'M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zM16 2v4M8 2v4M3 10h18',
  enlace: 'M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7',
  maletin: 'M4 7h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2zM8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M2 13h20',
  birrete: 'M2 9l10-5 10 5-10 5zM6 11.5V16c0 1.5 3 3 6 3s6-1.5 6-3v-4.5M22 9v6',
  micro: 'M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3zM19 10v2a7 7 0 0 1-14 0v-2M12 19v3M8 22h8',
  libro: 'M2 4h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 4h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z',
};

function I({ d, tam = 16, relleno = false }: { d: string; tam?: number; relleno?: boolean }) {
  return (
    <svg width={tam} height={tam} viewBox="0 0 24 24" fill={relleno ? 'currentColor' : 'none'} stroke={relleno ? 'none' : 'currentColor'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

const LogoFb = ({ tam = 18 }: { tam?: number }) => (
  <svg width={tam} height={tam} viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="12" fill="#1877f2" />
    <path fill="#fff" d="M13.4 20v-6.4h2.2l.3-2.6h-2.5V9.4c0-.7.2-1.3 1.3-1.3h1.3V5.8c-.2 0-1-.1-2-.1-2 0-3.3 1.2-3.3 3.4V11H8.5v2.6h2.2V20z" />
  </svg>
);

const LogoIn = ({ tam = 18 }: { tam?: number }) => (
  <svg width={tam} height={tam} viewBox="0 0 24 24" aria-hidden="true">
    <rect width="24" height="24" rx="4" fill="#0a66c2" />
    <path fill="#fff" d="M7.6 18.5H5V9.6h2.6zM6.3 8.4a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM19 18.5h-2.6v-4.3c0-1 0-2.4-1.5-2.4s-1.7 1.1-1.7 2.3v4.4H10.6V9.6h2.5v1.2a2.8 2.8 0 0 1 2.5-1.4c2.7 0 3.2 1.8 3.2 4.1z" />
  </svg>
);

// Avatar del despacho tal y como se ve en sus páginas: círculo azul con "TC".
function AvatarTC({ tam = 56 }: { tam?: number }) {
  return (
    <span className="rd-avatar" style={{ width: tam, height: tam, fontSize: tam * 0.4 }} aria-hidden="true">
      TC
    </span>
  );
}

function Ventana({ red, tono, titulo, children }: { red: 'fb' | 'in'; tono: 'hoy' | 'luego'; titulo: string; children: React.ReactNode }) {
  return (
    <figure className={`rd-figura rd-${tono}`}>
      <div className={`rd-ventana rd-${red}`}>
        <div className="rd-barra">
          {red === 'fb' ? <LogoFb /> : <LogoIn />}
          <span className="rd-barra-busca">{red === 'fb' ? 'Buscar en Facebook' : 'Buscar'}</span>
          <span className="rd-barra-puntos" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
        </div>
        {children}
      </div>
      <figcaption>{titulo}</figcaption>
    </figure>
  );
}

function Acciones() {
  return (
    <div className="rd-acciones" aria-hidden="true">
      <span>
        <I d={PATH.megusta} tam={14} /> Me gusta
      </span>
      <span>
        <I d={PATH.comentario} tam={14} /> Comentar
      </span>
      <span>
        <I d={PATH.compartir} tam={14} /> Compartir
      </span>
    </div>
  );
}

// ---------- Facebook ----------

export function FacebookHoy() {
  return (
    <Ventana red="fb" tono="hoy" titulo="Hoy: la página que encuentra quien te busca en Facebook lleva nueve años parada y tiene el piso y el teléfono mal.">
      <div className="rd-portada rd-portada-gris" />
      <div className="rd-cabecera">
        <AvatarTC />
        <div>
          <b>Tierno Centella Abogados</b>
          <small>161 seguidores · 0 seguidos</small>
        </div>
      </div>
      <div className="rd-datos">
        <p>Abogado especialista en Acoso Laboral y Asesoría de Centros Educativos, y Tercer Sector</p>
        <p className="rd-mal">
          <I d={PATH.pin} tam={14} /> C/Jorge Juan, 78-6ºC. 28009 Madrid <em>piso equivocado</em>
        </p>
        <p className="rd-mal">
          <I d={PATH.tel} tam={14} /> Tel. 917 826 854 / 608 139 337 <em>número antiguo</em>
        </p>
      </div>
      <div className="rd-aviso-rojo">
        <I d={PATH.aviso} tam={16} />
        <span>
          Última publicación: <b>30 de agosto de 2017</b>. Hace nueve años.
        </span>
      </div>
      <article className="rd-post rd-post-viejo">
        <header>
          <AvatarTC tam={34} />
          <div>
            <b>Tierno Centella Abogados</b>
            <small>30 de agosto de 2017</small>
          </div>
        </header>
        <p>Los trabajadores pueden cobrar las dietas aunque no presenten factura por los gastos https://t.co/... vía @CincoDiascom</p>
        <div className="rd-enlace-viejo">
          <small>CINCODIAS.ELPAIS.COM</small>
          <b>Los trabajadores pueden cobrar las dietas aunque no presenten factura por los gastos</b>
        </div>
        <Acciones />
      </article>
      <div className="rd-nota-dos">
        <b>Y hay otra página más</b>, con 285 seguidores, que publica de tarde en tarde y casi siempre repite los vídeos de Instagram. Dos páginas, ninguna al día.
      </div>
    </Ventana>
  );
}

const POSTS_FB: { tipo: string; titulo: string; texto: string; foto: string; cuando: string; video?: boolean }[] = [
  {
    tipo: 'Artículo del blog',
    cuando: 'Esta semana',
    titulo: 'Cómo denunciar el acoso laboral, paso a paso',
    texto: '¿Sabías que hay cinco vías para denunciar el acoso en el trabajo? Te contamos en qué orden usarlas y cómo protegerte de las represalias. Léelo en tiernocentella.es.',
    foto: 'documentos-mesa',
  },
  {
    tipo: 'Sentencia del despacho',
    cuando: 'Hace 3 días',
    titulo: '123.000 euros para una catedrática a la que su universidad no protegió',
    texto: 'La Universidad Rey Juan Carlos fue condenada a pagar 122.963 euros por no evitar el acoso laboral que sufría una catedrática ni aplicar medidas de prevención. Te contamos por qué importa.',
    foto: 'mazo',
  },
  {
    tipo: 'Vídeo de Instagram',
    cuando: 'Hace 6 días',
    titulo: '¿Qué pruebas necesito para acreditar el acoso laboral?',
    texto: 'Un minuto con Jesús Tierno: qué pruebas sirven de verdad y cuáles conviene empezar a guardar desde hoy.',
    foto: 'jesus-mesa',
    video: true,
  },
];

export function FacebookLuego() {
  return (
    <Ventana red="fb" tono="luego" titulo="Con nosotros: una sola página, con tus datos bien, viva cada semana y conectada con la web. Ejemplo de cómo quedaría.">
      <div className="rd-portada">
        <img src="/img/equipo-640.webp" alt="" width={640} height={360} loading="lazy" />
      </div>
      <div className="rd-cabecera">
        <AvatarTC />
        <div>
          <b>Tierno Centella Abogados</b>
          <small>Una sola página · Abogados laboralistas en Madrid</small>
        </div>
        <span className="rd-etiqueta">Ejemplo de cómo quedaría</span>
      </div>
      <div className="rd-datos">
        <p>Abogados laboralistas: acoso laboral, despido e incapacidad permanente. Más de 25 años defendiendo a trabajadoras y trabajadores.</p>
        <p className="rd-bien">
          <I d={PATH.pin} tam={14} /> Calle de Jorge Juan, 78, 5.º C · 28009 Madrid
        </p>
        <p className="rd-bien">
          <I d={PATH.tel} tam={14} /> 913 24 97 97 · info@tiernocentella.es
        </p>
      </div>
      <div className="rd-botones">
        <span className="rd-boton rd-boton-azul">
          <I d={PATH.mensaje} tam={14} /> Enviar mensaje
        </span>
        <span className="rd-boton">
          <I d={PATH.tel} tam={14} /> Llamar
        </span>
        <span className="rd-boton">
          <I d={PATH.calendario} tam={14} /> Pedir cita
        </span>
      </div>
      {POSTS_FB.map((p) => (
        <article key={p.titulo} className="rd-post">
          <header>
            <AvatarTC tam={34} />
            <div>
              <b>Tierno Centella Abogados</b>
              <small>
                {p.cuando} · <span className="rd-tipo">{p.tipo}</span>
              </small>
            </div>
            <span className="rd-ejemplo">Ejemplo</span>
          </header>
          <p>{p.texto}</p>
          <div className={`rd-tarjeta-enlace${p.video ? ' rd-video' : ''}`}>
            <img src={`/img/${p.foto}-640.webp`} alt="" width={640} height={360} loading="lazy" />
            {p.video && (
              <span className="rd-play" aria-hidden="true">
                <I d={PATH.play} tam={22} relleno />
              </span>
            )}
            <div>
              <small>{p.video ? 'INSTAGRAM.COM' : 'TIERNOCENTELLA.ES'}</small>
              <b>{p.titulo}</b>
            </div>
          </div>
          <Acciones />
        </article>
      ))}
    </Ventana>
  );
}

// ---------- LinkedIn ----------

const PAGINAS_IN: [string, string, string][] = [
  ['TIERNO CENTELLA ABOGADOS', '80 seguidores', 'La que sigue Jesús'],
  ['Tierno Centella', '224 seguidores', 'La que más seguidores tiene'],
  ['Tierno Centella Abogados', '154 seguidores', '"Jesús trabaja aquí"'],
];

export function LinkedinHoy() {
  return (
    <Ventana red="in" tono="hoy" titulo="Hoy: tres páginas de empresa, 458 seguidores repartidos y ni una sola publicación en ninguna.">
      <div className="rd-in-tres">
        {PAGINAS_IN.map(([n, s, q]) => (
          <div key={n} className="rd-in-mini">
            <div className="rd-portada rd-portada-gris rd-portada-mini" />
            <AvatarTC tam={40} />
            <b>{n}</b>
            <small>Despachos de abogados · Madrid</small>
            <small>{s} · 2-10 empleados</small>
            <em>{q}</em>
            <span className="rd-sin">
              <I d={PATH.aviso} tam={13} /> Sin publicaciones
            </span>
          </div>
        ))}
      </div>
      <div className="rd-aviso-rojo">
        <I d={PATH.aviso} tam={16} />
        <span>
          <b>458 seguidores</b> que te eligieron, repartidos en tres escaparates vacíos. Tu perfil personal, con 2.371 seguidores, publica muy poco.
        </span>
      </div>
    </Ventana>
  );
}

const POSTS_IN: { tipo: string; titulo: string; texto: string; foto: string; cuando: string }[] = [
  {
    tipo: 'Sentencia contada',
    cuando: 'Esta semana',
    titulo: 'La primera condena en España a la empresa y al acosador a la vez (2005)',
    texto: 'Un trabajador sufrió durante tres años el hostigamiento de su directora general. El juzgado condenó a la empresa y a la directora, de forma solidaria. Hasta entonces se reclamaba solo a la empresa: esta sentencia hizo responder también a la persona que acosa.',
    foto: 'mazo',
  },
  {
    tipo: 'Jornada',
    cuando: 'Hace 4 días',
    titulo: 'Jornadas sobre acoso laboral en la Universidad Pontificia Comillas',
    texto: 'Jesús Tierno participó como ponente en las jornadas organizadas por AMYTS, SAE y SIETeSS para profesionales sanitarios y de la enseñanza. Gracias a quienes os acercasteis a preguntar al terminar.',
    foto: 'reunion-oficina',
  },
  {
    tipo: 'Para empresas',
    cuando: 'Hace 1 semana',
    titulo: 'Tres cosas que debe tener el protocolo de acoso de tu empresa',
    texto: 'Un canal claro para comunicar lo que pasa, plazos para actuar y medidas para proteger a quien lo cuenta. Si no sabes si el tuyo las cumple, en nuestra web tienes un autodiagnóstico para empresas y colegios.',
    foto: 'empresas-firma',
  },
];

export function LinkedinLuego() {
  return (
    <Ventana red="in" tono="luego" titulo="Con nosotros: una sola página de empresa, al día cada semana, para los trabajadores, las empresas y los colegios. Ejemplo de cómo quedaría.">
      <div className="rd-portada">
        <img src="/img/biblioteca-640.webp" alt="" width={640} height={360} loading="lazy" />
      </div>
      <div className="rd-cabecera">
        <AvatarTC />
        <div>
          <b>Tierno Centella Abogados</b>
          <small>Despacho de abogados laboralistas · Madrid · Una sola página</small>
        </div>
        <span className="rd-etiqueta">Ejemplo de cómo quedaría</span>
      </div>
      <div className="rd-datos">
        <p>
          <b>Acerca de.</b> Despacho especializado en derecho laboral: acoso laboral, despido e incapacidad permanente. Defendemos a trabajadoras y trabajadores y asesoramos a empresas y centros educativos en protocolos y formación. Calle de Jorge Juan, 78, Madrid.
        </p>
      </div>
      <div className="rd-botones">
        <span className="rd-boton rd-boton-in">+ Seguir</span>
        <span className="rd-boton">
          <I d={PATH.mensaje} tam={14} /> Enviar mensaje
        </span>
        <span className="rd-boton">
          <I d={PATH.enlace} tam={14} /> tiernocentella.es
        </span>
      </div>
      {POSTS_IN.map((p) => (
        <article key={p.titulo} className="rd-post">
          <header>
            <AvatarTC tam={34} />
            <div>
              <b>Tierno Centella Abogados</b>
              <small>
                {p.cuando} · <span className="rd-tipo">{p.tipo}</span>
              </small>
            </div>
            <span className="rd-ejemplo">Ejemplo</span>
          </header>
          <p>
            <b>{p.titulo}.</b> {p.texto}
          </p>
          <div className="rd-tarjeta-enlace">
            <img src={`/img/${p.foto}-640.webp`} alt="" width={640} height={360} loading="lazy" />
            <div>
              <small>TIERNOCENTELLA.ES</small>
              <b>{p.titulo}</b>
            </div>
          </div>
          <Acciones />
        </article>
      ))}
    </Ventana>
  );
}

// El perfil personal de Jesús, como quedaría. Solo con lo que ya cuenta la web.
export function PerfilJesus() {
  return (
    <figure className="rd-figura rd-luego rd-perfil-figura">
      <div className="rd-ventana rd-in">
        <div className="rd-barra">
          <LogoIn />
          <span className="rd-barra-busca">Buscar</span>
          <span className="rd-barra-puntos" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
        </div>
        <div className="rd-portada rd-portada-perfil">
          <img src="/img/biblioteca-640.webp" alt="" width={640} height={360} loading="lazy" />
        </div>
        <div className="rd-perfil-cabecera">
          <img className="rd-perfil-foto" src="/img/jesus-retrato-640.webp" alt="Jesús Tierno Centella" width={96} height={96} loading="lazy" />
          <span className="rd-etiqueta">Ejemplo de cómo quedaría</span>
          <b>Jesús Tierno Centella</b>
          <p className="rd-perfil-titular">Abogado laboralista · Socio director de Tierno Centella Abogados · Acoso laboral, despido e incapacidad permanente</p>
          <small>Madrid · 2.371 seguidores · Más de 500 contactos</small>
        </div>
        <div className="rd-perfil-seccion">
          <b>Acerca de</b>
          <p>
            Más de 25 años defendiendo a trabajadoras y trabajadores. En 2005 conseguimos en el Juzgado de lo Social n.º 29 de Madrid la primera sentencia en España que condenó a la vez a la empresa y a la persona que acosaba. Coautor, con el psicólogo Bernabé Tierno, de «Valores en el trabajo» (2002). Si sufres acoso, te han despedido o te han denegado una incapacidad, en tiernocentella.es tienes guías y herramientas para empezar.
          </p>
        </div>
        <div className="rd-perfil-seccion">
          <b>Experiencia</b>
          <ul className="rd-perfil-lista">
            <li>
              <I d={PATH.maletin} tam={18} />
              <span>
                <b>Socio director</b>
                <small>Tierno Centella Abogados · Madrid · Más de 25 años</small>
              </span>
            </li>
            <li>
              <I d={PATH.birrete} tam={18} />
              <span>
                <b>Colaboración con el Prácticum del Grado en Derecho</b>
                <small>Universidad Carlos III de Madrid</small>
              </span>
            </li>
            <li>
              <I d={PATH.micro} tam={18} />
              <span>
                <b>Ponente y entrevistado</b>
                <small>Onda Cero, «Por fin» con Jaime Cantizano (2024) · Jornadas de la Universidad Pontificia Comillas (2026) · Dos conversaciones con el psicólogo Iñaki Piñuel</small>
              </span>
            </li>
            <li>
              <I d={PATH.libro} tam={18} />
              <span>
                <b>Licenciado en Derecho</b>
                <small>Universidad de Alcalá</small>
              </span>
            </li>
          </ul>
        </div>
        <article className="rd-post">
          <header>
            <img className="rd-post-foto" src="/img/jesus-retrato-640.webp" alt="" width={34} height={34} loading="lazy" />
            <div>
              <b>Jesús Tierno Centella</b>
              <small>Esta semana · Publicación</small>
            </div>
            <span className="rd-ejemplo">Ejemplo</span>
          </header>
          <p>
            Me lo preguntan mucho: «Ya no trabajo allí, ¿todavía puedo denunciar el acoso que sufrí?». Sí. Aunque ya no trabajes en la empresa, todavía puedes denunciar el acoso que sufriste. Lo explico en un minuto en este vídeo, y en la web tienes el mapa de pruebas para saber qué tienes ya y qué te falta.
          </p>
          <div className="rd-tarjeta-enlace rd-video">
            <img src="/img/jesus-mesa-640.webp" alt="" width={640} height={360} loading="lazy" />
            <span className="rd-play" aria-hidden="true">
              <I d={PATH.play} tam={22} relleno />
            </span>
            <div>
              <small>TIERNOCENTELLA.ES</small>
              <b>Aunque ya no trabajes en la empresa, todavía puedes denunciar el acoso que sufriste</b>
            </div>
          </div>
          <Acciones />
        </article>
      </div>
      <figcaption>Tu perfil personal, como quedaría: tu trayectoria contada entera, y una publicación a la semana escrita con tu voz. Ejemplo.</figcaption>
    </figure>
  );
}

// Lo que se ve en la guía: Facebook y LinkedIn, hoy y con nosotros.
export default function RedesHoyLuego() {
  return (
    <div className="rd">
      <div className="rd-par">
        <FacebookHoy />
        <FacebookLuego />
      </div>
      <div className="rd-par">
        <LinkedinHoy />
        <LinkedinLuego />
      </div>
    </div>
  );
}
