# Prompt para Nico: verificar y cerrar el módulo NOTAM de Aviatory

> Copia todo lo que está debajo de la línea y pégalo en tu Claude Code, parado en la raíz del repo `aviatoryapp`.

---

## 0. Contexto: qué es Aviatory

Aviatory es una plataforma web de preparación para pilotos en LATAM. Acompaña la carrera aeronáutica completa: examen PCA de la Aeronáutica Civil de Colombia, inglés ICAO (nivel operacional 4), psicotécnicas, entrevistas y preparación para el ingreso a aerolínea. Es una app Vite + React + TypeScript + Tailwind + shadcn/ui, con backend en Supabase (PostgreSQL con RLS) y despliegue en Vercel. También es PWA.

El repo está en `aviatoryapp`. El módulo del que vas a encargarte es la **sección NOTAM**, que vive dentro del módulo "Prep aerolínea", en `/app/aerolinea/notam`.

Tienes permiso para modificar la app.

---

## 1. Qué hicimos nosotros (verificado en el git, no es genérico)

Estado del repo cuando se escribió esto: rama `feat/identidad-interior`, HEAD `82bda3b`, un solo worktree.

### 1.1 Correcciones de auditoría ya aplicadas

**PR #82 (`5e70f15`) seguridad y honestidad:**
- Migración `supabase/migrations/20260730050000_security_lockdown.sql`: `user_pca_readiness` deja de ser `SECURITY DEFINER` y de tocar `auth.users`, queda solo con RLS propia; `vault_insert` vuelve a ser exclusiva de `service_role` (estaba abierta a `anon`, o sea que cualquiera con la clave pública podía inyectar preguntas al banco); 26 funciones definer pierden `EXECUTE` de `anon`, solo sobrevive `check_username_available`.
- 31 correcciones de voseo a tuteo neutro en sidebar, dashboard, perfil, PCA, test inicial, login, logbook y comunidad.
- El avance hacia aerolínea pasa a ponderar etapa 60 por ciento, ICAO 25 por ciento y práctica 15 por ciento. Antes un candidato con ICAO 2 veía 92 por ciento.
- Landing: las tres tarjetas de módulos sin contenido (Psicotécnicas, Entrevistas, Aerolínea) marcan "Pronto" en vez de "Ver curso".

**PR #83 (`d63733e`) auditoría visual del interior, 53 hallazgos confirmados y 114 correcciones:**
- Cero datos inventados en pantalla. Se eliminaron las 4 sparklines falsas del Dashboard (una contradecía su propio número: ICAO mostraba 0 con la curva terminando en 4), el "Pass rate promedio 0%" del Exam Tracker, el "Tu mejor match hoy 0%" de Aerolíneas, las barras continuas del test inicial sobre muestras de 2 preguntas, y el desempate alfabético que hacía que "tu materia más floja" fuera casi siempre Aerodinámica.
- Móvil: cero `gridTemplateColumns` inline en todo el proyecto (era la causa raíz del scroll horizontal en Dashboard, Perfil y 6 héroes más). Logbook y Vencimientos dejaron de recortar columnas. Footer sticky en el quiz.
- Nada finge ser clickeable: se quitó el hover falso de AirlineCard, de los 14 chips de temas, de las tarjetas sin destino y de los KpiTile.
- Estados vacíos con icono, título y salida en Notificaciones, quiz player, Comunidad, Exam Tracker y Mi ruta.
- Un solo sistema de color: mapa compartido en `src/lib/tileColors.ts`, tokens semánticos `*-fg` con par claro/oscuro, y overrides de `--rail` en `.dark`.
- Esqueletos con la forma real de cada pantalla, carga del Dashboard partida en dos efectos.
- Datos corregidos en la base: Avianca pedía licencia "ME" pero el Perfil solo guarda "MEP", así que su match era imposible de completar; y el catálogo seguía ofreciendo Viva Air, que cesó operaciones en 2023, reemplazada por SATENA (`supabase/migrations/20260730070000_fix_airline_seed.sql`).

### 1.2 El módulo NOTAM que construimos (PR #83 y PR #84)

Ruta base `/app/aerolinea/notam`, con cuatro partes, todas registradas en `src/App.tsx`:

| Parte | Ruta | Archivo |
|---|---|---|
| Hub | `/app/aerolinea/notam` | `src/pages/Notam.tsx` |
| Aprende | `/app/aerolinea/notam/aprende` | `src/pages/NotamLesson.tsx` |
| Decodificador | `/app/aerolinea/notam/decodificador` | `src/pages/NotamDecoder.tsx` |
| Práctica | `/app/aerolinea/notam/practica` | `src/pages/NotamPractice.tsx` |
| Evaluación | `/app/aerolinea/notam/evaluacion` | `src/pages/NotamExam.tsx` |

