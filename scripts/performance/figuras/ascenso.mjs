/**
 * PERF-08 a PERF-14 y PERF-19: la trayectoria de despegue, los segmentos, el
 * gradiente, los obstáculos y lo que limita el peso.
 */
import { C, avionLado, caja, cota, linea, lienzo, parrafo, pildora, t, tl } from "../../figuras/lib.mjs"

/** Motor parado: una hélice de aspa tachada, discreta. */
function motorParado(x, y) {
  return `<circle cx="${x}" cy="${y}" r="16" fill="${C.papel}" stroke="${C.rojo}" stroke-width="3"/>` + linea(`M${x - 10} ${y + 10}L${x + 10} ${y - 10}`, { color: C.rojo, sw: 3 })
}

// ─── PERF-08 ────────────────────────────────────────────────────────────────

const PERF08 = {
  codigo: "PERF-08",
  alto: 900,
  titulo: "Gross y net flight path",
  alt: "Perfil lateral desde el final de la pista. Dos trayectorias de ascenso salen del mismo punto a 35 ft: la superior, gross flight path, y la inferior, net flight path. La separación entre las dos crece y va sombreada: el margen de la norma. Abajo, un obstáculo que la trayectoria neta libra.",
  svg() {
    const g = []
    const suelo = 760
    const [x0, y0] = [300, suelo - 40]
    g.push(`<rect x="60" y="${suelo}" width="260" height="18" fill="${C.tinta}"/>`)
    g.push(linea(`M60 ${suelo + 18}L1540 ${suelo + 18}`, { color: C.relieveLinea, sw: 3 }))
    const gross = (x) => y0 - (x - x0) * 0.42
    const net = (x) => y0 - (x - x0) * 0.3
    g.push(`<path d="M${x0} ${y0}L1500 ${gross(1500)}L1500 ${net(1500)}Z" fill="${C.tinte2}"/>`)
    g.push(linea(`M${x0} ${y0}L1500 ${gross(1500)}`, { color: C.acento, sw: 5 }))
    g.push(linea(`M${x0} ${y0}L1500 ${net(1500)}`, { color: C.acento2, sw: 5, dash: "14 8" }))
    g.push(t(1500, gross(1500) - 16, "Gross Flight Path", { size: 26, peso: 700, color: C.acento, anchor: "end", italica: true }))
    g.push(t(1500, net(1500) + 40, "Net Flight Path", { size: 26, peso: 700, color: C.acento2, anchor: "end", italica: true }))
    g.push(tl(900, (gross(900) + net(900)) / 2 - 4, ["margen de la norma", "0,8 % en bimotor"], { size: 22, peso: 700, color: C.acento, anchor: "middle", lh: 26 }))
    g.push(avionLado(x0 + 40, y0 - 18, 0.8, { rot: -13 }))
    g.push(cota(x0 - 30, y0, x0 - 30, suelo, { color: "tinta", sw: 2.5 }))
    g.push(t(x0 - 44, suelo - 12, "35 ft", { size: 22, peso: 700, anchor: "end" }))
    // Obstáculo librado por la neta.
    const xo = 980
    g.push(`<path d="M${xo - 110} ${suelo + 18}C${xo - 60} ${suelo - 40} ${xo - 20} ${net(xo) + 90} ${xo} ${net(xo) + 80}C${xo + 30} ${net(xo) + 90} ${xo + 70} ${suelo - 40} ${xo + 120} ${suelo + 18}Z" fill="${C.relieve[1]}" stroke="${C.relieveLinea}" stroke-width="2"/>`)
    g.push(t(xo, suelo - 10, "obstáculo", { size: 22, color: C.suave, anchor: "middle" }))
    g.push(t(60, 850, "El margen se aplica bajando la trayectoria, no subiendo el obstáculo.", { size: 24, color: C.tinta }))
    return lienzo({ ...this, desc: this.alt, sub: "La trayectoria que se analiza contra los obstáculos es la neta", cuerpo: g.join("") })
  },
}

// ─── PERF-09 ────────────────────────────────────────────────────────────────

