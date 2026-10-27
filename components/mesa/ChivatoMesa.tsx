'use client';

// Chivato de la mesa de control (27-oct-2026, petición de Ig: "quiero saber cuándo se conecta, cómo, cuánto tiempo, todo").
// Va aparte de los ficheros copiados de Reformadísimo (Mesa.tsx, Alegria.tsx, Suenos.tsx), así que copiar la mesa de nuevo no lo borra.
// - Correo a Ignacio al entrar: hora, aparato, ciudad y por dónde llega (su correo, la guía o directo).
// - Correo al irse (a partir de 15 segundos con la mesa delante; luego otra vez si suma 1 minuto más): tiempo real,
//   hasta dónde ha bajado y, en orden, qué ha pulsado (pasos de la guía, casillas, pestañas, sueños, "?").
// - Todo queda también en la base de datos (pantalla "mesa"), junto a las visitas de la guía y de la web.
// - Si quien entra es Ignacio (?yo=1 una vez en ese navegador), no avisa. Sin datos personales: un identificador anónimo.
import { useEffect } from 'react';
import { enviarLupa } from '@/components/Lupa';

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
/** Paso de la guía amarilla en el que está (se guarda en el navegador como 0, 1, 2…; "fin" si ya la acabó o la saltó). */
const pasoGuia = () => {
  try {
    const g = localStorage.getItem('rd-mesa-tutorial');
    return g === null ? 1 : g === 'fin' ? 9 : (Number(g) || 0) + 1;
  } catch {
    return 1;
  }
};
const reloj = (s: number) => (s >= 60 ? `${Math.floor(s / 60)} min ${String(s % 60).padStart(2, '0')} s` : `${s} s`);

/** Nombre corto de lo pulsado: la primera línea del botón o su etiqueta, sin el "+" ni flechas. */
function nombreDe(el: Element): string {
  const aria = el.getAttribute('aria-label') || '';
  const texto = ((el as HTMLElement).innerText || '').split('\n').map((x) => x.trim()).filter((x) => x && !/^[+–×↑←→?]$/.test(x))[0] || '';
  const n = (texto || aria).replace(/\s+/g, ' ').trim();
  return n.slice(0, 70);
}

export default function ChivatoMesa() {
  useEffect(() => {
    try {
      const q = location.search;
      if (/[?&]yo=1/.test(q)) localStorage.setItem('tc-guia-yo', '1');
      if (/[?&]yo=0/.test(q)) localStorage.removeItem('tc-guia-yo');
    } catch {}
    if (esYo()) return;

    // Por dónde llega
    let origen = 'directo (escribiendo la dirección o desde un enlace guardado)';
    try {
      const ref = document.referrer;
      if (/[?&]de=correo/.test(location.search)) origen = 'desde tu correo';
      else if (ref.includes('/guia-jesus')) origen = 'desde la guía';
      else if (ref && new URL(ref).host === location.host) origen = 'desde la web nueva';
      else if (/mail\.|outlook|gmail/i.test(ref)) origen = 'desde un correo';
      else if (ref) origen = `desde ${new URL(ref).host}`;
    } catch {}
    let yaGuia = false;
    try {
      yaGuia = !!localStorage.getItem('tc-guia-visita');
    } catch {}
    const primeraVez = (() => {
      try {
        return !localStorage.getItem('rd-mesa-tutorial');
      } catch {
        return false;
      }
    })();

    // Aviso de entrada: como mucho uno cada 30 minutos por navegador (un recargo no vuelve a avisar)
    try {
      const ultima = Number(localStorage.getItem('tc-mesa-visita') || 0);
      if (Date.now() - ultima > 30 * 60000) {
        localStorage.setItem('tc-mesa-visita', String(Date.now()));
        avisar({ tipo: 'mesa', dispositivo: aparato(), reaccion: yaGuia ? 'guia' : '', seccion: primeraVez ? 'primera' : 'otra', texto: origen });
      }
    } catch {}
    enviarLupa({ pantalla: 'mesa', evento: { tipo: 'entrada-mesa', seccion: location.pathname, texto: origen } });

    // Tiempo con la mesa delante y lo que pulsa
    let activo = 0;
    let pendiente = 0;
    let maxScroll = 0;
    let ultimaAccion = Date.now();
    let enviadoEn = -1;
    const acciones: string[] = [];
    const tocar = () => (ultimaAccion = Date.now());
    const eventos = ['scroll', 'click', 'keydown', 'touchstart', 'mousemove'];
    eventos.forEach((e) => window.addEventListener(e, tocar, { passive: true }));
    const cada = setInterval(() => {
      if (document.visibilityState !== 'visible' || Date.now() - ultimaAccion > 180000) return;
      activo++;
      pendiente++;
      const alto = document.documentElement.scrollHeight - innerHeight;
      if (alto > 0) maxScroll = Math.max(maxScroll, Math.round((scrollY / alto) * 100));
    }, 1000);

    const alPulsar = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest('button, a, [role=tab], summary, input[type=range]');
      if (!el || !el.closest('#mesa-rd')) return;
      const nombre = nombreDe(el);
      if (!nombre) return;
      const exp = el.getAttribute('aria-expanded');
      const que =
        el.getAttribute('role') === 'tab' ? `Pestaña «${nombre}»`
        : /^Qué es:/.test(el.getAttribute('aria-label') || '') ? `Pulsa el ? de «${(el.getAttribute('aria-label') || '').replace(/^Qué es:\s*/, '').slice(0, 60)}»`
        : /siguiente|Siguiente/.test(nombre) ? `Guía: ve el paso ${pasoGuia()} de 9 y sigue`
        : nombre === 'Terminar' ? 'Guía: la termina entera (9 de 9)'
        : /Saltar la guía/.test(el.getAttribute('aria-label') || nombre) ? `Guía: la salta en el paso ${pasoGuia()} de 9`
        : exp === 'false' ? `Abre «${nombre}»`
        : exp === 'true' ? `Cierra «${nombre}»`
        : `Pulsa «${nombre}»`;
      const linea = `${reloj(activo)} · ${que}`;
      if (acciones[acciones.length - 1]?.endsWith(que)) return;
      if (acciones.length < 120) acciones.push(linea);
      enviarLupa({ pantalla: 'mesa', evento: { tipo: 'accion-mesa', seccion: que.slice(0, 120), texto: reloj(activo) } });
    };
    document.addEventListener('click', alPulsar, true);

    const guardar = () => {
      if (!pendiente) return;
      enviarLupa({ pantalla: 'mesa', total: pendiente, maxScroll, secciones: [{ id: '/mesa', titulo: 'Mesa de control', segundos: pendiente }] });
      pendiente = 0;
    };
    const resumir = () => {
      if (activo < 15 || (enviadoEn >= 0 && activo - enviadoEn < 60)) return;
      enviadoEn = activo;
      avisar({ tipo: 'mesa-tiempo', dispositivo: aparato(), reaccion: String(activo), seccion: String(maxScroll), texto: acciones.join('\n') || '(solo miró, sin pulsar nada)' });
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
      clearInterval(cada);
      clearInterval(cadaRato);
      eventos.forEach((e) => window.removeEventListener(e, tocar));
      document.removeEventListener('click', alPulsar, true);
      document.removeEventListener('visibilitychange', alOcultar);
      window.removeEventListener('pagehide', alSalir);
    };
  }, []);
  return null;
}
