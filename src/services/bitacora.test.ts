import { beforeEach, describe, expect, it, vi } from "vitest"

const { maybeSingle, eq, order, limit, insert, borrarPor, from, respuestas } = vi.hoisted(() => {
  const respuestas = new Map<string, unknown>()
  const dame = (clave: string, vacio: unknown) => respuestas.get(clave) ?? vacio
  const maybeSingle = vi.fn()
  const limit = vi.fn(() => Promise.resolve(dame("lista", { data: null, error: null })))
  // El constructor de consultas encadena: .eq().order().order().limit() para la
  // lista de vuelos y .eq().maybeSingle() para la fila del resumen.
  const cadena: Record<string, unknown> = { maybeSingle, limit }
  const order = vi.fn(() => cadena)
  cadena.order = order
  const eq = vi.fn(() => cadena)
  const borrarPor = vi.fn(() => Promise.resolve(dame("delete", { error: null })))
  const insert = vi.fn(() => Promise.resolve(dame("insert", { error: null })))
  const from = vi.fn(() => ({ select: () => ({ eq }), delete: () => ({ eq: borrarPor }), insert }))
  return { maybeSingle, eq, order, limit, insert, borrarPor, from, respuestas }
})
vi.mock("@/integrations/supabase/client", () => ({ supabase: { from } }))

import { leerIcaoProgress } from "@/lib/icaoProgress"
import {
  borrarVuelo,
  guardarVuelo,
  LIMITE_LISTA,
  RESUMEN_BITACORA_VACIO,
  traerBitacora,
  traerResumenBitacora,
  type VueloNuevo,
} from "./bitacora"

beforeEach(() => {
  vi.clearAllMocks()
  respuestas.clear()
})

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

const VUELO = {
  id: 1,
  flight_date: "2026-09-01",
  aircraft_registration: "HK-1234",
  aircraft_type: "C172",
  from_airport: "SKBO",
  to_airport: "SKRG",
  total_minutes: 95,
  pic_minutes: 95,
  sic_minutes: 0,
  dual_minutes: 0,
  instrument_real_minutes: 0,
  instrument_sim_minutes: 0,
  night_minutes: 0,
  cross_country_minutes: 95,
  landings_day: 1,
  landings_night: 0,
  remarks: null,
  created_at: "2026-09-01T00:00:00Z",
}

describe("la pantalla de la bitácora", () => {
  it("pide los vuelos recientes y los totales a la vez", async () => {
    respuestas.set("lista", { data: [VUELO], error: null })
    maybeSingle.mockResolvedValue({ data: null, error: null })

    const { vuelos, resumen, error } = await traerBitacora("piloto")

    expect(from).toHaveBeenCalledWith("flights")
    expect(from).toHaveBeenCalledWith("bitacora_resumen")
    expect(limit).toHaveBeenCalledWith(LIMITE_LISTA)
    // Fecha y luego id, para que dos vuelos del mismo día salgan siempre igual.
    expect(order).toHaveBeenCalledWith("flight_date", { ascending: false })
    expect(order).toHaveBeenCalledWith("id", { ascending: false })
    expect(vuelos).toEqual([VUELO])
    expect(resumen).toEqual(RESUMEN_BITACORA_VACIO)
    expect(error).toBeNull()
  })

  it("sin vuelos devuelve una lista vacía, no null", async () => {
    maybeSingle.mockResolvedValue({ data: null, error: null })
    expect((await traerBitacora("nuevo")).vuelos).toEqual([])
  })

  it("si falla cualquiera de las dos consultas, hay error: media pantalla es peor que ninguna", async () => {
    respuestas.set("lista", { data: null, error: { message: "lista caída" } })
    maybeSingle.mockResolvedValue({ data: null, error: null })
    expect((await traerBitacora("piloto")).error).toEqual({ message: "lista caída" })

    respuestas.set("lista", { data: [VUELO], error: null })
    maybeSingle.mockResolvedValue({ data: null, error: { message: "totales caídos" } })
    expect((await traerBitacora("piloto")).error).toEqual({ message: "totales caídos" })
  })
})

describe("borrar un vuelo", () => {
  it("devuelve el error en vez de lanzarlo, para poder deshacer la lista", async () => {
    respuestas.set("delete", { error: { message: "no se pudo" } })
    expect(await borrarVuelo(7)).toEqual({ error: { message: "no se pudo" } })
    expect(borrarPor).toHaveBeenCalledWith("id", 7)
  })

  it("sin error, error null", async () => {
    expect(await borrarVuelo(7)).toEqual({ error: null })
  })
})

describe("guardar un vuelo", () => {
  const NUEVO: VueloNuevo = {
    userId: "piloto",
    flightDate: "2026-09-11",
    aircraftRegistration: "HK-1234",
    aircraftType: "C172",
    fromAirport: "SKBO",
    toAirport: "SKRG",
    totalMinutes: 95,
    picMinutes: 95,
    sicMinutes: 0,
    dualMinutes: 0,
    instrumentRealMinutes: 0,
    instrumentSimMinutes: 0,
    nightMinutes: 0,
    crossCountryMinutes: 95,
    landingsDay: 1,
    landingsNight: 0,
    remarks: null,
  }

  it("escribe con los nombres de columna de la base", async () => {
    await guardarVuelo(NUEVO)
    expect(insert).toHaveBeenCalledWith({
      user_id: "piloto",
      flight_date: "2026-09-11",
      aircraft_registration: "HK-1234",
      aircraft_type: "C172",
      from_airport: "SKBO",
      to_airport: "SKRG",
      total_minutes: 95,
      pic_minutes: 95,
      sic_minutes: 0,
      dual_minutes: 0,
      instrument_real_minutes: 0,
      instrument_sim_minutes: 0,
      night_minutes: 0,
      cross_country_minutes: 95,
      landings_day: 1,
      landings_night: 0,
      remarks: null,
    })
  })

  it("lanza si falla, que es lo que espera el formulario", async () => {
    respuestas.set("insert", { error: { message: "fecha inválida" } })
    await expect(guardarVuelo(NUEVO)).rejects.toEqual({ message: "fecha inválida" })
  })
})
