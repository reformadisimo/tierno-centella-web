import Link from 'next/link';

export default function NoEncontrada() {
  return (
    <section className="seccion">
      <div className="contenedor">
        <h1>Esta página no existe</h1>
        <p>Puede que la dirección esté mal escrita. Vuelve al inicio o calcula tu indemnización.</p>
        <div className="acciones">
          <Link className="boton" href="/">
            Ir al inicio
          </Link>
          <Link className="boton boton-claro" href="/calculadora-indemnizacion">
            Calcular mi indemnización
          </Link>
        </div>
      </div>
    </section>
  );
}
