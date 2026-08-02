# Tarea: módulo Mercancías Peligrosas, con lector propio

Pégale esto completo a tu Claude Code, parado en la raíz del repo.
Cami te pasa aparte el contenido: `Modulo_Mercancias_Peligrosas_Pilotos.docx`,
16 secciones y 3.741 palabras.

Esto no es "una lección más". Es el primer módulo con **lector propio**, y el
diseño es el que manda. Si sale como las lecciones actuales, salió mal.

---

## 1 · Cómo tiene que verse

Cami tiene el diseño hecho en Claude Design. Es un **lector de curso a pantalla
completa, en oscuro, con acento ámbar**. Nada de la estética clara que tienen
hoy las lecciones.

### La estructura de pantalla

```
┌────────────────────────────────────────────────────────────────────────┐
│ ◇ MÓDULO 04            PROGRESO ▓▓▓░░░░░  01/09      RAC 175 · ANEXO   │
│   Mercancías peligrosas                              18 OACI  [RES.]   │
├──────────────┬─────────────────────────────────────────────────────────┤
│ CONTENIDO    │  BRIEFING DEL MÓDULO                                    │
│              │                                                          │
│ 00 Briefing  │  Transporte sin                                          │
│ 01 De dónde  │  riesgos de                                              │
│ 02 Las nueve │  mercancías                                              │
│ 03 Grupos    │  peligrosas                                              │
│ 04 Marcas    │                                                          │
│ 05 Info al   │  Cuerpo del texto, medida corta.                         │
│ 06 Ocultas   │                                                          │
│ 07 Práctica  │  ┌────────┐ ┌────────┐ ┌────────┐                        │
│ 08 Chequeo   │  │  08    │ │  04    │ │  05    │                        │
│              │  │ Leccio │ │ Casos  │ │ Pregun │                        │
│              │  └────────┘ └────────┘ └────────┘                        │
└──────────────┴─────────────────────────────────────────────────────────┘
```

**Barra superior**: rombo de la marca, número y nombre del módulo, barra de
progreso con el contador `01 / 09`, y a la derecha **las fuentes, permanentes**:
`RAC 175 · ANEXO 18 OACI` más un chip verde con la resolución vigente.

**Índice lateral**: secciones numeradas `00` a `08`. La activa lleva panel más
claro y su número en ámbar. Las demás, número apagado.

**Contenido**: titular de display muy pesado, cuerpo en medida corta, y las
piezas visuales debajo.

### Los tokens

Leídos del diseño. **Confírmalos contra el proyecto de Claude Design antes de
fijarlos**, que estos salen de un pantallazo.

```css
--mod-bg:      #0A0B0D;   /* fondo del lector */
--mod-panel:   #121418;   /* tarjetas y paneles */
--mod-panel-2: #171A1F;   /* panel del índice activo */
--mod-line:    #232830;   /* bordes y reglas */
--mod-fg:      #FFFFFF;   /* titulares */
--mod-text:    #8B95A1;   /* cuerpo */
--mod-muted:   #5E6875;   /* etiquetas apagadas */
--mod-accent:  #F5A623;   /* ámbar: cifras, progreso, botón, activo */
--mod-ok:      #2ECC71;   /* chip de vigencia */
```

Van en `src/index.css` bajo una clase `.mod-shell`, con la misma lógica que
`.doc-sheet`: **una superficie con sus propias reglas que no se invierte con el
tema**. `.doc-sheet` es la hoja clara; `.mod-shell` es el lector oscuro. Dentro
de `.mod-shell` se usan las variables `--mod-*` y nunca los tokens del tema.

### Las tres tipografías, ya cargadas

- **Display**: `Archivo` 700/800, para los titulares. Ya está en `index.html`
- **Cuerpo**: `Inter`
- **Mono**: `JetBrains Mono` para etiquetas, cifras y códigos: `MÓDULO 04`,
  `PROGRESO`, `01 / 09`, `UN 3480`, los números del índice, las cifras grandes
  de las tarjetas

### Aquí sí van mayúsculas y monoespaciada

