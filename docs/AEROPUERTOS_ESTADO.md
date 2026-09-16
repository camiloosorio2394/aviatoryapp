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

Nada de esto se aplicó. Son cuatro pasos y van **en este orden y de una
sentada**: la evaluación no abre hasta que estén la fila de reglas (migración 1)
y las preguntas (siembra), y la migración 2 nombra tablas que crea la 1.

**1. La migración de la evaluación**, en el SQL Editor de Supabase:

```
supabase/migrations/20260915230000_evaluacion_de_aeropuertos.sql
```

Crea `user_aeropuertos_exam_attempts`, amplía el CHECK de `evaluaciones.destino`,
registra las reglas en `evaluaciones` y `evaluacion_fuentes`, y reemplaza
`evaluacion_terminar` con la rama del módulo nuevo.

**2. La migración del progreso**, después de la anterior:

```
supabase/migrations/20260916000000_progreso_de_aeropuertos.sql
```

Crea `user_aeropuertos_progress` con su RLS y su RPC `aeropuertos_mark_progress`,
mete el módulo en `modulos_contenido` (22 lecciones y 30 claves de práctica), sus
umbrales y sus cuatro logros, engancha los dos disparadores que desbloquean, suma
la rama de `aeropuertos` a `secciones_leidas`, `practicas_hechas`,
`desbloquear_logros`, `check_and_unlock_achievements` y `panel_tarjetas`, y pone
`modulo_leccion` para que el servidor exija la lección completa antes de abrir la
evaluación.

De paso agrega `aerodinamica` a la lista de grupos de
`check_and_unlock_achievements`, que nunca la tuvo. Sus logros sí se
desbloqueaban por disparador; lo que fallaba era el repaso manual.

Las dos migraciones se renombran después con la versión que registró la base:

```sql
select version, name from supabase_migrations.schema_migrations
where name in (evaluacion_de_aeropuertos, progreso_de_aeropuertos);
```

**3. El banco de preguntas.** Imprime el SQL y se pega en Supabase:

```
node scripts/bancos/sembrar.mjs aeropuertos_evaluacion
```

Es idempotente: se vuelve a correr cada vez que el archivo del banco cambie.
Hace upsert por id y lo que salga del archivo queda inactivo, nunca borrado,
porque las sesiones ya jugadas referencian sus preguntas.

**4. La prueba**, con las dos migraciones aplicadas y el banco sembrado:

```
supabase/tests/aeropuertos_evaluacion.sql
```

Pasa si termina en `PRUEBA_DESHECHA` seguido de la lista de lo verificado.

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
