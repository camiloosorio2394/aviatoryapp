import { beforeEach, describe, expect, it, vi } from "vitest"

const { maybeSingle, eq, from } = vi.hoisted(() => {
  const maybeSingle = vi.fn()
  const eq = vi.fn(() => ({ maybeSingle }))
  const from = vi.fn(() => ({ select: () => ({ eq }) }))
  return { maybeSingle, eq, from }
})
vi.mock("@/integrations/supabase/client", () => ({ supabase: { from } }))

import { esDeEsteMes, traerEstadoDeRacha } from "./racha"

beforeEach(() => {
  vi.clearAllMocks()
  maybeSingle.mockResolvedValue({ data: null, error: null })
})

describe("el estado de la racha", () => {
  it("con la gracia de otro mes, el piloto vuelve a tenerla", async () => {
    maybeSingle.mockResolvedValue({
      data: { current_streak: 12, longest_streak: 30, gracia_usada_en: "2026-08-03" },
      error: null,
    })

    const racha = await traerEstadoDeRacha("piloto-1")

    expect(from).toHaveBeenCalledWith("streaks")
    expect(eq).toHaveBeenCalledWith("user_id", "piloto-1")
    expect(racha).toMatchObject({ dias: 12, masLarga: 30, graciaUsadaEn: "2026-08-03" })
  })

  it("sin fila devuelve null y la pantalla no dice nada de la racha", async () => {
    expect(await traerEstadoDeRacha("piloto-1")).toBeNull()
  })

  it("si la consulta falla no rompe la pantalla", async () => {
    maybeSingle.mockResolvedValue({ data: null, error: { message: "sin conexión" } })
    const avisos = vi.spyOn(console, "warn").mockImplementation(() => {})

    expect(await traerEstadoDeRacha("piloto-1")).toBeNull()
    expect(avisos).toHaveBeenCalled()
    avisos.mockRestore()
  })
})

describe("la gracia se repone cada mes", () => {
  // 1 de octubre de 2026, 02:00 UTC. En Bogotá todavía es 30 de septiembre: por
  // eso el mes se mide allá, que es donde la base cierra el día de la racha.
  const primeroDeOctubreUtc = new Date("2026-10-01T02:00:00Z")

  it("una gracia de septiembre sigue contando mientras en Bogotá sea septiembre", () => {
    expect(esDeEsteMes("2026-09-03", primeroDeOctubreUtc)).toBe(true)
  })

  it("una de agosto ya no", () => {
    expect(esDeEsteMes("2026-08-31", primeroDeOctubreUtc)).toBe(false)
  })

  it("sin gracia usada, no hay mes que comparar", () => {
    expect(esDeEsteMes(null, primeroDeOctubreUtc)).toBe(false)
  })
})
