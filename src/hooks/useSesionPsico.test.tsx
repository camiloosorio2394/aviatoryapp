import { act, useEffect } from "react"
import { createRoot, type Root } from "react-dom/client"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import type { ResultadoPsicoServidor, SesionPsico } from "@/services/psicotecnicas"

const servicio = vi.hoisted(() => ({
  iniciarPsico: vi.fn(),
  responderPsico: vi.fn(),
  aplazarPsico: vi.fn(),
  terminarPsico: vi.fn(),
}))

vi.mock("@/services/psicotecnicas", async (original) => ({
  ...(await original<typeof import("@/services/psicotecnicas")>()),
  ...servicio,
}))

const { itemsDeRepaso, resultadoDelServidor, useSesionPsico } = await import("@/hooks/useSesionPsico")
const { ErrorEvaluacion } = await import("@/services/rpc")

;(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true

const ejercicio = (posicion: number) => ({
  posicion, enunciado: `E${posicion}`, opciones: ["A", "B"], opcionesEnImagen: false,
  imagen: null, imagenAlt: null, figura: null, limite: 45,
})

const sesion: SesionPsico = { id: "tanda-1", modo: "evaluacion", ejercicios: [ejercicio(1), ejercicio(2)] }

const servidor: ResultadoPsicoServidor = {
  total: 2, correctas: 1, porcentaje: 50, velocidad: 61, global: 53, aprobacion: 80,
  respuestas: [
    { id: "NU-1", categoria: "numerico", elegida: 1, correcta: true, segundos: 10, limite: 45 },
    { id: "AB-2", categoria: "abstracto", elegida: 0, correcta: false, segundos: 25, limite: 45 },
  ],
  soluciones: new Map([
    [1, { id: "NU-1", respuesta: 1, explicacion: "a", subcategoria: "s", fuente: null }],
    [2, { id: "AB-2", respuesta: 1, explicacion: "b", subcategoria: "t", fuente: null }],
  ]),
}

let ultimo: ReturnType<typeof useSesionPsico>
function Sonda({ alPintar }: { alPintar: (valor: ReturnType<typeof useSesionPsico>) => void }) {
  const valor = useSesionPsico()
  useEffect(() => alPintar(valor))
  return null
}

function guardar(valor: ReturnType<typeof useSesionPsico>) {
  ultimo = valor
}

let raiz: Root

async function montar() {
  raiz = createRoot(document.createElement("div"))
  await act(async () => {
    raiz.render(<Sonda alPintar={guardar} />)
  })
}

const PARAMETROS = { modo: "evaluacion", categoria: "todas", nivel: "todos", cantidad: 2 } as const

describe("useSesionPsico", () => {
  beforeEach(() => {
    localStorage.clear()
    for (const f of Object.values(servicio)) f.mockReset()
    servicio.iniciarPsico.mockResolvedValue(sesion)
  })
  afterEach(async () => {
    await act(async () => raiz.unmount())
  })

  it("empieza en configurar y pasa a la tanda que sortea el servidor", async () => {
    await montar()
    expect(ultimo.estado.fase).toBe("configurando")
    await act(async () => ultimo.empezar(PARAMETROS))
    expect(ultimo.estado).toEqual({ fase: "en_curso", sesion })
    expect(servicio.iniciarPsico).toHaveBeenCalledWith(PARAMETROS)
  })

  it("en evaluación no espera cada respuesta, pero terminar espera a que salgan todas y en orden", async () => {
    await montar()
    await act(async () => ultimo.empezar(PARAMETROS))

    const orden: string[] = []
    let soltarPrimera: () => void = () => {}
    servicio.responderPsico
      .mockImplementationOnce(() => new Promise((listo) => { soltarPrimera = () => { orden.push("r1"); listo({}) } }))
      .mockImplementationOnce(async () => { orden.push("r2"); return {} })
    servicio.terminarPsico.mockImplementation(async () => { orden.push("terminar"); return servidor })

    await act(async () => {
      ultimo.registrar(1, 1, 10)
      ultimo.registrar(2, 0, 25)
    })
    let terminado: Promise<void> = Promise.resolve()
    await act(async () => {
      terminado = ultimo.terminar()
    })
    expect(ultimo.estado.fase).toBe("terminando")
    expect(servicio.terminarPsico).not.toHaveBeenCalled()

    await act(async () => {
      soltarPrimera()
      await terminado
    })
    expect(orden).toEqual(["r1", "r2", "terminar"])
    expect(ultimo.estado.fase).toBe("terminada")
  })

  it("en entrenamiento devuelve la corrección; si falla, deja el error a la vista", async () => {
    servicio.iniciarPsico.mockResolvedValue({ ...sesion, modo: "entrenamiento" })
    await montar()
    await act(async () => ultimo.empezar({ ...PARAMETROS, modo: "entrenamiento" }))

    const correccion = { correcta: true, respuesta: 1, explicacion: "x", id: "NU-1", subcategoria: "s", fuente: null }
    servicio.responderPsico.mockResolvedValueOnce({ posicion: 1, opcion: 1, segundos: 5, limite: 60, correccion })
    let obtenida: unknown
    await act(async () => {
      obtenida = await ultimo.corregir(1, 1, 5)
    })
    expect(obtenida).toEqual(correccion)

    servicio.responderPsico.mockRejectedValueOnce(new ErrorEvaluacion("sin_conexion"))
    await act(async () => {
      obtenida = await ultimo.corregir(2, 0, 5)
    })
    expect(obtenida).toBeNull()
    expect(ultimo.errorAccion?.codigo).toBe("sin_conexion")
  })

  it("si cerrar la tanda falla, se puede reintentar y el resultado queda en el respaldo local", async () => {
    await montar()
    await act(async () => ultimo.empezar(PARAMETROS))
    servicio.terminarPsico.mockRejectedValueOnce(new ErrorEvaluacion("intento_vencido")).mockResolvedValueOnce(servidor)

    await act(async () => ultimo.terminar())
    expect(ultimo.estado.fase).toBe("terminando")
    expect(ultimo.errorAccion?.codigo).toBe("intento_vencido")

    await act(async () => ultimo.terminar())
    expect(ultimo.estado.fase).toBe("terminada")
    expect(JSON.parse(localStorage.getItem("av_psico_v1") ?? "{}")).toMatchObject({ sesiones: 1 })
  })
})

describe("informe", () => {
  it("usa las cifras del servidor y arma el repaso por ejercicio", () => {
    const r = resultadoDelServidor(servidor)
    expect(r).toMatchObject({ porcentaje: 50, precision: 50, velocidad: 61, global: 53, correctas: 1, incorrectas: 1 })
    const items = itemsDeRepaso(sesion, servidor)
    expect(items.map((i) => [i.ejercicio.posicion, i.solucion.id, i.respuesta.correcta])).toEqual([
      [1, "NU-1", true],
      [2, "AB-2", false],
    ])
  })
})
