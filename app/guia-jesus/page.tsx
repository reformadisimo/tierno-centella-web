import { enlazarGuia } from '@/lib/enlaces-guia';
import type { Metadata } from 'next';
import fs from 'node:fs';
import { videoDeFoto } from '@/lib/video-foto';
import path from 'node:path';
import { marked } from 'marked';
import BotonPdfPortada from '@/components/BotonPdfPortada';
import GuiaJesus, { type SeccionGuia } from '@/components/GuiaJesus';

// Página privada: no se indexa, no está en el menú ni en el mapa del sitio.
export const metadata: Metadata = {
  title: 'Guía para Jesús Tierno',
  description: 'Tu web nueva, explicada sin prisas.',
  robots: { index: false, follow: false },
};

const FUENTES: [string, string][] = [
  ['PageSpeed Insights de Google (mediciones del 23/10/2026)', 'https://pagespeed.web.dev/'],
  ['Pingdom Website Speed Test, desde Londres (mediciones del 23/10/2026)', 'https://tools.pingdom.com/'],
  ['Semrush AI Visibility: proyecto tiernocentella.es (datos del 22/10/2026)', 'https://www.semrush.com/ai-seo/overview/?q=tiernocentella.es'],
  ['Ficha de Google de Tierno Centella Abogados (59 reseñas leídas el 23/10/2026)', 'https://www.google.com/maps/place/Tierno+Centella+Abogados/'],
  ['Instagram del despacho', 'https://www.instagram.com/tiernocentella_abogados/'],
  ['LinkedIn de Jesús Tierno Centella', 'https://www.linkedin.com/in/jes%C3%BAs-tierno-centella-13ba92188/'],
  ['Facebook del despacho', 'https://www.facebook.com/TiernoCentellaAbogados/'],
  ['X: @TiernoCentella1 y @tiernocentella', 'https://x.com/TiernoCentella1'],
  ['Web actual del despacho', 'https://tiernocentella.es/'],
  ['El Español, 2 de abril de 2024: la URJC condenada a pagar 123.000 euros', 'https://www.elespanol.com/reportajes/20240402/universidad-rey-juan-carlos-condenada-pagar-eur-docente-no-evitar-acoso-laboral/844415900_0.html'],
  ['Moncloa.com, 23 de octubre de 2023 (nota sobre el despacho)', 'https://www.moncloa.com/2023/10/23/tierno-centella-sobre-la-indemnizacion-por-acoso-laboral-2247028/'],
  ['Real Decreto-ley 9/2025: permisos por nacimiento de 19 semanas (resumen de El Español)', 'https://www.elespanol.com/malaga/20260808/entro-vigor-trabajador-derecho-disfrutar-permiso-semanas-nacimiento-adopcion-trt/1003744346242_0.html'],
  ['Transparencia retributiva: estado de la transposición (PwC, julio de 2026)', 'https://periscopiofiscalylegal.pwc.es/por-fin-la-trasposicion-de-la-directiva-de-transparencia-retributiva/'],
  ['Prestación por desempleo 2026: porcentajes y topes (MutuaFácil)', 'https://mutuafacil.es/guias-y-recursos/cuanto-se-cobra-de-paro/'],
  ['Adaptación de jornada tras el RDL 5/2023 (Lo Entiendo)', 'https://loentiendo.com/?p=72242'],
  ['Novedades laborales de marzo y abril de 2026, con las SSTS 62, 126, 159 y 169/2026 (Pérez-Llorca)', 'https://www.perezllorca.com/wp-content/uploads/2026/05/2603-2604-Newsletter-Laboral.pdf'],
  ['Semrush: datos de posicionamiento de tiernocentella.es y competidores (base de datos de España, 23/10/2026)', 'https://www.semrush.com/analytics/overview/?db=es&q=tiernocentella.es'],
  ['Internet República, Situación de los buscadores en 2025 (Merca2, 22/04/2025): las búsquedas en ChatGPT, menos del 1 % del volumen de Google', 'https://www.merca2.es/2025/04/22/radiografia-de-los-buscadores-en-2025-la-ia-crece-pero-google-sigue-mandando-segun-internet-republica-2183432/'],
  ['Conversión de las visitas que llegan desde la IA: Similarweb 2026 (11,4 % frente a 5,3 %) y Semrush (4,4 veces), resumen comparado', 'https://dev.to/mr_manushukla/ai-search-converts-23x-44x-or-215x-what-the-2026-studies-mean-for-your-geo-budget-5h0k'],
  ['StatCounter: cuota de mercado de los buscadores en España, septiembre de 2026 (Bing 3,49 %; 11,72 % en ordenador)', 'https://gs.statcounter.com/search-engine-market-share/all/spain'],
  ['Microsoft Ads frente a Google Ads: coste por clic y por conversión (resumen de WordStream y Merkle, 2026)', 'https://searchlab.nl/en/statistics/microsoft-ads-statistics-2026'],
  ['BrightLocal, Local Consumer Review Survey 2026 (reseñas y confianza)', 'https://www.brightlocal.com/research/local-consumer-review-survey/'],
  ['Skeepers, Informe de los consumidores 2025: el 89 % de los españoles consulta reseñas (ESdiario, 10/03/2025)', 'https://www.esdiario.com/economia/250310/154547/90-ciento-espanoles-leen-resenas-online-comprar.html'],
  ['Google Search Central: la experiencia en la página y las Core Web Vitals en los sistemas de clasificación', 'https://developers.google.com/search/docs/appearance/page-experience'],
  ['Think with Google: el 53 % de las visitas móviles se abandonan si la página tarda más de 3 segundos', 'https://www.thinkwithgoogle.com/consumer-insights/consumer-trends/mobile-site-load-time-statistics/'],
  ['Portent: la velocidad de la web y la conversión (100 millones de visitas)', 'https://www.portent.com/blog/analytics/research-site-speed-hurting-everyones-revenue.htm'],
  ['HTTP Archive, Web Almanac 2025: capítulo de rendimiento (Core Web Vitals en móvil)', 'https://almanac.httparchive.org/en/2025/performance'],
  ['W3Techs: uso de WordPress en las webs del mundo (2026)', 'https://w3techs.com/technologies/details/cm-wordpress'],
  ['Patchstack: State of WordPress Security in 2026', 'https://patchstack.com/whitepaper/state-of-wordpress-security-in-2026/'],
  ['Cronoshare: cuánto cuesta una agencia de marketing digital (SEO, SEM, redes y diseño web)', 'https://www.cronoshare.com/cuanto-cuesta/agencia-marketing-digital'],
  ['Cyberclick: cuánto cuesta contratar una agencia de Google Ads en España en 2026', 'https://www.cyberclick.es/numerical-blog/cuanto-cuesta-contratar-una-agencia-google-ads-en-espana'],
  ['Trustlocal: cuánto cuesta hacer una página web y su mantenimiento', 'https://trustlocal.es/coste/diseno-web-coste/'],
  ['Clientify: precio de un CRM en España (agosto de 2026)', 'https://clientify.com/blog/crm/precio-de-un-crm'],
  ['RaftLabs: cuánto cuesta desarrollar un CRM a medida en 2026', 'https://www.raftlabs.com/blog/crm-development-cost'],
  ['BrightLocal, estudio de visibilidad local en IA (septiembre de 2026)', 'https://www.brightlocal.com/research/local-ai-visibility-study/'],
  ['Estatuto General de la Abogacía Española (RD 135/2021), arts. 19 y 20: publicidad', 'https://noticias.juridicas.com/base_datos/Laboral/692644-real-decreto-135-2021-de-2-de-marzo-por-el-que-se-aprueba-el-estatuto-general.html'],
  ['Código Deontológico de la Abogacía Española (2019), arts. 5, 6 y 21', 'https://vlex.es/vid/codigo-deontologico-abogacia-174147'],
  ['Ofertas de la competencia: Bufete Toro, Campmany, García de la Santa, Labormind, acoso-laboral.es y Arpa Legal (revisadas en octubre de 2026)', 'https://www.bufetetoro.com/abogados-laboralistas-madrid/'],
  ['Estudio de competencia: Bufete Toro, Campmany, García de la Santa, Jover Marben, Pedraza Laboral', 'https://www.bufetetoro.com/abogados-acoso-laboral-madrid/'],
];

