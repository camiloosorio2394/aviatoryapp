/**
 * Figuras de psicotécnicas, dibujadas por Aviatory.
 *
 * Los ejercicios llegaron como recortes de los cuadernillos, con el logotipo
 * del autor impreso en mitad de la pregunta y, en la serie A1, con las letras
 * de las opciones cortadas por el encuadre. Reencuadrar no arregla lo primero:
 * la marca está dentro del pixel. Así que la figura deja de ser una imagen y
 * pasa a ser una descripción —qué elementos hay y dónde—, y el dibujo se
 * deduce de ella.
 *
 * Lo que eso compra, además de quitar las marcas ajenas:
 *
 * - **Cada opción es su propia figura.** Antes vivían dentro del pixel de la
 *   imagen grande y el botón era solo una letra. Ahora se dibujan aparte, y el
 *   ejercicio se puede usar en un móvil sin ampliar nada.
 * - **La regla queda escrita.** Si la serie es «la flecha gira un cuarto», eso
 *   está en los atributos y un solucionador puede comprobarlo. Una respuesta
 *   ya no se sostiene en que alguien miró bien.
 * - **Sigue al tema.** El trazo es `currentColor`; en claro es tinta sobre
 *   papel y en oscuro al revés, sin dos juegos de archivos.
 *
 * El dibujo se emite como cadena SVG y no como JSX a propósito: así lo usan
 * igual la aplicación y `scripts/psicotecnicas/verificar-figuras.mjs`, que
 * levanta esta misma descripción para enfrentarla al recorte original.
 */

// ────────────────────────────────────────────────────────────────────────────
// Vocabulario
//
// Regla de la casa: la figura se describe por atributos, nunca por trazos
// sueltos. Si un ejercicio no cabe aquí, se amplía el vocabulario; en cuanto
// entre un `path` a mano se pierde la ventaja entera, porque un `path` no se
// puede comparar, ni resolver, ni verificar.

/** Cuadrante dentro de una rejilla de dos por dos. */
export type Cuadrante = 0 | 1 | 2 | 3 // 0=sup-izq 1=sup-der 2=inf-izq 3=inf-der

export type Sentido = "arriba" | "abajo" | "izquierda" | "derecha"

/** Hacia dónde mira el vértice de un triángulo inscrito. */
export type Apice = "arriba" | "abajo" | "izquierda" | "derecha"

/**
 * Rellenos del cuadernillo.
 *
 * Son atributos, no colores: lo que el ejercicio hace variar es «rayado» o
 * «punteado», no un tono. Por eso se dibujan con tramas de `currentColor` y
 * siguen al tema como el resto del trazo.
 */
export type Relleno =
  | "blanco"
  | "negro"
  | "rayado-diagonal"
  | "rayado-vertical"
  | "punteado"
  | "cuadricula"

export type Esquina =
  | "inferior-izquierda"
  | "inferior-derecha"
  | "superior-izquierda"
  | "superior-derecha"

/** Un elemento dibujable dentro de una celda. */
export type Elemento =
  | { tipo: "flecha"; cuadrante: Cuadrante; sentido: Sentido }
  /** Triángulo inscrito en la celda, con la base en el lado opuesto al ápice. */
  | { tipo: "triangulo"; apice: Apice }
  /**
   * El segmento que baja del ápice hacia el centro de la base sin llegar a
   * tocarla. En los cuadernillos es un atributo que aparece y desaparece, no
   * una parte del triángulo, y por eso va suelto.
   */
  | { tipo: "mastil"; apice: Apice }
  /** Trazo corto que muere en una esquina, entrando en diagonal suave. */
  | { tipo: "trazo-esquina"; esquina: Esquina }
  /** Rombo inscrito: sus cuatro vértices, en los medios de los lados. */
  | { tipo: "rombo" }
  /**
   * Brazo desde el centro hasta el medio de un lado.
   *
   * Va suelto y no como «cruz» o «eje» porque en los cuadernillos los cuatro
   * brazos aparecen y desaparecen uno a uno: son cuatro atributos, y tratarlos
   * como uno solo perdería justo lo que cambia entre casilla y casilla.
   */
  | { tipo: "radio"; hacia: Sentido }
  /** Las dos diagonales del rectángulo, de esquina a esquina. */
  | { tipo: "diagonales" }
  /**
   * Cuerda del rombo, paralela a uno de sus ejes.
   *
   * Se declara por el lado hacia el que se desplaza —«una cuerda hacia el
   * este»— y no por una coordenada: cae siempre a mitad de camino entre el
   * centro y ese vértice, con los extremos sobre los lados del rombo. Es un
   * atributo, y por eso se puede comparar entre casillas.
   */
  | { tipo: "cuerda"; hacia: Sentido }
  /**
   * Cuadrado con una circunferencia en el medio de uno de sus lados y, cuando
   * los lleva, dos marcadores en las esquinas del lado opuesto.
   *
   * Va como un elemento y no como cuatro sueltos porque en el cuadernillo se
   * mueve como uno solo: el rabo sale de la circunferencia y los marcadores
   * cuelgan siempre del lado contrario. Sus dos atributos —hacia dónde mira y
   * qué marcadores lleva— son justo los que la matriz hace variar.
   */
  /**
   * La pieza con punta: una barra rematada por un triángulo.
   *
   * La barra va siempre perpendicular a la punta, como en las alternativas del
   * cuadernillo. El original dibuja algunas casillas con la barra en el eje de
   * la punta, pero eso es cómo lo maquetaron: el atributo que el ejercicio
   * hace variar es hacia dónde apunta, y así todas se comparan igual.
   */
  | { tipo: "pieza-punta"; mira: Sentido; relleno: Relleno }
  /**
   * El rectángulo partido en dos y una de las mitades rellena.
   *
   * `lado` dice cuál de las dos se rellena: con el corte vertical, izquierda o
   * derecha; con el horizontal, arriba o abajo; con el diagonal —que va de
   * abajo-izquierda a arriba-derecha—, arriba es el triángulo de arriba a la
   * izquierda. Cuando el relleno es blanco el lado no se ve, pero se declara
   * igual: es lo que distingue dos alternativas que solo cambian de mitad.
   */
  /**
   * El mástil del ejercicio 6: una vertical con un semicírculo arriba, un
   * círculo abajo a un lado y un gancho abierto al otro.
   *
   * El gancho no se declara: va siempre al lado contrario del círculo, como en
   * el cuadernillo. Lo que sí se declara es el relleno del círculo de abajo,
   * porque hay alternativas que solo se distinguen en eso.
   */
  /**
   * La silueta del ejercicio 7: un contorno grande, un símbolo apoyado en su
   * base y un pie justo debajo.
   *
   * Las tres partes se mueven a la vez y por eso van juntas. El relleno del
   * símbolo se declara porque una alternativa cambia la barra negra por una
   * hueca y no se distingue en nada más.
   */
  | {
      tipo: "silueta-con-simbolo"
      contorno: "triangulo" | "rectangulo" | "casa"
      simbolo: "barra" | "triangulito" | "cruz"
      simboloRelleno: Relleno
      pie: "trazo" | "patas" | "circulito"
    }
  | {
      tipo: "mastil-figura"
      semicirculo: "izquierda" | "derecha"
      relleno: Relleno
      circulo: "izquierda" | "derecha"
      circuloRelleno: Relleno
    }
  | {
      tipo: "mitad-rellena"
      corte: "vertical" | "horizontal" | "diagonal"
      lado: Sentido
      relleno: Relleno
    }
  | {
      tipo: "cuadro-marcado"
      mira: Sentido
      /** Qué se posa en el medio de ese lado. */
      nudo: "circunferencia" | "cuadrado-negro"
      /** El trazo que sale del nudo hacia fuera. Distingue alternativas. */
      rabo: boolean
      marcadores: "cuadrado" | "cuadrado-hueco" | "circulo" | "ninguno"
    }

