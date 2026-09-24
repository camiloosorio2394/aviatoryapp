import { MemoryRouter, Route, Routes } from "react-router-dom"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import type { BuiltTest, GradedAnswer, TestItem } from "@/lib/initialTest"
import { boton, clic, desmontarTodo, montar } from "@/test/pantalla"

const test = vi.hoisted(() => ({
  buildInitialTest: vi.fn(),
  gradeItem: vi.fn(),
  estimateInitialTestSize: vi.fn(),
}))
const piloto = vi.hoisted(() => ({ guardarNivelIcaoEstimado: vi.fn() }))
const avisos = vi.hoisted(() => ({ success: vi.fn(), error: vi.fn() }))
const sesion = vi.hoisted(() => ({ user: { id: "piloto-1" }, session: null, isLoading: false }))

// El cálculo del nivel se deja real: es lo que la pantalla guarda.
vi.mock("@/lib/initialTest", async (original) => ({
  ...(await original<typeof import("@/lib/initialTest")>()),
  ...test,
}))
vi.mock("@/services/piloto", () => piloto)
vi.mock("sonner", () => ({ toast: avisos }))
vi.mock("@/hooks/useSession", () => ({ useSession: () => sesion }))

const { TestInicial } = await import("@/pages/TestInicial")
const { ErrorEvaluacion } = await import("@/services/rpc")

const opciones = [
  { letter: "A", text: "Opción A del ítem" },
  { letter: "B", text: "Opción B del ítem" },
]

function item(uid: string, area: string, prompt: string): TestItem {
  return {
    uid,
    kind: "vault",
    area,
    areaLabel: area === "icao" ? "Inglés ICAO" : "Meteorología",
    prompt,
    options: opciones,
    token: "t",
    position: 1,
  }
}

const armado: BuiltTest = {
  items: [
    item("icao-1", "icao", "Read the ATIS: which runway is in use?"),
    item("icao-2", "icao", "What does the controller request?"),
    item("met-1", "meteorologia", "¿Qué es una inversión térmica?"),
    item("met-2", "meteorologia", "¿Qué indica un QNH bajo?"),
  ],
  subjects: [{ slug: "meteorologia", label: "Meteorología", questionCount: 40 }],
  icaoCount: 2,
}

/** Correcta si el piloto elige A. */
function corregir(it: TestItem, letra: string): GradedAnswer {
  return { uid: it.uid, area: it.area, correct: letra === "A", correctAnswer: "A", explanation: `Explicación de ${it.uid}` }
}

function pintar() {
  return montar(
    <MemoryRouter initialEntries={["/app/test-inicial"]}>
      <Routes>
        <Route path="/app/test-inicial" element={<TestInicial />} />
        <Route path="/app" element={<p>Cabina del piloto</p>} />
      </Routes>
    </MemoryRouter>,
  )
}

/** ICAO: una bien y una mal. Meteorología: una bien y una mal. */
async function responderTodo() {
  await clic(boton("Empezar el test"))
  for (const letra of ["A", "B", "A", "B"]) {
    await clic(boton(`Opción ${letra} del ítem`))
    await clic(boton(/Siguiente|Ver resultado/))
  }
}

beforeEach(() => {
  test.buildInitialTest.mockReset().mockResolvedValue(armado)
  test.gradeItem.mockReset().mockImplementation(async (it: TestItem, letra: string) => corregir(it, letra))
  test.estimateInitialTestSize.mockReset().mockResolvedValue({ total: 4, icao: 2, subjects: 1, minutes: 2 })
  piloto.guardarNivelIcaoEstimado.mockReset().mockResolvedValue(true)
  avisos.success.mockReset()
  avisos.error.mockReset()
})

afterEach(() => {
  desmontarTodo()
})

describe("el test inicial", () => {
  it("anuncia su tamaño real antes de empezar", async () => {
    const p = await pintar()
    expect(p.texto()).toContain("4 preguntas · 2 min aprox.")
    expect(test.buildInitialTest).not.toHaveBeenCalled()
  })

  it("sin preguntas cargadas no arranca y lo dice", async () => {
    test.buildInitialTest.mockResolvedValue({ items: [], subjects: [], icaoCount: 0 })
    const p = await pintar()
    await clic(boton("Empezar el test"))
    expect(avisos.error).toHaveBeenCalledWith("Todavía no hay preguntas cargadas para el test.")
    expect(p.texto()).toContain("Empezar el test")
  })

  it("cada respuesta se corrige en el servidor y no se avanza sin corrección", async () => {
    const p = await pintar()
    await clic(boton("Empezar el test"))
    expect(p.texto()).toContain("1 / 4")
    expect(boton("Siguiente").disabled).toBe(true)

    await clic(boton("Opción B del ítem"))
    expect(test.gradeItem).toHaveBeenCalledWith(armado.items[0], "B")
    expect(p.texto()).toContain("Incorrecto")
    expect(p.texto()).toContain("Explicación de icao-1")
    // Corregida, no se puede cambiar.
    expect(boton("Opción A del ítem").disabled).toBe(true)
    expect(boton("Siguiente").disabled).toBe(false)
  })

  it("si la corrección falla, la pregunta sigue abierta: un corte de red no es una respuesta mala", async () => {
    test.gradeItem.mockRejectedValueOnce(new ErrorEvaluacion("respuesta_invalida"))
    const p = await pintar()
    await clic(boton("Empezar el test"))
    await clic(boton("Opción A del ítem"))

    expect(avisos.error).toHaveBeenCalledWith("No pudimos registrar esa respuesta. Elige una opción y vuelve a intentarlo.")
    expect(p.texto()).not.toContain("Incorrecto")
    expect(boton("Siguiente").disabled).toBe(true)

    await clic(boton("Opción A del ítem"))
    expect(p.texto()).toContain("Correcto")
  })

  it("el resultado estima el nivel con la parte ICAO y manda a practicar la materia más floja", async () => {
    const p = await pintar()
    await responderTodo()

    // 1 de 2 en ICAO es el 50 %: nivel 4.
    expect(p.texto()).toContain("Nivel 4")
    expect(p.texto()).toContain("1 de 2")
    expect(p.texto()).toContain("Ahí fallaste 1 de 2 y el banco tiene 40 preguntas para practicar.")
    const enlaces = [...p.contenedor.querySelectorAll("a")].map((a) => a.getAttribute("href"))
    expect(enlaces).toContain("/app/pca/quiz/meteorologia?module=pca&count=10")
  })

  it("guardar deja el nivel estimado y lleva a la cabina", async () => {
    const p = await pintar()
    await responderTodo()
    await clic(boton("Guardar y continuar"))

    expect(piloto.guardarNivelIcaoEstimado).toHaveBeenCalledWith("piloto-1", 4)
    expect(avisos.success).toHaveBeenCalledWith("Listo, guardamos tu Nivel Inicial")
    expect(p.texto()).toContain("Cabina del piloto")
  })

  it("si el nivel no se guarda, se queda en el resultado y lo dice", async () => {
    piloto.guardarNivelIcaoEstimado.mockResolvedValue(false)
    const p = await pintar()
    await responderTodo()
    await clic(boton("Guardar y continuar"))

    expect(avisos.error).toHaveBeenCalledWith("No pudimos guardar tu nivel. Revisa tu conexión e inténtalo de nuevo.")
    expect(avisos.success).not.toHaveBeenCalled()
    expect(p.texto()).not.toContain("Cabina del piloto")
    expect(boton("Guardar y continuar").disabled).toBe(false)
  })
})
