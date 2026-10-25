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

  return (
    <div className="salida-fondo" onClick={() => setVisible(false)}>
      <div
        className="salida"
        role="dialog"
        aria-modal="true"
        aria-labelledby="salida-titulo"
        tabIndex={-1}
        ref={caja}
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className="salida-cerrar" onClick={() => setVisible(false)} aria-label="Cerrar">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
        <div className="salida-cabeza">
          <img className="salida-avatar" src="/img/abogada-sonrie-640.webp" alt="" width={64} height={64} loading="lazy" />
          <div>
            <p className="etiqueta-calida">{propio ? `Antes de irte · ${propio.etiqueta}` : 'Antes de irte'}</p>
            <h2 id="salida-titulo">{!enLanding && propio ? propio.titulo : '¿Te ayudamos con tu caso?'}</h2>
          </div>
        </div>
        {enLanding ? (
          <>
            <p className="salida-intro">Un abogado puede decirte hoy si tienes caso y cuánto plazo te queda. Sin compromiso de contratar.</p>
            <div className="salida-temas">
              <a
                href="#lf-arriba"
                onClick={() => {
                  elegir('formulario landing');
                  setTimeout(() => document.querySelector<HTMLSelectElement>('#lf-arriba select')?.focus(), 300);
                }}
              >
                Que me llaméis vosotros
              </a>
              <a href={enlaceWhatsapp('Hola, quiero consultar mi caso.')} onClick={() => elegir('whatsapp')}>
                Escribir por WhatsApp
              </a>
              <a
                href="#lp-herramienta"
                onClick={() => {
                  elegir('herramienta landing');
                  setVisible(false);
                }}
              >
                {ruta.includes('incapacidad') ? 'Comprobar qué grado me corresponde' : ruta.includes('acoso') ? 'Hacer el test: ¿es acoso?' : 'Calcular mi indemnización'}
              </a>
            </div>
            <div className="salida-fila">
              <div>
                <strong>¿Prefieres preguntar primero?</strong>
                <p className="salida-intro" style={{ margin: '4px 0 0' }}>El chat te responde al momento, a cualquier hora.</p>
              </div>
              <div className="salida-acciones">
                <button
                  type="button"
                  className="boton"
                  onClick={() => {
                    elegir('chat');
                    window.dispatchEvent(new Event('abrir-asistente'));
                  }}
                >
                  Preguntar al chat
                </button>
                <a className="boton boton-marcador" href={DESPACHO.telefonoHref} onClick={() => elegir('llamar')}>
                  Llamar
                </a>
              </div>
            </div>
          </>
        ) : (
          <>
        {propio ? (
          <>
            <p className="salida-intro">{propio.texto}</p>
            <div className="salida-temas salida-propio">
              <Link href={propio.principal.href} onClick={() => elegir(propio.principal.texto)}>
                {propio.principal.texto}
              </Link>
              {propio.secundaria && (
                <Link href={propio.secundaria.href} onClick={() => elegir(propio.secundaria!.texto)}>
                  {propio.secundaria.texto}
                </Link>
              )}
              <a href={enlaceWhatsapp(propio.whatsapp)} className="salida-wa" onClick={() => elegir('whatsapp')}>
                <Icono nombre="whatsapp" tam={18} /> Escribir por WhatsApp
              </a>
            </div>
            <p className="salida-intro" style={{ marginTop: 18 }}>¿Es otra cosa?</p>
          </>
        ) : (
          <p className="salida-intro">Elige lo que más se parece a lo tuyo y te llevamos directo.</p>
        )}

            <div className="salida-temas salida-temas-iconos">
              {TEMAS.filter((t) => !propio || !ruta.startsWith(t.href)).map((t) => (
                <Link key={t.href} href={t.href} className={t.clase} onClick={() => elegir(t.texto)}>
                  <span className="st-icono"><Icono nombre={t.icono} tam={18} /></span>
                  {t.texto}
                </Link>
              ))}
            </div>

            <div className="salida-fila">
              <div>
                <strong>Calcula lo tuyo</strong>
                <div className="salida-chips">
                  {CALCULOS.map((c) => (
                    <Link key={c.href} href={c.href} onClick={() => elegir(`calcular ${c.texto}`)}>
                      {c.texto}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="salida-acciones">
                <button
                  type="button"
                  className="boton"
                  onClick={() => {
                    elegir('chat');
                    window.dispatchEvent(new Event('abrir-asistente'));
                  }}
                >
                  <Icono nombre="chat" tam={17} /> Preguntar al chat
                </button>
                <a className="boton boton-marcador" href={DESPACHO.telefonoHref} onClick={() => elegir('llamar')}>
                  <Icono nombre="telefono" tam={17} /> Llamar
                </a>
              </div>
            </div>
          </>
        )}

        {estado === 'hecho' ? (
          <p className="salida-hecho" role="status">
            Hecho. En unos minutos te llega el primer correo con los pasos para tu caso.
          </p>
        ) : (
          <form className="salida-correo" onSubmit={apuntar}>
            <strong>O te mandamos por correo los pasos para tu caso</strong>
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
        )}
      </div>
    </div>
  );
}
