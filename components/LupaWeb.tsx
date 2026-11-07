'use client';

// La lupa de la web: lo mismo que en la guía, pero para toda la web nueva.
// - Por cada página: el tiempo real con ella delante (pestaña visible y sin estar parado más de 3 minutos)
//   y hasta dónde ha bajado. Se guarda en la base de datos y se ve en /guia-jesus/lectura.
// - Aviso por correo a Ignacio cuando alguien entra (una vez cada 4 horas por navegador) y un resumen
//   de las páginas que ha visto al irse (a partir de 30 segundos; luego solo si suma 2 minutos más).
// - No guarda quién es: un identificador anónimo del navegador, el aparato y la ciudad aproximada.
//   Si ese mismo navegador ya abrió la guía, el aviso lo dice (casi seguro es Jesús o alguien del despacho).
// - Si quien navega es Ignacio (?yo=1 una vez en ese navegador), no avisa y sus visitas quedan marcadas como propias.
// - (tc·v13) También apunta qué pulsa (enlaces, botones, pestañas), el vídeo (play y hasta dónde lo ve) y hasta dónde baja
//   en cada página; todo va al resumen por correo. ?de=jesus en un enlace marca ese navegador como de Jesús (tc-es-jesus).
import { esYo as esIgnacio } from '@/lib/propios';
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { enviarLupa } from './Lupa';

const FUERA = /^\/(guia-jesus|crm|consulta|mesa-[a-z0-9-]+)(\/|$)/;
// Dentro de la lupa (la web metida en un iframe propio) no se graba ni se avisa: quien mira el visor no ensucia los datos.
const enMarco = () => {
  try {
    return window.self !== window.top;
  } catch {
    return true;
  }
};
const esYo = () => {
  if (enMarco()) return true;
  try {
    return esIgnacio();
  } catch {
    return true;
  }
};
const aparato = () => (/Mobi|Android|iPhone/i.test(navigator.userAgent) ? 'móvil' : 'ordenador');
const avisar = (datos: Record<string, string>) => {
  if (esYo()) return;
  fetch('/api/respuestas', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(datos), keepalive: true }).catch(() => {});
};
const esJesus = () => {
  try {
    return !!(localStorage.getItem('tc-guia-visita') || localStorage.getItem('tc-es-jesus'));
  } catch {
    return false;
  }
};
const titulo = () => (location.pathname === '/' ? 'Portada' : document.title || location.pathname).replace(/\s*[|·-]\s*Tierno Centella.*$/i, '').slice(0, 150);

