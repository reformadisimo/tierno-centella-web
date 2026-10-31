import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import './herramientas.css';
import './guia-redes.css';
import './fotos-foco.css';
import Cabecera from '@/components/Cabecera';
import Pie from '@/components/Pie';
import BarraMovil from '@/components/BarraMovil';
import AvisoCookies from '@/components/AvisoCookies';
import Medicion from '@/components/Medicion';
import LupaWeb from '@/components/LupaWeb';
import ContadorVistas from '@/components/ContadorVistas';
import Diferidos from '@/components/Diferidos';
import SalidaRapida from '@/components/SalidaRapida';
import { CabeceraImpresion, IdiomaHtml, WhatsappQR } from '@/components/Utiles';
import BarraSuperior from '@/components/BarraSuperior';
import JsonLd from '@/components/JsonLd';
import MiPlazo from '@/components/MiPlazo';
import ProgresoLectura from '@/components/ProgresoLectura';
import Aparecer from '@/components/Aparecer';
import IndicePagina from '@/components/IndicePagina';
import { BASE, esquemaDespacho } from '@/lib/seo';

const fuente = localFont({
  src: './fonts/schibsted.woff2',
  variable: '--fuente',
  weight: '400 900',
  display: 'swap',
});

export const metadata: Metadata = {
  // Las imágenes de las tarjetas (WhatsApp, redes) se sirven desde el dominio donde está publicada la web hoy; el canónico sigue siendo BASE.
  metadataBase: new URL(process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : BASE),
  applicationName: 'Tierno Centella Abogados',
  authors: [{ name: 'Jesús Tierno Centella', url: `${BASE}/jesus-tierno` }],
  creator: 'Tierno Centella Abogados',
  publisher: 'Tierno Centella Abogados',
  formatDetection: { telephone: true, email: true, address: true },
  alternates: { canonical: BASE, types: { 'application/rss+xml': `${BASE}/feed.xml` } },
  openGraph: { siteName: 'Tierno Centella Abogados', locale: 'es_ES', type: 'website' },
  twitter: { card: 'summary_large_image', site: '@TiernoCentella1' },
  title: {
    default: 'Tierno Centella Abogados | Abogados laboralistas en Madrid',
    template: '%s | Tierno Centella Abogados',
  },
  description:
    'Abogados laboralistas en Madrid especializados en despidos, acoso laboral e incapacidad permanente. Calcula tu indemnización y el plazo para reclamar.',
  // Demo: no indexar mientras no sea la web oficial del despacho.
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: '#003a5f',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={fuente.variable}>
      <body>
        {/* Las miniaturas de los vídeos vienen de YouTube: abrir la conexión antes acelera la primera imagen de muchas guías. */}
        <link rel="preconnect" href="https://i.ytimg.com" />
        <JsonLd datos={esquemaDespacho()} />
        <a className="salta" href="#contenido">
          Saltar al contenido
        </a>
        <BarraSuperior />
        <CabeceraImpresion />
        <Cabecera />
        <MiPlazo />
        <ProgresoLectura />
        <Aparecer />
        <main id="contenido">
          <IndicePagina />
          {children}
        </main>
        <Pie />
        <BarraMovil />
        <AvisoCookies />
        <Diferidos />
        <SalidaRapida />
        <WhatsappQR />
        <IdiomaHtml />
        <Medicion />
        <LupaWeb />
        <ContadorVistas />
      </body>
    </html>
  );
}