Capa de datos y helpers: `src/lib/notam.ts` (486 líneas) y `src/lib/notamLesson.ts` (457 líneas). Contenido en `src/data/notam/`: `notam_codes.json` (246 códigos del Doc 8400: 168 asuntos y 78 estados), `ejercicios_interpretacion.json` (16 ejercicios: 5 oficiales del Doc 8400, 9 de práctica no oficial, 2 históricos), `evaluacion_notam.json` (20 preguntas: 5 básicas, 9 intermedias, 6 avanzadas), `notams_nacionales.json` (14 NOTAM colombianos reales) y `leccion_notam.md` (documento fuente de las 9 secciones).

**PR #84 (`82bda3b`)** hizo tres cambios más:
- NOTAM salió del menú lateral. No es una entrada de navegación: el módulo es "Prep aerolínea" y NOTAM es un tema adentro.
- `/app/aerolinea` (`src/pages/AirlinePrep.tsx`) se reescribió como lista de 8 temas, con NOTAM abierto arriba y los otros 7 con chip "Pronto".
- La lección dejó de ser un wizard de 9 pantallas sobre `bg-card` y pasó a ser un **documento continuo tipo PDF**: hoja de lectura `.doc-sheet` en `src/index.css` que se mantiene clara aunque la app esté en modo oscuro, índice sticky con las 9 secciones, sección activa según el scroll, medida de lectura de 68ch, y el progreso se marca al pasar cada sección con un `IntersectionObserver` en vez de al pulsar "Siguiente".

### 1.3 Trabajo sin commitear en este momento

Hay 14 archivos modificados sin commitear en `feat/identidad-interior`: `AppSidebar.tsx`, `Header.tsx`, `Dashboard.tsx`, `ExamTracker.tsx`, `ExamTrackerSubject.tsx`, `Expiries.tsx`, `Icao.tsx`, `IcaoComprehension.tsx`, `IcaoInterview.tsx`, `IcaoMockExam.tsx`, `IcaoQuiz.tsx`, `Logbook.tsx`, `Onboarding.tsx`, `Profile.tsx`. Es una pasada de identidad visual del interior (isotipo del sidebar sin la caja de gradiente, contraste de labels). **Ninguno de esos archivos toca NOTAM**, así que puedes trabajar el módulo sin cruzarte. Igual, no los toques ni los commitees tú.

---

## 2. Qué necesitamos de ti

Verificar y **completar o corregir** el módulo NOTAM para que cumpla dos criterios de aceptación, más la integración correcta con Supabase, **sin romper el resto de la app**.

### Criterio A: los NOTAM deben quedar cargados como IMÁGENES, no como texto plano

Estado real hoy, ya verificado:

- Los 14 NOTAM nacionales están como PNG en `public/notams/`, servidos como assets estáticos de Vite y Vercel. **No se usa Supabase Storage** para esto (el único bucket del proyecto es `avatars`, usado en `Profile.tsx`).
- `notamImageUrl()` en `src/lib/notam.ts:208` toma el basename de la ruta del paquete de contenido (`assets/notams_nacionales/x.png`) y devuelve `/notams/x.png`. Los 14 nombres del JSON coinciden uno a uno con los 14 archivos del directorio, así que **hoy no hay imágenes rotas**.
- El zoom **sí existe**: botón "Ampliar", modal con `role="dialog"` y `aria-modal`, cierre con Escape y con clic fuera, imagen renderizada cerca de su tamaño natural con scroll dentro del contenedor.
- Los PNG entran al precache del service worker (`globPatterns` en `vite.config.ts` incluye `png`), así que la práctica funciona sin red.
- Cada NOTAM nacional trae además su `transcripcion`, que se usa como `alt` de la imagen y se muestra debajo. Eso es correcto y no debe eliminarse: es la accesibilidad del módulo.

Lo que falta y tienes que resolver:

