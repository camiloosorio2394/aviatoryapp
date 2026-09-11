import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { normalizarError } from "./errores"

const { rpc, getSession } = vi.hoisted(() => ({ rpc: vi.fn(), getSession: vi.fn() }))
vi.mock("@/integrations/supabase/client", () => ({ supabase: { rpc, auth: { getSession } } }))

// Cada prueba importa el módulo de nuevo: lo ya enviado vive en el módulo.
async function cargar() {
  vi.resetModules()
  return import("./errores")
}

const conSesion = () => getSession.mockResolvedValue({ data: { session: { user: { id: "piloto" } } } })

describe("normalizarError", () => {
  it("de un Error toma el mensaje y la traza", () => {
    const error = new Error("se cayó")
    expect(normalizarError(error)).toEqual({ mensaje: "se cayó", detalle: error.stack })
  })

  it("de un error de PostgREST toma código, mensaje, detalle y pista", () => {
    expect(normalizarError({ code: "42501", message: "permission denied", details: "tabla x", hint: "grant" })).toEqual({
      mensaje: "42501: permission denied",
      detalle: "tabla x\ngrant",
    })
  })

  it("acepta textos y objetos que no se pueden serializar", () => {
    expect(normalizarError("texto")).toEqual({ mensaje: "texto", detalle: null })
    const circular: Record<string, unknown> = {}
    circular.yo = circular
    expect(normalizarError(circular).mensaje).toBe("[object Object]")
  })
})

describe("reportarError", () => {
  beforeEach(() => {
    rpc.mockReset().mockResolvedValue({ data: true, error: null })
    getSession.mockReset()
    vi.spyOn(console, "error").mockImplementation(() => {})
    vi.spyOn(console, "warn").mockImplementation(() => {})
  })
  afterEach(() => vi.restoreAllMocks())

  it("deja el error en la consola y lo guarda con la ruta", async () => {
    conSesion()
    const { reportarError } = await cargar()
    reportarError("pantalla", new Error("se cayó"), "en <Dashboard>")

    expect(console.error).toHaveBeenCalledWith("[Aviatory] pantalla", expect.any(Error))
    await vi.waitFor(() => expect(rpc).toHaveBeenCalledTimes(1))
    expect(rpc).toHaveBeenCalledWith(
      "reportar_error_cliente",
      expect.objectContaining({
        p_contexto: "pantalla",
        p_mensaje: "se cayó",
        p_ruta: window.location.pathname,
        p_detalle: expect.stringContaining("en <Dashboard>"),
      }),
    )
  })

  it("el mismo error se envía una vez por pestaña, y como mucho 20 distintos", async () => {
    conSesion()
    const { reportarError } = await cargar()
    reportarError("pantalla", new Error("igual"))
    reportarError("pantalla", new Error("igual"))
    for (let i = 0; i < 30; i++) reportarError("pantalla", new Error(`distinto ${i}`))

    await vi.waitFor(() => expect(rpc).toHaveBeenCalledTimes(20))
    await new Promise((r) => setTimeout(r, 0))
    expect(rpc).toHaveBeenCalledTimes(20)
  })

  it("sin sesión o sin red solo queda en la consola", async () => {
    getSession.mockResolvedValue({ data: { session: null } })
    const { reportarError } = await cargar()
    reportarError("pantalla", new Error("sin sesión"))
    reportarError("guardar", new TypeError("Failed to fetch"))

    await vi.waitFor(() => expect(getSession).toHaveBeenCalledTimes(1))
    expect(rpc).not.toHaveBeenCalled()
    expect(console.error).toHaveBeenCalledTimes(2)
  })

  it("si el reporte falla, no se reporta a sí mismo", async () => {
    conSesion()
    rpc.mockResolvedValue({ data: null, error: { message: "sin red" } })
    const { reportarError } = await cargar()
    reportarError("pantalla", new Error("x"))

    await vi.waitFor(() => expect(console.warn).toHaveBeenCalledWith("reportar_error_cliente", "sin red"))
    expect(rpc).toHaveBeenCalledTimes(1)
  })
})

describe("escucharErroresGlobales", () => {
  beforeEach(() => {
    rpc.mockReset().mockResolvedValue({ data: true, error: null })
    vi.spyOn(console, "error").mockImplementation(() => {})
  })
  afterEach(() => vi.restoreAllMocks())

  it("reporta los errores de la app y las promesas sin catch; ignora otros orígenes", async () => {
    conSesion()
    const { escucharErroresGlobales } = await cargar()
    escucharErroresGlobales()

    window.dispatchEvent(new ErrorEvent("error", { message: "de una extensión", filename: "chrome-extension://abc/x.js" }))
    window.dispatchEvent(new ErrorEvent("error", { message: "ResizeObserver loop completed with undelivered notifications." }))
    window.dispatchEvent(
      new ErrorEvent("error", { message: "de la app", error: new Error("de la app"), filename: `${window.location.origin}/assets/x.js` }),
    )
    const rechazo = new Event("unhandledrejection") as Event & { reason?: unknown }
    rechazo.reason = new Error("promesa")
    window.dispatchEvent(rechazo)

    await vi.waitFor(() => expect(rpc).toHaveBeenCalledTimes(2))
    const contextos = rpc.mock.calls.map(([, p]) => (p as { p_contexto: string }).p_contexto)
    expect(contextos).toEqual(["error sin atrapar", "promesa rechazada sin atrapar"])
  })
})
