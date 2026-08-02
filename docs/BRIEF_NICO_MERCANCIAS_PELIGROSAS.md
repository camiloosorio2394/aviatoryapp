# Tarea: módulo Mercancías Peligrosas

Pégale esto completo a tu Claude Code, parado en la raíz del repo.

Es el primer módulo con **lector propio**. El diseño ya existe, es bueno y es
casi portable directo. Si sale como las lecciones actuales, salió mal.

---

## 1 · El diseño ya está hecho: impórtalo, no lo adivines

Cami lo hizo en Claude Design. **Impórtalo tú con el MCP `claude_design`**, no
trabajes de un pantallazo:

```
https://claude.ai/design/p/2c3494a5-8704-49d9-93d0-ce93cbf2946b?file=M%C3%B3dulo+Mercanc%C3%ADas+Peligrosas.dc.html
```

El proyecto trae además `rac175.txt`, que es la fuente normativa, y el PDF del
material. Léelos.

### Lo que es el diseño, verificado

No es una maqueta: es una **aplicación reactiva completa**, 65 KB de HTML con
18 KB de lógica.

```js
state = { paso: 0, clase: '3', caso: 0, resp: {}, hechos: {}, quiz: {}, calificado: false }
PASOS = ['Briefing del módulo', 'De dónde sale la norma', 'Las nueve clases',
         'Grupos de embalaje', 'Marcas, etiquetas y documentos',
         'Información al piloto al mando', 'Mercancías ocultas y estiba',
         'Práctica de clasificación', 'Chequeo final']
```

Ese estado mapea a React casi uno a uno. `paso` es la sección actual, `clase` el
rombo seleccionado, `caso` el ejercicio de práctica, `resp` y `quiz` las
respuestas, `calificado` si ya se corrigió.

**Y esto es lo importante**, medido sobre el HTML:

| | |
|---|---|
| `position:absolute` | **0** |
| `display:grid` | 21 |
| `display:flex` | 39 |
| `<button>` | 12 |
| `<img>` / `<svg>` | 0 |
| `@media` | **0** |

O sea: **no es un lienzo fijo**, está construido con flex y grid. Se porta a
React sin pelear. Nada que ver con `NotamQueEs.tsx`, que sí es un lienzo
absoluto de 1687x1125 y por eso obliga a hacer zoom en celular. **No repitas ese
patrón.**

### Las dos cosas que le faltan al diseño y tienes que añadir

**1. No tiene ni una media query.** Se apoya solo en `flex-wrap`. En celular hay
que probarlo a 375 px y añadir los cortes que hagan falta: el índice lateral
tiene que colapsar, la rejilla de clases bajar a una o dos columnas y la barra
superior reordenarse. **Esto no es opcional: la mitad de los pilotos entran por
celular.**

**2. No tiene imágenes, y tiene que tenerlas.** Ver el punto 4.

---

## 2 · La paleta y las tipografías

Sacadas del HTML del diseño, no de un pantallazo.

```css
--mod-ground:   #E6EAEE;  /* fondo de la pagina */
--mod-card:     #FFFFFF;  /* la hoja del contenido */
--mod-band:     #0B2340;  /* barra superior y bandas */
--mod-title:    #12305F;  /* titulares navy */
--mod-link:     #1C4E9C;  /* enlaces y acentos azules */
--mod-blue:     #1B3AA0;  /* badges y numeros */
--mod-blue-2:   #1858C8;
--mod-accent:   #F2B233;  /* ambar */
--mod-text:     #24303F;  /* cuerpo */
--mod-ink:      #1A2433;  /* texto fuerte */
--mod-muted:    #6B7686;  /* apagado */
--mod-on-band:  #CBD8E8;  /* texto sobre navy */
--mod-line:     #D9DDE3;  /* bordes */
--mod-panel:    #F6F9FF;  /* panel azul muy claro */
--mod-panel-2:  #E7EFF9;  /* tarjetas de cifra */
--mod-panel-ok: #F2FAF3;  /* panel verde, para lo permitido */
--mod-panel-no: #E9AFA7;  /* panel rojo, para lo prohibido */
--mod-border-b: #A9BCEA;  /* borde azul claro */
```

Van en `src/index.css` bajo `.mod-shell`, con la misma lógica que `.doc-sheet`:
**una superficie con reglas propias que no se invierte con el tema**. Dentro de
`.mod-shell` se usan las variables `--mod-*` y nunca los tokens del tema.

