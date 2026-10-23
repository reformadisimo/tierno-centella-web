import type { Metadata } from 'next';
import Llamada from '@/components/Llamada';

export const metadata: Metadata = {
  title: 'Abogados de acoso laboral en Madrid',
  description: 'Cómo demostrar el acoso laboral, qué puedes reclamar y cómo protegerte mientras sigues en la empresa.',
};

export default function Acoso() {
  return (
    <>
      <header className="cabeza-pagina">
        <div className="contenedor">
          <h1>Acoso laboral: se puede demostrar y se puede ganar.</h1>
          <p className="entradilla">
            Llevamos más de 25 años especializados en acoso laboral. Fuimos los primeros en conseguir en España que la empresa y
            el acosador fueran condenados a la vez a pagar los daños a la víctima.
          </p>
        </div>
      </header>

      <section className="seccion">
        <div className="contenedor texto">
          <h2>Cómo reconocer el acoso</h2>
          <p>
            Acoso no es un mal día ni una discusión. Es un trato hostil que se repite durante un tiempo y busca aislarte, hundirte o
            que te vayas. Suele tomar alguna de estas formas:
          </p>
          <ul>
            <li>Te quitan funciones, te dejan sin trabajo o te dan tareas imposibles o humillantes.</li>
            <li>Te aíslan: no te convocan, no te hablan, te cambian de sitio.</li>
            <li>Te critican o ridiculizan delante de otros, o difunden rumores sobre ti.</li>
            <li>Te gritan, te amenazan o te insultan.</li>
            <li>Te ponen trabas para ascender o formarte que al resto no.</li>
          </ul>

          <h2>Cómo se demuestra</h2>
          <p>Lo que más pesa ante el juez es la prueba que se reúne desde el principio. Empieza hoy:</p>
          <ol>
            <li>Apunta cada episodio con fecha, hora, quién estaba y qué pasó.</li>
            <li>Guarda correos, mensajes y cambios de funciones o de horario por escrito.</li>
            <li>Busca compañeros que lo hayan visto y estén dispuestos a contarlo.</li>
            <li>Si te afecta a la salud, ve al médico y explica el origen: los informes médicos son prueba.</li>
            <li>Comunica el acoso a la empresa por escrito, para que no pueda decir que no lo sabía.</li>
          </ol>

          <h2>Qué puedes reclamar</h2>
          <ul>
            <li>Que la empresa ponga fin al acoso y te proteja mientras sigues trabajando.</li>
            <li>
              Pedir al juez que extinga tu contrato por incumplimiento de la empresa. Cobras la misma indemnización que en un despido
              improcedente y puedes pedir la prestación por desempleo.
            </li>
            <li>Una indemnización por los daños sufridos, a la empresa y también al acosador.</li>
            <li>En los casos graves, denunciar por la vía penal: el acoso laboral es delito en el Código Penal.</li>
          </ul>

          <div className="recuadro">
            <p>
              <strong>No esperes a estar de baja para consultar.</strong> Cuanto antes empiezas a reunir pruebas, más fácil es
              demostrar el acoso.
            </p>
          </div>
        </div>
      </section>
      <Llamada asunto="acoso laboral" />
    </>
  );
}
