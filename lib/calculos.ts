// Cálculos orientativos de indemnización por despido y plazo para reclamar.
// Reglas (Estatuto de los Trabajadores y Ley 3/2012):
//  - Despido objetivo procedente: 20 días de salario por año, máximo 12 mensualidades.
//  - Despido improcedente: 33 días por año, máximo 24 mensualidades.
//    Contratos anteriores al 12/02/2012: 45 días por año para el tiempo trabajado hasta el
//    11/02/2012 y 33 días desde entonces. Tope de 720 días, salvo que el tramo anterior a 2012
//    ya supere 720 días: entonces vale ese tramo, con un máximo de 42 mensualidades.
//  - Los periodos inferiores a un año se prorratean por meses; la fracción de mes cuenta entera.
//  - Salario diario = salario bruto anual (con pagas extra) / 365.

export type ResultadoIndemnizacion = {
  meses: number;
  salarioDiario: number;
  diasObjetivo: number;
  importeObjetivo: number;
  diasImprocedente: number;
  importeImprocedente: number;
  aplicaTramo2012: boolean;
};

const REFORMA_2012 = '2012-02-12';

function aFecha(iso: string): Date {
  const [a, m, d] = iso.split('-').map(Number);
  return new Date(Date.UTC(a, m - 1, d));
}

function aIso(f: Date): string {
  return f.toISOString().slice(0, 10);
}

// Meses entre dos fechas, contando como completo el mes empezado.
export function mesesTrabajados(desdeIso: string, hastaIso: string): number {
  const desde = aFecha(desdeIso);
  const hasta = aFecha(hastaIso);
  if (hasta <= desde) return 0;
  let meses = (hasta.getUTCFullYear() - desde.getUTCFullYear()) * 12 + (hasta.getUTCMonth() - desde.getUTCMonth());
  const ancla = new Date(Date.UTC(desde.getUTCFullYear(), desde.getUTCMonth() + meses, desde.getUTCDate()));
  if (ancla > hasta) meses -= 1;
  const tras = new Date(Date.UTC(desde.getUTCFullYear(), desde.getUTCMonth() + meses, desde.getUTCDate()));
  if (tras < hasta) meses += 1;
  return meses;
}

const redondea = (n: number) => Math.round(n * 100) / 100;

export function calcularIndemnizacion(inicioIso: string, despidoIso: string, salarioAnual: number): ResultadoIndemnizacion {
  const meses = mesesTrabajados(inicioIso, despidoIso);
  const salarioDiario = salarioAnual / 365;

  const diasObjetivo = Math.min((20 * meses) / 12, 360);

  let diasImprocedente: number;
  const aplicaTramo2012 = inicioIso < REFORMA_2012;
  if (aplicaTramo2012) {
    const mesesAntes = mesesTrabajados(inicioIso, REFORMA_2012);
    const mesesDespues = despidoIso > REFORMA_2012 ? mesesTrabajados(REFORMA_2012, despidoIso) : 0;
    const dias45 = (45 * mesesAntes) / 12;
    const dias33 = (33 * mesesDespues) / 12;
    diasImprocedente = dias45 > 720 ? Math.min(dias45, 1260) : Math.min(dias45 + dias33, 720);
  } else {
    diasImprocedente = Math.min((33 * meses) / 12, 720);
  }

  return {
    meses,
    salarioDiario: redondea(salarioDiario),
    diasObjetivo: redondea(diasObjetivo),
    importeObjetivo: redondea(diasObjetivo * salarioDiario),
    diasImprocedente: redondea(diasImprocedente),
    importeImprocedente: redondea(diasImprocedente * salarioDiario),
    aplicaTramo2012,
  };
}

// Festivos nacionales de fecha fija, más el 24 y el 31 de diciembre (inhábiles en los juzgados).
// No incluye Semana Santa ni festivos autonómicos o locales: por eso el resultado es aproximado.
// Agosto SÍ es hábil para reclamar un despido (art. 43.4 de la Ley de la Jurisdicción Social).
const INHABILES_FIJOS = ['01-01', '01-06', '05-01', '08-15', '10-12', '11-01', '12-06', '12-08', '12-24', '12-25', '12-31'];

