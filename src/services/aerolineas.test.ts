import { beforeEach, describe, expect, it, vi } from "vitest"

const { from, respuestas } = vi.hoisted(() => {
  const respuestas = new Map<string, unknown>()
  const hacer = (tabla: string) => {
    const dame = () => respuestas.get(tabla) ?? { data: null, error: null }
    const cadena: Record<string, unknown> = {
      maybeSingle: () => Promise.resolve(dame()),
      then: (ok: (v: unknown) => unknown, mal?: (e: unknown) => unknown) => Promise.resolve(dame()).then(ok, mal),
    }
    for (const paso of ["eq", "order", "limit"]) cadena[paso] = () => cadena
    return cadena
  }
  return { from: vi.fn((tabla: string) => ({ select: () => hacer(tabla) })), respuestas }
})
vi.mock("@/integrations/supabase/client", () => ({ supabase: { from } }))

const traerResumenBitacora = vi.hoisted(() => vi.fn())
vi.mock("@/services/bitacora", async (original) => ({
  ...(await original<typeof import("./bitacora")>()),
  traerResumenBitacora,
}))

import { RESUMEN_BITACORA_VACIO } from "./bitacora"
import {
  armarPerfilDePiloto,
  traerAerolineasYPiloto,
  traerMejoresPuntajesDeExamen,
  type PilotStateRow,
} from "./aerolineas"

const DECLARADO: PilotStateRow = {
  total_hours: 300,
  hours_pic: 150,
  licenses: ["PPL", "CPL"],
  icao_english_level: 4,
}

const CON_VUELOS = { ...RESUMEN_BITACORA_VACIO, vuelos: 42, minutosTotal: 24000, minutosPic: 12000 }

beforeEach(() => {
  vi.clearAllMocks()
  respuestas.clear()
  traerResumenBitacora.mockResolvedValue({ resumen: RESUMEN_BITACORA_VACIO, error: null })
})

describe("la regla de prioridad del perfil", () => {
  it("con vuelos registrados manda la bitácora, no lo declarado", () => {
    expect(armarPerfilDePiloto(DECLARADO, CON_VUELOS, null)).toEqual({
      totalHours: 400,
      hoursPic: 200,
      icaoLevel: 4,
      licenses: ["PPL", "CPL"],
    })
  })

  it("sin vuelos se usa lo que declaró a mano", () => {
    expect(armarPerfilDePiloto(DECLARADO, RESUMEN_BITACORA_VACIO, null)).toMatchObject({
      totalHours: 300,
      hoursPic: 150,
    })
  })

  it("el simulacro TEA manda sobre la estimación del test inicial", () => {
    expect(armarPerfilDePiloto(DECLARADO, RESUMEN_BITACORA_VACIO, 5).icaoLevel).toBe(5)
  })

  it("un piloto sin nada no sale con ceros inventados", () => {
    expect(armarPerfilDePiloto(null, RESUMEN_BITACORA_VACIO, null)).toEqual({
      totalHours: null,
      hoursPic: null,
      icaoLevel: null,
      licenses: [],
    })
  })
})

describe("traer aerolíneas y perfil", () => {
  const AVIANCA = {
    id: 1,
    name: "Avianca",
    code: "AV",
    country: "Colombia",
    brand_color: "#D3202A",
    requirements: { min_hours_total: 500 },
    order_index: 1,
  }

  it("junta las aerolíneas con el perfil ya resuelto", async () => {
    respuestas.set("airlines", { data: [AVIANCA], error: null })
    respuestas.set("pilot_state", { data: DECLARADO, error: null })
    respuestas.set("user_icao_mock_results", { data: { final_level: 5 }, error: null })
    traerResumenBitacora.mockResolvedValue({ resumen: CON_VUELOS, error: null })

    const { aerolineas, piloto } = await traerAerolineasYPiloto("piloto")

    expect(aerolineas).toEqual([AVIANCA])
    expect(piloto).toEqual({ totalHours: 400, hoursPic: 200, icaoLevel: 5, licenses: ["PPL", "CPL"] })
  })

  it("sin sesión trae las aerolíneas igual, con el perfil vacío", async () => {
    respuestas.set("airlines", { data: [AVIANCA], error: null })

    const { aerolineas, piloto } = await traerAerolineasYPiloto(undefined)

    expect(aerolineas).toEqual([AVIANCA])
    expect(piloto).toEqual({ totalHours: null, hoursPic: null, icaoLevel: null, licenses: [] })
    expect(from).not.toHaveBeenCalledWith("pilot_state")
    expect(traerResumenBitacora).not.toHaveBeenCalled()
  })

  it("si el agregado de la bitácora falla se sigue con lo declarado, avisando", async () => {
    const avisos = vi.spyOn(console, "warn").mockImplementation(() => {})
    respuestas.set("airlines", { data: [AVIANCA], error: null })
    respuestas.set("pilot_state", { data: DECLARADO, error: null })
    traerResumenBitacora.mockResolvedValue({ resumen: RESUMEN_BITACORA_VACIO, error: { message: "sin vista" } })

    const { piloto } = await traerAerolineasYPiloto("piloto")

    expect(piloto.totalHours).toBe(300)
    expect(avisos).toHaveBeenCalledWith("aerolíneas: bitacora_resumen", "sin vista")
    avisos.mockRestore()
  })
})

describe("mejores puntajes de examen", () => {
  it("lee el primero de cada tabla, que viene ordenado de mayor a menor", async () => {
    respuestas.set("user_notam_exam_attempts", { data: [{ score: 92 }, { score: 71 }], error: null })
    respuestas.set("user_metar_exam_attempts", { data: [{ score: 80 }], error: null })

    expect(await traerMejoresPuntajesDeExamen("piloto")).toEqual({ notam: 92, metar: 80 })
  })

  it("sin intentos, null: la pantalla se queda con su respaldo local", async () => {
    respuestas.set("user_notam_exam_attempts", { data: [], error: null })
    expect(await traerMejoresPuntajesDeExamen("piloto")).toEqual({ notam: null, metar: null })
  })

  it("si la consulta falla tampoco se inventa un cero", async () => {
    respuestas.set("user_notam_exam_attempts", { data: null, error: { message: "caído" } })
    expect((await traerMejoresPuntajesDeExamen("piloto")).notam).toBeNull()
  })
})
