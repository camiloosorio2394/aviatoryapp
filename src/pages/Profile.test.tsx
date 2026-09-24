import { act } from "react"
import { MemoryRouter } from "react-router-dom"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import type { DatosDelPerfil } from "@/services/perfil"
import { boton, campo, clic, desmontarTodo, escribir, esperar, montar } from "@/test/pantalla"

const servicio = vi.hoisted(() => ({
  traerPerfil: vi.fn(),
  guardarPerfil: vi.fn(),
  comprobarUsuarioLibre: vi.fn(),
  subirFotoDePerfil: vi.fn(),
  borrarFotoDePerfil: vi.fn(),
}))
const avisos = vi.hoisted(() => ({ success: vi.fn(), error: vi.fn() }))
const errores = vi.hoisted(() => ({ reportarError: vi.fn() }))
const sesion = vi.hoisted(() => ({
  user: { id: "piloto-1", email: "ana@ejemplo.com" },
  session: null,
  isLoading: false,
}))

vi.mock("@/services/perfil", () => servicio)
vi.mock("@/services/verificacionHoras", () => ({ traerVerificacion: vi.fn().mockResolvedValue(null) }))
// Estas dos secciones piden sus propios datos y tienen su propia prueba de servicio.
vi.mock("@/components/perfil/VerificacionHoras", () => ({ VerificacionHoras: () => null }))
vi.mock("@/components/constancia/SeccionPlanDeEstudio", () => ({ SeccionPlanDeEstudio: () => null }))
vi.mock("sonner", () => ({ toast: avisos }))
vi.mock("@/lib/errores", () => errores)
vi.mock("@/hooks/useSession", () => ({ useSession: () => sesion }))

const { Profile } = await import("@/pages/Profile")

const PERFIL: DatosDelPerfil = {
  fullName: "Ana Restrepo",
  country: "Colombia",
  username: "capi_ana",
  photoUrl: null,
  stage: "cpl_ready",
  horasPreviasTotal: "250",
  horasPreviasPic: "120",
  totalCarrera: 251.5,
  picCarrera: 121.5,
  targetAirline: "Avianca",
  licenses: ["PPL", "CPL"],
  vuelos: { totalMin: 90, picMin: 90, xcMin: 0, count: 1 },
  ultimoVuelo: "2026-09-10",
  certs: [],
  recurrencia: { valid: 0, total: 0 },
  logros: { unlocked: 3, total: 20 },
  estudio: { pcaBest: null, quizzes: 0, longestStreak: 0 },
  icao: { level: 4, takenAt: null, source: "estimate" },
}

function pintar() {
  return montar(
    <MemoryRouter>
      <Profile />
    </MemoryRouter>,
  )
}

beforeEach(() => {
  servicio.traerPerfil.mockReset().mockResolvedValue(PERFIL)
  servicio.guardarPerfil.mockReset().mockResolvedValue(undefined)
  servicio.comprobarUsuarioLibre.mockReset().mockResolvedValue({ libre: true, fallo: false })
  avisos.success.mockReset()
  avisos.error.mockReset()
  errores.reportarError.mockReset()
})

afterEach(() => {
  desmontarTodo()
  vi.useRealTimers()
})

describe("el perfil del piloto", () => {
  it("muestra lo que trae la base, con el total de carrera calculado y no escrito", async () => {
    const p = await pintar()
    expect(servicio.traerPerfil).toHaveBeenCalledWith("piloto-1")
    expect(campo("Nombre completo (privado)").value).toBe("Ana Restrepo")
    expect(campo("Usuario (público en la comunidad)").value).toBe("capi_ana")
    expect(campo("Horas antes de Aviatory").value).toBe("250")
    expect(p.texto()).toContain("251.5 h")
    expect(p.texto()).toContain("PIC 121.5")
    expect(p.texto()).toContain("1.5 h de 1 vuelo en Aviatory")
  })

  it("guardar manda la identidad y la carrera como quedaron en pantalla", async () => {
    await pintar()
    await escribir(campo("Nombre completo (privado)"), "Ana María Restrepo")
    await escribir(campo("Horas antes de Aviatory"), "300")
    await clic(boton("IFR"))
    await clic(boton("PPL"))
    await clic(boton("Guardar cambios"))

    expect(servicio.guardarPerfil).toHaveBeenCalledWith("piloto-1", {
      fullName: "Ana María Restrepo",
      country: "Colombia",
      username: "capi_ana",
      stage: "cpl_ready",
      horasPreviasTotal: "300",
      horasPreviasPic: "120",
      targetAirline: "Avianca",
      licenses: ["CPL", "IFR"],
    })
    expect(avisos.success).toHaveBeenCalledWith("Perfil actualizado")
  })

  it("no guarda más horas PIC que totales", async () => {
    await pintar()
    await escribir(campo("De esas, PIC"), "400")
    await clic(boton("Guardar cambios"))

    expect(servicio.guardarPerfil).not.toHaveBeenCalled()
    expect(avisos.error).toHaveBeenCalledWith("Las horas como PIC no pueden ser más que las horas totales.")
  })

  it("un usuario nuevo se comprueba en el servidor y, si está tomado, no deja guardar", async () => {
    vi.useFakeTimers()
    servicio.comprobarUsuarioLibre.mockResolvedValue({ libre: false, fallo: false })
    const p = await pintar()

    await escribir(campo("Usuario (público en la comunidad)"), "Capi Juan!")
    // Se limpia mientras se escribe: minúsculas, sin espacios ni signos.
    expect(campo("Usuario (público en la comunidad)").value).toBe("capijuan")
    expect(p.texto()).toContain("Verificando disponibilidad")

    await act(async () => {
      await vi.advanceTimersByTimeAsync(400)
    })
    await esperar()

    expect(servicio.comprobarUsuarioLibre).toHaveBeenCalledWith("capijuan")
    expect(p.texto()).toContain("Ese usuario ya está tomado")
    expect(boton("Guardar cambios").disabled).toBe(true)
  })

  it("si no se pudo comprobar el usuario, no lo da por tomado ni por libre", async () => {
    vi.useFakeTimers()
    servicio.comprobarUsuarioLibre.mockResolvedValue({ libre: null, fallo: true })
    const p = await pintar()
    await escribir(campo("Usuario (público en la comunidad)"), "capi_nuevo")
    await act(async () => {
      await vi.advanceTimersByTimeAsync(400)
    })
    await esperar()

    expect(p.texto()).toContain("No pudimos comprobar si está libre")
    expect(p.texto()).not.toContain("Ese usuario ya está tomado")
    expect(boton("Guardar cambios").disabled).toBe(true)
  })

  it("si el perfil no carga lo reporta y avisa", async () => {
    const fallo = new Error("Failed to fetch profiles")
    servicio.traerPerfil.mockRejectedValue(fallo)
    await pintar()
    expect(errores.reportarError).toHaveBeenCalledWith("perfil: cargar", fallo)
    expect(avisos.error).toHaveBeenCalledWith("Failed to fetch profiles")
  })

  it("si no se guarda lo reporta y no dice «Perfil actualizado»", async () => {
    const fallo = new Error("new row violates row-level security policy")
    servicio.guardarPerfil.mockRejectedValue(fallo)
    await pintar()
    await clic(boton("Guardar cambios"))

    expect(errores.reportarError).toHaveBeenCalledWith("perfil: guardar", fallo)
    expect(avisos.success).not.toHaveBeenCalled()
  })
})
