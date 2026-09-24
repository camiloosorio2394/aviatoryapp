import { MemoryRouter } from "react-router-dom"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import type { SubjectIntel } from "@/services/reportesExamen"
import { boton, campo, clic, desmontarTodo, desplegable, elegir, escribir, montar } from "@/test/pantalla"

const servicio = vi.hoisted(() => ({
  traerIntelDeMaterias: vi.fn(),
  traerMaterias: vi.fn(),
  traerTemas: vi.fn(),
  guardarReporte: vi.fn(),
}))
const avisos = vi.hoisted(() => ({ success: vi.fn(), error: vi.fn(), warning: vi.fn() }))
const errores = vi.hoisted(() => ({ reportarError: vi.fn() }))
const sesion = vi.hoisted(() => ({ user: { id: "piloto-1" }, session: null, isLoading: false }))

vi.mock("@/services/reportesExamen", () => servicio)
vi.mock("@/components/ui/select", () => import("@/test/selectNativo"))
vi.mock("sonner", () => ({ toast: avisos }))
vi.mock("@/lib/errores", () => errores)
vi.mock("@/hooks/useSession", () => ({ useSession: () => sesion }))

const { ExamTracker } = await import("@/pages/ExamTracker")

function materia(parcial: Partial<SubjectIntel>): SubjectIntel {
  return {
    subject_id: 1,
    subject_name: "Meteorología",
    subject_slug: "meteorologia",
    total_reports: 0,
    pass_rate: null,
    hottest_topic: null,
    ...parcial,
  }
}

function pintar() {
  return montar(
    <MemoryRouter>
      <ExamTracker />
    </MemoryRouter>,
  )
}

async function abrirFormularioConMateria() {
  await clic(boton("Reportar mi examen"))
  await elegir(desplegable("Materia"), "1")
}

beforeEach(() => {
  vi.useFakeTimers({ toFake: ["Date"] })
  vi.setSystemTime(new Date("2026-09-24T15:00:00Z"))
  servicio.traerIntelDeMaterias.mockReset().mockResolvedValue({ materias: [], error: null })
  servicio.traerMaterias.mockReset().mockResolvedValue([
    { id: 1, name: "Meteorología", slug: "meteorologia" },
    { id: 2, name: "Navegación", slug: "navegacion" },
  ])
  servicio.traerTemas.mockReset().mockResolvedValue([
    { id: 10, subject_id: 1, key: "frentes", label: "Frentes y masas de aire" },
    { id: 11, subject_id: 1, key: "metar", label: "Lectura de METAR" },
    { id: 20, subject_id: 2, key: "vor", label: "VOR" },
  ])
  servicio.guardarReporte.mockReset().mockResolvedValue({ temasGuardados: true })
  avisos.success.mockReset()
  avisos.error.mockReset()
  avisos.warning.mockReset()
  errores.reportarError.mockReset()
})

afterEach(() => {
  desmontarTodo()
  vi.useRealTimers()
})

describe("el Exam Tracker", () => {
  it("con reportes muestra el total, la cobertura y el promedio solo de las materias con pass rate", async () => {
    servicio.traerIntelDeMaterias.mockResolvedValue({
      materias: [
        materia({ subject_id: 1, total_reports: 12, pass_rate: 70, hottest_topic: "Frentes" }),
        materia({ subject_id: 2, subject_name: "Navegación", subject_slug: "navegacion", total_reports: 0 }),
      ],
      error: null,
    })
    const p = await pintar()

    expect(p.texto()).toContain("12 reportes compartidos")
    expect(p.texto()).toContain("1 de 2 materias con inteligencia")
    expect(p.texto()).toContain("12 reportes · 90d")
    expect(p.texto()).toContain("Sin reportes · sé el primero")
    const enlaces = [...p.contenedor.querySelectorAll("a")].map((a) => a.getAttribute("href"))
    expect(enlaces).toContain("/app/examenes/meteorologia")
  })

  it("sin ningún reporte no inventa cifras: invita a ser el primero", async () => {
    servicio.traerIntelDeMaterias.mockResolvedValue({ materias: [materia({})], error: null })
    const p = await pintar()
    expect(p.texto()).toContain("Sé el primero en reportar")
    expect(p.texto()).not.toContain("reportes compartidos")
  })

  it("si la carga falla lo reporta y avisa", async () => {
    const fallo = { message: "function get_all_subjects_intel() does not exist" }
    servicio.traerIntelDeMaterias.mockResolvedValue({ materias: [], error: fallo })
    await pintar()
    expect(errores.reportarError).toHaveBeenCalledWith("exam tracker: cargar materias", fallo)
    expect(avisos.error).toHaveBeenCalledWith(fallo.message)
  })

  it("sin materia elegida no deja enviar", async () => {
    await pintar()
    await clic(boton("Reportar mi examen"))
    expect(boton(/^Reportar$/).disabled).toBe(true)
  })

  it("el reporte lleva lo que marcó el piloto y solo los temas de su materia", async () => {
    const p = await pintar()
    await abrirFormularioConMateria()

    expect(p.texto()).toContain("Frentes y masas de aire")
    expect(p.texto()).not.toContain("VOR")

    await clic(boton("Frentes y masas de aire"))
    await clic(boton("No pasé"))
    await clic(boton(/^4$/))
    await escribir(campo("Score (opcional)"), "72")
    await escribir(campo("Tips para el próximo piloto (opcional)"), "  Repasen frentes ocluidos  ")
    await clic(boton(/^Reportar$/))

    expect(servicio.guardarReporte).toHaveBeenCalledWith(
      {
        userId: "piloto-1",
        subjectId: 1,
        examDate: "2026-09-24",
        region: "bogota",
        passed: false,
        score: 72,
        difficulty: 4,
        tips: "Repasen frentes ocluidos",
        recalledQuestions: null,
      },
      [10],
    )
    expect(avisos.success).toHaveBeenCalled()
    // Se recarga la portada para que el reporte nuevo cuente.
    expect(servicio.traerIntelDeMaterias).toHaveBeenCalledTimes(2)
  })

  it("si el reporte quedó pero los temas no, lo dice en vez de dar las gracias", async () => {
    servicio.guardarReporte.mockResolvedValue({ temasGuardados: false })
    await pintar()
    await abrirFormularioConMateria()
    await clic(boton(/^Reportar$/))

    expect(avisos.warning).toHaveBeenCalledWith("Guardamos tu reporte, pero no los temas que marcaste.")
    expect(avisos.success).not.toHaveBeenCalled()
  })

  it("el tope diario se explica y no se reporta como fallo", async () => {
    servicio.guardarReporte.mockRejectedValue({ message: "demasiadas_publicaciones" })
    await pintar()
    await abrirFormularioConMateria()
    await clic(boton(/^Reportar$/))

    expect(avisos.error).toHaveBeenCalledWith("Ya enviaste varios reportes hoy. Vuelve a intentarlo mañana.")
    expect(errores.reportarError).not.toHaveBeenCalled()
  })

  it("cualquier otro fallo al guardar sí se reporta", async () => {
    const fallo = new Error("fetch failed")
    servicio.guardarReporte.mockRejectedValue(fallo)
    const p = await pintar()
    await abrirFormularioConMateria()
    await clic(boton(/^Reportar$/))

    expect(errores.reportarError).toHaveBeenCalledWith("reporte de examen", fallo)
    // El formulario sigue abierto: lo escrito no se pierde.
    expect(p.texto()).toContain("Reporta tu examen")
  })
})
