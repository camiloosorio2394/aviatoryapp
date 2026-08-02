/**
 * Persistencia del simulacro de entrevista técnica.
 *
 * Mismas reglas que el resto del módulo: el respaldo local siempre se escribe
 * (el simulacro funciona sin sesión y sin red), y la base es la verdad entre
 * dispositivos. Aquí no hay progreso que acumular, solo el mejor puntaje: el
 * simulacro no se completa, se repite.
 *
 * La tabla la crea la migración 20260801040000_simulacro_aerolinea.sql. Mientras
 * no esté aplicada, el insert falla, el respaldo local ya quedó escrito y la
 * pantalla funciona igual: lo único que no viaja es el intento entre
 * dispositivos.
 */

import { supabase } from "@/integrations/supabase/client"

/**
 * Mínimo de aprobación del simulacro, sobre 100.
 *
 * Más alto que el de una evaluación de tema (85 contra 80): en una prueba
 * técnica de aerolínea no se aprueba raspando. Vive aquí y no en la pantalla
 * porque el hub también lo necesita para decir si tu marca está aprobada, y el
 * mismo número está registrado en module_thresholds ('airline_mock_pass') para
 * la condición del logro.
 */
export const AIRLINE_MOCK_PASS_SCORE = 85

const LS_KEY = "aviatory.aerolinea.simulacro"

export interface AirlineMockLocal {
  /** Mejor puntaje del simulacro, sobre 100. */
  bestScore: number | null
  /** Cuántos intentos se han presentado en este navegador. */
  attempts: number
}

const EMPTY: AirlineMockLocal = { bestScore: null, attempts: 0 }

export function readAirlineMockLocal(): AirlineMockLocal {
  try {
    const raw = localStorage.getItem(LS_KEY)
    if (!raw) return EMPTY
    const parsed = JSON.parse(raw) as Partial<AirlineMockLocal>
    return {
      bestScore: typeof parsed.bestScore === "number" ? parsed.bestScore : null,
      attempts: typeof parsed.attempts === "number" ? parsed.attempts : 0,
    }
  } catch {
    return EMPTY
  }
}

function writeAirlineMockLocal(patch: Partial<AirlineMockLocal>): void {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify({ ...readAirlineMockLocal(), ...patch }))
  } catch {
    /* localStorage bloqueado (incógnito): el intento queda en memoria */
  }
}

/**
 * Guarda un intento: respaldo local primero, después la base.
 *
 * El insert es el que dispara la revisión de logros en la base, así que aquí no
 * hay nada que llamar aparte para `airline_mock_passed`.
 */
export async function guardarIntentoSimulacro(intento: {
  score: number
  correct: number
  total: number
}): Promise<void> {
  const local = readAirlineMockLocal()
  writeAirlineMockLocal({
    bestScore: local.bestScore === null ? intento.score : Math.max(local.bestScore, intento.score),
    attempts: local.attempts + 1,
  })

  try {
    const { data } = await supabase.auth.getUser()
    const userId = data.user?.id
    // Sin sesión no hay dónde guardarlo: lo local ya quedó y es el caso
    // esperado de quien prueba el simulacro sin cuenta.
    if (!userId) return

    const { error } = await supabase.from("user_airline_mock_attempts").insert({
      user_id: userId,
      score: intento.score,
      correct: intento.correct,
      total: intento.total,
    })
    if (error) console.warn("airline mock save", error.message)
  } catch (err) {
    console.warn("airline mock save", err)
  }
}

/**
 * Mejor puntaje del usuario, uniendo base y respaldo local.
 *
 * Devuelve null si no ha presentado nunca. Une las dos fuentes por la misma
 * razón que el hub une el progreso: quien presentó sin sesión y después entró
 * no debería ver su mejor puntaje en blanco.
 */
export async function fetchMejorPuntajeSimulacro(userId: string): Promise<number | null> {
  const local = readAirlineMockLocal().bestScore
  try {
    const { data, error } = await supabase
      .from("user_airline_mock_attempts")
      .select("score")
      .eq("user_id", userId)
      .order("score", { ascending: false })
      .limit(1)
    if (error) return local
    const remoto = (data ?? [])[0]?.score
    const scores = [typeof remoto === "number" ? remoto : null, local].filter(
      (s): s is number => typeof s === "number"
    )
    return scores.length > 0 ? Math.max(...scores) : null
  } catch {
    return local
  }
}
