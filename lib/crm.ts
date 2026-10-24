// CRM del despacho: tipos, plazos en días hábiles, datos de prueba y los dos almacenes
// (el de prueba, que guarda en el navegador, y el real, en Supabase).

import { createClient, type SupabaseClient } from '@supabase/supabase-js';

export type Etapa = 'nueva' | 'contactada' | 'reservada' | 'propuesta' | 'cliente' | 'nosigue';
export type TipoActividad = 'web' | 'llamada' | 'whatsapp' | 'correo' | 'reunion' | 'nota' | 'etapa';
export type TipoPlazo = '' | 'despido' | 'sancion' | 'inss' | 'cantidad' | 'otro';

export type Contacto = {
  id: string;
  creado: string;
  actualizado: string;
  nombre: string;
  telefono: string | null;
  email: string | null;
  tema: string;
  origen: string;
  detalle: string | null;
  etapa: Etapa;
  motivo: string | null;
  fecha_hecho: string | null;
  tipo_plazo: TipoPlazo | null;
  vence: string | null;
  consulta_en: string | null;
  responsable: string | null;
  honorarios: number | null;
  consentimiento: boolean;
  docs: [string, boolean][];
  nota: string | null;
  herramienta: string | null;
  entrada_web: boolean;
};

export type Actividad = { id: string; contacto_id: string; creado: string; tipo: TipoActividad; texto: string; autor: string | null };
export type Tarea = { id: string; contacto_id: string | null; creado: string; texto: string; vence: string | null; hecha: boolean; responsable: string | null };
export type Datos = { contactos: Contacto[]; actividades: Actividad[]; tareas: Tarea[] };

export const ETAPAS: { id: Etapa; nombre: string; ayuda: string }[] = [
  { id: 'nueva', nombre: 'Nuevas', ayuda: 'Sin contactar todavía' },
  { id: 'contactada', nombre: 'Contactadas', ayuda: 'Ya hemos hablado' },
  { id: 'reservada', nombre: 'Consulta reservada', ayuda: 'Con día y hora' },
  { id: 'propuesta', nombre: 'Hoja de encargo', ayuda: 'Enviada, falta la firma' },
  { id: 'cliente', nombre: 'Clientes', ayuda: 'Han contratado' },
  { id: 'nosigue', nombre: 'No siguen', ayuda: 'Y por qué' },
];

export const TEMAS: { id: string; color: string; docs: string[] }[] = [
  { id: 'Despido', color: '#1b6fd1', docs: ['Carta de despido', 'Contrato', 'Últimas nóminas', 'Vida laboral'] },
  { id: 'Acoso laboral', color: '#a8442c', docs: ['Contrato', 'Correos o mensajes', 'Partes médicos', 'Testigos'] },
  { id: 'Incapacidad', color: '#7a4fb3', docs: ['Informes médicos', 'Resolución del INSS', 'Vida laboral', 'Bases de cotización'] },
  { id: 'Mujer y trabajo', color: '#c2477a', docs: ['Contrato', 'Solicitud a la empresa', 'Respuesta de la empresa', 'Libro de familia'] },
  { id: 'Reclamación de cantidad', color: '#b07a00', docs: ['Contrato', 'Nóminas', 'Convenio colectivo', 'Cálculo de lo debido'] },
  { id: 'Empresa', color: '#17602f', docs: ['Plantilla', 'Protocolo actual', 'Convenio colectivo', 'Contacto de RR. HH.'] },
  { id: 'Otro', color: '#5b6875', docs: ['Contrato', 'Nóminas'] },
];

export const ORIGENES = ['Google', 'Google Ads', 'Bing', 'ChatGPT u otra IA', 'Chat de la web', 'Formulario de la web', 'WhatsApp', 'Teléfono', 'Instagram', 'Facebook', 'LinkedIn', 'TikTok', 'YouTube', 'Recomendación', 'Cliente anterior', 'Otro'];

export const LOGO_ORIGEN: Record<string, string> = {
  Google: 'Search Console', 'Google Ads': 'Google Ads', Bing: 'Bing', 'ChatGPT u otra IA': 'ChatGPT', WhatsApp: 'WhatsApp', Instagram: 'Instagram',
  Facebook: 'Facebook', LinkedIn: 'LinkedIn', TikTok: 'TikTok', YouTube: 'YouTube',
};