**Tipografías.** El diseño usa Archivo, Roboto y Roboto Mono. La app ya carga
**Archivo** (700/800), **Inter** y **JetBrains Mono**:

- **Archivo** para titulares. Igual que el diseño
- **Inter** en vez de Roboto. Son casi intercambiables y evita cargar otra
  familia. Si al comparar se ve distinto, avisa antes de añadir Roboto
- **JetBrains Mono** en vez de Roboto Mono, por lo mismo

Escala de tamaños del diseño, por uso: **12, 14, 19, 16, 14.5, 13, 15, 13.5,
24, 10, 17, 20, 11, 38, 44**. No coincide con la escala de la app y **está
bien**: dentro de `.mod-shell` manda el diseño. Fuera, la escala de siempre.

---

## 3 · La estructura de pantalla

**Barra superior** (`#0B2340`, sticky): rombo ámbar rotado 45 grados con un `!`,
el nombre del módulo en Archivo 800 blanco, subtítulo con las fuentes
(`RAC 175 – Anexo 18 OACI`), barra de progreso ámbar con el contador `01 / 09`,
y a la derecha el chip de la resolución vigente.

**Índice lateral**: las 9 secciones numeradas `00` a `08`. La activa lleva fondo
navy con su número en ámbar.

**Contenido**: hoja blanca sobre el gris de fondo, con el titular en navy, los
paneles y las piezas.

**Banda de recuerda** al pie, navy con `RECUERDA` en ámbar.

---

## 4 · Las imágenes: ya están extraídas y listas

El diseño no trae ninguna y **el módulo las necesita**. Están en el repo:

```
public/infografias/mercancias/
  portada.webp     1400px, la foto de apertura
  clase-1-1.webp   clase-1-4.webp
  clase-2-1.webp   clase-2-2.webp   clase-2-3.webp
  clase-3.webp
  clase-4-1.webp   clase-4-2.webp   clase-4-3.webp
  clase-5-1.webp   clase-5-2.webp
  clase-6-1.webp   clase-6-2.webp
  clase-7.webp     clase-8.webp     clase-9.webp
```

Son **los rombos oficiales de clase OACI**, sacados del .docx de Cami y pasados
a WebP: 2,36 MB a 294 KB, un 88 por ciento menos. Los 16 rombos pesan entre 4 y
10 KB cada uno.

**Úsalos, no los dibujes en SVG.** Son símbolos normalizados y un piloto tiene
que reconocer el real, no una aproximación.

Van en la sección **02 · Las nueve clases**, que es la pieza central del módulo:
rejilla de fichas, cada una con su rombo, el número y nombre de la clase, el
riesgo principal en una frase, ejemplos concretos y las divisiones cuando las
hay. El diseño ya tiene el selector de clase en el estado (`clase: '3'`), así
que la ficha se abre al tocar el rombo.

Ese color de clase es el sistema del módulo entero: el de la clase 2 reaparece
cada vez que se hable de gases en cualquier otra sección.

**Fuera del precache.** `vite.config.ts` ya excluye `infografias/**` con
`globIgnores` y les da `CacheFirst`. No lo toques, ya está resuelto.

---

## 5 · Arquitectura

El lector **sale del layout de la app** mientras se estudia. Nada de `AppLayout`
con su rail: el lector ocupa la pantalla y tiene su propio cascarón.

```
/app/aerolinea/mercancias              hub del tema (este SÍ va en AppLayout)
/app/aerolinea/mercancias/leccion      el lector, a pantalla completa
```

El hub se queda dentro de la app, como el de NOTAM: ahí se ve el avance y se
entra. El lector sale a pantalla completa con su barra propia y un botón de
salir que devuelve al hub.

La práctica (sección 07) y el chequeo (08) **van dentro del lector**, no en
rutas aparte: el diseño ya los tiene como pasos del mismo flujo.

**Componentes, pensados para reutilizar en los módulos que vengan:**

```
src/components/modulo/ModuloShell.tsx     cascaron: barra, indice, progreso
src/components/modulo/ModuloTopbar.tsx    barra superior
src/components/modulo/ModuloIndice.tsx    indice lateral numerado
src/components/modulo/piezas.tsx          tarjeta de cifra, callout, ficha, banda
```

Cuando NOTAM y METAR migren a este formato reutilizan lo mismo. **No lo montes
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
sección como leída, `("mercancias-practica")` al resolver un caso, y
`registrarActividadDeEstudio` al terminar el chequeo. Nunca al montar la
página, solo al completar algo.

