/**
 * Validaciones del perfil de piloto que la base también exige.
 *
 * Las restricciones de pilot_state (migración 20260911143419) son la regla; esto
 * las repite en el formulario para decirle al piloto qué corregir antes de
 * enviar, en vez de mostrarle el error de la base.
 */

/** Tope de horas totales que acepta pilot_state. */
export const HORAS_TOTALES_MAXIMAS = 50_000

function aNumero(valor: string): number | null {
  const limpio = valor.trim()
  return limpio === "" ? null : Number(limpio)
}

/**
 * Revisa las horas totales y PIC tal como vienen de los inputs.
 * Devuelve el mensaje para el piloto, o null si están bien.
 */
export function validarHorasDeVuelo(total: string, pic: string): string | null {
  const horasTotales = aNumero(total)
  const horasPic = aNumero(pic)

  if (horasTotales !== null && (!Number.isFinite(horasTotales) || horasTotales < 0 || horasTotales > HORAS_TOTALES_MAXIMAS)) {
    return `Las horas totales van de 0 a ${HORAS_TOTALES_MAXIMAS.toLocaleString("es-CO")}.`
  }
  if (horasPic !== null && (!Number.isFinite(horasPic) || horasPic < 0)) {
    return "Las horas como PIC no pueden ser negativas."
  }
  if (horasPic !== null && horasTotales !== null && horasPic > horasTotales) {
    return "Las horas como PIC no pueden ser más que las horas totales."
  }
  return null
}
