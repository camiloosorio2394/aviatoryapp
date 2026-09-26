/**
 * RV-01 a RV-07: qué es RVSM, dónde se aplica, la aprobación, el equipo y los
 * altímetros.
 */
import { C, avionLado, caja, cota, leyenda, linea, lienzo, parrafo, pildora, t, tl } from "../../figuras/lib.mjs"

const GENERICA = "Cabina genérica · no imita a ningún fabricante"

// ─── RV-01 ──────────────────────────────────────────────────────────────────

/**
 * Los niveles entre FL 290 y FL 350, con el avión en el sentido que le toca:
 * hacia el este los impares (290, 310…) y, en RVSM, hacia el oeste los pares;
 * antes de RVSM, arriba de FL 290 se alternaban cada 2.000 ft.
 */
function niveles(ox, rvsm) {
  const g = []
  const y = (fl) => 760 - (fl - 290) * 8
  g.push(caja(ox, 160, 728, 680, { rx: 18 }))
  g.push(t(ox + 28, 212, rvsm ? "RVSM · 1.000 ft" : "ANTES · 2.000 ft", { size: 30, peso: 700, color: C.acento }))
  const lista = rvsm ? [290, 300, 310, 320, 330, 340, 350] : [290, 310, 330, 350]
  g.push(pildora(ox + 700, 202, `${lista.length} niveles`, { size: 22, anchor: "end", fill: rvsm ? C.acento : C.grisClaro, color: rvsm ? C.papel : C.suave }).svg)
  lista.forEach((fl, i) => {
    const yy = y(fl)
    g.push(linea(`M${ox + 130} ${yy}L${ox + 700} ${yy}`, { color: C.claro, sw: 2, dash: "6 8" }))
    g.push(t(ox + 36, yy + 8, `FL ${fl}`, { size: 24, peso: 700 }))
    const este = rvsm ? fl % 20 === 10 : i % 2 === 0
    g.push(avionLado(ox + 400, yy - 8, 0.62, { izquierda: !este, color: C.acento }))
  })
  if (rvsm) {
    g.push(cota(ox + 620, y(310) + 4, ox + 620, y(320) - 4, { color: "tinta" }))
    g.push(t(ox + 636, (y(310) + y(320)) / 2 + 8, "1.000 ft", { size: 22, peso: 700 }))
  } else {
    g.push(cota(ox + 620, y(310) + 4, ox + 620, y(330) - 4, { color: "tinta" }))
    g.push(t(ox + 636, (y(310) + y(330)) / 2 + 8, "2.000 ft", { size: 22, peso: 700 }))
  }
  return g.join("")
}

const RV01 = {
  codigo: "RV-01",
  alto: 900,
  titulo: "La misma franja, casi el doble de niveles",
  alt: "Dos perfiles verticales con la misma escala, de FL 290 a FL 350. A la izquierda, antes de RVSM, con 2.000 ft de separación: cuatro niveles, FL 290, 310, 330 y 350. A la derecha, con RVSM y 1.000 ft: siete niveles, de FL 290 a FL 350 de mil en mil. Un avión en cada nivel, en el sentido que le corresponde.",
  svg() {
    return lienzo({ ...this, desc: this.alt, sub: "RVSM no acerca los aviones por acercarlos: aprovecha mejor la altura", cuerpo: niveles(56, false) + niveles(816, true) })
  },
}

// ─── RV-02 ──────────────────────────────────────────────────────────────────

