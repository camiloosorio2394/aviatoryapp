/**
 * Transcripción vectorial de A1-13. Se conserva cada marca y, en particular,
 * la diferencia decisiva entre un círculo fuera y dentro del arco en C y D.
 *
 *   node scripts/psicotecnicas/redibujar-a1-13.mjs
 */
import { writeFileSync } from "node:fs"
import { fileURLToPath } from "node:url"
import path from "node:path"

const destino = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../public/psicotecnicas/abstracto/AB-A1-13-didactico.svg")

// Coordenadas locales: arco de (145,0) a (145,180), cuerda a y=90.
const marcas = {
  trianguloArriba: [145, 6, "derecha"],
  trianguloIzquierda: [32, 90, "arriba"],
  trianguloCentro: [178, 90, "arriba"],
  trianguloAbajo: [145, 172, "arriba"],
  trianguloAbajoDerecha: [169, 172, "arriba"],
  circuloArriba: [145, 8],
  circuloFuera: [34, 90],
  circuloDentro: [58, 90],
  circuloCentro: [175, 90],
  cuadradoArriba: [145, 10],
  cuadradoIzquierda: [12, 90],
  cuadradoCentro: [193, 90],
  cuadradoAbajo: [145, 171],
}

const matriz = [
  [
    { t: "trianguloArriba", c: "circuloCentro", s: "cuadradoAbajo" },
    { t: "trianguloIzquierda", c: "circuloArriba", s: "cuadradoIzquierda" },
    { t: "trianguloAbajo", c: "circuloFuera", s: "cuadradoArriba" },
  ],
  [
    { t: "trianguloArriba", c: "circuloFuera", s: "cuadradoAbajo" },
    { t: "trianguloCentro", c: "circuloFuera", s: "cuadradoArriba" },
    { t: "trianguloAbajoDerecha", c: "circuloFuera", s: "cuadradoAbajo" },
  ],
  [
    { t: "trianguloAbajo", c: "circuloCentro", s: "cuadradoArriba" },
    { t: "trianguloCentro", c: "circuloArriba", s: "cuadradoCentro" },
    null,
  ],
]

const opciones = [
  { letra: "A", t: "trianguloCentro", c: "circuloFuera", s: "cuadradoArriba", extra: "cuadradoAbajo" },
  { letra: "B", t: "trianguloArriba", c: "circuloFuera", s: "cuadradoIzquierda" },
  { letra: "C", t: "trianguloArriba", c: "circuloDentro", s: "cuadradoAbajo" },
  { letra: "D", t: "trianguloArriba", c: "circuloFuera", s: "cuadradoAbajo" },
  { letra: "E", t: "trianguloArriba", c: "circuloFuera", s: "cuadradoAbajo", relleno: true },
]

function simbolo(tipo, clave, relleno = false) {
  const [x, y, orientacion] = marcas[clave]
  const tinta = relleno ? '#26353d' : '#fff'
  if (tipo === "c") return `<circle cx="${x}" cy="${y}" r="10" fill="#fff" stroke="#26353d" stroke-width="3"/>`
  if (tipo === "s") return `<rect x="${x - 10}" y="${y - 10}" width="20" height="20" fill="${tinta}" stroke="#26353d" stroke-width="3"/>`
  const d = orientacion === "derecha"
    ? `M${x} ${y - 9} L${x + 20} ${y} L${x} ${y + 9} Z`
    : `M${x - 10} ${y + 8} L${x} ${y - 12} L${x + 10} ${y + 8} Z`
  return `<path d="${d}" fill="${tinta}" stroke="#26353d" stroke-width="3" stroke-linejoin="round"/>`
}

function ficha(celda, x, y) {
  if (celda === null) return `<g transform="translate(${x} ${y})"><rect width="280" height="180" fill="#f3f7f8" stroke="#26353d" stroke-width="3"/><text x="140" y="111" text-anchor="middle" font-size="58" fill="#64748b">?</text></g>`
  return `<g transform="translate(${x} ${y})">
    <rect width="280" height="180" fill="#fff" stroke="#26353d" stroke-width="3"/>
    <path d="M145 0 C75 3 45 47 45 90 C45 133 75 177 145 180 M45 90 H175" fill="none" stroke="#26353d" stroke-width="3"/>
    ${simbolo("s", celda.s, celda.relleno)}
    ${celda.extra ? simbolo("s", celda.extra) : ""}
    ${simbolo("t", celda.t, celda.relleno)}
    ${simbolo("c", celda.c)}
  </g>`
}

const celdas = matriz.flatMap((fila, i) => fila.map((celda, j) => ficha(celda, 35 + j * 330, 100 + i * 205))).join("\n")
const tarjetas = opciones.map((opcion, i) => {
  const x = 35 + (i % 2) * 500
  const y = 765 + Math.floor(i / 2) * 270
  return `<g><rect x="${x}" y="${y}" width="460" height="250" rx="15" fill="#fafdfc" stroke="#d6e1e3" stroke-width="2"/>
    <text x="${x + 22}" y="${y + 43}" fill="#24453f" font-size="30" font-weight="700" font-family="Arial, sans-serif">${opcion.letra}</text>
    ${ficha(opcion, x + 90, y + 52)}</g>`
}).join("\n")

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1020" height="1600" viewBox="0 0 1020 1600" role="img" aria-labelledby="titulo descripcion">
  <title id="titulo">Completa la matriz de símbolos</title>
  <desc id="descripcion">Nueve recuadros con un arco y una cuerda horizontal; un triángulo, un círculo y un cuadrado cambian de lugar. Falta la última casilla. Debajo hay cinco alternativas.</desc>
  <rect width="1020" height="1600" fill="#fff"/>
  <text x="35" y="50" fill="#24453f" font-size="30" font-weight="700" font-family="Arial, sans-serif" letter-spacing="1">COMPLETA LA MATRIZ</text>
  <rect x="23" y="75" width="990" height="655" rx="17" fill="#fff" stroke="#d6e1e3" stroke-width="2"/>
  ${celdas}
  ${tarjetas}
</svg>\n`
writeFileSync(destino, svg.replace(/[ \t]+$/gm, ""))
console.log(destino)