/** El contenido de una casilla: su marco, su rejilla y lo que lleva dentro. */
export interface Celda {
  /** Rejilla interior. Hoy solo la de dos por dos del conjunto A2. */
  rejilla?: "2x2"
  /** Recuadro propio de la casilla, como lo llevan las matrices del A1. */
  marco?: boolean
  elementos: Elemento[]
}

/** La casilla que hay que adivinar. */
export interface Incognita {
  incognita: true
}

export type Casilla = Celda | Incognita

export function esIncognita(c: Casilla): c is Incognita {
  return "incognita" in c
}

/**
 * Una serie de casillas en línea con sus alternativas.
 *
 * `celdas` incluye la incógnita en su sitio, porque la posición del hueco es
 * parte del ejercicio: no siempre va al final.
 */
export interface FiguraSerie {
  tipo: "serie-lineal"
  celdas: Casilla[]
  opciones: Celda[]
}

/**
 * La matriz de tres por tres del conjunto A1, con su hueco y sus cinco
 * alternativas. `celdas` va en orden de lectura y trae nueve.
 */
export interface FiguraMatriz {
  tipo: "matriz-3x3"
  celdas: Casilla[]
  opciones: Celda[]
}

export type Figura = FiguraSerie | FiguraMatriz

// ────────────────────────────────────────────────────────────────────────────
// Medidas
//
// El lienzo se piensa en píxeles reales y se sirve al ancho natural, así que
// un trazo de 2 es un trazo de 2 en pantalla. Debajo de ese ancho la figura
// entera encoge en bloque, que es lo que hace que se lea a 375 px sin ampliar.

const CELDA = 96 // lado de una casilla de la serie
const MARCO = 2.5 // grosor del contorno que agrupa la serie
const TRAZO = 1.8 // grosor de la rejilla interior
const REJILLA = 68 // lado de la rejilla de dos por dos, centrada en la casilla
const OPCION = 78 // lado de la figura de una alternativa
const MARCA_ALTO = 18 // alto del isotipo, según el encargo
const MARCA_MARGEN = 8

// ────────────────────────────────────────────────────────────────────────────
// Tramas
//
// Van con identificador fijo a propósito. Dos SVG en la misma página declaran
// la misma trama con el mismo nombre, y el navegador resuelve `url(#…)` con la
// primera que encuentra: como todas son idénticas, el dibujo sale bien y no
// hay que inventar identificadores únicos por figura.

const TRAMAS: Record<string, string> = {
  "rayado-diagonal":
    `<pattern id="psico-rayado-diagonal" width="8" height="8" patternUnits="userSpaceOnUse"` +
    ` patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="8"` +
    ` stroke="currentColor" stroke-width="2"/></pattern>`,
  "rayado-vertical":
    `<pattern id="psico-rayado-vertical" width="6" height="6" patternUnits="userSpaceOnUse">` +
    `<line x1="0" y1="0" x2="0" y2="6" stroke="currentColor" stroke-width="2"/></pattern>`,
  punteado:
    `<pattern id="psico-punteado" width="9" height="9" patternUnits="userSpaceOnUse">` +
    `<circle cx="2.5" cy="2.5" r="1.6" fill="currentColor"/></pattern>`,
  cuadricula:
    `<pattern id="psico-cuadricula" width="9" height="9" patternUnits="userSpaceOnUse">` +
    `<path d="M0 0 H9 M0 0 V9" stroke="currentColor" stroke-width="1.4" fill="none"/></pattern>`,
}

