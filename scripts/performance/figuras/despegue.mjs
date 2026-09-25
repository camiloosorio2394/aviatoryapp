/**
 * PERF-01 a PERF-07: las variables, las distancias declaradas, las V-speeds y
 * las dos distancias del despegue con falla de motor.
 */
import { C, avion, avionLado, caja, cota, linea, lienzo, parrafo, pildora, t, tl } from "../../figuras/lib.mjs"

// ─── PERF-01 ────────────────────────────────────────────────────────────────

const PERF01 = {
  codigo: "PERF-01",
  alto: 900,
  titulo: "Ocho variables, una sola performance",
  alt: "Un avión de transporte visto desde arriba en el umbral de una pista, rodeado por ocho etiquetas que apuntan hacia él: weight, temperature, pressure altitude, wind, runway, slope, obstacles y aircraft configuration, cada una con su traducción debajo.",
  svg() {
    const g = []
    const [cx, cy] = [800, 520]
    g.push(`<rect x="200" y="${cy - 60}" width="1200" height="120" rx="6" fill="${C.tinta}"/>`)
    g.push(linea(`M240 ${cy}L1360 ${cy}`, { color: C.papel, sw: 4, dash: "30 24" }))
    for (let k = 0; k < 8; k++) g.push(`<rect x="220" y="${cy - 50 + k * 13}" width="40" height="7" fill="${C.papel}"/>`)
    g.push(avion(cx, cy, 90, 4.2, { fill: C.acento }))
    const etiquetas = [
      ["Weight", "peso", -160, -250],
      ["Temperature", "temperatura", 170, -250],
      ["Pressure Altitude", "altitud de presión", -560, -230],
      ["Wind", "viento", 520, -230],
      ["Runway", "pista", -560, 230],
      ["Slope", "pendiente", 520, 230],
      ["Obstacles", "obstáculos", -160, 270],
      ["Aircraft Configuration", "configuración", 170, 270],
    ]
    for (const [en, es, dx, dy] of etiquetas) {
      const x = cx + dx
      const y = cy + dy
      g.push(linea(`M${x} ${y + (dy < 0 ? 40 : -40)}L${cx + dx * 0.25} ${cy + dy * 0.22}`, { color: C.acento2, sw: 2.5 }))
      g.push(`<circle cx="${cx + dx * 0.25}" cy="${cy + dy * 0.22}" r="6" fill="${C.acento2}"/>`)
      const w = Math.max(en.length * 15 + 40, 190)
      g.push(caja(x - w / 2, y - 38, w, 78, { fill: C.papel, stroke: C.acento, sw: 2.5, rx: 14 }))
      g.push(t(x, y - 4, en, { size: 26, peso: 700, color: C.acento, anchor: "middle", italica: true }))
      g.push(t(x, y + 26, es, { size: 20, color: C.suave, anchor: "middle" }))
    }
    return lienzo({ ...this, desc: this.alt, sub: "No sale de la potencia de los motores: sale de todo esto a la vez", cuerpo: g.join("") })
  },
}

// ─── PERF-02 ────────────────────────────────────────────────────────────────

