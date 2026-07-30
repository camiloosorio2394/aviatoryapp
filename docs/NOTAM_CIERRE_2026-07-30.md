# Cierre del módulo NOTAM

Rama `fix/notam-cierre`, sobre `main` en `82bda3b` (PR #84).
Fecha: 30 de julio de 2026.

Este documento responde al encargo de verificar y completar el módulo NOTAM contra
los tres criterios de aceptación: imágenes, orden del aprendizaje e integración con
Supabase.

---

## 1. Checklist

| # | Punto | Resultado | Evidencia |
|---|---|---|---|
| 1 | Las 14 imágenes existen y viajan al build | **Pasa** | Los 14 nombres de `src/data/notam/notams_nacionales.json` coinciden uno a uno con `public/notams/` y con `dist/notams/` tras `npm run build`. Cero faltantes, cero huérfanos. |
| 2 | Las 14 imágenes quedan disponibles sin red | **Pasa** | Las 14 aparecen en el manifiesto de precarga de `dist/sw.js` (43 entradas en total), como `notams/notam_*.png`. |
| 3 | Hay respaldo visible cuando una imagen no carga | **Pasa** | `NotamImage` en `src/pages/NotamPractice.tsx`: `onError` cambia a estado `falló` y pinta la transcripción en monoespaciada con el aviso de que no se pudo mostrar el recorte. |
| 4 | Hay estado de carga de imagen | **Pasa** | Mismo componente: capa con `animate-pulse` sobre la proporción reservada, más un chequeo de `img.complete` en el `ref` para las imágenes que ya vienen de caché. |
| 5 | El zoom funciona en escritorio y en celular | **Pasa en código, falta prueba visual** | El modal pasó de un solo nivel a tres: ajustar al ancho, tamaño real (1875 px) y el doble, más `touch-action: pinch-zoom`. Abre siempre en "ajustar al ancho". |
| 6 | Sin scroll horizontal de página a 375 px | **Pasa en código, falta medición** | La imagen ancha vive dentro de un contenedor con `overflow-x-auto`, que no aporta ancho mínimo a la grilla, y se agregó `min-w-0` en el contenedor de la tarjeta. Cero `gridTemplateColumns` en línea en todo el proyecto. |
| 7 | La lección cubre el temario completo en orden | **Pasa** | `src/lib/notamLesson.ts`: 13 secciones en el orden del temario. El mapeo punto por punto está en el encabezado del archivo. |
| 8 | SNOWTAM y ASHTAM desarrollados y en su lugar | **Pasa** | Sección 12, después de la lectura paso a paso. Salieron de la lista clave-valor de la sección 2. Cada uno con qué informa, sus datos centrales, su validez máxima y un ejemplo de formato campo por campo. |
| 9 | Ítems A) a G) explicados uno por uno | **Pasa** | Sección 7, seis minutos de lectura. Cada ítem con su bloque: A) indicadores, B) y C) con el grupo de 10 dígitos, `PERM`, `EST`, `UFN` y `WIE`, D) con el horario diario, E) con la coherencia contra el código Q, F) y G) con `GND`, `SFC` y `UNL`. |
| 10 | Abreviaturas OACI presentes en la lección | **Pasa** | Sección 9: 26 abreviaturas agrupadas en lugares, estado, tiempo y distancias declaradas. No duplica las 246 entradas de códigos ni el glosario completo, que siguen en el Decodificador. |
| 11 | El denominador del progreso deja de estar fijo | **Pasa** | `TOTALS.lessonScreens` pasó de `9` fijo a `LESSON_TOTAL`, derivado de `LESSON_SCREENS.length` (`src/lib/notam.ts`). |
| 12 | El progreso de la lección se recupera desde la base | **Pasa en código, falta prueba con sesión** | `NotamLesson.tsx` ahora consulta `user_notam_progress` al montar. Antes solo leía `localStorage`, así que en otro dispositivo la lección aparecía sin leer. |
| 13 | El progreso de práctica se recupera desde la base | **Pasa** | Ya lo hacía; ahora usa el mismo helper compartido `fetchNotamProgress`. |
| 14 | Lo estudiado sin sesión se sube al iniciar sesión | **Pasa en código, falta prueba con sesión** | `pushPendingLocalProgress` en `src/lib/notamProgress.ts`, llamado desde el hub, la lección y la práctica. Manda solo lo que falta contra el estado remoto, en tandas de 6. |
| 15 | El examen guarda `total_questions = 20`, `score` y `passed` correctos | **Pasa por lectura de código** | `NotamExam.tsx` inserta `total_questions = questions.length` (20 de `buildExam()`), `score = correctas x 5` y `passed = score >= 80`. Coincide con el esquema. |
| 16 | El intento no se guarda dos veces | **Pasa** | El guard salió de `Result`, que se desmonta con la fase, y vive en `NotamExam`, que no. Se libera en `start()`, que es un intento nuevo. |
| 17 | Las dos tablas existen en producción con RLS activo | **Pasa, verificado contra la base real** | `select` con la clave pública y sin sesión devuelve `[]` en las dos tablas: existen y RLS filtra. |
| 18 | Un usuario no puede escribir filas de otro | **Pasa para el caso anónimo** | `insert` con la clave pública y `user_id` ajeno devuelve `401` con `42501`, "new row violates row-level security policy", en las dos tablas. |
| 19 | La RPC `notam_mark_progress` no tiene `EXECUTE` para `anon` | **Pasa, verificado contra la base real** | Llamada con la clave pública: `401`, `42501`, "permission denied for function notam_mark_progress". |
| 20 | Aislamiento entre dos usuarios autenticados | **Sin probar** | Requiere dos sesiones reales. Ver hallazgo 3.1. |
| 21 | `tsc` sin errores | **Pasa** | `npx tsc -p tsconfig.app.json --noEmit`: salida vacía, código 0. |
| 22 | `npm run build` sin errores | **Pasa** | Build completo, service worker generado, 43 entradas de precarga. |
| 23 | `eslint` sin errores nuevos | **Pasa** | En los ocho archivos del módulo: 0 errores, 1 aviso previo (`NotamExam.tsx:536`, `refreshKey`). En todo el proyecto quedan 22 errores, todos en `Login.tsx` y `Profile.tsx`, ninguno tocado en esta rama. |
| 24 | Barrido de convenciones | **Pasa** | Cero guiones largos en texto visible de los archivos del módulo, cero `gridTemplateColumns` en el proyecto, cero hex crudos en los archivos del módulo. |

