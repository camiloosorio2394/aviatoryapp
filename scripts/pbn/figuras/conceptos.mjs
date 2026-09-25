/**
 * PB-01 a PB-07: qué es PBN, sus piezas y el catálogo de especificaciones.
 */
import { C, avion, caja, cerro, cota, flyBy, linea, lienzo, parrafo, pildora, pista, t, tl, vor } from "./lib.mjs"

const P = (pts) => pts.map(([x, y], i) => `${i ? "L" : "M"}${x} ${y}`).join("")

// ─── PB-01 ──────────────────────────────────────────────────────────────────

function mapaLlegada(ox, oy, tipo) {
  const g = []
  g.push(caja(ox, oy, 728, 680, { rx: 18 }))
  const L = (x, y) => [ox + x, oy + y]
  const conv = tipo === "conv"
  g.push(t(ox + 28, oy + 50, conv ? "NAVEGACIÓN CONVENCIONAL" : "PBN", { size: 26, peso: 700, color: C.acento, espaciado: 1 }))
  g.push(t(ox + 28, oy + 84, conv ? "La ruta une radioayudas" : "La ruta une puntos puestos donde convienen", { size: 22, color: C.suave }))
  // El mismo relieve y la misma pista en los dos paneles.
  g.push(cerro(...L(330, 300), 150, 110, 1))
  g.push(cerro(...L(480, 215), 85, 62, 2))
  g.push(pista(...L(500, 600), ...L(640, 600), 18))
  g.push(t(...L(570, 640), "AEROPUERTO", { size: 22, peso: 700, color: C.suave, anchor: "middle" }))

  if (conv) {
    const pts = [L(60, 130), L(190, 175), L(330, 300), L(420, 480), L(500, 600)]
    g.push(linea(P(pts), { color: C.tinta, sw: 5, flecha: "tinta" }))
    for (const [k, p] of [[1, pts[1]], [2, pts[2]], [3, pts[3]]]) {
      g.push(vor(p[0], p[1], 17))
      g.push(t(p[0] + 26, p[1] - 14, `VOR ${k}`, { size: 22, peso: 700 }))
    }
    // El tramo que cruza el cerro, marcado.
    g.push(linea(P([L(262, 238), L(300, 272)]), { color: C.ambar, sw: 14, opacidad: 0.35 }))
    const nota = parrafo(...L(44, 572), "Cada tramo va a una antena, aunque haya relieve en medio.", 280, { size: 22, color: C.ambar, peso: 700 })
    g.push(caja(...L(28, 540), 308, nota.alto + 30, { fill: C.ambarSuave, stroke: null, rx: 12 }))
    g.push(nota.svg)
  } else {
    // Nombre, y a qué lado del punto va: derecha, izquierda o encima.
    const wps = [
      [L(70, 130), "KILAB", "d"],
      [L(110, 280), "MORUS", "d"],
      [L(140, 420), "TENPA", "d"],
      [L(230, 530), "VUDEX", "i"],
      [L(340, 600), "SARIP", "e"],
      [L(430, 600), "ELNOR", "e"],
    ]
    g.push(linea(P([...wps.map((w) => w[0]), L(500, 600)]), { color: C.magenta, sw: 5, flecha: "magenta" }))
    for (const [p, nombre, lado] of wps) {
      g.push(flyBy(p[0], p[1], 14))
      if (lado === "e") g.push(t(p[0], p[1] - 26, nombre, { size: 22, peso: 700, anchor: "middle" }))
      else g.push(t(p[0] + (lado === "d" ? 24 : -24), p[1] + 8, nombre, { size: 22, peso: 700, anchor: lado === "d" ? "start" : "end" }))
    }
    const nota = parrafo(...L(426, 472), "La trayectoria se define donde hace falta, no donde hay antena.", 270, { size: 22, color: C.acento, peso: 700 })
    g.push(caja(...L(410, 440), 298, nota.alto + 30, { fill: C.tinte, stroke: null, rx: 12 }))
    g.push(nota.svg)
  }
  return g.join("")
}