const RV02 = {
  codigo: "RV-02",
  alto: 900,
  titulo: "Dónde empieza y dónde acaba",
  alt: "Una columna de altura en tres franjas. Abajo, en gris, por debajo del espacio RVSM, hasta FL 290. En el centro, destacada, el espacio RVSM con separación de 1.000 ft, entre FL 290 y FL 410. Arriba, en gris, por encima del espacio RVSM, desde FL 410. Al lado, la nota: los detalles los publica cada Estado en el AIP, los procedimientos regionales y los NOTAM.",
  svg() {
    const g = []
    const [x, w] = [380, 520]
    g.push(`<rect x="${x}" y="170" width="${w}" height="130" rx="16" fill="${C.grisClaro}"/>`)
    g.push(`<rect x="${x}" y="300" width="${w}" height="400" fill="${C.tinte}" stroke="${C.acento}" stroke-width="4"/>`)
    g.push(`<rect x="${x}" y="700" width="${w}" height="130" rx="16" fill="${C.grisClaro}"/>`)
    g.push(t(x + w / 2, 245, "POR ENCIMA DEL ESPACIO RVSM", { size: 24, peso: 700, color: C.suave, anchor: "middle", espaciado: 1 }))
    g.push(t(x + w / 2, 480, "ESPACIO RVSM", { size: 40, peso: 700, color: C.acento, anchor: "middle" }))
    g.push(t(x + w / 2, 530, "separación vertical de 1.000 ft", { size: 28, color: C.acento, anchor: "middle" }))
    g.push(t(x + w / 2, 775, "POR DEBAJO DEL ESPACIO RVSM", { size: 24, peso: 700, color: C.suave, anchor: "middle", espaciado: 1 }))
    for (const [fl, y] of [["FL 410", 300], ["FL 290", 700]]) {
      g.push(linea(`M${x - 70} ${y}L${x} ${y}`, { color: C.acento, sw: 4 }))
      g.push(t(x - 84, y + 10, fl, { size: 30, peso: 700, anchor: "end" }))
    }
    g.push(linea(`M${x + w} 500L${x + w + 80} 500`, { color: C.acento, sw: 3 }))
    g.push(caja(x + w + 80, 400, 540, 200, { fill: C.papel, stroke: C.claro, rx: 16 }))
    g.push(parrafo(x + w + 110, 460, "Los detalles los publica cada Estado: AIP, procedimientos regionales y NOTAM.", 480, { size: 26, peso: 700, color: C.acento }).svg)
    return lienzo({ ...this, desc: this.alt, sub: "Dos límites fijos; lo que pasa dentro lo concreta cada región", cuerpo: g.join("") })
  },
}

// ─── RV-03 ──────────────────────────────────────────────────────────────────

const RV03 = {
  codigo: "RV-03",
  alto: 900,
  titulo: "La aprobación: tres cosas, no una",
  alt: "Tres bloques iguales arriba: la aeronave, con equipo y performance altimétrica aprobados; el operador, con la autorización en sus especificaciones de operación; y la tripulación, entrenada en procedimientos RVSM. De cada uno baja una flecha a un bloque único y más ancho: operación RVSM. Al lado, la nota: si falta una, no hay RVSM.",
  svg() {
    const g = []
    const bloques = [
      ["AERONAVE", "Equipo y performance altimétrica aprobados"],
      ["OPERADOR", "Autorización en las especificaciones de operación"],
      ["TRIPULACIÓN", "Entrenada en procedimientos RVSM"],
    ]
    const w = 440
    bloques.forEach(([tit, sub], i) => {
      const x = 90 + i * (w + 50)
      g.push(caja(x, 180, w, 170, { fill: C.papel, stroke: C.acento2, sw: 3, rx: 16 }))
      g.push(t(x + w / 2, 240, tit, { size: 32, peso: 700, color: C.acento, anchor: "middle", espaciado: 1 }))
      g.push(parrafo(x + w / 2, 286, sub, w - 60, { size: 24, anchor: "middle" }).svg)
      g.push(linea(`M${x + w / 2} 356C${x + w / 2} 450 800 440 800 ${i === 1 ? 540 : 546}`, { color: C.acento2, sw: 8, flecha: "acento2" }))
    })
    g.push(caja(420, 560, 760, 150, { fill: C.acento, stroke: null, rx: 18 }))
    g.push(t(800, 652, "OPERACIÓN RVSM", { size: 44, peso: 700, color: C.papel, anchor: "middle", espaciado: 2 }))
    g.push(t(1210, 645, "Si falta una,", { size: 28, peso: 700, color: C.rojo }))
    g.push(t(1210, 682, "no hay RVSM.", { size: 28, peso: 700, color: C.rojo }))
    return lienzo({ ...this, desc: this.alt, sub: "RVSM no es una propiedad del avión: es la intersección de tres condiciones", cuerpo: g.join("") })
  },
}

