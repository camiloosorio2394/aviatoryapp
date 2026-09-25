import { renderToStaticMarkup } from "react-dom/server"
import { MemoryRouter } from "react-router-dom"
import { describe, expect, it } from "vitest"
import { calcularResultado, type RespuestaPsico } from "@/lib/psicotecnicas"
import { PsicoResultado } from "./PsicoResultado"

function respuesta(id: string, categoria: RespuestaPsico["categoria"], correcta: boolean, elegida: number | null = 0): RespuestaPsico {
  return { id, categoria, correcta, elegida, segundos: 28, limite: 45 }
}

function informe(respuestas: RespuestaPsico[]) {
  return renderToStaticMarkup(
    <MemoryRouter>
      <PsicoResultado resultado={calcularResultado(respuestas)} onRepetir={() => undefined} />
    </MemoryRouter>
  )
}

describe("lectura del resultado psicotécnico", () => {
  it("prioriza el ritmo cuando quedaron preguntas sin responder", () => {
    const html = informe([
      respuesta("A", "abstracto", true),
      respuesta("B", "espacial", false, null),
    ])
    expect(html).toContain("Llegar a todas las preguntas")
    expect(html).toContain('href="/app/aerolinea/psicotecnicas/practica"')
    expect(html).toContain("Ver métricas detalladas")
  })

  it("envía a la familia más débil cuando toda la tanda fue respondida", () => {
    const html = informe([
      respuesta("A", "abstracto", true),
      respuesta("B", "abstracto", true),
      respuesta("C", "espacial", false),
      respuesta("D", "espacial", true),
    ])
    expect(html).toContain("Razonamiento espacial")
    expect(html).toContain('href="/app/aerolinea/psicotecnicas/practica?categoria=espacial"')
  })

  it("no llama fortaleza a una tanda sin aciertos ni inventa promedios", () => {
    const html = informe([respuesta("A", "numerico", false)])
    expect(html).toContain("Aún sin aciertos")
    expect(html).toContain("—")
  })
})
