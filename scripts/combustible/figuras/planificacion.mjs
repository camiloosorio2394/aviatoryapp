/**
 * IMG-C01 a IMG-C08: el proceso, los tanques y los componentes del
 * combustible planificado. Las cifras son las del vuelo de referencia del
 * módulo (docs/contenido/gestion-combustible.md), que son didácticas.
 */
import { C, caja, linea, lienzo, parrafo, pildora, t, tl } from "../../figuras/lib.mjs"

const REF = "Cifras del vuelo de referencia del módulo: didácticas, no de un avión real."
const kg = (v) => `${v.toLocaleString("es-CO")} kg`

// ─── IMG-C01 ────────────────────────────────────────────────────────────────

const C01 = {
  codigo: "IMG-C01",
  alto: 900,
  titulo: "Un proceso, no un cálculo",
  alt: "Flujo horizontal de la gestión del combustible: despacho y OFP, briefing, carga y verificación, fuel checks en ruta, predicción al destino y al alterno, decisión antes del descenso, y aterrizaje con la reserva final intacta. Una flecha de retorno muestra que la predicción se actualiza durante todo el vuelo.",
  svg() {
    const g = []
    const pasos = ["Despacho y OFP", "Briefing", "Carga y verificación", "Fuel checks en ruta", "Predicción al destino y al alterno", "Decisión antes del descenso", "Aterrizaje con la reserva final intacta"]
    const [w, gap, y, h] = [190, 26, 380, 190]
    pasos.forEach((p, i) => {
      const x = 56 + i * (w + gap)
      const final = i === pasos.length - 1
      g.push(caja(x, y, w, h, { fill: final ? C.acento : i >= 3 && i <= 4 ? C.tinte2 : C.papel, stroke: final ? null : C.acento2, sw: 3, rx: 16 }))
      g.push(`<circle cx="${x + 30}" cy="${y + 34}" r="16" fill="${final ? C.papel : C.acento}"/>`)
      g.push(t(x + 30, y + 41, String(i + 1), { size: 20, peso: 700, color: final ? C.acento : C.papel, anchor: "middle" }))
      g.push(parrafo(x + w / 2, y + 90, p, w - 24, { size: 22, peso: 700, color: final ? C.papel : C.acento, anchor: "middle" }).svg)
      if (i < pasos.length - 1) g.push(linea(`M${x + w + 2} ${y + h / 2}L${x + w + gap - 4} ${y + h / 2}`, { color: C.acento, sw: 4, flecha: "acento" }))
    })
    g.push(t(56, 340, "EN TIERRA", { size: 20, peso: 700, color: C.suave, espaciado: 1.5 }))
    g.push(t(56 + 3 * (w + gap), 340, "EN VUELO", { size: 20, peso: 700, color: C.suave, espaciado: 1.5 }))
    // La vuelta: la predicción se rehace en cada fuel check.
    const x3 = 56 + 3 * (w + gap) + w / 2
    const x4 = 56 + 4 * (w + gap) + w / 2
    g.push(`<path d="M${x4} ${y + h + 8}C${x4} ${y + h + 110} ${x3} ${y + h + 110} ${x3} ${y + h + 14}" fill="none" stroke="${C.acento2}" stroke-width="4" marker-end="url(#f-acento2)"/>`)
    g.push(t((x3 + x4) / 2, y + h + 140, "la predicción se actualiza durante todo el vuelo", { size: 22, peso: 700, color: C.acento2, anchor: "middle" }))
    return lienzo({ ...this, desc: this.alt, sub: "Empieza en el despacho y termina con la reserva final intacta en la pista", cuerpo: g.join("") })
  },
}

// ─── IMG-C02 ────────────────────────────────────────────────────────────────