1. **No hay manejo de error de imagen.** Ni `onError` ni fallback. Si un PNG falta, o el service worker sirve un 404 de un deploy viejo, el usuario ve una caja blanca vacía y no entiende qué pasó. Agrega un estado de error que muestre la transcripción en monoespaciada como respaldo, con un aviso de que la imagen no cargó.
2. **No hay estado de carga.** Solo se reserva la proporción con `aspectRatio: "1875 / 260"`. Falta un placeholder o esqueleto mientras la imagen entra (las imágenes van con `loading="lazy"`).
3. **El zoom del modal es de un solo nivel.** Se pinta con `min-w-[1100px]` y se recorre con scroll. En celular eso obliga a arrastrar dentro de un modal, que es incómodo. Evalúa un control real de ampliación (por ejemplo dos o tres niveles de zoom, o ajuste a ancho, o `touch-action: pinch-zoom`).
4. **En la tarjeta, la imagen usa `min-w-[560px]` dentro de un `overflow-x-auto`.** Genera scroll horizontal dentro del contenedor en móvil. Es intencional para que el texto del NOTAM sea legible, pero revisa que no dispare scroll horizontal de la **página**, que fue el hallazgo número 2 de la auditoría.
5. Confirma que los 14 PNG existan en `dist/notams/` después de `npm run build` y que las rutas resuelvan en producción.

### Criterio B: el aprendizaje debe ser ORGANIZADO y progresivo

Secuencia actual de la lección, verificada en `src/lib/notamLesson.ts`:

1. ¿Qué es un NOTAM? (definición Doc 8400 pág. 3-3, por qué importa)
2. De dónde sale y dónde vive (Anexo 15, Anexo 10 Vol. II, Doc 8126, Aerocivil; **SNOWTAM y ASHTAM en dos líneas**)
3. Anatomía del formato (encabezado serie + número/año + tipo; tipos NOTAMN/NOTAMR/NOTAMC; tabla de casillas Q) a G))
4. La línea Q pieza por pieza (los 7 componentes)
5. El código NOTAM de cinco letras (asunto y estado, casos especiales, ejemplos rápidos)
6. La casilla E) y la fraseología abreviada
7. Decodificación completa paso a paso (dos NOTAM enteros)
8. NOTAM en Colombia: el resumen mensual de la Aerocivil
9. Método de lectura en 6 pasos y errores comunes

Problemas de orden y cobertura detectados:

- **SNOWTAM y ASHTAM están mal ubicados y sin desarrollar.** Hoy son dos entradas de una lista clave-valor en la sección 2, antes de que el alumno sepa siquiera qué es una casilla. Deben ir después de la lectura paso a paso, con su propio bloque y al menos un ejemplo de formato.
- **Los ítems A a G no tienen desarrollo propio.** Aparecen como una fila de tabla cada uno en la sección 3 y nunca se retoman. Falta explicar bien, al menos: B) y C) con el grupo de 10 dígitos en UTC, `PERM`, `EST`; D) con el horario diario; F) y G) con `GND`, `SFC`, `UNL`.
- **La sección 3 mezcla tres temas** (encabezado, tipos N/R/C y casillas). Los tipos merecen su propia unidad, porque el temario los pide como paso independiente.
- **Las abreviaturas OACI no están en la lección.** El glosario de 48 entradas vive solo en el Decodificador (`GLOSSARY` en `src/lib/notam.ts`) y la sección 6 remite ahí. El temario pide las abreviaturas como paso propio: trae al menos una tabla mínima a la lección, sin duplicar las 246 entradas de códigos.
- **La lección no cierra encadenando con práctica y examen.** El hub sí los ofrece, pero el documento termina en el método de 6 pasos. Cierra con una salida clara hacia práctica y luego evaluación.

**Temario ordenado que debe quedar cubierto (este es el objetivo):**

1. Qué es un NOTAM
2. Tipos: NOTAMN, NOTAMR, NOTAMC
3. Estructura: serie, número/año, tipo
4. La línea Q: FIR, código Q, tránsito, propósito, alcance, límites, coordenadas y radio
5. Ítems A a G, uno por uno
6. Abreviaturas OACI
7. Lectura paso a paso de un NOTAM real
8. SNOWTAM y ASHTAM
9. Ejercicios de práctica
10. Examen final

Puedes conservar la sección de Colombia (resumen mensual DRT de la Aerocivil): es contenido valioso y aterriza el módulo al mercado real. Ubícala donde tenga sentido dentro de la secuencia, probablemente junto a la lectura paso a paso.

**Ojo con esto:** `TOTALS.lessonScreens` está **hardcodeado en 9** en `src/lib/notam.ts:174`. Si reordenas o agregas secciones, el hub va a mostrar un denominador incorrecto y el porcentaje de avance va a quedar mal. Cámbialo por `LESSON_SCREENS.length` antes de tocar la estructura de la lección.

### Criterio C: integración con Supabase