export default function LupaWeb() {
  const ruta = usePathname() || '/';
  // Recorrido de toda la visita (todas las páginas), para el resumen por correo.
  const recorrido = useRef<{ ruta: string; titulo: string; segundos: number; scroll: number }[]>([]);
  const acciones = useRef<string[]>([]);
  const videos = useRef<string[]>([]);
  const activoTotal = useRef(0);
  const enviadoEn = useRef(-1);

  // Marca de Ignacio y aviso de entrada (una vez por carga de la web, no por página).
  useEffect(() => {
    try {
      const q = location.search;
      if (/[?&]yo=1/.test(q)) localStorage.setItem('tc-guia-yo', '1');
      if (/[?&]yo=0/.test(q)) localStorage.removeItem('tc-guia-yo');
      if (/[?&]de=jesus/.test(q)) localStorage.setItem('tc-es-jesus', '1');
      if (FUERA.test(location.pathname) || esYo()) return;
      const yaGuia = esJesus();
      const ref = document.referrer;
      const origen = !ref ? 'directo o desde un correo' : ref.includes('/guia-jesus') ? 'desde la guía' : /google\./.test(ref) ? 'desde Google' : new URL(ref).host === location.host ? '' : `desde ${new URL(ref).host}`;
      if (origen) enviarLupa({ pantalla: 'web', evento: { tipo: 'entrada-web', seccion: location.pathname, texto: origen } });
      const ultima = Number(localStorage.getItem('tc-web-visita') || 0);
      if (Date.now() - ultima < 4 * 3600000) return;
      localStorage.setItem('tc-web-visita', String(Date.now()));
      avisar({ tipo: 'web', dispositivo: aparato(), seccion: location.pathname, reaccion: yaGuia ? 'guia' : '', texto: origen || 'navegando por la web' });
    } catch {}
  }, []);

  // Qué pulsa y el vídeo, en toda la visita.
  useEffect(() => {
    if (enMarco()) return;
    let n = 0;
    const alClic = (e: MouseEvent) => {
      try {
        if (FUERA.test(location.pathname) || n >= 120) return;
        const el = (e.target as Element | null)?.closest?.('a,button,summary,[role=tab],[role=button],label,select');
        if (!el) return;
        const txt = (el.getAttribute('aria-label') || el.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 80) || el.tagName.toLowerCase();
        let destino = '';
        if (el instanceof HTMLAnchorElement && el.href) {
          const u = new URL(el.href, location.href);
          destino = u.host === location.host ? u.pathname + u.hash : u.protocol === 'tel:' ? 'llamar' : u.host.includes('wa.me') || u.host.includes('whatsapp') ? 'WhatsApp' : u.protocol === 'mailto:' ? 'correo' : u.host;
        }
        n++;
        const linea = `${titulo()}: «${txt}»${destino ? ` → ${destino}` : ''}`;
        acciones.current.push(linea);
        enviarLupa({ pantalla: 'web', evento: { tipo: 'clic', seccion: location.pathname, texto: `«${txt}»${destino ? ` → ${destino}` : ''}` } });
      } catch {}
    };
    const hitos = new Map<string, Set<number>>();
    const nombre = (v: HTMLVideoElement) => (v.currentSrc || v.src || 'vídeo').split('/').pop()?.replace(/\.mp4.*$/, '') || 'vídeo';
    const alPlay = (e: Event) => {
      const v = e.target;
      if (!(v instanceof HTMLVideoElement) || FUERA.test(location.pathname)) return;
      const k = nombre(v);
      if (!hitos.has(k)) {
        hitos.set(k, new Set());
        videos.current.push(`Le ha dado al play: ${k} (en ${titulo()})`);
        enviarLupa({ pantalla: 'web', evento: { tipo: 'video', seccion: location.pathname, texto: `Play: ${k}` } });
        if (esJesus()) avisar({ tipo: 'web-accion', id: 'jesus', dispositivo: aparato(), seccion: location.pathname, texto: `está viendo el vídeo (${k})` });
      }
    };
    const alAvanzar = (e: Event) => {
      const v = e.target;
      if (!(v instanceof HTMLVideoElement) || !v.duration) return;
      const k = nombre(v);
      const h = hitos.get(k);
      if (!h) return;
      const pct = (v.currentTime / v.duration) * 100;
      for (const m of [25, 50, 75, 100]) {
        if (pct >= (m === 100 ? 97 : m) && !h.has(m)) {
          h.add(m);
          const linea = `${k}: ha visto el ${m} % (${Math.round(v.currentTime)} s de ${Math.round(v.duration)})`;
          videos.current.push(linea);
          enviarLupa({ pantalla: 'web', evento: { tipo: 'video', seccion: location.pathname, texto: linea } });
        }
      }
    };
    document.addEventListener('click', alClic, true);
    document.addEventListener('play', alPlay, true);
    document.addEventListener('timeupdate', alAvanzar, true);
    return () => {
      document.removeEventListener('click', alClic, true);
      document.removeEventListener('play', alPlay, true);
      document.removeEventListener('timeupdate', alAvanzar, true);
    };
  }, []);

  // Aviso al momento si Jesús entra en el Acceso clientes (una vez por visita).
  const avisadoAcceso = useRef(false);
  useEffect(() => {
    if (avisadoAcceso.current || enMarco() || !ruta.startsWith('/area-cliente') || !esJesus()) return;
    avisadoAcceso.current = true;
    avisar({ tipo: 'web-accion', id: 'jesus', dispositivo: aparato(), seccion: ruta, texto: 'ha entrado en el Acceso clientes' });
  }, [ruta]);

  // Tiempo en cada página.
  useEffect(() => {
    if (FUERA.test(ruta) || enMarco()) return;
    let ultimaAccion = Date.now();
    let segundos = 0;
    let pendiente = 0;
    let maxScroll = 0;
    const entrada = { ruta, titulo: '', segundos: 0, scroll: 0 };
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
      entrada.scroll = maxScroll;
    }, 1000);

    const guardar = () => {
      if (pendiente === 0) return;
      enviarLupa({ pantalla: 'web', total: pendiente, maxScroll, secciones: [{ id: ruta, titulo: entrada.titulo || titulo(), segundos: pendiente }] });
      pendiente = 0;
    };
    // Resumen por correo al irse o cambiar de pestaña: a partir de 30 s, y luego solo si suma 2 minutos más.
    const resumir = () => {
      const t = activoTotal.current;
      // Con 30 s o con algún clic (los robots no pulsan); después, solo si suma 2 minutos más.
      if ((t < 30 && acciones.current.length === 0) || (enviadoEn.current >= 0 && t - enviadoEn.current < 120)) return;
      enviadoEn.current = t;
      const porRuta = new Map<string, { titulo: string; segundos: number; scroll: number }>();
      for (const r of recorrido.current) {
        const v = porRuta.get(r.ruta) || { titulo: r.titulo || r.ruta, segundos: 0, scroll: 0 };
        v.segundos += r.segundos;
        v.scroll = Math.max(v.scroll, r.scroll);
        if (r.titulo) v.titulo = r.titulo;
        porRuta.set(r.ruta, v);
      }
      const lista = [...porRuta.entries()]
        .filter(([, v]) => v.segundos >= 3)
        .map(([r, v]) => `${v.titulo} (${r}): ${v.segundos >= 60 ? `${Math.floor(v.segundos / 60)} min ${v.segundos % 60} s` : `${v.segundos} s`}, bajó hasta el ${v.scroll} %`);
      const bloques = [lista.join('\n') || '(no se paró en ninguna página más de 3 segundos)'];
      if (videos.current.length) bloques.push(['El vídeo', ...videos.current].join('\n'));
      if (acciones.current.length) bloques.push([`Lo que ha pulsado (${acciones.current.length})`, ...acciones.current.slice(-60)].join('\n'));
      avisar({ tipo: 'web-tiempo', id: esJesus() ? 'jesus' : '', dispositivo: aparato(), reaccion: String(t), seccion: String(porRuta.size), texto: bloques.join('\n\n') });
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