// ─── RV-04 ──────────────────────────────────────────────────────────────────

function icono(tipo, x, y) {
  const c = C.acento
  if (tipo === "altimetros") {
    return [0, 70]
      .map(
        (dx) =>
          `<circle cx="${x + dx}" cy="${y}" r="30" fill="${C.papel}" stroke="${c}" stroke-width="4"/>` +
          linea(`M${x + dx} ${y}L${x + dx + 14} ${y - 20}`, { color: c, sw: 4 }) +
          `<circle cx="${x + dx}" cy="${y}" r="4" fill="${c}"/>`,
      )
      .join("")
  }
  if (tipo === "antena") {
    return (
      linea(`M${x + 20} ${y + 32}L${x + 20} ${y - 8}`, { color: c, sw: 5 }) +
      `<circle cx="${x + 20}" cy="${y - 12}" r="7" fill="${c}"/>` +
      [22, 38, 54].map((r) => `<path d="M${x + 20 + r * 0.7} ${y - 12 - r * 0.7}A${r} ${r} 0 0 1 ${x + 20 + r * 0.7} ${y - 12 + r * 0.7}" fill="none" stroke="${c}" stroke-width="4" stroke-linecap="round"/>`).join("")
    )
  }
  if (tipo === "campana") {
    return (
      `<path d="M${x + 5} ${y + 22}C${x + 12} ${y + 10} ${x + 10} ${y - 30} ${x + 35} ${y - 32}C${x + 60} ${y - 30} ${x + 58} ${y + 10} ${x + 65} ${y + 22}Z" fill="${C.papel}" stroke="${c}" stroke-width="4" stroke-linejoin="round"/>` +
      `<circle cx="${x + 35}" cy="${y + 30}" r="7" fill="${c}"/>` +
      linea(`M${x - 6} ${y - 18}L${x - 16} ${y - 26}M${x + 76} ${y - 18}L${x + 86} ${y - 26}`, { color: c, sw: 4 })
    )
  }
  return (
    caja(x - 10, y - 30, 110, 60, { fill: C.papel, stroke: c, sw: 4, rx: 10 }) +
    t(x + 22, y + 10, "AP", { size: 24, peso: 700, color: c, anchor: "middle" }) +
    `<circle cx="${x + 72}" cy="${y}" r="16" fill="${c}"/>` +
    linea(`M${x + 72} ${y}L${x + 72} ${y - 12}`, { color: C.papel, sw: 3 })
  )
}

