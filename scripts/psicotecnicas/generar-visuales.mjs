/**
 * Dibuja las ilustraciones del módulo de psicotécnicas.
 *
 * Uso:
 *   node scripts/psicotecnicas/generar-visuales.mjs
 *
 * Por qué existe: los ejercicios se recortan de material de terceros y llevan
 * su marca de agua encima. Todo lo que NO es un ejercicio —la portada del tema,
 * las tres familias del hub y los diagramas de la lección— se dibuja aquí, en
 * vector y desde cero. Así el módulo se ve como el resto de la app y no como un
 * PDF ajeno pegado dentro.
 *
 * El lenguaje visual es el que Camilo ya usó en NOTAM y Mercancías Peligrosas:
 * fondo navy profundo, vector plano sin degradados, trazo blanco para el sujeto,
 * un solo acento de color por pieza y etiquetas cortas con punto guía. Los
 * colores son los tokens de marca convertidos a sRGB, no aproximaciones.
 *
 * Necesita `sharp` (`npm install --no-save sharp`).
 */

import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import sharp from "sharp"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const raiz = path.resolve(__dirname, "../..")

/** Tokens de marca de src/index.css, ya en sRGB. */
const C = {
  navy950: "#030a13",
  navy900: "#07121e",
  navy800: "#0d1c2a",
  navy700: "#192a3c",
  navy600: "#233f5b",
  blue500: "#285fec",
  blue400: "#2e9eff",
  cyan400: "#00cff7",
  amber400: "#fcb52c",
  green400: "#12cb76",
  violet400: "#ac79ff",
  blanco: "#ffffff",
}

const FUENTE =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif"

// ────────────────────────────────────────────────────────────────────────────
// Piezas reutilizables

/** Retícula tenue de fondo: la misma textura discreta de las láminas de NOTAM. */
function reticula(w, h, paso = 40) {
  const lineas = []
  for (let x = paso; x < w; x += paso) {
    lineas.push(`<line x1="${x}" y1="0" x2="${x}" y2="${h}"/>`)
  }
  for (let y = paso; y < h; y += paso) {
    lineas.push(`<line x1="0" y1="${y}" x2="${w}" y2="${y}"/>`)
  }
  return `<g stroke="${C.navy700}" stroke-width="1" opacity="0.5">${lineas.join("")}</g>`
}

/**
 * Cubo isométrico. Devuelve las tres caras visibles por separado para poder
 * teñirlas distinto, que es lo que hace legible el volumen sin sombras.
 */
function cubo(cx, cy, lado, { relleno = C.navy700, borde = C.blanco, ancho = 3 } = {}) {
  // Proyección isométrica clásica: las aristas horizontales caen 30°, así que
  // media anchura es lado·cos30 y media altura, lado/2. (cx, cy) es el vértice
  // central, donde se juntan las tres caras visibles.
  const w = lado * Math.cos(Math.PI / 6)
  const q = lado / 2
  const arriba = `${cx},${cy - lado} ${cx + w},${cy - q} ${cx},${cy} ${cx - w},${cy - q}`
  const izq = `${cx - w},${cy - q} ${cx},${cy} ${cx},${cy + lado} ${cx - w},${cy + q}`
  const der = `${cx + w},${cy - q} ${cx},${cy} ${cx},${cy + lado} ${cx + w},${cy + q}`
  return `
    <g stroke="${borde}" stroke-width="${ancho}" stroke-linejoin="round">
      <polygon points="${izq}" fill="${relleno}" opacity="0.55"/>
      <polygon points="${der}" fill="${relleno}" opacity="0.8"/>
      <polygon points="${arriba}" fill="${relleno}"/>
    </g>`
}

/** Etiqueta corta con punto guía, como las llamadas de la lámina de NOTAM. */
function etiqueta(x, y, texto, color = C.cyan400, anclaje = "start") {
  return `
    <circle cx="${x}" cy="${y}" r="4" fill="${color}"/>
    <text x="${anclaje === "start" ? x + 14 : x - 14}" y="${y + 5}" fill="${C.blanco}"
          font-family="${FUENTE}" font-size="19" font-weight="600"
          text-anchor="${anclaje}">${texto}</text>`
}

