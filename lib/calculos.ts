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
