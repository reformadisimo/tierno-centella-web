'use client';

// Lista interactiva de lo que conviene guardar según la situación. Lo marcado se recuerda solo en este navegador.
import { useEffect, useState } from 'react';
import { BotonImprimir } from './Utiles';
import { DESPACHO, enlaceWhatsapp } from '@/lib/despacho';

type Item = { texto: string; pista: string };
type Tema = { id: string; nombre: string; items: Item[] };

const TEMAS: Tema[] = [
  {
    id: 'despido',
    nombre: 'Me han despedido',
    items: [
      { texto: 'La carta de despido', pista: 'Fírmala como "recibido, no conforme" y haz una foto o copia el mismo día.' },
      { texto: 'El contrato y sus anexos', pista: 'Y cualquier documento que cambie tus condiciones.' },
      { texto: 'Tus últimas 12 nóminas', pista: 'De ellas sale tu salario real, que es la base de la indemnización.' },
      { texto: 'La vida laboral', pista: 'Se descarga en la sede de la Seguridad Social.' },
      { texto: 'El certificado de empresa', pista: 'Lo necesitas para pedir el paro.' },
      { texto: 'Correos y mensajes con la empresa', pista: 'Sobre todo los de las semanas anteriores al despido.' },
      { texto: 'La propuesta de finiquito, sin firmar', pista: 'No la firmes como conforme sin que la revise un abogado.' },
      { texto: 'El nombre de tu convenio colectivo', pista: 'Suele aparecer en la nómina.' },
      { texto: 'Nombres de compañeros que lo presenciaron', pista: 'Por si hay que citarlos como testigos.' },
    ],
  },
  {
    id: 'acoso',
    nombre: 'Sufro acoso en el trabajo',
    items: [
      { texto: 'Un diario de hechos', pista: 'Fecha, hora, lugar, quién estaba y qué pasó, escrito el mismo día.' },
      { texto: 'Correos, mensajes y chats', pista: 'Haz capturas con la fecha visible y guárdalas fuera del ordenador de la empresa.' },
      { texto: 'Los nombres de posibles testigos', pista: 'Quién vio u oyó algo, aunque no quiera declarar todavía.' },
      { texto: 'Partes médicos e informes psicológicos', pista: 'Muestran el daño y su fecha.' },
      { texto: 'Cualquier denuncia o queja interna', pista: 'Al canal de denuncias, a recursos humanos o a un delegado.' },
      { texto: 'Cambios en tus funciones, horario o sueldo', pista: 'Guarda el antes y el después.' },
      { texto: 'Evaluaciones y felicitaciones anteriores', pista: 'Demuestran cómo era tu trabajo antes del conflicto.' },
      { texto: 'Grabaciones de conversaciones en las que participas', pista: 'Consúltalo antes de usarlas: su validez depende del caso.' },
    ],
  },
  {
    id: 'baja',
    nombre: 'Baja o incapacidad',
    items: [
      { texto: 'Los partes de baja y de confirmación', pista: 'Todos, en orden de fechas.' },
      { texto: 'Informes médicos y pruebas diagnósticas', pista: 'Resonancias, analíticas, informes del especialista.' },
      { texto: 'La resolución del INSS, con la fecha en que la recibiste', pista: 'Desde esa fecha corre el plazo para reclamar.' },
      { texto: 'Informes de la mutua', pista: 'Y cualquier alta que te hayan dado.' },
      { texto: 'Una descripción de tu puesto', pista: 'Qué haces cada día, esfuerzos, posturas, turnos.' },
      { texto: 'La vida laboral', pista: 'Para comprobar cotizaciones y periodos.' },
      { texto: 'Si crees que viene del trabajo, el parte del accidente', pista: 'O cualquier prueba de lo ocurrido.' },
    ],
  },
  {
    id: 'dinero',
    nombre: 'Me deben dinero',
    items: [
      { texto: 'Las nóminas de todos los meses afectados', pista: 'Aunque falten algunas, guarda las que tengas.' },
      { texto: 'Extractos del banco con los ingresos', pista: 'Prueban lo que sí cobraste.' },
      { texto: 'El contrato y el convenio', pista: 'Marcan lo que debías cobrar.' },
      { texto: 'Registro de horas, turnos o cuadrantes', pista: 'Capturas o fotos de los cuadros de turnos.' },
      { texto: 'Mensajes donde reclamaste el pago', pista: 'Muestran que lo pediste y qué contestaron.' },
      { texto: 'Un listado de los conceptos y meses que te deben', pista: 'Aunque sea una nota en el móvil.' },
    ],
  },
];

export default function QueGuardar() {
  const [id, setId] = useState('despido');
  const [hechos, setHechos] = useState<Record<string, boolean>>({});
  useEffect(() => {
    try {
      setHechos(JSON.parse(localStorage.getItem('tc-que-guardar') || '{}'));
    } catch {}
  }, []);
  const tema = TEMAS.find((t) => t.id === id)!;
  const clave = (t: Tema, i: number) => `${t.id}:${i}`;
  const marcados = tema.items.filter((_, i) => hechos[clave(tema, i)]).length;
  const pct = Math.round((marcados / tema.items.length) * 100);
  function alterna(i: number) {
    const nuevo = { ...hechos, [clave(tema, i)]: !hechos[clave(tema, i)] };
    setHechos(nuevo);
    try {
      localStorage.setItem('tc-que-guardar', JSON.stringify(nuevo));
    } catch {}
  }
  const pendientes = tema.items.filter((_, i) => !hechos[clave(tema, i)]).map((x) => `- ${x.texto}`);
  return (
    <div className="herramienta qg">
      <fieldset className="pregunta-test">
        <legend>¿Qué te está pasando?</legend>
        <div className="opciones">
          {TEMAS.map((t) => (
            <label key={t.id} className="opcion">
              <input type="radio" name="tema-guardar" checked={id === t.id} onChange={() => setId(t.id)} />
              <span>{t.nombre}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <div className="qg-progreso" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label="Documentos reunidos">
        <span style={{ width: `${pct}%` }} />
      </div>
      <p className="qg-cuenta" aria-live="polite">
        {marcados === tema.items.length ? 'Lo tienes todo reunido. Qué buen trabajo.' : `${marcados} de ${tema.items.length} reunidos`}
      </p>
      <ul className="qg-lista">
        {tema.items.map((x, i) => (
          <li key={x.texto}>
            <label className={hechos[clave(tema, i)] ? 'hecho' : ''}>
              <input type="checkbox" checked={!!hechos[clave(tema, i)]} onChange={() => alterna(i)} />
              <span>
                <b>{x.texto}</b>
                <small>{x.pista}</small>
              </span>
            </label>
          </li>
        ))}
      </ul>
      <div className="acciones">
        <BotonImprimir />
        {pendientes.length > 0 && (
          <a className="boton boton-claro" href={enlaceWhatsapp(`Hola, aún me faltan por reunir:\n${pendientes.join('\n')}\n¿Me ayudáis a ver qué es lo más urgente?`)}>
            Preguntar qué me falta
          </a>
        )}
        <a className="boton" href={DESPACHO.telefonoHref}>Llamar al {DESPACHO.telefono}</a>
      </div>
      <p className="letra-pequena">Lista orientativa. Lo que marques se guarda solo en este navegador y no lo recibimos nosotros.</p>
    </div>
  );
}
