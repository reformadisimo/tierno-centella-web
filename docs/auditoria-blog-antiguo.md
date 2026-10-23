# Auditoría del blog antiguo de tiernocentella.es

Fuente: https://tiernocentella.es/post-sitemap.xml, descargado el 23/10/2026. Contiene 220 URLs (de 2016 a 2022). Todas responden 200 hoy. Títulos leídos de cada página.

## Resumen

| Acción | URLs |
|---|---|
| redirigir | 44 |
| reescribir | 31 |
| fusionar | 41 |
| retirar | 104 |
| total | 220 |

- 12 URLs ya estaban en `ANTIGUAS` de next.config.mjs; el resto (208) va en `lib/redirecciones-blog.ts`.
- Las 31 reescrituras dan 31 artículos nuevos; además, muchas de las URLs "fusionar" se integran en ellos como apartado. Mientras no existan, su URL antigua redirige a la guía o sección más cercana (columna "Redirección hoy"). Cuando se publique cada artículo nuevo, hay que cambiar en `lib/redirecciones-blog.ts` el destino de todas las filas que apuntan a él.
- "Fusionar" con un destino marcado "(nuevo)" significa que ese texto antiguo se usa como apartado o ejemplo dentro del artículo nuevo.
- Retirar no es borrar sin más: la URL se redirige (301) a la sección más cercana o a /blog para no dar errores 404.

### Avisos detectados al auditar

- `cuanto-tiempo-puedo-estar-de-baja-en-el-trabajo-y-cuanto-voy-a-cobrar-mientras-lo-este` muestra hoy el texto de "cuentas bancarias gratuitas", y `las-empresas-de-mas-de-50-empleados-deberan-contar-con-un-canal-de-denuncias-2` muestra uno sobre horas extras. Son errores de WordPress; se tratan por el tema de la URL.
- `__trashed` es una entrada de la papelera que sigue publicada (permisos retribuidos).
- `nueva-sentencia-estimatoria` y `casos-de-exito-de-nuestro-equipo-de-abogados-especialistas` describen casos propios (JS n.º 7 de Bilbao, 26/03/2018, 20.490 euros por falta de prevención psicosocial; 60.000 euros a una aerolínea por acoso). No están en los hechos verificados del brief: confirmar con el despacho antes de usarlos.
- `testimonial-incapacidad-permanente` cuenta el caso de una clienta con nombre. Solo reutilizar con su consentimiento.

## Artículos nuevos que salen de la auditoría

| Slug nuevo | Categoría | Redirección provisional | URLs antiguas que recoge |
|---|---|---|---|
| /blog/que-hacer-si-sufres-acoso-laboral | acoso | /acoso-laboral | 2 |
| /blog/plazo-para-denunciar-acoso-laboral | acoso | /herramientas/plazos | 1 |
| /blog/como-denunciar-acoso-laboral | acoso | /acoso-laboral | 1 |
| /blog/tipos-de-acoso-laboral | acoso | /acoso-laboral/como-saber-si-sufro-acoso | 4 |
| /blog/perfil-del-acosador-laboral | acoso | /acoso-laboral/como-saber-si-sufro-acoso | 3 |
| /blog/acoso-por-embarazo-o-maternidad | acoso | /despido/despido-nulo-cuando | 1 |
| /blog/acoso-laboral-accidente-de-trabajo | acoso | /acoso-laboral/baja-por-ansiedad-por-acoso | 2 |
| /blog/que-puedes-hacer-estando-de-baja-por-ansiedad | acoso | /acoso-laboral/baja-por-ansiedad-por-acoso | 1 |
| /blog/reclamar-por-falta-de-prevencion-de-riesgos-psicosociales | acoso | /acoso-laboral/que-puedo-reclamar | 3 |
| /blog/despido-disciplinario-que-hacer | despido | /blog/audiencia-previa-despido-disciplinario | 5 |
| /blog/papeleta-de-conciliacion-smac-despido | despido | /despido/plazo-para-reclamar-despido | 2 |
| /blog/despido-en-periodo-de-prueba | despido | /despido/tipos-de-despido | 1 |
| /blog/despido-procedente-paro-e-indemnizacion | despido | /despido/tipos-de-despido | 1 |
| /blog/extincion-del-contrato-articulo-50 | despido | /acoso-laboral/dejar-el-trabajo-por-acoso | 2 |
| /blog/pruebas-de-la-empresa-en-un-despido | despido | /sentencias#despido-prueba-gps | 3 |
| /blog/reclamar-salarios-impagados | despido | /despido | 2 |
| /blog/como-solicitar-la-incapacidad-permanente | incapacidad | /incapacidad-permanente | 3 |
| /blog/tribunal-medico-evi-que-esperar | incapacidad | /incapacidad-permanente/reclamacion-previa-y-demanda | 2 |
| /blog/cuanto-se-cobra-de-incapacidad-permanente | incapacidad | /herramientas/comprobador-incapacidad | 2 |
| /blog/incapacidad-permanente-tributa-irpf | incapacidad | /incapacidad-permanente/grados-de-incapacidad-permanente | 1 |
| /blog/incapacidad-permanente-autonomos | incapacidad | /incapacidad-permanente | 2 |
| /blog/diferencia-entre-incapacidad-y-discapacidad | incapacidad | /incapacidad-permanente/grados-de-incapacidad-permanente | 2 |
| /blog/ventajas-de-la-incapacidad-permanente | incapacidad | /incapacidad-permanente/grados-de-incapacidad-permanente | 1 |
| /blog/accidente-laboral-que-reclamar | incapacidad | /incapacidad-permanente | 2 |
| /blog/cuanto-cobras-de-baja-y-cuanto-dura | incapacidad | /incapacidad-permanente | 5 |
| /blog/empresa-recibe-denuncia-de-acoso-que-hacer | empresas | /empresas | 2 |
| /blog/canal-de-denuncias-obligatorio-empresas | empresas | /empresas | 1 |
| /blog/prevenir-el-acoso-laboral-en-la-empresa | empresas | /empresas | 3 |
| /blog/falso-autonomo-como-saberlo | empresas | /empresas | 1 |
| /blog/adaptacion-y-reduccion-de-jornada-para-conciliar | empresas | /blog | 4 |
| /blog/sentencias-ganadas-acoso-y-prevencion | acoso | /sentencias | 1 |

## Tabla completa