Es una excepción deliberada y acotada al sistema. En el interior de la app está
prohibido porque se leía como terminal. **Dentro de `.mod-shell` es el lenguaje
del lector**: micro-etiquetas cortas en mayúscula con letterspacing
(`BRIEFING DEL MÓDULO`, `CONTENIDO`, `PROGRESO`) y monoespaciada para lo que es
dato.

Lo que **no** cambia: los titulares van en sentence case. `Transporte sin
riesgos de mercancías peligrosas`, no en mayúsculas.

---

## 2 · Lo que se conserva del código actual

El color cambia entero. **El comportamiento no.**

Abre `src/components/lesson/infografias/NotamLineaQ.tsx` y mira **cómo se
comporta**, ignorando su paleta clara:

- **Todo es código, cero imágenes.** Colores, fichas, badges, conectores: divs y
  SVG. Nada de PNG de contenido
- **Reflowea.** Tres columnas en escritorio, una en celular. El piloto nunca
  hace zoom para leer
- **Se toca.** Tocas un elemento y su ficha se resalta, y al revés
- **El color es la llave.** Cada elemento tiene su color y ese mismo color
  aparece en su ficha: es lo que ata una cosa con la otra
- **Poco texto.** Etiquetas y frases cortas dentro de las fichas

**Y mira lo que NO hay que hacer**: `NotamQueEs.tsx`. Es un lienzo fijo de
1687x1125 con 24 PNG. Se ve bien en escritorio y en celular obliga a hacer zoom.
No repitas ese patrón.

---

## 3 · Arquitectura: lector a pantalla completa

El módulo **sale del layout de la app** mientras se estudia. Nada de `AppLayout`
con su rail lateral: el lector ocupa la pantalla y tiene su propio cascarón.

**Rutas:**

```
/app/aerolinea/mercancias              hub del tema (este SÍ va en AppLayout)
/app/aerolinea/mercancias/leccion      el lector, a pantalla completa
/app/aerolinea/mercancias/practica     práctica
/app/aerolinea/mercancias/evaluacion   evaluación
```

El hub se queda dentro de la app, como el de NOTAM: es donde se ve el avance y
se entra. El **lector** es el que sale a pantalla completa, con su barra propia
y un botón de salir que devuelve al hub.

**Componentes nuevos, pensados para reutilizar en los módulos que vengan:**

```
src/components/modulo/ModuloShell.tsx      cascarón: barra, indice, progreso
src/components/modulo/ModuloTopbar.tsx     barra superior con fuentes y progreso
src/components/modulo/ModuloIndice.tsx     indice lateral numerado
src/components/modulo/piezas.tsx           tarjetas de cifra, callout, ficha
```

Cuando NOTAM y METAR migren a este formato, reutilizan lo mismo. **No lo montes
específico de mercancías peligrosas.**

**Base de datos** (escribe la migración, NO la apliques: Cami la aplica por MCP):

- `user_mercancias_progress`, espejo de `user_notam_progress`
- RPC `mercancias_mark_progress`, espejo de `notam_mark_progress`
- `user_mercancias_exam_attempts`, espejo de `user_metar_exam_attempts`
- Filas en `module_thresholds` para lección y práctica
- Logros `mercancias_lesson`, `mercancias_practice`, `mercancias_exam`,
  `mercancias_master`, **con su condición dentro de
  `check_and_unlock_achievements` y su disparador**. Sin las dos cosas el logro
  existe y no se otorga nunca: ya pasó con `metar_master`
- Y el `revoke`, que Postgres devuelve `EXECUTE` a `PUBLIC` en cada
  `create or replace function`:
  ```sql
  revoke all on function public.check_and_unlock_achievements(uuid) from public, anon;
  grant execute on function public.check_and_unlock_achievements(uuid) to authenticated;
  ```

**Actividad**: `registrarEstudioDiario("mercancias-leccion")` al marcar una
sección como leída, `("mercancias-practica")` al resolver un ejercicio, y
`registrarActividadDeEstudio` al terminar la evaluación. Nunca al montar la
página, solo al completar algo.

**El hub padre**: añade su `CourseCard` en `AirlinePrep.tsx` con cifras reales y
sácalo de `PROXIMOS` si está.

