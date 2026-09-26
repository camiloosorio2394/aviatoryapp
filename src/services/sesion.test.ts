import { beforeEach, describe, expect, it, vi } from "vitest"

const { rpc, signUp, signInWithPassword, signInWithOAuth, resetPasswordForEmail, updateUser, signOut } = vi.hoisted(() => ({
  rpc: vi.fn(),
  signUp: vi.fn(),
  signInWithPassword: vi.fn(),
  signInWithOAuth: vi.fn(),
  resetPasswordForEmail: vi.fn(),
  updateUser: vi.fn(),
  signOut: vi.fn(),
}))
vi.mock("@/integrations/supabase/client", () => ({
  supabase: {
    rpc,
    auth: { signUp, signInWithPassword, signInWithOAuth, resetPasswordForEmail, updateUser, signOut },
  },
}))

import {
  cambiarClave,
  cerrarSesion,
  comprobarUsuarioLibre,
  entrarConClave,
  entrarConGoogle,
  enviarCorreoDeRecuperacion,
  mensajeDeAcceso,
  registrarPiloto,
} from "./sesion"

beforeEach(() => {
  vi.clearAllMocks()
  vi.spyOn(console, "warn").mockImplementation(() => {})
})

/** Un error como los de Supabase Auth: con código, o solo con el texto. */
const errorDeAuth = (message: string, code?: string) => Object.assign(new Error(message), code ? { code } : {})

describe("los errores de acceso, en español", () => {
  it("correo sin confirmar y clave mala dicen lo mismo: no delatan si la cuenta existe", () => {
    const mala = mensajeDeAcceso(errorDeAuth("Invalid login credentials", "invalid_credentials"))
    expect(mensajeDeAcceso(errorDeAuth("Email not confirmed", "email_not_confirmed"))).toBe(mala)
    expect(mala).toMatch(/no coinciden/)
  })

  it("reconoce por código y, si no viene, por el texto", () => {
    expect(mensajeDeAcceso({ code: "over_email_send_rate_limit", message: "x" })).toMatch(/Espera unos minutos/)
    expect(mensajeDeAcceso(errorDeAuth("email rate limit exceeded"))).toMatch(/Espera unos minutos/)
    expect(mensajeDeAcceso(errorDeAuth("Failed to fetch"))).toMatch(/conexión/)
  })

  it("lo desconocido sale general, y el original queda en la consola", () => {
    expect(mensajeDeAcceso(errorDeAuth("Database error saving new user", "unexpected_failure"))).toBe(
      "No pudimos completar la operación. Prueba de nuevo en un momento.",
    )
    expect(console.warn).toHaveBeenCalled()
    expect(mensajeDeAcceso(null)).toMatch(/No pudimos completar/)
  })
})

describe("comprobar si el usuario está libre", () => {
  it("libre", async () => {
    rpc.mockResolvedValue({ data: true, error: null })
    expect(await comprobarUsuarioLibre("capi_juanma")).toEqual({ libre: true, error: null })
    expect(rpc).toHaveBeenCalledWith("check_username_available", { p_username: "capi_juanma" })
  })

  it("tomado", async () => {
    rpc.mockResolvedValue({ data: false, error: null })
    expect(await comprobarUsuarioLibre("tomado")).toEqual({ libre: false, error: null })
  })

  /**
   * Las dos pantallas que la usan tratan el fallo distinto, y por eso se
   * devuelven las dos cosas: mientras se escribe, `libre: null` es «no se
   * sabe» y no se dice nada; antes de registrar, el `error` hace parar.
   */
  it("si la consulta falla, ni libre ni tomado, y el error viaja aparte", async () => {
    rpc.mockResolvedValue({ data: null, error: { message: "sin red" } })
    expect(await comprobarUsuarioLibre("quien_sea")).toEqual({ libre: null, error: { message: "sin red" } })
  })
})

