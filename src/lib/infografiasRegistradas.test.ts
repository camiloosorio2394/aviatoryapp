import { describe, expect, it } from "vitest"

/**
 * Que ninguna lámina desaparezca en silencio.
 *
 * El bloque `infografia` no lleva la lámina dentro: lleva su nombre, y
 * `DocLessonBlocks` lo busca en su registro. Si el nombre no está,
 * **devuelve `null` a propósito**, para que una referencia rota no tumbe la
 * lección entera. El efecto secundario es que la figura se esfuma sin error, sin
 * aviso en consola y sin que falle nada: la lección se lee igual, solo que sin
 * su dibujo. Es justo la clase de fallo que no se ve revisando código y que
 * acaba descubriendo un piloto.
 *
 * El tipo del bloque ya impide escribir un nombre que no esté en su unión, pero
 * la unión y el registro son dos sitios distintos: se puede ampliar el tipo y
 * olvidar el registro, y entonces compila y se pierde el dibujo. Esta prueba
 * cierra ese hueco leyendo los dos como texto.
 */

// Vite lee los archivos en la prueba; nada de esto entra al bundle de la app.
const fuentes = import.meta.glob<string>(["/src/**/*.{ts,tsx}", "!/src/**/*.test.{ts,tsx}"], {
  query: "?raw",
  import: "default",
  eager: true,
})

/** Solo los nombres que pide un bloque `infografia`, no los de otros bloques. */
function nombresPedidos(): Map<string, string> {
  const pedidos = new Map<string, string>()
  const re = /kind:\s*"infografia",\s*\r?\n\s*nombre:\s*"([a-z0-9-]+)"/g
  for (const [ruta, txt] of Object.entries(fuentes)) {
    for (const m of txt.matchAll(re)) pedidos.set(m[1], ruta)
  }
  return pedidos
}

function nombresRegistrados(): Set<string> {
  const txt = fuentes["/src/components/DocLessonBlocks.tsx"]
  if (!txt) throw new Error("No encuentro DocLessonBlocks.tsx")
  const desde = txt.indexOf("const INFOGRAFIAS")
  const bloque = txt.slice(desde, txt.indexOf("\n}", desde))
  return new Set([...bloque.matchAll(/"([a-z0-9-]+)":\s*lazy\(/g)].map((m) => m[1]))
}

describe("las láminas que piden las lecciones existen", () => {
  it("encuentra bloques de infografía y un registro con entradas", () => {
    // Si un día cambia la forma del bloque o la del registro, las dos búsquedas
    // devolverían vacío y la prueba pasaría sin comprobar nada.
    expect(nombresPedidos().size).toBeGreaterThan(0)
    expect(nombresRegistrados().size).toBeGreaterThan(0)
  })

  it("cada nombre pedido está en el registro de DocLessonBlocks", () => {
    const registradas = nombresRegistrados()
    const huerfanas = [...nombresPedidos()]
      .filter(([nombre]) => !registradas.has(nombre))
      .map(([nombre, ruta]) => `${nombre} (lo pide ${ruta})`)

    expect(
      huerfanas,
      "Estas láminas se pintarían como un hueco vacío: añádelas al registro INFOGRAFIAS",
    ).toEqual([])
  })
})