/** Cómo se pinta un relleno dentro de un `fill`. */
function pintura(relleno: Relleno): string {
  if (relleno === "blanco") return "var(--card, #fff)"
  if (relleno === "negro") return "currentColor"
  return `url(#psico-${relleno})`
}

// ────────────────────────────────────────────────────────────────────────────
// La marca

/**
 * El isotipo de Aviatory, en la esquina superior derecha del lienzo.
 *
 * Una sola función para las noventa y nueve figuras: si la marca se copiara
 * ficha por ficha, en la número cuarenta estaría dos píxeles más abajo y
 * nadie lo vería hasta verlas juntas.
 *
 * Va el isotipo y no el logotipo horizontal porque en una figura de ejercicio
 * el wordmark compite con el enunciado. Y va en `--muted-foreground` al 35 %:
 * tiene que decir de quién es la figura sin disputarle el trazo.
 *
 * La geometría es la de `src/assets/logos/aviatory-isotype-mono.svg`, en su
 * lienzo original de 512, escalada aquí. Si allá se ajusta, ajustar acá.
 */
function marca(anchoLienzo: number): string {
  const escala = MARCA_ALTO / 512
  const x = anchoLienzo - MARCA_ALTO - MARCA_MARGEN
  const y = MARCA_MARGEN
  return [
    `<g transform="translate(${x} ${y}) scale(${escala.toFixed(5)})"`,
    ` fill="var(--muted-foreground, currentColor)" opacity="0.35" aria-hidden="true">`,
    `<mask id="av-corte"><rect width="512" height="512" fill="#fff"/>`,
    `<polygon points="0,382 512,216 512,260 0,446" fill="#000"/></mask>`,
    `<g mask="url(#av-corte)"><path fill-rule="evenodd" clip-rule="evenodd"`,
    ` d="M243 52 L317 52 L452 470 L372 470 L280 168 L188 470 L108 470 Z"/></g>`,
    `<polygon points="38,356 126,322 502,196 502,206 150,360 96,392"/>`,
    `<polygon points="96,392 150,360 138,414 102,428"/>`,
    `<polygon points="148,408 502,224 176,432"/>`,
    `</g>`,
  ].join("")
}

/**
 * Ancho que hay que reservar para que la marca no toque el dibujo.
 *
 * Regla de oro del encargo: si el dibujo llega a esa esquina **se crece el
 * lienzo, no se mueve el dibujo**. Mover el dibujo cambia el ejercicio.
 */
const MARCA_RESERVA = MARCA_ALTO + MARCA_MARGEN * 2

// ────────────────────────────────────────────────────────────────────────────
// Trazos

/**
 * Una flecha dentro de su cuadrante, centrada en él.
 *
 * El original las dibuja finas y con la punta llena; se respeta, porque el
 * grosor de la punta es lo que distingue de un vistazo el sentido, que es el
 * único atributo que cambia en toda la familia A2.
 */
function flecha(cx: number, cy: number, largo: number, sentido: Sentido): string {
  const mitad = largo / 2
  const punta = 6.5 // media base de la cabeza
  const alto = 9 // altura de la cabeza

  // Se dibuja siempre apuntando arriba y se gira: así la cabeza es idéntica en
  // los cuatro sentidos y no hay cuatro polígonos que mantener sincronizados.
  const giro = { arriba: 0, derecha: 90, abajo: 180, izquierda: 270 }[sentido]

  return [
    `<g transform="translate(${cx} ${cy}) rotate(${giro})"`,
    ` stroke="currentColor" stroke-width="2" stroke-linecap="butt">`,
    `<line x1="0" y1="${mitad}" x2="0" y2="${-mitad + alto - 1}"/>`,
    `<polygon points="0,${-mitad} ${-punta},${-mitad + alto} ${punta},${-mitad + alto}"`,
    ` fill="currentColor" stroke="none"/>`,
    `</g>`,
  ].join("")
}

/** El centro de un cuadrante dentro de una rejilla de lado `lado` en (x, y). */
function centroDe(cuadrante: Cuadrante, x: number, y: number, lado: number) {
  const columna = cuadrante % 2 // 0 izquierda, 1 derecha
  const fila = cuadrante < 2 ? 0 : 1 // 0 arriba, 1 abajo
  return {
    cx: x + lado * (0.25 + columna * 0.5),
    cy: y + lado * (0.25 + fila * 0.5),
  }
}

/** Los tres vértices de un triángulo inscrito en el rectángulo dado. */
function verticesTriangulo(
  apice: Apice,
  x: number,
  y: number,
  ancho: number,
  alto: number
): [number, number][] {
  const [i, d, s, f] = [x, x + ancho, y, y + alto] // izquierda, derecha, superior, fondo
  const mx = x + ancho / 2
  const my = y + alto / 2
  switch (apice) {
    case "arriba":
      return [[mx, s], [i, f], [d, f]]
    case "abajo":
      return [[mx, f], [i, s], [d, s]]
    case "izquierda":
      return [[i, my], [d, s], [d, f]]
    case "derecha":
      return [[d, my], [i, s], [i, f]]
  }
}

/** El punto exacto de una esquina del rectángulo. */
function puntoEsquina(
  esquina: Esquina,
  x: number,
  y: number,
  ancho: number,
  alto: number
): [number, number] {
  const arriba = esquina.startsWith("superior")
  const izquierda = esquina.endsWith("izquierda")
  return [izquierda ? x : x + ancho, arriba ? y : y + alto]
}

