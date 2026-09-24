/**
 * Reconstruye las láminas E1 aprobadas visualmente desde fuentes SVG editables.
 * El WebP conserva su URL: el banco ya publicado no requiere una migración.
 * La referencia de cada redibujo es el PDF E1 (670006116).
 * No regenerar estos recortes con extraer-figuras.mjs después de esto:
 * ese script vuelve a colocar las láminas originales sobre los redibujos.
 */
import path from "node:path"
import { fileURLToPath } from "node:url"
import sharp from "sharp"

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..")
const ids = ["ES-E1-01", "ES-E1-02", "ES-E1-03", "ES-E1-04", "ES-E1-05", "ES-E1-06", "ES-E1-07"]

for (const id of ids) {
  const fuente = path.join(raiz, "scripts/psicotecnicas/redibujos", `${id}.svg`)
  const destino = path.join(raiz, "public/psicotecnicas/espacial", `${id}.webp`)
  await sharp(fuente).resize({ width: 1650 }).webp({ quality: 92, effort: 6 }).toFile(destino)
  console.log(`Redibujada: ${id}`)
}