**El simulacro**: añade el banco de la evaluación a `BANCOS` en
`src/pages/AirlineMockExam.tsx`. Es una línea y el simulacro crece solo.

---

## 4 · Qué forma toma cada sección

El .docx trae 16 secciones. El diseño las agrupa en **9 pantallas, 00 a 08**.
Esa reagrupación es correcta: mucha prosa del documento es pegamento que
desaparece al pasar a visual.

| # | Pantalla | Contenido del .docx | Forma |
|---|---|---|---|
| 00 | Briefing del módulo | Antes de empezar | Titular, tres tarjetas de cifra, y el bloque "por qué te lo van a preguntar" |
| 01 | De dónde sale la norma | 3. Marco normativo | Tabla de 4 documentos: Anexo 18, Doc 9284, IATA DGR, RAC 175. Quién lo emite, para qué, cada cuánto se reedita |
| 02 | **Las nueve clases** | 5. Las 9 clases | **La pieza central.** Ver punto 5 |
| 03 | Grupos de embalaje | 6. Permitidas, restringidas, prohibidas | Tres columnas enfrentadas con color semántico |
| 04 | Marcas, etiquetas y documentos | 10 y 11 | **Los dos desgloses interactivos.** Ver punto 6 |
| 05 | Información al piloto al mando | 4 y 9 | Fichas numeradas de responsabilidades. Aquí va el 175.515 |
| 06 | Mercancías ocultas y estiba | 7 y 8 | Equipaje de pasajeros y baterías de litio. Sí y no, muy visual |
| 07 | Práctica de clasificación | 12 | 4 casos reales con retroalimentación |
| 08 | Chequeo final | 13 a 16 | 5 preguntas de entrevista, más el resumen |

**"Por qué te lo van a preguntar" es un bloque recurrente**, no una sección
suelta. Va donde aplique, con su referencia normativa. Es lo que convierte el
módulo en preparación de entrevista y no en un manual.

---

## 5 · Las nueve clases

Es lo más reconocible del tema y donde el módulo se gana su cara.

Rejilla de 9 fichas. Cada una lleva:

- **El rombo de la clase dibujado en SVG**, con su color y su símbolo
  normalizados. Son formas geométricas simples: en SVG quedan nítidas a
  cualquier tamaño y pesan nada. **Ni una sola imagen**
- Número y nombre de la clase
- Riesgo principal, en una frase
- Ejemplos concretos
- Las divisiones cuando las hay: `1.1` a `1.6`, `2.1` inflamable, `2.2` no
  inflamable, `2.3` tóxico

Sobre fondo oscuro los colores normalizados de las etiquetas (naranja de
explosivos, rojo de inflamables, amarillo de comburentes) **destacan solos**.
Es la ventaja de este diseño: el ámbar del lector convive con ellos sin pelear.

Ese color de clase es el sistema del módulo entero: el color de la clase 2
reaparece cada vez que se hable de gases en cualquier otra pantalla.

---

## 6 · Los dos desgloses interactivos

Son los momentos "línea Q" del módulo, y `NotamLineaQ.tsx` es el modelo de
comportamiento:

**El NOTOC por columnas.** El formato tiene columnas fijas: tocas una y se
explica qué va ahí y por qué le importa al piloto.

**La fila de la lista IATA DGR, con el ejemplo UN 3480.** Número UN, nombre
propio de expedición, clase, grupo de embalaje, instrucción de embalaje,
cantidad máxima. Cada campo se toca y se explica.

El .docx ya trae el ejemplo trabajado de UN 3480 (baterías de ión litio).
**Úsalo tal cual, no inventes otro.**

---

## 7 · Las fuentes y la vigencia van en la barra, no en un pie

El diseño lo resuelve bien: `RAC 175 · ANEXO 18 OACI` y el chip verde
`RES. 00478/2016` están **siempre visibles** en la barra superior.

Y el .docx abre con una advertencia que no es opcional:

- RAC 175: la fuente es la Edición Original de marzo 2016 (Resolución 00478) y
  ha tenido enmiendas posteriores
- El Doc 9284 se reedita cada 2 años; la IATA DGR, cada año
- Cada aerolínea define condiciones propias en su Manual de Operaciones