describe("registrar", () => {
  it("manda el usuario en los metadatos y avisa que quedó sesión", async () => {
    signUp.mockResolvedValue({ data: { session: { access_token: "x" } }, error: null })

    expect(await registrarPiloto({ email: "a@b.co", password: "clave1234", username: "capi" })).toEqual({
      haySesion: true,
    })
    expect(signUp).toHaveBeenCalledWith({
      email: "a@b.co",
      password: "clave1234",
      options: { data: { username: "capi" } },
    })
  })

  it("con código de referido lo manda también", async () => {
    signUp.mockResolvedValue({ data: { session: null }, error: null })
    await registrarPiloto({ email: "a@b.co", password: "clave1234", username: "capi", referralCode: "NICO7" })

    expect(signUp).toHaveBeenCalledWith({
      email: "a@b.co",
      password: "clave1234",
      options: { data: { username: "capi", referral_code: "NICO7" } },
    })
  })

  it("sin código no se manda la clave vacía", async () => {
    signUp.mockResolvedValue({ data: { session: null }, error: null })
    await registrarPiloto({ email: "a@b.co", password: "clave1234", username: "capi", referralCode: null })

    expect(signUp.mock.calls[0][0].options.data).not.toHaveProperty("referral_code")
  })

  it("sin sesión (confirmación por correo encendida) lo dice", async () => {
    signUp.mockResolvedValue({ data: { session: null }, error: null })
    expect(await registrarPiloto({ email: "a@b.co", password: "clave1234", username: "capi" })).toEqual({
      haySesion: false,
    })
  })

  it("lanza en español para que el formulario lo muestre, con el original en cause", async () => {
    const original = new Error("User already registered")
    signUp.mockResolvedValue({ data: { session: null }, error: original })
    const promesa = registrarPiloto({ email: "a@b.co", password: "clave1234", username: "capi" })
    await expect(promesa).rejects.toThrow("No pudimos crear la cuenta con ese correo")
    await expect(promesa).rejects.toHaveProperty("cause", original)
  })
})

describe("entrar", () => {
  it("con correo y contraseña", async () => {
    signInWithPassword.mockResolvedValue({ error: null })
    await expect(entrarConClave("a@b.co", "clave1234")).resolves.toBeUndefined()
    expect(signInWithPassword).toHaveBeenCalledWith({ email: "a@b.co", password: "clave1234" })
  })

  it("lanza con credenciales malas, que es lo que se le muestra al piloto", async () => {
    signInWithPassword.mockResolvedValue({ error: new Error("Invalid login credentials") })
    await expect(entrarConClave("a@b.co", "mala")).rejects.toThrow("El correo o la contraseña no coinciden")
  })

  it("con Google devuelve el error en vez de lanzarlo: va a la franja de error", async () => {
    signInWithOAuth.mockResolvedValue({ error: { message: "proveedor caído" } })

    expect(await entrarConGoogle("https://aviatory.app/app")).toEqual({
      error: { message: "No pudimos completar la operación. Prueba de nuevo en un momento." },
    })
    expect(signInWithOAuth).toHaveBeenCalledWith({
      provider: "google",
      options: { redirectTo: "https://aviatory.app/app" },
    })
  })
})

describe("recuperar la contraseña", () => {
  it("manda el correo con el destino de vuelta", async () => {
    resetPasswordForEmail.mockResolvedValue({ error: null })
    await enviarCorreoDeRecuperacion("a@b.co", "http://localhost:5173/nueva-clave")

    expect(resetPasswordForEmail).toHaveBeenCalledWith("a@b.co", {
      redirectTo: "http://localhost:5173/nueva-clave",
    })
  })

  it("lanza si no se pudo mandar", async () => {
    resetPasswordForEmail.mockResolvedValue({ error: new Error("email rate limit exceeded") })
    await expect(enviarCorreoDeRecuperacion("a@b.co", "x")).rejects.toThrow("Espera unos minutos")
  })

  it("cambia la clave de la sesión abierta por el enlace", async () => {
    updateUser.mockResolvedValue({ error: null })
    await cambiarClave("claveNueva1")
    expect(updateUser).toHaveBeenCalledWith({ password: "claveNueva1" })
  })

  it("lanza si el enlace ya venció", async () => {
    updateUser.mockResolvedValue({ error: new Error("Auth session missing!") })
    await expect(cambiarClave("claveNueva1")).rejects.toThrow("El enlace ya venció")
  })

  it("cerrar sesión no lanza: devuelve el mensaje y quien llama decide", async () => {
    signOut.mockResolvedValue({ error: { message: "lo que sea" } })
    await expect(cerrarSesion()).resolves.toBe("lo que sea")
    expect(signOut).toHaveBeenCalled()
  })

  it("cerrar sesión sin problema devuelve null", async () => {
    signOut.mockResolvedValue({ error: null })
    await expect(cerrarSesion()).resolves.toBeNull()
  })
})