// Viernes Santo: festivo nacional que cambia cada año (dos días antes del domingo de Pascua).
function viernesSanto(anio: number): string {
  const a = anio % 19, b = Math.floor(anio / 100), c = anio % 100, d = Math.floor(b / 4), e = b % 4;
  const f = Math.floor((b + 8) / 25), g = Math.floor((b - f + 1) / 3), h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4), k = c % 4, l = (32 + 2 * e + 2 * i - h - k) % 7, m = Math.floor((a + 11 * h + 22 * l) / 451);
  const mes = Math.floor((h + l - 7 * m + 114) / 31), dia = ((h + l - 7 * m + 114) % 31) + 1;
  const pascua = new Date(Date.UTC(anio, mes - 1, dia));
  pascua.setUTCDate(pascua.getUTCDate() - 2);
  return aIso(pascua);
}

// agostoHabil: true para despidos y extinciones (art. 43.4 LRJS); false para el resto de plazos procesales, como las sanciones.
// madrid: añade los festivos de la Comunidad y de la capital (2 y 15 de mayo, 9 de noviembre, Jueves Santo) y los traslados de 2026 (2 de noviembre y 7 de diciembre).
// Comprobado con el calendario laboral de Madrid de 2026; en otros años es una aproximación.
const MADRID_FIJOS = ['05-02', '05-15', '11-09'];
const MADRID_ESPECIFICOS = ['2026-11-02', '2026-12-07'];
function juevesSanto(anio: number): string {
  const f = aFecha(viernesSanto(anio));
  f.setUTCDate(f.getUTCDate() - 1);
  return aIso(f);
}
export function esHabil(f: Date, agostoHabil = true, madrid = false): boolean {
  const dia = f.getUTCDay();
  if (dia === 0 || dia === 6) return false;
  const iso = aIso(f);
  if (!agostoHabil && iso.slice(5, 7) === '08') return false;
  if (iso === viernesSanto(f.getUTCFullYear())) return false;
  if (madrid && (iso === juevesSanto(f.getUTCFullYear()) || MADRID_FIJOS.includes(iso.slice(5)) || MADRID_ESPECIFICOS.includes(iso))) return false;
  return !INHABILES_FIJOS.includes(iso.slice(5));
}

// Lee un importe escrito a la española ("28.000,50") o con punto decimal ("28000.50").
export function leerImporte(texto: string): number {
  const t = texto.trim().replace(/[€\s]/g, '');
  if (!t) return NaN;
  if (/^\d+\.\d{1,2}$/.test(t)) return Number(t);
  if (/^\d{1,3}(,\d{3})+(\.\d{1,2})?$/.test(t)) return Number(t.replace(/,/g, ''));
  return Number(t.replace(/\./g, '').replace(',', '.'));
}

// Último día para presentar la papeleta de conciliación: 20 días hábiles desde el día siguiente al despido.
export function ultimoDiaParaReclamar(despidoIso: string): string {
  const f = aFecha(despidoIso);
  let contados = 0;
  while (contados < 20) {
    f.setUTCDate(f.getUTCDate() + 1);
    if (esHabil(f)) contados += 1;
  }
  return aIso(f);
}

// Días hábiles que quedan desde hoy (sin contar hoy) hasta el último día, incluido.
export function diasHabilesRestantes(hoyIso: string, ultimoIso: string, agostoHabil = true, madrid = false): number {
  const f = aFecha(hoyIso);
  const fin = aFecha(ultimoIso);
  if (f > fin) return -1;
  let n = esHabil(f, agostoHabil, madrid) ? 1 : 0; // hoy cuenta si es hábil: aún puedes presentar hoy
  while (f < fin) {
    f.setUTCDate(f.getUTCDate() + 1);
    if (esHabil(f, agostoHabil, madrid)) n += 1;
  }
  return n;
}

