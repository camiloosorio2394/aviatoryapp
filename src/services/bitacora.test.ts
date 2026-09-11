import { describe, expect, it, vi } from "vitest"

const { maybeSingle, eq, from } = vi.hoisted(() => {
  const maybeSingle = vi.fn()
  const eq = vi.fn(() => ({ maybeSingle }))
  const from = vi.fn(() => ({ select: () => ({ eq }) }))
  return { maybeSingle, eq, from }
})
vi.mock("@/integrations/supabase/client", () => ({ supabase: { from } }))

import { leerIcaoProgress } from "@/lib/icaoProgress"
import { RESUMEN_BITACORA_VACIO, traerResumenBitacora } from "./bitacora"

describe("resumen de la bitácora", () => {
  it("lee la fila del piloto en la vista, no sus vuelos", async () => {
    maybeSingle.mockResolvedValue({
      data: {
        vuelos: 1204,
        minutos_total: 108360,
        minutos_pic: 72240,
        minutos_sic: 36120,
        minutos_ifr: 18060,
        minutos_noche: 18060,
        minutos_travesia: 54180,
        aterrizajes: 1806,
        ultimo_vuelo: "2026-09-10",
      },
      error: null,
    })
    const { resumen, error } = await traerResumenBitacora("piloto")

    expect(from).toHaveBeenCalledWith("bitacora_resumen")
    expect(eq).toHaveBeenCalledWith("user_id", "piloto")
    expect(error).toBeNull()
    expect(resumen).toMatchObject({ vuelos: 1204, minutosTotal: 108360, minutosTravesia: 54180, ultimoVuelo: "2026-09-10" })
  })

  it("sin vuelos no hay fila y el resumen sale en cero", async () => {
    maybeSingle.mockResolvedValue({ data: null, error: null })
    expect((await traerResumenBitacora("nuevo")).resumen).toEqual(RESUMEN_BITACORA_VACIO)
  })
})

describe("avance de Inglés ICAO", () => {
  const valido = {
    quiz_respondidas: 7,
    quiz_total: 30,
    vocabulario_total: 351,
    interview_respondidas: 1,
    simulacros: 2,
    mejor_nivel: 4,
  }

  it("convierte lo que devuelve icao_progreso()", () => {
    expect(leerIcaoProgress(valido)).toEqual({
      quizRespondidas: 7,
      quizTotal: 30,
      vocabularioTotal: 351,
      interviewRespondidas: 1,
      simulacros: 2,
      mejorNivel: 4,
    })
    expect(leerIcaoProgress({ ...valido, mejor_nivel: null }).mejorNivel).toBeNull()
  })

  it("rechaza una forma distinta en vez de mostrar ceros", () => {
    expect(() => leerIcaoProgress({ ...valido, quiz_respondidas: "7" })).toThrow("quiz_respondidas")
    expect(() => leerIcaoProgress(null)).toThrow()
  })
})
