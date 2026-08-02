# Contexto para continuar en Aviatory

Pega este archivo al inicio de un chat nuevo de Claude Code, parado en
`C:\Datos\Documents\Projects\aviatoryapp`.

Última actualización: 2 de agosto de 2026. Sustituye a
`CONTEXTO_SESION_2026-07-31.md`.

---

## Estado ahora mismo

- `main` = `b856b51`, desplegado
- **Bundle: 649 KB** de un límite de 2.048. Nico partió las rutas con `lazy` y
  bajó desde 2.028, que estaba a 20 KB de hacer fallar el build
- `tsc` y `npm run build` limpios. `eslint` en **20 problemas**, que es el techo
  histórico. No subir de ahí
- **Las cinco migraciones del 2 de agosto están aplicadas** en producción

Producción: https://aviatoryapp-mu.vercel.app
Supabase: proyecto `gvwqmfxphsbmbrhyjcmk`, por MCP

---

## Qué es el proyecto

**Aviatory**: plataforma para pilotos de LATAM (sobre todo Colombia) que
preparan el examen PCA de la Aerocivil, el inglés ICAO (examen TEA) y su
postulación a una aerolínea.

Dueños: **Camilo Osorio** y **Nico (MGN14)**, los dos con Claude Code en
paralelo. Stack: Vite + React 19 + TS + Tailwind v4 + shadcn + react-router v7 +
Supabase + Vercel. PWA con `registerType: 'prompt'`.

**4 usuarios reales, 459 preguntas en el banco PCA.** El estado vacío es lo que
ve todo el mundo: diseña para el primer día.

---

## EN QUÉ ESTÁ CADA UNO AHORA MISMO

### Camilo

1. **Reescribiendo el contenido de NOTAM y de Mercancías.** El texto actual lo
   escribió Claude y a Camilo le parece que "se ve escrito por IA". Lo está
   reescribiendo él, en formato **texto-imagen-texto-imagen**
2. **Diseñando 30 portadas** para los documentos de la Biblioteca

**No toques estos archivos sin avisarle:**

```
src/lib/notamLesson.ts          src/pages/NotamLesson.tsx
src/lib/mercancias.ts           src/components/modulo/mercancias/Seccion*.tsx
```

Sí se pueden tocar los **renderizadores** (`DocLessonBlocks.tsx`, `piezas.tsx`):
él escribe contenido, otros dan las piezas.

### Nico

Tiene el brief `docs/BRIEF_NICO_2026-08-02_TANDA.md` con cinco tareas:

1. **La pieza de imagen** en los dos renderizadores. Es la que desbloquea a
   Camilo: hoy no existe ninguna
2. Los testimonios inventados de la landing
3. El lector de módulo en celular (390 px)
4. El módulo ICAO, que tiene cero llamadas a Supabase
5. La Biblioteca como estante

---

## LA BIBLIOTECA: diseño cerrado y aprobado

Maqueta aprobada: https://claude.ai/code/artifact/196cfbeb-71f8-4923-b614-b53ac85017d3

**Es un estante, no una tabla.** Filas con rótulo, cada una con desplazamiento
horizontal, y portadas A4 con lomo. Agrupadas por **familia** (RAC, LAR, OACI,
Aviatory), **no por materia**.

Dos argumentos, por si alguien los reabre:

- Un documento aeronáutico es multi-materia (el RAC 91 toca meteorología,
  performance, comunicaciones y espacio aéreo) pero **de una sola familia**
- **El número es el nombre.** Un piloto busca "el RAC 91", no "algo de
  operaciones". Una fila de RAC se recorre leyendo solo los números

**Ya está hecho**: los campos `portada_url`, `familia`, `destacado` y `paginas`
en `library_items`, los tres documentos poblados, y las portadas en
`public/biblioteca/portadas/` a WebP.

### Lo que la Biblioteca NO lleva, y es decisión de Camilo

Palabras suyas: *"no vamos a poner edición vigente ni nada de eso, solo necesito
nombrar cada documento"*.

Sin estados de vigencia, sin estanterías por materia, sin nivel, sin filtros,
sin botón de descargar, y sin buscador hasta pasar de 25 documentos.

**Se propusieron todas y se descartaron.** No las reabras.

Y: **la Biblioteca solo habla de lo que está cargado.** Las fichas de OACI e
IATA quedaron despublicadas.

---

## LA LECCIÓN QUE MÁS IMPORTA DE HOY

Camilo revisó NOTAM y dijo: *"no se ve como una app, se ve como un montón de
texto sin sentido"*. Se verificó mirando la app de verdad, y tenía razón:

**La pantalla se declara a sí misma un documento.** Literalmente dice *"para leer
de corrido como un PDF"* y *"46 min de lectura"*. Índice lateral y columna de
prosa. Eso es Wikipedia, no una app.

