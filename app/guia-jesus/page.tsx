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
  ['Estudio de competencia: Bufete Toro, Campmany, García de la Santa, Jover Marben, Pedraza Laboral', 'https://www.bufetetoro.com/abogados-acoso-laboral-madrid/'],
];

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
      return { id, titulo: titulo.trim(), html, texto: cuerpo.replace(/[#*|>_\-[\]()]/g, ' ') };
    });
}

export default function Pagina() {
  return (
    <>
      <header className="gj-portada" id="indice-guia">
        <div className="contenedor">
          <img src="/img/logo-tc-blanco.webp" alt="Tierno Centella Abogados" width={260} height={62} />
          <h1>Tu web nueva, explicada sin prisas</h1>
          <p>Guía para Jesús Tierno Centella. Preparada por Ignacio de la Rubia. Octubre de 2026.</p>
        </div>
      </header>
      <div className="contenedor">
        <GuiaJesus secciones={secciones()} />
      </div>
    </>
  );
}
