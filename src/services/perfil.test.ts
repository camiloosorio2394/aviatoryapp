import { beforeEach, describe, expect, it, vi } from "vitest"

const { from, rpc, respuestas } = vi.hoisted(() => {
  const respuestas = new Map<string, unknown>()

  /**
   * Constructor de consultas falso: toda la cadena de PostgREST devuelve el
   * mismo objeto, y ese objeto ya es una promesa. Así sirve igual para las
   * consultas que terminan en `.maybeSingle()` y para las que se esperan tal
   * cual, que es como están escritas las de este servicio.
   */
  const constructor = (tabla: string) => {
    const respuesta = () => respuestas.get(tabla) ?? { data: null, error: null, count: null }
    const cadena: Record<string, unknown> = {
      maybeSingle: () => Promise.resolve(respuesta()),
      then: (ok: (v: unknown) => unknown, mal?: (e: unknown) => unknown) =>
        Promise.resolve(respuesta()).then(ok, mal),
    }
    for (const paso of ["select", "eq", "order", "limit", "not"]) cadena[paso] = () => cadena
    return cadena
  }

  return { from: vi.fn((tabla: string) => constructor(tabla)), rpc: vi.fn(), respuestas }
})
vi.mock("@/integrations/supabase/client", () => ({ supabase: { from, rpc } }))

// Del módulo de la bitácora solo se finge la consulta: el resumen vacío se usa
// tal cual, para que estas pruebas fallen si cambia su forma.
const traerResumenBitacora = vi.hoisted(() => vi.fn())
vi.mock("@/services/bitacora", async (original) => ({
  ...(await original<typeof import("./bitacora")>()),
  traerResumenBitacora,
}))

import { RESUMEN_BITACORA_VACIO } from "./bitacora"
import { comprobarUsuarioLibre, contarRecurrencia, resolverIcao, traerPerfil } from "./perfil"

const CERT = { id: "1", license_type: "PPL", custom_name: null, issued_date: null, expires_date: null }

beforeEach(() => {
  vi.clearAllMocks()
  respuestas.clear()
  traerResumenBitacora.mockResolvedValue({ resumen: RESUMEN_BITACORA_VACIO, error: null })
})

describe("recurrencia de los certificados", () => {
  it("solo cuentan los que tienen fecha de vencimiento", () => {
    const certs = [
      { ...CERT, id: "a", expires_date: "2027-01-01" },
      { ...CERT, id: "b", expires_date: "2026-01-01" },
      { ...CERT, id: "c", expires_date: null },
    ]
    expect(contarRecurrencia(certs, "2026-09-11")).toEqual({ valid: 1, total: 2 })
  })

  it("el que vence hoy todavía está al día", () => {
    expect(contarRecurrencia([{ ...CERT, expires_date: "2026-09-11" }], "2026-09-11")).toEqual({ valid: 1, total: 1 })
  })

  it("sin certificados con fecha, total en cero: la barra no se puede calcular", () => {
    expect(contarRecurrencia([CERT], "2026-09-11")).toEqual({ valid: 0, total: 0 })
  })
})

describe("de dónde sale el nivel ICAO", () => {
  it("el simulacro manda sobre la estimación", () => {
    expect(resolverIcao({ final_level: 5, taken_at: "2026-08-01" }, 3)).toEqual({
      level: 5,
      takenAt: "2026-08-01",
      source: "mock",
    })
  })

  it("sin simulacro queda la estimación del test inicial, marcada", () => {
    expect(resolverIcao(null, 4)).toEqual({ level: 4, takenAt: null, source: "estimate" })
  })

  it("sin nada, no hay nivel ni fuente", () => {
    expect(resolverIcao(null, null)).toEqual({ level: null, takenAt: null, source: null })
  })
})