// Cada apartado: su foto, una frase cercana y su grupo del índice. El detalle va plegado para que la guía se lea fácil.
type Extra = { foto: string; frase: string; grupo: string; abierta?: boolean };

// Dónde estás hoy y dónde podemos estar, en una línea, para los apartados donde hay algo que mejorar.
const FRANJAS: Record<string, { hoy: string; luego: string }> = {
  '25 bis': { hoy: 'Varios proveedores, varias facturas, y cada cambio con su presupuesto', luego: 'Una sola cuota: herramientas gratis y todo el trabajo incluido' },
  '4': { hoy: '18,3 segundos en cargar en el móvil, 49 sobre 100 y "consulta gratuita" que no lo es', luego: '3,2 segundos, 94 sobre 100 y el precio claro desde el principio' },
  '4 bis': { hoy: '239 visitas al mes desde Google (un 38 % menos que en julio) y 14 sobre 100 en las IA', luego: 'Objetivo a un año: unas 2.500 visitas al mes y más de 30 en las IA' },
  '5': { hoy: '4,2 estrellas, ninguna reseña contestada y el 31 % de la gente solo contrata con 4,5 o más', luego: 'Todas respondidas con tu aprobación, campañas de WhatsApp y camino del 4,8' },
  '6': { hoy: 'Instagram con un parón de 2021 a 2024 y dos cuentas de X abandonadas', luego: 'Un ritmo constante: reels con tus casos, LinkedIn para colegios e instituciones' },
  '7': { hoy: 'García de la Santa recibe 38 veces más visitas que tú', luego: 'Ser el despacho de referencia en acoso laboral en Madrid' },
  '7 bis': { hoy: 'Casi todos tus competidores dicen "gratis" y tu precio no se explica', luego: 'Qué incluye tu consulta, contado mejor que nadie' },
  '10': { hoy: 'Fuera de horario nadie contesta a quien te escribe', luego: 'Un asistente 24 horas que guarda cada conversación y te pasa las llamadas' },
  '11': { hoy: '3 tests que piden el teléfono antes de ayudar', luego: '18 herramientas que ayudan primero y llevan a llamarte' },
  '12': { hoy: '49 de velocidad en el móvil, y WordPress con plugins que actualizar', luego: '94 de velocidad, 100 en accesibilidad y cada versión de la web guardada' },
  '13': { hoy: 'Segunda página para "abogado laboralista madrid"', luego: 'Primera página, con constancia y datos' },
  '14': { hoy: 'Blog parado desde 2022 y 104 artículos fuera de tu especialidad', luego: 'Tres artículos a la semana sobre lo que de verdad busca la gente' },
  '17': { hoy: 'Sin seguimiento: quien escribe y no reserva suele perderse', luego: 'Cada contacto con su seguimiento por correo, medido' },
  '18 bis': { hoy: 'Tus anuncios salen en 7 búsquedas al año; Bufete Toro, en 100', luego: 'Una campaña constante en acoso e incapacidad, con cada euro medido' },
  '8 bis': { hoy: '¿Tienes tú las claves de la web, el dominio y tus cuentas? Muchas veces las tiene el proveedor', luego: 'Todo a tu nombre y con tu acceso total: si un día te vas, no nos pides nada' },
  '19': { hoy: 'Sin informes: no sabes dónde va cada euro', luego: 'Informes diarios, semanales y mensuales de todo' },
  '23 bis': { hoy: 'Muchos piden la facturación y las cuentas antes de empezar', luego: 'Solo una cifra aproximada: lo que os deja de media un asunto' },
};
const GRUPOS: Record<string, string> = {
  empezar: 'Para empezar',
  hoy: 'Dónde estás hoy',
  web: 'Tu web nueva',
  google: 'Que te encuentren',
  clientes: 'Clientes y campañas',
  seguir: 'Cómo seguimos',
};
const EXTRA: Record<string, Extra> = {
  inicio: { foto: 'equipo', frase: 'Jesús, bienvenido. Aquí está todo, contado con calma.', grupo: 'empezar', abierta: true },
  '1': { foto: 'jesus-mesa', frase: 'Lo importante, en lo que tardas en tomarte un café.', grupo: 'empezar', abierta: true },
  '2': { foto: 'portatil-manos', frase: 'Las palabras raras, explicadas como a un amigo.', grupo: 'empezar' },
  '3': { foto: 'placa', frase: 'Lo más difícil ya lo tienes: muchos años de buen trabajo.', grupo: 'hoy' },
  '4': { foto: 'hombre-estres', frase: 'Tu web actual te está costando clientes. Tiene arreglo.', grupo: 'hoy' },
  '4 bis': { foto: 'trabajador-portatil', frase: 'Lo que ven Google y las IA cuando alguien pregunta por ti.', grupo: 'hoy' },
  '5': { foto: 'recepcion', frase: 'Tu ficha de Google es tu escaparate. Vamos a sacarle brillo.', grupo: 'hoy' },
  '6': { foto: 'equipo-pasillo', frase: 'Tienes muchas historias que contar. Las redes son el altavoz.', grupo: 'hoy' },
  '7': { foto: 'libros-derecho', frase: 'Mirar a los demás sirve para saber dónde brillar.', grupo: 'hoy' },
  '7 bis': { foto: 'mujer-pensativa', frase: 'Todos dicen "gratis". Tú tienes algo mejor que contar.', grupo: 'hoy' },
  '8': { foto: 'despacho-mesa', frase: 'Una web pensada para quien lo está pasando mal en su trabajo.', grupo: 'web' },
  '8 bis': { foto: 'abogada-documentos', frase: 'Veinticinco oficios distintos, un solo proveedor.', grupo: 'web' },
  '9': { foto: 'reunion-equipo', frase: 'Un guiño a las trabajadoras que se convierte en servicio.', grupo: 'web' },
  '10': { foto: 'abogado-joven', frase: 'Como hablar con ChatGPT, pero de tu despacho.', grupo: 'web' },
  '11': { foto: 'calculadora-papeles', frase: 'Herramientas que casi nadie del sector tiene.', grupo: 'web' },
  '12': { foto: 'fachada', frase: 'Tu web, el doble de rápida y mucho más segura.', grupo: 'web' },
  '13': { foto: 'biblioteca', frase: 'Cómo llegar el primero, en Google y en las IA.', grupo: 'google' },
  '13 bis': { foto: 'documentos-mesa', frase: 'Datos de verdad para escribir textos que funcionan.', grupo: 'google' },
  '14': { foto: 'abogada-lee', frase: '220 artículos revisados uno a uno, sin perder nada por el camino.', grupo: 'google' },
  '15': { foto: 'papeleria', frase: 'Tres artículos a la semana, ya pensados para ti.', grupo: 'google' },
  '16': { foto: 'mazo', frase: 'Tus sentencias, contadas para que cualquiera las entienda.', grupo: 'google' },
  '17': { foto: 'acuerdo', frase: 'Que nadie que te escriba se quede sin respuesta.', grupo: 'clientes' },
  '18': { foto: 'reunion-oficina', frase: 'Llegar a quien te necesita, y a quien puede recomendarte.', grupo: 'clientes' },
  '18 bis': { foto: 'sala-reuniones', frase: 'Ya inviertes en anuncios. Vamos a que rindan más.', grupo: 'clientes' },
  '18 ter': { foto: 'firma-contrato', frase: 'Páginas hechas para que quien llega, llame.', grupo: 'clientes' },
  '19': { foto: 'jesus-con-abogada', frase: 'Todo medido, para mejorar un poco cada semana.', grupo: 'clientes' },
  '19 bis': { foto: 'jesus-camisa', frase: 'Tu web nunca se queda quieta: cada semana, un poco mejor.', grupo: 'clientes' },
  '20': { foto: 'empresas-firma', frase: 'Tu logo de siempre, un poco más fino.', grupo: 'clientes' },
  '21': { foto: 'documento-pluma', frase: 'Un cambio sin sustos: lo llevamos nosotros y tú mantienes el control de todo.', grupo: 'seguir' },
  '22': { foto: 'manos-unidas', frase: 'Lo que pasará en los próximos meses, sin promesas vacías.', grupo: 'seguir' },
  '22 bis': { foto: 'jesus-con-abogada', frase: 'Lo que creemos que se puede conseguir, con cifras honestas y sin promesas.', grupo: 'seguir' },
  '22 ter': { foto: 'biblioteca', frase: 'Lo que hacen los mejores despachos del mundo, y lo que hemos traído para ti.', grupo: 'seguir' },
  '23': { foto: 'reunion-cliente', frase: 'Un cuarto de hora tuyo, y nosotros hacemos el resto.', grupo: 'seguir' },
  '23 bis': { foto: 'calculadora-papeles', frase: 'Ni facturación ni cuentas: solo una cifra, y siempre bajo tu control.', grupo: 'seguir' },
  '24': { foto: 'abogada-escucha', frase: 'Unas preguntas cortas para afinar. Contesta solo las que quieras.', grupo: 'seguir', abierta: true },
  '24 bis': { foto: 'abogada-sonrie', frase: 'Tus preguntas y nuestras respuestas, todo en un mismo sitio.', grupo: 'seguir', abierta: true },
  '25': { foto: 'jesus-retrato', frase: 'La web es tuya. Lo demás, cuando quieras.', grupo: 'seguir', abierta: true },
  '25 bis': { foto: 'calculadora-papeles', frase: 'Una sola cuota. Todo lo demás, incluido.', grupo: 'seguir' },
  '26': { foto: 'libros', frase: 'De dónde sale cada dato.', grupo: 'seguir' },
};

