import { beforeEach, describe, expect, it, vi } from "vitest"

const { maybeSingle, eq, upsert, from, reportarError } = vi.hoisted(() => {
  const maybeSingle = vi.fn()
  const eq = vi.fn(() => ({ maybeSingle }))
  const upsert = vi.fn(() => Promise.resolve({ error: null }))
  const from = vi.fn(() => ({ select: () => ({ eq }), upsert }))
  return { maybeSingle, eq, upsert, from, reportarError: vi.fn() }
})
vi.mock("@/integrations/supabase/client", () => ({ supabase: { from } }))
vi.mock("@/lib/errores", () => ({ reportarError }))

import {
  guardarPlanDeEstudio,
  hoyTocaEstudiar,
  resumirPlan,
  traerPlanDeEstudio,
  zonaDelEquipo,
  type PlanDeEstudio,
} from "./planDeEstudio"

const PLAN: PlanDeEstudio = { dias: [2, 4], hora: "20:00", zona: "America/Bogota", minutosMeta: 25 }

beforeEach(() => {
  vi.clearAllMocks()
  maybeSingle.mockResolvedValue({ data: null, error: null })
})

describe("leer el plan", () => {
  it("recorta la hora de Postgres a lo que le importa al piloto", async () => {
    maybeSingle.mockResolvedValue({
      data: { dias: [2, 4], hora: "20:00:00", zona: "America/Bogota", minutos_meta: 25 },
      error: null,
    })

    expect(await traerPlanDeEstudio("piloto-1")).toEqual(PLAN)
    expect(from).toHaveBeenCalledWith("plan_de_estudio")
    expect(eq).toHaveBeenCalledWith("user_id", "piloto-1")
  })

  it("sin plan devuelve null, que la pantalla lee como «ofrécele ponerlo»", async () => {
    expect(await traerPlanDeEstudio("piloto-1")).toBeNull()
  })

  it("si la consulta falla no rompe la pantalla: null y aviso degradado", async () => {
    maybeSingle.mockResolvedValue({ data: null, error: { message: "sin conexión" } })
    const avisos = vi.spyOn(console, "warn").mockImplementation(() => {})

    expect(await traerPlanDeEstudio("piloto-1")).toBeNull()
    expect(avisos).toHaveBeenCalled()
    expect(reportarError).not.toHaveBeenCalled()
    avisos.mockRestore()
  })
})

describe("guardar el plan", () => {
  it("manda los días ordenados y no toca total_hours ni nada del piloto", async () => {
    await guardarPlanDeEstudio("piloto-1", { ...PLAN, dias: [4, 2, 0] })

    expect(upsert).toHaveBeenCalledWith(
      {
        user_id: "piloto-1",
        dias: [0, 2, 4],
        hora: "20:00",
        zona: "America/Bogota",
        minutos_meta: 25,
      },
      { onConflict: "user_id" },
    )
  })

  it("un plan sin días no sale a la red", async () => {
    await expect(guardarPlanDeEstudio("piloto-1", { ...PLAN, dias: [] })).rejects.toThrow(/al menos un día/)
    expect(upsert).not.toHaveBeenCalled()
  })

  it("si la base falla lo reporta y lo dice en español", async () => {
    upsert.mockResolvedValueOnce({ error: { message: "sin permiso" } } as never)

    await expect(guardarPlanDeEstudio("piloto-1", PLAN)).rejects.toThrow(/No pudimos guardar/)
    expect(reportarError).toHaveBeenCalled()
  })
})

describe("cómo se lee el plan", () => {
  it("junta los días con «y», no con coma serial", () => {
    expect(resumirPlan({ ...PLAN, dias: [1, 3, 5] })).toBe("lunes, miércoles y viernes a las 20:00")
  })

  it("con un solo día no inventa conjunción", () => {
    expect(resumirPlan({ ...PLAN, dias: [3] })).toBe("miércoles a las 20:00")
  })

  it("los ordena de lunes a domingo, no por el número de la base", () => {
    expect(resumirPlan({ ...PLAN, dias: [0, 1] })).toBe("lunes y domingo a las 20:00")
  })
})

describe("si hoy toca", () => {
  // Miércoles 16 de septiembre de 2026, 02:00 UTC. En Bogotá (UTC-5) todavía es
  // martes 15: por eso la zona del piloto no es un adorno.
  const miercolesUtc = new Date("2026-09-16T02:00:00Z")

  it("usa la zona del piloto y no la del servidor", () => {
    expect(hoyTocaEstudiar({ ...PLAN, dias: [2], zona: "America/Bogota" }, miercolesUtc)).toBe(true)
    expect(hoyTocaEstudiar({ ...PLAN, dias: [3], zona: "America/Bogota" }, miercolesUtc)).toBe(false)
    expect(hoyTocaEstudiar({ ...PLAN, dias: [3], zona: "Europe/Madrid" }, miercolesUtc)).toBe(true)
  })
})

describe("la zona del equipo", () => {
  it("siempre devuelve algo con lo que la base pueda calcular", () => {
    expect(zonaDelEquipo().length).toBeGreaterThan(0)
  })
})
