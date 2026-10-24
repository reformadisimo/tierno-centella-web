'use client';

// Demostración del panel de control del cliente. TODOS LOS DATOS SON DE EJEMPLO (se dice en pantalla).
// Con accesos, cada bloque se alimenta de su fuente: la web (consultas, chat, herramientas), GA4, Search Console,
// Google Ads, Meta, Instagram, LinkedIn, TikTok, la ficha de Google, Resend, PageSpeed y Clarity.
import { useEffect, useMemo, useRef, useState } from 'react';
import { Logo } from './LogosGuia';

type Pestana = 'resumen' | 'clientes' | 'anuncios' | 'google' | 'redes' | 'web' | 'gastos' | 'equipo';
const PESTANAS: [Pestana, string][] = [
  ['resumen', 'Resumen'],
  ['clientes', 'Clientes'],
  ['anuncios', 'Anuncios'],
  ['google', 'Google e IA'],
  ['redes', 'Redes'],
  ['web', 'Tu web'],
  ['gastos', 'Gastos'],
  ['equipo', 'Nuestro trabajo'],
];

const CONECTADO: [string, string][] = [
  ['Google Analytics', 'Visitas'],
  ['Search Console', 'Búsquedas'],
  ['Google Ads', 'Anuncios'],
  ['Ficha de Google', 'Reseñas'],
  ['Instagram', 'Seguidores'],
  ['Facebook', 'Anuncios y página'],
  ['LinkedIn', 'Seguidores'],
  ['TikTok', 'Vídeos'],
  ['YouTube', 'Vídeos'],
  ['WhatsApp', 'Consultas'],
  ['Resend', 'Correos'],
  ['Bing', 'Ficha y búsquedas'],
  ['Semrush', 'Posiciones e IA'],
  ['ChatGPT', 'Visibilidad IA'],
  ['PageSpeed', 'Velocidad'],
  ['Vercel', 'Web y copias'],
];

const CONSULTAS_30 = [2, 1, 3, 2, 0, 1, 4, 3, 2, 5, 3, 1, 0, 4, 5, 3, 6, 4, 2, 1, 5, 6, 4, 7, 5, 2, 1, 6, 7, 5];
const VISITAS_30 = [61, 48, 72, 66, 31, 29, 80, 77, 69, 91, 85, 40, 35, 95, 102, 88, 110, 97, 52, 44, 115, 121, 104, 130, 118, 60, 49, 128, 137, 124];

const ORIGEN: [string, number, string][] = [
  ['Google (sin pagar)', 30, '#1b6fd1'],
  ['Google Ads', 38, '#a8442c'],
  ['Chat de la web', 14, '#17602f'],
  ['WhatsApp directo', 8, '#1f9d55'],
  ['Redes sociales', 6, '#7a4fb3'],
  ['Recomendación y otros', 4, '#8a96a3'],
];

const CAMPANAS = [
  { nombre: 'Incapacidad permanente', inversion: 312, clics: 221, consultas: 16, tendencia: -12 },
  { nombre: 'Acoso laboral', inversion: 214, clics: 148, consultas: 11, tendencia: -8 },
  { nombre: 'Despidos', inversion: 128, clics: 97, consultas: 4, tendencia: 6 },
  { nombre: 'Marca (tu nombre)', inversion: 36, clics: 64, consultas: 7, tendencia: -2 },
];

const META = { inversion: 120, alcance: 18400, clics: 410, consultas: 6 };

const BUSQUEDAS: [string, number, number, number][] = [
  ['abogado acoso laboral madrid', 140, 6, 11],
  ['abogados acoso laboral', 480, 5, 9],
  ['test de acoso laboral', 720, 4, 12],
  ['abogado laboralista madrid', 1900, 12, 18],
  ['abogado incapacidad permanente', 720, 14, 27],
  ['despido embarazada abogado', 90, 7, 15],
];

const IA_SEMANAS = [2, 2, 3, 4, 4, 5, 6, 7];

const REDES: { red: string; serie: number[]; color: string; extra: string }[] = [
  { red: 'Instagram', serie: [4007, 4021, 4048, 4069, 4102, 4140, 4171, 4215, 4268, 4320, 4391, 4486], color: '#c13584', extra: 'Reel más visto: "¿Es acoso o un mal jefe?", 12.400 reproducciones' },
  { red: 'LinkedIn', serie: [2371, 2384, 2399, 2411, 2430, 2452, 2470, 2493, 2521, 2548, 2577, 2610], color: '#0a66c2', extra: '3 publicaciones para colegios y empresas este mes' },
  { red: 'Facebook', serie: [285, 287, 290, 294, 298, 303, 309, 314, 320, 327, 334, 342], color: '#1877f2', extra: 'Anuncios: 18.400 personas alcanzadas en Madrid' },
  { red: 'TikTok', serie: [0, 0, 18, 46, 81, 125, 176, 238, 310, 402, 498, 612], color: '#111111', extra: 'Cuenta nueva: 612 seguidores en 10 semanas' },
];

const CORREOS: [string, number][] = [
  ['Hemos recibido tu consulta', 78],
  ['¿Es acoso lo que te pasa?', 64],
  ['Las pruebas', 58],
  ['Tu plazo', 61],
  ['Quién te defendería', 55],
  ['Un caso real', 52],
  ['¿Hablamos de tu caso?', 49],
];

