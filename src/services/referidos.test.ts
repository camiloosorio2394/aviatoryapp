import { beforeEach, describe, expect, it, vi } from "vitest"

const rpc = vi.hoisted(() => vi.fn())
vi.mock("@/integrations/supabase/client", () => ({ supabase: { rpc } }))

import { traerEstadisticasDeReferidos } from "./referidos"

const FILA = { my_code: "NICO7", total_referred: 4, active_referred: 2 }

beforeEach(() => {
  vi.clearAllMocks()
})

describe("estadísticas de referidos", () => {
  it("acepta la fila suelta y dentro de un arreglo", async () => {
    rpc.mockResolvedValue({ data: FILA, error: null })
    expect(await traerEstadisticasDeReferidos()).toEqual(FILA)

    rpc.mockResolvedValue({ data: [FILA], error: null })
    expect(await traerEstadisticasDeReferidos()).toEqual(FILA)
    expect(rpc).toHaveBeenCalledWith("get_referral_stats")
  })

  it("sin datos devuelve null y la pantalla muestra un guion", async () => {
    rpc.mockResolvedValue({ data: null, error: null })
    expect(await traerEstadisticasDeReferidos()).toBeNull()

    rpc.mockResolvedValue({ data: [], error: null })
    expect(await traerEstadisticasDeReferidos()).toBeNull()
  })
})