const PB01 = {
  codigo: "PB-01",
  alto: 900,
  titulo: "La misma llegada, dos maneras de trazarla",
  alt: "Dos mapas del mismo terreno y el mismo aeropuerto. A la izquierda, navegación convencional: la ruta va en tramos rectos de un VOR al siguiente, y uno de los tramos pasa sobre el cerro donde está la antena. A la derecha, PBN: la misma llegada definida por seis waypoints de nombre ficticio, con la trayectoria lejos del relieve y alineada con la pista.",
  pie: "Esquema didáctico, con nombres de punto ficticios.",
  svg() {
    return lienzo({
      ...this,
      desc: this.alt,
      sub: "Mismo relieve, mismo aeropuerto: lo que cambia es de qué depende la trayectoria",
      cuerpo: mapaLlegada(56, 160, "conv") + mapaLlegada(816, 160, "pbn"),
    })
  },
}

// ─── PB-02 ──────────────────────────────────────────────────────────────────

function mapaEvolucion(ox, oy, paso) {
  const g = []
  const L = (x, y) => [ox + x, oy + y]
  g.push(caja(ox, oy, 480, 600, { rx: 18 }))
  const titulos = ["CONVENCIONAL", "NAVEGACIÓN DE ÁREA", "PBN"]
  g.push(`<circle cx="${ox + 40}" cy="${oy + 44}" r="18" fill="${C.acento}"/>`)
  g.push(t(ox + 40, oy + 52, String(paso), { size: 22, peso: 700, color: C.papel, anchor: "middle" }))
  g.push(t(ox + 70, oy + 53, titulos[paso - 1], { size: 24, peso: 700, color: C.acento, espaciado: 1 }))
  g.push(cerro(...L(350, 290), 95, 80, 3))
  g.push(pista(...L(60, 120), ...L(150, 120), 14))
  g.push(pista(...L(300, 545), ...L(400, 545), 14))
  const vors = [L(250, 160), L(110, 330), L(250, 455)]
  if (paso === 1) {
    g.push(linea(P([L(150, 120), ...vors, L(300, 545)]), { color: C.tinta, sw: 5, flecha: "tinta" }))
    for (const v of vors) g.push(vor(v[0], v[1], 15))
  } else {
    for (const v of vors) g.push(vor(v[0], v[1], 15, { color: C.gris }))
    const ruta = [L(150, 120), L(200, 180), L(190, 290), L(200, 390), L(235, 475), L(300, 545)]
    if (paso === 3) {
      // La franja de cada segmento: ancha en ruta, estrecha en la aproximación.
      g.push(linea(P(ruta.slice(0, 3)), { color: C.magenta, sw: 34, opacidad: 0.16 }))
      g.push(linea(P(ruta.slice(2, 5)), { color: C.magenta, sw: 54, opacidad: 0.16 }))
      g.push(linea(P(ruta.slice(4)), { color: C.magenta, sw: 16, opacidad: 0.2 }))
    }
    g.push(linea(P(ruta), { color: C.magenta, sw: 5, flecha: "magenta" }))
    for (const w of ruta.slice(1, 5)) g.push(flyBy(w[0], w[1], 12))
    if (paso === 3) {
      g.push(pildora(...L(40, 215), "RNAV 1", { size: 22, fill: C.magentaSuave, color: C.magenta }).svg)
      g.push(pildora(...L(40, 390), "RNP 2", { size: 22, fill: C.magentaSuave, color: C.magenta }).svg)
      g.push(pildora(...L(290, 470), "RNP APCH", { size: 22, fill: C.magentaSuave, color: C.magenta }).svg)
    }
  }
  const pies = [
    "La derrota se quiebra sobre cada VOR.",
    "Puntos definidos donde convienen; los VOR ya no son el destino.",
    "La misma derrota, con la performance exigida escrita sobre cada segmento.",
  ]
  g.push(parrafo(ox + 24, oy + 632, pies[paso - 1], 440, { size: 22, color: C.suave }).svg)
  return g.join("")
}

