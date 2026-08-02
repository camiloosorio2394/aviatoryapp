# Contexto para continuar trabajando en Aviatory

Pega este archivo completo al inicio de un chat nuevo de Claude Code, parado en
`C:\Datos\Documents\Projects\aviatoryapp`.

Última actualización: 30 de julio de 2026.

---

## ⚠️ LO PRIMERO QUE HAY QUE RESOLVER

Hay **dos PRs abiertos de Nico** que están basados en un commit ANTERIOR al último
trabajo que se mergeó:

| PR | Rama | Basado en | Toca |
|---|---|---|---|
| #86 | `fix/notam-cierre` | `82bda3b` (PR #84) | 8 archivos del módulo NOTAM |
| #87 | `redesign/app-como-el-inicio` | apilado sobre #86 | **38 archivos** de todo el interior |

**El riesgo:** el último merge a `main` fue el PR #85 (`b134b5a`), que reescribió
Dashboard, todo el módulo ICAO, Onboarding, AppSidebar y ExamTrackerSubject. Los PRs de
Nico **no contienen ese commit** y tocan varios de esos mismos archivos.

GitHub los reporta como `MERGEABLE / CLEAN`, pero eso solo significa que git puede
fusionar el texto sin choques de líneas. **No garantiza que el resultado sea correcto**:
si Nico editó otra región del mismo archivo, el merge automático puede dejar la traducción
al español a medias, revertir el hero con foto o duplicar la corrección de contraste.

**Qué hacer antes de mergear nada:**

```bash
git fetch origin
# Ver qué haría realmente cada merge sobre el main actual:
git merge-tree $(git merge-base origin/main origin/fix/notam-cierre) origin/main origin/fix/notam-cierre | head -50
```

Recomendación: pedirle a Nico que rebasee sus dos ramas sobre `main` actual y revise a
mano los archivos que ambos tocaron (Dashboard.tsx, Icao*.tsx, Onboarding.tsx,
AppSidebar.tsx, ExamTrackerSubject.tsx, Notam*.tsx). Si no, revisar el diff resultante
con cuidado antes de mergear.

---

## Qué es el proyecto

**Aviatory**: plataforma para pilotos de Latinoamérica (sobre todo Colombia) que se
preparan para el examen PCA de la Aerocivil, el inglés ICAO (examen TEA) y para postularse
a una aerolínea.

- **Dueños**: Camilo Osorio y Nico (MGN14). Los dos trabajan con Claude Code en paralelo.
- **Repo**: https://github.com/camiloosorio2394/aviatoryapp
- **Producción**: https://aviatoryapp-mu.vercel.app
- **Local**: `C:\Datos\Documents\Projects\aviatoryapp`
- **Stack**: Vite + React 19 + TypeScript + Tailwind + shadcn/ui + react-router-dom v6 +
  Supabase + Vercel. PWA con service worker (`registerType: 'prompt'`).
- **Supabase**: proyecto `gvwqmfxphsbmbrhyjcmk`, conectado por MCP.

---

## Estado actual (main = `b134b5a`)

### Módulos y su contenido REAL en base de datos

| Módulo | Ruta | Estado |
|---|---|---|
| Examen PCA | `/app/pca` | **459 preguntas** en vault encriptado, 11 materias |
| Inglés ICAO | `/app/icao` | 351 términos, 30 preguntas de quiz, simulacro TEA completo |
| Prep aerolínea | `/app/aerolinea` | Lista de 8 temas. **NOTAM abierto**, 7 en "Pronto" |
| NOTAM | `/app/aerolinea/notam` | Completo: lección, decodificador, práctica, evaluación |
| Psicotécnicas / Biblioteca / Entrevistas | | **Cero contenido**, marcados "Pronto" |

Banco PCA desbalanceado: Meteorología 90, Aerodinámica 67, Reglamentación 62,
Procedimientos 43, Servicios meteo 39, Factores humanos 38, Sistemas 35, Navegación 30,
Instrumentos 29, **Performance 14, Weight & Balance 12**.

Usuarios reales: 4. Intentos de quiz: 11. **Esto importa para el diseño**: con esa data,
el estado vacío es la pantalla que ve todo el mundo.

### El módulo NOTAM (construido el 2026-07-30)

Cuatro partes en `/app/aerolinea/notam`:
1. **Aprende**: lección de 9 secciones como documento continuo tipo PDF
2. **Decodificador**: 246 códigos del Doc 8400 (168 asuntos + 78 estados), con conversor
   de fecha/hora a UTC y hora de Colombia
