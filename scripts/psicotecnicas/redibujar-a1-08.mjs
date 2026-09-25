/** A1-08: las diagonales son fijas; se transcriben por separado los rellenos. */
import { writeFileSync } from "node:fs"
import { fileURLToPath } from "node:url"
import path from "node:path"

const destino = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../public/psicotecnicas/abstracto/AB-A1-08-didactico.svg")
const matriz = [
  [
    { arriba: "franja-rayada" },
    { arriba: "rayado", abajo: "triangulo-negro" },
    { arriba: "negro", abajo: "barra-blanca" },
  ],
  [
    { arriba: "rayado", abajo: "barra-negra" },
    { arriba: "negro", arribaInterior: "rectangulo-blanco" },
    { abajo: "triangulo-rayado" },
  ],
  [
    { arriba: "negro", abajo: "triangulo-blanco" },
    { abajo: "barra-blanca" },
    null,
  ],
]
const opciones = [
  { arribaInterior: "rectangulo-negro", abajo: "triangulo-rayado-grande" },
  { arriba: "rayado", arribaInterior: "rectangulo-blanco" },
  { arriba: "rayado", arribaInterior: "barra-negra" },
  { arriba: "rayado", arribaInterior: "rectangulo-negro" },
  { arriba: "negro", arribaInterior: "rectangulo-rayado" },
]

function manchas(celda) {
  const formas = []
  if (celda.arriba === "negro") formas.push('<path d="M0 0 H280 L140 90 Z" fill="#26353d"/>')
  if (celda.arriba === "rayado") formas.push('<path d="M0 0 H280 L140 90 Z" fill="url(#rayado)"/>')
  if (celda.arriba === "franja-rayada") formas.push('<path d="M70 0 H210 V45 H70 Z" fill="url(#rayado)"/>')
  if (celda.abajo === "triangulo-negro") formas.push('<path d="M140 90 L80 140 H200 Z" fill="#26353d"/>')
  if (celda.abajo === "triangulo-rayado") formas.push('<path d="M140 90 L80 140 H200 Z" fill="url(#rayado)"/>')
  if (celda.abajo === "triangulo-rayado-grande") formas.push('<path d="M140 90 L0 180 H280 Z" fill="url(#rayado)"/>')
  if (celda.abajo === "barra-negra") formas.push('<path d="M130 90 H150 V180 H130 Z" fill="#26353d"/>')
  if (celda.arribaInterior === "rectangulo-blanco") formas.push('<rect x="70" y="0" width="140" height="50" fill="#fff"/>')
  if (celda.arribaInterior === "rectangulo-negro") formas.push('<rect x="70" y="0" width="140" height="50" fill="#26353d"/>')
  if (celda.arribaInterior === "rectangulo-rayado") formas.push('<rect x="70" y="0" width="140" height="50" fill="url(#rayado)"/>')
  if (celda.arribaInterior === "barra-negra") formas.push('<rect x="130" y="0" width="20" height="90" fill="#26353d"/>')
  return formas.join("")
}

function contornos(celda) {
  const trazos = []
  if (celda.abajo === "barra-blanca") trazos.push('<path d="M130 180 V90 H150 V180"/>')
  if (celda.abajo === "triangulo-blanco") trazos.push('<path d="M80 140 H200"/>')
  if (celda.abajo === "triangulo-rayado") trazos.push('<path d="M80 140 H200"/>')
  if (celda.arriba === "franja-rayada") trazos.push('<path d="M70 0 V45 H210 V0"/>')
  if (celda.arribaInterior === "rectangulo-blanco") trazos.push('<path d="M70 0 V50 H210 V0"/>')
  return trazos.join("")
}

function ficha(celda, x, y) {
  if (celda === null) return `<g transform="translate(${x} ${y})"><rect width="280" height="180" fill="#f3f7f8" stroke="#26353d" stroke-width="3"/><text x="140" y="111" text-anchor="middle" font-size="58" fill="#64748b">?</text></g>`
  return `<g transform="translate(${x} ${y})">
    <rect width="280" height="180" fill="#fff"/>
    ${manchas(celda)}
    <g fill="none" stroke="#26353d" stroke-width="3" stroke-linejoin="round">
      <path d="M0 0 L280 180 M280 0 L0 180"/>
      ${contornos(celda)}
      <rect width="280" height="180"/>
    </g>
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
  <title id="titulo">Completa la matriz de rellenos</title>
  <desc id="descripcion">Ocho rectángulos cruzados por sus diagonales; cambian una zona negra, una trama rayada y un pequeño detalle. Falta el noveno; hay cinco alternativas.</desc>
  <defs><pattern id="rayado" width="12" height="12" patternUnits="userSpaceOnUse"><path d="M2 0 V12" stroke="#26353d" stroke-width="2.2"/></pattern></defs>
  <rect width="1020" height="1600" fill="#fff"/>
  <text x="35" y="50" fill="#24453f" font-size="30" font-weight="700" font-family="Arial, sans-serif" letter-spacing="1">COMPLETA LA MATRIZ</text>
  <rect x="23" y="75" width="990" height="655" rx="17" fill="#fff" stroke="#d6e1e3" stroke-width="2"/>
  ${celdas}
  ${tarjetas}
</svg>\n`
writeFileSync(destino, svg.replace(/[ \t]+$/gm, ""))
console.log(destino)
