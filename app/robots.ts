import type { MetadataRoute } from 'next';
import { DEMO } from '@/lib/despacho';
import { BASE } from '@/lib/seo';

// Demo: bloquea a todos los rastreadores. Al publicar (DEMO = false) deja entrar a todos: Google, Bing,
// los buscadores de las IA (ChatGPT, Perplexity, Claude) y sus rastreadores de entrenamiento. Decisión de Ig, oct. 2026.
export default function robots(): MetadataRoute.Robots {
  if (DEMO) return { rules: [{ userAgent: '*', disallow: '/' }] };
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/api/', '/guia-jesus', '/conversaciones'] },
      // Buscadores de IA y rastreadores de entrenamiento: permitidos a propósito, para que citen y conozcan al despacho.
      { userAgent: ['OAI-SearchBot', 'ChatGPT-User', 'GPTBot', 'PerplexityBot', 'Claude-SearchBot', 'Claude-User', 'ClaudeBot', 'Google-Extended', 'Applebot', 'Applebot-Extended', 'Bingbot', 'Googlebot', 'DuckDuckBot', 'CCBot'], allow: '/', disallow: ['/api/', '/guia-jesus', '/conversaciones'] },
    ],
    sitemap: `${BASE}/sitemap.xml`,
  };
}
