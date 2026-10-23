import { ImageResponse } from 'next/og';
import fs from 'node:fs';
import path from 'node:path';

export const alt = 'Tierno Centella Abogados, abogados laboralistas en Madrid especialistas en acoso laboral';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Imagen() {
  const foto = fs.readFileSync(path.join(process.cwd(), 'app/og-jesus.jpg')).toString('base64');
  const fuente = fs.readFileSync(path.join(process.cwd(), 'app/og-fuente.ttf'));
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', background: '#12302c', color: '#fff', fontFamily: 'Schibsted' }}>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 64px', width: 760 }}>
          <div style={{ fontSize: 30, color: '#f5cd47', marginBottom: 24 }}>Tierno Centella Abogados</div>
          <div style={{ fontSize: 62, fontWeight: 800, lineHeight: 1.08 }}>Abogados laboralistas en Madrid, especialistas en acoso laboral.</div>
          <div style={{ fontSize: 28, color: '#cfdcd8', marginTop: 28 }}>Más de 25 años. Primera condena en España al acosador, en 2005.</div>
        </div>
        <img src={`data:image/jpeg;base64,${foto}`} width={440} height={630} style={{ objectFit: 'cover', objectPosition: 'top' }} />
      </div>
    ),
    { ...size, fonts: [{ name: 'Schibsted', data: fuente, weight: 800, style: 'normal' }] },
  );
}
