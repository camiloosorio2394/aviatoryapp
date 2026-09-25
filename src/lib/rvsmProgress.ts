/**
 * Progreso de RVSM: el progreso de módulo común (progresoModulo) con el
 * respaldo local del tema, su RPC rvsm_mark_progress y la mejor nota de la
 * evaluación.
 *
 * Mismo patrón que RAC y Gestión del combustible, sin variaciones: lo local
 * primero, la base como verdad entre dispositivos, y lo avanzado sin sesión se
 * sube cuando aparece una.
 */

import { supabase } from "@/integrations/supabase/client"
import { conMarca, crearProgresoModulo, type ProgresoRemoto } from "@/lib/progresoModulo"

const LS_KEY = "aviatory.rvsm.progress"

export interface RvsmProgreso {
  /** Números de capítulo leído, 1 a RVSM_LECTURA_TOTAL. */
  lessonScreens: number[]
  /** Claves de práctica hechas: "r01-q1", "r22-q3"… */
  practiceDone: string[]
  /** Mejor puntaje de la evaluación, sobre 100. */
  bestScore: number | null
}

/** Lo que devuelve fetchRvsmProgress: lo unido para mostrar, y lo que la base tiene de verdad. */
export interface RvsmTraido extends RvsmProgreso {
  remoto: ProgresoRemoto
}

const VACIO: RvsmProgreso = { lessonScreens: [], practiceDone: [], bestScore: null }

export function readRvsmLocal(): RvsmProgreso {
  try {
    const raw = localStorage.getItem(LS_KEY)
    if (!raw) return VACIO
    const p = JSON.parse(raw) as Partial<RvsmProgreso>
    return {
      lessonScreens: Array.isArray(p.lessonScreens) ? p.lessonScreens : [],
      practiceDone: Array.isArray(p.practiceDone) ? p.practiceDone : [],
      bestScore: typeof p.bestScore === "number" ? p.bestScore : null,
    }
  } catch {
    return VACIO
  }
}

export function writeRvsmLocal(patch: Partial<RvsmProgreso>): void {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify({ ...readRvsmLocal(), ...patch }))
  } catch {
    /* localStorage bloqueado (incógnito): el progreso queda en memoria */
  }
}

const progreso = crearProgresoModulo({
  tabla: "user_rvsm_progress",
  rpc: "rvsm_mark_progress",
  leerLocal: readRvsmLocal,
  anotarLocal: (marca) => {
    const antes = readRvsmLocal()
    const despues = conMarca(antes, marca)
    if (despues.lessonScreens !== antes.lessonScreens || despues.practiceDone !== antes.practiceDone) {
      writeRvsmLocal({
        lessonScreens: despues.lessonScreens,
        practiceDone: despues.practiceDone,
      })
    }
  },
})

/**
 * El progreso del piloto unido con el respaldo local, para mostrarlo, y en
 * `remoto` lo que la base tiene de verdad, que es contra lo que se sube lo
 * pendiente. null si la consulta falla.
 */
export async function fetchRvsmProgress(userId: string): Promise<RvsmTraido | null> {
  const [remoto, examen] = await Promise.all([
    progreso.leer(userId),
    supabase
      .from("user_rvsm_exam_attempts")
      .select("score")
      .eq("user_id", userId)
      .order("score", { ascending: false })
      .limit(1)
      .then(
        (r) => r,
        () => ({ data: null }),
      ),
  ])
  if (!remoto) return null

  const local = readRvsmLocal()
  const mejorRemoto = (examen.data ?? [])[0]?.score
  const puntajes = [typeof mejorRemoto === "number" ? mejorRemoto : null, local.bestScore].filter(
    (s): s is number => typeof s === "number",
  )

  return {
    lessonScreens: Array.from(new Set([...remoto.lessonScreens, ...local.lessonScreens])),
    practiceDone: Array.from(new Set([...remoto.practiceDone, ...local.practiceDone])),
    bestScore: puntajes.length > 0 ? Math.max(...puntajes) : null,
    remoto,
  }
}

/** Marca un capítulo leído o una pregunta respondida, local y en la base. */
export const markRvsmProgress = progreso.marcar

/**
 * Sube lo que se avanzó sin sesión, comparando contra lo que la base tiene.
 * Devuelve lo de la base más lo que se subió bien.
 */
export async function pushPendingRvsm(traido: RvsmTraido): Promise<RvsmProgreso> {
  const subido = await progreso.subirPendiente(traido.remoto)
  return { ...subido, bestScore: traido.bestScore }
}