const PB02 = {
  codigo: "PB-02",
  alto: 900,
  titulo: "De la radioayuda a la trayectoria",
  alt: "Tres mapas con los mismos dos aeropuertos y el mismo cerro. En el primero, navegación convencional: la derrota se quiebra sobre tres VOR. En el segundo, navegación de área: la derrota pasa por waypoints y los VOR quedan en gris. En el tercero, PBN: la misma derrota con una franja alrededor y la especificación rotulada en cada tramo, RNAV 1 en la salida, RNP 2 en ruta y RNP APCH en la aproximación.",
  svg() {
    return lienzo({
      ...this,
      desc: this.alt,
      sub: "Lo que PBN añade al mapa de la navegación de área es el requisito de performance de cada segmento",
      cuerpo: [56, 560, 1064].map((x, i) => mapaEvolucion(x, 160, i + 1)).join(""),
    })
  },
}

// ─── PB-03 ──────────────────────────────────────────────────────────────────

function engranaje(cx, cy, rExt, rInt, dientes, fase) {
  const pts = []
  const paso = (Math.PI * 2) / dientes
  for (let i = 0; i < dientes; i++) {
    const a = i * paso + fase
    pts.push([rInt, a], [rExt, a + paso * 0.12], [rExt, a + paso * 0.42], [rInt, a + paso * 0.54])
  }
  const d = pts.map(([r, a], i) => `${i ? "L" : "M"}${(cx + r * Math.cos(a)).toFixed(1)} ${(cy + r * Math.sin(a)).toFixed(1)}`).join("") + "Z"
  return `<path d="${d}" fill="${C.tinte2}" stroke="${C.acento}" stroke-width="3" stroke-linejoin="round"/>` + `<circle cx="${cx}" cy="${cy}" r="${rInt - 26}" fill="${C.papel}" stroke="${C.claro}" stroke-width="2"/>`
}

const PB03 = {
  codigo: "PB-03",
  alto: 900,
  titulo: "Tres piezas que tienen que estar a la vez",
  alt: "Tres engranajes encajados. El primero es la aplicación de navegación: la SID, la STAR, la ruta o la aproximación. El segundo, la especificación para la navegación: lo que deben cumplir el avión y la tripulación. El tercero, la infraestructura: GNSS, DME y VOR, que se revisa en los NOTAM. Debajo, la regla: si falta una, el procedimiento no se vuela como está publicado.",
  svg() {
    const g = []
    const piezas = [
      { c: [455, 430], f: 0, tit: ["APLICACIÓN", "DE NAVEGACIÓN"], pie: "La SID, la STAR, la ruta, la aproximación." },
      { c: [800, 460], f: Math.PI / 14, tit: ["ESPECIFICACIÓN", "PARA LA", "NAVEGACIÓN"], pie: "Qué deben cumplir el avión y la tripulación." },
      { c: [1145, 430], f: 0, tit: ["INFRAESTRUCTURA"], pie: "GNSS, DME, VOR: las ayudas que están fuera del avión." },
    ]
    for (const p of piezas) g.push(engranaje(p.c[0], p.c[1], 182, 158, 14, p.f))
    for (const p of piezas) {
      const [cx, cy] = p.c
      const y0 = cy - ((p.tit.length - 1) * 30) / 2 + 8
      g.push(tl(cx, y0, p.tit, { size: 24, peso: 700, color: C.acento, anchor: "middle", lh: 30 }))
      g.push(parrafo(cx, cy + 222, p.pie, 300, { size: 24, color: C.tinta, anchor: "middle" }).svg)
    }
    // La que se olvida: dentro de su engranaje, en ámbar.
    g.push(tl(1145, 478, ["No está en la carta:", "se revisa en los NOTAM"], { size: 20, peso: 700, color: C.ambar, anchor: "middle", lh: 26 }))
    g.push(caja(250, 760, 1100, 76, { fill: C.acento, stroke: null, rx: 14 }))
    g.push(t(800, 808, "Si falta una, el procedimiento no se vuela como está publicado.", { size: 30, peso: 700, color: C.papel, anchor: "middle" }))
    return lienzo({ ...this, desc: this.alt, sub: "Aplicación, especificación e infraestructura: condiciones simultáneas", cuerpo: g.join("") })
  },
}

