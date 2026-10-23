import type { Metadata } from 'next';
import { DESPACHO } from '@/lib/despacho';

export const metadata: Metadata = {
  title: 'Jesús Tierno Centella, abogado laboralista',
  description: 'Socio director de Tierno Centella Abogados, con más de 25 años de experiencia en derecho laboral y acoso laboral.',
};

export default function Jesus() {
  return (
    <>
      <header className="cabeza-pagina">
        <div className="contenedor">
          <h1>Jesús Tierno Centella</h1>
          <p className="entradilla">Socio director del despacho. Más de 25 años defendiendo a trabajadores.</p>
        </div>
      </header>
      <section className="seccion">
        <div className="contenedor texto">
          <p>
            Jesús Tierno ha dedicado su carrera al derecho laboral, y en especial al acoso laboral, donde ha conseguido algunas de
            las sentencias que hoy usan otros abogados como referencia. Entre ellas, la primera en España que condenó a la vez a la
            empresa y al acosador a indemnizar a la víctima.
          </p>
          <p>
            Dirige personalmente los casos más complejos del despacho y atiende consultas directas con clientes que quieren su
            criterio desde el primer día.
          </p>
          <div className="recuadro">
            <p>
              Para completar en la versión definitiva con el despacho: trayectoria, colegiación, publicaciones, apariciones en prensa
              y casos destacados.
            </p>
          </div>
          <div className="acciones">
            <a className="boton" href={DESPACHO.citaJesus}>
              Reservar consulta con Jesús Tierno ({DESPACHO.precioCitaJesus} €)
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
