/**
 * Progreso de Performance: el progreso de módulo común (progresoModulo) con el
 * respaldo local del tema, su RPC performance_mark_progress y la mejor nota de
 * la evaluación.
 *
 * Mismo patrón que Aerodinámica y Aeropuertos, sin variaciones: lo local
 * primero, la base como verdad entre dispositivos, y lo avanzado sin sesión se
 * sube cuando aparece una.
 *
 * Mientras Camilo no corra `supabase/migrations/20260926000000_modulo_performance.sql`
 * la tabla no existe: la consulta falla, `leer` devuelve null y el módulo sigue
 * contando con lo del navegador. El día que la corra, lo que cada piloto tenga
 * guardado aquí se sube solo en su primera visita.
 */

import { supabase } from "@/integrations/supabase/client"
import { conMarca, crearProgresoModulo, type ProgresoRemoto } from "@/lib/progresoModulo"

const LS_KEY = "aviatory.performance.progress"

export interface PerformanceProgreso {
  /** Números de tema leído, 1 a PERF_LECTURA_TOTAL. */
  lessonScreens: number[]
  /** Claves de práctica hechas: "ej-01", "esc-07"… */
  practiceDone: string[]
  /** Mejor puntaje de la evaluación, sobre 100. */
  bestScore: number | null
}

/** Lo que devuelve fetchPerformanceProgress: lo unido para mostrar, y lo que la base tiene de verdad. */
export interface PerformanceTraido extends PerformanceProgreso {
  remoto: ProgresoRemoto
}

const VACIO: PerformanceProgreso = { lessonScreens: [], practiceDone: [], bestScore: null }

export function readPerformanceLocal(): PerformanceProgreso {
  try {
    const raw = localStorage.getItem(LS_KEY)
    if (!raw) return VACIO
    const p = JSON.parse(raw) as Partial<PerformanceProgreso>
    return {
      lessonScreens: Array.isArray(p.lessonScreens) ? p.lessonScreens : [],
      practiceDone: Array.isArray(p.practiceDone) ? p.practiceDone : [],
      bestScore: typeof p.bestScore === "number" ? p.bestScore : null,
    }
  } catch {
    return VACIO
  }
}

export function writePerformanceLocal(patch: Partial<PerformanceProgreso>): void {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify({ ...readPerformanceLocal(), ...patch }))
  } catch {
    /* localStorage bloqueado (incógnito): el progreso queda en memoria */
  }
}

const progreso = crearProgresoModulo({
  tabla: "user_performance_progress",
  rpc: "performance_mark_progress",
  leerLocal: readPerformanceLocal,
  anotarLocal: (marca) => {
    const antes = readPerformanceLocal()
    const despues = conMarca(antes, marca)
    if (despues.lessonScreens !== antes.lessonScreens || despues.practiceDone !== antes.practiceDone) {
      writePerformanceLocal({
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
export async function fetchPerformanceProgress(userId: string): Promise<PerformanceTraido | null> {
  const [remoto, examen] = await Promise.all([
    progreso.leer(userId),
    supabase
      .from("user_performance_exam_attempts")
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

  const local = readPerformanceLocal()
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

/** Marca un tema leído o un ejercicio hecho, local y en la base. */
export const markPerformanceProgress = progreso.marcar

/**
 * Sube lo que se avanzó sin sesión, comparando contra lo que la base tiene.
 * Devuelve lo de la base más lo que se subió bien.
 */
export async function pushPendingPerformance(traido: PerformanceTraido): Promise<PerformanceProgreso> {
  const subido = await progreso.subirPendiente(traido.remoto)
  return { ...subido, bestScore: traido.bestScore }
}
