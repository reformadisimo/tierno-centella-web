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

export function esHabil(f: Date): boolean {
  const dia = f.getUTCDay();
  if (dia === 0 || dia === 6) return false;
  return !INHABILES_FIJOS.includes(aIso(f).slice(5));
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
export function diasHabilesRestantes(hoyIso: string, ultimoIso: string): number {
  const f = aFecha(hoyIso);
  const fin = aFecha(ultimoIso);
  if (f > fin) return -1;
  let n = esHabil(f) ? 1 : 0; // hoy cuenta si es hábil: aún puedes presentar hoy
  while (f < fin) {
    f.setUTCDate(f.getUTCDate() + 1);
    if (esHabil(f)) n += 1;
  }
  return n;
}

// Suma n días hábiles a partir del día siguiente a la fecha dada.
export function sumarHabiles(desdeIso: string, n: number): string {
  const f = aFecha(desdeIso);
  let contados = 0;
  while (contados < n) {
    f.setUTCDate(f.getUTCDate() + 1);
    if (esHabil(f)) contados += 1;
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
  // Mes comercial de 30 días: si te vas el 31, cobras el mes entero.
  const diasMes = Math.min(dia, 30);
  const salarioMes = redondea((salarioMensual * diasMes) / 30);

  const inicioAnio = `${anio}-01-01`;
  const diasAnio = diasEntre(inicioAnio, `${anio}-12-31`);
  const generadas = (d.vacacionesAnuales * diasEntre(inicioAnio, d.baja)) / diasAnio;
  const diasVacaciones = Math.max(0, Math.round((generadas - d.vacacionesDisfrutadas) * 100) / 100);
  const importeVacaciones = redondea((d.salarioAnual / 365) * diasVacaciones);

  let pagaVerano = 0;
  let pagaNavidad = 0;
  if (d.pagas === 14) {
    const paga = d.salarioAnual / 14;
    const primerSemestre = mes <= 6;
    if (d.devengoPagas === 'semestral') {
      // Verano: del 1 de enero al 30 de junio. Navidad: del 1 de julio al 31 de diciembre.
      if (primerSemestre) pagaVerano = paga * (diasEntre(inicioAnio, d.baja) / diasEntre(inicioAnio, `${anio}-06-30`));
      else pagaNavidad = paga * (diasEntre(`${anio}-07-01`, d.baja) / diasEntre(`${anio}-07-01`, `${anio}-12-31`));
    } else {
      // Navidad: del 1 de enero al 31 de diciembre. Verano: del 1 de julio del año anterior al 30 de junio.
      pagaNavidad = paga * (diasEntre(inicioAnio, d.baja) / diasAnio);
      const inicioVerano = primerSemestre ? `${anio - 1}-07-01` : `${anio}-07-01`;
      const finVerano = primerSemestre ? `${anio}-06-30` : `${anio + 1}-06-30`;
      pagaVerano = paga * (diasEntre(inicioVerano, d.baja) / diasEntre(inicioVerano, finVerano));
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
