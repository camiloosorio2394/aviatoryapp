# Módulo «Aeropuertos» · estado del trabajo

**Para quien retome esto** (incluida una sesión futura de Claude Code que
arranque sola): este archivo dice qué está hecho y qué sigue. Actualízalo al
terminar cada paso.

## Qué es

Módulo nuevo de «Ingreso a aerolínea»: 22 lecciones en 5 niveles, con el lector
compartido (`LectorLeccion`), entrevista de 15 preguntas al cierre de cada nivel
y un catálogo visual de 177 fichas. **Es un módulo visual**: texto corto y 231
huecos de imagen rotulados que Camilo va a ir llenando.

**La norma es solo OACI**: Anexo 14 Vol. I, 9.ª edición (2022) con la Enmienda
18, aplicable desde el 27-nov-2025. Nada de FAA, nada de RAC como base.

## El material ya está escrito y verificado

Todo está en el scratchpad de la sesión del 15-sep-2026:
`C:\Users\HP\AppData\Local\Temp\claude\C--Datos-Documents\44b2c2cc-163f-4c83-a128-00ce71cd78bb\scratchpad\aeropuertos\`

- `BRIEF-AEROPUERTOS.md`: el documento completo (7.900 líneas), que es la fuente
  para escribir el contenido.
- `brief-nivel1.md` … `brief-nivel5.md`: el texto de cada lección y la ficha de
  cada hueco, con sus ocho campos.
- `brief-catalogo.md`: las 177 fichas del catálogo.
- `inventario-*.md`: los siete inventarios verificados contra la norma.
- Copia de seguridad del brief dentro del repo: `docs/BRIEF_AEROPUERTOS.md`.

## Decisiones tomadas por Camilo

1. Solo OACI.
2. Los puntos de espera se dibujan con los patrones anchos **A2 y B2**.
3. Texto mínimo: 120 a 160 palabras por lección. Si algo necesita más texto, es
   que falta una imagen.
4. Ninguna pregunta dentro de una lección. Las quince van en la entrevista del
   nivel.
5. Empezar por el nivel 2, pero dejar los cinco niveles rotulados.

## Plan, en orden

- [x] **1. Infraestructura.** `src/lib/aeropuertos.ts` (rutas, niveles, totales),
      tema del módulo en `src/index.css`, página del lector
      `src/pages/AeropuertosLeccion.tsx`, hub `src/pages/Aeropuertos.tsx`, rutas
      en `src/App.tsx` y tarjeta en `src/pages/AirlinePrep.tsx`.
- [x] **2. Progreso.** Tabla, RPC, catálogo de contenido, logros, panel y la
      puerta de la evaluación del lado del servidor. El SQL está escrito y **no
      aplicado**: ver abajo.
- [x] **2-bis. Práctica, evaluación, catálogo y hub**, con el espacio del video.
- [x] **2-ter. Migración de progreso.** `src/lib/aeropuertosProgress.ts` sobre el
      progreso común, con el respaldo local en `src/lib/aeropuertos.ts`, y el SQL
      en `supabase/migrations/20260916000000_progreso_de_aeropuertos.sql`. **La
      migración no se aplica: se le entrega para que la corra él.**
- [x] **3. Nivel 2** (lecciones 05 a 08, 31 huecos) desde `brief-nivel2.md`.
- [x] **4. Nivel 1** (01 a 04, 28 huecos).
- [x] **5. Nivel 3** (09 a 12, 31 huecos).
- [x] **6. Nivel 4** (13 a 17, 37 huecos).
- [x] **7. Nivel 5** (18 a 22, 35 huecos).
- [x] **8. Entrevistas** de los cinco niveles en `aeropuertosLeccion/entrevistas.ts`.
- [x] **9. Catálogo visual**, con su componente.
- [x] **9b. Evaluación.** Banco de 60 preguntas en
      `contenido/bancos/aeropuertos_evaluacion.json`, pantalla
      `src/pages/AeropuertosExam.tsx` sobre `ExamenModulo`, ruta
      `/app/aerolinea/aeropuertos/evaluacion` y la migración
      `supabase/migrations/20260915230000_evaluacion_de_aeropuertos.sql`.
      **La migración no está aplicada**: ver la sección de abajo.
- [x] **10. Comprobar**: `npx tsc -b`, `npx eslint`, `npx vite build`, y ver el
      módulo en el navegador.
- [x] **11. Commit y push**, con rutas explícitas (hay otras sesiones sobre la
      misma carpeta).

## Cómo se escribe cada lección

Como en Mercancías: un `DocScreen` por lección con sus bloques. El hueco va así,
y el rótulo lleva el código y la medida, que es lo que Camilo ve en pantalla:

```ts
{
  kind: "hueco",
  rotulo: "AP-07-03 · Fotografía · 3:2 · 1200×800",
  descripcion: "Lo que tiene que mostrar, tomado del brief.",
  alto: 280,
}
```

Las fichas con imagen usan `kind: "fichas"` con `hueco` en cada item, igual que
la sección 3 de Mercancías.

## Reglas que no se pueden saltar

- Nada de rayas largas en el contenido.
- Sin citas de artículos en el texto.
- Ninguna imagen con patrón A1 ni B1.
- Las líneas continuas del punto de espera van **del lado de espera**; las de
  trazos miran a la pista. Verificado en la Figura 5-6 del Anexo 14.
- No aplicar migraciones a la base: el SQL se le entrega a Camilo.
- `git add` con rutas explícitas, nunca `-A`.

## Lo que le queda por correr a Camilo

Revisado y probado el 24-sep-2026. Nada de esto está aplicado en producción
(`gvwqmfxphsbmbrhyjcmk`). Van **en este orden y de una sentada**, cada paso en
**su propia ejecución** del SQL Editor (el editor corre cada ejecución en una
sola transacción, así que si algo falla no queda nada a medias).

### Lo que encontró la revisión

- **Hay cuatro migraciones más sin aplicar, de otro trabajo, y la de progreso
  depende de ellas**: las tres de postulaciones (`20260915120000`,
  `20260915120500`, `20260915121000`) y `20260915140000_panel_completo`. La
  de progreso de Aeropuertos reescribe `panel_tarjetas` entera y la primera
  versión la copiaba **sin `plan` ni `postulaciones`**, que el cliente ya lee
  (`src/services/panel.ts`). Aplicadas las dos, la que corriera última borraba
  lo de la otra. Se corrigió: la versión de Aeropuertos es ahora la de
  `panel_completo` más la tarjeta del módulo, y por eso va después.
- **Aerodinámica sí está aplicada** en producción (tablas, catálogo, banco de
  40, logros, disparadores y las ramas en las funciones compartidas), pero
  **sin fila en `supabase_migrations.schema_migrations`**: se corrió desde el
  editor, que no registra. Las funciones que la migración de Aeropuertos
  reemplaza (`secciones_leidas`, `practicas_hechas`, `desbloquear_logros`,
  `check_and_unlock_achievements`, `evaluacion_terminar`) se compararon con las
  de producción: son las mismas más la rama de `aeropuertos`, sin nada perdido.
- `supabase/tests/aeropuertos_evaluacion.sql` esperaba `modulo_leccion` en
  null, pero la migración de progreso lo pone en `'aeropuertos'`: corrida como
  decía este documento (después de las dos), fallaba. Se corrigió.
- `supabase/tests/permisos.sql` fallaba con las postulaciones aplicadas («el
  cliente escribe en: postulaciones»). La tabla está bien (el piloto declara
  su búsqueda, por columnas y sin borrar); faltaba en la lista de tablas que el
  cliente escribe, con su razón, como pide la propia prueba.
- Faltaba la prueba del progreso: se agregó `supabase/tests/aeropuertos.sql`,
  y el caso de Aeropuertos en `supabase/tests/logros.sql`.

### El orden

| # | Qué se pega en el SQL Editor | Resultado esperado |
|---|---|---|
| 1 | `supabase/migrations/20260915120000_postulaciones.sql` | Sin error (avisos de «does not exist, skipping», normales) |
| 2 | `supabase/migrations/20260915120500_aviso_de_postulacion.sql` | Sin error. **Sola**: el `alter type … add value` no se puede usar en la misma transacción |
| 3 | `supabase/migrations/20260915121000_seguimiento_de_postulaciones.sql` | Sin error |
| 4 | `supabase/migrations/20260915140000_panel_completo.sql` | Sin error |
| 5 | `supabase/migrations/20260915230000_evaluacion_de_aeropuertos.sql` | Sin error |
| 6 | `supabase/migrations/20260916000000_progreso_de_aeropuertos.sql` | Sin error |
| 7 | `supabase/seeds/aeropuertos_evaluacion.sql` (el banco, 60 preguntas) | `UPDATE 0` |
| 8 | Las pruebas, una por ejecución: `supabase/tests/aeropuertos_evaluacion.sql`, `aeropuertos.sql`, `logros.sql`, `permisos.sql`, `panel.sql`, `postulaciones.sql`, `aerodinamica.sql` | Cada una termina en el error `PRUEBA_DESHECHA …` (eso es pasar: la prueba se deshace sola) |

Qué pasa si se cambia el orden:

- 6 antes que 5: falla en la primera función que nombra
  `user_aeropuertos_exam_attempts`, y no queda nada aplicado.
- 6 sin 1 a 4: **no falla al aplicarse** (PL/pgSQL no revisa las tablas al
  crear la función), pero `panel_tarjetas` se cae en tiempo de ejecución porque
  no existe `postulaciones`, y el panel de todos los pilotos queda sin tarjetas.
  Por eso el orden no es opcional.
- 4 después de 6: el panel pierde la tarjeta de Aeropuertos.
- 7 antes que 5 funciona (el banco no depende de las migraciones), pero la
  evaluación no abre hasta que estén las reglas.

El paso 7 es la salida de `node scripts/bancos/sembrar.mjs aeropuertos_evaluacion`
guardada con una cabecera. Es idempotente (upsert por id; lo que sale del
archivo queda inactivo, nunca borrado). Si `contenido/bancos/aeropuertos_evaluacion.json`
cambió después del 24-sep-2026, se pega la salida del comando en vez del archivo.

### Cómo se probó y con qué resultado

El MCP de Supabase de esta sesión es **de solo lectura** (`supabase_read_only_user`,
transacción `read only`): ni siquiera un bloque `do` que se deshace puede crear
una tabla. Así que:

1. **Contra producción, solo lectura**: se leyó el historial de migraciones, el
   estado de Aerodinámica, las definiciones de las funciones que se reemplazan
   y el conteo de los bancos.
2. **Réplica local**: un Postgres 16 con lo mínimo de Supabase (roles,
   `auth.users`, `auth.uid()`, esquemas de storage, cron y vault de mentira),
   todas las migraciones del repo hasta `20260914230000` en orden, el catálogo
   de `scripts/catalogo/sembrar.mjs` (sin la fila de aeropuertos), los bancos
   de producción y tres pilotos. Se comparó con producción por huella (md5 de
   cada definición): **restricciones (364), políticas (120), columnas de las 98
   tablas y disparadores (26) idénticos**; de las 77 funciones, 70 idénticas y
   7 que solo difieren en comentarios (se compararon sin ellos: iguales).
   Diferencias ajenas a esto: una función `set_library_item_pages` que el repo
   crea y producción no tiene (se quitó de la réplica), y el catálogo de
   Mercancías y Aerodinámica, que en producción está más viejo que el del repo
   (ver abajo).
3. Sobre copias de esa réplica, los pasos 1 a 8 en orden. Resultados:

| Prueba | Antes de las correcciones | Después |
|---|---|---|
| `aeropuertos_evaluacion.sql` sin sembrar | | falla «el banco tiene 0 preguntas activas» (esperado) |
| `aeropuertos_evaluacion.sql` | falla (`modulo_leccion` en null) | pasa: `reglas_25_de_60_y_80 destino_y_leccion_gobernada un_solo_banco_sin_cupo banco_60_bien_formado reparto_por_nivel intentos_cerrados sin_intento_a_mano terminar_enruta_los_seis` |
| `aeropuertos.sql` (nueva) | falla «el panel perdió el plan o las postulaciones» | pasa: `catalogo_22_y_30 umbrales leccion_fuera leccion_cero practica_inventada clave_ajena rpc_idempotente rls_progreso sin_update_directo sin_intento_a_mano puerta_cerrada_con_21 puerta_abierta_con_22 terminar_escribe_en_aeropuertos conteos_y_modulos_viejos panel_con_plan_y_postulaciones grupos_y_disparadores logros_leccion_y_practica logros_los_cuatro` |
| `logros.sql` | | pasa, con `aeropuertos_con_catalogo` |
| `permisos.sql` | falla «el cliente escribe en: postulaciones» | pasa (también sin las migraciones nuevas) |
| `panel.sql` | pasa | pasa |
| `postulaciones.sql` | | pasa |
| `aerodinamica.sql` | pasa | pasa |

Y además: correr otra vez los pasos 5, 6 y 7 sobre la base ya migrada no da
error y las pruebas siguen pasando (se pueden repetir sin miedo).

Lo que **no** se pudo probar: la corrida en la base real. La réplica calza con
producción en todo lo que estas migraciones tocan, pero es Postgres 16 y
producción es 17 (la única diferencia que apareció fue `revoke maintain`, de
una migración vieja, que no existe en 16), y cron y vault son de mentira.

### Después de aplicar

- **El historial.** El SQL Editor no escribe en
  `supabase_migrations.schema_migrations` (por eso Aerodinámica no tiene fila).
  Si se aplican desde el editor, los archivos se quedan con su nombre y hay que
  decidir si se registran a mano; si se aplican con `apply_migration` o la CLI,
  se renombran con la versión que registre la base:

  ```sql
  select version, name from supabase_migrations.schema_migrations
  where name in ('postulaciones', 'aviso_de_postulacion', 'seguimiento_de_postulaciones',
                 'panel_completo', 'evaluacion_de_aeropuertos', 'progreso_de_aeropuertos');
  ```

- **`supabase/tests/progreso_y_evaluaciones.sql` falla hoy, antes y después de
  esto**: espera 60 preguntas activas en `mercancias_evaluacion` y el banco
  tiene 46 (en el repo y en producción) desde que las preguntas de lección
  salieron de Mercancías (#210). No es de Aeropuertos; queda anotado.
- **Catálogo de Mercancías y Aerodinámica.** El de producción no es el que
  genera hoy `node scripts/catalogo/sembrar.mjs`. No se tocó; conviene correr
  ese SQL (el de todos los módulos, que ya incluye aeropuertos igual que la
  migración) cuando se revise por qué quedó atrás.

### Mientras no las corra

Nada se rompe. Las consultas a las tablas que aún no existen fallan, y el módulo
se queda con el respaldo local del navegador, que es exactamente como funcionaba
antes: el hub, el lector, la práctica y la evaluación leen y escriben en
`localStorage`, y el panel lee el módulo como «sin empezar» en vez de caerse. El
día que las corra, lo que cada piloto tenga guardado se sube solo en su primera
visita.

Lo único que se va a ver es una fila en `errores_cliente` por pestaña de quien
abra el historial de la evaluación: la tabla de intentos todavía no está y eso
se reporta como error, que es justamente el aviso de que falta correr el SQL.

Los tipos de `src/integrations/supabase/types.ts` ya describen las dos tablas y
la RPC nuevas, escritos a mano con la forma exacta que tienen en la migración,
como se hizo con Aerodinámica. Cuando Camilo regenere los tipos no debería
cambiar nada.

## Lo que sigue faltando

Las imágenes. 231 huecos rotulados (162 de lección y 69 de catálogo), más
`AP-POR-01` a `AP-POR-04` del hub, `AP-PRA-01` a `AP-PRA-13` de la práctica y
`AP-VID-01`, que es el video de apertura. Cada hueco dice en pantalla qué tiene
que mostrar y con qué medida, así que se pueden ir llenando de a uno sin volver
a abrir el brief.

## Resumen de lo hecho (cierre, 16-sep-2026)

El plan está completo y en `origin/main`, en cuatro commits (`e910efd`,
`4d6db89`, `367bff7`, `34a0a9f`):

- 22 lecciones en 5 niveles (`src/lib/aeropuertosLeccion/nivel1.ts` a
  `nivel5.ts`) sobre el lector compartido, con 162 huecos rotulados.
- Entrevistas de 15 preguntas por nivel (`entrevistas.ts`).
- Catálogo de 177 fichas con 69 huecos propios (`AP-CAT-*`); la ficha de A1 y B1
  va sin imagen, a propósito.
- Hub con el espacio del video, práctica, y evaluación de 60 preguntas en el
  servidor (`contenido/bancos/aeropuertos_evaluacion.json`).
- Progreso en la base con respaldo local, y las dos migraciones escritas **sin
  aplicar** (ver «Lo que le queda por correr a Camilo»).

Revisión de cierre: sin rayas largas, sin citas de artículos y ningún hueco pide
A1 ni B1 (solo aparecen como advertencia o como opción incorrecta).
`npx tsc -b` limpio, `npx vite build` limpio, y `npx vitest run` con 415 pruebas
de 53 archivos, todas pasan. `npx eslint .` solo marca archivos que git ignora
(`.agents/skills/` y `vista.local/`). Para que `tsc` y las pruebas corrieran hubo
que hacer `npm install`: a `node_modules` le faltaba `vitest`, aunque el
lockfile sí lo trae. El lockfile no cambió.

La tarea programada `aeropuertos-continuar` se borró al cerrar.

## Auditoría de contenido (16-sep-2026)

Se contrastó todo el texto visible (lecciones, fichas de los huecos, entrevistas,
práctica, evaluación, catálogo y pantallas) contra el texto consolidado del Anexo
14 con la Enmienda 18 (`an14_9ed.txt` del scratchpad del 15-sep, pie de página
«No. 18»), el Anexo 4 y el Doc 9981, y contra las figuras del PDF donde el texto
no alcanzaba (Fig. 5-25, A-10 y A4-5). La ortografía se pasó con cspell en
español, distinguiendo tildes, más reglas propias (tildes que cambian el
sentido, signos, espacios, rayas, citas, cifras): el texto está limpio; solo
había dos cifras con punto de miles.

### Corregido

- **Franja de pista de precisión, clave 3 o 4: 140 m** a cada lado del eje
  (3.4.3). El brief y el inventario traían 150 m, una cifra anterior.
- **Letrero de distancia de pista restante:** lleva **una sola cifra sin
  unidades**, que cuenta tramos de unos 300 m hasta el final (Fig. A-10 y
  A4-5); no «en metros». Puede ir a uno o a los dos lados (configuración C).
- **Señal de instrucción obligatoria:** con anchura exterior entre ruedas
  **menor de 9 m va centrada sobre el eje**; de 9 m a menos de 15 m, a los dos
  lados (5.2.16.3 y 5.2.16.4). Estaba al revés en la lección 07, en la práctica
  (c08) y en la evaluación (ev-19).
- **Luces sencillas de toma de contacto:** solo donde **no** hay barretas
  (5.3.14.1), y son un par a cada lado del eje. Se quitaron de la escena de
  categoría III de la lección 13.
- **Luces indicadoras de salida rápida:** juegos de **3, 2 y 1 luz** a 300, 200
  y 100 m del punto de tangencia (Fig. 5-25). No hay juego a 60 m.
- **Manga de viento:** «se extiende con 15 nudos» es de la FAA, no de la OACI.
  Salió de la lección 11, la entrevista, la práctica (d06) y la evaluación
  (ev-29, reescrita sobre la altura de lectura).
- **Superficie de protección del indicador de pendiente:** arranca a D1 + 30 m
  o D1 + 60 m del sistema (Tabla 5-3), no 30 o 60 m por delante; las medidas
  correctivas son las de 5.3.5.46, que no incluyen «apagarlo».
- **Tiempos de conmutación:** la nota del terreno peligroso o escarpado también
  aplica a la aproximación que no es de precisión (Tabla 8-1).
- **Designadora:** la décima parte del rumbo magnético, **redondeada** (5.2.2.4),
  no «sin la última cifra».
- **Letrero de información con carácter de 300 mm:** cara de **450 mm** (Tabla
  5-5 y Apéndice 4).
- **Luces de punto de espera intermedio:** 0,3 m **antes** de la señal (5.3.21.3).
- **Luces de entrada a la pista:** encendidas, se para **aunque haya
  autorización** y se avisa (Adjunto A, sección 20).
- **Umbral de 300 m de RVR:** toca ejes de calle, plataformas de viraje, puntos
  de espera intermedios e indicadoras de salida rápida; no las luces de
  protección de pista ni la barra de parada, que siguen en 550 m.
- Precisiones menores: excepción de barretas en la regla de adyacencia (10.5.7),
  colores de las luces de obstáculo, altura de la catenaria, la sobrecarga
  ACR-PCR la autoriza el aeródromo, «hold short **of** runway», la barra de
  parada no tiene lado fijado en la norma, galones «no aptos para uso normal»
  (Capítulo 7, área anterior al umbral), y el letrero de ejemplo `B2` pasó a
  `E2` para no confundirlo con el patrón B2 en la misma lección.
- Coherencia: se quitó el «tercer color de letrero» (con el blanco sobre negro
  del letrero de distancia restante son cuatro familias), el trato de «usted»
  del catálogo y «Enm. 18».
- Texto interno que se veía en pantalla: la ficha 36 del catálogo («un manual
  que no se consiguió», «NO VERIFICADO») y dos notas de producción en «Lo que
  dice el material viejo» de la práctica. El ejercicio c01 se reformuló porque
  decía «hoy» y quedaba falso después del 26-nov-2026.
- El espacio del video ya no pide la voz de William Shanks: los videos se van a
  rehacer con el avatar y la voz propios.

### Opciones parejas en la evaluación (16-sep-2026, segunda pasada)

En 17 preguntas la respuesta correcta era desde un 37 % más larga que la
siguiente hasta más del doble, y se podía acertar sin saber: ev-06, 15, 16, 17, 22, 30, 34, 35,
36, 39, 43, 45, 46, 49, 54, 55 y 57. Se acortó la buena (el detalle sigue en la
explicación) y se alargaron los distractores con datos plausibles y falsos.
Ahora en ninguna la correcta pasa de un 30 % más larga que la siguiente, y es
la más larga en 18 de las 60 y la más corta en otras 18.

De paso, ev-57 cambió de fondo: decía que la rebaja por menos de 700
movimientos era «la única» que admite la norma, y 9.2.7 permite otra en los
períodos previstos de poca actividad. La pregunta ahora pregunta cuánto se
puede bajar por poco tráfico y la explicación distingue los dos casos.

### Queda por decidir (Camilo)

- **Largo de las lecciones.** La regla es 120 a 160 palabras de texto. Con el
  mismo conteo, los niveles 2 y 3 cumplen, pero las lecciones 01 a 04 tienen
  182 a 228, la 13 a la 18 tienen 289 a 483 y la 19 a la 22, 164 a 242.
- **Ficha 36 del catálogo** (señal de pista no pavimentada, LAR 154): su
  contenido sigue sin verificar. Las variantes nacionales del catálogo
  (Colombia, Chile) no se revisaron en esta pasada.
- Las correcciones del banco llegan a la base cuando se siembre
  (`node scripts/bancos/sembrar.mjs aeropuertos_evaluacion`), que ya estaba en la
  lista de arriba.
- `docs/BRIEF_AEROPUERTOS.md` conserva las cifras viejas: si se vuelve a generar
  algo desde el brief, manda esta lista.
