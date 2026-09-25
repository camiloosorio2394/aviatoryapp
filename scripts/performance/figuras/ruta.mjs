/**
 * PERF-15 a PERF-18 y PERF-20: en ruta, el aterrizaje, la energía de frenos y
 * el cálculo en el EFB.
 */
import { C, avionLado, caja, cota, linea, lienzo, parrafo, pildora, t, tl, tp } from "../../figuras/lib.mjs"

// ─── PERF-15 ────────────────────────────────────────────────────────────────

const PERF15 = {
  codigo: "PERF-15",
  alto: 900,
  titulo: "Drift down sobre una cordillera",
  alt: "Perfil de una ruta sobre una cordillera. El avión en crucero a la izquierda, un símbolo de falla de motor, y desde ahí una trayectoria descendente suave, drift down, que se aplana en la altitud de nivelación. Una cota entre esa altitud y la cima más alta. A la derecha, un aeródromo adecuado.",
  pie: "La FAA da dos opciones (14 CFR 121.191): pendiente positiva a 1 000 ft sobre el terreno, o librarlo por 2 000 ft en el descenso hasta un aeródromo adecuado.",
  svg() {
    const g = []
    const suelo = 800
    g.push(`<path d="M60 ${suelo}L260 ${suelo}L420 620L520 690L640 520L760 640L860 580L1000 ${suelo - 60}L1200 ${suelo}L1544 ${suelo}L1544 840L60 840Z" fill="${C.relieve[1]}" stroke="${C.relieveLinea}" stroke-width="3"/>`)
    const crucero = 230
    const nivel = 400
    g.push(linea(`M80 ${crucero}L330 ${crucero}`, { color: C.acento, sw: 5 }))
    g.push(`<path d="M330 ${crucero}C520 ${crucero + 10} 640 ${nivel - 20} 820 ${nivel}L1300 ${nivel}" fill="none" stroke="${C.acento}" stroke-width="5" stroke-dasharray="16 8"/>`)
    g.push(avionLado(200, crucero - 8, 0.9))
    g.push(`<path d="M340 ${crucero - 56}L352 ${crucero - 38}L344 ${crucero - 38}L350 ${crucero - 16}L328 ${crucero - 40}L337 ${crucero - 40}Z" fill="${C.rojo}"/>`)
    g.push(t(560, crucero + 40, "Drift Down", { size: 28, peso: 700, color: C.acento, italica: true }))
    g.push(t(1300, nivel - 16, "altitud de nivelación", { size: 22, peso: 700, color: C.acento, anchor: "end" }))
    g.push(cota(640, nivel + 6, 640, 514, { color: "rojo", sw: 3 }))
    g.push(tl(660, 470, ["margen exigido", "sobre la cima"], { size: 20, peso: 700, color: C.rojo, lh: 24 }))
    g.push(`<rect x="1340" y="${suelo - 8}" width="160" height="10" fill="${C.tinta}"/>`)
    g.push(t(1420, suelo + 34, "aeródromo adecuado", { size: 20, peso: 700, anchor: "middle" }))
    g.push(linea(`M1300 ${nivel}C1380 ${nivel + 60} 1400 ${suelo - 120} 1420 ${suelo - 12}`, { color: C.acento, sw: 3, dash: "4 8", flecha: "acento" }))
    return lienzo({ ...this, desc: this.alt, sub: "Con un motor menos se baja hasta donde el avión se sostiene; el terreno decide la ruta", cuerpo: g.join("") })
  },
}

// ─── PERF-16 ────────────────────────────────────────────────────────────────

