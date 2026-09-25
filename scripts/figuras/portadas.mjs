/**
 * Las portadas esquemáticas de las tarjetas de PBN y RVSM (3:2, 1200 × 800).
 *
 * Las demás portadas de tema son fotos; estas dos piden un esquema (una carta
 * y dos niveles de vuelo), así que se dibujan aquí, como las figuras. Van sin
 * título, porque la tarjeta pone el nombre, y sobre fondo oscuro, porque la
 * tarjeta les pone encima un velo del color del módulo.
 *
 *   node scripts/figuras/portadas.mjs [--png <dir>]
 */
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { avionLado, curvaAbierta, flyBy, linea, t } from "./lib.mjs"

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..")
const [W, H] = [1200, 800]
const FONDO = "#0B1826"
const FUENTE = "Arial, Helvetica, 'Liberation Sans', sans-serif"

function svg(titulo, desc, cuerpo) {
  return [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-labelledby="titulo desc" font-family="${FUENTE}">`,
    `<title id="titulo">${titulo}</title>`,
    `<desc id="desc">${desc}</desc>`,
    `<defs><marker id="f-claro" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0 0 10 5 0 10z" fill="#D6E4EE"/></marker></defs>`,
    `<rect width="${W}" height="${H}" fill="${FONDO}"/>`,
    cuerpo,
    "</svg>",
  ].join("\n") + "\n"
}

/** Curvas de nivel suaves, como en el fondo de una carta. */
function curvas(color) {
  const g = []
  for (let k = 0; k < 7; k++) {
    const pts = []
    for (let x = -40; x <= W + 40; x += 60) pts.push([x, 120 + k * 100 + 36 * Math.sin(x / 170 + k * 0.9) + 18 * Math.cos(x / 90 + k)])
    g.push(`<path d="${curvaAbierta(pts)}" fill="none" stroke="${color}" stroke-width="2" opacity="0.5"/>`)
  }
  return g.join("")
}

// ─── PBN ────────────────────────────────────────────────────────────────────

function portadaPbn() {
  const g = [curvas("#1C2E42")]
  const bronce = "#D6BA96"
  const magenta = "#E05ACB"
  const ruta = [[90, 640], [300, 560], [470, 400], [690, 330], [890, 360], [1010, 470]]
  g.push(`<path d="M${ruta[3][0]} ${ruta[3][1]}L${ruta[4][0]} ${ruta[4][1]}" stroke="${magenta}" stroke-width="44" opacity="0.18" stroke-linecap="round"/>`)
  g.push(linea(ruta.map(([x, y], i) => `${i ? "L" : "M"}${x} ${y}`).join(""), { color: magenta, sw: 6 }))
  const nombres = ["KILAB", "MORUS", "TENPA", "VUDEX", "SARIP"]
  ruta.slice(0, 5).forEach(([x, y], i) => {
    g.push(flyBy(x, y, 17, { fill: FONDO, color: "#EAF1F6", sw: 3 }))
    g.push(t(x + 26, y + 36, nombres[i], { size: 24, peso: 700, color: "#C7D5E0" }))
  })
  // Pista al final de la llegada.
  g.push(`<g transform="translate(1063 519) rotate(42.5)"><rect x="-70" y="-11" width="140" height="22" rx="3" fill="#EAF1F6"/><line x1="-58" y1="0" x2="58" y2="0" stroke="${FONDO}" stroke-width="3" stroke-dasharray="10 8"/></g>`)
  // La especificación rotulada sobre un segmento.
  g.push(`<rect x="700" y="232" width="150" height="56" rx="28" fill="${bronce}"/>`)
  g.push(t(775, 270, "RNP 1", { size: 30, peso: 700, color: FONDO, anchor: "middle" }))
  g.push(linea("M775 288L790 336", { color: bronce, sw: 3 }))
  return svg(
    "PBN: una llegada definida por waypoints",
    "Esquema de carta de llegada sobre fondo oscuro: la trayectoria en magenta une cinco waypoints de nombre ficticio hasta la pista, y sobre un segmento va rotulada la especificación, RNP 1.",
    g.join(""),
  )
}

// ─── RVSM ───────────────────────────────────────────────────────────────────

function portadaRvsm() {
  const g = [curvas("#1B3136")]
  const verde = "#7FC4BA"
  const [y360, y350] = [300, 540]
  for (const [y, fl] of [[y360, "FL 360"], [y350, "FL 350"]]) {
    g.push(linea(`M60 ${y}L1140 ${y}`, { color: "#4F6F75", sw: 2.5, dash: "10 10" }))
    g.push(t(70, y - 16, fl, { size: 26, peso: 700, color: "#9FB9BE" }))
  }
  g.push(avionLado(700, y360 - 12, 1.9, { izquierda: true, color: "#EAF1F6" }))
  g.push(avionLado(430, y350 - 12, 1.9, { color: "#EAF1F6" }))
  g.push(`<line x1="960" y1="${y360 + 10}" x2="960" y2="${y350 - 10}" stroke="${verde}" stroke-width="5" marker-start="url(#f-claro)" marker-end="url(#f-claro)"/>`)
  g.push(`<rect x="880" y="${(y360 + y350) / 2 - 30}" width="160" height="60" rx="30" fill="${verde}"/>`)
  g.push(t(960, (y360 + y350) / 2 + 10, "1.000 ft", { size: 30, peso: 700, color: FONDO, anchor: "middle" }))
  return svg(
    "RVSM: dos niveles adyacentes",
    "Dos aviones en crucero, de costado, en niveles adyacentes, FL 360 y FL 350, cada uno en su sentido, con la separación vertical de 1.000 ft acotada entre ellos.",
    g.join(""),
  )
}

const salidas = [
  ["public/modulos/pbn/tema-pbn.svg", portadaPbn()],
  ["public/modulos/rvsm/tema-rvsm.svg", portadaRvsm()],
]
const iPng = process.argv.indexOf("--png")
const dirPng = iPng > 0 ? path.resolve(process.argv[iPng + 1]) : null
const sharp = dirPng ? (await import("sharp")).default : null
for (const [archivo, contenido] of salidas) {
  fs.writeFileSync(path.join(RAIZ, archivo), contenido, "utf8")
  if (sharp) await sharp(Buffer.from(contenido)).png().toFile(path.join(dirPng, path.basename(archivo, ".svg") + ".png"))
  console.log(archivo)
}
