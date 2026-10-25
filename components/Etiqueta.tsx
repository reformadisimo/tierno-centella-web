// Etiqueta pequeña con icono sobre los títulos de sección ("SENTENCIAS", "EL EQUIPO"...), como las de la web actual del despacho.
import Icono from './Iconos';

export function Etiqueta({ icono, children, tono = 'oro' }: { icono: string; children: React.ReactNode; tono?: 'oro' | 'coral' | 'rosa' | 'azul' }) {
  return (
    <span className={`etiqueta-seccion es-${tono}`}>
      <Icono nombre={icono} tam={14} />
      {children}
    </span>
  );
}