El diagnóstico de fondo, y es la regla que hay que aplicar a todo el contenido:

> **Si un párrafo describe algo que se puede mostrar, no es un párrafo: es un
> componente que no se ha construido.**

Ejemplos reales de la lección de Mercancías:

| Lo que dice el texto | Lo que debería ser |
|---|---|
| "El rojo es inflamable, el verde es gas que no arde, el amarillo alimenta el fuego" | Los nueve rombos agrupados por color |
| "La clase es del 1 al 9, la división es el subtipo: 2.1 es un gas inflamable dentro de la clase 2" | `2` y `2.1` enfrentados, cada uno con su rombo |
| "Hay 16 etiquetas para las nueve clases" | La rejilla de las 16 |

**Regla dura**: máximo dos párrafos seguidos. Al tercero hay que convertirlo en
tabla, comparación, desglose o rejilla. La lección de NOTAM tiene 49 bloques `p`
en 13 secciones y por eso se lee como documento.

**Y los dos formatos que existen hoy:**

- `NotamQueEs.tsx` es un **póster**: lienzo fijo de 1687x1125 con 24 PNG, obliga
  a hacer zoom en celular. **No repetir ese patrón**
- `NotamLineaQ.tsx` es el **modelo**: todo código, reflowea, se toca, el color
  ata una cosa con otra. Ese es el objetivo

---

## Lo que se hizo hoy

**Se aplicaron las migraciones del 2 de agosto.** Nico reportó que la de
mercancías se había aplicado "a medias" y que las tablas sí estaban. **No era
cierto: no se había aplicado nada.** Verificar siempre en la base, no en el
reporte.

**La migración de Biblioteca tenía un fallo que la hacía imposible.** La
restricción `library_items_type_check` era del esquema del marcador de posición
y solo admitía `manual`, `sop`, `quick_ref` y compañía; la pantalla usa `pdf` y
`referencia`, así que el primer insert reventaba y hacía rollback completo.

**Se corrigieron 16 textos sin tildes** que habían llegado a producción, entre
ellos un **"se publica cada ano"** en la ficha de la IATA DGR y diez logros que
salían así en el aviso de logro desbloqueado.

**Se auditó la app mirándola de verdad** con el navegador, no leyendo código.

**El módulo Mercancías Peligrosas está completo y desplegado**: lector propio a
pantalla completa, 11 secciones, las 9 clases con sus etiquetas OACI reales,
práctica y chequeo.

---

## TRAMPAS TÉCNICAS

1. **Escribe las tildes en el SQL.** Al aplicar migraciones por MCP es tentador
   quitarlas para evitar problemas de codificación. **No lo hagas**: ese texto lo
   lee un piloto. Hoy costó 16 correcciones.

2. **Postgres devuelve `EXECUTE` a `PUBLIC` en cada `create or replace
   function`.** Hay que revocar otra vez:
   ```sql
   revoke all on function public.f() from public, anon;
   grant execute on function public.f() to authenticated;
   ```
   Correr `get_advisors` tipo `security` tras cualquier DDL.

3. **Un logro sin su condición y sin su disparador no se otorga nunca.** Pasó con
   `metar_master`. Las tres cosas van en la misma migración: la tabla, la
   condición dentro de `check_and_unlock_achievements`, y el disparador.

4. **El orden importa entre migraciones que recrean
   `check_and_unlock_achievements`.** La última que se aplique es la que queda.
   Antes de aplicar una, comprobar que contiene todos los logros vivos.

5. **`supabase db push` no funciona en este repo.** La historia local y la remota
   divergen porque las migraciones se aplican por MCP. Aplicar siempre por MCP.

6. **El bundle tiene límite duro de 2.048 KB** (Workbox). Pasarse **hace fallar
   el build**, no avisa. Hoy está en 649 KB tras el `lazy` de rutas.

7. **Imágenes**: a WebP siempre, con
   `node scripts/optimizar-imagenes.mjs <origen> <destino> [ancho]`. Y fuera del
   precache con `globIgnores` más `CacheFirst`, como `notams/**` e
   `infografias/**`.

8. **El service worker es `registerType: 'prompt'`**: tras desplegar,
   **Ctrl+Shift+R**.

9. **Verificar el despliegue** antes de decir que algo está listo:
   ```bash
   gh api repos/camiloosorio2394/aviatoryapp/deployments --jq '.[0] | "\(.sha[0:7]) \(.environment)"'
   ```

10. **Windows no tiene `python`.** Para procesar archivos, Node. Y ojo con CRLF:
    `split`/`join` con `\n` rompe archivos.

11. **Los escapes de regex se rompen al pasar por el shell.** Para scripts con
    expresiones regulares, escribir el archivo `.mjs` y ejecutarlo, no `node -e`.

