import type { Metadata } from 'next';
import { DESPACHO } from './despacho';

// Dominio definitivo. Mientras sea demo, robots lo bloquea, pero todo apunta ya a la web oficial.
export const BASE = 'https://tiernocentella.es';

export const REDES = {
  instagram: 'https://www.instagram.com/tiernocentella_abogados/',
  youtube: 'https://www.youtube.com/@tiernocentella',
  facebook: 'https://www.facebook.com/TiernoCentellaAbogados/',
  x: 'https://x.com/TiernoCentella1',
  linkedin: 'https://www.linkedin.com/in/jes%C3%BAs-tierno-centella-981a90147/',
};

export function meta({
  titulo,
  descripcion,
  ruta,
  imagen,
  tipo = 'website',
  publicado,
  modificado,
}: {
  titulo: string;
  descripcion: string;
  ruta: string;
  imagen?: string;
  tipo?: 'website' | 'article';
  publicado?: string;
  modificado?: string;
}): Metadata {
  const url = BASE + ruta;
  const images = imagen ? [{ url: imagen, width: 1200, height: 630, alt: titulo }] : undefined;
  return {
    title: titulo,
    description: descripcion,
    alternates: { canonical: url },
    openGraph: {
      title: titulo,
      description: descripcion,
      url,
      siteName: DESPACHO.nombre,
      locale: 'es_ES',
      type: tipo,
      ...(images ? { images } : {}),
      ...(tipo === 'article' ? { publishedTime: publicado, modifiedTime: modificado ?? publicado, authors: ['Jesús Tierno Centella'] } : {}),
    },
    twitter: { card: 'summary_large_image', title: titulo, description: descripcion, site: '@TiernoCentella1' },
  };
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