const LEADS: { nombre: string; tema: string; origen: string; canal: string; cuando: string; estado: 'Nuevo' | 'Llamado' | 'Consulta reservada' | 'Cliente' }[] = [
  { nombre: 'L. M.', tema: 'Despido estando embarazada', origen: 'Google Ads · Despidos', canal: 'Formulario', cuando: 'Hace 12 min', estado: 'Nuevo' },
  { nombre: 'J. R.', tema: 'Acoso de un superior', origen: 'Chat de la web, 23:40', canal: 'Chat', cuando: 'Hoy, 08:05', estado: 'Llamado' },
  { nombre: 'A. G.', tema: 'Incapacidad denegada', origen: 'Google · guía de incapacidad', canal: 'WhatsApp', cuando: 'Ayer', estado: 'Consulta reservada' },
  { nombre: 'P. S.', tema: 'Baja por ansiedad', origen: 'Instagram · reel', canal: 'WhatsApp', cuando: 'Ayer', estado: 'Consulta reservada' },
  { nombre: 'M. T.', tema: 'Acoso en un colegio', origen: 'Correo de seguimiento n.º 5', canal: 'Llamada', cuando: 'Lunes', estado: 'Cliente' },
  { nombre: 'R. D.', tema: 'Finiquito mal calculado', origen: 'Calculadora de finiquito', canal: 'Formulario', cuando: 'Lunes', estado: 'Llamado' },
];

const HERRAMIENTAS: [string, number][] = [
  ['Test de acoso', 182],
  ['Calculadora de indemnización', 141],
  ['Plazos para reclamar', 77],
  ['Comprobador de incapacidad', 52],
  ['Calculadora de finiquito', 34],
];

const ACTIVIDAD: [string, string, string][] = [
  ['Hoy, 10:42', 'Web', 'Subido el botón de llamar en la guía de incapacidad: en Clarity vimos que la gente no lo encontraba.'],
  ['Hoy, 09:15', 'Anuncios', 'Pausada la palabra "mobbing qué es": traía lectores, no clientes. Ahorro estimado: 40 € al mes.'],
  ['Ayer, 18:30', 'Reseñas', 'Publicada la respuesta a la reseña de María, con tu visto bueno.'],
  ['Ayer, 12:00', 'Blog', 'Publicado: "Burnout o acoso laboral: en qué se diferencian".'],
  ['Ayer, 10:00', 'Redes', 'Montado y programado tu reel sobre el plazo de 20 días.'],
  ['Lunes, 08:00', 'Informe', 'Enviado el informe semanal a tu móvil.'],
  ['Domingo, 20:10', 'Correos', 'Nueva secuencia para Mujer y trabajo, lista para que la revises.'],
  ['Viernes', 'Diseño', 'Nuevo banner para la campaña de incapacidad en Instagram.'],
  ['Jueves', 'IA', 'Actualizada la ficha para las IA con tus sentencias de 2025.'],
];

const EVENTOS: [string, string, string][] = [
  ['visita', 'Nueva visita desde Google', 'Lee "¿Cuándo es nulo un despido?"'],
  ['herramienta', 'Alguien usa el test de acoso', 'Resultado: indicios claros'],
  ['visita', 'Nueva visita desde un anuncio', 'Página de incapacidad permanente'],
  ['whatsapp', 'Pulsación en WhatsApp', 'Desde la guía de acoso, en el móvil'],
  ['correo', 'Correo abierto', '"Tu plazo: 30 días hábiles"'],
  ['visita', 'Nueva visita desde Instagram', 'Reel "¿Es acoso o un mal jefe?"'],
  ['herramienta', 'Cálculo de indemnización', '8 años en la empresa'],
  ['llamada', 'Pulsación en llamar', 'Desde la página de contacto'],
  ['chat', 'Conversación en el chat', 'Pregunta por una baja por ansiedad'],
  ['visita', 'Nueva visita desde ChatGPT', 'Página de Jesús Tierno'],
  ['consulta', 'Nueva consulta', 'Formulario · Despido · Google Ads'],
];

const MESES = ['May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct'];
// Gasto variable de cada mes (ejemplo): Google Ads, Meta y notas de prensa o artículos en medios (opcional).
const GASTO_MES: { ads: number; meta: number; prensa: number; consultas: number }[] = [
  { ads: 450, meta: 0, prensa: 0, consultas: 41 },
  { ads: 520, meta: 60, prensa: 0, consultas: 55 },
  { ads: 560, meta: 90, prensa: 350, consultas: 63 },
  { ads: 300, meta: 60, prensa: 0, consultas: 44 },
  { ads: 640, meta: 110, prensa: 0, consultas: 86 },
  { ads: 690, meta: 120, prensa: 0, consultas: 100 },
];

const num = (n: number) => new Intl.NumberFormat('es-ES', { useGrouping: 'always' } as Intl.NumberFormatOptions).format(n);
const eur = (n: number) => `${num(n)} €`;

function Delta({ v, invertir = false, sufijo = '' }: { v: number; invertir?: boolean; sufijo?: string }) {
  const bueno = invertir ? v < 0 : v > 0;
  return (
    <span className={`pn-delta ${bueno ? 'pn-sube' : 'pn-baja'}`}>
      {v > 0 ? '+' : ''}
      {v}
      {sufijo}
    </span>
  );
}

// Cifra que sube contando al aparecer.
function Contador({ valor, formato = num }: { valor: number; formato?: (n: number) => string }) {
  const [v, setV] = useState(valor);
  const anterior = useRef(valor);
  useEffect(() => {
    const desde = anterior.current === valor ? 0 : anterior.current;
    anterior.current = valor;
    const inicio = performance.now();
    let id = 0;
    const paso = (t: number) => {
      const p = Math.min(1, (t - inicio) / 700);
      setV(Math.round(desde + (valor - desde) * (1 - Math.pow(1 - p, 3))));
      if (p < 1) id = requestAnimationFrame(paso);
    };
    id = requestAnimationFrame(paso);
    return () => cancelAnimationFrame(id);
  }, [valor]);
  return <>{formato(v)}</>;
}