/** La cara superior del cubo, separada hacia arriba por su bisagra. */
function tapaLevantada(cx, cy, lado, alto) {
  const w = lado * Math.cos(Math.PI / 6)
  const q = lado / 2
  const y = cy - alto
  const p = `${cx},${y - lado} ${cx + w},${y - q} ${cx},${y} ${cx - w},${y - q}`
  return `<polygon points="${p}" fill="${C.navy600}" stroke="${C.blanco}"
            stroke-width="3" stroke-linejoin="round"/>`
}

/** Una cara lateral abatida hacia fuera, girando sobre la arista de abajo. */
function caraAbierta(cx, cy, lado, desplazamiento) {
  const w = lado * Math.cos(Math.PI / 6)
  const q = lado / 2
  const x = cx - w - desplazamiento
  const p = `${x},${cy - q} ${x + w},${cy} ${x + w},${cy + lado} ${x},${cy + q}`
  return `<polygon points="${p}" fill="${C.navy600}" stroke="${C.blanco}"
            stroke-width="3" stroke-linejoin="round" opacity="0.95"/>`
}

// ────────────────────────────────────────────────────────────────────────────
// 1. Portada del tema

/**
 * Las tres familias en una sola lámina, con el cronómetro que las gobierna.
 *
 * No es un resumen del temario: es lo que distingue a este tema de los demás
 * del módulo, que es el reloj. Por eso el cronómetro manda en la composición y
 * las tres familias van debajo, del mismo tamaño: ninguna pesa más.
 */
