/**
 * Claves de las preferencias de este equipo: cómo se ve la app aquí, no qué
 * estudió quien la usa. Sobreviven cuando otro piloto inicia sesión en el mismo
 * navegador (ver datosLocales.ts).
 *
 * index.html repite CLAVE_TEMA en su script inline, que aplica el tema antes del
 * primer pintado y no puede importar módulos.
 */

export const CLAVE_TEMA = "aviatory.theme"
export const CLAVE_BARRA_OCULTA = "aviatory.sidebarHidden"
export const CLAVE_BARRA_FIJADA = "aviatory.sidebarPinned"

export const PREFERENCIAS_DEL_EQUIPO: readonly string[] = [
  CLAVE_TEMA,
  CLAVE_BARRA_OCULTA,
  CLAVE_BARRA_FIJADA,
]