const PERF16 = {
  codigo: "PERF-16",
  alto: 900,
  titulo: "Qué mide cada distancia de aterrizaje",
  alt: "Perfil de aproximación y aterrizaje: el avión cruza el umbral a 50 ft, toca en el punto de contacto y recorre la pista hasta detenerse. Debajo, tres barras: la distancia real de aterrizaje; la distancia de aterrizaje requerida, que es la anterior más un bloque sombreado de margen; y la LDA, la más larga.",
  pie: "En despacho, la FAA pide detenerse dentro del 60 % de la longitud efectiva (14 CFR 121.195); el margen exacto depende de la norma que aplique.",
  svg() {
    const g = []
    const [umbral, fin] = [300, 1460]
    const yp = 540
    g.push(`<rect x="${umbral}" y="${yp}" width="${fin - umbral}" height="22" fill="${C.tinta}"/>`)
    g.push(`<rect x="${umbral}" y="${yp - 4}" width="8" height="30" fill="${C.papel}" stroke="${C.tinta}" stroke-width="2"/>`)
    const y50 = yp - 110
    g.push(linea(`M80 ${y50 - 90}L${umbral} ${y50}C${umbral + 120} ${yp - 50} ${umbral + 220} ${yp} 620 ${yp}`, { color: C.acento, sw: 4, dash: "10 7" }))
    g.push(avionLado(umbral - 6, y50 - 10, 0.85, { rot: 5 }))
    g.push(cota(umbral - 70, y50, umbral - 70, yp, { color: "tinta", sw: 2.5 }))
    g.push(t(umbral - 86, (y50 + yp) / 2 + 8, "50 ft", { size: 22, peso: 700, anchor: "end" }))
    g.push(`<circle cx="620" cy="${yp}" r="9" fill="${C.acento}"/>`)
    g.push(t(620, yp - 22, "toma", { size: 20, peso: 700, color: C.acento, anchor: "middle" }))
    const alto = 1000
    g.push(avionLado(alto - 50, yp - 18, 0.85))
    g.push(t(alto, yp - 70, "detenido", { size: 20, peso: 700, color: C.acento, anchor: "middle" }))
    const barras = [
      ["Actual Landing Distance", umbral, alto, C.acento],
      ["Landing Distance Required", umbral, 1300, C.acento2],
      ["LDA", umbral, fin, C.gris],
    ]
    barras.forEach(([n, a, b, color], i) => {
      const y = 630 + i * 70
      g.push(`<rect x="${a}" y="${y}" width="${b - a}" height="32" rx="4" fill="${color}"/>`)
      if (i === 1) {
        g.push(`<rect x="${alto}" y="${y}" width="${1300 - alto}" height="32" fill="${C.tinte2}"/>`)
        g.push(t((alto + 1300) / 2, y + 23, "margen", { size: 20, peso: 700, color: C.acento, anchor: "middle" }))
      }
      g.push(t(a + 16, y + 23, n, { size: 20, peso: 700, color: C.papel, italica: true }))
    })
    return lienzo({ ...this, desc: this.alt, sub: "Lo que el avión usa, lo que se exige y lo que la pista ofrece", cuerpo: g.join("") })
  },
}

// ─── PERF-17 ────────────────────────────────────────────────────────────────

function aterrizaje(oy, estable) {
  const g = []
  const [umbral, fin] = [300, 1480]
  const yp = oy + 196
  g.push(caja(56, oy, 1488, 310, { rx: 16 }))
  g.push(t(84, oy + 44, estable ? "EN SENDA Y A VREF" : "CON EXCESO DE VELOCIDAD Y ALTURA", { size: 22, peso: 700, color: estable ? C.verde : C.rojo, espaciado: 1 }))
  g.push(`<rect x="${umbral}" y="${yp}" width="${fin - umbral}" height="18" fill="${C.tinta}"/>`)
  g.push(`<rect x="${umbral + 150}" y="${yp - 4}" width="220" height="26" fill="none" stroke="${C.claro}" stroke-width="2" stroke-dasharray="5 5"/>`)
  g.push(t(umbral + 260, yp + 50, "zona de toma de contacto", { size: 18, color: C.suave, anchor: "middle" }))
  const color = estable ? C.verde : C.rojo
  const toma = estable ? umbral + 260 : umbral + 620
  const alto = estable ? 900 : 1400
  const trayecto = estable
    ? `M120 ${yp - 120}L${umbral} ${yp - 70}C${umbral + 120} ${yp - 20} ${toma - 60} ${yp} ${toma} ${yp}`
    : `M120 ${yp - 130}L${umbral} ${yp - 100}C${umbral + 160} ${yp - 50} ${umbral + 360} ${yp - 26} ${toma - 120} ${yp - 18}C${toma - 60} ${yp - 12} ${toma - 20} ${yp} ${toma} ${yp}`
  g.push(`<path d="${trayecto}" fill="none" stroke="${color}" stroke-width="4" stroke-dasharray="10 7"/>`)
  if (!estable) g.push(t(umbral + 470, yp - 40, "flotación", { size: 20, peso: 700, color: C.rojo, anchor: "middle" }))
  g.push(`<circle cx="${toma}" cy="${yp}" r="9" fill="${color}"/>`)
  g.push(avionLado(alto - 50, yp - 18, 0.8))
  g.push(cota(umbral, yp + 70, alto, yp + 70, { color: estable ? "verde" : "rojo", sw: 3 }))
  g.push(t((umbral + alto) / 2, yp + 100, "distancia recorrida", { size: 20, peso: 700, color, anchor: "middle" }))
  if (!estable) g.push(t(fin, yp - 64, "muy cerca del extremo", { size: 20, peso: 700, color: C.rojo, anchor: "end" }))
  return g.join("")
}

