#!/usr/bin/env node
/**
 * Convierte las fotografías 16:9 de cada lección en portadas editoriales.
 * La composición mantiene la foto como protagonista y aplica la identidad
 * violeta de Aerodinámica con texto determinista y legible.
 */
import fs from "node:fs"
import path from "node:path"
import sharp from "sharp"

const ROOT = path.resolve("public/modulos/aerodinamica")
const OUT = path.join(ROOT, "portadas")
fs.mkdirSync(OUT, { recursive: true })
const ACCENT = "#c7a7ff"
const ACCENT_STRONG = "#a979f2"
const NAVY = "#130d25"

const lessons = [
  [1, "Fundamentos de", "aerodinámica", "EL AIRE, EL FLUJO Y LA CAPA LÍMITE", "Comprende cómo se mueve el aire alrededor del avión y por qué la trayectoria define el viento relativo.", ["VIENTO RELATIVO", "FLUJO", "CAPA LÍMITE", "SEPARACIÓN"]],
  [2, "Las cuatro", "fuerzas del vuelo", "CÓMO SE EQUILIBRA EL AVIÓN", "Relaciona sustentación, peso, empuje y resistencia en vuelo nivelado, ascenso y descenso.", ["SUSTENTACIÓN", "PESO", "EMPUJE", "RESISTENCIA"]],
  [3, "Sustentación y", "perfiles", "POR QUÉ UN ALA PUEDE VOLAR", "Lee el perfil, la distribución de presión y la ecuación que conecta velocidad, densidad y CL.", ["PERFIL", "PRESIÓN", "DOWNWASH", "COEFICIENTE CL"]],
  [4, "Ángulo de ataque", "y pérdida", "LA CONDICIÓN QUE PROVOCA EL STALL", "Distingue actitud y AOA, reconoce el ángulo crítico y ordena una recuperación correcta.", ["AOA", "ÁNGULO CRÍTICO", "STALL", "RECUPERACIÓN"]],
  [5, "Resistencia y", "eficiencia", "LA ENERGÍA DETRÁS DE CADA MANIOBRA", "Comprende la resistencia inducida y parásita, L/D máxima y el comportamiento en planeo.", ["INDUCIDA", "PARÁSITA", "L/D MÁXIMA", "PLANEO"]],
  [6, "Factor de carga", "y virajes", "LO QUE CAMBIA AL INCLINAR EL AVIÓN", "Relaciona alabeo, carga, velocidad de pérdida y velocidad de maniobra sin memorizar reglas aisladas.", ["ALABEO", "FACTOR N", "VS", "VA"]],
  [7, "Superficies de", "control", "CÓMO RESPONDE EL AVIÓN", "Identifica mandos primarios, estabilizadores, hipersustentadores, spoilers y frenos aerodinámicos.", ["ALERONES", "ELEVADOR", "FLAPS / SLATS", "SPOILERS"]],
  [8, "Estabilidad,", "control y CG", "POR QUÉ EL BALANCE CAMBIA EL VUELO", "Entiende estabilidad estática y dinámica, momentos y consecuencias de un CG adelantado o atrasado.", ["CG", "PUNTO NEUTRO", "MOMENTO", "ESTABILIDAD"]],
  [9, "Fenómenos", "operacionales", "EFECTOS QUE APARECEN EN VUELO REAL", "Separa conceptos que suelen confundirse: efecto suelo, guiñada adversa, Dutch Roll e inestabilidad espiral.", ["EFECTO SUELO", "GUIÑADA", "DUTCH ROLL", "ESPIRAL"]],
  [10, "Alta velocidad", "y Mach", "CUANDO EL AIRE CAMBIA SU RESPUESTA", "Reconoce Mach crítico, ondas de choque, buffet, Mach Tuck y la función del ala en flecha.", ["MACH", "ONDA DE CHOQUE", "BUFFET", "ALA EN FLECHA"]],
  [11, "Gran altitud y", "Coffin Corner", "EL MARGEN QUE SE ESTRECHA ARRIBA", "Relaciona los límites de buffet, MMO, peso y carga para operar con margen cerca del techo.", ["LOW-SPEED", "MMO", "MARGEN 1,3 G", "TECHO"]],
  [12, "Densidad y", "performance", "ALTO, CALIENTE Y PESADO", "Conecta altitud de densidad, IAS y TAS con pista necesaria, ascenso y margen operacional.", ["ALTITUD DENSIDAD", "IAS / TAS", "PISTA", "ASCENSO"]],
]

const esc = (s) => String(s).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;")

function lines(text, max = 53) {
  const out = []
  for (const word of text.split(" ")) {
    const last = out.at(-1)
    if (!last || `${last} ${word}`.length > max) out.push(word)
    else out[out.length - 1] = `${last} ${word}`
  }
  return out.slice(0, 3)
}