3. **Práctica**: 16 ejercicios de texto + **14 NOTAM colombianos reales** en imagen
4. **Evaluación**: 20 preguntas barajadas, aprueba con 80

- Contenido: `src/data/notam/*.json` y `leccion_notam.md`; imágenes en `public/notams/`
- Lógica: `src/lib/notam.ts` y `src/lib/notamLesson.ts`
- Tablas: `user_notam_progress`, `user_notam_exam_attempts`, RPC `notam_mark_progress`
- Paquete fuente original: `C:\Datos\Desktop\AVIATORY APP - NOTAMS`

---

## Convenciones del proyecto (Camilo es estricto)

1. **Español neutro LATAM con TUTEO y tildes.** Prohibido el voseo: nada de "tenés",
   "podés", "practicá", "empezá", "sumate", "acá". Ya se hicieron dos barridos completos.
2. **Prohibido el guion largo (—) en texto visible.** Camilo dice que "se ve hecho con IA".
   Usa dos puntos, coma o punto. Excepción: el "—" como marcador de celda sin dato.
3. **Sin emojis en la UI.**
4. **Cero mentiras en pantalla.** Ningún número que la app no pueda sostener con datos
   reales. Donde no hay dato va un guion y una invitación a generarlo, nunca un 0% ni una
   curva inventada. Fue el hallazgo #1 de la auditoría.
5. **Nada de lenguaje de desarrollador al usuario**: nunca "backend", "aplica la
   migración", "seed".
6. **Nada finge ser clickeable**: si algo se levanta con hover, tiene que llevar a algún
   lado. Lo que no existe se declara con chip "Pronto" y se queda en reposo.

### Sistema visual

- **Tokens** (en `src/index.css`): `--av-blue-500`, `--av-blue-400`, `--av-cyan-400`,
  `--av-violet-400`, `--av-amber-400`, `--av-green-400`, `--av-red-400`, `--av-navy-*`.
  Shadcn: `bg-card`, `bg-muted`, `text-foreground`, `text-muted-foreground`,
  `border-border`. Shell: `--rail`, `--rail-border`, `--rail-text`.
- **Prohibido** el hex crudo y las clases de color de Tailwind (`text-blue-600`).
- **TRAMPA CONOCIDA**: los tokens `--av-*-400` son claros a propósito (sirven para iconos y
  barras). Como color de **texto chico** sobre fondo blanco dan ~2:1 y son ilegibles en
  modo claro. Para texto usa `--av-success-fg` / `--av-warn-fg` / `--av-danger-fg`, o las
  utilidades `.chip-green` / `.chip-amber` / `.chip-red`, que ya traen su par claro/oscuro.
- **Mapa de color de tiles compartido**: `src/lib/tileColors.ts`. No crees otro `TILE_COLOR`
  local (había cuatro duplicados con hex distintos).
- **Componentes**: `PageHeader` y `SectionTitle` de `src/components/ui/`. Úsalos siempre.
- **Hoja de lectura** `.doc-sheet`: superficie clara tipo PDF que NO se invierte en modo
  oscuro, para contenido largo de estudio. Adentro se usan `.doc-muted`, `.doc-rule`,
  `.doc-soft` y las variables `--doc-*`, nunca los tokens del tema de la app.
- **Fotografía**: `src/assets/photos/` (importar como módulo, no por ruta pública).
  Receta del hero con foto: `<img absolute inset-0 object-cover>` + velo
  `linear-gradient(135deg, rgb(11 16 32 / 88%), color-mix(in oklab, var(--av-blue-500) 34%, rgb(11 16 32 / 86%)))`
  + contenido `relative` con **texto blanco**. Regla de sobriedad: **foto solo en el hero de
  cada módulo**, el cuerpo queda plano a propósito.
- **Móvil obligatorio**: nada de `gridTemplateColumns` inline en `style` (no admite media
  queries; era la causa raíz del scroll horizontal). Usa `grid-cols-1 md:grid-cols-[...]`.

---

## Trampas técnicas descubiertas (no repetirlas)

1. **Postgres devuelve EXECUTE a PUBLIC** en cada `create or replace function`. Después de
   recrear una función `SECURITY DEFINER` hay que volver a revocar. Así fue como
   `vault_insert` quedó abierta a `anon` (cualquiera podía inyectar preguntas al banco).
   Corre `get_advisors` tipo `security` después de tocar la base.
