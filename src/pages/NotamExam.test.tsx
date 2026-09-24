import { MemoryRouter } from "react-router-dom"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import type { ResultadoEvaluacion, SesionEvaluacion } from "@/services/evaluaciones"
import { boton, clic, desmontarTodo, hayBoton, montar } from "@/test/pantalla"

/**
 * La evaluación de NOTAM, que es la pantalla genérica de evaluación
 * (ExamenModulo) con la configuración del módulo. Lo que se prueba aquí vale
 * para Mercancías, Aerodinámica y Aeropuertos, que usan la misma pantalla.
 */

const servidor = vi.hoisted(() => ({
  iniciarEvaluacion: vi.fn(),
  responderPregunta: vi.fn(),
  terminarEvaluacion: vi.fn(),
}))
const progreso = vi.hoisted(() => ({
  fetchNotamProgress: vi.fn(),
  pushPendingLocalProgress: vi.fn(),
}))
const historial = vi.hoisted(() => ({ traerHistorialNotam: vi.fn() }))
const sesion = vi.hoisted(() => ({
  actual: { user: { id: "piloto-1" } as { id: string } | null, session: null, isLoading: false },
}))

vi.mock("@/services/evaluaciones", async (original) => ({
  ...(await original<typeof import("@/services/evaluaciones")>()),
  ...servidor,
}))
vi.mock("@/lib/notamProgress", () => progreso)
vi.mock("@/services/intentosExamen", () => historial)
vi.mock("@/hooks/useSession", () => ({ useSession: () => sesion.actual }))

const { NotamExam } = await import("@/pages/NotamExam")
const { ErrorEvaluacion } = await import("@/services/rpc")
const { NOTAM_TOTALES, readLocalProgress, writeLocalProgress } = await import("@/lib/notamComun")

const TODAS = Array.from({ length: NOTAM_TOTALES.lessonScreens }, (_, i) => i + 1)

const intento: SesionEvaluacion = {
  id: "sesion-1",
  venceEn: "2026-09-24T20:00:00Z",
  retroalimentacion: "al_final",
  aprobacion: 80,
  preguntas: [
    { posicion: 1, enunciado: "¿Qué indica la casilla Q?", opciones: ["El aeródromo", "El código Q", "La vigencia"], tema: null },
    { posicion: 2, enunciado: "¿Qué indica la casilla C?", opciones: ["El fin de la vigencia", "El inicio"], tema: null },
  ],
}

const aprobado: ResultadoEvaluacion = {
  puntaje: 100,
  correctas: 2,
  total: 2,
  aprobada: true,
  aprobacion: 80,
  duracionSegundos: 75,
  revision: [
    { posicion: 1, opcion: 1, correcta: true, opcionCorrecta: 1, explicacion: "La Q resume el NOTAM.", referencia: null },
    { posicion: 2, opcion: 0, correcta: true, opcionCorrecta: 0, explicacion: "C es el fin.", referencia: null },
  ],
}

function pintar() {
  return montar(
    <MemoryRouter>
      <NotamExam />
    </MemoryRouter>,
  )
}

beforeEach(() => {
  localStorage.clear()
  sesion.actual = { user: { id: "piloto-1" }, session: null, isLoading: false }
  servidor.iniciarEvaluacion.mockReset().mockResolvedValue(intento)
  servidor.responderPregunta
    .mockReset()
    .mockImplementation(async (_s: string, posicion: number, opcion: number) => ({ posicion, opcion, correccion: null }))
  servidor.terminarEvaluacion.mockReset().mockResolvedValue(aprobado)
  progreso.fetchNotamProgress.mockReset().mockResolvedValue({ lessonScreens: TODAS })
  progreso.pushPendingLocalProgress.mockReset().mockImplementation(async (remoto: unknown) => remoto)
  historial.traerHistorialNotam.mockReset().mockResolvedValue({ filas: [], cuantos: 0, mejor: null })
})

afterEach(() => {
  desmontarTodo()
})

