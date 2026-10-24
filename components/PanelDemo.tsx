'use client';

// Demostración del panel de control del cliente. TODOS LOS DATOS SON DE EJEMPLO (se dice en pantalla).
// Cuando haya accesos, cada bloque se alimenta de su fuente: la web (consultas), GA4, Search Console, Google Ads, Meta, la ficha de Google y Clarity.
import { useMemo, useState } from 'react';

type Rango = 'hoy' | '7' | '30';

const RANGOS: [Rango, string][] = [
  ['hoy', 'Hoy'],
  ['7', '7 días'],
  ['30', '30 días'],
];

// Consultas por día de los últimos 30 días (ejemplo) y visitas.
const CONSULTAS_30 = [2, 1, 3, 2, 0, 1, 4, 3, 2, 5, 3, 1, 0, 4, 5, 3, 6, 4, 2, 1, 5, 6, 4, 7, 5, 2, 1, 6, 7, 5];
const VISITAS_30 = [61, 48, 72, 66, 31, 29, 80, 77, 69, 91, 85, 40, 35, 95, 102, 88, 110, 97, 52, 44, 115, 121, 104, 130, 118, 60, 49, 128, 137, 124];

const DATOS: Record<Rango, { consultas: number; cpc: number; inversion: number; presupuesto: number; visitas: number; dif: Record<string, number> }> = {
  hoy: { consultas: 5, cpc: 22, inversion: 22, presupuesto: 30, visitas: 124, dif: { consultas: 2, cpc: -3, visitas: 18 } },
  '7': { consultas: 33, cpc: 16, inversion: 161, presupuesto: 210, visitas: 762, dif: { consultas: 9, cpc: -4, visitas: 21 } },
  '30': { consultas: 100, cpc: 18, inversion: 690, presupuesto: 900, visitas: 2390, dif: { consultas: 34, cpc: -6, visitas: 34 } },
};

const ORIGEN: [string, number, string][] = [
  ['Google (sin pagar)', 30, '#1b6fd1'],
  ['Google Ads', 38, '#a8442c'],
  ['Chat de la web', 14, '#17602f'],
  ['WhatsApp directo', 8, '#1f9d55'],
  ['Redes sociales', 6, '#7a4fb3'],
  ['Recomendación y otros', 4, '#8a96a3'],
];

const CANALES: [string, number][] = [
  ['WhatsApp', 39],
  ['Llamadas', 28],
  ['Formularios', 19],
  ['Chat (piden que les llaméis)', 14],
];

const CAMPANAS: { nombre: string; inversion: number; clics: number; consultas: number; tendencia: number }[] = [
  { nombre: 'Incapacidad permanente', inversion: 312, clics: 221, consultas: 16, tendencia: -12 },
  { nombre: 'Acoso laboral', inversion: 214, clics: 148, consultas: 11, tendencia: -8 },
  { nombre: 'Despidos', inversion: 128, clics: 97, consultas: 4, tendencia: 6 },
  { nombre: 'Marca (tu nombre)', inversion: 36, clics: 64, consultas: 7, tendencia: -2 },
];

const BUSQUEDAS: [string, number, number, number][] = [
  ['abogado acoso laboral madrid', 140, 6, 11],
  ['abogados acoso laboral', 480, 5, 9],
  ['abogado laboralista madrid', 1900, 12, 18],
  ['abogado incapacidad permanente', 720, 14, 27],
  ['test de acoso laboral', 720, 4, 12],
  ['despido embarazada abogado', 90, 7, 15],
];

const IA_SEMANAS = [2, 2, 3, 4, 4, 5, 6, 7];

const ACTIVIDAD: [string, string, string][] = [
  ['Hoy, 10:42', 'Web', 'Subido el botón de llamar en la guía de incapacidad (lo vimos en Clarity: la gente no lo encontraba).'],
  ['Hoy, 09:15', 'Anuncios', 'Pausada la palabra "mobbing qué es": traía lectores, no clientes. Ahorro estimado: 40 € al mes.'],
  ['Ayer, 18:30', 'Reseñas', 'Publicada la respuesta a la reseña de María, con tu visto bueno.'],
  ['Ayer, 12:00', 'Blog', 'Publicado: "Burnout o acoso laboral: en qué se diferencian".'],
  ['Lunes, 08:00', 'Informe', 'Enviado el informe semanal a tu móvil.'],
  ['Domingo, 20:10', 'Correos', 'Nueva secuencia para Mujer y trabajo, lista para que la revises.'],
];

const AVISOS: [string, string][] = [
  ['bien', 'Récord de consultas en un día este mes: 7, el martes.'],
  ['aviso', 'La campaña de Despidos cuesta más por consulta que las demás. Proponemos ajustar las palabras esta semana.'],
  ['bien', 'Has subido al puesto 6 en "abogado acoso laboral madrid".'],
];

const num = (n: number) => new Intl.NumberFormat('es-ES', { useGrouping: 'always' } as Intl.NumberFormatOptions).format(n);
const eur = (n: number) => `${num(n)} €`;

