// Lo que cuesta de verdad el servicio: qué es gratis, qué entra en la cuota y qué se paga aparte, solo si se quiere.
// Sin cifras de lo que paga hoy el despacho: no las sabemos y se las preguntamos (apartado 24).

const HOY = [
  'Quien te lleva la web y el SEO, con su factura',
  'Quien te lleva los anuncios de Google, con la suya (y la inversión en anuncios aparte)',
  'Si haces redes o diseño, otra persona más',
  'Cada cambio en la web, un presupuesto y una espera',
  'El alojamiento o servidor de la web (IONOS u otro) y su mantenimiento',
  'El correo del equipo (Google Workspace, Microsoft 365...)',
  'Informes: pocos, tarde o ninguno',
];

const GRATIS: [string, string][] = [
  ['Correos de seguimiento (Resend)', 'Hasta 3.000 correos al mes gratis: de sobra para un despacho'],
  ['WhatsApp Business', 'La aplicación es gratis: mensajes automáticos, respuestas rápidas y campañas de reseñas'],
  ['Google', 'Ficha de Google, Analytics, Search Console y Tag Manager'],
  ['Mapas de calor y grabaciones (Clarity)', 'Para ver cómo se mueve la gente por tu web'],
  ['Redes sociales', 'Instagram, LinkedIn, Facebook y TikTok, sin anuncios'],
  ['Reseñas', 'Responderlas y pedirlas no cuesta nada'],
  ['Sin plugins ni licencias', 'Formularios, calculadoras, cookies, SEO y chat están programados dentro de la web: nada que comprar'],
  ['El alojamiento de la web', 'En nuestro servidor. Puedes dejar de pagar el alojamiento actual, conservando tu dominio y tu correo'],
];

