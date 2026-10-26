'use client';

// La lupa de la web: lo mismo que en la guía, pero para toda la web nueva.
// - Por cada página: el tiempo real con ella delante (pestaña visible y sin estar parado más de 3 minutos)
//   y hasta dónde ha bajado. Se guarda en la base de datos y se ve en /guia-jesus/lectura.
// - Aviso por correo a Ignacio cuando alguien entra (una vez cada 4 horas por navegador) y un resumen
//   de las páginas que ha visto al irse (a partir de 30 segundos; luego solo si suma 2 minutos más).
// - No guarda quién es: un identificador anónimo del navegador, el aparato y la ciudad aproximada.
//   Si ese mismo navegador ya abrió la guía, el aviso lo dice (casi seguro es Jesús o alguien del despacho).
// - Si quien navega es Ignacio (?yo=1 una vez en ese navegador), no avisa y sus visitas quedan marcadas como propias.
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { enviarLupa } from './Lupa';

const FUERA = /^\/(guia-jesus|crm|consulta)(\/|$)/;
const esYo = () => {
  try {
    return !!localStorage.getItem('tc-guia-yo');
  } catch {
    return true;
  }
};
const aparato = () => (/Mobi|Android|iPhone/i.test(navigator.userAgent) ? 'móvil' : 'ordenador');
const avisar = (datos: Record<string, string>) => {
  if (esYo()) return;
  fetch('/api/respuestas', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(datos), keepalive: true }).catch(() => {});
};
const titulo = () => (location.pathname === '/' ? 'Portada' : document.title || location.pathname).replace(/\s*[|·-]\s*Tierno Centella.*$/i, '').slice(0, 150);

export default function LupaWeb() {
  const ruta = usePathname() || '/';
  // Recorrido de toda la visita (todas las páginas), para el resumen por correo.
  const recorrido = useRef<{ ruta: string; titulo: string; segundos: number }[]>([]);
  const activoTotal = useRef(0);
  const enviadoEn = useRef(-1);

  // Marca de Ignacio y aviso de entrada (una vez por carga de la web, no por página).
  useEffect(() => {
    try {
      const q = location.search;
      if (/[?&]yo=1/.test(q)) localStorage.setItem('tc-guia-yo', '1');
      if (/[?&]yo=0/.test(q)) localStorage.removeItem('tc-guia-yo');
      if (FUERA.test(location.pathname) || esYo()) return;
      const yaGuia = !!localStorage.getItem('tc-guia-visita');
      const ref = document.referrer;
      const origen = !ref ? 'directo o desde un correo' : ref.includes('/guia-jesus') ? 'desde la guía' : /google\./.test(ref) ? 'desde Google' : new URL(ref).host === location.host ? '' : `desde ${new URL(ref).host}`;
      if (origen) enviarLupa({ pantalla: 'web', evento: { tipo: 'entrada-web', seccion: location.pathname, texto: origen } });
      const ultima = Number(localStorage.getItem('tc-web-visita') || 0);
      if (Date.now() - ultima < 4 * 3600000) return;
      localStorage.setItem('tc-web-visita', String(Date.now()));
      avisar({ tipo: 'web', dispositivo: aparato(), seccion: location.pathname, reaccion: yaGuia ? 'guia' : '', texto: origen || 'navegando por la web' });
    } catch {}
  }, []);

  // Tiempo en cada página.
  useEffect(() => {
    if (FUERA.test(ruta)) return;
    let ultimaAccion = Date.now();
    let segundos = 0;
    let pendiente = 0;
    let maxScroll = 0;
    const entrada = { ruta, titulo: '', segundos: 0 };
    recorrido.current.push(entrada);
    const tocar = () => (ultimaAccion = Date.now());
    const eventos = ['scroll', 'click', 'keydown', 'touchstart', 'mousemove'];
    eventos.forEach((e) => window.addEventListener(e, tocar, { passive: true }));
    const reloj = setInterval(() => {
      if (document.visibilityState !== 'visible' || Date.now() - ultimaAccion > 180000) return;
      segundos++;
      pendiente++;
      activoTotal.current++;
      entrada.segundos = segundos;
      entrada.titulo = titulo();
      const alto = document.documentElement.scrollHeight - innerHeight;
      if (alto > 0) maxScroll = Math.max(maxScroll, Math.round((scrollY / alto) * 100));
    }, 1000);

    const guardar = () => {
      if (pendiente === 0) return;
      enviarLupa({ pantalla: 'web', total: pendiente, maxScroll, secciones: [{ id: ruta, titulo: entrada.titulo || titulo(), segundos: pendiente }] });
      pendiente = 0;
    };
    // Resumen por correo al irse o cambiar de pestaña: a partir de 30 s, y luego solo si suma 2 minutos más.
    const resumir = () => {
      const t = activoTotal.current;
      if (t < 30 || (enviadoEn.current >= 0 && t - enviadoEn.current < 120)) return;
      enviadoEn.current = t;
      const porRuta = new Map<string, { titulo: string; segundos: number }>();
      for (const r of recorrido.current) {
        const v = porRuta.get(r.ruta) || { titulo: r.titulo || r.ruta, segundos: 0 };
        v.segundos += r.segundos;
        if (r.titulo) v.titulo = r.titulo;
        porRuta.set(r.ruta, v);
      }
      const lista = [...porRuta.entries()]
        .filter(([, v]) => v.segundos >= 3)
        .map(([r, v]) => `${v.titulo} (${r}): ${v.segundos >= 60 ? `${Math.floor(v.segundos / 60)} min ${v.segundos % 60} s` : `${v.segundos} s`}`);
      avisar({ tipo: 'web-tiempo', dispositivo: aparato(), reaccion: String(t), seccion: String(porRuta.size), texto: lista.join('\n') || '(no se paró en ninguna página más de 3 segundos)' });
    };
    const cadaRato = setInterval(guardar, 20000);
    const alOcultar = () => {
      if (document.visibilityState !== 'hidden') return;
      guardar();
      resumir();
    };
    const alSalir = () => {
      guardar();
      resumir();
    };
    document.addEventListener('visibilitychange', alOcultar);
    window.addEventListener('pagehide', alSalir);
    return () => {
      guardar();
      clearInterval(reloj);
      clearInterval(cadaRato);
      eventos.forEach((e) => window.removeEventListener(e, tocar));
      document.removeEventListener('visibilitychange', alOcultar);
      window.removeEventListener('pagehide', alSalir);
    };
  }, [ruta]);

  return null;
}
