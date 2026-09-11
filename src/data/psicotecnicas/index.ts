import type { CategoriaPsico, EjercicioPsico } from "@/lib/psicotecnicas"
import { ABSTRACTO } from "./abstracto"
import { ESPACIAL } from "./espacial"
import { NUMERICO } from "./numerico"
import { SERIES } from "./series"

export { EJEMPLOS_ESPACIAL, TEORIA_CUBO } from "./aprende"

/**
 * El banco completo, en un solo arreglo.
 *
 * Las series numéricas van detrás de los numéricos de opción múltiple porque
 * son muchas más: si se mezclaran de entrada, cualquier tanda «de numérico»
 * saldría casi entera de series y el piloto no vería nunca un problema de
 * porcentajes. La selección baraja igual, pero los totales que se muestran en
 * pantalla salen de aquí y conviene que digan la verdad de lo que hay.
 */
export const BANCO: EjercicioPsico[] = [...ABSTRACTO, ...ESPACIAL, ...NUMERICO, ...SERIES]

/** Cuántos ejercicios hay por familia. La pantalla no inventa cifras. */
export const TOTALES: Record<CategoriaPsico, number> = {
  abstracto: BANCO.filter((e) => e.categoria === "abstracto").length,
  espacial: BANCO.filter((e) => e.categoria === "espacial").length,
  numerico: BANCO.filter((e) => e.categoria === "numerico").length,
}

export const BANCO_TOTAL = BANCO.length

/** Las subcategorías presentes en cada familia, para el detalle del hub. */
export function subcategoriasDe(categoria: CategoriaPsico): string[] {
  return [
    ...new Set(BANCO.filter((e) => e.categoria === categoria).map((e) => e.subcategoria)),
  ].sort((a, b) => a.localeCompare(b, "es"))
}
