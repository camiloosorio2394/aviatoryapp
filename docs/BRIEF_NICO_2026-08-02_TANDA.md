# Tanda de tareas · 2 de agosto

Pégale esto completo a tu Claude Code, parado en la raíz del repo.

Son cinco tareas independientes entre sí. **Ninguna toca el módulo NOTAM**: Cami
está reescribiendo su contenido ahora mismo.

---

## Zona bloqueada

**No entres a estos archivos.** Cami está dentro:

```
src/lib/notamLesson.ts
src/pages/NotamLesson.tsx
src/lib/mercancias.ts
src/components/modulo/mercancias/Seccion*.tsx
```

Sí puedes tocar los **renderizadores** de esas lecciones
(`DocLessonBlocks.tsx`, `piezas.tsx`): él escribe contenido, tú das las piezas.
Ese es justamente el punto 1.

---

## 1 · La pieza de imagen, en los dos renderizadores 🔴

**Es lo que desbloquea a Cami, así que va primero.** Va a escribir el contenido
de los dos módulos en formato texto-imagen-texto-imagen, y hoy **no existe
ninguna pieza de imagen en ninguno de los dos sitios**. Verificado: cero
coincidencias de `img` en `src/components/modulo/piezas.tsx`.

**Dos piezas, misma idea:**

```
src/components/modulo/piezas.tsx     ->  <Figura src="…" pie="…" />
src/components/DocLessonBlocks.tsx   ->  bloque { kind: "figura", src, pie }
```

Así, vaya Cami por donde vaya con NOTAM (reescribir el texto donde está o
mudarlo al lector), la pieza ya existe.

**Cómo tiene que comportarse:**

- Ancho máximo el de la medida de lectura, no el del contenedor. Una imagen a
  todo lo ancho rompe el ritmo de lectura
- `loading="lazy"` y `decoding="async"`
- **Con `width` y `height` reales**, o el texto salta cuando carga
- Pie opcional debajo, en el tono apagado del contexto (`--doc-muted` en la
  hoja, `--mod-muted` en el lector)
- `alt` obligatorio en el tipo. Si la imagen enseña algo, hay que poder
  describirlo; si es decorativa, no debería estar

**Y el flujo de imágenes**, que hoy lo hago a mano cada vez:

```
public/modulos/<modulo>/…          donde viven
scripts/optimizar-imagenes.mjs     PNG/JPG -> WebP en un comando
```

El script recibe una carpeta, convierte a WebP y reporta el antes y el después.
Ya está `sharp` como dependencia de desarrollo. Referencia de lo que se
consigue: las ilustraciones de mercancías bajaron de 2,36 MB a 294 KB.

**Fuera del precache**: `vite.config.ts` ya excluye `infografias/**` con
`globIgnores` y les da `CacheFirst`. Añade `modulos/**` igual.

---

## 2 · Los testimonios inventados de la landing 🔴

Sigue abierto desde el 31 de julio y es media hora.

`src/components/landing/Testimonials.tsx` tiene **tres testimonios ficticios**
con nombres y avatares inventados (`JM`, `MC`, `SV`), más "+2.000 pilotos" y
"4.9★" en la landing. **Aviatory tiene 4 usuarios reales.**

Es la regla de "cero mentiras en pantalla" en el sitio donde más caro sale: el
gremio de pilotos en Colombia es chico y un solo comentario circula.

**Qué hacer**: quitarlos. No los sustituyas por otros inventados ni por
"próximamente testimonios". La sección desaparece hasta que haya pilotos reales
que quieran dar el suyo. Una landing más corta y verdadera vende más que una
larga con relleno.

Barre también las cifras infladas del resto de la landing:

```bash
grep -rnE "2\.000|4\.9|[0-9]+\.[0-9]+★|pilotos activos" src/components/landing/
```

---

## 3 · El lector en celular 🟠

El diseño de Mercancías vino de Claude Design con **cero media queries**: se
apoya solo en `flex-wrap`. Nunca se ha verificado en un teléfono de verdad.

Abre `/app/aerolinea/mercancias/leccion` a **390 px** y comprueba:

- El índice lateral colapsa o se convierte en algo usable. Hoy son 11 entradas
  en una columna fija que se come media pantalla
- La rejilla de las nueve clases baja a 3 columnas y los rombos siguen
  reconocibles
- La barra superior se reordena y el contador `01 / 09` no se pisa con el chip
  de la resolución
- Los botones de Anterior y Siguiente caben
- **Cero scroll horizontal**, en todas las secciones

Prueba en Android Chrome y en iOS Safari. Si algo no se puede arreglar, dilo en
el PR en vez de dejarlo a medias.

---

## 4 · El módulo ICAO no sabe quién eres 🟠

