'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { anotarVisita, recorrido, temaActual, VENTANAS, VENTANAS_EN, type Tema, type Ventana } from '@/lib/contexto';
import { enlaceWhatsapp } from '@/lib/despacho';
import { medir } from '@/lib/medir';
import Icono from './Iconos';

// Tarjeta discreta que aparece mientras se lee, adaptada a lo que la persona está buscando según su navegación
// (despido, acoso, incapacidad, mujer y trabajo, sentencias, empresas...). Sale una sola vez por visita,
// nunca encima del chat, del aviso de cookies o de un formulario, y nunca a quien ya ha escrito o llamado.
const CLAVE = 'tc-ventana';
// En las herramientas no sale: la persona ya está haciendo justo lo que la ventana le propondría.
const FUERA = ['/herramientas', '/calculadora-indemnizacion', '/en/tools', '/guia-jesus', '/conversaciones', '/contacto', '/en/contact', '/consulta/', '/privacidad', '/cookies', '/aviso-legal', '/buscar', '/en/search'];
const SALIDA_RAPIDA = ['/acoso-laboral', '/mujer-y-trabajo', '/herramientas/test-acoso', '/en/workplace-harassment', '/en/women-at-work'];

// Icono y color de cada tema, para que la tarjeta no sea solo texto.
const ICONO_TEMA: Record<Tema, string> = { despido: 'caja', acoso: 'personas', incapacidad: 'sillaRuedas', mujer: 'corazon', sentencias: 'balanza', empresas: 'edificio', herramientas: 'calculadora', general: 'sol' };
const TEMAS_RAPIDOS = [
  { href: '/despido', icono: 'caja', texto: 'Me han despedido', clase: 'vt-azul' },
  { href: '/acoso-laboral', icono: 'personas', texto: 'Sufro acoso', clase: 'vt-coral' },
  { href: '/incapacidad-permanente', icono: 'sillaRuedas', texto: 'Incapacidad o baja', clase: 'vt-morado' },
  { href: '/mujer-y-trabajo', icono: 'corazon', texto: 'Embarazo o conciliación', clase: 'vt-rosa' },
];
const TEMAS_RAPIDOS_EN = [
  { href: '/en/dismissal', icono: 'caja', texto: 'I was dismissed', clase: 'vt-azul' },
  { href: '/en/workplace-harassment', icono: 'personas', texto: 'Harassment at work', clase: 'vt-coral' },
  { href: '/en/permanent-disability', icono: 'sillaRuedas', texto: 'Disability or sick leave', clase: 'vt-morado' },
  { href: '/en/women-at-work', icono: 'corazon', texto: 'Pregnancy or family', clase: 'vt-rosa' },
];

function yaSalio() {
  try {
    return !!sessionStorage.getItem(CLAVE) || !localStorage.getItem('tc-cookies');
  } catch {
    return true;
  }
}

