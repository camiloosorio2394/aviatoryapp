/**
 * Reconstruye las láminas E1 aprobadas visualmente desde fuentes SVG editables.
 * El WebP conserva su URL: el banco ya publicado no requiere una migración.
 * La referencia del primer redibujo es la página 1 del PDF E1 (670006116).
 * No regenerar los otros recortes con extraer-figuras.mjs después de esto:
 * ese script vuelve a colocar la marca de agua del cuadernillo sobre E1-01.
 */
import path from "node:path"
import { fileURLToPath } from "node:url"
import sharp from "sharp"

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..")
const id = "ES-E1-01"
const fuente = path.join(raiz, "scripts/psicotecnicas/redibujos", `${id}.svg`)
const destino = path.join(raiz, "public/psicotecnicas/espacial", `${id}.webp`)

await sharp(fuente).resize({ width: 1650 }).webp({ quality: 92, effort: 6 }).toFile(destino)
console.log(`Redibujada: ${id}`)
