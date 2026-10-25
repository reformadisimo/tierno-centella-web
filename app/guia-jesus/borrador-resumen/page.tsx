import type { Metadata } from 'next';
import fs from 'node:fs';
import path from 'node:path';
import { marked } from 'marked';

// Borrador privado del resumen de la guía: no se indexa ni está enlazado desde ningún sitio.
export const metadata: Metadata = {
  title: 'Borrador del resumen',
  robots: { index: false, follow: false },
};

export default function Borrador() {
  const md = fs.readFileSync(path.join(process.cwd(), 'content/guia/borrador-resumen.md'), 'utf8').replace(/^## .*\n/, '');
  const titulo = fs.readFileSync(path.join(process.cwd(), 'content/guia/borrador-resumen.md'), 'utf8').split('\n')[0].replace('## ', '');
  return (
    <main className="contenedor" style={{ maxWidth: 760, padding: '32px 16px' }}>
      <p className="recuadro">Borrador para Ig: todavía no está en la guía de Jesús.</p>
      <h1>{titulo}</h1>
      <div className="prosa" dangerouslySetInnerHTML={{ __html: marked.parse(md, { async: false }) as string }} />
    </main>
  );
}
