# Tarea: cerrar el módulo Ingreso a aerolínea

Pégale esto completo a tu Claude Code, parado en la raíz del repo.

Sale de una re-auditoría del módulo hecha sobre tus 12 commits ya desplegados
(`3a4a030`), no sobre el estado de ayer. El informe de fondo sigue en
`docs/AUDITORIA_MODULO_AEROLINEA_2026-08-01.md`.

---

## Antes de nada: lo que NO hay que volver a tocar

Se verificó contra el código y contra producción, no contra el reporte. Está
cerrado y bien:

- **La actividad de estudio.** 7 superficies con `registrarEstudioDiario` más 4
  exámenes con `registrarActividadDeEstudio`. El tope de una vez al día por
  superficie fue mejor idea que la que iba en el brief anterior: sin él, leer 13
  secciones habría metido 13 actividades en un día y la intensidad del heatmap
  habría dejado de significar nada.
- **Los logros.** Los 6 del módulo existen, los umbrales viven en
  `module_thresholds` y las tres migraciones están aplicadas en producción.
- **La contradicción de la portada**, los anchos del contenedor (módulo entero a
  1280), la deuda de sistema del hub, el cierre de METAR, las 22 preguntas
  intercaladas, los 24 recortes en WebP fuera del precache y los 9 NOTAM reales
  dentro de la lección.

La nota del módulo pasó de **3,7 a 6,3**. Lo que sigue es lo que falta para que
suba de ahí.

**Ya está hecho de mi lado**: la migración `20260801030000_metar_master_condicion.sql`
añade la condición de `metar_master`, que faltaba en tus dos migraciones (la
`20260801020000` inserta el logro y le cuelga el disparador, pero ninguna rama
de `check_and_unlock_achievements` lo otorgaba). Está aplicada y en `main`. Queda
inerte hasta que hagas el punto 2 de abajo.

---

## 1 · El simulacro no guarda nada 🔴

Es lo que más rinde de toda la lista.

`src/pages/AirlineMockExam.tsx` no tiene una sola línea de Supabase ni de
`localStorage`. Verificado con grep: cero. El piloto presenta 25 preguntas, ve
su nota, sale de la pantalla y desapareció. Sin mejor puntaje, sin historial,
sin logro, y el hub no se entera de que lo presentó.

Y es justo la pieza que construiste para dar una razón para volver cuando ya
leíste todo. Hoy es la única del módulo con amnesia total: `NotamExam` persiste
en base y `MetarExam` al menos en local.

**Qué hacer:**

1. **Migración** (escríbela, no la apliques: yo la aplico por MCP como siempre).
   Tabla `user_airline_mock_attempts`, espejo de `user_notam_exam_attempts`:
   `id`, `user_id`, `score`, `correct`, `total`, `taken_at`. RLS de select e
   insert propios, índice por `(user_id, score desc)`.

2. En la misma migración, el logro. Propuesta:
   `airline_mock_passed`, "Simulacro superado", tier **gold**, `order_index` 17.
   Y su condición dentro de `check_and_unlock_achievements`, con el mínimo real
   del simulacro, que es **85** (`PASS_SCORE` de `AirlineMockExam.tsx:30`), no
   los 80 de las evaluaciones de tema.

3. **El disparador**, o el logro no se otorga nunca. Es el error que ya pasó con
   `metar_master`:
   ```sql
   create trigger trg_check_achievements_airline_mock
     after insert or update on public.user_airline_mock_attempts
     for each row execute function public.trigger_check_achievements();
   ```

4. **Y el `revoke`**, que Postgres devuelve `EXECUTE` a `PUBLIC` en cada
   `create or replace function`:
   ```sql
   revoke all on function public.check_and_unlock_achievements(uuid) from public, anon;
   grant execute on function public.check_and_unlock_achievements(uuid) to authenticated;
   ```

5. **En el frontend**: `guardar()` inserta el intento, y la tarjeta del simulacro
   en el hub muestra el mejor puntaje en vez de "Cada intento baraja de nuevo",
   que es cierto pero esquiva que también olvida cada intento.

---

## 2 · METAR sigue a medio persistir 🔴

