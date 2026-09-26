/**
 * Cómo se ve la llama según los días de racha: cinco escalones más el
 * apagado. Los cortes son los de la lámina de Camilo (26 de septiembre de
 * 2026): 1 a 2 días llama pequeña, 3 a 6 definida, 7 a 13 dorada, 14 a 29
 * intensa y desde 30 la versión especial.
 */
export type NivelDeRacha = 0 | 1 | 2 | 3 | 4 | 5

export function nivelDeRacha(dias: number): NivelDeRacha {
  if (!Number.isFinite(dias) || dias <= 0) return 0
  if (dias < 3) return 1
  if (dias < 7) return 2
  if (dias < 14) return 3
  if (dias < 30) return 4
  return 5
}

export const NOMBRE_DEL_NIVEL: Record<NivelDeRacha, string> = {
  0: "Sin racha",
  1: "Llama pequeña",
  2: "Llama definida",
  3: "Llama dorada",
  4: "Llama intensa",
  5: "Llama de treinta días",
}
