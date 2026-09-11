/**
 * Evaluaciones calificadas en el servidor.
 *
 * Las preguntas y sus respuestas viven en la base (banco_preguntas) y el
 * navegador nunca las recibe juntas: evaluacion_iniciar entrega enunciado y
 * opciones ya barajadas, evaluacion_responder registra cada respuesta una sola
 * vez y evaluacion_terminar calcula el puntaje, lo guarda y devuelve la
 * revisión. Ver supabase/migrations/20260911080000_evaluaciones_en_el_servidor.sql.
 *
 * Este archivo es la única puerta a esas funciones: tipa lo que devuelven, lo
 * valida y traduce los errores a mensajes para el piloto.
 */

import { supabase } from "@/integrations/supabase/client"

export type ClaveEvaluacion =
  | "notam_evaluacion"
  | "metar_evaluacion"
  | "mercancias_evaluacion"
  | "simulacro_aerolinea"

export type Retroalimentacion = "inmediata" | "al_final"

export interface PreguntaEvaluacion {
  /** 1..total, en el orden en que se presenta. */
  posicion: number
  enunciado: string
  /** Ya en el orden que ve el piloto: la respuesta se envía como índice de este arreglo. */
  opciones: string[]
  /** Tema de la pregunta en las evaluaciones que mezclan bancos. */
  tema: string | null
}

export interface SesionEvaluacion {
  id: string
  venceEn: string
  retroalimentacion: Retroalimentacion
  aprobacion: number
  preguntas: PreguntaEvaluacion[]
}

export interface RespuestaRegistrada {
  posicion: number
  opcion: number
  /** Solo en retroalimentación inmediata. */
  correccion: Correccion | null
}

export interface Correccion {
  correcta: boolean
  opcionCorrecta: number
  explicacion: string
  referencia: string | null
}

export interface RevisionPregunta extends Correccion {
  posicion: number
  /** null si quedó sin responder. */
  opcion: number | null
}

export interface ResultadoEvaluacion {
  puntaje: number
  correctas: number
  total: number
  aprobada: boolean
  aprobacion: number
  duracionSegundos: number
  revision: RevisionPregunta[]
}

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
  sin_sesion: "Tu sesión se cerró. Inicia sesión de nuevo para presentar la evaluación.",
  sin_conexion: "No hay conexión. Revisa tu internet y vuelve a intentarlo.",
  no_disponible: "Esta evaluación no está disponible en este momento.",
  demasiados_intentos: "Presentaste muchos intentos en la última hora. Descansa un rato y vuelve a intentarlo.",
  intento_vencido: "Este intento venció. Empieza uno nuevo.",
  intento_no_encontrado: "No encontramos este intento. Empieza uno nuevo.",
  respuesta_invalida: "No pudimos registrar esa respuesta. Elige una opción y vuelve a intentarlo.",
  desconocido: "No pudimos procesar la evaluación. Vuelve a intentarlo en un momento.",
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
  if (/sesion_vencida|sesion_terminada/.test(texto)) return new ErrorEvaluacion("intento_vencido", error)
  if (/sesion_no_encontrada/.test(texto)) return new ErrorEvaluacion("intento_no_encontrado", error)
  if (/evaluacion_no_disponible|banco_vacio/.test(texto)) return new ErrorEvaluacion("no_disponible", error)
  if (/posicion_invalida|opcion_invalida/.test(texto)) return new ErrorEvaluacion("respuesta_invalida", error)
  if (/unauthorized|JWT|not authenticated|permission denied/i.test(texto)) return new ErrorEvaluacion("sin_sesion", error)
  if (error instanceof TypeError || /Failed to fetch|NetworkError|fetch failed|Load failed/i.test(texto)) {
    return new ErrorEvaluacion("sin_conexion", error)
  }
  return new ErrorEvaluacion("desconocido", error)
}

// ─── Validación de lo que llega del servidor ─────────────────────────────────

type Crudo = Record<string, unknown>

function esObjeto(v: unknown): v is Crudo {
  return typeof v === "object" && v !== null && !Array.isArray(v)
}

function entero(v: unknown): number {
  if (typeof v !== "number" || !Number.isInteger(v)) throw new Error("se esperaba un entero")
  return v
}

function texto(v: unknown): string {
  if (typeof v !== "string") throw new Error("se esperaba texto")
  return v
}

function textoONulo(v: unknown): string | null {
  return v === null || v === undefined ? null : texto(v)
}

function correccionDe(o: Crudo): Correccion {
  return {
    correcta: o.correcta === true,
    opcionCorrecta: entero(o.opcion_correcta),
    explicacion: typeof o.explicacion === "string" ? o.explicacion : "",
    referencia: textoONulo(o.referencia),
  }
}

export function leerSesion(datos: unknown): SesionEvaluacion {
  if (!esObjeto(datos) || !Array.isArray(datos.preguntas)) throw new Error("sesión con forma inesperada")
  const retro = datos.retroalimentacion
  if (retro !== "inmediata" && retro !== "al_final") throw new Error("retroalimentación desconocida")
  return {
    id: texto(datos.sesion),
    venceEn: texto(datos.vence_en),
    retroalimentacion: retro,
    aprobacion: entero(datos.aprobacion),
    preguntas: datos.preguntas.map((p) => {
      if (!esObjeto(p) || !Array.isArray(p.opciones)) throw new Error("pregunta con forma inesperada")
      return {
        posicion: entero(p.posicion),
        enunciado: texto(p.enunciado),
        opciones: p.opciones.map(texto),
        tema: textoONulo(p.tema),
      }
    }),
  }
}

export function leerRespuesta(datos: unknown): RespuestaRegistrada {
  if (!esObjeto(datos)) throw new Error("respuesta con forma inesperada")
  return {
    posicion: entero(datos.posicion),
    opcion: entero(datos.opcion),
    correccion: "opcion_correcta" in datos ? correccionDe(datos) : null,
  }
}

export function leerResultado(datos: unknown): ResultadoEvaluacion {
  if (!esObjeto(datos) || !Array.isArray(datos.revision)) throw new Error("resultado con forma inesperada")
  return {
    puntaje: entero(datos.puntaje),
    correctas: entero(datos.correctas),
    total: entero(datos.total),
    aprobada: datos.aprobada === true,
    aprobacion: entero(datos.aprobacion),
    duracionSegundos: entero(datos.duracion_segundos),
    revision: datos.revision.map((r) => {
      if (!esObjeto(r)) throw new Error("revisión con forma inesperada")
      return {
        ...correccionDe(r),
        posicion: entero(r.posicion),
        opcion: r.opcion === null || r.opcion === undefined ? null : entero(r.opcion),
      }
    }),
  }
}

// ─── Llamadas ────────────────────────────────────────────────────────────────

async function llamar<T>(funcion: string, parametros: Record<string, unknown>, leer: (d: unknown) => T): Promise<T> {
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

export function iniciarEvaluacion(clave: ClaveEvaluacion): Promise<SesionEvaluacion> {
  return llamar("evaluacion_iniciar", { p_evaluacion: clave }, leerSesion)
}

export function responderPregunta(sesion: string, posicion: number, opcion: number): Promise<RespuestaRegistrada> {
  return llamar("evaluacion_responder", { p_sesion: sesion, p_posicion: posicion, p_opcion: opcion }, leerRespuesta)
}

export function terminarEvaluacion(sesion: string): Promise<ResultadoEvaluacion> {
  return llamar("evaluacion_terminar", { p_sesion: sesion }, leerResultado)
}
