'use client';

// CRM de ejemplo para Jesús: así entrarían solas las consultas de la web y así las seguiría su equipo.
// Todo es inventado y nada se envía ni se guarda: es una demostración.

import { useEffect, useMemo, useState } from 'react';
import { Logo } from '@/components/LogosGuia';

type Etapa = 'nueva' | 'contactada' | 'reservada' | 'propuesta' | 'cliente' | 'nosigue';
type Tema = 'Acoso laboral' | 'Despido' | 'Incapacidad' | 'Mujer y trabajo' | 'Empresa';

type Paso = { cuando: string; que: string; tipo: 'web' | 'correo' | 'whatsapp' | 'llamada' | 'nota' };

type Ficha = {
  id: number;
  nombre: string;
  tema: Tema;
  etapa: Etapa;
  origen: string;
  logo: string;
  detalle: string;
  hace: string;
  telefono: string;
  correo: string;
  herramienta?: string;
  plazo?: { texto: string; urgente: boolean };
  siguiente: string;
  pasos: Paso[];
  docs: [string, boolean][];
  nota: string;
};

const ETAPAS: [Etapa, string, string][] = [
  ['nueva', 'Nuevas', 'Acaban de entrar'],
  ['contactada', 'Contactadas', 'Ya hemos hablado'],
  ['reservada', 'Consulta reservada', 'Con día y hora'],
  ['propuesta', 'Hoja de encargo', 'Enviada, falta la firma'],
  ['cliente', 'Clientes', 'Han contratado'],
  ['nosigue', 'No siguen', 'Y por qué'],
];

const TEMA_COLOR: Record<Tema, string> = {
  'Acoso laboral': '#a8442c',
  Despido: '#1b6fd1',
  Incapacidad: '#7a4fb3',
  'Mujer y trabajo': '#c2477a',
  Empresa: '#17602f',
};

const DOCS: Record<Tema, string[]> = {
  'Acoso laboral': ['Contrato', 'Correos o mensajes', 'Partes médicos', 'Testigos'],
  Despido: ['Carta de despido', 'Contrato', 'Últimas nóminas', 'Vida laboral'],
  Incapacidad: ['Informes médicos', 'Resolución del INSS', 'Vida laboral', 'Bases de cotización'],
  'Mujer y trabajo': ['Contrato', 'Solicitud a la empresa', 'Respuesta de la empresa', 'Libro de familia'],
  Empresa: ['Plantilla', 'Protocolo actual', 'Convenio colectivo', 'Contacto de RR. HH.'],
};

function docs(t: Tema, hechos: number): [string, boolean][] {
  return DOCS[t].map((d, i) => [d, i < hechos]);
}

