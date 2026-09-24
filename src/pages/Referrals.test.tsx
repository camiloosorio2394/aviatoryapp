import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { boton, clic, desmontarTodo, montar } from "@/test/pantalla"

const servicio = vi.hoisted(() => ({ traerEstadisticasDeReferidos: vi.fn() }))
const avisos = vi.hoisted(() => ({ success: vi.fn(), error: vi.fn() }))
const sesion = vi.hoisted(() => ({ user: { id: "piloto-1" }, session: null, isLoading: false }))

vi.mock("@/services/referidos", () => servicio)
vi.mock("sonner", () => ({ toast: avisos }))
vi.mock("@/hooks/useSession", () => ({ useSession: () => sesion }))

const { Referrals } = await import("@/pages/Referrals")

const ENLACE = "https://aviatoryapp-mu.vercel.app/login?mode=signup&ref=CAPI42"
const escribirPortapapeles = vi.fn()

beforeEach(() => {
  vi.useFakeTimers({ toFake: ["setTimeout", "clearTimeout"] })
  servicio.traerEstadisticasDeReferidos
    .mockReset()
    .mockResolvedValue({ my_code: "CAPI42", total_referred: 3, active_referred: 1 })
  avisos.success.mockReset()
  avisos.error.mockReset()
  escribirPortapapeles.mockReset().mockResolvedValue(undefined)
  Object.defineProperty(navigator, "clipboard", { value: { writeText: escribirPortapapeles }, configurable: true })
})

afterEach(() => {
  desmontarTodo()
  vi.useRealTimers()
  vi.restoreAllMocks()
})

describe("los referidos", () => {
  it("muestra el código, el enlace de registro con el código y a cuántos trajo", async () => {
    const p = await montar(<Referrals />)
    expect(p.texto()).toContain("CAPI42")
    expect(p.texto()).toContain(ENLACE)
    expect(p.texto()).toContain("Pilotos invitados")
    expect(p.texto()).toContain("Upgradearon a Pro")
    expect(p.texto()).not.toContain("Comparte tu código y aquí verás")
  })

  it("sin referidos todavía explica qué va a ver ahí", async () => {
    servicio.traerEstadisticasDeReferidos.mockResolvedValue({ my_code: "CAPI42", total_referred: 0, active_referred: 0 })
    const p = await montar(<Referrals />)
    expect(p.texto()).toContain("Comparte tu código y aquí verás cuántos pilotos entraron con él")
  })

  it("copiar deja el enlace en el portapapeles y lo confirma", async () => {
    const p = await montar(<Referrals />)
    await clic(boton("Copiar link"))
    expect(escribirPortapapeles).toHaveBeenCalledWith(ENLACE)
    expect(avisos.success).toHaveBeenCalledWith("Link copiado")
    expect(p.texto()).toContain("Copiado")
  })

  it("si el navegador no deja copiar, lo dice", async () => {
    escribirPortapapeles.mockRejectedValue(new Error("NotAllowedError"))
    await montar(<Referrals />)
    await clic(boton("Copiar link"))
    expect(avisos.error).toHaveBeenCalledWith("No pudimos copiar")
  })

  it("WhatsApp abre el mensaje con el enlace dentro", async () => {
    const abrir = vi.spyOn(window, "open").mockReturnValue(null)
    await montar(<Referrals />)
    await clic(boton("WhatsApp"))
    const url = String(abrir.mock.calls[0][0])
    expect(url.startsWith("https://wa.me/?text=")).toBe(true)
    expect(decodeURIComponent(url)).toContain(ENLACE)
  })

  it("sin código (o con la consulta caída) no ofrece compartir ni se queda «Cargando…»", async () => {
    servicio.traerEstadisticasDeReferidos.mockResolvedValue(null)
    const p = await montar(<Referrals />)

    expect(p.texto()).toContain("—")
    expect(p.texto()).not.toContain("Cargando…")
    expect(p.texto()).toContain("Tu enlace no está disponible ahora mismo")
    expect(boton("Copiar link").disabled).toBe(true)
    expect(boton("WhatsApp").disabled).toBe(true)
    expect(boton("Email").disabled).toBe(true)
  })
})
