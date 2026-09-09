/**
 * Las matrices del conjunto A1, dibujadas por nosotros.
 *
 * Sustituyen a los recortes de `public/psicotecnicas/abstracto/AB-A1-*.webp`,
 * que llevan impresos el logotipo de Facebook y el usuario `/eshingre` en
 * mitad de la pregunta —entre la matriz y las alternativas— y que además
 * cortan las letras de las opciones: en las veinte, la C se ve solo por el
 * arco de arriba y la D queda partida. Las veinte comparten un encuadre de
 * 1123 × 821, así que es el recorte y no el original.
 *
 * Aquí cada casilla es una lista de atributos. Eso quita las marcas ajenas,
 * pero sobre todo deja **comprobable** la respuesta: la regla de la matriz se
 * puede buscar sobre los atributos y contrastar con la clave del cuadernillo,
 * en vez de darla por buena porque alguien la leyó bien. Lo hace
 * `scripts/psicotecnicas/verificar-figuras.mjs`.
 *
 * Al transcribir no se decide nada: si el dibujo parece contradecir la
 * respuesta del banco, el ejercicio se marca y se para. Cambiar una respuesta
 * es mirar la fuente, no dibujar.
 */

import type { Celda, Elemento, FiguraMatriz, Relleno, Sentido } from "@/lib/psicotecnicasFiguras"

// ────────────────────────────────────────────────────────────────────────────
// Atajos de lectura
//
// Una matriz son nueve casillas más cinco alternativas. Si cada casilla no
// cabe en una línea, la transcripción no se puede revisar de un vistazo, y
// revisarla de un vistazo es justo lo que hay que poder hacer.

const TRIANGULO: Elemento = { tipo: "triangulo", apice: "arriba" }
const MASTIL: Elemento = { tipo: "mastil", apice: "arriba" }
const IZQ: Elemento = { tipo: "trazo-esquina", esquina: "inferior-izquierda" }
const DER: Elemento = { tipo: "trazo-esquina", esquina: "inferior-derecha" }

/** Casilla con el triángulo de siempre y los atributos que la distinguen. */
const t = (...elementos: Elemento[]): Celda => ({
  marco: true,
  elementos: [TRIANGULO, ...elementos],
})

/** Casilla con un triángulo vuelto hacia otro lado. */
const vuelto = (apice: "abajo" | "izquierda" | "derecha", ...elementos: Elemento[]): Celda => ({
  marco: true,
  elementos: [{ tipo: "triangulo", apice }, ...elementos],
})

/** Casilla de rombo con los brazos que la distinguen. */
const r = (...elementos: Elemento[]): Celda => ({
  marco: true,
  elementos: [{ tipo: "rombo" }, ...elementos],
})

const N: Elemento = { tipo: "radio", hacia: "arriba" }
const S: Elemento = { tipo: "radio", hacia: "abajo" }
const E: Elemento = { tipo: "radio", hacia: "derecha" }
const O: Elemento = { tipo: "radio", hacia: "izquierda" }

/**
 * Casilla del cuadro con nudo y marcadores.
 *
 * `mira` y `marcadores` son los dos atributos que la matriz hace variar; el
 * rabo y el nudo casi siempre son los de siempre, pero se declaran porque hay
 * alternativas que se distinguen **solo** por ellos: la C y la E del ejercicio
 * 3 son la misma casilla salvo el rabo.
 */
const cm = (
  mira: Sentido,
  marcadores: "cuadrado" | "cuadrado-hueco" | "circulo" | "ninguno",
  extras: { rabo?: boolean; nudo?: "circunferencia" | "cuadrado-negro" } = {}
): Celda => ({
  marco: true,
  elementos: [
    {
      tipo: "cuadro-marcado",
      mira,
      nudo: extras.nudo ?? "circunferencia",
      rabo: extras.rabo ?? marcadores !== "ninguno",
      marcadores,
    },
  ],
})

