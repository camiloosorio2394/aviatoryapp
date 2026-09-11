import type { CategoriaPsico, FiltroPsico, NivelPsico } from "@/lib/psicotecnicas"

/**
 * Cuántos ejercicios hay en el banco de psicotécnicas, por familia y nivel.
 *
 * Los ejercicios los sirve el servidor y la app ya no descarga el banco, pero
 * las pantallas necesitan decir cuántos hay (el hub, el filtro de la tanda).
 * Estas cifras las vigila src/lib/psicotecnicasBanco.test.ts contra el banco:
 * si se agrega o se quita un ejercicio, la prueba falla y dice qué poner.
 */
export const PSICO_DISPONIBLES: Record<CategoriaPsico, Record<NivelPsico, number>> = {
  abstracto: { basico: 3, intermedio: 9, avanzado: 8 },
  espacial: { basico: 2, intermedio: 11, avanzado: 5 },
  numerico: { basico: 27, intermedio: 98, avanzado: 75 },
}

const CATEGORIAS = Object.keys(PSICO_DISPONIBLES) as CategoriaPsico[]
const NIVELES: NivelPsico[] = ["basico", "intermedio", "avanzado"]

/** Cuántos hay con un filtro de categoría y nivel. */
export function disponiblesPsico({ categoria, nivel }: FiltroPsico): number {
  const categorias = categoria === "todas" ? CATEGORIAS : [categoria]
  const niveles = nivel === "todos" ? NIVELES : [nivel]
  return categorias.reduce((suma, c) => suma + niveles.reduce((s, n) => s + PSICO_DISPONIBLES[c][n], 0), 0)
}

export const PSICO_TOTAL = disponiblesPsico({ categoria: "todas", nivel: "todos" })
