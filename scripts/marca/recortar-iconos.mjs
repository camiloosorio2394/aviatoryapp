// Los íconos de la app, recortados de la hoja que diseñó Camilo (ICONOS.png, 1774 × 887,
// tres filas de tarjetas).
//
// Uso: node scripts/marca/recortar-iconos.mjs <ruta de ICONOS.png> [carpeta] [lado]
//
// Ubica cada tarjeta por su color de fondo, le quita el fondo con un relleno que entra
// desde el borde (así el blanco de adentro, el papel o el fuselaje, separado del fondo por
// su contorno, se queda) y deja el objeto sobre transparente, recortado y cuadrado, en
// WebP. Solo escribe los que usa la app (USADOS).
//
// Queda un halo claro alrededor de cada objeto (el brillo de la hoja original): sobre
// fondos claros no se ve. En oscuro los íconos van sobre una placa clara (ver
// src/components/marca/Icono.tsx), porque el navy sobre navy desaparece.
import fs from "node:fs"

const sharp = (await import("sharp")).default

const SRC = process.argv[2]
const OUT = process.argv[3] ?? "src/assets/iconos"
const LADO = Number(process.argv[4] ?? 128)
// La portada usa desde el 26-sep-2026 su propia serie (scripts/marca/iconos-panel.mjs):
// de esta hoja quedan los de la barra lateral y el de Logros.
const USADOS = new Set(["ingles-icao", "examen-pca", "ingreso-aerolinea", "biblioteca", "logbook", "vencimientos", "mi-ruta", "elegibilidad", "comunidad", "mi-perfil", "materias", "navegacion"])
fs.mkdirSync(OUT, { recursive: true })

const { data, info } = await sharp(SRC).removeAlpha().raw().toBuffer({ resolveWithObject: true })
const W = info.width
const px = (x, y) => {
  const i = (y * W + x) * 3
  return [data[i], data[i + 1], data[i + 2]]
}
const FONDO = [239, 242, 246]
const dist = (c, f = FONDO) => Math.hypot(c[0] - f[0], c[1] - f[1], c[2] - f[2])
const esTarjeta = (c) => dist(c) < 7

const FILAS = [
  { y0: 112, y1: 292, nombres: ["horas", "ingles-icao", "documentacion", "progreso", "preparacion", "perfil-aerolineas", "examen-pca", "ingreso-aerolinea"] },
  { y0: 358, y1: 540, nombres: ["biblioteca", "que-cayo", "elegibilidad", "logbook", "vencimientos", "mi-ruta", "comunidad", "referidos", "mi-perfil"] },
  { y0: 608, y1: 762, nombres: ["materias", "entrevistas", "requisitos", "meteorologia", "aeronautica", "procedimientos", "fraseologia", "pruebas-tecnicas", "navegacion"] },
]

const resultado = []
for (const fila of FILAS) {
  // Tarjetas: tramos de color de tarjeta en una línea cerca del borde de arriba.
  const y = fila.y0 + 10
  const tramos = []
  let ini = -1
  for (let x = 0; x < W; x++) {
    const t = esTarjeta(px(x, y))
    if (t && ini < 0) ini = x
    if ((!t || x === W - 1) && ini >= 0) {
      if (x - ini > 90) tramos.push([ini, x - 1])
      ini = -1
    }
  }
  if (tramos.length !== fila.nombres.length) {
    console.log("fila", fila.y0, "tramos", tramos.length, "esperados", fila.nombres.length, JSON.stringify(tramos))
  }
  tramos.forEach(([x0, x1], k) => {
    const nombre = fila.nombres[k] ?? `extra-${fila.y0}-${k}`
    // Alto de la tarjeta: bajar por x0+8 mientras sea tarjeta o sombra suave.
    const xc = x0 + 8
    let ya = fila.y0 - 20
    while (ya < fila.y1 && !esTarjeta(px(xc, ya))) ya++
    let yb = fila.y1 + 25
    while (yb > ya && !esTarjeta(px(xc, yb))) yb--
    const r = { nombre, x0: x0 + 3, x1: x1 - 3, y0: ya + 3, y1: yb - 3 }
    resultado.push(r)
  })
}

for (const t of resultado) {
  if (!USADOS.has(t.nombre)) continue
  const w = t.x1 - t.x0 + 1
  const h = t.y1 - t.y0 + 1
  const rgba = Buffer.alloc(w * h * 4)
  const d = new Float32Array(w * h)
  for (let j = 0; j < h; j++)
    for (let i = 0; i < w; i++) {
      const c = px(t.x0 + i, t.y0 + j)
      const k = j * w + i
      d[k] = dist(c)
      rgba[k * 4] = c[0]
      rgba[k * 4 + 1] = c[1]
      rgba[k * 4 + 2] = c[2]
      rgba[k * 4 + 3] = 255
    }
  // Relleno desde el borde: fondo y sombra suave conectados al borde.
  const T_ALTO = 20
  const T_BAJO = 7
  const visto = new Uint8Array(w * h)
  const pila = []
  for (let i = 0; i < w; i++) pila.push(i, (h - 1) * w + i)
  for (let j = 0; j < h; j++) pila.push(j * w, j * w + w - 1)
  while (pila.length) {
    const k = pila.pop()
    if (visto[k] || d[k] >= T_ALTO) continue
    visto[k] = 1
    const i = k % w
    const j = (k - i) / w
    if (i > 0) pila.push(k - 1)
    if (i < w - 1) pila.push(k + 1)
    if (j > 0) pila.push(k - w)
    if (j < h - 1) pila.push(k + w)
  }
  let minX = w, minY = h, maxX = 0, maxY = 0
  for (let k = 0; k < w * h; k++) {
    let a = 255
    if (visto[k]) a = Math.round(255 * Math.min(1, Math.max(0, (d[k] - T_BAJO) / (T_ALTO - T_BAJO))))
    rgba[k * 4 + 3] = a
    if (a > 40) {
      const i = k % w
      const j = (k - i) / w
      if (i < minX) minX = i
      if (i > maxX) maxX = i
      if (j < minY) minY = j
      if (j > maxY) maxY = j
    }
  }
  const bw = maxX - minX + 1
  const bh = maxY - minY + 1
  const lado = Math.round(Math.max(bw, bh) * 1.08)
  const recorte = await sharp(rgba, { raw: { width: w, height: h, channels: 4 } })
    .extract({ left: minX, top: minY, width: bw, height: bh })
    .png()
    .toBuffer()
  await sharp({ create: { width: lado, height: lado, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
    .composite([{ input: recorte, left: Math.round((lado - bw) / 2), top: Math.round((lado - bh) / 2) }])
    .png()
    .toBuffer()
    .then((b) => sharp(b).resize(LADO, LADO).webp({ quality: 86, alphaQuality: 90 }).toFile(`${OUT}/${t.nombre}.webp`))
  console.log(t.nombre, `${w}x${h}`, "objeto", `${bw}x${bh}`)
}
