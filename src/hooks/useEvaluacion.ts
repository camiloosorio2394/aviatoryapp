import { useCallback, useEffect, useRef, useState } from "react"
import {
  iniciarEvaluacion,
  responderPregunta,
  terminarEvaluacion,
  type ClaveEvaluacion,
  type RespuestaRegistrada,
  type ResultadoEvaluacion,
  type SesionEvaluacion,
} from "@/services/evaluaciones"
import { clasificarError, type ErrorEvaluacion } from "@/services/rpc"

/**
 * Un intento de evaluación, de principio a fin.
 *
 * Arranca solo al montar. Las pantallas deciden cómo se ve cada fase; aquí vive
 * el orden de las llamadas y qué hacer si una falla:
 *   - si falla el inicio, la fase es "error" y se ofrece reintentar;
 *   - si falla una respuesta o el cierre, el intento sigue en curso y
 *     `errorAccion` dice qué pasó (el servidor es idempotente: reintentar no
 *     duplica nada).
 */
export type EstadoEvaluacion =
  | { fase: "iniciando" }
  | { fase: "en_curso"; sesion: SesionEvaluacion }
  | { fase: "terminando"; sesion: SesionEvaluacion }
  | { fase: "terminada"; sesion: SesionEvaluacion; resultado: ResultadoEvaluacion }
  | { fase: "error"; error: ErrorEvaluacion }

export function useEvaluacion(clave: ClaveEvaluacion) {
  const [estado, setEstado] = useState<EstadoEvaluacion>({ fase: "iniciando" })
  const [respuestas, setRespuestas] = useState<Record<number, RespuestaRegistrada>>({})
  const [enviando, setEnviando] = useState(false)
  const [errorAccion, setErrorAccion] = useState<ErrorEvaluacion | null>(null)
  // Cada intento tiene su número. Lo que llegue tarde de uno anterior se
  // descarta en vez de pisar el intento actual.
  const intento = useRef(0)

  const arrancar = useCallback(
    async (numero: number) => {
      try {
        const sesion = await iniciarEvaluacion(clave)
        if (numero === intento.current) setEstado({ fase: "en_curso", sesion })
      } catch (error) {
        if (numero === intento.current) setEstado({ fase: "error", error: clasificarError(error) })
      }
    },
    [clave],
  )

  // Sin limpieza: en modo estricto el segundo arranque sube el número y el
  // primero se descarta solo; tras desmontar, lo que llegue ya no pinta nada.
  useEffect(() => {
    void arrancar(++intento.current)
  }, [arrancar])

  const reiniciar = useCallback(() => {
    const numero = ++intento.current
    setEstado({ fase: "iniciando" })
    setRespuestas({})
    setEnviando(false)
    setErrorAccion(null)
    void arrancar(numero)
  }, [arrancar])

  const responder = useCallback(
    async (posicion: number, opcion: number): Promise<RespuestaRegistrada | null> => {
      if (estado.fase !== "en_curso") return null
      const numero = intento.current
      setEnviando(true)
      setErrorAccion(null)
      try {
        const respuesta = await responderPregunta(estado.sesion.id, posicion, opcion)
        if (numero !== intento.current) return null
        setRespuestas((previas) => ({ ...previas, [respuesta.posicion]: respuesta }))
        return respuesta
      } catch (error) {
        if (numero === intento.current) setErrorAccion(clasificarError(error))
        return null
      } finally {
        if (numero === intento.current) setEnviando(false)
      }
    },
    [estado],
  )

  const terminar = useCallback(async (): Promise<ResultadoEvaluacion | null> => {
    if (estado.fase !== "en_curso") return null
    const { sesion } = estado
    const numero = intento.current
    setEstado({ fase: "terminando", sesion })
    setErrorAccion(null)
    try {
      const resultado = await terminarEvaluacion(sesion.id)
      if (numero === intento.current) setEstado({ fase: "terminada", sesion, resultado })
      return resultado
    } catch (error) {
      if (numero === intento.current) {
        setEstado({ fase: "en_curso", sesion })
        setErrorAccion(clasificarError(error))
      }
      return null
    }
  }, [estado])

  return { estado, respuestas, enviando, errorAccion, responder, terminar, reiniciar }
}
