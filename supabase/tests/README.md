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
| `comunidad_y_reportes.sql` | Topes de mensajes y reportes, fecha del servidor, reportes sin editar, visitas de la biblioteca. |
| `icao_quiz.sql` | Corrección en el servidor, opciones válidas, intentos solo por la función, tope por hora. |

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
