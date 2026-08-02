# Contexto para continuar en Aviatory

Pega este archivo al inicio de un chat nuevo de Claude Code, parado en
`C:\Datos\Documents\Projects\aviatoryapp`.

Última actualización: 31 de julio de 2026. Sustituye a
`CONTEXTO_SESION_2026-07-30.md`.

---

## Estado ahora mismo

- `main` = `3190a6d`, desplegado y verificado en producción
- **Cero PR abiertos.** El #87 quedó cerrado por obsoleto
- Queda la rama muerta `origin/redesign/app-como-el-inicio`: se puede borrar
- `tsc` y `npm run build` limpios. `eslint` en **20 problemas** (19 errores y 1
  aviso), todos preexistentes del tipo `react-hooks/set-state-in-effect` en
  hooks de carga. **Ese es el techo: no subir de ahí**

Producción: https://aviatoryapp-mu.vercel.app
Supabase: proyecto `gvwqmfxphsbmbrhyjcmk`, conectado por MCP

---

## Qué es el proyecto

**Aviatory**: plataforma para pilotos de LATAM (sobre todo Colombia) que
preparan el examen PCA de la Aerocivil, el inglés ICAO (examen TEA) y su
postulación a una aerolínea.

- **Dueños**: Camilo Osorio y Nico (MGN14). Los dos trabajan con Claude Code
  en paralelo
- **Stack**: Vite + React 19 + TypeScript + Tailwind v4 + shadcn +
  react-router v7 + Supabase + Vercel. PWA con `registerType: 'prompt'`

**Datos reales, y esto condiciona todo el diseño:** 4 usuarios, 459 preguntas
en el banco PCA, 2 sesiones de quiz completadas en toda la base.
**El estado vacío es lo que ve todo el mundo.**

---

## SISTEMA DE DISEÑO (lo más importante de esta sesión)

Se fijó entero el 30 y 31 de julio. Camilo rechazó dos registros antes de
llegar al bueno, y conviene saber cuáles para no volver a ellos:

1. **El original** le pareció "hecho con IA / infantil": 9 gradientes
   diagonales, 25 esquinas de 16px, 4 iconos `Sparkles`, glows de color, chips
   pastel
2. **La corrección hacia "panel de instrumentos"** también la rechazó:
   monoespaciada, `TOT HRS`, MAYÚSCULAS con letterspacing, esquinas duras. Se
   lee como terminal, frío y cargado

**Lo que quedó: "profesional pero estético".** Jerarquía por tamaño, peso y
espacio. Nada de gritar con color ni con mayúsculas.

### Reglas duras

| | Valor |
|---|---|
| Tipografía | **12 / 13 / 15 / 17 / 20 / 24 / 32 px**, nada fuera |
| Espaciado | **4 / 8 / 12 / 16 / 24 / 32 / 48**, sin medios pasos |
| Pesos | **400 / 500 / 600**. Nada de `font-bold` ni `extrabold` en el interior |
| Radios | 8px controles, 12px superficies |
| Contenedor | `max-w-[1280px]` |
| Medida de lectura | `max-w-[52ch]`, unos 58 caracteres por línea (medido) |

- **Sentence case siempre.** Nunca mayúsculas con letterspacing
- No mezclar `text-sm` con `text-[15px]`: solo valores en px de la escala
- **Superficie**: clase `.surface`, nunca `border border-border bg-card`. Para
  hover clicable, `.surface-lift`
- **Botones**: `appButtonClass()` y `appButtonStyle()` de `@/lib/buttonStyles`.
  Cero botones a mano. 36px secundario, 44px principal
- **El color solo cuando informa.** Nada de un color por materia o por tema: se
  quitó justamente por eso. El ámbar aparece cuando el ICAO está bajo el mínimo
  legal de 4, no de adorno
- **Iconos**: trazo unificado a 1.5 con la regla `.lucide` en `@layer
  components`. Símbolos de carta aeronáutica en
  `src/components/icons/aero.tsx` (VOR, NDB, waypoint, aeródromo, circuito de
  espera, localizador), **solo donde signifiquen algo**. El mapa por materia
  está en `src/lib/subjectSymbols.ts`
- **Tipografía real**: Inter y JetBrains Mono por `<link>` en `index.html`.
  **No volver a los `@import` dentro del CSS**: los de Google Fonts a mitad de
  `index.css` se ignoran por especificación y la monoespaciada nunca cargó

