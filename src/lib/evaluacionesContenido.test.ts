import { describe, expect, it } from "vitest"
import { BANCO_TOTAL, MP_CHEQUEO_TOTAL, TEMAS_SIMULACRO } from "@/lib/airlineMock"
import { MP_EVALUACION_META } from "@/lib/mercanciasEvaluacion"
import { METAR_EXAM_TOTAL } from "@/lib/metar"
import { EXAM_PER_ATTEMPT, TOTALS } from "@/lib/notam"

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
    expect(BANCO_TOTAL).toBe(TEMAS_SIMULACRO.reduce((s, t) => s + t.preguntas, 0))
    expect(EXAM_PER_ATTEMPT).toBeLessThanOrEqual(TOTALS.examQuestions)
  })

  it("ningún archivo de src/ vuelve a traer el banco de una evaluación", () => {
    const enunciados = ["notam_evaluacion", "metar_evaluacion", "mercancias_evaluacion", "mercancias_chequeo"]
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

    // Coincidencias editoriales conocidas: ejercicios «pon a prueba» de la lección
    // de Mercancías que repiten, con su respuesta, una pregunta del banco. Cualquier
    // coincidencia nueva hace fallar esta prueba: se cambia una de las dos preguntas
    // o se agrega aquí con su razón.
    const conocidas = [
      "src/lib/mercanciasLeccion/nivel2.ts: Un pasajero quiere llevar un power bank en su maleta facturada. ¿Puede?",
      "src/lib/mercanciasLeccion/nivel4.ts: ¿Cuál es el contenido mínimo del equipo de respuesta de emergencia para mercancías peligrosas a bordo?",
      "src/lib/mercanciasLeccion/nivel4.ts: Hay humo en cabina y sospechas de la carga peligrosa. ¿Qué va primero?",
    ]
    expect(coincidencias.map((c) => `${c.archivo}: ${c.enunciado}`).sort()).toEqual([...conocidas].sort())
  })
})
