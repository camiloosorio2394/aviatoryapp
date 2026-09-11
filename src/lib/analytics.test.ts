// @vitest-environment-options { "url": "https://aviatory.test/app" }
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

const posthog = vi.hoisted(() => ({ init: vi.fn(), identify: vi.fn(), capture: vi.fn(), reset: vi.fn() }))
const cargas = vi.hoisted(() => ({ total: 0, fallar: false }))

// La fábrica corre en el primer import de posthog-js del archivo: la primera prueba
// (sin clave) comprueba con el contador que ese import nunca ocurrió.
vi.mock("posthog-js", () => {
  cargas.total++
  return {
    get default() {
      if (cargas.fallar) throw new Error("sin red")
      return posthog
    },
  }
})

async function modulo() {
  vi.resetModules()
  return import("@/lib/analytics")
}

/** Para comprobar que algo NO pasa: da tiempo a que un import() dinámico resuelva. */
const esperar = () => new Promise((r) => setTimeout(r, 50))

beforeEach(() => {
  Object.values(posthog).forEach((f) => f.mockReset())
  cargas.total = 0
  cargas.fallar = false
})

afterEach(() => {
  vi.unstubAllEnvs()
})

describe("analytics", () => {
  it("sin clave no descarga PostHog y todo es un no-op", async () => {
    vi.stubEnv("VITE_POSTHOG_KEY", "")
    const a = await modulo()
    a.initAnalytics()
    a.identifyUser("piloto-1")
    a.trackPageView("/app")
    await esperar()

    expect(cargas.total).toBe(0)
    expect(posthog.init).not.toHaveBeenCalled()
  })

  it("con clave aplica lo registrado antes de cargar, en orden y con la URL de ese momento", async () => {
    vi.stubEnv("VITE_POSTHOG_KEY", "phc_prueba")
    expect(window.location.hostname).toBe("aviatory.test")
    const a = await modulo()
    a.initAnalytics()
    a.trackPageView("/app")
    a.identifyUser("piloto-1", { email: "p@aviatory.test" })
    window.history.pushState({}, "", "/app/perfil")
    a.track(a.Events.QUIZ_STARTED, { materia: "meteorologia" })
    await vi.waitFor(() => expect(posthog.capture).toHaveBeenCalledTimes(2))

    expect(cargas.total).toBe(1)
    expect(posthog.init).toHaveBeenCalledWith("phc_prueba", expect.objectContaining({ capture_pageview: false }))
    const orden = [posthog.init, posthog.capture, posthog.identify].map((f) => f.mock.invocationCallOrder[0])
    expect(orden).toEqual([...orden].sort((x, y) => x - y))
    expect(posthog.capture).toHaveBeenNthCalledWith(1, "$pageview", { $current_url: "https://aviatory.test/app", path: "/app" })
    expect(posthog.capture).toHaveBeenNthCalledWith(2, "quiz_started", { materia: "meteorologia" })
  })

  it("inicializar dos veces no carga dos veces", async () => {
    vi.stubEnv("VITE_POSTHOG_KEY", "phc_prueba")
    const a = await modulo()
    a.initAnalytics()
    a.initAnalytics()
    await vi.waitFor(() => expect(posthog.init).toHaveBeenCalled())
    await esperar()
    expect(posthog.init).toHaveBeenCalledTimes(1)
  })

  it("si PostHog no carga, la app sigue y las llamadas no rompen", async () => {
    vi.stubEnv("VITE_POSTHOG_KEY", "phc_prueba")
    cargas.fallar = true
    const aviso = vi.spyOn(console, "warn").mockImplementation(() => {})
    const a = await modulo()
    a.initAnalytics()
    a.track("algo")
    await vi.waitFor(() => expect(aviso).toHaveBeenCalled())
    await esperar()

    expect(posthog.capture).not.toHaveBeenCalled()
  })
})