// ─── PB-04 ──────────────────────────────────────────────────────────────────

const PB04 = {
  codigo: "PB-04",
  alto: 900,
  titulo: "PBN no es GPS, y el TAWS no es PBN",
  alt: "Diagrama radial. En el centro, PBN, concepto de navegación basada en performance. A su alrededor, cuatro fuentes de posición unidas al centro: GNSS, DME/DME, DME/DME/IRU y VOR/DME. Aparte, al otro lado de una línea de puntos, el TAWS, alerta de terreno: un sistema distinto, con otro propósito.",
  svg() {
    const g = []
    const [cx, cy] = [620, 500]
    const fuentes = [
      ["GNSS", -135],
      ["DME/DME", -45],
      ["DME/DME/IRU", 45],
      ["VOR/DME", 135],
    ]
    for (const [, ang] of fuentes) {
      const a = (ang * Math.PI) / 180
      g.push(linea(`M${cx} ${cy}L${cx + Math.cos(a) * 290} ${cy + Math.sin(a) * 290}`, { color: C.claro, sw: 5 }))
    }
    g.push(`<circle cx="${cx}" cy="${cy}" r="150" fill="${C.acento}"/>`)
    g.push(t(cx, cy - 12, "PBN", { size: 64, peso: 700, color: C.papel, anchor: "middle" }))
    g.push(tl(cx, cy + 34, ["concepto de navegación", "basada en performance"], { size: 22, color: C.tinte, anchor: "middle", lh: 28 }))
    for (const [nombre, ang] of fuentes) {
      const a = (ang * Math.PI) / 180
      const x = cx + Math.cos(a) * 290
      const y = cy + Math.sin(a) * 290
      g.push(`<circle cx="${x}" cy="${y}" r="98" fill="${C.papel}" stroke="${C.acento2}" stroke-width="4"/>`)
      g.push(t(x, y - 4, nombre, { size: nombre.length > 9 ? 22 : 28, peso: 700, color: C.acento, anchor: "middle" }))
      g.push(t(x, y + 30, "fuente de posición", { size: 20, color: C.suave, anchor: "middle" }))
    }
    g.push(linea("M1070 190L1070 830", { color: C.gris, sw: 3, dash: "4 12" }))
    g.push(caja(1150, 410, 360, 180, { fill: C.grisClaro, stroke: C.gris, rx: 16 }))
    g.push(t(1330, 480, "TAWS", { size: 44, peso: 700, color: C.tinta, anchor: "middle" }))
    g.push(t(1330, 528, "alerta de terreno", { size: 26, color: C.suave, anchor: "middle" }))
    g.push(t(1330, 640, "Sistema distinto,", { size: 26, peso: 700, color: C.tinta, anchor: "middle" }))
    g.push(t(1330, 674, "propósito distinto.", { size: 26, peso: 700, color: C.tinta, anchor: "middle" }))
    g.push(t(1330, 300, "FUERA DEL CONCEPTO", { size: 22, peso: 700, color: C.gris, anchor: "middle", espaciado: 1.5 }))
    return lienzo({ ...this, desc: this.alt, sub: "El GNSS es una fuente de posición entre varias; el TAWS avisa del terreno", cuerpo: g.join("") })
  },
}

// ─── PB-05 ──────────────────────────────────────────────────────────────────

function aviso(x, y, s, color) {
  return `<path d="M${x} ${y - s}L${x + s * 1.1} ${y + s * 0.8}L${x - s * 1.1} ${y + s * 0.8}Z" fill="${color}" stroke-linejoin="round"/>` + t(x, y + s * 0.62, "!", { size: Math.round(s * 1.25), peso: 700, color: C.acento, anchor: "middle" })
}