// Suma n días hábiles a partir del día siguiente a la fecha dada.
export function sumarHabiles(desdeIso: string, n: number, agostoHabil = true, madrid = false): string {
  const f = aFecha(desdeIso);
  let contados = 0;
  while (contados < n) {
    f.setUTCDate(f.getUTCDate() + 1);
    if (esHabil(f, agostoHabil, madrid)) contados += 1;
  }
  return aIso(f);
}

// Mismo día del año siguiente (o del mes siguiente si se pide), para plazos de prescripción.
export function sumarAnios(desdeIso: string, anios: number): string {
  const f = aFecha(desdeIso);
  f.setUTCFullYear(f.getUTCFullYear() + anios);
  return aIso(f);
}

// ---------- Calendario de permisos por nacimiento ----------

export function sumarDias(desdeIso: string, dias: number): string {
  const f = aFecha(desdeIso);
  f.setUTCDate(f.getUTCDate() + dias);
  return aIso(f);
}

export function sumarMeses(desdeIso: string, meses: number): string {
  const f = aFecha(desdeIso);
  const dia = f.getUTCDate();
  f.setUTCDate(1);
  f.setUTCMonth(f.getUTCMonth() + meses);
  // Si el mes de destino no tiene ese día (31 de abril), se queda en el último día del mes.
  const ultimo = new Date(Date.UTC(f.getUTCFullYear(), f.getUTCMonth() + 1, 0)).getUTCDate();
  f.setUTCDate(Math.min(dia, ultimo));
  return aIso(f);
}

export type CalendarioNacimiento = {
  finObligatorias: string; // último día de las 6 semanas obligatorias
  limiteFlexibles: string; // último día para disfrutar las 11 semanas flexibles
  finLactancia: string; // último día del permiso de lactancia (9 meses)
  finLactanciaAmpliada: string; // si ambos progenitores la disfrutan igual (12 meses)
  finProteccionDespido: string; // fin de los 12 meses de protección frente al despido tras el nacimiento
  limiteDosSemanasYParental: string; // último día para las 2 semanas retribuidas y el permiso parental (8 años)
  limiteReduccionJornada: string; // último día con hijo menor de 12 años
};

// "Hasta que cumpla N" significa hasta la víspera del cumpleaños.
export function calendarioNacimiento(nacimientoIso: string): CalendarioNacimiento {
  return {
    finObligatorias: sumarDias(nacimientoIso, 6 * 7 - 1),
    limiteFlexibles: sumarDias(sumarMeses(nacimientoIso, 12), -1),
    finLactancia: sumarDias(sumarMeses(nacimientoIso, 9), -1),
    finLactanciaAmpliada: sumarDias(sumarMeses(nacimientoIso, 12), -1),
    finProteccionDespido: sumarMeses(nacimientoIso, 12),
    limiteDosSemanasYParental: sumarDias(sumarAnios(nacimientoIso, 8), -1),
    limiteReduccionJornada: sumarDias(sumarAnios(nacimientoIso, 12), -1),
  };
}

// ---------- Finiquito ----------

function diasEntre(desdeIso: string, hastaIso: string): number {
  return Math.round((aFecha(hastaIso).getTime() - aFecha(desdeIso).getTime()) / 86400000) + 1; // ambos incluidos
}

export type DatosFiniquito = {
  baja: string; // último día trabajado
  salarioAnual: number; // bruto anual con pagas
  pagas: 12 | 14; // 12 = pagas extra prorrateadas en nómina
  devengoPagas: 'semestral' | 'anual';
  vacacionesAnuales: number; // días naturales al año (30 por ley)
  vacacionesDisfrutadas: number; // días naturales disfrutados este año
  alta?: string; // fecha de entrada en la empresa, si fue este año o el anterior
};

export type ResultadoFiniquito = {
  diasMes: number;
  salarioMes: number;
  diasVacaciones: number;
  importeVacaciones: number;
  pagaVerano: number;
  pagaNavidad: number;
  total: number;
};