Esquema real confirmado (archivo `supabase/migrations/20260730060000_notam_module.sql`):

- **`user_notam_progress`**: una fila por usuario, `user_id uuid primary key`, `lesson_screens smallint[]`, `practice_done text[]`, `updated_at timestamptz`. RLS activo con políticas `select`, `insert` y `update` propias (`auth.uid() = user_id`).
- **`user_notam_exam_attempts`**: `id`, `user_id`, `score`, `correct_count`, `total_questions`, `passed`, `answers jsonb`, `duration_seconds`, `created_at`. RLS activo con políticas `select` e `insert` propias. Índice en `(user_id, created_at desc)`.
- **RPC `notam_mark_progress(p_lesson_screen smallint, p_practice_id text)`**: `SECURITY DEFINER` con `search_path = ''`, hace upsert idempotente por `user_id` agregando sin duplicar (`array_agg(distinct ...)`), sin `EXECUTE` para `public` ni `anon`, con grant a `authenticated` y `service_role`.

Lo que ya está bien y no debes romper:

- El examen inserta `total_questions = 20` (viene de `questions.length`, y `buildExam()` usa las 20 preguntas del banco), `score = correctas x 5` y `passed = score >= 80` (`EXAM_POINTS_PER_QUESTION = 5` y `EXAM_PASS_SCORE = 80`, ambos leídos de `evaluacion_notam.json`). Coincide con el esquema.
- La lección y la práctica escriben por la RPC, no por `update` directo. Correcto: mantiene la idempotencia.
- El hub (`Notam.tsx`) lee `lesson_screens`, `practice_done` y el mejor `score`, y cae a un respaldo en `localStorage` si falla la red.
- `NotamExam.tsx` consulta el historial con dos queries a propósito: los 10 intentos recientes para la lista, y el máximo histórico aparte, porque con más de 10 intentos el mejor puntaje puede quedar fuera de la página y el hub muestra el máximo real.

Bugs y huecos que tienes que resolver:

1. **La lección no hidrata el progreso desde la base.** `NotamLesson.tsx:52` inicializa `readSections` **solo** desde `localStorage` (`readLocalProgress().lessonScreens`). Nunca hace `select` a `user_notam_progress`. Consecuencia: en otro dispositivo, en otro navegador o con el storage limpio, la lección aparece sin leer aunque la base tenga el progreso guardado. **El progreso no persiste de verdad entre sesiones para la pantalla de la lección.** Esto es lo más importante de esta parte.
2. **No hay backfill del progreso local hacia la base.** Si alguien estudia sin sesión y después inicia sesión, `unirProgreso()` en `Notam.tsx:65` une los dos orígenes solo para mostrarlos, pero lo local nunca se sube. Al cambiar de dispositivo se pierde. Sube el progreso local pendiente cuando aparece una sesión.
3. **Verifica que la migración esté realmente aplicada en producción.** Nosotros no pudimos consultar la base desde nuestra sesión. Confirma con el conector de Supabase que las dos tablas existen, que `rowsecurity` está en true, que las políticas son las cuatro descritas, y que la RPC no tiene `EXECUTE` para `anon`. Recuerda la trampa de Postgres: cada `create or replace function` **restaura el EXECUTE a PUBLIC**, así que si tocas la RPC tienes que volver a hacer el `revoke` y el `grant`.
4. **Prueba el aislamiento del RLS con dos usuarios reales.** Con la sesión del usuario A, un `select` sobre `user_notam_exam_attempts` no debe devolver ni una fila del usuario B, y un `insert` con `user_id` del usuario B debe fallar. Lo mismo para `user_notam_progress`.
5. **Revisa el doble guardado del intento.** `NotamExam.tsx:723` usa un `savedRef` para no insertar dos veces, pero si el componente `Result` se remonta (React StrictMode en desarrollo, por ejemplo) se puede duplicar el intento. Verifícalo y, si duplica, resuélvelo.
6. Después de cualquier cambio de esquema, regenera `src/integrations/supabase/types.ts` y corre el linter de seguridad (`get_advisors` tipo `security`) para no dejar avisos nuevos.

---

## 3. Convenciones del proyecto (Cami es estricto con esto)

