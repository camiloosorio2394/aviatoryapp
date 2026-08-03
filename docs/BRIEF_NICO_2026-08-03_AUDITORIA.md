# Brief para Nico · 3 de agosto de 2026 · Correcciones de la auditoría

Sale de `docs/AUDITORIA_APP_2026-08-03.md`, que se midió sobre la app corriendo
y la base de producción. Este brief es la parte ejecutable: cada tarea trae
evidencia, archivos y criterio de aceptación. Ejecuta en orden.

## Reglas de este encargo

1. **NO TOQUES las cifras de marketing.** "Cientos de pilotos" (login), el
   bloque de stats de la landing (`Stats.tsx` entero, incluido su CountUp) y
   "Solo 100 cupos" (pricing) se quedan como están. Decisión de Camilo: la app
   está en construcción y eso se corrige justo antes del lanzamiento, al final.
2. **Zona de Camilo, con permiso puntual.** `notamLesson.ts` y el contenido de
   Mercancías siguen bloqueados. Para este brief Camilo autoriza SOLO los
   textos exactos de las tareas A3, A4 y A8 (van con el reemplazo literal para
   que no haya que improvisar). Nada más de esos archivos.
3. **Migraciones: tú las escribes, Camilo las aplica por MCP.** Como siempre.
   Escribe las tildes en el SQL, pon el `revoke` después de cada
   `create or replace function`, y deja dicho en el PENDIENTES qué hay que
   correr.
4. Push directo a `main`. Avisar antes de entrar a `Dashboard.tsx`,
   `Community.tsx` o `Profile.tsx`: las tareas B6 y A7 traen la autorización
   puntual para lo que dicen, no para más.

---

## TANDA A · Quick wins (un día)

### A1 · Un solo CTA en la landing
Hoy hay 5 redacciones para el mismo botón: "Empieza gratis", "Comenzar gratis",
"Comenzar 7 días gratis", "Comenzar mi prueba gratis", "Empezar gratis".
Unifica a **"Empieza gratis"** en todas. El botón es un ancla, no una redacción.
*Aceptación:* `grep -rn "Comenzar" src/components/landing src/pages/Landing.tsx src/pages/Pricing.tsx`
no devuelve CTAs de registro (los "Comenzar simulacro" de los módulos no son esto).

### A2 · PPL/CPL pasa a PCA
El login dice "Banco de preguntas Aerocivil PPL/CPL" y la meta description de
`index.html` también. Todo el producto dice PCA. Corrige los dos.

### A3 · YA HECHA, SÁLTALA. La lección se rediseñó entera el 3 de agosto
La hizo Camilo con Claude en el rediseño de la lección (riel derecho, tira de
metadatos, sin declaración de documento). No queda nada de esta tarea.

### ~~A3 · La lección NOTAM deja de declararse PDF (autorizado por Camilo)~~
`src/pages/NotamLesson.tsx`, solo estos textos, literal:
- L172: `Documento de estudio en ${TOTAL} secciones, para leer de corrido como un PDF.`
  → `13 secciones cortas: el código, las casillas y práctica con avisos reales de la Aerocivil.`
  (deja `${TOTAL}` donde va el número)
- L184: `{TOTAL_MINUTES} min de lectura` → `{TOTAL_MINUTES} min`
- L256: `Documento de estudio · NOTAM` → `Lección · NOTAM`
- L260: `Léelo de corrido: cada sección continúa la anterior y el índice te
  devuelve a cualquier punto.` → `Cada sección usa la anterior y el índice te
  devuelve a cualquier punto.`
*Aceptación:* `grep -n "PDF\|de corrido" src/pages/NotamLesson.tsx` limpio.

