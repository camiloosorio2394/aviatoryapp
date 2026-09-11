#!/usr/bin/env node
/**
 * Escribe contenido/bancos/psicotecnicas.json desde src/data/psicotecnicas/.
 *
 *   node scripts/bancos/exportar-psicotecnicas.mjs
 *   node scripts/bancos/sembrar.mjs psicotecnicas     (el SQL para cargarlo)
 *
 * Correrlo después de cada cambio en los ejercicios. Si se olvida, la prueba
 * src/lib/psicotecnicasBanco.test.ts falla y lo recuerda.
 *
 * El banco es TypeScript con alias `@/`, así que se carga levantando Vite en
 * modo biblioteca, como los verificadores de scripts/psicotecnicas/.
 */
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { createServer } from "vite"
import { validarBanco } from "./banco.mjs"
import { bancoDePsicotecnicas } from "./psicotecnicas.mjs"

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..")
const SALIDA = path.join(RAIZ, "contenido/bancos/psicotecnicas.json")

const servidor = await createServer({
  root: RAIZ,
  server: { middlewareMode: true },
  appType: "custom",
  logLevel: "silent",
})

try {
  const { BANCO } = await servidor.ssrLoadModule("/src/data/psicotecnicas/index.ts")
  const banco = bancoDePsicotecnicas(BANCO)
  validarBanco(banco)
  fs.writeFileSync(SALIDA, JSON.stringify(banco, null, 2) + "\n")
  console.log(`${path.relative(RAIZ, SALIDA)}: ${banco.preguntas.length} ejercicios`)
} finally {
  await servidor.close()
}
