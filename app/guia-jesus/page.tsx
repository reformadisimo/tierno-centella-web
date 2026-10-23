import type { Metadata } from 'next';
import fs from 'node:fs';
import path from 'node:path';
import { marked } from 'marked';
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
  ['BrightLocal, Local Consumer Review Survey 2026 (reseñas y confianza)', 'https://www.brightlocal.com/research/local-consumer-review-survey/'],
  ['BrightLocal, estudio de visibilidad local en IA (septiembre de 2026)', 'https://www.brightlocal.com/research/local-ai-visibility-study/'],
  ['Estatuto General de la Abogacía Española (RD 135/2021), arts. 19 y 20: publicidad', 'https://noticias.juridicas.com/base_datos/Laboral/692644-real-decreto-135-2021-de-2-de-marzo-por-el-que-se-aprueba-el-estatuto-general.html'],
  ['Código Deontológico de la Abogacía Española (2019), arts. 5, 6 y 21', 'https://vlex.es/vid/codigo-deontologico-abogacia-174147'],
  ['Ofertas de la competencia: Bufete Toro, Campmany, García de la Santa, Labormind, acoso-laboral.es y Arpa Legal (revisadas en octubre de 2026)', 'https://www.bufetetoro.com/abogados-laboralistas-madrid/'],
  ['Estudio de competencia: Bufete Toro, Campmany, García de la Santa, Jover Marben, Pedraza Laboral', 'https://www.bufetetoro.com/abogados-acoso-laboral-madrid/'],
];

// Cada apartado: su foto, una frase cercana y su grupo del índice. El detalle va plegado para que la guía se lea fácil.
type Extra = { foto: string; frase: string; grupo: string; abierta?: boolean };
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
  '9': { foto: 'reunion-equipo', frase: 'Un guiño a las trabajadoras que se convierte en servicio.', grupo: 'web' },
  '10': { foto: 'abogado-joven', frase: 'Como hablar con ChatGPT, pero de tu despacho.', grupo: 'web' },
  '11': { foto: 'calculadora-papeles', frase: 'Herramientas que casi nadie del sector tiene.', grupo: 'web' },
  '12': { foto: 'fachada', frase: 'Tu web, el doble de rápida. Y se nota.', grupo: 'web' },
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
  '20': { foto: 'empresas-firma', frase: 'Tu logo de siempre, un poco más fino.', grupo: 'web' },
  '21': { foto: 'documento-pluma', frase: 'Un cambio sin sustos: tus clientes y Google ni lo notan.', grupo: 'seguir' },
  '22': { foto: 'manos-unidas', frase: 'Lo que pasará en los próximos meses, sin promesas vacías.', grupo: 'seguir' },
  '23': { foto: 'reunion-cliente', frase: 'Cinco minutos tuyos, y nosotros hacemos el resto.', grupo: 'seguir' },
  '24': { foto: 'abogada-escucha', frase: 'Unas preguntas cortas para afinar. Contesta solo las que quieras.', grupo: 'seguir', abierta: true },
  '25': { foto: 'jesus-retrato', frase: 'La web es tuya. Lo demás, cuando quieras.', grupo: 'seguir', abierta: true },
  '26': { foto: 'libros', frase: 'De dónde sale cada dato.', grupo: 'seguir' },
};

function secciones(): SeccionGuia[] {
  let md = fs.readFileSync(path.join(process.cwd(), 'content/guia/guia-jesus.md'), 'utf8');
  md = md.replace('FUENTES', FUENTES.map(([t, u]) => `- [${t}](${u})`).join('\n'));
  return md
    .split(/^## /m)
    .filter((b) => b.trim())
    .map((b) => {
      const [titulo, ...resto] = b.split('\n');
      const cuerpo = resto.join('\n');
      const id = titulo
        .normalize('NFD')
        .replace(/[̀-ͯ]/g, '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
      const html = (marked.parse(cuerpo, { async: false }) as string).replace(/<a href="http/g, '<a target="_blank" rel="noopener" href="http');
      const clave = titulo.match(/^(\d+(?: bis| ter)?)\./)?.[1] ?? 'inicio';
      const extra = EXTRA[clave] ?? { foto: 'biblioteca', frase: '', grupo: 'seguir' };
      return {
        id,
        titulo: titulo.trim(),
        html,
        texto: cuerpo.replace(/[#*|>_\-[\]()]/g, ' '),
        foto: extra.foto,
        frase: extra.frase,
        grupo: GRUPOS[extra.grupo],
        claveGrupo: extra.grupo,
        abierta: !!extra.abierta,
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
        <GuiaJesus secciones={secciones()} />
      </div>
    </>
  );
}