const INCLUIDO: [string, string, string[]][] = [
  ['Tu web', 'M3 4h18v12H3zM8 20h8M12 16v4', [
    'Publicarla en tu dominio y hacer el cambio sin perder visitas',
    'Todos los cambios que pidas: textos, fotos, precios, horarios, el mismo día',
    'Páginas nuevas cuando las necesites (un servicio, una campaña, un caso)',
    'Herramientas nuevas: calculadoras, tests, comprobadores',
    'Velocidad vigilada: que siga cargando en unos 3 segundos en el móvil',
    'Seguridad, sin plugins que actualizar ni licencias que pagar',
    'Cada versión de la web guardada: volver a la de hace un mes en minutos',
    'Que funcione en todos los móviles, tabletas y navegadores',
    'Accesibilidad: que la pueda usar todo el mundo',
    'La versión en inglés, al día',
    'Aviso de cookies, privacidad y textos legales actualizados',
  ]],
  ['SEO: que te encuentren en Google', 'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM21 21l-4.3-4.3', [
    'Investigación de lo que busca la gente, cada mes',
    'Tres artículos a la semana, con calendario editorial',
    'Guías actualizadas cuando cambia una ley o sale una sentencia',
    'Tus sentencias contadas, cada una en su página',
    'SEO técnico: mapa de la web, datos para Google, enlaces rotos, redirecciones',
    'Seguimiento de tu posición en las 50 búsquedas clave',
    'Search Console: errores, páginas indexadas y búsquedas',
    'SEO fuera de tu web: estrategia de enlaces, medios, universidades y colegios profesionales',
    'Elegir y negociar las notas de prensa, si decides comprarlas',
    'Directorios jurídicos con tus datos iguales en todas partes',
    'Bing: tu ficha, Bing Webmaster Tools y, si quieres, anuncios en Microsoft Advertising',
    'Alta y cuidado en Apple Maps, además de Google',
  ]],
  ['Que te recomienden las IA', 'M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 16.8l-6.2 4.5 2.4-7.4L2 9.4h7.6z', [
    'Textos que ChatGPT, Gemini y Google puedan citar',
    'La ficha para las IA (llms.txt), siempre al día',
    'Medir cada semana si las IA te nombran, con las 15 preguntas clave',
    'Revisar que lo que dicen de ti en internet sea correcto y coincida',
  ]],
  ['Anuncios (SEM)', 'M3 11v2a1 1 0 0 0 1 1h2l5 4V6L6 10H4a1 1 0 0 0-1 1zM15 9a3 3 0 0 1 0 6', [
    'Revisión de las campañas de Google Ads cada día',
    'Palabras clave, palabras negativas y pujas, semana a semana',
    'Textos de los anuncios y pruebas para quedarnos con el mejor',
    'Una página de aterrizaje para cada tipo de búsqueda',
    'Medir cuánto cuesta cada consulta, no cada clic',
    'Campaña de marca para que nadie se anuncie con tu nombre',
    'Anuncios en Instagram, Facebook y LinkedIn, si los quieres',
    'Vigilar lo que anuncia tu competencia',
  ]],
  ['Ficha de Google y reseñas', 'M12 22s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12z', [
    'Tu Perfil de Empresa al día: categorías, servicios, horario, fotos',
    'Una publicación a la semana en tu ficha',
    'Preguntas y respuestas de la ficha',
    'Respuesta a cada reseña, siempre con tu visto bueno',
    'Campañas de WhatsApp para pedir reseñas a cada cliente',
    'Código QR para la recepción y enlace directo a tu ficha',
  ]],
  ['Clientes y seguimiento', 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z', [
    'El asistente de IA 24 horas: lo mantenemos, lo entrenamos y lo mejoramos',
    'Leer las conversaciones del chat para saber qué pregunta la gente',
    'Correos de seguimiento con Resend para cada tema, escritos, enviados y medidos',
    'Secuencias nuevas cuando abras un servicio o una campaña',
    'Avisos de cada consulta con su origen y su tema',
    'WhatsApp Business configurado: bienvenida, respuestas rápidas y etiquetas',
    'Formularios que piden lo justo y avisan al momento',
  ]],
  ['Redes sociales', 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z', [
    'Calendario de publicaciones para Instagram, LinkedIn, Facebook y TikTok',
    'Ideas y guiones para tus vídeos',
    'Montaje de los vídeos que grabes: cortes, subtítulos y portada',
    'Diseño de publicaciones, carruseles e historias',
    'Programar y publicar',
    'Un tema, cuatro canales: cada artículo, también en redes',
  ]],
  ['Diseño', 'M12 19l7-7 3 3-7 7-3-3zM18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z', [
    'Imagen coherente en la web, las redes y los anuncios',
    'Banners, portadas y creatividades para campañas',
    'Tratamiento de tus fotos para que luzcan y carguen rápido',
    'Rediseño del logo cuando lo pidas, incluido',
    'El logo en todos sus formatos: web, redes, documentos y firma de correo',
  ]],
  ['Medición e informes', 'M3 3v18h18M7 15l4-4 3 3 5-6', [
    'Clarity: mapas de calor y grabaciones para ver cómo navega la gente',
    'Google Analytics y Tag Manager, bien configurados',
    'Cada llamada, WhatsApp, formulario y chat contado, con su origen',
    'Informes programados: diarios, semanales y mensuales',
    'Conexión a Instagram, Facebook, LinkedIn y Google Ads para los informes',
    'Un panel con todo conectado: web, SEO, anuncios, redes y reseñas',
    'Avisos por WhatsApp, correo o Slack, como prefieras',
    'Lo que cuesta cada cliente, por canal',
  ]],
  ['Mejora continua y estrategia', 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM16.2 7.8l-2.1 6.3-6.3 2.1 2.1-6.3z', [
    'Pruebas A/B: dos versiones y nos quedamos con la que trae más consultas',
    'Estudio de la competencia, cada trimestre',
    'Plan del mes siguiente según los datos',
    'Coordinar a todos los que tocan tu marketing, también fuera de la web',
    'Respuesta a lo que nos pidas, el mismo día',
  ]],
];