const PERF17 = {
  codigo: "PERF-17",
  alto: 900,
  titulo: "Cuánta pista se pierde por técnica",
  alt: "Dos aterrizajes sobre la misma pista. Arriba, en senda y a VREF: la toma cae dentro de la zona de contacto y el avión se detiene con pista de sobra. Abajo, con exceso de velocidad y altura: flota, toca pasada la zona de contacto y se detiene muy cerca del extremo. Las dos con la distancia recorrida acotada.",
  svg() {
    return lienzo({ ...this, desc: this.alt, sub: "El mismo avión y el mismo peso; cambia cómo se llega", cuerpo: aterrizaje(160, true) + aterrizaje(500, false) })
  },
}

// ─── PERF-20 ────────────────────────────────────────────────────────────────

const PERF20 = {
  codigo: "PERF-20",
  alto: 900,
  titulo: "Energía de frenos y VMBE",
  alt: "Curva creciente de la energía que absorben los frenos contra la velocidad de rechazo, cuadrática. Dos puntos marcados: a una velocidad V la energía es E; al doble de velocidad, 2V, la energía es cuatro veces mayor, 4E. Una línea horizontal de trazos, capacidad certificada, corta la curva; el punto de corte es VMBE.",
  svg() {
    const g = []
    const [x0, y0, x1, y1] = [200, 780, 1280, 170]
    g.push(linea(`M${x0} ${y0}L${x1} ${y0}`, { color: C.tinta, sw: 3, flecha: "tinta" }))
    g.push(linea(`M${x0} ${y0}L${x0} ${y1}`, { color: C.tinta, sw: 3, flecha: "tinta" }))
    g.push(t(x1, y0 + 44, "velocidad de rechazo", { size: 24, peso: 700, anchor: "end" }))
    g.push(tl(x0 - 20, y1 + 10, ["energía en", "los frenos"], { size: 22, peso: 700, anchor: "end", lh: 26 }))
    // E proporcional a V²: con V = 400 px de eje, 2V = 800 px.
    const k = 560 / (880 * 880)
    const pts = []
    for (let v = 0; v <= 900; v += 20) pts.push(`${v ? "L" : "M"}${x0 + v} ${y0 - k * v * v}`)
    g.push(`<path d="${pts.join("")}" fill="none" stroke="${C.acento}" stroke-width="6"/>`)
    const punto = (v, rotV, rotE) => {
      const x = x0 + v
      const y = y0 - k * v * v
      g.push(linea(`M${x} ${y0}L${x} ${y}L${x0} ${y}`, { color: C.acento2, sw: 2.5, dash: "4 6" }))
      g.push(`<circle cx="${x}" cy="${y}" r="11" fill="${C.acento2}" stroke="${C.papel}" stroke-width="3"/>`)
      g.push(t(x, y0 + 40, rotV, { size: 24, peso: 700, color: C.acento2, anchor: "middle" }))
      g.push(t(x0 - 16, y + 8, rotE, { size: 24, peso: 700, color: C.acento2, anchor: "end" }))
    }
    punto(400, "V", "E")
    punto(800, "2V", "4E")
    const yc = y0 - k * 700 * 700
    g.push(linea(`M${x0} ${yc}L${x1 - 30} ${yc}`, { color: C.rojo, sw: 3.5, dash: "14 8" }))
    g.push(t(x1 - 30, yc - 14, "capacidad certificada", { size: 22, peso: 700, color: C.rojo, anchor: "end" }))
    g.push(`<circle cx="${x0 + 700}" cy="${yc}" r="12" fill="${C.rojo}" stroke="${C.papel}" stroke-width="3"/>`)
    g.push(pildora(x0 + 700, yc + 44, "VMBE", { size: 24, anchor: "middle", fill: C.rojoSuave, color: C.rojo }).svg)
    g.push(parrafo(1320, 420, "Al doble de velocidad, cuatro veces la energía. V₁ no puede superar VMBE.", 240, { size: 22, color: C.tinta }).svg)
    return lienzo({ ...this, desc: this.alt, sub: "Por qué un rechazo a alta velocidad es tan exigente", cuerpo: g.join("") })
  },
}

