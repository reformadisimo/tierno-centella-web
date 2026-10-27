'use client';

// La lupa de la web (demostración): un mapa de calor propio, pintado encima de la web de verdad.
// Todos los datos son inventados y se generan aquí mismo (sin base de datos), siempre iguales para los mismos filtros.
// La web va dentro de un iframe del mismo dominio, así que se puede pintar dentro de su propia página:
// el calor de los toques, los toques en algo que no hace nada y hasta dónde baja la gente.
// Las notas sí son de verdad: se guardan y nos llegan por correo con la página y el sitio exacto.
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { enviarLupa } from './Lupa';

type Dispositivo = 'movil' | 'ordenador';
type Fuente = 'todas' | 'ads' | 'google' | 'directo' | 'redes';
type Categoria = 'contacto' | 'enlace' | 'titular' | 'foto' | 'parecebot';
type Pagina = {
  ruta: string;
  titulo: string;
  vistas: number; // en 28 días, todas las fuentes, móvil + ordenador
  curva: number[]; // % que llega a cada 10 % de la página (móvil)
  salidas: number; // % que se va de la web desde aquí
  rapidas: number; // % que se va en menos de 10 s
  tiempo: number; // segundos activos de media
  contactos: number; // pulsaciones en llamar, WhatsApp o formulario
  toques: Partial<Record<Categoria, number>>; // toques por vista
  vanos: { sel: string; porVista: number; etiqueta: string }[];
  vienen: [string, number][];
  van: [string, number][];
  clarity: { muertos: number; rabia: number; vuelven: number };
};

const PAGINAS: Pagina[] = [
  {
    ruta: '/', titulo: 'Portada', vistas: 168, curva: [100, 86, 70, 57, 46, 37, 29, 22, 17, 13], salidas: 34, rapidas: 21, tiempo: 38, contactos: 9,
    toques: { enlace: 1.1, contacto: 0.12, titular: 0.15 },
    vanos: [{ sel: '.pv-sello', porVista: 0.09, etiqueta: 'El sello de 2005: parece un botón' }, { sel: '.areas-franja small', porVista: 0.04, etiqueta: 'Los subtítulos de los temas' }],
    vienen: [['Google', 46], ['Directo o correo', 31], ['Anuncio de Google', 15], ['Redes', 8]],
    van: [['/acoso-laboral', 31], ['/despido', 22], ['/calculadora-indemnizacion', 18], ['/blog', 11]],
    clarity: { muertos: 14, rabia: 2, vuelven: 7 },
  },
  {
    ruta: '/acoso-laboral', titulo: 'Acoso laboral', vistas: 96, curva: [100, 77, 56, 41, 30, 22, 16, 12, 9, 6], salidas: 58, rapidas: 36, tiempo: 34, contactos: 5,
    toques: { enlace: 0.7, contacto: 0.08, titular: 0.2 },
    vanos: [{ sel: 'main img', porVista: 0.12, etiqueta: 'La foto de cabecera' }],
    vienen: [['Google', 52], ['Portada', 33], ['Anuncio de Google', 11], ['Redes', 4]],
    van: [['/herramientas/test-acoso', 41], ['/contacto', 14], ['/', 12]],
    clarity: { muertos: 11, rabia: 3, vuelven: 18 },
  },
  {
    ruta: '/despido', titulo: 'Despido', vistas: 78, curva: [100, 84, 69, 57, 48, 40, 33, 27, 22, 18], salidas: 41, rapidas: 19, tiempo: 61, contactos: 7,
    toques: { enlace: 0.9, contacto: 0.14, titular: 0.12 },
    vanos: [{ sel: 'main strong', porVista: 0.06, etiqueta: 'Los "20 días hábiles" en negrita' }],
    vienen: [['Google', 49], ['Portada', 29], ['Anuncio de Google', 17], ['Directo', 5]],
    van: [['/calculadora-indemnizacion', 44], ['/contacto', 17], ['/', 9]],
    clarity: { muertos: 6, rabia: 1, vuelven: 9 },
  },
  {
    ruta: '/calculadora-indemnizacion', titulo: 'Calculadora de indemnización', vistas: 62, curva: [100, 93, 87, 80, 74, 69, 63, 57, 51, 46], salidas: 29, rapidas: 9, tiempo: 128, contactos: 16,
    toques: { enlace: 0.5, contacto: 0.35, titular: 0.05 },
    vanos: [],
    vienen: [['Despido', 38], ['Portada', 27], ['Google', 24], ['Anuncio de Google', 11]],
    van: [['/contacto', 39], ['/despido', 18], ['/', 8]],
    clarity: { muertos: 2, rabia: 0, vuelven: 4 },
  },
  {
    ruta: '/herramientas/test-acoso', titulo: 'Test de acoso laboral', vistas: 47, curva: [100, 91, 83, 76, 70, 64, 58, 53, 48, 44], salidas: 33, rapidas: 12, tiempo: 104, contactos: 8,
    toques: { enlace: 0.9, contacto: 0.2, titular: 0.04 },
    vanos: [],
    vienen: [['Acoso laboral', 63], ['Portada', 22], ['Google', 15]],
    van: [['/contacto', 32], ['/acoso-laboral', 21]],
    clarity: { muertos: 1, rabia: 0, vuelven: 5 },
  },
  {
    ruta: '/blog', titulo: 'Blog', vistas: 39, curva: [100, 62, 38, 22, 13, 8, 5, 4, 3, 2], salidas: 64, rapidas: 44, tiempo: 22, contactos: 0,
    toques: { enlace: 0.6, titular: 0.1 },
    vanos: [{ sel: 'main img', porVista: 0.1, etiqueta: 'Las fotos de los artículos' }],
    vienen: [['Google', 71], ['Portada', 21], ['Redes', 8]],
    van: [['/', 14], ['/acoso-laboral', 9]],
    clarity: { muertos: 5, rabia: 1, vuelven: 22 },
  },
  {
    ruta: '/contacto', titulo: 'Contacto', vistas: 31, curva: [100, 90, 81, 71, 62, 54, 47, 41, 36, 32], salidas: 47, rapidas: 14, tiempo: 57, contactos: 13,
    toques: { contacto: 0.7, enlace: 0.3 },
    vanos: [{ sel: 'main iframe, .mapa, [class*="mapa"]', porVista: 0.08, etiqueta: 'El mapa: quieren ampliarlo' }],
    vienen: [['Calculadora', 34], ['Acoso laboral', 21], ['Despido', 19], ['Portada', 16]],
    van: [],
    clarity: { muertos: 3, rabia: 1, vuelven: 6 },
  },
];