function Delta({ v, invertir = false, sufijo = '' }: { v: number; invertir?: boolean; sufijo?: string }) {
  const bueno = invertir ? v < 0 : v > 0;
  return (
    <span className={`pn-delta ${bueno ? 'pn-sube' : 'pn-baja'}`}>
      {v > 0 ? '+' : ''}
      {v}
      {sufijo} {invertir ? '' : ''}
    </span>
  );
}

function Barras({ datos, linea }: { datos: number[]; linea: number[] }) {
  const max = Math.max(...datos);
  const maxL = Math.max(...linea);
  const w = 600;
  const h = 170;
  const paso = w / datos.length;
  const puntos = linea.map((v, i) => `${i * paso + paso / 2},${h - 14 - (v / maxL) * (h - 34)}`).join(' ');
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="pn-grafico" role="img" aria-label="Consultas y visitas por día en los últimos 30 días (ejemplo)">
      {datos.map((v, i) => {
        const alto = (v / max) * (h - 34);
        return <rect key={i} x={i * paso + 3} y={h - 14 - alto} width={paso - 6} height={alto} rx={3} fill="#a8442c" opacity={i === datos.length - 1 ? 1 : 0.75} />;
      })}
      <polyline points={puntos} fill="none" stroke="#1b6fd1" strokeWidth={2.5} strokeLinejoin="round" />
      <line x1={0} y1={h - 14} x2={w} y2={h - 14} stroke="#d5dde7" />
      <text x={0} y={h - 1} fontSize={11} fill="#6a7786">
        Hace 30 días
      </text>
      <text x={w} y={h - 1} fontSize={11} fill="#6a7786" textAnchor="end">
        Hoy
      </text>
    </svg>
  );
}

function Rosco({ datos }: { datos: [string, number, string][] }) {
  const total = datos.reduce((a, [, v]) => a + v, 0);
  let acum = 0;
  const r = 52;
  const c = 2 * Math.PI * r;
  return (
    <svg viewBox="0 0 140 140" className="pn-rosco" role="img" aria-label="Origen de las consultas (ejemplo)">
      {datos.map(([n, v, color]) => {
        const largo = (v / total) * c;
        const el = <circle key={n} cx={70} cy={70} r={r} fill="none" stroke={color} strokeWidth={22} strokeDasharray={`${largo} ${c - largo}`} strokeDashoffset={-acum} transform="rotate(-90 70 70)" />;
        acum += largo;
        return el;
      })}
      <text x={70} y={66} textAnchor="middle" fontSize={24} fontWeight={800} fill="#0d2c48">
        {total}
      </text>
      <text x={70} y={86} textAnchor="middle" fontSize={11} fill="#6a7786">
        consultas
      </text>
    </svg>
  );
}

