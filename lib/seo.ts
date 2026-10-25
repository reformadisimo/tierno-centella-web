import type { Metadata } from 'next';
import { COLEGIADO_CONFIRMADO, DESPACHO } from './despacho';
import { idiomaDe, rutaEnOtroIdioma } from './idioma';

// Dominio definitivo. Mientras sea demo, robots lo bloquea, pero todo apunta ya a la web oficial.
export const BASE = 'https://tiernocentella.es';

export const REDES = {
  instagram: 'https://www.instagram.com/tiernocentella_abogados/',
  youtube: 'https://www.youtube.com/@tiernocentella',
  facebook: 'https://www.facebook.com/TiernoCentellaAbogados/',
  x: 'https://x.com/TiernoCentella1',
  linkedin: 'https://www.linkedin.com/in/jes%C3%BAs-tierno-centella-13ba92188/',
};

export function meta({
  titulo,
  descripcion,
  ruta,
  imagen,
  tipo = 'website',
  publicado,
  modificado,
  tituloSeo,
}: {
  titulo: string;
  descripcion: string;
  ruta: string;
  imagen?: string;
  tipo?: 'website' | 'article';
  publicado?: string;
  modificado?: string;
  tituloSeo?: string;
}): Metadata {
  const url = BASE + ruta;
  // Google corta el título hacia los 60 caracteres y la descripción hacia los 155.
  // Si con la marca no cabe, el título va sin ella (Google ya muestra el nombre del sitio aparte).
  const corto = tituloSeo ?? titulo;
  const title = corto.length + ' | Tierno Centella'.length <= 60 ? `${corto} | Tierno Centella` : corto;
  const recorta = (t: string, n: number) => (t.length <= n ? t : t.slice(0, t.lastIndexOf(' ', n - 1)).replace(/[,;:.\s-]+$/, '') + '...');
  const description = recorta(descripcion, 158);
  const images = imagen ? [{ url: imagen, width: 1200, height: 630, alt: titulo }] : undefined;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url, ...alternativas(ruta) },
    openGraph: {
      title: titulo,
      description,
      url,
      siteName: DESPACHO.nombre,
      locale: idiomaDe(ruta) === 'en' ? 'en_GB' : 'es_ES',
      type: tipo,
      ...(images ? { images } : {}),
      ...(tipo === 'article' ? { publishedTime: publicado, modifiedTime: modificado ?? publicado, authors: ['Jesús Tierno Centella'] } : {}),
    },
    twitter: { card: 'summary_large_image', title: titulo, description },
  };
}

// Versión en el otro idioma, si existe: Google la muestra a quien busca en ese idioma (hreflang).
function alternativas(ruta: string) {
  const otra = rutaEnOtroIdioma(ruta);
  const esInicio = ruta === '/' || ruta === '/en';
  if (!esInicio && (otra === '/' || otra === '/en')) return {};
  const es = idiomaDe(ruta) === 'es' ? ruta : otra;
  const en = idiomaDe(ruta) === 'en' ? ruta : otra;
  return { languages: { es: BASE + (es === '/' ? '' : es), en: BASE + en, 'x-default': BASE + (es === '/' ? '' : es) } };
}

export const ID_DESPACHO = `${BASE}/#despacho`;
export const ID_JESUS = `${BASE}/jesus-tierno#jesus`;

export function esquemaDespacho() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['LegalService', 'Attorney'],
        '@id': ID_DESPACHO,
        name: DESPACHO.nombre,
        url: BASE,
        logo: `${BASE}/icon.png`,
        image: `${BASE}/img/equipo.webp`,
        description:
          'Despacho de abogados laboralistas en Madrid especializado en acoso laboral desde hace más de 25 años. Despidos, incapacidad permanente y asesoría a empresas y centros educativos.',
        telephone: '+34913249797',
        email: DESPACHO.email,
        priceRange: '150 € - 250 € la consulta de una hora',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Calle de Jorge Juan, 78, 5.º C',
          postalCode: '28009',
          addressLocality: 'Madrid',
          addressRegion: 'Comunidad de Madrid',
          addressCountry: 'ES',
        },
        areaServed: [{ '@type': 'Country', name: 'España' }, { '@type': 'City', name: 'Madrid' }],
        knowsAbout: ['Acoso laboral', 'Mobbing', 'Despido improcedente', 'Despido nulo', 'Incapacidad permanente', 'Derecho laboral', 'Protocolos de acoso'],
        founder: { '@id': ID_JESUS },
        sameAs: Object.values(REDES).filter((u) => !u.includes('linkedin')),
        contactPoint: [
          { '@type': 'ContactPoint', telephone: '+34913249797', contactType: 'customer service', availableLanguage: 'es' },
          { '@type': 'ContactPoint', telephone: '+34608139337', contactType: 'customer service', contactOption: 'WhatsApp', availableLanguage: 'es' },
        ],
      },
      {
        '@type': 'Person',
        '@id': ID_JESUS,
        name: 'Jesús Tierno Centella',
        jobTitle: 'Abogado laboralista, socio director',
        ...(COLEGIADO_CONFIRMADO && DESPACHO.colegiadoNumero ? { identifier: { '@type': 'PropertyValue', name: 'Número de colegiado (ICAM)', value: DESPACHO.colegiadoNumero } } : {}),
        // El número de colegiado entra en los datos de Google solo cuando Jesús lo confirme.
        ...(COLEGIADO_CONFIRMADO && DESPACHO.colegiadoNumero ? { identifier: { '@type': 'PropertyValue', name: 'Número de colegiado (ICAM)', value: DESPACHO.colegiadoNumero } } : {}),
        worksFor: { '@id': ID_DESPACHO },
        alumniOf: { '@type': 'CollegeOrUniversity', name: 'Universidad de Alcalá' },
        image: `${BASE}/img/jesus-retrato.webp`,
        url: `${BASE}/jesus-tierno`,
        knowsAbout: ['Acoso laboral', 'Derecho laboral', 'Despido', 'Incapacidad permanente'],
        sameAs: [REDES.linkedin, REDES.youtube],
      },
      {
        '@type': 'WebSite',
        '@id': `${BASE}/#web`,
        url: BASE,
        name: DESPACHO.nombre,
        inLanguage: 'es-ES',
        publisher: { '@id': ID_DESPACHO },
        potentialAction: { '@type': 'SearchAction', target: { '@type': 'EntryPoint', urlTemplate: `${BASE}/buscar?q={search_term_string}` }, 'query-input': 'required name=search_term_string' },
      },
    ],
  };
}

export function esquemaMigas(migas: { href: string; texto: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: migas.map((m, i) => ({ '@type': 'ListItem', position: i + 1, name: m.texto, item: BASE + (m.href === '/' ? '' : m.href) })),
  };
}

export function esquemaFaq(faq: { pregunta: string; respuesta: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((f) => ({ '@type': 'Question', name: f.pregunta, acceptedAnswer: { '@type': 'Answer', text: f.respuesta } })),
  };
}

export function esquemaHerramienta(nombre: string, descripcion: string, ruta: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: nombre,
    description: descripcion,
    url: BASE + ruta,
    applicationCategory: 'LegalApplication',
    operatingSystem: 'Cualquiera (navegador)',
    inLanguage: 'es-ES',
    isAccessibleForFree: true,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
    provider: { '@id': ID_DESPACHO },
  };
}