export function calcularFiniquito(d: DatosFiniquito): ResultadoFiniquito {
  const [anio, mes, dia] = d.baja.split('-').map(Number);
  const salarioMensual = d.salarioAnual / d.pagas;
  // Mes comercial de 30 días: si te vas el último día del mes (31, o 28 de febrero), cobras el mes entero.
  const ultimoDelMes = new Date(Date.UTC(anio, mes, 0)).getUTCDate();
  let diasMes = dia >= ultimoDelMes ? 30 : Math.min(dia, 30);
  // Si entraste ese mismo mes, solo cuentan los días desde la entrada.
  if (d.alta && d.alta.slice(0, 7) === d.baja.slice(0, 7)) diasMes = Math.min(diasMes, dia - Number(d.alta.slice(8, 10)) + 1);
  const salarioMes = redondea((salarioMensual * diasMes) / 30);

  const inicioAnio = `${anio}-01-01`;
  const desde = (inicio: string) => (d.alta && d.alta > inicio ? d.alta : inicio);
  const diasAnio = diasEntre(inicioAnio, `${anio}-12-31`);
  const generadas = (d.vacacionesAnuales * diasEntre(desde(inicioAnio), d.baja)) / diasAnio;
  const diasVacaciones = Math.max(0, Math.round((generadas - d.vacacionesDisfrutadas) * 100) / 100);
  // 30 días naturales equivalen a 22 laborables: si el convenio cuenta en laborables, cada día vale más.
  const valorDia = d.vacacionesAnuales <= 25 ? (d.salarioAnual / 365) * (30 / 22) : d.salarioAnual / 365;
  const importeVacaciones = redondea(valorDia * diasVacaciones);

  let pagaVerano = 0;
  let pagaNavidad = 0;
  if (d.pagas === 14) {
    const paga = d.salarioAnual / 14;
    const primerSemestre = mes <= 6;
    if (d.devengoPagas === 'semestral') {
      // Verano: del 1 de enero al 30 de junio. Navidad: del 1 de julio al 31 de diciembre.
      if (primerSemestre) pagaVerano = paga * (diasEntre(desde(inicioAnio), d.baja) / diasEntre(inicioAnio, `${anio}-06-30`));
      else pagaNavidad = paga * (diasEntre(desde(`${anio}-07-01`), d.baja) / diasEntre(`${anio}-07-01`, `${anio}-12-31`));
    } else {
      // Navidad: del 1 de enero al 31 de diciembre. Verano: del 1 de julio del año anterior al 30 de junio.
      pagaNavidad = paga * (diasEntre(desde(inicioAnio), d.baja) / diasAnio);
      const inicioVerano = primerSemestre ? `${anio - 1}-07-01` : `${anio}-07-01`;
      const finVerano = primerSemestre ? `${anio}-06-30` : `${anio + 1}-06-30`;
      pagaVerano = paga * (diasEntre(desde(inicioVerano), d.baja) / diasEntre(inicioVerano, finVerano));
    }
  }
  pagaVerano = redondea(pagaVerano);
  pagaNavidad = redondea(pagaNavidad);
  return {
    diasMes,
    salarioMes,
    diasVacaciones,
    importeVacaciones,
    pagaVerano,
    pagaNavidad,
    total: redondea(salarioMes + importeVacaciones + pagaVerano + pagaNavidad),
  };
}

// ---------- Prestación por desempleo (paro) ----------
// Cifras de 2026: IPREM mensual de 600 euros; los topes se calculan sobre el IPREM incrementado en una sexta parte (700 euros).
export const IPREM_2026 = 600;
const IPREM_TOPES = (IPREM_2026 * 7) / 6;
export const TOPES_PARO = {
  minimo: [0.8, 1.07, 1.07].map((p) => Math.round(IPREM_TOPES * p)), // sin hijos, 1 hijo, 2 o más
  maximo: [1.75, 2, 2.25].map((p) => Math.round(IPREM_TOPES * p)),
};

const TABLA_DURACION: [number, number][] = [
  [2160, 720],
  [1980, 660],
  [1800, 600],
  [1620, 540],
  [1440, 480],
  [1260, 420],
  [1080, 360],
  [900, 300],
  [720, 240],
  [540, 180],
  [360, 120],
];

