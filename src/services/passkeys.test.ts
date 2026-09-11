import { beforeEach, describe, expect, it, vi } from "vitest"

const { signInWithPasskey, registerPasskey, list } = vi.hoisted(() => ({
  signInWithPasskey: vi.fn(),
  registerPasskey: vi.fn(),
  list: vi.fn(),
}))
vi.mock("@/integrations/supabase/client", () => ({
  supabase: { auth: { signInWithPasskey, registerPasskey, passkey: { list } } },
}))

const reportarError = vi.hoisted(() => vi.fn())
vi.mock("@/lib/errores", () => ({ reportarError }))

const { entrarConPasskey, registrarPasskey, tienePasskey } = await import("./passkeys")

beforeEach(() => {
  vi.clearAllMocks()
})

/**
 * El error tal cual lo devuelve Supabase Auth con los passkeys apagados,
 * copiado de la respuesta real: 404, `code` con guion bajo y mensaje en prosa.
 * Se imita entero a propósito, porque inventarse la forma fue lo que hizo pasar
 * una versión anterior de esta prueba mientras la app sí reportaba el error.
 */
function errorApagado(): Error {
  return Object.assign(new Error("Passkeys are disabled"), {
    name: "AuthApiError",
    status: 404,
    code: "passkey_disabled",
    __isAuthError: true,
  })
}

describe("entrar con passkey", () => {
  it("sale bien y no reporta nada", async () => {
    signInWithPasskey.mockResolvedValue({ error: null })
    expect(await entrarConPasskey()).toEqual({ ok: true, cancelado: false, mensaje: null })
    expect(reportarError).not.toHaveBeenCalled()
  })

  it("cancelar no es un fallo: ni mensaje ni reporte", async () => {
    signInWithPasskey.mockResolvedValue({ error: new Error("The operation was aborted. NotAllowedError") })
    const resultado = await entrarConPasskey()

    expect(resultado).toEqual({ ok: false, cancelado: true, mensaje: null })
    expect(reportarError).not.toHaveBeenCalled()
  })

  it("con los passkeys apagados en el servidor manda a la contraseña, sin reportar", async () => {
    signInWithPasskey.mockResolvedValue({ error: errorApagado() })
    const resultado = await entrarConPasskey()

    expect(resultado.ok).toBe(false)
    expect(resultado.cancelado).toBe(false)
    expect(resultado.mensaje).toMatch(/contraseña/i)
    expect(reportarError).not.toHaveBeenCalled()
  })

  it("tampoco reporta si el cliente lanza por falta de la marca experimental", async () => {
    signInWithPasskey.mockRejectedValue(new Error("passkey is an experimental feature"))
    expect((await entrarConPasskey()).mensaje).toMatch(/contraseña/i)
    expect(reportarError).not.toHaveBeenCalled()
  })

  it("un fallo inesperado sí se reporta", async () => {
    signInWithPasskey.mockRejectedValue(new Error("boom"))
    const resultado = await entrarConPasskey()

    expect(resultado.ok).toBe(false)
    expect(resultado.mensaje).toMatch(/contraseña/i)
    expect(reportarError).toHaveBeenCalledWith("passkeys.entrar", expect.any(Error))
  })
})

describe("registrar passkey", () => {
  it("sale bien", async () => {
    registerPasskey.mockResolvedValue({ error: null })
    expect((await registrarPasskey()).ok).toBe(true)
  })

  it("cancelar no muestra error", async () => {
    registerPasskey.mockResolvedValue({ error: new Error("NotAllowedError") })
    expect(await registrarPasskey()).toEqual({ ok: false, cancelado: true, mensaje: null })
    expect(reportarError).not.toHaveBeenCalled()
  })

  it("con los passkeys apagados no se reporta: le pasaría a todos los pilotos", async () => {
    registerPasskey.mockResolvedValue({ error: errorApagado() })
    expect((await registrarPasskey()).ok).toBe(false)
    expect(reportarError).not.toHaveBeenCalled()
  })

  it("un fallo inesperado se reporta", async () => {
    registerPasskey.mockRejectedValue(new Error("boom"))
    expect((await registrarPasskey()).ok).toBe(false)
    expect(reportarError).toHaveBeenCalledWith("passkeys.registrar", expect.any(Error))
  })
})

describe("saber si ya tiene passkey", () => {
  it("con alguno, true", async () => {
    list.mockResolvedValue({ data: [{ id: "1" }], error: null })
    expect(await tienePasskey()).toBe(true)
  })

  it("sin ninguno, false", async () => {
    list.mockResolvedValue({ data: [], error: null })
    expect(await tienePasskey()).toBe(false)
  })

  it("si el servidor responde con error, null: no se sabe y no se ofrece", async () => {
    list.mockResolvedValue({ data: null, error: new Error("passkey_disabled") })
    expect(await tienePasskey()).toBeNull()
    expect(reportarError).not.toHaveBeenCalled()
  })

  it("si la llamada revienta, null y sin reportar: es información opcional", async () => {
    list.mockRejectedValue(new Error("boom"))
    expect(await tienePasskey()).toBeNull()
    expect(reportarError).not.toHaveBeenCalled()
  })
})