const PERF02 = {
  codigo: "PERF-02",
  alto: 900,
  titulo: "Las condiciones del día mueven el despegue",
  alt: "Cuatro franjas con el mismo avión despegando y el punto donde levanta, sobre una regla común: al nivel del mar en día frío, despegue corto; en aeropuerto alto y caliente, claramente más largo; con viento de frente, más corto; con viento de cola, el más largo de los cuatro.",
  pie: "Esquema comparativo, sin escala: las distancias reales salen del cálculo de cada día.",
  svg() {
    const g = []
    const [x0, x1] = [360, 1500]
    const casos = [
      ["Nivel del mar, día frío", 0.46, null],
      ["Alto y caliente", 0.8, null],
      ["Viento de frente", 0.38, "frente"],
      ["Viento de cola", 0.9, "cola"],
    ]
    casos.forEach(([rot, f, viento], i) => {
      const y = 250 + i * 140
      g.push(tl(80, y - 6, rot.split(", "), { size: 24, peso: 700, color: C.acento, lh: 28 }))
      g.push(`<rect x="${x0}" y="${y}" width="${x1 - x0}" height="16" fill="${C.tinta}"/>`)
      const xl = x0 + f * (x1 - x0)
      g.push(linea(`M${x0 + 30} ${y - 4}L${xl} ${y - 4}`, { color: C.acento2, sw: 3, dash: "2 6" }))
      g.push(`<circle cx="${xl}" cy="${y + 8}" r="9" fill="${C.acento}"/>`)
      g.push(avionLado(xl + 70, y - 34, 0.7, { rot: -9 }))
      if (viento) {
        const d = viento === "frente" ? `M${x1 - 20} ${y - 50}L${x1 - 130} ${y - 50}` : `M${x0 + 20} ${y - 50}L${x0 + 130} ${y - 50}`
        g.push(linea(d, { color: C.suave, sw: 3, flecha: "suave" }))
      }
    })
    g.push(linea(`M${x0} 810L${x1} 810`, { color: C.tinta, sw: 2.5 }))
    for (let k = 0; k <= 10; k++) g.push(linea(`M${x0 + k * ((x1 - x0) / 10)} 800L${x0 + k * ((x1 - x0) / 10)} 820`, { color: C.tinta, sw: 2 }))
    g.push(t(x0, 850, "regla común: el mismo avión, la misma pista", { size: 20, color: C.suave }))
    return lienzo({ ...this, desc: this.alt, sub: "El punto donde levanta cambia con la altitud, la temperatura y el viento", cuerpo: g.join("") })
  },
}

// ─── PERF-03 ────────────────────────────────────────────────────────────────

const PERF03 = {
  codigo: "PERF-03",
  alto: 900,
  titulo: "Las cuatro distancias declaradas",
  alt: "Vista lateral de una pista con un umbral desplazado al comienzo, la zona de parada a continuación del extremo y la zona libre de obstáculos por encima y más allá. Debajo, cuatro barras: TORA, la pista; TODA, la pista más la zona libre; ASDA, la pista más la zona de parada; y LDA, desde el umbral hasta el extremo.",
  svg() {
    const g = []
    const [a, umbral, fin, parada, libre] = [180, 330, 1080, 1250, 1420]
    const yp = 360
    g.push(`<rect x="${fin}" y="${yp - 150}" width="${libre - fin}" height="150" fill="${C.tinte}" stroke="${C.acento2}" stroke-width="2.5" stroke-dasharray="10 8"/>`)
    g.push(t((fin + libre) / 2, yp - 116, "CLEARWAY", { size: 22, peso: 700, color: C.acento, anchor: "middle", espaciado: 1 }))
    g.push(t((fin + libre) / 2, yp - 88, "zona libre de obstáculos", { size: 20, color: C.suave, anchor: "middle" }))
    g.push(`<rect x="${a}" y="${yp}" width="${fin - a}" height="30" fill="${C.tinta}"/>`)
    g.push(`<rect x="${fin}" y="${yp}" width="${parada - fin}" height="30" fill="${C.gris}"/>`)
    g.push(linea(`M${fin} ${yp}L${parada} ${yp + 30}M${fin + 40} ${yp}L${parada} ${yp + 20}M${fin} ${yp + 16}L${parada - 40} ${yp + 30}`, { color: C.papel, sw: 2 }))
    g.push(t((fin + parada) / 2, yp + 66, "STOPWAY", { size: 20, peso: 700, color: C.suave, anchor: "middle" }))
    g.push(`<rect x="${umbral - 4}" y="${yp - 10}" width="8" height="50" fill="${C.papel}" stroke="${C.tinta}" stroke-width="2"/>`)
    g.push(t(umbral, yp - 22, "umbral desplazado", { size: 20, color: C.suave, anchor: "middle" }))
    g.push(t((a + fin) / 2, yp + 66, "PISTA", { size: 20, peso: 700, color: C.suave, anchor: "middle" }))
    g.push(linea(`M${a - 60} ${yp + 15}L${a - 10} ${yp + 15}`, { color: C.acento, sw: 4, flecha: "acento" }))
    const barras = [
      ["TORA", a, fin, "Carrera de despegue: la pista"],
      ["TODA", a, libre, "Distancia de despegue: pista y clearway"],
      ["ASDA", a, parada, "Aceleración y parada: pista y stopway"],
      ["LDA", umbral, fin, "Aterrizaje: desde el umbral"],
    ]
    barras.forEach(([nombre, x1, x2, texto], i) => {
      const y = 500 + i * 88
      for (const x of [x1, x2]) g.push(linea(`M${x} ${yp + 30}L${x} ${y + 26}`, { color: C.claro, sw: 1.5, dash: "3 6" }))
      g.push(`<rect x="${x1}" y="${y}" width="${x2 - x1}" height="26" rx="4" fill="${i === 3 ? C.acento2 : C.acento}"/>`)
      g.push(t(x1 + 16, y + 20, `${nombre} · ${texto}`, { size: 20, peso: 700, color: C.papel }))
    })
    return lienzo({ ...this, desc: this.alt, sub: "Dónde empieza y dónde acaba cada una", cuerpo: g.join("") })
  },
}

