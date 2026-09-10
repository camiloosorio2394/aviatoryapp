/**
 * Las figuras aprobadas a ojo, y contra qué.
 *
 * Una figura dibujada no está hecha cuando se ve bien: está hecha cuando tres
 * fuentes independientes dicen la misma respuesta —la clave impresa del
 * cuadernillo, el solucionador deduciéndola desde los atributos, y el ojo sobre
 * el HTML de revisión—. Si dos coinciden y una no, se para y se mira. No se
 * elige por mayoría.
 *
 * De las tres, la del ojo era la única que no dejaba rastro:
 * `revision-figuras.html` se genera y está en `.gitignore`, así que dentro de un
 * mes nadie podría saber qué se miró y qué se dio por bueno de paso. Este
 * archivo es ese rastro, y va versionado a propósito.
 *
 * Entrar aquí no es un trámite. Una figura solo se apunta cuando alguien la ha
 * mirado de verdad al lado de su recorte y puede decir qué comprobó. Si no, se
 * queda fuera y `verificar-figuras.mjs` **falla**, que es lo que tiene que pasar.
 */

export interface AprobacionFigura {
  /** Contra qué se miró. El recorte original, casi siempre. */
  contra: string
  /** Quién la miró. Con nombre: una aprobación anónima no es una aprobación. */
  quien: string
  /** Cuándo, en ISO corto. */
  fecha: string
  /** Qué se comprobó exactamente, casilla por casilla si hace falta. */
  nota: string
  /**
   * Si la aprobación todavía espera que la refrende una persona.
   *
   * Existe por un motivo incómodo: quien dibuja una figura no es una fuente
   * independiente de sí mismo. Cuando el que aprueba es el mismo que transcribió,
   * la tercera fuente está a medias, y eso hay que poder verlo desde fuera en
   * vez de que quede escondido en la palabra «aprobada».
   */
  faltaRefrendo?: boolean
}

export const FIGURAS_APROBADAS: Record<string, AprobacionFigura> = {
  "AB-A1-02": {
    contra: "public/psicotecnicas/abstracto/AB-A1-02.webp",
    quien: "Claude Opus 5, en la sesión del 9 de septiembre de 2026",
    fecha: "2026-09-09",
    nota:
      "El solucionador no la explica y no se le enseñó la regla a propósito: la suya —los " +
      "cuatro brazos del rombo se añaden de uno en uno hasta tenerlos todos y después se " +
      "quitan igual, y el conjunto es siempre un tramo seguido— vale para esta lámina y para " +
      "ninguna otra del banco. Tallarle esa regla sería fabricar un atributo que no se puede " +
      "seguir por filas ni por columnas.\n\n" +
      "Lo que sí se comprobó, casilla por casilla contra el recorte: el rombo es el mismo en " +
      "las nueve; los brazos van N / N+E / N+E+S / los cuatro / E+S+O / S+O / S / S+O, y el " +
      "conteo dibuja la ida y la vuelta 1·2·3·4·3·2·1·2, así que a la que falta le tocan " +
      "tres. De las cinco alternativas, la D es la única con tres brazos —la A tiene dos, la " +
      "B cuatro, la C no lleva rombo sino las diagonales del rectángulo, y la E lleva dos más " +
      "una cuerda—. La D es también la que dice la clave impresa del cuadernillo.",
    faltaRefrendo: true,
  },
}
