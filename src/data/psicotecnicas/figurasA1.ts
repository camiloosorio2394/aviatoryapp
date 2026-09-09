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

import type { Celda, Elemento, FiguraMatriz } from "@/lib/psicotecnicasFiguras"

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
}
