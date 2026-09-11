import { beforeEach, describe, expect, it, vi } from "vitest"

const rpc = vi.hoisted(() => vi.fn())
vi.mock("@/integrations/supabase/client", () => ({ supabase: { rpc } }))

const { iniciarPsico, leerRespuestaPsico, leerResultadoPsico, leerSesionPsico, responderPsico } = await import(
  "@/services/psicotecnicas"
)
const { ErrorEvaluacion } = await import("@/services/rpc")

const sesionCruda = {
  sesion: "5a0c6f1e-0000-4000-8000-000000000002",
  modo: "evaluacion",
  vence_en: "2026-09-11T20:00:00Z",
  ejercicios: [
    {
      posicion: 1,
      enunciado: "Complete la serie: 2, 4, 6, …",
      opciones: ["7", "8"],
      imagen: null,
      imagen_alt: null,
      figura: null,
      opciones_en_imagen: false,
      limite: 60,
    },
    {
      posicion: 2,
      enunciado: "¿Qué figura continúa la serie?",
      opciones: ["A", "B"],
      imagen: "/psicotecnicas/abstracto/x.webp",
      imagen_alt: "Matriz",
      figura: { tipo: "matriz-3x3", celdas: [], opciones: [] },
      opciones_en_imagen: false,
      limite: 34,
    },
  ],
}

describe("lectura de lo que devuelve el servidor", () => {
  it("una tanda trae lo que se ve, nunca la respuesta ni la familia", () => {
    const sesion = leerSesionPsico(sesionCruda)
    expect(sesion.ejercicios[1]).toMatchObject({ posicion: 2, limite: 34, imagenAlt: "Matriz" })
    expect(JSON.stringify(sesion)).not.toMatch(/respuesta|explicacion|categoria|subcategoria/)
  })

  it("rechaza figuras y modos desconocidos", () => {
    expect(() => leerSesionPsico({ ...sesionCruda, modo: "libre" })).toThrow()
    expect(() =>
      leerSesionPsico({ ...sesionCruda, ejercicios: [{ ...sesionCruda.ejercicios[1], figura: { tipo: "otra", celdas: [], opciones: [] } }] }),
    ).toThrow()
  })

  it("la corrección solo aparece cuando el servidor la manda (entrenamiento)", () => {
    expect(leerRespuestaPsico({ posicion: 1, opcion: null, segundos: 60, limite: 60 }).correccion).toBeNull()
    const r = leerRespuestaPsico({
      posicion: 1, opcion: 0, segundos: 12, limite: 60,
      correcta: false, respuesta: 1, explicacion: "Suma 2.", id: "NU-01", subcategoria: "Series", fuente: null,
    })
    expect(r.correccion).toEqual({ correcta: false, respuesta: 1, explicacion: "Suma 2.", id: "NU-01", subcategoria: "Series", fuente: null })
  })

  it("el resultado une cada respuesta con el id de su ejercicio", () => {
    const r = leerResultadoPsico({
      total: 2, correctas: 1, porcentaje: 50, velocidad: 40, global: 47, aprobacion: 80,
      respuestas: [
        { posicion: 1, categoria: "numerico", elegida: 1, correcta: true, segundos: 20, limite: 60 },
        { posicion: 2, categoria: "abstracto", elegida: null, correcta: false, segundos: 0, limite: 34 },
      ],
      revision: [
        { posicion: 1, id: "NU-01", respuesta: 1, explicacion: "a", subcategoria: "s", fuente: "f" },
        { posicion: 2, id: "AB-02", respuesta: 0, explicacion: "b", subcategoria: "t", fuente: null },
      ],
    })
    expect(r.respuestas[1]).toEqual({ id: "AB-02", categoria: "abstracto", elegida: null, correcta: false, segundos: 0, limite: 34 })
    expect(r.soluciones.get(2)?.respuesta).toBe(0)
    expect(() => leerResultadoPsico({ total: 1, respuestas: [{ posicion: 9, categoria: "numerico" }], revision: [] })).toThrow()
  })
})

describe("llamadas", () => {
  beforeEach(() => rpc.mockReset())

  it("el simulacro no manda cantidad; entrenamiento y evaluación sí", async () => {
    rpc.mockResolvedValue({ data: { ...sesionCruda, modo: "simulacion" }, error: null })
    await iniciarPsico({ modo: "simulacion", categoria: "todas", nivel: "todos", cantidad: 30 })
    expect(rpc).toHaveBeenLastCalledWith("psico_iniciar", { p_modo: "simulacion", p_categoria: "todas", p_nivel: "todos", p_cantidad: null })

    rpc.mockResolvedValue({ data: sesionCruda, error: null })
    await iniciarPsico({ modo: "evaluacion", categoria: "numerico", nivel: "avanzado", cantidad: 10 })
    expect(rpc).toHaveBeenLastCalledWith("psico_iniciar", { p_modo: "evaluacion", p_categoria: "numerico", p_nivel: "avanzado", p_cantidad: 10 })
  })

  it("responde con los segundos redondeados y traduce los errores del servidor", async () => {
    rpc.mockResolvedValue({ data: { posicion: 2, opcion: 1, segundos: 3, limite: 34 }, error: null })
    await responderPsico("s", 2, 1, 3.4)
    expect(rpc).toHaveBeenCalledWith("psico_responder", { p_sesion: "s", p_posicion: 2, p_opcion: 1, p_segundos: 3 })

    rpc.mockResolvedValue({ data: null, error: { message: "demasiados_intentos", code: "P0001" } })
    const error = await iniciarPsico({ modo: "entrenamiento", categoria: "todas", nivel: "todos", cantidad: 10 }).catch((e) => e)
    expect(error).toBeInstanceOf(ErrorEvaluacion)
    expect(error.codigo).toBe("demasiados_intentos")
  })
})