function portada() {
  const W = 1400
  const H = 933

  /** Matriz 3×3 con la última casilla en blanco: la forma del abstracto. */
  const matriz = (() => {
    const celdas = []
    const paso = 62
    const x0 = 150
    const y0 = 560
    for (let f = 0; f < 3; f++) {
      for (let c = 0; c < 3; c++) {
        const x = x0 + c * paso
        const y = y0 + f * paso
        const ultima = f === 2 && c === 2
        celdas.push(
          `<rect x="${x}" y="${y}" width="50" height="50" rx="6" fill="${
            ultima ? "none" : C.navy700
          }" stroke="${ultima ? C.amber400 : C.navy600}" stroke-width="${ultima ? 3 : 2}"
            ${ultima ? 'stroke-dasharray="7 6"' : ""}/>`
        )
        if (!ultima) {
          // El giro va creciendo por casilla: se lee la regla sin explicarla.
          const giro = (f * 3 + c) * 45
          celdas.push(
            `<g transform="translate(${x + 25} ${y + 25}) rotate(${giro})">
               <path d="M -12 10 L 0 -12 L 12 10 Z" fill="none" stroke="${C.cyan400}" stroke-width="2.5" stroke-linejoin="round"/>
             </g>`
          )
        } else {
          celdas.push(
            `<text x="${x + 25}" y="${y + 36}" text-anchor="middle" fill="${C.amber400}"
                   font-family="${FUENTE}" font-size="30" font-weight="700">?</text>`
          )
        }
      }
    }
    return celdas.join("")
  })()

  /** Cubo y su desarrollo: la forma del espacial. */
  const espacial = (() => {
    const x0 = 640
    const y0 = 566
    const u = 42
    // Desarrollo en cruz
    const casillas = [
      [1, 0], [0, 1], [1, 1], [2, 1], [1, 2], [1, 3],
    ]
    const red = casillas
      .map(
        ([c, f]) =>
          `<rect x="${x0 + c * u}" y="${y0 + f * u}" width="${u}" height="${u}"
             fill="${C.navy700}" stroke="${C.blanco}" stroke-width="2"/>`
      )
      .join("")
    return `
      ${red}
      <path d="M ${x0 + 3 * u + 16} ${y0 + 2 * u} q 34 -18 62 4"
            fill="none" stroke="${C.cyan400}" stroke-width="3" stroke-linecap="round"
            marker-end="url(#punta)"/>
      ${cubo(x0 + 4.9 * u, y0 + 2.5 * u, 62, { relleno: C.navy600 })}`
  })()

  /** Serie con su salto: la forma del numérico. */
  const numerico = (() => {
    const x0 = 1010
    const y = 640
    const vals = ["2", "4", "8", "16", "?"]
    return vals
      .map((v, i) => {
        const x = x0 + i * 70
        const ultimo = i === vals.length - 1
        return `
          <rect x="${x}" y="${y - 30}" width="56" height="56" rx="8"
                fill="${ultimo ? "none" : C.navy700}"
                stroke="${ultimo ? C.amber400 : C.navy600}" stroke-width="${ultimo ? 3 : 2}"
                ${ultimo ? 'stroke-dasharray="7 6"' : ""}/>
          <text x="${x + 28}" y="${y + 8}" text-anchor="middle"
                fill="${ultimo ? C.amber400 : C.blanco}" font-family="${FUENTE}"
                font-size="26" font-weight="700">${v}</text>
          ${
            i < vals.length - 1
              ? `<path d="M ${x + 60} ${y - 2} q 5 -22 10 0" fill="none"
                    stroke="${C.green400}" stroke-width="2.5" stroke-linecap="round"/>
                 <text x="${x + 65}" y="${y - 26}" text-anchor="middle" fill="${C.green400}"
                       font-family="${FUENTE}" font-size="15" font-weight="700">×2</text>`
              : ""
          }`
      })
      .join("")
  })()

  /** Cronómetro: lo que de verdad diferencia a este tema. */
  const reloj = (() => {
    const cx = 700
    const cy = 300
    const r = 128
    const marcas = []
    for (let i = 0; i < 12; i++) {
      const a = (i * Math.PI) / 6
      const largo = i % 3 === 0 ? 20 : 11
      marcas.push(
        `<line x1="${cx + Math.sin(a) * (r - 16)}" y1="${cy - Math.cos(a) * (r - 16)}"
               x2="${cx + Math.sin(a) * (r - 16 - largo)}" y2="${cy - Math.cos(a) * (r - 16 - largo)}"
               stroke="${i % 3 === 0 ? C.blanco : C.navy600}" stroke-width="${i % 3 === 0 ? 4 : 3}"
               stroke-linecap="round"/>`
      )
    }
    return `
      <circle cx="${cx}" cy="${cy}" r="${r}" fill="${C.navy800}" stroke="${C.navy600}" stroke-width="3"/>
      <!-- El arco consumido, que es de lo que va el módulo: el tiempo que se va -->
      <path d="M ${cx} ${cy - r + 8} A ${r - 8} ${r - 8} 0 1 1 ${cx - (r - 8) * Math.sin(Math.PI / 3)} ${cy + (r - 8) * Math.cos(Math.PI / 3)}"
            fill="none" stroke="${C.blue400}" stroke-width="9" stroke-linecap="round"/>
      ${marcas.join("")}
      <line x1="${cx}" y1="${cy}" x2="${cx}" y2="${cy - 74}" stroke="${C.blanco}" stroke-width="6" stroke-linecap="round"/>
      <line x1="${cx}" y1="${cy}" x2="${cx + 52}" y2="${cy + 30}" stroke="${C.amber400}" stroke-width="5" stroke-linecap="round"/>
      <circle cx="${cx}" cy="${cy}" r="9" fill="${C.blanco}"/>
      <rect x="${cx - 26}" y="${cy - r - 26}" width="52" height="18" rx="6" fill="${C.navy600}" stroke="${C.blanco}" stroke-width="3"/>`
  })()

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <marker id="punta" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="${C.cyan400}"/>
    </marker>
  </defs>
  <rect width="${W}" height="${H}" fill="${C.navy900}"/>
  ${reticula(W, H)}

  <text x="${W / 2}" y="106" text-anchor="middle" fill="${C.blanco}" font-family="${FUENTE}"
        font-size="52" font-weight="800" letter-spacing="1">PRUEBAS PSICOTÉCNICAS</text>
  <text x="${W / 2}" y="146" text-anchor="middle" fill="${C.blue400}" font-family="${FUENTE}"
        font-size="23" font-weight="600" letter-spacing="3">RAZONAMIENTO CONTRA EL RELOJ</text>

  ${reloj}
  ${etiqueta(560, 214, "El tiempo se acorta al subir de nivel", C.amber400, "end")}

  <line x1="110" y1="486" x2="${W - 110}" y2="486" stroke="${C.navy600}" stroke-width="2"/>

  <text x="150" y="530" fill="${C.violet400}" font-family="${FUENTE}" font-size="21" font-weight="700">ABSTRACTO</text>
  ${matriz}
  <text x="640" y="530" fill="${C.cyan400}" font-family="${FUENTE}" font-size="21" font-weight="700">ESPACIAL</text>
  ${espacial}
  <text x="1010" y="530" fill="${C.green400}" font-family="${FUENTE}" font-size="21" font-weight="700">NUMÉRICO</text>
  ${numerico}

  <text x="150" y="866" fill="${C.blue400}" font-family="${FUENTE}" font-size="18" font-weight="600">
    Encontrar la regla · Girar el objeto en la cabeza · Operar rápido</text>
</svg>`
}

// ────────────────────────────────────────────────────────────────────────────
// 2. Las tres familias, cuadradas, para las tarjetas del hub

function familiaAbstracto() {
  const S = 480
  const paso = 108
  const x0 = 78
  const y0 = 78
  const celdas = []
  for (let f = 0; f < 3; f++) {
    for (let c = 0; c < 3; c++) {
      const x = x0 + c * paso
      const y = y0 + f * paso
      const ultima = f === 2 && c === 2
      celdas.push(
        `<rect x="${x}" y="${y}" width="90" height="90" rx="10"
           fill="${ultima ? "none" : C.navy800}"
           stroke="${ultima ? C.amber400 : C.navy600}" stroke-width="${ultima ? 4 : 2.5}"
           ${ultima ? 'stroke-dasharray="10 8"' : ""}/>`
      )
      if (ultima) {
        celdas.push(
          `<text x="${x + 45}" y="${y + 62}" text-anchor="middle" fill="${C.amber400}"
             font-family="${FUENTE}" font-size="54" font-weight="700">?</text>`
        )
      } else {
        const n = f * 3 + c
        // Un lado más en cada casilla y un cuarto de giro: dos reglas a la vez,
        // que es exactamente lo que mide un ejercicio de matriz.
        const lados = 3 + (n % 3)
        const puntos = Array.from({ length: lados }, (_, k) => {
          const a = (k / lados) * Math.PI * 2 - Math.PI / 2 + (n * Math.PI) / 8
          return `${(45 + Math.cos(a) * 28).toFixed(1)},${(45 + Math.sin(a) * 28).toFixed(1)}`
        }).join(" ")
        celdas.push(
          `<g transform="translate(${x} ${y})">
             <polygon points="${puntos}" fill="none" stroke="${C.violet400}" stroke-width="3" stroke-linejoin="round"/>
           </g>`
        )
      }
    }
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}" viewBox="0 0 ${S} ${S}">
    <rect width="${S}" height="${S}" fill="${C.navy900}"/>
    ${reticula(S, S, 48)}
    ${celdas.join("")}
  </svg>`
}

