// Pictograma y color de cada término del glosario principal, por tema. Usa los dibujos de components/Pictograma.
type Regla = [RegExp, string, string];
// [patrón, pictograma, color de fondo]
const REGLAS: Regla[] = [
  [/acoso|mobbing|bossing|burnout|psicosocial|discrimina/i, 'alerta', '#fdf0ed'],
  [/protocolo|canal de denuncias|evaluaci[oó]n de riesgos|plan de igualdad|garant[ií]a de indemnidad|tutela/i, 'escudo', '#e6f4ee'],
  [/denuncia|inspecci[oó]n|lisos|burofax/i, 'megafono', '#fcedf3'],
  [/indemnizaci[oó]n|desempleo|paro\b|finiquito|n[oó]mina|pagas|salario|cotiza|base|complemento|irpf|rendimiento|cuota litis|costas|recargo|horas extra|da[ñn]os|justicia gratuita|antig[uü]edad|responsabilidad patrimonial/i, 'euro', '#fdf5e1'],
  [/despido|readmisi[oó]n|dimisi[oó]n|abandono|ere\b|erte|extinci[oó]n|preaviso/i, 'puerta', '#e8f1fc'],
  [/incapacidad|enfermedad|accidente|contingencia|evi\b|inss|mutua|lesiones|gran incapacidad|ajustes razonables|riesgo durante/i, 'cruz', '#f3edfa'],
  [/plazo|caducidad|prescripci[oó]n|d[ií]as h[aá]biles|periodo de prueba|registro de jornada/i, 'reloj', '#fdf0ed'],
  [/juzgado|juicio|sentencia|recurso|demanda|audiencia|carga de la prueba|delito/i, 'mazo', '#eef2f6'],
  [/conciliaci[oó]n|smac|mediaci[oó]n|reclamaci[oó]n previa/i, 'dos', '#e1f3f5'],
  [/nacimiento|reducci[oó]n de jornada|excedencia|cuidado|desconexi[oó]n|teletrabajo|vacaciones/i, 'calendario', '#fcedf3'],
  [/contrato|convenio|carta|certificado|vida laboral|alta en|fraude|modificaci[oó]n|movilidad|sucesi[oó]n|suspensi[oó]n/i, 'documento', '#eef2f6'],
];

export function pictoDe(termino: string): { pic: string; fondo: string } {
  for (const [re, pic, fondo] of REGLAS) if (re.test(termino)) return { pic, fondo };
  return { pic: 'libro', fondo: '#f3f0ea' };
}
