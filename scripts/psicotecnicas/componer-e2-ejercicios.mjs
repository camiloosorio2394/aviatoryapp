/**
 * Publica los cuatro dibujos limpios del cuadernillo E2. Las bases conservan
 * las posiciones de cubos y los puntos de los dados cotejados con el PDF.
 */
import path from "node:path"
import { fileURLToPath } from "node:url"
import sharp from "sharp"

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..")

for (const numero of ["07", "08", "09", "10"]) {
  const id = `ES-E2-${numero}`
  const base = path.join(raiz, `scripts/psicotecnicas/redibujos/${id}-base.png`)
  const destino = path.join(raiz, `public/psicotecnicas/espacial/${id}-limpio.webp`)
  await sharp(base)
    .flatten({ background: "#ffffff" })
    .resize({ width: 1200, height: 1200, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 92, effort: 6 })
    .toFile(destino)
  console.log(`Redibujada: ${id}`)
}
