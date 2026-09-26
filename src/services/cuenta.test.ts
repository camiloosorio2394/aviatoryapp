import { beforeEach, describe, expect, it, vi } from "vitest"

const { rpc, from, storageFrom, reportarError } = vi.hoisted(() => ({
  rpc: vi.fn(),
  from: vi.fn(),
  storageFrom: vi.fn(),
  reportarError: vi.fn(),
}))
vi.mock("@/integrations/supabase/client", () => ({
  supabase: { rpc, from, storage: { from: storageFrom } },
}))
vi.mock("@/lib/errores", () => ({ reportarError }))

import { eliminarMiCuenta, registrarAutorizacion, tieneAutorizacionVigente, VERSION_TERMINOS } from "./cuenta"

const FALTA = { code: "PGRST202", message: "Could not find the function public.eliminar_mi_cuenta" }

/** Un bucket de Storage falso: una carpeta por piloto, con subcarpetas. */
function storageFalso(archivos: Record<string, string[]>) {
  const borrados: Record<string, string[]> = {}
  storageFrom.mockImplementation((bucket: string) => ({
    list: vi.fn(async (prefijo: string) => {
      const debajo = (archivos[bucket] ?? []).filter((r) => r.startsWith(`${prefijo}/`)).map((r) => r.slice(prefijo.length + 1))
      const nombres = [...new Set(debajo.map((r) => r.split("/")[0]))]
      return {
        data: nombres.map((n) => ({ name: n, id: debajo.includes(n) ? `id-${n}` : null })),
        error: null,
      }
    }),
    remove: vi.fn(async (rutas: string[]) => {
      ;(borrados[bucket] ??= []).push(...rutas)
      return { data: [], error: null }
    }),
  }))
  return borrados
}

beforeEach(() => {
  vi.clearAllMocks()
  vi.spyOn(console, "warn").mockImplementation(() => {})
})

describe("autorización con constancia", () => {
  it("la registra con la versión vigente", async () => {
    rpc.mockResolvedValue({ error: null })
    expect(await registrarAutorizacion("terminos_y_privacidad")).toBe(true)
    expect(rpc).toHaveBeenCalledWith("registrar_autorizacion", { p_documento: "terminos_y_privacidad", p_version: VERSION_TERMINOS })
  })

  it("sin la migración no bloquea ni reporta: avisa en consola", async () => {
    rpc.mockResolvedValue({ error: FALTA })
    expect(await registrarAutorizacion("dato_sensible_medico")).toBe(false)
    expect(reportarError).not.toHaveBeenCalled()
  })

  it("otro fallo sí se reporta", async () => {
    const fallo = { code: "500", message: "se cayó" }
    rpc.mockResolvedValue({ error: fallo })
    expect(await registrarAutorizacion("terminos_y_privacidad")).toBe(false)
    expect(reportarError).toHaveBeenCalledWith("cuenta: registrar autorización", fallo, "terminos_y_privacidad")
  })

  it("dice si consta, si no consta, o que no se sabe", async () => {
    const consulta = (resultado: { data: unknown; error: unknown }) => {
      const q = { select: () => q, eq: () => q, limit: async () => resultado }
      from.mockReturnValue(q)
    }
    consulta({ data: [{ id: 1 }], error: null })
    expect(await tieneAutorizacionVigente("p1")).toBe(true)
    consulta({ data: [], error: null })
    expect(await tieneAutorizacionVigente("p1")).toBe(false)
    consulta({ data: null, error: { code: "PGRST205", message: "Could not find the table" } })
    expect(await tieneAutorizacionVigente("p1")).toBeNull()
  })
})

describe("eliminar la cuenta", () => {
  it("sin la migración no toca los archivos", async () => {
    rpc.mockResolvedValue({ error: FALTA })
    storageFalso({ avatars: ["p1/avatar.png"] })
    expect(await eliminarMiCuenta("p1")).toEqual({ estado: "no_disponible" })
    expect(storageFrom).not.toHaveBeenCalled()
  })

  it("verifica, borra los archivos (también en subcarpetas) y después la cuenta", async () => {
    rpc
      .mockResolvedValueOnce({ error: { code: "P0001", message: "confirmacion_invalida" } })
      .mockResolvedValueOnce({ data: { eliminado: true }, error: null })
    const borrados = storageFalso({
      avatars: ["p1/avatar.png", "p2/avatar.png"],
      bitacoras: ["p1/vuelo.pdf", "p1/verificaciones/respaldo.jpg"],
    })

    expect(await eliminarMiCuenta("p1")).toEqual({ estado: "eliminada" })
    expect(rpc).toHaveBeenNthCalledWith(1, "eliminar_mi_cuenta", { p_confirmacion: "VERIFICAR" })
    expect(rpc).toHaveBeenNthCalledWith(2, "eliminar_mi_cuenta", { p_confirmacion: "ELIMINAR" })
    expect(borrados.avatars).toEqual(["p1/avatar.png"])
    expect(borrados.bitacoras?.sort()).toEqual(["p1/verificaciones/respaldo.jpg", "p1/vuelo.pdf"])
  })

  it("si no se pueden borrar los archivos, no elimina la cuenta", async () => {
    rpc.mockResolvedValueOnce({ error: { code: "P0001", message: "confirmacion_invalida" } })
    storageFrom.mockImplementation(() => ({
      list: vi.fn(async () => ({ data: null, error: { message: "sin red" } })),
      remove: vi.fn(),
    }))
    const r = await eliminarMiCuenta("p1")
    expect(r.estado).toBe("error")
    expect(rpc).toHaveBeenCalledTimes(1)
  })
})
