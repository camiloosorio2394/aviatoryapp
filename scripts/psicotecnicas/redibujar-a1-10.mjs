/**
 * A1-10: matriz de orientación del armazón y relleno del triángulo pequeño.
 * Las trazas de cada variante se cotejaron con el cuadernillo.
 */
import { writeFileSync } from "node:fs"
import { fileURLToPath } from "node:url"
import path from "node:path"

const destino = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../public/psicotecnicas/abstracto/AB-A1-10-didactico.svg")
const matriz = [
  [
    { base: "abajo", pequeno: "rayado", forma: "derecha-alta" },
    { base: "derecha", pequeno: "blanco", forma: "izquierda-arriba" },
    { base: "arriba", pequeno: "negro", forma: "derecha-baja" },
  ],
  [
    { base: "derecha", pequeno: "blanco", forma: "izquierda-abajo" },
    { base: "arriba", pequeno: "negro", forma: "derecha-media" },
    { base: "abajo", pequeno: "rayado", forma: "derecha-alta" },
  ],
  [
    { base: "arriba", pequeno: "negro", forma: "derecha-base" },
    { base: "abajo", pequeno: "rayado", forma: "arriba-centro" },
    null,
  ],
]
const opciones = [
  { base: "derecha", pequeno: "negro", forma: "izquierda-punta" },
  { base: "derecha", pequeno: "blanco", forma: "izquierda-punta" },
  { base: "arriba", pequeno: "blanco", forma: "izquierda-base" },
  { base: "derecha", pequeno: "blanco", forma: "izquierda-arriba" },
  { base: "derecha", pequeno: "negro", forma: "izquierda-arriba" },
]

const bases = {
  abajo: "M0 0 L140 180 L280 0 M140 0 V180",
  derecha: "M0 0 L280 90 L0 180 M0 90 H280",
  arriba: "M0 180 L140 0 L280 180 M140 0 V180",
}
const triangulos = {
  "derecha-alta": "M140 0 L238 46 L140 90 Z",
  "izquierda-arriba": "M0 90 L54 18 L112 90 Z",
  "derecha-baja": "M140 110 L225 110 L185 180 Z",
  "izquierda-abajo": "M0 30 L90 30 L43 90 Z",
  "derecha-media": "M140 90 L247 135 L140 180 Z",
  "derecha-base": "M140 180 L185 115 L230 180 Z",
  "arriba-centro": "M140 0 L230 0 L185 65 Z",
  "izquierda-punta": "M0 0 L72 55 L0 90 Z",
  "izquierda-base": "M0 180 L42 120 L90 180 Z",
}

function ficha(celda, x, y) {
  if (celda === null) return `<g transform="translate(${x} ${y})"><rect width="280" height="180" fill="#f3f7f8" stroke="#26353d" stroke-width="3"/><text x="140" y="111" text-anchor="middle" font-size="58" fill="#64748b">?</text></g>`
  const relleno = celda.pequeno === "rayado" ? "url(#rayado)" : celda.pequeno === "negro" ? "#26353d" : "#fff"
  return `<g transform="translate(${x} ${y})">
    <rect width="280" height="180" fill="#fff" stroke="#26353d" stroke-width="3"/>
    <path d="${bases[celda.base]}" fill="none" stroke="#26353d" stroke-width="3"/>
    <path d="${triangulos[celda.forma]}" fill="${relleno}" stroke="#26353d" stroke-width="3" stroke-linejoin="round"/>
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
  <title id="titulo">Completa la matriz de triángulos</title>
  <desc id="descripcion">Ocho rectángulos con líneas diagonales y un triángulo pequeño negro, rayado o blanco. Falta el noveno; debajo aparecen cinco alternativas.</desc>
  <defs><pattern id="rayado" width="12" height="12" patternUnits="userSpaceOnUse"><path d="M2 0 V12" stroke="#26353d" stroke-width="2.2"/></pattern></defs>
  <rect width="1020" height="1600" fill="#fff"/>
  <text x="35" y="50" fill="#24453f" font-size="30" font-weight="700" font-family="Arial, sans-serif" letter-spacing="1">COMPLETA LA MATRIZ</text>
  <rect x="23" y="75" width="990" height="655" rx="17" fill="#fff" stroke="#d6e1e3" stroke-width="2"/>
  ${celdas}
  ${tarjetas}
</svg>\n`
writeFileSync(destino, svg.replace(/[ \t]+$/gm, ""))
console.log(destino)
