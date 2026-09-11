/**
 * Progreso NOTAM: el progreso de módulo común (progresoModulo) con el respaldo
 * local de la sección NOTAM y su RPC notam_mark_progress.
 */

import { readLocalProgress, writeLocalProgress } from "@/lib/notam"
import { conMarca, crearProgresoModulo, type ProgresoRemoto } from "@/lib/progresoModulo"

export type NotamRemoteProgress = ProgresoRemoto

export const EMPTY_REMOTE_PROGRESS: NotamRemoteProgress = {
  lessonScreens: [],
  practiceDone: [],
}

function leerLocal(): ProgresoRemoto {
  const local = readLocalProgress()
  return { lessonScreens: local.lessonScreens, practiceDone: local.exercisesDone }
}

const progreso = crearProgresoModulo({
  tabla: "user_notam_progress",
  rpc: "notam_mark_progress",
  leerLocal,
  anotarLocal: (marca) => {
    const antes = leerLocal()
    const despues = conMarca(antes, marca)
    if (despues.lessonScreens !== antes.lessonScreens || despues.practiceDone !== antes.practiceDone) {
      writeLocalProgress({ lessonScreens: despues.lessonScreens, exercisesDone: despues.practiceDone })
    }
  },
})

/** El progreso guardado en la base (sin lo local); null si la consulta falla. */
export const fetchNotamProgress = progreso.leer

/** Marca una sección leída o un ejercicio resuelto, local y en la base. */
export const markNotamProgress = progreso.marcar

/** Sube lo avanzado sin sesión. Recibe lo que devolvió fetchNotamProgress. */
export const pushPendingLocalProgress = progreso.subirPendiente