/** El contenido de una casilla: su marco, su rejilla y sus elementos. */
function dibujarCelda(
  celda: Celda,
  x: number,
  y: number,
  ancho: number,
  alto: number
): string {
  const partes: string[] = []

  if (celda.marco) {
    partes.push(
      `<rect x="${x}" y="${y}" width="${ancho}" height="${alto}" fill="none"` +
        ` stroke="currentColor" stroke-width="${TRAZO}"/>`
    )
  }

  if (celda.rejilla === "2x2") {
    const mx = x + ancho / 2
    const my = y + alto / 2
    partes.push(
      `<rect x="${x}" y="${y}" width="${ancho}" height="${alto}" fill="none"` +
        ` stroke="currentColor" stroke-width="${TRAZO}"/>`,
      `<line x1="${mx}" y1="${y}" x2="${mx}" y2="${y + alto}"` +
        ` stroke="currentColor" stroke-width="${TRAZO}"/>`,
      `<line x1="${x}" y1="${my}" x2="${x + ancho}" y2="${my}"` +
        ` stroke="currentColor" stroke-width="${TRAZO}"/>`
    )
  }

  for (const el of celda.elementos) {
    switch (el.tipo) {
      case "flecha": {
        const { cx, cy } = centroDe(el.cuadrante, x, y, Math.min(ancho, alto))
        partes.push(flecha(cx, cy, Math.min(ancho, alto) * 0.34, el.sentido))
        break
      }

      case "triangulo": {
        const puntos = verticesTriangulo(el.apice, x, y, ancho, alto)
          .map(([px, py]) => `${px.toFixed(1)},${py.toFixed(1)}`)
          .join(" ")
        partes.push(
          `<polygon points="${puntos}" fill="none" stroke="currentColor"` +
            ` stroke-width="${TRAZO}" stroke-linejoin="miter"/>`
        )
        break
      }

      case "mastil": {
        // Baja del ápice hacia el centro de la base y se queda a medio camino:
        // en el original nunca la toca, y que no la toque es lo que lo hace un
        // atributo suelto y no una partición del triángulo.
        const [[ax, ay], [b1x, b1y], [b2x, b2y]] = verticesTriangulo(
          el.apice,
          x,
          y,
          ancho,
          alto
        )
        const baseX = (b1x + b2x) / 2
        const baseY = (b1y + b2y) / 2
        const largo = 0.55
        partes.push(
          `<line x1="${ax.toFixed(1)}" y1="${ay.toFixed(1)}"` +
            ` x2="${(ax + (baseX - ax) * largo).toFixed(1)}"` +
            ` y2="${(ay + (baseY - ay) * largo).toFixed(1)}"` +
            ` stroke="currentColor" stroke-width="${TRAZO}"/>`
        )
        break
      }

      case "rombo": {
        const puntos = [
          [x + ancho / 2, y],
          [x + ancho, y + alto / 2],
          [x + ancho / 2, y + alto],
          [x, y + alto / 2],
        ]
          .map(([px, py]) => `${px.toFixed(1)},${py.toFixed(1)}`)
          .join(" ")
        partes.push(
          `<polygon points="${puntos}" fill="none" stroke="currentColor"` +
            ` stroke-width="${TRAZO}" stroke-linejoin="miter"/>`
        )
        break
      }

      case "radio": {
        const cx = x + ancho / 2
        const cy = y + alto / 2
        const destino = {
          arriba: [cx, y],
          abajo: [cx, y + alto],
          izquierda: [x, cy],
          derecha: [x + ancho, cy],
        }[el.hacia]
        partes.push(
          `<line x1="${cx}" y1="${cy}" x2="${destino[0]}" y2="${destino[1]}"` +
            ` stroke="currentColor" stroke-width="${TRAZO}"/>`
        )
        break
      }

      case "cuerda": {
        const cx = x + ancho / 2
        const cy = y + alto / 2
        // A mitad de camino hacia el vértice, el rombo mide la mitad de alto.
        const horizontal = el.hacia === "izquierda" || el.hacia === "derecha"
        const signo = el.hacia === "izquierda" || el.hacia === "arriba" ? -1 : 1
        const [x1, y1, x2, y2] = horizontal
          ? [cx + (signo * ancho) / 4, cy - alto / 4, cx + (signo * ancho) / 4, cy + alto / 4]
          : [cx - ancho / 4, cy + (signo * alto) / 4, cx + ancho / 4, cy + (signo * alto) / 4]
        partes.push(
          `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}"` +
            ` x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}"` +
            ` stroke="currentColor" stroke-width="${TRAZO}"/>`
        )
        break
      }

      case "silueta-con-simbolo": {
        const m = Math.min(ancho, alto) * 0.08 // aire hasta el marco
        const [i, d, s2, f] = [x + m, x + ancho - m, y + m, y + alto - m]
        const cx = x + ancho / 2

        const contorno =
          el.contorno === "triangulo"
            ? `${cx},${s2} ${i},${f} ${d},${f}`
            : el.contorno === "rectangulo"
              ? `${i},${s2} ${d},${s2} ${d},${f} ${i},${f}`
              : // La casa: dos aguas sobre un cuerpo recto.
                `${cx},${s2} ${d},${s2 + (f - s2) * 0.34} ${d},${f} ${i},${f}` +
                ` ${i},${s2 + (f - s2) * 0.34}`
        partes.push(
          `<polygon points="${contorno}" fill="none" stroke="currentColor"` +
            ` stroke-width="${TRAZO}" stroke-linejoin="miter"/>`
        )

        // El símbolo se apoya en la base del contorno.
        const relleno = pintura(el.simboloRelleno)
        const alto2 = alto * 0.16
        if (el.simbolo === "barra") {
          const w = ancho * (el.contorno === "triangulo" ? 0.42 : 0.26)
          partes.push(
            `<rect x="${(cx - w / 2).toFixed(1)}" y="${(f - alto2).toFixed(1)}"` +
              ` width="${w.toFixed(1)}" height="${alto2.toFixed(1)}" fill="${relleno}"` +
              ` stroke="currentColor" stroke-width="${TRAZO}"/>`
          )
        } else if (el.simbolo === "triangulito") {
          const w = ancho * 0.12
          partes.push(
            `<polygon points="${cx},${(f - alto2 * 1.4).toFixed(1)}` +
              ` ${(cx - w).toFixed(1)},${f.toFixed(1)} ${(cx + w).toFixed(1)},${f.toFixed(1)}"` +
              ` fill="${relleno}" stroke="currentColor" stroke-width="${TRAZO}"/>`
          )
        } else {
          const brazo = ancho * 0.09
          partes.push(
            `<path d="M${cx},${(f - alto2 * 1.7).toFixed(1)} V${f.toFixed(1)}` +
              ` M${(cx - brazo).toFixed(1)},${(f - alto2 * 1.1).toFixed(1)} h${(brazo * 2).toFixed(1)}"` +
              ` stroke="currentColor" stroke-width="${TRAZO}" fill="none"/>`
          )
        }

        // Y el pie, colgando por debajo de la base.
        const p = alto * 0.09
        if (el.pie === "trazo") {
          partes.push(
            `<line x1="${cx}" y1="${f.toFixed(1)}" x2="${cx}" y2="${(f + p).toFixed(1)}"` +
              ` stroke="currentColor" stroke-width="${TRAZO}"/>`
          )
        } else if (el.pie === "patas") {
          partes.push(
            `<polygon points="${cx},${f.toFixed(1)} ${(cx - p).toFixed(1)},${(f + p).toFixed(1)}` +
              ` ${(cx + p).toFixed(1)},${(f + p).toFixed(1)}" fill="none"` +
              ` stroke="currentColor" stroke-width="${TRAZO}"/>`
          )
        } else {
          partes.push(
            `<circle cx="${cx}" cy="${(f + p * 0.55).toFixed(1)}" r="${(p * 0.62).toFixed(1)}"` +
              ` fill="var(--card, #fff)" stroke="currentColor" stroke-width="${TRAZO}"/>`
          )
        }
        break
      }

      case "mastil-figura": {
        const cx = x + ancho / 2
        const r = Math.min(ancho, alto) * 0.17
        const yArriba = y + alto * 0.2
        const yAbajo = y + alto * 0.72
        const aLaDerecha = (lado: string) => (lado === "derecha" ? 1 : -1)

        partes.push(
          `<line x1="${cx}" y1="${y}" x2="${cx}" y2="${y + alto}"` +
            ` stroke="currentColor" stroke-width="${TRAZO}"/>`
        )

        // El semicírculo: media circunferencia pegada al mástil por su lado.
        const barrido = el.semicirculo === "derecha" ? 1 : 0
        partes.push(
          `<path d="M${cx},${(yArriba - r).toFixed(1)} A${r.toFixed(1)},${r.toFixed(1)}` +
            ` 0 0 ${barrido} ${cx},${(yArriba + r).toFixed(1)} Z"` +
            ` fill="${pintura(el.relleno)}" stroke="currentColor" stroke-width="${TRAZO}"/>`
        )

        // El círculo, tangente al mástil por dentro de su lado.
        const cxCirculo = cx + aLaDerecha(el.circulo) * r
        partes.push(
          `<circle cx="${cxCirculo.toFixed(1)}" cy="${yAbajo.toFixed(1)}" r="${r.toFixed(1)}"` +
            ` fill="${pintura(el.circuloRelleno)}" stroke="currentColor" stroke-width="${TRAZO}"/>`
        )

        // El gancho, al otro lado: media vuelta abierta hacia arriba.
        const haciaElGancho = -aLaDerecha(el.circulo)
        partes.push(
          `<path d="M${cx},${yAbajo.toFixed(1)} A${r.toFixed(1)},${r.toFixed(1)} 0 0` +
            ` ${haciaElGancho > 0 ? 0 : 1} ${(cx + haciaElGancho * 2 * r).toFixed(1)},${yAbajo.toFixed(1)}"` +
            ` fill="none" stroke="currentColor" stroke-width="${TRAZO}"/>`
        )
        break
      }

      case "mitad-rellena": {
        const relleno = pintura(el.relleno)
        const [d, f] = [x + ancho, y + alto] // derecha, fondo
        const zona =
          el.corte === "vertical"
            ? el.lado === "izquierda"
              ? `${x},${y} ${x + ancho / 2},${y} ${x + ancho / 2},${f} ${x},${f}`
              : `${x + ancho / 2},${y} ${d},${y} ${d},${f} ${x + ancho / 2},${f}`
            : el.corte === "horizontal"
              ? el.lado === "arriba"
                ? `${x},${y} ${d},${y} ${d},${y + alto / 2} ${x},${y + alto / 2}`
                : `${x},${y + alto / 2} ${d},${y + alto / 2} ${d},${f} ${x},${f}`
              : el.lado === "arriba"
                ? `${x},${y} ${d},${y} ${x},${f}`
                : `${d},${y} ${d},${f} ${x},${f}`

        // El corte se dibuja siempre, aunque la mitad quede en blanco: es la
        // línea que parte la casilla, no el borde del relleno.
        const linea =
          el.corte === "vertical"
            ? `M${x + ancho / 2},${y} V${f}`
            : el.corte === "horizontal"
              ? `M${x},${y + alto / 2} H${d}`
              : `M${x},${f} L${d},${y}`

        partes.push(
          `<polygon points="${zona}" fill="${relleno}" stroke="none"/>`,
          `<path d="${linea}" stroke="currentColor" stroke-width="${TRAZO}" fill="none"/>`
        )
        break
      }

      case "pieza-punta": {
        const largo = Math.min(ancho, alto) * 0.62 // el lado largo de la barra
        const grueso = Math.min(ancho, alto) * 0.3
        const punta = Math.min(ancho, alto) * 0.22
        const cx = x + ancho / 2
        const cy = y + alto / 2
        const vertical = el.mira === "izquierda" || el.mira === "derecha"
        // La barra va perpendicular a la punta.
        const bw = vertical ? grueso : largo
        const bh = vertical ? largo : grueso
        const bx = cx - bw / 2
        const by = cy - bh / 2
        const relleno = pintura(el.relleno)

        // El triángulo cuelga del lado al que mira, con la base pegada a la
        // barra y algo más estrecha que ella: así se lee como una punta y no
        // como un tejado.
        const base = (vertical ? bh : bw) * 0.72
        const [ax, ay] =
          el.mira === "arriba"
            ? [cx, by - punta]
            : el.mira === "abajo"
              ? [cx, by + bh + punta]
              : el.mira === "izquierda"
                ? [bx - punta, cy]
                : [bx + bw + punta, cy]
        const [e1, e2] = vertical
          ? [
              [el.mira === "izquierda" ? bx : bx + bw, cy - base / 2],
              [el.mira === "izquierda" ? bx : bx + bw, cy + base / 2],
            ]
          : [
              [cx - base / 2, el.mira === "arriba" ? by : by + bh],
              [cx + base / 2, el.mira === "arriba" ? by : by + bh],
            ]

        partes.push(
          `<rect x="${bx.toFixed(1)}" y="${by.toFixed(1)}" width="${bw.toFixed(1)}"` +
            ` height="${bh.toFixed(1)}" fill="${relleno}" stroke="currentColor"` +
            ` stroke-width="${TRAZO}"/>`,
          `<polygon points="${ax.toFixed(1)},${ay.toFixed(1)} ${e1[0].toFixed(1)},${e1[1].toFixed(1)}` +
            ` ${e2[0].toFixed(1)},${e2[1].toFixed(1)}" fill="${relleno}"` +
            ` stroke="currentColor" stroke-width="${TRAZO}" stroke-linejoin="miter"/>`
        )
        break
      }

      case "cuadro-marcado": {
        const lado = Math.min(ancho, alto) * 0.55
        const ix = x + (ancho - lado) / 2
        const iy = y + (alto - lado) / 2
        // El medio de cada lado del cuadrado, y hacia dónde sale de él.
        const medios: Record<Sentido, [number, number]> = {
          arriba: [ix + lado / 2, iy],
          abajo: [ix + lado / 2, iy + lado],
          izquierda: [ix, iy + lado / 2],
          derecha: [ix + lado, iy + lado / 2],
        }
        const fuera: Record<Sentido, [number, number]> = {
          arriba: [0, -1],
          abajo: [0, 1],
          izquierda: [-1, 0],
          derecha: [1, 0],
        }
        // Las dos esquinas del lado opuesto, que es de donde cuelgan siempre.
        const opuesto: Record<Sentido, Sentido> = {
          arriba: "abajo",
          abajo: "arriba",
          izquierda: "derecha",
          derecha: "izquierda",
        }
        const esquinasDe: Record<Sentido, [number, number][]> = {
          arriba: [[ix, iy], [ix + lado, iy]],
          abajo: [[ix, iy + lado], [ix + lado, iy + lado]],
          izquierda: [[ix, iy], [ix, iy + lado]],
          derecha: [[ix + lado, iy], [ix + lado, iy + lado]],
        }

        partes.push(
          `<rect x="${ix.toFixed(1)}" y="${iy.toFixed(1)}" width="${lado.toFixed(1)}"` +
            ` height="${lado.toFixed(1)}" fill="none" stroke="currentColor"` +
            ` stroke-width="${TRAZO}"/>`
        )

        const [mx, my] = medios[el.mira]
        const [dx, dy] = fuera[el.mira]
        const radio = 6.5

        if (el.rabo) {
          // Muere en el borde de la casilla, como en el original: el rabo dice
          // hacia dónde mira la figura, y para eso tiene que llegar al marco.
          const borde: Record<Sentido, [number, number]> = {
            arriba: [mx, y],
            abajo: [mx, y + alto],
            izquierda: [x, my],
            derecha: [x + ancho, my],
          }
          partes.push(
            `<line x1="${(mx + dx * radio).toFixed(1)}" y1="${(my + dy * radio).toFixed(1)}"` +
              ` x2="${borde[el.mira][0].toFixed(1)}" y2="${borde[el.mira][1].toFixed(1)}"` +
              ` stroke="currentColor" stroke-width="${TRAZO}"/>`
          )
        }

        if (el.marcadores !== "ninguno") {
          const salida = Math.min(ancho, alto) * 0.13
          for (const [ex, ey] of esquinasDe[opuesto[el.mira]]) {
            const px = ex - dx * salida
            const py = ey - dy * salida
            partes.push(
              `<line x1="${ex.toFixed(1)}" y1="${ey.toFixed(1)}"` +
                ` x2="${px.toFixed(1)}" y2="${py.toFixed(1)}"` +
                ` stroke="currentColor" stroke-width="${TRAZO}"/>`,
              el.marcadores === "circulo"
                ? `<circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="5.5" fill="currentColor"/>`
                : `<rect x="${(px - 5.5).toFixed(1)}" y="${(py - 5.5).toFixed(1)}" width="11"` +
                  ` height="11" stroke="currentColor" stroke-width="${TRAZO}"` +
                  ` fill="${el.marcadores === "cuadrado" ? "currentColor" : "var(--card, #fff)"}"/>`
            )
          }
        }

        // El nudo va el último: se dibuja encima del cuadrado y del rabo, que
        // es como se ve en el original.
        partes.push(
          el.nudo === "circunferencia"
            ? `<circle cx="${mx.toFixed(1)}" cy="${my.toFixed(1)}" r="${radio}"` +
              ` fill="var(--card, #fff)" stroke="currentColor" stroke-width="${TRAZO}"/>`
            : `<rect x="${(mx - radio).toFixed(1)}" y="${(my - radio).toFixed(1)}"` +
              ` width="${radio * 2}" height="${radio * 2}" fill="currentColor"/>`
        )
        break
      }

      case "diagonales": {
        partes.push(
          `<line x1="${x}" y1="${y}" x2="${x + ancho}" y2="${y + alto}"` +
            ` stroke="currentColor" stroke-width="${TRAZO}"/>`,
          `<line x1="${x + ancho}" y1="${y}" x2="${x}" y2="${y + alto}"` +
            ` stroke="currentColor" stroke-width="${TRAZO}"/>`
        )
        break
      }

      case "trazo-esquina": {
        // Muere en la esquina y entra en diagonal suave hacia el interior.
        const [ex, ey] = puntoEsquina(el.esquina, x, y, ancho, alto)
        const haciaDerecha = el.esquina.endsWith("izquierda") ? 1 : -1
        const haciaAbajo = el.esquina.startsWith("superior") ? 1 : -1
        partes.push(
          `<line x1="${ex}" y1="${ey}"` +
            ` x2="${(ex + haciaDerecha * ancho * 0.3).toFixed(1)}"` +
            ` y2="${(ey + haciaAbajo * alto * 0.26).toFixed(1)}"` +
            ` stroke="currentColor" stroke-width="${TRAZO}" stroke-linecap="round"/>`
        )
        break
      }
    }
  }

  return partes.join("")
}

