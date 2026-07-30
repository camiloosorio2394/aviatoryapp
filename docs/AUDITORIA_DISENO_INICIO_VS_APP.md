# Auditoría: por qué el inicio y el interior se sienten dos productos

30 de julio de 2026. Encargo: el inicio gusta, el interior cuesta de ver, y el salto
entre uno y otro es muy fuerte. Esta es la comparación pieza por pieza y lo que se
cambió.

---

## Lo que ya coincidía

No todo estaba desalineado. Estas cuatro cosas ya eran las mismas y no se tocaron:

- **La escala del titular.** El `h1` del interior y el `h2` de cada bloque del inicio
  usan exactamente `text-3xl sm:text-4xl font-extrabold tracking-[-0.03em] leading-[1.05]`.
- **El eyebrow azul** de 13 px sobre el titular.
- **El radio de las tarjetas**, `rounded-2xl` en los dos lados.
- **Los tokens de color.** El interior nunca dejó de usar `--av-blue-500` y compañía.

Por eso el arreglo resultó más chico de lo que parecía: el problema no era el lenguaje
visual, eran seis decisiones concretas.

---

## Los seis saltos

### 1. El cromo. Rail navy contra un producto todo claro

El inicio es blanco de punta a punta, con una barra de navegación que flota sobre el
fondo. Al entrar a la app aparecía un rail de `oklch(0.16 0.025 250)`, navy casi negro,
fijo a la izquierda. Era la frontera: al cruzarla parecía otro producto.

**Qué se hizo.** El rail pasa a superficie clara, `oklch(0.978 0.004 260)`, separada del
fondo solo por el borde, igual que la barra del inicio. El estado activo deja el bloque
azul al 26 por ciento con texto blanco y pasa a tinte azul al 12 por ciento con texto
azul, que es el mismo tratamiento que ya usaba el desplegable del perfil en el topbar.

Todo lo que dependía del tema se movió a tokens `--rail-*`: el hover, los chips, la
etiqueta de sección, el activo y su marca lateral. Antes el componente tenía escritos
valores que solo funcionaban en oscuro (`hover:bg-white/5`, `text-white/60`,
`oklch(1 0 0 / 8%)`), así que el modo claro no era una opción. Ahora el modo oscuro
conserva el rail navy por su propio bloque de overrides.

Contraste medido sobre el rail nuevo:

| Elemento | Contraste |
|---|---|
| Texto de navegación | 8,1:1 |
| Texto activo | 17,4:1 |
| Etiqueta de sección | 5,8:1 |
| Chip de conteo | 7,2:1 |
| Azul del activo sobre su tinte | 5,8:1 |

Los cinco pasan AA de sobra. El rail anterior no tenía problema de contraste: tenía
problema de pertenencia.

### 2. El ritmo vertical. Aire contra densidad

El inicio da `py-20 sm:py-28` a cada bloque y alterna blanco con un gris suave, así que
el ojo tiene dónde descansar. El interior daba `py-7` una sola vez, al contenedor de la
página, y de ahí en adelante todo iba pegado.

**Qué se hizo.** El contenedor de página pasa a `py-9 sm:py-11 pb-24`, en las 36
pantallas que lo usaban. El `PageHeader` pasa de `mb-7` a `mb-9 sm:mb-11`: el titular
estaba pegado al primer bloque.

### 3. Las tarjetas. Cajas dibujadas contra piezas apoyadas

La tarjeta de curso del inicio es `rounded-2xl border bg-card` **más una sombra de un
píxel** (`0 1px 2px rgb(0 0 0 / 4%)`) y se levanta 4 px al pasar por encima. La tarjeta
del interior era la misma sin la sombra ni el movimiento: se leía como un rectángulo
dibujado sobre el fondo, no como una pieza puesta encima. Con 84 tarjetas en pantalla,
esa diferencia de un píxel es la que hacía que el interior se viera plano.

**Qué se hizo.** Clase compartida `.surface` con el borde y la sombra del inicio, y
`.surface-lift` con el levantar de la tarjeta de curso, respetando
`prefers-reduced-motion`. Se aplicaron a las 84 tarjetas y a los 68 sitios que repetían
el levantar a mano.

### 4. Los botones. Pastilla contra esquina redondeada

Todos los CTA del inicio son pastillas (`rounded-full`). En el interior eran
`rounded-xl` y `rounded-lg`.

**Qué se hizo.** 95 botones y chips pasan a pastilla. No se tocaron los campos de
formulario: un input en forma de pastilla se lee como botón y deja de invitar a
escribir.

### 5. La bajada. 14 px contra 16 px

El párrafo bajo el titular iba en `text-sm` (14 px) en el interior y en 16 px en el
inicio. Con la jerarquía de arriba idéntica, ese salto hacía que el interior se leyera
como pantalla de herramienta y el inicio como página editorial.

**Qué se hizo.** La bajada del `PageHeader` sube a 15,5 px con `leading-relaxed`. La
pista del `SectionTitle` sube de 12 a 13,5 px: en 12 px quedaba por debajo del texto
secundario del resto de la app y se leía como letra chica legal.

### 6. El ancho útil

El inicio centra el contenido en `max-w-6xl` (1152 px). El interior usa hasta 1480 px,
casi borde a borde.

**No se cambió.** Con el rail expandido a 240 px, el contenido ya queda en torno a los
1240 px, así que la diferencia real es chica, y las pantallas con tablas (Bitácora,
Vencimientos) necesitan el ancho. Bajarlas a 1152 px las obligaría a recortar columnas,
que fue justo un hallazgo de la auditoría anterior. Queda anotado como decisión, no como
olvido.

---

## Alcance

37 archivos. Lo que propaga solo:

- `src/index.css`: tokens `--rail-*` para claro y oscuro, y las clases `.surface` y
  `.surface-lift`.
- `src/components/layout/AppSidebar.tsx`: 15 valores fijos reemplazados por tokens.
- `src/components/ui/page-header.tsx` y `section-title.tsx`: tipografía y aire.

Y las tres barridas sobre las pantallas: 84 tarjetas, 95 botones, 36 contenedores de
página, 68 levantados.

No se tocó nada de `src/components/landing/`: el inicio queda exactamente como está, y
se verificó que no cambió.

---

## Lo que no se verificó

Las pantallas del interior están detrás de `RequireAuth` y esta sesión no puede iniciar
sesión, así que el resultado no se vio corriendo. Lo comprobado es:

- `tsc` y `npm run build` limpios.
- El inicio, que sí es público, no cambió.
- La pantalla de ingreso, también pública, muestra los botones en pastilla.
- Los contrastes del rail nuevo, medidos sobre color real, no estimados.

Falta la pasada visual del Dashboard y de los módulos con sesión abierta. Es lo primero
que conviene mirar antes de mezclar.