Nota sobre `tsc`: la primera corrida falló por `@vercel/analytics/react`, que entró en el
PR #81 y no estaba instalado en esta copia. Se resolvió con `npm install`, sin tocar
`package.json`.

---

## 2. Cambios

### Contenido de la lección

- **`src/lib/notamLesson.ts`**: reordenado de 9 a 13 secciones siguiendo el temario. Se
  agregaron tres unidades nuevas: los tipos NOTAMN, NOTAMR y NOTAMC como sección propia
  (antes eran tres viñetas dentro de "anatomía del formato"), los ítems A) a G) uno por
  uno, y las abreviaturas OACI. SNOWTAM y ASHTAM se sacaron de la sección 2, donde
  aparecían como dos entradas de una lista antes de que el alumno supiera qué es una
  casilla, y pasaron a la sección 12 con desarrollo y ejemplo de formato.
- **`src/lib/notamLesson.ts`**: se exporta `LESSON_TOTAL` para que el denominador del
  progreso salga del contenido y no de un número escrito a mano.
- Los ejemplos de formato de SNOWTAM y ASHTAM se armaron como bloques clave-valor y no
  como texto preformateado alineado con espacios: en un ancho de celular el bloque
  preformateado se parte y la alineación deja de significar nada.
- Se agregó el Anexo 15 a la lista de fuentes, porque las dos series especiales salen de
  ahí y no del Doc 8400.

### Interfaz

- **`src/pages/NotamPractice.tsx`**: nuevo componente `NotamImage` con los tres estados
  reales de una imagen. Antes no había ni `onError` ni estado de carga: si un PNG faltaba,
  el usuario veía un recuadro blanco vacío sin explicación.
- **`src/pages/NotamPractice.tsx`**: el modal de ampliación pasó de un solo nivel fijo de
  1100 px, que en celular obligaba a arrastrar dentro del modal antes de ver nada, a tres
  niveles con control visible.
- **`src/pages/NotamLesson.tsx`**: el índice cierra con "Práctica y evaluación", que lleva
  al bloque final del documento. Los dos últimos pasos del temario no son lectura, pero el
  recorrido completo tiene que verse.
- **`src/pages/Notam.tsx`**: el hub decía "pantallas" en cuatro lugares. La lección dejó de
  ser un asistente de pantallas en el PR #84: ahora dice "secciones".

### Datos

- **`src/lib/notamProgress.ts`** (nuevo): capa única de progreso. `fetchNotamProgress`,
  `markNotamProgress` y `pushPendingLocalProgress`. El hub, la lección y la práctica hacían
  cada uno su propia consulta y su propia llamada a la RPC.
- **`src/pages/NotamLesson.tsx`**: hidrata lo leído desde `user_notam_progress` al montar.
  Este era el hueco de fondo: el progreso no persistía de verdad entre sesiones para la
  pantalla de la lección.
- **`src/pages/NotamLesson.tsx`**, **`Notam.tsx`**, **`NotamPractice.tsx`**: suben a la base
  lo que se estudió sin sesión. Antes el hub unía los dos orígenes solo para mostrarlos, y
  lo local se perdía al cambiar de dispositivo.