const RV04 = {
  codigo: "RV-04",
  alto: 900,
  titulo: "El equipo requerido, de un vistazo",
  alt: "Cuatro tarjetas en dos filas. Dos sistemas independientes de altitud, que permiten comparar. Transpondedor con reporte de altitud, para que el ATC vea el nivel. Alerta de altitud, que avisa si el avión se aparta. Control automático de altitud, que mantiene el nivel. Debajo, una banda: los cuatro, operativos, antes de entrar.",
  svg() {
    const g = []
    const tarjetas = [
      ["altimetros", "DOS SISTEMAS INDEPENDIENTES DE ALTITUD", "Permiten comparar."],
      ["antena", "TRANSPONDEDOR CON REPORTE DE ALTITUD", "El ATC ve tu nivel."],
      ["campana", "ALERTA DE ALTITUD", "Avisa si te apartas."],
      ["ap", "CONTROL AUTOMÁTICO DE ALTITUD", "Mantiene el nivel."],
    ]
    tarjetas.forEach(([ic, nombre, uso], i) => {
      const x = 90 + (i % 2) * 720
      const y = 170 + Math.floor(i / 2) * 270
      g.push(caja(x, y, 700, 245, { fill: C.papel, stroke: C.claro, rx: 18 }))
      g.push(`<rect x="${x + 30}" y="${y + 30}" width="170" height="130" rx="14" fill="${C.tinte}"/>`)
      g.push(icono(ic, x + 80, y + 95))
      const p = parrafo(x + 230, y + 76, nombre, 440, { size: 28, peso: 700, color: C.acento })
      g.push(p.svg)
      g.push(t(x + 230, y + 76 + p.alto + 20, uso, { size: 26, color: C.tinta }))
    })
    g.push(caja(90, 725, 1420, 90, { fill: C.acento, stroke: null, rx: 16 }))
    g.push(t(800, 783, "Los cuatro, operativos, antes de entrar.", { size: 32, peso: 700, color: C.papel, anchor: "middle" }))
    return lienzo({ ...this, desc: this.alt, sub: "Cuatro sistemas y una línea para cada uno", cuerpo: g.join("") })
  },
}

// ─── RV-05 ──────────────────────────────────────────────────────────────────

/** Un PFD reducido a lo que importa aquí: el horizonte y la cinta de altitud. */
function pfdMini(x, y, w, h, altitud) {
  const g = []
  g.push(`<rect x="${x - 10}" y="${y - 10}" width="${w + 20}" height="${h + 20}" rx="14" fill="#2A2E34"/>`)
  g.push(`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="${C.pantalla}"/>`)
  const ax = x + 20
  const aw = w - 130
  g.push(`<rect x="${ax}" y="${y + 30}" width="${aw}" height="${(h - 60) / 2}" fill="#2F6FA8"/>`)
  g.push(`<rect x="${ax}" y="${y + 30 + (h - 60) / 2}" width="${aw}" height="${(h - 60) / 2}" fill="#7A5230"/>`)
  g.push(linea(`M${ax} ${y + h / 2}L${ax + aw} ${y + h / 2}`, { color: C.papel, sw: 2 }))
  g.push(linea(`M${ax + aw / 2 - 50} ${y + h / 2}L${ax + aw / 2 - 16} ${y + h / 2}M${ax + aw / 2 + 16} ${y + h / 2}L${ax + aw / 2 + 50} ${y + h / 2}`, { color: "#F2C94C", sw: 6 }))
  const tx = x + w - 96
  g.push(`<rect x="${tx}" y="${y + 30}" width="80" height="${h - 60}" fill="#3A4048"/>`)
  for (let k = -2; k <= 2; k++) {
    if (k === 0) continue
    g.push(t(tx + 40, y + h / 2 + k * 50 + 7, String(Math.round(altitud / 100) - k), { size: 18, color: C.pantallaSuave, anchor: "middle" }))
  }
  g.push(`<rect x="${tx - 14}" y="${y + h / 2 - 22}" width="104" height="44" fill="#000" stroke="${C.pantallaTexto}" stroke-width="2"/>`)
  g.push(`<text x="${tx + 38}" y="${y + h / 2 + 9}" font-family="'Courier New', Courier, monospace" font-size="24" font-weight="700" fill="${C.pantallaVerde}" text-anchor="middle">${altitud}</text>`)
  return g.join("")
}

