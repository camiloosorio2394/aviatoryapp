/**
 * Dispone las sustracciones de volumen E1-11 y E1-12 en paneles móviles.
 * Los seis sólidos de cada lámina se recortan sin alterar ninguna arista.
 */
import path from "node:path"
import { fileURLToPath } from "node:url"
import sharp from "sharp"

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..")
const configuracion = {
  "ES-E1-11": [
    { left: 450, top: 80, width: 390, height: 320 },
    { left: 850, top: 80, width: 350, height: 320 },
    { left: 0, top: 500, width: 400, height: 330 },
    { left: 410, top: 500, width: 400, height: 330 },
    { left: 820, top: 500, width: 400, height: 330 },
    { left: 1230, top: 500, width: 430, height: 330 },
  ],
  "ES-E1-12": [
    { left: 430, top: 55, width: 380, height: 380 },
    { left: 830, top: 55, width: 340, height: 380 },
    { left: 30, top: 525, width: 350, height: 345 },
    { left: 385, top: 525, width: 410, height: 345 },
    { left: 810, top: 525, width: 350, height: 345 },
    { left: 1160, top: 525, width: 420, height: 345 },
  ],
}

const marco = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1100" height="1260" viewBox="0 0 1100 1260">
  <style>
    .panel{fill:#fafbfc;stroke:#d8dee5;stroke-width:2}
    .guia{fill:#637182;font:600 18px Arial,sans-serif;letter-spacing:1px}
    .opcion{fill:#202631;font:700 26px Arial,sans-serif}
  </style>
  <rect width="1100" height="1260" fill="#fff"/>
  <text class="guia" x="36" y="48">PIEZA ORIGINAL</text>
  <text class="guia" x="566" y="48">TROZO EXTRAÍDO</text>
  <rect class="panel" x="30" y="65" width="510" height="450" rx="16"/>
  <rect class="panel" x="560" y="65" width="510" height="450" rx="16"/>
  <rect class="panel" x="30" y="530" width="510" height="340" rx="16"/>
  <rect class="panel" x="560" y="530" width="510" height="340" rx="16"/>
  <rect class="panel" x="30" y="885" width="510" height="340" rx="16"/>
  <rect class="panel" x="560" y="885" width="510" height="340" rx="16"/>
  <text class="opcion" x="60" y="572">A</text>
  <text class="opcion" x="590" y="572">B</text>
  <text class="opcion" x="60" y="927">C</text>
  <text class="opcion" x="590" y="927">D</text>
</svg>`)

for (const [id, cajas] of Object.entries(configuracion)) {
  const base = path.join(raiz, `scripts/psicotecnicas/redibujos/${id}-base.png`)
  const destino = path.join(raiz, `public/psicotecnicas/espacial/${id}.webp`)
  const destinos = [
    { left: 70, top: 110, width: 430, height: 375 },
    { left: 600, top: 110, width: 430, height: 375 },
    { left: 85, top: 585, width: 400, height: 270 },
    { left: 615, top: 585, width: 400, height: 270 },
    { left: 85, top: 940, width: 400, height: 270 },
    { left: 615, top: 940, width: 400, height: 270 },
  ]
  const capas = [{ input: marco, left: 0, top: 0 }]
  for (let i = 0; i < cajas.length; i++) {
    const caja = cajas[i]
    const destinoPanel = destinos[i]
    const input = await sharp(base).extract(caja).resize({
      width: destinoPanel.width,
      height: destinoPanel.height,
      fit: "inside",
    }).png().toBuffer()
    const meta = await sharp(input).metadata()
    capas.push({
      input,
      left: destinoPanel.left + Math.round((destinoPanel.width - meta.width) / 2),
      top: destinoPanel.top + Math.round((destinoPanel.height - meta.height) / 2),
    })
  }
  const lienzo = await sharp({ create: { width: 1100, height: 1260, channels: 3, background: "#fff" } })
    .composite(capas).png().toBuffer()
  await sharp(lienzo).resize({ width: 1650 }).webp({ quality: 92, effort: 6 }).toFile(destino)
  console.log(`Redibujada: ${id}`)
}
