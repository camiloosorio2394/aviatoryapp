import { describe, expect, it } from "vitest"
import { TOTALS } from "@/lib/notam"
import { EXAM_PASS_SCORE, EXAM_PER_ATTEMPT, NOTAM_PRACTICE_TOTAL, NOTAM_TOTALES, resumirNotam } from "@/lib/notamComun"
import { LESSON_MINUTES, LESSON_TOTAL } from "@/lib/notamLesson"

describe("conteos fijos de NOTAM", () => {
  it("coinciden con el contenido: si se agrega una sección o un ejercicio, aquí se actualizan", () => {
    expect(NOTAM_TOTALES).toEqual({
      lessonScreens: LESSON_TOTAL,
      lessonMinutes: LESSON_MINUTES,
      reales: TOTALS.reales,
      exercises: TOTALS.exercises,
      examQuestions: TOTALS.examQuestions,
    })
    expect(NOTAM_PRACTICE_TOTAL).toBe(TOTALS.reales + TOTALS.exercises)
    expect(EXAM_PER_ATTEMPT).toBeLessThanOrEqual(NOTAM_TOTALES.examQuestions)
  })
})

describe("resumirNotam", () => {
  it("sin avance es vacío", () => {
    expect(resumirNotam({ lessonScreens: [], practiceDone: [], bestExamScore: null })).toMatchObject({
      overall: 0,
      empty: true,
      passed: false,
    })
  })

  it("aprobar cuenta la evaluación como completa y nada pasa del total", () => {
    const todo = Array.from({ length: NOTAM_TOTALES.lessonScreens + 3 }, (_, i) => i + 1)
    const practica = Array.from({ length: NOTAM_PRACTICE_TOTAL + 5 }, (_, i) => `e${i}`)
    const r = resumirNotam({ lessonScreens: todo, practiceDone: practica, bestExamScore: EXAM_PASS_SCORE })
    expect(r).toMatchObject({ lessonPct: 100, practicePct: 100, examPct: 100, overall: 100, passed: true })
  })
})
