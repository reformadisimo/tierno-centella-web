/** @type {import('next').NextConfig} */
import { REDIRECCIONES_BLOG } from './lib/redirecciones-blog.mjs';

// Direcciones de la web actual (WordPress) que deben llevar a su equivalente en la nueva,
// para no perder visitas ni posicionamiento el día de la migración. Los 220 artículos del blog
// antiguo están en lib/redirecciones-blog.mjs (ver docs/auditoria-blog-antiguo.md).
const ANTIGUAS = [
  ['/acoso-laboral-mobbing', '/acoso-laboral'],
  ['/acoso-laboral-mobbing/test-viabilidad-acoso-laboral', '/herramientas/test-acoso'],
  ['/abogados-acoso-laboral-o-mobbing', '/acoso-laboral'],
  ['/acoso', '/acoso-laboral'],
  ['/incapacidad', '/incapacidad-permanente'],
  ['/acoso-laboral-o-mobbing', '/acoso-laboral'],
  ['/acoso-laboral/test', '/herramientas/test-acoso'],
  ['/test-acoso-laboral-por-abogados-mobbing', '/herramientas/test-acoso'],
  ['/despido/test-viabilidad', '/herramientas/revisa-tu-carta-de-despido'],
  ['/incapacidad', '/incapacidad-permanente'],
  ['/incapacidad/test-viabilidad-incapacidad', '/herramientas/comprobador-incapacidad'],
  ['/abogados-incapacidad-permanente', '/incapacidad-permanente'],
  ['/test-viabilidad-derecho-laboral', '/herramientas'],
  ['/test-viabilidad', '/herramientas'],
  ['/tienda', '/contacto'],
  ['/producto/cita', '/reservar?con=abogado'],
  ['/producto/cita-jesus', '/reservar?con=jesus'],
  ['/nosotros', '/jesus-tierno'],
  ['/servicios-derecho-laboral', '/'],
  ['/primera-sentencia-que-obliga-al-acosador-laboral-a-pagar-a-la-victima', '/sentencias/primera-condena-al-acosador-2005'],
  ['/sentencia-sobre-acoso-laboral', '/sentencias/acoso-administracion-educativa-castilla-y-leon-2011'],
  ['/como-demostrar-el-mobbing', '/acoso-laboral/como-demostrar-el-acoso'],
  ['/demostrar-mobbing', '/acoso-laboral/como-demostrar-el-acoso'],
  ['/demostrar-acoso-horizontal', '/acoso-laboral/acoso-horizontal-entre-companeros'],
  ['/baja-por-depresion-lo-que-necesitas-saber', '/acoso-laboral/baja-por-ansiedad-por-acoso'],
  ['/indemnizacion-por-despido-improcedente', '/calculadora-indemnizacion'],
  ['/indemnizacion-por-acoso-laboral-la-cuantia', '/acoso-laboral/que-puedo-reclamar'],
  ['/tipos-de-despido', '/despido/tipos-de-despido'],
  ['/despido-improcedente', '/despido'],
  ['/cuales-son-los-tipos-de-incapacidad-permanente', '/incapacidad-permanente/grados-de-incapacidad-permanente'],
];

const nextConfig = {
  poweredByHeader: false,
  async headers() {
    // Demo: que ningún buscador indexe esta web mientras no sea la oficial.
    // Fotos, vídeos y logos: que el navegador los guarde 30 días (más rápido en la segunda visita).
    const cache = [{ key: 'Cache-Control', value: 'public, max-age=2592000, stale-while-revalidate=86400' }];
    return [
      { source: '/:path*', headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }] },
      { source: '/img/:path*', headers: cache },
      { source: '/video/:path*', headers: cache },
    ];
  },
  async redirects() {
    const vistas = new Set();
    return [...ANTIGUAS, ...REDIRECCIONES_BLOG]
      .filter(([source]) => !vistas.has(source) && vistas.add(source))
      .map(([source, destination]) => ({ source, destination, permanent: true }));
  },
};
export default nextConfig;