// ────────────────────────────────────────────────────────────────────────────
// Lienzos

/** Envoltura común: el lienzo, la marca y el trazo que hereda del tema. */
function lienzo(ancho: number, alto: number, contenido: string, conMarca: boolean): string {
  const usadas = Object.entries(TRAMAS)
    .filter(([nombre]) => contenido.includes(`url(#psico-${nombre})`))
    .map(([, def]) => def)
  return [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${ancho} ${alto}"`,
    ` width="${ancho}" height="${alto}" role="img" focusable="false"`,
    ` style="max-width:100%;height:auto;color:inherit">`,
    usadas.length > 0 ? `<defs>${usadas.join("")}</defs>` : "",
    contenido,
    conMarca ? marca(ancho) : "",
    `</svg>`,
  ].join("")
}

/** El interrogante de la casilla que falta, centrado en el hueco. */
function interrogante(x: number, y: number, ancho: number, alto: number): string {
  return (
    `<text x="${x + ancho / 2}" y="${y + alto / 2}" fill="currentColor"` +
    ` text-anchor="middle" dominant-baseline="central"` +
    ` font-size="${Math.round(Math.min(ancho, alto) * 0.5)}" font-weight="700"` +
    ` font-family="Archivo, system-ui, sans-serif">?</text>`
  )
}

