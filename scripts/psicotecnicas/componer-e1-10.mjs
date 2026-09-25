/**
 * Reorganiza para móvil el redibujo limpio de ES-E1-10 sin volver a dibujar
 * los conectores. La base fue editada a partir del PDF E1 y contrastada con
 * su ejercicio 10; cada recorte conserva su geometría original.
 */
import path from "node:path"
import { fileURLToPath } from "node:url"
import sharp from "sharp"

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..")
const base = path.join(raiz, "scripts/psicotecnicas/redibujos/ES-E1-10-base.png")
const destino = path.join(raiz, "public/psicotecnicas/espacial/ES-E1-10.webp")

const marco = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1100" height="1200" viewBox="0 0 1100 1200">
  <style>
    .panel{fill:#fafbfc;stroke:#d8dee5;stroke-width:2}
    .guia{fill:#637182;font:600 18px Arial,sans-serif;letter-spacing:1px}
    .opcion{fill:#202631;font:700 26px Arial,sans-serif}
  </style>
  <rect width="1100" height="1200" fill="#fff"/>
  <text class="guia" x="36" y="48">PUZLE INCOMPLETO</text>
  <text class="guia" x="763" y="48">PIEZA DADA</text>
  <rect class="panel" x="30" y="65" width="695" height="570" rx="16"/>
  <rect class="panel" x="740" y="65" width="330" height="570" rx="16"/>
  <rect class="panel" x="30" y="650" width="510" height="250" rx="16"/>
  <rect class="panel" x="560" y="650" width="510" height="250" rx="16"/>
  <rect class="panel" x="30" y="915" width="510" height="250" rx="16"/>
  <rect class="panel" x="560" y="915" width="510" height="250" rx="16"/>
  <text class="opcion" x="60" y="693">A</text>
  <text class="opcion" x="590" y="693">B</text>
  <text class="opcion" x="60" y="958">C</text>
  <text class="opcion" x="590" y="958">D</text>
</svg>`)

const recortes = [
  { box: { left: 0, top: 20, width: 800, height: 620 }, width: 665, left: 44, top: 93 },
  { box: { left: 975, top: 105, width: 335, height: 465 }, width: 250, left: 780, top: 175 },
  { box: { left: 1320, top: 125, width: 420, height: 210 }, width: 370, left: 100, top: 692 },
  { box: { left: 1740, top: 125, width: 390, height: 210 }, width: 350, left: 640, top: 692 },
  { box: { left: 1320, top: 395, width: 420, height: 210 }, width: 370, left: 100, top: 957 },
  { box: { left: 1740, top: 395, width: 390, height: 210 }, width: 350, left: 640, top: 957 },
]

const capas = [{ input: marco, left: 0, top: 0 }]
for (const recorte of recortes) {
  const input = await sharp(base).extract(recorte.box).resize({ width: recorte.width }).png().toBuffer()
  capas.push({ input, left: recorte.left, top: recorte.top })
}

const lienzo = await sharp({ create: { width: 1100, height: 1200, channels: 3, background: "#fff" } })
  .composite(capas)
  .png()
  .toBuffer()

await sharp(lienzo)
  .resize({ width: 1650 })
  .webp({ quality: 92, effort: 6 })
  .toFile(destino)
console.log("Redibujada: ES-E1-10")