// ─── PERF-18 ────────────────────────────────────────────────────────────────

const PERF18 = {
  codigo: "PERF-18",
  alto: 900,
  titulo: "Entradas, cálculo y resultado",
  alt: "Pantalla genérica de una aplicación de performance en tres bloques. A la izquierda, las entradas con valores ficticios: pista, viento, temperatura, QNH, estado de la pista, configuración y peso. En el centro, una flecha: performance calculation. A la derecha, los resultados: peso máximo, V1, VR, V2, el empuje y, destacada, la línea LIMIT con el factor limitante.",
  pie: "Pantalla genérica y valores ficticios.",
  svg() {
    const g = []
    const [x, y, w, h] = [80, 180, 1440, 620]
    g.push(`<rect x="${x - 14}" y="${y - 14}" width="${w + 28}" height="${h + 28}" rx="24" fill="#2A2E34"/><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" fill="${C.pantalla}"/>`)
    g.push(tp(x + 40, y + 60, "INPUTS", { size: 28, color: C.pantallaSuave }))
    const entradas = [
      ["RWY", "13 · SECA"],
      ["WIND", "140/06"],
      ["OAT", "24 °C"],
      ["QNH", "1016"],
      ["CONF", "1+F"],
      ["TOW", "70 800 kg"],
    ]
    entradas.forEach(([k, v], i) => {
      const yy = y + 130 + i * 72
      g.push(tp(x + 40, yy, k, { size: 26, color: C.pantallaSuave }))
      g.push(tp(x + 200, yy, v, { size: 28, color: C.pantallaCian }))
    })
    g.push(`<rect x="${x + 500}" y="${y + 250}" width="400" height="120" rx="14" fill="none" stroke="${C.pantallaBorde}" stroke-width="3"/>`)
    g.push(tp(x + 700, y + 300, "PERFORMANCE", { size: 26, color: C.pantallaTexto, anchor: "middle" }))
    g.push(tp(x + 700, y + 340, "CALCULATION", { size: 26, color: C.pantallaTexto, anchor: "middle" }))
    g.push(linea(`M${x + 440} ${y + 310}L${x + 492} ${y + 310}`, { color: C.pantallaTexto, sw: 4, flecha: "suave" }))
    g.push(linea(`M${x + 908} ${y + 310}L${x + 960} ${y + 310}`, { color: C.pantallaTexto, sw: 4, flecha: "suave" }))
    g.push(tp(x + 990, y + 60, "OUTPUTS", { size: 28, color: C.pantallaSuave }))
    const salidas = [
      ["MAX TOW", "74 200 kg"],
      ["V1", "141"],
      ["VR", "145"],
      ["V2", "150"],
      ["THRUST", "FLEX 52"],
    ]
    salidas.forEach(([k, v], i) => {
      const yy = y + 130 + i * 72
      g.push(tp(x + 990, yy, k, { size: 26, color: C.pantallaSuave }))
      g.push(tp(x + 1200, yy, v, { size: 28, color: C.pantallaVerde }))
    })
    g.push(`<rect x="${x + 970}" y="${y + 500}" width="440" height="70" rx="10" fill="#3A2A12" stroke="#E0A040" stroke-width="3"/>`)
    g.push(tp(x + 990, y + 546, "LIMIT", { size: 28, color: "#E0A040" }))
    g.push(tp(x + 1200, y + 546, "OBSTACLE", { size: 28, color: "#E0A040" }))
    return lienzo({ ...this, desc: this.alt, recreacion: "Pantalla genérica · no imita a ninguna aplicación", cuerpo: g.join("") })
  },
}

export const RUTA = [PERF15, PERF16, PERF17, PERF20, PERF18]
