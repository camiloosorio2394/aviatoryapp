/**
 * Constantes de las láminas de Meteorología: la paleta y las direcciones.
 *
 * Van en un archivo aparte de los componentes porque mezclarlas con ellos rompe
 * el Fast Refresh de Vite, y ESLint lo marca.
 */

// ── Paleta del módulo, la misma de `.lector-notam.lector-mt` ─────────────────
export const PAPEL = "#FBFAF8"
export const TINTA = "#16191D"
export const SECUNDARIO = "#4A5460"
export const LINEA = "#C9C3B7"
export const ACENTO = "#1A4A52"
export const ACENTO_CLARO = "#2E7C89"
export const RESALTADO = "#E4EFF1"

export const MONO = '"JetBrains Mono Variable", "JetBrains Mono", ui-monospace, "SF Mono", monospace'

/**
 * Direcciones, en radianes. El eje Y del SVG va hacia abajo, así que ABAJO es
 * positivo y ARRIBA negativo. Tenerlas con nombre evita el error de signo, que
 * es justo el que invierte una corriente sin que se note.
 */
export const DERECHA = 0
export const ABAJO = Math.PI / 2
export const IZQUIERDA = Math.PI
export const ARRIBA = -Math.PI / 2
