import { beforeEach, describe, expect, it, vi } from "vitest"

const { from, respuestas, ultimo } = vi.hoisted(() => {
  // Dos respuestas por tabla: la de la lista (`.select(cols, {count})`) y la
  // del máximo (`.select("score")`). Se distinguen por las columnas pedidas.
  const respuestas = new Map<string, unknown>()
  const ultimo: { columnas: string | null; orden: string | null; tope: number | null; cuenta: unknown } = {
    columnas: null,
    orden: null,
    tope: null,
    cuenta: null,
  }
  const hacer = (tabla: string, columnas: string) => {
    const clave = columnas === "score" ? `${tabla}:mejor` : `${tabla}:lista`
    const dame = () => respuestas.get(clave) ?? { data: null, error: null, count: null }
    const cadena: Record<string, unknown> = {
      then: (ok: (v: unknown) => unknown, mal?: (e: unknown) => unknown) => Promise.resolve(dame()).then(ok, mal),
      eq: () => cadena,
      order: (campo: string) => {
        if (columnas !== "score") ultimo.orden = campo
        return cadena
      },
      limit: (n: number) => {
        if (columnas !== "score") ultimo.tope = n
        return cadena
      },
    }
    return cadena
  }
  const from = vi.fn((tabla: string) => ({
    select: (columnas: string, opciones?: unknown) => {
      if (columnas !== "score") {
        ultimo.columnas = columnas
        ultimo.cuenta = opciones
      }
      return hacer(tabla, columnas)
    },
  }))
  return { from, respuestas, ultimo }
})
vi.mock("@/integrations/supabase/client", () => ({ supabase: { from } }))

const reportarError = vi.hoisted(() => vi.fn())
vi.mock("@/lib/errores", () => ({ reportarError }))

import {
  INTENTOS_EN_LA_LISTA,
  traerHistorialMercancias,
  traerHistorialNotam,
  traerMejorPuntaje,
} from "./intentosExamen"

beforeEach(() => {
  vi.clearAllMocks()
  respuestas.clear()
  ultimo.columnas = null
  ultimo.orden = null
  ultimo.tope = null
  ultimo.cuenta = null
})

describe("mejor puntaje de un módulo", () => {
  it("lee el primero, que viene ordenado de mayor a menor", async () => {
    respuestas.set("user_metar_exam_attempts:mejor", { data: [{ score: 88 }], error: null })

    expect(await traerMejorPuntaje("user_metar_exam_attempts", "piloto")).toEqual({ mejor: 88, error: null })
    expect(from).toHaveBeenCalledWith("user_metar_exam_attempts")
  })

  it("sin intentos, null y sin error", async () => {
    respuestas.set("user_notam_exam_attempts:mejor", { data: [], error: null })
    expect(await traerMejorPuntaje("user_notam_exam_attempts", "piloto")).toEqual({ mejor: null, error: null })
  })

  /**
   * El error viaja de vuelta porque las pantallas lo tratan distinto:
   * Meteorología sigue con su respaldo local y NOTAM para.
   */
  it("devuelve el error en vez de tragárselo", async () => {
    respuestas.set("user_notam_exam_attempts:mejor", { data: null, error: { message: "sin permiso" } })

    expect(await traerMejorPuntaje("user_notam_exam_attempts", "piloto")).toEqual({
      mejor: null,
      error: { message: "sin permiso" },
    })
    expect(reportarError).not.toHaveBeenCalled()
  })
})

describe("historial de NOTAM", () => {
  const FILA = {
    id: "a1",
    score: 92,
    correct_count: 23,
    total_questions: 25,
    passed: true,
    duration_seconds: 540,
    created_at: "2026-09-01T10:00:00Z",
  }

  it("trae la página reciente y el máximo aparte", async () => {
    respuestas.set("user_notam_exam_attempts:lista", { data: [FILA], error: null, count: 31 })
    respuestas.set("user_notam_exam_attempts:mejor", { data: [{ score: 96 }], error: null })

    const historial = await traerHistorialNotam("piloto")

    expect(historial).toEqual({ filas: [FILA], cuantos: 31, mejor: 96 })
    expect(ultimo.orden).toBe("created_at")
    expect(ultimo.tope).toBe(INTENTOS_EN_LA_LISTA)
    expect(ultimo.cuenta).toEqual({ count: "exact" })
  })

  /** Con más de diez intentos el mejor puede quedar fuera de la página. */
  it("el máximo no sale de la página, sale de su propia consulta", async () => {
    respuestas.set("user_notam_exam_attempts:lista", { data: [{ ...FILA, score: 70 }], error: null, count: 31 })
    respuestas.set("user_notam_exam_attempts:mejor", { data: [{ score: 96 }], error: null })

    expect((await traerHistorialNotam("piloto"))?.mejor).toBe(96)
  })

  it("sin `count` se cae al tamaño de la página", async () => {
    respuestas.set("user_notam_exam_attempts:lista", { data: [FILA], error: null, count: null })
    expect((await traerHistorialNotam("piloto"))?.cuantos).toBe(1)
  })

  it("si la lista falla devuelve null y lo reporta", async () => {
    respuestas.set("user_notam_exam_attempts:lista", { data: null, error: { message: "caído" }, count: null })

    expect(await traerHistorialNotam("piloto")).toBeNull()
    expect(reportarError).toHaveBeenCalledWith("NOTAM: historial de evaluación", { message: "caído" })
  })
})

describe("historial de Mercancías", () => {
  const FILA = { id: "b1", score: 80, correct: 16, total: 20, taken_at: "2026-09-02T10:00:00Z" }

  it("usa sus propias columnas y su propia fecha", async () => {
    respuestas.set("user_mercancias_exam_attempts:lista", { data: [FILA], error: null, count: 4 })
    respuestas.set("user_mercancias_exam_attempts:mejor", { data: [{ score: 85 }], error: null })

    expect(await traerHistorialMercancias("piloto")).toEqual({ filas: [FILA], cuantos: 4, mejor: 85 })
    expect(ultimo.columnas).toBe("id,score,correct,total,taken_at")
    expect(ultimo.orden).toBe("taken_at")
  })

  it("si la lista falla se reporta con su propio contexto", async () => {
    respuestas.set("user_mercancias_exam_attempts:lista", { data: null, error: { message: "caído" }, count: null })

    expect(await traerHistorialMercancias("piloto")).toBeNull()
    expect(reportarError).toHaveBeenCalledWith("mercancías: historial de evaluación", { message: "caído" })
  })
})