`src/pages/AirlinePrep.tsx:152-159` lee la lección de la base pero la práctica y
la evaluación de `localStorage`:

```ts
const metar = useMemo(() => {
  const local = readMetarProgress()
  return resumirMetar({
    lessonScreens: metarScreens,        // de la base
    practiceDone: local.practiceDone,   // solo local
    bestExamScore: local.bestExamScore, // solo local
  })
}, [metarScreens])
```

Consecuencia: **en otro dispositivo el porcentaje de METAR sale mal.** La lección
aparece y los 10 informes y la evaluación aparecen en cero. Es el hallazgo C4 del
informe, que arreglamos para NOTAM y quedó abierto para METAR.

Tres ediciones:

1. **`src/pages/MetarPractice.tsx:91`** llama `writeMetarProgress` (localStorage)
   y no `markMetarProgress`. `NotamPractice.tsx` es el modelo: importa
   `markNotamProgress` y escribe en los dos sitios.

2. **`src/pages/MetarExam.tsx:43`** guarda el puntaje solo en local. Tiene que
   insertar en `user_metar_exam_attempts`, que ya existe en producción desde hoy.
   `NotamExam.tsx:781` es el modelo.

3. **`src/pages/AirlinePrep.tsx:138-142`** ya recibe `metarRes` de
   `fetchMetarProgress`, que devuelve `practiceDone`, y solo usa
   `lessonScreens`. Está descartando el dato que necesita.

Cuando estas tres estén, `metar_master` se vuelve alcanzable solo: la lógica ya
está en la base.

---

## 3 · La línea de ruta se rompe sola 🟠

`src/pages/AirlinePrep.tsx:328` arma la frase con
`PROXIMOS.slice(1, -1).join(", ")`. Simulado:

```
5 pendientes: "...es A. Después vienen B, C, D y E."   correcto
2 pendientes: "...es A. Después vienen  y B."          doble espacio
1 pendiente : "...es A. Después vienen  y A."          nombra A dos veces
```

La lista **se encoge por diseño** cada vez que abren un tema. Con Performance
abierto quedan 4, luego 3, y en los dos siguientes la frase está rota, incluido
un caso donde el mismo tema aparece como "el próximo" y como "y A".

Sácalo a una función que maneje los tres casos (uno, dos, y N) y no dependa de
que la lista tenga al menos tres elementos. Y con `PROXIMOS` vacío, que la frase
entera desaparezca en vez de quedar coja.

---

## 4 · `CourseCard` rompe tres reglas del sistema, y las propaga 🟠

Es el componente compartido de la landing, el hub del módulo y los hubs de tema,
así que lo que tenga se multiplica por cuatro pantallas.

En `src/components/ui/course-card.tsx`:

- **`font-bold` en 4 sitios**, incluido el título de la tarjeta (línea 137). El
  sistema es 400 / 500 / 600, y `font-bold` es 700
- **`text-[11px]`** (líneas 103, 111, 119) y **`text-[14px]`**: los dos fuera de
  la escala 12 / 13 / 15 / 17 / 20 / 24 / 32
- **Línea 193**: `border bg-card` en el contenedor, cuando la regla es `.surface`

El `rounded-2xl` sí está bien: es la excepción acordada para la tarjeta de curso,
que viene del patrón de la landing.

**Ojo al cambiarlo**: la landing usa el mismo componente. Después de bajar
`font-bold` a `font-semibold` y `text-[11px]` a `text-[12px]`, mira la portada y
confirma que no se desarmó. Si la landing necesita más peso que el interior, eso
se resuelve con una prop, no dejando el 700 para todos.

---

## 5 · Tres pantallas de ICAO todavía no cuentan 🟡

Conectaste Quiz, Comprensión y Simulacro. Faltan las otras tres, verificado con
grep (cero llamadas):

```
src/pages/IcaoVocabulary.tsx
src/pages/IcaoInterview.tsx
src/pages/IcaoPictureDescription.tsx
```

Mismo patrón: `registrarEstudioDiario("icao-vocabulario")` y equivalentes, al
completar algo, nunca al montar la página.

---

## 6 · Sueltos 🟡

- **`src/pages/MetarPractice.tsx:263`** usa `border border-border bg-card` en el
  textarea. Es el patrón prohibido, aunque sea un control de formulario.