export default function PanelDemo() {
  const [rango, setRango] = useState<Rango>('30');
  const d = DATOS[rango];
  const totalIA = 15;
  const ia = IA_SEMANAS[IA_SEMANAS.length - 1];
  const factor = rango === '30' ? 1 : rango === '7' ? 7 / 30 : 1 / 30;
  const campanas = useMemo(
    () =>
      CAMPANAS.map((c) => ({
        ...c,
        inversion: Math.round(c.inversion * factor),
        clics: Math.max(1, Math.round(c.clics * factor)),
        consultas: Math.max(rango === 'hoy' ? 0 : 1, Math.round(c.consultas * factor)),
      })),
    [factor, rango],
  );

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
            <span className="pn-punto" /> En directo · consultas y visitas al momento
          </p>
        </div>
        <div className="pn-rangos" role="tablist" aria-label="Periodo">
          {RANGOS.map(([r, t]) => (
            <button key={r} role="tab" aria-selected={rango === r} className={rango === r ? 'activo' : ''} onClick={() => setRango(r)}>
              {t}
            </button>
          ))}
        </div>
      </header>

      <section className="pn-kpis">
        <div className="pn-kpi pn-kpi-grande">
          <small>Consultas</small>
          <b>{d.consultas}</b>
          <span>
            <Delta v={d.dif.consultas} /> frente al periodo anterior
          </span>
        </div>
        <div className="pn-kpi">
          <small>Coste por consulta (anuncios)</small>
          <b>{eur(d.cpc)}</b>
          <span>
            <Delta v={d.dif.cpc} invertir sufijo=" €" /> más barato
          </span>
        </div>
        <div className="pn-kpi">
          <small>Invertido en anuncios</small>
          <b>{eur(d.inversion)}</b>
          <span className="pn-barra-pres">
            <span style={{ width: `${(d.inversion / d.presupuesto) * 100}%` }} />
          </span>
          <span>de {eur(d.presupuesto)} de presupuesto</span>
        </div>
        <div className="pn-kpi">
          <small>Visitas a la web</small>
          <b>{num(d.visitas)}</b>
          <span>
            <Delta v={d.dif.visitas} sufijo=" %" />
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
          <b>
            {ia} de {totalIA}
          </b>
          <span>preguntas vigiladas en ChatGPT</span>
        </div>
      </section>

      <section className="pn-fila pn-2">
        <div className="pn-caja">
          <div className="pn-caja-cabeza">
            <h2>Consultas y visitas, día a día</h2>
            <span className="pn-fuente">Tu web y Google Analytics · al momento</span>
          </div>
          <Barras datos={CONSULTAS_30} linea={VISITAS_30} />
          <p className="pn-leyenda">
            <i style={{ background: '#a8442c' }} /> Consultas <i style={{ background: '#1b6fd1' }} /> Visitas
          </p>
        </div>
        <div className="pn-caja">
          <div className="pn-caja-cabeza">
            <h2>De dónde vienen</h2>
            <span className="pn-fuente">Últimos 30 días</span>
          </div>
          <div className="pn-origen">
            <Rosco datos={ORIGEN} />
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
          <div className="pn-canales">
            {CANALES.map(([n, v]) => (
              <div key={n}>
                <b>{v}</b>
                <small>{n}</small>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pn-caja">
        <div className="pn-caja-cabeza">
          <h2>Tus campañas de Google Ads</h2>
          <span className="pn-fuente">Google Ads · actualizado hace 3 horas</span>
        </div>
        <div className="pn-tabla">
          <div className="pn-tabla-cabeza">
            <span>Campaña</span>
            <span>Invertido</span>
            <span>Clics</span>
            <span>Consultas</span>
            <span>Coste por consulta</span>
          </div>
          {campanas.map((c) => (
            <div key={c.nombre} className="pn-tabla-fila">
              <span className="pn-camp">{c.nombre}</span>
              <span data-t="Invertido">{eur(c.inversion)}</span>
              <span data-t="Clics">{c.clics}</span>
              <span data-t="Consultas">{c.consultas}</span>
              <span data-t="Coste por consulta">
                <b>{c.consultas ? eur(Math.round(c.inversion / c.consultas)) : '—'}</b> <Delta v={c.tendencia} invertir sufijo=" %" />
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="pn-fila pn-3">
        <div className="pn-caja">
          <div className="pn-caja-cabeza">
            <h2>Tus búsquedas en Google</h2>
            <span className="pn-fuente">Search Console · hace 2 días</span>
          </div>
          <ul className="pn-busquedas">
            {BUSQUEDAS.map(([q, vol, pos, antes]) => (
              <li key={q}>
                <span className="pn-q">
                  {q}
                  <small>{num(vol)} al mes</small>
                </span>
                <span className="pn-pos">
                  <b>{pos}.º</b>
                  <span className="pn-delta pn-sube">▲ {antes - pos}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="pn-caja">
          <div className="pn-caja-cabeza">
            <h2>Te recomiendan las IA</h2>
            <span className="pn-fuente">Cada semana</span>
          </div>
          <p className="pn-ia-cifra">
            <b>{ia}</b> de {totalIA} preguntas
          </p>
          <div className="pn-ia-barras" aria-label="Evolución semanal (ejemplo)">
            {IA_SEMANAS.map((v, i) => (
              <span key={i} style={{ height: `${(v / totalIA) * 100}%` }} title={`Semana ${i + 1}: ${v}`} />
            ))}
          </div>
          <p className="pn-nota-peq">Semanas desde que publicamos la web. ChatGPT te nombra en "¿Qué abogado de acoso laboral me recomiendas en Madrid?".</p>
        </div>
        <div className="pn-caja">
          <div className="pn-caja-cabeza">
            <h2>Tus reseñas</h2>
            <span className="pn-fuente">Ficha de Google · hoy</span>
          </div>
          <p className="pn-ia-cifra">
            <b>4,4</b> ★ con 81 reseñas
          </p>
          <div className="pn-progreso">
            <span style={{ width: '72%' }} />
          </div>
          <p className="pn-nota-peq">
            Faltan <b>9 reseñas de cinco estrellas</b> para el 4,5. Este mes: 9 nuevas, todas contestadas.
          </p>
        </div>
      </section>

      <section className="pn-fila pn-2">
        <div className="pn-caja">
          <div className="pn-caja-cabeza">
            <h2>Lo que hemos hecho por ti</h2>
            <span className="pn-fuente">Nuestro equipo</span>
          </div>
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
        </div>
        <div className="pn-caja">
          <div className="pn-caja-cabeza">
            <h2>Avisos</h2>
            <span className="pn-fuente">También te llegan al móvil</span>
          </div>
          <ul className="pn-avisos">
            {AVISOS.map(([t, x]) => (
              <li key={x} className={`pn-${t}`}>
                {x}
              </li>
            ))}
          </ul>
          <div className="pn-clarity">
            <b>Lo que vemos en Clarity esta semana</b>
            <span>El 38 % de quien llega a la página de incapacidad desde un anuncio no baja hasta el formulario. Hemos subido el formulario arriba.</span>
          </div>
        </div>
      </section>

      <p className="pn-pie">
        Datos de ejemplo. Con tus accesos, cada bloque se conecta a su fuente: tu web (consultas, al momento), Google Analytics (al momento), Google Ads (cada
        3 horas), Search Console (con 2 o 3 días de retraso, como da Google), tu ficha de Google, Meta y Clarity.
      </p>
    </div>
  );
}
