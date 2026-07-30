/**
 * Mapa único de color de tarjeta/tile.
 *
 * Antes cada pantalla tenía su propio TILE_COLOR con hex de modo claro
 * (#0E7490, #7C3AED, #B45309, #047857), así que el mismo "cyan" salía distinto
 * en Biblioteca, Dashboard, Entrevistas y Psicotécnicas, y en modo oscuro
 * quedaba ilegible. Todo pasa por los tokens --av-*, que ya tienen su par
 * claro/oscuro definido en index.css.
 */

export type TileColorKey = "cyan" | "blue" | "violet" | "amber" | "green" | "red"

export const TILE_COLOR: Record<TileColorKey, string> = {
  cyan: "var(--av-cyan-400)",
  blue: "var(--av-blue-500)",
  violet: "var(--av-violet-400)",
  amber: "var(--av-amber-400)",
  green: "var(--av-green-400)",
  red: "var(--av-red-400)",
}

/** Fondo tenue del mismo color, para el cuadrito que envuelve un icono. */
export function tileTint(key: TileColorKey, pct = 14): string {
  return `color-mix(in oklab, ${TILE_COLOR[key]} ${pct}%, transparent)`
}

/** Borde tenue del mismo color. */
export function tileBorder(key: TileColorKey, pct = 28): string {
  return `color-mix(in oklab, ${TILE_COLOR[key]} ${pct}%, transparent)`
}
