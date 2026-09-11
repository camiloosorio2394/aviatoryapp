import { beforeEach, describe, expect, it, vi } from "vitest"

const { from, rpc, insert, single, respuestas } = vi.hoisted(() => {
  const respuestas = new Map<string, unknown>()
  const single = vi.fn()
  const select = vi.fn(() => ({ single }))
  // `insert` se usa de dos formas: con `.select("id").single()` para el reporte
  // y esperado tal cual para los temas. El objeto que devuelve sirve para las dos.
  const insert = vi.fn(() => {
    const r = () => respuestas.get("insert:temas") ?? { error: null }
    return {
      select,
      then: (ok: (v: unknown) => unknown, mal?: (e: unknown) => unknown) => Promise.resolve(r()).then(ok, mal),
    }
  })
  const from = vi.fn((tabla: string) => ({
    insert,
    select: () => ({
      order: () => Promise.resolve(respuestas.get(`tabla:${tabla}`) ?? { data: null, error: null }),
    }),
  }))
  return { from, rpc: vi.fn(), insert, single, respuestas }
})
vi.mock("@/integrations/supabase/client", () => ({ supabase: { from, rpc } }))

const reportarError = vi.hoisted(() => vi.fn())
vi.mock("@/lib/errores", () => ({ reportarError }))

import {
  guardarReporte,
  leerIntel,
  traerIntelDeMateria,
  traerIntelDeMaterias,
  traerMaterias,
  traerTemas,
  type ReporteNuevo,
} from "./reportesExamen"

const REPORTE: ReporteNuevo = {
  userId: "piloto",
  subjectId: 3,
  examDate: "2026-09-01",
  region: "bogota",
  passed: true,
  score: 82,
  difficulty: 4,
  tips: "Repasa cartas de aproximación",
  recalledQuestions: null,
}

beforeEach(() => {
  vi.clearAllMocks()
  respuestas.clear()
})

describe("resumen de todas las materias", () => {
  it("devuelve las filas de get_all_subjects_intel", async () => {
    rpc.mockResolvedValue({ data: [{ subject_id: 1, subject_name: "Meteorología" }], error: null })
    const { materias, error } = await traerIntelDeMaterias()

    expect(rpc).toHaveBeenCalledWith("get_all_subjects_intel")
    expect(error).toBeNull()
    expect(materias).toHaveLength(1)
  })

  it("sin datos devuelve una lista vacía, no null", async () => {
    rpc.mockResolvedValue({ data: null, error: null })
    expect((await traerIntelDeMaterias()).materias).toEqual([])
  })

  it("el error sube tal cual para que la pantalla lo muestre", async () => {
    rpc.mockResolvedValue({ data: null, error: { message: "sin permiso" } })
    expect((await traerIntelDeMaterias()).error).toEqual({ message: "sin permiso" })
  })
})

describe("detalle de una materia", () => {
  const fila = { subject_id: 1, subject_name: "Meteorología", total_reports: 12 }

  it("acepta la fila suelta y la fila dentro de un arreglo", () => {
    expect(leerIntel(fila)).toEqual(fila)
    expect(leerIntel([fila])).toEqual(fila)
    expect(leerIntel([])).toBeNull()
    expect(leerIntel(null)).toBeNull()
  })

  it("pide la materia por su slug", async () => {
    rpc.mockResolvedValue({ data: [fila], error: null })
    const { intel } = await traerIntelDeMateria("meteorologia")

    expect(rpc).toHaveBeenCalledWith("get_subject_intel", { p_subject_slug: "meteorologia" })
    expect(intel).toEqual(fila)
  })

  it("con error no se inventa una materia vacía", async () => {
    rpc.mockResolvedValue({ data: null, error: { message: "falló" } })
    const { intel, error } = await traerIntelDeMateria("meteorologia")

    expect(intel).toBeNull()
    expect(error).toEqual({ message: "falló" })
  })
})

describe("listas del formulario", () => {
  it("materias y temas salen vacíos si la consulta no trae nada", async () => {
    expect(await traerMaterias()).toEqual([])
    expect(await traerTemas()).toEqual([])
  })

  it("devuelven lo que trae la tabla", async () => {
    respuestas.set("tabla:subjects", { data: [{ id: 1, name: "Meteorología", slug: "meteorologia" }], error: null })
    respuestas.set("tabla:subject_topics", { data: [{ id: 9, subject_id: 1, key: "frentes", label: "Frentes" }], error: null })

    expect(await traerMaterias()).toHaveLength(1)
    expect(await traerTemas()).toHaveLength(1)
    expect(from).toHaveBeenCalledWith("subjects")
    expect(from).toHaveBeenCalledWith("subject_topics")
  })
})

describe("guardar un reporte", () => {
  it("escribe el reporte con los nombres de columna de la base", async () => {
    single.mockResolvedValue({ data: { id: 55 }, error: null })

    expect(await guardarReporte(REPORTE, [])).toEqual({ temasGuardados: true })
    expect(from).toHaveBeenCalledWith("exam_reports")
    expect(insert).toHaveBeenCalledWith({
      user_id: "piloto",
      subject_id: 3,
      exam_date: "2026-09-01",
      region: "bogota",
      passed: true,
      score: 82,
      difficulty: 4,
      tips: "Repasa cartas de aproximación",
      recalled_questions: null,
    })
    // Sin temas marcados no se toca la segunda tabla.
    expect(from).not.toHaveBeenCalledWith("exam_report_topics")
  })

  it("ata cada tema al reporte recién creado", async () => {
    single.mockResolvedValue({ data: { id: 55 }, error: null })

    expect(await guardarReporte(REPORTE, [7, 9])).toEqual({ temasGuardados: true })
    expect(from).toHaveBeenCalledWith("exam_report_topics")
    expect(insert).toHaveBeenLastCalledWith([
      { report_id: 55, topic_id: 7 },
      { report_id: 55, topic_id: 9 },
    ])
  })

  it("si falla el reporte, lanza: la pantalla distingue el tope de publicaciones", async () => {
    single.mockResolvedValue({ data: null, error: { message: "tope" } })
    await expect(guardarReporte(REPORTE, [7])).rejects.toEqual({ message: "tope" })
    expect(reportarError).not.toHaveBeenCalled()
  })

  it("si fallan solo los temas, el reporte ya quedó y se avisa", async () => {
    single.mockResolvedValue({ data: { id: 55 }, error: null })
    respuestas.set("insert:temas", { error: { message: "sin permiso" } })

    expect(await guardarReporte(REPORTE, [7])).toEqual({ temasGuardados: false })
    expect(reportarError).toHaveBeenCalledWith("reporte de examen: temas", { message: "sin permiso" })
  })
})
