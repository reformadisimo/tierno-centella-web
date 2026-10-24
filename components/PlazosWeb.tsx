// Web en días, no en meses: lo habitual frente a lo nuestro, de un vistazo.

export default function PlazosWeb() {
  return (
    <div className="pw">
      <div className="pw-fila">
        <span className="pw-q">Lo habitual</span>
        <span className="pw-barra pw-larga"><i>3 a 5 meses</i></span>
      </div>
      <div className="pw-fila">
        <span className="pw-q">Con nosotros</span>
        <span className="pw-barra pw-corta"><i>unos días</i></span>
      </div>
      <p className="pw-nota">
        Normalmente, menos de una semana, según el trabajo que tengamos. No lo firmamos, igual que quien te dice tres meses tampoco te los garantiza. <b>Y en tu caso ni siquiera hace falta esperar: tu web nueva ya está hecha.</b>
      </p>
    </div>
  );
}