const C02 = {
  codigo: "IMG-C02",
  alto: 900,
  titulo: "Utilizable y no utilizable",
  alt: "Corte esquemático de los tanques de un bimotor de fuselaje estrecho: ala izquierda, tanque central y ala derecha. Casi todo el volumen es combustible utilizable; abajo, junto a los puntos de succión de las bombas, una franja de combustible no utilizable. Una llave marca que la suma de los dos es el combustible total.",
  svg() {
    const g = []
    const yb = 640
    // Ala izquierda, centro y ala derecha, con diedro.
    const ala = (x1, x2, alto1, alto2, dir) => {
      const ya1 = yb - (dir < 0 ? 60 : 0)
      const ya2 = yb - (dir < 0 ? 0 : 60)
      return { d: `M${x1} ${ya1}L${x2} ${ya2}L${x2} ${ya2 - alto2}L${x1} ${ya1 - alto1}Z`, x1, x2, ya1, ya2, alto1, alto2 }
    }
    const izq = ala(120, 560, 90, 170, -1)
    const der = ala(1040, 1480, 170, 90, 1)
    const tanques = [izq, der]
    for (const tq of tanques) {
      g.push(`<path d="${tq.d}" fill="${C.tinte}" stroke="${C.acento}" stroke-width="3"/>`)
      // Franja no utilizable, abajo, pegada al fondo.
      g.push(`<path d="M${tq.x1} ${tq.ya1}L${tq.x2} ${tq.ya2}L${tq.x2} ${tq.ya2 - 18}L${tq.x1} ${tq.ya1 - 18}Z" fill="${C.rojo}" opacity="0.75"/>`)
      g.push(`<path d="M${tq.x1} ${tq.ya1 - 18}L${tq.x2} ${tq.ya2 - 18}L${tq.x2} ${tq.ya2 - tq.alto2 + 14}L${tq.x1} ${tq.ya1 - tq.alto1 + 14}Z" fill="${C.acento2}" opacity="0.8"/>`)
    }
    g.push(`<rect x="600" y="${yb - 230}" width="400" height="230" rx="10" fill="${C.tinte}" stroke="${C.acento}" stroke-width="3"/>`)
    g.push(`<rect x="600" y="${yb - 18}" width="400" height="18" fill="${C.rojo}" opacity="0.75"/>`)
    g.push(`<rect x="600" y="${yb - 214}" width="400" height="196" fill="${C.acento2}" opacity="0.8"/>`)
    for (const x of [540, 800, 1060]) {
      g.push(`<circle cx="${x}" cy="${yb - 6}" r="9" fill="${C.tinta}"/>`)
    }
    g.push(t(360, yb + 60, "ALA IZQUIERDA", { size: 20, peso: 700, color: C.suave, anchor: "middle", espaciado: 1 }))
    g.push(t(800, yb + 60, "TANQUE CENTRAL", { size: 20, peso: 700, color: C.suave, anchor: "middle", espaciado: 1 }))
    g.push(t(1260, yb + 60, "ALA DERECHA", { size: 20, peso: 700, color: C.suave, anchor: "middle", espaciado: 1 }))
    g.push(linea(`M800 ${yb + 80}L800 ${yb + 10}`, { color: C.tinta, sw: 2 }))
    g.push(t(800, yb + 112, "puntos de succión de las bombas", { size: 22, color: C.tinta, anchor: "middle" }))
    // Rótulos.
    g.push(pildora(80, 200, "Combustible utilizable (usable fuel)", { size: 24, fill: C.acento2, color: C.papel }).svg)
    g.push(linea(`M300 222L420 ${yb - 110}`, { color: C.acento2, sw: 2.5 }))
    g.push(pildora(1520, 200, "No utilizable (unusable fuel)", { size: 24, anchor: "end", fill: C.rojoSuave, color: C.rojo }).svg)
    g.push(linea(`M1300 222L1300 ${yb - 70}`, { color: C.rojo, sw: 2.5 }))
    g.push(t(800, 260, "Combustible total (total fuel) = utilizable + no utilizable", { size: 24, peso: 700, color: C.acento, anchor: "middle" }))
    g.push(t(800, 842, "La norma se escribe en combustible utilizable.", { size: 22, color: C.suave, anchor: "middle" }))
    return lienzo({ ...this, desc: this.alt, sub: "Lo que los motores pueden consumir y lo que se queda en el fondo", cuerpo: g.join("") })
  },
}

// ─── IMG-C03 ────────────────────────────────────────────────────────────────

const COMPONENTES = [
  ["Reserva final", "Final reserve", 1150],
  ["Adicional", "Additional", 0],
  ["Alterno", "Alternate", 1100],
  ["Contingencias", "Contingency", 200],
  ["Trayecto", "Trip", 3000],
  ["Discrecional", "Extra", 300],
  ["Rodaje", "Taxi", 200],
]

