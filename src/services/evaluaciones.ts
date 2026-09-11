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

import { entero, esObjeto, llamarRpc, texto, textoONulo, type Crudo } from "@/services/rpc"

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

// ─── Validación de lo que llega del servidor ─────────────────────────────────

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

export function iniciarEvaluacion(clave: ClaveEvaluacion): Promise<SesionEvaluacion> {
  return llamarRpc("evaluacion_iniciar", { p_evaluacion: clave }, leerSesion)
}

export function responderPregunta(sesion: string, posicion: number, opcion: number): Promise<RespuestaRegistrada> {
  return llamarRpc("evaluacion_responder", { p_sesion: sesion, p_posicion: posicion, p_opcion: opcion }, leerRespuesta)
}

export function terminarEvaluacion(sesion: string): Promise<ResultadoEvaluacion> {
  return llamarRpc("evaluacion_terminar", { p_sesion: sesion }, leerResultado)
}
