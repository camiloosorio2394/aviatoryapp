/**
 * Helpers de color para la hoja de documento (.doc-sheet).
 *
 * `accentText` de notam.ts mezcla con --foreground, que en modo oscuro es casi
 * blanco: sobre el papel quedaría ilegible. Aquí se mezcla con --doc-fg, que
 * siempre es oscuro, así el acento se lee igual en claro y en oscuro.
 *
 * Nacieron dentro de NotamLesson.tsx; viven aparte para que cualquier lección
 * en formato documento (NOTAM, METAR, las que vengan) use exactamente la misma
 * receta.
 */

export function docAccent(token: string, mix = 45): string {
  return `color-mix(in oklab, ${token} ${mix}%, var(--doc-fg))`
}

/** Fondo tenue de un token sobre el papel, sin transparencias que ensucien. */
export function docTint(token: string, mix = 8): string {
  return `color-mix(in oklab, ${token} ${mix}%, var(--doc-bg))`
}