const C03 = {
  codigo: "IMG-C03",
  ancho: 900,
  alto: 1400,
  anchoMax: 400,
  titulo: "Qué hay en el block fuel",
  alt: "Barra vertical acumulada, de abajo hacia arriba: reserva final, 1.150 kg, protegida; adicional, 0 kg; alterno, 1.100 kg; contingencias, 200 kg; trayecto, 3.000 kg; discrecional, 300 kg; y rodaje, 200 kg. El total es el block fuel, 5.950 kg. Una llave agrupa trayecto, contingencias, alterno, reserva final y adicional: el combustible requerido para despegar.",
  pie: REF,
  svg() {
    const g = []
    const [x, w, base] = [300, 220, 1290]
    const escala = 1000 / 5950
    let y = base
    const colores = { "Reserva final": C.rojo, Adicional: C.gris, Alterno: C.acento, Contingencias: C.acento2, Trayecto: C.claro, Discrecional: C.tinte2, Rodaje: C.grisClaro }
    const bordes = {}
    for (const [es, en, v] of COMPONENTES) {
      const h = Math.max(v * escala, 16)
      y -= h
      bordes[es] = [y, y + h]
      g.push(`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${colores[es]}" stroke="${C.papel}" stroke-width="2"${v === 0 ? ` stroke-dasharray="6 4"` : ""}/>`)
      const oscuro = ["Reserva final", "Alterno"].includes(es)
      // Rodaje y discrecional, arriba y finos, van a la derecha: ahí no llega la llave.
      const derecha = es === "Rodaje" || es === "Discrecional"
      if (derecha) g.push(t(x + w + 20, y + h / 2 + 7, `${es} · ${en} · ${kg(v)}`, { size: 20, peso: 700, color: C.tinta }))
      else g.push(tl(x - 20, y + h / 2 - 4, [es, `${en} · ${kg(v)}`], { size: 20, peso: 700, color: C.tinta, anchor: "end", lh: 24 }))
      if (es === "Reserva final") g.push(t(x + w / 2, y + h / 2 + 8, "PROTEGIDA", { size: 22, peso: 700, color: oscuro ? C.papel : C.tinta, anchor: "middle", espaciado: 2 }))
    }
    g.push(linea(`M${x - 10} ${y - 20}L${x + w + 10} ${y - 20}`, { color: C.acento, sw: 3 }))
    g.push(t(x + w / 2, y - 36, `Block fuel · ${kg(5950)}`, { size: 30, peso: 700, color: C.acento, anchor: "middle" }))
    // La llave del requerido para despegar.
    const [yTop] = bordes.Trayecto
    const [, yBot] = bordes["Reserva final"]
    const bx = x + w + 24
    g.push(`<path d="M${bx} ${yTop}Q${bx + 24} ${yTop} ${bx + 24} ${yTop + 24}L${bx + 24} ${(yTop + yBot) / 2 - 20}Q${bx + 24} ${(yTop + yBot) / 2} ${bx + 44} ${(yTop + yBot) / 2}Q${bx + 24} ${(yTop + yBot) / 2} ${bx + 24} ${(yTop + yBot) / 2 + 20}L${bx + 24} ${yBot - 24}Q${bx + 24} ${yBot} ${bx} ${yBot}" fill="none" stroke="${C.acento}" stroke-width="3.5"/>`)
    g.push(tl(bx + 56, (yTop + yBot) / 2 - 30, ["combustible", "requerido para", "despegar", "121.2645 (d)"], { size: 22, peso: 700, color: C.acento, lh: 28 }))
    return lienzo({ ...this, desc: this.alt, sub: "Siete componentes, de abajo arriba", cuerpo: g.join("") })
  },
}

// ─── IMG-C04 ────────────────────────────────────────────────────────────────

