# Web de Tierno Centella: tablón para los chats de Claude

Lee esto antes de tocar nada. La web es la demostración que Ig le prepara a Jesús Tierno (despacho laboralista); la guía es /guia-jesus y la mesa de control /mesa-tc-6v9k3p.

## Reglas
- `git pull --rebase` antes de empezar y antes de subir. `npx tsc --noEmit` limpio antes de subir.
- Versión (pildorita) en `lib/version.ts`; se ve en la franja de arriba de la mesa. Súbela en cada cambio que haya que comprobar.
- La mesa NO se edita a mano: `python3 scripts/copiar-mesa.py ../reformadisimo-web ../casiopea360` copia la de Reformadísimo, le pone los textos de un despacho (`scripts/textos_mesa_tierno.py`) y le añade lo que la de Casiopea lleva por delante (`scripts/parches_casiopea.py`). Después, regenerar `app/mesa-tc-6v9k3p/mesa.css` con Tailwind 3.4 (important "#mesa-rd", sin preflight).
- Textos: tuteo, cero emojis, sin guiones largos. La primera consulta cuesta 150 € + IVA: nunca "gratis".

## Avisos
- 31-oct-2026 (chat de Ig, tc·v1): la mesa es la misma que las de Reformadísimo y Casiopea. Fechas siempre a la vista en el recuadro morado «¿Qué días quieres ver?» (sin la fila de píldoras repetida), panel «Quién entra de verdad en la web» con 7 cifras (personas, visitas, páginas, tiempo medio por persona, rebote, páginas por persona, Analytics) y tabla por origen con tiempo y rebote, arranque en «Hoy» mientras no haya días anteriores con datos, ayuda corta con «Ver más», tarjeta «Visitas a la web (Analytics)».
- 31-oct-2026 (chat de Ig, tc·v1): contador propio sin cookies como el de Casiopea: `components/ContadorVistas.tsx` (en el layout; no cuenta la mesa, la guía de Jesús, el CRM ni las conversaciones) manda a `/api/vista` y `/api/tiempo` (filtro de robots y freno en `lib/contador.ts`), tablas `vistas` y `tiempos` (`lib/db.ts`, driver `@neondatabase/serverless`). SIN BASE DE DATOS TODO QUEDA QUIETO: falta que Ig cree en Vercel > Storage una base Neon gratis para el proyecto tierno-centella-web (variable DATABASE_URL). Con ella, las visitas de la mesa pasan a ser reales (`lib/visitasReales.ts`, en la página de la mesa y en `/api/mesa-demo`) y lo demás sigue de ejemplo.
- 31-oct-2026 (chat de Ig): `scripts/parches_casiopea.py` corrige el redondeo del tiempo («1 min 60 s» con 119,6 s); en las mesas de Reformadísimo y Casiopea sigue el fallo.
- 31-oct-2026 (chat de Ig): decidido NO crear la base de datos de Tierno Centella hasta saber si Jesús contrata. El contador sigue montado y quieto; la mesa sigue entera con cifras de ejemplo.
- 31-oct-2026 (chat de Ig, tc·v2): mesa, tabla «Cada canal, de un vistazo»: columnas «Visitas (Analytics)» y «Rebote (Analytics)» y aviso corto «OJO: las visitas y el rebote de esta tabla son de Analytics…». Son dos contadores distintos: arriba, «Quién entra de verdad» (contador propio, todos); aquí, Analytics (solo quien acepta cookies, más o menos 1 de cada 10). Va como paso 5 de `scripts/parches_casiopea.py`, así sobrevive a la copia. OJO: «Visita a contacto» divide contactos entre visitas de Analytics y sale inflada; sin cambiar hasta que Ig decida (y sin base de datos aquí no hay visitas propias con las que dividir).

## Pendiente para cuando Jesús contrate (junto con crear la base de datos)
- Prompt de Reformadísimo del 31-oct-2026 (noche), «avisos con origen y clics en WhatsApp y llamar»:
  1. Todos los avisos de contacto con la línea «De dónde viene» (también «directo o sin dato»): `lib/atribucion.ts` apunta `directo` y la página de entrada (`aterrizaje`), guardado en la pestaña (sessionStorage); `/api/contacto` y `/api/reservar` pintan siempre esa línea («sin dato» si falta). Hoy la línea «Origen» del aviso solo dice de qué formulario viene.
  2. Pasos de la visita: `/api/evento` con tabla propia `pasos_visita` (NUNCA `eventos`), tipos `interes60`, `form_empezado`, `contacto_wa` y `contacto_tel` (una vez por visita, marcas en sessionStorage), y en la mesa las columnas «Empiezan formulario» y «WhatsApp y llamadas» en «Quién entra de verdad». Modelo: commits 2163c0b, 9f0b5f4 y 058cbb5 de reformadisimo-web.
  3. Copiar también las FECHAS RECOLOCADAS de la mesa de Reformadísimo (recuadro morado después de «Las tres preguntas del dueño», con «Más opciones»).
