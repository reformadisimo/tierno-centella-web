// Los 25 oficios que hacen falta para una web y un marketing como los de Jesús, en tarjetas con icono.
// Iconos genéricos (trazos sencillos), uno por oficio, en los colores de la guía.

const I: Record<string, string> = {
  diseno: 'M12 2l3 7h7l-5.5 4.5L18.5 21 12 16.5 5.5 21l2-7.5L2 9h7z',
  ux: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01',
  codigo: 'M8 6l-6 6 6 6M16 6l6 6-6 6',
  calculadora: 'M5 2h14v20H5zM8 6h8M8 11h2M14 11h2M8 15h2M14 15h2M8 19h2M14 19h2',
  ia: 'M12 2a4 4 0 0 1 4 4v1a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3v-6a3 3 0 0 1 3-3V6a4 4 0 0 1 4-4zM9 13h.01M15 13h.01',
  pluma: 'M12 19l7-7 3 3-7 7-3-3zM18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5zM2 2l7.6 7.6',
  lupa: 'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM21 21l-4.3-4.3',
  engranaje: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z',
  pin: 'M12 22s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12zM12 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4z',
  chispa: 'M12 2v4M12 18v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M2 12h4M18 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8',
  megafono: 'M3 11v2a1 1 0 0 0 1 1h2l5 4V6L6 10H4a1 1 0 0 0-1 1zM15 9a3 3 0 0 1 0 6M18 6a7 7 0 0 1 0 12',
  diana: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12zM12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z',
  camara: 'M3 7h4l2-3h6l2 3h4v13H3zM12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
  grafica: 'M3 3v18h18M7 15l4-4 3 3 5-6',
  rayo: 'M13 2L3 14h8l-1 8 10-12h-8z',
  prismaticos: 'M6 18a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM18 18a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM10 14h4M6 10V5h4M18 10V5h-4',
  balanza: 'M12 3v18M5 21h14M6 7l-3 7h6zM18 7l-3 7h6zM6 7h12',
  bocadillo: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z',
  check: 'M22 11.1V12a10 10 0 1 1-5.9-9.1M22 4L12 14l-3-3',
  brujula: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM16.2 7.8l-2.1 6.3-6.3 2.1 2.1-6.3z',
  escudo: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
  globo: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20',
  estrella: 'M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z',
  movil: 'M7 2h10v20H7zM11 18h2',
  probeta: 'M9 2h6M10 2v6l-5 10a2 2 0 0 0 1.8 3h10.4a2 2 0 0 0 1.8-3L14 8V2M7 15h10',
};

const OFICIOS: [string, string, string][] = [
  ['diseno', 'Diseño gráfico', 'La imagen, los colores, las fotos y el logo refinado'],
  ['ux', 'Experiencia de usuario', 'Que quien llega angustiado encuentre en dos toques qué hacer'],
  ['codigo', 'Programación web', 'Una web rápida, segura y que funciona en cualquier móvil'],
  ['calculadora', 'Herramientas a medida', 'Las 22 calculadoras y tests'],
  ['ia', 'Inteligencia artificial', 'El asistente que conoce toda tu web y atiende a cualquier hora'],
  ['pluma', 'Redacción jurídica', 'Guías y artículos claros, con plazos y fuentes, sin jerga'],
  ['lupa', 'SEO de contenidos', 'Qué busca la gente, para escribir lo que de verdad se lee'],
  ['engranaje', 'SEO técnico', 'Datos para Google, mapa de la web y 220 direcciones redirigidas'],
  ['pin', 'SEO local', 'Tu ficha de Google, los directorios y las reseñas'],
  ['chispa', 'Visibilidad en IA', 'Que ChatGPT, Gemini y Google te citen'],
  ['megafono', 'Google Ads', 'Tus anuncios, sus palabras y lo que cuesta cada consulta'],
  ['diana', 'Páginas de conversión', 'Las tres páginas para tus anuncios, pensadas para que llamen'],
  ['camara', 'Fotografía y vídeo', 'Tus fotos y vídeos, tratados para que luzcan y carguen rápido'],
  ['grafica', 'Análisis y medición', 'Cada llamada, WhatsApp y formulario, contado y con su origen'],
  ['rayo', 'Automatización', 'El seguimiento por correo de cada consulta'],
  ['prismaticos', 'Estudio de la competencia', 'Qué hacen y qué prometen los que compiten contigo'],
  ['balanza', 'Legal y cumplimiento', 'Cookies, privacidad, la norma europea de IA y la Abogacía'],
  ['bocadillo', 'Redes sociales', 'Instagram, LinkedIn y Facebook con un mismo mensaje'],
  ['check', 'Pruebas y calidad', 'Velocidad, accesibilidad y pruebas en todos los aparatos'],
  ['brujula', 'Dirección del proyecto', 'Que todo encaje y salga a tiempo'],
  ['escudo', 'Seguridad y mantenimiento', 'Alojamiento, copias de seguridad y versiones guardadas'],
  ['globo', 'Traducción', 'La web y el asistente en inglés'],
  ['estrella', 'Gestión de reseñas', 'Responder cada opinión y pedirlas, con secreto profesional'],
  ['movil', 'Publicidad en redes', 'Campañas en Instagram, Facebook y LinkedIn'],
  ['probeta', 'Optimización de la conversión', 'Probar versiones y quedarse con la que trae más consultas'],
];

const COLORES = ['#0d2c48', '#a8442c', '#17602f', '#1b6fd1', '#7a4fb3'];

export default function OficiosGuia() {
  return (
    <div className="ofi">
      {OFICIOS.map(([icono, nombre, texto], i) => (
        <div key={nombre} className="ofi-tarjeta">
          <span className="ofi-icono" style={{ color: COLORES[i % COLORES.length], background: `${COLORES[i % COLORES.length]}14` }} aria-hidden="true">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d={I[icono]} />
            </svg>
          </span>
          <span className="ofi-num">{String(i + 1).padStart(2, '0')}</span>
          <strong>{nombre}</strong>
          <span className="ofi-texto">{texto}</span>
        </div>
      ))}
    </div>
  );
}