const INICIO: Ficha[] = [
  {
    id: 1, nombre: 'Marta R.', tema: 'Despido', etapa: 'reservada', origen: 'Google Ads', logo: 'Google Ads', detalle: 'Anuncio "abogado despido Madrid" · página de despidos', hace: 'hace 2 días',
    telefono: '6•• ••• 214', correo: 'marta.r•••@gmail.com', herramienta: 'Calculadora de indemnización: 11.240 € (improcedente)',
    plazo: { texto: 'Despido el 1 de octubre: el plazo para la papeleta vence el viernes 30. Quedan 5 días hábiles.', urgente: true },
    siguiente: 'Consulta el lunes a las 10:00 con Jesús',
    pasos: [
      { cuando: 'Jue 22 · 21:14', que: 'Usó la calculadora de indemnización desde el anuncio', tipo: 'web' },
      { cuando: 'Jue 22 · 21:19', que: 'Dejó sus datos en el formulario', tipo: 'web' },
      { cuando: 'Jue 22 · 21:20', que: 'Recibió el correo 1: "Esto es lo que vamos a revisar de tu despido"', tipo: 'correo' },
      { cuando: 'Vie 23 · 09:05', que: 'La llamasteis y reservó consulta', tipo: 'llamada' },
      { cuando: 'Vie 23 · 09:08', que: 'Confirmación por WhatsApp con la lista de documentos', tipo: 'whatsapp' },
    ],
    docs: docs('Despido', 2), nota: 'Trabaja en hostelería desde 2019. Le dijeron el despido por teléfono y la carta llegó después.',
  },
  {
    id: 2, nombre: 'Lucía G.', tema: 'Acoso laboral', etapa: 'nueva', origen: 'Google', logo: 'Search Console', detalle: 'Guía "Cómo demostrar el acoso laboral" · test de acoso', hace: 'hace 25 min',
    telefono: '6•• ••• 873', correo: 'lucia•••@hotmail.com', herramienta: 'Test de acoso: 7 de 10 señales',
    siguiente: 'Llamar hoy antes de las 13:00 (pidió mañana)',
    pasos: [
      { cuando: 'Hoy · 10:31', que: 'Llegó desde Google a la guía de pruebas del acoso', tipo: 'web' },
      { cuando: 'Hoy · 10:38', que: 'Hizo el test de acoso', tipo: 'web' },
      { cuando: 'Hoy · 10:40', que: 'Escribió en el formulario', tipo: 'web' },
      { cuando: 'Hoy · 10:41', que: 'Recibió el correo 1 de la secuencia de acoso', tipo: 'correo' },
    ],
    docs: docs('Acoso laboral', 0), nota: '',
  },
  {
    id: 3, nombre: 'Antonio P.', tema: 'Incapacidad', etapa: 'propuesta', origen: 'Google Ads', logo: 'Google Ads', detalle: 'Anuncio "abogados incapacidad permanente" · landing', hace: 'hace 6 días',
    telefono: '6•• ••• 552', correo: 'antoniop•••@gmail.com', herramienta: 'Calculadora de pensión: 1.184 € al mes (total)',
    plazo: { texto: 'Resolución del INSS denegatoria: 30 días para la reclamación previa. El CRM avisa 10 días antes.', urgente: false },
    siguiente: 'Recordarle la firma de la hoja de encargo el martes',
    pasos: [
      { cuando: 'Sáb 17 · 18:02', que: 'Calculó su pensión en la landing de incapacidad', tipo: 'web' },
      { cuando: 'Sáb 17 · 18:06', que: 'Escribió por el chat de la web', tipo: 'web' },
      { cuando: 'Lun 19 · 11:30', que: 'Consulta con Jesús', tipo: 'llamada' },
      { cuando: 'Lun 19 · 13:00', que: 'Enviada la hoja de encargo', tipo: 'correo' },
      { cuando: 'Mié 21 · 09:12', que: 'Abrió la hoja de encargo (dos veces)', tipo: 'correo' },
    ],
    docs: docs('Incapacidad', 3), nota: 'Lumbalgia crónica, conductor de autobús. Le preocupa el coste: explicarle bien los honorarios.',
  },
  {
    id: 4, nombre: 'Sara M.', tema: 'Mujer y trabajo', etapa: 'contactada', origen: 'Instagram', logo: 'Instagram', detalle: 'Reel sobre la reducción de jornada · enlace de la bio', hace: 'ayer',
    telefono: '6•• ••• 039', correo: 'saram•••@gmail.com', herramienta: 'Calendario de permisos: 16 semanas + lactancia',
    siguiente: 'Esperando que mande la respuesta de la empresa',
    pasos: [
      { cuando: 'Vie 23 · 22:47', que: 'Llegó desde Instagram a "Mujer y trabajo"', tipo: 'web' },
      { cuando: 'Vie 23 · 22:55', que: 'Escribió por WhatsApp', tipo: 'whatsapp' },
      { cuando: 'Hoy · 09:40', que: 'Le contestasteis por WhatsApp', tipo: 'whatsapp' },
    ],
    docs: docs('Mujer y trabajo', 1), nota: 'Le han denegado la adaptación de jornada.',
  },
  {
    id: 5, nombre: 'Javier L.', tema: 'Despido', etapa: 'nueva', origen: 'ChatGPT', logo: 'ChatGPT', detalle: 'ChatGPT le recomendó el despacho · página de despidos', hace: 'hace 1 h',
    telefono: '6•• ••• 690', correo: 'jlopez•••@outlook.es',
    plazo: { texto: 'Despido el 20 de octubre: el CRM ya cuenta los 20 días hábiles para la papeleta.', urgente: false },
    siguiente: 'Llamar hoy',
    pasos: [
      { cuando: 'Hoy · 09:52', que: 'Llegó desde ChatGPT a la página de despidos', tipo: 'web' },
      { cuando: 'Hoy · 09:58', que: 'Rellenó el formulario', tipo: 'web' },
      { cuando: 'Hoy · 09:59', que: 'Recibió el correo 1', tipo: 'correo' },
    ],
    docs: docs('Despido', 0), nota: '',
  },
  {
    id: 6, nombre: 'Colegio Santa •••', tema: 'Empresa', etapa: 'propuesta', origen: 'LinkedIn', logo: 'LinkedIn', detalle: 'Publicación de Jesús sobre el protocolo de acoso', hace: 'hace 9 días',
    telefono: '91• ••• 410', correo: 'direccion@•••.es',
    siguiente: 'Presupuesto de formación enviado; llamar el jueves',
    pasos: [
      { cuando: 'Mié 14 · 12:20', que: 'La directora escribió por LinkedIn', tipo: 'web' },
      { cuando: 'Vie 16 · 10:00', que: 'Reunión por videollamada', tipo: 'llamada' },
      { cuando: 'Lun 19 · 17:00', que: 'Enviado presupuesto de protocolo y formación', tipo: 'correo' },
    ],
    docs: docs('Empresa', 2), nota: '120 trabajadores. Quieren la formación antes de Navidad.',
  },
  {
    id: 7, nombre: 'Elena V.', tema: 'Acoso laboral', etapa: 'cliente', origen: 'Google', logo: 'Search Console', detalle: 'Artículo del blog sobre la baja por ansiedad', hace: 'hace 3 semanas',
    telefono: '6•• ••• 118', correo: 'elenav•••@gmail.com', herramienta: 'Test de acoso: 9 de 10 señales',
    siguiente: 'Firmada. Papeleta de conciliación presentada',
    pasos: [
      { cuando: '2 oct', que: 'Leyó el artículo y escribió por el chat', tipo: 'web' },
      { cuando: '3 oct', que: 'Consulta con Jesús', tipo: 'llamada' },
      { cuando: '6 oct', que: 'Firmó la hoja de encargo', tipo: 'nota' },
      { cuando: '7 oct', que: 'Pasa a tu programa de gestión de expedientes', tipo: 'nota' },
    ],
    docs: docs('Acoso laboral', 4), nota: 'Cliente. Desde aquí el expediente sigue en vuestro programa habitual.',
  },
  {
    id: 8, nombre: 'Raúl S.', tema: 'Incapacidad', etapa: 'cliente', origen: 'Bing', logo: 'Bing', detalle: 'Búsqueda en Bing · página de incapacidad', hace: 'hace 2 semanas',
    telefono: '6•• ••• 765', correo: 'rauls•••@yahoo.es',
    siguiente: 'Firmado. Demanda en preparación',
    pasos: [
      { cuando: '8 oct', que: 'Llegó desde Bing y llamó por teléfono', tipo: 'llamada' },
      { cuando: '9 oct', que: 'Consulta', tipo: 'llamada' },
      { cuando: '10 oct', que: 'Firmó', tipo: 'nota' },
    ],
    docs: docs('Incapacidad', 4), nota: '',
  },
  {
    id: 9, nombre: 'Pablo T.', tema: 'Despido', etapa: 'nosigue', origen: 'Google Ads', logo: 'Google Ads', detalle: 'Anuncio de despidos', hace: 'hace 10 días',
    telefono: '6•• ••• 301', correo: 'pablot•••@gmail.com',
    siguiente: 'Motivo: buscaba un abogado de oficio',
    pasos: [
      { cuando: '14 oct', que: 'Formulario desde el anuncio', tipo: 'web' },
      { cuando: '14 oct', que: 'Llamada: busca abogado de oficio', tipo: 'llamada' },
    ],
    docs: docs('Despido', 0), nota: 'Si se repite este motivo, ajustamos el anuncio para no pagar estos clics.',
  },
  {
    id: 10, nombre: 'Nuria F.', tema: 'Acoso laboral', etapa: 'contactada', origen: 'WhatsApp', logo: 'WhatsApp', detalle: 'Botón de WhatsApp de la web', hace: 'hace 3 días',
    telefono: '6•• ••• 482', correo: 'nuriaf•••@gmail.com',
    siguiente: 'Correo 3 de 8 enviado ayer; abierto',
    pasos: [
      { cuando: 'Mié 21 · 20:10', que: 'Escribió por WhatsApp desde la web', tipo: 'whatsapp' },
      { cuando: 'Jue 22 · 10:00', que: 'Llamada: lo está pensando', tipo: 'llamada' },
      { cuando: 'Vie 23 · 10:00', que: 'Correo 3: "Lo que dicen los jueces del acoso"', tipo: 'correo' },
      { cuando: 'Vie 23 · 19:32', que: 'Abrió el correo y vio el vídeo', tipo: 'correo' },
    ],
    docs: docs('Acoso laboral', 1), nota: 'Sigue de baja. No quiere que su empresa se entere todavía.',
  },
];