const RV05 = {
  codigo: "RV-05",
  alto: 900,
  titulo: "En RVSM no hay «el altímetro»",
  alt: "Cabina genérica vista de frente: el PFD del comandante a la izquierda con 35000 ft, el del primer oficial a la derecha con 35010 ft, y el altímetro de reserva en el panel central con 34960 ft. Tres números señalan las dos primarias y la de reserva.",
  anotaciones: 3,
  svg() {
    const g = []
    g.push(caja(56, 170, 1074, 600, { fill: "#3A3F46", stroke: null, rx: 20 }))
    g.push(`<rect x="56" y="170" width="1074" height="60" rx="20" fill="#2A2E34"/>`)
    g.push(pfdMini(96, 270, 360, 300, 35000))
    g.push(pfdMini(730, 270, 360, 300, 35010))
    // La de reserva: un instrumento pequeño, en el centro.
    g.push(`<rect x="518" y="330" width="150" height="150" rx="12" fill="#2A2E34"/>`)
    g.push(`<rect x="530" y="342" width="126" height="126" rx="8" fill="${C.pantalla}"/>`)
    g.push(`<rect x="540" y="352" width="106" height="52" fill="#2F6FA8"/><rect x="540" y="404" width="106" height="24" fill="#7A5230"/>`)
    g.push(`<text x="593" y="456" font-family="'Courier New', Courier, monospace" font-size="22" font-weight="700" fill="${C.pantallaVerde}" text-anchor="middle">34960</text>`)
    g.push(t(276, 620, "PFD COMANDANTE", { size: 20, peso: 700, color: C.pantallaSuave, anchor: "middle", espaciado: 1 }))
    g.push(t(910, 620, "PFD PRIMER OFICIAL", { size: 20, peso: 700, color: C.pantallaSuave, anchor: "middle", espaciado: 1 }))
    g.push(t(593, 520, "RESERVA", { size: 20, peso: 700, color: C.pantallaSuave, anchor: "middle", espaciado: 1 }))
    g.push(senalOscura(1, [410, 700], [410, 440]))
    g.push(senalOscura(2, [1044, 700], [1044, 440]))
    g.push(senalOscura(3, [593, 700], [593, 480]))
    g.push(
      leyenda(1160, 190, [
        [1, "Primaria del comandante"],
        [2, "Primaria del primer oficial", "Estas dos tienen que coincidir dentro de 200 ft en crucero."],
        [3, "La de reserva", "La tercera opinión, independiente: contra ella se contrastan las primarias cada hora, y la diferencia se anota."],
      ]),
    )
    return lienzo({ ...this, desc: this.alt, recreacion: GENERICA, cuerpo: g.join("") })
  },
}

/** Número con guía sobre fondo oscuro: el círculo lleva borde claro. */
function senalOscura(k, [bx, by], [px, py]) {
  return (
    linea(`M${bx} ${by}L${px} ${py}`, { color: C.tinte, sw: 2.5 }) +
    `<circle cx="${px}" cy="${py}" r="5" fill="${C.tinte}"/>` +
    `<circle cx="${bx}" cy="${by}" r="22" fill="${C.acento}" stroke="${C.papel}" stroke-width="3"/>` +
    t(bx, by + 8, String(k), { size: 23, peso: 700, color: C.papel, anchor: "middle" })
  )
}

// ─── RV-06 ──────────────────────────────────────────────────────────────────