const PERF09 = {
  codigo: "PERF-09",
  alto: 900,
  titulo: "Los cuatro segmentos del despegue",
  alt: "Perfil lateral del despegue con un motor inoperativo, en cuatro tramos. Primero, desde 35 ft hasta el tren arriba: tren bajando, flaps de despegue, empuje de despegue, a VLOF, gradiente positivo en bimotor. Segundo, hasta la altura de aceleración: tren arriba, flaps de despegue, empuje de despegue, a V2, 2,4 % en bimotor. Aceleración: se acelera y se retraen flaps, sin gradiente exigido. Final: limpio, empuje máximo continuo, a VFTO, 1,2 % en bimotor, hasta al menos 1 500 ft.",
  pie: "Gradientes de certificación en bimotor (14 CFR 25.121), con el motor crítico inoperativo.",
  svg() {
    const g = []
    const suelo = 770
    const pts = [
      [140, suelo - 20],
      [360, suelo - 70],
      [760, suelo - 270],
      [1040, suelo - 280],
      [1500, suelo - 390],
    ]
    const tramos = [
      ["First Segment", "Tren bajando · flaps de despegue", "Empuje de despegue · VLOF", "Positivo", C.tinte],
      ["Second Segment", "Tren arriba · flaps de despegue", "Empuje de despegue · V₂", "2,4 %", C.tinte2],
      ["Acceleration Segment", "Acelera y retrae flaps", "", "No se exige", C.tinte],
      ["Final Segment", "Limpio · empuje máximo continuo", "VFTO", "1,2 %", C.tinte2],
    ]
    tramos.forEach(([nom, c1, c2, grad, fondo], i) => {
      const [xa] = pts[i]
      const [xb] = pts[i + 1]
      g.push(`<rect x="${xa}" y="160" width="${xb - xa}" height="${suelo - 160}" fill="${fondo}"/>`)
      const cx = (xa + xb) / 2
      g.push(t(cx, 196, nom, { size: xb - xa < 260 ? 18 : 22, peso: 700, color: C.acento, anchor: "middle", italica: true }))
      g.push(parrafo(cx, 224, c1, xb - xa - 16, { size: 18, color: C.tinta, anchor: "middle" }).svg)
      if (c2) g.push(parrafo(cx, 272, c2, xb - xa - 16, { size: 18, color: C.tinta, anchor: "middle" }).svg)
      g.push(pildora(cx, 330, grad, { size: 20, anchor: "middle", fill: C.papel, color: C.acento, stroke: C.acento }).svg)
    })
    g.push(`<rect x="60" y="${suelo}" width="100" height="16" fill="${C.tinta}"/>`)
    g.push(linea(`M60 ${suelo + 16}L1540 ${suelo + 16}`, { color: C.relieveLinea, sw: 3 }))
    g.push(linea(pts.map(([x, y], i) => `${i ? "L" : "M"}${x} ${y}`).join(""), { color: C.acento, sw: 6 }))
    g.push(avionLado(560, suelo - 178, 0.75, { rot: -27 }))
    g.push(motorParado(604, suelo - 226))
    const alturas = [
      [suelo - 20, "35 ft"],
      [suelo - 270, "altura de aceleración · la fija el operador, no menos de 400 ft"],
      [suelo - 390, "1 500 ft o más"],
    ]
    for (const [y, rot] of alturas) {
      g.push(linea(`M60 ${y}L1540 ${y}`, { color: C.gris, sw: 1.5, dash: "3 7" }))
      g.push(t(70, y - 8, rot, { size: 18, color: C.suave }))
    }
    return lienzo({ ...this, desc: this.alt, sub: "Con un motor inoperativo: cada tramo tiene su configuración y su exigencia", cuerpo: g.join("") })
  },
}

// ─── PERF-10 ────────────────────────────────────────────────────────────────

