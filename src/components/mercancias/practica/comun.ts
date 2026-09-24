export type Mode = "etiquetas" | "clasifica" | "escenarios" | "entrevista"

export const ACENTO = "var(--av-dg-700)"

/**
 * El verde de «correcto» cuando lleva texto blanco encima. El --av-green-400 a
 * secas es claro: el blanco sobre él da 2,1:1. Mezclado con negro conserva el
 * matiz (sigue leyéndose como el verde del acierto) y sube a 5,2:1.
 */
export const VERDE_CON_TEXTO = "color-mix(in oklab, var(--av-green-400) 70%, black)"