function secciones(): SeccionGuia[] {
  let md = fs.readFileSync(path.join(process.cwd(), 'content/guia/guia-jesus.md'), 'utf8');
  md = md.replace('FUENTES', FUENTES.map(([t, u]) => `- [${t}](${u})`).join('\n'));
  const bloques = md.split(/^## /m).filter((b) => b.trim());
  const idDe = (t: string) =>
    t
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  const claves: Record<string, string> = {};
  for (const b of bloques) {
    const t = b.split('\n')[0];
    const c = t.match(/^(\d+(?: bis| ter)?)\./)?.[1];
    if (c) claves[c] = idDe(t);
  }
  return bloques
    .map((b) => {
      const [titulo, ...resto] = b.split('\n');
      const cuerpo = resto.join('\n');
      const id = titulo
        .normalize('NFD')
        .replace(/[̀-ͯ]/g, '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
      const html = enlazarGuia(
        (marked.parse(cuerpo, { async: false }) as string).replace(/<a href="(http|\/)/g, '<a target="_blank" rel="noopener" href="$1'),
        claves,
        id,
      );
      const clave = titulo.match(/^(\d+(?: bis| ter)?)\./)?.[1] ?? 'inicio';
      const extra = EXTRA[clave] ?? { foto: 'biblioteca', frase: '', grupo: 'seguir' };
      return {
        id,
        titulo: titulo.trim(),
        html,
        texto: cuerpo.replace(/[#*|>_\-[\]()]/g, ' '),
        foto: extra.foto,
        video: videoDeFoto(extra.foto) ?? undefined,
        frase: extra.frase,
        grupo: GRUPOS[extra.grupo],
        claveGrupo: extra.grupo,
        abierta: !!extra.abierta,
        franja: FRANJAS[clave],
      };
    });
}

export default function Pagina() {
  return (
    <>
      <header className="gj-portada" id="indice-guia">
        <img className="gj-portada-foto" src="/img/equipo.webp" srcSet="/img/equipo-640.webp 640w, /img/equipo-960.webp 960w, /img/equipo.webp 1600w" sizes="100vw" alt="" />
        <div className="contenedor">
          <img src="/img/logo-tc-blanco.webp" alt="Tierno Centella Abogados" width={260} height={62} />
          <a className="gj-ver-web" href="/" target="_blank" rel="noopener">
            <span>
              <strong>Lo primero: tu web nueva, tierno-centella-web.vercel.app</strong>
              <small>Ábrela en el móvil y pregúntale algo al chat, como si fueras un cliente. Todo lo que cuenta esta guía está hecho y puedes probarlo ya.</small>
            </span>
            <span className="boton boton-marcador">Ver mi web</span>
          </a>
          <h1>Jesús, esta es tu web nueva. Te la contamos sin prisas.</h1>
          <p className="gj-portada-gancho">
            Hoy te encuentran en Google <strong>239 personas al mes</strong>. A García de la Santa, <strong>9.164</strong>. Te contamos por qué, lo
            que ya hemos hecho y todo lo que podemos mejorar juntos.
          </p>
          <p>Para Jesús Tierno Centella, con cariño. Octubre de 2026.</p>
          <div className="gj-portada-botones">
            <a className="boton boton-marcador" href="#indice">
              Ver el índice de la guía
            </a>
            <a className="boton gj-boton-claro" href="#empieza-aqui-tu-guia-en-5-minutos">
              Empezar a leer
            </a>
            <BotonPdfPortada />
          </div>
          <ul className="gj-portada-cifras">
            <li>
              <strong>94</strong> de velocidad en móvil (antes 49)
            </li>
            <li>
              <strong>14</strong> herramientas para tus clientes
            </li>
            <li>
              <strong>3</strong> páginas nuevas para tus anuncios
            </li>
            <li>
              <strong>220</strong> artículos antiguos, redirigidos uno a uno
            </li>
          </ul>
        </div>
      </header>
      <div className="contenedor">
        <GuiaJesus secciones={secciones()} actualizada={new Intl.DateTimeFormat('es-ES', { day: 'numeric', month: 'long', timeZone: 'Europe/Madrid' }).format(new Date())} />
      </div>
    </>
  );
}