export function duracionParo(diasCotizados: number): number {
  return TABLA_DURACION.find(([min]) => diasCotizados >= min)?.[1] ?? 0;
}

export type ResultadoParo = {
  baseDiaria: number;
  dias: number;
  mensualPrimeros6: number;
  mensualDespues: number;
  topeAplicado: 'minimo' | 'maximo' | null;
  totalBruto: number;
};

// baseMensual: base de cotización media de los últimos 180 días (si no la sabes, salario bruto anual / 12).
// parcial: porcentaje de jornada (100 = completa); los topes se reducen en la misma proporción.
export function calcularParo(baseMensual: number, hijos: 0 | 1 | 2, diasCotizados: number, parcial = 100): ResultadoParo {
  const baseDiaria = baseMensual / 30;
  const dias = duracionParo(diasCotizados);
  const min = (TOPES_PARO.minimo[hijos] * parcial) / 100;
  const max = (TOPES_PARO.maximo[hijos] * parcial) / 100;
  let topeAplicado: ResultadoParo['topeAplicado'] = null;
  const ajusta = (n: number) => {
    if (n > max) {
      topeAplicado = 'maximo';
      return max;
    }
    if (n < min) {
      topeAplicado = topeAplicado ?? 'minimo';
      return min;
    }
    return n;
  };
  const mensualPrimeros6 = redondea(ajusta(baseDiaria * 30 * 0.7));
  const mensualDespues = redondea(ajusta(baseDiaria * 30 * 0.6));
  const diasPrimeros = Math.min(dias, 180);
  const diasResto = Math.max(0, dias - 180);
  const totalBruto = redondea((mensualPrimeros6 / 30) * diasPrimeros + (mensualDespues / 30) * diasResto);
  return { baseDiaria: redondea(baseDiaria), dias, mensualPrimeros6, mensualDespues, topeAplicado, totalBruto };
}

// ---------- Reducción de jornada por cuidado ----------
export type ResultadoReduccion = {
  porcentaje: number; // reducción en %
  valida: boolean; // entre un octavo y la mitad
  salarioAnual: number;
  salarioMensual12: number;
  horasDiarias: number;
};

export function calcularReduccion(salarioAnual: number, horasActuales: number, horasNuevas: number, diasSemana = 5): ResultadoReduccion {
  const fraccion = 1 - horasNuevas / horasActuales;
  const porcentaje = Math.round(fraccion * 10000) / 100;
  const valida = fraccion >= 0.125 - 1e-9 && fraccion <= 0.5 + 1e-9;
  const nuevo = redondea(salarioAnual * (horasNuevas / horasActuales));
  return { porcentaje, valida, salarioAnual: nuevo, salarioMensual12: redondea(nuevo / 12), horasDiarias: Math.round((horasNuevas / diasSemana) * 100) / 100 };
}

// ---------- Baja médica (incapacidad temporal) ----------
// Cifras de 2026. Base reguladora diaria = base de cotización del mes anterior / 30; aquí, salario bruto anual / 12 / 30,
// con el tope de la base máxima de cotización de 2026 (5.101,20 euros al mes, Orden PJC/297/2026).
// Enfermedad común o accidente no laboral: días 1 a 3 sin prestación (salvo convenio), del 4 al 20 el 60 %, desde el 21 el 75 %.
//   Paga la empresa del día 4 al 15; desde el 16, el INSS o la mutua (normalmente la empresa lo adelanta en la nómina).
// Accidente de trabajo o enfermedad profesional: el día de la baja, salario completo a cargo de la empresa; desde el día siguiente, el 75 %.
export const BASE_MAXIMA_2026 = 5101.2;
export type TipoBaja = 'comun' | 'no-laboral' | 'trabajo';
export type TramoBaja = { desde: number; hasta: number; porcentaje: number; diario: number; importe: number; paga: string };
export type ResultadoBaja = {
  baseDiaria: number;
  topeAplicado: boolean;
  tramos: TramoBaja[];
  total: number;
  mesCompleto75: number; // un mes de 30 días al 75 %
  totalSiTrabajo: number; // lo mismo si fuera accidente de trabajo (para comparar)
};

