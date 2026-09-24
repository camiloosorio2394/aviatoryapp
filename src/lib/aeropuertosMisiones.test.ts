// Este proyecto no expone tipos de Node al tsconfig del cliente; Vitest sí los ejecuta.
// @ts-expect-error módulo disponible en el entorno de pruebas
import { existsSync } from "node:fs"
// @ts-expect-error módulo disponible en el entorno de pruebas
import { join } from "node:path"
import { describe, expect, it } from "vitest"
import { AP_MISIONES, resultadoPaso } from "@/lib/aeropuertosMisiones"
import { AP_PRACTICA_TOTAL } from "@/lib/aeropuertosPractica"

describe("misiones guiadas de Aeropuertos", () => {
  it("tiene cuatro recorridos independientes de los 30 ejercicios existentes", () => {
    expect(AP_MISIONES).toHaveLength(4)
    expect(new Set(AP_MISIONES.map((m) => m.id)).size).toBe(4)
    expect(AP_PRACTICA_TOTAL).toBe(30)
  })

  it("cada recorrido propone observar, decidir y revisar un dato nuevo", () => {
    for (const mision of AP_MISIONES) {
      expect(mision.pasos.map((paso) => paso.tipo)).toEqual(["observa", "decide", "decide"])
      expect(mision.lecciones.every((n) => n >= 1 && n <= 22)).toBe(true)
      expect(mision.cierre.length).toBeGreaterThan(30)
      for (const paso of mision.pasos) {
        const alternativas = paso.tipo === "observa" ? paso.puntos : paso.opciones
        expect(alternativas).toHaveLength(3)
        expect(paso.correcta).toBeGreaterThanOrEqual(0)
        expect(paso.correcta).toBeLessThan(3)
        expect(paso.situacion.length).toBeGreaterThan(30)
        for (let i = 0; i < 3; i += 1) {
          const resultado = resultadoPaso(paso, i)
          expect(resultado.correcto).toBe(i === paso.correcta)
          expect(resultado.explicacion.length).toBeGreaterThan(30)
        }
        if (paso.tipo === "observa") {
          for (const punto of paso.puntos) {
            expect(punto.x).toBeGreaterThan(0)
            expect(punto.x).toBeLessThan(100)
            expect(punto.y).toBeGreaterThan(0)
            expect(punto.y).toBeLessThan(100)
          }
        }
      }
    }
  })

  it("usa únicamente imágenes que ya existen en el módulo", () => {
    for (const mision of AP_MISIONES) {
      expect(mision.imagen.src).toMatch(/^\/modulos\/aeropuertos\/.+\.webp$/)
      expect(existsSync(join("public", mision.imagen.src.slice(1)))).toBe(true)
    }
  })
})