describe("traer el perfil", () => {
  it("arma la pantalla con lo que devuelven las tablas", async () => {
    respuestas.set("profiles", {
      data: { full_name: "Juan Manuel Pérez", country: "Colombia", username: "capi_juanma", photo_url: "foto.webp" },
      error: null,
    })
    respuestas.set("pilot_state", {
      data: { stage: "cpl_ready", total_hours: 240, hours_pic: 120, icao_english_level: 4, target_airline: "Avianca", licenses: ["PPL", "CPL"] },
      error: null,
    })
    respuestas.set("licenses_held", { data: [{ ...CERT, expires_date: "2027-03-01" }], error: null })
    respuestas.set("user_icao_mock_results", { data: { final_level: 5, taken_at: "2026-08-01" }, error: null })
    respuestas.set("user_achievements", { count: 7, data: null, error: null })
    respuestas.set("achievements", { count: 40, data: null, error: null })
    respuestas.set("user_pca_exam_attempts", { data: { score: 88 }, error: null })
    respuestas.set("vault_sessions", { count: 12, data: null, error: null })
    respuestas.set("streaks", { data: { longest_streak: 19 }, error: null })
    traerResumenBitacora.mockResolvedValue({
      resumen: { ...RESUMEN_BITACORA_VACIO, vuelos: 30, minutosTotal: 6000, minutosPic: 3000, minutosTravesia: 1200, ultimoVuelo: "2026-09-01" },
      error: null,
    })

    const datos = await traerPerfil("piloto")

    expect(datos.fullName).toBe("Juan Manuel Pérez")
    expect(datos.username).toBe("capi_juanma")
    expect(datos.stage).toBe("cpl_ready")
    // Las horas de pilot_state llegan como texto: son las que se editan a mano.
    expect(datos.totalHours).toBe("240")
    expect(datos.hoursPic).toBe("120")
    expect(datos.licenses).toEqual(["PPL", "CPL"])
    expect(datos.vuelos).toEqual({ totalMin: 6000, picMin: 3000, xcMin: 1200, count: 30 })
    expect(datos.ultimoVuelo).toBe("2026-09-01")
    expect(datos.logros).toEqual({ unlocked: 7, total: 40 })
    expect(datos.estudio).toEqual({ pcaBest: 88, quizzes: 12, longestStreak: 19 })
    expect(datos.icao).toEqual({ level: 5, takenAt: "2026-08-01", source: "mock" })
    expect(datos.recurrencia).toEqual({ valid: 1, total: 1 })
    expect(traerResumenBitacora).toHaveBeenCalledWith("piloto")
  })

  it("un piloto recién creado no tiene filas y la pantalla sale vacía, no rota", async () => {
    const datos = await traerPerfil("nuevo")

    expect(datos).toMatchObject({
      fullName: "",
      country: "",
      username: "",
      photoUrl: null,
      stage: "",
      totalHours: "",
      hoursPic: "",
      targetAirline: "",
      licenses: [],
      certs: [],
      recurrencia: { valid: 0, total: 0 },
      logros: { unlocked: 0, total: 0 },
      estudio: { pcaBest: null, quizzes: 0, longestStreak: 0 },
      icao: { level: null, takenAt: null, source: null },
    })
  })

  it("si el resumen de la bitácora falla, avisa y sigue con el resto", async () => {
    const avisos = vi.spyOn(console, "warn").mockImplementation(() => {})
    traerResumenBitacora.mockResolvedValue({ resumen: RESUMEN_BITACORA_VACIO, error: { message: "sin vista" } })
    respuestas.set("profiles", { data: { full_name: "Ana" }, error: null })

    const datos = await traerPerfil("piloto")

    expect(datos.fullName).toBe("Ana")
    expect(datos.vuelos).toEqual({ totalMin: 0, picMin: 0, xcMin: 0, count: 0 })
    expect(avisos).toHaveBeenCalledWith("perfil: bitacora_resumen", "sin vista")
    avisos.mockRestore()
  })
})

describe("comprobar si el usuario está libre", () => {
  it("libre", async () => {
    rpc.mockResolvedValue({ data: true, error: null })
    expect(await comprobarUsuarioLibre("capi_juanma")).toEqual({ libre: true, fallo: false })
    expect(rpc).toHaveBeenCalledWith("check_username_available", { p_username: "capi_juanma" })
  })

  it("tomado", async () => {
    rpc.mockResolvedValue({ data: false, error: null })
    expect(await comprobarUsuarioLibre("tomado")).toEqual({ libre: false, fallo: false })
  })

  it("si la consulta falla no se dice que está tomado: se dice que no se pudo comprobar", async () => {
    const avisos = vi.spyOn(console, "warn").mockImplementation(() => {})
    rpc.mockResolvedValue({ data: null, error: { message: "sin red" } })

    expect(await comprobarUsuarioLibre("quien_sea")).toEqual({ libre: null, fallo: true })
    expect(avisos).toHaveBeenCalledWith("check_username_available", "sin red")
    avisos.mockRestore()
  })
})