const C04 = {
  codigo: "IMG-C04",
  alto: 900,
  titulo: "La suma del block fuel",
  alt: "Siete bloques con su nombre en español y en inglés y el signo más entre ellos: rodaje 200, trayecto 3.000, contingencias 200, alterno 1.100, reserva final 1.150, adicional 0 y discrecional 300, que desembocan en el block fuel, 5.950 kg. Debajo, en gris: block fuel menos rodaje es el combustible de despegue, 5.750 kg; y combustible de despegue menos trayecto es el combustible previsto al aterrizaje, 2.750 kg.",
  pie: REF,
  svg() {
    const g = []
    const orden = [
      ["Rodaje", "Taxi", 200],
      ["Trayecto", "Trip", 3000],
      ["Contingencias", "Contingency", 200],
      ["Alterno", "Alternate", 1100],
      ["Reserva final", "Final reserve", 1150],
      ["Adicional", "Additional", 0],
      ["Discrecional", "Extra", 300],
    ]
    const [w, gap] = [176, 42]
    orden.forEach(([es, en, v], i) => {
      const x = 56 + i * (w + gap)
      const reserva = es === "Reserva final"
      g.push(caja(x, 200, w, 170, { fill: reserva ? C.rojoSuave : C.tinte, stroke: reserva ? C.rojo : C.acento2, sw: 3, rx: 14 }))
      g.push(parrafo(x + w / 2, 244, es, w - 16, { size: 22, peso: 700, color: reserva ? C.rojo : C.acento, anchor: "middle" }).svg)
      g.push(t(x + w / 2, 306, en, { size: 18, color: C.suave, anchor: "middle", italica: true }))
      g.push(t(x + w / 2, 346, v.toLocaleString("es-CO"), { size: 28, peso: 700, anchor: "middle" }))
      if (i < orden.length - 1) g.push(t(x + w + gap / 2, 300, "+", { size: 40, peso: 700, color: C.acento, anchor: "middle" }))
    })
    g.push(linea("M800 390L800 440", { color: C.acento, sw: 5, flecha: "acento" }))
    g.push(caja(520, 450, 560, 120, { fill: C.acento, stroke: null, rx: 18 }))
    g.push(t(800, 506, "BLOCK FUEL", { size: 34, peso: 700, color: C.papel, anchor: "middle", espaciado: 2 }))
    g.push(t(800, 548, kg(5950), { size: 30, peso: 700, color: C.tinte, anchor: "middle" }))
    g.push(t(800, 660, `Block fuel − rodaje = combustible de despegue · 5.950 − 200 = ${kg(5750)}`, { size: 24, color: C.suave, anchor: "middle" }))
    g.push(t(800, 710, `Combustible de despegue − trayecto = combustible previsto al aterrizaje · 5.750 − 3.000 = ${kg(2750)}`, { size: 24, color: C.suave, anchor: "middle" }))
    return lienzo({ ...this, desc: this.alt, sub: "Siete sumandos y un total", cuerpo: g.join("") })
  },
}

// ─── IMG-C05 ────────────────────────────────────────────────────────────────

const C05 = {
  codigo: "IMG-C05",
  alto: 700,
  titulo: "Qué cubre el trip fuel",
  alt: "Perfil de un vuelo de origen a destino. El rodaje va en gris, fuera del trip fuel. Despegue, ascenso, crucero con un escalón de nivel, descenso, aproximación y aterrizaje van dentro de una llave rotulada trip fuel. Desde la aproximación, en línea de puntos, una frustrada rotulada: no es trip, va en el combustible para el alterno.",
  svg() {
    const g = []
    const suelo = 560
    g.push(linea(`M56 ${suelo}L1544 ${suelo}`, { color: C.relieveLinea, sw: 3 }))
    g.push(linea(`M80 ${suelo - 4}L200 ${suelo - 4}`, { color: C.gris, sw: 7 }))
    g.push(t(140, suelo + 36, "rodaje", { size: 22, peso: 700, color: C.gris, anchor: "middle" }))
    const perfil = [[200, suelo - 4], [480, 290], [760, 290], [800, 250], [1150, 250], [1370, 480], [1440, suelo - 4]]
    g.push(linea(perfil.map(([x, y], i) => `${i ? "L" : "M"}${x} ${y}`).join(""), { color: C.acento, sw: 5 }))
    const fases = [[420, suelo - 30, "despegue y ascenso", "start"], [620, 276, "crucero", "middle"], [780, 236, "escalón", "middle"], [1000, 236, "crucero", "middle"], [1290, 356, "descenso", "start"], [1380, suelo - 20, "aproximación y aterrizaje", "end"]]
    for (const [x, y, rot, anchor] of fases) g.push(t(x, y, rot, { size: 20, peso: 700, color: C.acento, anchor }))
    g.push(`<path d="M1400 ${suelo - 54}C1430 ${suelo - 80} 1470 ${suelo - 140} 1520 ${suelo - 170}" fill="none" stroke="${C.rojo}" stroke-width="3.5" stroke-dasharray="4 8" marker-end="url(#f-rojo)"/>`)
    g.push(tl(1540, suelo - 300, ["no es trip: va en el", "combustible para el alterno"], { size: 20, peso: 700, color: C.rojo, anchor: "end", lh: 24 }))
    // Llave del trip.
    const [a, b, y] = [200, 1440, 180]
    g.push(`<path d="M${a} ${y + 20}Q${a} ${y} ${a + 20} ${y}L${(a + b) / 2 - 20} ${y}Q${(a + b) / 2} ${y} ${(a + b) / 2} ${y - 20}Q${(a + b) / 2} ${y} ${(a + b) / 2 + 20} ${y}L${b - 20} ${y}Q${b} ${y} ${b} ${y + 20}" fill="none" stroke="${C.acento}" stroke-width="3.5"/>`)
    g.push(t((a + b) / 2, y - 30, "Trip fuel", { size: 28, peso: 700, color: C.acento, anchor: "middle", italica: true }))
    g.push(t(140, 200, "ORIGEN", { size: 20, peso: 700, color: C.suave, anchor: "middle" }))
    g.push(t(1440, suelo + 36, "DESTINO", { size: 20, peso: 700, color: C.suave, anchor: "middle" }))
    return lienzo({ ...this, desc: this.alt, sub: "Del despegue al aterrizaje en destino, y nada más", cuerpo: g.join("") })
  },
}

