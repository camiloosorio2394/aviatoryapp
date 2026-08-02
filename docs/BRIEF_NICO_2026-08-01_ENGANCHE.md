# Tarea: enchufar Ingreso a aerolínea a la racha, el heatmap y los logros

Va **después** de las cuatro que ya tienes (METAR MASTER, tarjetas con foto,
`/app/aerolinea` y las imágenes de NOTAM). No la empieces antes: dos de ellas
tocan los mismos archivos y esta se apoya en que ya estén hechas.

Sale de una auditoría completa del módulo hecha el 1 de agosto. El informe
entero está en `docs/AUDITORIA_MODULO_AEROLINEA_2026-08-01.md`: ahí está el
detalle, las notas por categoría y la comparación contra TEA y PCA. Aquí va
solo lo accionable.

---

## Lo que esta tarea NO es (para que no dupliques trabajo)

La auditoría encontró cosas que **ya están asignadas** en tus otros briefs. No
las toques desde aquí:

| Hallazgo | Dónde ya está |
|---|---|
| El hub es estático y no sabe quién eres | tarea `/app/aerolinea`, punto 1 |
| Dos botones primarios de distinto color | tarea `/app/aerolinea`, punto 2 |
| Contenedor 1180, `card-apple`, `rounded-2xl`, botones a mano | tarea `/app/aerolinea`, punto 3 |
| Las tarjetas no declaran cuánto contenido hay | tarea `/app/aerolinea`, punto 4 |
| El bloque "Los que siguen" ocupa media pantalla | tarea `/app/aerolinea`, punto 5 |
| METAR sin práctica ni evaluación | METAR MASTER, fase 3 |
| Progreso de METAR en Supabase | METAR MASTER, fase 4 |
| Lección plana, sin imágenes ni estructura | tareas de tarjetas con foto e imágenes NOTAM |

**Esta tarea es solo una cosa**: el módulo está construido y funcionando, pero
no está conectado a los sistemas de progreso y recompensa que la app ya tiene.
Un piloto estudia y la app no se entera.

---

## Bloque 0 · Los logros están congelados (empieza por aquí)

**Es lo más grave que salió de la auditoría, y no es solo del módulo de
aerolínea: afecta a toda la app.**

`check_and_unlock_achievements()` calcula tres logros leyendo
`public.quiz_attempts`:

```sql
select coalesce(sum(total_questions),0)::int,
       exists(select 1 from public.quiz_attempts
              where user_id = p_user_id and finished_at is not null)
  into v_total_questions, v_quiz_done
  from public.quiz_attempts
  where user_id = p_user_id and finished_at is not null;
```

Y `subject_master` hace lo mismo con `quiz_attempts.subject_id`.

**El problema**: `quiz_attempts` es la tabla del quiz viejo. Conteo real en
producción hoy:

| Tabla | Filas | Terminadas |
|---|---|---|
| `quiz_attempts` | 11 | 4 |
| `vault_sessions` | 14 | 2 |

**Ningún código de la app inserta en `quiz_attempts`.** El quiz actual
(`VaultQuizPlayer.tsx`) pasa por `vault_submit_answer` y llama a
`registrarActividadDeEstudio()`, pero nunca escribe esa tabla. Las dos únicas
referencias que quedan son lecturas de conteo.

**Consecuencias, las dos malas:**

1. `first_quiz`, `first_100` y `subject_master` **son imposibles de
   desbloquear** para cualquier usuario nuevo. Solo los tiene quien usó el quiz
   anterior a la migración del vault. Son 3 de los 10 logros de la app.
2. `src/pages/Dashboard.tsx:309` y `src/pages/Profile.tsx:130` cuentan
   `quiz_attempts` para mostrarle al piloto cuántos quizzes lleva. Ese número
   **no se mueve por más que estudie**. Es una mentira en pantalla de las
   difíciles de ver, porque el número es real, solo que de otra época.

Es exactamente el mismo error que tenía `get_subject_mastery` antes del 31 de
julio: lógica nueva apuntando a las tablas legadas.

