// @vitest-environment node
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { describe, expect, it } from "vitest"
import { MATERIAS_CON_FOTO } from "@/lib/subjectFotos"

/**
 * Cada miniatura de materia del PCA que `subjectFotos` promete tiene su archivo
 * en src/assets/pca/materias, con el nombre del slug. Vive en scripts/ porque
 * lee disco y el tsconfig de src no trae los tipos de Node.
 */
const CARPETA = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../src/assets/pca/materias")

describe("las miniaturas de las materias del PCA", () => {
  it("cada materia con foto tiene su .webp, y no sobra ninguno", () => {
    const enDisco = fs
      .readdirSync(CARPETA)
      .filter((f) => f.endsWith(".webp"))
      .map((f) => f.replace(/\.webp$/, ""))
      .sort()
    expect(enDisco).toEqual([...MATERIAS_CON_FOTO].sort())
  })

  it("ninguna pasa de 8 KB: son miniaturas, no portadas", () => {
    for (const slug of MATERIAS_CON_FOTO) {
      const bytes = fs.statSync(path.join(CARPETA, `${slug}.webp`)).size
      expect(bytes, `${slug}.webp pesa ${bytes} bytes`).toBeLessThan(8 * 1024)
    }
  })
})
