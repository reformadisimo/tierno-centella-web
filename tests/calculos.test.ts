// Casos calculados a mano antes de escribir el código. Ejecutar: npm test
import { calcularIndemnizacion, ultimoDiaParaReclamar, diasHabilesRestantes, mesesTrabajados, sumarHabiles, sumarAnios, sumarDias, sumarMeses, calendarioNacimiento, calcularFiniquito, calcularParo, duracionParo, TOPES_PARO } from '../lib/calculos.ts';

let fallos = 0;
function igual(nombre: string, real: unknown, esperado: unknown) {
  const ok = real === esperado;
  if (!ok) fallos += 1;
  console.log(`${ok ? 'ok   ' : 'FALLO'} ${nombre}: ${real}${ok ? '' : ` (esperado ${esperado})`}`);
}

// Caso 1: contrato posterior a 2012. 1/3/2018 a 15/10/2026 = 8 años, 7 meses y 14 días -> 104 meses.
// Salario diario 30.000 / 365 = 82,19. Objetivo 20 x 104/12 = 173,33 días. Improcedente 33 x 104/12 = 286 días.
const c1 = calcularIndemnizacion('2018-03-01', '2026-10-15', 30000);
igual('c1 meses', c1.meses, 104);
igual('c1 dias objetivo', c1.diasObjetivo, 173.33);
igual('c1 importe objetivo', c1.importeObjetivo, 14246.58);
igual('c1 dias improcedente', c1.diasImprocedente, 286);
igual('c1 importe improcedente', c1.importeImprocedente, 23506.85);

// Caso 2: contrato anterior a 2012, salario diario 100. Antes de la reforma 81 meses (303,75 días a 45);
// después 177 meses (486,75 días a 33). Suma 790,5 -> tope 720 días = 72.000. Objetivo 257 meses -> tope 360 días.
const c2 = calcularIndemnizacion('2005-06-01', '2026-10-15', 36500);
igual('c2 tramo 2012', c2.aplicaTramo2012, true);
igual('c2 dias improcedente', c2.diasImprocedente, 720);
igual('c2 importe improcedente', c2.importeImprocedente, 72000);
igual('c2 dias objetivo', c2.diasObjetivo, 360);
igual('c2 meses antes de 2012', mesesTrabajados('2005-06-01', '2012-02-12'), 81);

// Caso 3: el tramo anterior a 2012 ya supera 720 días: 266 meses a 45 = 997,5 días, por debajo de 1.260.
const c3 = calcularIndemnizacion('1990-01-01', '2026-01-10', 36500);
igual('c3 dias improcedente', c3.diasImprocedente, 997.5);
igual('c3 importe improcedente', c3.importeImprocedente, 99750);

// Plazo: despido el viernes 23/10/2026 -> 20 hábiles desde el lunes 26 -> viernes 20/11/2026 (el 1/11 es domingo).
igual('plazo octubre', ultimoDiaParaReclamar('2026-10-23'), '2026-11-20');
// Despido el martes 15/12/2026, saltando 24, 25 y 31/12, 1 y 6/1 -> martes 19/1/2027.
igual('plazo navidad', ultimoDiaParaReclamar('2026-12-15'), '2027-01-19');
// El lunes 26/10, primer día del plazo, quedan los 20 hábiles enteros: ese mismo día ya cuenta.
igual('restantes el lunes 26/10', diasHabilesRestantes('2026-10-26', '2026-11-20'), 20);
igual('restantes tras el plazo', diasHabilesRestantes('2026-11-21', '2026-11-20'), -1);

// 30 hábiles desde el lunes 2/11/2026: del 3/11 al 30/11 son 20; 1-4/12 y 7/12 suman 25; el 8/12 es festivo; 9, 10, 11, 14 y 15/12 -> 30.
igual('30 habiles incapacidad', sumarHabiles('2026-11-02', 30), '2026-12-15');
igual('20 habiles = ultimo dia despido', sumarHabiles('2026-10-23', 20), ultimoDiaParaReclamar('2026-10-23'));
igual('un año', sumarAnios('2026-03-15', 1), '2027-03-15');


