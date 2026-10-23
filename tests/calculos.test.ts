// Casos calculados a mano antes de escribir el código. Ejecutar: npm test
import { calcularIndemnizacion, ultimoDiaParaReclamar, diasHabilesRestantes, mesesTrabajados } from '../lib/calculos.ts';

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

if (fallos) {
  console.log(`\n${fallos} fallo(s)`);
  process.exit(1);
}
console.log('\nTodos los casos cuadran con el cálculo a mano.');