const RV06 = {
  codigo: "RV-06",
  alto: 1030,
  titulo: "Cada chequeo altimétrico, con su momento y su cifra",
  alt: "Línea de tiempo de un vuelo con el perfil detrás: rodaje, ascenso, crucero largo y descenso. Cuatro marcadores: antes del despegue, elevación conocida dentro de 75 ft y primarias entre sí según el manual; en la altitud de transición, 1013,25 hPa en todos y recomprobar al nivelar; en crucero, primarias dentro de 200 ft; y cada hora, repetido, primarias contra la de reserva, anotando la diferencia.",
  svg() {
    const g = []
    const suelo = 690
    const crucero = 290
    g.push(`<path d="M80 ${suelo}L230 ${suelo}L540 ${crucero}L1260 ${crucero}L1500 ${suelo}L1520 ${suelo}L1520 ${suelo + 6}L80 ${suelo + 6}Z" fill="${C.grisClaro}"/>`)
    g.push(linea(`M80 ${suelo}L230 ${suelo}L540 ${crucero}L1260 ${crucero}L1500 ${suelo}`, { color: C.gris, sw: 3 }))
    for (const [x, rot] of [[110, "RODAJE"], [445, "ASCENSO"], [920, "CRUCERO"], [1400, "DESCENSO"]]) g.push(t(x, suelo + 40, rot, { size: 20, peso: 700, color: C.gris, anchor: "middle", espaciado: 1.5 }))
    g.push(linea(`M80 ${suelo + 64}L1520 ${suelo + 64}`, { color: C.acento2, sw: 3 }))
    const puntos = [
      [1, 170, suelo],
      [2, 330, suelo - 129],
      [3, 600, crucero],
    ]
    for (const [k, x, y] of puntos) {
      g.push(linea(`M${x} ${y}L${x} ${suelo + 64}`, { color: C.acento, sw: 2, dash: "4 6" }))
      g.push(`<circle cx="${x}" cy="${y}" r="24" fill="${C.acento}" stroke="${C.papel}" stroke-width="3"/>`)
      g.push(t(x, y + 9, String(k), { size: 24, peso: 700, color: C.papel, anchor: "middle" }))
    }
    for (const x of [820, 1020, 1220]) {
      g.push(linea(`M${x} ${crucero}L${x} ${suelo + 64}`, { color: C.acento, sw: 2, dash: "4 6" }))
      g.push(`<circle cx="${x}" cy="${crucero}" r="24" fill="${C.acento2}" stroke="${C.papel}" stroke-width="3"/>`)
      g.push(t(x, crucero + 9, "4", { size: 24, peso: 700, color: C.papel, anchor: "middle" }))
    }
    g.push(`<path d="M860 ${crucero - 50}A60 30 0 1 1 1180 ${crucero - 50}" fill="none" stroke="${C.acento2}" stroke-width="3" marker-end="url(#f-acento2)"/>`)
    g.push(t(1020, crucero - 92, "cada hora", { size: 22, peso: 700, color: C.acento2, anchor: "middle" }))
    const cajas = [
      ["1", "ANTES DEL DESPEGUE", ["Elevación conocida:", "dentro de 75 ft.", "Primarias entre sí:", "límite del AFM."]],
      ["2", "ALTITUD DE TRANSICIÓN", ["1013,25 hPa en todos", "Recomprobar al nivelar"]],
      ["3", "EN CRUCERO", ["Primarias dentro de 200 ft"]],
      ["4", "CADA HORA", ["Primarias contra la de reserva", "Anotar la diferencia"]],
    ]
    cajas.forEach(([k, tit, lineas], i) => {
      const x = 80 + i * 365
      g.push(caja(x, 790, 345, 196, { fill: k === "4" ? C.tinte2 : C.tinte, stroke: null, rx: 14 }))
      g.push(t(x + 20, 830, `${k}  ${tit}`, { size: 22, peso: 700, color: C.acento, espaciado: 0.5 }))
      g.push(tl(x + 20, 872, lineas, { size: 22, lh: 30 }))
    })
    return lienzo({ ...this, desc: this.alt, sub: "Los 200 ft son entre primarias y en crucero; antes de despegar el número es otro", cuerpo: g.join("") })
  },
}

// ─── RV-07 ──────────────────────────────────────────────────────────────────

