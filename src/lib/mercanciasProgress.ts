/**
 * Progreso de Mercancías Peligrosas: puente entre el respaldo local y la base.
 *
 * Mismas reglas que notamProgress y metarProgress: el respaldo local siempre se
 * escribe (el módulo funciona sin sesión y sin red), la base es la verdad entre
 * dispositivos, y lo avanzado sin sesión se sube en cuanto aparece una.
 *
 * Escribir va siempre por la RPC `mercancias_mark_progress`, que es idempotente.
 * Nunca por update directo.
 */

import { supabase } from "@/integrations/supabase/client"

const LS_KEY = "aviatory.mercancias.progress"

export interface MercanciasProgreso {
  /** Números de sección leída, 0 a 8. */
  lessonScreens: number[]
  /** Ids de casos de práctica resueltos: "c1", "c2"… */
  practiceDone: string[]
  /** Mejor puntaje del chequeo, sobre 100. */
  bestScore: number | null
}

const VACIO: MercanciasProgreso = { lessonScreens: [], practiceDone: [], bestScore: null }

export function readMercanciasLocal(): MercanciasProgreso {
  try {
    const raw = localStorage.getItem(LS_KEY)
    if (!raw) return VACIO
    const p = JSON.parse(raw) as Partial<MercanciasProgreso>
    return {
      lessonScreens: Array.isArray(p.lessonScreens) ? p.lessonScreens : [],
      practiceDone: Array.isArray(p.practiceDone) ? p.practiceDone : [],
      bestScore: typeof p.bestScore === "number" ? p.bestScore : null,
    }
  } catch {
    return VACIO
  }
}

function writeMercanciasLocal(patch: Partial<MercanciasProgreso>): void {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify({ ...readMercanciasLocal(), ...patch }))
  } catch {
    /* localStorage bloqueado (incógnito): el progreso queda en memoria */
  }
}

interface Fila {
  lesson_screens: number[] | null
  practice_done: string[] | null
}

/**
 * Lee el progreso del usuario, uniendo base y respaldo local.
 * Devuelve null si la consulta falla, para distinguir "no hay progreso" de "no
 * pudimos preguntar" y no borrar lo local de la vista.
 */
export async function fetchMercanciasProgress(
  userId: string
): Promise<MercanciasProgreso | null> {
  try {
    const [prog, examen] = await Promise.all([
      supabase
        .from("user_mercancias_progress")
        .select("lesson_screens, practice_done")
        .eq("user_id", userId)
        .maybeSingle(),
      supabase
        .from("user_mercancias_exam_attempts")
        .select("score")
        .eq("user_id", userId)
        .order("score", { ascending: false })
        .limit(1),
    ])
    if (prog.error) return null

    const fila = prog.data as Fila | null
    const local = readMercanciasLocal()
    const remoto = (examen.data ?? [])[0]?.score
    const puntajes = [typeof remoto === "number" ? remoto : null, local.bestScore].filter(
      (s): s is number => typeof s === "number"
    )

    return {
      lessonScreens: Array.from(new Set([...(fila?.lesson_screens ?? []), ...local.lessonScreens])),
      practiceDone: Array.from(new Set([...(fila?.practice_done ?? []), ...local.practiceDone])),
      bestScore: puntajes.length > 0 ? Math.max(...puntajes) : null,
    }
  } catch {
    return null
  }
}

/** Marca una sección leída o un caso resuelto, local y en la base. */
export async function markMercanciasProgress(mark: {
  lessonScreen?: number
  practiceId?: string
}): Promise<void> {
  const { lessonScreen = null, practiceId = null } = mark

  // El respaldo local primero: si la red falla, el progreso igual queda.
  const local = readMercanciasLocal()
  if (lessonScreen !== null && !local.lessonScreens.includes(lessonScreen)) {
    writeMercanciasLocal({
      lessonScreens: [...local.lessonScreens, lessonScreen].sort((a, b) => a - b),
    })
  }
  if (practiceId !== null && !local.practiceDone.includes(practiceId)) {
    writeMercanciasLocal({ practiceDone: [...local.practiceDone, practiceId] })
  }

  try {
    const { error } = await supabase.rpc("mercancias_mark_progress", {
      p_lesson_screen: lessonScreen,
      p_practice_id: practiceId,
    })
    // Sin sesión la RPC responde permiso denegado. Es el caso esperado de quien
    // estudia sin cuenta: lo local ya quedó y se sube al iniciar sesión.
    if (error) console.warn("mercancias_mark_progress", error.message)
  } catch (err) {
    console.warn("mercancias_mark_progress", err)
  }
}

/** Guarda un intento del chequeo: respaldo local primero, después la base. */
export async function guardarChequeoMercancias(intento: {
  score: number
  correct: number
  total: number
}): Promise<void> {
  const local = readMercanciasLocal()
  writeMercanciasLocal({
    bestScore: local.bestScore === null ? intento.score : Math.max(local.bestScore, intento.score),
  })

  try {
    const { data } = await supabase.auth.getUser()
    const userId = data.user?.id
    if (!userId) return
    const { error } = await supabase.from("user_mercancias_exam_attempts").insert({
      user_id: userId,
      score: intento.score,
      correct: intento.correct,
      total: intento.total,
    })
    if (error) console.warn("mercancias chequeo", error.message)
  } catch (err) {
    console.warn("mercancias chequeo", err)
  }
}

/** Corre las promesas de a `size` para no abrir muchas conexiones de golpe. */
async function porTandas(tareas: (() => Promise<unknown>)[], size = 6): Promise<void> {
  for (let i = 0; i < tareas.length; i += size) {
    await Promise.all(tareas.slice(i, i + size).map((t) => t()))
  }
}

/**
 * Sube lo que se avanzó antes de iniciar sesión.
 * Devuelve el progreso ya actualizado con lo que se subió.
 */
export async function pushPendingMercancias(
  remoto: MercanciasProgreso
): Promise<MercanciasProgreso> {
  const local = readMercanciasLocal()
  const secciones = local.lessonScreens.filter((n) => !remoto.lessonScreens.includes(n))
  const casos = local.practiceDone.filter((id) => !remoto.practiceDone.includes(id))
  if (secciones.length === 0 && casos.length === 0) return remoto

  const tareas: (() => Promise<unknown>)[] = [
    ...secciones.map(
      (n) => async () =>
        await supabase.rpc("mercancias_mark_progress", { p_lesson_screen: n, p_practice_id: null })
    ),
    ...casos.map(
      (id) => async () =>
        await supabase.rpc("mercancias_mark_progress", { p_lesson_screen: null, p_practice_id: id })
    ),
  ]

  try {
    await porTandas(tareas)
  } catch (err) {
    console.warn("mercancias backfill", err)
    return remoto
  }

  return {
    lessonScreens: Array.from(new Set([...remoto.lessonScreens, ...secciones])).sort((a, b) => a - b),
    practiceDone: Array.from(new Set([...remoto.practiceDone, ...casos])),
    bestScore: remoto.bestScore,
  }
}