### Fotografía

- **Foto solo en el hero de cada módulo, el cuerpo plano.** Repetirla en las
  tarjetas la convierte en decoración
- **Matiz añadido el 31 jul**: una tarjeta de *catálogo* (te lleva a otro sitio
  y compite por la atención) sí puede llevar foto, como hace
  `landing/Solutions.tsx`. Una tarjeta de *datos* (un indicador, una fila de
  materia) no
- 7 fotos en `src/assets/photos/`, todas asignadas. Créditos en
  `docs/PHOTO_CREDITS.md`. Unsplash License, sin branding de aerolíneas ajenas

### Copy

- Español neutro LATAM con **tuteo**. Prohibido el voseo
- **Prohibido el guion largo (—) en texto visible.** Única excepción: el "—"
  como marcador de celda sin dato
- Sin emojis en la UI. Sin lenguaje de desarrollador al usuario
- **Cero mentiras en pantalla**: donde no hay dato va un guion y una invitación
  a generarlo. Nunca un 0%, nunca un contador inventado

### Lección larga

`.doc-sheet` de `index.css`: hoja clara que **no se invierte en modo oscuro**.
Dentro van `.doc-muted`, `.doc-rule`, `.doc-soft` y las variables `--doc-*`,
nunca los tokens del tema. Ver `NotamLesson.tsx`.

---

## Arquitectura de navegación

El menú separa **lo que se estudia** de **lo que se usa**:

- **Módulos** (catálogo académico, la vitrina del producto): Examen PCA,
  Inglés ICAO, Ingreso a aerolínea, Materias generales (Pronto)
- **Herramientas**: Banco oficial, Qué cayó en el examen, Para cuál calificas,
  Logbook, Vencimientos, Mi ruta
- **Cuenta**: Comunidad, Referidos, Mi perfil

Rutas que cambiaron el 31 jul, con redirección desde las viejas:
- `/app/exam-tracker` → **`/app/examenes`**
- `/app/aerolineas` → **`/app/match`** (resolvía la confusión con
  `/app/aerolinea`, que difería en una letra)
- `/app/materias` ahora es el módulo Materias generales, no un redirect

---

## Base de datos: lo aplicado el 31 jul

Todas por MCP, con `anon` verificado sin `EXECUTE` después de cada una:

| Migración | Qué hace |
|---|---|
| `hoja_de_vida_publica` | `profiles.cv_public` (opt-in, false por defecto) + RPC `get_pilot_cv` |
| `metar_progreso` | `user_metar_progress` + RPC `metar_mark_progress` |
| `fix_activity_heatmap` | Repara el error 42804 |
| `subject_mastery_desde_vault` | `get_subject_mastery` cuenta el banco real |
| `pca_stats_with_exam_date` | RPC `pca_stats()` con fecha de examen y materia por retomar |

**Dos hallazgos que importan:**

`get_activity_heatmap` fallaba con **42804**: `generate_series` con `interval`
devuelve timestamp y el select no casteaba a `date`. Con la tabla vacía no se
notaba. Se conservó `America/Bogota` en el rango, que el borrador original
había perdido.

`get_subject_mastery` leía `subjects` + `questions`, la pareja legada **con una
sola pregunta en total**. Además, de las 11 materias del vault **solo 4 existen
en `subjects`**, así que perdía siete materias enteras. Ahora cuenta contra
`vault_questions` y `vault_sessions`: pasa de 6 materias con 1 pregunta a **11
con 459**.

**Aviso para el frontend**: `subject_id` llega `null` en esas siete materias.
El tipo en `Dashboard.tsx` debería ser `number | null`, y el nombre mostrado
salir de `getSubjectMeta(subject_slug)`, no de `subject_name`.

---

## Trampas técnicas (todas costaron tiempo)

1. **Postgres devuelve `EXECUTE` a `PUBLIC` en cada `create or replace
   function`.** Hay que revocar de nuevo:
   ```sql
   revoke all on function public.f() from public, anon;
   grant execute on function public.f() to authenticated;
   ```
   Así quedó `vault_insert` abierta a `anon` en su día. Correr `get_advisors`
   tipo `security` tras cualquier DDL.

