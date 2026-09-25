/**
 * IMG-C11 a IMG-C20: el tankering, el fuel check, los avisos, las esperas, el
 * alterno y el punto de decisión.
 */
import { AMARILLO, C, avionLado, caja, linea, lienzo, parrafo, pildora, t, tl } from "../../figuras/lib.mjs"

const kg = (v) => `${v.toLocaleString("es-CO")} kg`

// ─── IMG-C11 (tankering) ────────────────────────────────────────────────────

function perfilTank(oy, tank) {
  const g = []
  g.push(caja(56, oy, 1488, 300, { rx: 16 }))
  g.push(t(84, oy + 44, tank ? "CON TANKERING" : "VUELO NORMAL", { size: 22, peso: 700, color: C.acento, espaciado: 1.5 }))
  const suelo = oy + 250
  g.push(linea(`M240 ${suelo}L400 ${oy + 110}L1200 ${oy + 110}L1360 ${suelo}`, { color: C.gris, sw: 3, dash: "10 8" }))
  // Combustible al salir y al llegar, como barras.
  const barra = (x, v, color, rot) => {
    const h = v / 40
    g.push(`<rect x="${x}" y="${suelo - h}" width="70" height="${h}" rx="4" fill="${color}"/>`)
    g.push(t(x + 35, suelo + 30, rot, { size: 20, peso: 700, color: C.tinta, anchor: "middle" }))
  }
  barra(130, tank ? 7600 : 5750, C.acento2, "al despegar")
  if (tank) g.push(`<rect x="130" y="${suelo - 7600 / 40}" width="70" height="${1850 / 40}" rx="4" fill="${C.acento}"/>`)
  barra(1400, tank ? 4250 : 2750, C.acento2, "al llegar")
  if (tank) g.push(`<rect x="1400" y="${suelo - 4250 / 40}" width="70" height="${1500 / 40}" rx="4" fill="${C.acento}"/>`)
  g.push(avionLado(800, oy + 102, 0.9))
  g.push(pildora(800, oy + 170, tank ? "consumo mayor: el avión va más pesado" : "consumo del trayecto", { size: 20, anchor: "middle", fill: tank ? C.rojoSuave : C.tinte, color: tank ? C.rojo : C.acento }).svg)
  if (tank) {
    g.push(linea(`M230 ${suelo - 150}L300 ${suelo - 150}`, { color: C.acento, sw: 3, flecha: "acento" }))
    g.push(t(310, suelo - 144, "peso mayor al despegue", { size: 20, peso: 700, color: C.acento }))
    g.push(tl(1386, oy + 70, ["llega menos de lo que se cargó de más:", "la diferencia se quemó para transportarlo"], { size: 20, peso: 700, color: C.rojo, anchor: "end", lh: 24 }))
  }
  return g.join("")
}

const C11 = {
  codigo: "IMG-C11",
  alto: 900,
  titulo: "Transportar combustible también consume combustible",
  alt: "Dos perfiles del mismo trayecto. Arriba, el vuelo normal, con el combustible requerido y el consumo del trayecto. Abajo, con tankering: el mismo avión con un bloque adicional de combustible, más peso al despegue y más consumo; al llegar, el bloque que sobra es menor que el que se cargó de más, porque la diferencia se quemó para transportarlo.",
  pie: "Esquema cualitativo: cuánto se quema por transportar depende del avión, del trayecto y del peso.",
  svg() {
    return lienzo({ ...this, desc: this.alt, sub: "Lo que se carga de más no llega entero", cuerpo: perfilTank(160, false) + perfilTank(490, true) })
  },
}

// ─── IMG-C12 (fuel check) ───────────────────────────────────────────────────