// ─── PERF-04 ────────────────────────────────────────────────────────────────

const PERF04 = {
  codigo: "PERF-04",
  alto: 900,
  titulo: "Las V-speeds del despegue, en orden",
  alt: "Línea de tiempo sobre el perfil de una pista con las marcas en orden: VMCG, VEF, V1, VR, VLOF y, a 35 ft de altura, V2. Entre VEF y V1, una banda sombreada: tiempo de reconocimiento. El avión aparece en el suelo, en rotación y ya en el aire.",
  svg() {
    const g = []
    const ys = 700
    g.push(`<rect x="80" y="${ys}" width="1180" height="22" fill="${C.tinta}"/>`)
    g.push(linea(`M80 ${ys + 11}L1260 ${ys + 11}`, { color: C.papel, sw: 2, dash: "18 14" }))
    const [xef, xv1] = [520, 640]
    g.push(`<rect x="${xef}" y="300" width="${xv1 - xef}" height="${ys - 300}" fill="${C.tinte}"/>`)
    g.push(tl((xef + xv1) / 2, 330, ["tiempo de", "reconocimiento"], { size: 20, peso: 700, color: C.acento, anchor: "middle", lh: 24 }))
    const marcas = [
      ["VMCG", 300],
      ["VEF", xef],
      ["V₁", xv1],
      ["VR", 860],
      ["VLOF", 1010],
    ]
    for (const [v, x] of marcas) {
      g.push(linea(`M${x} 400L${x} ${ys}`, { color: C.acento, sw: 2.5, dash: "5 6" }))
      g.push(pildora(x, 390, v, { size: 26, anchor: "middle", fill: v === "V₁" ? C.acento : C.papel, color: v === "V₁" ? C.papel : C.acento, stroke: C.acento }).svg)
    }
    g.push(avionLado(430, ys - 18, 0.9))
    g.push(avionLado(880, ys - 30, 0.9, { rot: -10 }))
    const [x2, y35] = [1330, ys - 150]
    g.push(avionLado(x2, y35 - 8, 0.9, { rot: -8 }))
    g.push(linea(`M1010 ${ys}C1120 ${ys - 20} 1220 ${y35 + 40} ${x2 - 60} ${y35 + 4}`, { color: C.acento2, sw: 3, dash: "4 7" }))
    g.push(cota(1470, y35, 1470, ys - 2, { color: "tinta", sw: 2.5 }))
    g.push(t(1486, (y35 + ys) / 2 + 8, "35 ft", { size: 24, peso: 700 }))
    g.push(pildora(x2, y35 - 70, "V₂", { size: 26, anchor: "middle", fill: C.papel, color: C.acento, stroke: C.acento }).svg)
    g.push(t(80, 800, "VEF y V₁ no son el mismo punto: entre la falla y la decisión pasa el tiempo de reconocerla.", { size: 24, color: C.tinta }))
    return lienzo({ ...this, desc: this.alt, sub: "El orden real, sobre la pista", cuerpo: g.join("") })
  },
}

// ─── PERF-05 y PERF-06 ──────────────────────────────────────────────────────

/** Pista con zona de parada y zona libre, igual en las dos figuras para compararlas. */
function pistaDespegue(ys) {
  const [a, fin, parada, libre] = [80, 1240, 1370, 1500]
  return {
    a,
    fin,
    parada,
    libre,
    svg:
      `<rect x="${fin}" y="${ys - 190}" width="${libre - fin}" height="190" fill="${C.tinte}" opacity="0.8"/>` +
      `<rect x="${a}" y="${ys}" width="${fin - a}" height="22" fill="${C.tinta}"/>` +
      `<rect x="${fin}" y="${ys}" width="${parada - fin}" height="22" fill="${C.gris}"/>` +
      t((fin + parada) / 2, ys + 50, "stopway", { size: 20, color: C.suave, anchor: "middle" }) +
      t((fin + libre) / 2, ys - 14, "clearway", { size: 20, color: C.suave, anchor: "middle" }),
  }
}