2. **Un merge a main no siempre dispara deploy.** Pasó: el PR #88 quedó sin
   desplegar y Camilo vio la app sin cambios durante media hora. **Verificar
   siempre antes de decir que algo está listo:**
   ```bash
   gh api repos/camiloosorio2394/aviatoryapp/deployments \
     --jq '.[0] | "\(.sha[0:7]) \(.environment)"'
   ```
   Si no aparece `Production` para ese sha, un commit vacío lo dispara.

3. **El service worker es `registerType: 'prompt'`.** Llegó a servir CSS de
   tres deploys atrás. Tras desplegar, **Ctrl+Shift+R**. Si persiste:
   DevTools → Application → Service Workers → Unregister.

4. **Verificar en el bundle, no de palabra:**
   ```bash
   BUNDLE=$(curl -s https://aviatoryapp-mu.vercel.app/ | grep -oE 'assets/index-[A-Za-z0-9_-]+\.js' | head -1)
   curl -s "https://aviatoryapp-mu.vercel.app/$BUNDLE" | grep -c "UN_STRING_NUEVO"
   ```

5. **`document.fonts.check()` da falsos positivos**: responde true con fuentes
   del sistema. Para comprobar que una webfont cargó, iterar `document.fonts` y
   medir el ancho renderizado.

6. **Las imágenes deben estar en `globPatterns`** del precache de Workbox, o
   los clientes con SW viejo las ven rotas. **Pero ojo al revés**: las 14
   imágenes de NOTAM pesan 2,7 MB y se precachean todas.

7. **Windows no tiene `python`.** Para reemplazos masivos, Node. Y `split`/
   `join` con `\n` **falla en archivos con CRLF**: rompió un archivo entero y
   generó un diff de 1.200 líneas.

8. **`gh pr merge --delete-branch` borra la rama aunque el merge falle.**

---

## Flujo de trabajo con Nico

**Acordado: push directo a `main`, sin PR.** Los PR se morían en conflicto
cuando los dos tocaban las mismas pantallas en paralelo.

**Condición**: avisar antes de entrar a `Dashboard.tsx`, `Community.tsx` o
`Profile.tsx`. Ya se perdió un PR completo por eso.

Nico trabaja con el mismo sistema de diseño y lo respeta. Verificado: su código
no mete gradientes, `Sparkles`, pesos fuera de escala ni superficie vieja.

---

## Las 3 tareas que tiene Nico

1. **Tarjetas con foto en los hubs de curso.** Extraer `CourseCard` a `ui/`
   desde `landing/Solutions.tsx` y aplicarlo a los hubs de NOTAM y METAR, que
   hoy presentan sus secciones sin una sola imagen. Hacen falta ~8 fotos nuevas.
2. **Preparación para aerolínea** (`/app/aerolinea`): la pantalla es
   **completamente estática**, cero Supabase, no sabe qué lleva hecho el
   piloto. Además tiene dos botones primarios de distinto color y deuda de
   sistema (contenedor 1180, `card-apple`, `rounded-2xl`, botones a mano).
3. **Imágenes reales de NOTAM en la lección.** Ya hay 14 recortadas y **la
   lección no usa ninguna**: solo aparecen en la práctica. Camilo enviará PDFs
   de Aerocivil para ampliar. Pasar a WebP y sacarlas del precache.

También pendiente de su lado: práctica y evaluación de METAR, curso TAF, y la
prueba de aislamiento de RLS con dos usuarios reales.

---

## Pendientes de producto (de antes)

1. **Testimonios inventados en la landing**: tres nombres ficticios, avatares
   "JM/AL/VC", "+2.000 pilotos" y "4.9★". Lo más urgente antes de mostrarla a
   pilotos reales: el gremio LATAM es chico
2. **Banco PCA desbalanceado**: Meteorología 90, Performance 14, W&B 12
3. **El logo tiene texto sin vectorizar** (2 elementos `<text>`): al cargarse
   como `<img>` se renderiza con la fuente del sistema de cada equipo
4. **Leaked password protection** apagada en Supabase, un clic
5. `font-size: 16.5px` en el `html`, un valor arbitrario que escala todos los rem
6. La landing (`Solutions.tsx`) está desactualizada: no menciona el Banco
   oficial ni el visor, y usa 6 hex crudos. Ahí está el último `Sparkles` de
   la app

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
grep -rn "gridTemplateColumns" src/
grep -rnE '#[0-9A-Fa-f]{6}' src/pages src/components --include="*.tsx"
```
