/**
 * High-resolution, typographically precise NOTOC reading guide.
 * Based on the fifteen-column form supplied for the course, rendered to WebP.
 */
import sharp from "sharp"

const W = 2400
const H = 1500
const x0 = 110
const widths = [135, 150, 350, 115, 120, 120, 120, 155, 135, 135, 135, 90, 85, 170, 165]
const xs = [x0]
for (const width of widths) xs.push(xs.at(-1) + width)

const xml = (s) => String(s).replaceAll("&", "&amp;").replaceAll("<", "&lt;")
const txt = (x, y, content, size = 26, weight = 400, fill = "#182e40", anchor = "start") =>
  `<text x="${x}" y="${y}" font-family="Arial, sans-serif" font-size="${size}" font-weight="${weight}" fill="${fill}" text-anchor="${anchor}">${xml(content)}</text>`
const multi = (x, y, lines, size = 23, weight = 600) =>
  `<text x="${x}" y="${y}" font-family="Arial, sans-serif" font-size="${size}" font-weight="${weight}" fill="#182e40" text-anchor="middle">${lines.map((line, i) => `<tspan x="${x}" dy="${i ? 27 : 0}">${xml(line)}</tspan>`).join("")}</text>`
const box = (x, y, w, h, fill = "#fff", stroke = "#8292a0") =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" stroke="${stroke}" stroke-width="3"/>`
const arrow = (x1, y1, x2, y2) =>
  `<path d="M${x1} ${y1} L${x2} ${y2}" fill="none" stroke="#b98b1c" stroke-width="5" marker-end="url(#tip)"/>`

const groups = [
  { from: 0, to: 3, label: "3 · ENVÍO" },
  { from: 3, to: 6, label: "4 · RIESGOS" },
  { from: 6, to: 8, label: "5 · CANTIDAD" },
  { from: 8, to: 13, label: "6 · CONDICIONES" },
  { from: 13, to: 14, label: "7 · POSICIÓN", small: true },
  { from: 14, to: 15, label: "8 · RESPUESTA", small: true },
]
const headers = [
  ["Destino"], ["Guía", "aérea"], ["Denominación", "oficial"],
  ["Clase /", "división"], ["UN / ID"], ["Riesgo", "sec."],
  ["N.º de", "bultos"], ["Cantidad", "neta"], ["Índice", "radiactivo"],
  ["Categoría", "radiactiva"], ["Grupo de", "embalaje"], ["Código"],
  ["CAO"], ["ULD /", "posición"], ["Código de", "emergencia"],
]
const example = [
  "—", "—", "PAINT", "3", "UN 1263", "—", "2", "1 L c/u",
  "—", "—", "II", "—", "—", "AKE 12345|A1", "?",
]

let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs><marker id="tip" viewBox="0 0 12 12" refX="10" refY="6" markerWidth="11" markerHeight="11" orient="auto">
    <path d="M1 1 L11 6 L1 11" fill="none" stroke="#b98b1c" stroke-width="2"/></marker></defs>
  <rect width="${W}" height="${H}" fill="#f1f4f5"/>
  <rect x="55" y="50" width="2290" height="1400" rx="18" fill="#fff" stroke="#cad3d9" stroke-width="3"/>
  <rect x="110" y="100" width="470" height="68" rx="9" fill="#142c40"/>
  ${txt(138, 145, "EJERCICIO DE LECTURA", 30, 700, "#fff")}
  ${txt(1200, 151, "NOTIFICATION TO CAPTAIN (NOTOC)", 58, 700, "#142c40", "middle")}
  ${txt(1200, 196, "DATOS DEL VUELO  ·  IDENTIDAD DEL ENVÍO  ·  POSICIÓN  ·  RESPUESTA", 27, 600, "#536675", "middle")}

  ${box(110, 236, 850, 184, "#f8fafb")}
  ${txt(134, 278, "ANTES DE LEER UNA FILA", 30, 700)}
  ${txt(134, 324, "Verifica vuelo, fecha, preparación y carga final.", 28)}
  ${txt(134, 367, "La tabla describe lo transportado en ese vuelo.", 28)}

  ${box(977, 236, 604, 184, "#fff")}
  ${txt(1000, 274, "1 · DATOS DEL VUELO", 29, 700, "#9c7414")}
  ${txt(1000, 325, "Aeropuerto de carga  __________________", 26)}
  ${txt(1000, 365, "Vuelo  ______  Fecha  ______  Matrícula  ______", 25)}

  ${box(1598, 236, 692, 184, "#fff")}
  ${txt(1621, 274, "2 · QUIÉN PREPARÓ LA INFORMACIÓN", 29, 700, "#9c7414")}
  ${txt(1621, 325, "Preparado por  _______________________", 26)}
  ${txt(1621, 365, "Firma / verificación  __________________", 26)}
  ${arrow(1500, 286, 1450, 326)}
  ${arrow(2185, 286, 2140, 326)}
  ${txt(110, 465, "MERCANCÍAS PELIGROSAS · CADA FILA CORRESPONDE A UN ENVÍO", 31, 700)}
`

for (const g of groups) {
  const x = xs[g.from]
  const width = xs[g.to] - x
  svg += `<rect x="${x}" y="487" width="${width}" height="67" fill="#142c40" stroke="#fff" stroke-width="2"/>`
  svg += txt(x + width / 2, 530, g.label, g.small ? 21 : 29, 700, "#fff", "middle")
  svg += arrow(x + width / 2, 552, x + width / 2, 585)
}

svg += box(110, 555, 2180, 565)
svg += `<rect x="111" y="556" width="2178" height="150" fill="#edf3f5"/>`
svg += `<rect x="111" y="706" width="2178" height="82" fill="#fcf7eb"/>`
svg += `<rect x="${xs[14]}" y="555" width="${widths[14]}" height="565" fill="none" stroke="#a83f34" stroke-width="7"/>`
for (const x of xs.slice(1, -1)) svg += `<path d="M${x} 555 V1120" stroke="#8d9ca6" stroke-width="2"/>`
for (const y of [706, 788, 871, 954, 1037]) svg += `<path d="M110 ${y} H2290" stroke="#8d9ca6" stroke-width="2"/>`
headers.forEach((lines, i) => {
  const cx = xs[i] + widths[i] / 2
  svg += multi(cx, 620, lines, widths[i] < 120 ? 20 : 23)
})
example.forEach((value, i) => {
  const cx = xs[i] + widths[i] / 2
  svg += value.includes("|")
    ? multi(cx, 738, value.split("|"), 20, 500)
    : txt(cx, 758, value, value.length > 14 ? 19 : 25, i === 2 || i === 4 ? 700 : 500, "#142c40", "middle")
})
svg += `
  ${arrow(442, 1168, 442, 1092)}
  ${txt(110, 1226, "LEE UNA FILA DE IZQUIERDA A DERECHA", 45, 700, "#142c40")}
  ${txt(110, 1290, "¿Qué es?  →  ¿Qué peligro tiene?  →  ¿Cuánto hay?  →  ¿Dónde quedó?", 35, 600)}
  ${txt(110, 1342, "¿Qué falta en la columna 15? Pide aclaración antes de la salida.", 32)}
  ${txt(110, 1392, "FILA DE ESTUDIO: UN 1263 · PAINT · CLASE 3 · 2 BULTOS × 1 L · GE II · AKE 12345 / A1", 28, 700, "#9c7414")}
</svg>`

await sharp(Buffer.from(svg)).webp({ quality: 95, effort: 6 }).toFile("public/modulos/mercancias/img-32-notoc-lectura-hd.webp")
console.log("img-32-notoc-lectura-hd.webp · 2400×1500")