function numero(x, y, k) {
  return `<circle cx="${x}" cy="${y}" r="18" fill="${C.acento}"/>` + t(x, y + 7, String(k), { size: 20, peso: 700, color: C.papel, anchor: "middle" })
}

function falla(x, y) {
  return `<path d="M${x} ${y - 20}L${x + 12} ${y - 2}L${x + 4} ${y - 2}L${x + 10} ${y + 20}L${x - 12} ${y - 4}L${x - 3} ${y - 4}Z" fill="${C.rojo}"/>`
}

const PERF05 = {
  codigo: "PERF-05",
  alto: 900,
  titulo: "Accelerate-Stop: si se rechaza",
  alt: "Cinco posiciones del mismo avión sobre una pista con zona de parada: suelta de frenos, acelerando, falla del motor en VEF, rechazo iniciado en V1 con los spoilers desplegados, y detenido. Debajo, la barra de la distancia de aceleración y parada, que cabe dentro de la barra de la ASDA.",
  svg() {
    const g = []
    const ys = 560
    const p = pistaDespegue(ys)
    g.push(p.svg)
    const pos = [
      [1, 170, "suelta de frenos"],
      [2, 420, "acelerando"],
      [3, 640, "falla · VEF"],
      [4, 790, "rechazo en V₁"],
      [5, 1180, "detenido"],
    ]
    for (const [k, x, rot] of pos) {
      g.push(avionLado(x, ys - 18, 0.85))
      g.push(numero(x, ys - 110, k))
      g.push(t(x, ys - 144, rot, { size: 20, peso: 700, color: C.acento, anchor: "middle" }))
    }
    g.push(falla(640, ys - 62))
    g.push(linea(`M${790 - 8} ${ys - 34}L${790 + 22} ${ys - 44}`, { color: C.acento, sw: 4 }))
    const barras = [
      ["Accelerate-Stop Distance", 1180, C.acento],
      ["ASDA", p.parada, C.gris],
    ]
    barras.forEach(([n, x2, color], i) => {
      const y = 660 + i * 70
      g.push(`<rect x="${p.a}" y="${y}" width="${x2 - p.a}" height="30" rx="4" fill="${color}"/>`)
      g.push(t(p.a + 16, y + 22, n, { size: 20, peso: 700, color: C.papel }))
    })
    g.push(t(p.a, 830, "La distancia para detenerse tiene que caber en la ASDA. La falla ocurre antes del punto de decisión.", { size: 22, color: C.tinta }))
    return lienzo({ ...this, desc: this.alt, sub: "La falla antes de V₁ y la parada, contra la ASDA", cuerpo: g.join("") })
  },
}

const PERF06 = {
  codigo: "PERF-06",
  alto: 900,
  titulo: "Accelerate-Go: si se continúa",
  alt: "El mismo encuadre que la figura anterior: suelta de frenos, acelerando, falla en VEF, rotación en VR, despegue en VLOF, y el avión a 35 ft sobre el final con V2. Debajo, la barra de la distancia de aceleración y continuación contra la barra de la TODA, con la clearway sombreada al final.",
  svg() {
    const g = []
    const ys = 560
    const p = pistaDespegue(ys)
    g.push(p.svg)
    const pos = [
      [1, 170, "suelta de frenos", 0, 0],
      [2, 420, "acelerando", 0, 0],
      [3, 640, "falla · VEF", 0, 0],
      [4, 900, "VR", -10, -10],
      [5, 1060, "VLOF", -9, -24],
      [6, 1390, "35 ft · V₂", -8, -150],
    ]
    for (const [k, x, rot, giro, dy] of pos) {
      g.push(avionLado(x, ys - 18 + dy, 0.85, { rot: giro }))
      g.push(numero(x, ys - 110 + Math.min(dy, 0) * (k === 6 ? 0.55 : 1), k))
      g.push(t(x, ys - 144 + Math.min(dy, 0) * (k === 6 ? 0.55 : 1), rot, { size: 20, peso: 700, color: C.acento, anchor: "middle" }))
    }
    g.push(falla(640, ys - 62))
    const barras = [
      ["Accelerate-Go Distance", 1390, C.acento],
      ["TODA", p.libre, C.gris],
    ]
    barras.forEach(([n, x2, color], i) => {
      const y = 660 + i * 70
      g.push(`<rect x="${p.a}" y="${y}" width="${x2 - p.a}" height="30" rx="4" fill="${color}"/>`)
      if (n === "TODA") g.push(`<rect x="${p.fin}" y="${y}" width="${p.libre - p.fin}" height="30" fill="${C.tinte2}"/>`)
      g.push(t(p.a + 16, y + 22, n, { size: 20, peso: 700, color: C.papel }))
    })
    g.push(t(p.a, 830, "El mismo punto de falla; esta vez se sigue hasta 35 ft con V₂, y eso tiene que caber en la TODA.", { size: 22, color: C.tinta }))
    return lienzo({ ...this, desc: this.alt, sub: "La misma falla, pero continuando: contra la TODA", cuerpo: g.join("") })
  },
}