const COMO: [string, string, string, string][] = [
  ['Tu web', 'M3 4h18v12H3zM8 20h8M12 16v4', 'Cada cambio es un correo, un presupuesto y días de espera. La web tarda 18 segundos en cargar en el móvil y nadie la mejora.', 'Pides el cambio por WhatsApp y está hecho el mismo día. La web carga en 3 segundos y la mejoramos cada semana con datos.'],
  ['Google (SEO)', 'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM21 21l-4.3-4.3', 'Blog parado desde 2022, artículos que no son de tu especialidad y puesto 18 en "abogado laboralista madrid".', 'Tres artículos a la semana sobre lo que de verdad busca tu cliente, tus sentencias en su página y la posición vigilada cada día.'],
  ['Inteligencia artificial', 'M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 16.8l-6.2 4.5 2.4-7.4L2 9.4h7.6z', 'ChatGPT y Gemini casi nunca te nombran, y nadie lo mide.', 'Textos que las IA pueden citar, la ficha para IA al día y 15 preguntas medidas cada semana.'],
  ['Anuncios', 'M3 11v2a1 1 0 0 0 1 1h2l5 4V6L6 10H4a1 1 0 0 0-1 1zM15 9a3 3 0 0 1 0 6', 'Anuncios que llevan a una página genérica, sin saber qué consulta trae cada uno ni cuánto cuesta.', 'Una página por tipo de búsqueda, campañas revisadas cada día y el coste de cada consulta, no de cada clic.'],
  ['Reseñas', 'M12 22s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12z', '4,2 estrellas y ninguna reseña contestada.', 'Todas contestadas con tu visto bueno, campañas de WhatsApp para pedirlas y camino del 4,8.'],
  ['Quien te escribe', 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z', 'Fuera de horario nadie contesta, y quien deja sus datos y no reserva no vuelve a saber de ti.', 'Un asistente que atiende a cualquier hora y una serie de correos que le acompaña hasta que decide.'],
  ['Redes sociales', 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z', 'Buenos vídeos, pero a ratos: tres años de silencio en Instagram y dos cuentas de X abandonadas.', 'Calendario, guiones, montaje de tus vídeos y publicación constante en Instagram, LinkedIn, Facebook y TikTok.'],
  ['Datos e informes', 'M3 3v18h18M7 15l4-4 3 3 5-6', 'No sabes de dónde viene cada cliente ni dónde va cada euro.', 'Cada llamada, WhatsApp y formulario con su origen, e informes diarios, semanales y mensuales.'],
  ['Tu tiempo', 'M12 6v6l4 2M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z', 'Coordinar a varios proveedores, repetir lo mismo a cada uno y perseguir cada cambio.', 'Una sola persona de contacto. Tú apruebas; nosotros hacemos todo lo demás.'],
  ['Seguridad', 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z', 'WordPress con su panel abierto, plugins que actualizar y licencias que pagar. Si te hackean, días para limpiarlo.', 'Sin WordPress ni plugins. Cada versión de la web guardada: volvemos a la de hace un mes en minutos.'],
  ['SEO fuera de tu web', 'M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7', 'Se paga una cuota de SEO cada mes y aun así los enlaces que llegan suelen ser de poca calidad.', 'El trabajo de SEO va en la cuota. Si inviertes algo, es solo en notas de prensa o artículos en medios de calidad, y decides tú.'],
  ['Tu dinero', 'M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6', 'Varias facturas, presupuestos por cada cambio y sin saber qué rinde.', 'Una sola cuota, herramientas gratis y cada euro medido.'],
];

const NOCOBRAMOS = [
  'Responder tus reseñas',
  'Las campañas de WhatsApp para pedir reseñas',
  'Los correos de seguimiento',
  'Cada cambio en la web',
  'Una calculadora o herramienta nueva',
  'Diseñar una landing para una campaña',
  'Gestionar tus campañas de Google Ads',
  'Gestionar tus anuncios en redes',
  'El SEO, con las herramientas de IA que más rinden',
  'Tu posicionamiento, vigilado cada día',
  'Tu ficha de Google al día',
  'Tu ficha y tus campañas en Bing',
  'Que te recomienden las IA',
  'Un artículo de más',
  'Rediseñar el logo',
  'Un banner, un carrusel o un diseño',
  'Montar tus vídeos',
  'Tu panel de control en tiempo real',
  'Un informe extra',
  'Conectar una red o una herramienta nueva',
  'Mejorar el asistente de IA',
  'Una secuencia de correos nueva',
  'Pruebas para mejorar cada página',
  'Revisar a tu competencia',
  'Lo que se te ocurra',
];

const SEMANA: [string, string[]][] = [
  ['Cada día', ['Revisamos las campañas de anuncios', 'Leemos las consultas y las conversaciones del chat', 'Vigilamos que la web funcione y cargue rápido', 'Te pasamos las respuestas a las reseñas nuevas para tu visto bueno', 'Aviso inmediato si pasa algo importante']],
  ['Cada lunes', ['Informe de la semana en tu móvil: visitas, consultas y de dónde vienen', 'Lo que hemos cambiado y por qué', 'El plan de la semana']],
  ['Cada semana', ['Tres artículos nuevos en el blog', 'Publicaciones en tus redes y en tu ficha de Google', 'Ajuste de palabras y pujas en los anuncios', 'Cambios en la web según lo que vemos en Clarity']],
  ['Cada mes', ['Balance completo: Google, IA, anuncios, redes, reseñas y coste por cliente', 'Cómo te nombran las IA', 'Estudio rápido de la competencia', 'Plan del mes siguiente']],
  ['Cuando lo pidas', ['Cualquier cambio en la web, el mismo día', 'Una calculadora o herramienta nueva', 'Una página para una campaña', 'Una secuencia de correos nueva', 'Un rediseño del logo', 'Lo que necesites, sin presupuesto aparte']],
];

const TOTAL = INCLUIDO.reduce((a, [, , l]) => a + l.length, 0);

const APARTE: [string, string, string][] = [
  ['La inversión en anuncios', 'Lo que decidas', 'La pagas tú directamente a Google o a Meta, con tu tarjeta. No pasa por nosotros y lo ves todo.'],
  ['El asistente de IA, si sigue', 'Unos pocos euros al mes', 'Se paga por uso: unos céntimos por conversación. Con un tope de gasto que pones tú. Durante la prueba lo pagamos nosotros.'],
  ['Notas de prensa y artículos en medios', 'Solo si los quieres', 'Para conseguir enlaces de calidad hacia tu web. Te proponemos el medio y el precio antes, y no se compra nada sin tu visto bueno.'],
  ['Vídeos profesionales', 'Solo si los quieres', 'Con equipo de grabación, a través de una agencia audiovisual con la que trabajamos.'],
  ['Tu correo profesional', 'Lo que ya pagas', 'El correo del equipo (Google Workspace, Microsoft 365...) sigue igual y a tu nombre. Si quieres, revisamos si estás pagando de más.'],
  ['Alojamiento en una cuenta tuya', 'Unos 20 $ al mes', 'Solo si prefieres tener la web en tu propia cuenta de pago de Vercel en lugar de en la nuestra.'],
];

function Check() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

export default function CostesGuia() {
  return (
    <div className="cs">
      <div className="cs-frente">
        <div className="cs-hoy">
          <small>Hoy</small>
          <b>Varias facturas, y no siempre sabes qué pagas</b>
          <ul>
            {HOY.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
          <p>¿Cuánto suma todo al mes? Te lo preguntamos en el apartado 24, porque con esa cifra te enseñamos cuánto te ahorras.</p>
        </div>
        <div className="cs-luego">
          <small>Con nosotros</small>
          <b>Una sola cuota. Todo lo demás, incluido.</b>
          <p className="cs-grande">
            La cuota que acordemos <span>+</span> lo que quieras invertir en anuncios
          </p>
          <p>Las herramientas son gratis, los cambios en la web no se cobran aparte y no hay sorpresas a final de mes.</p>
        </div>
      </div>

      <div className="cs-promesa">
        <p className="cs-promesa-pregunta">&quot;¿Y luego me cobraréis aparte por…?&quot;</p>
        <p className="cs-promesa-no">No.</p>
        <p className="cs-promesa-texto">
          Cobramos una sola cuota y está <b>absolutamente todo incluido</b>. Puedes soñar y pedirnos lo que quieras: te lo haremos.
        </p>
        <ul className="cs-promesa-lista">
          {NOCOBRAMOS.map((x) => (
            <li key={x}>
              <span>{x}</span>
              <b>Incluido</b>
            </li>
          ))}
        </ul>
        <p className="cs-promesa-pie">
          Lo único que no es nuestro: lo que decidas invertir en anuncios (lo pagas tú directamente a Google o a Meta), el uso del asistente de IA si sigue
          (unos pocos euros al mes) y, solo si los quieres, las notas de prensa o artículos en medios para conseguir enlaces de calidad y los vídeos profesionales con equipo de grabación.
        </p>
      </div>

      <div className="cs-como">
        <div className="cs-como-cabeza">
          <span />
          <b className="cs-como-hoy-t">Cómo lo haces hoy</b>
          <b className="cs-como-luego-t">Cómo lo harías con nosotros</b>
        </div>
        {COMO.map(([area, icono, hoy, luego]) => (
          <div key={area} className="cs-como-fila">
            <span className="cs-como-area">
              <span className="cs-icono" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                  <path d={icono} />
                </svg>
              </span>
              {area}
            </span>
            <span className="cs-como-hoy">
              <small>Hoy</small>
              {hoy}
            </span>
            <span className="cs-como-luego">
              <small>Con nosotros</small>
              {luego}
            </span>
          </div>
        ))}
      </div>

      <div className="cs-coordina">
        <div className="cs-coordina-hoy">
          <small>Hoy</small>
          <b>Varios proveedores que no se hablan entre ellos</b>
          <span>
            El SEO no sabe qué anuncia el de Google Ads, el diseñador no ve los datos y nadie mira la web con los ojos de quien llega desde un anuncio. Cada uno
            hace lo suyo, y el resultado de todo junto es peor de lo que podría ser.
          </span>
        </div>
        <div className="cs-coordina-luego">
          <small>Con nosotros</small>
          <b>Todo conectado, y por eso funciona mejor</b>
          <span>
            Lo que vemos en Clarity cambia la página del anuncio; lo que pregunta la gente en el chat se convierte en artículo; la búsqueda que más consultas
            trae recibe más presupuesto. Un solo equipo que ve todo, y un resultado mejor.
          </span>
        </div>
      </div>

      <p className="cs-titulo">
        <span className="cs-paso">1</span><span className="cs-chip cs-azul">Tu semana con nosotros</span> Lo que pasa cada día, cada semana y cada mes
      </p>
      <div className="cs-semana">
        {SEMANA.map(([cuando, cosas]) => (
          <div key={cuando} className="cs-dia">
            <b>{cuando}</b>
            <ul>
              {cosas.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="cs-conexiones">
        <b>Todo conectado en un mismo panel</b>
        <span>
          Nos conectamos a tu Instagram, Facebook, LinkedIn, Google Ads, Analytics, Search Console, tu ficha de Google, Clarity y los correos, y lo juntamos
          todo en tus informes. Y te avisamos por donde prefieras: WhatsApp, correo o Slack.
        </span>
      </div>

      <p className="cs-titulo">
        <span className="cs-paso">2</span><span className="cs-chip cs-azul">Incluido en la cuota</span> Todo lo que hacemos por ti: {TOTAL} tareas
      </p>
      <div className="cs-incluido">
        {INCLUIDO.map(([t, icono, l]) => (
          <div key={t}>
            <b className="cs-area">
              <span className="cs-icono" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                  <path d={icono} />
                </svg>
              </span>
              {t}
              <em>{l.length}</em>
            </b>
            <ul>
              {l.map((x) => (
                <li key={x}>
                  <Check />
                  {x}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p className="cs-titulo">
        <span className="cs-paso">3</span><span className="cs-chip cs-verde">Gratis</span> Las herramientas que usamos para ti
      </p>
      <div className="cs-gratis">
        {GRATIS.map(([t, d]) => (
          <div key={t}>
            <Check />
            <span>
              <b>{t}</b>
              <small>{d}</small>
            </span>
          </div>
        ))}
      </div>

      <p className="cs-titulo">
        <span className="cs-paso">4</span><span className="cs-chip cs-ambar">Aparte, y solo si quieres</span> Lo único que no entra en la cuota
      </p>
      <div className="cs-aparte">
        {APARTE.map(([t, p, d]) => (
          <div key={t}>
            <span className="cs-aparte-cabeza">
              <b>{t}</b>
              <em>{p}</em>
            </span>
            <small>{d}</small>
          </div>
        ))}
      </div>
    </div>
  );
}
