import { beforeEach, describe, expect, it, vi } from "vitest"
import type { TestItem } from "@/lib/initialTest"

const rpc = vi.hoisted(() => vi.fn())
const from = vi.hoisted(() => vi.fn())
vi.mock("@/integrations/supabase/client", () => ({ supabase: { rpc, from } }))

const { buildInitialTest, gradeItem } = await import("@/lib/initialTest")
const { ErrorEvaluacion } = await import("@/services/rpc")

/** Constructor de consultas encadenable que resuelve a `resultado`. */
function consulta(resultado: Promise<{ data: unknown; error: unknown }>) {
  const constructor: Record<string, unknown> = {
    then: (ok: (v: unknown) => unknown, ko?: (e: unknown) => unknown) => resultado.then(ok, ko),
  }
  for (const metodo of ["select", "eq", "limit"]) constructor[metodo] = () => constructor
  from.mockReturnValueOnce(constructor)
}

const base = { uid: "x", area: "icao", areaLabel: "Inglés ICAO", prompt: "¿?", options: [] }

beforeEach(() => {
  rpc.mockReset()
  from.mockReset()
})

describe("armado del test", () => {
  it("las preguntas de lectura ICAO viajan sin respuesta: se corrigen en el servidor", async () => {
    consulta(
      Promise.resolve({
        data: [
          { id: 3, topic: "weather", prompt: "Q3", context: null, options: { a: "x", b: "y" } },
          { id: 4, topic: "medical", prompt: "Q4", context: "ctx", options: { a: "x", b: "y" } },
        ],
        error: null,
      }),
    )
    rpc.mockResolvedValue({ data: [], error: null })

    const test = await buildInitialTest()
    const lectura = test.items.filter((i) => i.kind === "icao")

    expect(lectura.map((i) => i.kind === "icao" && i.preguntaId).sort()).toEqual([3, 4])
    expect(JSON.stringify(lectura)).not.toMatch(/correctAnswer|explanation/)
    expect(test.icaoCount).toBe(test.items.filter((i) => i.area === "icao").length)
  })

  it("si el banco ICAO no responde, el test no arranca a medias", async () => {
    consulta(Promise.resolve({ data: null, error: { message: "Failed to fetch" } }))
    await expect(buildInitialTest()).rejects.toBeInstanceOf(ErrorEvaluacion)
  })
})

describe("corrección", () => {
  it("lectura ICAO: la corrige icao_quiz_responder", async () => {
    rpc.mockResolvedValue({ data: { correcta: true, respuesta_correcta: "b", explicacion: "Porque sí." }, error: null })
    const item: TestItem = { ...base, kind: "icao", preguntaId: 9 }

    expect(await gradeItem(item, "b")).toEqual({
      uid: "x",
      area: "icao",
      correct: true,
      correctAnswer: "b",
      explanation: "Porque sí.",
    })
    expect(rpc).toHaveBeenCalledWith("icao_quiz_responder", { p_pregunta: 9, p_respuesta: "b" })
  })

  it("materia PCA: la corrige vault_submit_answer con el token de la sesión", async () => {
    rpc.mockResolvedValue({
      data: [{ is_correct: false, correct_answer: "c", explanation: null, pedagogical_note: null, questions_remaining: 1 }],
      error: null,
    })
    const item: TestItem = { ...base, area: "meteorologia", kind: "vault", token: "t-1", position: 2 }

    const g = await gradeItem(item, "a")
    expect(rpc).toHaveBeenCalledWith("vault_submit_answer", { p_token: "t-1", p_position: 2, p_answer: "a" })
    expect(g).toMatchObject({ correct: false, correctAnswer: "c", explanation: null })
  })

  it("un fallo del servidor no cuenta como respuesta incorrecta", async () => {
    rpc.mockResolvedValue({ data: null, error: { message: "session_expired" } })
    const item: TestItem = { ...base, area: "meteorologia", kind: "vault", token: "t-1", position: 2 }

    const error = await gradeItem(item, "a").catch((e: unknown) => e)
    expect(error).toBeInstanceOf(ErrorEvaluacion)
    expect((error as InstanceType<typeof ErrorEvaluacion>).codigo).toBe("intento_vencido")
  })

  it("audio: se corrige en la app, sin llamar al servidor", async () => {
    const item: TestItem = {
      ...base,
      kind: "audio",
      audioUrl: "/a.mp3",
      correctAnswer: "A",
      explanation: "Es el piloto.",
    }
    expect(await gradeItem(item, "B")).toMatchObject({ correct: false, correctAnswer: "A" })
    expect(rpc).not.toHaveBeenCalled()
  })
})
