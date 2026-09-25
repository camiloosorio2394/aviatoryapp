/**
 * Progreso de Gestión del combustible: el progreso de módulo común (progresoModulo) con el
 * respaldo local del tema, su RPC combustible_mark_progress y la mejor nota de la
 * evaluación.
 *
 * Mismo patrón que Aerodinámica, Aeropuertos y Performance, sin variaciones: lo
 * local primero, la base como verdad entre dispositivos, y lo avanzado sin
 * sesión se sube cuando aparece una.
 *
 * Mientras no se corra la migración del módulo la tabla no existe: la consulta
 * falla, `leer` devuelve null y el módulo sigue contando con lo del navegador.
 * El día que se corra, lo que cada piloto tenga guardado aquí se sube solo en su
 * primera visita.
 */

import { supabase } from "@/integrations/supabase/client"
import { conMarca, crearProgresoModulo, type ProgresoRemoto } from "@/lib/progresoModulo"

const LS_KEY = "aviatory.combustible.progress"

export interface CombustibleProgreso {
  /** Números de capítulo leído, 1 a CB_LECTURA_TOTAL. */
  lessonScreens: number[]
  /** Claves de práctica hechas: "c01-q1", "c14-q2"… */
  practiceDone: string[]
  /** Mejor puntaje de la evaluación, sobre 100. */
  bestScore: number | null
}

/** Lo que devuelve fetchCombustibleProgress: lo unido para mostrar, y lo que la base tiene de verdad. */
export interface CombustibleTraido extends CombustibleProgreso {
  remoto: ProgresoRemoto
}

const VACIO: CombustibleProgreso = { lessonScreens: [], practiceDone: [], bestScore: null }

export function readCombustibleLocal(): CombustibleProgreso {
  try {
    const raw = localStorage.getItem(LS_KEY)
    if (!raw) return VACIO
    const p = JSON.parse(raw) as Partial<CombustibleProgreso>
    return {
      lessonScreens: Array.isArray(p.lessonScreens) ? p.lessonScreens : [],
      practiceDone: Array.isArray(p.practiceDone) ? p.practiceDone : [],
      bestScore: typeof p.bestScore === "number" ? p.bestScore : null,
    }
  } catch {
    return VACIO
  }
}

export function writeCombustibleLocal(patch: Partial<CombustibleProgreso>): void {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify({ ...readCombustibleLocal(), ...patch }))
  } catch {
    /* localStorage bloqueado (incógnito): el progreso queda en memoria */
  }
}

const progreso = crearProgresoModulo({
  tabla: "user_combustible_progress",
  rpc: "combustible_mark_progress",
  leerLocal: readCombustibleLocal,
  anotarLocal: (marca) => {
    const antes = readCombustibleLocal()
    const despues = conMarca(antes, marca)
    if (despues.lessonScreens !== antes.lessonScreens || despues.practiceDone !== antes.practiceDone) {
      writeCombustibleLocal({
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
export async function fetchCombustibleProgress(userId: string): Promise<CombustibleTraido | null> {
  const [remoto, examen] = await Promise.all([
    progreso.leer(userId),
    supabase
      .from("user_combustible_exam_attempts")
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

  const local = readCombustibleLocal()
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

/** Marca una unidad leída o una pregunta respondida, local y en la base. */
export const markCombustibleProgress = progreso.marcar

/**
 * Sube lo que se avanzó sin sesión, comparando contra lo que la base tiene.
 * Devuelve lo de la base más lo que se subió bien.
 */
export async function pushPendingCombustible(traido: CombustibleTraido): Promise<CombustibleProgreso> {
  const subido = await progreso.subirPendiente(traido.remoto)
  return { ...subido, bestScore: traido.bestScore }
}
