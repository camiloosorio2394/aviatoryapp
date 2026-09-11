/**
 * Lo común a las pruebas que corrige el servidor (evaluaciones, psicotécnicas,
 * quiz ICAO y test inicial):
 * llamar a una función de la base, validar la forma de lo que devuelve y traducir
 * cualquier error a un mensaje apto para el piloto.
 */

import { supabase } from "@/integrations/supabase/client"

export type CodigoErrorEvaluacion =
  | "sin_sesion"
  | "sin_conexion"
  | "no_disponible"
  | "demasiados_intentos"
  | "intento_vencido"
  | "intento_no_encontrado"
  | "respuesta_invalida"
  | "desconocido"

const MENSAJES: Record<CodigoErrorEvaluacion, string> = {
  sin_sesion: "Tu sesión se cerró. Inicia sesión de nuevo para seguir.",
  sin_conexion: "No hay conexión. Revisa tu internet y vuelve a intentarlo.",
  no_disponible: "Esta prueba no está disponible en este momento.",
  demasiados_intentos: "Presentaste muchos intentos en la última hora. Descansa un rato y vuelve a intentarlo.",
  intento_vencido: "Este intento venció. Empieza uno nuevo.",
  intento_no_encontrado: "No encontramos este intento. Empieza uno nuevo.",
  respuesta_invalida: "No pudimos registrar esa respuesta. Elige una opción y vuelve a intentarlo.",
  desconocido: "No pudimos procesar la prueba. Vuelve a intentarlo en un momento.",
}

/** Error con un mensaje apto para mostrarle al piloto y un código para decidir qué ofrecer. */
export class ErrorEvaluacion extends Error {
  readonly codigo: CodigoErrorEvaluacion

  constructor(codigo: CodigoErrorEvaluacion, causa?: unknown) {
    super(MENSAJES[codigo], causa === undefined ? undefined : { cause: causa })
    this.name = "ErrorEvaluacion"
    this.codigo = codigo
  }
}

/** Traduce un error de PostgREST, de red o de sesión al código correspondiente. */
export function clasificarError(error: unknown): ErrorEvaluacion {
  if (error instanceof ErrorEvaluacion) return error
  const mensaje = (error as { message?: unknown } | null)?.message
  const texto = typeof mensaje === "string" ? mensaje : ""

  if (/demasiados_intentos/.test(texto)) return new ErrorEvaluacion("demasiados_intentos", error)
  // Las funciones del vault (materias PCA) responden en inglés; las nuevas, en español.
  if (/sesion_vencida|sesion_terminada|session_expired|session_completed/.test(texto)) {
    return new ErrorEvaluacion("intento_vencido", error)
  }
  if (/sesion_no_encontrada|session_not_found/.test(texto)) return new ErrorEvaluacion("intento_no_encontrado", error)
  if (/evaluacion_no_disponible|banco_vacio|sin_ejercicios|pregunta_no_encontrada/.test(texto)) {
    return new ErrorEvaluacion("no_disponible", error)
  }
  if (/posicion_invalida|opcion_invalida|invalid_position/.test(texto)) return new ErrorEvaluacion("respuesta_invalida", error)
  if (/unauthorized|JWT|not authenticated|permission denied|sin_sesion/i.test(texto)) return new ErrorEvaluacion("sin_sesion", error)
  if (error instanceof TypeError || /Failed to fetch|NetworkError|fetch failed|Load failed/i.test(texto)) {
    return new ErrorEvaluacion("sin_conexion", error)
  }
  return new ErrorEvaluacion("desconocido", error)
}

// ─── Validación de lo que llega del servidor ─────────────────────────────────

export type Crudo = Record<string, unknown>

export function esObjeto(v: unknown): v is Crudo {
  return typeof v === "object" && v !== null && !Array.isArray(v)
}

export function entero(v: unknown): number {
  if (typeof v !== "number" || !Number.isInteger(v)) throw new Error("se esperaba un entero")
  return v
}

export function enteroONulo(v: unknown): number | null {
  return v === null || v === undefined ? null : entero(v)
}

export function texto(v: unknown): string {
  if (typeof v !== "string") throw new Error("se esperaba texto")
  return v
}

export function textoONulo(v: unknown): string | null {
  return v === null || v === undefined ? null : texto(v)
}

// ─── Llamada ─────────────────────────────────────────────────────────────────

export async function llamarRpc<T>(
  funcion: string,
  parametros: Record<string, unknown>,
  leer: (datos: unknown) => T,
): Promise<T> {
  let resultado
  try {
    resultado = await supabase.rpc(funcion, parametros)
  } catch (error) {
    throw clasificarError(error)
  }
  if (resultado.error) throw clasificarError(resultado.error)
  try {
    return leer(resultado.data)
  } catch (error) {
    // Una forma inesperada es un desajuste entre la app y la base: se registra
    // con el detalle, y al piloto le llega un mensaje general.
    console.error(`${funcion}: respuesta inválida`, error)
    throw new ErrorEvaluacion("desconocido", error)
  }
}