const LLEGA: Ficha = {
  id: 99, nombre: 'Carmen D.', tema: 'Acoso laboral', etapa: 'nueva', origen: 'Google Ads', logo: 'Google Ads', detalle: 'Anuncio "abogado acoso laboral Madrid" · landing de acoso', hace: 'ahora mismo',
  telefono: '6•• ••• 927', correo: 'carmend•••@gmail.com', herramienta: 'Test de acoso: 6 de 10 señales',
  siguiente: 'Llamar en la primera hora: quien llama pronto, contrata más',
  pasos: [
    { cuando: 'Ahora', que: 'Llegó desde el anuncio de acoso e hizo el test', tipo: 'web' },
    { cuando: 'Ahora', que: 'Dejó sus datos: entra sola en el CRM', tipo: 'web' },
    { cuando: 'Ahora', que: 'Sale el correo 1 de la secuencia de acoso', tipo: 'correo' },
  ],
  docs: docs('Acoso laboral', 0), nota: '',
};

const ORIGEN: [string, string, number, number, number | null][] = [
  ['Google sin pagar (incluye guías y blog)', 'Search Console', 30, 5, null],
  ['Google Ads', 'Google Ads', 38, 4, 690],
  ['Chat de la web', '', 14, 2, null],
  ['WhatsApp', 'WhatsApp', 8, 1, null],
  ['Redes sociales', 'Instagram', 6, 0, null],
  ['Recomendación y otros', '', 4, 2, null],
];

