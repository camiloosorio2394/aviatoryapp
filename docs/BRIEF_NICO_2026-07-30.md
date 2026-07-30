# Brief para Nico · 30 de julio de 2026

Pégale esto completo a tu Claude Code, parado en la raíz del repo (`aviatoryapp`).
Está pensado para que puedas trabajar en paralelo con Cami sin que se pisen.

---

## Contexto de lo que pasó hoy

Cami corrió una auditoría visual multi-agente sobre el interior de la app. Salieron
**53 hallazgos confirmados** y ya se aplicaron **114 correcciones** en tres tandas
(PRs #83 y #84 ya mergeados). El diagnóstico de fondo del auditor fue:

> "El interior está diseñado para un producto que todavía no existe."

Con la data real de hoy (4 usuarios, 11 intentos de quiz, contenido en solo 2 de 6
módulos), el piloto veía la versión más pobre de todo: ceros de 64px como elemento
dominante, curvas de tendencia inventadas al lado de números en cero, y scroll
horizontal en celular.

Además se construyó la **sección NOTAM** completa dentro del módulo Prep aerolínea
(lección tipo documento, decodificador de los 246 códigos del Doc 8400, práctica con
14 NOTAM reales de la Aerocivil y evaluación de 20 preguntas).

---

## ⚠️ ARCHIVOS QUE NO DEBES TOCAR

Cami está trabajando **ahora mismo** en estos. Si los editas, se sobreescriben:

```
src/pages/Icao.tsx              src/pages/IcaoInterview.tsx
src/pages/IcaoQuiz.tsx          src/pages/IcaoComprehension.tsx
src/pages/IcaoMockExam.tsx      src/pages/IcaoVocabulary.tsx
src/pages/IcaoPictureDescription.tsx
src/pages/InterviewSpeakingIntro.tsx
src/pages/Dashboard.tsx         src/pages/Onboarding.tsx
src/pages/Logbook.tsx           src/pages/Expiries.tsx
src/pages/Profile.tsx           src/pages/ExamTracker.tsx
src/pages/ExamTrackerSubject.tsx
src/components/layout/Header.tsx
src/components/layout/AppSidebar.tsx
src/pages/Notam*.tsx            src/lib/notam.ts  src/lib/notamLesson.ts
src/pages/AirlinePrep.tsx       src/index.css
```

Todo lo demás es tuyo. Las tareas de abajo están elegidas justamente para no cruzarse.

---

## Tarea 1 · Backend: la RPC del quiz no devuelve la materia (bloquea una mejora de UX)

**Prioridad: alta. Es la única tarea que desbloquea trabajo de front.**

`vault_start_quiz` arma el payload con `jsonb_build_object('position', 'question', 'options')`
y **no incluye `subject_slug` por pregunta**. Además la sesión guarda
`p_subject_slug = null` cuando el quiz es mixto.

Consecuencia: al terminar un quiz, el resumen no puede agrupar los resultados por
materia ni decir "fallaste 3 de Meteorología". Hoy solo muestra 20 chips tipo "Q1 ✓",
que no le sirven a nadie para estudiar.

**Qué hacer:**

1. Abre `supabase/migrations/20260609220000_vault_question_bank.sql` y localiza
   `vault_start_quiz` y `vault_submit_answer`.
2. Crea una migración nueva (no edites la vieja) que:
   - Agregue `subject_slug` a cada objeto de pregunta del payload de `vault_start_quiz`.
   - Se asegure de que `vault_sessions` guarde la materia de cada pregunta, o que
     `vault_submit_answer` la devuelva junto con el resultado.
3. Respeta el modelo de seguridad del vault: las funciones son `SECURITY DEFINER` con
   `search_path = ''`. **Ojo con esto**: en Postgres, cada `create or replace function`
   **restaura el permiso EXECUTE a PUBLIC**. Después de recrear la función tienes que
   volver a hacer:
   ```sql
   revoke execute on function public.vault_start_quiz(text, text, integer, smallint) from public, anon;
   grant execute on function public.vault_start_quiz(text, text, integer, smallint) to authenticated, service_role;
   ```
   (Hoy 30 de julio se aplicó una migración de blindaje justamente porque `vault_insert`
   había quedado abierta a `anon` por este motivo: cualquiera con la clave pública podía
   inyectar preguntas al banco.)
4. Corre el linter de seguridad después: pídele a Claude que use el conector de Supabase
   con `get_advisors` tipo `security` y verifica que no aparezcan errores nuevos.
5. Actualiza los tipos: `generate_typescript_types` y pisa `src/integrations/supabase/types.ts`.

Cuando esté listo, avísale a Cami: el cambio de front (agrupar el resumen del quiz por
materia) lo hace él en `VaultQuizPlayer.tsx` y `useVaultQuiz.ts`.

---

## Tarea 2 · Contenido: nivelar el banco del PCA

**Prioridad: alta. Es lo que más limita el producto hoy.**

Conteo real del vault a hoy (459 preguntas totales):

| Materia | Preguntas |
|---|---|
| Meteorología | 90 |
| Aerodinámica | 67 |
| Reglamentación | 62 |
| Procedimientos | 43 |
| Servicios meteo | 39 |
| Factores humanos | 38 |
| Sistemas | 35 |
| Navegación | 30 |
| Instrumentos | 29 |
| **Performance** | **14** |
| **Weight & Balance** | **12** |

Con 12 preguntas, un quiz de 10 repite casi todo el banco en un solo intento. La UI ya
marca esas materias como "Banco chico" para que la escasez sea información y no sorpresa,
pero la solución real es cargar más.

**Workflow (ya existe, está documentado):**

1. Copia `private-batches/_template.json.example` a `private-batches/performance-batch1.json`.
2. Rellena con las preguntas en el shape del template.
3. `node scripts/seed-questions.mjs private-batches/performance-batch1.json`
4. Verifica el conteo en Supabase.
5. **Borra el JSON local**: `rm private-batches/performance-batch1.json`
   (el `.gitignore` ya lo cubre, pero igual: el texto plano nunca debe quedar en el repo).

Meta sugerida: llevar Performance y W&B a **40 preguntas cada una** como mínimo.

---

## Tarea 3 · Módulos con cero contenido: decidir qué hacer

Estas tres tablas están **vacías** y sus pantallas hoy dicen "Pronto":

- `psych_tests` → módulo Psicotécnicas
- `library_items` → módulo Biblioteca
- `airline_profiles_prep` → perfiles por aerolínea

No es trabajo de código: es decidir si se cargan o si se sacan del menú por ahora.
Coordínalo con Cami. Si deciden cargar, el patrón de seed ya existe.

---

## Tarea 4 · Deuda de lint: 24 errores de `set-state-in-effect`

El proyecto tiene la regla `react-hooks/set-state-in-effect` del React Compiler activa y
hay **24 errores** repartidos en archivos que nadie tocó hoy. No bloquean el build
(`npm run build` no corre eslint), pero conviene limpiarlos.

Archivos afectados (**todos libres, ninguno está en la lista de bloqueados**):

```
src/hooks/useInView.ts          src/hooks/useNotifications.ts
src/hooks/useProfile.ts         src/hooks/useRecorder.ts
src/hooks/useWingman.ts         src/pages/Login.tsx
src/pages/CommunityChannel.tsx
```

**El patrón correcto** (así se arregló `NotamExam.tsx` hoy):

```ts
useEffect(() => {
  if (sessionLoading) return
  let cancelled = false
  void (async () => {
    if (!userId) {
      if (!cancelled) { setRows([]); setLoading(false) }
      return
    }
    setLoading(true)
    const { data, error } = await supabase...
    if (cancelled) return
    // ...
  })()
  return () => { cancelled = true }
}, [userId, sessionLoading])
```

O sea: el guard se queda en el cuerpo del efecto, y **todos los `setState` van dentro del
IIFE async o de un callback**. Verifica con `npx eslint src --ext .ts,.tsx`.

También hay 3 avisos de `react-refresh/only-export-components` en
`src/components/ui/{badge,button,tabs}.tsx`: son inherentes al patrón de shadcn, **déjalos**.

---

## Tarea 5 · Dos clics de configuración (no son código)

1. **Protección de contraseñas filtradas** en Supabase (el escáner de seguridad la reporta
   apagada):
   https://supabase.com/dashboard/project/gvwqmfxphsbmbrhyjcmk/auth/providers
   → Authentication → Settings → activar *Leaked password protection*

2. **Conectar GitHub en claude.ai** (esto lo pidió Cami):
   https://claude.ai/settings/integrations
   Sin eso no se pueden programar rutinas en la nube que trabajen sobre el repo.

3. **Ojo con Supabase**: el proyecto está en plan gratuito y **se pausa solo tras ~7 días
   sin actividad**. Ya pasó una vez: el backend estuvo caído semanas y nadie se dio cuenta
   porque la landing es estática. Hay una rutina automática (`supabase-keepalive-aviatory`,
   lunes y jueves) que hace ping y lo restaura si lo encuentra pausado. Cuando lancen con
   usuarios reales, conviene pasar a Supabase Pro (25 USD/mes).

---

## Convenciones del proyecto (importantes, Cami es estricto)

- **Español neutro LATAM con tuteo.** Prohibido el voseo: nada de "tenés", "podés",
  "practicá", "empezá", "sumate", "acá". Se hicieron dos barridos completos ya.
- **Prohibido el guion largo (—) en texto visible.** Cami dice que "se ve hecho con IA".
  Usa dos puntos, coma o punto. Excepción: el "—" como marcador de celda sin dato.
- **Sin emojis en la UI.**
- **Nada de lenguaje de desarrollador al usuario**: nunca "backend", "aplica la migración",
  "seed". Si un módulo no tiene contenido, se dice en términos de producto.
- **Cero mentiras en pantalla**: ningún número que la app no pueda sostener con datos
  reales. Donde no hay dato va un guion y una invitación a generarlo, nunca un 0% ni una
  curva inventada. Este fue el hallazgo #1 de la auditoría.
- **Colores solo con tokens.** Prohibido el hex crudo y las clases de color de Tailwind
  (`text-blue-600`, `bg-red-100`). Los tokens están en `src/index.css`: `--av-blue-500`,
  `--av-amber-400`, etc.
  **Trampa conocida**: los tokens `--av-*-400` son claros a propósito (sirven para iconos y
  barras). Como color de **texto chico** sobre fondo blanco dan ~2:1 y quedan ilegibles en
  modo claro. Para texto usa `--av-success-fg` / `--av-warn-fg` / `--av-danger-fg`, que ya
  tienen su par claro/oscuro.
- **Nada de `gridTemplateColumns` inline** en `style`: no admite media queries y era la
  causa raíz del scroll horizontal en celular. Usa clases `grid-cols-1 md:grid-cols-[...]`.
  Hoy hay **cero** en el proyecto, no los reintroduzcas.
- Mapa de color de tarjetas compartido: `src/lib/tileColors.ts`. No crees otro `TILE_COLOR`
  local (había cuatro duplicados con hex distintos).

---

## Cómo verificar antes de subir

```bash
npx tsc -p tsconfig.app.json --noEmit   # tiene que salir limpio
npm run build                            # tiene que compilar
npx eslint src --ext .ts,.tsx            # no agregues errores nuevos
```

Y el barrido de convenciones:

```bash
grep -rn "—" src/pages src/components --include="*.tsx" | grep -v '"—"'
grep -rn "gridTemplateColumns" src/
grep -rnE '#[0-9A-Fa-f]{6}' src/pages src/components --include="*.tsx"
```

Trabaja en una rama por tarea y abre PR. No mergees a `main` sin avisarle a Cami.