function cover([n, first, second, kicker, description, concepts]) {
  const descriptionLines = lines(description)
    .map((line, i) => `<tspan x="80" dy="${i === 0 ? 0 : 36}">${esc(line)}</tspan>`)
    .join("")
  const boxes = concepts.map((concept, i) => {
    const x = 80 + i * 185
    return `<g>
      <rect x="${x}" y="646" width="165" height="96" rx="15" fill="#160f2c" fill-opacity=".78" stroke="${ACCENT}" stroke-width="2"/>
      <circle cx="${x + 82.5}" cy="677" r="13" fill="${ACCENT}"/>
      <text x="${x + 82.5}" y="720" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="16" font-weight="700" fill="#ffffff">${esc(concept)}</text>
    </g>`
  }).join("")

  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900">
    <defs>
      <linearGradient id="veil" x1="0" x2="1">
        <stop offset="0" stop-color="${NAVY}" stop-opacity=".98"/>
        <stop offset=".47" stop-color="${NAVY}" stop-opacity=".90"/>
        <stop offset=".72" stop-color="#26183d" stop-opacity=".36"/>
        <stop offset="1" stop-color="#26183d" stop-opacity=".10"/>
      </linearGradient>
      <linearGradient id="top" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0" stop-color="#160f2c" stop-opacity=".42"/>
        <stop offset="1" stop-color="#160f2c" stop-opacity="0"/>
      </linearGradient>
    </defs>
    <rect width="1600" height="900" fill="url(#veil)"/>
    <rect width="1600" height="300" fill="url(#top)"/>
    <rect x="80" y="68" width="66" height="18" rx="3" fill="${ACCENT_STRONG}"/>
    <text x="166" y="88" font-family="Arial, Helvetica, sans-serif" font-size="28" font-weight="700" letter-spacing="3" fill="#ffffff">LECCIÓN <tspan fill="${ACCENT}">${String(n).padStart(2, "0")}</tspan></text>
    <text x="80" y="202" font-family="Arial, Helvetica, sans-serif" font-size="76" font-weight="800" fill="#ffffff">${esc(first)}</text>
    <text x="80" y="284" font-family="Arial, Helvetica, sans-serif" font-size="76" font-weight="800" fill="${ACCENT}">${esc(second)}</text>
    <rect x="80" y="324" width="56" height="5" fill="${ACCENT_STRONG}"/>
    <text x="155" y="336" font-family="Arial, Helvetica, sans-serif" font-size="21" font-weight="700" letter-spacing="5" fill="#ffffff">${esc(kicker)}</text>
    <text x="80" y="393" font-family="Arial, Helvetica, sans-serif" font-size="25" font-weight="400" fill="#ffffff">${descriptionLines}</text>
    ${boxes}
    <text x="80" y="830" font-family="Arial, Helvetica, sans-serif" font-size="38" font-weight="700" letter-spacing="7" fill="#ffffff">AVIATORY</text>
    <text x="82" y="858" font-family="Arial, Helvetica, sans-serif" font-size="14" font-weight="700" letter-spacing="3" fill="${ACCENT}">AERODINÁMICA PARA ENTREVISTA</text>
    <text x="1425" y="160" text-anchor="end" font-family="Arial, Helvetica, sans-serif" font-size="210" font-weight="800" fill="#ffffff" fill-opacity=".13">${String(n).padStart(2, "0")}</text>
    <rect x="1438" y="62" width="5" height="96" fill="${ACCENT}"/>
    <text x="1570" y="86" text-anchor="end" font-family="Arial, Helvetica, sans-serif" font-size="19" font-weight="700" fill="#ffffff">COMPRENDER</text>
    <text x="1570" y="113" text-anchor="end" font-family="Arial, Helvetica, sans-serif" font-size="19" font-weight="700" fill="#ffffff">EXPLICAR</text>
    <text x="1570" y="140" text-anchor="end" font-family="Arial, Helvetica, sans-serif" font-size="19" font-weight="700" fill="#ffffff">APLICAR</text>
  </svg>`)
}

for (const lesson of lessons) {
  const number = String(lesson[0]).padStart(2, "0")
  const source = path.join(ROOT, `leccion-${number}.webp`)
  const file = path.join(OUT, `leccion-${number}.webp`)
  await sharp(source)
    .resize(1600, 900, { fit: "cover" })
    .modulate({ brightness: 0.78, saturation: 0.88 })
    .composite([{ input: cover(lesson), blend: "over" }])
    .webp({ quality: 92, effort: 6 })
    .toFile(file)
  console.log(path.relative(process.cwd(), file))
}