const C12 = {
  codigo: "IMG-C12",
  alto: 900,
  titulo: "Un fuel check, renglón por renglón",
  alt: "Tabla de seguimiento con formato de OFP: waypoint, hora, combustible planificado, combustible a bordo, diferencia y combustible usado, en cinco puntos de la ruta. Las diferencias crecen de menos 40 a menos 200 kg y la columna de diferencia pasa de verde a ámbar. Debajo, la comprobación: combustible a bordo más combustible usado igual al combustible inicial.",
  pie: "Cifras didácticas, con el combustible de despegue del vuelo de referencia (5.750 kg).",
  svg() {
    const g = []
    const cols = [["Waypoint", 90], ["Hora", 330], ["Planned (EFOB)", 510], ["Actual (FOB)", 760], ["Difference", 1010], ["Fuel Used", 1260]]
    g.push(caja(56, 170, 1488, 520, { fill: C.papel, stroke: C.tinta, sw: 2, rx: 4 }))
    g.push(`<rect x="57" y="171" width="1486" height="70" fill="${C.grisClaro}"/>`)
    for (const [n, x] of cols) g.push(t(x, 216, n, { size: 22, peso: 700, color: C.suave }))
    const filas = [
      ["KILAB", "1432", 5100, 5060, 690],
      ["MORUS", "1451", 4480, 4400, 1350],
      ["TENPA", "1510", 3860, 3740, 2010],
      ["VUDEX", "1529", 3240, 3080, 2670],
      ["SARIP", "1548", 2950, 2750, 3000],
    ]
    const colorDif = [C.verde, C.verde, AMARILLO.fuerte, C.ambar, C.ambar]
    const fondoDif = [C.verdeSuave, C.verdeSuave, AMARILLO.suave, C.ambarSuave, C.ambarSuave]
    filas.forEach(([wp, h, plan, real, usado], i) => {
      const y = 290 + i * 80
      const dif = real - plan
      g.push(linea(`M56 ${y + 26}L1544 ${y + 26}`, { color: C.regla, sw: 1.5 }))
      g.push(t(90, y, wp, { size: 26, peso: 700 }))
      g.push(t(330, y, h, { size: 26 }))
      g.push(t(510, y, plan.toLocaleString("es-CO"), { size: 26 }))
      g.push(t(760, y, real.toLocaleString("es-CO"), { size: 26 }))
      g.push(`<rect x="996" y="${y - 32}" width="200" height="44" rx="8" fill="${fondoDif[i]}"/>`)
      g.push(t(1010, y, `${dif}`, { size: 26, peso: 700, color: colorDif[i] }))
      g.push(t(1260, y, usado.toLocaleString("es-CO"), { size: 26 }))
    })
    g.push(caja(56, 720, 1488, 90, { fill: C.tinte, stroke: null, rx: 14 }))
    g.push(t(90, 776, "FOB + FU = FOB inicial   ·   2.750 + 3.000 = 5.750 kg", { size: 28, peso: 700, color: C.acento }))
    g.push(t(1510, 776, "✓ cuadra", { size: 26, peso: 700, color: C.verde, anchor: "end" }))
    return lienzo({ ...this, desc: this.alt, sub: "La diferencia se mira en cada punto; la suma confirma que no hay fuga", cuerpo: g.join("") })
  },
}

// ─── IMG-C16 (minimum fuel) ─────────────────────────────────────────────────

const ESTADOS = [
  ["Situación normal", "La predicción mantiene alterno + reserva final.", "", C.verde, C.verdeSuave],
  ["Reducción de opciones", "Puede quedar menos que alterno + reserva final: pedir información de demoras.", "121.2553 (b)(1)", AMARILLO.fuerte, AMARILLO.suave],
  ["COMBUSTIBLE MÍNIMO", "Obligado a un aeródromo; cualquier cambio deja bajo la reserva final.", "121.2553 (b)(2)", C.ambar, C.ambarSuave],
  ["MAYDAY COMBUSTIBLE", "Aterrizaje calculado bajo la reserva final.", "121.2553 (b)(3)", C.rojo, C.rojoSuave],
]

const C16 = {
  codigo: "IMG-C16",
  alto: 900,
  titulo: "De normal a MAYDAY, paso a paso",
  alt: "Cuatro cajas de izquierda a derecha, cada una de un color: situación normal, en verde, la predicción mantiene alterno más reserva final; reducción de opciones, en amarillo, pedir información de demoras, 121.2553 (b)(1); combustible mínimo, en ámbar, obligado a un aeródromo y cualquier cambio deja bajo la reserva final, 121.2553 (b)(2); y MAYDAY combustible, en rojo, aterrizaje calculado bajo la reserva final, 121.2553 (b)(3).",
  svg() {
    const g = []
    const [w, gap] = [340, 42]
    ESTADOS.forEach(([tit, cond, num, color, fondo], i) => {
      const x = 56 + i * (w + gap)
      g.push(caja(x, 250, w, 150, { fill: fondo, stroke: color, sw: 4, rx: 16 }))
      g.push(parrafo(x + w / 2, 318, tit, w - 30, { size: 28, peso: 700, color, anchor: "middle" }).svg)
      g.push(parrafo(x + 10, 460, cond, w - 20, { size: 22, color: C.tinta }).svg)
      if (num) g.push(t(x + 10, 640, num, { size: 22, peso: 700, color }))
      if (i < ESTADOS.length - 1) g.push(linea(`M${x + w + 4} 325L${x + w + gap - 6} 325`, { color: C.tinta, sw: 5, flecha: "tinta" }))
    })
    g.push(t(56, 760, "Los avisos se dan cuando la predicción cruza cada umbral, no cuando el combustible ya se acabó.", { size: 24, color: C.suave }))
    return lienzo({ ...this, desc: this.alt, sub: "Cuatro estados, tres avisos del RAC 121", cuerpo: g.join("") })
  },
}

