/** A1-18: triángulo grande, letra y tercer detalle (vacío, marca negra o punto). */
import { writeFileSync } from "node:fs"
import { fileURLToPath } from "node:url"
import path from "node:path"

const destino = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../public/psicotecnicas/abstracto/AB-A1-18-didactico.svg")
const matriz = [
  [
    { grande: "superior-izquierdo", letra: "A" },
    { grande: "superior-izquierdo", letra: "A", detalle: "derecha" },
    { grande: "superior-izquierdo", letra: "A", punto: "inferior-izquierdo" },
  ],
  [
    { grande: "superior-derecho", letra: "B", detalle: "abajo" },
    { grande: "superior-derecho", letra: "B", punto: "superior-izquierdo" },
    { grande: "superior-derecho", letra: "B" },
  ],
  [
    { grande: "inferior-derecho", letra: "C", punto: "superior-derecho" },
    { grande: "inferior-derecho", letra: "C" },
    null,
  ],
]
const opciones = [
  { grande: "inferior-derecho" },
  { grande: "inferior-derecho", letra: "C", detalle: "franja" },
  { grande: "inferior-derecho", letra: "C", detalle: "superior-derecho" },
  { grande: "inferior-derecho", letra: "C", detalle: "izquierda" },
  { grande: "superior-izquierdo" },
]
const triangulos = {
  "superior-izquierdo": "M0 90 L140 0 L140 90 Z",
  "superior-derecho": "M140 0 L140 90 L280 90 Z",
  "inferior-derecho": "M140 90 L280 90 L140 180 Z",
}
const detalles = {
  derecha: "M280 90 L250 130 L280 180 Z",
  abajo: "M0 180 L140 180 L75 150 Z",
  izquierda: "M0 0 L0 90 L45 90 Z",
  franja: "M0 0 H25 V90 H0 Z",
  "superior-derecho": "M280 0 L220 60 L280 90 Z",
}
const puntos = {
  "inferior-izquierdo": [26, 139],
  "superior-izquierdo": [70, 30],
  "superior-derecho": [255, 45],
}
const letras = { A: [72, 121], B: [213, 122], C: [72, 35] }

function ficha(celda, x, y) {
  if (celda === null) return `<g transform="translate(${x} ${y})"><rect width="280" height="180" fill="#f3f7f8" stroke="#26353d" stroke-width="3"/><text x="140" y="111" text-anchor="middle" font-size="58" fill="#64748b">?</text></g>`
  const lineas = [0, 140].flatMap((dx) => [0, 90].map((dy) => `<path d="M${dx} ${dy} L${dx + 140} ${dy + 90} M${dx + 140} ${dy} L${dx} ${dy + 90}"/>`)).join("")
  const dot = celda.punto ? `<circle cx="${puntos[celda.punto][0]}" cy="${puntos[celda.punto][1]}" r="10" fill="#26353d"/>` : ""
  const letra = celda.letra ? `<text x="${letras[celda.letra][0]}" y="${letras[celda.letra][1]}" fill="#26353d" font-size="34" font-family="Georgia, serif">${celda.letra}</text>` : ""
  return `<g transform="translate(${x} ${y})">
    <rect width="280" height="180" fill="#fff"/>
    <g fill="none" stroke="#26353d" stroke-width="2.5">${lineas}</g>
    <path d="${triangulos[celda.grande]}" fill="#26353d"/>
    ${celda.detalle ? `<path d="${detalles[celda.detalle]}" fill="#26353d"/>` : ""}
    ${dot}${letra}
    <rect width="280" height="180" fill="none" stroke="#26353d" stroke-width="3"/>
    <path d="M140 0 V180 M0 90 H280" fill="none" stroke="#26353d" stroke-width="2.5"/>
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
  <title id="titulo">Completa la matriz de letras y triángulos</title>
  <desc id="descripcion">Ocho recuadros con una cruz central y diagonales: cambian un triángulo negro grande, una letra y un detalle. Falta el noveno; hay cinco alternativas.</desc>
  <rect width="1020" height="1600" fill="#fff"/>
  <text x="35" y="50" fill="#24453f" font-size="30" font-weight="700" font-family="Arial, sans-serif" letter-spacing="1">COMPLETA LA MATRIZ</text>
  <rect x="23" y="75" width="990" height="655" rx="17" fill="#fff" stroke="#d6e1e3" stroke-width="2"/>
  ${celdas}
  ${tarjetas}
</svg>\n`
writeFileSync(destino, svg.replace(/[ \t]+$/gm, ""))
console.log(destino)
