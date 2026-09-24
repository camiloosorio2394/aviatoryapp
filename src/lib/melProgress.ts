/**
 * Progreso de MEL: el progreso de módulo común (progresoModulo) con el
 * respaldo local del tema y su RPC mel_mark_progress.
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
 * Todavía no hay evaluación: cuando llegue, su mejor nota entra aquí como en
 * `comunicacionesProgress.ts`.
 */

import { conMarca, crearProgresoModulo, type ProgresoRemoto } from "@/lib/progresoModulo"
import { readMelLocal, writeMelLocal, writeMelPracticas, type MelProgreso } from "@/lib/mel"

/** Lo que devuelve fetchMelProgress: lo unido para mostrar, y lo que la base tiene de verdad. */
export interface MelTraido extends MelProgreso {
  remoto: ProgresoRemoto
}

const progreso = crearProgresoModulo({
  tabla: "user_mel_progress",
  rpc: "mel_mark_progress",
  leerLocal: () => readMelLocal(),
  anotarLocal: (marca) => {
    const antes = readMelLocal()
    const despues = conMarca(antes, marca)
    if (despues.lessonScreens !== antes.lessonScreens) writeMelLocal(despues.lessonScreens)
    if (despues.practiceDone !== antes.practiceDone) writeMelPracticas(despues.practiceDone)
  },
})

/**
 * El progreso del piloto unido con el respaldo local, para mostrarlo, y en
 * `remoto` lo que la base tiene de verdad. null si la consulta falla.
 */
export async function fetchMelProgress(userId: string): Promise<MelTraido | null> {
  const remoto = await progreso.leer(userId)
  if (!remoto) return null
  const local = readMelLocal()
  return {
    lessonScreens: Array.from(new Set([...remoto.lessonScreens, ...local.lessonScreens])),
    practiceDone: Array.from(new Set([...remoto.practiceDone, ...local.practiceDone])),
    remoto,
  }
}

/** Marca una lección leída (o, cuando exista, un ejercicio resuelto), local y en la base. */
export const markMelProgress = progreso.marcar

/**
 * Sube lo que se avanzó sin sesión, comparando contra lo que la base tiene.
 * Devuelve lo de la base más lo que se subió bien.
 */
export async function pushPendingMel(traido: MelTraido): Promise<MelProgreso> {
  const subido = await progreso.subirPendiente(traido.remoto)
  return { lessonScreens: subido.lessonScreens, practiceDone: subido.practiceDone }
}