const PB05 = {
  codigo: "PB-05",
  alto: 900,
  titulo: "Lo que RNP tiene y RNAV no",
  alt: "Dos columnas con la misma trayectoria arriba. RNAV tiene una sola pieza: la capacidad de navegación. RNP tiene tres: la capacidad de navegación, el control de la performance a bordo y la alerta a la tripulación, esta última resaltada con un símbolo de aviso. Al pie: la diferencia no es el número, es el aviso.",
  svg() {
    const g = []
    const cols = [
      { x: 150, nom: "RNAV", n: 1 },
      { x: 850, nom: "RNP", n: 3 },
    ]
    const piezas = [
      ["Capacidad de navegación", "navigation capability"],
      ["Control de la performance a bordo", "on-board performance monitoring"],
      ["Alerta a la tripulación", "alerting"],
    ]
    for (const c of cols) {
      g.push(linea(`M${c.x + 20} 215L${c.x + 580} 215`, { color: C.magenta, sw: 5, flecha: "magenta" }))
      for (const dx of [120, 300, 480]) g.push(flyBy(c.x + dx, 215, 13))
      g.push(t(c.x + 300, 310, c.nom, { size: 52, peso: 700, color: C.acento, anchor: "middle" }))
      for (let i = 0; i < 3; i++) {
        const y = 350 + i * 128
        if (i < c.n) {
          const alerta = i === 2
          g.push(caja(c.x, y, 600, 108, { fill: alerta ? C.acento : C.papel, stroke: alerta ? null : C.claro, rx: 14 }))
          const col = alerta ? C.papel : C.tinta
          g.push(t(c.x + (alerta ? 96 : 32), y + 50, piezas[i][0], { size: 30, peso: 700, color: col }))
          g.push(t(c.x + (alerta ? 96 : 32), y + 84, piezas[i][1], { size: 22, color: alerta ? C.tinte2 : C.suave, italica: true }))
          if (alerta) g.push(aviso(c.x + 52, y + 56, 24, C.ambarSuave))
        } else {
          g.push(caja(c.x, y, 600, 108, { fill: "none", stroke: C.gris, dash: "10 10", rx: 14 }))
          g.push(t(c.x + 300, y + 62, "La especificación no lo exige", { size: 24, color: C.gris, anchor: "middle" }))
        }
      }
    }
    g.push(t(800, 800, "La diferencia no es el número: es el aviso.", { size: 34, peso: 700, color: C.acento, anchor: "middle" }))
    return lienzo({ ...this, desc: this.alt, sub: "La misma trayectoria; lo que cambia es si el avión se vigila a sí mismo y avisa", cuerpo: g.join("") })
  },
}

// ─── PB-06 ──────────────────────────────────────────────────────────────────

const PB06 = {
  codigo: "PB-06",
  alto: 900,
  titulo: "Qué significa el número en RNP 1",
  alt: "Vista en planta de un tramo de ruta. La trayectoria publicada va en magenta por el centro, rotulada CENTERLINE. A cada lado, a 1 NM, una línea de puntos. Un avión algo desplazado del eje, dentro de la franja, rotulado posición real. Al pie: el valor es un requisito de performance del sistema, conseguido al menos el 95 % del tiempo, y la expectativa operacional sigue siendo mantener el eje.",
  svg() {
    const g = []
    const y0 = 440
    const d = 150
    g.push(`<rect x="100" y="${y0 - d}" width="1400" height="${d * 2}" fill="${C.tinte}"/>`)
    g.push(linea(`M100 ${y0 - d}L1500 ${y0 - d}`, { color: C.acento2, sw: 3, dash: "3 10" }))
    g.push(linea(`M100 ${y0 + d}L1500 ${y0 + d}`, { color: C.acento2, sw: 3, dash: "3 10" }))
    g.push(linea(`M100 ${y0}L1500 ${y0}`, { color: C.magenta, sw: 6, flecha: "magenta" }))
    g.push(t(130, y0 - 16, "CENTERLINE · trayectoria publicada", { size: 24, peso: 700, color: C.magenta }))
    g.push(cota(1400, y0 - 6, 1400, y0 - d + 6))
    g.push(cota(1400, y0 + 6, 1400, y0 + d - 6))
    g.push(t(1420, y0 - d / 2 + 9, "1 NM", { size: 28, peso: 700, color: C.tinta }))
    g.push(t(1420, y0 + d / 2 + 9, "1 NM", { size: 28, peso: 700, color: C.tinta }))
    g.push(pildora(800, y0 - d - 44, "RNP 1", { size: 28, anchor: "middle", fill: C.acento, color: C.papel }).svg)
    // El avión, algo a la izquierda del eje y dentro de la franja.
    g.push(avion(760, y0 - 72, 90, 1.4))
    g.push(cota(840, y0 - 70, 840, y0 - 6, { sw: 2.5 }))
    g.push(t(700, y0 - 64, "posición real", { size: 24, peso: 700, anchor: "end" }))
    g.push(caja(160, 660, 1280, 150, { fill: C.papel, stroke: C.claro, rx: 16 }))
    g.push(tl(800, 722, ["El valor es un requisito de performance del sistema, conseguido al menos el 95 % del tiempo.", "La expectativa operacional sigue siendo mantener el eje."], { size: 28, anchor: "middle", lh: 44 }))
    return lienzo({ ...this, desc: this.alt, sub: "No es una banda de trabajo ni un permiso para desviarse", cuerpo: g.join("") })
  },
}

