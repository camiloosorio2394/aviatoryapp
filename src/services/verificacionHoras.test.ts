import { beforeEach, describe, expect, it, vi } from "vitest"

const { maybeSingle, eq, insert, upload, rpc, from, storageFrom, reportarError } = vi.hoisted(() => {
  const maybeSingle = vi.fn()
  const eq = vi.fn(() => ({ maybeSingle }))
  const insert = vi.fn(() => Promise.resolve({ error: null }))
  const upload = vi.fn(() => Promise.resolve({ error: null }))
  const rpc = vi.fn(() => Promise.resolve({ data: true, error: null }))
  const from = vi.fn(() => ({ select: () => ({ eq }), insert }))
  const storageFrom = vi.fn(() => ({ upload }))
  return { maybeSingle, eq, insert, upload, rpc, from, storageFrom, reportarError: vi.fn() }
})
vi.mock("@/integrations/supabase/client", () => ({
  supabase: { from, rpc, storage: { from: storageFrom } },
}))
vi.mock("@/lib/errores", () => ({ reportarError }))

import {
  pedirVerificacion,
  retirarVerificacion,
  TOPE_EVIDENCIA_BYTES,
  traerVerificacion,
} from "./verificacionHoras"

/** Un archivo de mentira con el tipo y el peso que pida la prueba. */
function archivo(nombre: string, tipo: string, bytes = 1024): File {
  const f = new File(["x"], nombre, { type: tipo })
  Object.defineProperty(f, "size", { value: bytes })
  return f
}

beforeEach(() => {
  vi.clearAllMocks()
  maybeSingle.mockResolvedValue({ data: null, error: null })
})

describe("leer el sello", () => {
  it("lo pide a la vista, que ya calculó si cubre lo declarado", async () => {
    maybeSingle.mockResolvedValue({
      data: {
        estado: "verificada",
        horas_total: 240,
        horas_pic: 120,
        revisado_en: "2026-09-01T15:00:00Z",
        cubre_lo_declarado: true,
      },
      error: null,
    })

    const sello = await traerVerificacion("piloto-1")

    expect(from).toHaveBeenCalledWith("horas_verificadas")
    expect(eq).toHaveBeenCalledWith("user_id", "piloto-1")
    expect(sello).toEqual({
      estado: "verificada",
      horasTotal: 240,
      horasPic: 120,
      revisadoEn: "2026-09-01T15:00:00Z",
      cubreLoDeclarado: true,
    })
  })

  it("sin solicitud devuelve null, que la pantalla lee como «declarado»", async () => {
    expect(await traerVerificacion("piloto-1")).toBeNull()
  })

  it("si la consulta falla no rompe la pantalla: devuelve null y avisa degradado", async () => {
    maybeSingle.mockResolvedValue({ data: null, error: { message: "sin conexión" } })
    const avisos = vi.spyOn(console, "warn").mockImplementation(() => {})

    expect(await traerVerificacion("piloto-1")).toBeNull()
    expect(avisos).toHaveBeenCalled()
    expect(reportarError).not.toHaveBeenCalled()
    avisos.mockRestore()
  })
})

describe("pedir la revisión", () => {
  it("guarda la evidencia en la carpeta del piloto y registra las horas del día", async () => {
    await pedirVerificacion("piloto-1", archivo("bitacora.jpg", "image/jpeg"), { total: 240, pic: 120 }, "Tomo 3")

    expect(storageFrom).toHaveBeenCalledWith("bitacoras")
    const [ruta, , opciones] = upload.mock.calls[0] as unknown as [string, File, { contentType: string; upsert: boolean }]
    expect(ruta.startsWith("piloto-1/")).toBe(true)
    expect(ruta.endsWith(".jpg")).toBe(true)
    expect(opciones).toMatchObject({ contentType: "image/jpeg", upsert: false })

    expect(insert).toHaveBeenCalledWith({
      user_id: "piloto-1",
      horas_total: 240,
      horas_pic: 120,
      evidencia: ruta,
      nota_piloto: "Tomo 3",
    })
  })

  it("rechaza un tipo que el bucket no acepta, sin salir a la red", async () => {
    await expect(
      pedirVerificacion("piloto-1", archivo("bitacora.docx", "application/msword"), { total: 240, pic: 0 }, null),
    ).rejects.toThrow(/foto|PDF/i)
    expect(upload).not.toHaveBeenCalled()
  })

  it("rechaza un archivo por encima del tope, sin salir a la red", async () => {
    await expect(
      pedirVerificacion("piloto-1", archivo("grande.pdf", "application/pdf", TOPE_EVIDENCIA_BYTES + 1), { total: 1, pic: 0 }, null),
    ).rejects.toThrow(/10 MB/)
    expect(upload).not.toHaveBeenCalled()
  })

  it("si la subida falla no registra la solicitud", async () => {
    upload.mockResolvedValueOnce({ error: { message: "storage caído" } } as never)

    await expect(
      pedirVerificacion("piloto-1", archivo("bitacora.pdf", "application/pdf"), { total: 240, pic: 0 }, null),
    ).rejects.toThrow(/No pudimos subir/)
    expect(insert).not.toHaveBeenCalled()
    expect(reportarError).toHaveBeenCalled()
  })

  it("una segunda solicitud pendiente se explica, no se reporta como error", async () => {
    insert.mockResolvedValueOnce({ error: { code: "23505", message: "duplicate key" } } as never)

    await expect(
      pedirVerificacion("piloto-1", archivo("bitacora.pdf", "application/pdf"), { total: 240, pic: 0 }, null),
    ).rejects.toThrow("Ya tienes una solicitud en revisión.")
    expect(reportarError).not.toHaveBeenCalled()
  })
})

describe("retirar la solicitud", () => {
  it("va por la función de la base, que es quien valida al piloto", async () => {
    expect(await retirarVerificacion()).toBe(true)
    expect(rpc).toHaveBeenCalledWith("retirar_verificacion_horas")
  })

  it("si la función falla lo reporta y lo dice en español", async () => {
    rpc.mockResolvedValueOnce({ data: null, error: { message: "sin permiso" } } as never)

    await expect(retirarVerificacion()).rejects.toThrow(/No pudimos retirar/)
    expect(reportarError).toHaveBeenCalled()
  })
})
