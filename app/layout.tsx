import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Cabecera from '@/components/Cabecera';
import Pie from '@/components/Pie';
import BarraMovil from '@/components/BarraMovil';
import Asistente from '@/components/Asistente';

const fuente = localFont({
  src: './fonts/schibsted.woff2',
  variable: '--fuente',
  weight: '400 900',
  display: 'swap',
});

export const metadata: Metadata = {
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
  themeColor: '#12302c',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={fuente.variable}>
      <body>
        <a className="salta" href="#contenido">
          Saltar al contenido
        </a>
        <div className="aviso-demo">Versión de demostración. No es la web oficial del despacho.</div>
        <Cabecera />
        <main id="contenido">{children}</main>
        <Pie />
        <BarraMovil />
        <Asistente />
      </body>
    </html>
  );
}
