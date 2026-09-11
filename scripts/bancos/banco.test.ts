// @vitest-environment node
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { describe, expect, it } from "vitest"
// @ts-expect-error: módulo JavaScript sin tipos, se usa también desde Node
import { sqlDeBanco, validarBanco } from "./banco.mjs"

const pregunta = {
  id: "1",
  enunciado: "¿Qué es un NOTAM?",
  opciones: ["Un aviso", "Un pronóstico", "Una carta"],
  correcta: 0,
  explicacion: "Es un aviso.",
}

describe("validarBanco", () => {
  it("acepta un banco bien formado y normaliza ids numéricos", () => {
    const b = validarBanco({ banco: "notam_evaluacion", preguntas: [{ ...pregunta, id: 7 }] })
    expect(b.preguntas[0]).toMatchObject({ id: "7", referencia: null, metadatos: {} })
  })

  it("rechaza ids repetidos, correctas fuera de rango y opciones repetidas", () => {
    expect(() => validarBanco({ banco: "abc", preguntas: [pregunta, pregunta] })).toThrow(/repetido/)
    expect(() => validarBanco({ banco: "abc", preguntas: [{ ...pregunta, correcta: 3 }] })).toThrow(/fuera de rango/)
    expect(() => validarBanco({ banco: "abc", preguntas: [{ ...pregunta, opciones: ["A", "A"] }] })).toThrow(/repetidas/)
    expect(() => validarBanco({ banco: "Mal Nombre", preguntas: [pregunta] })).toThrow(/nombre de banco/)
  })

  it("los cuatro bancos del repo son válidos", () => {
    const carpeta = fileURLToPath(new URL("../../contenido/bancos", import.meta.url))
    const archivos = fs.readdirSync(carpeta).filter((f) => f.endsWith(".json"))
    expect(archivos.length).toBeGreaterThanOrEqual(4)
    for (const archivo of archivos) {
      const datos = JSON.parse(fs.readFileSync(path.join(carpeta, archivo), "utf8"))
      const banco = validarBanco(datos)
      expect(banco.banco).toBe(path.basename(archivo, ".json"))
    }
  })
})

describe("sqlDeBanco", () => {
  it("carga con upsert, desactiva lo que salió y no borra", () => {
    const sql = sqlDeBanco(validarBanco({ banco: "notam_evaluacion", preguntas: [pregunta] }))
    expect(sql).toContain("on conflict (banco, clave_externa) do update")
    expect(sql).toContain("set activa = false")
    expect(sql.toLowerCase()).not.toContain("delete")
  })

  it("no deja cerrar el delimitador desde el contenido", () => {
    const banco = validarBanco({ banco: "abc", preguntas: [{ ...pregunta, explicacion: "texto $banco$ drop" }] })
    expect(() => sqlDeBanco(banco)).toThrow(/delimitador|\$banco\$/)
  })
})