// ─── IMG-C06 ────────────────────────────────────────────────────────────────

function icono(tipo, x, y) {
  if (tipo === "tormenta") return `<path d="M${x - 30} ${y + 8}C${x - 44} ${y + 8} ${x - 44} ${y - 16} ${x - 26} ${y - 16}C${x - 22} ${y - 34} ${x + 6} ${y - 36} ${x + 12} ${y - 20}C${x + 30} ${y - 26} ${x + 40} ${y - 4} ${x + 28} ${y + 8}Z" fill="${C.gris}"/><path d="M${x - 2} ${y + 10}L${x - 12} ${y + 30}L${x} ${y + 28}L${x - 8} ${y + 46}L${x + 12} ${y + 22}L${x} ${y + 24}L${x + 8} ${y + 10}Z" fill="${C.ambar}"/>`
  if (tipo === "viento") return linea(`M${x + 34} ${y - 10}L${x - 30} ${y - 10}M${x + 34} ${y + 10}L${x - 20} ${y + 10}`, { color: C.suave, sw: 4, flecha: "suave" })
  return t(x, y + 6, "FL", { size: 24, peso: 700, color: C.suave, anchor: "middle" }) + linea(`M${x + 26} ${y - 16}L${x + 26} ${y + 18}`, { color: C.suave, sw: 4, flecha: "suave" })
}