function familiaEspacial() {
  const S = 480
  const u = 62
  const x0 = 60
  const y0 = 128
  const casillas = [[1, 0], [0, 1], [1, 1], [2, 1], [1, 2]]
  const red = casillas
    .map(
      ([c, f]) =>
        `<rect x="${x0 + c * u}" y="${y0 + f * u}" width="${u}" height="${u}"
           fill="${C.navy800}" stroke="${C.blanco}" stroke-width="2.5"/>`
    )
    .join("")
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}" viewBox="0 0 ${S} ${S}">
    <defs>
      <marker id="p2" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="${C.cyan400}"/>
      </marker>
    </defs>
    <rect width="${S}" height="${S}" fill="${C.navy900}"/>
    ${reticula(S, S, 48)}
    ${red}
    <path d="M 250 240 q 40 -34 76 -4" fill="none" stroke="${C.cyan400}" stroke-width="4"
          stroke-linecap="round" marker-end="url(#p2)"/>
    ${cubo(370, 292, 104, { relleno: C.navy700 })}
  </svg>`
}

function familiaNumerico() {
  const S = 480
  const vals = ["3", "6", "12", "24", "?"]
  const filas = vals
    .map((v, i) => {
      const y = 66 + i * 74
      const ultimo = i === vals.length - 1
      return `
        <rect x="150" y="${y}" width="180" height="56" rx="10"
              fill="${ultimo ? "none" : C.navy800}"
              stroke="${ultimo ? C.amber400 : C.navy600}" stroke-width="${ultimo ? 4 : 2.5}"
              ${ultimo ? 'stroke-dasharray="10 8"' : ""}/>
        <text x="240" y="${y + 40}" text-anchor="middle"
              fill="${ultimo ? C.amber400 : C.blanco}" font-family="${FUENTE}"
              font-size="34" font-weight="700">${v}</text>
        ${
          i < vals.length - 1
            ? `<path d="M 344 ${y + 28} q 30 37 0 74" fill="none" stroke="${C.green400}"
                  stroke-width="3" stroke-linecap="round"/>
               <text x="386" y="${y + 72}" fill="${C.green400}" font-family="${FUENTE}"
                     font-size="20" font-weight="700">×2</text>`
            : ""
        }`
    })
    .join("")
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}" viewBox="0 0 ${S} ${S}">
    <rect width="${S}" height="${S}" fill="${C.navy900}"/>
    ${reticula(S, S, 48)}
    ${filas}
  </svg>`
}