2. **El PWA cachea las imágenes**: los `.jpg` tienen que estar en `globPatterns` del
   precache de Workbox (`vite.config.ts`). Si no, un cliente con service worker viejo pide
   los hashes del deploy anterior y ve imágenes rotas.
3. **Supabase free tier se pausa** tras ~7 días sin actividad. Ya pasó: el backend estuvo
   caído semanas sin que nadie lo notara porque la landing es estática. Hay una rutina
   automática (`supabase-keepalive-aviatory`, lunes y jueves 12:00 UTC) que hace ping y lo
   restaura. Al inicio de sesión conviene verificar con `get_project`.
4. **7 etapas de piloto en la base** (`pilot_stage` incluye `instructor`) pero el front las
   declara en tres archivos: `Dashboard.tsx`, `Profile.tsx` y `Route.tsx`, más el `switch`
   de `buildTodayPlan`. Si agregas una etapa, hay que tocar los cuatro.
5. **`.chip` está declarada fuera de `@layer`** en index.css, así que las utilidades de
   Tailwind (`h-8`, `py-2`) NO la sobreescriben. Para un chip táctil hay que dar altura con
   `style` inline.
6. Windows: no hay `python`. Para reemplazos masivos, script Node en el scratchpad.

---

## Verificación antes de subir

```bash
npx tsc -p tsconfig.app.json --noEmit   # tiene que salir limpio
npm run build                            # tiene que compilar
npx eslint src --ext .ts,.tsx            # no agregar errores nuevos
```

Barrido de convenciones:

```bash
grep -rn "—" src/pages src/components --include="*.tsx" | grep -v '"—"'
grep -rn "gridTemplateColumns" src/
grep -rnE '#[0-9A-Fa-f]{6}' src/pages src/components --include="*.tsx"
grep -rlP "\x00" src/          # bytes nulos: un agente dejó uno una vez
```

---

## Pendientes conocidos

### Producto (decisión de Camilo y Nico)
- **Testimonios inventados en la landing**: tres con nombre y ciudad ficticios, más los
  avatares "JM/AL/VC" y el "+2.000 pilotos". El gremio de pilotos LATAM es chico. Es lo
  más importante a resolver antes de mostrar la app a pilotos reales.
- **Nivelar el banco PCA**: Performance 14 y W&B 12 preguntas. Workflow en
  `private-batches/README.md` + `scripts/seed-questions.mjs`.
- **Tres módulos vacíos**: cargar contenido o sacarlos del menú.

### Técnico
- **24 errores de eslint** `react-hooks/set-state-in-effect` preexistentes en hooks
  (`useInView`, `useProfile`, `useWingman`, `useNotifications`, `useRecorder`) y en
  `Login.tsx`, `CommunityChannel.tsx`. No bloquean el build.
- **La RPC `vault_start_quiz` no devuelve `subject_slug`** por pregunta, así que el resumen
  del quiz no puede agrupar por materia. Requiere migración.
- **Leaked password protection** apagada en Supabase (un clic en el dashboard).
- **Conectar GitHub en claude.ai** para poder programar rutinas en la nube sobre el repo.

### Ideas del auditor que quedaron sin hacer
- Video corto en el botón "Ver cómo funciona" de la landing.
- Contenido SEO para búsquedas tipo "preguntas examen PCA Aerocivil".
- Screenshot real del producto en el hero (hoy es una réplica en vivo del simulacro TEA,
  que ya funciona bien).

---

## Historial de esta sesión (PRs #74 a #85)

- #74: eliminados 100 guiones largos del copy visible
- #75, #76: fotografía real de aviación en la landing
- #77: fix del PWA que rompía las imágenes en cada deploy
- #78: español neutro, CTA cinematográfico, marquee de aerolíneas
- #79, #80: réplica en vivo del Simulacro TEA en el hero, con audio ATC real
- #81: tarjeta OG 1200×630 para WhatsApp + Vercel Analytics
- #82: blindaje de seguridad de la base + fórmula de avance honesta
- #83: módulo NOTAM completo + 114 correcciones de la auditoría visual
- #84: lección NOTAM como documento + módulo de aerolínea por temas
- #85: idioma del módulo ICAO, identidad de marca, contraste, etapa `instructor`

Bugs reales encontrados de paso: el backend dormido, el match de Avianca imposible de
completar (pedía licencia "ME" pero el perfil solo guarda "MEP"), Viva Air en el catálogo
(cesó operaciones en 2023), y la etapa "Instructor" que dejaba la pantalla en blanco.