const RV07 = {
  codigo: "RV-07",
  alto: 900,
  titulo: "Nivel autorizado, altitud real y automático",
  alt: "PFD genérico en crucero. Arriba, la fila de anunciadores de modo con ALT como modo vertical y AP1 acoplado. Sobre la cinta de altitud, la altitud seleccionada, 35000. En la cinta, la altitud actual, 35000. Tres números señalan la altitud seleccionada, la actual y los anunciadores de modo vertical y de piloto automático.",
  anotaciones: 3,
  svg() {
    const g = []
    const [x, y, w, h] = [140, 180, 780, 620]
    g.push(`<rect x="${x - 14}" y="${y - 14}" width="${w + 28}" height="${h + 28}" rx="22" fill="#2A2E34"/>`)
    g.push(`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" fill="${C.pantalla}"/>`)
    // FMA.
    const fma = ["SPEED", "ALT", "NAV", "", "AP1"]
    fma.forEach((m, i) => {
      const bx = x + 20 + i * 148
      g.push(`<rect x="${bx}" y="${y + 16}" width="140" height="50" fill="none" stroke="${C.pantallaBorde}" stroke-width="2"/>`)
      if (m) g.push(`<text x="${bx + 70}" y="${y + 50}" font-family="'Courier New', Courier, monospace" font-size="24" font-weight="700" fill="${C.pantallaVerde}" text-anchor="middle">${m}</text>`)
    })
    // Horizonte.
    const [ax, ay, aw, ah] = [x + 40, y + 110, 520, 470]
    g.push(`<rect x="${ax}" y="${ay}" width="${aw}" height="${ah / 2}" fill="#2F6FA8"/><rect x="${ax}" y="${ay + ah / 2}" width="${aw}" height="${ah / 2}" fill="#7A5230"/>`)
    g.push(linea(`M${ax} ${ay + ah / 2}L${ax + aw} ${ay + ah / 2}`, { color: C.papel, sw: 2 }))
    g.push(linea(`M${ax + aw / 2 - 110} ${ay + ah / 2}L${ax + aw / 2 - 30} ${ay + ah / 2}M${ax + aw / 2 + 30} ${ay + ah / 2}L${ax + aw / 2 + 110} ${ay + ah / 2}`, { color: "#F2C94C", sw: 8 }))
    // Cinta de altitud.
    const tx = x + 600
    g.push(`<rect x="${tx}" y="${ay}" width="130" height="${ah}" fill="#3A4048"/>`)
    for (let k = -2; k <= 2; k++) {
      if (k === 0) continue
      const yy = ay + ah / 2 + k * 90
      g.push(linea(`M${tx} ${yy}L${tx + 20} ${yy}`, { color: C.pantallaSuave, sw: 2 }))
      g.push(`<text x="${tx + 76}" y="${yy + 8}" font-family="'Courier New', Courier, monospace" font-size="22" fill="${C.pantallaSuave}" text-anchor="middle">${35000 - k * 100}</text>`)
    }
    g.push(`<rect x="${tx - 10}" y="${ay + ah / 2 - 28}" width="150" height="56" fill="#000" stroke="${C.pantallaTexto}" stroke-width="2"/>`)
    g.push(`<text x="${tx + 65}" y="${ay + ah / 2 + 10}" font-family="'Courier New', Courier, monospace" font-size="30" font-weight="700" fill="${C.pantallaVerde}" text-anchor="middle">35000</text>`)
    g.push(`<text x="${tx + 65}" y="${ay - 12}" font-family="'Courier New', Courier, monospace" font-size="28" font-weight="700" fill="${C.pantallaCian}" text-anchor="middle">35000</text>`)
    g.push(senalOscura(1, [980, ay - 20], [tx + 140, ay - 20]))
    g.push(senalOscura(2, [980, ay + ah / 2], [tx + 142, ay + ah / 2]))
    g.push(senalOscura(3, [980, y + 41], [x + w - 20, y + 41]))
    g.push(
      leyenda(1060, 190, [
        [1, "Altitud seleccionada", "El nivel autorizado, tal como quedó tras la colación. El otro piloto la verifica."],
        [2, "Altitud actual", "Lo que hace el avión: en crucero estable, el sistema la mantiene dentro de ±65 ft."],
        [3, "Modo vertical y piloto automático", "RVSM exige el automático operativo y acoplado en crucero nivelado, no solo disponible."],
      ], 480),
    )
    return lienzo({ ...this, desc: this.alt, recreacion: "PFD genérico · no imita a ningún fabricante", cuerpo: g.join("") })
  },
}

export const BASICOS = [RV01, RV02, RV03, RV04, RV05, RV06, RV07]