const SELECTORES: Record<Categoria, string> = {
  contacto: 'main a[href^="tel:"], main a[href*="wa.me"], main form button, main .boton-marcador, main a[href="/contacto"], main a[href="/reservar"]',
  enlace: 'main a[href^="/"]',
  titular: 'main h1, main h2',
  foto: 'main img',
  parecebot: 'main strong',
};

const DIAS = { 7: 0.27, 28: 1, 90: 3.1 } as const;
const FUENTES: Record<Fuente, { nombre: string; parte: number }> = {
  todas: { nombre: 'Todas', parte: 1 },
  ads: { nombre: 'Anuncios de Google', parte: 0.16 },
  google: { nombre: 'Google', parte: 0.47 },
  directo: { nombre: 'Directo o correo', parte: 0.27 },
  redes: { nombre: 'Redes sociales', parte: 0.1 },
};
const PARTE_MOVIL = 0.69;

function azar(semilla: number) {
  let a = semilla >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const hash = (s: string) => [...s].reduce((h, c) => (Math.imul(h, 31) + c.charCodeAt(0)) | 0, 7);
const dur = (s: number) => (s >= 60 ? `${Math.floor(s / 60)} min ${s % 60} s` : `${s} s`);
const tituloDe = (ruta: string) => PAGINAS.find((p) => p.ruta === ruta)?.titulo ?? ruta;

type Vista = Pagina & { v: number; curvaD: number[] };

function filtrar(dias: 7 | 28 | 90, disp: Dispositivo, fuente: Fuente): Vista[] {
  return PAGINAS.map((p) => {
    const parteDisp = disp === 'movil' ? PARTE_MOVIL : 1 - PARTE_MOVIL;
    const ajusteFuente = fuente === 'ads' && (p.ruta === '/blog') ? 0.2 : fuente === 'google' && p.ruta === '/blog' ? 1.5 : 1;
    const v = Math.round(p.vistas * DIAS[dias] * parteDisp * FUENTES[fuente].parte * ajusteFuente);
    // En ordenador se baja algo más: la página es más corta en pantalla.
    const curvaD = p.curva.map((c, i) => (i === 0 ? 100 : Math.min(100, Math.round(disp === 'ordenador' ? c * 1.15 + 3 : c))));
    return { ...p, v, curvaD };
  });
}

type Conclusion = { tipo: 'mal' | 'bien'; titulo: string; pasa: string; hacer: string; ruta: string };

function conclusiones(vistas: Vista[]): Conclusion[] {
  const out: Conclusion[] = [];
  const validas = vistas.filter((p) => p.v >= 8);
  for (const p of validas) {
    if (p.curvaD[9] <= 5) out.push({ tipo: 'mal', titulo: `En "${p.titulo}" casi nadie llega al final`, pasa: `Solo el ${p.curvaD[9]} % baja hasta abajo, y a la mitad ya no queda ni el ${p.curvaD[5]} %. Lo que hay al final, casi nadie lo ve.`, hacer: 'Subir lo importante (el botón de contacto, lo más leído) y acortar la página. Un desplazamiento infinito no sirve si nadie baja.', ruta: p.ruta });
    else if (p.curvaD[5] < 30) out.push({ tipo: 'mal', titulo: `En "${p.titulo}" la gente baja poco`, pasa: `A la mitad de la página llega solo el ${p.curvaD[5]} %.`, hacer: 'Poner arriba lo que buscan quienes entran desde Google y el botón para preguntar.', ruta: p.ruta });
    if (p.salidas >= 55) out.push({ tipo: 'mal', titulo: `Desde "${p.titulo}" mucha gente se va de la web`, pasa: `El ${p.salidas} % de quien la ve se marcha desde aquí.`, hacer: 'Añadir un siguiente paso claro: el test, la calculadora o el chat, a la vista.', ruta: p.ruta });
    if (p.rapidas >= 35) out.push({ tipo: 'mal', titulo: `En "${p.titulo}" muchos se van en menos de 10 segundos`, pasa: `El ${p.rapidas} % no aguanta ni 10 segundos.`, hacer: 'Revisar que lo primero que se ve responde a lo que buscaban en Google.', ruta: p.ruta });
    const vano = p.vanos.reduce((a, x) => a + x.porVista, 0);
    if (vano >= 0.08) out.push({ tipo: 'mal', titulo: `En "${p.titulo}" tocan algo que no hace nada`, pasa: `${p.vanos[0].etiqueta}. Unos ${Math.max(1, Math.round(p.v * vano))} toques en vano.`, hacer: 'Convertirlo en enlace o quitarle el aspecto de botón.', ruta: p.ruta });
  }
  const total = validas.reduce((a, p) => a + p.v, 0);
  const sesiones = Math.round(total / 1.4);
  if (validas.length) out.push({ tipo: 'mal', titulo: 'Casi todos ven una o dos páginas', pasa: `De media, ${(total / Math.max(1, sesiones)).toFixed(1).replace('.', ',')} páginas por visita.`, hacer: 'Enlazar mejor cada tema con su herramienta y con el contacto.', ruta: '/' });
  const mejor = [...validas].sort((a, b) => b.contactos / Math.max(1, b.vistas) - a.contactos / Math.max(1, a.vistas))[0];
  if (mejor) out.push({ tipo: 'bien', titulo: `"${mejor.titulo}" es la página que más contactos trae`, pasa: `Aquí es donde más gente pulsa llamar, WhatsApp o el formulario.`, hacer: 'Llevar más visitas hacia ella desde la portada y los anuncios.', ruta: mejor.ruta });
  return out;
}

function fiabilidad(total: number) {
  if (total < 100) return { nombre: 'Pistas', nota: 'Con menos de 100 visitas son pistas: hay que confirmarlas.' };
  if (total < 1000) return { nombre: 'Tendencias', nota: 'Entre 100 y 1.000 visitas: tendencias bastante claras.' };
  return { nombre: 'Firmes', nota: 'Con más de 1.000 visitas, conclusiones firmes.' };
}

type Toque = { x: number; y: number; vano: boolean };
type Contado = { etiqueta: string; n: number; vano: boolean };
type Nota = { id: number; ruta: string; quien: string; texto: string; x?: number; y?: number; elemento?: string; hecha: boolean; fecha: string };

const leer = <T,>(k: string, def: T): T => {
  try {
    const v = localStorage.getItem(k);
    return v ? (JSON.parse(v) as T) : def;
  } catch {
    return def;
  }
};
const guardar = (k: string, v: unknown) => {
  try {
    localStorage.setItem(k, JSON.stringify(v));
  } catch {}
};

const etiquetaDe = (el: Element | null) => {
  if (!el) return 'Sin elemento';
  const t = (el.getAttribute('aria-label') || (el as HTMLElement).innerText || el.getAttribute('alt') || '').replace(/\s+/g, ' ').trim();
  return (t || el.tagName.toLowerCase()).slice(0, 60);
};

export default function MapaCalorDemo() {
  const [dias, setDias] = useState<7 | 28 | 90>(28);
  const [disp, setDisp] = useState<Dispositivo>('movil');
  const [fuente, setFuente] = useState<Fuente>('todas');
  const [ruta, setRuta] = useState('/');
  const [srcInicial] = useState('/');
  const [verConcl, setVerConcl] = useState(false);
  const [capas, setCapas] = useState({ calor: true, vanos: true, bajan: true });
  const [contados, setContados] = useState<Contado[]>([]);
  const [fuera, setFuera] = useState(false);
  const [escala, setEscala] = useState(1);
  const marco = useRef<HTMLIFrameElement>(null);
  const caja = useRef<HTMLDivElement>(null);

  // Notas
  const [quien, setQuien] = useState('Jesús');
  const [texto, setTexto] = useState('');
  const [punto, setPunto] = useState<{ x: number; y: number; elemento: string } | null>(null);
  const [senalando, setSenalando] = useState(false);
  const [notas, setNotas] = useState<Nota[]>([]);
  const [estadoNota, setEstadoNota] = useState('');
  useEffect(() => {
    setQuien(leer('tc-mc-quien', 'Jesús'));
    setNotas(leer<Nota[]>('tc-mc-notas', []));
  }, []);

  const vistas = useMemo(() => filtrar(dias, disp, fuente), [dias, disp, fuente]);
  const total = vistas.reduce((a, p) => a + p.v, 0);
  const lista = useMemo(() => conclusiones(vistas), [vistas]);
  const fia = fiabilidad(total);
  const actual = vistas.find((p) => p.ruta === ruta);
  const notasPagina = notas.filter((n) => n.ruta === ruta);

  // Escala del ordenador (1366 px reducido para que quepa)
  useEffect(() => {
    const medir = () => {
      const w = caja.current?.clientWidth ?? 1366;
      setEscala(disp === 'ordenador' ? Math.min(1, w / 1366) : 1);
    };
    medir();
    window.addEventListener('resize', medir);
    return () => window.removeEventListener('resize', medir);
  }, [disp]);

  const pintar = useCallback(() => {
    const f = marco.current;
    const doc = f?.contentDocument;
    const win = f?.contentWindow;
    if (!doc || !win || !doc.body) return;
    const r = win.location.pathname;
    const p = vistas.find((x) => x.ruta === r);
    setFuera(!p);
    if (r !== ruta) setRuta(r);
    doc.getElementById('mc-capa')?.remove();
    if (!doc.getElementById('mc-estilo')) {
      const st = doc.createElement('style');
      st.id = 'mc-estilo';
      st.textContent = '.mc-oculto{visibility:hidden!important}.mc-quieto{position:relative!important;top:auto!important}html{scroll-behavior:auto!important}';
      doc.head.appendChild(st);
    }
    // Fuera lo que flota (aviso de cookies, chat, barras fijas) para que no tape; la cabecera deja de ir pegada.
    doc.querySelectorAll<HTMLElement>('body *').forEach((el) => {
      const pos = win.getComputedStyle(el).position;
      if (pos === 'fixed') el.classList.add('mc-oculto');
      else if (pos === 'sticky') el.classList.add('mc-quieto');
    });
    if (!p) return;
    const alto = Math.max(doc.documentElement.scrollHeight, doc.body.scrollHeight);
    const ancho = doc.documentElement.clientWidth;
    const capa = doc.createElement('div');
    capa.id = 'mc-capa';
    capa.style.cssText = `position:absolute;left:0;top:0;width:${ancho}px;height:${alto}px;pointer-events:none;z-index:2147483000`;
    doc.body.appendChild(capa);

    // Toques inventados, sobre los elementos de verdad de la página
    const rnd = azar(hash(r + disp + dias + fuente));
    const toques: Toque[] = [];
    const cuenta = new Map<Element, Contado>();
    const visibles = (sel: string) =>
      [...doc.querySelectorAll(sel)].filter((el) => {
        const b = el.getBoundingClientRect();
        return b.width > 8 && b.height > 8 && !el.closest('.mc-oculto');
      });
    const sembrar = (el: Element, n: number, vano: boolean) => {
      const b = el.getBoundingClientRect();
      const top = b.top + win.scrollY;
      for (let i = 0; i < n; i++) {
        const gx = (rnd() + rnd() + rnd()) / 3, gy = (rnd() + rnd() + rnd()) / 3;
        toques.push({ x: b.left + gx * b.width, y: top + gy * Math.min(b.height, 160), vano });
      }
      const c = cuenta.get(el) || { etiqueta: etiquetaDe(el), n: 0, vano };
      c.n += n;
      cuenta.set(el, c);
    };
    (Object.keys(p.toques) as Categoria[]).forEach((cat) => {
      const totalCat = Math.round(p.v * (p.toques[cat] ?? 0));
      const els = visibles(SELECTORES[cat]).slice(0, 10);
      if (!els.length || !totalCat) return;
      const pesos = els.map((_, i) => (0.4 + rnd()) / (i * 0.45 + 1) * (cat === 'enlace' ? (1 - (i / els.length) * 0.5) : 1));
      const suma = pesos.reduce((a, b) => a + b, 0);
      els.forEach((el, i) => sembrar(el, Math.round((totalCat * pesos[i]) / suma), false));
    });
    p.vanos.forEach((v) => {
      const els = visibles(v.sel).slice(0, 2);
      const n = Math.max(1, Math.round(p.v * v.porVista));
      els.forEach((el, i) => sembrar(el, i === 0 ? Math.ceil(n * 0.7) : Math.floor(n * 0.3), true));
    });
    setContados([...cuenta.values()].filter((c) => c.n > 0).sort((a, b) => b.n - a.n));

    // Calor: lienzo a media resolución (Safari no admite lienzos enormes), de azul a rojo
    if (capas.calor && toques.length) {
      const k = 0.5;
      const w = Math.max(1, Math.round(ancho * k)), h = Math.max(1, Math.round(alto * k));
      const sombra = doc.createElement('canvas');
      sombra.width = w;
      sombra.height = h;
      const sx = sombra.getContext('2d')!;
      const radio = (disp === 'movil' ? 26 : 32) * k;
      for (const t of toques.filter((t) => !t.vano)) {
        const g = sx.createRadialGradient(t.x * k, t.y * k, 0, t.x * k, t.y * k, radio);
        g.addColorStop(0, 'rgba(0,0,0,0.22)');
        g.addColorStop(1, 'rgba(0,0,0,0)');
        sx.fillStyle = g;
        sx.fillRect(t.x * k - radio, t.y * k - radio, radio * 2, radio * 2);
      }
      const img = sx.getImageData(0, 0, w, h);
      const d = img.data;
      for (let i = 0; i < d.length; i += 4) {
        const a = d[i + 3] / 255;
        if (a < 0.02) continue;
        const v = Math.min(1, a * 1.4);
        // azul -> cian -> verde -> amarillo -> rojo
        const c = v < 0.25 ? [0, v * 4 * 255, 255] : v < 0.5 ? [0, 255, 255 - (v - 0.25) * 4 * 255] : v < 0.75 ? [(v - 0.5) * 4 * 255, 255, 0] : [255, 255 - (v - 0.75) * 4 * 255, 0];
        d[i] = c[0];
        d[i + 1] = c[1];
        d[i + 2] = c[2];
        d[i + 3] = Math.round(70 + v * 150);
      }
      sx.putImageData(img, 0, 0);
      sombra.style.cssText = `position:absolute;left:0;top:0;width:${ancho}px;height:${alto}px;opacity:.85`;
      capa.appendChild(sombra);
    }
    // Toques en vano: puntos rojos con borde blanco
    if (capas.vanos) {
      for (const t of toques.filter((t) => t.vano)) {
        const pnt = doc.createElement('span');
        pnt.style.cssText = `position:absolute;left:${t.x - 6}px;top:${t.y - 6}px;width:12px;height:12px;border-radius:50%;background:#e02b2b;border:2px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,.4)`;
        capa.appendChild(pnt);
      }
    }
    // Hasta dónde baja la gente: franjas cada 10 %
    if (capas.bajan) {
      p.curvaD.forEach((c, i) => {
        const fr = doc.createElement('div');
        fr.style.cssText = `position:absolute;left:0;width:100%;top:${(alto * i) / 10}px;height:${alto / 10}px;background:rgba(8,20,35,${((100 - c) / 100) * 0.55});border-top:1px dashed rgba(255,255,255,.6)`;
        const et = doc.createElement('span');
        et.textContent = `${c} % llega aquí`;
        et.style.cssText = 'position:absolute;right:8px;top:6px;background:#0d2c48;color:#fff;font:700 12px/1.2 Arial,sans-serif;padding:4px 8px;border-radius:999px';
        fr.appendChild(et);
        capa.appendChild(fr);
      });
    }
    // Chinchetas de las notas
    notas.filter((n) => n.ruta === r && !n.hecha && n.x != null && n.y != null).forEach((n, i) => {
      const c = doc.createElement('span');
      c.textContent = String(i + 1);
      c.style.cssText = `position:absolute;left:${((n.x ?? 0) / 100) * ancho - 13}px;top:${(n.y ?? 0) - 13}px;width:26px;height:26px;border-radius:50% 50% 50% 0;background:#f2c14e;color:#0d2c48;font:800 13px/26px Arial,sans-serif;text-align:center;box-shadow:0 2px 6px rgba(0,0,0,.35);border:2px solid #fff`;
      capa.appendChild(c);
    });
  }, [vistas, ruta, disp, dias, fuente, capas, notas]);

  // Repintar al cambiar filtros, capas o notas
  useEffect(() => {
    const t = setTimeout(pintar, 50);
    return () => clearTimeout(t);
  }, [pintar]);

  const alCargar = () => {
    // La página tarda un poco en colocar fotos y vídeos: se pinta ahora y otra vez al rato.
    pintar();
    setTimeout(pintar, 1200);
  };

  // Señalar un sitio: el siguiente toque dentro de la web queda como chincheta
  useEffect(() => {
    if (!senalando) return;
    const doc = marco.current?.contentDocument;
    const win = marco.current?.contentWindow;
    if (!doc || !win) return;
    const alToque = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const ancho = doc.documentElement.clientWidth;
      const el = doc.elementFromPoint(e.clientX, e.clientY)?.closest('a, button, h1, h2, h3, p, img, li, label, input, section') ?? null;
      setPunto({ x: Math.round((e.clientX / ancho) * 1000) / 10, y: Math.round(e.clientY + win.scrollY), elemento: etiquetaDe(el) });
      setSenalando(false);
    };
    doc.addEventListener('click', alToque, true);
    doc.body.style.cursor = 'crosshair';
    return () => {
      doc.removeEventListener('click', alToque, true);
      doc.body.style.cursor = '';
    };
  }, [senalando]);

  const irA = (r: string) => {
    setRuta(r);
    const f = marco.current;
    if (f?.contentWindow && f.contentWindow.location.pathname !== r) f.contentWindow.location.href = r;
  };

  const enviarNota = async () => {
    if (texto.trim().length < 2) return setEstadoNota('Escribe qué quieres cambiar.');
    const n: Nota = { id: Date.now(), ruta, quien, texto: texto.trim(), x: punto?.x, y: punto?.y, elemento: punto?.elemento, hecha: false, fecha: new Date().toISOString() };
    const nuevas = [...notas, n];
    setNotas(nuevas);
    guardar('tc-mc-notas', nuevas);
    setTexto('');
    setPunto(null);
    setEstadoNota('Enviando...');
    const sitio = n.x != null ? `${n.x} % del ancho, a ${n.y} px desde arriba${n.elemento ? `, sobre "${n.elemento}"` : ''}` : 'sin sitio concreto';
    try {
      enviarLupa({ pantalla: 'mapa-calor', evento: { tipo: 'nota', seccion: ruta, texto: `${quien}: ${n.texto} (${sitio})` } });
    } catch {}
    const ok = await fetch('/api/respuestas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tipo: 'nota', seccion: ruta, reaccion: quien, id: disp, texto: `${n.texto}\n\nSitio: ${sitio}` }),
    })
      .then((r) => r.ok)
      .catch(() => false);
    setEstadoNota(ok ? 'Nota enviada. Nos llega al momento.' : 'Guardada aquí. No se ha podido enviar el aviso; lo verás igual en tu lista.');
  };

  const marcarHecha = (id: number) => {
    const nuevas = notas.map((n) => (n.id === id ? { ...n, hecha: !n.hecha } : n));
    setNotas(nuevas);
    guardar('tc-mc-notas', nuevas);
  };

  const recorridos = [
    ['Portada', 'Acoso laboral', 'Test de acoso', 'Contacto'],
    ['Google', 'Despido', 'Calculadora', 'Contacto'],
    ['Google', 'Blog', 'Se va'],
    ['Portada', 'Calculadora', 'Contacto'],
  ];

  return (
    <div className="mc">
      <header className="mc-cabeza">
        <p className="mc-aviso">Datos de ejemplo sobre tu propia web. Con la web publicada, aquí verás los de verdad.</p>
        <h1>La lupa de tu web</h1>
        <p className="mc-sub">Lo que hace la gente en tu web: dónde toca, hasta dónde baja, dónde se va y qué espera que funcione y no funciona.</p>
        <div className="mc-filtros" role="group" aria-label="Filtros">
          <div className="mc-seg" role="group" aria-label="Periodo">
            {([7, 28, 90] as const).map((d) => (
              <button key={d} type="button" aria-pressed={dias === d} onClick={() => setDias(d)}>{d} días</button>
            ))}
          </div>
          <div className="mc-seg" role="group" aria-label="Aparato">
            <button type="button" aria-pressed={disp === 'movil'} onClick={() => setDisp('movil')}>Móvil</button>
            <button type="button" aria-pressed={disp === 'ordenador'} onClick={() => setDisp('ordenador')}>Ordenador</button>
          </div>
          <label className="mc-sel">
            Versión
            <select defaultValue="actual" aria-label="Versión de la web">
              <option value="actual">Web nueva (100 %)</option>
              <option value="ab" disabled>Prueba A/B (cuando la activemos)</option>
            </select>
          </label>
          <label className="mc-sel">
            De dónde vienen
            <select value={fuente} onChange={(e) => setFuente(e.target.value as Fuente)}>
              {(Object.keys(FUENTES) as Fuente[]).map((f) => (
                <option key={f} value={f}>{FUENTES[f].nombre}</option>
              ))}
            </select>
          </label>
        </div>
      </header>

      <section className={`mc-concl${verConcl ? ' abierto' : ''}`} aria-label="Conclusiones">
        <div className="mc-concl-linea">
          <strong>Conclusiones</strong>
          <span>{lista.length} conclusiones</span>
          <span className={`mc-fia mc-fia-${fia.nombre.toLowerCase()}`} title={fia.nota}>
            {fia.nombre} · {total} visitas
            <i aria-hidden="true"><b style={{ width: `${Math.min(100, (total / 1000) * 100)}%` }} /></i>
          </span>
          <button type="button" className="mc-ver" aria-expanded={verConcl} onClick={() => setVerConcl(!verConcl)}>{verConcl ? 'Cerrar' : 'Ver'}</button>
        </div>
        {verConcl && (
          <>
            <p className="mc-concl-nota">{fia.nota} Solo hablamos de páginas con 8 vistas o más.</p>
            <ul className="mc-concl-lista">
              {lista.map((c, i) => (
                <li key={i} className={`mc-c-${c.tipo}`}>
                  <b>{c.titulo}</b>
                  <span><em>Qué pasa:</em> {c.pasa}</span>
                  <span><em>Qué haríamos:</em> {c.hacer}</span>
                  <button type="button" onClick={() => { irA(c.ruta); setVerConcl(false); }}>Verlo en la web</button>
                </li>
              ))}
            </ul>
          </>
        )}
      </section>

      <div className="mc-cuerpo">
        <aside className="mc-izq" aria-label="Páginas">
          <h2>Páginas</h2>
          <ul className="mc-paginas">
            {[...vistas].sort((a, b) => b.v - a.v).map((p) => (
              <li key={p.ruta}>
                <button type="button" aria-current={p.ruta === ruta ? 'page' : undefined} onClick={() => irA(p.ruta)}>
                  <b>{p.titulo}</b>
                  <small>{p.v} vistas · baja el {Math.round(p.curvaD.reduce((a, c) => a + c, 0) / 10)} % · se va el {p.salidas} %</small>
                </button>
              </li>
            ))}
          </ul>
          <h2>Recorridos más repetidos</h2>
          <ol className="mc-recorridos">
            {recorridos.map((r, i) => (
              <li key={i}>{r.join(' → ')}</li>
            ))}
          </ol>
        </aside>

        <div className="mc-centro">
          <div className="mc-capas" role="group" aria-label="Capas">
            <label><input type="checkbox" checked={capas.calor} onChange={(e) => setCapas({ ...capas, calor: e.target.checked })} /> Calor de los toques</label>
            <label><input type="checkbox" checked={capas.vanos} onChange={(e) => setCapas({ ...capas, vanos: e.target.checked })} /> Toques en vano</label>
            <label><input type="checkbox" checked={capas.bajan} onChange={(e) => setCapas({ ...capas, bajan: e.target.checked })} /> Hasta dónde bajan</label>
          </div>
          {senalando && <p className="mc-senal">Toca en la web el sitio exacto de tu nota.</p>}
          {fuera && <p className="mc-senal">Esta página no tiene datos de ejemplo. Elige una de la lista.</p>}
          <div className="mc-marco" ref={caja} data-disp={disp} style={disp === 'ordenador' ? { height: Math.round(800 * escala) } : undefined}>
            <iframe
              ref={marco}
              title="Tu web, con el mapa de calor encima"
              src={srcInicial}
              onLoad={alCargar}
              style={disp === 'ordenador' ? { width: 1366, height: 800, transform: `scale(${escala})`, transformOrigin: '0 0' } : undefined}
            />
          </div>
        </div>

        <aside className="mc-der" aria-label="Cifras de la página">
          {actual && (
            <>
              <h2>{actual.titulo}</h2>
              <ul className="mc-cifras">
                <li><strong>{actual.v}</strong><span>vistas</span></li>
                <li><strong>{Math.round(actual.curvaD.reduce((a, c) => a + c, 0) / 10)} %</strong><span>baja de media</span></li>
                <li><strong>{actual.curvaD[9]} %</strong><span>llega al final</span></li>
                <li><strong>{dur(actual.tiempo)}</strong><span>tiempo activo</span></li>
                <li><strong>{actual.rapidas} %</strong><span>se va antes de 10 s</span></li>
                <li><strong>{actual.contactos}</strong><span>contactos (28 días)</span></li>
              </ul>
              <h3>Microsoft Clarity</h3>
              <ul className="mc-clarity">
                <li><b>{actual.clarity.muertos} %</b> clics en algo que no responde</li>
                <li><b>{actual.clarity.rabia} %</b> clics de rabia (varios seguidos)</li>
                <li><b>{actual.clarity.vuelven} %</b> vuelven atrás enseguida</li>
              </ul>
              <h3>Lo más tocado</h3>
              <ol className="mc-top">
                {contados.filter((c) => !c.vano).slice(0, 5).map((c, i) => (
                  <li key={i}><span>{c.etiqueta}</span><b>{c.n}</b></li>
                ))}
              </ol>
              {contados.some((c) => c.vano) && (
                <>
                  <h3>Lo que tocan en vano</h3>
                  <ul className="mc-top mc-top-vano">
                    {contados.filter((c) => c.vano).slice(0, 4).map((c, i) => (
                      <li key={i}><span>{c.etiqueta}</span><b>{c.n}</b></li>
                    ))}
                  </ul>
                </>
              )}
              <h3>De dónde vienen</h3>
              <ul className="mc-flujo">
                {actual.vienen.map(([d, n]) => (
                  <li key={d}><span>{d}</span><b>{n} %</b></li>
                ))}
              </ul>
              {actual.van.length > 0 && (
                <>
                  <h3>Adónde van después</h3>
                  <ul className="mc-flujo">
                    {actual.van.map(([a, n]) => (
                      <li key={a}><button type="button" onClick={() => irA(a)}>{tituloDe(a)}</button><b>{n} %</b></li>
                    ))}
                  </ul>
                </>
              )}
            </>
          )}

          <section className="mc-notas" aria-labelledby="mc-notas-t">
            <h3 id="mc-notas-t">Notas para nosotros</h3>
            <p>¿Quieres cambiar algo de esta página? Escríbelo aquí: nos llega al momento, con la página y el sitio exacto.</p>
            <div className="mc-seg" role="group" aria-label="Quién escribe">
              {['Jesús', 'Alguien del despacho'].map((q) => (
                <button key={q} type="button" aria-pressed={quien === q} onClick={() => { setQuien(q); guardar('tc-mc-quien', q); }}>{q}</button>
              ))}
            </div>
            <label className="mc-nota-campo">
              Qué quieres cambiar
              <textarea rows={3} value={texto} onChange={(e) => setTexto(e.target.value)} placeholder="Por ejemplo: este título lo pondría más claro" />
            </label>
            <div className="mc-nota-botones">
              <button type="button" className="mc-senalar" onClick={() => setSenalando(!senalando)} aria-pressed={senalando}>
                {punto ? 'Sitio señalado: cambiar' : senalando ? 'Toca en la web...' : 'Señalar un sitio en la página'}
              </button>
              <button type="button" className="mc-enviar" onClick={enviarNota}>Enviar nota</button>
            </div>
            {punto && <p className="mc-punto">Sobre: {punto.elemento}</p>}
            <p className="mc-estado" role="status">{estadoNota}</p>
            {notasPagina.length > 0 && (
              <ol className="mc-lista-notas">
                {notasPagina.map((n) => (
                  <li key={n.id} className={n.hecha ? 'hecha' : ''}>
                    <span><b>{n.quien}:</b> {n.texto}{n.elemento ? ` (sobre "${n.elemento}")` : ''}</span>
                    <button type="button" onClick={() => marcarHecha(n.id)}>{n.hecha ? 'Deshacer' : 'Hecha'}</button>
                  </li>
                ))}
              </ol>
            )}
          </section>
        </aside>
      </div>
    </div>
  );
}
