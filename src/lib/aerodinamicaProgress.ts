/**
 * Progreso de Aerodinámica: el progreso de módulo común (progresoModulo) con el
 * respaldo local del tema, su RPC aerodinamica_mark_progress y la mejor nota
 * del quiz final.
 *
 * Es el mismo patrón de Mercancías, sin variaciones: lo local primero, la base
 * como verdad entre dispositivos, y lo avanzado sin sesión se sube cuando
 * aparece una.
 */

import { supabase } from "@/integrations/supabase/client"
import { conMarca, crearProgresoModulo, type ProgresoRemoto } from "@/lib/progresoModulo"

const LS_KEY = "aviatory.aerodinamica.progress"

export interface AerodinamicaProgreso {
  /** Números de sección leída, 1 a AERO_LECTURA_TOTAL. */
  lessonScreens: number[]
  /** Claves de práctica hechas: "esc-01", "ent-14"… */
  practiceDone: string[]
  /** Mejor puntaje del quiz final, sobre 100. */
  bestScore: number | null
}

/** Lo que devuelve fetchAerodinamicaProgress: lo unido para mostrar, y lo que la base tiene de verdad. */
export interface AerodinamicaTraido extends AerodinamicaProgreso {
  remoto: ProgresoRemoto
}

const VACIO: AerodinamicaProgreso = { lessonScreens: [], practiceDone: [], bestScore: null }

export function readAerodinamicaLocal(): AerodinamicaProgreso {
  try {
    const raw = localStorage.getItem(LS_KEY)
    if (!raw) return VACIO
    const p = JSON.parse(raw) as Partial<AerodinamicaProgreso>
    return {
      lessonScreens: Array.isArray(p.lessonScreens) ? p.lessonScreens : [],
      practiceDone: Array.isArray(p.practiceDone) ? p.practiceDone : [],
      bestScore: typeof p.bestScore === "number" ? p.bestScore : null,
    }
  } catch {
    return VACIO
  }
}

export function writeAerodinamicaLocal(patch: Partial<AerodinamicaProgreso>): void {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify({ ...readAerodinamicaLocal(), ...patch }))
  } catch {
    /* localStorage bloqueado (incógnito): el progreso queda en memoria */
  }
}

const progreso = crearProgresoModulo({
  tabla: "user_aerodinamica_progress",
  rpc: "aerodinamica_mark_progress",
  leerLocal: readAerodinamicaLocal,
  anotarLocal: (marca) => {
    const antes = readAerodinamicaLocal()
    const despues = conMarca(antes, marca)
    if (despues.lessonScreens !== antes.lessonScreens || despues.practiceDone !== antes.practiceDone) {
      writeAerodinamicaLocal({
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
export async function fetchAerodinamicaProgress(userId: string): Promise<AerodinamicaTraido | null> {
  const [remoto, examen] = await Promise.all([
    progreso.leer(userId),
    supabase
      .from("user_aerodinamica_exam_attempts")
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

  const local = readAerodinamicaLocal()
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

/** Marca una sección leída o un ejercicio de práctica hecho, local y en la base. */
export const markAerodinamicaProgress = progreso.marcar

/**
 * Sube lo que se avanzó sin sesión, comparando contra lo que la base tiene.
 * Devuelve lo de la base más lo que se subió bien.
 */
export async function pushPendingAerodinamica(
  traido: AerodinamicaTraido,
): Promise<AerodinamicaProgreso> {
  const subido = await progreso.subirPendiente(traido.remoto)
  return { ...subido, bestScore: traido.bestScore }
}