const C06 = {
  codigo: "IMG-C06",
  alto: 900,
  titulo: "Para qué está la contingencia",
  alt: "Gráfico de combustible a bordo contra distancia con dos curvas: la planificada del OFP y la real, que se separa hacia abajo en tres eventos marcados: un desvío por tormenta, viento de cara mayor al pronosticado y un nivel de vuelo más bajo por tránsito. La banda entre las dos curvas está sombreada: el consumo cubierto por la contingencia.",
  svg() {
    const g = []
    const [x0, y0, x1, y1] = [200, 780, 1400, 180]
    g.push(linea(`M${x0} ${y0}L${x1} ${y0}`, { color: C.tinta, sw: 3, flecha: "tinta" }))
    g.push(linea(`M${x0} ${y0}L${x0} ${y1}`, { color: C.tinta, sw: 3, flecha: "tinta" }))
    g.push(t(x1, y0 + 44, "distancia", { size: 24, peso: 700, anchor: "end" }))
    g.push(tl(x0 - 20, y1 + 10, ["combustible", "a bordo"], { size: 22, peso: 700, anchor: "end", lh: 26 }))
    const plan = (x) => 240 + (x - x0) * 0.3
    const eventos = [[480, 34, "tormenta", "desvío por tormenta"], [800, 36, "viento", "viento de cara mayor"], [1100, 30, "fl", "nivel más bajo por tránsito"]]
    const real = []
    let caida = 0
    for (let x = x0; x <= 1360; x += 10) {
      for (const [xe, d] of eventos) if (x === xe) caida += d
      real.push([x, plan(x) + caida + (x > 480 ? Math.min(20, (x - 480) * 0.05) : 0)])
    }
    const pathReal = real.map(([x, y], i) => `${i ? "L" : "M"}${x} ${y.toFixed(1)}`).join("")
    g.push(`<path d="M${x0} ${plan(x0)}L1360 ${plan(1360)}${real.slice().reverse().map(([x, y]) => `L${x} ${y.toFixed(1)}`).join("")}Z" fill="${C.tinte2}"/>`)
    g.push(linea(`M${x0} ${plan(x0)}L1360 ${plan(1360)}`, { color: C.acento, sw: 5 }))
    g.push(`<path d="${pathReal}" fill="none" stroke="${C.rojo}" stroke-width="4"/>`)
    g.push(t(1360, plan(1360) - 34, "planificado (OFP)", { size: 22, peso: 700, color: C.acento, anchor: "end" }))
    g.push(t(1360, real[real.length - 1][1] + 36, "real", { size: 22, peso: 700, color: C.rojo, anchor: "end" }))
    for (const [xe, , tipo, rot] of eventos) {
      g.push(icono(tipo, xe, 200))
      g.push(t(xe, 262, rot, { size: 20, peso: 700, color: C.suave, anchor: "middle" }))
      g.push(linea(`M${xe} 274L${xe} ${plan(xe) - 6}`, { color: C.gris, sw: 2, dash: "3 6" }))
    }
    g.push(pildora(900, plan(900) + 70, "consumo cubierto por la contingencia", { size: 22, anchor: "middle", fill: C.papel, color: C.acento, stroke: C.acento }).svg)
    return lienzo({ ...this, desc: this.alt, sub: "Lo imprevisto se paga con este componente", cuerpo: g.join("") })
  },
}

// ─── IMG-C07 ────────────────────────────────────────────────────────────────

const C07 = {
  codigo: "IMG-C07",
  alto: 900,
  titulo: "Las cinco partes del alternate fuel",
  alt: "Perfil y planta del tramo del destino al alterno, lado a lado, con los tramos numerados: 1, frustrada en el destino; 2, ascenso; 3, crucero al alterno; 4, descenso; y 5, aproximación y aterrizaje en el alterno. Sobre la pista del alterno, un bloque rojo: aterriza con la reserva final intacta.",
  svg() {
    const g = []
    // Perfil.
    g.push(caja(56, 160, 900, 640, { rx: 18 }))
    g.push(t(84, 206, "PERFIL", { size: 20, peso: 700, color: C.suave, espaciado: 1.5 }))
    const suelo = 700
    g.push(linea(`M80 ${suelo}L930 ${suelo}`, { color: C.relieveLinea, sw: 3 }))
    g.push(`<rect x="120" y="${suelo - 6}" width="110" height="8" fill="${C.tinta}"/><rect x="780" y="${suelo - 6}" width="110" height="8" fill="${C.tinta}"/>`)
    g.push(t(175, suelo + 34, "DESTINO", { size: 20, peso: 700, anchor: "middle" }))
    g.push(t(835, suelo + 34, "ALTERNO", { size: 20, peso: 700, anchor: "middle" }))
    const tramo = [[80, suelo - 130], [200, suelo - 40], [260, suelo - 70], [420, 330], [620, 330], [760, suelo - 60], [800, suelo - 4]]
    g.push(linea(tramo.map(([x, y], i) => `${i ? "L" : "M"}${x} ${y}`).join(""), { color: C.acento, sw: 5 }))
    const nums = [[200, suelo - 90, 1], [330, 470, 2], [520, 300, 3], [690, 470, 4], [800, suelo - 70, 5]]
    for (const [x, y, k] of nums) {
      g.push(`<circle cx="${x}" cy="${y}" r="20" fill="${C.acento}"/>`)
      g.push(t(x, y + 8, String(k), { size: 22, peso: 700, color: C.papel, anchor: "middle" }))
    }
    g.push(`<rect x="780" y="${suelo - 40}" width="110" height="34" rx="6" fill="${C.rojo}"/>`)
    g.push(tl(835, suelo - 120, ["aterriza con la", "reserva final intacta"], { size: 20, peso: 700, color: C.rojo, anchor: "middle", lh: 24 }))
    // Planta.
    g.push(caja(990, 160, 554, 640, { rx: 18 }))
    g.push(t(1018, 206, "PLANTA", { size: 20, peso: 700, color: C.suave, espaciado: 1.5 }))
    g.push(`<rect x="1060" y="620" width="120" height="14" fill="${C.tinta}"/>`)
    g.push(`<rect x="1380" y="300" width="14" height="120" fill="${C.tinta}"/>`)
    g.push(`<path d="M1040 627L1180 627C1230 627 1250 600 1260 560L1340 380C1350 350 1370 320 1387 312" fill="none" stroke="${C.acento}" stroke-width="5" marker-end="url(#f-acento)"/>`)
    g.push(t(1120, 668, "DESTINO", { size: 20, peso: 700, anchor: "middle" }))
    g.push(t(1440, 460, "ALTERNO", { size: 20, peso: 700, anchor: "middle" }))
    const leyenda = ["1 · frustrada en el destino", "2 · ascenso", "3 · crucero al alterno", "4 · descenso", "5 · aproximación y aterrizaje"]
    g.push(tl(1018, 250, leyenda, { size: 20, color: C.tinta, lh: 28 }))
    return lienzo({ ...this, desc: this.alt, sub: "Desde la frustrada en destino hasta la toma en el alterno", cuerpo: g.join("") })
  },
}

