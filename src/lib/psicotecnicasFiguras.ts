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
  return [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${ancho} ${alto}"`,
    ` width="${ancho}" height="${alto}" role="img" focusable="false"`,
    ` style="max-width:100%;height:auto;color:inherit">`,
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
