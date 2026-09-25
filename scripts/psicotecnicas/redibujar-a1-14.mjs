/**
 * Lámina 14 del A1, transcrita desde el cuadernillo a geometría vectorial.
 * Las nueve posiciones y las cinco alternativas se declaran como atributos,
 * para poder cotejarlas una por una con la fuente y evitar reescalar píxeles.
 *
 *   node scripts/psicotecnicas/redibujar-a1-14.mjs
 */
import { writeFileSync } from "node:fs"
import { fileURLToPath } from "node:url"
import path from "node:path"

const destino = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../public/psicotecnicas/abstracto/AB-A1-14-didactico.svg")
const matriz = [
  [{ numero: 1, lugar: "NE", diagonal: "SE", sector: "NW" }, { numero: 3, lugar: "SE", diagonal: "NE", sector: "NE" }, { numero: 5, lugar: "SW", diagonal: "NW", sector: "SE" }],
  [{ numero: 2, lugar: "NW", diagonal: "SW", sector: "NE" }, { numero: 4, lugar: "NE", diagonal: "SE", sector: "SE" }, { numero: 6, lugar: "SE", diagonal: "NE", sector: "SW" }],
  [{ numero: 3, lugar: "SW", diagonal: "NW", sector: "SE" }, { numero: 6, lugar: "NW", diagonal: "NE", sector: "SW" }, null],
]
const opciones = [
  { letra: "A", numero: 9, lugar: "NE", diagonal: "SW", sector: "NW" },
  { letra: "B", numero: 9, lugar: "NE", diagonal: "SE", sector: "NW" },
  { letra: "C", numero: null, lugar: "NE", diagonal: "SE", sector: "NW" },
  { letra: "D", numero: null, lugar: "NE", diagonal: null, sector: "NW" },
  { letra: "E", numero: 9, lugar: "NE", diagonal: null, sector: "SE" },
]
const extremos = { NW: [87, 37], NE: [193, 37], SE: [193, 143], SW: [87, 143] }
const posiciones = { NW: [102, 57], NE: [164, 57], SE: [164, 135], SW: [102, 135] }
const sectores = {
  NW: "M140 90 L140 72 A18 18 0 0 0 122 90 Z",
  NE: "M140 90 L140 72 A18 18 0 0 1 158 90 Z",
  SE: "M140 90 L158 90 A18 18 0 0 1 140 108 Z",
  SW: "M140 90 L140 108 A18 18 0 0 1 122 90 Z",
}

function ficha(celda, x, y, { incognita = false } = {}) {
  if (incognita) return `<g transform="translate(${x} ${y})"><rect width="280" height="180" rx="3" fill="#edf1f3" stroke="#334155" stroke-width="3"/><text x="140" y="110" text-anchor="middle" font-size="58" fill="#64748b">?</text></g>`
  const [dx, dy] = celda.diagonal ? extremos[celda.diagonal] : [140, 90]
  const [nx, ny] = posiciones[celda.lugar]
  return `<g transform="translate(${x} ${y})" fill="none" stroke="#26353d" stroke-width="3.2" stroke-linejoin="round">
    <rect width="280" height="180" rx="3" fill="#fff"/>
    <circle cx="140" cy="90" r="75"/>
    <path d="M65 90 H215 M140 15 V165"/>
    ${celda.diagonal ? `<path d="M140 90 L${dx} ${dy}"/>` : ""}
    <path d="${sectores[celda.sector]}" fill="#26353d" stroke="none"/>
    ${celda.numero === null ? "" : `<text x="${nx}" y="${ny}" fill="#26353d" stroke="none" font-size="39" font-family="Georgia, serif">${celda.numero}</text>`}
  </g>`
}

const celdas = matriz.flatMap((fila, i) => fila.map((celda, j) => ficha(celda, 35 + j * 330, 100 + i * 205, { incognita: celda === null }))).join("\n")
const tarjetas = opciones.map((opcion, i) => {
  const x = 35 + (i % 2) * 500
  const y = 765 + Math.floor(i / 2) * 270
  return `<g><rect x="${x}" y="${y}" width="460" height="250" rx="15" fill="#fafdfc" stroke="#d6e1e3" stroke-width="2"/>
    <text x="${x + 22}" y="${y + 43}" fill="#24453f" font-size="30" font-weight="700" font-family="Arial, sans-serif">${opcion.letra}</text>
    ${ficha(opcion, x + 90, y + 52)}
  </g>`
}).join("\n")

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1020" height="1600" viewBox="0 0 1020 1600" role="img" aria-labelledby="titulo descripcion">
  <title id="titulo">Completa la matriz de números y sectores</title>
  <desc id="descripcion">Ocho círculos con un número, una diagonal y un cuadrante central negro; falta el noveno. Debajo aparecen cinco alternativas A a E.</desc>
  <rect width="1020" height="1600" fill="#fff"/>
  <text x="35" y="50" fill="#24453f" font-size="30" font-weight="700" font-family="Arial, sans-serif" letter-spacing="1">COMPLETA LA MATRIZ</text>
  <rect x="23" y="75" width="990" height="655" rx="17" fill="#fff" stroke="#d6e1e3" stroke-width="2"/>
  ${celdas}
  ${tarjetas}
</svg>\n`
writeFileSync(destino, svg.replace(/[ \t]+$/gm, ""))
console.log(destino)
