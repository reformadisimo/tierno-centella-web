'use client';

import { BloqueWeb, BloqueLandings, BloqueCorreosEnlace, BloquePanelEnlace, BloqueCrmEnlace, BloqueRedesEnlace } from './EnlacesGuia';
import RedesHoyLuego from './RedesGuia';
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
import CuestionarioGuia from './CuestionarioGuia';
import AnunciosGuia from './AnunciosGuia';
import OficiosGuia from './OficiosGuia';
import { BloqueAccesos, BloqueConexiones, BloquePrompts, BloqueRedes } from './LogosGuia';
import { MockupAvisoChat, MockupFicha, MockupIA, MockupInforme, MockupCorreos, MockupResenaWhatsApp, MockupVelocidad } from './MockupsGuia';

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
const DOLORES: { titulo: string; icono: string; hoy: string; hoyDato: string; luego: string; luegoDato: string; visto: string; cuesta: string; ayudamos: string; ancla?: string }[] = [
  {
    titulo: 'Tu web tarda en cargar',
    icono: 'M12 6v6l4 2M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z',
    hoyDato: '18,3 s',
    hoy: 'hasta ver el contenido en el móvil (49 sobre 100)',
    luegoDato: '3,2 s',
    luego: 'en la web nueva (94 sobre 100)',
    visto: 'Hemos medido tu web con las herramientas de Google y de Pingdom: en el móvil tarda más de 18 segundos en enseñar lo importante.',
    cuesta: 'Quien busca un abogado con prisa no espera tanto: se vuelve a Google y entra en el siguiente. Google, además, coloca peor a las webs lentas.',
    ayudamos: 'La web nueva ya carga en unos 3 segundos y saca 94 de velocidad. Nos comprometemos a 100 en todo y a menos de 2 segundos.',
    ancla: '12',
  },
  {
    titulo: 'Tu web está más expuesta de lo que parece',
    icono: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
    hoyDato: 'WordPress',
    hoy: 'con su panel abierto, plugins que actualizar y licencias que pagar',
    luegoDato: 'Cada versión',
    luego: 'guardada: volver a la web de hace un mes en minutos',
    visto: 'Tu web actual está hecha con WordPress, como muchas. Es el sistema que más se ataca en internet: tiene un panel de entrada conocido por todos y depende de plugins de terceros que hay que actualizar sin parar (y muchos se pagan cada año).',
    cuesta: 'Un plugin sin actualizar basta para que entren. Y si entran, limpiar un WordPress hackeado lleva días, cuesta dinero y mientras tanto la web puede caerse o enseñar cosas que no son tuyas. Nadie está libre de un ataque, pero no todas las webs son igual de fáciles de atacar.',
    ayudamos: 'La web nueva no tiene panel de WordPress ni plugins: no hay nada que actualizar ni licencias que pagar. Cada cambio queda guardado, así que podemos volver a la web de hace un mes, tres o cuatro en unos minutos. Si algo pasa, se arregla en el momento.',
    ancla: '12',
  },
  {
    titulo: 'Google casi no te enseña',
    icono: 'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM21 21l-4.3-4.3',
    hoyDato: '239',
    hoy: 'visitas al mes desde Google, un 38 % menos que en julio',
    luegoDato: '2.500',
    luego: 'nuestro objetivo a 12 meses (el nivel de Abogados Durán)',
    visto: 'García de la Santa recibe 9.164 visitas al mes y Campmany casi 70.000. Tú estás en la segunda página para "abogado laboralista madrid".',
    cuesta: 'Cada mes, miles de personas que buscan justo lo que tú haces encuentran antes a otro despacho. No porque sea mejor: porque Google le conoce más.',
    ayudamos: '47 guías y artículos nuevos, tres artículos a la semana, las 220 direcciones antiguas redirigidas y un trabajo constante de SEO medido cada mes.',
    ancla: '4 bis',
  },
  {
    titulo: 'Las IA no te recomiendan',
    icono: 'M12 2a4 4 0 0 1 4 4v2a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4zM4 22a8 8 0 0 1 16 0',
    hoyDato: '14',
    hoy: 'sobre 100 de visibilidad en ChatGPT, Gemini y Google',
    luegoDato: '+30',
    luego: 'nuestro objetivo a un año, el nivel de Abogados Durán',
    visto: 'Cuando alguien pregunta a ChatGPT por un abogado de acoso laboral en Madrid, casi nunca te nombra. A Campmany o a Bufete Toro, sí.',
    cuesta: 'Cada vez más gente pregunta a la IA antes que a Google. Si la IA no te conoce, para esa persona no existes.',
    ayudamos: 'Textos que las IA pueden citar, los mismos datos en todas partes, alta en Bing y en directorios jurídicos, y medición mensual.',
    ancla: '4 bis',
  },
  {
    titulo: 'Reseñas sin contestar',
    icono: 'M12 2l3 6.5 7 .9-5 4.8 1.2 7L12 18l-6.2 3.2 1.2-7-5-4.8 7-.9L12 2z',
    hoyDato: '4,2',
    hoy: '59 reseñas: 44 de cinco estrellas, pero 11 de una sin responder',
    luegoDato: '4,5',
    luego: 'objetivo en un año, con todas respondidas',
    visto: 'Hemos leído las 59. Casi ninguna mala discute tu trabajo: hablan del precio que no esperaban o de que nadie les contestó.',
    cuesta: 'Las estrellas se ven antes que tu web y que tus sentencias. Mucha gente descarta por debajo de 4,5, y una mala sin respuesta pesa el doble.',
    ayudamos: 'Responderlas todas (te mandamos cada respuesta para que la apruebes), pedir la reseña a cada cliente por WhatsApp al cerrar su asunto y arreglar lo que provoca las malas.',
    ancla: '5',
  },
  {
    titulo: 'Tus redes hablan de un despacho de 2017',
    icono: 'M7 10v12M15 5.9 14 10h5.8a2 2 0 0 1 1.9 2.6l-2.3 7a2 2 0 0 1-1.9 1.4H7V10l4.3-7.7A2 2 0 0 1 15 3.6z',
    hoyDato: '2017',
    hoy: 'última publicación de una de tus páginas de Facebook, con el piso y el teléfono mal',
    luegoDato: '1 + 1',
    luego: 'una sola página de Facebook y una de LinkedIn, al día cada semana',
    visto: 'Tienes dos páginas de Facebook y tres de LinkedIn (visto el 25 de octubre de 2026). Una de Facebook lleva nueve años sin publicar y pone "6.º C" y un teléfono antiguo; las tres de LinkedIn no tienen ni una publicación, con 458 seguidores repartidos entre ellas.',
    cuesta: 'Quien te busca en Facebook puede pensar que el despacho ha cerrado, o llamar a un número viejo. Y en LinkedIn, donde están los trabajadores en activo, las empresas y los colegios, no ven nada tuyo. Google y las IA tampoco saben cuál es la página buena.',
    ayudamos: 'Unificamos las páginas, corregimos los datos y publicamos cada semana en las dos redes con lo que ya tienes: el blog, las sentencias, los vídeos y las jornadas. Respondemos mensajes y comentarios, y lo medimos en tu panel.',
    ancla: '6',
  },
  {
    titulo: '"Consulta gratuita" que no lo es',
    icono: 'M12 9v4M12 17h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z',
    hoyDato: '3',
    hoy: 'reseñas de una estrella por un precio que no esperaban',
    luegoDato: '0',
    luego: 'mensajes contradictorios: precio claro en todas partes',
    visto: 'Tu web actual dice en contacto "consulta inicial gratuita" y en la tienda la cita cuesta 150 euros. Algún anuncio también habla de "gratis".',
    cuesta: 'Atrae a quien no va a pagar y deja a quien sí, enfadado. Y esas reseñas espantan a los siguientes.',
    ayudamos: 'La web nueva explica el precio antes de reservar. Quitamos "gratis" de los anuncios y revisamos otras webs y directorios.',
    ancla: '4',
  },
  {
    titulo: 'Tus anuncios pagan clics que se pierden',
    icono: 'M3 3v18h18M7 14l4-4 4 4 5-6',
    hoyDato: '1',
    hoy: 'página genérica para todos los anuncios, sin formulario a la vista',
    luegoDato: '3',
    luego: 'páginas por tema, pensadas para que llamen',
    visto: 'Tus anuncios casi no se ven: en 12 meses, Semrush solo los ha detectado en 7 búsquedas y en meses sueltos. Y cuando salen, llevan a una página de acoso aunque la persona busque incapacidad, y no se sabe qué anuncio trae cada cliente.',
    cuesta: 'Pagas cada clic, y una parte se va sin llamar porque no encuentra lo que buscaba.',
    ayudamos: 'Ya tienes tres páginas nuevas: incapacidad, acoso y despido. Con acceso a tu cuenta, medimos cuánto cuesta cada consulta y quitamos lo que no funciona.',
    ancla: '18 bis',
  },
  {
    titulo: 'Las herramientas no ayudaban',
    icono: 'M4 4h16v16H4zM8 8h8M8 12h8M8 16h5',
    hoyDato: '3',
    hoy: 'tests que pedían datos antes de dar nada',
    luegoDato: '14',
    luego: 'calculadoras y tests gratuitos, sin dejar datos',
    visto: 'El test de viabilidad de tu web pide el teléfono antes de orientar, y la persona se queda sin saber qué le pasa ni qué plazo tiene.',
    cuesta: 'Quien está asustado no da su teléfono a ciegas: se va a la web que sí le ayuda primero.',
    ayudamos: 'Ya hay 14: indemnización, plazos, test de acoso, mapa de pruebas, incapacidad y más. Ayudan primero y llevan a llamarte.',
    ancla: '11',
  },
  {
    titulo: 'Quien te escribe y no contrata, se pierde',
    icono: 'M4 4h16v16H4zM4 6l8 7 8-7',
    hoyDato: '0 correos',
    hoy: 'después de que alguien deja sus datos o se va sin decidirse',
    luegoDato: '7 correos',
    luego: 'en el momento justo, según su caso, durante su decisión',
    visto: 'Hoy, cuando alguien rellena el formulario o se va de la web sin reservar, no vuelve a saber del despacho hasta que alguien le llama, si le llaman.',
    cuesta: 'Muchas consultas no se pierden porque digan que no, sino porque nadie les vuelve a escribir mientras comparan con otros despachos. Y alguna acaba en una reseña de "no me contestaron".',
    ayudamos: 'En cuanto deja sus datos, recibe por correo, con Resend y desde tu dominio, una serie de mensajes que preparamos para su tema: el acuse al momento, sus pasos, su plazo, cómo trabajáis y un caso parecido. Tú revisas los textos y medimos cuántos acaban en consulta.',
    ancla: '17',
  },
  {
    titulo: 'No sabes de dónde vienen tus clientes',
    icono: 'M12 20V10M18 20V4M6 20v-4',
    hoyDato: 'Sin medir',
    hoy: 'llamadas y WhatsApp que llegan desde la web',
    luegoDato: '100 %',
    luego: 'de llamadas, WhatsApp y formularios con su origen',
    visto: 'Tu web actual tiene Analytics, pero no vemos que cuente las llamadas ni los WhatsApp, ni desde qué página o anuncio llegan.',
    cuesta: 'Sin datos, las decisiones se toman a ciegas: se paga lo que no funciona y se deja de hacer lo que sí.',
    ayudamos: 'La web nueva cuenta cada llamada, WhatsApp, formulario y conversación del chat, y te lo contamos en un informe sencillo cada semana.',
    ancla: '19',
  },
  {
    titulo: 'No sabes dónde va cada euro que inviertes',
    icono: 'M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6',
    hoyDato: 'A ciegas',
    hoy: 'sin informes de anuncios, redes, SEO ni visitas',
    luegoDato: 'Cada día',
    luego: 'informes diarios, semanales y mensuales de todo',
    visto: 'Hoy inviertes en Google Ads, y quizá en Instagram o Facebook, pero no hay un informe que diga qué campaña trae clientes, cuál no, qué mensaje funciona mejor ni cuánto te cuesta cada consulta.',
    cuesta: 'Sin esos datos se sigue pagando lo que no funciona y no se refuerza lo que sí. Cada euro que no sabes dónde va es un euro que puede estar perdiéndose.',
    ayudamos: 'Con nosotros sabrás dónde va cada euro: Analytics, SEO, Google Ads, Instagram y Facebook, con informes diarios, semanales y mensuales. Qué convierte, qué no, y lo que cambiamos para que rinda más.',
    ancla: '19',
  },
  {
    titulo: 'Demasiados proveedores para tu marketing',
    icono: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8',
    hoyDato: '5 o 6',
    hoy: 'proveedores: SEO, anuncios, diseñador, programador, redes...',
    luegoDato: '1',
    luego: 'un solo proveedor que lo hace todo, con informes diarios, semanales y mensuales',
    visto: 'Lo normal en un despacho es tener un SEO, alguien para los anuncios, un diseñador, un programador para la web y otra persona para las redes. Cada uno con su factura, sus plazos y su informe.',
    cuesta: 'Tu tiempo, sobre todo: coordinar a todos, repetir lo mismo a cada uno y esperar a que uno termine para que empiece el siguiente. Y cuando algo no funciona, nadie es responsable del todo.',
    ayudamos: 'Con nosotros trabajas con un solo proveedor, de forma sencilla: lo hacemos todo para darte el menor trabajo posible, con informes diarios, semanales y mensuales. Lo único que no hacemos es grabar vídeos, y para eso te damos guiones, los montamos y tenemos una agencia audiovisual si hace falta.',
    ancla: '25',
  },
  {
    titulo: '¿Tienes tú las llaves de todo?',
    icono: 'M15 7a4 4 0 1 1-3.9 5H9v2H7v2H4v-3l5.1-5.1A4 4 0 0 1 15 7z',
    hoyDato: '¿?',
    hoy: '¿tienes a tu nombre la web, el dominio, Analytics, Google Ads y tus redes?',
    luegoDato: '100 %',
    luego: 'todo a tu nombre, con acceso total y desde el primer día',
    visto: 'No lo sabemos, y por eso te lo preguntamos. Es muy habitual que la web, el dominio o las cuentas de anuncios estén a nombre del proveedor de turno, y que el despacho no pueda entrar sin pedir permiso.',
    cuesta: 'Si quien tiene las claves es otro, cambiar de proveedor se convierte en pedir favores: claves, accesos, historiales que se pierden. Y mientras, no ves lo que se hace con tu dinero.',
    ayudamos: 'Con nosotros todo está a tu nombre y tú tienes el acceso total, siempre. Nosotros entramos como invitados. Si un día quieres dejarlo, no tienes que pedirnos nada: ya lo tienes todo.',
    ancla: '8 bis',
  },
];

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
  { area: 'Tu web', color: 'rojo', hoy: '18 segundos en cargar en el móvil, 49 sobre 100 de velocidad, "consulta gratuita" que no lo es.', haremos: 'Hecho: 94 de velocidad, 14 herramientas, asistente, precio claro.' },
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
  'crm-enlace': BloqueCrmEnlace,
  'redes-hoy-luego': RedesHoyLuego,
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

// Si quien prueba la guía es Ignacio (?yo=1), no se envía nada: así sus pruebas no llegan como si fueran de Jesús.
const esYo = () => {
  try {
    return !!localStorage.getItem('tc-guia-yo');
  } catch {
    return false;
  }
};
const avisar = (datos: Record<string, string>) =>
  esYo()
    ? Promise.resolve(true)
    : fetch('/api/respuestas', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(datos), keepalive: true })
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
              <img src={`/img/${s.foto}-640.webp`} srcSet={`/img/${s.foto}-640.webp 640w, /img/${s.foto}.webp 1200w`} sizes="(max-width: 900px) 100vw, 760px" alt="" loading="lazy" />
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
