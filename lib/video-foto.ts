import fs from 'node:fs';
import path from 'node:path';

// Si existe un clip con el mismo nombre que la foto (public/video/paginas/<foto>.webm), esa foto se anima con él.
// Sin clip, se queda la foto. Los clips se preparan con scripts/preparar-video.sh.
export function videoDeFoto(foto: string): { webm: string; mp4?: string } | null {
  const base = path.join(process.cwd(), 'public/video/paginas', foto);
  if (!fs.existsSync(`${base}.webm`)) return null;
  return { webm: `/video/paginas/${foto}.webm`, mp4: fs.existsSync(`${base}.mp4`) ? `/video/paginas/${foto}.mp4` : undefined };
}
