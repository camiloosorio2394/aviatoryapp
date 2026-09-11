/**
 * Qué se le pide a una contraseña, en un solo sitio.
 *
 * Vivía dentro de `PasswordRules.tsx`, junto al componente que las pinta. Están
 * separadas porque son dos cosas distintas: esto es la regla y aquello es cómo
 * se enseña. Mezclarlas en un archivo, además, rompía Fast Refresh: un archivo
 * que exporta un componente y también funciones sueltas no se puede recargar en
 * caliente sin perder el estado de la pantalla.
 *
 * Hay dos pantallas donde se elige contraseña (crear la cuenta y recuperarla) y
 * las dos tienen que pedir lo mismo. Con una copia en cada una, el día que se
 * endurezca la regla en una, la otra seguiría aceptando la contraseña vieja sin
 * que nadie lo note.
 */

/** Qué cumple y qué no cumple una contraseña. */
export function comprobarClave(clave: string) {
  return { length: clave.length >= 8, digit: /\d/.test(clave) }
}

/** Si la contraseña vale. */
export function claveValida(clave: string) {
  const { length, digit } = comprobarClave(clave)
  return length && digit
}