- **`src/lib/notam.ts`**: `TOTALS.lessonScreens` derivado de `LESSON_TOTAL`.
- **`src/pages/NotamExam.tsx`**: el guard del guardado del intento subió de `Result` a
  `NotamExam`.

No se tocó el esquema de la base: no hizo falta ninguna migración nueva.

---

## 3. Hallazgos sin resolver

### 3.1 Aislamiento entre dos usuarios autenticados, sin probar. Severidad media

Lo verificado contra la base real cubre al usuario anónimo: no puede leer ni escribir en
ninguna de las dos tablas, y no puede llamar a la RPC. Falta la prueba con dos sesiones
reales, que es la que descarta una política mal escrita del tipo `using (true)`.

Las políticas declaradas en `20260730060000_notam_module.sql` son `auth.uid() = user_id`
en los cuatro casos, así que el riesgo real es bajo, pero declarado no es lo mismo que
probado y esta verificación se pidió explícitamente.

Para cerrarlo hacen falta dos cuentas de prueba. Se puede hacer en dos minutos con dos
sesiones abiertas en la app.

### 3.2 La renumeración de secciones desplaza el progreso ya guardado. Severidad baja

`user_notam_progress.lesson_screens` guarda índices. Al pasar de 9 a 13 secciones, quien
ya había leído las 9 ahora ve 9 de 13, y los índices 3 a 9 apuntan a contenido distinto
del que leyó.

No hay pérdida de datos y el número que se muestra es honesto. Como el módulo se publicó
hoy, el universo afectado es prácticamente nadie. Cerrarlo del todo requeriría una
migración de mapeo, que cuesta más de lo que arregla.

### 3.3 La subida del progreso local hace una llamada por ítem. Severidad baja

`pushPendingLocalProgress` llama a la RPC una vez por sección y una vez por ejercicio. En
el peor caso, alguien que estudió el módulo entero sin cuenta y después se registra
dispara 43 llamadas, en tandas de 6.

Pasa una sola vez por usuario y no bloquea la interfaz. La solución limpia es que
`notam_mark_progress` acepte arreglos, lo que implica una migración nueva. No se hizo
porque esta sesión no tiene credenciales para aplicar migraciones en producción, y dejar
una migración escrita pero sin aplicar es peor que no tenerla. Ojo con la trampa conocida:
`create or replace function` restaura el `EXECUTE` a `PUBLIC`, así que quien la haga tiene
que repetir el `revoke` y el `grant`.

### 3.4 El intento de examen no se reintenta si la red falla. Severidad baja

Si el `insert` falla, el guard ya está puesto y no hay reintento: la pantalla queda en
estado de error y el intento se pierde. El respaldo local sí guarda el mejor puntaje, así
que el hub no miente. Un botón de reintentar el guardado lo cerraría.

### 3.5 Marcar leída una sección al pasar por ella. Severidad baja

El `IntersectionObserver` marca la sección cuando entra en la franja superior de la
pantalla, no cuando se termina de leer. Con las secciones nuevas más largas (la 7 y la 12),
bajar rápido marca leído sin haber leído. Es una decisión de producto del PR #84, no un
error, pero ahora pesa más.

### 3.6 Verificación visual pendiente. Severidad media

Las cuatro pantallas del módulo están detrás de `RequireAuth`, y esta sesión no puede
iniciar sesión. Quedan sin comprobar en el navegador: que las 14 imágenes se vean, que el
esqueleto y el respaldo se pinten bien, que el zoom de tres niveles funcione con el dedo,
y que no haya scroll horizontal de página a 375 px en las cuatro pantallas.

Todo eso está resuelto en código y razonado, pero no medido. Con una sesión abierta son
diez minutos.

---

## 4. Recomendación

**El módulo NOTAM está listo para cerrarse, con una condición: hay que pasarle los diez
minutos de verificación visual con sesión iniciada y la prueba de RLS con dos usuarios.**

Los tres criterios están cubiertos. El criterio A pasó de no tener manejo de error ni
estado de carga a tenerlos, y el zoom dejó de ser inusable en celular. El criterio B pasó
de un temario con tres huecos (tipos sin unidad propia, ítems sin desarrollo, abreviaturas
ausentes) y dos series especiales mal ubicadas, a las 13 secciones en el orden pedido. El
criterio C cerró el hueco de fondo: el progreso de la lección no persistía entre
dispositivos, y lo estudiado sin cuenta se perdía al registrarse.

La integración con Supabase está verificada contra la base real, no solo leída del archivo
de migración: las dos tablas existen, RLS está activo y bloquea al anónimo en lectura y en
escritura, y la RPC no es ejecutable por `anon`. La migración está aplicada en producción.

Lo que falta no es trabajo de código, es tiempo de alguien con sesión. Estimo diez minutos
para lo visual y dos para el RLS. Nada de lo pendiente tiene pinta de destapar un problema
de fondo: son confirmaciones.
