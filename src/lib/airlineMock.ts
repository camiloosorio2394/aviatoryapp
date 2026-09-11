/**
 * Persistencia del simulacro de entrevista técnica.
 *
 * El simulacro lo sortea, califica y guarda el servidor (evaluacion simulacro_aerolinea).
 * Aquí queda el respaldo local del mejor puntaje, para que el hub lo muestre sin red,
 * y la lectura del mejor puntaje guardado.
 */

import { supabase } from "@/integrations/supabase/client"
import { MP_HUB } from "@/lib/mercancias"
import { METAR_EXAM_TOTAL } from "@/lib/metar"
import { NOTAM_TOTALES } from "@/lib/notamComun"

/** Preguntas de Mercancías peligrosas que entran al simulacro (contenido/bancos/mercancias_chequeo.json). */
export const MP_CHEQUEO_TOTAL = 5

/**
 * Los temas que entran al simulacro, con cuántas preguntas aporta cada uno.
 *
 * Las preguntas viven en el servidor (evaluacion_fuentes de simulacro_aerolinea).
 * Esta lista es lo que ven el hub y la pantalla de arranque, y una prueba
 * comprueba que los conteos cuadren con contenido/bancos/.
 */
export const TEMAS_SIMULACRO: { tema: string; ruta: string; preguntas: number }[] = [
  { tema: "NOTAM", ruta: "/app/aerolinea/notam", preguntas: NOTAM_TOTALES.examQuestions },
  { tema: "Meteorología", ruta: "/app/aerolinea/meteorologia", preguntas: METAR_EXAM_TOTAL },
  { tema: "Mercancías peligrosas", ruta: MP_HUB, preguntas: MP_CHEQUEO_TOTAL },
]

/** Cuántas preguntas hay en el sorteo. Es lo que anuncian el hub y la pantalla. */
export const BANCO_TOTAL = TEMAS_SIMULACRO.reduce((suma, t) => suma + t.preguntas, 0)

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
 * Anota un intento en el respaldo local: el mejor puntaje y cuántos van. El
 * intento ya lo guardó el servidor al terminar (y con él, el logro).
 */
export function anotarIntentoSimulacroLocal(score: number): void {
  const local = readAirlineMockLocal()
  writeAirlineMockLocal({
    bestScore: local.bestScore === null ? score : Math.max(local.bestScore, score),
    attempts: local.attempts + 1,
  })
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
