'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { idiomaDe } from '@/lib/idioma';
import { DESPACHO } from '@/lib/despacho';
import { medir } from '@/lib/medir';

// Botón para guardar o imprimir el resultado de una herramienta: imprime la página limpia
// (sin menús, chat ni avisos) con los datos del despacho arriba. Desde el diálogo de impresión
// se puede "Guardar como PDF".
export function BotonImprimir({ texto }: { texto?: string }) {
  const en = idiomaDe(usePathname()) === 'en';
  return (
    <button
      type="button"
      className="boton boton-claro boton-imprimir no-imprimir"
      onClick={() => {
        medir('resultado_impreso', { pagina: location.pathname });
        window.print();
      }}
    >
      {texto ?? (en ? 'Save or print my result' : 'Guardar o imprimir mi resultado')}
    </button>
  );
}

// Cabecera que solo aparece al imprimir.
export function CabeceraImpresion() {
  const ruta = usePathname();
  const en = idiomaDe(ruta) === 'en';
  const [fecha, setFecha] = useState('');
  useEffect(() => setFecha(new Intl.DateTimeFormat(en ? 'en-GB' : 'es-ES', { dateStyle: 'long' }).format(new Date())), [en]);
  // La guía privada para Jesús no lleva el aviso para clientes al imprimirla.
  if (ruta.startsWith('/guia-jesus')) return null;
  return (
    <div className="solo-impresion cabecera-impresion" aria-hidden="true">
      <img src="/img/logo-tc.webp" alt="" width={168} height={40} />
      <div>
        <strong>{DESPACHO.nombre}</strong>
        <span>
          {DESPACHO.direccion}, {DESPACHO.ciudad} · {DESPACHO.telefono} · WhatsApp {DESPACHO.whatsapp} · tiernocentella.es
        </span>
        <span>
          {en ? 'Printed on' : 'Impreso el'} {fecha}. {en ? 'General guidance; it does not replace a lawyer reviewing your case.' : 'Orientación general; no sustituye el estudio de tu caso por un abogado.'}
        </span>
      </div>
    </div>
  );
}

// Escuchar el texto de la guía con la voz del propio navegador.
export function Escuchar({ selector = '.prosa' }: { selector?: string }) {
  const en = idiomaDe(usePathname()) === 'en';
  const [disponible, setDisponible] = useState(false);
  const [estado, setEstado] = useState<'parado' | 'leyendo' | 'pausa'>('parado');
  useEffect(() => {
    setDisponible(typeof window !== 'undefined' && 'speechSynthesis' in window);
    return () => {
      try {
        window.speechSynthesis?.cancel();
      } catch {}
    };
  }, []);
  if (!disponible) return null;
  const empezar = () => {
    const el = document.querySelector(selector) as HTMLElement | null;
    if (!el) return;
    const s = window.speechSynthesis;
    s.cancel();
    const texto = el.innerText.replace(/\s+/g, ' ').trim();
    // Trozos cortos: algunos navegadores cortan las lecturas muy largas.
    const trozos = texto.match(/[^.!?]+[.!?]+|\S[^.!?]*$/g) ?? [texto];
    const lang = en ? 'en-GB' : 'es-ES';
    const voz = s.getVoices().find((v) => v.lang.startsWith(en ? 'en' : 'es'));
    trozos.forEach((t, i) => {
      const u = new SpeechSynthesisUtterance(t.trim());
      u.lang = lang;
      if (voz) u.voice = voz;
      u.rate = 0.95;
      if (i === trozos.length - 1) u.onend = () => setEstado('parado');
      s.speak(u);
    });
    setEstado('leyendo');
    medir('guia_escuchada', { pagina: location.pathname });
  };
  return (
    <div className="escuchar no-imprimir">
      {estado === 'parado' && (
        <button type="button" onClick={empezar}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M11 5 6 9H2v6h4l5 4V5z" />
            <path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14" />
          </svg>
          {en ? 'Listen to this guide' : 'Escuchar esta guía'}
        </button>
      )}
      {estado !== 'parado' && (
        <>
          <button
            type="button"
            onClick={() => {
              if (estado === 'leyendo') {
                window.speechSynthesis.pause();
                setEstado('pausa');
              } else {
                window.speechSynthesis.resume();
                setEstado('leyendo');
              }
            }}
          >
            {estado === 'leyendo' ? (en ? 'Pause' : 'Pausar') : en ? 'Continue' : 'Seguir'}
          </button>
          <button
            type="button"
            onClick={() => {
              window.speechSynthesis.cancel();
              setEstado('parado');
            }}
          >
            {en ? 'Stop' : 'Parar'}
          </button>
        </>
      )}
    </div>
  );
}