`src/pages/Icao.tsx` tiene **cero llamadas a Supabase**. Su hub es exactamente
lo que era el de Ingreso a aerolínea hace tres días: no muestra avance, no
ordena por lo que te falta, no propone dónde continuar.

El manual ya está probado y `src/pages/AirlinePrep.tsx` es el modelo:

- Lee el progreso real de cada sección
- Ordena primero lo que está a medias, después lo no empezado, al final lo
  terminado
- Un solo botón principal: seguir donde ibas
- Las tarjetas declaran cuánto contenido hay dentro, con cifras reales
- Sin datos, no muestra 0%: invita a empezar

El simulacro TEA ya persiste en `user_icao_mock_results`, así que esa parte está.
Lo que falta es que el hub lo lea y lo muestre.

---

## 5 · La Biblioteca: portada por materias, buscador y filtros 🟡

La Biblioteca funciona y **tiene 6 documentos**. Esto la reestructura como la
quiere Cami y la prepara para crecer, **sin que se vea absurda con seis**.

### La estructura que pidió Cami

```
┌──────────────────────────────────────────────────────┐
│   Buscar documentos…                        [grande] │
├──────────────────────────────────────────────────────┤
│   Favoritos    Recientes    Descargados              │
├──────────────────────────────────────────────────────┤
│   ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐        │
│   │ icono  │ │ icono  │ │ icono  │ │ icono  │        │
│   │Meteoro-│ │Aerodi- │ │Navega- │ │Perfor- │        │
│   │logía   │ │námica  │ │ción    │ │mance   │        │
│   │ 4 docs │ │ 2 docs │ │ 3 docs │ │ 1 doc  │        │
│   │ 1 línea│ │ 1 línea│ │ 1 línea│ │ 1 línea│        │
│   └────────┘ └────────┘ └────────┘ └────────┘        │
└──────────────────────────────────────────────────────┘
```

Al entrar a una materia, sus documentos en tarjetas: tipo, fuente, edición,
páginas y los botones de acción.

### Las decisiones, ya tomadas. No las reabras

**La portada es por MATERIA. El módulo se queda por debajo, no desaparece.**

Son dos preguntas distintas y las dos hacen falta: la materia dice *de qué
trata* y es como navega un piloto que busca algo; el módulo dice *dónde encaja
en el curso* y es lo que necesita el hub de cada módulo para enlazar su
bibliografía.

- **La materia va en `tags`**, que ya existe en `library_items` y está sin usar.
  Es la portada y el filtro
- **`category_id` se queda como está**, con los módulos. No lo toques: los hubs
  de módulo enlazan por ahí y eso sigue funcionando
- Un documento puede tener varias materias. El RAC 175 es Reglamentación **y**
  Mercancías peligrosas

Las 13 materias, con su icono de la librería (no emojis):

```
meteorologia          Meteorología
aerodinamica          Aerodinámica
navegacion            Navegación
performance           Performance
peso-balance          Peso y balance
mercancias            Mercancías peligrosas
seguridad             Seguridad operacional
factores-humanos      Factores humanos y CRM
reglamentacion        Reglamentación aeronáutica
comunicaciones        Comunicaciones
cartas                Cartas aeronáuticas
espacio-aereo         Espacio aéreo y ATS
helicopteros          Helicópteros
```

### El problema de las 13 tarjetas con 6 documentos

**Léelo con cuidado, porque es el error que ya cometimos una vez.**

Con 6 documentos, once de las trece tarjetas dirían "0 documentos". Trece
tarjetas y once vacías. Eso es exactamente el hallazgo número uno de la
auditoría de julio: *el interior estaba diseñado para un producto que todavía no
existía*.

**Lo que hay que hacer**, y es el patrón que la app ya usa en `AirlinePrep.tsx`
y que Cami aprobó:

- **Se muestran solo las materias que tienen documentos.** Con tarjeta, su
  cifra real y su descripción
- Debajo, **una sola línea de texto** con las que vienen: "Estamos cargando
  Aerodinámica, Navegación, Performance y otras seis." No trece tarjetas
  apagadas
- Cuando una materia recibe su primer documento, aparece sola. Sin tocar código

**Nunca una tarjeta que diga "0 documentos".** Es la regla de cero mentiras
aplicada al vacío: no se miente hacia arriba con cifras infladas ni hacia abajo
con ceros deprimentes.

### Los tres accesos rápidos

**Recientes sale gratis.** La tabla `user_library_views` ya existe con
`user_id`, `item_id`, `viewed_at` y `duration_seconds`, con RLS propia. Inserta
al abrir un documento y léela ordenada por fecha. No hace falta migración.

**Favoritos** necesita tabla nueva (abajo).

**Descargados** solo tiene sentido si hay descarga, y la descarga es por
documento (ver más abajo). Si al final solo dos documentos son descargables,
**ese acceso rápido no va en esta versión**: un filtro que devuelve siempre lo
mismo no es un filtro.

