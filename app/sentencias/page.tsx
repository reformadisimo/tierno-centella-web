import type { Metadata } from 'next';
import Llamada from '@/components/Llamada';

export const metadata: Metadata = {
  title: 'Sentencias y casos ganados',
  description: 'Sentencias pioneras del despacho en acoso laboral, despidos e incapacidad permanente.',
};

const CASOS = [
  {
    materia: 'Acoso laboral',
    titulo: 'Primera condena en España a la empresa y al acosador a la vez',
    texto:
      'La empresa y el acosador fueron condenados de forma solidaria a indemnizar a la víctima por los daños y perjuicios del acoso. Hasta entonces la responsabilidad recaía solo en la empresa.',
  },
  {
    materia: 'Acoso laboral',
    titulo: 'La Universidad Rey Juan Carlos, condenada a pagar 123.000 € a una docente',
    texto: 'La universidad no evitó el hostigamiento que sufría una profesora y tuvo que indemnizarla.',
    fuente: {
      nombre: 'El Español, 2 de abril de 2024',
      url: 'https://www.elespanol.com/reportajes/20240402/universidad-rey-juan-carlos-condenada-pagar-eur-docente-no-evitar-acoso-laboral/844415900_0.html',
    },
  },
  {
    materia: 'Acoso laboral',
    titulo: 'Primera condena por acoso en la administración educativa de Castilla y León',
    texto: 'Un precedente para el profesorado de la enseñanza pública frente a la propia administración.',
  },
];

export default function Sentencias() {
  return (
    <>
      <header className="cabeza-pagina">
        <div className="contenedor">
          <h1>Sentencias que hemos ganado</h1>
          <p className="entradilla">Algunos de los casos que han marcado el camino a otros trabajadores.</p>
        </div>
      </header>
      <section className="seccion">
        <div className="contenedor">
          <ul className="servicios">
            {CASOS.map((c) => (
              <li key={c.titulo}>
                <div style={{ display: 'grid', gap: 6, padding: '20px 0' }}>
                  <span className="campo-ayuda">{c.materia}</span>
                  <strong style={{ fontSize: '1.3rem' }}>{c.titulo}</strong>
                  <span>{c.texto}</span>
                  {c.fuente && (
                    <a href={c.fuente.url} style={{ fontSize: '0.95rem' }}>
                      {c.fuente.nombre}
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
          <p className="letra-pequena">
            En la versión definitiva, cada sentencia tendrá su ficha: tribunal, fecha, problema, resultado y cuantía, con los datos
            personales anonimizados.
          </p>
        </div>
      </section>
      <Llamada asunto="laboral" />
    </>
  );
}
