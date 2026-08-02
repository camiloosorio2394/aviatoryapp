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

## 5 · La Biblioteca es un estante, no una tabla 🟡

**Míralo antes de escribir nada.** La maqueta aprobada por Cami:

https://claude.ai/code/artifact/196cfbeb-71f8-4923-b614-b53ac85017d3

`src/pages/Library.tsx` se reemplaza entero por eso.

### Qué es

Filas con rótulo, cada una con desplazamiento horizontal propio, y en cada fila
las portadas de los documentos. Como un estante de librería, no como una rejilla
y mucho menos como una tabla.

```
Esenciales                                Elegidos a mano
  [portada] [portada] [portada] →

Reglamentos de Colombia · RAC             15 documentos
  [ ] [ ] [ ] [ ] [ ] [ ] →

Reglamentos latinoamericanos · LAR        6 documentos
  [ ] [ ] [ ] →

Material de Aviatory
  [ ] [ ] →
```

**La tarjeta:** portada, título, y una línea de meta (`Aerocivil · 96 p.`). Nada
más. Al tocarla se abre el visor.

**La portada manda.** Proporción `1055/1491`, que es A4 exacto y es lo que miden
las de Cami. `object-fit: cover`, radio 6px, sombra, y una franja de lomo a la
izquierda con degradado, que es lo que las hace parecer libros y no recuadros.

Al pasar por encima, la portada sube 6px y la sombra crece. El desplazamiento
lleva `scroll-snap-type: x proximity` para que las portadas queden alineadas al
soltar.

### Por qué por familia y no por materia

Un documento aeronáutico casi nunca trata de una sola materia: el RAC 91 toca
meteorología, performance, comunicaciones y espacio aéreo a la vez. Pero
**familia tiene una sola**, así que no hay documento en cuatro filas ni
contadores inflados.

Y sobre todo: **el número es el nombre.** Un piloto no busca "algo de
operaciones", busca el RAC 91. Las portadas de Cami llevan el número enorme, así
que una fila de RAC se recorre leyendo solo los números. Ordénalos por número
dentro de cada fila.

### La base ya está lista, no la toques

Aplicado en producción. `library_items` tiene ahora:

```
portada_url  ruta en public/biblioteca/portadas
familia      rac | lar | oaci | iata | aviatory | otro   (con restriccion)
destacado    boolean, entra en la fila "Esenciales"
paginas      int
```

**Los cinco documentos ya vienen poblados**, con su familia, su portada y su
PDF en el bucket: Banco de preguntas PCA, RAC 2, RAC 61, RAC 175 y LAR 175. Las
**portadas ya están en el repo**, en `public/biblioteca/portadas/`, a WebP de
900x1272 (A4) y 527 KB entre las cinco.

**No cargues datos.** La pantalla lee `library_items` y ya está: los cinco de
hoy y los que Cami añada después aparecen solos, sin tocar código. Si un
documento no sale, es que le falta el PDF en el bucket o está sin publicar, no
que haya que darlo de alta en la pantalla.

Las tres fichas de OACI e IATA quedaron **despublicadas** (`is_published =
false`): la Biblioteca solo habla de lo que está cargado. No las revivas.

### Las filas, y de dónde sale cada una

| Fila | De dónde sale |
|---|---|
| **Esenciales** | `destacado = true`. Curada a mano por Cami |
| **Reglamentos de Colombia · RAC** | `familia = 'rac'`, ordenados por número |
| **Reglamentos latinoamericanos · LAR** | `familia = 'lar'` |
| **OACI** | `familia = 'oaci'` |
| **Material de Aviatory** | `familia = 'aviatory'` |

Dos filas más que **salen gratis con datos que ya existen**:

- **"Del módulo que estás estudiando"**, con `category_id`. Si el piloto está en
  Mercancías, arriba le salen el RAC 175 y el LAR 175. Cero datos nuevos
- **"Seguir leyendo"**, con `user_library_views`, que ya tiene `viewed_at` y RLS
  propia. El documento que dejó a medias

**Una fila sin documentos no se pinta.** Nunca un carril vacío ni un "0
documentos".

### El número de páginas se rellena solo

No lo escribe nadie a mano. `pdf.js` ya sabe cuántas páginas tiene un documento
al abrirlo, y el visor ya usa pdf.js. La primera vez que alguien abre un
documento con `paginas` en null, se guarda. Gratis y siempre correcto.

### Lo que NO lleva, y es deliberado

Cami lo dijo con estas palabras: *"no vamos a poner edición vigente ni nada de
eso, solo necesito nombrar cada documento"*.

- **Sin estados de vigencia**, sin semáforos, sin "verificado hace X"
- **Sin estanterías por materia.** Se probó y se descartó
- **Sin nivel** básico, intermedio o avanzado
- **Sin filtros.** Ni de tipo, ni de materia, ni de nada
- **Sin emojis.** Iconos de la librería si hacen falta
- **Sin botón de descargar.** El visor pinta a canvas sin capa de texto a
  propósito, para que no se pueda copiar. Un botón de descargar lo anula
- **El buscador tampoco entra todavía.** Con 3 documentos sobra. Se añade cuando
  pasen de 25, buscando por número y nombre

**No añadas nada de esto "por si acaso".** Cada cosa que se metió de más en la
versión anterior hubo que quitarla.

### Y el visor sigue igual

Scroll continuo, canvas sin capa de texto, `ContentGuard` alrededor. No lo
toques más allá de guardarle las páginas.

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
