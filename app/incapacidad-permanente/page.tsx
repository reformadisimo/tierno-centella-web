import type { Metadata } from 'next';
import Llamada from '@/components/Llamada';

export const metadata: Metadata = {
  title: 'Abogados de incapacidad permanente en Madrid',
  description: 'Grados de incapacidad permanente, cuánto se cobra en cada uno y cómo recurrir si la Seguridad Social te la deniega.',
};

export default function Incapacidad() {
  return (
    <>
      <header className="cabeza-pagina">
        <div className="contenedor">
          <h1>Te han denegado la incapacidad. Se puede recurrir.</h1>
          <p className="entradilla">
            Muchas incapacidades que la Seguridad Social deniega se acaban reconociendo en el juzgado. Revisamos tu expediente y te
            decimos qué grado te puede corresponder.
          </p>
        </div>
      </header>

      <section className="seccion">
        <div className="contenedor texto">
          <div className="recuadro">
            <p>
              <strong>Tienes 30 días hábiles para la reclamación previa</strong> desde que te notifican la resolución. Es el primer
              paso obligatorio antes de ir a juicio.
            </p>
          </div>

          <h2>Los cuatro grados y lo que se cobra</h2>
          <table className="tabla">
            <thead>
              <tr>
                <th>Grado</th>
                <th>Cuándo se reconoce</th>
                <th>Qué cobras</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Parcial</td>
                <td>Tu rendimiento en tu profesión baja al menos un 33 %, pero puedes seguir en ella.</td>
                <td>Un pago único de 24 mensualidades de tu base reguladora.</td>
              </tr>
              <tr>
                <td>Total</td>
                <td>No puedes hacer tu profesión habitual, pero sí otra distinta.</td>
                <td>El 55 % de tu base reguladora cada mes; el 75 % desde los 55 años si no encuentras otro empleo.</td>
              </tr>
              <tr>
                <td>Absoluta</td>
                <td>No puedes hacer ningún trabajo.</td>
                <td>El 100 % de tu base reguladora cada mes.</td>
              </tr>
              <tr>
                <td>Gran incapacidad</td>
                <td>Además necesitas ayuda de otra persona para la vida diaria.</td>
                <td>La pensión de la absoluta más un complemento para pagar esa ayuda.</td>
              </tr>
            </tbody>
          </table>

          <h2>Cómo trabajamos un caso de incapacidad</h2>
          <ol>
            <li>Estudiamos la resolución del INSS y tus informes médicos.</li>
            <li>Te decimos qué grado es realista pedir y qué informes faltan.</li>
            <li>Presentamos la reclamación previa dentro de plazo.</li>
            <li>Si la deniegan, presentamos la demanda y te defendemos en el juicio.</li>
          </ol>
        </div>
      </section>
      <Llamada asunto="incapacidad permanente" />
    </>
  );
}
