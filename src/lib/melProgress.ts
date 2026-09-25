/**
 * Progreso de MEL: el progreso de módulo común (progresoModulo) con el
 * respaldo local del tema, su RPC mel_mark_progress y la mejor nota de la
 * evaluación.
 *
 * El respaldo local vive en `lib/mel.ts`, que es el archivo liviano que carga
 * Ingreso a aerolínea. Lo de la base vive aquí, porque trae el cliente de
 * Supabase detrás.
 *
 * Mientras Camilo no corra
 * `supabase/migrations/20260928000000_progreso_de_mel.sql` la tabla no existe:
 * la consulta falla, `leer` devuelve null y el módulo sigue contando con lo
 * del navegador. El día que la corra, lo que cada piloto tenga guardado aquí
 * se sube solo en su primera visita.
 *
 * La mejor nota sale de user_mel_exam_attempts, que nace con
 * `20260928010000_evaluacion_de_mel.sql`. Si esa tabla todavía no existe, la
 * consulta falla sola y queda la nota de este navegador.
 */

import { conMarca, crearProgresoModulo, type ProgresoRemoto } from "@/lib/progresoModulo"
import { traerMejorPuntaje } from "@/services/intentosExamen"
import { readMelLocal, writeMelLocal, writeMelPracticas, type MelProgreso } from "@/lib/mel"

/** Lo que devuelve fetchMelProgress: lo unido para mostrar, y lo que la base tiene de verdad. */
export interface MelTraido extends MelProgreso {
  remoto: ProgresoRemoto
}

const progreso = crearProgresoModulo({
  tabla: "user_mel_progress",
  rpc: "mel_mark_progress",
  leerLocal: () => {
    const p = readMelLocal()
    return { lessonScreens: p.lessonScreens, practiceDone: p.practiceDone }
  },
  anotarLocal: (marca) => {
    const antes = readMelLocal()
    const despues = conMarca({ lessonScreens: antes.lessonScreens, practiceDone: antes.practiceDone }, marca)
    if (despues.lessonScreens !== antes.lessonScreens) writeMelLocal(despues.lessonScreens)
    if (despues.practiceDone !== antes.practiceDone) writeMelPracticas(despues.practiceDone)
  },
})

/**
 * El progreso del piloto unido con el respaldo local, para mostrarlo, y en
 * `remoto` lo que la base tiene de verdad. null si la consulta falla.
 */
export async function fetchMelProgress(userId: string): Promise<MelTraido | null> {
  const [remoto, examen] = await Promise.all([
    progreso.leer(userId),
    traerMejorPuntaje("user_mel_exam_attempts", userId).then(
      (r) => r.mejor,
      () => null,
    ),
  ])
  if (!remoto) return null
  const local = readMelLocal()
  const puntajes = [examen, local.bestScore].filter((s): s is number => typeof s === "number")
  return {
    lessonScreens: Array.from(new Set([...remoto.lessonScreens, ...local.lessonScreens])),
    practiceDone: Array.from(new Set([...remoto.practiceDone, ...local.practiceDone])),
    bestScore: puntajes.length > 0 ? Math.max(...puntajes) : null,
    remoto,
  }
}

/** Marca una lección leída o un ejercicio resuelto, local y en la base. */
export const markMelProgress = progreso.marcar

/**
 * Sube lo que se avanzó sin sesión, comparando contra lo que la base tiene.
 * Devuelve lo de la base más lo que se subió bien.
 */
export async function pushPendingMel(traido: MelTraido): Promise<MelProgreso> {
  const subido = await progreso.subirPendiente(traido.remoto)
  return { lessonScreens: subido.lessonScreens, practiceDone: subido.practiceDone, bestScore: traido.bestScore }
}