| URL antigua | Título | Acción | Destino | Redirección hoy | Motivo |
|---|---|---|---|---|---|
| /funcionamiento-del-procedimiento-despido | Funcionamiento del procedimiento de despido | redirigir | /despido/plazo-para-reclamar-despido | /despido/plazo-para-reclamar-despido | Explica los pasos tras el despido; la guía de plazos lo cubre |
| /como-solicitar-la-incapacidad-permanente | ¿Cómo solicitar la Incapacidad Permanente? | reescribir | /blog/como-solicitar-la-incapacidad-permanente (nuevo) | /incapacidad-permanente | Búsqueda muy frecuente y de captación directa; hay que actualizar trámites |
| /abogados-especializados-en-discriminacion | Abogados especializados en discriminación laboral | fusionar | /despido/despido-nulo-cuando | /despido/despido-nulo-cuando | Discriminación laboral: se resume como causa de nulidad en la guía |
| /como-tributas-la-pension-por-incapacidad-permanente | ¿Cómo tributas la pensión por Incapacidad Permanente? | reescribir | /blog/incapacidad-permanente-tributa-irpf (nuevo) | /incapacidad-permanente/grados-de-incapacidad-permanente | Duda constante del cliente de incapacidad; fiscalidad de la pensión, no derecho tributario general |
| /que-es-como-puedes-calcular-base-reguladora | ¿Qué es y cómo puedes calcular la base reguladora? | fusionar | /blog/cuanto-se-cobra-de-incapacidad-permanente (nuevo) | /herramientas/comprobador-incapacidad | La base reguladora es parte del cálculo de la pensión |
| /que-debes-saber-contratos-indefinidos | ¿Qué debes saber sobre los contratos indefinidos? | retirar | /despido | /despido | Contratación general, desfasado tras la reforma laboral de 2021 |
| /calcular-la-pension-por-incapacidad-permanente | Calcular la pensión por Incapacidad Permanente | reescribir | /blog/cuanto-se-cobra-de-incapacidad-permanente (nuevo) | /herramientas/comprobador-incapacidad | Búsqueda de alto volumen; enlaza con el comprobador |
| /reclamacion-seguro-vida-incapacidad-permanente | Reclamación del seguro de vida por incapacidad permanente | retirar | /incapacidad-permanente | /incapacidad-permanente | Seguros (vía civil), fuera de especialidad |
| /cambiar-de-seguro-de-coche | Cómo cambiar de seguro de coche sin tener problemas | retirar | / | / | Seguros de coche, fuera de especialidad |
| /cuales-son-los-tipos-de-incapacidad-permanente | ¿Cuáles son los tipos de Incapacidad Permanente? | redirigir | /incapacidad-permanente/grados-de-incapacidad-permanente | /incapacidad-permanente/grados-de-incapacidad-permanente | Ya en next.config |
| /clausula-de-descuelgue | Derecho laboral: en qué consiste la cláusula de descuelgue | retirar | /empresas | /empresas | Laboral colectivo marginal y desfasado |
| /sirven-los-abogados-expertos-derecho-mercantil | ¿Para qué sirven los abogados expertos en derecho mercantil? | retirar | / | / | Mercantil, fuera de especialidad |
| /derecho-tributario-la-obligatoriedad-adscribirse-al-sii | Derecho tributario: la obligatoriedad de adscribirse al SII | retirar | / | / | Tributario, fuera de especialidad |
| /servicios-juridicos-integrales | ¿Cómo ayudan los servicios jurídicos integrales para empresas? | redirigir | /empresas | /empresas | Servicios a empresas; equivale a la página de empresas |
| /abogados-expertos-en-derecho-inmobiliario-2 | Abogados expertos en derecho inmobiliario. Compra una casa seguro | retirar | / | / | Inmobiliario, fuera de especialidad |
| /abogados-expertos-en-derecho-laboral | Qué son los abogados expertos en derecho laboral y cómo pueden ayudarnos | redirigir | / | / | Página comercial genérica del despacho |
| /los-tipos-de-acoso-laboral-segun-el-objetivo | Los tipos de acoso laboral según el objetivo | reescribir | /blog/tipos-de-acoso-laboral (nuevo) | /acoso-laboral/como-saber-si-sufro-acoso | Tema central; se une con vertical, horizontal y ascendente |
| /los-costes-del-acoso-laboral | Los costes del acoso laboral | fusionar | /blog/prevenir-el-acoso-laboral-en-la-empresa (nuevo) | /empresas | Coste del acoso para la empresa, argumento del artículo de prevención |
| /delito-de-acoso-laboral | El delito de acoso laboral | redirigir | /acoso-laboral/acoso-laboral-como-delito | /acoso-laboral/acoso-laboral-como-delito | Equivalente exacto |
| /elementos-esenciales-del-acoso-laboral | Elementos esenciales del acoso laboral en Jurisdicción social | redirigir | /acoso-laboral/como-saber-si-sufro-acoso | /acoso-laboral/como-saber-si-sufro-acoso | Requisitos del acoso; los cubre la guía |
| /causas-del-acoso-laboral-trabajo | Causas del acoso laboral en el trabajo | fusionar | /blog/tipos-de-acoso-laboral (nuevo) | /acoso-laboral/como-saber-si-sufro-acoso | Contenido genérico; cabe como apartado |
| /abogados-especializados-en-derecho-tributario | Abogados especializados en derecho tributario: la doble imposición | retirar | / | / | Tributario, fuera de especialidad |
| /valores-en-el-trabajo-de-bernabe-tierno-jimenez-jesus-tierno-centella | Valores en el trabajo de Bernabé Tierno Jiménez, Jesús Tierno Centella | redirigir | /jesus-tierno | /jesus-tierno | El libro aparece en la página de Jesús Tierno |
| /centros-educativos | Centros Educativos | redirigir | /empresas | /empresas | Servicio a centros educativos, dentro de empresas |
| /agencia-de-la-comunidad-de-madrid-para-la-reeducacion-y-reinsercion-del-menor-infractor | Agencia de la Comunidad de Madrid para la reeducación y reinserción del menor infractor | retirar | /blog | /blog | Noticia de 2016 sobre subrogación de vigilantes, caducada |
| /analisis-sentencia-tjue-sala-decima-de-14-de-septiembre-de-2016 | Análisis sentencia TJUE (Sala Décima) de 14 de septiembre de 2016. | retirar | /despido | /despido | Caso De Diego Porras (temporales, 2016), doctrina superada |
| /analisis-de-la-sentencia-rc-de-3-de-marzo-de-2016-caso-bershka | Análisis de la Sentencia RC de 3 de marzo de 2016. "Caso Bershka" | fusionar | /blog/pruebas-de-la-empresa-en-un-despido (nuevo) | /sentencias#despido-prueba-gps | Videovigilancia como prueba de despido; cabe como apartado |
| /analisis-jurisprudencial-prevencion-de-riesgos-laborales | Análisis Jurisprudencia. Prevención de riesgos laborales | fusionar | /blog/reclamar-por-falta-de-prevencion-de-riesgos-psicosociales (nuevo) | /acoso-laboral/que-puedo-reclamar | Sentencia TSJ Madrid 2012 sobre incumplimiento preventivo |
| /etude-comparative-de-harcelement-en-milieu-de-travailde-lespagne-contre-la-france | Étude comparative de harcèlement en milieu de travail,de L'Espagne contre la France | retirar | /acoso-laboral | /acoso-laboral | En francés y sin búsqueda en España |
| /caracteristicas-del-mobbing-laboral | Características del mobbing laboral: la víctima | fusionar | /blog/perfil-del-acosador-laboral (nuevo) | /acoso-laboral/como-saber-si-sufro-acoso | Perfil de la víctima; va con el del acosador |
| /incapacidad-permanente-parcial-derivada-de-contingencia-comun | Incapacidad permanente parcial derivada de contingencia común | redirigir | /incapacidad-permanente/grados-de-incapacidad-permanente | /incapacidad-permanente/grados-de-incapacidad-permanente | Un grado concreto; lo cubre la guía |
| /despido-disciplinario | Despido disciplinario, ¿qué necesitas saber? | reescribir | /blog/despido-disciplinario-que-hacer (nuevo) | /blog/audiencia-previa-despido-disciplinario | Búsqueda de alto volumen y urgente; añadir audiencia previa (STS 1250/2024) |
| /los-riesgos-psicosociales-entorno-laboral | Los riesgos psicosociales en el entorno laboral | fusionar | /blog/prevenir-el-acoso-laboral-en-la-empresa (nuevo) | /empresas | Evaluación psicosocial, base de la prevención |
| /como-cuidar-la-salud-laboral | Cómo cuidar la salud laboral | retirar | /acoso-laboral/baja-por-ansiedad-por-acoso | /acoso-laboral/baja-por-ansiedad-por-acoso | Consejos genéricos de bienestar |
| /los-peligros-del-estres-en-el-trabajo | Los peligros del estrés en el trabajo | fusionar | /acoso-laboral/baja-por-ansiedad-por-acoso | /acoso-laboral/baja-por-ansiedad-por-acoso | Estrés laboral y baja; se integra en la guía |
| /rasgos-del-acosador | Rasgos del acosador en el ámbito laboral | reescribir | /blog/perfil-del-acosador-laboral (nuevo) | /acoso-laboral/como-saber-si-sufro-acoso | Búsqueda informativa con volumen; puerta de entrada al test |
| /prevenir-el-acoso-laboral | ¿Cómo prevenir el acoso laboral? | reescribir | /blog/prevenir-el-acoso-laboral-en-la-empresa (nuevo) | /empresas | Servicio a empresas; actualizar con Convenio 190 y protocolo obligatorio |
| /despido-por-incapacidad-permanente | Despido por incapacidad permanente ¿Qué necesitas saber? | redirigir | /incapacidad-permanente/incapacidad-y-contrato-ley-2-2025 | /incapacidad-permanente/incapacidad-y-contrato-ley-2-2025 | Equivalente actualizado con la Ley 2/2025 |
| /despido-indirecto | Despido indirecto: todo lo que necesitas saber | reescribir | /blog/extincion-del-contrato-articulo-50 (nuevo) | /acoso-laboral/dejar-el-trabajo-por-acoso | Irse con indemnización por incumplimiento grave; conecta con acoso e impagos |
| /indemnizacion-por-despido-improcedente | Cuál es la indemnización por despido improcedente | redirigir | /calculadora-indemnizacion | /calculadora-indemnizacion | Ya en next.config |
| /despido-por-acoso-moral | Despido por acoso moral (todo lo que necesitas saber) | fusionar | /blog/empresa-recibe-denuncia-de-acoso-que-hacer (nuevo) | /empresas | Trata de despedir al acosador: es contenido para empresas |
| /despido-por-baja-de-larga-duracion | Despido por baja de larga duración | redirigir | /blog/despido-durante-la-baja-medica | /blog/despido-durante-la-baja-medica | Equivalente actualizado |
| /que-es-el-coaching-juridico | ¿Qué es el coaching jurídico? | retirar | / | / | Servicio que ya no se ofrece |
| /abogados-expertos-en-acoso-laboral-3 | Abogados expertos en acoso laboral | redirigir | /acoso-laboral | /acoso-laboral | Página comercial de acoso |
| /nueva-sentencia-estimatoria | Nueva sentencia estimatoria | fusionar | /blog/reclamar-por-falta-de-prevencion-de-riesgos-psicosociales (nuevo) | /acoso-laboral/que-puedo-reclamar | Caso propio: JS 7 Bilbao 26/03/2018, 20.490 euros por falta de prevención psicosocial (confirmar con el despacho) |
| /la-defensa-juridica-particulares | La defensa jurídica para particulares | redirigir | / | / | Página comercial genérica |
| /coaching-laboral | ¿Qué es el coaching laboral? - TIERNO CENTELLA | retirar | / | / | Servicio que ya no se ofrece |
| /ebook-gratuito-de-tipos-de-incapacidad-permanente-y-como-solicitar-la-pension | Ebook gratuito de Tipos de Incapacidad Permanente y cómo solicitar la pensión | redirigir | /incapacidad-permanente/grados-de-incapacidad-permanente | /incapacidad-permanente/grados-de-incapacidad-permanente | Mismo tema que la guía de grados |
| /derecho-laboral-reforma-laboral-2012 | Especialización en derecho laboral: la Reforma Laboral de 2012 | retirar | /despido | /despido | Reforma de 2012, desfasada |
| /razones-para-contratar-a-un-abogado-especializado-2 | Razones para contratar a un abogado especializado | redirigir | / | / | Página comercial genérica |
| /abogado-especialista-derecho-tributario | Qué aporta un abogado especialista en derecho tributario | retirar | / | / | Tributario, fuera de especialidad |
| /que-es-incapacidad-permanente | ¿Qué es la Incapacidad Permanente y cuántos tipos hay? | redirigir | /incapacidad-permanente/grados-de-incapacidad-permanente | /incapacidad-permanente/grados-de-incapacidad-permanente | Equivalente |
| /derecho-tributario-pymes | Equipo de abogados expertos en derecho tributario para PYMES | retirar | / | / | Tributario, fuera de especialidad |
| /en-que-ayuda-derecho-inmobiliario | ¿En qué te puede ayudar un experto en derecho inmobiliario? | retirar | / | / | Inmobiliario, fuera de especialidad |
| /tipos-de-sociedades-mercantiles | Los tipos más comunes de sociedades mercantiles | retirar | / | / | Mercantil, fuera de especialidad |
| /el-derecho-de-propiedad-industrial | Los distintos aspectos del derecho de propiedad industrial | retirar | / | / | Propiedad industrial, fuera de especialidad |
| /derecho-laboral-despido-improcedente | Derecho laboral: cuándo un despido se considera improcedente | redirigir | /despido/tipos-de-despido | /despido/tipos-de-despido | Calificación del despido; la cubre la guía |
| /el-derecho-a-la-excedencia | El derecho a la excedencia en el puesto de trabajo | retirar | /despido | /despido | Laboral general fuera del foco |
| /avisar-baja-en-el-puesto-de-trabajo | El deber de avisar de una baja en el puesto de trabajo | fusionar | /blog/cuanto-cobras-de-baja-y-cuanto-dura (nuevo) | /incapacidad-permanente | Gestión de la baja; cabe como apartado |
| /rendimientos-del-capital-y-del-trabajo-como-declararlos | Cómo declarar los rendimientos del capital y del trabajo | retirar | / | / | Renta, fuera de especialidad |
| /prestacion-de-incapacidad-permanente-para-autonomos | La prestación de Incapacidad Permanente para autónomos | reescribir | /blog/incapacidad-permanente-autonomos (nuevo) | /incapacidad-permanente | Nicho con búsqueda propia y pocos competidores buenos |
| /las-deudas-prescriben | ¿Las deudas prescriben? | retirar | / | / | Civil, fuera de especialidad |
| /como-actuar-ante-un-despido-5-consejos-para-afrontar-el-desempleo | 5 consejos para afrontar el desempleo | redirigir | /blog/me-han-despedido-que-hago-las-primeras-48-horas | /blog/me-han-despedido-que-hago-las-primeras-48-horas | Equivalente actualizado |
| /periodo-de-prueba-conoce-tus-derechos | Periodo de prueba. Conoce tus derechos | reescribir | /blog/despido-en-periodo-de-prueba (nuevo) | /despido/tipos-de-despido | Búsqueda urgente frecuente; cuándo el cese en prueba es nulo |
| /mobbing-maternal-que-es-y-como-combatirlo | El mobbing maternal, ¿qué es y cómo combatirlo? | reescribir | /blog/acoso-por-embarazo-o-maternidad (nuevo) | /despido/despido-nulo-cuando | Acoso con protección reforzada (nulidad); muy ligado a la especialidad |
| /reclamar-salida-lista-de-morosos | Cómo se puede reclamar la salida de una lista de morosos | retirar | / | / | Consumo, fuera de especialidad |
| /tribunal-medico-funcionamiento | El Tribunal Médico. Funcionamiento y dictámenes | reescribir | /blog/tribunal-medico-evi-que-esperar (nuevo) | /incapacidad-permanente/reclamacion-previa-y-demanda | Búsqueda frecuente y angustiada antes del tribunal |
| /reclamar-por-un-accidente-laboral | Accidente laboral, ¿qué puedo reclamar? | reescribir | /blog/accidente-laboral-que-reclamar (nuevo) | /incapacidad-permanente | Contingencia profesional, recargo e incapacidad |
| /derecho-laboral-el-despido-por-causas-disciplinarias | Derecho laboral: el despido por causas disciplinarias | fusionar | /blog/despido-disciplinario-que-hacer (nuevo) | /blog/audiencia-previa-despido-disciplinario | Duplicado del tema |
| /reclamacion-cantidad-laboral-proceso | Reclamación de Cantidad Laboral. Qué es y proceso | reescribir | /blog/reclamar-salarios-impagados (nuevo) | /despido | Reclamación de cantidad, plazo de 1 año |
| /impuesto-de-actos-juridicos-documentados | Qué es el Impuesto de Actos Jurídicos Documentados | retirar | / | / | Tributario/hipotecas, fuera de especialidad |
| /deber-saber-los-contratos-temporales | ¿Qué debo saber de los contratos temporales? | retirar | /despido | /despido | Contratación temporal desfasada tras la reforma de 2021 |
| /aprende-gestionar-tu-baja-laboral | Aprende a gestionar tu baja laboral | fusionar | /blog/cuanto-cobras-de-baja-y-cuanto-dura (nuevo) | /incapacidad-permanente | Gestión de la baja; mismo tema |
| /incapacidad-discapacidad-conoce-sus-diferencias | ¿Es lo mismo incapacidad que discapacidad? | reescribir | /blog/diferencia-entre-incapacidad-y-discapacidad (nuevo) | /incapacidad-permanente/grados-de-incapacidad-permanente | Confusión muy buscada |
| /que-es-la-jubilacion-anticipada | ¿Qué es la jubilación anticipada? | retirar | /incapacidad-permanente | /incapacidad-permanente | Pensiones de jubilación, fuera de especialidad |
| /incapacidad-permanente-cargos-publicos | Incapacidad Permanente en cargos públicos | retirar | /incapacidad-permanente | /incapacidad-permanente | Nicho sin búsqueda |
| /reclamar-clausulas-abusivas | Opciones para reclamar cláusulas abusivas de las entidades financieras | retirar | / | / | Bancario, fuera de especialidad |
| /que-hacer-incapacidad-permanente-causada-trabajo | ¿Qué hacer si tu Incapacidad Permanente ha sido causada en el trabajo? | fusionar | /blog/accidente-laboral-que-reclamar (nuevo) | /incapacidad-permanente | Incapacidad por contingencia profesional; mismo tema |
| /el-acoso-vertical-caracteristicas-y-tipificacion-penal | El acoso vertical: las características y su tipificación penal | fusionar | /blog/tipos-de-acoso-laboral (nuevo) | /acoso-laboral/como-saber-si-sufro-acoso | Acoso vertical; apartado del artículo de tipos |
| /jubilacion-anticipada-tramites-solicitar | Jubilación anticipada: Trámites para solicitarla | retirar | /incapacidad-permanente | /incapacidad-permanente | Pensiones de jubilación, fuera de especialidad |
| /tasas-municipales-por-servicios | El pago de las tasas municipales por servicios y su jurisprudencia | retirar | / | / | Tributario, fuera de especialidad |
| /como-calcular-prestacion-baja-medica | ¿Cómo calcular la prestación por baja médica? | reescribir | /blog/cuanto-cobras-de-baja-y-cuanto-dura (nuevo) | /incapacidad-permanente | Búsqueda masiva; puente hacia la incapacidad permanente |
| /derecho-tributario-plusvalia | Derecho tributario: el impuesto de plusvalía municipal | retirar | / | / | Tributario, fuera de especialidad |
| /que-necesitas-saber-declaracion-de-la-renta | ¿Qué necesitas saber de la Declaración de la Renta? | retirar | / | / | Renta, fuera de especialidad |
| /despido-procedente-indemnizacion-paro | Despido procedente. Indemnización y cobrar el paro | reescribir | /blog/despido-procedente-paro-e-indemnizacion (nuevo) | /despido/tipos-de-despido | Duda urgente muy repetida |
| /demostrar-acoso-horizontal | Cómo es posible demostrar un caso de acoso horizontal | redirigir | /acoso-laboral/acoso-horizontal-entre-companeros | /acoso-laboral/acoso-horizontal-entre-companeros | Ya en next.config |
| /reclamar-salarios-atrasados-que-hacer | Reclamar salarios atrasados. ¿Qué hacer? | fusionar | /blog/reclamar-salarios-impagados (nuevo) | /despido | Mismo tema |
| /que-comprobar-despido-antes-de-demandar | ¿Qué comprobar en un despido antes de demandar? | redirigir | /herramientas/revisa-tu-carta-de-despido | /herramientas/revisa-tu-carta-de-despido | La herramienta hace justo eso |
| /grado-discapacidad-necesario-cobrar-pension | Grado de discapacidad necesario para cobrar una pensión | fusionar | /blog/diferencia-entre-incapacidad-y-discapacidad (nuevo) | /incapacidad-permanente/grados-de-incapacidad-permanente | Mismo tema |
| /la-conciliacion | La conciliación como paso previo a cualquier demanda por despido | fusionar | /blog/papeleta-de-conciliacion-smac-despido (nuevo) | /despido/plazo-para-reclamar-despido | Mismo tema |
| /impagos-salario-dejar-trabajo-sin-ser-baja-voluntaria | Impagos en el salario. Dejar el trabajo sin ser baja voluntaria | fusionar | /blog/extincion-del-contrato-articulo-50 (nuevo) | /acoso-laboral/dejar-el-trabajo-por-acoso | Impagos como causa del art. 50 |
| /despido-improcedente-indemnizacion-no-readmision | Despido improcedente: indemnización por no readmisión | redirigir | /blog/indemnizacion-por-despido-improcedente-2026 | /blog/indemnizacion-por-despido-improcedente-2026 | Equivalente actualizado |
| /que-es-un-fraude-de-ley | Despacho Tierno Centella: en qué consiste el fraude de ley | retirar | /despido | /despido | Concepto genérico sin búsqueda laboral |
| /nuevos-permisos-maternidad-paternidad | Nuevos permisos de maternidad y paternidad | retirar | /blog | /blog | Permisos de 2019, caducados |
| /que-son-las-horas-complementarias | ¿Qué son las horas complementarias? | retirar | /blog | /blog | Laboral general fuera del foco |
| /que-es-un-falso-autonomo | ¿Qué es un falso autónomo? ¿Cómo saber si lo eres? | reescribir | /blog/falso-autonomo-como-saberlo (nuevo) | /empresas | Laboral con búsqueda constante; riesgo para empresas |
| /cambios-en-las-pensiones-para-2019 | Cambios en las pensiones para 2019 | retirar | /incapacidad-permanente | /incapacidad-permanente | Noticia de 2019, caducada |
| /permisos-matrimonio-pareja-hecho-mismos-derechos | Permisos por matrimonio o pareja de hecho: ¿Tienen los mismos derechos? | retirar | /blog | /blog | Permisos cambiados en 2023, desfasado |
| /periodo-baja-reclamar-vacaciones-no-disfrutadas | En un período de baja, ¿se pueden reclamar las vacaciones no disfrutadas? | fusionar | /blog/cuanto-cobras-de-baja-y-cuanto-dura (nuevo) | /incapacidad-permanente | Vacaciones y baja; apartado del artículo de baja |
| /aportaciones-voluntarias-a-centros-concertados | Aportaciones voluntarias a centros concertados | retirar | /empresas | /empresas | Tema educativo no laboral |
| /delegado-proteccion-de-datos | Delegado Protección de Datos | retirar | / | / | Protección de datos, fuera de especialidad |
| /magistral-exposicion-de-la-valoracion-de-los-danos-morales-por-perdida-de-calidad-de-vida-tras-las-secuelas-derivada-de-accidentes | Magistral exposición de la valoración de los daños morales por pérdida de calidad de vida tras las secuelas derivada de accidentes | retirar | / | / | Crónica de jornada sobre accidentes de tráfico |
| /casos-de-exito-de-nuestro-equipo-de-abogados-especialistas | Casos de éxito de nuestro equipo de abogados especialistas | reescribir | /blog/sentencias-ganadas-acoso-y-prevencion (nuevo) | /sentencias | Casos propios (60.000 euros a una aerolínea por acoso, prevención, contingencias); confirmar datos con el despacho |
| /cuales-son-las-cinco-modificaciones-principales-del-rd-ley-8-2019 | ¿Cuáles son las cinco modificaciones principales del RD-Ley 8/2019? | retirar | /blog | /blog | Norma de 2019, noticia caducada |
| /siete-aspectos-clave-real-decreto-ley-6-2019 | Siete aspectos claves del Real Decreto-Ley 6/2019, de 1 de marzo | retirar | /blog | /blog | Norma de 2019, noticia caducada |
| /reduccion-jornada-conciliacion-familiar-aspectos-clave | Aspectos clave de la reducción de jornada | reescribir | /blog/adaptacion-y-reduccion-de-jornada-para-conciliar (nuevo) | /blog | Laboral con búsqueda; prioridad baja, fuera del plan de 3 meses |
| /indemnizacion-despido-contrato-fijo-discontinuo | Indemnización por despido del contrato fijo discontinuo | fusionar | /blog/indemnizacion-por-despido-improcedente-2026 | /blog/indemnizacion-por-despido-improcedente-2026 | Apartado sobre fijos discontinuos |
| /derecho-reincorporacion-tras-excedencia | Derecho de reincorporación tras una excedencia | retirar | /despido | /despido | Laboral general fuera del foco |
| /sobre-los-efectos-de-las-clausulas-de-vencimiento-anticipado-de-las-hipotecas-tras-la-sentencia-del-tjue-de-26-de-marzo-de-2019 | Sobre los efectos de las cláusulas de vencimiento anticipado de las hipotecas tras la Sentencia del TJUE de 26 de marzo de 2019 | retirar | / | / | Hipotecas, fuera de especialidad |
| /quienes-estan-obligados-disponer-hojas-reclamaciones-2 | ¿Quiénes están obligados a disponer de hojas de reclamaciones? | retirar | / | / | Consumo, fuera de especialidad |
| /despido-excedencia-que-debes-saber | Despido durante la excedencia: Qué debes saber | fusionar | /despido/despido-nulo-cuando | /despido/despido-nulo-cuando | Despido en excedencia por cuidado: supuesto de nulidad |
| /descanso-semanal-del-trabajador | Descanso semanal del trabajador | retirar | /blog | /blog | Laboral general fuera del foco |
| /como-calcular-finiquito-que-corresponde | ¿Cómo calcular el finiquito que te corresponde? | redirigir | /blog/finiquito-firmar-no-conforme | /blog/finiquito-firmar-no-conforme | Equivalente |
| /la-baja-por-incapacidad-temporal-del-autonomo | La baja por incapacidad temporal del autónomo | fusionar | /blog/incapacidad-permanente-autonomos (nuevo) | /incapacidad-permanente | Autónomos de baja; apartado |
| /aspectos-real-decreto-ley-8-2019-de-8-de-marzo | 10 aspectos esenciales del Real Decreto-ley 8/2019, de 8 de marzo | retirar | /blog | /blog | Norma de 2019, noticia caducada |
| /cuentas-bancarias-gratuitas | ¿Cuentas bancarias gratuitas? | retirar | / | / | Bancario, fuera de especialidad |
| /novedade-declaracion-de-la-renta | Novedades de la Declaración de la Renta | retirar | / | / | Renta, fuera de especialidad |
| /que-debes-sabe-ley-1-2019-secretos-empresariales | Lo que debes saber sobre la Ley 1/2019 de Secretos Empresariales | retirar | /empresas | /empresas | Mercantil, fuera de especialidad |
| /ts-derecho-carrera-profesional-funcionarios-interinos-personal-laboral-temporal | El TS avala el derecho al régimen de carrera profesional de los funcionarios interinos y del personal laboral temporal | retirar | /blog | /blog | Noticia judicial caducada |
| /__trashed | 8 situaciones en las que la empresa tiene que dar días libres | retirar | /blog | /blog | URL rota de WordPress (permisos retribuidos, desfasado) |
| /cuanto-tiempo-puedo-estar-de-baja-en-el-trabajo-y-cuanto-voy-a-cobrar-mientras-lo-este | ¿Cuentas bancarias gratuitas? | fusionar | /blog/cuanto-cobras-de-baja-y-cuanto-dura (nuevo) | /incapacidad-permanente | La URL es buena pero hoy muestra el texto de cuentas bancarias (error de WordPress) |
| /confia-en-abogados-expertos-en-derecho-inmobiliario-para-comprar-tu-casa | Confía en abogados expertos en derecho inmobiliario para comprar tu casa | retirar | / | / | Inmobiliario, fuera de especialidad |
| /beneficios-los-servicios-juridicos-empresas-2 | Beneficios de los servicios jurídicos para empresas | redirigir | /empresas | /empresas | Servicios a empresas |
| /el-supremo-considera-que-las-cestas-de-navidad-son-un-derecho-adquirido-del-trabajador | El Supremo considera que las cestas de Navidad son un derecho adquirido del trabajador | retirar | /blog | /blog | Noticia judicial caducada |
| /baja-laboral-despacho-laboral-madrid | Condenan a la Generalitat a pagar las guardias a una funcionaria que estaba de baja laboral | retirar | /blog | /blog | Noticia judicial caducada (guardias de una funcionaria) |
| /trabajador-despido-provocado-no-tiene-derecho-a-indemnizacion | El trabajador que provoca su despido no tiene derecho a indemnización | fusionar | /blog/despido-disciplinario-que-hacer (nuevo) | /blog/audiencia-previa-despido-disciplinario | Despido provocado; apartado |
| /vacaciones-empresa-abogado-laborale-fijar-las-vacaciones-si-el-trabajador-las-elegia-antes | Pensando ya en las vacaciones... El TS falla que una empresa no puede fijar las vacaciones si el trabajador las elegía antes | retirar | /blog | /blog | Noticia judicial caducada |
| /el-preaviso-de-5-dias-para-cambiar-la-jornada-laboral-a-los-trabajadores-es-innegociable | El preaviso de 5 días para cambiar la jornada laboral a los trabajadores es innegociable | retirar | /blog | /blog | Noticia judicial caducada |
| /erte-ere-coronavirus-empresas | Sabes qué es un expediente de regulación temporal de empleo, más conocido como ERTE | retirar | /despido/despido-colectivo-ere-y-erte | /despido/despido-colectivo-ere-y-erte | ERTE del COVID, caducado |
| /cese-de-actividad-laboral-no-esencial-y-ultimas-novedades-en-los-ertes | Cese de actividad laboral 'no esencial' y últimas novedades en los ERTEs | retirar | /despido/despido-colectivo-ere-y-erte | /despido/despido-colectivo-ere-y-erte | ERTE del COVID, caducado |
| /erte-por-covid-19-y-ventajas-para-tu-empresa | ERTE por COVID-19, ventajas para tu empresa | retirar | /despido/despido-colectivo-ere-y-erte | /despido/despido-colectivo-ere-y-erte | ERTE del COVID, caducado |
| /cuando-se-puede-despedir-a-un-empleado-que-no-ficha | ¿Cuándo se puede despedir a un empleado que no ficha? | fusionar | /blog/despido-disciplinario-que-hacer (nuevo) | /blog/audiencia-previa-despido-disciplinario | No fichar como causa disciplinaria; apartado |
| /primer-despido-por-baja-medica-tras-el-fallo-del-tc | Primer despido por baja médica tras el fallo del TC | redirigir | /blog/despido-durante-la-baja-medica | /blog/despido-durante-la-baja-medica | Equivalente actualizado |
| /formas-de-ayudar-a-la-conciliacion-laboral-en-una-empresa | Formas de ayudar a la conciliación laboral en una empresa | fusionar | /blog/adaptacion-y-reduccion-de-jornada-para-conciliar (nuevo) | /blog | Mismo tema |
| /las-empresas-de-mas-de-50-empleados-deberan-contar-con-un-canal-de-denuncias | Canal de denuncias obligatorio para empresas de más de 50 empleados | reescribir | /blog/canal-de-denuncias-obligatorio-empresas (nuevo) | /empresas | Hoy es obligación legal (Ley 2/2023); servicio a empresas |
| /las-empresas-de-mas-de-50-empleados-deberan-contar-con-un-canal-de-denuncias-2 | Horas extras caen tras la entrada del registro obligatorio de jornada | retirar | /empresas | /empresas | URL duplicada con texto de horas extras y registro de jornada de 2019 |
| /como-presentar-en-un-erte-la-demanda-de-empleo-en-nombre-de-los-trabajadores | ¿Cómo presentar, en un ERTE, la demanda de empleo en nombre de los trabajadores? | retirar | /despido/despido-colectivo-ere-y-erte | /despido/despido-colectivo-ere-y-erte | ERTE del COVID, caducado |
| /prestacion-por-erte | ¿Cuándo se empezará a cobrar la prestación por ERTE? | retirar | /despido/despido-colectivo-ere-y-erte | /despido/despido-colectivo-ere-y-erte | ERTE del COVID, caducado |
| /como-saber-si-me-han-aprobado-el-paro-por-un-erte-5-sencillos-pasos | Cómo saber la duración del paro (por un ERTE) y su cuantía, en 5 paso | retirar | /despido/despido-colectivo-ere-y-erte | /despido/despido-colectivo-ere-y-erte | ERTE del COVID, caducado |
| /asi-son-las-fases-disenadas-por-el-gobierno-para-la-desescalada | Así son las fases diseñadas por el Gobierno para la desescalada | retirar | /blog | /blog | Noticia COVID caducada |
| /derecho-de-familia-en-tiempos-de-desescalada-del-covid-19 | Derecho de familia en tiempos de desescalada del COVID-19 | retirar | / | / | Familia, fuera de especialidad |
| /el-presente-y-futuro-proximo-de-los-arrendamientos-de-locales-de-negocio-tras-el-covid19 | El presente y futuro próximo de los arrendamientos de locales de negocio | retirar | / | / | Arrendamientos, fuera de especialidad |
| /sentencia-pionera-que-alienta-la-via-penal-por-la-desproteccion-de-los-sanitarios | Sentencia pionera que alienta la vía penal por desprotección de sanitarios | retirar | /blog | /blog | Sentencia COVID de 2020, caducada |
| /condiciones-especiales-ertes | Condiciones especiales que regirán los ERTEs hasta el 30 de septiembre | retirar | /despido/despido-colectivo-ere-y-erte | /despido/despido-colectivo-ere-y-erte | ERTE del COVID, caducado |
| /guia-sobre-las-principales-modificaciones-sobre-los-ertes | Guía sobre las principales modificaciones sobre los ERTEs | retirar | /despido/despido-colectivo-ere-y-erte | /despido/despido-colectivo-ere-y-erte | ERTE del COVID, caducado |
| /que-hacer-si-estoy-en-erte-y-ya-estoy-trabajando | ¿Qué hacer si estoy en ERTE y ya estoy trabajando? | retirar | /despido/despido-colectivo-ere-y-erte | /despido/despido-colectivo-ere-y-erte | ERTE del COVID, caducado |
| /medidas-cautelares-covid-plenilunio | Primeras medidas cautelares por el efecto COVID-19 | retirar | /blog | /blog | Noticia COVID caducada |
| /condena-a-banco-de-espana-por-no-atender-la-peticion-de-conciliacion-de-una-empleada | Condena a Banco de España por no atender la petición de conciliación de una empleada | fusionar | /blog/adaptacion-y-reduccion-de-jornada-para-conciliar (nuevo) | /blog | Ejemplo judicial de adaptación de jornada |
| /estudio-comparativo-de-acoso-laboral-espana-frente-a-francia | Estudio comparativo de Acoso Laboral, España - Francia | retirar | /acoso-laboral | /acoso-laboral | Estudio comparado sin búsqueda ni conversión |
| /acoso-laboral-o-mobbing | Acoso psicológico en el trabajo | redirigir | /acoso-laboral | /acoso-laboral | Ya en next.config |
| /perfiles-en-el-acoso | Perfiles en el acoso laboral | fusionar | /blog/perfil-del-acosador-laboral (nuevo) | /acoso-laboral/como-saber-si-sufro-acoso | Mismo tema |
| /el-acoso-y-la-prevencion-de-riesgos-laborales | El acoso y la prevención de Riesgos Laborales | reescribir | /blog/reclamar-por-falta-de-prevencion-de-riesgos-psicosociales (nuevo) | /acoso-laboral/que-puedo-reclamar | Vía fuerte del despacho: daños por no prevenir (caso URJC) |
| /como-identificar-el-mobbing-o-acoso-laboral | ¿Cómo identificar el acoso laboral o mobbing ? | redirigir | /acoso-laboral/como-saber-si-sufro-acoso | /acoso-laboral/como-saber-si-sufro-acoso | Equivalente |
| /abogados-expertos-en-derecho-inmobiliario | ¿Cuándo pueden ayudar los abogados expertos en derecho inmobiliario? | retirar | / | / | Inmobiliario, fuera de especialidad |
| /bendita-rendecion-la-mejor-guia-para-identificar-el-acoso-laboral | Bendita Rendeción, la mejor guía para identificar el acoso laboral | retirar | /acoso-laboral | /acoso-laboral | Reseña de un libro ajeno |
| /condena-prision-por-acoso-laboral-a-trabajador-del-ayuntamiento | Condena a alcalde a tres años de prisión por acoso laboral a un trabajador | redirigir | /acoso-laboral/acoso-laboral-como-delito | /acoso-laboral/acoso-laboral-como-delito | El caso de Castuera ya se comenta en la guía |
| /el-tjue-dice-que-las-guardias-no-presenciales-son-trabajo-si-impiden-al-empleado-organizar-su-tiempo-libre | El TJUE dice que las guardias no presenciales son trabajo | retirar | /blog | /blog | Noticia judicial caducada |
| /un-juez-anula-el-despido-de-una-trabajadora-de-un-supermercado-tras-denunciar-acoso-laboral | Un juez anula el despido de una trabajadora tras denunciar "acoso laboral" | redirigir | /despido/despido-nulo-cuando | /despido/despido-nulo-cuando | El caso de Córdoba ya se comenta en la guía |
| /despido-disciplinario-de-un-camarero-por-trabajar-en-otro-bar-durante-sus-vacaciones | Despido disciplinario por trabajar en otro bar durante sus vacaciones | fusionar | /blog/despido-disciplinario-que-hacer (nuevo) | /blog/audiencia-previa-despido-disciplinario | Ejemplo de causa disciplinaria |
| /ir-al-gimnasio-estando-de-baja-por-depresion-no-es-causa-de-despido | Ir al gimnasio estando de baja por depresión no es causa de despido | reescribir | /blog/que-puedes-hacer-estando-de-baja-por-ansiedad (nuevo) | /acoso-laboral/baja-por-ansiedad-por-acoso | Miedo muy común de la víctima de acoso de baja |
| /condenan-a-la-diputacion-de-huelva-por-despido-tras-20-contratos-temporales | Condenan a la Diputación de Huelva por hacer 20 contratos temporales | retirar | /despido | /despido | Noticia judicial caducada |
| /erte-rebrote-empresas-ocio-nocturno-turismo | ERTE por rebrote: para empresas de turismo y ocio nocturno afectados | retirar | /despido/despido-colectivo-ere-y-erte | /despido/despido-colectivo-ere-y-erte | ERTE del COVID, caducado |
| /el-tribunal-supremo-avala-un-despido-por-la-geolocalizacion-de-un-vehiculo-de-empresa | Geolocalización de vehículo de empresa: ¿razón de despido? El TS dice sí | fusionar | /blog/pruebas-de-la-empresa-en-un-despido (nuevo) | /sentencias#despido-prueba-gps | GPS como prueba; enlaza con el caso del despacho |
| /los-funcionarios-que-antes-eran-personal-laboral-han-de-cobrar-los-trienios-de-su-anterior-categoria-segun-el-tsjc | Los funcionarios que antes eran personal laboral han de cobrar los trienios | retirar | /blog | /blog | Noticia judicial caducada |
| /el-tsjc-ratifica-la-sentencia-que-obliga-a-nestle-a-reconocer-la-antiguedad-de-la-plantilla-fija-discontinua | Nestlé: El TSJC ratifica la sentencia contra la empresa | retirar | /blog | /blog | Noticia judicial caducada |
| /una-mujer-podra-adaptar-su-jornada-laboral-hasta-que-su-hijo-cumpla-14-anos | Una mujer podrá adaptar su jornada laboral para cuidar a su hijo | fusionar | /blog/adaptacion-y-reduccion-de-jornada-para-conciliar (nuevo) | /blog | Ejemplo judicial de adaptación de jornada |
| /el-ts-avala-los-erte-en-empresas-que-trabajan-para-la-administracion-publica | El TS avala los ERTE en empresas que trabajan para la Administración | retirar | /despido/despido-colectivo-ere-y-erte | /despido/despido-colectivo-ere-y-erte | ERTE del COVID, caducado |
| /un-erte-de-fuerza-mayor-no-esta-justificado-por-el-descenso-de-actividad-en-un-bufete-por-el-covid | Un ERTE de fuerza mayor no está justificado por el descenso de actividad | retirar | /despido/despido-colectivo-ere-y-erte | /despido/despido-colectivo-ere-y-erte | ERTE del COVID, caducado |
| /una-baja-medica-por-covid-no-se-equipara-a-accidente-laboral-o-enfermedad-profesional-para-cobrar-un-complemento-de-convenio | Una baja médica por Covid no se equipara a enfermedad | retirar | /blog | /blog | Noticia COVID caducada |
| /la-justicia-ve-improcedente-el-despido-de-quien-no-va-a-trabajar-por-miedo-a-la-covid-19 | Despido por no ir a trabajar por miedo a la COVID: ¿si o no? | retirar | /despido | /despido | Noticia COVID caducada |
| /las-tres-primeras-sentencias-sobre-ertes-por-fuerza-mayor-por-el-covid-en-navarra | Tres primeras sentencias sobre ERTES por fuerza mayor en Navarra | retirar | /despido/despido-colectivo-ere-y-erte | /despido/despido-colectivo-ere-y-erte | ERTE del COVID, caducado |
| /prorroga-hasta-junio-de-la-prestacion-especial-para-autonomos-y-los-erte-asi-son-las-condiciones | Prórroga hasta junio de la prestación especial para autónomos y los ERTE | retirar | /despido/despido-colectivo-ere-y-erte | /despido/despido-colectivo-ere-y-erte | ERTE del COVID, caducado |
| /el-tsj-de-madrid-avala-los-contratos-en-formacion-realizados-en-una-franquiciada-de-una-importante-red-de-agencias-inmobiliarias | El TSJ de Madrid avala los contratos en formación | retirar | /blog | /blog | Noticia judicial caducada |
| /un-juzgado-de-barcelona-admite-despido-por-covid | Despido por Covid: un juzgado de Barcelona lo admite como causa | retirar | /despido | /despido | Noticia COVID caducada |
| /el-derecho-de-una-trabajadora-a-cobrar-un-bonus | El supremo reconoce el derecho de una trabajadora de cobrar un bonus | retirar | /blog | /blog | Noticia judicial caducada |
| /primera-sentencia-que-declara-nulo-el-ere-de-una-empresa-que-podia-seguir-acogiendose-a-los-erte | Nulo el ERE de una empresa de hostelería | retirar | /despido/despido-colectivo-ere-y-erte | /despido/despido-colectivo-ere-y-erte | Noticia COVID caducada |
| /declaran-nulo-el-ere-de-alcoa-al-apreciar-mala-fe | Declaran nulo el ERE de Alcoa al apreciar mala fe | retirar | /despido/despido-colectivo-ere-y-erte | /despido/despido-colectivo-ere-y-erte | Noticia judicial caducada |
| /una-sentencia-reconoce-el-derecho-a-anular-vacaciones-coincidentes-con-el-estado-de-alarma | Derecho a anular vacaciones coincidentes con el estado de alarma | retirar | /blog | /blog | Noticia COVID caducada |
| /nueva-sentencia-el-descanso-tambien-es-trabajo | Nueva sentencia: el descanso también es trabajo | retirar | /blog | /blog | Noticia judicial caducada |
| /pueden-ayudarme-los-abogados-especializados-mobbing | ¿Cómo pueden ayudarme los abogados especializados en mobbing? | redirigir | /acoso-laboral | /acoso-laboral | Página comercial de acoso |
| /abogados-expertos-en-acoso-laboral-4 | ¿Por qué contratar abogados expertos en acoso laboral? | redirigir | /acoso-laboral | /acoso-laboral | Página comercial de acoso |
| /test-acoso-laboral-por-abogados-mobbing | Test Acoso Laboral por abogados expertos en Mobbing | redirigir | /herramientas/test-acoso | /herramientas/test-acoso | Ya en next.config |
| /primera-sentencia-que-obliga-al-acosador-laboral-a-pagar-a-la-victima | Primera sentencia que obliga al acosador laboral a pagar a la víctima | redirigir | /sentencias#primera-condena-al-acosador-2005 | /sentencias#primera-condena-al-acosador-2005 | Ya en next.config |
| /sentencia-sobre-acoso-laboral | Sentencia sobre acoso laboral | redirigir | /sentencias#acoso-administracion-educativa-castilla-y-leon-2011 | /sentencias#acoso-administracion-educativa-castilla-y-leon-2011 | Ya en next.config |
| /que-es-el-acoso-laboral-o-mobbing | Acoso Laboral o Mobbing: ¿Qué es? | redirigir | /acoso-laboral | /acoso-laboral | Equivalente: página principal de acoso |
| /como-identificar-el-mobbing | ¿Cómo identificar el mobbing? | redirigir | /acoso-laboral/como-saber-si-sufro-acoso | /acoso-laboral/como-saber-si-sufro-acoso | Equivalente |
| /las-conductas-de-acoso-prescriben | ¿Las conductas de acoso prescriben? | reescribir | /blog/plazo-para-denunciar-acoso-laboral (nuevo) | /herramientas/plazos | Duda urgente: cuánto tiempo hay para reclamar (1 año, penal, Administración) |
| /la-mediacion-en-el-acoso-laboral | La mediación en el Acoso Laboral | fusionar | /acoso-laboral/protocolo-de-acoso-que-exigir | /acoso-laboral/protocolo-de-acoso-que-exigir | La mediación es una fase del protocolo |
| /que-hacer-ante-una-situacion-de-acoso-laboral-o-mobbing | ¿Qué hacer ante una situación de acoso laboral o mobbing? | reescribir | /blog/que-hacer-si-sufres-acoso-laboral (nuevo) | /acoso-laboral | La búsqueda más urgente de acoso; artículo pilar de primeros pasos |
| /que-debe-de-hacer-una-empresa-ante-una-denuncia-de-mobbing | ¿Qué debe de hacer una empresa ante una denuncia de mobbing? | reescribir | /blog/empresa-recibe-denuncia-de-acoso-que-hacer (nuevo) | /empresas | Servicio a empresas con plazos y responsabilidad |
| /acoso-ascendente | Acoso Ascendente | fusionar | /blog/tipos-de-acoso-laboral (nuevo) | /acoso-laboral/como-saber-si-sufro-acoso | Apartado del artículo de tipos |
| /el-acoso-como-causa-de-incapacidad | El acoso como causa de incapacidad | reescribir | /blog/acoso-laboral-accidente-de-trabajo (nuevo) | /acoso-laboral/baja-por-ansiedad-por-acoso | Determinación de contingencia: más prestación y vía hacia la incapacidad |
| /como-enfrentar-el-mobbing-laboral | ¿Cómo enfrentar el mobbing laboral? | fusionar | /blog/que-hacer-si-sufres-acoso-laboral (nuevo) | /acoso-laboral | Mismo tema |
| /demostrar-mobbing | ¿Cómo demostrar mobbing laboral? 5 formas | redirigir | /acoso-laboral/como-demostrar-el-acoso | /acoso-laboral/como-demostrar-el-acoso | Ya en next.config |
| /baja-por-depresion-lo-que-necesitas-saber | Baja por depresión, lo que necesitas saber | redirigir | /acoso-laboral/baja-por-ansiedad-por-acoso | /acoso-laboral/baja-por-ansiedad-por-acoso | Ya en next.config |
| /acto-de-conciliacion-laboral | Acto de Conciliación Laboral | reescribir | /blog/papeleta-de-conciliacion-smac-despido (nuevo) | /despido/plazo-para-reclamar-despido | Paso obligatorio tras el despido; búsqueda práctica frecuente |
| /5-preguntas-frecuentes-sobre-los-ertes | 5 preguntas frecuentes sobre los ERTEs, que debes conocer | retirar | /despido/despido-colectivo-ere-y-erte | /despido/despido-colectivo-ere-y-erte | ERTE del COVID, caducado |
| /derecho-laboral-abogados-expertos-en-incapacidad-permanente | Abogados expertos en incapacidad permanente | redirigir | /incapacidad-permanente | /incapacidad-permanente | Página comercial de incapacidad |
| /caracteristicas-del-acoso-horizontal-trabajo | Características del acoso horizontal en el trabajo | redirigir | /acoso-laboral/acoso-horizontal-entre-companeros | /acoso-laboral/acoso-horizontal-entre-companeros | Equivalente |
| /iniciar-expediente-incapacidad-permanente | ¿Cómo iniciar un expediente de Incapacidad Permanente? | fusionar | /blog/como-solicitar-la-incapacidad-permanente (nuevo) | /incapacidad-permanente | Mismo tema |
| /10-beneficios-sociales-de-la-incapacidad-permanente | 10 beneficios sociales de la Incapacidad Permanente | reescribir | /blog/ventajas-de-la-incapacidad-permanente (nuevo) | /incapacidad-permanente/grados-de-incapacidad-permanente | Búsqueda informativa con volumen; prioridad media |
| /testimonial-incapacidad-permanente | ¿Cómo solicitar las Incapacidad Permanente? Tierno Centella | fusionar | /blog/como-solicitar-la-incapacidad-permanente (nuevo) | /incapacidad-permanente | Testimonio de una clienta; usar solo con su consentimiento |
| /requisitos-cobrar-dos-pensiones-de-incapacidad | ¿Sabes los requisitos para poder cobrar dos pensiones de incapacidad? | fusionar | /incapacidad-permanente/grados-de-incapacidad-permanente | /incapacidad-permanente/grados-de-incapacidad-permanente | Compatibilidad de pensiones; apartado de la guía |
| /indemnizacion-por-acoso-laboral-la-cuantia | Indemnización por acoso laboral: la cuantía | redirigir | /acoso-laboral/que-puedo-reclamar | /acoso-laboral/que-puedo-reclamar | Ya en next.config |
| /despido-improcedente | ¿Qué hacer ante un despido improcedente? | redirigir | /despido | /despido | Ya en next.config |
| /tipos-de-despido | ¿Sabías que hay diferentes tipos de despido? | redirigir | /despido/tipos-de-despido | /despido/tipos-de-despido | Ya en next.config |
| /campana-de-la-direccion-general-de-la-inspeccion-de-trabajo-y-seguridad-social-para-el-control-de-jornadas-de-trabajo | Campaña de la Dirección General de la Inspección de Trabajo y SS | retirar | /empresas | /empresas | Campaña de 2021, caducada |
| /la-investigacion-privada-como-prueba-en-el-ambito-laboral | La Investigación privada como prueba en el ámbito laboral | reescribir | /blog/pruebas-de-la-empresa-en-un-despido (nuevo) | /sentencias#despido-prueba-gps | Detective, cámaras y GPS: dudas del despedido; caso y vídeo propios |
| /protocolo-inspectores-y-tipos-de-incapacidad | ¿Cómo son el protocolo y las incapacidades de los inspectores? | fusionar | /blog/tribunal-medico-evi-que-esperar (nuevo) | /incapacidad-permanente/reclamacion-previa-y-demanda | Inspección médica; apartado |
| /derecho-a-publicar-las-imagenes-de-nuestros-hijos-en-internet | ¿Tenemos derecho a publicar las imágenes de nuestros hijos en Internet? | retirar | / | / | Familia, fuera de especialidad |
| /cual-es-procedimiento-para-la-tramitacion-de-un-erte-por-fuerza-mayor-covid-19 | ¿Cuál es procedimiento para la tramitación de un ERTE por fuerza mayor (COVID-19)? | retirar | /despido/despido-colectivo-ere-y-erte | /despido/despido-colectivo-ere-y-erte | ERTE del COVID, caducado |
| /permiso-retribuido-recuperable | Permiso retribuido recuperable. Resolvemos tus dudas | retirar | /blog | /blog | Medida COVID de 2020, caducada |
| /el-tsjpv-reconoce-como-accidente-laboral-la-baja-por-ansiedad-de-un-profesor | El TSJPV reconoce como accidente laboral la baja laboral por ansiedad | fusionar | /blog/acoso-laboral-accidente-de-trabajo (nuevo) | /acoso-laboral/baja-por-ansiedad-por-acoso | Ejemplo judicial de contingencia profesional por ansiedad |
| /la-responsabilidad-patrimonial-de-la-administracion-y-perdida-de-oportunidad-en-la-crisis-del-coronavirus | Responsabilidad patrimonial de la administración y pérdida de oportunidad en la crisis del coronavirus | retirar | /blog | /blog | Artículo COVID de 2020, caducado |
| /permiso-retribuido-recuperable-todas-las-respuestas-para-empleados-y-empresas | Permiso retribuido recuperable: todas las respuestas para empleados y empresas | retirar | /blog | /blog | Medida COVID de 2020, caducada |
| /tsjcyl-reconoce-los-trienios-como-personal-laboral-de-un-empleado-funcionario | Los trienios como personal laboral de un empleado funcionario | retirar | /blog | /blog | Noticia judicial caducada |
| /sentencia-no-se-pueden-cambiar-las-condiciones-laborales-de-los-trabajadores-por-la-pandemia-de-covid | No se pueden cambiar las condiciones de los trabajadores por Covid | retirar | /blog | /blog | Noticia COVID caducada |
| /nueva-sentencia-de-un-juzgado-de-barcelona-donde-declara-nulo-un-despido-causado-por-la-crisis-del-covid | Nueva sentencia donde se declara nulo un despido causado por el Covid | retirar | /despido/despido-nulo-cuando | /despido/despido-nulo-cuando | Noticia COVID caducada |
| /incapacidad-permanente-y-enfermedades-mentales | Incapacidad permanente y enfermedades mentales | redirigir | /blog/incapacidad-permanente-por-ansiedad-o-depresion | /blog/incapacidad-permanente-por-ansiedad-o-depresion | Equivalente actualizado |
| /como-denunciar-a-un-companero-por-acoso-laboral | Cómo denunciar a un compañero por acoso laboral | reescribir | /blog/como-denunciar-acoso-laboral (nuevo) | /acoso-laboral | Búsqueda urgente de alto volumen; vías interna, Inspección, juzgado y penal |