// ────────────────────────────────────────────────────────────────────────────
// 3. Diagramas de la lección

/**
 * La regla que resuelve media categoría espacial: qué caras quedan opuestas.
 *
 * Sustituye a la lámina de la fuente, que enseña lo mismo pero con la marca de
 * agua de su autor encima. Aquí el desarrollo va con las tres parejas opuestas
 * en su color, y al lado el cubo ya plegado con la pareja visible.
 */
function carasOpuestas() {
  const W = 1200
  const H = 620
  const u = 96
  const x0 = 120
  const y0 = 120
  // Desarrollo en cruz: [col, fila, número de cara]
  const red = [
    [1, 0, 1],
    [0, 1, 2],
    [1, 1, 5],
    [2, 1, 4],
    [1, 2, 6],
    [1, 3, 3],
  ]
  /**
   * Qué cara acaba enfrente de cuál.
   *
   * En la tira vertical 1-5-6-3 las cuatro caras forman un anillo alrededor del
   * cubo, así que se oponen las que están a dos de distancia: 1 con 6 y 5 con 3.
   * Las dos que flanquean a la 5 son la pareja que queda: 2 con 4.
   *
   * Importa acertar esto: dos caras opuestas jamás aparecen pegadas en el
   * desarrollo, y la lámina existe precisamente para enseñar esa regla.
   */
  const pareja = { 1: C.cyan400, 6: C.cyan400, 3: C.green400, 5: C.green400, 2: C.amber400, 4: C.amber400 }

  const casillas = red
    .map(
      ([c, f, n]) => `
      <rect x="${x0 + c * u}" y="${y0 + f * u}" width="${u}" height="${u}"
            fill="${C.navy800}" stroke="${pareja[n]}" stroke-width="3.5"/>
      <text x="${x0 + c * u + u / 2}" y="${y0 + f * u + u / 2 + 13}" text-anchor="middle"
            fill="${pareja[n]}" font-family="${FUENTE}" font-size="38" font-weight="700">${n}</text>`
    )
    .join("")

  const leyenda = [
    ["1 y 6", C.cyan400],
    ["2 y 4", C.amber400],
    ["3 y 5", C.green400],
  ]
    .map(
      ([t, col], i) => `
      <rect x="${x0}" y="${500 + i * 0}" width="0" height="0"/>
      <circle cx="${700 + i * 168}" cy="530" r="8" fill="${col}"/>
      <text x="${716 + i * 168}" y="537" fill="${C.blanco}" font-family="${FUENTE}"
            font-size="22" font-weight="600">${t}</text>`
    )
    .join("")

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
    <rect width="${W}" height="${H}" fill="${C.navy900}"/>
    ${reticula(W, H)}
    <text x="${x0}" y="72" fill="${C.blanco}" font-family="${FUENTE}" font-size="34" font-weight="800">
      Las caras opuestas nunca quedan juntas</text>

    ${casillas}
    ${cubo(880, 300, 132, { relleno: C.navy700 })}
    <!-- Cada número, en el centro de su cara: arriba la 1, izquierda la 2, derecha la 5 -->
    <text x="880" y="248" text-anchor="middle" fill="${C.cyan400}" font-family="${FUENTE}"
          font-size="38" font-weight="700">1</text>
    <text x="823" y="368" text-anchor="middle" fill="${C.amber400}" font-family="${FUENTE}"
          font-size="34" font-weight="700">2</text>
    <text x="937" y="368" text-anchor="middle" fill="${C.green400}" font-family="${FUENTE}"
          font-size="34" font-weight="700">5</text>
    <text x="880" y="470" text-anchor="middle" fill="${C.blue400}" font-family="${FUENTE}"
          font-size="17" font-weight="600">1, 2 y 5 pueden verse a la vez: ninguna es opuesta de otra</text>

    <text x="700" y="500" fill="${C.blanco}" font-family="${FUENTE}" font-size="21" font-weight="600">
      Parejas que se dan la espalda al plegar</text>
    ${leyenda}

    <text x="${x0}" y="576" fill="${C.blue400}" font-family="${FUENTE}" font-size="19" font-weight="600">
      Si una alternativa muestra dos caras de la misma pareja a la vez, se descarta sin plegar nada.</text>
  </svg>`
}

/** El cubo abriéndose: cuatro pasos, de sólido a desarrollo. */
function deSolidoADesarrollo() {
  const W = 1200
  const H = 400
  const pasos = ["Plegado", "Se abre", "Casi abierto", "Desarrollado"]
  const u = 40

  const paso4 = (() => {
    const x0 = 906
    const y0 = 118
    return [[1, 0], [0, 1], [1, 1], [2, 1], [1, 2], [1, 3]]
      .map(
        ([c, f]) =>
          `<rect x="${x0 + c * u}" y="${y0 + f * u}" width="${u}" height="${u}"
             fill="${C.navy800}" stroke="${C.blanco}" stroke-width="2.5"/>`
      )
      .join("")
  })()

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
    <rect width="${W}" height="${H}" fill="${C.navy900}"/>
    ${reticula(W, H)}
    <text x="80" y="62" fill="${C.blanco}" font-family="${FUENTE}" font-size="30" font-weight="800">
      Del cubo al desarrollo</text>

    ${cubo(170, 232, 100, { relleno: C.navy700 })}

    <!-- La tapa se levanta: misma cara de arriba, desplazada por su bisagra -->
    <g>
      ${cubo(430, 232, 100, { relleno: C.navy700 })}
      ${tapaLevantada(430, 232, 100, 54)}
    </g>

    <!-- Y ahora también se abre una cara lateral -->
    <g>
      ${cubo(690, 232, 100, { relleno: C.navy700 })}
      ${tapaLevantada(690, 232, 100, 92)}
      ${caraAbierta(690, 232, 100, 78)}
    </g>

    ${paso4}

    ${pasos
      .map(
        (t, i) =>
          `<text x="${[170, 430, 690, 986][i]}" y="372" text-anchor="middle" fill="${C.blue400}"
             font-family="${FUENTE}" font-size="19" font-weight="700">${t}</text>`
      )
      .join("")}
  </svg>`
}

// ────────────────────────────────────────────────────────────────────────────

const PIEZAS = [
  ["infografias/psicotecnicas/portada.webp", portada()],
  ["infografias/psicotecnicas/familia-abstracto.webp", familiaAbstracto()],
  ["infografias/psicotecnicas/familia-espacial.webp", familiaEspacial()],
  ["infografias/psicotecnicas/familia-numerico.webp", familiaNumerico()],
  ["modulos/psicotecnicas/cubo-caras-opuestas.webp", carasOpuestas()],
  ["modulos/psicotecnicas/cubo-desarrollo.webp", deSolidoADesarrollo()],
]

for (const [rel, svg] of PIEZAS) {
  const destino = path.resolve(raiz, "public", rel)
  fs.mkdirSync(path.dirname(destino), { recursive: true })
  await sharp(Buffer.from(svg)).webp({ quality: 92, effort: 6 }).toFile(destino)
  const { size } = fs.statSync(destino)
  console.log(`  ${rel}  ${(size / 1024).toFixed(0)} KB`)
}
console.log(`Listo: ${PIEZAS.length} ilustraciones`)