---

## SISTEMA DE DISEÑO

| | Valor |
|---|---|
| Tipografía | **12 / 13 / 15 / 17 / 20 / 24 / 32 px** |
| Espaciado | **4 / 8 / 12 / 16 / 24 / 32 / 48** |
| Pesos | **400 / 500 / 600**. Nada de `font-bold` |
| Radios | 8px controles, 12px superficies |
| Contenedor | `max-w-[1280px]` |
| Medida de lectura | `max-w-[52ch]` |

- **Sentence case**, salvo dentro del lector de módulo (`.mod-shell`), donde las
  micro-etiquetas en mayúscula con letterspacing sí son el lenguaje del diseño
- `.surface` y `.surface-lift`, nunca `border border-border bg-card`
- Botones con `appButtonClass()` de `@/lib/buttonStyles`. Solo `md` y `lg`
- **El color solo cuando informa**
- Fuentes por `<link>` en `index.html`: Inter, JetBrains Mono y **Archivo**

**Tres superficies con reglas propias que no se invierten con el tema:**
`.doc-sheet` (la hoja de la lección), `.mod-shell` (el lector de módulo) y las
infografías.

### Copy

- Español neutro LATAM con **tuteo**. Prohibido el voseo
- **Prohibido el guion largo (—) en texto visible.** Excepción: el marcador de
  celda sin dato
- Sin emojis en la UI. Sin lenguaje de desarrollador al usuario
- **Cero mentiras en pantalla.** Ni cifras infladas ni ceros deprimentes

---

## PENDIENTES

### De Camilo, y llevan días

1. **Decidir si Entrevista técnica, HR y Psicotécnicos son temas del módulo
   Ingreso a aerolínea o módulos aparte.** Hoy están prometidos en los dos
   sitios. Pendiente desde el 1 de agosto y nadie ha tocado nada esperando
2. **Subir los dos PDF al bucket `documentos-oficiales`**, con nombre exacto:
   ```
   RAC 175 - Transporte sin Riesgo de Mercancias Peligrosas por via Aerea.pdf
   LAR 175 MERCANCIAS PELIGROSAS.pdf
   ```
   Las fichas ya apuntan ahí. El del banco PCA ya está
3. **Compartir el proyecto de Claude Design** de Mercancías con Nico, que le da
   "Project not found"
4. **Los 6 minutos de hablar inglés** para medir el dictado del TEA. La pantalla
   está en producción pero el experimento no se ha corrido: hace falta alguien
   hablando a un micrófono. Sin eso no se decide si sigue gratis con
   `SpeechRecognition` o pasa a Whisper
5. **Revisar los 4 casos de práctica y las 5 preguntas del chequeo de
   Mercancías**: los escribió Claude, no son suyos. Están en
   `src/lib/mercanciasPractica.ts`
6. **Protección de contraseñas filtradas** en Supabase, un clic

### Técnicos abiertos

- **`get_subject_intel` y `get_all_subjects_intel` leen `subjects` y
  `subject_topics`.** `subjects` tiene 6 slugs y el vault 11, y `reglamento`
  contra `reglamentacion` es la misma materia con dos nombres. Hoy no se ve
  porque `exam_reports` está vacía, pero salta el día que alguien reporte un
  examen. Es el tercer caso de lógica apuntando a tablas legadas
- **Sin repetición espaciada** en toda la app. Nada devuelve lo que fallaste. Es
  la ausencia más cara que queda para un examen que se prepara durante meses
- **La landing** sigue con los testimonios inventados (tarea 2 de Nico)

---

## Verificación antes de subir

```bash
npx tsc -p tsconfig.app.json --noEmit
npm run build
npx eslint src --ext .ts,.tsx        # no subir de 20 problemas
```

```bash
grep -rn "—" src/pages src/components --include="*.tsx" | grep -v '"—"'
grep -rnE "tenés|podés|practicá|acá\b" src/
grep -rnE '#[0-9A-Fa-f]{6}' src/pages src/components --include="*.tsx"
node -e "const fs=require('fs');fs.readdirSync('dist/assets').filter(f=>f.endsWith('.js')).map(f=>({f,kb:Math.round(fs.statSync('dist/assets/'+f).size/1024)})).sort((a,b)=>b.kb-a.kb).slice(0,3).forEach(o=>console.log(o.kb+' KB '+o.f))"
```

---

## Flujo de trabajo

**Push directo a `main`, sin PR.** Los PR se morían en conflicto cuando los dos
tocaban las mismas pantallas.

**Condición**: avisar antes de entrar a `Dashboard.tsx`, `Community.tsx` o
`Profile.tsx`, más los archivos de la zona bloqueada de arriba.

Nico escribe las migraciones, **Camilo las aplica por MCP**. Nico no tiene
acceso al conector de Supabase.
