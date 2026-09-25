/** Estados de una opción que se toca (lo usa `Opcion` en piezas.tsx). */

export type EstadoOpcion = "neutra" | "elegida" | "correcta" | "error" | "faltó"

/** Estado de una opción según lo marcado y lo correcto, antes y después de corregir. */
export function estadoOpcion(marcada: boolean, correcta: boolean, corregido: boolean, multiple: boolean): EstadoOpcion {
  if (!corregido) return marcada ? "elegida" : "neutra"
  if (correcta && marcada) return "correcta"
  if (correcta) return multiple ? "faltó" : "correcta"
  return marcada ? "error" : "neutra"
}