/** Casilla con la pieza de punta: hacia dónde mira y con qué relleno. */
const pp = (mira: Sentido, relleno: Relleno): Celda => ({
  marco: true,
  elementos: [{ tipo: "pieza-punta", mira, relleno }],
})

/**
 * Casilla partida con una mitad rellena.
 *
 * El lado se puede omitir: por defecto es el canónico de cada corte —la
 * izquierda, la de arriba— que es el que usa toda la matriz. Las alternativas
 * sí lo dicen, porque varias se distinguen solo en eso.
 */
const mr = (
  corte: "vertical" | "horizontal" | "diagonal",
  relleno: Relleno,
  lado: Sentido = corte === "vertical" ? "izquierda" : "arriba"
): Celda => ({ marco: true, elementos: [{ tipo: "mitad-rellena", corte, lado, relleno }] })

/** Casilla del mástil con semicírculo, círculo y gancho. */
const mg = (
  semicirculo: "izquierda" | "derecha",
  relleno: Relleno,
  circulo: "izquierda" | "derecha",
  circuloRelleno: Relleno = "blanco"
): Celda => ({
  marco: true,
  elementos: [{ tipo: "mastil-figura", semicirculo, relleno, circulo, circuloRelleno }],
})

/** Casilla de silueta: contorno, símbolo apoyado en la base y pie. */
const sil = (
  contorno: "triangulo" | "rectangulo" | "casa",
  simbolo: "barra" | "triangulito" | "cruz",
  pie: "trazo" | "patas" | "circulito",
  simboloRelleno: Relleno = "negro"
): Celda => ({
  marco: true,
  elementos: [{ tipo: "silueta-con-simbolo", contorno, simbolo, simboloRelleno, pie }],
})

/** Casilla del aspa con círculo y banda. */
const ac = (
  circulo: "arriba" | "centro" | "abajo",
  banda: "arriba" | "abajo" | "ninguna"
): Celda => ({ marco: true, elementos: [{ tipo: "aspa-circulo", circulo, banda }] })

const HUECO = { incognita: true } as const

// ────────────────────────────────────────────────────────────────────────────

