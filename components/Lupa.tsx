'use client';

// La lupa: mide, sin saber quién es, qué apartado tiene delante cada visitante y cuánto tiempo, y lo manda
// al servidor cada 20 segundos y al salir. Cuenta solo el tiempo con la página visible y sin estar parado
// más de 3 minutos. Si quien mira es Ignacio (?yo=1 en ese navegador), lo marca como propio para poder filtrarlo.
import { useEffect } from 'react';

const uid = () => (typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`);

export function idVisitante() {
  try {
    let v = localStorage.getItem('tc-lupa-id');
    if (!v) {
      v = uid();
      localStorage.setItem('tc-lupa-id', v);
    }
    let s = sessionStorage.getItem('tc-lupa-sesion');
    if (!s) {
      s = uid();
      sessionStorage.setItem('tc-lupa-sesion', s);
    }
    return { visitante: v, sesion: s, propio: !!localStorage.getItem('tc-guia-yo') };
  } catch {
    return null;
  }
}

export function enviarLupa(datos: Record<string, unknown>) {
  const ids = idVisitante();
  if (!ids) return;
  const cuerpo = JSON.stringify({ ...ids, dispositivo: /Mobi|Android|iPhone/i.test(navigator.userAgent) ? 'móvil' : 'ordenador', ...datos });
  try {
    if (navigator.sendBeacon && navigator.sendBeacon('/api/lectura', new Blob([cuerpo], { type: 'application/json' }))) return;
  } catch {}
  fetch('/api/lectura', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: cuerpo, keepalive: true }).catch(() => {});
}

export default function Lupa({ pantalla = 'guia', selector = 'section.gj-seccion, [data-lupa]' }: { pantalla?: string; selector?: string }) {
  useEffect(() => {
    let ultimaAccion = Date.now();
    let maxScroll = 0;
    let total = 0;
    const tiempos: Record<string, { titulo: string; segundos: number }> = {};
    const tocar = () => (ultimaAccion = Date.now());
    const eventos = ['scroll', 'click', 'keydown', 'touchstart', 'mousemove'];
    eventos.forEach((e) => window.addEventListener(e, tocar, { passive: true }));

    const reloj = setInterval(() => {
      if (document.visibilityState !== 'visible' || Date.now() - ultimaAccion > 180000) return;
      total++;
      const alto = document.documentElement.scrollHeight - innerHeight;
      if (alto > 0) maxScroll = Math.max(maxScroll, Math.round((scrollY / alto) * 100));
      // El apartado que ocupa el centro de la pantalla suma un segundo.
      const puntos: [number, number][] = [[innerWidth / 2, innerHeight * 0.45], [innerWidth / 2, innerHeight * 0.7]];
      for (const [x, y] of puntos) {
        const el = document.elementFromPoint(x, y)?.closest(selector) as HTMLElement | null;
        if (el) {
          const id = el.id || el.getAttribute('data-lupa') || '';
          if (!id) break;
          const titulo = el.getAttribute('data-lupa') || el.querySelector('h1, h2')?.textContent?.trim() || id;
          tiempos[id] = tiempos[id] || { titulo, segundos: 0 };
          tiempos[id].segundos++;
          break;
        }
      }
    }, 1000);

    const enviar = () => {
      const secciones = Object.entries(tiempos).filter(([, t]) => t.segundos > 0).map(([id, t]) => ({ id, titulo: t.titulo, segundos: t.segundos }));
      if (total === 0 && secciones.length === 0) return;
      enviarLupa({ pantalla, total, maxScroll, secciones });
      for (const k of Object.keys(tiempos)) delete tiempos[k];
      total = 0;
    };
    const cadaRato = setInterval(enviar, 20000);
    const alOcultar = () => document.visibilityState === 'hidden' && enviar();
    document.addEventListener('visibilitychange', alOcultar);
    window.addEventListener('pagehide', enviar);
    return () => {
      enviar();
      clearInterval(reloj);
      clearInterval(cadaRato);
      eventos.forEach((e) => window.removeEventListener(e, tocar));
      document.removeEventListener('visibilitychange', alOcultar);
      window.removeEventListener('pagehide', enviar);
    };
  }, [pantalla, selector]);
  return null;
}
