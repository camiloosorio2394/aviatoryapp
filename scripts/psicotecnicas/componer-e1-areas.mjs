/**
 * Dispone las comparaciones de áreas E1-13 y E1-14 para móvil. La pieza y los
 * huecos se copian siempre a la misma escala: cambiarla alteraría la prueba.
 */
import path from "node:path"
import { fileURLToPath } from "node:url"
import sharp from "sharp"

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..")
const configuracion = {
  "ES-E1-13": {
    pieza: { box: { left: 40, top: 170, width: 600, height: 340 }, left: 495, top: 100 },
    huecos: { box: { left: 820, top: 85, width: 1320, height: 530 }, left: 140, top: 570 },
  },
  "ES-E1-14": {
    pieza: { box: { left: 35, top: 125, width: 520, height: 430 }, left: 540, top: 75 },
    huecos: { box: { left: 610, top: 60, width: 1510, height: 560 }, left: 45, top: 570 },
  },
}

const marco = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1200" viewBox="0 0 1600 1200">
  <style>
    .panel{fill:#fafbfc;stroke:#d8dee5;stroke-width:2}
    .guia{fill:#637182;font:600 25px Arial,sans-serif;letter-spacing:1px}
  </style>
  <rect width="1600" height="1200" fill="#fff"/>
  <text class="guia" x="47" y="49">PIEZA UNIDAD</text>
  <rect class="panel" x="30" y="65" width="1540" height="440" rx="16"/>
  <text class="guia" x="47" y="535">SUPERFICIE A CUBRIR</text>
  <rect class="panel" x="30" y="550" width="1540" height="610" rx="16"/>
</svg>`)

for (const [id, partes] of Object.entries(configuracion)) {
  const base = path.join(raiz, `scripts/psicotecnicas/redibujos/${id}-base.png`)
  const destino = path.join(raiz, `public/psicotecnicas/espacial/${id}.webp`)
  const capas = [{ input: marco, left: 0, top: 0 }]
  for (const parte of Object.values(partes)) {
    const input = await sharp(base).extract(parte.box).png().toBuffer()
    capas.push({ input, left: parte.left, top: parte.top })
  }
  const lienzo = await sharp({ create: { width: 1600, height: 1200, channels: 3, background: "#fff" } })
    .composite(capas).png().toBuffer()
  await sharp(lienzo).webp({ quality: 92, effort: 6 }).toFile(destino)
  console.log(`Redibujada: ${id}`)
}