const PERF10 = {
  codigo: "PERF-10",
  alto: 900,
  titulo: "Gradiente no es régimen de ascenso",
  alt: "Un triángulo rectángulo con la trayectoria de ascenso como hipotenusa, la distancia horizontal en la base y la altura ganada en el lado vertical, con la fórmula: gradiente igual a altura ganada sobre distancia recorrida por cien. Al lado, dos aviones con el mismo régimen de 1 500 ft/min, uno a 160 kt y otro a 280 kt: el lento sube con un gradiente de cerca del 9 % y el rápido, de cerca del 5 %.",
  pie: "Gradientes calculados con los números del tema: 1 500 ft/min a 160 kt y a 280 kt, sin viento.",
  svg() {
    const g = []
    const [ax, ay, bx, by] = [100, 720, 760, 720]
    const cy = 360
    g.push(`<path d="M${ax} ${ay}L${bx} ${by}L${bx} ${cy}Z" fill="${C.tinte}" stroke="${C.acento}" stroke-width="4" stroke-linejoin="round"/>`)
    g.push(linea(`M${ax} ${ay}L${bx} ${cy}`, { color: C.acento, sw: 7, flecha: "acento" }))
    g.push(`<rect x="${bx - 30}" y="${ay - 30}" width="30" height="30" fill="none" stroke="${C.acento}" stroke-width="2"/>`)
    g.push(t((ax + bx) / 2, ay + 44, "distancia horizontal recorrida", { size: 24, anchor: "middle" }))
    g.push(tl(bx + 20, (ay + cy) / 2, ["altura", "ganada"], { size: 24, lh: 28 }))
    g.push(caja(100, 200, 560, 100, { fill: C.papel, stroke: C.acento, sw: 3, rx: 14 }))
    g.push(t(380, 262, "gradiente = altura ÷ distancia × 100", { size: 28, peso: 700, color: C.acento, anchor: "middle" }))
    // Dos aviones, mismo régimen.
    const casos = [
      ["160 kt", 520, 0.093, "≈ 9 %"],
      ["280 kt", 720, 0.053, "≈ 5 %"],
    ]
    for (const [vel, y, gr, rot] of casos) {
      const x0 = 900
      const x1 = 1500
      g.push(linea(`M${x0} ${y}L${x1} ${y - (x1 - x0) * gr * 2.4}`, { color: C.acento2, sw: 5, flecha: "acento2" }))
      g.push(avionLado(x0 + 60, y - 20, 0.7, { rot: -Math.atan(gr * 2.4) * 57.3 }))
      g.push(t(x0, y + 44, `1 500 ft/min · ${vel}`, { size: 22, peso: 700 }))
      g.push(t(x1, y - (x1 - x0) * gr * 2.4 - 20, rot, { size: 26, peso: 700, color: C.acento, anchor: "end" }))
    }
    g.push(t(900, 250, "El mismo régimen, distinta pendiente:", { size: 24, peso: 700, color: C.acento }))
    g.push(t(900, 282, "el rápido recorre más suelo por cada pie.", { size: 22, color: C.suave }))
    return lienzo({ ...this, desc: this.alt, sub: "Lo que libra obstáculos es la pendiente, no los pies por minuto", cuerpo: g.join("") })
  },
}

// ─── PERF-11 ────────────────────────────────────────────────────────────────

const PERF11 = {
  codigo: "PERF-11",
  alto: 900,
  titulo: "Por qué limita el segundo segmento",
  alt: "Un avión con un motor inoperativo, tren arriba y flaps de despegue, subiendo por una pendiente rotulada 2,4 % en bimotor. Alrededor, lo que juega en contra: peso máximo, V2 baja, flaps extendidos y medio empuje. Y a favor, el tren retraído.",
  svg() {
    const g = []
    const [x0, y0] = [240, 740]
    g.push(linea(`M${x0} ${y0}L${x0 + 1100} ${y0 - 1100 * 0.25}`, { color: C.acento, sw: 6 }))
    g.push(linea(`M${x0} ${y0}L${x0 + 1100} ${y0}`, { color: C.gris, sw: 2, dash: "5 8" }))
    g.push(pildora(x0 + 900, y0 - 900 * 0.25 + 50, "2,4 % · bimotor", { size: 28, anchor: "middle", fill: C.acento, color: C.papel }).svg)
    const [ax, ay] = [760, y0 - 520 * 0.25 - 30]
    g.push(avionLado(ax, ay, 1.8, { rot: -14 }))
    g.push(motorParado(ax + 30, ay + 70))
    const contra = [
      ["Peso máximo", 240, 250],
      ["V₂ baja", 560, 200],
      ["Flaps extendidos", 1000, 220],
      ["Medio empuje", 1250, 330],
    ]
    for (const [txt, x, y] of contra) {
      g.push(pildora(x, y, `− ${txt}`, { size: 24, fill: C.rojoSuave, color: C.rojo }).svg)
    }
    g.push(pildora(560, 820, "+ Tren retraído", { size: 24, fill: C.verdeSuave, color: C.verde }).svg)
    g.push(t(1540, 850, "Por eso este tramo decide el peso en tantos aeropuertos.", { size: 22, color: C.suave, anchor: "end" }))
    return lienzo({ ...this, desc: this.alt, sub: "Cuatro cosas en contra y una a favor, en el mismo tramo", cuerpo: g.join("") })
  },
}