export const FIGURAS_A1: Record<string, FiguraMatriz> = {
  /**
   * Dos atributos sueltos sobre un triángulo que no cambia: el mástil que baja
   * del vértice y los trazos cortos de las esquinas de la base. Cada fila trae
   * uno, el otro, y los dos juntos.
   */
  "AB-A1-01": {
    tipo: "matriz-3x3",
    celdas: [
      t(MASTIL), t(DER), t(MASTIL, DER),
      t(DER), t(IZQ), t(IZQ, DER),
      t(IZQ), t(MASTIL), HUECO,
    ],
    opciones: [
      vuelto("derecha", IZQ),
      t(MASTIL, IZQ, DER),
      t(MASTIL, IZQ),
      t(DER),
      vuelto("abajo", { tipo: "mastil", apice: "abajo" }, IZQ, DER),
    ],
  },

  /**
   * El rombo no se mueve; lo que se mueve son sus cuatro brazos, que se van
   * añadiendo de uno en uno hasta tenerlos los cuatro y después se quitan
   * igual. El conteo de brazos por casilla dibuja la ida y la vuelta:
   * 1 · 2 · 3 · 4 · 3 · 2 · 1 · 2 · y la que falta lleva tres.
   *
   * El solucionador no cubre esta regla —no es un giro ni una combinación de
   * las dos primeras casillas—, así que aquí no hay comprobación automática y
   * la respuesta es la de la clave del cuadernillo: la D.
   */
  "AB-A1-02": {
    tipo: "matriz-3x3",
    celdas: [
      r(N), r(N, E), r(N, E, S),
      r(N, E, S, O), r(E, S, O), r(S, O),
      r(S), r(S, O), HUECO,
    ],
    opciones: [
      r(N, S),
      r(N, E, S, O),
      { marco: true, elementos: [{ tipo: "diagonales" }] },
      r(N, S, O),
      r(N, S, { tipo: "cuerda", hacia: "derecha" }),
    ],
  },

  /**
   * Dos atributos que corren a la vez sobre el mismo cuadro: hacia dónde mira
   * la circunferencia —constante en cada fila: arriba, derecha, abajo— y qué
   * marcadores cuelgan del lado opuesto, que se reparten como un sudoku: los
   * tres valores (cuadrado, círculo, ninguno) aparecen una vez por fila y una
   * por columna. La casilla que falta mira abajo y le tocan los círculos.
   *
   * Ojo con las alternativas: la C es la misma casilla que la E sin el rabo, y
   * la D cambia la circunferencia por un cuadrado negro. Por eso el rabo y el
   * nudo se declaran, aunque en la matriz no varíen.
   */
  "AB-A1-03": {
    tipo: "matriz-3x3",
    celdas: [
      cm("arriba", "cuadrado"), cm("arriba", "circulo"), cm("arriba", "ninguno"),
      cm("derecha", "circulo"), cm("derecha", "ninguno"), cm("derecha", "cuadrado"),
      cm("abajo", "ninguno"), cm("abajo", "cuadrado"), HUECO,
    ],
    opciones: [
      cm("abajo", "cuadrado-hueco"),
      cm("arriba", "circulo"),
      cm("abajo", "circulo", { rabo: false }),
      cm("arriba", "circulo", { nudo: "cuadrado-negro" }),
      cm("abajo", "circulo"),
    ],
  },

  /**
   * Dos atributos que van pegados el uno al otro: hacia dónde apunta la pieza
   * y con qué está rellena. Arriba va siempre con rayado, abajo con punteado y
   * derecha con blanco, y cada fila es la anterior corrida un puesto. A la
   * casilla que falta le toca abajo, y con abajo viene el punteado.
   *
   * El cuadernillo dibuja algunas casillas con la barra en el eje de la punta
   * y otras perpendicular; aquí van todas perpendiculares, como las cinco
   * alternativas, que es contra lo que el candidato compara.
   */
  "AB-A1-04": {
    tipo: "matriz-3x3",
    celdas: [
      pp("arriba", "rayado-diagonal"), pp("abajo", "punteado"), pp("derecha", "blanco"),
      pp("abajo", "punteado"), pp("derecha", "blanco"), pp("arriba", "rayado-diagonal"),
      pp("derecha", "blanco"), pp("arriba", "rayado-diagonal"), HUECO,
    ],
    opciones: [
      pp("abajo", "punteado"),
      pp("derecha", "punteado"),
      pp("abajo", "rayado-diagonal"),
      pp("abajo", "blanco"),
      pp("arriba", "punteado"),
    ],
  },

  /**
   * Las nueve casillas agotan las combinaciones de dos atributos: por dónde se
   * parte el rectángulo —vertical, horizontal o diagonal— y con qué se rellena
   * la mitad —negro, rayado o blanco—. Cada fila y cada columna traen los tres
   * cortes y los tres rellenos sin repetir, así que la que falta es el corte
   * horizontal en negro.
   *
   * Las alternativas juegan con la mitad que se rellena: la A es la B con el
   * negro abajo, y la C lo pone a la derecha.
   */
  "AB-A1-05": {
    tipo: "matriz-3x3",
    celdas: [
      mr("vertical", "negro"), mr("horizontal", "rayado-vertical"), mr("diagonal", "blanco"),
      mr("horizontal", "blanco"), mr("diagonal", "negro"), mr("vertical", "rayado-vertical"),
      mr("diagonal", "rayado-vertical"), mr("vertical", "blanco"), HUECO,
    ],
    opciones: [
      mr("horizontal", "negro", "abajo"),
      mr("horizontal", "negro"),
      mr("vertical", "negro", "derecha"),
      mr("horizontal", "rayado-vertical"),
      mr("horizontal", "rayado-vertical", "abajo"),
    ],
  },

  /**
   * Tres atributos que corren en paralelo sobre el mismo mástil: el relleno
   * del semicírculo de arriba —negro, blanco, rayado—, de qué lado del mástil
   * cuelga ese semicírculo, y de qué lado queda el círculo de abajo (el gancho
   * va siempre enfrente). Los tres se reparten igual en cada fila y en cada
   * columna, y a la casilla que falta le toca el negro, a la izquierda, con el
   * círculo a la derecha.
   *
   * La D y la E llevan el círculo de abajo relleno de negro, que en la matriz
   * nunca pasa: por eso el relleno del círculo también se declara.
   */
  "AB-A1-06": {
    tipo: "matriz-3x3",
    celdas: [
      mg("derecha", "negro", "izquierda"),
      mg("izquierda", "blanco", "derecha"),
      mg("izquierda", "rayado-diagonal", "izquierda"),
      mg("izquierda", "rayado-diagonal", "derecha"),
      mg("izquierda", "negro", "izquierda"),
      mg("derecha", "blanco", "izquierda"),
      mg("izquierda", "blanco", "izquierda"),
      mg("derecha", "rayado-diagonal", "izquierda"),
      HUECO,
    ],
    opciones: [
      mg("izquierda", "rayado-diagonal", "derecha"),
      mg("derecha", "negro", "izquierda"),
      mg("izquierda", "negro", "derecha"),
      mg("izquierda", "blanco", "derecha", "negro"),
      mg("derecha", "negro", "izquierda", "negro"),
    ],
  },

  /**
   * Tres elementos que no se repiten dentro de una fila: el contorno grande
   * —triángulo, rectángulo o casa—, el símbolo apoyado en la base —barra
   * negra, triangulito o cruz— y el pie que cuelga debajo. El pie va siempre
   * con el contorno: el triángulo lleva trazo, el rectángulo patas y la casa
   * circulito. A la casilla que falta le toca el triángulo con el triangulito.
   *
   * La C cambia la barra negra por una hueca, y en nada más se distingue.
   */
  "AB-A1-07": {
    tipo: "matriz-3x3",
    celdas: [
      sil("triangulo", "barra", "trazo"),
      sil("rectangulo", "triangulito", "patas"),
      sil("casa", "cruz", "circulito"),
      sil("casa", "triangulito", "circulito"),
      sil("triangulo", "cruz", "trazo"),
      sil("rectangulo", "barra", "patas"),
      sil("rectangulo", "cruz", "patas"),
      sil("casa", "barra", "circulito"),
      HUECO,
    ],
    opciones: [
      sil("triangulo", "triangulito", "trazo"),
      sil("casa", "triangulito", "trazo"),
      sil("triangulo", "barra", "patas", "blanco"),
      sil("rectangulo", "triangulito", "trazo"),
      sil("triangulo", "triangulito", "patas"),
    ],
  },

  /**
   * El círculo sube y baja sobre el cruce del aspa, y la banda negra cae
   * siempre al borde contrario: cuando el círculo sube, la banda va abajo.
   * Con el círculo en el cruce no hay banda. Cada fila y cada columna traen las
   * tres posiciones, y a la que falta le toca arriba, con la banda abajo.
   *
   * Las alternativas separan lo que en la matriz va atado: la A y la B ponen el
   * círculo fuera del cruce sin banda, y la D lo baja dejando la banda abajo.
   */
  "AB-A1-09": {
    tipo: "matriz-3x3",
    celdas: [
      ac("centro", "ninguna"), ac("arriba", "abajo"), ac("abajo", "arriba"),
      ac("arriba", "abajo"), ac("abajo", "arriba"), ac("centro", "ninguna"),
      ac("abajo", "arriba"), ac("centro", "ninguna"), HUECO,
    ],
    opciones: [
      ac("arriba", "ninguna"),
      ac("abajo", "ninguna"),
      ac("centro", "abajo"),
      ac("abajo", "abajo"),
      ac("arriba", "abajo"),
    ],
  },
}