// ─── PB-07 ──────────────────────────────────────────────────────────────────

const COLUMNAS = [["Oceánico", "y remoto"], ["En ruta", "doméstico"], ["Llegada"], ["Inicial"], ["Intermedia"], ["Final"], ["Frustrada"], ["Salida"]]
// Cada fila: nombre y, por columna, el valor; «0» es la columna vacía.
const FILAS = [
  ["RNAV 10", "10 0 0 0 0 0 0 0"],
  ["RNAV 5", "0 5 0 0 0 0 0 0"],
  ["RNAV 2", "0 2 0 0 0 0 0 0"],
  ["RNAV 1", "0 1 1 0 0 0 0 1"],
  ["RNP 4", "4 0 0 0 0 0 0 0"],
  ["RNP 2", "2 2 0 0 0 0 0 0"],
  ["RNP 1", "0 0 1 1 1 0 1 1"],
  ["A-RNP", "2 2_o_1 1_a_0.3 1_a_0.3 1_a_0.3 0.3 1_a_0.3 1_a_0.3"],
  ["RNP APCH", "0 0 0 1 1 0.3 1 0"],
  ["RNP AR APCH", "0 0 0 1_a_0.1 1_a_0.1 0.3_a_0.1 1_a_0.1 0"],
].map(([nombre, v]) => [nombre, v.split(" ").map((x) => (x === "0" ? null : x.replace(/_/g, " ")))])

