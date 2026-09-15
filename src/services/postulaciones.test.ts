import { beforeEach, describe, expect, it, vi } from "vitest"

const { order, insert, update, eqUpdate, from, reportarError } = vi.hoisted(() => {
  const order = vi.fn()
  const eqSelect = vi.fn(() => ({ order }))
  const insert = vi.fn(() => Promise.resolve({ error: null }))
  const eqUpdate = vi.fn(() => Promise.resolve({ error: null }))
  const update = vi.fn(() => ({ eq: eqUpdate }))
  const from = vi.fn(() => ({ select: () => ({ eq: eqSelect }), insert, update }))
  return { order, insert, update, eqUpdate, from, reportarError: vi.fn() }
})
vi.mock("@/integrations/supabase/client", () => ({ supabase: { from } }))
vi.mock("@/lib/errores", () => ({ reportarError }))

import {
  abiertas,
  actualizarPostulacion,
  hoyEnColombia,
  registrarPostulacion,
  traerPostulaciones,
  type Postulacion,
} from "./postulaciones"

const HOY = hoyEnColombia()

beforeEach(() => {
  vi.clearAllMocks()
  order.mockResolvedValue({ data: [], error: null })
})

describe("leer las postulaciones", () => {
  it("prefiere el nombre de la aerolínea de la lista sobre el escrito a mano", async () => {
    order.mockResolvedValue({
      data: [
        { id: 1, airline_id: 4, aerolinea: null, estado: "en_proceso", etapa_final: null, nota: null, postulada_en: "2026-08-01", airlines: { name: "Wingo" } },
        { id: 2, airline_id: null, aerolinea: "Aerolínea de la casa", estado: "postulada", etapa_final: null, nota: null, postulada_en: "2026-07-02", airlines: null },
      ],
      error: null,
    })

    const lista = await traerPostulaciones("piloto-1")

    expect(from).toHaveBeenCalledWith("postulaciones")
    expect(lista.map((p) => p.aerolinea)).toEqual(["Wingo", "Aerolínea de la casa"])
  })

  it("si falla devuelve lista vacía y avisa degradado, sin reportar", async () => {
    order.mockResolvedValue({ data: null, error: { message: "sin conexión" } })
    const avisos = vi.spyOn(console, "warn").mockImplementation(() => {})

    expect(await traerPostulaciones("piloto-1")).toEqual([])
    expect(avisos).toHaveBeenCalled()
    expect(reportarError).not.toHaveBeenCalled()
    avisos.mockRestore()
  })
})

describe("registrar una postulación", () => {
  it("con una de la lista no manda nombre escrito", async () => {
    await registrarPostulacion("piloto-1", { airlineId: 4, aerolinea: null, postuladaEn: HOY })

    expect(insert).toHaveBeenCalledWith({
      user_id: "piloto-1",
      airline_id: 4,
      aerolinea: null,
      postulada_en: HOY,
    })
  })

  it("con una que no está en la lista manda el nombre, recortado", async () => {
    await registrarPostulacion("piloto-1", { airlineId: null, aerolinea: "  Satena  ", postuladaEn: HOY })

    expect(insert).toHaveBeenCalledWith(expect.objectContaining({ airline_id: null, aerolinea: "Satena" }))
  })

  it("sin aerolínea no sale a la red", async () => {
    await expect(
      registrarPostulacion("piloto-1", { airlineId: null, aerolinea: "   ", postuladaEn: HOY }),
    ).rejects.toThrow(/Elige una aerolínea/)
    expect(insert).not.toHaveBeenCalled()
  })

  it("una fecha del futuro tampoco sale a la red", async () => {
    await expect(
      registrarPostulacion("piloto-1", { airlineId: 4, aerolinea: null, postuladaEn: "2099-01-01" }),
    ).rejects.toThrow(/futuro/)
    expect(insert).not.toHaveBeenCalled()
  })

  it("si la base falla lo reporta y lo dice en español", async () => {
    insert.mockResolvedValueOnce({ error: { message: "sin permiso" } } as never)

    await expect(
      registrarPostulacion("piloto-1", { airlineId: 4, aerolinea: null, postuladaEn: HOY }),
    ).rejects.toThrow(/No pudimos guardar la postulación/)
    expect(reportarError).toHaveBeenCalled()
  })
})

describe("cambiar el estado", () => {
  it("la etapa solo se guarda cuando no quedó", async () => {
    await actualizarPostulacion(7, { estado: "no_quedo", etapaFinal: "simulador", nota: null })
    expect(update).toHaveBeenLastCalledWith(expect.objectContaining({ etapa_final: "simulador" }))

    // Si se corrige a «en proceso», la etapa de antes deja de ser cierta.
    await actualizarPostulacion(7, { estado: "en_proceso", etapaFinal: "simulador", nota: null })
    expect(update).toHaveBeenLastCalledWith(expect.objectContaining({ etapa_final: null }))
    expect(eqUpdate).toHaveBeenLastCalledWith("id", 7)
  })

  it("una nota en blanco se guarda como null, no como cadena vacía", async () => {
    await actualizarPostulacion(7, { estado: "contratado", etapaFinal: null, nota: "   " })
    expect(update).toHaveBeenLastCalledWith(expect.objectContaining({ nota: null }))
  })
})

describe("cuáles siguen vivas", () => {
  const p = (id: number, estado: Postulacion["estado"]): Postulacion => ({
    id, airlineId: null, aerolinea: "X", estado, etapaFinal: null, nota: null, postuladaEn: "2026-01-01",
  })

  it("solo las que el piloto todavía está esperando", () => {
    const lista = [p(1, "postulada"), p(2, "contratado"), p(3, "en_proceso"), p(4, "no_quedo"), p(5, "retirada")]
    expect(abiertas(lista).map((x) => x.id)).toEqual([1, 3])
  })
})
