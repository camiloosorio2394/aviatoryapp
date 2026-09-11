/**
 * Quiz de inglés ICAO corregido en el servidor.
 *
 * El cliente lee enunciado, contexto y opciones. La opción correcta y la
 * explicación llegan solo al responder, desde icao_quiz_responder, que además
 * guarda el intento (lo que cuenta como avance). Lo usan el quiz y la parte de
 * lectura ICAO del test inicial.
 * Ver supabase/migrations/20260911190000_icao_quiz_corregido_en_el_servidor.sql.
 */

import { supabase } from "@/integrations/supabase/client"
import { barajar } from "@/lib/barajar"
import {
  clasificarError,
  entero,
  ErrorEvaluacion,
  esObjeto,
  llamarRpc,
  texto,
  textoONulo,
  type Crudo,
} from "@/services/rpc"

/** Lo que se ve de una pregunta antes de responderla. */
export interface PreguntaIcao {
  id: number
  topic: string
  prompt: string
  context: string | null
  options: Record<string, string>
}

export interface CorreccionIcao {
  correcta: boolean
  respuestaCorrecta: string
  explicacion: string | null
}

/** De entre cuántas activas se sortea una ronda. */
const SORTEO = 60

function opciones(v: unknown): Record<string, string> {
  if (!esObjeto(v)) throw new Error("se esperaban opciones")
  const salida: Record<string, string> = {}
  for (const [letra, textoOpcion] of Object.entries(v)) salida[letra] = texto(textoOpcion)
  if (Object.keys(salida).length < 2) throw new Error("se esperaban al menos dos opciones")
  return salida
}

export function leerPreguntaIcao(crudo: unknown): PreguntaIcao {
  if (!esObjeto(crudo)) throw new Error("se esperaba una pregunta")
  return {
    id: entero(crudo.id),
    topic: texto(crudo.topic),
    prompt: texto(crudo.prompt),
    context: textoONulo(crudo.context),
    options: opciones(crudo.options),
  }
}

export function leerCorreccionIcao(crudo: unknown): CorreccionIcao {
  if (!esObjeto(crudo) || typeof crudo.correcta !== "boolean") throw new Error("se esperaba una corrección")
  return {
    correcta: crudo.correcta,
    respuestaCorrecta: texto(crudo.respuesta_correcta),
    explicacion: textoONulo(crudo.explicacion),
  }
}

/** Una ronda al azar de hasta `cantidad` preguntas activas. `tema` null: de todos. */
export async function traerPreguntasIcao(tema: string | null, cantidad: number): Promise<PreguntaIcao[]> {
  let consulta = supabase
    .from("icao_quiz_questions")
    .select("id,topic,prompt,context,options")
    .eq("is_active", true)
  if (tema !== null) consulta = consulta.eq("topic", tema)

  let resultado
  try {
    resultado = await consulta.limit(SORTEO)
  } catch (error) {
    throw clasificarError(error)
  }
  if (resultado.error) throw clasificarError(resultado.error)
  try {
    return barajar((resultado.data ?? []) as Crudo[]).slice(0, cantidad).map(leerPreguntaIcao)
  } catch (error) {
    // Igual que en llamarRpc: el detalle queda en consola y al piloto le llega un mensaje general.
    console.error("icao_quiz_questions: fila inválida", error)
    throw new ErrorEvaluacion("desconocido", error)
  }
}

/** Preguntas activas por tema, con el total en `all`. */
export async function contarPreguntasIcao(): Promise<Record<string, number>> {
  let resultado
  try {
    resultado = await supabase.from("icao_quiz_questions").select("topic").eq("is_active", true).limit(2000)
  } catch (error) {
    throw clasificarError(error)
  }
  if (resultado.error) throw clasificarError(resultado.error)
  const filas = resultado.data ?? []
  const conteo: Record<string, number> = { all: filas.length }
  for (const fila of filas) conteo[fila.topic] = (conteo[fila.topic] ?? 0) + 1
  return conteo
}

/** Corrige una respuesta y la deja guardada como intento del piloto. */
export function responderIcaoQuiz(pregunta: number, respuesta: string): Promise<CorreccionIcao> {
  return llamarRpc("icao_quiz_responder", { p_pregunta: pregunta, p_respuesta: respuesta }, leerCorreccionIcao)
}