const TAREAS: [string, string, boolean][] = [
  ['Llamar a Lucía G. (acoso) antes de las 13:00', 'Equipo', false],
  ['Llamar a Javier L. (despido, viene de ChatGPT)', 'Equipo', false],
  ['Marta R.: preparar la papeleta, vence el viernes', 'Jesús', false],
  ['Recordar a Antonio P. la hoja de encargo', 'Equipo', true],
  ['Colegio: llamar el jueves por el presupuesto', 'Jesús', false],
];

const ICONO: Record<Paso['tipo'], string> = { web: 'W', correo: '@', whatsapp: 'WA', llamada: 'T', nota: 'N' };

export default function CrmDemo() {
  const [fichas, setFichas] = useState<Ficha[]>(INICIO);
  const [vista, setVista] = useState<'embudo' | 'lista' | 'origen' | 'tareas'>('embudo');
  const [abierta, setAbierta] = useState<number | null>(null);
  const [tema, setTema] = useState<'Todos' | Tema>('Todos');
  const [q, setQ] = useState('');
  const [aviso, setAviso] = useState('');
  const [tareas, setTareas] = useState(TAREAS);

  useEffect(() => {
    const t = setTimeout(() => {
      setFichas((f) => (f.some((x) => x.id === 99) ? f : [LLEGA, ...f]));
      setAviso('Nueva consulta desde el anuncio de acoso: Carmen D. Ha entrado sola.');
    }, 7000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!aviso) return;
    const t = setTimeout(() => setAviso(''), 5000);
    return () => clearTimeout(t);
  }, [aviso]);

  useEffect(() => {
    if (abierta === null) return;
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setAbierta(null);
    window.addEventListener('keydown', esc);
    return () => window.removeEventListener('keydown', esc);
  }, [abierta]);

  const visibles = useMemo(() => {
    const t = q.trim().toLowerCase();
    return fichas.filter((f) => (tema === 'Todos' || f.tema === tema) && (!t || `${f.nombre} ${f.tema} ${f.origen} ${f.detalle} ${f.nota}`.toLowerCase().includes(t)));
  }, [fichas, tema, q]);

  const ficha = fichas.find((f) => f.id === abierta) || null;
  const urgentes = fichas.filter((f) => f.plazo?.urgente);
  const nuevas = fichas.filter((f) => f.etapa === 'nueva').length;

  function mover(id: number, etapa: Etapa) {
    setFichas((f) => f.map((x) => (x.id === id ? { ...x, etapa } : x)));
    const n = ETAPAS.find((e) => e[0] === etapa)?.[1];
    setAviso(`Movida a "${n}". Así sabremos qué anuncio trae clientes de verdad.`);
  }

  function cambiar(id: number, cambio: Partial<Ficha>) {
    setFichas((f) => f.map((x) => (x.id === id ? { ...x, ...cambio } : x)));
  }

  const demo = () => setAviso('Es una demostración: no se envía nada.');

  return (
    <div className="pn crm">
      <div className="pn-aviso-demo">
        <b>Ejemplo con datos inventados.</b> Así sería tu CRM: las personas, los casos y las cifras de esta página no son reales. Puedes tocarlo todo: abrir fichas, moverlas y apuntar notas.
      </div>

      <header className="pn-cabeza">
        <div>
          <p className="pn-hola">Buenos días, Jesús</p>
          <h1>Tus consultas, en un solo sitio</h1>
          <p className="pn-actualizado">
            <span className="pn-punto" /> Entran solas desde la web, el chat, WhatsApp y el formulario
          </p>
        </div>
        <a className="crm-volver" href="/guia-jesus/panel" target="_blank" rel="noopener">
          Ver también tu panel de control
        </a>
      </header>

      <section className="crm-kpis">
        <div><small>Consultas este mes</small><b>100</b><span>todas registradas, ninguna perdida</span></div>
        <div><small>Nuevas sin llamar</small><b className={nuevas ? 'crm-rojo' : ''}>{nuevas}</b><span>lo ideal: llamar en la primera hora</span></div>
        <div><small>Consultas reservadas</small><b>31</b><span>de 100 consultas</span></div>
        <div><small>Clientes nuevos</small><b>14</b><span>14 % de las consultas</span></div>
        <div className="crm-kpi-plazo"><small>Plazos esta semana</small><b>{urgentes.length}</b><span>el CRM avisa antes de que caduquen</span></div>
      </section>

      {urgentes.length > 0 && (
        <div className="crm-alerta" role="alert">
          <b>Plazo a punto de vencer</b>
          {urgentes.map((f) => (
            <button key={f.id} type="button" onClick={() => setAbierta(f.id)}>
              {f.nombre} · {f.plazo?.texto}
            </button>
          ))}
        </div>
      )}

      <div className="crm-barra">
        <nav className="pn-pestanas" role="tablist" aria-label="Vistas del CRM">
          {([['embudo', 'Embudo'], ['lista', 'Lista'], ['origen', 'De dónde vienen'], ['tareas', 'Tareas de hoy']] as const).map(([v, t]) => (
            <button key={v} role="tab" aria-selected={vista === v} className={vista === v ? 'activo' : ''} onClick={() => setVista(v)}>
              {t}
            </button>
          ))}
        </nav>
        {(vista === 'embudo' || vista === 'lista') && (
          <div className="crm-filtros">
            <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar nombre, tema, origen..." aria-label="Buscar en el CRM" />
            <select value={tema} onChange={(e) => setTema(e.target.value as typeof tema)} aria-label="Filtrar por tema">
              {['Todos', 'Acoso laboral', 'Despido', 'Incapacidad', 'Mujer y trabajo', 'Empresa'].map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      {vista === 'embudo' && (
        <div className="crm-embudo">
          {ETAPAS.map(([e, t, s]) => {
            const col = visibles.filter((f) => f.etapa === e);
            return (
              <section key={e} className={`crm-col crm-col-${e}`}>
                <header>
                  <b>{t}</b> <span>{col.length}</span>
                  <small>{s}</small>
                </header>
                {col.map((f) => (
                  <button key={f.id} type="button" className={`crm-tarjeta${f.id === 99 ? ' crm-llega' : ''}`} onClick={() => setAbierta(f.id)}>
                    <span className="crm-tema" style={{ background: TEMA_COLOR[f.tema] }}>{f.tema}</span>
                    <strong>{f.nombre}</strong>
                    <span className="crm-origen">
                      {f.logo ? <Logo nombre={f.logo} tam={16} /> : null} {f.origen} · {f.hace}
                    </span>
                    {f.plazo && <span className={`crm-plazo${f.plazo.urgente ? ' urgente' : ''}`}>{f.plazo.urgente ? 'Plazo: 5 días hábiles' : 'Plazo vigilado'}</span>}
                    <small>{f.siguiente}</small>
                  </button>
                ))}
                {col.length === 0 && <p className="crm-vacio">Nada por aquí</p>}
              </section>
            );
          })}
        </div>
      )}

      {vista === 'lista' && (
        <div className="pn-caja crm-lista">
          <div className="crm-fila crm-fila-cabeza">
            <span>Persona</span><span>Tema</span><span>De dónde viene</span><span>Etapa</span><span>Siguiente paso</span>
          </div>
          {visibles.map((f) => (
            <button key={f.id} type="button" className="crm-fila" onClick={() => setAbierta(f.id)}>
              <span><b>{f.nombre}</b><small>{f.hace}</small></span>
              <span><i className="crm-punto" style={{ background: TEMA_COLOR[f.tema] }} />{f.tema}</span>
              <span>{f.logo ? <Logo nombre={f.logo} tam={16} /> : null} {f.origen}</span>
              <span>{ETAPAS.find((x) => x[0] === f.etapa)?.[1]}</span>
              <span>{f.siguiente}</span>
            </button>
          ))}
        </div>
      )}

      {vista === 'origen' && (
        <div className="pn-caja">
          <div className="pn-caja-cabeza">
            <h2>Qué canal te trae clientes, no solo consultas</h2>
            <span className="pn-fuente">Últimos 30 días</span>
          </div>
          <div className="crm-origen-tabla">
            <div className="crm-ot crm-ot-cabeza"><span>Canal</span><span>Consultas</span><span>Clientes</span><span>Conversión</span><span>Coste por cliente</span></div>
            {ORIGEN.map(([c, l, con, cli, gasto]) => (
              <div key={c} className="crm-ot">
                <span>{l ? <Logo nombre={l} tam={18} /> : null} {c}</span>
                <span>{con}</span>
                <span><b>{cli}</b></span>
                <span>
                  <i className="crm-mini"><i style={{ width: `${Math.min(100, Math.round((cli / con) * 200))}%` }} /></i> {Math.round((cli / con) * 100)} %
                </span>
                <span>{gasto ? `${Math.round(gasto / cli)} €` : 'Sin coste de anuncios'}</span>
              </div>
            ))}
          </div>
          <p className="crm-lectura">
            <b>Cómo se lee:</b> en este ejemplo, los anuncios traen más consultas, pero Google sin pagar y las recomendaciones traen más clientes por consulta. Sin el CRM solo veríamos quién pregunta; con él sabemos quién contrata, y movemos tu dinero hacia lo que funciona.
          </p>
        </div>
      )}

      {vista === 'tareas' && (
        <div className="pn-caja">
          <div className="pn-caja-cabeza">
            <h2>Lo que toca hoy</h2>
            <span className="pn-fuente">Las crea el CRM solo, según cada ficha</span>
          </div>
          <ul className="crm-tareas">
            {tareas.map(([t, quien, hecha], i) => (
              <li key={t} className={hecha ? 'hecha' : ''}>
                <label>
                  <input type="checkbox" checked={hecha} onChange={() => setTareas((x) => x.map((y, j) => (j === i ? [y[0], y[1], !y[2]] : y)))} />
                  <span>{t}</span>
                </label>
                <small>{quien}</small>
              </li>
            ))}
          </ul>
        </div>
      )}

      <section className="crm-porque">
        <h2>Por qué te lo recomendamos</h2>
        <div className="crm-porque-rejilla">
          <div><b>Ninguna consulta se pierde</b><p>Hoy una llamada perdida o un correo sin contestar es un cliente que se va a otro despacho. Aquí todo entra solo y queda apuntado.</p></div>
          <div><b>Los plazos, vigilados</b><p>En laboral los plazos son cortos: 20 días hábiles para impugnar un despido. El CRM los cuenta sin fines de semana ni festivos y avisa antes. Siempre lo revisa el abogado.</p></div>
          <div><b>Sabes qué anuncio funciona</b><p>Cada ficha sabe de dónde vino: el anuncio, la guía, la red o ChatGPT. Así invertimos en lo que trae clientes de verdad.</p></div>
          <div><b>Los correos salen solos</b><p>Cada consulta recibe su secuencia de correos según su tema y en qué punto está, sin que tu equipo tenga que acordarse. <a href="/guia-jesus/correos" target="_blank" rel="noopener">Ver el ejemplo de los correos</a>.</p></div>
          <div><b>Tu equipo, sin esfuerzo</b><p>Mover una ficha, apuntar una nota, marcar una tarea. Nada más. Funciona en el móvil.</p></div>
          <div><b>Incluido en tu cuota</b><p>Te lo montamos, lo conectamos a la web y lo mantenemos. Si ya usas uno, nos conectamos al tuyo. Cuando alguien contrata, el expediente sigue en tu programa de siempre.</p></div>
        </div>
      </section>

      {aviso && <div className="crm-toast" role="status">{aviso}</div>}

      {ficha && (
        <div className="crm-fondo" onClick={() => setAbierta(null)}>
          <aside className="crm-ficha" role="dialog" aria-modal="true" aria-label={`Ficha de ${ficha.nombre}`} onClick={(e) => e.stopPropagation()}>
            <button type="button" className="crm-cerrar" onClick={() => setAbierta(null)} aria-label="Cerrar">×</button>
            <span className="crm-tema" style={{ background: TEMA_COLOR[ficha.tema] }}>{ficha.tema}</span>
            <h2>{ficha.nombre}</h2>
            <p className="crm-datos">{ficha.telefono} · {ficha.correo}</p>
            <div className="crm-acciones">
              <button type="button" onClick={demo}>Llamar</button>
              <button type="button" onClick={demo}>WhatsApp</button>
              <button type="button" onClick={demo}>Correo</button>
            </div>

            <label className="crm-etapa">
              <span>Etapa</span>
              <select value={ficha.etapa} onChange={(e) => mover(ficha.id, e.target.value as Etapa)}>
                {ETAPAS.map(([e, t]) => (
                  <option key={e} value={e}>{t}</option>
                ))}
              </select>
            </label>

            {ficha.plazo && <div className={`crm-plazo-caja${ficha.plazo.urgente ? ' urgente' : ''}`}><b>Plazo</b> {ficha.plazo.texto}</div>}

            <dl className="crm-dl">
              <dt>De dónde viene</dt>
              <dd>{ficha.logo ? <Logo nombre={ficha.logo} tam={16} /> : null} {ficha.origen} · {ficha.detalle}</dd>
              {ficha.herramienta && (<><dt>Lo que hizo en la web</dt><dd>{ficha.herramienta}</dd></>)}
              <dt>Siguiente paso</dt>
              <dd><b>{ficha.siguiente}</b></dd>
              <dt>Protección de datos</dt>
              <dd>Consentimiento aceptado en el formulario y guardado con la fecha</dd>
            </dl>

            <h3>Su camino</h3>
            <ol className="crm-camino">
              {ficha.pasos.map((p, i) => (
                <li key={i} className={`crm-paso-${p.tipo}`}>
                  <i aria-hidden="true">{ICONO[p.tipo]}</i>
                  <span><small>{p.cuando}</small>{p.que}</span>
                </li>
              ))}
            </ol>

            <h3>Documentos</h3>
            <ul className="crm-docs">
              {ficha.docs.map(([d, ok], i) => (
                <li key={d}>
                  <label>
                    <input type="checkbox" checked={ok} onChange={() => cambiar(ficha.id, { docs: ficha.docs.map((x, j) => (j === i ? [x[0], !x[1]] : x)) })} />
                    {d}
                  </label>
                </li>
              ))}
            </ul>

            <h3>Notas del equipo</h3>
            <textarea value={ficha.nota} onChange={(e) => cambiar(ficha.id, { nota: e.target.value })} placeholder="Escribe aquí lo que te ha contado..." rows={4} />
          </aside>
        </div>
      )}
    </div>
  );
}
