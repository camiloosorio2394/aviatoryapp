/**
 * Lo que comparten las familias de bloques de la lección-documento: el acento
 * de las piezas y la paleta del desglose de campos.
 */

import { LINEA_Q_COLOR } from "@/lib/lineaQ"

/**
 * Colores del desglose. Cada trozo del código toma uno y su entrada en la
 * leyenda toma el mismo: es lo que reemplaza a las líneas del diagrama ASCII,
 * que en móvil se rompen.
 */
const BREAKDOWN_COLORS = [
  LINEA_Q_COLOR.fir,
  LINEA_Q_COLOR.codigo,
  LINEA_Q_COLOR.transito,
  LINEA_Q_COLOR.objetivo,
  LINEA_Q_COLOR.alcance,
  LINEA_Q_COLOR.limites,
  LINEA_Q_COLOR.area,
]

export function breakdownColor(i: number): string {
  return BREAKDOWN_COLORS[i % BREAKDOWN_COLORS.length]
}

/** El acento de las piezas que se pulsan. Dentro del lector cae al navy. */
export const ACENTO = "var(--av-blue-500)"
