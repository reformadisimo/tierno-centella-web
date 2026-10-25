'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { DESPACHO, enlaceWhatsapp } from '@/lib/despacho';
import { medir } from '@/lib/medir';
import { temaActual, VENTANAS } from '@/lib/contexto';
import Icono from './Iconos';

// Aviso de salida: cuando alguien se va sin haber hecho nada, le ofrecemos un último paso útil
// (su tema, una calculadora, el chat, una llamada o los pasos de su caso por correo).
// Sale como mucho una vez cada 7 días, nunca en la guía o contacto,
// (en las landings de anuncios, una versión que no saca a nadie de la página),
// ni si ya escribió al chat, envió un formulario o todavía no ha elegido las cookies.
const CLAVE = 'tc-salida';
const DIAS = 7;
const RUTAS_FUERA = ['/guia-jesus', '/crm', '/contacto', '/privacidad', '/cookies', '/aviso-legal', '/buscar', '/en', '/conversaciones'];

const TEMAS = [
  { href: '/despido', texto: 'Me han despedido', icono: 'caja', clase: 'vt-azul' },
  { href: '/acoso-laboral', texto: 'Sufro acoso en el trabajo', icono: 'personas', clase: 'vt-coral' },
  { href: '/incapacidad-permanente', texto: 'Incapacidad o baja larga', icono: 'sillaRuedas', clase: 'vt-morado' },
  { href: '/mujer-y-trabajo', texto: 'Embarazo o conciliación', icono: 'corazon', clase: 'vt-rosa' },
];

const CALCULOS = [
  { href: '/calculadora-indemnizacion', texto: 'Indemnización' },
  { href: '/herramientas/calculadora-paro', texto: 'Paro' },
  { href: '/herramientas/calculadora-finiquito', texto: 'Finiquito' },
  { href: '/herramientas', texto: 'Todas' },
];

// Para enseñarlo en una demostración: añadir ?salida=1 a la dirección lo muestra siempre.
const demo = () => {
  try {
    return new URLSearchParams(location.search).get('salida') === '1';
  } catch {
    return false;
  }
};

function puedeSalir(): boolean {
  if (demo()) return true;
  try {
    if (!localStorage.getItem('tc-cookies')) return false;
    const ultima = Number(localStorage.getItem(CLAVE) || 0);
    return Date.now() - ultima > DIAS * 864e5;
  } catch {
    return false;
  }
}

// La cifra grande de cada tema: lo que la persona más necesita saber en un segundo.
const CIFRAS: Record<string, { n: number; mas?: boolean; texto: string }> = {
  despido: { n: 20, texto: 'días hábiles para reclamar un despido' },
  acoso: { n: 7, texto: 'preguntas para saber si es acoso' },
  incapacidad: { n: 30, texto: 'días hábiles para reclamar si te la deniegan' },
  mujer: { n: 19, texto: 'semanas de permiso por nacimiento para cada progenitor' },
  sentencias: { n: 25, mas: true, texto: 'años defendiendo a trabajadoras y trabajadores' },
  empresas: { n: 25, mas: true, texto: 'años de experiencia en derecho laboral' },
  general: { n: 25, mas: true, texto: 'años defendiendo a trabajadoras y trabajadores' },
};

