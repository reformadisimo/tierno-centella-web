import type { Metadata } from 'next';
import { FacebookHoy, FacebookLuego, LinkedinHoy, LinkedinLuego, PerfilJesus } from '@/components/RedesGuia';

export const metadata: Metadata = {
  title: 'Así quedarían tu Facebook y tu LinkedIn | Guía para Jesús',
  description: 'La página de Facebook y las páginas de LinkedIn del despacho, hoy y con nosotros, con publicaciones de ejemplo hechas con contenidos reales de la web.',
  robots: { index: false, follow: false },
};

const SEMANA: { icono: string; titulo: string; texto: string }[] = [
  { icono: 'M4 4h16v16H4zM4 9h16M9 4v16', titulo: 'Primera semana: ordenar la casa', texto: 'Una sola página de Facebook y una de LinkedIn. Las duplicadas, cerradas o redirigidas, y los datos corregidos: piso, teléfono y horario iguales en todas partes.' },
  { icono: 'M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zM16 2v4M8 2v4M3 10h18', titulo: 'Un calendario semanal', texto: 'Publicaciones cada semana en las dos redes, programadas con antelación y con tu visto bueno cuando haga falta.' },
  { icono: 'M2 4h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 4h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z', titulo: 'Un tema, cuatro canales', texto: 'Cada artículo del blog, cada sentencia, cada vídeo de Instagram y cada jornada se convierte también en una publicación de Facebook y otra de LinkedIn.' },
  { icono: 'M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z', titulo: 'Textos adaptados a cada red', texto: 'LinkedIn, más profesional: para trabajadores en activo, recursos humanos, empresas y colegios. Facebook, más cercano: para quien tiene más de 45 años y busca ayuda para sí o para un familiar.' },
  { icono: 'M21 12a8 8 0 0 1-11.6 7.1L4 20.5l1.4-5A8 8 0 1 1 21 12z', titulo: 'Mensajes y comentarios, respondidos', texto: 'Cada mensaje y cada comentario tiene respuesta en el día laborable. Lo que sea una consulta pasa al CRM, como las de la web.' },
  { icono: 'M3 3v18h18M7 15l4-4 4 3 5-6', titulo: 'Medido en tu panel', texto: 'Seguidores, alcance y, sobre todo, cuántas consultas llegan desde cada red. Lo ves en tu panel de control y en el informe de cada mes.' },
];

export default function Pagina() {
  return (
    <main className="rd-pagina">
      <header className="rd-portada-pagina">
        <div className="contenedor">
          <p className="rd-ante">Facebook y LinkedIn · Hoy y con nosotros</p>
          <h1>Así quedarían tu Facebook y tu LinkedIn</h1>
          <p>
            A la izquierda, lo que ve hoy quien te busca en cada red (visto el 25 de octubre de 2026). A la derecha, cómo quedaría con nosotros: una sola página por red, con tus datos bien y publicaciones cada semana hechas con lo que ya tienes en la web. Las publicaciones son ejemplos, y cada una lo dice.
          </p>
          <a className="rd-volver" href="/guia-jesus#6-redes-sociales">
            Volver a la guía (apartado 6)
          </a>
        </div>
      </header>

      <section className="rd-seccion">
        <div className="contenedor">
          <h2>Facebook</h2>
          <p>
            Tienes dos páginas. La que encuentra la mayoría lleva desde el 30 de agosto de 2017 sin publicar, y pone un piso y un teléfono que no son los tuyos. La otra publica de tarde en tarde y repite Instagram. Facebook es donde está el público de más de 45 años: la edad de muchos despidos, bajas largas e incapacidades.
          </p>
          <div className="rd-par">
            <FacebookHoy />
            <FacebookLuego />
          </div>
        </div>
      </section>

      <section className="rd-seccion">
        <div className="contenedor">
          <h2>LinkedIn</h2>
          <p>
            Tres páginas de empresa, 458 seguidores repartidos y ni una publicación. LinkedIn es donde están los trabajadores en activo, los que mañana sufrirán un despido o un acoso, y los directores de recursos humanos, las empresas y los colegios que necesitan un protocolo o una formación.
          </p>
          <div className="rd-par">
            <LinkedinHoy />
            <LinkedinLuego />
          </div>
          <h2 style={{ marginTop: 30 }}>Tu perfil personal</h2>
          <p>Es el que más seguidores tiene (2.371) y el que más confianza da, porque eres tú. Hoy publica muy poco. Así quedaría, contando lo que ya has hecho, con una publicación a la semana escrita con tu voz.</p>
          <PerfilJesus />
        </div>
      </section>

      <section className="rd-seccion">
        <div className="contenedor">
          <h2>Qué haríamos cada semana</h2>
          <p>Todo dentro de la cuota. Lo único que iría aparte, si algún día lo quieres, son los anuncios en Facebook o LinkedIn: la gestión la hacemos nosotros; lo que se paga a Meta o a LinkedIn, tú directamente.</p>
          <ul className="rd-semana">
            {SEMANA.map((s) => (
              <li key={s.titulo}>
                <i aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d={s.icono} />
                  </svg>
                </i>
                <div>
                  <b>{s.titulo}</b>
                  <span>{s.texto}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="rd-seccion">
        <div className="contenedor">
          <h2>Cómo lo tienes hoy y cómo te quedaría</h2>
          <div className="rd-hoy-luego">
            <div className="rd-col-hoy">
              <small>Hoy</small>
              <ul>
                <li>Dos páginas de Facebook: una parada desde 2017, con el piso y el teléfono mal; la otra, de tarde en tarde.</li>
                <li>Tres páginas de LinkedIn sin ninguna publicación; 458 seguidores que no ven nada tuyo.</li>
                <li>Tu perfil personal, con 2.371 seguidores, casi en silencio.</li>
                <li>Google y las IA no saben cuál es la página buena, y la autoridad se reparte.</li>
                <li>Quien te encuentra puede pensar que el despacho ha cerrado, o llamar a un número viejo.</li>
              </ul>
            </div>
            <div className="rd-col-luego">
              <small>Con nosotros</small>
              <ul>
                <li>Una página de Facebook y una de LinkedIn, con los mismos datos correctos que la web y la ficha de Google.</li>
                <li>Publicaciones cada semana en las dos redes, sacadas del blog, las sentencias, los vídeos y las jornadas.</li>
                <li>Tu perfil personal con tu trayectoria entera y una publicación semanal con tu voz.</li>
                <li>Mensajes y comentarios respondidos; las consultas, al CRM.</li>
                <li>Todo medido en tu panel: qué red te trae consultas y cuántas.</li>
              </ul>
            </div>
          </div>
          <div className="rd-cierre">
            <p>
              <b>Esto entra en la cuota.</b> Unificar las páginas, corregir los datos, publicar cada semana, responder y medir: lo hacemos nosotros, y tú lo apruebas desde el móvil.
            </p>
            <div className="rd-botones-cierre">
              <a className="rd-boton-cierre" href="/guia-jesus#25-bis-lo-que-te-cuesta-una-sola-cuota-todo-incluido">
                Ver qué incluye la cuota
              </a>
              <a className="rd-boton-cierre rd-secundario" href="/guia-jesus#6-redes-sociales">
                Volver a la guía
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
