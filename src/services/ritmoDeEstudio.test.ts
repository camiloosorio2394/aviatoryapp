import { beforeEach, describe, expect, it, vi } from "vitest"

const { maybeSingle, gte, from } = vi.hoisted(() => {
  const maybeSingle = vi.fn()
  const eqEstado = vi.fn(() => ({ maybeSingle }))
  const gte = vi.fn()
  const eqActividad = vi.fn(() => ({ gte }))
  const from = vi.fn((tabla: string) =>
    tabla === "pilot_state"
      ? { select: () => ({ eq: eqEstado }) }
      : { select: () => ({ eq: eqActividad }) },
  )
  return { maybeSingle, gte, from }
})
vi.mock("@/integrations/supabase/client", () => ({ supabase: { from } }))

import {
  diasHastaLaFecha,
  diasPrometidos,
  DIAS_DE_LA_VENTANA,
  traerRitmoDeEstudio,
} from "./ritmoDeEstudio"

beforeEach(() => {
  vi.clearAllMocks()
  maybeSingle.mockResolvedValue({ data: { target_date: "2026-12-01" }, error: null })
  gte.mockResolvedValue({ data: [{ date: "2026-09-01" }, { date: "2026-09-03" }], error: null })
})

describe("traer el ritmo", () => {
  it("cuenta los días con actividad de la ventana, no las actividades", async () => {
    expect(await traerRitmoDeEstudio("piloto-1")).toEqual({
      fechaObjetivo: "2026-12-01",
      diasEstudiados: 2,
    })
    expect(from).toHaveBeenCalledWith("pilot_state")
    expect(from).toHaveBeenCalledWith("daily_activity")
  })

  it("sin fecha objetivo sigue devolviendo el ritmo", async () => {
    maybeSingle.mockResolvedValue({ data: {}, error: null })
    expect(await traerRitmoDeEstudio("piloto-1")).toEqual({ fechaObjetivo: null, diasEstudiados: 2 })
  })

  it("si algo falla no rompe la pantalla: null y aviso degradado", async () => {
    gte.mockResolvedValue({ data: null, error: { message: "sin conexión" } })
    const avisos = vi.spyOn(console, "warn").mockImplementation(() => {})

    expect(await traerRitmoDeEstudio("piloto-1")).toBeNull()
    expect(avisos).toHaveBeenCalled()
    avisos.mockRestore()
  })
})

describe("los días hasta la fecha", () => {
  const primeroDeSeptiembre = new Date(2026, 8, 1, 22, 0, 0)

  it("cuenta días de calendario, no las horas que falten", () => {
    expect(diasHastaLaFecha("2026-09-10", primeroDeSeptiembre)).toBe(9)
  })

  it("una fecha que ya pasó sale negativa, no cero", () => {
    expect(diasHastaLaFecha("2026-08-20", primeroDeSeptiembre)).toBe(-12)
  })

  it("sin fecha no hay cuenta que hacer", () => {
    expect(diasHastaLaFecha(null, primeroDeSeptiembre)).toBeNull()
  })
})

describe("lo que el plan promete", () => {
  it("tres días por semana son doce en la ventana", () => {
    expect(diasPrometidos([1, 3, 5])).toBe(12)
    expect(DIAS_DE_LA_VENTANA).toBe(28)
  })

  it("todos los días son los de la ventana entera", () => {
    expect(diasPrometidos([0, 1, 2, 3, 4, 5, 6])).toBe(28)
  })
})