// ─── IMG-C17 (mayday) ───────────────────────────────────────────────────────

const C17 = {
  codigo: "IMG-C17",
  alto: 600,
  titulo: "Tres estados, tres maneras de decirlo",
  alt: "Escala horizontal de tres franjas. Normal, en verde: la predicción conserva alterno más reserva final. Combustible mínimo, en ámbar: obligado a un aeródromo, cualquier cambio deja bajo la reserva final, y no es emergencia; se dice COMBUSTIBLE MÍNIMO o MINIMUM FUEL, 121.2553 (b)(2). MAYDAY combustible, en rojo: aterrizaje calculado bajo la reserva final, emergencia; se dice MAYDAY, MAYDAY, MAYDAY, COMBUSTIBLE, 121.2553 (b)(3).",
  svg() {
    const g = []
    const franjas = [
      ["NORMAL", "Conserva alterno + reserva final.", "Sin llamada: se vigila la predicción.", C.verde, C.verdeSuave],
      ["COMBUSTIBLE MÍNIMO · MINIMUM FUEL", "Obligado a un aeródromo. No es emergencia.", "«COMBUSTIBLE MÍNIMO» · 121.2553 (b)(2)", C.ambar, C.ambarSuave],
      ["MAYDAY COMBUSTIBLE · MAYDAY FUEL", "Aterrizaje calculado bajo la reserva final. Emergencia.", "«MAYDAY, MAYDAY, MAYDAY, COMBUSTIBLE» · 121.2553 (b)(3)", C.rojo, C.rojoSuave],
    ]
    const w = 496
    franjas.forEach(([tit, cond, frase, color, fondo], i) => {
      const x = 56 + i * w
      g.push(`<rect x="${x}" y="170" width="${w - 6}" height="90" fill="${color}"${i === 0 ? ' rx="14"' : i === 2 ? ' rx="14"' : ""}/>`)
      g.push(parrafo(x + (w - 6) / 2, 208, tit, w - 40, { size: 22, peso: 700, color: C.papel, anchor: "middle" }).svg)
      g.push(`<rect x="${x}" y="280" width="${w - 6}" height="220" rx="14" fill="${fondo}"/>`)
      g.push(parrafo(x + 20, 322, cond, w - 46, { size: 22, color: C.tinta }).svg)
      g.push(parrafo(x + 20, 420, frase, w - 46, { size: 21, peso: 700, color }).svg)
    })
    return lienzo({ ...this, desc: this.alt, sub: "Solo el último es una emergencia", cuerpo: g.join("") })
  },
}

// ─── IMG-C18 (espera) ───────────────────────────────────────────────────────

