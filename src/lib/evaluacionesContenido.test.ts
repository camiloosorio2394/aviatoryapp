import { describe, expect, it } from "vitest"
import { BANCO_TOTAL, MP_CHEQUEO_TOTAL, TEMAS_SIMULACRO } from "@/lib/airlineMock"
import { AP_EVALUACION_META } from "@/lib/aeropuertosEvaluacion"
import { CM_EVALUACION_META } from "@/lib/comunicacionesEvaluacion"
import { CB_EVALUACION_META } from "@/lib/combustibleEvaluacion"
import { CB_EXAM_PER_ATTEMPT } from "@/lib/combustible"
import { RAC_EVALUACION_META } from "@/lib/racEvaluacion"
import { RAC_EXAM_PER_ATTEMPT } from "@/lib/rac"
import { MP_EVALUACION_META } from "@/lib/mercanciasEvaluacion"
import { METAR_EXAM_TOTAL } from "@/lib/metar"
import { TOTALS } from "@/lib/notam"
import { EXAM_PER_ATTEMPT } from "@/lib/notamComun"

interface Banco {
  banco: string
  preguntas: { id: string; enunciado: string }[]
}

// Vite lee los archivos en la prueba; nada de esto entra al bundle de la app.
const bancos = import.meta.glob<Banco>("/contenido/bancos/*.json", { import: "default", eager: true })
const fuentes = import.meta.glob<string>(["/src/**/*.{ts,tsx,json,md}", "!/src/**/*.test.{ts,tsx}"], {
  query: "?raw",
  import: "default",
  eager: true,
})

function banco(nombre: string): Banco {
  const datos = bancos[`/contenido/bancos/${nombre}.json`]
  if (!datos) throw new Error(`No existe contenido/bancos/${nombre}.json`)
  return datos
}

describe("evaluaciones: la app y los bancos del servidor", () => {
  it("los conteos que anuncia la app cuadran con contenido/bancos", () => {
    expect(TOTALS.examQuestions).toBe(banco("notam_evaluacion").preguntas.length)
    expect(METAR_EXAM_TOTAL).toBe(banco("metar_evaluacion").preguntas.length)
    expect(MP_EVALUACION_META.total).toBe(banco("mercancias_evaluacion").preguntas.length)
    expect(MP_CHEQUEO_TOTAL).toBe(banco("mercancias_chequeo").preguntas.length)
    expect(AP_EVALUACION_META.total).toBe(banco("aeropuertos_evaluacion").preguntas.length)
    expect(AP_EVALUACION_META.porIntento).toBeLessThanOrEqual(AP_EVALUACION_META.total)
    expect(CM_EVALUACION_META.total).toBe(banco("comunicaciones_evaluacion").preguntas.length)
    expect(CM_EVALUACION_META.porIntento).toBeLessThanOrEqual(CM_EVALUACION_META.total)
    expect(RAC_EVALUACION_META.total).toBe(banco("rac_evaluacion").preguntas.length)
    expect(RAC_EVALUACION_META.porIntento).toBe(RAC_EXAM_PER_ATTEMPT)
    expect(RAC_EVALUACION_META.porIntento).toBeLessThanOrEqual(RAC_EVALUACION_META.total)
    expect(CB_EVALUACION_META.total).toBe(banco("combustible_evaluacion").preguntas.length)
    expect(CB_EVALUACION_META.porIntento).toBe(CB_EXAM_PER_ATTEMPT)
    expect(CB_EVALUACION_META.porIntento).toBeLessThanOrEqual(CB_EVALUACION_META.total)
    expect(BANCO_TOTAL).toBe(TEMAS_SIMULACRO.reduce((s, t) => s + t.preguntas, 0))
    expect(EXAM_PER_ATTEMPT).toBeLessThanOrEqual(TOTALS.examQuestions)
  })

  it("ningún archivo de src/ vuelve a traer el banco de una evaluación", () => {
    const enunciados = [
      "notam_evaluacion",
      "metar_evaluacion",
      "mercancias_evaluacion",
      "mercancias_chequeo",
      "aeropuertos_evaluacion",
      "comunicaciones_evaluacion",
      "rac_evaluacion",
      "combustible_evaluacion",
    ]
      .flatMap((nombre) => banco(nombre).preguntas.map((p) => p.enunciado))
      // Los enunciados muy cortos ("¿Qué significa RWY?") pueden coincidir con
      // una lección sin ser una copia del banco.
      .filter((e) => e.length >= 60)
    expect(enunciados.length).toBeGreaterThan(50)

    expect(Object.keys(fuentes).length).toBeGreaterThan(100)
    const coincidencias: { archivo: string; enunciado: string }[] = []
    for (const [ruta, contenido] of Object.entries(fuentes)) {
      for (const enunciado of enunciados) {
        if (contenido.includes(enunciado)) coincidencias.push({ archivo: ruta.slice(1), enunciado })
      }
    }

    // Una copia del banco trae muchas preguntas juntas: ningún archivo puede tener más de dos.
    const porArchivo = new Map<string, number>()
    for (const c of coincidencias) porArchivo.set(c.archivo, (porArchivo.get(c.archivo) ?? 0) + 1)
    expect([...porArchivo].filter(([, n]) => n > 2)).toEqual([])

    // Ninguna. Las tres que había estaban en bloques de preguntas dentro de las
    // lecciones de Mercancías, y esos bloques ya no existen: las preguntas solo
    // van en la entrevista de cada nivel. Si aparece una coincidencia nueva, es
    // que una lección repite una pregunta del banco y hay que cambiar una de las
    // dos, o anotarla aquí con su razón.
    const conocidas: string[] = []
    expect(coincidencias.map((c) => `${c.archivo}: ${c.enunciado}`).sort()).toEqual([...conocidas].sort())
  })
})
