import { BASE, ID_DESPACHO, ID_JESUS } from './seo';
import { CASOS } from './casos';
import { HERRAMIENTAS } from './herramientas';

// Datos estructurados de las páginas principales (portada, áreas, equipo, listados) que no tenían los suyos.
type Cfg = {
  tipo: 'WebPage' | 'CollectionPage' | 'ProfilePage' | 'AboutPage';
  nombre: string;
  descripcion: string;
  migas: [string, string][]; // [ruta, texto]
  servicio?: { tipo: string; descripcion: string };
  lista?: 'casos' | 'herramientas';
};

export const PAGINAS: Record<string, Cfg> = {
  '/': { tipo: 'WebPage', nombre: 'Tierno Centella Abogados: abogados laboralistas en Madrid', descripcion: 'Despacho de abogados laboralistas en Madrid especializado en acoso laboral, despidos e incapacidad permanente.', migas: [] },
  '/despido': { tipo: 'WebPage', nombre: 'Despido: qué hacer, plazos e indemnización', descripcion: 'Qué hacer si te despiden: plazo de 20 días hábiles, tipos de despido, indemnización y cómo reclamar.', migas: [['/despido', 'Despido']], servicio: { tipo: 'Reclamación de despido', descripcion: 'Asesoramiento y defensa de trabajadores en despidos improcedentes, nulos y objetivos, desde la carta hasta el juicio.' } },
  '/acoso-laboral': { tipo: 'WebPage', nombre: 'Acoso laboral: cómo reconocerlo, probarlo y reclamar', descripcion: 'Qué es el acoso laboral o mobbing, cómo demostrarlo y qué se puede reclamar a la empresa y al acosador.', migas: [['/acoso-laboral', 'Acoso laboral']], servicio: { tipo: 'Defensa frente al acoso laboral', descripcion: 'Defensa de personas que sufren acoso laboral, con reclamación de daños, extinción del contrato y vía penal cuando procede.' } },
  '/incapacidad-permanente': { tipo: 'WebPage', nombre: 'Incapacidad permanente: grados, requisitos y cómo reclamarla', descripcion: 'Los grados de incapacidad permanente, cuándo corresponde y cómo reclamar si el INSS la deniega.', migas: [['/incapacidad-permanente', 'Incapacidad permanente']], servicio: { tipo: 'Reclamación de incapacidad permanente', descripcion: 'Reclamación y recurso de incapacidades permanentes denegadas o con un grado insuficiente.' } },
  '/mujer-y-trabajo': { tipo: 'WebPage', nombre: 'Mujer y trabajo: embarazo, permisos y discriminación', descripcion: 'Derechos laborales de las mujeres: embarazo, lactancia, permisos, reducción de jornada y discriminación.', migas: [['/mujer-y-trabajo', 'Mujer y trabajo']], servicio: { tipo: 'Derechos laborales de la mujer', descripcion: 'Asesoramiento en despidos por embarazo, permisos, conciliación y discriminación por razón de sexo.' } },
  '/empresas': { tipo: 'WebPage', nombre: 'Para empresas y centros educativos', descripcion: 'Protocolos de acoso, canal de denuncias, investigación imparcial de denuncias y formación para empresas y centros educativos.', migas: [['/empresas', 'Empresas']], servicio: { tipo: 'Asesoría laboral a empresas y centros educativos', descripcion: 'Protocolos de acoso, canal de denuncias, investigaciones imparciales, formación y prevención de riesgos psicosociales.' } },
  '/jesus-tierno': { tipo: 'ProfilePage', nombre: 'Jesús Tierno Centella, abogado laboralista', descripcion: 'Trayectoria de Jesús Tierno Centella, socio director del despacho y abogado de la primera sentencia en España que condenó al acosador y a la empresa a la vez.', migas: [['/jesus-tierno', 'Jesús Tierno']] },
  '/sentencias': { tipo: 'CollectionPage', nombre: 'Sentencias ganadas por Tierno Centella Abogados', descripcion: 'Sentencias de acoso laboral, despido e incapacidad en las que ha intervenido el despacho.', migas: [['/sentencias', 'Sentencias']], lista: 'casos' },
  '/herramientas': { tipo: 'CollectionPage', nombre: 'Herramientas gratuitas de derecho laboral', descripcion: 'Tests y calculadoras gratuitas: indemnización, finiquito, paro, plazos para reclamar y más.', migas: [['/herramientas', 'Herramientas']], lista: 'herramientas' },
  '/blog': { tipo: 'CollectionPage', nombre: 'Blog de derecho laboral', descripcion: 'Novedades y guías prácticas sobre despidos, acoso laboral, incapacidad permanente y conciliación.', migas: [['/blog', 'Blog']] },
  '/videos': { tipo: 'CollectionPage', nombre: 'Vídeos de derecho laboral', descripcion: 'Vídeos del despacho sobre acoso laboral, despido e incapacidad permanente.', migas: [['/videos', 'Vídeos']] },
};

export function esquemaPaginaDe(ruta: string) {
  const c = PAGINAS[ruta];
  if (!c) return null;
  const url = BASE + (ruta === '/' ? '' : ruta);
  const migas = [['/', 'Inicio'], ...c.migas];
  const grafo: object[] = [
    {
      '@type': c.tipo,
      '@id': `${url}#pagina`,
      url,
      name: c.nombre,
      description: c.descripcion,
      inLanguage: 'es-ES',
      isPartOf: { '@id': `${BASE}/#web` },
      about: { '@id': ID_DESPACHO },
      publisher: { '@id': ID_DESPACHO },
      ...(c.tipo === 'ProfilePage' ? { mainEntity: { '@id': ID_JESUS } } : {}),
      ...(migas.length > 1 ? { breadcrumb: { '@id': `${url}#migas` } } : {}),
      ...(c.lista ? { mainEntity: { '@id': `${url}#lista` } } : {}),
    },
  ];
  if (migas.length > 1)
    grafo.push({
      '@type': 'BreadcrumbList',
      '@id': `${url}#migas`,
      itemListElement: migas.map(([r, t], i) => ({ '@type': 'ListItem', position: i + 1, name: t, item: BASE + (r === '/' ? '' : r) })),
    });
  if (c.servicio)
    grafo.push({
      '@type': 'Service',
      '@id': `${url}#servicio`,
      name: c.servicio.tipo,
      serviceType: c.servicio.tipo,
      description: c.servicio.descripcion,
      provider: { '@id': ID_DESPACHO },
      areaServed: { '@type': 'Country', name: 'España' },
      url,
    });
  if (c.lista) {
    const items =
      c.lista === 'casos'
        ? CASOS.map((x) => ({ n: x.titulo, u: `${BASE}/sentencias/${x.slug}` }))
        : HERRAMIENTAS.map((x) => ({ n: x.titulo, u: BASE + x.href }));
    grafo.push({
      '@type': 'ItemList',
      '@id': `${url}#lista`,
      numberOfItems: items.length,
      itemListElement: items.map((x, i) => ({ '@type': 'ListItem', position: i + 1, name: x.n, url: x.u })),
    });
  }
  return { '@context': 'https://schema.org', '@graph': grafo };
}