### A4 · El hub de Mercancías también (autorizado por Camilo)
`src/pages/Mercancias.tsx` dice dos veces "de corrido" ("se estudia de
corrido", "Se lee de corrido, con su propio índice"). Reemplazo:
→ `Con lector propio: índice, práctica y chequeo sin salir del tema.`
Es el mismo defecto que Camilo diagnosticó en NOTAM, copiado al módulo nuevo.

### A5 · Foco de teclado global
`focus-visible` solo existe en las primitivas de shadcn; los botones escritos a
mano (los `<Link className="inline-flex...">` de todos los hubs) no muestran
nada al navegar con Tab. WCAG 2.4.7. En `@layer base` de `index.css`:
```css
:where(a, button, [role="button"], input, select, textarea):focus-visible {
  outline: 2px solid var(--ring);
  outline-offset: 2px;
}
```
Con `:where()` para que las primitivas que ya traen su anillo lo pisen sin
pelear especificidad.
*Aceptación:* Tab por el hub NOTAM muestra anillo en cada control.

### A6 · Fotos de la landing a WebP
`src/assets/photos/` lleva ~1,2 MB en JPG (247 KB la más pesada) y el repo ya
tiene `scripts/optimizar-imagenes.mjs`. Convierte, actualiza los imports
`.jpg → .webp` y borra los JPG.
*Aceptación:* build limpio y la carpeta baja de ~400 KB.

### A7 · Dos textos con permiso puntual
- `Profile.tsx:393` (zona con aviso, autorizado este cambio y solo este):
  eyebrow `Tu mapa de habilidades` + título `Mastery por dimensión`
  → título `Tu dominio por habilidad`.
- Login: `Bienvenido de vuelta a tu próximo vuelo.` → `Bienvenido de vuelta.`
  (se pisaba con el subtítulo siguiente).

### A8 · Los dos signos de admiración
`IcaoComprehension.tsx:320` y `VaultQuizPlayer.tsx:210`. Regla del proyecto:
voz de instructor, sin tono de juego. Reescríbelos en neutro.

### A9 · El botón muerto del error en PCA
`Pca.tsx`: cuando las materias fallan, la tarjeta "Empieza por la materia más
grande" sigue mostrando "Empezar" hacia nada. Cuando el fetch de materias
falla, esa tarjeta se degrada con la lista (se oculta o muestra el mismo error).

### A10 · Un solo Rastreador
La misma feature tiene 3 nombres: sidebar "Qué cayó en el examen", eyebrow
"EXAM TRACKER · INTELIGENCIA COLECTIVA", H1 "El Waze de los exámenes
Aerocivil". En `ExamTracker.tsx`:
- eyebrow → `Inteligencia colectiva`
- H1 → `Qué cayó en el examen`
- El "Waze" baja al subtítulo, que ya explica la mecánica.
Un H1 no puede ser la metáfora de otra marca.

### A11 · Higiene de repo
- Borra la rama remota `redesign/app-como-el-inicio`: ya se portó a mano lo que
  valía (commit `30cd20a`) y da conflicto en 34 archivos. Que nadie la mergee
  por accidente.
- `docs/PENDIENTES_CAMILO.md` sección 1: sigue diciendo que hay migraciones a
  medias y sin aplicar. **Ya están todas aplicadas y verificadas contra la
  base** (2 de agosto). Reescribe la sección para que nadie reaplique nada.

### A12 · Wingman sin disfraz de app de consumo
El botón flotante (60px, degradado cian a azul, en todas las pantallas) es el
único elemento con estética de consumo en un producto de tono instrumento.
Pásalo a `var(--av-blue-500)` plano, sin halo. Mismo tamaño y posición.

---

## TANDA B · La semana

### B1 · 🔴 La migración de materias (la bomba con temporizador)
`get_subject_intel` y `get_all_subjects_intel` leen `subjects`, que tiene 6
slugs. El banco (`vault_questions`) vive en 11. Resultado: **260 de 459
preguntas (57%) están bajo materias que el Rastreador no conoce**, `motores`
existe con 0 preguntas y `reglamento`/`reglamentacion` son la misma materia con
dos nombres. Hoy no se ve porque `exam_reports` tiene 0 filas; el primer
reporte real cae en un esquema equivocado.

El estado final de `subjects` es el banco real:

| slug | nombre | preguntas hoy |
|---|---|---|
| meteorologia | Meteorología | 90 |
| aerodinamica | Aerodinámica | 67 |
| reglamentacion | Reglamentación | 62 |
| procedimientos | Procedimientos | 43 |
| servicios_meteo | Servicios meteorológicos | 39 |
| factores_humanos | Factores humanos | 38 |
| sistemas | Sistemas | 35 |
| navegacion | Navegación | 30 |
| instrumentos | Instrumentos | 29 |
| performance | Performance | 14 |
| weight-balance | Weight & Balance | 12 |

- `reglamento` se **renombra** a `reglamentacion` (conserva id y referencias).
- `motores` **sale** (0 preguntas; si vuelve al banco, vuelve a la tabla).
- Las RPC deberían contar preguntas reales del vault por slug, no suponerlas.
- `exam_reports` está vacía, así que el renombre es seguro hoy. Mañana no.
- Frontend: `SUBJECT_ICON` en `ExamTracker.tsx:50` tiene 6 entradas; faltan 7
  (sugerencia: procedimientos ListChecks, servicios_meteo RadioTower,
  factores_humanos Brain, sistemas Cpu, instrumentos Gauge, performance
  TrendingUp, reglamentacion Gavel).
- Trampas de siempre: tildes en el SQL, `revoke` tras cada
  `create or replace function`, `get_advisors` tipo security después del DDL,
  regenerar `types.ts`.
- **Tú escribes `supabase/migrations/20260803...sql`, Camilo la aplica por MCP.**

### B2 · Botones a dos alturas
Medido: h-8 (3), h-9 (11), h-10 (28), h-11 (36), h-12 (14). La regla del
proyecto es solo md y lg. Consolida los botones reales en `appButtonClass()`
md/lg y mata h-8/h-12 de elementos interactivos. Ojo: inputs, selects y chips
no son botones, no los toques.

### B3 · Escala tipográfica
Fuera de la escala (12/13/15/17/20/24/32): 16× `text-[14px]`, 6× `text-[16px]`,
2× `text-[19px]`, 3× `text-[28px]`. Barrido: 14→13 o 15, 16→15 o 17, 19→20,
28→24 o 32, según el caso. Los `11px` del lector de módulo y los micro-rótulos
mono se quedan: son lenguaje del diseño.

### B4 · Tokens de movimiento
Conviven 150/200/300/500/700/1000 ms. Define dos tokens (`--dur-fast: 140ms`,
`--dur-med: 240ms`) y barre el interior de la app: 150/200→fast,
300/500→med, 700/1000 desaparecen del interior. `surface-lift` 300→240.
La landing y Pricing quedan fuera del barrido (las entradas largas ahí son
intencionales).

### B5 · Estados de error en las 8 páginas que caen a vacío silencioso
`AirlinePrep`, `IcaoInterview`, `IcaoVocabulary`, `InterviewSpeakingIntro`,
`Login`, `Metar`, `MetarExam`, `Notam`: tienen fetch y ningún error visible.
Un fallo de red se disfraza de "no tienes progreso", que es peor que un error.
Patrón a copiar: el del PCA (mensaje corto + Reintentar). Verifica cada una:
alguna puede manejarlo por toast y el grep no lo vio.

### B6 · Comunidad: de 14 canales a 3 (autorizado para `Community.tsx`)
14 canales, 0 mensajes, 4 usuarios: la arquitectura le dice "esto está muerto"
al primer usuario, catorce veces. Migración que archive todos menos 3 (Camilo
elige cuáles; propuesta: general, examen-pca, icao) y el frontend que solo
liste los activos. Tú escribes la migración, Camilo la aplica.

### B7 · El Invalid hook call de /login
La consola tira `Invalid hook call` ×4 en `/login`, preexistente (verificado
contra main limpio). No rompe el render pero es un error real en una pantalla
pública. Persíguelo: suele ser un hook llamado fuera de componente o una copia
doble de React en un chunk.

### B8 · El precache de la PWA pesa 4,4 MB
201 entradas. La primera instalación descarga eso. Audita qué está entrando
(las fotos hasheadas de `src/assets` van directo al precache) y saca lo que no
deba estar, con `globIgnores` + `CacheFirst` como ya se hizo con `notams/**` e
`infografias/**`. Meta: por debajo de ~2,5 MB sin romper offline.

---

## Lo que NO es tuyo (para que no lo esperes ni lo hagas)

- **Las 3 cifras de marketing** (login, stats, cupos): vetadas hasta el
  lanzamiento. Decisión de Camilo.
- **Verificar los códigos de aerolínea del Match**: Wingo "GCO", "LATAM
  Colombia · LAN" y "JetSmart · Chile · JES" huelen mal (Wingo opera bajo el
  AOC de AeroRepública; LAN es Chile; JES es JetSMART Argentina). Lo confirma
  Camilo con el AIP y ahí sí corriges datos.