**El hub padre**: añade su `CourseCard` en `AirlinePrep.tsx` con cifras reales.

**El simulacro**: añade el banco del chequeo a `BANCOS` en
`src/pages/AirlineMockExam.tsx`. Es una línea y el simulacro crece solo.

---

## 6 · Las fuentes y la vigencia van en la barra

El diseño lo resuelve bien: `RAC 175 – Anexo 18 OACI` en el subtítulo y el chip
de la resolución, **siempre visibles**.

Y el .docx abre con una advertencia que no es opcional y va completa en la
sección 00:

- RAC 175: la fuente es la Edición Original de marzo 2016 (Resolución 00478) y
  ha tenido enmiendas posteriores
- El Doc 9284 se reedita cada 2 años; la IATA DGR, cada año
- Cada aerolínea define condiciones propias en su Manual de Operaciones

**Un piloto no puede salir de aquí creyendo que un límite que leyó es el
vigente.**

---

## 7 · AVISO CRÍTICO: el bundle está al borde

`dist/assets/index-*.js` está hoy en **2.028 KB y el límite de Workbox son
2.048**. Si lo pasas, el build **falla**, no avisa.

Un módulo entero lo revienta. Dos cosas, y la primera va **antes** de escribir
nada del módulo:

1. **Partir las rutas.** `src/App.tsx` importa las 40 páginas de golpe. Pásalas
   a `lazy` + `Suspense`. Es lo que de verdad arregla el problema
2. **El lector va con `lazy`.** El registro `INFOGRAFIAS` de
   `src/components/DocLessonBlocks.tsx` ya usa ese patrón: síguelo

```bash
npm run build
node -e "const fs=require('fs');fs.readdirSync('dist/assets').filter(f=>f.endsWith('.js')).map(f=>({f,kb:Math.round(fs.statSync('dist/assets/'+f).size/1024)})).sort((a,b)=>b.kb-a.kb).slice(0,5).forEach(o=>console.log(o.kb+' KB '+o.f))"
```

---

## 8 · Por fases, un PR por fase

- **Fase 0**: partir las rutas de `App.tsx` con `lazy`. Sin esto lo demás no
  compila cuando crezca
- **Fase 1**: el cascarón. `ModuloShell`, barra, índice, tokens `--mod-*` y la
  sección 00. **Párate aquí y enséñaselo a Cami**: si el cascarón está bien, el
  resto es rellenarlo
- **Fase 2**: las nueve clases con sus rombos, y las secciones 01 y 03 a 06
- **Fase 3**: práctica (07) y chequeo (08), con su estado
- **Fase 4**: migración, logros y actividad. Avisa a Cami para aplicarla

---

## 9 · Convenciones

Dentro de `.mod-shell` manda el diseño. Fuera, el sistema de siempre.

Aplica en los dos sitios:

- Español neutro LATAM con **tuteo**. Prohibido el voseo
- **Prohibido el guion largo en texto visible.** Excepción: el marcador de celda
  sin dato
- Sin emojis en la UI, sin lenguaje de desarrollador al usuario
- **Cero mentiras en pantalla.** Donde no hay dato va un guion. Si un ejemplo lo
  construiste para enseñar, el texto lo dice

Cambia dentro del lector: la paleta, la escala de tamaños, las micro-etiquetas
en mayúscula con letterspacing y la monoespaciada para datos.

---

## 10 · Antes de abrir el PR

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
# dentro del lector se usan los tokens --mod-*, no los del tema
grep -rn "var(--background)\|var(--foreground)\|var(--card)" src/components/modulo/

# los rombos oficiales se usan, no se dibujan
grep -c "infografias/mercancias" src/components/modulo/*.tsx src/lib/mercancias*.ts

# nada de maquetacion absoluta: el diseño no la tiene y el port tampoco
grep -c "position:absolute\|absolute inset" src/components/modulo/*.tsx
```

**Y la prueba de fuego, que es en celular.** Abre el lector a 375 px de ancho.
El diseño no trae media queries, así que si no las añadiste se ve roto. Índice
colapsado, rejilla de clases en una columna, barra reordenada, y nada de scroll
horizontal.

Verifica el deploy antes de dar nada por hecho:

```bash
gh api repos/camiloosorio2394/aviatoryapp/deployments --jq '.[0] | "\(.sha[0:7]) \(.environment)"'
```
