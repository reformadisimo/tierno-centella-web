'use client';

import Cuestionario, { type Paso, marcas, texto } from './Cuestionario';

const PASOS: Paso[] = [
  {
    id: 'que',
    animo: 'No tienes por qué aguantarlo todo. Vamos a ver si puedes irte sin perder tus derechos.',
    pregunta: '¿Qué está haciendo la empresa?',
    ayuda: 'Marca todas las que te pasen.',
    multiple: true,
    opciones: [
      { texto: 'Me paga tarde o no me paga la nómina, varios meses', marca: 'impago', icono: 'euro' },
      { texto: 'Sufro acoso o un trato humillante', marca: 'acoso', icono: 'personas' },
      { texto: 'Me han dejado sin funciones o me tienen sin hacer nada', marca: 'ocupacion', icono: 'caja' },
      { texto: 'Me han cambiado horario, sueldo o funciones de forma grave y sin causa', marca: 'modificacion', icono: 'reloj' },
      { texto: 'No me da de alta, no cotiza por mí o incumple la seguridad en el trabajo', marca: 'grave', icono: 'escudo' },
    ],
  },
  {
    id: 'sigue',
    pregunta: '¿Sigue pasando hoy?',
    si: (r) => (r.que ?? []).length > 0,
    opciones: [
      { texto: 'Sí, sigue', valor: 2 },
      { texto: 'Pasó hace poco, menos de unos meses', valor: 1 },
      { texto: 'Ya no; pasó hace tiempo', valor: 0 },
    ],
  },
  {
    id: 'trabajando',
    pregunta: '¿Sigues yendo a trabajar?',
    si: (r) => (r.que ?? []).length > 0,
    opciones: [
      { texto: 'Sí', marca: 'activo' },
      { texto: 'Estoy de baja médica', marca: 'baja' },
      { texto: 'He dejado de ir o he pedido la baja voluntaria', marca: 'dejado' },
    ],
  },
  {
    id: 'escrito',
    animo: 'Última pregunta. Gracias por llegar hasta aquí.',
    pregunta: '¿Lo has reclamado a la empresa por escrito?',
    si: (r) => (r.que ?? []).length > 0,
    opciones: [{ texto: 'Sí', marca: 'escrito' }, { texto: 'No' }],
  },
];

export default function TestExtincion() {
  return (
    <Cuestionario
      pasos={PASOS}
      resultado={(r) => {
        const m = marcas(r);
        const sigue = r.sigue?.[0]?.valor ?? 0;
        const causas = (r.que ?? []).length;
        const alto = causas > 0 && sigue >= 1 && !m.has('dejado');
        const puntos: string[] = [
          'La vía se llama extinción del contrato por incumplimiento del empresario (artículo 50 del Estatuto). La pide el trabajador al juez.',
          'Si el juez te da la razón, cobras lo mismo que en un despido improcedente: 33 días por año (45 para lo anterior a 2012) y tienes derecho al paro.',
        ];
        if (m.has('acoso')) puntos.push('Si hay acoso, además puedes reclamar una indemnización por los daños sufridos.');
        if (m.has('activo') || m.has('baja'))
          puntos.push('Mientras dura el juicio, en general sigues trabajando. En casos graves, como el acoso, se puede pedir al juez que te exima de ir y sigas cobrando.');
        if (m.has('dejado'))
          puntos.push('Cuidado: si dejas de ir o pides la baja voluntaria, puedes perder la indemnización y el paro. Llámanos antes de dar ningún paso más.');
        if (!m.has('escrito')) puntos.push('Deja constancia por escrito de cada incumplimiento: es la base de la demanda.');
        if (sigue === 0 && causas > 0) puntos.push('El incumplimiento tiene que ser actual o reciente: si pasó hace mucho, esta vía se debilita.');

        return {
          nivel: m.has('dejado') ? 'alto' : alto ? 'alto' : causas > 0 ? 'medio' : 'bajo',
          titulo: m.has('dejado')
            ? 'Para un momento: puede que estés perdiendo derechos'
            : alto
              ? 'Podrías irte de la empresa con indemnización'
              : causas > 0
                ? 'Hay motivos, pero conviene estudiarlo'
                : 'Por lo que cuentas, esta vía no parece la tuya',
          texto: m.has('dejado')
            ? 'Dejar el trabajo por tu cuenta sin pasar por el juez puede tratarse como una baja voluntaria.'
            : alto
              ? 'Lo que describes es el tipo de incumplimiento grave que permite pedir al juez que extinga tu contrato como si fuera un despido improcedente.'
              : causas > 0
                ? 'El incumplimiento tiene que ser grave y, normalmente, actual. Un abogado debe valorar los detalles.'
                : 'Si tu situación es otra, cuéntanosla: puede haber otra salida.',
          puntos,
          enlaces: [
            { href: '/acoso-laboral/dejar-el-trabajo-por-acoso', texto: 'Dejar el trabajo por acoso sin perder derechos' },
            { href: '/calculadora-indemnizacion', texto: 'Calcula cuánto te correspondería' },
          ],
          whatsapp: `Hola, he hecho el test de extinción del contrato. Pasa: ${texto(r, 'que') || 'nada marcado'}. ¿Sigue? ${texto(r, 'sigue') || '-'}. Situación: ${
            texto(r, 'trabajando') || '-'
          }. Quiero que lo valore un abogado.`,
        };
      }}
    />
  );
}