/**
 * La serie del enunciado: las casillas en línea dentro de un solo contorno.
 *
 * La incógnita se dibuja como el interrogante del original. Podría ser un
 * hueco vacío, pero el interrogante es lo que el candidato ha visto en todos
 * los cuadernillos y lo que va a ver en la prueba.
 */
function svgSerie(figura: FiguraSerie): string {
  const n = figura.celdas.length
  const ancho = CELDA * n + MARCO
  // El lienzo crece por arriba lo que ocupa la marca, en vez de encogerle
  // sitio al dibujo.
  const desplazamientoY = MARCA_RESERVA
  const alto = CELDA + MARCO + desplazamientoY

  const partes: string[] = [`<g transform="translate(0 ${desplazamientoY})">`]

  partes.push(
    `<rect x="${MARCO / 2}" y="${MARCO / 2}" width="${CELDA * n}" height="${CELDA}"` +
      ` fill="none" stroke="currentColor" stroke-width="${MARCO}"/>`
  )

  const margen = (CELDA - REJILLA) / 2
  figura.celdas.forEach((casilla, i) => {
    const x = MARCO / 2 + CELDA * i
    if (i > 0) {
      partes.push(
        `<line x1="${x}" y1="${MARCO / 2}" x2="${x}" y2="${MARCO / 2 + CELDA}"` +
          ` stroke="currentColor" stroke-width="${MARCO}"/>`
      )
    }
    if (esIncognita(casilla)) {
      partes.push(interrogante(x, MARCO / 2, CELDA, CELDA))
    } else {
      partes.push(dibujarCelda(casilla, x + margen, MARCO / 2 + margen, REJILLA, REJILLA))
    }
  })

  partes.push(`</g>`)
  return lienzo(ancho, alto, partes.join(""), true)
}