// ─── IMG-C08 ────────────────────────────────────────────────────────────────

const C08 = {
  codigo: "IMG-C08",
  ancho: 900,
  alto: 1400,
  anchoMax: 400,
  titulo: "La reserva final es una barrera",
  alt: "Indicador de combustible vertical con tres zonas. Arriba, en azul, el combustible para operar: trayecto, contingencias y discrecional. En el medio, el combustible para el alterno. Abajo, en rojo, la reserva final, que no se planifica para consumirse, separada por una línea gruesa como barrera. Al lado, los avisos: pedir demoras a la altura de alterno más reserva final; combustible mínimo cerca de la barrera; y MAYDAY combustible dentro de la zona roja.",
  svg() {
    const g = []
    const [x, w] = [180, 200]
    const zonas = [
      [200, 760, C.acento2, "Para operar", "trayecto, contingencias, discrecional", C.papel],
      [760, 1020, C.acento, "Alterno", "", C.papel],
      [1020, 1280, C.rojo, "RESERVA FINAL", "no se planifica para consumirse", C.papel],
    ]
    for (const [a, b, color, tit, sub, col] of zonas) {
      g.push(`<rect x="${x}" y="${a}" width="${w}" height="${b - a}" fill="${color}"/>`)
      g.push(t(x + w / 2, (a + b) / 2 - (sub ? 10 : -8), tit, { size: 24, peso: 700, color: col, anchor: "middle" }))
      if (sub) g.push(parrafo(x + w / 2, (a + b) / 2 + 20, sub, w - 24, { size: 18, color: col, anchor: "middle" }).svg)
    }
    g.push(`<rect x="${x}" y="200" width="${w}" height="1080" fill="none" stroke="${C.tinta}" stroke-width="4" rx="6"/>`)
    g.push(`<rect x="${x - 30}" y="1012" width="${w + 60}" height="16" rx="4" fill="${C.tinta}"/>`)
    const avisos = [
      [760, "Pedir demoras", "cuando puede quedar menos que alterno + reserva final", C.acento],
      [1000, "COMBUSTIBLE MÍNIMO", "cualquier cambio deja bajo la reserva final", C.ambar],
      [1150, "MAYDAY COMBUSTIBLE", "aterrizaje calculado bajo la reserva final", C.rojo],
    ]
    for (const [y, tit, sub, color] of avisos) {
      g.push(linea(`M${x + w + 34} ${y}L${x + w + 70} ${y}`, { color, sw: 4 }))
      g.push(t(x + w + 84, y + 2, tit, { size: 24, peso: 700, color }))
      g.push(parrafo(x + w + 84, y + 32, sub, 400, { size: 20, color: C.tinta }).svg)
    }
    return lienzo({ ...this, desc: this.alt, sub: "Tres zonas y tres avisos", cuerpo: g.join("") })
  },
}

export const PLANIFICACION = [C01, C02, C03, C04, C05, C06, C07, C08]