Eso va completo en la pantalla 00, con tratamiento de aviso. **Un piloto no
puede salir de aquí creyendo que un límite que leyó es el vigente.**

---

## 8 · AVISO CRÍTICO: el bundle está al borde

`dist/assets/index-*.js` está hoy en **2.028 KB y el límite de Workbox son
2.048**. Si lo pasas, el build **falla**, no avisa.

Un módulo entero lo revienta. Dos cosas obligatorias, y la primera va antes de
escribir nada del módulo:

1. **Partir las rutas.** `src/App.tsx` importa las 40 páginas de golpe. Pásalas
   a `lazy` + `Suspense`. Es lo que de verdad arregla el problema
2. **El lector y sus pantallas van con `lazy`.** El registro `INFOGRAFIAS` de
   `src/components/DocLessonBlocks.tsx` ya usa ese patrón: síguelo

Comprueba después de cada tanda:

```bash
npm run build
node -e "const fs=require('fs');fs.readdirSync('dist/assets').filter(f=>f.endsWith('.js')).map(f=>({f,kb:Math.round(fs.statSync('dist/assets/'+f).size/1024)})).sort((a,b)=>b.kb-a.kb).slice(0,5).forEach(o=>console.log(o.kb+' KB '+o.f))"
```

---

## 9 · Por fases

Un PR de 6.000 líneas no lo revisa nadie. Una por PR.

- **Fase 0**: partir las rutas de `App.tsx` con `lazy`. Sin esto, lo demás no
  compila cuando crezca
- **Fase 1**: el cascarón. `ModuloShell`, barra, índice y tokens `--mod-*` en
  `index.css`, con la pantalla 00 de contenido. **Es la que hay que revisar con
  Cami antes de seguir**: si el cascarón está bien, el resto es rellenarlo
- **Fase 2**: las nueve clases y los dos desgloses interactivos
- **Fase 3**: el resto de pantallas, práctica y evaluación
- **Fase 4**: migración, logros y actividad. Avisa a Cami para aplicarla

---

## 10 · Convenciones

Dentro de `.mod-shell` manda el diseño del lector. Fuera, el sistema de siempre.

Lo que aplica en los dos sitios:

- Espaciado **4 / 8 / 12 / 16 / 24 / 32 / 48**
- Español neutro LATAM con **tuteo**. Prohibido el voseo
- **Prohibido el guion largo en texto visible.** Excepción: el marcador de celda
  sin dato
- Sin emojis en la UI, sin lenguaje de desarrollador al usuario
- **Cero mentiras en pantalla.** Donde no hay dato va un guion. Si un ejemplo lo
  construiste para enseñar, el texto lo dice
- Titulares en sentence case, también dentro del lector

Lo que cambia dentro del lector: la paleta, las micro-etiquetas en mayúscula con
letterspacing, y la monoespaciada para datos.

---

## 11 · Antes de abrir el PR

```bash
npx tsc -p tsconfig.app.json --noEmit
npm run build
npx eslint src --ext .ts,.tsx        # no subir de 20 problemas
```

```bash
grep -rn "—" src/pages src/components --include="*.tsx" | grep -v '"—"'
grep -rnE "tenés|podés|practicá|acá\b" src/
```

Específico de esto:

```bash
# el modulo no puede llevar imagenes de contenido: todo en codigo
grep -rn "\.png\|\.webp\|\.jpg" src/components/modulo/ src/lib/mercanciasLesson.ts

# dentro del lector se usan los tokens --mod-*, no los del tema
grep -rn "var(--background)\|var(--foreground)\|var(--card)" src/components/modulo/

# la leccion no puede ser un muro de parrafos
grep -c 'kind: "p"' src/lib/mercanciasLesson.ts
```

Ese último es la prueba de fuego. La lección de NOTAM tiene **49 bloques de
párrafo en 13 secciones** y por eso se lee como documento. **Aquí no deberían
pasar de 15 en 9 pantallas.** Si te salen 40, escribiste un documento y hay que
volver a empezar.

Y verifica el deploy antes de dar nada por hecho:

```bash
gh api repos/camiloosorio2394/aviatoryapp/deployments --jq '.[0] | "\(.sha[0:7]) \(.environment)"'
```
