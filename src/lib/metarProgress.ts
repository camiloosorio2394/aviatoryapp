/**
 * Progreso de Meteorología: el progreso de módulo común (progresoModulo) con el
 * respaldo local de METAR y su RPC metar_mark_progress.
 */

import { readMetarProgress, writeMetarProgress } from "@/lib/metar"
import { conMarca, crearProgresoModulo, type ProgresoRemoto } from "@/lib/progresoModulo"

export type MetarRemoteProgress = ProgresoRemoto

function leerLocal(): ProgresoRemoto {
  const local = readMetarProgress()
  return { lessonScreens: local.lessonScreens, practiceDone: local.practiceDone }
}

const progreso = crearProgresoModulo({
  tabla: "user_metar_progress",
  rpc: "metar_mark_progress",
  leerLocal,
  anotarLocal: (marca) => {
    const antes = leerLocal()
    const despues = conMarca(antes, marca)
    if (despues.lessonScreens !== antes.lessonScreens || despues.practiceDone !== antes.practiceDone) {
      writeMetarProgress(despues)
    }
  },
})

/** El progreso guardado en la base (sin lo local); null si la consulta falla. */
export const fetchMetarProgress = progreso.leer

/** Marca una sección leída o un informe resuelto, local y en la base. */
export const markMetarProgress = progreso.marcar

/** Sube lo avanzado sin sesión. Recibe lo que devolvió fetchMetarProgress. */
export const pushPendingMetarProgress = progreso.subirPendiente