// ─── PERF-12 ────────────────────────────────────────────────────────────────

const PERF12 = {
  codigo: "PERF-12",
  alto: 900,
  titulo: "El obstáculo que limita el peso",
  alt: "Perfil de salida con la pista a la izquierda, la trayectoria neta ascendiendo y, a la derecha, una colina con una antena encima. Entre la punta de la antena y la trayectoria neta, una cota de 35 ft. Por encima, en gris claro, la trayectoria real, con el margen extra.",
  pie: "Los 35 ft son la regla de la FAA (14 CFR 121.189); cada Estado publica la suya.",
  svg() {
    const g = []
    const suelo = 780
    g.push(`<rect x="60" y="${suelo}" width="360" height="18" fill="${C.tinta}"/>`)
    g.push(linea(`M60 ${suelo + 18}L1540 ${suelo + 18}`, { color: C.relieveLinea, sw: 3 }))
    const [x0, y0] = [420, suelo - 30]
    const net = (x) => y0 - (x - x0) * 0.34
    const real = (x) => y0 - (x - x0) * 0.5
    g.push(linea(`M${x0} ${y0}L1500 ${real(1500)}`, { color: C.gris, sw: 4, opacidad: 0.7 }))
    g.push(t(1340, real(1340) - 14, "trayectoria real", { size: 22, color: C.suave, anchor: "end" }))
    g.push(linea(`M${x0} ${y0}L1500 ${net(1500)}`, { color: C.acento, sw: 6 }))
    g.push(t(1500, net(1500) + 40, "Net Flight Path", { size: 26, peso: 700, color: C.acento, anchor: "end", italica: true }))
    // Colina con antena.
    const xo = 1150
    const cima = net(xo) + 60
    g.push(`<path d="M${xo - 260} ${suelo + 18}C${xo - 160} ${suelo - 80} ${xo - 80} ${cima + 90} ${xo} ${cima + 70}C${xo + 80} ${cima + 90} ${xo + 160} ${suelo - 80} ${xo + 260} ${suelo + 18}Z" fill="${C.relieve[1]}" stroke="${C.relieveLinea}" stroke-width="2"/>`)
    g.push(linea(`M${xo} ${cima + 70}L${xo} ${cima}`, { color: C.tinta, sw: 5 }))
    g.push(linea(`M${xo - 16} ${cima + 30}L${xo + 16} ${cima + 30}M${xo - 10} ${cima + 12}L${xo + 10} ${cima + 12}`, { color: C.tinta, sw: 3 }))
    g.push(`<circle cx="${xo}" cy="${cima}" r="6" fill="${C.rojo}"/>`)
    g.push(cota(xo + 40, net(xo + 40) + 4, xo + 40, cima - 2, { color: "rojo", sw: 3 }))
    g.push(t(xo + 58, (net(xo + 40) + cima) / 2 + 8, "35 ft", { size: 26, peso: 700, color: C.rojo }))
    g.push(avionLado(x0 + 60, y0 - 34, 0.8, { rot: -18 }))
    g.push(t(60, 860, "Si con el peso del día la neta no libra la antena por ese margen, el peso baja: el límite es el obstáculo.", { size: 22, color: C.tinta }))
    return lienzo({ ...this, desc: this.alt, sub: "Se libra con la trayectoria neta y con un motor menos", cuerpo: g.join("") })
  },
}

// ─── PERF-13 ────────────────────────────────────────────────────────────────