function useCuenta(objetivo: number, activo: boolean) {
  const [v, setV] = useState(objetivo);
  useEffect(() => {
    if (!activo || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let f = 0;
    const t0 = performance.now();
    const paso = (t: number) => {
      const k = Math.min(1, (t - t0) / 900);
      setV(Math.round(objetivo * (1 - Math.pow(1 - k, 3))));
      if (k < 1) f = requestAnimationFrame(paso);
    };
    setV(0);
    f = requestAnimationFrame(paso);
    return () => cancelAnimationFrame(f);
  }, [objetivo, activo]);
  return v;
}

export default function AvisoSalida() {
  const ruta = usePathname();
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [tema, setTema] = useState('');
  const [acepto, setAcepto] = useState(false);
  const [estado, setEstado] = useState<'listo' | 'enviando' | 'hecho' | 'error'>('listo');
  const [error, setError] = useState('');
  const hecho = useRef(false);
  const caja = useRef<HTMLDivElement>(null);

  const fuera = RUTAS_FUERA.some((r) => ruta.startsWith(r));
  const enLanding = ruta.startsWith('/consulta/');

  useEffect(() => {
    if (fuera) return;
    const inicio = Date.now();
    // Quien ya ha actuado no necesita el aviso.
    const actuo = () => (hecho.current = true);
    window.addEventListener('abrir-asistente', actuo);
    const enviado = (e: Event) => {
      if ((e.target as HTMLElement).tagName === 'FORM') actuo();
    };
    document.addEventListener('submit', enviado, true);

    const mostrar = (motivo: string) => {
      if (hecho.current || Date.now() - inicio < (demo() ? 1500 : 8000) || !puedeSalir()) return;
      if (document.querySelector('.asistente-panel') || (!demo() && document.querySelector('.cookies'))) return;
      hecho.current = true;
      try {
        localStorage.setItem(CLAVE, String(Date.now()));
      } catch {}
      setVisible(true);
      medir('salida_mostrada', { motivo });
    };

    // Ordenador: el ratón sale por arriba de la ventana (hacia la pestaña o la barra de direcciones).
    const raton = (e: MouseEvent) => {
      if (!e.relatedTarget && e.clientY <= 0) mostrar('raton');
    };
    // Móvil: tras leer un buen trozo, sube deprisa hacia arriba (gesto típico de irse).
    let ultimaY = window.scrollY;
    let ultimaT = Date.now();
    let maxLeido = 0;
    const desplazar = () => {
      const y = window.scrollY;
      const t = Date.now();
      const alto = document.documentElement.scrollHeight - window.innerHeight;
      if (alto > 0) maxLeido = Math.max(maxLeido, y / alto);
      const velocidad = (ultimaY - y) / Math.max(1, t - ultimaT);
      if (window.innerWidth < 900 && maxLeido > (demo() ? 0.1 : 0.4) && velocidad > 2.5 && Date.now() - inicio > (demo() ? 3000 : 25000)) mostrar('movil');
      ultimaY = y;
      ultimaT = t;
    };
    document.addEventListener('mouseout', raton);
    window.addEventListener('scroll', desplazar, { passive: true });
    return () => {
      window.removeEventListener('abrir-asistente', actuo);
      document.removeEventListener('submit', enviado, true);
      document.removeEventListener('mouseout', raton);
      window.removeEventListener('scroll', desplazar);
    };
  }, [fuera, ruta]);

  useEffect(() => {
    if (!visible) return;
    caja.current?.focus();
    const tecla = (e: KeyboardEvent) => e.key === 'Escape' && setVisible(false);
    window.addEventListener('keydown', tecla);
    return () => window.removeEventListener('keydown', tecla);
  }, [visible]);

  const [verCorreo, setVerCorreo] = useState(false);
  const temaLeido0 = temaActual(ruta);
  const cifra = CIFRAS[enLanding ? (ruta.includes('incapacidad') ? 'incapacidad' : ruta.includes('acoso') ? 'acoso' : 'despido') : CIFRAS[temaLeido0] ? temaLeido0 : 'general'];
  const cuenta = useCuenta(cifra.n, visible);
  if (!visible) return null;
  const temaLeido = temaActual(ruta);
  const propio = ['despido', 'acoso', 'incapacidad', 'mujer', 'sentencias', 'empresas'].includes(temaLeido) ? VENTANAS[temaLeido] : null;

  const elegir = (opcion: string) => {
    medir('salida_opcion', { opcion });
    setVisible(false);
  };

  async function apuntar(e: React.FormEvent) {
    e.preventDefault();
    setEstado('enviando');
    setError('');
    try {
      const r = await fetch('/api/journey', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, tema, acepto, origen: `aviso de salida en ${ruta}` }),
      });
      const j = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(j.error || 'No se pudo apuntar.');
      setEstado('hecho');
      medir('salida_opcion', { opcion: 'correo' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo apuntar.');
      setEstado('error');
    }
  }

  const tituloLanding = '¿Te ayudamos con tu caso?';
  return (
    <div className="sx-fondo" onClick={() => setVisible(false)}>
      <div className="sx" role="dialog" aria-modal="true" aria-labelledby="salida-titulo" tabIndex={-1} ref={caja} onClick={(e) => e.stopPropagation()}>
        <button type="button" className="sx-cerrar" onClick={() => setVisible(false)} aria-label="Cerrar">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        <div className="sx-cifra" aria-hidden={false}>
          <p className="sx-antes">{propio && !enLanding ? `Antes de irte · ${propio.etiqueta}` : 'Antes de irte'}</p>
          <p className="sx-numero" aria-label={`${cifra.n}${cifra.mas ? ' o más' : ''} ${cifra.texto}`}>
            <span aria-hidden="true">{cuenta}{cifra.mas ? '+' : ''}</span>
          </p>
          <p className="sx-cifra-texto" aria-hidden="true">{cifra.texto}</p>
        </div>

        <div className="sx-cuerpo">
          <h2 id="salida-titulo">{!enLanding && propio ? (temaLeido === 'despido' ? 'No dejes pasar tu plazo' : propio.titulo) : tituloLanding}</h2>
          <p className="sx-texto">
            {enLanding
              ? 'Un abogado puede decirte hoy si tienes caso y cuánto plazo te queda. Sin compromiso de contratar.'
              : propio
                ? propio.texto
                : 'Elige lo que más se parece a lo tuyo y te llevamos directo a lo que necesitas.'}
          </p>

          {enLanding ? (
            <>
              <a
                className="boton sx-principal"
                href="#lf-arriba"
                onClick={() => {
                  elegir('formulario landing');
                  setTimeout(() => document.querySelector<HTMLSelectElement>('#lf-arriba select')?.focus(), 300);
                }}
              >
                Que me llaméis vosotros
              </a>
              <div className="sx-secundarias">
                <a href={enlaceWhatsapp('Hola, quiero consultar mi caso.')} className="sx-wa" onClick={() => elegir('whatsapp')}>
                  <Icono nombre="whatsapp" tam={18} /> WhatsApp
                </a>
                <a href={DESPACHO.telefonoHref} onClick={() => elegir('llamar')}>
                  <Icono nombre="telefono" tam={17} /> Llamar
                </a>
                <a href="#lp-herramienta" onClick={() => elegir('herramienta landing')}>
                  {ruta.includes('incapacidad') ? 'Ver mi grado' : ruta.includes('acoso') ? 'Hacer el test' : 'Calcular indemnización'}
                </a>
              </div>
            </>
          ) : propio ? (
            <>
              <Link className="boton sx-principal" href={propio.principal.href} onClick={() => elegir(propio.principal.texto)}>
                {propio.principal.texto}
              </Link>
              <div className="sx-secundarias">
                {propio.secundaria && (
                  <Link href={propio.secundaria.href} onClick={() => elegir(propio.secundaria!.texto)}>
                    {propio.secundaria.texto}
                  </Link>
                )}
                <a href={enlaceWhatsapp(propio.whatsapp)} className="sx-wa" onClick={() => elegir('whatsapp')}>
                  <Icono nombre="whatsapp" tam={18} /> WhatsApp
                </a>
                <a href={DESPACHO.telefonoHref} onClick={() => elegir('llamar')}>
                  <Icono nombre="telefono" tam={17} /> Llamar
                </a>
              </div>
            </>
          ) : (
            <div className="sx-temas">
              {TEMAS.map((t) => (
                <Link key={t.href} href={t.href} className={t.clase} onClick={() => elegir(t.texto)}>
                  <span className="st-icono"><Icono nombre={t.icono} tam={18} /></span>
                  {t.texto}
                </Link>
              ))}
            </div>
          )}

          <p className="sx-chat">
            ¿Prefieres preguntar primero?{' '}
            <button
              type="button"
              onClick={() => {
                elegir('chat');
                window.dispatchEvent(new Event('abrir-asistente'));
              }}
            >
              Habla con el asistente
            </button>
          </p>

          {estado === 'hecho' ? (
            <p className="salida-hecho" role="status">
              Hecho. En unos minutos te llega el primer correo con los pasos para tu caso.
            </p>
          ) : verCorreo ? (
            <form className="salida-correo" onSubmit={apuntar}>
              <strong>Te mandamos por correo los pasos para tu caso</strong>
              <div className="salida-correo-fila">
                <select aria-label="Tu tema" value={tema} onChange={(e) => setTema(e.target.value)} required>
                  <option value="">Tu tema</option>
                  <option>Despido</option>
                  <option>Acoso laboral</option>
                  <option>Incapacidad o baja</option>
                  <option>Embarazo o conciliación</option>
                  <option>Otro</option>
                </select>
                <input type="email" aria-label="Tu correo" placeholder="Tu correo" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                <button type="submit" className="boton" disabled={estado === 'enviando'}>
                  {estado === 'enviando' ? 'Enviando...' : 'Enviármelo'}
                </button>
              </div>
              <label className="casilla salida-casilla">
                <input type="checkbox" required checked={acepto} onChange={(e) => setAcepto(e.target.checked)} />
                <span>
                  Acepto recibir estos correos (pocos y útiles; me doy de baja con un clic). <Link href="/privacidad">Privacidad</Link>.
                </span>
              </label>
              {estado === 'error' && (
                <p className="salida-error" role="alert">
                  {error}
                </p>
              )}
            </form>
          ) : (
            <p className="sx-chat">
              <button type="button" onClick={() => setVerCorreo(true)}>Prefiero que me lo mandéis por correo</button>
            </p>
          )}

          <button type="button" className="sx-no" onClick={() => setVisible(false)}>
            No, gracias
          </button>
        </div>
      </div>
    </div>
  );
}
