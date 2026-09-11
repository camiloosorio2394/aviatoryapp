import { useCallback, useRef, useState } from "react"
import { calcularResultado, type ResultadoPsico } from "@/lib/psicotecnicas"
import { anotarSesionLocal } from "@/lib/psicotecnicasProgress"
import {
  aplazarPsico,
  iniciarPsico,
  responderPsico,
  terminarPsico,
  type CorreccionPsico,
  type ItemRepaso,
  type ParametrosPsico,
  type ResultadoPsicoServidor,
  type SesionPsico,
} from "@/services/psicotecnicas"
import { clasificarError, type ErrorEvaluacion } from "@/services/rpc"

/**
 * Una tanda de psicotécnicas contra el servidor, de la configuración al informe.
 *
 * Las respuestas viajan en una cola, en orden, porque el servidor mide el tiempo
 * de cada una desde la anterior. Dos formas de responder:
 *   - `corregir`, que espera la corrección: la usa el entrenamiento;
 *   - `registrar`, que no espera: en evaluación y simulación el piloto pasa al
 *     siguiente ejercicio al instante y la respuesta sale detrás (con dos
 *     reintentos si falla la red).
 * `terminar` espera a que la cola se vacíe antes de pedir la nota.
 */
export type EstadoPsico =
  | { fase: "configurando" }
  | { fase: "iniciando"; parametros: ParametrosPsico }
  | { fase: "en_curso"; sesion: SesionPsico }
  | { fase: "terminando"; sesion: SesionPsico }
  | { fase: "terminada"; sesion: SesionPsico; resultado: ResultadoPsico; servidor: ResultadoPsicoServidor }
  | { fase: "error"; error: ErrorEvaluacion; parametros: ParametrosPsico }

const REINTENTOS = 2

function esperar(ms: number): Promise<void> {
  return new Promise((listo) => setTimeout(listo, ms))
}

async function conReintentos<T>(tarea: () => Promise<T>): Promise<T> {
  for (let intento = 0; ; intento++) {
    try {
      return await tarea()
    } catch (error) {
      const clasificado = clasificarError(error)
      if (clasificado.codigo !== "sin_conexion" || intento >= REINTENTOS) throw clasificado
      await esperar(600 * (intento + 1))
    }
  }
}

/** El informe usa las cifras del servidor; lo demás (tiempos, familias) sale de sus respuestas. */
export function resultadoDelServidor(servidor: ResultadoPsicoServidor): ResultadoPsico {
  return {
    ...calcularResultado(servidor.respuestas),
    porcentaje: servidor.porcentaje,
    precision: servidor.porcentaje,
    velocidad: servidor.velocidad,
    global: servidor.global,
  }
}

export function useSesionPsico() {
  const [estado, setEstado] = useState<EstadoPsico>({ fase: "configurando" })
  const [errorAccion, setErrorAccion] = useState<ErrorEvaluacion | null>(null)
  // Cada tanda tiene su número: lo que llegue tarde de una anterior se descarta.
  const tanda = useRef(0)
  const cola = useRef<Promise<unknown>>(Promise.resolve())

  const encolar = useCallback(<T,>(tarea: () => Promise<T>): Promise<T> => {
    const resultado = cola.current.then(tarea)
    cola.current = resultado.catch(() => undefined)
    return resultado
  }, [])

  const empezar = useCallback(async (parametros: ParametrosPsico) => {
    const numero = ++tanda.current
    cola.current = Promise.resolve()
    setErrorAccion(null)
    setEstado({ fase: "iniciando", parametros })
    try {
      const sesion = await iniciarPsico(parametros)
      if (numero === tanda.current) setEstado({ fase: "en_curso", sesion })
    } catch (error) {
      if (numero === tanda.current) setEstado({ fase: "error", error: clasificarError(error), parametros })
    }
  }, [])

  const corregir = useCallback(
    async (posicion: number, opcion: number, segundos: number): Promise<CorreccionPsico | null> => {
      if (estado.fase !== "en_curso") return null
      const { sesion } = estado
      const numero = tanda.current
      setErrorAccion(null)
      try {
        const respuesta = await encolar(() => responderPsico(sesion.id, posicion, opcion, segundos))
        return numero === tanda.current ? respuesta.correccion : null
      } catch (error) {
        if (numero === tanda.current) setErrorAccion(clasificarError(error))
        return null
      }
    },
    [estado, encolar],
  )

  const registrar = useCallback(
    (posicion: number, opcion: number | null, segundos: number): void => {
      if (estado.fase !== "en_curso") return
      const { sesion } = estado
      const numero = tanda.current
      encolar(() => conReintentos(() => responderPsico(sesion.id, posicion, opcion, segundos))).catch((error) => {
        if (numero === tanda.current) setErrorAccion(clasificarError(error))
      })
    },
    [estado, encolar],
  )

  const aplazar = useCallback(
    (posicion: number): void => {
      if (estado.fase !== "en_curso") return
      const { sesion } = estado
      const numero = tanda.current
      encolar(() => conReintentos(() => aplazarPsico(sesion.id, posicion))).catch((error) => {
        if (numero === tanda.current) setErrorAccion(clasificarError(error))
      })
    },
    [estado, encolar],
  )

  const terminar = useCallback(async (): Promise<void> => {
    if (estado.fase !== "en_curso" && estado.fase !== "terminando") return
    const { sesion } = estado
    const numero = tanda.current
    setEstado({ fase: "terminando", sesion })
    setErrorAccion(null)
    try {
      const servidor = await encolar(() => conReintentos(() => terminarPsico(sesion.id)))
      if (numero !== tanda.current) return
      const resultado = resultadoDelServidor(servidor)
      setEstado({ fase: "terminada", sesion, resultado, servidor })
      anotarSesionLocal(sesion.modo, resultado)
    } catch (error) {
      if (numero === tanda.current) setErrorAccion(clasificarError(error))
    }
  }, [estado, encolar])

  const volverAConfigurar = useCallback(() => {
    tanda.current++
    cola.current = Promise.resolve()
    setErrorAccion(null)
    setEstado({ fase: "configurando" })
  }, [])

  return { estado, errorAccion, empezar, corregir, registrar, aplazar, terminar, volverAConfigurar }
}

/**
 * Los ejercicios de la tanda con lo que se respondió y su solución, en el orden
 * en que se presentaron: lo que el informe usa para repasar los fallados.
 */
export function itemsDeRepaso(sesion: SesionPsico, servidor: ResultadoPsicoServidor): ItemRepaso[] {
  return sesion.ejercicios.flatMap((ejercicio) => {
    const solucion = servidor.soluciones.get(ejercicio.posicion)
    const respuesta = solucion && servidor.respuestas.find((r) => r.id === solucion.id)
    return respuesta && solucion ? [{ ejercicio, respuesta, solucion }] : []
  })
}