const PERF13 = {
  codigo: "PERF-13",
  alto: 900,
  titulo: "Manda el límite más restrictivo",
  alt: "Seis cajas en columna con un peso ficticio cada una: runway limit, climb limit, obstacle limit, brake energy limit, tire speed limit y structural limit. Todas apuntan a una caja final, maximum allowed takeoff weight. La del valor más bajo, obstacle limit con 74 200 kg, va resaltada y es la única cuya flecha llega gruesa.",
  pie: "Pesos ficticios, para mostrar la lógica.",
  svg() {
    const g = []
    const limites = [
      ["Runway Limit", "78 400 kg"],
      ["Climb Limit", "76 900 kg"],
      ["Obstacle Limit", "74 200 kg"],
      ["Brake Energy Limit", "79 800 kg"],
      ["Tire Speed Limit", "81 000 kg"],
      ["Structural Limit", "79 000 kg"],
    ]
    const [fx, fy] = [1080, 480]
    limites.forEach(([n, v], i) => {
      const y = 170 + i * 108
      const min = n === "Obstacle Limit"
      g.push(caja(80, y, 480, 84, { fill: min ? C.acento : C.papel, stroke: min ? null : C.claro, sw: 3, rx: 14 }))
      g.push(t(110, y + 52, n, { size: 26, peso: 700, color: min ? C.papel : C.acento, italica: true }))
      g.push(t(530, y + 52, v, { size: 26, peso: 700, color: min ? C.papel : C.tinta, anchor: "end" }))
      g.push(linea(`M560 ${y + 42}C800 ${y + 42} 850 ${fy} ${fx - 12} ${fy}`, { color: min ? C.acento : C.claro, sw: min ? 9 : 3, flecha: min ? "acento" : undefined }))
    })
    g.push(caja(fx, fy - 110, 460, 220, { fill: C.tinte, stroke: C.acento, sw: 4, rx: 18 }))
    g.push(tl(fx + 230, fy - 44, ["Maximum Allowed", "Takeoff Weight"], { size: 28, peso: 700, color: C.acento, anchor: "middle", lh: 34, italica: true }))
    g.push(t(fx + 230, fy + 60, "74 200 kg", { size: 40, peso: 700, color: C.tinta, anchor: "middle" }))
    return lienzo({ ...this, desc: this.alt, sub: "El peso permitido es el más bajo de todos los límites", cuerpo: g.join("") })
  },
}

// ─── PERF-19 ────────────────────────────────────────────────────────────────

const PERF19 = {
  codigo: "PERF-19",
  alto: 900,
  titulo: "Climb limited: la temperatura y la altitud recortan el peso",
  alt: "Gráfico con el peso en el eje horizontal y el gradiente del segundo segmento en el vertical. Una línea horizontal fija: gradiente exigido, 2,4 %. Tres líneas descendentes de gradiente disponible: día fresco al nivel del mar, día caliente al nivel del mar y día caliente en altura. Donde cada una cruza la línea exigida hay un punto: ese es el peso máximo para esa condición.",
  pie: "Esquema cualitativo: las curvas reales salen del AFM de cada avión.",
  svg() {
    const g = []
    const [x0, y0, x1, y1] = [200, 780, 1320, 180]
    g.push(linea(`M${x0} ${y0}L${x1} ${y0}`, { color: C.tinta, sw: 3, flecha: "tinta" }))
    g.push(linea(`M${x0} ${y0}L${x0} ${y1}`, { color: C.tinta, sw: 3, flecha: "tinta" }))
    g.push(t(x1, y0 + 44, "peso", { size: 26, peso: 700, anchor: "end" }))
    g.push(tl(x0 - 20, y1 + 10, ["gradiente", "2.º segmento"], { size: 22, peso: 700, anchor: "end", lh: 26 }))
    const yx = 500
    g.push(linea(`M${x0} ${yx}L${x1 - 20} ${yx}`, { color: C.rojo, sw: 4, dash: "14 8" }))
    g.push(t(x1 - 20, yx - 14, "gradiente exigido · 2,4 %", { size: 22, peso: 700, color: C.rojo, anchor: "end" }))
    const lineas = [
      ["día fresco, nivel del mar", 320, C.acento],
      ["día caliente, nivel del mar", 262, C.acento2],
      ["día caliente, en altura", 214, C.claro],
    ]
    for (const [rot, ya, color] of lineas) {
      const x2 = x1 - 60
      const y2 = ya + 410
      g.push(linea(`M${x0 + 20} ${ya}L${x2} ${y2}`, { color, sw: 5 }))
      const xc = x0 + 20 + ((yx - ya) / (y2 - ya)) * (x2 - x0 - 20)
      g.push(`<circle cx="${xc}" cy="${yx}" r="11" fill="${color}" stroke="${C.papel}" stroke-width="3"/>`)
      g.push(linea(`M${xc} ${yx + 12}L${xc} ${y0}`, { color, sw: 2, dash: "3 6" }))
      g.push(t(x2 + 12, y2 + 6, rot, { size: 20, peso: 700, color }))
    }
    g.push(parrafo(1350, 420, "Cada punto es un peso máximo. La pista no tiene nada que ver.", 220, { size: 22, color: C.tinta }).svg)
    return lienzo({ ...this, desc: this.alt, sub: "Donde el gradiente disponible cae al exigido, ahí está el peso máximo", cuerpo: g.join("") })
  },
}