// Calendario de permisos: nacimiento el 15 de marzo de 2026 (contado a mano).
{
  const c = calendarioNacimiento('2026-03-15');
  // 6 semanas = 42 días: del 15/03 (día 1) al 25/04 (día 42).
  igual('fin 6 semanas obligatorias', c.finObligatorias, '2026-04-25');
  igual('víspera de cumplir 12 meses', c.limiteFlexibles, '2027-03-14');
  igual('víspera de cumplir 9 meses', c.finLactancia, '2026-12-14');
  igual('lactancia ampliada', c.finLactanciaAmpliada, '2027-03-14');
  igual('12 meses de protección', c.finProteccionDespido, '2027-03-15');
  igual('víspera de cumplir 8 años', c.limiteDosSemanasYParental, '2034-03-14');
  igual('víspera de cumplir 12 años', c.limiteReduccionJornada, '2038-03-14');
}
igual('fin de mes sin día 31', sumarMeses('2026-05-31', 9), '2027-02-28');
igual('sumar días cruzando el año', sumarDias('2026-12-25', 10), '2027-01-04');

// Finiquito A (a mano): baja 15/10/2026, 28.000 en 14 pagas semestrales, 30 días de vacaciones, 15 disfrutados.
// Mes: 2.000 x 15/30 = 1.000. Vacaciones: 30 x 288/365 - 15 = 8,67 días x 28.000/365 = 665,10.
// Navidad: 2.000 x 107/184 = 1.163,04. Total 2.828,14.
{
  const f = calcularFiniquito({ baja: '2026-10-15', salarioAnual: 28000, pagas: 14, devengoPagas: 'semestral', vacacionesAnuales: 30, vacacionesDisfrutadas: 15 });
  igual('finiquito A mes', f.salarioMes, 1000);
  igual('finiquito A días vacaciones', f.diasVacaciones, 8.67);
  igual('finiquito A vacaciones', f.importeVacaciones, 665.1);
  igual('finiquito A navidad', f.pagaNavidad, 1163.04);
  igual('finiquito A verano', f.pagaVerano, 0);
  igual('finiquito A total', f.total, 2828.14);
}
// Finiquito B: baja 31/03/2026, 21.000 en 14 pagas de devengo anual, sin vacaciones disfrutadas.
// Mes completo 1.500. Vacaciones 30 x 90/365 = 7,40 días = 425,75. Navidad 1.500 x 90/365 = 369,86.
// Verano (1/7/2025 a 30/6/2026): 1.500 x 274/365 = 1.126,03. Total 3.421,64.
{
  const f = calcularFiniquito({ baja: '2026-03-31', salarioAnual: 21000, pagas: 14, devengoPagas: 'anual', vacacionesAnuales: 30, vacacionesDisfrutadas: 0 });
  igual('finiquito B mes', f.salarioMes, 1500);
  igual('finiquito B vacaciones', f.importeVacaciones, 425.75);
  igual('finiquito B navidad', f.pagaNavidad, 369.86);
  igual('finiquito B verano', f.pagaVerano, 1126.03);
  igual('finiquito B total', f.total, 3421.64);
}
// Paro: topes 2026 con IPREM 600 (700 con la sexta parte).
igual('topes mínimos', TOPES_PARO.minimo.join('/'), '560/749/749');
igual('topes máximos', TOPES_PARO.maximo.join('/'), '1225/1400/1575');
igual('duración 359 días', duracionParo(359), 0);
igual('duración 1.000 días', duracionParo(1000), 300);
igual('duración 3.000 días', duracionParo(3000), 720);
// Base 2.000, sin hijos, 1.000 días: 70 % = 1.400 topado a 1.225; 60 % = 1.200. 1.225 x 6 + 1.200 x 4 = 12.150.
{
  const p = calcularParo(2000, 0, 1000);
  igual('paro 1 primeros meses', p.mensualPrimeros6, 1225);
  igual('paro 1 después', p.mensualDespues, 1200);
  igual('paro 1 total', p.totalBruto, 12150);
}
// Base 900, un hijo, 400 días: 70 % = 630, sube al mínimo de 749; 120 días = 2.996.
{
  const p = calcularParo(900, 1, 400);
  igual('paro 2 mensual', p.mensualPrimeros6, 749);
  igual('paro 2 total', p.totalBruto, 2996);
}

if (fallos) {
  console.log(`\n${fallos} fallo(s)`);
  process.exit(1);
}
console.log('\nTodos los casos cuadran con el cálculo a mano.');
