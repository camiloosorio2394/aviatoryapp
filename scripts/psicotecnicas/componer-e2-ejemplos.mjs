/**
 * Recompone los ejemplos resueltos E2 para lectura vertical en móvil.
 * Recorta solo las figuras del cuadernillo; el texto y las marcas de solución
 * se añaden por separado para no arrastrar el marco de PowerPoint ni sus círculos.
 */
import path from "node:path"
import { fileURLToPath } from "node:url"
import sharp from "sharp"

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..")
const config = {
  "04": {
    figura: [545, 164, 642, 480],
    opciones: [[195, 730, 222, 230], [555, 730, 224, 230], [905, 730, 230, 230], [1275, 730, 220, 230]],
    respuesta: "A",
  },
  "05": {
    figura: [550, 160, 640, 480],
    opciones: [[205, 775, 220, 230], [560, 775, 220, 230], [930, 775, 220, 230], [1290, 775, 220, 230]],
    respuesta: "C",
    reemplazos: { 2: "EJ-E2-05-C-base.png" },
  },
  "06": {
    figura: [525, 160, 715, 515],
    opciones: [[195, 720, 225, 250], [550, 720, 235, 250], [905, 720, 230, 250], [1280, 720, 225, 250]],
    respuesta: "D",
    reemplazos: { 3: "EJ-E2-06-D-base.png" },
  },
  "07": {
    figura: [515, 158, 720, 520],
    opciones: [[195, 720, 230, 255], [555, 720, 230, 255], [915, 720, 230, 255], [1275, 720, 230, 255]],
    respuesta: "C",
    reemplazos: { 2: "EJ-E2-07-C-base.png" },
  },
  "08": {
    figura: [690, 255, 380, 340],
    opciones: [[150, 710, 245, 315], [495, 710, 250, 315], [845, 710, 250, 315], [1190, 710, 255, 315], [1535, 710, 255, 315]],
    respuesta: "A",
    reemplazos: { 0: "EJ-E2-08-A-base.png" },
  },
  "09": {
    figura: [485, 220, 620, 455],
    opciones: [[145, 825, 210, 215], [455, 825, 220, 215], [765, 825, 220, 215], [1085, 825, 220, 215], [1400, 825, 220, 215]],
    respuesta: "B",
    reemplazos: { 1: "EJ-E2-09-B-base.png" },
  },
  "15": {
    figura: [630, 145, 440, 485],
    opciones: [[150, 790, 310, 270], [570, 790, 280, 270], [960, 810, 275, 230], [1375, 755, 330, 300]],
    respuesta: "C",
    reemplazos: { 2: "EJ-E2-15-C-base.png" },
  },
}

const ancho = 1200
const altoFigura = 720
const altoOpcion = 510
const letras = "ABCDE"

for (const [numero, item] of Object.entries(config)) {
  const id = `ES-E2-ejemplo-${numero}`
  const fuente = path.join(raiz, `public/psicotecnicas/espacial/${id}-limpio.webp`)
  const destino = path.join(raiz, `public/psicotecnicas/espacial/${id}-didactico.webp`)
  const alto = altoFigura + item.opciones.length * altoOpcion + 35
  const renglones = item.opciones.map((_, i) => {
    const y = altoFigura + i * altoOpcion
    const correcta = letras[i] === item.respuesta
    return `<rect x="30" y="${y}" width="1140" height="480" rx="20" fill="${correcta ? "#eaf8f0" : "#fafbfc"}" stroke="${correcta ? "#62b995" : "#dbe1e7"}" stroke-width="${correcta ? 4 : 2}"/>
      <text x="68" y="${y + 68}" fill="#233b3b" font-family="Arial,sans-serif" font-size="42" font-weight="bold">${letras[i]}${correcta ? " · RESPUESTA" : ""}</text>`
  }).join("")
  const marco = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${ancho}" height="${alto}">
    <rect width="${ancho}" height="${alto}" fill="white"/>
    <text x="40" y="70" fill="#506775" font-family="Arial,sans-serif" font-size="38" font-weight="bold">FIGURA DE REFERENCIA</text>
    <rect x="30" y="90" width="1140" height="600" rx="20" fill="#fafbfc" stroke="#dbe1e7" stroke-width="2"/>
    ${renglones}
  </svg>`)
  const capas = [{ input: marco, left: 0, top: 0 }]
  const extraer = async (box, maxWidth, maxHeight, top, reemplazo) => {
    const [left, y, width, height] = box
    const entrada = reemplazo
      ? sharp(path.join(raiz, `scripts/psicotecnicas/redibujos/${reemplazo}`)).flatten({ background: "#fff" })
      : sharp(fuente).extract({ left, top: y, width, height })
    const buffer = await entrada.resize({ width: maxWidth, height: maxHeight, fit: "inside" }).png().toBuffer()
    const meta = await sharp(buffer).metadata()
    capas.push({ input: buffer, left: Math.round((ancho - meta.width) / 2), top: Math.round(top + (maxHeight - meta.height) / 2) })
  }
  await extraer(item.figura, 1030, 555, 120)
  for (const [i, box] of item.opciones.entries()) {
    await extraer(box, 650, 380, altoFigura + i * altoOpcion + 80, item.reemplazos?.[i])
  }
  await sharp({ create: { width: ancho, height: alto, channels: 3, background: "#fff" } })
    .composite(capas).webp({ quality: 90, effort: 6 }).toFile(destino)
  console.log(`Recompuesto: ${id}`)
}