const C18 = {
  codigo: "IMG-C18",
  alto: 900,
  titulo: "Cuánto tiempo aguanta la espera",
  alt: "Vista en planta de un circuito de espera junto a un reloj de arena. Arriba del reloj, el combustible al entrar: 2.950 kg. Abajo, el combustible para abandonar la espera hacia el alterno: 2.250 kg. Entre los dos, el tiempo disponible, 17 minutos, y una flecha que sale de la espera hacia el alterno a la hora límite. Cifras ilustrativas.",
  pie: "Cifras ilustrativas: (2.950 − 2.250) ÷ 40 kg/min = 17,5 min; se toman 17.",
  svg() {
    const g = []
    // Circuito de espera.
    g.push(`<path d="M260 380L620 380A90 90 0 0 1 620 560L260 560A90 90 0 0 1 260 380Z" fill="none" stroke="${C.acento}" stroke-width="5"/>`)
    g.push(linea("M440 380L470 380", { color: C.acento, sw: 5, flecha: "acento" }))
    g.push(linea("M460 560L430 560", { color: C.acento, sw: 5, flecha: "acento" }))
    g.push(avionLado(330, 372, 0.6))
    g.push(t(440, 620, "ESPERA", { size: 22, peso: 700, color: C.suave, anchor: "middle", espaciado: 1.5 }))
    g.push(`<path d="M710 470C820 470 900 520 1000 700" fill="none" stroke="${C.rojo}" stroke-width="4" stroke-dasharray="12 8" marker-end="url(#f-rojo)"/>`)
    g.push(tl(900, 740, ["hacia el alterno,", "a la hora límite"], { size: 22, peso: 700, color: C.rojo, anchor: "middle", lh: 26 }))
    // Reloj de arena.
    const [cx, top, bot] = [1260, 220, 700]
    g.push(`<path d="M${cx - 140} ${top}L${cx + 140} ${top}L${cx + 20} ${(top + bot) / 2}L${cx + 140} ${bot}L${cx - 140} ${bot}L${cx - 20} ${(top + bot) / 2}Z" fill="${C.tinte}" stroke="${C.acento}" stroke-width="4" stroke-linejoin="round"/>`)
    g.push(`<path d="M${cx - 100} ${top + 60}L${cx + 100} ${top + 60}L${cx + 14} ${(top + bot) / 2 - 10}L${cx - 14} ${(top + bot) / 2 - 10}Z" fill="${C.acento2}"/>`)
    g.push(`<path d="M${cx - 120} ${bot}L${cx + 120} ${bot}L${cx + 60} ${bot - 90}L${cx - 60} ${bot - 90}Z" fill="${C.acento2}"/>`)
    g.push(t(cx, top - 20, `al entrar: ${kg(2950)}`, { size: 24, peso: 700, color: C.acento, anchor: "middle" }))
    g.push(tl(cx, bot + 40, [`para ir al alterno: ${kg(2250)}`], { size: 24, peso: 700, color: C.rojo, anchor: "middle" }))
    g.push(pildora(cx + 170, (top + bot) / 2, "17 min", { size: 32, fill: C.acento, color: C.papel, pad: 24 }).svg)
    g.push(t(cx + 170, (top + bot) / 2 + 56, "disponibles", { size: 22, color: C.suave }))
    return lienzo({ ...this, desc: this.alt, sub: "Se calcula antes de aceptarla, no dentro de ella", cuerpo: g.join("") })
  },
}

// ─── IMG-C19 (alterno) ──────────────────────────────────────────────────────

const C19 = {
  codigo: "IMG-C19",
  alto: 900,
  titulo: "Esperar en destino recorta las opciones",
  alt: "Línea de tiempo de la llegada a un destino con tres bandas de combustible que se consumen de izquierda a derecha: discrecional y contingencia, luego alterno y al final reserva final. Tres marcas: desvío temprano, con todas las opciones; último momento para ir al alterno con la reserva final; y, desde ahí, comprometido con el destino. Debajo, el aeropuerto alterno se va llenando de aviones desviados.",
  svg() {
    const g = []
    const [x0, x1] = [100, 1500]
    const bandas = [
      [x0, 700, "discrecional y contingencia", C.acento2],
      [700, 1160, "alterno", C.acento],
      [1160, x1, "reserva final", C.rojo],
    ]
    for (const [a, b, rot, color] of bandas) {
      g.push(`<rect x="${a}" y="330" width="${b - a}" height="70" fill="${color}"/>`)
      g.push(t((a + b) / 2, 374, rot, { size: 22, peso: 700, color: C.papel, anchor: "middle" }))
    }
    g.push(linea(`M${x0} 430L${x1} 430`, { color: C.tinta, sw: 3, flecha: "tinta" }))
    g.push(t(x1, 466, "tiempo en el destino", { size: 20, color: C.suave, anchor: "end" }))
    const marcas = [
      [300, "desvío temprano:", "todas las opciones", C.verde],
      [700, "último momento para ir", "al alterno con reserva final", C.ambar],
      [1160, "desde aquí:", "comprometido con el destino", C.rojo],
    ]
    for (const [x, a, b, color] of marcas) {
      g.push(linea(`M${x} 300L${x} 440`, { color, sw: 4 }))
      g.push(`<circle cx="${x}" cy="300" r="9" fill="${color}"/>`)
      g.push(tl(x, 230, [a, b], { size: 22, peso: 700, color, anchor: "middle", lh: 26 }))
    }
    // El alterno se llena.
    g.push(t(x0, 560, "EL ALTERNO", { size: 20, peso: 700, color: C.suave, espaciado: 1.5 }))
    const llenos = [[300, 1], [700, 3], [1160, 6]]
    for (const [x, n] of llenos) {
      g.push(caja(x - 170, 590, 340, 190, { fill: C.papel, stroke: C.claro, rx: 14 }))
      g.push(`<rect x="${x - 140}" y="740" width="280" height="12" fill="${C.tinta}"/>`)
      for (let k = 0; k < n; k++) g.push(avionLado(x - 110 + (k % 3) * 110, 640 + Math.floor(k / 3) * 56, 0.55, { color: C.acento2 }))
      g.push(t(x, 810, n === 1 ? "casi vacío" : n === 3 ? "llenándose" : "saturado", { size: 20, peso: 700, color: C.suave, anchor: "middle" }))
    }
    return lienzo({ ...this, desc: this.alt, sub: "Mientras se espera, el combustible y el alterno se van gastando", cuerpo: g.join("") })
  },
}