- **Español neutro LATAM con tuteo.** Prohibido el voseo: nada de "tenés", "podés", "practicá", "empezá", "sumate", "acá". Ya se hicieron dos barridos completos.
- **Prohibido el guion largo en texto visible.** Usa dos puntos, coma o punto. Única excepción: el guion como marcador de celda sin dato.
- **Sin emojis en la interfaz.**
- **Nada de lenguaje de desarrollador hacia el usuario**: nunca "backend", "migración", "seed". Si algo no tiene contenido, se dice en términos de producto.
- **Cero mentiras en pantalla**: ningún número que la app no pueda sostener con datos reales. Donde no hay dato va un guion y una invitación a generarlo, nunca un 0 por ciento ni una curva inventada. Fue el hallazgo número 1 de la auditoría.
- **Colores solo con tokens** de `src/index.css`. Prohibido el hex crudo y las clases de color de Tailwind (`text-blue-600`, `bg-red-100`). Trampa conocida: los tokens `--av-*-400` son claros a propósito y como color de texto chico sobre fondo blanco quedan ilegibles. Para texto usa los `*-fg` o el helper `accentText()` de `src/lib/notam.ts`. Dentro de la hoja de la lección usa `docAccent()` de `NotamLesson.tsx`, que mezcla con `--doc-fg` para que se lea igual en modo claro y oscuro.
- **Nada de `gridTemplateColumns` inline.** Hoy hay cero en el proyecto y era la causa raíz del scroll horizontal en celular. Usa clases `grid-cols-1 md:grid-cols-[...]`.
- **Avisos obligatorios de contenido, no se tocan**: los NOTAM colombianos reales llevan siempre el aviso de vigencia expirada y de que jamás deben usarse para operar; los ejercicios no oficiales llevan su aviso; el examen aclara que no son preguntas oficiales de la Aerocivil ni de la OACI. Están centralizados en `DISCLAIMERS` en `src/lib/notam.ts`.
- **La respuesta modelo nunca se revela antes de que el usuario responda.** Es regla de producto del paquete de contenido y aplica a práctica y examen.

## 4. Cómo verificar antes de subir

```bash
npx tsc -p tsconfig.app.json --noEmit
```

```bash
npm run build
```

```bash
npx eslint src --ext .ts,.tsx
```

El proyecto tiene activa la regla `react-hooks/set-state-in-effect` del React Compiler y hay 24 errores previos en archivos que no son tuyos. No agregues errores nuevos. El patrón correcto es el que ya usa `NotamExam.tsx`: el guard se queda en el cuerpo del efecto y todos los `setState` van dentro del IIFE async o de un callback.

Barrido de convenciones:

```bash
grep -rn "—" src/pages src/components --include="*.tsx" | grep -v '"—"'
```

```bash
grep -rn "gridTemplateColumns" src/
```

```bash
grep -rnE '#[0-9A-Fa-f]{6}' src/pages src/components --include="*.tsx"
```

Trabaja en una rama propia (por ejemplo `fix/notam-cierre`) y abre PR. No mergees a `main` sin avisarle a Cami. No toques los 14 archivos con cambios sin commitear que se listan en la sección 1.3.

---

## 5. Entregables que esperamos de ti

Al terminar, entrega en el PR (o en un archivo `docs/`) estos cuatro bloques:

**1. Checklist pass/fail.** Una fila por punto verificable, con resultado y evidencia (ruta de archivo y línea, o salida de comando):

- Las 14 imágenes cargan en desarrollo y en el build de producción
- Hay fallback visible cuando una imagen no carga
- Hay estado de carga de imagen
- El zoom funciona en escritorio y en celular
- Sin scroll horizontal de página en 375 px de ancho en las cuatro pantallas del módulo
- La secuencia de la lección cubre el temario completo en orden
- SNOWTAM y ASHTAM desarrollados y en su lugar
- Ítems A a G explicados uno por uno
- Abreviaturas OACI presentes en la lección
- El progreso de la lección se recupera desde la base en un navegador limpio
- El progreso de práctica se recupera desde la base en un navegador limpio
- El intento de examen guarda `total_questions = 20`, `score` correcto y `passed = score >= 80`
- Un usuario no puede leer ni escribir filas de otro en las dos tablas (probado con dos sesiones)
- La RPC `notam_mark_progress` no tiene `EXECUTE` para `anon`
- `tsc`, `build` y `eslint` sin errores nuevos

**2. Lista de cambios hechos.** Un renglón por cambio: archivo, qué cambiaste y por qué. Sin "mejoras varias".

**3. Hallazgos no resueltos**, cada uno con severidad (alta, media, baja), qué se rompe en la práctica y qué haría falta para cerrarlo.

**4. Recomendación explícita**: ¿el módulo NOTAM queda listo para cerrarse y mostrarse a usuarios, o no? Si no, di exactamente qué falta y cuánto estimas.