Y los tres siguen la misma regla que los demás controles: **aparecen cuando
tienen algo que mostrar.** Un "Favoritos" vacío no se pinta.

**La descarga es por documento, no global.** Cami pidió hace dos días que el PDF
no se pudiera copiar, y el visor se construyó pintando a canvas **sin capa de
texto** justamente para eso. Un botón de descargar lo anula.

- Campo nuevo `descargable boolean not null default false`
- Se pone en `true` solo donde la licencia lo permite: RAC 175 y LAR 175 son
  reglamentos públicos
- **Y no añadas `TextLayer` al visor** aunque dé búsqueda dentro del documento.
  Esa capa es lo que haría el PDF copiable

**Sin emojis.** Iconos de la librería, como el resto de la app.

**El nivel (básico, intermedio, avanzado) queda fuera de esta versión.** Un RAC
no es básico ni avanzado, es una norma. Clasificar reglamentos así se vuelve
arbitrario y nadie lo mantiene. Si alguien lo echa de menos, se añade.

### Lo que sí entra

**Número de páginas**, columna nueva. Y **no lo escribe nadie a mano**: pdf.js
ya lo sabe al abrir el documento, así que la primera vez que alguien lo abre se
guarda. Es gratis y siempre correcto.

**Favoritos**, con tabla propia:

```sql
create table if not exists public.user_library_favorites (
  user_id  uuid not null references auth.users(id) on delete cascade,
  item_id  bigint not null references public.library_items(id) on delete cascade,
  added_at timestamptz not null default now(),
  primary key (user_id, item_id)
);
```

Con RLS de select, insert y delete propios. Escribe la migración, **no la
apliques**: Cami la aplica por MCP.

**El buscador va grande y arriba**, como pidió Cami, y busca en título,
descripción, fuente y `tags`. Con 6 documentos filtra en memoria y sobra: no
montes búsqueda en la base todavía.

Lo que sí tiene que cumplir, que es el ejemplo que dio Cami: escribir **"METAR"**
encuentra el documento **aunque esté guardado bajo Meteorología**. Por eso busca
sobre `tags` y no solo sobre el título.

### La regla que hace que no se vea absurda

**Cada control aparece solo cuando hay suficiente que controlar.**

| Documentos | Qué se muestra |
|---|---|
| menos de 12 | Materias con contenido y sus tarjetas. Sin filtros |
| 12 o más | Aparece el buscador |
| 25 o más | Aparecen los filtros de tipo |

Los umbrales van como constantes con nombre en un solo sitio, no como números
sueltos repartidos por el componente.

Sí, Cami pidió el buscador arriba desde el principio. **Ponlo desde el
principio si te cabe sin que se vea vacío**, pero los filtros de tipo con seis
documentos no. Enseña la primera versión antes de añadir la barra entera.

---

## Convenciones

- Tipografía **12 / 13 / 15 / 17 / 20 / 24 / 32**, pesos **400 / 500 / 600**
- Radios 8px controles, 12px superficies. Contenedor `max-w-[1280px]`
- `.surface` y `.surface-lift`, nunca `border border-border bg-card`
- Botones con `appButtonClass()`, solo tamaños `md` y `lg`
- **El color solo cuando informa**
- Español neutro LATAM con **tuteo**. Prohibido el voseo
- **Prohibido el guion largo en texto visible**
- Sin emojis en la UI
- **Cero mentiras en pantalla**

---

## Antes de abrir el PR

```bash
npx tsc -p tsconfig.app.json --noEmit
npm run build
npx eslint src --ext .ts,.tsx        # no subir de 20 problemas
```

```bash
grep -rn "—" src/pages src/components --include="*.tsx" | grep -v '"—"'
grep -rnE "tenés|podés|practicá|acá\b" src/
```

Específico de esta tanda:

```bash
# la pieza de imagen existe en los dos sitios
grep -c "Figura" src/components/modulo/piezas.tsx
grep -c '"figura"' src/components/DocLessonBlocks.tsx

# no quedan testimonios inventados
grep -c "initials" src/components/landing/Testimonials.tsx

# el visor NO monta capa de texto
grep -rn "TextLayer\|renderTextLayer" src/components/lector/

# las imagenes de modulo salieron del precache
npm run build && grep -c "modulos/" dist/sw.js
```

Los tres últimos deben dar **0**.

**Y una advertencia sobre tildes**: al escribir texto que va a la base de datos,
cuídalas. Hoy hubo que corregir 16 textos que llegaron a producción sin ellas,
incluido un **"se publica cada ano"** en la ficha de la IATA DGR. Es texto que
lee un piloto en un producto de pago.

Verifica el deploy antes de dar nada por hecho:

```bash
gh api repos/camiloosorio2394/aviatoryapp/deployments --jq '.[0] | "\(.sha[0:7]) \(.environment)"'
```
