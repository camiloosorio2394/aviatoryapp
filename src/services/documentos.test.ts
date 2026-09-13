import { beforeEach, describe, expect, it, vi } from "vitest"

const { from, rpc, insert, order, eq, del, respuestas } = vi.hoisted(() => {
  const respuestas = new Map<string, unknown>()
  const resolver = (clave: string) => respuestas.get(clave) ?? { data: null, error: null }
  const order = vi.fn(() => Promise.resolve(resolver("select")))
  const eq = vi.fn(() => ({ order }))
  const del = vi.fn(() => ({ eq: vi.fn(() => Promise.resolve(resolver("delete"))) }))
  const insert = vi.fn(() => Promise.resolve(resolver("insert")))
  const from = vi.fn(() => ({ select: () => ({ eq }), delete: del, insert }))
  return { from, rpc: vi.fn(), insert, order, eq, del, respuestas }
})
vi.mock("@/integrations/supabase/client", () => ({ supabase: { from, rpc } }))

import { borrarLicencia, guardarLicencia, revisarVencimientos, traerLicencias } from "./documentos"

const MEDICO = {
  id: 1,
  license_type: "medical_class_1" as const,
  custom_name: null,
  issued_date: "2026-01-10",
  expires_date: "2027-01-10",
  document_url: null,
  notes: null,
  created_at: "2026-01-10T00:00:00Z",
}

beforeEach(() => {
  vi.clearAllMocks()
  respuestas.clear()
})

describe("traer las licencias", () => {
  it("las pide del piloto y ordenadas por vencimiento", async () => {
    respuestas.set("select", { data: [MEDICO], error: null })
    const { licencias, error } = await traerLicencias("piloto")

    expect(from).toHaveBeenCalledWith("licenses_held")
    expect(eq).toHaveBeenCalledWith("user_id", "piloto")
    expect(order).toHaveBeenCalledWith("expires_date", { ascending: true, nullsFirst: false })
    expect(licencias).toEqual([MEDICO])
    expect(error).toBeNull()
  })

  it("sin nada cargado devuelve una lista vacía, no null", async () => {
    expect((await traerLicencias("nuevo")).licencias).toEqual([])
  })

  it("el error sube para que la pantalla lo muestre", async () => {
    respuestas.set("select", { data: null, error: { message: "sin permiso" } })
    expect((await traerLicencias("piloto")).error).toEqual({ message: "sin permiso" })
  })
})

describe("avisar al servidor que revise", () => {
  it("llama a check_my_expiries", async () => {
    rpc.mockResolvedValue({ error: null })
    await revisarVencimientos()
    expect(rpc).toHaveBeenCalledWith("check_my_expiries")
  })

  it("si falla solo avisa por consola: no se ve nada roto en pantalla", async () => {
    const avisos = vi.spyOn(console, "warn").mockImplementation(() => {})
    rpc.mockResolvedValue({ error: { message: "sin función" } })

    await expect(revisarVencimientos()).resolves.toBeUndefined()
    expect(avisos).toHaveBeenCalledWith("check_my_expiries", "sin función")
    avisos.mockRestore()
  })
})

describe("borrar una licencia", () => {
  it("devuelve el error en vez de lanzarlo, para poder deshacer la lista", async () => {
    respuestas.set("delete", { error: { message: "no se pudo" } })
    expect(await borrarLicencia(1)).toEqual({ error: { message: "no se pudo" } })
    expect(del).toHaveBeenCalled()
  })

  it("sin error, error null", async () => {
    expect(await borrarLicencia(1)).toEqual({ error: null })
  })
})

describe("guardar una licencia", () => {
  const NUEVA = {
    userId: "piloto",
    licenseType: "type_rating" as const,
    customName: "A320",
    issuedDate: "2026-02-01",
    expiresDate: null,
    notes: null,
  }

  it("escribe con los nombres de columna de la base", async () => {
    await guardarLicencia(NUEVA)
    expect(insert).toHaveBeenCalledWith({
      user_id: "piloto",
      license_type: "type_rating",
      custom_name: "A320",
      issued_date: "2026-02-01",
      expires_date: null,
      notes: null,
    })
  })

  it("lanza si falla, que es lo que espera el formulario", async () => {
    respuestas.set("insert", { error: { message: "fecha inválida" } })
    await expect(guardarLicencia(NUEVA)).rejects.toEqual({ message: "fecha inválida" })
  })
})
