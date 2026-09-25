/** A1-15: cruz fija y pequeños remates oblicuos transcritos como segmentos. */
import { writeFileSync } from "node:fs"
import { fileURLToPath } from "node:url"
import path from "node:path"

const destino = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../public/psicotecnicas/abstracto/AB-A1-15-didactico.svg")
const trazos = {
  izquierdaBaja: "M90 90 L65 112",
  izquierdaSube: "M90 90 L65 68",
  derechaBaja: "M190 90 L165 112",
  derechaSube: "M190 90 L165 68",
  arribaBaja: "M140 45 L115 67",
  arribaSube: "M140 45 L115 23",
  arribaDerecha: "M140 45 L165 67",
  abajoBaja: "M140 135 L115 157",
  centroBaja: "M140 90 L115 112",
  centroDerecha: "M140 90 L165 112",
  tejadoDerecho: "M140 90 L165 65 L190 90",
}
const matriz = [
  [["izquierdaBaja"], ["arribaBaja"], ["derechaBaja"]],
  [["derechaSube", "abajoBaja"], ["arribaSube", "derechaBaja"], ["izquierdaSube", "arribaBaja"]],
  [["arribaBaja", "derechaSube", "abajoBaja", "centroBaja"], ["arribaSube", "derechaBaja", "centroBaja"], null],
]
const opciones = [
  ["arribaBaja", "izquierdaSube", "centroDerecha"],
  ["arribaBaja", "izquierdaBaja", "centroBaja"],
  ["arribaBaja", "izquierdaSube", "centroBaja"],
  ["arribaDerecha", "izquierdaSube", "centroDerecha"],
  ["arribaBaja", "tejadoDerecho"],
]

function ficha(celda, x, y) {
  if (celda === null) return `<g transform="translate(${x} ${y})"><rect width="280" height="180" fill="#f3f7f8" stroke="#26353d" stroke-width="3"/><text x="140" y="111" text-anchor="middle" font-size="58" fill="#64748b">?</text></g>`
  const extras = celda.map((trazo) => trazos[trazo]).join(" ")
  return `<g transform="translate(${x} ${y})">
    <rect width="280" height="180" fill="#fff" stroke="#26353d" stroke-width="3"/>
    <path d="M90 90 H190 M140 45 V135 ${extras}" fill="none" stroke="#26353d" stroke-width="3.3" stroke-linecap="square" stroke-linejoin="miter"/>
  </g>`
}

const celdas = matriz.flatMap((fila, i) => fila.map((celda, j) => ficha(celda, 35 + j * 330, 100 + i * 205))).join("\n")
const tarjetas = opciones.map((opcion, i) => {
  const x = 35 + (i % 2) * 500
  const y = 765 + Math.floor(i / 2) * 270
  return `<g><rect x="${x}" y="${y}" width="460" height="250" rx="15" fill="#fafdfc" stroke="#d6e1e3" stroke-width="2"/>
    <text x="${x + 22}" y="${y + 43}" fill="#24453f" font-size="30" font-weight="700" font-family="Arial, sans-serif">${"ABCDE"[i]}</text>
    ${ficha(opcion, x + 90, y + 52)}</g>`
}).join("\n")

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1020" height="1600" viewBox="0 0 1020 1600" role="img" aria-labelledby="titulo descripcion">
  <title id="titulo">Completa la matriz de trazos</title>
  <desc id="descripcion">Ocho recuadros con una cruz y remates oblicuos en diferentes extremos. Falta el noveno; hay cinco alternativas.</desc>
  <rect width="1020" height="1600" fill="#fff"/>
  <text x="35" y="50" fill="#24453f" font-size="30" font-weight="700" font-family="Arial, sans-serif" letter-spacing="1">COMPLETA LA MATRIZ</text>
  <rect x="23" y="75" width="990" height="655" rx="17" fill="#fff" stroke="#d6e1e3" stroke-width="2"/>
  ${celdas}
  ${tarjetas}
</svg>\n`
writeFileSync(destino, svg.replace(/[ \t]+$/gm, ""))
console.log(destino)
