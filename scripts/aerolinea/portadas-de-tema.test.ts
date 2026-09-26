// @vitest-environment node
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { describe, expect, it } from "vitest"
import { CARA_DE_MODULO } from "@/components/aerolinea/carasDeModulo"

/**
 * Cada portada de tema que `CARA_DE_MODULO` promete existe en `public/`.
 *
 * Las portadas van por ruta pública (public/modulos/<modulo>/tema-*.webp), así
 * que ni tsc ni Vite avisan si el archivo no está: la tarjeta sale con la foto
 * rota y nadie se entera hasta producción. Nació el 26 de septiembre de 2026,
 * cuando PBN y RVSM cambiaron su esquema en SVG por la foto de Camilo y entró
 * la de Comunicaciones. Vive en scripts/ porque lee disco.
 */
const PUBLIC = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../public")

describe("las portadas de tema de Ingreso a aerolínea", () => {
  const conFoto = Object.entries(CARA_DE_MODULO).filter(([, cara]) => cara.foto)

  it("cada módulo con foto apunta a un archivo que existe en public/", () => {
    expect(conFoto.length).toBeGreaterThan(0)
    for (const [modulo, cara] of conFoto) {
      const ruta = path.join(PUBLIC, cara.foto!)
      expect(fs.existsSync(ruta), `${modulo}: falta public${cara.foto}`).toBe(true)
    }
  })

  it("un módulo tiene foto o hueco, nunca los dos ni ninguno", () => {
    for (const [modulo, cara] of Object.entries(CARA_DE_MODULO)) {
      expect(Boolean(cara.foto) !== Boolean(cara.fotoHueco), `${modulo}: foto y hueco a la vez, o ninguno`).toBe(true)
    }
  })
})
