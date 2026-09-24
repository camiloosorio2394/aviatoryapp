// Este proyecto no expone tipos de Node al tsconfig del cliente; Vitest sí los ejecuta.
// @ts-expect-error módulo disponible en el entorno de pruebas
import { existsSync } from "node:fs"
// @ts-expect-error módulo disponible en el entorno de pruebas
import { resolve } from "node:path"
import { describe, expect, it } from "vitest"
import { AP_LECCIONES } from "@/lib/aeropuertosLeccion"

function recorrer(valor: unknown, ruta: string, huecos: string[], imagenes: string[]): void {
  if (Array.isArray(valor)) {
    valor.forEach((item, indice) => recorrer(item, `${ruta}[${indice}]`, huecos, imagenes))
    return
  }
  if (!valor || typeof valor !== "object") return

  for (const [clave, contenido] of Object.entries(valor)) {
    if (clave === "hueco" && contenido) huecos.push(`${ruta}.hueco`)
    if (clave === "src" && typeof contenido === "string" && contenido.startsWith("/modulos/aeropuertos/")) {
      imagenes.push(contenido)
    }
    recorrer(contenido, `${ruta}.${clave}`, huecos, imagenes)
  }
}

describe("imágenes de las lecciones de Aeropuertos", () => {
  it("las 22 lecciones no muestran huecos y todos sus activos locales existen", () => {
    const huecos: string[] = []
    const imagenes: string[] = []
    recorrer(AP_LECCIONES, "AP_LECCIONES", huecos, imagenes)

    expect(AP_LECCIONES).toHaveLength(22)
    expect(huecos).toEqual([])
    expect(imagenes.length).toBeGreaterThan(150)
    expect(imagenes.filter((src) => !existsSync(resolve("public", src.slice(1))))).toEqual([])
  })
})