export default function VentanaContextual() {
  const ruta = usePathname();
  const [ventana, setVentana] = useState<{ v: Ventana; tema: Tema } | null>(null);
  const actuo = useRef(false);
  const en = ruta === '/en' || ruta.startsWith('/en/');
  const fuera = FUERA.some((r) => ruta.startsWith(r));

  useEffect(() => {
    anotarVisita(ruta);
  }, [ruta]);

  useEffect(() => {
    // Quien ya ha actuado (chat, formulario, llamada o WhatsApp) no necesita la tarjeta.
    const marcar = () => (actuo.current = true);
    const clic = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest('a');
      if (a && /^tel:|wa\.me|whatsapp/.test(a.getAttribute('href') || '')) marcar();
    };
    window.addEventListener('abrir-asistente', marcar);
    document.addEventListener('submit', marcar, true);
    document.addEventListener('click', clic, true);
    return () => {
      window.removeEventListener('abrir-asistente', marcar);
      document.removeEventListener('submit', marcar, true);
      document.removeEventListener('click', clic, true);
    };
  }, []);

  useEffect(() => {
    setVentana(null);
    if (fuera) return;
    const inicio = Date.now();
    let leido = 0;
    const comprobar = () => {
      if (actuo.current || yaSalio()) return;
      if (document.querySelector('.asistente-panel, .cookies, .salida-fondo')) return;
      const segundos = (Date.now() - inicio) / 1000;
      const paginas = recorrido().length;
      const listo = (segundos > 30 && (paginas >= 2 || leido > 0.5)) || (segundos > 15 && leido > 0.6) || segundos > 70;
      if (!listo) return;
      const tema = temaActual(ruta);
      const v = en ? (VENTANAS_EN[tema] ?? VENTANAS_EN.general) : VENTANAS[tema];
      try {
        sessionStorage.setItem(CLAVE, '1');
      } catch {}
      setVentana({ v, tema });
      medir('ventana_mostrada', { tema });
    };
    const desplazar = () => {
      const alto = document.documentElement.scrollHeight - window.innerHeight;
      if (alto > 0) leido = Math.max(leido, window.scrollY / alto);
    };
    const reloj = window.setInterval(comprobar, 3000);
    window.addEventListener('scroll', desplazar, { passive: true });
    return () => {
      window.clearInterval(reloj);
      window.removeEventListener('scroll', desplazar);
    };
  }, [ruta, fuera, en]);

  if (!ventana) return null;
  const { v, tema } = ventana;
  const cerrar = (opcion: string) => {
    medir('ventana_opcion', { tema, opcion });
    setVentana(null);
  };
  const conSalida = SALIDA_RAPIDA.some((r) => ruta.startsWith(r));

  return (
    <div className={`ventana-contexto vc-${tema}${conSalida ? ' ventana-alta' : ''}`} role="dialog" aria-labelledby="ventana-titulo" aria-modal="false">
      <button type="button" className="ventana-cerrar" onClick={() => cerrar('cerrar')} aria-label={en ? 'Close' : 'Cerrar'}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>
      <div className="ventana-cabeza">
        <img className="ventana-avatar" src="/img/abogada-sonrie-640.webp" alt="" width={56} height={56} loading="lazy" />
        <span className="ventana-icono"><Icono nombre={ICONO_TEMA[tema]} tam={18} /></span>
        <div>
          <p className="ventana-etiqueta">{v.etiqueta}</p>
          <p className="ventana-titulo" id="ventana-titulo">
            {v.titulo}
          </p>
        </div>
      </div>
      <p className="ventana-texto">{v.texto}</p>
      {tema === 'general' ? (
        <div className="ventana-temas">
          {(en ? TEMAS_RAPIDOS_EN : TEMAS_RAPIDOS).map((t) => (
            <Link key={t.href} href={t.href} className={t.clase} onClick={() => cerrar(t.texto)}>
              <Icono nombre={t.icono} tam={18} />
              <span>{t.texto}</span>
            </Link>
          ))}
        </div>
      ) : (
        <div className="ventana-botones">
          <Link className="boton boton-marcador" href={v.principal.href} onClick={() => cerrar(v.principal.texto)}>
            <Icono nombre={tema === 'herramientas' || tema === 'sentencias' ? 'telefono' : 'checkCirculo'} tam={17} /> {v.principal.texto}
          </Link>
          {v.secundaria && (
            <Link className="boton boton-claro" href={v.secundaria.href} onClick={() => cerrar(v.secundaria!.texto)}>
              {v.secundaria.texto}
            </Link>
          )}
        </div>
      )}
      <div className="ventana-pie">
        <a href={enlaceWhatsapp(v.whatsapp)} className="ventana-wa" onClick={() => cerrar('whatsapp')}>
          <Icono nombre="whatsapp" tam={17} /> {en ? 'WhatsApp us' : 'Por WhatsApp'}
        </a>
        <button
          type="button"
          className="boton-enlace ventana-chat"
          onClick={() => {
            cerrar('chat');
            window.dispatchEvent(new Event('abrir-asistente'));
          }}
        >
          <Icono nombre="chat" tam={17} /> {en ? 'Ask the chat' : 'Preguntar al chat'}
        </button>
      </div>
    </div>
  );
}
