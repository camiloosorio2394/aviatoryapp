import { MemoryRouter, Route, Routes } from "react-router-dom"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { boton, campo, clic, desmontarTodo, escribir, montar } from "@/test/pantalla"

vi.stubEnv("TZ", "America/Bogota")

const piloto = vi.hoisted(() => ({ guardarPerfilInicial: vi.fn() }))
const plan = vi.hoisted(() => ({ guardarPlanDeEstudio: vi.fn() }))
const analitica = vi.hoisted(() => ({ track: vi.fn() }))
const avisos = vi.hoisted(() => ({ success: vi.fn(), error: vi.fn() }))
const errores = vi.hoisted(() => ({ reportarError: vi.fn() }))
const sesion = vi.hoisted(() => ({ user: { id: "piloto-1" } as { id: string } | null, session: null, isLoading: false }))

vi.mock("@/services/piloto", () => piloto)
vi.mock("@/services/planDeEstudio", async (original) => ({
  ...(await original<typeof import("@/services/planDeEstudio")>()),
  ...plan,
}))
vi.mock("@/lib/analytics", async (original) => ({
  ...(await original<typeof import("@/lib/analytics")>()),
  ...analitica,
}))
vi.mock("sonner", () => ({ toast: avisos }))
vi.mock("@/lib/errores", () => errores)
vi.mock("@/hooks/useSession", () => ({ useSession: () => sesion }))

const { Onboarding } = await import("@/pages/Onboarding")

function pintar() {
  return montar(
    <MemoryRouter initialEntries={["/onboarding"]}>
      <Routes>
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/app/test-inicial" element={<p>Pantalla del test inicial</p>} />
      </Routes>
    </MemoryRouter>,
  )
}

/** Recorre los pasos hasta el resumen con un piloto comercial de 250 horas. */
async function llegarAlResumen() {
  await clic(boton("Piloto comercial de avión"))
  await clic(boton("Siguiente"))
  await escribir(campo("Horas totales de vuelo"), "250")
  await escribir(campo("Horas como PIC (Opcional)"), "120")
  await clic(boton("Siguiente"))
  await clic(boton("PCA"))
  await clic(boton("IFR"))
  await clic(boton("Siguiente"))
  await escribir(campo("Fecha objetivo (Opcional)"), "2027-03-15")
  await clic(boton("Siguiente"))
  await clic(boton("sábado"))
  await clic(boton("30 min"))
  await clic(boton("Siguiente"))
}

beforeEach(() => {
  sesion.user = { id: "piloto-1" }
  piloto.guardarPerfilInicial.mockReset().mockResolvedValue(undefined)
  plan.guardarPlanDeEstudio.mockReset().mockResolvedValue(undefined)
  analitica.track.mockReset()
  avisos.success.mockReset()
  avisos.error.mockReset()
  errores.reportarError.mockReset()
})

afterEach(() => {
  desmontarTodo()
  vi.restoreAllMocks()
})

describe("el onboarding", () => {
  it("no deja avanzar sin elegir la etapa", async () => {
    const p = await pintar()
    expect(p.texto()).toContain("Paso 1 de 6")
    expect(boton("Siguiente").disabled).toBe(true)
  })

  it("no deja pasar más horas PIC que totales", async () => {
    const p = await pintar()
    await clic(boton("Piloto comercial de avión"))
    await clic(boton("Siguiente"))
    await escribir(campo("Horas totales de vuelo"), "100")
    await escribir(campo("Horas como PIC (Opcional)"), "150")
    await clic(boton("Siguiente"))

    expect(avisos.error).toHaveBeenCalledWith("Las horas como PIC no pueden ser más que las horas totales.")
    expect(p.texto()).toContain("Paso 2 de 6")
  })

  it("sin días de estudio no deja seguir", async () => {
    await pintar()
    await clic(boton("Piloto comercial de avión"))
    await clic(boton("Siguiente"))
    await escribir(campo("Horas totales de vuelo"), "10")
    await clic(boton("Siguiente"))
    await clic(boton("Siguiente"))
    await clic(boton("Siguiente"))
    // El plan sugerido trae lunes, miércoles y viernes: se quitan los tres.
    await clic(boton("lunes"))
    await clic(boton("miércoles"))
    await clic(boton("viernes"))
    expect(boton("Siguiente").disabled).toBe(true)
  })

  it("el resumen repite lo elegido, y confirmar guarda perfil y plan y lleva al test inicial", async () => {
    const p = await pintar()
    await llegarAlResumen()

    expect(p.texto()).toContain("Piloto comercial de avión (PCA)")
    expect(p.texto()).toContain("250 totales · 120 PIC")
    expect(p.texto()).toContain("CPL, IFR")
    // La fecha no se corre un día por la zona horaria.
    expect(p.texto()).toContain("15 de marzo de 2027")
    expect(p.texto()).toContain("lunes, miércoles, viernes y sábado a las 20:00 · 30 min")

    await clic(boton("Confirmar y entrar"))

    expect(piloto.guardarPerfilInicial).toHaveBeenCalledWith("piloto-1", {
      stage: "cpl_ready",
      horasPreviasTotal: 250,
      horasPreviasPic: 120,
      licenses: ["CPL", "IFR"],
      targetAirline: null,
      targetDate: "2027-03-15",
    })
    expect(plan.guardarPlanDeEstudio).toHaveBeenCalledWith("piloto-1", {
      dias: [1, 3, 5, 6],
      hora: "20:00",
      zona: "America/Bogota",
      minutosMeta: 30,
    })
    expect(analitica.track).toHaveBeenCalledWith("onboarding_completed", {
      stage: "cpl_ready",
      target_airline: null,
      total_hours: 250,
    })
    expect(p.texto()).toContain("Pantalla del test inicial")
  })

  it("si el plan no se guarda, igual entra: no lo devuelve al principio", async () => {
    vi.spyOn(console, "warn").mockImplementation(() => {})
    plan.guardarPlanDeEstudio.mockRejectedValue(new Error("sin red"))
    const p = await pintar()
    await llegarAlResumen()
    await clic(boton("Confirmar y entrar"))

    expect(p.texto()).toContain("Pantalla del test inicial")
  })

  it("si el perfil no se guarda lo reporta, avisa y no lo deja pasar como si nada", async () => {
    const fallo = new Error("new row violates row-level security policy")
    piloto.guardarPerfilInicial.mockRejectedValue(fallo)
    const p = await pintar()
    await llegarAlResumen()
    await clic(boton("Confirmar y entrar"))

    expect(errores.reportarError).toHaveBeenCalledWith("onboarding: guardar perfil", fallo)
    expect(avisos.error).toHaveBeenCalledWith(fallo.message)
    expect(plan.guardarPlanDeEstudio).not.toHaveBeenCalled()
    expect(p.texto()).not.toContain("Pantalla del test inicial")
    expect(p.texto()).toContain("Confirma tus datos")
  })

  it("sin sesión no intenta guardar", async () => {
    sesion.user = null
    await pintar()
    await llegarAlResumen()
    await clic(boton("Confirmar y entrar"))
    expect(piloto.guardarPerfilInicial).not.toHaveBeenCalled()
    expect(avisos.error).toHaveBeenCalledWith("Sesión perdida. Inicia sesión de nuevo.")
  })
})