- **Elegir los 3 canales** que sobreviven en B6: Camilo.
- **Las casillas de N8, N4 y N24** en la lección NOTAM: contenido, lo escribe
  Camilo (el N1 ya está decodificado como molde).
- **Entrevistas/Psicotécnicas en una sola taxonomía**: decisión de Camilo
  pendiente desde el 1 de agosto; mientras tanto no toques ninguna de las dos
  promesas.
- **Repetición espaciada y la lección como instrumento**: proyectos aparte, no
  entran en este brief.

## Verificación antes de cada push

```bash
npx tsc -p tsconfig.app.json --noEmit
npm run build
npx eslint src --ext .ts,.tsx        # techo: 20 problemas
```

```bash
grep -rn "—" src/pages src/components --include="*.tsx" | grep -v '"—"'
grep -rnE "tenés|podés|practicá|acá\b" src/
grep -rnE '#[0-9A-Fa-f]{6}' src/pages src/components --include="*.tsx"
node -e "const fs=require('fs');fs.readdirSync('dist/assets').filter(f=>f.endsWith('.js')).map(f=>({f,kb:Math.round(fs.statSync('dist/assets/'+f).size/1024)})).sort((a,b)=>b.kb-a.kb).slice(0,3).forEach(o=>console.log(o.kb+' KB '+o.f))"
```

Y tras desplegar: Ctrl+Shift+R, que el service worker es `prompt`.
