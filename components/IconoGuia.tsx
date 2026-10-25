// Icono de cada guía en las listas de las áreas, en lugar de miniaturas que se repetían. Se elige por el título o la dirección.
import type { Pieza } from '@/lib/contenido';
import IconoMenu, { tipoIcono } from './IconoMenu';

const POR_PALABRA: [RegExp, string][] = [
  [/demostrar|prueba/i, 'lupa'],
  [/reclamar|cantidad|cobr|indemniz|salari|brecha/i, 'euro'],
  [/baja|ansiedad|depres|salud|m[eé]dic/i, 'salud'],
  [/administraci[oó]n|educaci[oó]n|funcionari|colegio/i, 'empresa'],
  [/delito|penal|juez|juzgado|tribunal/i, 'sentencia'],
  [/dejar|dimitir|extinci|irme/i, 'flecha'],
  [/protocolo|prevenci/i, 'comprobador'],
  [/horizontal|compa[nñ]er/i, 'persona'],
  [/saber si|qu[eé] es|se[nñ]ales|tipos/i, 'test'],
  [/plazo|cu[aá]ndo|d[ií]as/i, 'plazo'],
  [/embaraz|lactancia|nacimiento|permiso/i, 'calendario'],
  [/jornada|reducci|adaptaci|concilia/i, 'calendario'],
  [/grado|cu[aá]nto se cobra|pensi[oó]n/i, 'calc'],
  [/denieg|reclamaci[oó]n previa|demanda|recurr/i, 'sentencia'],
  [/contrato/i, 'carta'],
];

export default function IconoGuia({ pieza, tono = 'coral' }: { pieza: Pieza; tono?: 'coral' | 'azul' | 'morado' | 'rosa' | 'verde' }) {
  const texto = `${pieza.titulo} ${pieza.slug}`;
  const tipo = POR_PALABRA.find(([re]) => re.test(texto))?.[1] || tipoIcono(pieza.slug, pieza.titulo);
  return (
    <span className={`icono-guia ig-${tono}`} aria-hidden="true">
      <IconoMenu tipo={tipo} tam={22} />
    </span>
  );
}
