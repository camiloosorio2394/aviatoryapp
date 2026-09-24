import { MemoryRouter } from "react-router-dom"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import type { ResultadoEvaluacion, SesionEvaluacion } from "@/services/evaluaciones"
import { boton, clic, desmontarTodo, montar } from "@/test/pantalla"

const servidor = vi.hoisted(() => ({
  iniciarEvaluacion: vi.fn(),
  responderPregunta: vi.fn(),
  terminarEvaluacion: vi.fn(),
}))

vi.mock("@/services/evaluaciones", async (original) => ({
  ...(await original<typeof import("@/services/evaluaciones")>()),
  ...servidor,
}))

const { AirlineMockExam } = await import("@/pages/AirlineMockExam")
const { readAirlineMockLocal } = await import("@/lib/airlineMock")

const CLAVE_LOCAL = "aviatory.aerolinea.simulacro"

const intento: SesionEvaluacion = {
  id: "simulacro-1",
  venceEn: "2026-09-24T20:00:00Z",
  retroalimentacion: "inmediata",
  aprobacion: 85,
  preguntas: [
    { posicion: 1, enunciado: "¿Qué es un TAF?", opciones: ["Un pronóstico de aeródromo", "Un reporte horario"], tema: "Meteorología" },
    { posicion: 2, enunciado: "¿Qué dice la casilla B de un NOTAM?", opciones: ["El comienzo de la vigencia", "El lugar"], tema: "NOTAM" },
  ],
}

function resultado(puntaje: number): ResultadoEvaluacion {
  return {
    puntaje,
    correctas: puntaje >= 85 ? 2 : 1,
    total: 2,
    aprobada: puntaje >= 85,
    aprobacion: 85,
    duracionSegundos: 60,
    revision: [
      { posicion: 1, opcion: 0, correcta: true, opcionCorrecta: 0, explicacion: "El TAF es el pronóstico.", referencia: null },
      { posicion: 2, opcion: 0, correcta: true, opcionCorrecta: 0, explicacion: "B es el comienzo.", referencia: null },
    ],
  }
}

function pintar() {
  return montar(
    <MemoryRouter>
      <AirlineMockExam />
    </MemoryRouter>,
  )
}

async function presentarCompleto() {
  await clic(boton(/Empezar el simulacro|Volver a presentarlo/))
  await clic(boton("Un pronóstico de aeródromo"))
  await clic(boton("Siguiente"))
  await clic(boton("El comienzo de la vigencia"))
  await clic(boton("Ver resultado"))
}

beforeEach(() => {
  localStorage.clear()
  servidor.iniciarEvaluacion.mockReset().mockResolvedValue(intento)
  servidor.responderPregunta.mockReset().mockImplementation(async (_s: string, posicion: number, opcion: number) => ({
    posicion,
    opcion,
    correccion: {
      correcta: true,
      opcionCorrecta: opcion,
      explicacion: posicion === 1 ? "El TAF es el pronóstico." : "B es el comienzo.",
      referencia: null,
    },
  }))
  servidor.terminarEvaluacion.mockReset().mockResolvedValue(resultado(100))
})

afterEach(() => {
  desmontarTodo()
})

describe("el simulacro de entrevista técnica", () => {
  it("la primera vez explica antes de empezar y no pide preguntas hasta que el piloto arranca", async () => {
    const p = await pintar()
    expect(p.texto()).toContain("Antes de empezar")
    expect(p.texto()).toContain("Apruebas con 85 sobre 100")
    expect(servidor.iniciarEvaluacion).not.toHaveBeenCalled()
  })

  it("con un intento previo muestra la marca a superar", async () => {
    localStorage.setItem(CLAVE_LOCAL, JSON.stringify({ bestScore: 72, attempts: 3 }))
    const p = await pintar()
    expect(p.texto()).toContain("Tu marca a superar")
    expect(p.texto()).toContain("Tu mejor puntaje es 72 sobre 100, y apruebas con 85.")
    expect(p.texto()).toContain("Volver a presentarlo")
  })

  it("corrige cada respuesta al momento, califica en el servidor y dice adónde volver por tema", async () => {
    const p = await pintar()
    await clic(boton("Empezar el simulacro"))
    expect(servidor.iniciarEvaluacion).toHaveBeenCalledWith("simulacro_aerolinea")
    expect(p.texto()).toContain("Pregunta 1 de 2")

    await clic(boton("Un pronóstico de aeródromo"))
    expect(servidor.responderPregunta).toHaveBeenCalledWith("simulacro-1", 1, 0)
    expect(p.texto()).toContain("Correcto")
    expect(p.texto()).toContain("El TAF es el pronóstico.")
    // Respondida, no se puede cambiar.
    expect(boton("Un reporte horario").disabled).toBe(true)

    await clic(boton("Siguiente"))
    await clic(boton("El comienzo de la vigencia"))
    await clic(boton("Ver resultado"))

    expect(servidor.terminarEvaluacion).toHaveBeenCalledWith("simulacro-1")
    expect(p.texto()).toContain("100 / 100")
    expect(p.texto()).toContain("Aprobada")
    expect(p.texto()).toContain("1 de Meteorología y 1 de NOTAM")
  })

  it("al terminar anota el intento y el mejor puntaje en este equipo", async () => {
    localStorage.setItem(CLAVE_LOCAL, JSON.stringify({ bestScore: 72, attempts: 3 }))
    servidor.terminarEvaluacion.mockResolvedValue(resultado(90))
    await pintar()
    await presentarCompleto()
    expect(readAirlineMockLocal()).toEqual({ bestScore: 90, attempts: 4 })
  })

  it("un intento peor cuenta como intento pero no baja la marca", async () => {
    localStorage.setItem(CLAVE_LOCAL, JSON.stringify({ bestScore: 90, attempts: 1 }))
    servidor.terminarEvaluacion.mockResolvedValue(resultado(50))
    const p = await pintar()
    await presentarCompleto()
    expect(p.texto()).toContain("No alcanzaste el mínimo")
    expect(readAirlineMockLocal()).toEqual({ bestScore: 90, attempts: 2 })
  })
})