// Medidas de la matriz del A1: la casilla es apaisada, como en el cuadernillo.
const MATRIZ_ANCHO = 132
const MATRIZ_ALTO = 96
const MATRIZ_HUECO = 18

/**
 * La matriz de tres por tres, con sus casillas sueltas.
 *
 * A diferencia de la serie, aquí cada casilla lleva su propio recuadro y entre
 * ellas hay aire: es lo que deja leer la matriz por filas y por columnas, que
 * es como se resuelve.
 */
function svgMatriz(figura: FiguraMatriz): string {
  const paso = { x: MATRIZ_ANCHO + MATRIZ_HUECO, y: MATRIZ_ALTO + MATRIZ_HUECO }
  const ancho = MATRIZ_ANCHO * 3 + MATRIZ_HUECO * 2 + TRAZO
  const desplazamientoY = MARCA_RESERVA
  const alto = MATRIZ_ALTO * 3 + MATRIZ_HUECO * 2 + TRAZO + desplazamientoY

  const partes: string[] = [`<g transform="translate(${TRAZO / 2} ${desplazamientoY + TRAZO / 2})">`]

  figura.celdas.forEach((casilla, i) => {
    const x = (i % 3) * paso.x
    const y = Math.floor(i / 3) * paso.y
    if (esIncognita(casilla)) {
      partes.push(
        `<rect x="${x}" y="${y}" width="${MATRIZ_ANCHO}" height="${MATRIZ_ALTO}"` +
          ` fill="none" stroke="currentColor" stroke-width="${TRAZO}"/>`,
        interrogante(x, y, MATRIZ_ANCHO, MATRIZ_ALTO)
      )
    } else {
      partes.push(dibujarCelda(casilla, x, y, MATRIZ_ANCHO, MATRIZ_ALTO))
    }
  })

  partes.push(`</g>`)
  return lienzo(ancho, alto, partes.join(""), true)
}

