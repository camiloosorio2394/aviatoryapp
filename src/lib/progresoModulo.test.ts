import { beforeEach, describe, expect, it, vi } from "vitest"

const supabase = vi.hoisted(() => {
  const consulta = { select: vi.fn(), eq: vi.fn(), maybeSingle: vi.fn() }
  consulta.select.mockReturnValue(consulta)
  consulta.eq.mockReturnValue(consulta)
  return { rpc: vi.fn(), from: vi.fn(() => consulta), consulta }
})
vi.mock("@/integrations/supabase/client", () => ({ supabase }))

const { conMarca, crearProgresoModulo } = await import("@/lib/progresoModulo")
const { fetchMercanciasProgress, pushPendingMercancias, writeMercanciasLocal } = await import("@/lib/mercanciasProgress")

function modulo(local = { lessonScreens: [1, 2, 3], practiceDone: ["c1", "c2"] }) {
  const anotadas: unknown[] = []
  const progreso = crearProgresoModulo({
    tabla: "user_notam_progress",
    rpc: "notam_mark_progress",
    leerLocal: () => local,
    anotarLocal: (marca) => anotadas.push(marca),
  })
  return { progreso, anotadas }
}

describe("progreso de módulo", () => {
  beforeEach(() => {
    supabase.rpc.mockReset()
    supabase.consulta.maybeSingle.mockReset()
    localStorage.clear()
  })

  it("lee solo lo de la base; si la consulta falla devuelve null", async () => {
    supabase.consulta.maybeSingle.mockResolvedValueOnce({ data: { lesson_screens: [1], practice_done: null }, error: null })
    expect(await modulo().progreso.leer("u")).toEqual({ lessonScreens: [1], practiceDone: [] })
    supabase.consulta.maybeSingle.mockResolvedValueOnce({ data: null, error: { message: "boom" } })
    expect(await modulo().progreso.leer("u")).toBeNull()
  })

  it("marca primero en local y después en la base", async () => {
    supabase.rpc.mockResolvedValue({ error: null })
    const { progreso, anotadas } = modulo()
    await progreso.marcar({ lessonScreen: 4 })
    expect(anotadas).toEqual([{ lessonScreen: 4 }])
    expect(supabase.rpc).toHaveBeenCalledWith("notam_mark_progress", { p_lesson_screen: 4, p_practice_id: null })
  })

  it("sube solo lo que falta y no da por subido lo que la base rechazó", async () => {
    supabase.rpc.mockImplementation(async (_rpc: string, p: { p_lesson_screen: number | null }) =>
      p.p_lesson_screen === 3 ? { error: { message: "permission denied" } } : { error: null },
    )
    const { progreso } = modulo()
    const resultado = await progreso.subirPendiente({ lessonScreens: [1], practiceDone: ["c1"] })
    // Pendientes: lecciones 2 y 3, práctica c2. La 3 falló.
    expect(supabase.rpc).toHaveBeenCalledTimes(3)
    expect(resultado).toEqual({ lessonScreens: [1, 2], practiceDone: ["c1", "c2"] })
  })

  it("sin pendientes no llama a la base", async () => {
    const { progreso } = modulo()
    const remoto = { lessonScreens: [1, 2, 3], practiceDone: ["c1", "c2"] }
    expect(await progreso.subirPendiente(remoto)).toBe(remoto)
    expect(supabase.rpc).not.toHaveBeenCalled()
  })

  it("conMarca no repite y deja las listas iguales si no hay nada nuevo", () => {
    const base = { lessonScreens: [1, 3], practiceDone: ["a"] }
    expect(conMarca(base, { lessonScreen: 2 }).lessonScreens).toEqual([1, 2, 3])
    const igual = conMarca(base, { lessonScreen: 3, practiceId: "a" })
    expect(igual.lessonScreens).toBe(base.lessonScreens)
    expect(igual.practiceDone).toBe(base.practiceDone)
  })
})

describe("Mercancías: lo pendiente se sube contra la base, no contra lo ya unido", () => {
  beforeEach(() => {
    supabase.rpc.mockReset().mockResolvedValue({ error: null })
    supabase.consulta.maybeSingle.mockReset()
    localStorage.clear()
  })

  it("con avance local que la base no tiene, lo sube", async () => {
    writeMercanciasLocal({ lessonScreens: [1, 2], practiceDone: ["c1"] })
    supabase.consulta.maybeSingle.mockResolvedValueOnce({ data: { lesson_screens: [1], practice_done: [] }, error: null })
    // La consulta del mejor puntaje: from(...).select(...).eq(...).order(...).limit(...)
    const consultaExamen = { select: vi.fn(), eq: vi.fn(), order: vi.fn(), limit: vi.fn() }
    consultaExamen.select.mockReturnValue(consultaExamen)
    consultaExamen.eq.mockReturnValue(consultaExamen)
    consultaExamen.order.mockReturnValue(consultaExamen)
    consultaExamen.limit.mockReturnValue({ then: (ok: (r: unknown) => unknown) => Promise.resolve(ok({ data: [{ score: 70 }] })) })
    supabase.from.mockImplementation(((tabla: string) =>
      tabla === "user_mercancias_exam_attempts" ? consultaExamen : supabase.consulta) as never)

    const traido = await fetchMercanciasProgress("u")
    expect(traido).toMatchObject({ lessonScreens: [1, 2], practiceDone: ["c1"], bestScore: 70 })
    const subido = await pushPendingMercancias(traido!)
    expect(supabase.rpc).toHaveBeenCalledTimes(2)
    expect(subido).toEqual({ lessonScreens: [1, 2], practiceDone: ["c1"], bestScore: 70 })
  })
})
