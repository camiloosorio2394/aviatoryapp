/**
 * Recompone los siete A1 cuya lógica no está representada por FIGURAS_A1.
 * Solo se cambian escala y disposición: la matriz 3×3 permanece intacta y
 * cada alternativa se recorta del WebP limpio del cuadernillo.
 */
import path from "node:path"
import { fileURLToPath } from "node:url"
import sharp from "sharp"

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..")
const numeros = ["08", "10", "13", "14", "15", "16", "18"]
const canvasWidth = 1200
const canvasHeight = 2240
const optionX = [24, 214, 404, 593, 783]

for (const numero of numeros) {
  const id = `AB-A1-${numero}`
  const fuente = path.join(raiz, `public/psicotecnicas/abstracto/${id}-limpio.webp`)
  const destino = path.join(raiz, `public/psicotecnicas/abstracto/${id}-didactico.webp`)
  const fondo = `<svg xmlns="http://www.w3.org/2000/svg" width="${canvasWidth}" height="${canvasHeight}">
    <rect width="1200" height="2240" fill="white"/>
    <text x="40" y="68" fill="#506775" font-family="Arial,sans-serif" font-size="38" font-weight="bold">COMPLETA LA MATRIZ</text>
    <rect x="30" y="90" width="1140" height="840" rx="20" fill="#fafbfc" stroke="#dbe1e7" stroke-width="2"/>
    ${"ABCDE".split("").map((letra, i) => {
      const col = i % 2
      const row = Math.floor(i / 2)
      const x = 30 + col * 575
      const y = 955 + row * 420
      return `<rect x="${x}" y="${y}" width="555" height="390" rx="18" fill="#fafbfc" stroke="#dbe1e7" stroke-width="2"/>
        <text x="${x + 28}" y="${y + 62}" fill="#233b3b" font-family="Arial,sans-serif" font-size="42" font-weight="bold">${letra}</text>`
    }).join("")}
  </svg>`
  const capas = [{ input: Buffer.from(fondo), left: 0, top: 0 }]
  const matriz = await sharp(fuente)
    .extract({ left: 28, top: 112, width: 920, height: 650 })
    .resize({ width: 1080, height: 790, fit: "inside" })
    .png().toBuffer()
  const m = await sharp(matriz).metadata()
  capas.push({ input: matriz, left: Math.round((canvasWidth - m.width) / 2), top: Math.round(115 + (790 - m.height) / 2) })
  for (let i = 0; i < 5; i++) {
    const opcion = await sharp(fuente)
      .extract({ left: optionX[i], top: 786, width: 166, height: 116 })
      .resize({ width: 470, height: 280, fit: "inside" })
      .png().toBuffer()
    const o = await sharp(opcion).metadata()
    const col = i % 2
    const row = Math.floor(i / 2)
    capas.push({
      input: opcion,
      left: Math.round(30 + col * 575 + (555 - o.width) / 2),
      top: Math.round(955 + row * 420 + 83 + (280 - o.height) / 2),
    })
  }
  await sharp({ create: { width: canvasWidth, height: canvasHeight, channels: 3, background: "#fff" } })
    .composite(capas).webp({ quality: 92, effort: 6 }).toFile(destino)
  console.log(`Recompuesto: ${id}`)
}
