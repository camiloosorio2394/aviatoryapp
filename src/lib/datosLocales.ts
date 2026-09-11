/**
 * De quién son los datos que la app guarda en este navegador.
 *
 * El progreso local existe para estudiar sin red y sin cuenta: lo avanzado sin
 * sesión se sube a la base al iniciar sesión (notamProgress, metarProgress,
 * mercanciasProgress). Por eso no se borra al cerrar sesión. Pero en un equipo
 * compartido, el siguiente piloto heredaría ese avance y la app lo subiría a su
 * cuenta.
 *
 * La regla: los datos locales son del último usuario que inició sesión en este
 * navegador. Si inicia sesión otro, se borran antes de que nada los lea o los
 * suba. Lo avanzado en un navegador que nunca tuvo sesión no tiene dueño, y lo
 * reclama el primero que entra, que es quien lo avanzó.
 *
 * Se conservan las preferencias del equipo (preferenciasEquipo.ts). La sesión
 * de Supabase (claves `sb-*`) la administra supabase-js y aquí no se toca.
 */

import { PREFERENCIAS_DEL_EQUIPO } from "@/lib/preferenciasEquipo"

export const CLAVE_DUENO = "aviatory.datosLocales.dueno"

/** Todo lo que la app guarda en el navegador empieza por uno de estos. */
const PREFIJOS_DE_LA_APP = ["aviatory.", "av_"] as const

const QUE_SE_CONSERVA: ReadonlySet<string> = new Set([...PREFERENCIAS_DEL_EQUIPO, CLAVE_DUENO])

function esDelPiloto(clave: string): boolean {
  return PREFIJOS_DE_LA_APP.some((prefijo) => clave.startsWith(prefijo)) && !QUE_SE_CONSERVA.has(clave)
}

/** Borra de los almacenes todo lo que la app guardó de quien estudia. */
export function borrarDatosDelPiloto(almacenes: readonly Storage[] = [localStorage, sessionStorage]): void {
  for (const almacen of almacenes) {
    // Primero se juntan las claves: borrar mientras se recorre corre los índices.
    const claves: string[] = []
    for (let i = 0; i < almacen.length; i++) {
      const clave = almacen.key(i)
      if (clave !== null && esDelPiloto(clave)) claves.push(clave)
    }
    for (const clave of claves) almacen.removeItem(clave)
  }
}

/**
 * Deja los datos locales a nombre de `userId`. Si eran de otro usuario, los
 * borra antes. Devuelve true si borró.
 */
export function reclamarDatosLocales(userId: string): boolean {
  try {
    const dueno = localStorage.getItem(CLAVE_DUENO)
    if (dueno === userId) return false
    const eranDeOtro = dueno !== null
    if (eranDeOtro) borrarDatosDelPiloto()
    localStorage.setItem(CLAVE_DUENO, userId)
    return eranDeOtro
  } catch {
    // Almacenamiento bloqueado (ventana privada estricta): no hay datos locales
    // que proteger, porque tampoco se pudieron guardar.
    return false
  }
}
