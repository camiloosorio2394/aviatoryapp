/**
 * Progreso de Comunicaciones ATC: el progreso de módulo común (progresoModulo)
 * con el respaldo local del tema, su RPC comunicaciones_mark_progress y la
 * mejor nota de la evaluación.
 *
 * El respaldo local vive en `lib/comunicaciones.ts`, que es el archivo liviano
 * que carga Ingreso a aerolínea. Lo de la base vive aquí, porque trae el
 * cliente de Supabase detrás.
 *
 * Mientras Camilo no corra
 * `supabase/migrations/20260925000000_progreso_de_comunicaciones.sql` la tabla
 * no existe: la consulta falla, `leer` devuelve null y el módulo sigue contando
 * con lo del navegador. El día que la corra, lo que cada piloto tenga guardado
 * aquí se sube solo en su primera visita.
 *
 * La mejor nota sale de user_comunicaciones_exam_attempts, que nace con
 * `20260925010000_evaluacion_de_comunicaciones.sql`. Si esa tabla todavía no
 * existe, la consulta falla sola y queda la nota de este navegador.
 */

import { conMarca, crearProgresoModulo, type ProgresoRemoto } from "@/lib/progresoModulo"
import { traerMejorPuntaje } from "@/services/intentosExamen"
import {
  readComunicacionesLocal,
  writeComunicacionesLocal,
  writeComunicacionesPracticas,
  type ComunicacionesProgreso,
} from "@/lib/comunicaciones"

/** Lo que devuelve fetchComunicacionesProgress: lo unido para mostrar, y lo que la base tiene de verdad. */
export interface ComunicacionesTraido extends ComunicacionesProgreso {
  remoto: ProgresoRemoto
}

const progreso = crearProgresoModulo({
  tabla: "user_comunicaciones_progress",
  rpc: "comunicaciones_mark_progress",
  leerLocal: () => {
    const p = readComunicacionesLocal()
    return { lessonScreens: p.lessonScreens, practiceDone: p.practiceDone }
  },
  anotarLocal: (marca) => {
    const antes = readComunicacionesLocal()
    const despues = conMarca({ lessonScreens: antes.lessonScreens, practiceDone: antes.practiceDone }, marca)
    if (despues.lessonScreens !== antes.lessonScreens) writeComunicacionesLocal(despues.lessonScreens)
    if (despues.practiceDone !== antes.practiceDone) writeComunicacionesPracticas(despues.practiceDone)
  },
})

/**
 * El progreso del piloto unido con el respaldo local, para mostrarlo, y en
 * `remoto` lo que la base tiene de verdad. null si la consulta falla.
 */
export async function fetchComunicacionesProgress(userId: string): Promise<ComunicacionesTraido | null> {
  const [remoto, examen] = await Promise.all([
    progreso.leer(userId),
    traerMejorPuntaje("user_comunicaciones_exam_attempts", userId).then(
      (r) => r.mejor,
      () => null,
    ),
  ])
  if (!remoto) return null
  const local = readComunicacionesLocal()
  const puntajes = [examen, local.bestScore].filter((s): s is number => typeof s === "number")
  return {
    lessonScreens: Array.from(new Set([...remoto.lessonScreens, ...local.lessonScreens])),
    practiceDone: Array.from(new Set([...remoto.practiceDone, ...local.practiceDone])),
    bestScore: puntajes.length > 0 ? Math.max(...puntajes) : null,
    remoto,
  }
}

/** Marca una lección leída o un ejercicio resuelto, local y en la base. */
export const markComunicacionesProgress = progreso.marcar

/**
 * Sube lo que se avanzó sin sesión, comparando contra lo que la base tiene.
 * Devuelve lo de la base más lo que se subió bien.
 */
export async function pushPendingComunicaciones(traido: ComunicacionesTraido): Promise<ComunicacionesProgreso> {
  const subido = await progreso.subirPendiente(traido.remoto)
  return { lessonScreens: subido.lessonScreens, practiceDone: subido.practiceDone, bestScore: traido.bestScore }
}
