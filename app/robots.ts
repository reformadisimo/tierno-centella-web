import type { MetadataRoute } from 'next';
import { DEMO } from '@/lib/despacho';
import { BASE } from '@/lib/seo';

// Demo: bloquea a todos los rastreadores. Al publicar (DEMO = false) deja entrar a Google, Bing
// y a los buscadores de las IA (ChatGPT, Perplexity, Claude) para que puedan leer y citar la web.
export default function robots(): MetadataRoute.Robots {
  if (DEMO) return { rules: [{ userAgent: '*', disallow: '/' }] };
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/api/', '/guia-jesus', '/conversaciones'] },
      { userAgent: ['OAI-SearchBot', 'ChatGPT-User', 'PerplexityBot', 'Claude-SearchBot', 'Claude-User', 'Bingbot', 'Googlebot'], allow: '/', disallow: ['/api/', '/guia-jesus', '/conversaciones'] },
    ],
    sitemap: `${BASE}/sitemap.xml`,
  };
}