function tramosBaja(tipo: TipoBaja, dias: number, baseDiaria: number): TramoBaja[] {
  const plan: [number, number, number, string][] =
    tipo === 'trabajo'
      ? [
          [1, 1, 100, 'La empresa (es tu salario de ese día)'],
          [2, Infinity, 75, 'La mutua o el INSS (normalmente te lo adelanta la empresa en la nómina)'],
        ]
      : [
          [1, 3, 0, 'Nadie, salvo que tu convenio lo pague'],
          [4, 15, 60, 'La empresa'],
          [16, 20, 60, 'El INSS o la mutua (normalmente te lo adelanta la empresa en la nómina)'],
          [21, Infinity, 75, 'El INSS o la mutua (normalmente te lo adelanta la empresa en la nómina)'],
        ];
  return plan
    .filter(([desde]) => desde <= dias)
    .map(([desde, hasta, porcentaje, paga]) => {
      const fin = Math.min(hasta, dias);
      const diario = redondea((baseDiaria * porcentaje) / 100);
      return { desde, hasta: fin, porcentaje, diario, importe: redondea(diario * (fin - desde + 1)), paga };
    });
}

export function calcularBaja(tipo: TipoBaja, salarioAnual: number, dias: number): ResultadoBaja {
  const mensual = salarioAnual / 12;
  const topeAplicado = mensual > BASE_MAXIMA_2026;
  const baseDiaria = Math.min(mensual, BASE_MAXIMA_2026) / 30;
  const tramos = tramosBaja(tipo, dias, baseDiaria);
  const total = redondea(tramos.reduce((s, t) => s + t.importe, 0));
  const totalSiTrabajo = redondea(tramosBaja('trabajo', dias, baseDiaria).reduce((s, t) => s + t.importe, 0));
  return { baseDiaria: redondea(baseDiaria), topeAplicado, tramos, total, mesCompleto75: redondea(baseDiaria * 0.75 * 30), totalSiTrabajo };
}

// ---------- FOGASA ----------
// Art. 33 del Estatuto de los Trabajadores. Salario mínimo de 2026: 1.221 euros en 14 pagas (17.094 al año, Real Decreto 126/2026).
// Tope diario: el doble del salario mínimo diario con la parte de las pagas extra (17.094 x 2 / 365, unos 93,67 euros).
// Salarios: como mucho 120 días a ese tope. Indemnizaciones: como mucho una anualidad (365 días a ese tope);
// en despido (improcedente) y en la extinción del art. 50 se calcula a 30 días por año; en el objetivo, sobre lo reconocido (20 días por año).
export const SMI_ANUAL_2026 = 17094;
export const TOPE_DIARIO_FOGASA = (SMI_ANUAL_2026 * 2) / 365;
export type TipoIndemnizacionFogasa = 'ninguna' | 'objetivo' | 'improcedente';
export type ResultadoFogasa = {
  salarioDiario: number;
  salarioDiarioComputado: number;
  topeDiarioAplicado: boolean;
  salariosDebidos: number;
  salariosFogasa: number;
  diasSalarioComputados: number;
  indemnizacionDebida: number;
  indemnizacionFogasa: number;
  diasIndemnizacion: number;
  total: number;
  resto: number; // lo que el FOGASA no cubre y se sigue reclamando a la empresa
};