// ─── IMG-C20 (punto de decisión) ────────────────────────────────────────────

const C20 = {
  codigo: "IMG-C20",
  alto: 900,
  titulo: "El punto de decisión",
  alt: "Ruta horizontal del origen al destino final, con un destino intermedio para reabastecer debajo de la línea. Sobre la ruta, un rombo: punto de decisión, nueva planificación en vuelo. Antes del rombo, una zona sombreada: opciones, seguir o desviarse al intermedio. Después, dos flechas: con combustible suficiente, al destino final; con combustible insuficiente, al destino intermedio. Debajo, la misma ruta más pequeña con los símbolos del PNR y del CP para compararlos.",
  svg() {
    const g = []
    const y = 360
    const xd = 820
    g.push(`<rect x="160" y="${y - 70}" width="${xd - 160}" height="140" fill="${C.tinte}"/>`)
    g.push(t((160 + xd) / 2, y - 84, "opciones: seguir o desviarse al intermedio", { size: 22, peso: 700, color: C.acento, anchor: "middle" }))
    g.push(linea(`M140 ${y}L1440 ${y}`, { color: C.acento, sw: 5 }))
    g.push(`<circle cx="140" cy="${y}" r="14" fill="${C.acento}"/>`)
    g.push(t(140, y + 50, "ORIGEN", { size: 20, peso: 700, anchor: "middle" }))
    g.push(`<circle cx="1460" cy="${y}" r="14" fill="${C.acento}"/>`)
    g.push(t(1460, y - 30, "DESTINO FINAL", { size: 20, peso: 700, anchor: "middle" }))
    g.push(`<path d="M${xd} ${y - 44}L${xd + 44} ${y}L${xd} ${y + 44}L${xd - 44} ${y}Z" fill="${C.acento}" stroke="${C.papel}" stroke-width="3"/>`)
    g.push(tl(xd, y + 80, ["punto de decisión", "nueva planificación en vuelo"], { size: 22, peso: 700, color: C.acento, anchor: "middle", lh: 26 }))
    g.push(`<circle cx="1100" cy="${y + 220}" r="14" fill="${C.acento2}"/>`)
    g.push(t(1100, y + 262, "DESTINO INTERMEDIO · reabastecimiento", { size: 20, peso: 700, anchor: "middle" }))
    g.push(linea(`M${xd + 50} ${y - 16}L1430 ${y - 16}`, { color: C.verde, sw: 4, flecha: "verde" }))
    g.push(t(1140, y - 30, "combustible suficiente → destino final", { size: 20, peso: 700, color: C.verde, anchor: "middle" }))
    g.push(`<path d="M${xd + 30} ${y + 34}C${xd + 120} ${y + 150} 1000 ${y + 210} 1080 ${y + 214}" fill="none" stroke="${C.rojo}" stroke-width="4" marker-end="url(#f-rojo)"/>`)
    g.push(t(880, y + 190, "combustible insuficiente → intermedio", { size: 20, peso: 700, color: C.rojo, anchor: "end" }))
    // Comparación con PNR y CP.
    const y2 = 780
    g.push(t(140, y2 - 40, "PARA COMPARAR", { size: 20, peso: 700, color: C.suave, espaciado: 1.5 }))
    g.push(linea(`M140 ${y2}L1460 ${y2}`, { color: C.gris, sw: 3 }))
    for (const [x, rot, sub] of [[620, "CP", "punto crítico"], [1040, "PNR", "punto de no retorno"]]) {
      g.push(`<rect x="${x - 12}" y="${y2 - 12}" width="24" height="24" fill="${C.papel}" stroke="${C.tinta}" stroke-width="3" transform="rotate(45 ${x} ${y2})"/>`)
      g.push(t(x, y2 - 26, rot, { size: 22, peso: 700, anchor: "middle" }))
      g.push(t(x, y2 + 44, sub, { size: 20, color: C.suave, anchor: "middle" }))
    }
    return lienzo({ ...this, desc: this.alt, sub: "Antes del punto se decide; después, cada rama tiene su combustible", cuerpo: g.join("") })
  },
}

export const VUELO = [C11, C12, C16, C17, C18, C19, C20]