// ─── PERF-07 ────────────────────────────────────────────────────────────────

const PERF07 = {
  codigo: "PERF-07",
  alto: 900,
  titulo: "Balanced field length",
  alt: "Gráfico con V1 en el eje horizontal y distancia en el vertical. La distancia de aceleración y parada sube con V1; la de aceleración y continuación baja. Se cruzan: desde el cruce, líneas de puntos a los ejes rotuladas V1 equilibrada y balanced field length.",
  svg() {
    const g = []
    const [x0, y0, x1, y1] = [220, 780, 1300, 180]
    g.push(linea(`M${x0} ${y0}L${x1} ${y0}`, { color: C.tinta, sw: 3, flecha: "tinta" }))
    g.push(linea(`M${x0} ${y0}L${x0} ${y1}`, { color: C.tinta, sw: 3, flecha: "tinta" }))
    g.push(t(x1, y0 + 44, "V₁", { size: 28, peso: 700, anchor: "end" }))
    g.push(t(x0 - 20, y1 + 10, "distancia", { size: 24, peso: 700, anchor: "end" }))
    const cx = 760
    const cy = 440
    g.push(`<path d="M${x0 + 40} 700C${x0 + 300} 640 ${cx - 150} 520 ${cx} ${cy}S${x1 - 150} 250 ${x1 - 60} 210" fill="none" stroke="${C.acento}" stroke-width="6"/>`)
    g.push(`<path d="M${x0 + 40} 220C${x0 + 300} 260 ${cx - 150} 380 ${cx} ${cy}S${x1 - 150} 640 ${x1 - 60} 690" fill="none" stroke="${C.acento2}" stroke-width="6"/>`)
    g.push(t(x1 - 60, 196, "Accelerate-Stop Distance", { size: 24, peso: 700, color: C.acento, anchor: "end", italica: true }))
    g.push(t(x1 - 60, 728, "Accelerate-Go Distance", { size: 24, peso: 700, color: C.acento2, anchor: "end", italica: true }))
    g.push(linea(`M${cx} ${cy}L${cx} ${y0}`, { color: C.tinta, sw: 2.5, dash: "4 7" }))
    g.push(linea(`M${cx} ${cy}L${x0} ${cy}`, { color: C.tinta, sw: 2.5, dash: "4 7" }))
    g.push(`<circle cx="${cx}" cy="${cy}" r="12" fill="${C.tinta}"/>`)
    g.push(t(cx, y0 + 44, "V₁ equilibrada", { size: 24, peso: 700, anchor: "middle" }))
    g.push(tl(x0 - 20, cy - 6, ["Balanced", "Field Length"], { size: 22, peso: 700, anchor: "end", lh: 26, italica: true }))
    g.push(parrafo(1340, 380, "En el cruce, parar y continuar piden la misma distancia: esa es la pista mínima para ese peso.", 220, { size: 22, color: C.tinta }).svg)
    return lienzo({ ...this, desc: this.alt, sub: "Donde parar y continuar piden la misma pista", cuerpo: g.join("") })
  },
}

export const DESPEGUE = [PERF01, PERF02, PERF03, PERF04, PERF05, PERF06, PERF07]
