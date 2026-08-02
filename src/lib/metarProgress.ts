/**
 * Progreso METAR: puente entre el respaldo local y la base de datos.
 *
 * Espejo exacto de `notamProgress.ts`, con las mismas reglas: el respaldo local
 * siempre se escribe (la sección funciona sin sesión y sin red), la base es la
 * verdad entre dispositivos, y lo que se avanzó sin sesión se sube en cuanto
 * aparece una.
 *
 * Escribir va siempre por la RPC `metar_mark_progress`, que es idempotente.
 * Nunca por update directo.
 *
 * Hasta hoy la lección METAR guardaba solo en localStorage porque la tabla no
 * existía. Ya existe (migración 20260731020000_metar_progreso.sql, aplicada),
 * así que el tema puede reportar avance real en Ingreso a aerolínea.
 */

import { supabase } from "@/integrations/supabase/client"
import { readMetarProgress, writeMetarProgress } from "@/lib/metar"

export interface MetarRemoteProgress {
  lessonScreens: number[]
  practiceDone: string[]
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
export async function fetchMetarProgress(userId: string): Promise<MetarRemoteProgress | null> {
  try {
    const { data, error } = await supabase
      .from("user_metar_progress")
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
export async function markMetarProgress(mark: {
  lessonScreen?: number
  practiceId?: string
}): Promise<void> {
  const { lessonScreen = null, practiceId = null } = mark

  // El respaldo local primero: si la red falla, el progreso igual queda.
  const local = readMetarProgress()
  if (lessonScreen !== null && !local.lessonScreens.includes(lessonScreen)) {
    writeMetarProgress({
      lessonScreens: [...local.lessonScreens, lessonScreen].sort((a, b) => a - b),
    })
  }
  if (practiceId !== null && !local.practiceDone.includes(practiceId)) {
    writeMetarProgress({ practiceDone: [...local.practiceDone, practiceId] })
  }

  try {
    const { error } = await supabase.rpc("metar_mark_progress", {
      p_lesson_screen: lessonScreen,
      p_practice_id: practiceId,
    })
    // Sin sesión la RPC responde permiso denegado. Es el caso esperado de quien
    // estudia sin cuenta: lo local ya quedó y se sube al iniciar sesión.
    if (error) console.warn("metar_mark_progress", error.message)
  } catch (err) {
    console.warn("metar_mark_progress", err)
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
 * Devuelve el progreso remoto ya actualizado con lo que se subió.
 */
export async function pushPendingMetarProgress(
  remote: MetarRemoteProgress
): Promise<MetarRemoteProgress> {
  const local = readMetarProgress()
  const pendingScreens = local.lessonScreens.filter((n) => !remote.lessonScreens.includes(n))
  const pendingPractice = local.practiceDone.filter((id) => !remote.practiceDone.includes(id))

  if (pendingScreens.length === 0 && pendingPractice.length === 0) return remote

  const tasks: (() => Promise<unknown>)[] = [
    ...pendingScreens.map(
      (n) => async () =>
        await supabase.rpc("metar_mark_progress", { p_lesson_screen: n, p_practice_id: null })
    ),
    ...pendingPractice.map(
      (id) => async () =>
        await supabase.rpc("metar_mark_progress", { p_lesson_screen: null, p_practice_id: id })
    ),
  ]

  try {
    await inBatches(tasks)
  } catch (err) {
    // Si algo falla, lo local sigue intacto y se reintenta en la próxima visita.
    console.warn("metar backfill", err)
    return remote
  }

  return {
    lessonScreens: Array.from(new Set([...remote.lessonScreens, ...pendingScreens])).sort(
      (a, b) => a - b
    ),
    practiceDone: Array.from(new Set([...remote.practiceDone, ...pendingPractice])),
  }
}
