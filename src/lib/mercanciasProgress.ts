/**
 * Progreso de Mercancías Peligrosas: el progreso de módulo común (progresoModulo)
 * con el respaldo local del tema, su RPC mercancias_mark_progress y la mejor
 * nota de la evaluación.
 */

import { supabase } from "@/integrations/supabase/client"
import { conMarca, crearProgresoModulo, type ProgresoRemoto } from "@/lib/progresoModulo"

const LS_KEY = "aviatory.mercancias.progress"

export interface MercanciasProgreso {
  /** Números de lección leída, 1 a MP_LECTURA_TOTAL. */
  lessonScreens: number[]
  /** Ids de casos de práctica resueltos: "c1", "c2"… */
  practiceDone: string[]
  /** Mejor puntaje de la evaluación, sobre 100. */
  bestScore: number | null
}

/** Lo que devuelve fetchMercanciasProgress: lo unido para mostrar, y lo que la base tiene de verdad. */
export interface MercanciasTraido extends MercanciasProgreso {
  remoto: ProgresoRemoto
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

export function writeMercanciasLocal(patch: Partial<MercanciasProgreso>): void {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify({ ...readMercanciasLocal(), ...patch }))
  } catch {
    /* localStorage bloqueado (incógnito): el progreso queda en memoria */
  }
}

const progreso = crearProgresoModulo({
  tabla: "user_mercancias_progress",
  rpc: "mercancias_mark_progress",
  leerLocal: readMercanciasLocal,
  anotarLocal: (marca) => {
    const antes = readMercanciasLocal()
    const despues = conMarca(antes, marca)
    if (despues.lessonScreens !== antes.lessonScreens || despues.practiceDone !== antes.practiceDone) {
      writeMercanciasLocal({ lessonScreens: despues.lessonScreens, practiceDone: despues.practiceDone })
    }
  },
})

/**
 * El progreso del piloto unido con el respaldo local, para mostrarlo, y en
 * `remoto` lo que la base tiene de verdad, que es contra lo que se sube lo
 * pendiente. null si la consulta falla.
 */
export async function fetchMercanciasProgress(userId: string): Promise<MercanciasTraido | null> {
  const [remoto, examen] = await Promise.all([
    progreso.leer(userId),
    supabase
      .from("user_mercancias_exam_attempts")
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

  const local = readMercanciasLocal()
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

/** Marca una sección leída o un caso resuelto, local y en la base. */
export const markMercanciasProgress = progreso.marcar

/**
 * Sube lo que se avanzó sin sesión, comparando contra lo que la base tiene (no
 * contra lo ya unido con lo local: así nunca quedaba nada pendiente y nada se
 * subía). Devuelve lo de la base más lo que se subió bien.
 */
export async function pushPendingMercancias(traido: MercanciasTraido): Promise<MercanciasProgreso> {
  const subido = await progreso.subirPendiente(traido.remoto)
  return { ...subido, bestScore: traido.bestScore }
}
