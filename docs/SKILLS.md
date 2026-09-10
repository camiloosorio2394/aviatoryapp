# Skills instaladas

52 skills de terceros, en cuatro tandas. Viven en `.agents/skills/` (36 MB) y están enlazadas
en `.claude/skills/`. **El contenido está ignorado por git**; lo que se versiona es
`skills-lock.json`, para que la instalación sea reproducible:

```bash
npx skills add Leonxlnx/taste-skill
npx skills add emilkowalski/skill
npx skills add heygen-com/hyperframes --full-depth
npx impeccable install
```

Se instalan por colección: pedir una trae docenas. Para instalar solo una:
`npx skills add <repo> --skill <nombre>`. Para quitar: `npx skills remove <nombre>`.

---

## Las que sirven

### Video del curso (la tanda más útil)

`hyperframes` es el **punto de entrada obligatorio** de cualquier video: enruta al workflow
que toque. No invocar los demás directamente.

| Skill | Para qué |
|---|---|
| `hyperframes` | Entrada. Siempre empezar aquí. |
| `faceless-explainer` | Video explicativo sin cámara ni footage: los visuales se inventan por escena. **Es el que sirve para los videos de módulo.** |
| `motion-graphics` | Piezas cortas (menos de 30 s) sin narración: un título animado, una cifra, un diagrama. |
| `hyperframes-core` | Contrato de composición: estructura, `data-*` de tiempo, tracks. |
| `hyperframes-animation` | Movimiento: reglas atómicas, blueprints de escena, adaptadores (GSAP por defecto). |
| `hyperframes-creative` | Paleta, tipografía, narración, planificación de beats. |
| `media-use` | Resolver música, locución (TTS), imágenes e iconos a archivos locales. |
| `hyperframes-cli` | Preview, lint, check y render. |
| `embedded-captions` | Subtítulos. Útil porque el alumno ve el curso en cualquier parte. |

### Interfaz de la app

| Skill | Para qué |
|---|---|
| `emil-design-eng` | Criterio de pulido de UI de Emil Kowalski (autor de Sonner y Vaul). El más alineado con Aviatory. |
| `animate` | Construir una animación decidiendo en el orden correcto. |
| `review-animations` | Criticar movimiento existente. |
| `improve-animations` | Auditar el movimiento de todo el repo y devolver un plan. |
| `find-animation-opportunities` | Buscar dónde falta movimiento (y dónde no debe haberlo). |
| `apple-design` | Gestos, springs, transiciones interrumpibles. |
| `animation-vocabulary` | Glosario inverso: describes un efecto y te da su nombre. |

---

## Las que NO sirven aquí

- **`write-swift`, `animate-expo`** — iOS y React Native. Aviatory es web.
- **`ask-sonner`** — solo si se adopta esa librería de toasts.
- **`minimalist-ui`, `industrial-brutalist-ui`, `high-end-visual-design`, `gpt-taste`,
  `stitch-design-taste`, `design-taste-frontend`** — son para **landing pages y portafolios**.
  La propia `design-taste-frontend` lo dice en su cabecera: *«Not dashboards, not data tables,
  not multi-step product UI»*. El lector de lecciones es exactamente eso. Usarlas sobre la app
  empuja contra el sistema de diseño que ya existe.
- **`redesign-existing-projects`** — propone rediseñar. Aviatory ya tiene identidad decidida.
- **`brandkit`, `imagegen-frontend-*`, `image-to-code`** — generación de imágenes de marca y
  maquetas. Solo si algún día se hace la web pública.
- **`changelog-video`, `pr-to-video`, `product-launch-video`, `music-to-video`,
  `talking-head-recut`** — formatos que no aplican al curso.

---

## Advertencia sobre impeccable

`npx impeccable install` no instaló solo instrucciones:

- Un binario de 14,7 MB: `impeccable.exe` v0.1.5.
- Cuatro subagentes en `.claude/agents/`.
- **Hooks en `.claude/settings.local.json`** que ejecutan ese binario **tras cada `Edit`/`Write`
  (5 s) y al cerrar cada turno (30 s)**.

Es la única skill que opina sin que la llamen. `.claude/` está en `.gitignore`, así que los
hooks viven solo en la máquina de Camilo y no se propagan al repo.

Antes de usarla en serio hay que correr `/impeccable init` y **describirle el sistema que ya
existe** (navy del índice, tokens `--ln-*`, `doc-sheet`, mostaza en Mercancías, verde en
Meteorología). Si no, el «deep pass» marca como defectos decisiones tomadas a propósito.

## Nota general

Hay solapamiento y contradicción entre ellas: `motion-doctrine`, `improve-animations`,
`animation-vocabulary` y `seam-craft` opinan las cuatro sobre movimiento con criterios
distintos, y `minimalist-ui` contra `industrial-brutalist-ui` contra `apple-design` son
estéticas incompatibles. No es un problema mientras se invoquen a mano para algo concreto.
Lo sería si se esperara que se apliquen solas.