function Grafico({ datos, linea }: { datos: number[]; linea: number[] }) {
  const [sel, setSel] = useState<number | null>(null);
  const max = Math.max(...datos);
  const maxL = Math.max(...linea);
  const w = 600;
  const h = 180;
  const paso = w / datos.length;
  const puntos = linea.map((v, i) => `${i * paso + paso / 2},${h - 16 - (v / maxL) * (h - 40)}`).join(' ');
  return (
    <div className="pn-grafico-caja">
      <svg viewBox={`0 0 ${w} ${h}`} className="pn-grafico" role="img" aria-label="Consultas y visitas por día (ejemplo)" onMouseLeave={() => setSel(null)}>
        {datos.map((v, i) => {
          const alto = (v / max) * (h - 40);
          return (
            <g key={i} onMouseEnter={() => setSel(i)} onClick={() => setSel(i)}>
              <rect x={i * paso} y={0} width={paso} height={h - 16} fill="transparent" />
              <rect x={i * paso + 3} y={h - 16 - alto} width={paso - 6} height={alto} rx={3} fill="#a8442c" opacity={sel === null || sel === i ? 0.9 : 0.35} className="pn-barra-anim" style={{ animationDelay: `${i * 18}ms` }} />
            </g>
          );
        })}
        <polyline points={puntos} fill="none" stroke="#1b6fd1" strokeWidth={2.5} strokeLinejoin="round" className="pn-linea-anim" />
        <line x1={0} y1={h - 16} x2={w} y2={h - 16} stroke="#d5dde7" />
        <text x={0} y={h - 2} fontSize={11} fill="#6a7786">
          Hace 30 días
        </text>
        <text x={w} y={h - 2} fontSize={11} fill="#6a7786" textAnchor="end">
          Hoy
        </text>
      </svg>
      <p className="pn-tooltip">
        {sel === null ? (
          'Pasa el dedo o el ratón por las barras para ver cada día.'
        ) : (
          <>
            <b>{sel === datos.length - 1 ? 'Hoy' : `Hace ${datos.length - 1 - sel} días`}</b>: {datos[sel]} consultas y {linea[sel]} visitas
          </>
        )}
      </p>
    </div>
  );
}

function Rosco({ datos, centro, sub }: { datos: [string, number, string][]; centro: string; sub: string }) {
  const total = datos.reduce((a, [, v]) => a + v, 0);
  let acum = 0;
  const r = 52;
  const c = 2 * Math.PI * r;
  return (
    <svg viewBox="0 0 140 140" className="pn-rosco" role="img" aria-label={sub}>
      {datos.map(([n, v, color]) => {
        const largo = (v / total) * c;
        const el = <circle key={n} cx={70} cy={70} r={r} fill="none" stroke={color} strokeWidth={22} strokeDasharray={`${largo} ${c - largo}`} strokeDashoffset={-acum} transform="rotate(-90 70 70)" />;
        acum += largo;
        return el;
      })}
      <text x={70} y={68} textAnchor="middle" fontSize={24} fontWeight={800} fill="#0d2c48">
        {centro}
      </text>
      <text x={70} y={87} textAnchor="middle" fontSize={11} fill="#6a7786">
        {sub}
      </text>
    </svg>
  );
}

function Linea({ serie, color }: { serie: number[]; color: string }) {
  const min = Math.min(...serie);
  const max = Math.max(...serie);
  const w = 220;
  const h = 56;
  const p = serie.map((v, i) => `${(i / (serie.length - 1)) * w},${h - 4 - ((v - min) / Math.max(1, max - min)) * (h - 8)}`).join(' ');
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="pn-mini" aria-hidden="true">
      <polygon points={`0,${h} ${p} ${w},${h}`} fill={color} opacity={0.1} />
      <polyline points={p} fill="none" stroke={color} strokeWidth={2.5} strokeLinejoin="round" className="pn-linea-anim" />
    </svg>
  );
}

function Medidor({ valor, etiqueta }: { valor: number; etiqueta: string }) {
  const r = 30;
  const c = 2 * Math.PI * r;
  const color = valor >= 90 ? '#17602f' : valor >= 50 ? '#e67e22' : '#c0392b';
  return (
    <div className="pn-medidor">
      <svg viewBox="0 0 76 76" width={76} height={76} aria-hidden="true">
        <circle cx={38} cy={38} r={r} fill="none" stroke="#eef1f4" strokeWidth={7} />
        <circle cx={38} cy={38} r={r} fill="none" stroke={color} strokeWidth={7} strokeDasharray={`${(valor / 100) * c} ${c}`} transform="rotate(-90 38 38)" strokeLinecap="round" />
        <text x={38} y={44} textAnchor="middle" fontSize={18} fontWeight={800} fill={color}>
          {valor}
        </text>
      </svg>
      <small>{etiqueta}</small>
    </div>
  );
}

function Caja({ titulo, fuente, children, className = '' }: { titulo: string; fuente?: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`pn-caja ${className}`}>
      <div className="pn-caja-cabeza">
        <h2>{titulo}</h2>
        {fuente && <span className="pn-fuente">{fuente}</span>}
      </div>
      {children}
    </div>
  );
}

