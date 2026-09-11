/**
 * El avance real del módulo de Inglés ICAO.
 *
 * El hub era estático: quien llevaba las 32 preguntas de la entrevista
 * respondidas veía exactamente lo mismo que quien nunca lo abrió. Esto lee lo
 * que ya se guarda en la base y lo resume por sección, igual que hace
 * `notamProgress` para Ingreso a aerolínea.
 *
 * Importante: NO todas las secciones tienen de dónde leer. La comprensión
 * (Parte 2) y la descripción de imágenes (Parte 3) todavía no guardan nada, así
 * que su avance es `null` y la tarjeta lo dice en vez de inventar un 0%. Un cero
 * afirma que lo intentaste y no avanzaste; `null` afirma que no sabemos, que es
 * lo cierto.
 */

import { supabase } from "@/integrations/supabase/client"
import { reportarError } from "@/lib/errores"
import { TEA_PART1_TOTAL } from "@/lib/icaoInterview"

export interface IcaoProgress {
  /** Preguntas distintas respondidas en el quiz de vocabulario. */
  quizRespondidas: number
  /** Preguntas cargadas en `icao_quiz_questions`. */
  quizTotal: number
  /** Términos cargados en `icao_vocabulary`. */
  vocabularioTotal: number
  /** Preguntas distintas de la Parte 1 respondidas hablando. */
  interviewRespondidas: number
  /** Simulacros TEA presentados. */
  simulacros: number
  /** Mejor nivel final obtenido en un simulacro, si hay alguno. */
  mejorNivel: number | null
}

export const ICAO_PROGRESS_VACIO: IcaoProgress = {
  quizRespondidas: 0,
  quizTotal: 0,
  vocabularioTotal: 0,
  interviewRespondidas: 0,
  simulacros: 0,
  mejorNivel: null,
}

/** Convierte lo que devuelve icao_progreso(). Lanza si la forma no es la esperada. */
export function leerIcaoProgress(datos: unknown): IcaoProgress {
  const d = datos as Record<string, unknown> | null
  const cuenta = (clave: string): number => {
    const v = d?.[clave]
    if (typeof v !== "number" || !Number.isInteger(v) || v < 0) throw new Error(`icao_progreso.${clave} inválido`)
    return v
  }
  const nivel = d?.mejor_nivel
  if (nivel !== null && (typeof nivel !== "number" || !Number.isInteger(nivel))) throw new Error("icao_progreso.mejor_nivel inválido")
  return {
    quizRespondidas: cuenta("quiz_respondidas"),
    quizTotal: cuenta("quiz_total"),
    vocabularioTotal: cuenta("vocabulario_total"),
    interviewRespondidas: cuenta("interview_respondidas"),
    simulacros: cuenta("simulacros"),
    mejorNivel: nivel,
  }
}

/**
 * Trae el avance del piloto en una llamada: icao_progreso() cuenta en la base
 * (supabase/migrations/20260911202806_resumenes_en_la_base.sql). Contarlo aquí
 * obligaba a traer todos los intentos del quiz, y PostgREST corta en 1000 filas.
 *
 * Si falla, las tarjetas enseñan su contenido sin avance, como sin sesión.
 */
export async function fetchIcaoProgress(): Promise<IcaoProgress> {
  const { data, error } = await supabase.rpc("icao_progreso")
  if (error) {
    console.warn("icao_progreso", error.message)
    return ICAO_PROGRESS_VACIO
  }
  try {
    return leerIcaoProgress(data)
  } catch (err) {
    reportarError("icao_progreso: respuesta inválida", err)
    return ICAO_PROGRESS_VACIO
  }
}

/** Avance de una sección: `null` cuando esa sección todavía no registra nada. */
export interface SeccionResumen {
  pct: number | null
  /** El pie de la tarjeta. Sin avance, invita a empezar en vez de decir 0%. */
  estado: string
}

function pct(hechas: number, total: number): number {
  if (total <= 0) return 0
  return Math.min(100, Math.round((hechas / total) * 100))
}

/** Vocabulario: el avance es el quiz, que es la parte que se puede medir. */
export function resumirVocabulario(p: IcaoProgress): SeccionResumen {
  if (p.quizTotal === 0) {
    return { pct: null, estado: "Glosario con buscador y quiz para ponerte a prueba" }
  }
  if (p.quizRespondidas === 0) {
    return {
      pct: null,
      estado: `Sin responder todavía: ${p.quizTotal} preguntas de quiz te esperan`,
    }
  }
  const avance = pct(p.quizRespondidas, p.quizTotal)
  return {
    pct: avance,
    estado:
      avance >= 100
        ? `Quiz completo: las ${p.quizTotal} preguntas respondidas`
        : `Vas por el ${avance}%: ${p.quizRespondidas} de ${p.quizTotal} preguntas del quiz`,
  }
}

/** Entrevista: cuántas de las preguntas de la Parte 1 respondiste hablando. */
export function resumirInterview(p: IcaoProgress): SeccionResumen {
  if (p.interviewRespondidas === 0) {
    return {
      pct: null,
      estado: `Sin grabar todavía: ${TEA_PART1_TOTAL} preguntas con respuesta modelo`,
    }
  }
  const avance = pct(p.interviewRespondidas, TEA_PART1_TOTAL)
  return {
    pct: avance,
    estado:
      avance >= 100
        ? `Respondiste hablando las ${TEA_PART1_TOTAL} preguntas`
        : `Vas por el ${avance}%: respondiste ${p.interviewRespondidas} de ${TEA_PART1_TOTAL} hablando`,
  }
}

/** El simulacro no se completa: se presenta. El pie es el marcador. */
export function resumirSimulacro(p: IcaoProgress): SeccionResumen {
  if (p.simulacros === 0) {
    return { pct: null, estado: "Sin presentar · las 3 partes seguidas y cronometradas" }
  }
  const veces = p.simulacros === 1 ? "1 vez" : `${p.simulacros} veces`
  if (p.mejorNivel === null) {
    return { pct: null, estado: `Presentado ${veces} · sin nivel calculado` }
  }
  return {
    pct: null,
    estado: `Presentado ${veces} · tu mejor resultado: ICAO ${p.mejorNivel}`,
  }
}