export function calcularFogasa(d: {
  salarioAnual: number;
  salariosDebidos: number;
  diasSalarios: number;
  tipo: TipoIndemnizacionFogasa;
  alta?: string;
  despido?: string;
  indemnizacionReconocida?: number; // si la sentencia o el acta dicen una cifra concreta
}): ResultadoFogasa {
  const salarioDiario = d.salarioAnual / 365;
  const computado = Math.min(salarioDiario, TOPE_DIARIO_FOGASA);
  const diasSalarioComputados = Math.min(Math.max(d.diasSalarios, 0), 120);
  const salariosFogasa = redondea(Math.min(d.salariosDebidos, diasSalarioComputados * computado));

  let indemnizacionDebida = 0;
  let indemnizacionFogasa = 0;
  let diasIndemnizacion = 0;
  if (d.tipo !== 'ninguna' && d.alta && d.despido) {
    const legal = calcularIndemnizacion(d.alta, d.despido, d.salarioAnual);
    const meses = mesesTrabajados(d.alta, d.despido);
    indemnizacionDebida = d.indemnizacionReconocida && d.indemnizacionReconocida > 0 ? d.indemnizacionReconocida : d.tipo === 'objetivo' ? legal.importeObjetivo : legal.importeImprocedente;
    diasIndemnizacion = Math.min(d.tipo === 'objetivo' ? legal.diasObjetivo : (30 * meses) / 12, 365);
    indemnizacionFogasa = redondea(Math.min(indemnizacionDebida, diasIndemnizacion * computado));
  }
  const total = redondea(salariosFogasa + indemnizacionFogasa);
  return {
    salarioDiario: redondea(salarioDiario),
    salarioDiarioComputado: redondea(computado),
    topeDiarioAplicado: salarioDiario > TOPE_DIARIO_FOGASA,
    salariosDebidos: redondea(d.salariosDebidos),
    salariosFogasa,
    diasSalarioComputados,
    indemnizacionDebida: redondea(indemnizacionDebida),
    indemnizacionFogasa,
    diasIndemnizacion: Math.round(diasIndemnizacion * 100) / 100,
    total,
    resto: redondea(Math.max(0, d.salariosDebidos + indemnizacionDebida - total)),
  };
}

// ---------- Salarios impagados con intereses ----------
// Art. 29.3 del Estatuto: lo que se debe de salario genera un 10 % de interés al año por mora.
// Art. 59.2: cada mes se puede reclamar durante un año desde que debió cobrarse (aquí, el último día de ese mes).
export type MesImpagado = { mes: string; importe: number }; // mes en formato AAAA-MM
export type LineaImpagado = { mes: string; importe: number; vence: string; dias: number; interes: number; limite: string; caducado: boolean };
export type ResultadoImpagados = { lineas: LineaImpagado[]; principal: number; intereses: number; total: number; caducadoImporte: number; proximoLimite: string | null };

export function calcularImpagados(meses: MesImpagado[], hoyIso: string): ResultadoImpagados {
  const hoy = aFecha(hoyIso);
  const lineas = meses
    .filter((m) => /^\d{4}-\d{2}$/.test(m.mes) && m.importe > 0)
    .sort((a, b) => a.mes.localeCompare(b.mes))
    .map((m) => {
      const [a, mm] = m.mes.split('-').map(Number);
      const vence = new Date(Date.UTC(a, mm, 0)); // último día del mes
      const dias = Math.max(0, Math.round((hoy.getTime() - vence.getTime()) / 86400000));
      const limite = sumarAnios(aIso(vence), 1);
      return { mes: m.mes, importe: redondea(m.importe), vence: aIso(vence), dias, interes: redondea((m.importe * 0.1 * dias) / 365), limite, caducado: limite < hoyIso };
    });
  const vivas = lineas.filter((l) => !l.caducado);
  const principal = redondea(vivas.reduce((s, l) => s + l.importe, 0));
  const intereses = redondea(vivas.reduce((s, l) => s + l.interes, 0));
  const futuras = vivas.map((l) => l.limite).sort();
  return {
    lineas,
    principal,
    intereses,
    total: redondea(principal + intereses),
    caducadoImporte: redondea(lineas.filter((l) => l.caducado).reduce((s, l) => s + l.importe, 0)),
    proximoLimite: futuras[0] ?? null,
  };
}

