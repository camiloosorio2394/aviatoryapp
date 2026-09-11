import { beforeEach, describe, expect, it, vi } from "vitest"

const rpc = vi.hoisted(() => vi.fn())
vi.mock("@/integrations/supabase/client", () => ({ supabase: { rpc } }))

const {
  ErrorEvaluacion,
  clasificarError,
  iniciarEvaluacion,
  leerResultado,
  leerSesion,
  responderPregunta,
  terminarEvaluacion,
} = await import("@/services/evaluaciones")

const sesionCruda = {
  sesion: "5a0c6f1e-0000-4000-8000-000000000001",
  vence_en: "2026-09-11T20:00:00Z",
  retroalimentacion: "al_final",
  aprobacion: 80,
  total: 1,
  preguntas: [{ posicion: 1, enunciado: "¿Qué es un NOTAM?", opciones: ["A", "B"], tema: null }],
}

describe("lectura de lo que devuelve el servidor", () => {
  it("una sesión nunca trae la correcta ni la explicación", () => {
    const sesion = leerSesion(sesionCruda)
    expect(sesion.preguntas[0]).toEqual({ posicion: 1, enunciado: "¿Qué es un NOTAM?", opciones: ["A", "B"], tema: null })
    expect(JSON.stringify(sesion)).not.toMatch(/correct|explicacion/)
  })

  it("rechaza formas inesperadas en vez de dejar estados indefinidos", () => {
    expect(() => leerSesion({ ...sesionCruda, retroalimentacion: "otra" })).toThrow()
    expect(() => leerSesion({ ...sesionCruda, preguntas: [{ posicion: "1" }] })).toThrow()
    expect(() => leerResultado({ puntaje: 80 })).toThrow()
  })

  it("lee la revisión con preguntas sin responder", () => {
    const r = leerResultado({
      puntaje: 50, correctas: 1, total: 2, aprobada: false, aprobacion: 80, duracion_segundos: 90,
      revision: [
        { posicion: 1, opcion: 0, correcta: true, opcion_correcta: 0, explicacion: "x", referencia: null },
        { posicion: 2, opcion: null, correcta: false, opcion_correcta: 1, explicacion: "y", referencia: "Ref" },
      ],
    })
    expect(r.revision[1]).toMatchObject({ opcion: null, opcionCorrecta: 1, referencia: "Ref" })
  })
})

describe("errores para el piloto", () => {
  it("traduce los errores del servidor sin mostrar texto técnico", () => {
    expect(clasificarError({ message: "demasiados_intentos", code: "P0001" }).codigo).toBe("demasiados_intentos")
    expect(clasificarError({ message: "sesion_vencida" }).codigo).toBe("intento_vencido")
    expect(clasificarError({ message: "JWT expired" }).codigo).toBe("sin_sesion")
    expect(clasificarError(new TypeError("Failed to fetch")).codigo).toBe("sin_conexion")
    const desconocido = clasificarError({ message: "relation does not exist" })
    expect(desconocido.codigo).toBe("desconocido")
    expect(desconocido.message).not.toMatch(/relation/)
  })
})

describe("llamadas", () => {
  beforeEach(() => rpc.mockReset())

  it("inicia con la clave y valida la sesión", async () => {
    rpc.mockResolvedValue({ data: sesionCruda, error: null })
    const sesion = await iniciarEvaluacion("notam_evaluacion")
    expect(rpc).toHaveBeenCalledWith("evaluacion_iniciar", { p_evaluacion: "notam_evaluacion" })
    expect(sesion.id).toBe(sesionCruda.sesion)
  })

  it("responde por posición y opción mostrada; en inmediata trae la corrección", async () => {
    rpc.mockResolvedValue({
      data: { posicion: 3, opcion: 1, correcta: false, opcion_correcta: 2, explicacion: "Porque sí", referencia: null },
      error: null,
    })
    const r = await responderPregunta("s", 3, 1)
    expect(rpc).toHaveBeenCalledWith("evaluacion_responder", { p_sesion: "s", p_posicion: 3, p_opcion: 1 })
    expect(r.correccion).toEqual({ correcta: false, opcionCorrecta: 2, explicacion: "Porque sí", referencia: null })
  })

  it("en retroalimentación al final la respuesta no trae corrección", async () => {
    rpc.mockResolvedValue({ data: { posicion: 3, opcion: 1 }, error: null })
    expect((await responderPregunta("s", 3, 1)).correccion).toBeNull()
  })

  it("convierte el error de PostgREST y la forma inválida en ErrorEvaluacion", async () => {
    rpc.mockResolvedValue({ data: null, error: { message: "sesion_no_encontrada" } })
    await expect(terminarEvaluacion("s")).rejects.toMatchObject({ codigo: "intento_no_encontrado" })

    const consola = vi.spyOn(console, "error").mockImplementation(() => {})
    rpc.mockResolvedValue({ data: { basura: true }, error: null })
    await expect(terminarEvaluacion("s")).rejects.toBeInstanceOf(ErrorEvaluacion)
    consola.mockRestore()
  })
})
