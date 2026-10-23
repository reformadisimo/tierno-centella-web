// Fotos que se intercalan dentro del texto de las guías y artículos, para que en el móvil no haya
// pantallas y pantallas de texto sin una imagen. Cada tema tiene su grupo de fotos y cada pieza
// toma las suyas en un orden fijo según su nombre, para que no todas las páginas repitan las mismas.
type Foto = { src: string; es: string; en: string };

const F: Record<string, Foto> = {
  'acoso-tension': { src: 'acoso-tension', es: 'Un superior señala a una trabajadora que se lleva la mano a la cabeza', en: 'A manager points at a worker who holds her head in her hand' },
  'acoso-ventana': { src: 'acoso-ventana', es: 'Una trabajadora junto a la ventana de la oficina', en: 'A worker by the office window' },
  'mujer-agobiada': { src: 'mujer-agobiada', es: 'Una trabajadora agobiada mientras alguien le entrega papeles', en: 'An overwhelmed worker as someone hands her papers' },
  'hombre-estres': { src: 'hombre-estres', es: 'Un trabajador estresado rodeado de móviles y papeles', en: 'A stressed worker surrounded by phones and papers' },
  'jefe-senala': { src: 'jefe-senala', es: 'Un superior señala con el dedo a un trabajador', en: 'A manager points his finger at a worker' },
  'mujer-pensativa': { src: 'mujer-pensativa', es: 'Una mujer pensativa junto a una ventana', en: 'A thoughtful woman by a window' },
  'mujer-cansada': { src: 'mujer-cansada', es: 'Una trabajadora con la cabeza entre las manos frente al portátil', en: 'A worker with her head in her hands in front of her laptop' },
  'mujer-cafe': { src: 'mujer-cafe', es: 'Una mujer cansada en su mesa de trabajo', en: 'A tired woman at her desk' },
  'abogada-escucha': { src: 'abogada-escucha', es: 'Una abogada del despacho escucha a una clienta', en: 'A lawyer from the firm listens to a client' },
  'abogada-documentos': { src: 'abogada-documentos', es: 'Una abogada del despacho revisa un expediente', en: 'A lawyer from the firm reviews a case file' },
  'abogada-lee': { src: 'abogada-lee', es: 'Una abogada del despacho estudia un caso', en: 'A lawyer from the firm studies a case' },
  'abogada-sonrie': { src: 'abogada-sonrie', es: 'Una abogada del despacho sonríe durante una reunión', en: 'A lawyer from the firm smiles during a meeting' },
  'abogado-joven': { src: 'abogado-joven', es: 'Un abogado del despacho trabaja con documentos', en: 'A lawyer from the firm works with documents' },
  'documentos-mesa': { src: 'documentos-mesa', es: 'Documentos sobre una mesa del despacho', en: 'Documents on a desk at the firm' },
  'mazo': { src: 'mazo', es: 'Un mazo de juez', en: "A judge's gavel" },
  'sala-reuniones': { src: 'sala-reuniones', es: 'Sala de reuniones preparada para una reunión', en: 'A meeting room ready for a meeting' },
  'despido-caja': { src: 'despido-caja', es: 'Una persona recoge sus cosas en una caja tras un despido', en: 'A person packs their things in a box after being dismissed' },
  'firma-contrato': { src: 'firma-contrato', es: 'Una persona firma un documento', en: 'A person signs a document' },
  'documento-pluma': { src: 'documento-pluma', es: 'Un documento y una pluma', en: 'A document and a pen' },
  'calculadora-papeles': { src: 'calculadora-papeles', es: 'Cuentas con calculadora, cuaderno y portátil', en: 'Working out figures with a calculator, notebook and laptop' },
  'trabajador-portatil': { src: 'trabajador-portatil', es: 'Un trabajador toma notas junto a su portátil', en: 'A worker takes notes next to his laptop' },
  'acuerdo': { src: 'acuerdo', es: 'Dos personas se dan la mano tras un acuerdo', en: 'Two people shake hands after reaching an agreement' },
  'reunion-cliente': { src: 'reunion-cliente', es: 'Jesús Tierno entrega documentación a una clienta', en: 'Jesús Tierno hands documents to a client' },
  'incapacidad': { src: 'incapacidad', es: 'Un trabajador en silla de ruedas en su puesto', en: 'A worker in a wheelchair at his workplace' },
  'incapacidad-ventana': { src: 'incapacidad-ventana', es: 'Una trabajadora, con un café, se lleva la mano a la frente junto a la ventana', en: 'A worker with a coffee holds her forehead by the window' },
  'medico-informe': { src: 'medico-informe', es: 'Un médico rellena un informe', en: 'A doctor fills in a report' },
  'silla-ruedas': { src: 'silla-ruedas', es: 'Un trabajador en silla de ruedas durante una reunión', en: 'A worker in a wheelchair during a meeting' },
  'jubilado-papeles': { src: 'jubilado-papeles', es: 'Un hombre revisa sus papeles con la calculadora', en: 'A man goes through his papers with a calculator' },
  'personas-mayores': { src: 'personas-mayores', es: 'Una pareja mayor pasea por la calle', en: 'An older couple walks down the street' },
  'obrero-grua': { src: 'obrero-grua', es: 'Un trabajador de la construcción junto a una grúa', en: 'A construction worker next to a crane' },
  'madre-hijo': { src: 'madre-hijo', es: 'Una madre juega con su hijo pequeño', en: 'A mother plays with her young son' },
  'familia-siluetas': { src: 'familia-siluetas', es: 'Siluetas de una familia con sus hijos', en: 'Silhouettes of a family with their children' },
  'igualdad': { src: 'igualdad', es: 'Unas manos sostienen el símbolo de la igualdad entre mujeres y hombres', en: 'Hands holding the symbol of equality between women and men' },
  'manos-unidas': { src: 'manos-unidas', es: 'Varias manos unidas en señal de apoyo', en: 'Several hands joined in support' },
  'biblioteca': { src: 'biblioteca', es: 'Reunión en la biblioteca del despacho', en: "A meeting in the firm's library" },
  'libros-derecho': { src: 'libros-derecho', es: 'Libros de derecho en una estantería', en: 'Law books on a shelf' },
  'reunion-equipo': { src: 'reunion-equipo', es: 'El equipo del despacho reunido', en: "The firm's team in a meeting" },
  'equipo-pasillo': { src: 'equipo-pasillo', es: 'Tres compañeros revisan documentos mientras caminan por la oficina', en: 'Three colleagues review documents as they walk through the office' },
  'portatil-manos': { src: 'portatil-manos', es: 'Una persona consulta sus papeles junto al portátil', en: 'A person checks their papers next to a laptop' },
  'reunion-oficina': { src: 'reunion-oficina', es: 'Una reunión de empresa en una sala de oficinas', en: 'A company meeting in an office' },
  'empresas-firma': { src: 'empresas-firma', es: 'Firma de un documento en una reunión de empresa', en: 'Signing a document at a company meeting' },
};