describe("la evaluación de NOTAM", () => {
  it("con la lección a medias no se abre y no gasta un intento en el servidor", async () => {
    progreso.fetchNotamProgress.mockResolvedValue({ lessonScreens: [1, 2, 3] })
    const p = await pintar()

    expect(p.texto()).toContain("La evaluación se abre cuando termines la lectura")
    expect(p.texto()).toContain(`Te faltan ${NOTAM_TOTALES.lessonScreens - 3} secciones por leer`)
    expect(servidor.iniciarEvaluacion).not.toHaveBeenCalled()
  })

  it("lo leído en otro equipo cuenta: la base abre la puerta y el progreso queda también en este", async () => {
    writeLocalProgress({ lessonScreens: [1] })
    const p = await pintar()

    expect(progreso.fetchNotamProgress).toHaveBeenCalledWith("piloto-1")
    expect(servidor.iniciarEvaluacion).toHaveBeenCalledWith("notam_evaluacion")
    expect(p.texto()).toContain("¿Qué indica la casilla Q?")
    expect(readLocalProgress().lessonScreens).toEqual(TODAS)
  })

  it("elegir no envía nada; avanzar registra la opción elegida y al final se califica en el servidor", async () => {
    const p = await pintar()
    expect(p.texto()).toContain("Pregunta 1 de 2")

    await clic(boton("Opción B: El código Q"))
    expect(servidor.responderPregunta).not.toHaveBeenCalled()
    // Durante el intento no hay corrección: nada de explicación todavía.
    expect(p.texto()).not.toContain("La Q resume el NOTAM.")

    await clic(boton("Siguiente"))
    expect(servidor.responderPregunta).toHaveBeenCalledWith("sesion-1", 1, 1)
    expect(p.texto()).toContain("Pregunta 2 de 2")

    await clic(boton("Opción A: El fin de la vigencia"))
    await clic(boton("Terminar y ver mi resultado"))

    expect(servidor.responderPregunta).toHaveBeenLastCalledWith("sesion-1", 2, 0)
    expect(servidor.terminarEvaluacion).toHaveBeenCalledWith("sesion-1")
    expect(p.texto()).toContain("Tus resultados")
    expect(p.texto()).toContain("2 de 2")
    expect(p.texto()).toContain("Aprobado")
    expect(p.texto()).toContain("La Q resume el NOTAM.")
    // El mejor puntaje queda de respaldo para abrir el módulo sin conexión.
    expect(readLocalProgress().bestExamScore).toBe(100)
    expect(historial.traerHistorialNotam).toHaveBeenCalledWith("piloto-1")
  })

  it("sin opción elegida no deja avanzar", async () => {
    await pintar()
    expect(boton("Siguiente").disabled).toBe(true)
  })

  it("un puntaje peor no pisa el mejor que ya estaba guardado", async () => {
    writeLocalProgress({ bestExamScore: 100 })
    servidor.terminarEvaluacion.mockResolvedValue({ ...aprobado, puntaje: 50, correctas: 1, aprobada: false })
    const p = await pintar()
    await clic(boton("Opción A: El aeródromo"))
    await clic(boton("Siguiente"))
    await clic(boton("Opción B: El inicio"))
    await clic(boton("Terminar y ver mi resultado"))

    expect(p.texto()).toContain("No aprobado")
    expect(readLocalProgress().bestExamScore).toBe(100)
  })

  it("si el servidor no deja empezar, lo dice y reintentar vuelve a pedir el intento", async () => {
    servidor.iniciarEvaluacion.mockReset().mockRejectedValueOnce(new ErrorEvaluacion("demasiados_intentos")).mockResolvedValue(intento)
    const p = await pintar()

    expect(p.texto()).toContain("No pudimos abrir la evaluación")
    expect(p.texto()).toContain("Presentaste muchos intentos en la última hora")

    await clic(boton("Intentar de nuevo"))
    expect(servidor.iniciarEvaluacion).toHaveBeenCalledTimes(2)
    expect(p.texto()).toContain("¿Qué indica la casilla Q?")
  })

  it("si el intento venció, no deja seguir contestando y ofrece empezar otro", async () => {
    servidor.responderPregunta.mockRejectedValue(new ErrorEvaluacion("intento_vencido"))
    const p = await pintar()
    await clic(boton("Opción A: El aeródromo"))
    await clic(boton("Siguiente"))

    expect(p.texto()).toContain("Este intento venció")
    expect(p.texto()).toContain("Pregunta 1 de 2")
    expect(boton("Siguiente").disabled).toBe(true)
    expect(hayBoton("Empezar un intento nuevo")).toBe(true)
  })
})
