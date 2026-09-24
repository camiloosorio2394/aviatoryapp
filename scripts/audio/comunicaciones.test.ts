// @vitest-environment node
import os from "node:os"
import fs from "node:fs"
import path from "node:path"
import { describe, expect, it } from "vitest"
import { CM_TRANSMISIONES_EJEMPLO } from "@/lib/comunicacionesPracticaEjemplos"
import { faltantes, leerManifiesto, sobrantes, validarManifiesto } from "./comunicaciones.mjs"

/**
 * El manifiesto de audios de Comunicaciones: válido y al día con los ejercicios.
 * Si agregas una transmisión a los datos, agrégala al manifiesto (y viceversa).
 */

const manifiesto = leerManifiesto()

describe("manifiesto de audios de Comunicaciones", () => {
  it("es válido", () => {
    expect(validarManifiesto(manifiesto)).toEqual([])
  })

  it("trae cada transmisión de los ejercicios, con el mismo texto, voz y perfil", () => {
    const porId = new Map(manifiesto.transmisiones.map((t: { id: string }) => [t.id, t]))
    for (const t of CM_TRANSMISIONES_EJEMPLO) {
      expect(porId.get(t.id), `falta ${t.id} en contenido/audio/comunicaciones.json`).toEqual(t)
    }
  })

  it("detecta ids repetidos, raya larga, voz y perfil inválidos", () => {
    const errores = validarManifiesto({
      transmisiones: [
        { id: "a", texto: "hola", voz: "atc_uk", perfil: "limpia" },
        { id: "a", texto: "x \u2014 y", voz: "controlador", perfil: "ruidosa" },
        { id: "B C", texto: "", voz: "piloto", perfil: "normal" },
      ],
    })
    expect(errores.some((e) => e.includes("repetido"))).toBe(true)
    expect(errores.some((e) => e.includes("raya larga"))).toBe(true)
    expect(errores.some((e) => e.includes("voz"))).toBe(true)
    expect(errores.some((e) => e.includes("perfil"))).toBe(true)
    expect(errores.some((e) => e.includes("id inválido"))).toBe(true)
    expect(errores.some((e) => e.includes("texto vacío"))).toBe(true)
  })

  it("informa los mp3 que faltan y los que sobran", () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), "cm-audio-"))
    fs.writeFileSync(path.join(dir, "uno.mp3"), "")
    fs.writeFileSync(path.join(dir, "suelto.mp3"), "")
    const m = { transmisiones: [{ id: "uno" }, { id: "dos" }] }
    expect(faltantes(m, dir).map((t: { id: string }) => t.id)).toEqual(["dos"])
    expect(sobrantes(m, dir)).toEqual(["suelto.mp3"])
    fs.rmSync(dir, { recursive: true })
  })
})