const GRUPOS: Record<string, string[]> = {
  acoso: ['acoso-tension', 'abogada-escucha', 'mujer-agobiada', 'documentos-mesa', 'hombre-estres', 'mazo', 'acoso-ventana', 'abogada-lee', 'jefe-senala', 'mujer-pensativa', 'sala-reuniones', 'manos-unidas'],
  despido: ['despido-caja', 'abogado-joven', 'firma-contrato', 'calculadora-papeles', 'jefe-senala', 'mazo', 'documento-pluma', 'trabajador-portatil', 'acuerdo', 'abogada-documentos', 'portatil-manos'],
  incapacidad: ['medico-informe', 'incapacidad', 'abogada-lee', 'incapacidad-ventana', 'jubilado-papeles', 'silla-ruedas', 'documentos-mesa', 'obrero-grua', 'personas-mayores', 'mazo'],
  mujer: ['madre-hijo', 'abogada-escucha', 'igualdad', 'mujer-pensativa', 'familia-siluetas', 'mujer-cansada', 'manos-unidas', 'abogada-sonrie', 'mujer-cafe', 'mazo'],
  empresas: ['reunion-oficina', 'empresas-firma', 'sala-reuniones', 'equipo-pasillo', 'abogada-documentos', 'libros-derecho'],
  general: ['biblioteca', 'abogada-documentos', 'libros-derecho', 'reunion-equipo', 'equipo-pasillo', 'portatil-manos', 'mazo', 'abogada-lee'],
};

export function fotosParaTexto(tema: string | undefined, semilla: string, excluir: string): Foto[] {
  const grupo = GRUPOS[tema ?? ''] ?? GRUPOS.general;
  let h = 0;
  for (const c of semilla) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  const lista = grupo.filter((n) => !excluir.includes(`/${n}.`) && !excluir.includes(`/${n}-`));
  const inicio = h % lista.length;
  return [...lista.slice(inicio), ...lista.slice(0, inicio)].map((n) => F[n]);
}

// Tema de la pieza a partir de su ruta o de su categoría.
export function temaDe(ruta: string, categoria?: string) {
  if (/acoso|harassment/.test(ruta)) return 'acoso';
  if (/despido|dismissal/.test(ruta)) return 'despido';
  if (/incapacidad|disability/.test(ruta)) return 'incapacidad';
  if (/mujer|women/.test(ruta)) return 'mujer';
  if (categoria && GRUPOS[categoria]) return categoria;
  return 'general';
}
