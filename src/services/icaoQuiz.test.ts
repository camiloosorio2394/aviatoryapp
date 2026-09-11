import { beforeEach, describe, expect, it, vi } from "vitest"

const rpc = vi.hoisted(() => vi.fn())
const from = vi.hoisted(() => vi.fn())
vi.mock("@/integrations/supabase/client", () => ({ supabase: { rpc, from } }))

const { contarPreguntasIcao, leerCorreccionIcao, responderIcaoQuiz, traerPreguntasIcao } = await import(
  "@/services/icaoQuiz"
)
const { ErrorEvaluacion } = await import("@/services/rpc")

type Llamada = [metodo: string, ...args: unknown[]]

/** Imita el constructor de consultas de supabase-js: encadenable y "await"-able. */
function consulta(resultado: Promise<{ data: unknown; error: unknown }>) {
  const llamadas: Llamada[] = []
  const constructor: Record<string, unknown> = {
    then: (ok: (v: unknown) => unknown, ko?: (e: unknown) => unknown) => resultado.then(ok, ko),
  }
  for (const metodo of ["select", "eq", "limit"]) {
    constructor[metodo] = (...args: unknown[]) => {
      llamadas.push([metodo, ...args])
      return constructor
    }
  }
  from.mockReturnValueOnce(constructor)
  return llamadas
}

const fila = (id: number, topic = "weather") => ({
  id,
  topic,
  prompt: `Pregunta ${id}`,
  context: null,
  options: { a: "uno", b: "dos", c: "tres" },
})

beforeEach(() => {
  rpc.mockReset()
  from.mockReset()
})

describe("preguntas del quiz ICAO", () => {
  it("pide solo lo que se ve: nunca la opción correcta ni la explicación", async () => {
    const llamadas = consulta(Promise.resolve({ data: [fila(1)], error: null }))
    await traerPreguntasIcao(null, 10)

    expect(from).toHaveBeenCalledWith("icao_quiz_questions")
    const select = llamadas.find(([m]) => m === "select")
    expect(select?.[1]).toBe("id,topic,prompt,context,options")
    expect(JSON.stringify(llamadas)).not.toMatch(/correct_answer|explanation/)
    expect(llamadas).toContainEqual(["eq", "is_active", true])
    expect(llamadas.some(([m, col]) => m === "eq" && col === "topic")).toBe(false)
  })

  it("filtra por tema y corta la ronda al tamaño pedido", async () => {
    const llamadas = consulta(Promise.resolve({ data: [fila(1), fila(2), fila(3)], error: null }))
    const ronda = await traerPreguntasIcao("weather", 2)

    expect(llamadas).toContainEqual(["eq", "topic", "weather"])
    expect(ronda).toHaveLength(2)
    expect(new Set(ronda.map((p) => p.id)).size).toBe(2)
  })

  it("una fila con forma inesperada llega al piloto como error general", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {})
    vi.spyOn(console, "warn").mockImplementation(() => {})
    consulta(Promise.resolve({ data: [{ ...fila(1), options: null }], error: null }))
    const error = await traerPreguntasIcao(null, 10).catch((e: unknown) => e)
    expect(error).toBeInstanceOf(ErrorEvaluacion)
    expect((error as InstanceType<typeof ErrorEvaluacion>).codigo).toBe("desconocido")
  })

  it("sin red no es un banco vacío", async () => {
    consulta(Promise.reject(new TypeError("Failed to fetch")))
    const error = await traerPreguntasIcao(null, 10).catch((e: unknown) => e)
    expect((error as InstanceType<typeof ErrorEvaluacion>).codigo).toBe("sin_conexion")
  })

  it("cuenta por tema, con el total en all", async () => {
    consulta(Promise.resolve({ data: [{ topic: "weather" }, { topic: "weather" }, { topic: "medical" }], error: null }))
    expect(await contarPreguntasIcao()).toEqual({ all: 3, weather: 2, medical: 1 })
  })
})

describe("corrección en el servidor", () => {
  it("manda la pregunta y la opción, y devuelve lo que corrigió el servidor", async () => {
    rpc.mockResolvedValue({
      data: { correcta: false, respuesta_correcta: "a", explicacion: "Mayday es socorro." },
      error: null,
    })
    const c = await responderIcaoQuiz(7, "b")

    expect(rpc).toHaveBeenCalledWith("icao_quiz_responder", { p_pregunta: 7, p_respuesta: "b" })
    expect(c).toEqual({ correcta: false, respuestaCorrecta: "a", explicacion: "Mayday es socorro." })
  })

  it("traduce los errores del servidor a mensajes para el piloto", async () => {
    const casos: [string, string][] = [
      ["demasiados_intentos", "demasiados_intentos"],
      ["opcion_invalida", "respuesta_invalida"],
      ["pregunta_no_encontrada", "no_disponible"],
      ["sin_sesion", "sin_sesion"],
    ]
    for (const [mensaje, codigo] of casos) {
      rpc.mockResolvedValueOnce({ data: null, error: { message: mensaje, code: "P0001" } })
      const error = await responderIcaoQuiz(1, "a").catch((e: unknown) => e)
      expect((error as InstanceType<typeof ErrorEvaluacion>).codigo).toBe(codigo)
    }
  })

  it("rechaza una corrección sin el veredicto", () => {
    expect(() => leerCorreccionIcao({ respuesta_correcta: "a", explicacion: null })).toThrow()
    expect(leerCorreccionIcao({ correcta: true, respuesta_correcta: "c", explicacion: null })).toEqual({
      correcta: true,
      respuestaCorrecta: "c",
      explicacion: null,
    })
  })
})