### Qué hacer

1. **Migración** que reescriba `check_and_unlock_achievements` para que
   `v_total_questions`, `v_quiz_done` y `subject_master` salgan de
   `vault_sessions` (y `vault_sessions.subject_slug`, que es texto, no el
   `subject_id` numérico de la tabla vieja).
2. **Decide qué pasa con el histórico**: hay 4 intentos terminados en
   `quiz_attempts` de usuarios reales. Lo más limpio es sumar las dos fuentes
   en la función, para no quitarle a nadie un logro que ya tenía.
3. **Corrige los dos contadores** de `Dashboard.tsx:309` y `Profile.tsx:130`.
4. **Barre el resto**: busca cualquier otra función o consulta que siga
   nombrando `quiz_attempts`, `questions` o `subjects`. Este es el segundo caso
   que aparece, es probable que haya más.

> ⚠️ **`Dashboard.tsx` y `Profile.tsx` son archivos de coordinación.** Avísale a
> Cami antes de entrar, que es el acuerdo. Ya se perdió un PR completo por eso.

**Trampa de Postgres, la de siempre**: cada `create or replace function`
devuelve `EXECUTE` a `PUBLIC`. Después de recrearla:

```sql
revoke all on function public.check_and_unlock_achievements(uuid) from public, anon;
grant execute on function public.check_and_unlock_achievements(uuid) to authenticated;
```

Y corre `get_advisors` tipo `security` cuando termines.

---

## Bloque 1 · Estudiar en el módulo no cuenta para la racha ni el heatmap

`registrarActividadDeEstudio()` (`src/lib/activity.ts:30`) es lo que dispara
`record_daily_activity` + `increment_streak`. Se llama desde **dos archivos en
toda la app**:

- `src/pages/NotamExam.tsx:30`
- `src/pages/VaultQuizPlayer.tsx:20`

No la llaman: la lección de NOTAM (12 secciones), los 30 ejercicios de
práctica, el decodificador de NOTAM, la lección de METAR, el decodificador de
METAR, **ni ninguna de las cinco pantallas del módulo ICAO**.

**Traducido**: un piloto lee las 12 secciones de la lección de NOTAM, resuelve
los 30 ejercicios, se pasa dos horas, vuelve al Dashboard y ve racha 0 y el
heatmap vacío. La conclusión razonable para él es que la app no funciona.

### Qué hacer

Llamar `registrarActividadDeEstudio()` al **completar una unidad de trabajo**:

| Dónde | Cuándo dispararlo |
|---|---|
| `NotamLesson.tsx` | al marcar una sección como leída |
| `NotamPractice.tsx` | al resolver un ejercicio |
| `MetarLesson.tsx` | al marcar una sección como leída |

**Y una regla de diseño que importa más que el código**: dispara al completar
algo, **nunca al abrir la página**. Si la racha se mantiene viva por entrar y
salir, deja de significar nada y se convierte en otro número inventado. La
racha tiene valor porque cuesta.

Sobre los decodificadores: **no cuentan**. Consultar una herramienta no es
estudiar, y ya están declarados en la UI como "consulta libre, sin límite".

**ICAO queda fuera de esta tarea**: tiene el mismo problema pero son cinco
pantallas más y es territorio de Cami. Está anotado en el informe (C2) y se
coordina aparte.

---

## Bloque 2 · El módulo no da ni un logro

Consulta a `public.achievements` en producción: **10 logros, ninguno de este
módulo.** Son onboarding, primer quiz, rachas de 3/7/30, materia dominada,
nivel ICAO, 100 preguntas, primer mensaje en comunidad y Founder.

Terminar el tema NOTAM completo (12 secciones + 30 ejercicios + evaluación
aprobada) **no desbloquea absolutamente nada**. Es el único tema terminado del
módulo y no tiene recompensa.

### Qué hacer

Insertar filas en `achievements` y extender `check_and_unlock_achievements`
con el patrón que ya está ahí (`_try_unlock` es idempotente, así que se puede
llamar siempre):