const PB07 = {
  codigo: "PB-07",
  alto: 1040,
  titulo: "El catálogo, fase por fase",
  alt: "Tabla de especificaciones por fase de vuelo. RNAV 10 y RNP 4 en oceánico y remoto; RNAV 5 y RNAV 2 en ruta; RNAV 1 en ruta, llegada y salida; RNP 2 en oceánico y en ruta; RNP 1 con valor 1 en llegada, aproximación inicial, intermedia, frustrada y salida; A-RNP con 2 en oceánico, 2 o 1 en ruta, de 1 a 0.3 en llegada, inicial, intermedia, frustrada y salida, y 0.3 en la final; RNP APCH con 1 en inicial e intermedia, 0.3 en la final y 1 en la frustrada; RNP AR APCH de 1 a 0.1, y de 0.3 a 0.1 en la final. Debajo, una franja de aproximación que se estrecha hasta la final y se vuelve a abrir en la frustrada.",
  pie: "Las filas RNAV muestran el uso principal de cada especificación; las RNP, los valores de la tabla 5-1 de la FAA AC 90-105A. El valor que manda en vuelo es el de la carta.",
  svg() {
    const g = []
    const x0 = 56
    const xc = 300
    const wc = 155
    const yh = 200
    const hf = 46
    const yf = 250
    g.push(caja(xc + wc * 3, 150, wc * 4, 36, { fill: C.tinte, stroke: null, rx: 8 }))
    g.push(t(xc + wc * 5, 175, "APROXIMACIÓN", { size: 20, peso: 700, color: C.acento, anchor: "middle", espaciado: 2 }))
    COLUMNAS.forEach((lineas, i) => {
      g.push(tl(xc + wc * i + wc / 2, yh + (lineas.length > 1 ? 10 : 32), lineas, { size: 21, peso: 700, color: C.suave, anchor: "middle", lh: 24 }))
    })
    FILAS.forEach(([nombre, vals], r) => {
      const y = yf + r * hf
      const rnp = nombre.startsWith("RNP") || nombre === "A-RNP"
      if (r === 4) g.push(linea(`M${x0} ${y - 2}L${xc + wc * 8} ${y - 2}`, { color: C.claro, sw: 3 }))
      g.push(t(x0 + 8, y + 31, nombre, { size: 24, peso: 700, color: rnp ? C.acento : C.tinta }))
      for (let i = 0; i < 8; i++) {
        const v = vals[i]
        const x = xc + wc * i
        if (v) {
          g.push(caja(x + 4, y + 4, wc - 8, hf - 8, { fill: rnp ? C.acento : C.acento2, stroke: null, rx: 8 }))
          g.push(t(x + wc / 2, y + 31, v, { size: 22, peso: 700, color: C.papel, anchor: "middle" }))
        } else {
          g.push(caja(x + 4, y + 4, wc - 8, hf - 8, { fill: C.grisClaro, stroke: null, rx: 8 }))
          g.push(t(x + wc / 2, y + 31, "-", { size: 22, color: C.gris, anchor: "middle" }))
        }
      }
    })
    // Leyenda.
    const yl = yf + FILAS.length * hf + 30
    g.push(caja(x0 + 8, yl - 16, 22, 22, { fill: C.acento2, stroke: null, rx: 4 }))
    g.push(t(x0 + 42, yl + 2, "RNAV: uso principal", { size: 21, color: C.suave }))
    g.push(caja(x0 + 290, yl - 16, 22, 22, { fill: C.acento, stroke: null, rx: 4 }))
    g.push(t(x0 + 324, yl + 2, "RNP: valor en NM", { size: 21, color: C.suave }))
    g.push(t(x0 + 560, yl + 2, "-  no es su uso", { size: 21, color: C.suave }))

    // La franja de RNP APCH, segmento a segmento.
    const yb = 870
    g.push(t(x0, yb - 70, "RNP APCH en planta: el valor es del segmento, no del procedimiento", { size: 24, peso: 700, color: C.acento }))
    const tramos = [
      [120, 470, 44, 44, "INICIAL · 1"],
      [470, 820, 44, 44, "INTERMEDIA · 1"],
      [820, 1150, 44, 14, "FINAL · 0.3"],
    ]
    for (const [a, b, h1, h2, rot] of tramos) {
      g.push(`<path d="M${a} ${yb - h1}L${b} ${yb - h2}L${b} ${yb + h2}L${a} ${yb + h1}Z" fill="${C.tinte2}" stroke="${C.acento2}" stroke-width="2"/>`)
      g.push(t((a + b) / 2, yb + 78, rot, { size: 22, peso: 700, color: C.acento, anchor: "middle" }))
    }
    g.push(pista(1150, yb, 1250, yb, 18))
    g.push(`<path d="M1250 ${yb - 14}L1500 ${yb - 44}L1500 ${yb + 44}L1250 ${yb + 14}Z" fill="${C.tinte2}" stroke="${C.acento2}" stroke-width="2" stroke-dasharray="8 6"/>`)
    g.push(t(1375, yb + 78, "FRUSTRADA · 1", { size: 22, peso: 700, color: C.acento, anchor: "middle" }))
    g.push(linea(`M120 ${yb}L1150 ${yb}`, { color: C.magenta, sw: 4 }))
    g.push(linea(`M1250 ${yb}L1500 ${yb}`, { color: C.magenta, sw: 4, dash: "12 8", flecha: "magenta" }))
    return lienzo({ ...this, desc: this.alt, sub: "Valor de precisión lateral, en NM, que aplica en cada fase", cuerpo: g.join("") })
  },
}

export const CONCEPTOS = [PB01, PB02, PB03, PB04, PB05, PB06, PB07]