export const MOTIVOS = ['Busca abogado de oficio', 'Le parece caro', 'Se va a otro despacho', 'No tiene caso', 'No contesta', 'Fuera de plazo', 'Otro'];

export const PLAZOS: { id: TipoPlazo; nombre: string; ayuda: string }[] = [
  { id: '', nombre: 'Sin plazo', ayuda: '' },
  { id: 'despido', nombre: 'Despido: 20 días hábiles', ayuda: 'Desde el día siguiente al despido. Sin sábados, domingos, festivos, agosto ni 24 y 31 de diciembre.' },
  { id: 'sancion', nombre: 'Sanción: 20 días hábiles', ayuda: 'Desde el día siguiente a la comunicación. Mismo cómputo que el despido.' },
  { id: 'inss', nombre: 'Reclamación previa al INSS: 30 días hábiles', ayuda: 'Desde la notificación de la resolución. Sin sábados, domingos ni festivos.' },
  { id: 'cantidad', nombre: 'Reclamación de cantidad: 1 año', ayuda: 'Desde que se pudo reclamar cada cantidad.' },
  { id: 'otro', nombre: 'Otro (fecha a mano)', ayuda: '' },
];

// Festivos de la ciudad de Madrid (nacionales, autonómicos y locales). Revisar cada año con el BOCM.
const FESTIVOS = new Set([
  '2026-01-01', '2026-01-06', '2026-04-02', '2026-04-03', '2026-05-01', '2026-05-02', '2026-05-15', '2026-08-15', '2026-10-12',
  '2026-11-02', '2026-11-09', '2026-12-07', '2026-12-08', '2026-12-25',
  '2027-01-01', '2027-01-06', '2027-03-25', '2027-03-26', '2027-05-01', '2027-05-15', '2027-10-12', '2027-11-01', '2027-11-09',
  '2027-12-06', '2027-12-08', '2027-12-25',
]);

export const iso = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const desdeIso = (s: string) => {
  const [y, m, d] = s.slice(0, 10).split('-').map(Number);
  return new Date(y, m - 1, d);
};

function habil(d: Date, sinAgosto: boolean) {
  const dia = d.getDay();
  if (dia === 0 || dia === 6) return false;
  const s = iso(d);
  if (FESTIVOS.has(s)) return false;
  if (sinAgosto && (d.getMonth() === 7 || s.endsWith('-12-24') || s.endsWith('-12-31'))) return false;
  return true;
}

function sumarHabiles(desde: string, n: number, sinAgosto: boolean) {
  const d = desdeIso(desde);
  let c = 0;
  while (c < n) {
    d.setDate(d.getDate() + 1);
    if (habil(d, sinAgosto)) c++;
  }
  return iso(d);
}

export function calcularVence(tipo: TipoPlazo | null, hecho: string | null): string | null {
  if (!tipo || !hecho || tipo === 'otro') return null;
  if (tipo === 'despido' || tipo === 'sancion') return sumarHabiles(hecho, 20, true);
  if (tipo === 'inss') return sumarHabiles(hecho, 30, false);
  if (tipo === 'cantidad') {
    const d = desdeIso(hecho);
    d.setFullYear(d.getFullYear() + 1);
    return iso(d);
  }
  return null;
}

// Días hábiles que quedan hasta el vencimiento (incluido). Negativo si ya venció.
export function habilesHasta(vence: string, tipo: TipoPlazo | null): number {
  const hoy = desdeIso(iso(new Date()));
  const fin = desdeIso(vence);
  const sinAgosto = tipo === 'despido' || tipo === 'sancion';
  if (tipo === 'cantidad' || tipo === 'otro' || !tipo) return Math.round((fin.getTime() - hoy.getTime()) / 86400000);
  if (fin < hoy) return -1;
  let c = 0;
  const d = new Date(hoy);
  while (d <= fin) {
    if (habil(d, sinAgosto)) c++;
    d.setDate(d.getDate() + 1);
  }
  return c;
}

export const colorTema = (t: string) => TEMAS.find((x) => x.id === t)?.color || '#5b6875';
export const docsTema = (t: string): [string, boolean][] => (TEMAS.find((x) => x.id === t)?.docs || ['Contrato']).map((d) => [d, false]);

// ---------- Almacenes ----------

export type NuevoContacto = Omit<Contacto, 'id' | 'creado' | 'actualizado'>;

