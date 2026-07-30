/**
 * Progreso NOTAM: puente entre el respaldo local y la base de datos.
 *
 * Reglas de la sección:
 *   - El respaldo local (localStorage) siempre se escribe. Es lo que hace que la
 *     sección funcione sin sesión y sin red.
 *   - La base de datos es la verdad entre dispositivos. Todas las pantallas
 *     hidratan desde ahí al montar, no solo desde el respaldo local.
 *   - Lo que el usuario avanzó sin sesión se sube en cuanto aparece una sesión.
 *
 * Escribir va siempre por la RPC notam_mark_progress, que es idempotente: agrega
 * sin duplicar. Nunca por update directo.
 */

import { supabase } from "@/integrations/supabase/client"
import { readLocalProgress, writeLocalProgress } from "@/lib/notam"

export interface NotamRemoteProgress {
  lessonScreens: number[]
  practiceDone: string[]
}

export const EMPTY_REMOTE_PROGRESS: NotamRemoteProgress = {
  lessonScreens: [],
  practiceDone: [],
}

interface ProgressRow {
  lesson_screens: number[] | null
  practice_done: string[] | null
}

/**
 * Lee el progreso guardado del usuario.
 * Devuelve null si la consulta falla, para que quien llama distinga "no hay
 * progreso" (arrays vacíos) de "no pudimos preguntar" y no borre lo local.
 */
export async function fetchNotamProgress(userId: string): Promise<NotamRemoteProgress | null> {
  try {
    const { data, error } = await supabase
      .from("user_notam_progress")
      .select("lesson_screens, practice_done")
      .eq("user_id", userId)
      .maybeSingle()
    if (error) return null
    const row = data as ProgressRow | null
    return {
      lessonScreens: row?.lesson_screens ?? [],
      practiceDone: row?.practice_done ?? [],
    }
  } catch {
    return null
  }
}

/** Marca una sección leída o un ejercicio resuelto, local y en la base. */
export async function markNotamProgress(mark: {
  lessonScreen?: number
  practiceId?: string
}): Promise<void> {
  const { lessonScreen = null, practiceId = null } = mark

  // El respaldo local primero: si la red falla, el progreso igual queda.
  const local = readLocalProgress()
  if (lessonScreen !== null && !local.lessonScreens.includes(lessonScreen)) {
    writeLocalProgress({
      lessonScreens: [...local.lessonScreens, lessonScreen].sort((a, b) => a - b),
    })
  }
  if (practiceId !== null && !local.exercisesDone.includes(practiceId)) {
    writeLocalProgress({ exercisesDone: [...local.exercisesDone, practiceId] })
  }

  try {
    const { error } = await supabase.rpc("notam_mark_progress", {
      p_lesson_screen: lessonScreen,
      p_practice_id: practiceId,
    })
    // Sin sesión la RPC responde permiso denegado. Es el caso esperado de quien
    // estudia sin cuenta: lo local ya quedó y se sube al iniciar sesión.
    if (error) console.warn("notam_mark_progress", error.message)
  } catch (err) {
    console.warn("notam_mark_progress", err)
  }
}

/** Corre las promesas de a `size` para no abrir 40 conexiones de golpe. */
async function inBatches(tasks: (() => Promise<unknown>)[], size = 6): Promise<void> {
  for (let i = 0; i < tasks.length; i += size) {
    await Promise.all(tasks.slice(i, i + size).map((t) => t()))
  }
}

/**
 * Sube a la base lo que el usuario avanzó antes de iniciar sesión.
 *
 * Sin esto, quien estudia sin cuenta y después se registra pierde todo al
 * cambiar de dispositivo: el hub unía los dos orígenes solo para mostrarlos.
 *
 * Solo manda lo que falta contra el estado remoto, y la RPC es idempotente, así
 * que repetir la llamada no duplica ni pisa nada.
 *
 * Devuelve el progreso remoto ya actualizado con lo que se subió.
 */
export async function pushPendingLocalProgress(
  remote: NotamRemoteProgress
): Promise<NotamRemoteProgress> {
  const local = readLocalProgress()
  const pendingScreens = local.lessonScreens.filter((n) => !remote.lessonScreens.includes(n))
  const pendingPractice = local.exercisesDone.filter((id) => !remote.practiceDone.includes(id))

  if (pendingScreens.length === 0 && pendingPractice.length === 0) return remote

  const tasks: (() => Promise<unknown>)[] = [
    ...pendingScreens.map(
      (n) => async () =>
        await supabase.rpc("notam_mark_progress", { p_lesson_screen: n, p_practice_id: null })
    ),
    ...pendingPractice.map(
      (id) => async () =>
        await supabase.rpc("notam_mark_progress", { p_lesson_screen: null, p_practice_id: id })
    ),
  ]

  try {
    await inBatches(tasks)
  } catch (err) {
    // Si algo falla, lo local sigue intacto y se reintenta en la próxima visita.
    console.warn("notam backfill", err)
    return remote
  }

  return {
    lessonScreens: Array.from(new Set([...remote.lessonScreens, ...pendingScreens])).sort(
      (a, b) => a - b
    ),
    practiceDone: Array.from(new Set([...remote.practiceDone, ...pendingPractice])),
  }
}
