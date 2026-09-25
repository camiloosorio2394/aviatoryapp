/** Transcripción vectorial de A1-16. Cada cuadrante conserva su trama y orientación. */
import { writeFileSync } from "node:fs"
import { fileURLToPath } from "node:url"
import path from "node:path"

const destino = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../public/psicotecnicas/abstracto/AB-A1-16-didactico.svg")
// Orden: superior izquierda, superior derecha, inferior izquierda, inferior derecha.
// \ y / indican la inclinación de las rayas, X es cuadrícula, | es rayado vertical.
const matriz = [
  [["", "\\", "/", ""], ["", "\\", "", "/"], ["", "X", "", ""]],
  [["", "\\", "/", ""], ["", "", "/", "\\"], ["", "", "X", ""]],
  [["", "", "\\", "/"], ["\\", "/", "", ""], null],
]
const opciones = [
  ["|", "", "", "|"],
  ["/", "\\", "", ""],
  ["", "|", "|", ""],
  ["|", "|", "", ""],
  ["", "/", "/", ""],
]
const rellenos = { "\\": "diagonal-a", "/": "diagonal-b", X: "cruz", "|": "vertical" }

function ficha(celda, x, y) {
  if (celda === null) return `<g transform="translate(${x} ${y})"><rect width="280" height="180" rx="3" fill="#edf1f3" stroke="#334155" stroke-width="3"/><text x="140" y="110" text-anchor="middle" font-size="58" fill="#64748b">?</text></g>`
  const cuadrantes = celda.map((tipo, i) => tipo ? `<rect x="${i % 2 * 140}" y="${Math.floor(i / 2) * 90}" width="140" height="90" fill="url(#${rellenos[tipo]})"/>` : "").join("")
  return `<g transform="translate(${x} ${y})"><rect width="280" height="180" fill="#fff"/>${cuadrantes}<rect width="280" height="180" rx="2" fill="none" stroke="#26353d" stroke-width="3.2"/><path d="M140 0 V180 M0 90 H280" fill="none" stroke="#26353d" stroke-width="2.4"/></g>`
}

const celdas = matriz.flatMap((fila, i) => fila.map((celda, j) => ficha(celda, 35 + j * 330, 100 + i * 205))).join("\n")
const tarjetas = opciones.map((opcion, i) => {
  const x = 35 + (i % 2) * 500
  const y = 765 + Math.floor(i / 2) * 270
  return `<g><rect x="${x}" y="${y}" width="460" height="250" rx="15" fill="#fafdfc" stroke="#d6e1e3" stroke-width="2"/><text x="${x + 22}" y="${y + 43}" fill="#24453f" font-size="30" font-weight="700" font-family="Arial, sans-serif">${"ABCDE"[i]}</text>${ficha(opcion, x + 90, y + 52)}</g>`
}).join("\n")

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1020" height="1600" viewBox="0 0 1020 1600" role="img" aria-labelledby="titulo descripcion">
<title id="titulo">Completa la matriz de rayados</title><desc id="descripcion">Ocho rectángulos divididos en cuatro cuadrantes con rayas diagonales, verticales o cruzadas. Falta el noveno; debajo hay cinco alternativas.</desc>
<defs>
  <pattern id="diagonal-a" width="14" height="14" patternUnits="userSpaceOnUse"><path d="M-2 -2 L16 16 M-16 -2 L2 16" stroke="#26353d" stroke-width="2.2"/></pattern>
  <pattern id="diagonal-b" width="14" height="14" patternUnits="userSpaceOnUse"><path d="M16 -2 L-2 16 M30 -2 L12 16" stroke="#26353d" stroke-width="2.2"/></pattern>
  <pattern id="cruz" width="14" height="14" patternUnits="userSpaceOnUse"><path d="M-2 -2 L16 16 M-16 -2 L2 16 M16 -2 L-2 16 M30 -2 L12 16" stroke="#26353d" stroke-width="1.8"/></pattern>
  <pattern id="vertical" width="12" height="12" patternUnits="userSpaceOnUse"><path d="M2 0 V12" stroke="#26353d" stroke-width="2.3"/></pattern>
</defs>
<rect width="1020" height="1600" fill="#fff"/><text x="35" y="50" fill="#24453f" font-size="30" font-weight="700" font-family="Arial, sans-serif" letter-spacing="1">COMPLETA LA MATRIZ</text>
<rect x="23" y="75" width="990" height="655" rx="17" fill="#fff" stroke="#d6e1e3" stroke-width="2"/>
${celdas}
${tarjetas}
</svg>\n`
writeFileSync(destino, svg)
console.log(destino)
