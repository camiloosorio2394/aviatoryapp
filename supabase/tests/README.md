# Pruebas de la base

Las reglas que protegen puntajes, correcciones y permisos viven en la base
(funciones `security definer`, disparadores, permisos por columna). Estas pruebas
las verifican contra la base real.

Cada archivo es un bloque `do $prueba$` que simula pilotos con
`set_config('request.jwt.claims', …)` y `set local role authenticated`, y termina
**siempre** en una excepción: la transacción se deshace y no queda ninguna fila
escrita. `scripts/db/pruebasDeBase.test.ts` revisa en CI que cada archivo tenga
esa forma.

| Archivo | Qué verifica |
| --- | --- |
| `permisos.sql` | RLS en todas las tablas, `anon` sin tablas, `private` cerrado, funciones con `search_path`, permisos por defecto cerrados, columnas de corrección ocultas, tablas que el cliente escribe, límites de archivos. Solo lee. |
| `progreso_y_evaluaciones.sql` | Marcas de progreso contra el catálogo, lección completa para abrir la evaluación, corrección solo de lo respondido, tope de intentos. |
| `aeropuertos_evaluacion.sql` | Las reglas de la evaluación de Aeropuertos (25 de 60, aprueba con 80, corrección al final, un solo banco, lección exigida), el banco completo y repartido por nivel, la tabla de intentos cerrada y que `evaluacion_terminar` siga enrutando a los seis destinos. Con las dos migraciones de Aeropuertos y el banco sembrado. |
| `aeropuertos.sql` | Progreso de Aeropuertos contra su catálogo (22 lecciones, 30 prácticas), RLS y sin escritura directa, la puerta de la evaluación (con 21 lecciones no abre, con 22 sí) y el intento que llega a su tabla, los conteos de los otros módulos, el panel con los cinco módulos, el plan y las postulaciones, y los cuatro logros. Con las dos migraciones y el banco sembrado. |
| `comunicaciones.sql` | Progreso de Comunicaciones ATC contra su catálogo (69 lecciones y las claves de práctica de `contenido/catalogo`), RPC idempotente y `security definer`, RLS, sin escritura directa ni sin sesión, `anon` sin nada, la puerta de la evaluación (con 68 lecciones no abre, con 69 sí) y el intento que llega a su tabla, los conteos de los otros módulos, el panel con los seis módulos, el plan y las postulaciones, y los cuatro logros. Con las tres migraciones de Comunicaciones (`20260927000000`, `010000` y `020000`) y el banco sembrado. |
| `comunicaciones_evaluacion.sql` | Las reglas de la evaluación de Comunicaciones ATC (25 de 80, aprueba con 80, corrección al final, un solo banco, lección exigida), el banco completo y repartido por nivel, la tabla de intentos cerrada, que `evaluacion_terminar` siga enrutando a los siete destinos y que `secciones_leidas` siga contando los seis módulos. Con las tres migraciones y el banco sembrado. |
| `rac_y_combustible.sql` | Los dos módulos de la migración `20260928000000`, uno tras otro: catálogo (19 y 23 lecciones, claves con la forma de su función), reglas de la evaluación (20 de 50 y 20 de 40, aprueba con 80, corrección al final, un solo banco, lección exigida), el banco completo y con tema, RPC idempotente y `security definer`, RLS, sin escritura directa ni sin sesión, `anon` sin nada, la puerta (18 de 19 y 22 de 23 no abren) y el intento que llega a su tabla, los cuatro logros de cada uno; después, que los siete módulos de antes siguen contando, `evaluacion_terminar` con todos sus destinos y el panel con los nueve. Con la migración aplicada y los dos bancos sembrados. |
| `rvsm.sql` | El módulo RVSM de la migración `20260929000000`: catálogo (32 lecciones, claves con la forma de `claveEjercicioRvsm`), reglas de la evaluación (20 de 40, aprueba con 80, corrección al final, un solo banco, lección exigida), el banco completo y con tema, RPC idempotente y `security definer`, RLS, sin escritura directa ni sin sesión, `anon` sin nada, la puerta (31 de 32 no abre) y el intento que llega a su tabla, los cuatro logros; después, que los nueve módulos de antes siguen contando, `evaluacion_terminar` con todos sus destinos y el panel con los diez. Con la migración aplicada y el banco sembrado. |
| `evaluacion_temas.sql` | La evaluación entrega el tema de cada pregunta (el de la fuente, o si no, el de los metadatos): Aerodinámica, Performance, RAC y Combustible con tema en cada pregunta, NOTAM sin tema y el simulacro con su etiqueta, como antes. Y RAC y Combustible como el repo: lección exigida en el servidor (18 de 19 no abre) y el catálogo de Combustible con los diez escenarios. Con `20260929000000` aplicada. |
| `pbn.sql` | El módulo PBN de la migración `20260929120000`: catálogo (52 lecciones, claves `pNN-qN`), reglas de la evaluación (20 de 50, aprueba con 80, corrección al final, un solo banco, lección exigida), el banco completo y con tema, RPC idempotente y `security definer`, RLS, sin escritura directa ni sin sesión, `anon` sin nada, la puerta (51 de 52 no abre) y el intento que llega a su tabla, los cuatro logros; después, que los diez módulos de antes siguen contando, `evaluacion_terminar` con todos sus destinos y el panel con los once. Con la migración aplicada y el banco sembrado. |
| `comunidad_y_reportes.sql` | Topes de mensajes y reportes, fecha del servidor, reportes sin editar, visitas de la biblioteca, reacciones con canal y borrados filtrables en vivo. |
| `icao_quiz.sql` | Corrección en el servidor, opciones válidas, intentos solo por la función, tope por hora. |
| `errores_cliente.sql` | Reporte de errores solo con sesión, recortado, con tope por hora y sin acceso directo a la tabla. |
| `logros.sql` | Lección y práctica contra el catálogo (NOTAM, Aeropuertos, Comunicaciones ATC, RAC y Gestión del combustible), claves viejas que no cuentan, un grupo por disparador, ponerse al día solo sobre sí mismo. Desde el caso de Aeropuertos necesita `20260916000000` aplicada, desde el de Comunicaciones, `20260927020000`, y desde los de RAC y Combustible, `20260928000000`. |
| `psicotecnicas.sql` | El reloj lo lleva el servidor: aplazar acumula el tiempo, el tiempo agotado no cuenta, y ni el banco ni la sesión se leen desde el cliente. |
| `panel.sql` | `panel_inicio()` y `panel_tarjetas()` devuelven lo mismo que las consultas que reemplazan, piloto por piloto, sin sesión no responden. Solo lee. |
| `constancia.sql` | El plan de estudio es del piloto y solo suyo, la racha sobrevive a un día por mes (uno, no dos), y los avisos que corren de noche salen cuando deben y una sola vez al día. |
| `postulaciones.sql` | Las postulaciones son del piloto y solo suyas, la fecha no puede ser del futuro, el cliente no escribe las fechas que mide el recordatorio, y el seguimiento pregunta una vez cada tres semanas y solo por las abiertas. |
| `resumenes.sql` | `bitacora_resumen` e `icao_progreso()` cuentan más de 1000 filas y solo las del piloto. |
| `horas_de_carrera.sql` | Las horas previas más la bitácora, la verificación y lo que el piloto no puede cambiar solo. |
| `vault.sql` | El banco de la bóveda va cifrado: la tanda viaja sin respuestas, el tamaño y la posición los acota el servidor, una tanda ajena no se responde y el tope por hora frena. |
| `wingman.sql` | El cupo del tutor se cuenta por conversación y por mes, no por mensaje; lo fallido no se cobra y el historial es de cada quien. |

## Cómo se corren

Con el SQL Editor de Supabase (proyecto `gvwqmfxphsbmbrhyjcmk`) o con
`execute_sql` del MCP de Supabase: se pega el archivo completo y se ejecuta.

- **Pasa** si el resultado es el error `PRUEBA_DESHECHA` seguido de la lista de
  lo verificado, por ejemplo `PRUEBA_DESHECHA rls anon_sin_tablas …`.
- **Falla** con cualquier otro error: `FALLO …` dice qué regla no se cumple, y un
  error de Postgres dice qué instrucción no corrió.

Necesitan al menos dos usuarios en `auth.users` (usan los dos más antiguos) y
contenido publicado (un canal, una materia, un documento de biblioteca, una
pregunta ICAO activa).

## Cuándo se escriben

Una migración que cambia una regla del servidor agrega o actualiza su prueba en
esta carpeta, en el mismo PR. Se corre antes de aplicar la migración (con la
migración dentro del mismo bloque) y después, contra la base ya migrada.