// En el ordenador, WhatsApp no siempre está abierto: al pulsar un enlace de WhatsApp enseñamos
// un código QR para escanearlo con el móvil, además de la opción de abrir WhatsApp Web.
export function WhatsappQR() {
  const en = idiomaDe(usePathname()) === 'en';
  const [url, setUrl] = useState('');
  const [svg, setSvg] = useState('');
  const caja = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const clic = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
      const a = (e.target as HTMLElement | null)?.closest?.('a');
      const href = a?.getAttribute('href') || '';
      if (!href.startsWith('https://wa.me/')) return;
      const escritorio = window.matchMedia('(min-width: 900px) and (pointer: fine)').matches;
      if (!escritorio) return;
      e.preventDefault();
      setUrl(href);
    };
    document.addEventListener('click', clic);
    return () => document.removeEventListener('click', clic);
  }, []);
  useEffect(() => {
    if (!url) return;
    let vivo = true;
    import('qrcode').then((q) =>
      q.toString(url, { type: 'svg', margin: 1, color: { dark: '#0d2c48', light: '#ffffff' } }).then((s) => vivo && setSvg(s)),
    );
    caja.current?.focus();
    const tecla = (e: KeyboardEvent) => e.key === 'Escape' && setUrl('');
    window.addEventListener('keydown', tecla);
    return () => {
      vivo = false;
      window.removeEventListener('keydown', tecla);
    };
  }, [url]);
  if (!url) return null;
  const web = url.replace('https://wa.me/', 'https://web.whatsapp.com/send?phone=').replace('?text=', '&text=');
  return (
    <div className="salida-fondo" onClick={() => setUrl('')}>
      <div className="salida wa-qr" role="dialog" aria-modal="true" aria-labelledby="wa-qr-titulo" tabIndex={-1} ref={caja} onClick={(e) => e.stopPropagation()}>
        <button type="button" className="salida-cerrar" onClick={() => setUrl('')} aria-label={en ? 'Close' : 'Cerrar'}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
        <p className="etiqueta-calida">WhatsApp</p>
        <h2 id="wa-qr-titulo">{en ? 'Scan it with your phone' : 'Escanéalo con tu móvil'}</h2>
        <p>{en ? 'Open your phone camera and point it at the code: WhatsApp opens with the message already written.' : 'Abre la cámara del móvil y apunta al código: se abre WhatsApp con el mensaje ya escrito.'}</p>
        <div className="wa-qr-codigo" dangerouslySetInnerHTML={{ __html: svg }} />
        <div className="acciones">
          <a
            className="boton boton-marcador"
            href={web}
            target="_blank"
            rel="noopener"
            onClick={() => {
              medir('whatsapp_web_qr');
              setUrl('');
            }}
          >
            {en ? 'Open WhatsApp Web' : 'Abrir WhatsApp Web'}
          </a>
          <a className="boton boton-claro" href={url} target="_blank" rel="noopener" onClick={() => setUrl('')}>
            {en ? 'Open the WhatsApp app' : 'Abrir la aplicación'}
          </a>
        </div>
        <p className="letra-pequena">
          {en ? 'Or save our number:' : 'O guarda nuestro número:'} +34 {DESPACHO.whatsapp}
        </p>
      </div>
    </div>
  );
}

// Idioma del documento según la página (la web comparte una sola plantilla para los dos idiomas).
export function IdiomaHtml() {
  const ruta = usePathname();
  useEffect(() => {
    document.documentElement.lang = idiomaDe(ruta) === 'en' ? 'en' : 'es';
  }, [ruta]);
  return null;
}

export function AvisoDemo() {
  const en = idiomaDe(usePathname()) === 'en';
  return <div className="aviso-demo" role="region" aria-label={en ? 'Notice' : 'Aviso'}>{en ? "Demo version. This is not the firm's official website." : 'Versión de demostración. No es la web oficial del despacho.'}</div>;
}