```sql
if v_notam_lesson_done then
  v_new := v_new + public._try_unlock(p_user_id, 'notam_lesson');
end if;
```

Propuesta de logros, ajústala con Cami:

| code | Nombre | Condición | tier |
|---|---|---|---|
| `notam_lesson` | Lección de NOTAM completa | 12 secciones en `user_notam_progress` | bronze |
| `notam_practice` | Práctica de NOTAM completa | 30 ejercicios resueltos | silver |
| `notam_exam` | Evaluación de NOTAM aprobada | `user_notam_exam_attempts.score >= EXAM_PASS_SCORE` | silver |
| `metar_lesson` | Lección de METAR completa | secciones en `user_metar_progress` | bronze |
| `notam_master` | NOTAM dominado | los tres de NOTAM desbloqueados | gold |

Los datos ya están todos en la base: `user_notam_progress`,
`user_notam_exam_attempts` y `user_metar_progress`. No hay que crear tablas.

El `icon` es un emoji (mira las filas existentes) y la maquinaria de toasts
(`src/hooks/useAchievementToasts.ts`) ya funciona: en cuanto la función los
otorgue, el aviso sale solo.

---

## Bloque 3 · La misma promesa aparece dos veces (decisión de producto)

**Esto no lo resuelvas tú solo: es una decisión de Cami.** Lo dejo aquí porque
salió en la auditoría y hay que cerrarlo.

`AirlinePrep.tsx` lista como temas "Pronto": Entrevista técnica, Entrevista HR
y CRM, y Psicotécnicos y assessment.

`src/components/layout/AppSidebar.tsx:104-108` lista, como módulos "Pronto"
aparte: `/app/entrevistas` y `/app/psicotecnicas`.

Las dos rutas existen y son placeholders (`InterviewSim.tsx:181,259` y
`PsychTests.tsx:25-27`, que dice literal "Hoy no hay ni una batería cargada").

O sea: lo mismo está prometido en dos sitios como dos cosas distintas. El
piloto no sabe si las entrevistas son parte del módulo de aerolínea o un módulo
suyo. **Hay que elegir una** y quitar la otra.

**Relacionado y más fácil**: `AirlinePrep.tsx:98-104` anuncia "Requisitos por
aerolínea · Pronto", y en la misma pantalla (línea 153) enlaza a `/app/match`,
que hace exactamente eso, funciona y está en el menú como "Para cuál
calificas". Ese sí es de arreglo directo: saca el tema de la lista de "Pronto"
y preséntalo como parte disponible. **Ganas un tema sin escribir contenido.**

---

## Bloque 4 · Limpieza que salió en la auditoría

Cosas chicas, todas verificadas, ninguna cubierta por tus otros briefs.

**4.1 · El ancho del contenido salta en cada clic.** La tarea de
`/app/aerolinea` ya arregla el hub (1180 a 1280). Faltan las otras ocho
pantallas del módulo, que hoy usan cuatro anchos distintos:

```
src/pages/Notam.tsx:225          max-w-[1480px]
src/pages/NotamLesson.tsx:172    max-w-[1180px]
src/pages/NotamPractice.tsx:244  max-w-[1480px]
src/pages/NotamPractice.tsx:771  max-w-[1200px]
src/pages/NotamExam.tsx:394      max-w-[1100px]
src/pages/Metar.tsx:86           max-w-[1180px]
src/pages/MetarLesson.tsx:101    max-w-[1180px]
src/pages/MetarDecoder.tsx:96    max-w-[1180px]
```

Recorrido real de un piloto: hub 1480 → lección 1180 → práctica 1480 →
evaluación 1100. El texto cambia de medida en cada pantalla. Todo a **1280**,
revisando a ojo que la lección y la evaluación no queden raras (ahí el ancho
efectivo lo manda `max-w-[52ch]`, no el contenedor).

**4.2 · `Sparkles` sigue vivo.** Se daba por erradicado salvo en la landing y
**hay 16 usos en 19 archivos**. Dentro del módulo: `Notam.tsx:248`,
`NotamDecoder.tsx`, `NotamExam.tsx`. Quítalos de las páginas del módulo. El
sistema lo rechazó por leerse "hecho con IA".

