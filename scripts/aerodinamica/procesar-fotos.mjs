#!/usr/bin/env node
/**
 * Normaliza fotografías generadas al tamaño y formato que consume el módulo.
 *
 * Uso:
 *   node scripts/aerodinamica/procesar-fotos.mjs origen.png destino.webp 1600 900
 */
import fs from "node:fs"
import path from "node:path"
import process from "node:process"
import sharp from "sharp"

const [, , origen, destino, anchoBruto, altoBruto] = process.argv
const ancho = Number(anchoBruto)
const alto = Number(altoBruto)

if (!origen || !destino || !Number.isInteger(ancho) || !Number.isInteger(alto)) {
  throw new Error("Uso: procesar-fotos.mjs origen destino ancho alto")
}

fs.mkdirSync(path.dirname(path.resolve(destino)), { recursive: true })

await sharp(origen)
  .resize(ancho, alto, { fit: "cover", position: "centre" })
  .webp({ quality: 88, effort: 6 })
  .toFile(destino)

const meta = await sharp(destino).metadata()
console.log(`${destino}: ${meta.width}×${meta.height} ${meta.format}`)
