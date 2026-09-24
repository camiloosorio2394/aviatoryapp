import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import type { License } from "@/services/documentos"
import { boton, campo, clic, desmontarTodo, escribir, montar } from "@/test/pantalla"

vi.stubEnv("TZ", "America/Bogota")

const servicio = vi.hoisted(() => ({
  traerLicencias: vi.fn(),
  revisarVencimientos: vi.fn(),
  borrarLicencia: vi.fn(),
  guardarLicencia: vi.fn(),
}))
const avisos = vi.hoisted(() => ({ success: vi.fn(), error: vi.fn() }))
const errores = vi.hoisted(() => ({ reportarError: vi.fn() }))
const sesion = vi.hoisted(() => ({ user: { id: "piloto-1" }, session: null, isLoading: false }))

vi.mock("@/services/documentos", () => servicio)
vi.mock("sonner", () => ({ toast: avisos }))
vi.mock("@/lib/errores", () => errores)
vi.mock("@/hooks/useSession", () => ({ useSession: () => sesion }))

const { Expiries } = await import("@/pages/Expiries")

function licencia(parcial: Partial<License>): License {
  return {
    id: 1,
    license_type: "medical_class_1",
    custom_name: null,
    issued_date: null,
    expires_date: null,
    document_url: null,
    notes: null,
    created_at: "2026-01-01T00:00:00Z",
    ...parcial,
  }
}

beforeEach(() => {
  vi.useFakeTimers({ toFake: ["Date"] })
  // Jueves 24 de septiembre de 2026, 10:00 en Bogotá.
  vi.setSystemTime(new Date("2026-09-24T15:00:00Z"))
  servicio.traerLicencias.mockReset()
  servicio.revisarVencimientos.mockReset().mockResolvedValue(undefined)
  servicio.borrarLicencia.mockReset().mockResolvedValue({ error: null })
  servicio.guardarLicencia.mockReset().mockResolvedValue(undefined)
  avisos.success.mockReset()
  avisos.error.mockReset()
  errores.reportarError.mockReset()
  vi.spyOn(window, "confirm").mockReturnValue(true)
})

afterEach(() => {
  desmontarTodo()
  vi.useRealTimers()
  vi.restoreAllMocks()
})

describe("los vencimientos del piloto", () => {
  it("separa lo vencido de lo crítico y lo dice arriba, con la misma cuenta que las filas", async () => {
    servicio.traerLicencias.mockResolvedValue({
      licencias: [
        licencia({ id: 1, license_type: "medical_class_1", expires_date: "2026-09-20" }),
        licencia({ id: 2, license_type: "type_rating", custom_name: "A320", expires_date: "2026-09-27" }),
        licencia({ id: 3, license_type: "cpl", expires_date: "2027-06-01" }),
      ],
      error: null,
    })
    const p = await montar(<Expiries />)

    expect(servicio.traerLicencias).toHaveBeenCalledWith("piloto-1")
    expect(p.texto()).toContain("VENCIMIENTOS · 2 CRÍTICOS")
    expect(p.texto()).toContain("Lo que vence pronto")
    expect(p.texto()).toContain("1 ítem vencido y 1 por vencer en 7 días o menos")
    expect(p.texto()).toContain("Type Rating A320")
    expect(p.texto()).toContain("VENCIDO")
    expect(p.texto()).toContain("AL DÍA")
  })

  it("con todo vigente no alarma", async () => {
    servicio.traerLicencias.mockResolvedValue({
      licencias: [licencia({ id: 3, license_type: "cpl", expires_date: "2027-06-01" })],
      error: null,
    })
    const p = await montar(<Expiries />)
    expect(p.texto()).toContain("VENCIMIENTOS · TODO AL DÍA")
    expect(p.texto()).not.toContain("Lo que vence pronto")
  })

  it("al entrar le pide al servidor que revise si toca avisar algo", async () => {
    servicio.traerLicencias.mockResolvedValue({ licencias: [], error: null })
    await montar(<Expiries />)
    expect(servicio.revisarVencimientos).toHaveBeenCalledTimes(1)
  })

  it("sin licencias invita a cargar la primera", async () => {
    servicio.traerLicencias.mockResolvedValue({ licencias: [], error: null })
    const p = await montar(<Expiries />)
    expect(p.texto()).toContain("Carga tus licencias y certificaciones")
  })

  it("si la carga falla lo reporta, además de avisar", async () => {
    const fallo = { message: "permission denied for table licenses_held" }
    servicio.traerLicencias.mockResolvedValue({ licencias: [], error: fallo })
    await montar(<Expiries />)
    expect(errores.reportarError).toHaveBeenCalledWith("vencimientos: cargar", fallo)
    expect(avisos.error).toHaveBeenCalledWith(fallo.message)
  })

  it("guardar manda el tipo, las fechas y las notas limpias, y recarga la lista", async () => {
    servicio.traerLicencias.mockResolvedValue({ licencias: [], error: null })
    await montar(<Expiries />)

    await clic(boton("Agregar"))
    await escribir(campo("Emitida"), "2026-03-01")
    await escribir(campo("Vence el"), "2027-03-01")
    await escribir(campo("Notas (opcional)"), "  Renovar en Bogotá  ")
    await clic(boton("Guardar"))

    expect(servicio.guardarLicencia).toHaveBeenCalledWith({
      userId: "piloto-1",
      licenseType: "medical_class_1",
      customName: null,
      issuedDate: "2026-03-01",
      expiresDate: "2027-03-01",
      notes: "Renovar en Bogotá",
    })
    expect(avisos.success).toHaveBeenCalledWith("Guardada")
    expect(servicio.traerLicencias).toHaveBeenCalledTimes(2)
  })

  it("si no se guarda lo reporta y no da las gracias", async () => {
    servicio.traerLicencias.mockResolvedValue({ licencias: [], error: null })
    const fallo = new Error("fallo al insertar")
    servicio.guardarLicencia.mockRejectedValue(fallo)
    await montar(<Expiries />)

    await clic(boton("Agregar"))
    await escribir(campo("Vence el"), "2027-03-01")
    await clic(boton("Guardar"))

    expect(errores.reportarError).toHaveBeenCalledWith("vencimientos: guardar", fallo)
    expect(avisos.error).toHaveBeenCalledWith("fallo al insertar")
    expect(avisos.success).not.toHaveBeenCalled()
  })

  it("si borrar falla, la licencia vuelve y el fallo queda reportado", async () => {
    const fallo = { message: "permission denied" }
    servicio.borrarLicencia.mockResolvedValue({ error: fallo })
    servicio.traerLicencias.mockResolvedValue({
      licencias: [licencia({ id: 9, license_type: "ifr", expires_date: "2027-06-01" })],
      error: null,
    })
    const p = await montar(<Expiries />)
    await clic(boton("Eliminar Habilitación IFR"))

    expect(servicio.borrarLicencia).toHaveBeenCalledWith(9)
    expect(errores.reportarError).toHaveBeenCalledWith("vencimientos: eliminar", fallo)
    expect(p.texto()).toContain("Habilitación IFR")
  })

  it("borrar sin confirmar no toca nada", async () => {
    vi.mocked(window.confirm).mockReturnValue(false)
    servicio.traerLicencias.mockResolvedValue({
      licencias: [licencia({ id: 9, license_type: "ifr", expires_date: "2027-06-01" })],
      error: null,
    })
    await montar(<Expiries />)
    await clic(boton("Eliminar Habilitación IFR"))
    expect(servicio.borrarLicencia).not.toHaveBeenCalled()
  })
})
