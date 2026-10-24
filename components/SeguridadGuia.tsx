// WordPress frente a la web nueva, en seguridad. Tarjetas que se leen bien en el móvil.

const FILAS: [string, string, string][] = [
  ['Panel de entrada', 'Abierto en una dirección que conoce todo el mundo', 'No hay panel que atacar'],
  ['Plugins', 'Hay que actualizarlos sin parar; uno olvidado basta para que entren', 'Ninguno'],
  ['Licencias', 'Muchos plugins y plantillas se pagan cada año', 'Nada que pagar aparte'],
  ['Copias de seguridad', 'Dependen de que alguien las configure y las pruebe', 'Cada cambio queda guardado, siempre'],
  ['Si algo pasa', 'Limpiar un WordPress hackeado lleva días y cuesta dinero', 'Volvemos a la web de hace un mes, tres o cuatro en unos minutos'],
  ['Velocidad', '18,3 segundos en el móvil', '3,2 segundos'],
];

export default function SeguridadGuia() {
  return (
    <div className="sg">
      <div className="sg-cabeza">
        <span />
        <b className="sg-hoy-t">Tu web actual (WordPress)</b>
        <b className="sg-luego-t">La web nueva</b>
      </div>
      {FILAS.map(([q, hoy, luego]) => (
        <div key={q} className="sg-fila">
          <span className="sg-q">{q}</span>
          <span className="sg-hoy">
            <small>Hoy</small>
            {hoy}
          </span>
          <span className="sg-luego">
            <small>Con la web nueva</small>
            {luego}
          </span>
        </div>
      ))}
    </div>
  );
}
