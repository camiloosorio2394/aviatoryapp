import { beforeEach, describe, expect, it, vi } from "vitest"

const { from, ultimoUpsert, respuestas } = vi.hoisted(() => {
  const respuestas = new Map<string, unknown>()
  // Se guarda la fila escrita en vez de mirar mock.calls: así queda tipada y
  // las pruebas pueden decir qué columnas NO se tocaron.
  const ultimoUpsert: { fila: Record<string, unknown> | null } = { fila: null }
  const upsert = vi.fn((fila: Record<string, unknown>) => {
    ultimoUpsert.fila = fila
    return Promise.resolve(respuestas.get("upsert") ?? { error: null })
  })
  const from = vi.fn(() => ({ upsert }))
  return { from, ultimoUpsert, respuestas }
})
vi.mock("@/integrations/supabase/client", () => ({ supabase: { from } }))

const reportarError = vi.hoisted(() => vi.fn())
vi.mock("@/lib/errores", () => ({ reportarError }))

import { guardarNivelIcaoEstimado, guardarPerfilInicial } from "./piloto"

const PERFIL = {
  stage: "cpl_in_progress",
  horasPreviasTotal: 240,
  horasPreviasPic: 120,
  licenses: ["PPL"],
  targetAirline: "Avianca",
  targetDate: "2027-06-01",
}

beforeEach(() => {
  vi.clearAllMocks()
  respuestas.clear()
  ultimoUpsert.fila = null
})

describe("el perfil que llena el onboarding", () => {
  it("escribe con los nombres de columna de la base", async () => {
    await guardarPerfilInicial("piloto", PERFIL)

    expect(from).toHaveBeenCalledWith("pilot_state")
    const escrito = ultimoUpsert.fila ?? {}
    expect(escrito).toMatchObject({
      user_id: "piloto",
      stage: "cpl_in_progress",
      horas_previas_total: 240,
      horas_previas_pic: 120,
      licenses: ["PPL"],
      target_airline: "Avianca",
      target_date: "2027-06-01",
    })
    expect(typeof escrito.updated_at).toBe("string")
  })

  it("no toca el nivel de inglés: ese sale del test, no de lo que declare el piloto", async () => {
    await guardarPerfilInicial("piloto", PERFIL)
    expect(ultimoUpsert.fila ?? {}).not.toHaveProperty("icao_english_level")
  })

  it("lanza si falla, que es lo que espera la pantalla", async () => {
    respuestas.set("upsert", { error: { message: "sin permiso" } })
    await expect(guardarPerfilInicial("piloto", PERFIL)).rejects.toEqual({ message: "sin permiso" })
  })
})

describe("el nivel de inglés estimado por el test inicial", () => {
  it("escribe solo el nivel: no pisa lo que puso el onboarding", async () => {
    expect(await guardarNivelIcaoEstimado("piloto", 4)).toBe(true)

    const escrito = ultimoUpsert.fila ?? {}
    expect(escrito).toMatchObject({ user_id: "piloto", icao_english_level: 4 })
    for (const columna of ["stage", "horas_previas_total", "horas_previas_pic", "licenses", "target_airline", "target_date"]) {
      expect(escrito).not.toHaveProperty(columna)
    }
    expect(reportarError).not.toHaveBeenCalled()
  })

  it("si falla devuelve false y lo reporta: no se anuncia como guardado lo que no se guardó", async () => {
    respuestas.set("upsert", { error: { message: "sin red" } })

    expect(await guardarNivelIcaoEstimado("piloto", 4)).toBe(false)
    expect(reportarError).toHaveBeenCalledWith("test inicial: guardar nivel", { message: "sin red" })
  })
})
