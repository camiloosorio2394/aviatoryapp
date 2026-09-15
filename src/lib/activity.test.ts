import { beforeEach, describe, expect, it, vi } from "vitest"

const { rpc, getSession, reportarError } = vi.hoisted(() => ({
  rpc: vi.fn(),
  getSession: vi.fn(),
  reportarError: vi.fn(),
}))
vi.mock("@/integrations/supabase/client", () => ({ supabase: { rpc, auth: { getSession } } }))
vi.mock("@/lib/errores", () => ({ reportarError }))

import {
  fechaDeUltimaActividad,
  registrarActividadDeEstudio,
  registrarEstudioDiario,
} from "./activity"

const conSesion = () => getSession.mockResolvedValue({ data: { session: { user: { id: "piloto" } } } })

describe("registro de actividad", () => {
  beforeEach(() => {
    localStorage.clear()
    rpc.mockReset().mockResolvedValue({ data: null, error: null })
    getSession.mockReset()
    reportarError.mockReset()
  })

  it("sin sesión no llama a la base", async () => {
    getSession.mockResolvedValue({ data: { session: null } })
    expect(await registrarActividadDeEstudio({ questions: 10, correct: 7 })).toBe(false)
    expect(rpc).not.toHaveBeenCalled()
  })

  it("registra actividad y racha, y reporta si la base falla", async () => {
    conSesion()
    expect(await registrarActividadDeEstudio({ questions: 10, correct: 7, minutes: 5 })).toBe(true)
    expect(rpc).toHaveBeenCalledWith("record_daily_activity", { p_questions: 10, p_correct: 7, p_minutes: 5 })
    expect(rpc).toHaveBeenCalledWith("increment_streak")

    rpc.mockResolvedValueOnce({ data: null, error: null }).mockResolvedValueOnce({ data: null, error: { message: "boom" } })
    expect(await registrarActividadDeEstudio({ questions: 1, correct: 1 })).toBe(false)
    expect(reportarError).toHaveBeenCalledWith("registro de actividad", { message: "boom" })
  })

  it("una superficie registra el día una vez, y solo cuando la base lo confirma", async () => {
    conSesion()
    rpc.mockResolvedValue({ data: null, error: { message: "sin red" } })
    await registrarEstudioDiario("notam-leccion")
    expect(rpc).toHaveBeenCalledTimes(2)

    // Falló: la siguiente vez lo intenta de nuevo.
    rpc.mockReset().mockResolvedValue({ data: null, error: null })
    await registrarEstudioDiario("notam-leccion")
    expect(rpc).toHaveBeenCalledTimes(2)

    // Confirmado: el mismo día no se repite.
    await registrarEstudioDiario("notam-leccion")
    expect(rpc).toHaveBeenCalledTimes(2)
  })

  it("dos llamadas seguidas mandan un solo registro", async () => {
    conSesion()
    await Promise.all([registrarEstudioDiario("metar-leccion"), registrarEstudioDiario("metar-leccion")])
    expect(rpc).toHaveBeenCalledTimes(2)
  })
})

describe("fechaDeUltimaActividad", () => {
  /** Un jueves cualquiera a las 3 de la tarde, para no depender del reloj real. */
  const ahora = new Date(2026, 8, 15, 15, 0, 0)

  it("sin fecha no inventa nada", () => {
    expect(fechaDeUltimaActividad(null, ahora)).toBeNull()
    expect(fechaDeUltimaActividad("", ahora)).toBeNull()
  })

  it("una fecha inservible tampoco se muestra", () => {
    expect(fechaDeUltimaActividad("ayer por la tarde", ahora)).toBeNull()
  })

  it("lo de hoy se llama hoy, con su hora", () => {
    const texto = fechaDeUltimaActividad(new Date(2026, 8, 15, 8, 24).toISOString(), ahora)
    expect(texto).toMatch(/^Hoy, /)
    expect(texto).toMatch(/8:24/)
  })

  it("lo de ayer se llama ayer aunque hayan pasado pocas horas", () => {
    // 23:30 de ayer contra las 15:00 de hoy: menos de 24 horas, pero es ayer.
    const texto = fechaDeUltimaActividad(new Date(2026, 8, 14, 23, 30).toISOString(), ahora)
    expect(texto).toMatch(/^Ayer, /)
  })

  it("más atrás se dice la fecha, sin hora", () => {
    const texto = fechaDeUltimaActividad(new Date(2026, 8, 4, 10, 0).toISOString(), ahora)
    expect(texto).toBe("4 de septiembre")
  })

  it("de otro año lleva el año", () => {
    const texto = fechaDeUltimaActividad(new Date(2025, 11, 20, 10, 0).toISOString(), ahora)
    expect(texto).toContain("2025")
  })
})
