import { beforeEach, describe, expect, it, vi } from "vitest"

const { from, respuestas, limite } = vi.hoisted(() => {
  const respuestas = new Map<string, unknown>()
  const limite: { valor: number | null } = { valor: null }
  const hacer = (tabla: string) => {
    const dame = () => respuestas.get(tabla) ?? { data: null, error: null }
    const cadena: Record<string, unknown> = {
      maybeSingle: () => Promise.resolve(dame()),
      then: (ok: (v: unknown) => unknown, mal?: (e: unknown) => unknown) => Promise.resolve(dame()).then(ok, mal),
      limit: (n: number) => {
        limite.valor = n
        return cadena
      },
    }
    for (const paso of ["eq", "order"]) cadena[paso] = () => cadena
    return cadena
  }
  return { from: vi.fn((tabla: string) => ({ select: () => hacer(tabla) })), respuestas, limite }
})
vi.mock("@/integrations/supabase/client", () => ({ supabase: { from } }))

const reportarError = vi.hoisted(() => vi.fn())
vi.mock("@/lib/errores", () => ({ reportarError }))

import {
  LIMITE_VOCABULARIO,
  traerPilotoParaEntrevista,
  traerPreguntasDeEntrevista,
  traerVocabulario,
} from "./ingles"

const TERMINO = {
  id: 1,
  term_en: "go-around",
  translation_es: "motor y al aire",
  definition: "Maniobra de aproximación frustrada.",
  category: "flight_ops" as const,
}

beforeEach(() => {
  vi.clearAllMocks()
  respuestas.clear()
  limite.valor = null
})

describe("vocabulario", () => {
  it("trae los términos activos, en orden y con su tope", async () => {
    respuestas.set("icao_vocabulary", { data: [TERMINO], error: null })

    expect(await traerVocabulario()).toEqual([TERMINO])
    expect(from).toHaveBeenCalledWith("icao_vocabulary")
    expect(limite.valor).toBe(LIMITE_VOCABULARIO)
  })

  it("si falla devuelve la lista vacía y lo reporta", async () => {
    respuestas.set("icao_vocabulary", { data: null, error: { message: "caído" } })

    expect(await traerVocabulario()).toEqual([])
    expect(reportarError).toHaveBeenCalledWith("vocabulario ICAO", { message: "caído" })
  })
})

describe("preguntas de entrevista", () => {
  const PREGUNTA = {
    id: 9,
    slug: "tell-me-about-yourself",
    question_text: "Tell me about yourself.",
    intent: "Romper el hielo",
    expected_topics: ["formación", "horas"],
    follow_ups: ["Why this airline?"],
    ideal_duration_seconds: 90,
    order_index: 1,
  }

  it("busca la categoría por slug y trae sus preguntas", async () => {
    respuestas.set("interview_sim_categories", { data: { id: 3 }, error: null })
    respuestas.set("interview_sim_questions", { data: [PREGUNTA], error: null })

    expect(await traerPreguntasDeEntrevista("intro_speaking")).toEqual([PREGUNTA])
    expect(from).toHaveBeenCalledWith("interview_sim_categories")
    expect(from).toHaveBeenCalledWith("interview_sim_questions")
  })

  it("sin categoría no se pregunta por las preguntas", async () => {
    respuestas.set("interview_sim_categories", { data: null, error: null })

    expect(await traerPreguntasDeEntrevista("no-existe")).toEqual([])
    expect(from).not.toHaveBeenCalledWith("interview_sim_questions")
    expect(reportarError).not.toHaveBeenCalled()
  })

  /** Son columnas JSON: si llegan con otra forma la pantalla no puede reventar. */
  it("una columna JSON con otra forma sale como lista vacía, no rompe", async () => {
    respuestas.set("interview_sim_categories", { data: { id: 3 }, error: null })
    respuestas.set("interview_sim_questions", {
      data: [{ ...PREGUNTA, expected_topics: null, follow_ups: "texto suelto" }],
      error: null,
    })

    const [pregunta] = await traerPreguntasDeEntrevista("intro_speaking")
    expect(pregunta.expected_topics).toEqual([])
    expect(pregunta.follow_ups).toEqual([])
  })

  it("si fallan las preguntas se reporta y la lista sale vacía", async () => {
    respuestas.set("interview_sim_categories", { data: { id: 3 }, error: null })
    respuestas.set("interview_sim_questions", { data: null, error: { message: "caído" } })

    expect(await traerPreguntasDeEntrevista("intro_speaking")).toEqual([])
    expect(reportarError).toHaveBeenCalledWith("entrevista: preguntas", { message: "caído" })
  })
})

describe("el piloto con el que se personaliza la entrevista", () => {
  it("junta pilot_state con el país, que vive en profiles", async () => {
    respuestas.set("pilot_state", {
      data: {
        stage: "cpl_ready",
        total_hours: 320,
        hours_pic: 180,
        target_airline: "Avianca",
        licenses: ["PPL", "CPL"],
      },
      error: null,
    })
    respuestas.set("profiles", { data: { country: "Colombia" }, error: null })

    expect(await traerPilotoParaEntrevista("piloto")).toEqual({
      stage: "cpl_ready",
      totalHours: 320,
      hoursPic: 180,
      targetAirline: "Avianca",
      licenses: ["PPL", "CPL"],
      country: "Colombia",
    })
  })

  it("sin fila devuelve null: las respuestas quedan genéricas en vez de inventadas", async () => {
    expect(await traerPilotoParaEntrevista("nuevo")).toBeNull()
  })

  it("una fila a medias no inventa ceros", async () => {
    respuestas.set("pilot_state", { data: { stage: "ppl" }, error: null })

    expect(await traerPilotoParaEntrevista("piloto")).toEqual({
      stage: "ppl",
      totalHours: null,
      hoursPic: null,
      targetAirline: null,
      licenses: null,
      country: null,
    })
  })

  /**
   * Nunca más en silencio: pedirle `country` a `pilot_state` hacía fallar la
   * consulta entera con 42703, el error se tragaba, y todo el mundo veía
   * respuestas genéricas sin que nadie se enterara.
   */
  it("si una de las dos consultas falla, se reporta y no se finge un perfil", async () => {
    respuestas.set("pilot_state", { data: null, error: { message: "42703" } })
    respuestas.set("profiles", { data: { country: "Colombia" }, error: null })

    expect(await traerPilotoParaEntrevista("piloto")).toBeNull()
    expect(reportarError).toHaveBeenCalledWith("entrevista: perfil del piloto", { message: "42703" })
  })

  it("sin pilot_state pero con país, el país igual llega", async () => {
    respuestas.set("profiles", { data: { country: "Colombia" }, error: null })

    expect(await traerPilotoParaEntrevista("piloto")).toMatchObject({ stage: null, country: "Colombia" })
  })
})
