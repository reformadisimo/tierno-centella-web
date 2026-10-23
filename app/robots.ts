import type { MetadataRoute } from 'next';

// Demo: bloquea a todos los rastreadores.
export default function robots(): MetadataRoute.Robots {
  return { rules: [{ userAgent: '*', disallow: '/' }] };
}
