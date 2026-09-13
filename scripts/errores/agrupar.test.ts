// @vitest-environment node
import { describe, expect, it } from "vitest"
// @ts-expect-error: módulo JavaScript sin tipos, se usa también desde Node
import { agruparErrores, formatearResumen, normalizarMensaje, primeraLinea } from "./agrupar.mjs"

interface FilaError {
  user_id?: string
  creado_en?: string
  contexto?: string
  mensaje?: string
  ruta?: string
  version_app?: string
}

const fila = (p: FilaError): FilaError => ({
  user_id: "piloto-1",
  creado_en: "2026-09-12T10:00:00Z",
  contexto: "bitácora: cargar",
  mensaje: "Failed to fetch",
  ...p,
})

describe("normalizar el mensaje", () => {
  it("quita los ids, que son lo que cambia entre dos veces el mismo fallo", () => {
    const a = "no existe 3f2504e0-4f89-11d3-9a0c-0305e82c3301"
    const b = "no existe 7c9e6679-7425-40de-944b-e07fc1f90ae7"
    expect(normalizarMensaje(a)).toBe(normalizarMensaje(b))
  })

  it("quita números, fechas y URLs", () => {
    expect(normalizarMensaje("fallo 42 en 2026-09-12T10:00:00Z")).toBe("fallo <n> en <fecha>")
    expect(normalizarMensaje("GET https://api.test/x?y=1 falló")).toBe("GET <url> falló")
  })

  it("un mensaje vacío o ausente no revienta", () => {
    expect(normalizarMensaje(undefined)).toBe("")
    expect(normalizarMensaje(null)).toBe("")
  })
})

describe("primera línea", () => {
  it("se queda con la primera y descarta la traza", () => {
    expect(primeraLinea("Error: se cayó\n  at foo()\n  at bar()")).toBe("Error: se cayó")
  })

  it("recorta lo muy largo con puntos suspensivos", () => {
    expect(primeraLinea("x".repeat(200), 20)).toHaveLength(20)
    expect(primeraLinea("x".repeat(200), 20).endsWith("…")).toBe(true)
  })
})

describe("agrupar", () => {
  it("junta el mismo fallo aunque el id cambie", () => {
    const grupos = agruparErrores([
      fila({ mensaje: "no existe el vuelo 3f2504e0-4f89-11d3-9a0c-0305e82c3301" }),
      fila({ mensaje: "no existe el vuelo 7c9e6679-7425-40de-944b-e07fc1f90ae7" }),
    ])
    expect(grupos).toHaveLength(1)
    expect(grupos[0].veces).toBe(2)
  })

  it("no junta dos contextos distintos aunque el mensaje sea igual", () => {
    const grupos = agruparErrores([
      fila({ contexto: "bitácora: cargar" }),
      fila({ contexto: "perfil: cargar" }),
    ])
    expect(grupos).toHaveLength(2)
  })

  it("cuenta pilotos distintos, no reportes", () => {
    const grupos = agruparErrores([
      fila({ user_id: "a" }),
      fila({ user_id: "a" }),
      fila({ user_id: "b" }),
    ])
    expect(grupos[0].veces).toBe(3)
    expect(grupos[0].pilotos).toBe(2)
  })

  /**
   * Lo que decide si algo es urgente es a cuánta gente le pasa. Veinte veces a
   * un piloto es un caso raro; dos veces a diez pilotos es un problema de la app.
   */
  it("ordena por pilotos afectados antes que por número de reportes", () => {
    const muchasVecesUnPiloto = Array.from({ length: 20 }, () =>
      fila({ contexto: "raro", user_id: "a" }),
    )
    const pocasVecesVariosPilotos = ["a", "b", "c", "d"].map((u) =>
      fila({ contexto: "general", user_id: u }),
    )
    const grupos = agruparErrores([...muchasVecesUnPiloto, ...pocasVecesVariosPilotos])

    expect(grupos[0].contexto).toBe("general")
    expect(grupos[0].pilotos).toBe(4)
    expect(grupos[1].contexto).toBe("raro")
    expect(grupos[1].veces).toBe(20)
  })

  it("guarda desde cuándo pasa y cuándo fue la última vez", () => {
    const grupos = agruparErrores([
      fila({ creado_en: "2026-09-12T10:00:00Z" }),
      fila({ creado_en: "2026-09-10T08:00:00Z" }),
      fila({ creado_en: "2026-09-11T09:00:00Z" }),
    ])
    expect(grupos[0].primero).toBe("2026-09-10T08:00:00Z")
    expect(grupos[0].ultimo).toBe("2026-09-12T10:00:00Z")
  })

  it("las rutas salen de la más frecuente a la menos", () => {
    const grupos = agruparErrores([
      fila({ ruta: "/app/logbook" }),
      fila({ ruta: "/app/logbook" }),
      fila({ ruta: "/app/perfil" }),
    ])
    expect(grupos[0].rutas).toEqual(["/app/logbook", "/app/perfil"])
  })

  it("junta las versiones en las que aparece, sin repetir", () => {
    const grupos = agruparErrores([
      fila({ version_app: "abc123" }),
      fila({ version_app: "abc123" }),
      fila({ version_app: "def456" }),
    ])
    expect(grupos[0].versiones).toEqual(["abc123", "def456"])
  })

  it("una lista vacía o nula no revienta", () => {
    expect(agruparErrores([])).toEqual([])
    expect(agruparErrores(null)).toEqual([])
  })

  it("una fila sin contexto no se pierde", () => {
    const grupos = agruparErrores([{ mensaje: "algo" }])
    expect(grupos[0].contexto).toBe("sin contexto")
  })
})

describe("el texto que se imprime", () => {
  it("sin errores lo dice y no imprime una tabla vacía", () => {
    expect(formatearResumen([])).toBe("Sin errores en la ventana pedida.")
  })

  it("lleva el conteo, el contexto, la ruta y la versión", () => {
    const texto = formatearResumen(
      agruparErrores([
        fila({ user_id: "a", ruta: "/app/logbook", version_app: "abc123" }),
        fila({ user_id: "b", ruta: "/app/logbook", version_app: "abc123" }),
      ]),
    )
    expect(texto).toContain("1 fallos distintos · 2 reportes en total")
    expect(texto).toContain("2 pilotos")
    expect(texto).toContain("bitácora: cargar")
    expect(texto).toContain("/app/logbook")
    expect(texto).toContain("vabc123")
  })

  it("distingue el singular de un solo piloto", () => {
    expect(formatearResumen(agruparErrores([fila({})]))).toContain("1 piloto ")
  })
})