// ---------- Pensión de incapacidad permanente ----------
// Arts. 196 y 197 LGSS y disposición transitoria novena (escala 2023-2026). Cifras de 2026: pensión máxima 3.359,60 euros
// en 14 pagas; base mínima de cotización 1.424,50 euros al mes (para el complemento de gran incapacidad).
// Simplificación declarada: suponemos que tu base de cotización ha sido parecida en los últimos 8 años y no aplicamos
// la actualización por IPC ni las lagunas; por eso el resultado es orientativo.
export const PENSION_MAXIMA_2026 = 3359.6;
export const BASE_MINIMA_2026 = 1424.5;
export type GradoIP = 'parcial' | 'total' | 'absoluta' | 'gran';
export type OrigenIP = 'comun' | 'no-laboral' | 'trabajo';
export type ResultadoPensionIP = {
  baseReguladora: number;
  porcentajeAnios: number; // 100 si no se aplica la escala
  aniosComputados: number;
  edadJubilacion: number;
  porcentajeGrado: number;
  pagas: 12 | 14;
  porPaga: number;
  anual: number;
  complementoGran: number;
  pagoUnico: number; // solo parcial
  topeAplicado: boolean;
};

/** Porcentaje de la base reguladora según los años cotizados (escala de 2023 a 2026). */
export function porcentajePorAnios(anios: number): number {
  if (anios < 15) return 50;
  const m = Math.floor((anios - 15) * 12 + 1e-9);
  return Math.min(100, Math.round((50 + Math.min(m, 49) * 0.21 + Math.min(Math.max(m - 49, 0), 209) * 0.19) * 100) / 100);
}

export function calcularPensionIP(d: { grado: GradoIP; origen: OrigenIP; salarioAnual: number; edad: number; aniosCotizados: number; cualificada: boolean }): ResultadoPensionIP {
  const baseMes = Math.min(d.salarioAnual / 12, BASE_MAXIMA_2026);
  // Edad de jubilación en 2026: 65 años con 38 años y 3 meses cotizados; si no, 66 años y 10 meses.
  const aniosA65 = d.aniosCotizados + Math.max(0, 65 - d.edad);
  const edadJubilacion = aniosA65 >= 38.25 ? 65 : 66 + 10 / 12;
  let baseReguladora: number;
  let porcentajeAnios = 100;
  let aniosComputados = d.aniosCotizados;
  let pagas: 12 | 14 = 14;
  if (d.origen === 'comun') {
    baseReguladora = (baseMes * 96) / 112; // bases de 96 meses entre 112
    aniosComputados = d.aniosCotizados + Math.max(0, edadJubilacion - d.edad);
    porcentajeAnios = porcentajePorAnios(aniosComputados);
    baseReguladora = (baseReguladora * porcentajeAnios) / 100;
  } else if (d.origen === 'no-laboral') {
    baseReguladora = (baseMes * 24) / 28; // 24 meses elegidos de los últimos 7 años, entre 28
  } else {
    baseReguladora = d.salarioAnual / 12; // salario real del último año, repartido en 12
    pagas = 12;
  }
  const porcentajeGrado = d.grado === 'total' ? (d.cualificada && d.edad >= 55 ? 75 : 55) : d.grado === 'parcial' ? 0 : 100;
  let porPaga = (baseReguladora * porcentajeGrado) / 100;
  // En accidente de trabajo la pensión anual se reparte en 12 pagas (BR x 12 x %)
  const tope = pagas === 14 ? PENSION_MAXIMA_2026 : (PENSION_MAXIMA_2026 * 14) / 12;
  const topeAplicado = porPaga > tope;
  porPaga = Math.min(porPaga, tope);
  let complementoGran = 0;
  if (d.grado === 'gran') complementoGran = Math.max(0.45 * BASE_MINIMA_2026 + 0.3 * baseMes, 0.45 * porPaga);
  const pagoUnico = d.grado === 'parcial' ? 24 * (d.origen === 'trabajo' ? d.salarioAnual / 12 : baseMes) : 0;
  return {
    baseReguladora: redondea(baseReguladora),
    porcentajeAnios,
    aniosComputados: Math.round(aniosComputados * 10) / 10,
    edadJubilacion,
    porcentajeGrado,
    pagas,
    porPaga: redondea(porPaga),
    anual: redondea(porPaga * pagas + complementoGran * pagas),
    complementoGran: redondea(complementoGran),
    pagoUnico: redondea(pagoUnico),
    topeAplicado,
  };
}
