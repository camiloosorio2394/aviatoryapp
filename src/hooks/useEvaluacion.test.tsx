import { StrictMode, act, useEffect } from "react"
import { createRoot, type Root } from "react-dom/client"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import type { ResultadoEvaluacion, SesionEvaluacion } from "@/services/evaluaciones"

const servicio = vi.hoisted(() => ({
  iniciarEvaluacion: vi.fn(),
  responderPregunta: vi.fn(),
  terminarEvaluacion: vi.fn(),
}))

vi.mock("@/services/evaluaciones", async (original) => ({
  ...(await original<typeof import("@/services/evaluaciones")>()),
  ...servicio,
}))

const { useEvaluacion } = await import("@/hooks/useEvaluacion")
const { ErrorEvaluacion } = await import("@/services/rpc")

;(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true

const sesion: SesionEvaluacion = {
  id: "sesion-1",
  venceEn: "2026-09-11T20:00:00Z",
  retroalimentacion: "al_final",
  aprobacion: 80,
  preguntas: [
    { posicion: 1, enunciado: "Uno", opciones: ["A", "B"], tema: null },
    { posicion: 2, enunciado: "Dos", opciones: ["A", "B"], tema: null },
  ],
}

const resultado: ResultadoEvaluacion = {
  puntaje: 50, correctas: 1, total: 2, aprobada: false, aprobacion: 80, duracionSegundos: 30, revision: [],
}

let ultimo: ReturnType<typeof useEvaluacion>
function Sonda({ alPintar }: { alPintar: (valor: ReturnType<typeof useEvaluacion>) => void }) {
  const valor = useEvaluacion("notam_evaluacion")
  useEffect(() => alPintar(valor))
  return null
}

function guardar(valor: ReturnType<typeof useEvaluacion>) {
  ultimo = valor
}

let raiz: Root
let contenedor: HTMLDivElement

async function montar(estricto = false) {
  contenedor = document.createElement("div")
  raiz = createRoot(contenedor)
  await act(async () => {
    raiz.render(estricto ? <StrictMode><Sonda alPintar={guardar} /></StrictMode> : <Sonda alPintar={guardar} />)
  })
}

describe("useEvaluacion", () => {
  beforeEach(() => {
    servicio.iniciarEvaluacion.mockReset().mockResolvedValue(sesion)
    servicio.responderPregunta.mockReset()
    servicio.terminarEvaluacion.mockReset()
  })
  afterEach(async () => {
    await act(async () => raiz.unmount())
  })

  it("arranca solo y queda en curso; en modo estricto no queda un intento viejo encima", async () => {
    await montar(true)
    expect(ultimo.estado).toEqual({ fase: "en_curso", sesion })
  })

  it("si el inicio falla muestra el error y reintentar vuelve a pedir la sesión", async () => {
    servicio.iniciarEvaluacion.mockReset().mockRejectedValueOnce(new ErrorEvaluacion("demasiados_intentos")).mockResolvedValue(sesion)
    await montar()
    expect(ultimo.estado.fase).toBe("error")
    await act(async () => ultimo.reiniciar())
    expect(ultimo.estado.fase).toBe("en_curso")
    expect(servicio.iniciarEvaluacion).toHaveBeenCalledTimes(2)
  })

  it("guarda la respuesta registrada; si falla, sigue en curso con el error a la vista", async () => {
    await montar()
    servicio.responderPregunta.mockResolvedValueOnce({ posicion: 1, opcion: 1, correccion: null })
    await act(async () => {
      await ultimo.responder(1, 1)
    })
    expect(ultimo.respuestas[1]).toEqual({ posicion: 1, opcion: 1, correccion: null })
    expect(servicio.responderPregunta).toHaveBeenCalledWith("sesion-1", 1, 1)

    servicio.responderPregunta.mockRejectedValueOnce(new ErrorEvaluacion("sin_conexion"))
    await act(async () => {
      await ultimo.responder(2, 0)
    })
    expect(ultimo.estado.fase).toBe("en_curso")
    expect(ultimo.errorAccion?.codigo).toBe("sin_conexion")
    expect(ultimo.enviando).toBe(false)
  })

  it("terminar deja el resultado; si falla, vuelve a en curso para reintentar", async () => {
    await montar()
    servicio.terminarEvaluacion.mockRejectedValueOnce(new ErrorEvaluacion("sin_conexion")).mockResolvedValueOnce(resultado)
    await act(async () => {
      await ultimo.terminar()
    })
    expect(ultimo.estado.fase).toBe("en_curso")
    expect(ultimo.errorAccion?.codigo).toBe("sin_conexion")

    await act(async () => {
      await ultimo.terminar()
    })
    expect(ultimo.estado).toEqual({ fase: "terminada", sesion, resultado })
    expect(ultimo.errorAccion).toBeNull()
  })
})
