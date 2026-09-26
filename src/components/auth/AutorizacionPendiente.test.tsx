import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { MemoryRouter } from "react-router-dom"
import { boton, clic, desmontarTodo, montar } from "@/test/pantalla"

const cuenta = vi.hoisted(() => ({
  VERSION_TERMINOS: "2026-09-26",
  tieneAutorizacionVigente: vi.fn(),
  registrarAutorizacion: vi.fn(),
}))
const sesion = vi.hoisted(() => ({
  user: { id: "p1", user_metadata: {} as Record<string, unknown> } as { id: string; user_metadata: Record<string, unknown> } | null,
}))
vi.mock("@/services/cuenta", () => cuenta)
vi.mock("@/services/sesion", () => ({ cerrarSesion: vi.fn() }))
vi.mock("@/hooks/useSession", () => ({ useSession: () => sesion }))

const { AutorizacionPendiente } = await import("./AutorizacionPendiente")

const pintar = () =>
  montar(
    <MemoryRouter>
      <AutorizacionPendiente>
        <p>el panel</p>
      </AutorizacionPendiente>
    </MemoryRouter>,
  )

beforeEach(() => {
  localStorage.clear()
  cuenta.tieneAutorizacionVigente.mockReset()
  cuenta.registrarAutorizacion.mockReset().mockResolvedValue(true)
  sesion.user = { id: "p1", user_metadata: {} }
})
afterEach(desmontarTodo)

describe("la autorización al entrar", () => {
  it("si ya consta, no pregunta nada", async () => {
    cuenta.tieneAutorizacionVigente.mockResolvedValue(true)
    const p = await pintar()
    expect(p.texto()).toContain("el panel")
    expect(document.querySelector("[role=dialog]")).toBeNull()
  })

  it("si la base no puede decirlo, deja pasar", async () => {
    cuenta.tieneAutorizacionVigente.mockResolvedValue(null)
    await pintar()
    expect(document.querySelector("[role=dialog]")).toBeNull()
  })

  it("si marcó la casilla al registrarse, guarda la constancia sin preguntar", async () => {
    cuenta.tieneAutorizacionVigente.mockResolvedValue(false)
    sesion.user = { id: "p1", user_metadata: { autorizacion_version: "2026-09-26" } }
    await pintar()
    expect(cuenta.registrarAutorizacion).toHaveBeenCalledWith("terminos_y_privacidad")
    expect(document.querySelector("[role=dialog]")).toBeNull()
  })

  it("si no consta, la pide con la casilla y la guarda al aceptar", async () => {
    cuenta.tieneAutorizacionVigente.mockResolvedValue(false)
    await pintar()
    expect(document.querySelector("[role=dialog]")).not.toBeNull()
    expect(boton("Aceptar y continuar").disabled).toBe(true)

    await clic(document.querySelector("[role=dialog] input[type=checkbox]") as HTMLElement)
    await clic(boton("Aceptar y continuar"))
    expect(cuenta.registrarAutorizacion).toHaveBeenCalledWith("terminos_y_privacidad")
    expect(document.querySelector("[role=dialog]")).toBeNull()
    expect(localStorage.getItem("aviatory.autorizacion.vigente")).toBe("p1:2026-09-26")
  })
})