// ─── PERF-14 ────────────────────────────────────────────────────────────────

const PERF14 = {
  codigo: "PERF-14",
  alto: 900,
  titulo: "Empuje reducido: sobra performance",
  alt: "Dos barras verticales de empuje. La izquierda, llena hasta arriba: maximum takeoff thrust. La derecha, llena hasta unos tres cuartos: reduced takeoff thrust, con la parte vacía sombreada como margen que no se usa. Debajo, una pista con el punto de 35 ft alcanzado en los dos casos, más adelante con empuje reducido pero todavía dentro de la pista.",
  svg() {
    const g = []
    const barras = [
      ["Maximum Takeoff Thrust", 380, 1],
      ["Reduced Takeoff Thrust", 820, 0.75],
    ]
    const [yb, hb] = [200, 380]
    for (const [n, x, f] of barras) {
      g.push(caja(x, yb, 180, hb, { fill: C.tinte, stroke: C.acento, sw: 3, rx: 12 }))
      g.push(`<rect x="${x}" y="${yb + hb * (1 - f)}" width="180" height="${hb * f}" rx="12" fill="${C.acento}"/>`)
      g.push(tl(x + 90, yb + hb + 36, n.split(" Takeoff "), { size: 22, peso: 700, color: C.acento, anchor: "middle", lh: 26, italica: true }))
    }
    g.push(tl(1030, yb + 30, ["margen que", "no se usa"], { size: 22, peso: 700, color: C.acento2, lh: 26 }))
    g.push(linea(`M1026 ${yb + 40}L1004 ${yb + 50}`, { color: C.acento2, sw: 2 }))
    // Pista.
    const yp = 770
    g.push(`<rect x="200" y="${yp}" width="1200" height="20" fill="${C.tinta}"/>`)
    const puntos = [
      ["máximo", 820, C.acento],
      ["reducido", 1160, C.acento2],
    ]
    for (const [rot, x, color] of puntos) {
      g.push(linea(`M${x} ${yp}L${x} ${yp - 56}`, { color, sw: 3 }))
      g.push(`<circle cx="${x}" cy="${yp - 60}" r="10" fill="${color}"/>`)
      g.push(t(x, yp - 80, `35 ft · ${rot}`, { size: 20, peso: 700, color, anchor: "middle" }))
    }
    g.push(t(1400, yp + 52, "fin de pista", { size: 20, color: C.suave, anchor: "end" }))
    g.push(parrafo(1120, 360, "Se reduce porque sobra performance, no porque se acepte menos seguridad.", 420, { size: 24, peso: 700, color: C.tinta }).svg)
    return lienzo({ ...this, desc: this.alt, sub: "Assumed temperature o flex: menos empuje dentro de lo que el día permite", cuerpo: g.join("") })
  },
}

export const ASCENSO = [PERF08, PERF09, PERF10, PERF11, PERF12, PERF13, PERF19, PERF14]