- **La lección usa 9 de los 24 recortes** y 9 de las 13 secciones siguen sin una
  sola imagen. Las candidatas naturales son la 4 (estructura), la 5 (la línea Q)
  y la 8 (abreviaturas), que hoy son texto corrido. La regla sigue siendo que la
  imagen enseñe lo que dice el párrafo de al lado.
- **El hub dice cuántas secciones tiene cada tema pero no cuánto tardan**, y
  `LessonScreen.minutes` ya guarda el dato por sección. Sumarlo y mostrarlo deja
  al piloto planear una sesión de estudio.

---

## Y dos cosas que ya no son arreglo sino oportunidad

**Repetición espaciada.** Es la ausencia más cara que queda y hasta ahora no
había material para justificarla. Ya lo hay: entre las 22 preguntas intercaladas,
los 50 ejercicios de práctica y las 60 de evaluación hay banco de sobra para una
cola de repaso con lo que fallaste. Hoy nada te devuelve un error, y esto se
prepara durante meses. Habla con Cami antes de meterle mano: es decisión de
plataforma y toca también el banco PCA.

**Performance y planificación** es el próximo de `PROXIMOS` y además es la
materia más floja del banco PCA (14 preguntas, contra 90 de Meteorología). Un
mismo esfuerzo de contenido tapa los dos huecos.

---

## Pendiente de Cami, no tuyo

Sigue sin decidirse si Entrevista técnica, HR y Psicotécnicos son temas del
módulo o módulos aparte. Hoy están prometidos en los dos sitios: en `PROXIMOS`
de `AirlinePrep.tsx` y como `/app/entrevistas` y `/app/psicotecnicas` en el
bloque "Próximamente" del sidebar, ambos placeholders. No lo toques hasta que
él elija.

---

## Verificación

```bash
npx tsc -p tsconfig.app.json --noEmit
npm run build
npx eslint src --ext .ts,.tsx        # no subir de 20 problemas
```

Convenciones:

```bash
grep -rn "—" src/pages src/components --include="*.tsx" | grep -v '"—"'
grep -rnE "tenés|podés|practicá|acá\b" src/
grep -rnE '#[0-9A-Fa-f]{6}' src/pages src/components --include="*.tsx"
```

Específico de esta tanda:

```bash
# el simulacro ya persiste
grep -n "supabase" src/pages/AirlineMockExam.tsx

# METAR escribe en la base, no solo en local
grep -n "markMetarProgress\|user_metar_exam_attempts" src/pages/MetarPractice.tsx src/pages/MetarExam.tsx

# escala tipografica y pesos en la tarjeta compartida
grep -nE "font-bold|extrabold|text-\[1[14]px\]" src/components/ui/course-card.tsx

# las tres de ICAO
grep -c registrarEstudioDiario src/pages/IcaoVocabulary.tsx src/pages/IcaoInterview.tsx src/pages/IcaoPictureDescription.tsx
```

**Y la prueba que de verdad cuenta**: presenta el simulacro con un usuario real,
sal de la pantalla, vuelve al hub y comprueba que tu mejor puntaje sigue ahí.
Después haz lo mismo con la práctica de METAR desde otro navegador. Si el
porcentaje no viaja, lo demás da igual.

Cuando termines, avísame para correr `get_advisors` tipo `security` y aplicar tu
migración. Y verifica el deploy antes de dar nada por hecho:

```bash
gh api repos/camiloosorio2394/aviatoryapp/deployments --jq '.[0] | "\(.sha[0:7]) \(.environment)"'
```

---

## Orden

1. **Punto 1**, el simulacro. Es el de mayor retorno y arrastra migración
2. **Punto 2**, METAR. Son tres ediciones cortas con modelo a la vista, y
   desbloquean un logro que ya está esperando en la base
3. **Punto 3**, la línea de ruta. Es chico y es una bomba de tiempo
4. **Punto 4**, `CourseCard`. Revisa la landing después
5. **Puntos 5 y 6**, en un commit de limpieza

Un commit por punto. Push directo a main, y avisa antes de entrar a
`Dashboard.tsx` o `Profile.tsx`.