export default function PanelDemo() {
  const [pestana, setPestana] = useState<Pestana>('resumen');
  const [ahora, setAhora] = useState(9);
  const [hoy, setHoy] = useState({ visitas: 124, consultas: 5, clics: 19 });
  const [feed, setFeed] = useState<{ id: number; tipo: string; t: string; d: string; hace: string }[]>(() =>
    EVENTOS.slice(0, 5).map(([tipo, t, d], i) => ({ id: i, tipo, t, d, hace: `hace ${(i + 1) * 2} min` })),
  );
  const contador = useRef(100);
  const [segundos, setSegundos] = useState(0);
  const [peticion, setPeticion] = useState('');
  const [pedido, setPedido] = useState(false);

  // Simulación en directo: cada pocos segundos entra un evento nuevo y suben los contadores.
  useEffect(() => {
    let i = 5;
    const id = setInterval(() => {
      const [tipo, t, d] = EVENTOS[i % EVENTOS.length];
      i++;
      setFeed((f) => [{ id: contador.current++, tipo, t, d, hace: 'ahora mismo' }, ...f.slice(0, 6).map((x, n) => ({ ...x, hace: n === 0 ? 'hace unos segundos' : x.hace }))]);
      setHoy((h) => ({
        visitas: h.visitas + (tipo === 'visita' ? 1 : 0),
        consultas: h.consultas + (tipo === 'consulta' ? 1 : 0),
        clics: h.clics + (tipo === 'whatsapp' || tipo === 'llamada' ? 1 : 0),
      }));
      setAhora((a) => Math.max(3, Math.min(17, a + (Math.random() > 0.5 ? 1 : -1))));
      setSegundos(0);
    }, 4500);
    const reloj = setInterval(() => setSegundos((s) => s + 1), 1000);
    return () => {
      clearInterval(id);
      clearInterval(reloj);
    };
  }, []);

  const totalAds = useMemo(() => CAMPANAS.reduce((a, c) => ({ inversion: a.inversion + c.inversion, consultas: a.consultas + c.consultas }), { inversion: 0, consultas: 0 }), []);
  const ia = IA_SEMANAS[IA_SEMANAS.length - 1];

  return (
    <div className="pn">
      <div className="pn-aviso-demo">
        <b>Demostración con datos de ejemplo.</b> Así verías tu panel cuando conectemos tus cuentas. Ninguna cifra de esta página es real.
      </div>

      <header className="pn-cabeza">
        <div>
          <p className="pn-hola">Buenos días, Jesús</p>
          <h1>Tu panel de control</h1>
          <p className="pn-actualizado">
            <span className="pn-punto" /> En directo · actualizado hace {segundos} s
          </p>
        </div>
        <div className="pn-ahora">
          <b>
            <Contador valor={ahora} />
          </b>
          <span>personas en tu web ahora mismo</span>
        </div>
      </header>

      <div className="pn-conectado" aria-label="Herramientas conectadas">
        <span className="pn-conectado-t">{CONECTADO.length} herramientas conectadas</span>
        <div className="pn-conectado-tira">
          {CONECTADO.map(([n, q]) => (
            <span key={n} className="pn-chip" title={`${n}: ${q}`}>
              <Logo nombre={n} tam={20} />
              <span>{n}</span>
              <i className="pn-ok" aria-label="conectado" />
            </span>
          ))}
        </div>
      </div>

      <nav className="pn-pestanas" role="tablist" aria-label="Secciones del panel">
        {PESTANAS.map(([p, t]) => (
          <button key={p} role="tab" aria-selected={pestana === p} className={pestana === p ? 'activo' : ''} onClick={() => setPestana(p)}>
            {t}
          </button>
        ))}
      </nav>

      {pestana === 'resumen' && (
        <div className="pn-vista" key="resumen">
          <section className="pn-kpis">
            <div className="pn-kpi pn-kpi-grande">
              <small>Consultas hoy</small>
              <b>
                <Contador valor={hoy.consultas} />
              </b>
              <span>100 en los últimos 30 días · <Delta v={34} /></span>
            </div>
            <div className="pn-kpi">
              <small>Visitas hoy</small>
              <b>
                <Contador valor={hoy.visitas} />
              </b>
              <span>2.390 en 30 días · <Delta v={34} sufijo=" %" /></span>
            </div>
            <div className="pn-kpi">
              <small>Pulsaciones en llamar y WhatsApp hoy</small>
              <b>
                <Contador valor={hoy.clics} />
              </b>
              <span>Cada una, con su origen</span>
            </div>
            <div className="pn-kpi">
              <small>Coste por consulta (Google Ads)</small>
              <b>{eur(Math.round(totalAds.inversion / totalAds.consultas))}</b>
              <span>
                <Delta v={-6} invertir sufijo=" €" /> en un mes
              </span>
            </div>
            <div className="pn-kpi">
              <small>Nota en Google</small>
              <b>4,4 ★</b>
              <span>
                <Delta v={9} /> reseñas este mes
              </span>
            </div>
            <div className="pn-kpi">
              <small>Te nombran las IA</small>
              <b>{ia} de 15</b>
              <span>preguntas vigiladas</span>
            </div>
          </section>

          <section className="pn-fila pn-2">
            <Caja titulo="Consultas y visitas, día a día" fuente="Tu web y Google Analytics · al momento">
              <Grafico datos={CONSULTAS_30} linea={VISITAS_30} />
              <p className="pn-leyenda">
                <i style={{ background: '#a8442c' }} /> Consultas <i style={{ background: '#1b6fd1' }} /> Visitas
              </p>
              <div className="pn-tres pn-bajo-grafico">
                <div>
                  <b>7</b>
                  <small>consultas, el mejor día (el martes)</small>
                </div>
                <div>
                  <b>3,3</b>
                  <small>consultas al día de media</small>
                </div>
                <div>
                  <b className="pn-sube">+50 %</b>
                  <small>hoy frente a la media</small>
                </div>
              </div>
            </Caja>
            <Caja titulo="Ahora mismo en tu web" fuente="En directo" className="pn-feed-caja">
              <ul className="pn-feed">
                {feed.map((e) => (
                  <li key={e.id} className={`pn-ev pn-ev-${e.tipo}`}>
                    <i />
                    <span>
                      <b>{e.t}</b>
                      <small>
                        {e.d} · {e.hace}
                      </small>
                    </span>
                  </li>
                ))}
              </ul>
            </Caja>
          </section>

          <section className="pn-fila pn-3">
            <Caja titulo="De dónde vienen las consultas" fuente="Últimos 30 días">
              <div className="pn-origen">
                <Rosco datos={ORIGEN} centro="100" sub="consultas" />
                <ul>
                  {ORIGEN.map(([n, v, c]) => (
                    <li key={n}>
                      <i style={{ background: c }} />
                      <span>{n}</span>
                      <b>{v}</b>
                    </li>
                  ))}
                </ul>
              </div>
            </Caja>
            <Caja titulo="Tu dinero, este mes" fuente="Google Ads y Meta">
              <div className="pn-dinero">
                <div>
                  <small>Google Ads</small>
                  <b>{eur(totalAds.inversion)}</b>
                  <span>{totalAds.consultas} consultas</span>
                </div>
                <div>
                  <small>Instagram y Facebook</small>
                  <b>{eur(META.inversion)}</b>
                  <span>{META.consultas} consultas</span>
                </div>
              </div>
              <div className="pn-barra-pres">
                <span style={{ width: `${((totalAds.inversion + META.inversion) / 1000) * 100}%` }} />
              </div>
              <p className="pn-nota-peq">
                {eur(totalAds.inversion + META.inversion)} de 1.000 € de presupuesto. Cada euro, con la consulta que trae.
              </p>
            </Caja>
            <Caja titulo="Tu web, en forma" fuente="Comprobado hace 6 min">
              <div className="pn-salud">
                <Medidor valor={94} etiqueta="Velocidad móvil" />
                <Medidor valor={100} etiqueta="Accesibilidad" />
                <div className="pn-medidor">
                  <span className="pn-agentes">3/3</span>
                  <small>Agentes de IA</small>
                </div>
              </div>
              <ul className="pn-checks">
                <li>En línea: 99,99 % este mes</li>
                <li>Copia guardada hace 2 horas</li>
                <li>0 enlaces rotos</li>
              </ul>
            </Caja>
          </section>
        </div>
      )}

      {pestana === 'clientes' && (
        <div className="pn-vista" key="clientes">
          <Caja titulo="El camino hasta cliente" fuente="Últimos 30 días">
            <div className="pn-embudo">
              {[
                ['Visitas', 2390],
                ['Usan una herramienta', 486],
                ['Dejan sus datos o escriben', 100],
                ['Reservan consulta', 31],
                ['Te contratan (lo apuntas tú)', 14],
              ].map(([t, v], i) => (
                <div key={t as string} className="pn-embudo-paso" style={{ width: `${100 - i * 15}%` }}>
                  <b>{num(v as number)}</b>
                  <span>{t}</span>
                </div>
              ))}
            </div>
          </Caja>

          <Caja titulo="Últimas consultas" fuente="Formularios, WhatsApp, llamadas y chat · al momento">
            <div className="pn-leads">
              {LEADS.map((l) => (
                <div key={l.nombre + l.tema} className="pn-lead">
                  <span className="pn-avatar">{l.nombre}</span>
                  <span className="pn-lead-txt">
                    <b>{l.tema}</b>
                    <small>
                      {l.origen} · {l.canal} · {l.cuando}
                    </small>
                  </span>
                  <span className={`pn-estado pn-e-${l.estado.split(' ')[0].toLowerCase()}`}>{l.estado}</span>
                </div>
              ))}
            </div>
          </Caja>

          <section className="pn-fila pn-3">
            <Caja titulo="Correos de seguimiento" fuente="Resend · al momento">
              <div className="pn-tres">
                <div>
                  <b>412</b>
                  <small>enviados</small>
                </div>
                <div>
                  <b>61 %</b>
                  <small>los abren</small>
                </div>
                <div>
                  <b>9</b>
                  <small>consultas desde un correo</small>
                </div>
              </div>
              <ul className="pn-barras-h">
                {CORREOS.map(([t, v]) => (
                  <li key={t}>
                    <span>{t}</span>
                    <span className="pn-pista">
                      <span style={{ width: `${v}%` }} />
                    </span>
                    <b>{v} %</b>
                  </li>
                ))}
              </ul>
            </Caja>
            <Caja titulo="El asistente de la web" fuente="Chat · al momento">
              <div className="pn-tres">
                <div>
                  <b>214</b>
                  <small>conversaciones</small>
                </div>
                <div>
                  <b>14</b>
                  <small>piden que les llames</small>
                </div>
                <div>
                  <b>58 %</b>
                  <small>fuera de horario</small>
                </div>
              </div>
              <p className="pn-nota-peq">
                <b>Lo que más preguntan:</b> plazos para reclamar un despido, bajas por ansiedad, si se puede grabar al jefe y cuánto cuesta la consulta.
              </p>
            </Caja>
            <Caja titulo="Tus herramientas" fuente="Usos en 30 días">
              <ul className="pn-barras-h">
                {HERRAMIENTAS.map(([t, v]) => (
                  <li key={t}>
                    <span>{t}</span>
                    <span className="pn-pista">
                      <span style={{ width: `${(v / 182) * 100}%`, background: '#17602f' }} />
                    </span>
                    <b>{v}</b>
                  </li>
                ))}
              </ul>
              <p className="pn-nota-peq">Una de cada cinco personas que usan una herramienta acaba escribiéndote.</p>
            </Caja>
          </section>
        </div>
      )}

      {pestana === 'anuncios' && (
        <div className="pn-vista" key="anuncios">
          <section className="pn-kpis pn-kpis-4">
            <div className="pn-kpi pn-kpi-grande">
              <small>Invertido este mes</small>
              <b>{eur(totalAds.inversion + META.inversion)}</b>
              <span>Google Ads y Meta</span>
            </div>
            <div className="pn-kpi">
              <small>Consultas desde anuncios</small>
              <b>{totalAds.consultas + META.consultas}</b>
              <span>
                <Delta v={11} /> frente al mes pasado
              </span>
            </div>
            <div className="pn-kpi">
              <small>Coste por consulta</small>
              <b>{eur(Math.round((totalAds.inversion + META.inversion) / (totalAds.consultas + META.consultas)))}</b>
              <span>
                <Delta v={-6} invertir sufijo=" €" />
              </span>
            </div>
            <div className="pn-kpi">
              <small>Palabras que no traen clientes</small>
              <b>38</b>
              <span>bloqueadas este mes</span>
            </div>
          </section>
          <Caja titulo="Google Ads, campaña a campaña" fuente="Google Ads · actualizado hace 3 horas">
            <div className="pn-tabla">
              <div className="pn-tabla-cabeza">
                <span>Campaña</span>
                <span>Invertido</span>
                <span>Clics</span>
                <span>Consultas</span>
                <span>Coste por consulta</span>
              </div>
              {CAMPANAS.map((c) => (
                <div key={c.nombre} className="pn-tabla-fila">
                  <span className="pn-camp">{c.nombre}</span>
                  <span data-t="Invertido">{eur(c.inversion)}</span>
                  <span data-t="Clics">{c.clics}</span>
                  <span data-t="Consultas">{c.consultas}</span>
                  <span data-t="Coste por consulta">
                    <b>{eur(Math.round(c.inversion / c.consultas))}</b> <Delta v={c.tendencia} invertir sufijo=" %" />
                  </span>
                </div>
              ))}
            </div>
          </Caja>
          <section className="pn-fila pn-2">
            <Caja titulo="Instagram y Facebook" fuente="Meta · al momento">
              <div className="pn-tres">
                <div>
                  <b>{num(META.alcance)}</b>
                  <small>personas alcanzadas en Madrid</small>
                </div>
                <div>
                  <b>{META.clics}</b>
                  <small>clics</small>
                </div>
                <div>
                  <b>{eur(Math.round(META.inversion / META.consultas))}</b>
                  <small>por consulta</small>
                </div>
              </div>
            </Caja>
            <Caja titulo="Lo que hemos ajustado" fuente="Esta semana">
              <ul className="pn-checks">
                <li>Pausada "mobbing qué es": lectores, no clientes</li>
                <li>Subida la puja en "abogado incapacidad denegada"</li>
                <li>Nuevo anuncio con el precio claro de la consulta</li>
              </ul>
            </Caja>
          </section>
        </div>
      )}

      {pestana === 'google' && (
        <div className="pn-vista" key="google">
          <section className="pn-kpis pn-kpis-4">
            <div className="pn-kpi pn-kpi-grande">
              <small>Visitas desde Google</small>
              <b>1.140</b>
              <span>al mes · antes 239</span>
            </div>
            <div className="pn-kpi">
              <small>Búsquedas en primera página</small>
              <b>88</b>
              <span>
                <Delta v={37} /> desde el inicio
              </span>
            </div>
            <div className="pn-kpi">
              <small>Autoridad del dominio</small>
              <b>14</b>
              <span>antes 8</span>
            </div>
            <div className="pn-kpi">
              <small>Artículos publicados</small>
              <b>12</b>
              <span>este mes</span>
            </div>
          </section>
          <section className="pn-fila pn-2">
            <Caja titulo="Tus búsquedas clave" fuente="Search Console · hace 2 días">
              <ul className="pn-busquedas">
                {BUSQUEDAS.map(([q, vol, pos, antes]) => (
                  <li key={q}>
                    <span className="pn-q">
                      {q}
                      <small>{num(vol)} búsquedas al mes · antes en el {antes}.º</small>
                    </span>
                    <span className="pn-pos">
                      <b>{pos}.º</b>
                      <span className="pn-delta pn-sube">▲ {antes - pos}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </Caja>
            <Caja titulo="Te recomiendan las IA" fuente="ChatGPT, Gemini y Google · cada semana">
              <p className="pn-ia-cifra">
                <b>{ia}</b> de 15 preguntas
              </p>
              <div className="pn-ia-barras" aria-label="Evolución semanal (ejemplo)">
                {IA_SEMANAS.map((v, i) => (
                  <span key={i} style={{ height: `${(v / 15) * 100}%` }} title={`Semana ${i + 1}: ${v}`} />
                ))}
              </div>
              <p className="pn-nota-peq">
                ChatGPT ya te nombra en &quot;¿Qué abogado de acoso laboral me recomiendas en Madrid?&quot;. Llegan 23 visitas al mes desde ChatGPT.
              </p>
            </Caja>
          </section>
          <Caja titulo="Bing" fuente="Bing Webmaster Tools y Bing Places · cada día">
            <div className="pn-tres pn-cuatro">
              <div>
                <b>96</b>
                <small>visitas desde Bing este mes</small>
              </div>
              <div>
                <b>11,7 %</b>
                <small>de las búsquedas en ordenador en España</small>
              </div>
              <div>
                <b>4</b>
                <small>consultas desde Bing</small>
              </div>
              <div>
                <b>3.º</b>
                <small>en "abogado acoso laboral madrid"</small>
              </div>
            </div>
            <p className="pn-nota-peq">Tu ficha de Bing, completa y enlazada a la web nueva. ChatGPT y Copilot buscan en Bing: estar arriba aquí también ayuda a que te recomienden.</p>
          </Caja>
          <Caja titulo="Tus reseñas" fuente="Ficha de Google · hoy">
            <div className="pn-resenas">
              <p className="pn-ia-cifra">
                <b>4,4</b> ★ con 81 reseñas
              </p>
              <div className="pn-progreso">
                <span style={{ width: '72%' }} />
              </div>
              <p className="pn-nota-peq">
                Faltan <b>9 reseñas de cinco estrellas</b> para el 4,5. Este mes: 9 nuevas, todas contestadas con tu visto bueno. 22 pedidas por WhatsApp.
              </p>
            </div>
          </Caja>
        </div>
      )}

      {pestana === 'redes' && (
        <div className="pn-vista" key="redes">
          <section className="pn-redes">
            {REDES.map((r) => {
              const ult = r.serie[r.serie.length - 1];
              const ini = r.serie[0];
              return (
                <div key={r.red} className="pn-red">
                  <div className="pn-red-cabeza">
                    <Logo nombre={r.red} tam={30} />
                    <span>
                      <b>{r.red}</b>
                      <small>Seguidores</small>
                    </span>
                    <span className="pn-red-num">
                      <Contador valor={ult} />
                      <span className="pn-delta pn-sube">+{num(ult - ini)}</span>
                    </span>
                  </div>
                  <Linea serie={r.serie} color={r.color} />
                  <p className="pn-nota-peq">{r.extra}</p>
                </div>
              );
            })}
          </section>
          <Caja titulo="Este mes en redes" fuente="Instagram, LinkedIn, Facebook, TikTok y YouTube">
            <div className="pn-tres pn-cuatro">
              <div>
                <b>16</b>
                <small>publicaciones</small>
              </div>
              <div>
                <b>6</b>
                <small>vídeos montados por nosotros</small>
              </div>
              <div>
                <b>48.300</b>
                <small>reproducciones</small>
              </div>
              <div>
                <b>6</b>
                <small>consultas desde redes</small>
              </div>
            </div>
          </Caja>
        </div>
      )}

      {pestana === 'web' && (
        <div className="pn-vista" key="web">
          <Caja titulo="Velocidad y calidad" fuente="PageSpeed de Google · comprobado hace 6 min">
            <div className="pn-salud pn-salud-grande">
              <Medidor valor={94} etiqueta="Velocidad móvil" />
              <Medidor valor={99} etiqueta="Velocidad ordenador" />
              <Medidor valor={100} etiqueta="Accesibilidad" />
              <Medidor valor={100} etiqueta="Buenas prácticas" />
              <Medidor valor={100} etiqueta="SEO" />
              <div className="pn-medidor">
                <span className="pn-agentes">3/3</span>
                <small>Navegación agéntica</small>
              </div>
            </div>
            <p className="pn-nota-peq">Lo comprobamos solos cada día. Si alguna nota baja, nos llega un aviso y lo arreglamos antes de que lo notes.</p>
          </Caja>
          <section className="pn-fila pn-3">
            <Caja titulo="Seguridad" fuente="Al momento">
              <ul className="pn-checks">
                <li>Sin WordPress ni plugins que atacar</li>
                <li>Certificado de seguridad válido</li>
                <li>Formularios protegidos contra el correo basura</li>
              </ul>
            </Caja>
            <Caja titulo="Copias de seguridad" fuente="Vercel">
              <p className="pn-ia-cifra">
                <b>312</b> versiones guardadas
              </p>
              <p className="pn-nota-peq">La última, hace 2 horas. Podemos volver a cualquiera en unos minutos: la de ayer, la de hace un mes o la de hace cuatro.</p>
            </Caja>
            <Caja titulo="Siempre en línea" fuente="Este mes">
              <p className="pn-ia-cifra">
                <b>99,99 %</b>
              </p>
              <p className="pn-nota-peq">Carga en 3,2 segundos en el móvil (tu web anterior: 18,3). 0 enlaces rotos. 220 direcciones antiguas redirigidas.</p>
            </Caja>
          </section>
          <Caja titulo="Lo que vemos en Clarity" fuente="Mapas de calor y grabaciones anónimas">
            <ul className="pn-avisos">
              <li className="pn-aviso">El 38 % de quien llega a incapacidad desde un anuncio no baja hasta el formulario. Lo hemos subido arriba.</li>
              <li className="pn-bien">El test de acoso es lo más pulsado de la portada en el móvil.</li>
              <li className="pn-bien">Nadie se atasca ya en el formulario de contacto: lo terminan 9 de cada 10.</li>
            </ul>
          </Caja>
        </div>
      )}

      {pestana === 'gastos' && (
        <div className="pn-vista" key="gastos">
          <Caja titulo="Lo que te cuesta tu marketing este mes" fuente="Octubre · todo en un solo sitio">
            <div className="pn-gastos">
              {[
                ['Nuestra cuota', 'La que acordemos', 'Web, SEO, anuncios, redes, diseño, correos, informes... todo incluido', 'fijo'],
                ['Servidor y mantenimiento de la web', '0 €', 'Incluido en la cuota: alojamiento, copias y seguridad', 'incluido'],
                ['SEO (dentro y fuera de tu web)', '0 €', 'Incluido en la cuota: contenidos, técnico, local y búsqueda de enlaces', 'incluido'],
                ['Google Ads', eur(690), 'Lo pagas tú a Google, con tu tarjeta', 'variable'],
                ['Instagram y Facebook (Meta)', eur(120), 'Lo pagas tú a Meta, con tu tarjeta', 'variable'],
                ['Notas de prensa y artículos en medios', '0 €', 'Opcional: solo si decides comprar un pack para conseguir enlaces de calidad', 'opcional'],
                ['Asistente de IA', '4 €', 'Por uso: 214 conversaciones este mes', 'variable'],
              ].map(([t, v, d, tipo]) => (
                <div key={t} className={`pn-gasto pn-g-${tipo}`}>
                  <span>
                    <b>{t}</b>
                    <small>{d}</small>
                  </span>
                  <strong>{v}</strong>
                </div>
              ))}
            </div>
            <p className="pn-nota-peq">
              Además de la cuota, este mes: <b>{eur(690 + 120 + 4)}</b>, todo en anuncios y en el asistente. Cada euro, con la consulta que trae.
            </p>
          </Caja>
          <section className="pn-fila pn-2">
            <Caja titulo="Mes a mes" fuente="Lo que pagas aparte de la cuota">
              <div className="pn-meses">
                {GASTO_MES.map((m, i) => {
                  const total = m.ads + m.meta + m.prensa;
                  const max = 1000;
                  return (
                    <div key={MESES[i]} className="pn-mes" title={`${MESES[i]}: ${eur(total)}`}>
                      <span className="pn-mes-col">
                        <i style={{ height: `${(m.prensa / max) * 100}%`, background: '#f5a623' }} />
                        <i style={{ height: `${(m.meta / max) * 100}%`, background: '#7a4fb3' }} />
                        <i style={{ height: `${(m.ads / max) * 100}%`, background: '#a8442c' }} />
                      </span>
                      <b>{eur(total)}</b>
                      <small>{MESES[i]}</small>
                    </div>
                  );
                })}
              </div>
              <p className="pn-leyenda">
                <i style={{ background: '#a8442c' }} /> Google Ads <i style={{ background: '#7a4fb3' }} /> Meta <i style={{ background: '#f5a623' }} /> Notas de prensa
              </p>
            </Caja>
            <Caja titulo="Lo que te cuesta cada consulta" fuente="Gasto aparte de la cuota ÷ consultas">
              <ul className="pn-barras-h">
                {GASTO_MES.map((m, i) => {
                  const c = Math.round((m.ads + m.meta + m.prensa) / m.consultas);
                  return (
                    <li key={MESES[i]}>
                      <span>{MESES[i]}</span>
                      <span className="pn-pista">
                        <span style={{ width: `${(c / 20) * 100}%`, background: '#1b6fd1' }} />
                      </span>
                      <b>{eur(c)}</b>
                    </li>
                  );
                })}
              </ul>
              <p className="pn-nota-peq">En julio se compró un pack de notas de prensa: sube ese mes y luego trae visitas desde Google sin pagar.</p>
            </Caja>
          </section>
        </div>
      )}

      {pestana === 'equipo' && (
        <div className="pn-vista" key="equipo">
          <section className="pn-kpis pn-kpis-4">
            <div className="pn-kpi pn-kpi-grande">
              <small>Tareas hechas este mes</small>
              <b>
                <Contador valor={86} />
              </b>
              <span>sin que tengas que pedirlas</span>
            </div>
            <div className="pn-kpi">
              <small>Cambios en la web</small>
              <b>27</b>
              <span>el mismo día que se pidieron</span>
            </div>
            <div className="pn-kpi">
              <small>Tiempo medio de respuesta</small>
              <b>2 h 40 min</b>
              <span>a lo que nos pides</span>
            </div>
            <div className="pn-kpi">
              <small>Informes enviados</small>
              <b>4 + 30</b>
              <span>semanales y diarios</span>
            </div>
          </section>
          <Caja titulo="Lo que hemos hecho por ti" fuente="Nuestro equipo · al momento">
            <ul className="pn-actividad">
              {ACTIVIDAD.map(([cuando, tipo, texto]) => (
                <li key={texto}>
                  <span className="pn-tipo">{tipo}</span>
                  <span>
                    {texto}
                    <small>{cuando}</small>
                  </span>
                </li>
              ))}
            </ul>
          </Caja>
        </div>
      )}

      <section className="pn-pide">
        <div>
          <b>¿Echas algún dato de menos? ¿Quieres otro informe?</b>
          <span>
            Pídenoslo y lo añadimos a tu panel: lo que quieras medir, cada cuánto y cómo quieres verlo. También entra en la cuota.
          </span>
        </div>
        <form
          className="pn-pide-form"
          onSubmit={(e) => {
            e.preventDefault();
            if (peticion.trim()) setPedido(true);
          }}
        >
          {pedido ? (
            <p className="pn-pide-ok">Recibido. Lo tendrás en tu panel en 24 a 48 horas. (Demostración: no se ha enviado nada.)</p>
          ) : (
            <>
              <input value={peticion} onChange={(e) => setPeticion(e.target.value)} placeholder="Por ejemplo: consultas de Bilbao, o un informe solo de incapacidad" aria-label="Qué quieres añadir a tu panel" />
              <button type="submit">Pedirlo</button>
            </>
          )}
        </form>
      </section>

      <p className="pn-pie">
        Datos de ejemplo. Con tus accesos, cada bloque se conecta a su fuente: tu web (consultas, chat y herramientas, al momento), Google Analytics (al
        momento), Google Ads (cada 3 horas), Search Console (con 2 o 3 días de retraso, como da Google), Meta, Instagram, LinkedIn, TikTok, tu ficha de
        Google, Resend, PageSpeed y Clarity.
      </p>
    </div>
  );
}
