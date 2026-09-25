/**
 * Progreso de PBN: el progreso de módulo común (progresoModulo) con el
 * respaldo local del tema, su RPC pbn_mark_progress y la mejor nota de la
 * evaluación.
 *
 * Mismo patrón que PBN, sin variaciones: lo local
 * primero, la base como verdad entre dispositivos, y lo avanzado sin sesión se
 * sube cuando aparece una.
 */

import { supabase } from "@/integrations/supabase/client"
import { conMarca, crearProgresoModulo, type ProgresoRemoto } from "@/lib/progresoModulo"

const LS_KEY = "aviatory.pbn.progress"

export interface PbnProgreso {
  /** Números de capítulo leído, 1 a PBN_LECTURA_TOTAL. */
  lessonScreens: number[]
  /** Claves de práctica hechas: "p01-q1", "p37-q3"… */
  practiceDone: string[]
  /** Mejor puntaje de la evaluación, sobre 100. */
  bestScore: number | null
}

/** Lo que devuelve fetchPbnProgress: lo unido para mostrar, y lo que la base tiene de verdad. */
export interface PbnTraido extends PbnProgreso {
  remoto: ProgresoRemoto
}

const VACIO: PbnProgreso = { lessonScreens: [], practiceDone: [], bestScore: null }

export function readPbnLocal(): PbnProgreso {
  try {
    const raw = localStorage.getItem(LS_KEY)
    if (!raw) return VACIO
    const p = JSON.parse(raw) as Partial<PbnProgreso>
    return {
      lessonScreens: Array.isArray(p.lessonScreens) ? p.lessonScreens : [],
      practiceDone: Array.isArray(p.practiceDone) ? p.practiceDone : [],
      bestScore: typeof p.bestScore === "number" ? p.bestScore : null,
    }
  } catch {
    return VACIO
  }
}

export function writePbnLocal(patch: Partial<PbnProgreso>): void {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify({ ...readPbnLocal(), ...patch }))
  } catch {
    /* localStorage bloqueado (incógnito): el progreso queda en memoria */
  }
}

const progreso = crearProgresoModulo({
  tabla: "user_pbn_progress",
  rpc: "pbn_mark_progress",
  leerLocal: readPbnLocal,
  anotarLocal: (marca) => {
    const antes = readPbnLocal()
    const despues = conMarca(antes, marca)
    if (despues.lessonScreens !== antes.lessonScreens || despues.practiceDone !== antes.practiceDone) {
      writePbnLocal({
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
export async function fetchPbnProgress(userId: string): Promise<PbnTraido | null> {
  const [remoto, examen] = await Promise.all([
    progreso.leer(userId),
    supabase
      .from("user_pbn_exam_attempts")
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

  const local = readPbnLocal()
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
export const markPbnProgress = progreso.marcar

/**
 * Sube lo que se avanzó sin sesión, comparando contra lo que la base tiene.
 * Devuelve lo de la base más lo que se subió bien.
 */
export async function pushPendingPbn(traido: PbnTraido): Promise<PbnProgreso> {
  const subido = await progreso.subirPendiente(traido.remoto)
  return { ...subido, bestScore: traido.bestScore }
}