**4.3 · El módulo no usa ni un símbolo aeronáutico.** Los ocho temas de
`AirlinePrep.tsx` llevan iconos genéricos (`Briefcase`, `Wrench`, `Cog`,
`Brain`, `ClipboardList`). `src/components/icons/aero.tsx` tiene VOR, NDB,
waypoint, aeródromo, circuito de espera y localizador, y solo se usa el
`HoldingIcon` en las tarjetas "Pronto". Cámbialos donde signifiquen algo, y
donde no, déjalos: la regla es que el símbolo informe, no que decore.

**4.4 · Comentario obsoleto.** `src/pages/Metar.tsx:17-18` dice que la
migración de progreso está "pendiente de aplicar". Se aplicó el 31 de julio.

**4.5 · El módulo cambia de nombre según dónde estés.** "Prep aerolínea" en el
botón volver de `Metar.tsx:96`, "Ingreso a aerolínea" en `Notam.tsx:230` y en
el menú. Unifica a **"Ingreso a aerolínea"**.

**4.6 · Dos controles distintos para lo mismo.** `Metar.tsx:92-98` usa un botón
con `border border-border bg-card` (que además está prohibido) y `rounded-full`;
`Notam.tsx:226-231` usa un enlace de texto. Son pantallas hermanas: deja uno
solo, el enlace de texto de `Notam.tsx`.

---

## Verificación

Lo de siempre:

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

Específico de esta tarea:

```bash
# ya no deben quedar anchos sueltos en el modulo
grep -rn "max-w-\[1[0-4][0-9]0px\]" src/pages/Notam*.tsx src/pages/Metar*.tsx src/pages/AirlinePrep.tsx

# Sparkles fuera del modulo
grep -rn "Sparkles" src/pages/Notam*.tsx src/pages/Metar*.tsx src/pages/AirlinePrep.tsx

# quien sigue leyendo la tabla legada
grep -rn "quiz_attempts" src/ --include="*.tsx" --include="*.ts" | grep -v types.ts
```

**Y la prueba de verdad, que es la única que cuenta**: entra con un usuario
real, lee una sección de la lección de NOTAM, y comprueba que el heatmap del
Dashboard marca el día y que la racha sube. Si eso no pasa, lo demás da igual.

Después, verifica que el deploy existe antes de dar nada por hecho:

```bash
gh api repos/camiloosorio2394/aviatoryapp/deployments --jq '.[0] | "\(.sha[0:7]) \(.environment)"'
```

---

## Orden sugerido

1. **Bloque 0**, la migración de logros congelados. Es lo más grave y afecta a
   toda la app, no solo a este módulo. Coordina antes por `Dashboard.tsx` y
   `Profile.tsx`
2. **Bloque 1**, la actividad de estudio. Es lo que más cambia la sensación del
   producto y es el más barato de los tres
3. **Bloque 2**, los logros del módulo. Se apoya en el bloque 0
4. **Bloque 4**, la limpieza. Se puede hacer en cualquier momento y en un
   commit aparte
5. **Bloque 3** no es código: pásaselo a Cami

Un commit por bloque. Con push directo a main, avisa antes de entrar a
`Dashboard.tsx` o `Profile.tsx`.

---

## Por qué esta tarea vale la pena

De la auditoría salió una nota global de **3,7 sobre 10** para el módulo. El
tema NOTAM aislado sacaría alrededor de **7,5**: está bien investigado, bien
citado contra el Doc 8400 y el Anexo 15, y su hub es la mejor página de la app.

La nota no baja por la calidad de lo construido. Baja porque lo construido no
está enchufado: el estudio no cuenta, no hay ni un logro, y tres de los diez
que existen ni siquiera se pueden desbloquear.

Nada de esto es rediseño ni contenido nuevo. Son cables sueltos entre piezas
que ya funcionan por separado, y por eso esta tarea sube la nota más que meses
de material nuevo.