export interface Almacen {
  modo: 'prueba' | 'real';
  cargar(): Promise<Datos>;
  crearContacto(c: NuevoContacto): Promise<Contacto>;
  actualizarContacto(id: string, cambio: Partial<Contacto>): Promise<void>;
  borrarContacto(id: string): Promise<void>;
  crearActividad(a: Omit<Actividad, 'id' | 'creado'>): Promise<Actividad>;
  crearTarea(t: Omit<Tarea, 'id' | 'creado'>): Promise<Tarea>;
  actualizarTarea(id: string, cambio: Partial<Tarea>): Promise<void>;
  borrarTarea(id: string): Promise<void>;
}

const uid = () => (typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`);
const ahora = () => new Date().toISOString();

const CLAVE_PRUEBA = 'tc-crm-prueba-v1';

export class AlmacenPrueba implements Almacen {
  modo = 'prueba' as const;
  private d: Datos = { contactos: [], actividades: [], tareas: [] };
  private guardar() {
    try {
      localStorage.setItem(CLAVE_PRUEBA, JSON.stringify(this.d));
    } catch {}
  }
  async cargar() {
    try {
      const s = localStorage.getItem(CLAVE_PRUEBA);
      if (s) this.d = JSON.parse(s);
      else this.d = datosPrueba();
    } catch {
      this.d = datosPrueba();
    }
    this.guardar();
    return structuredClone(this.d);
  }
  restablecer() {
    this.d = datosPrueba();
    this.guardar();
    return structuredClone(this.d);
  }
  async crearContacto(c: NuevoContacto) {
    const n: Contacto = { ...c, id: uid(), creado: ahora(), actualizado: ahora() };
    this.d.contactos.unshift(n);
    this.guardar();
    return n;
  }
  async actualizarContacto(id: string, cambio: Partial<Contacto>) {
    this.d.contactos = this.d.contactos.map((c) => (c.id === id ? { ...c, ...cambio, actualizado: ahora() } : c));
    this.guardar();
  }
  async borrarContacto(id: string) {
    this.d.contactos = this.d.contactos.filter((c) => c.id !== id);
    this.d.actividades = this.d.actividades.filter((a) => a.contacto_id !== id);
    this.d.tareas = this.d.tareas.filter((t) => t.contacto_id !== id);
    this.guardar();
  }
  async crearActividad(a: Omit<Actividad, 'id' | 'creado'>) {
    const n = { ...a, id: uid(), creado: ahora() };
    this.d.actividades.unshift(n);
    this.guardar();
    return n;
  }
  async crearTarea(t: Omit<Tarea, 'id' | 'creado'>) {
    const n = { ...t, id: uid(), creado: ahora() };
    this.d.tareas.push(n);
    this.guardar();
    return n;
  }
  async actualizarTarea(id: string, cambio: Partial<Tarea>) {
    this.d.tareas = this.d.tareas.map((t) => (t.id === id ? { ...t, ...cambio } : t));
    this.guardar();
  }
  async borrarTarea(id: string) {
    this.d.tareas = this.d.tareas.filter((t) => t.id !== id);
    this.guardar();
  }
}

export const SUPABASE_CRM_URL = process.env.NEXT_PUBLIC_CRM_SUPABASE_URL || 'https://qoewziiwiqycvmayyntq.supabase.co';
export const SUPABASE_CRM_CLAVE = process.env.NEXT_PUBLIC_CRM_SUPABASE_CLAVE || 'sb_publishable_A2fkvXIs1mAKuFlVUGYBdw_BsHy-_IC';

let cliente: SupabaseClient | null = null;
export function supabaseCrm() {
  if (!cliente) cliente = createClient(SUPABASE_CRM_URL, SUPABASE_CRM_CLAVE, { auth: { persistSession: true, storageKey: 'tc-crm-sesion' } });
  return cliente;
}

export class AlmacenReal implements Almacen {
  modo = 'real' as const;
  constructor(private sb: SupabaseClient) {}
  private ok<T>(r: { data: T; error: { message: string } | null }): T {
    if (r.error) throw new Error(r.error.message);
    return r.data;
  }
  async cargar() {
    const [c, a, t] = await Promise.all([
      this.sb.from('crm_contactos').select('*').order('creado', { ascending: false }),
      this.sb.from('crm_actividades').select('*').order('creado', { ascending: false }).limit(5000),
      this.sb.from('crm_tareas').select('*').order('vence', { ascending: true, nullsFirst: false }),
    ]);
    return {
      contactos: (this.ok(c) as Contacto[]).map((x) => ({ ...x, honorarios: x.honorarios === null ? null : Number(x.honorarios) })),
      actividades: this.ok(a) as Actividad[],
      tareas: this.ok(t) as Tarea[],
    };
  }
  async crearContacto(c: NuevoContacto) {
    return this.ok(await this.sb.from('crm_contactos').insert(c).select().single()) as Contacto;
  }
  async actualizarContacto(id: string, cambio: Partial<Contacto>) {
    const { id: _i, creado: _c, actualizado: _a, ...resto } = cambio;
    this.ok(await this.sb.from('crm_contactos').update(resto).eq('id', id));
  }
  async borrarContacto(id: string) {
    this.ok(await this.sb.from('crm_contactos').delete().eq('id', id));
  }
  async crearActividad(a: Omit<Actividad, 'id' | 'creado'>) {
    return this.ok(await this.sb.from('crm_actividades').insert(a).select().single()) as Actividad;
  }
  async crearTarea(t: Omit<Tarea, 'id' | 'creado'>) {
    return this.ok(await this.sb.from('crm_tareas').insert(t).select().single()) as Tarea;
  }
  async actualizarTarea(id: string, cambio: Partial<Tarea>) {
    this.ok(await this.sb.from('crm_tareas').update(cambio).eq('id', id));
  }
  async borrarTarea(id: string) {
    this.ok(await this.sb.from('crm_tareas').delete().eq('id', id));
  }
}

// ---------- Datos de prueba (inventados, con fechas relativas a hoy) ----------

function haceDias(n: number, h = 10, m = 0) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  d.setHours(h, m, 0, 0);
  return d.toISOString();
}
function dentroDias(n: number, h = 10, m = 0) {
  return haceDias(-n, h, m);
}
// Fecha del hecho para que al plazo le queden "quedan" días hábiles.
function hechoParaQuedar(quedan: number) {
  const d = desdeIso(iso(new Date()));
  for (let i = 0; i < 60; i++) {
    const v = calcularVence('despido', iso(d));
    if (v && habilesHasta(v, 'despido') <= quedan) return iso(d);
    d.setDate(d.getDate() - 1);
  }
  return iso(d);
}

function datosPrueba(): Datos {
  const contactos: Contacto[] = [];
  const actividades: Actividad[] = [];
  const tareas: Tarea[] = [];
  const base = (c: Partial<Contacto> & { nombre: string; tema: string; origen: string; etapa: Etapa; creado: string }): Contacto => {
    const docs = docsTema(c.tema);
    return {
      id: uid(), actualizado: c.creado, telefono: null, email: null, detalle: null, motivo: null, fecha_hecho: null, tipo_plazo: null, vence: null,
      consulta_en: null, responsable: null, honorarios: null, consentimiento: true, docs, nota: '', herramienta: null, entrada_web: true, ...c,
    } as Contacto;
  };
  const act = (c: Contacto, dias: number, h: number, tipo: TipoActividad, texto: string, autor = 'Equipo') =>
    actividades.push({ id: uid(), contacto_id: c.id, creado: haceDias(dias, h), tipo, texto, autor });
  const tarea = (c: Contacto | null, texto: string, enDias: number, responsable = 'Equipo', hecha = false) => {
    const d = new Date();
    d.setDate(d.getDate() + enDias);
    tareas.push({ id: uid(), contacto_id: c?.id || null, creado: ahora(), texto, vence: iso(d), hecha, responsable });
  };
  const marcar = (c: Contacto, n: number) => (c.docs = c.docs.map(([d], i) => [d, i < n]));

  const h1 = hechoParaQuedar(5);
  const marta = base({
    nombre: 'Marta Ruiz (ejemplo)', telefono: '600 000 214', email: 'marta@ejemplo.es', tema: 'Despido', origen: 'Google Ads', etapa: 'reservada', creado: haceDias(2, 21, 19),
    detalle: 'Anuncio "abogado despido Madrid" · página de despidos', herramienta: 'Calculadora de indemnización: 11.240 € (improcedente)',
    tipo_plazo: 'despido', fecha_hecho: h1, vence: calcularVence('despido', h1), consulta_en: dentroDias(2, 10), responsable: 'Jesús',
    nota: 'Hostelería desde 2019. El despido se lo dijeron por teléfono y la carta llegó después.',
  });
  marcar(marta, 2);
  act(marta, 2, 21, 'web', 'Usó la calculadora de indemnización y dejó sus datos en el formulario', 'Web');
  act(marta, 2, 21, 'correo', 'Correo 1 de la secuencia de despido enviado', 'Resend');
  act(marta, 1, 9, 'llamada', 'Llamada: reserva consulta. Le pedimos carta, contrato, nóminas y vida laboral');
  act(marta, 1, 9, 'whatsapp', 'Confirmación de la consulta por WhatsApp con la lista de documentos');
  tarea(marta, 'Preparar la papeleta de conciliación de Marta', 1, 'Jesús');

  const lucia = base({
    nombre: 'Lucía Gómez (ejemplo)', telefono: '600 000 873', email: 'lucia@ejemplo.es', tema: 'Acoso laboral', origen: 'Google', etapa: 'nueva', creado: haceDias(0, 10, 40),
    detalle: 'Guía "Cómo demostrar el acoso laboral"', herramienta: 'Test de acoso: 7 de 10 señales',
  });
  act(lucia, 0, 10, 'web', 'Hizo el test de acoso y escribió en el formulario: "Mi jefa me grita delante de todos desde hace meses"', 'Web');
  act(lucia, 0, 10, 'correo', 'Correo 1 de la secuencia de acoso enviado', 'Resend');
  tarea(lucia, 'Llamar a Lucía (pidió por la mañana)', 0);

  const javier = base({
    nombre: 'Javier López (ejemplo)', telefono: '600 000 690', email: 'javier@ejemplo.es', tema: 'Despido', origen: 'ChatGPT u otra IA', etapa: 'nueva', creado: haceDias(0, 9, 58),
    detalle: 'ChatGPT le recomendó el despacho', tipo_plazo: 'despido', fecha_hecho: iso(new Date(Date.now() - 4 * 86400000)),
  });
  javier.vence = calcularVence('despido', javier.fecha_hecho);
  act(javier, 0, 9, 'web', 'Llegó desde ChatGPT a la página de despidos y rellenó el formulario', 'Web');
  tarea(javier, 'Llamar a Javier', 0);

  const antonio = base({
    nombre: 'Antonio Pérez (ejemplo)', telefono: '600 000 552', email: 'antonio@ejemplo.es', tema: 'Incapacidad', origen: 'Google Ads', etapa: 'propuesta', creado: haceDias(7, 18),
    detalle: 'Anuncio "abogados incapacidad permanente" · landing', herramienta: 'Calculadora de pensión: 1.184 € al mes (total)', responsable: 'Jesús', honorarios: 1500,
    tipo_plazo: 'inss', fecha_hecho: iso(new Date(Date.now() - 12 * 86400000)), nota: 'Conductor de autobús, lumbalgia crónica. Le preocupa el coste: explicar bien los honorarios.',
  });
  antonio.vence = calcularVence('inss', antonio.fecha_hecho);
  marcar(antonio, 3);
  act(antonio, 7, 18, 'web', 'Calculó su pensión en la landing y escribió por el chat', 'Web');
  act(antonio, 5, 11, 'reunion', 'Consulta con Jesús en el despacho');
  act(antonio, 5, 13, 'correo', 'Enviada la hoja de encargo');
  act(antonio, 3, 9, 'nota', 'Ha abierto la hoja de encargo dos veces, sin firmar');
  tarea(antonio, 'Recordar a Antonio la firma de la hoja de encargo', 1);

  const sara = base({
    nombre: 'Sara Martín (ejemplo)', telefono: '600 000 039', tema: 'Mujer y trabajo', origen: 'Instagram', etapa: 'contactada', creado: haceDias(1, 22, 47),
    detalle: 'Reel sobre la reducción de jornada', herramienta: 'Calendario de permisos', nota: 'Le han denegado la adaptación de jornada.',
  });
  marcar(sara, 1);
  act(sara, 1, 22, 'whatsapp', 'Escribió por WhatsApp desde Instagram');
  act(sara, 0, 9, 'whatsapp', 'Le contestamos y nos manda la respuesta de la empresa');
  tarea(sara, 'Revisar la respuesta de la empresa de Sara', 2);

  const colegio = base({
    nombre: 'Colegio Los Robles (ejemplo)', telefono: '910 000 410', email: 'direccion@ejemplo.es', tema: 'Empresa', origen: 'LinkedIn', etapa: 'propuesta', creado: haceDias(10, 12),
    detalle: 'Publicación de Jesús sobre el protocolo de acoso', responsable: 'Jesús', honorarios: 2400, nota: '120 trabajadores. Quieren la formación antes de Navidad.',
  });
  marcar(colegio, 2);
  act(colegio, 10, 12, 'nota', 'La directora escribió por LinkedIn');
  act(colegio, 8, 10, 'reunion', 'Videollamada con dirección');
  act(colegio, 5, 17, 'correo', 'Presupuesto de protocolo y formación enviado');
  tarea(colegio, 'Llamar al colegio por el presupuesto', 3, 'Jesús');

  const elena = base({
    nombre: 'Elena Vidal (ejemplo)', tema: 'Acoso laboral', origen: 'Google', etapa: 'cliente', creado: haceDias(22, 11), detalle: 'Artículo del blog sobre la baja por ansiedad',
    herramienta: 'Test de acoso: 9 de 10 señales', responsable: 'Jesús', honorarios: 1800,
  });
  marcar(elena, 4);
  act(elena, 22, 11, 'web', 'Leyó el artículo y escribió por el chat', 'Web');
  act(elena, 21, 10, 'reunion', 'Consulta con Jesús');
  act(elena, 18, 12, 'etapa', 'Firmó la hoja de encargo: pasa a Clientes');

  const raul = base({ nombre: 'Raúl Sanz (ejemplo)', tema: 'Incapacidad', origen: 'Bing', etapa: 'cliente', creado: haceDias(15, 9), detalle: 'Búsqueda en Bing', honorarios: 1500, responsable: 'Jesús' });
  marcar(raul, 4);
  act(raul, 15, 9, 'llamada', 'Llamó por teléfono después de ver la web en Bing');
  act(raul, 13, 12, 'etapa', 'Firmó: pasa a Clientes');

  const pablo = base({ nombre: 'Pablo Torres (ejemplo)', tema: 'Despido', origen: 'Google Ads', etapa: 'nosigue', motivo: 'Busca abogado de oficio', creado: haceDias(11, 16), detalle: 'Anuncio de despidos' });
  act(pablo, 11, 16, 'web', 'Formulario desde el anuncio', 'Web');
  act(pablo, 11, 17, 'llamada', 'Busca abogado de oficio. No sigue');

  const nuria = base({
    nombre: 'Nuria Fernández (ejemplo)', telefono: '600 000 482', tema: 'Acoso laboral', origen: 'WhatsApp', etapa: 'contactada', creado: haceDias(3, 20), nota: 'Sigue de baja. No quiere que la empresa se entere todavía.',
  });
  marcar(nuria, 1);
  act(nuria, 3, 20, 'whatsapp', 'Escribió por WhatsApp desde la web');
  act(nuria, 2, 10, 'llamada', 'Lo está pensando. Le mandamos el correo con lo que dicen los jueces');

  const carlos = base({ nombre: 'Carlos Ibáñez (ejemplo)', tema: 'Reclamación de cantidad', origen: 'Recomendación', etapa: 'reservada', creado: haceDias(4, 12), consulta_en: dentroDias(1, 17), detalle: 'Le recomendó una antigua clienta', tipo_plazo: 'cantidad', fecha_hecho: iso(new Date(Date.now() - 200 * 86400000)) });
  carlos.vence = calcularVence('cantidad', carlos.fecha_hecho);
  act(carlos, 4, 12, 'llamada', 'Llamó de parte de una antigua clienta. Le deben tres nóminas');

  const ines = base({ nombre: 'Inés Navarro (ejemplo)', tema: 'Despido', origen: 'Google', etapa: 'cliente', creado: haceDias(26, 10), honorarios: 1200, responsable: 'Jesús' });
  act(ines, 26, 10, 'web', 'Usó la calculadora y escribió', 'Web');
  const ana = base({ nombre: 'Ana Soto (ejemplo)', tema: 'Acoso laboral', origen: 'Google Ads', etapa: 'nosigue', motivo: 'Le parece caro', creado: haceDias(18, 13) });
  act(ana, 18, 13, 'web', 'Formulario desde el anuncio de acoso', 'Web');

  contactos.push(lucia, javier, marta, sara, nuria, carlos, antonio, colegio, elena, raul, ines, pablo, ana);
  tarea(null, 'Revisar el informe semanal de consultas', 4, 'Jesús');
  return { contactos, actividades, tareas };
}