/** El enunciado de la figura, sea la serie del A2 o la matriz del A1. */
export function svgEnunciado(figura: Figura): string {
  return figura.tipo === "serie-lineal" ? svgSerie(figura) : svgMatriz(figura)
}

/**
 * Una alternativa, en su propio lienzo y por tanto en su propio botón.
 *
 * Se dibuja con la misma geometría que las casillas del enunciado —la figura
 * manda las proporciones— porque comparar una alternativa con la serie es todo
 * el ejercicio: si la alternativa saliera más ancha o más estrecha, el
 * ejercicio cambiaría.
 *
 * Sin marca: la marca identifica el ejercicio, y repetirla en cada alternativa
 * la convertiría en ruido justo al lado de lo que hay que comparar.
 */
export function svgOpcion(figura: Figura, indice: number): string {
  const celda = figura.opciones[indice]
  if (figura.tipo === "matriz-3x3") {
    const ancho = MATRIZ_ANCHO + TRAZO
    const alto = MATRIZ_ALTO + TRAZO
    return lienzo(
      ancho,
      alto,
      `<g transform="translate(${TRAZO / 2} ${TRAZO / 2})">` +
        dibujarCelda(celda, 0, 0, MATRIZ_ANCHO, MATRIZ_ALTO) +
        `</g>`,
      false
    )
  }
  const margen = (OPCION - REJILLA) / 2
  return lienzo(
    OPCION,
    OPCION,
    dibujarCelda(celda, margen, margen, REJILLA, REJILLA),
    false
  )
}

// ────────────────────────────────────────────────────────────────────────────
// Lectura en voz alta
//
// La figura dibujada tiene que decir lo mismo que decía el `imagenAlt` del
// recorte, y ahora puede decirlo sola: la descripción está en los atributos.

const NOMBRE_CUADRANTE: Record<Cuadrante, string> = {
  0: "arriba a la izquierda",
  1: "arriba a la derecha",
  2: "abajo a la izquierda",
  3: "abajo a la derecha",
}

const NOMBRE_ESQUINA: Record<Esquina, string> = {
  "inferior-izquierda": "la esquina inferior izquierda",
  "inferior-derecha": "la esquina inferior derecha",
  "superior-izquierda": "la esquina superior izquierda",
  "superior-derecha": "la esquina superior derecha",
}

export function describirCelda(celda: Celda): string {
  if (celda.elementos.length === 0) return "casilla vacía"
  return celda.elementos
    .map((el) => {
      switch (el.tipo) {
        case "flecha":
          return `flecha hacia ${el.sentido} ${NOMBRE_CUADRANTE[el.cuadrante]}`
        case "triangulo":
          return `triángulo con el vértice ${el.apice}`
        case "mastil":
          return "segmento vertical desde el vértice"
        case "trazo-esquina":
          return `trazo corto en ${NOMBRE_ESQUINA[el.esquina]}`
        case "rombo":
          return "rombo inscrito"
        case "radio":
          return `brazo desde el centro hacia ${el.hacia}`
        case "diagonales":
          return "las dos diagonales del rectángulo"
        case "cuerda":
          return `cuerda del rombo hacia ${el.hacia}`
        case "silueta-con-simbolo":
          return `contorno de ${el.contorno} con ${el.simbolo} ${el.simboloRelleno} y pie de ${el.pie}`
        case "mastil-figura":
          return (
            `mástil con un semicírculo ${el.relleno} a la ${el.semicirculo} arriba, ` +
            `un círculo ${el.circuloRelleno} a la ${el.circulo} abajo y el gancho al otro lado`
          )
        case "mitad-rellena":
          return `rectángulo partido en ${el.corte}, con la mitad de ${el.lado} en ${el.relleno}`
        case "pieza-punta":
          return `pieza con la punta hacia ${el.mira}, con relleno ${el.relleno}`
        case "cuadro-marcado":
          return (
            `cuadrado con ${el.nudo === "circunferencia" ? "una circunferencia" : "un cuadrado negro"}` +
            ` mirando ${el.mira}${el.rabo ? ", con rabo" : ", sin rabo"}` +
            (el.marcadores === "ninguno"
              ? " y sin marcadores"
              : ` y dos marcadores de tipo ${el.marcadores} en el lado opuesto`)
          )
      }
    })
    .join("; ")
}

export function describirFigura(figura: Figura): string {
  const casillas = figura.celdas.map((c, i) =>
    esIncognita(c) ? `casilla ${i + 1}: la que falta` : `casilla ${i + 1}: ${describirCelda(c)}`
  )
  const cabecera =
    figura.tipo === "matriz-3x3"
      ? "Matriz de tres por tres"
      : `Serie de ${figura.celdas.length} casillas`
  return `${cabecera}. ${casillas.join(". ")}.`
}
