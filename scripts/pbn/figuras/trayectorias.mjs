/**
 * PB-11 a PB-15: la trayectoria vertical y la lateral de los procedimientos.
 */
import { C, avion, caja, cerro, cota, curvaAbierta, flyBy, flyOver, linea, lienzo, parrafo, pildora, pista, t, tl } from "../../figuras/lib.mjs"

const M = (pts) => pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join("")

// ─── PB-11 ──────────────────────────────────────────────────────────────────

const PB11 = {
  codigo: "PB-11",
  alto: 900,
  titulo: "Por qué la temperatura es una limitación",
  alt: "Perfil de una aproximación final. Desde el FAF a la pista, una senda continua rotulada trayectoria en condición estándar y, por debajo, una senda de puntos rotulada efecto conceptual de aire más frío que el estándar. Las dos coinciden en el umbral y se separan con la altura; entre ellas, a la altura del FAF, una cota sin cifra: la magnitud está en la nota de la carta. Bajo la senda fría hay un obstáculo con menos margen del diseñado.",
  svg() {
    const g = []
    const suelo = 740
    const faf = 300
    const umbral = 1240
    const altaFaf = 320
    const fria = 430
    const ySenda = (x, y0) => y0 + ((x - faf) * (suelo - 18 - y0)) / (umbral - faf)
    g.push(`<rect x="80" y="${suelo}" width="1440" height="60" fill="${C.relieve[0]}"/>`)
    g.push(linea(`M80 ${suelo}L1520 ${suelo}`, { color: C.relieveLinea, sw: 3 }))
    g.push(`<path d="M600 ${suelo}C640 ${suelo - 10} 680 ${suelo - 92} 730 ${suelo - 96}C780 ${suelo - 92} 820 ${suelo - 10} 860 ${suelo}Z" fill="${C.relieve[1]}" stroke="${C.relieveLinea}" stroke-width="2"/>`)
    g.push(`<rect x="${umbral}" y="${suelo - 8}" width="260" height="10" fill="${C.tinta}"/>`)
    g.push(t(umbral + 130, suelo + 40, "PISTA", { size: 22, peso: 700, color: C.suave, anchor: "middle" }))
    g.push(linea(`M${faf} 280L${faf} ${suelo}`, { color: C.suave, sw: 2, dash: "4 8" }))
    g.push(t(faf, suelo + 40, "FAF", { size: 24, peso: 700, anchor: "middle" }))
    g.push(linea(`M140 ${altaFaf}L${faf} ${altaFaf}L${umbral} ${suelo - 18}`, { color: C.acento, sw: 5 }))
    g.push(linea(`M140 ${fria}L${faf} ${fria}L${umbral} ${suelo - 18}`, { color: C.ambar, sw: 4.5, dash: "3 10" }))
    g.push(cota(faf - 60, altaFaf + 6, faf - 60, fria - 6, { color: "tinta" }))
    g.push(t(faf - 76, (altaFaf + fria) / 2 + 8, "¿cuánto?", { size: 22, peso: 700, anchor: "end" }))
    g.push(parrafo(56, 184, "La magnitud depende de la temperatura y del procedimiento: está en la nota de la carta, no en una regla general.", 800, { size: 22, color: C.tinta }).svg)
    // Rótulos sobre las sendas, donde más se separan.
    const xr = 470
    const pend = (y0) => (Math.atan((suelo - 18 - y0) / (umbral - faf)) * 180) / Math.PI
    g.push(t(xr, ySenda(xr, altaFaf) - 16, "TRAYECTORIA EN CONDICIÓN ESTÁNDAR", { size: 22, peso: 700, color: C.acento, rot: pend(altaFaf) }))
    // Entre las dos sendas, que es donde hay sitio y queda claro a cuál rotula.
    g.push(t(330, ySenda(330, fria) - 14, "EFECTO CONCEPTUAL DEL AIRE MÁS FRÍO", { size: 20, peso: 700, color: C.ambar, rot: pend(fria) }))
    g.push(pildora(700, suelo - 124, "menos margen", { size: 20, anchor: "middle", fill: C.ambarSuave, color: C.ambar }).svg)
    // La limitación, arriba a la derecha.
    g.push(caja(960, 170, 560, 150, { fill: C.papel, stroke: C.acento, rx: 14 }))
    g.push(t(990, 214, "LIMITACIÓN DE TEMPERATURA", { size: 24, peso: 700, color: C.acento, espaciado: 1 }))
    g.push(t(990, 252, "Ver la nota del procedimiento.", { size: 24 }))
    g.push(t(990, 290, "Fuera de límites y sin compensación: MDA de LNAV.", { size: 22, color: C.suave }))
    g.push(t(56, 846, "Las dos sendas coinciden en el umbral: el error del altímetro crece con la altura sobre la fuente del ajuste.", { size: 22, color: C.suave }))
    return lienzo({ ...this, desc: this.alt, sub: "Con aire más frío que el estándar, la senda barométrica queda más baja de lo que indica", cuerpo: g.join("") })
  },
}

// ─── PB-12 ──────────────────────────────────────────────────────────────────

function perfilMda(oy, tipo) {
  const g = []
  const x0 = 56
  g.push(caja(x0, oy, 1488, 420, { rx: 18 }))
  const suelo = oy + 360
  const yFaf = oy + 110
  const esc = [oy + 190, oy + 256]
  const yMda = oy + 296
  const xFaf = 220
  const xs = [520, 820]
  const xUmbral = 1300
  g.push(t(x0 + 28, oy + 46, tipo === "esc" ? "ESCALERA" : "DESCENSO CONTINUO (CDFA)", { size: 26, peso: 700, color: C.acento, espaciado: 1 }))
  g.push(linea(`M${x0 + 20} ${suelo}L${x0 + 1468} ${suelo}`, { color: C.relieveLinea, sw: 3 }))
  g.push(`<rect x="${xUmbral}" y="${suelo - 7}" width="200" height="9" fill="${C.tinta}"/>`)
  g.push(linea(`M${xFaf} ${yFaf}L${xFaf} ${suelo}`, { color: C.suave, sw: 2, dash: "4 8" }))
  g.push(t(xFaf, suelo + 32, "FAF", { size: 22, peso: 700, anchor: "middle" }))
  xs.forEach((x, i) => {
    g.push(linea(`M${x} ${esc[i]}L${x} ${suelo}`, { color: C.gris, sw: 2, dash: "4 8" }))
    g.push(linea(`M${x - 50} ${esc[i]}L${x + 50} ${esc[i]}`, { color: C.suave, sw: 3 }))
    g.push(t(x - 8, esc[i] + 26, "altitud mínima", { size: 20, color: C.suave, anchor: "end" }))
  })
  g.push(linea(`M${x0 + 40} ${yMda}L${xUmbral + 40} ${yMda}`, { color: C.tinta, sw: 2.5, dash: "14 8" }))
  g.push(t(x0 + 48, yMda - 10, "MDA", { size: 22, peso: 700 }))

  if (tipo === "esc") {
    const tramos = [
      [[120, yFaf], [xFaf, yFaf]],
      [[xFaf, yFaf], [xFaf + 70, esc[0]]],
      [[xFaf + 70, esc[0]], [xs[0], esc[0]]],
      [[xs[0], esc[0]], [xs[0] + 60, esc[1]]],
      [[xs[0] + 60, esc[1]], [xs[1], esc[1]]],
      [[xs[1], esc[1]], [xs[1] + 40, yMda - 4]],
      [[xs[1] + 40, yMda - 4], [1240, yMda - 4]],
    ]
    tramos.forEach(([a, b], i) => {
      const nivel = a[1] === b[1] && i > 0
      g.push(linea(M([a, b]), { color: nivel ? C.rojo : C.tinta, sw: nivel ? 7 : 5, opacidad: nivel ? 0.55 : undefined }))
    })
    g.push(linea(M([[1240, yMda - 4], [1300, yMda - 60]]), { color: C.tinta, sw: 3.5, dash: "10 8", flecha: "tinta" }))
    g.push(t(1050, yMda + 34, "llega a la MDA nivelado y lejos", { size: 22, color: C.suave, anchor: "middle" }))
    g.push(pildora(1180, oy + 130, "Empuje y cabeceo cambiando en cada escalón", { size: 22, anchor: "middle", fill: C.rojoSuave, color: C.rojo }).svg)
  } else {
    const yTch = suelo - 16
    const xMda = xFaf + ((yMda - yFaf) * (xUmbral - xFaf)) / (yTch - yFaf)
    g.push(linea(M([[xFaf, yFaf], [xMda, yMda]]), { color: C.magenta, sw: 26, opacidad: 0.13, cap: "butt" }))
    g.push(linea(M([[120, yFaf], [xFaf, yFaf], [xMda, yMda]]), { color: C.tinta, sw: 5 }))
    g.push(linea(M([[xMda, yMda], [xUmbral, yTch]]), { color: C.tinta, sw: 3.5, dash: "3 9" }))
    // La senda de asesoramiento, explicada aparte para que no tape el trazo.
    g.push(`<rect x="720" y="${oy + 96}" width="40" height="16" rx="3" fill="${C.magenta}" opacity="0.2"/>`)
    g.push(tl(776, oy + 110, ["Senda de asesoramiento: ayuda a llegar ordenado,", "no da franqueamiento por debajo de la MDA."], { size: 22, color: C.magenta, peso: 700, lh: 28 }))
    g.push(`<circle cx="${xMda}" cy="${yMda}" r="8" fill="${C.tinta}"/>`)
    g.push(pildora(xMda - 24, yMda + 34, "No se cruza sin referencia visual", { size: 20, anchor: "end", fill: C.tinte, color: C.acento }).svg)
    g.push(t(xMda, suelo + 32, "(V)", { size: 22, peso: 700, anchor: "middle" }))
    g.push(linea(`M${xMda} ${yMda + 10}L${xMda} ${suelo}`, { color: C.suave, sw: 2, dash: "2 6" }))
    g.push(cota(xUmbral + 20, yTch, xUmbral + 20, suelo - 8, { sw: 2 }))
    g.push(t(1520, suelo + 32, "La senda llega a unos 50 ft sobre el umbral", { size: 20, color: C.suave, anchor: "end" }))
  }
  return g.join("")
}

const PB12 = {
  codigo: "PB-12",
  alto: 1060,
  titulo: "Volar a una MDA: escalera o descenso continuo",
  alt: "Dos perfiles del FAF al umbral. Arriba, la escalera: la trayectoria baja a cada altitud mínima, nivela y llega a la MDA en vuelo nivelado y largo, con las nivelaciones marcadas en rojo. Abajo, el descenso continuo (CDFA): un solo trazo desde el FAF que pasa por encima de cada altitud mínima y llega a la MDA en el punto de descenso visual, marcado (V); la MDA no se cruza sin referencia visual, y la senda de asesoramiento no da franqueamiento por debajo de ella.",
  pie: "Para no cruzar la MDA, el operador suele fijar una altitud de decisión derivada con un margen sobre ella. Esa cifra está en el SOP de cada flota.",
  svg() {
    return lienzo({ ...this, desc: this.alt, sub: "Una MDA no es una DA: por debajo de ella solo se baja viendo", cuerpo: perfilMda(160, "esc") + perfilMda(600, "cdfa") })
  },
}

// ─── PB-13 ──────────────────────────────────────────────────────────────────

function valle(ox, oy, tipo) {
  const g = []
  const L = (x, y) => [ox + x, oy + y]
  g.push(caja(ox, oy, 728, 680, { rx: 18 }))
  const ar = tipo === "ar"
  g.push(t(ox + 28, oy + 50, ar ? "RNP AR APCH" : "RNP APCH", { size: 28, peso: 700, color: C.acento, espaciado: 1 }))
  g.push(cerro(...L(330, 240), 175, 95, 4))
  g.push(cerro(...L(330, 480), 175, 95, 5))
  g.push(pista(...L(560, 360), ...L(680, 360), 16))
  if (!ar) {
    // Tramo final largo y recto, franja ancha con zona secundaria.
    g.push(`<rect x="${ox + 30}" y="${oy + 360 - 130}" width="530" height="260" fill="${C.magenta}" opacity="0.07"/>`)
    g.push(`<rect x="${ox + 30}" y="${oy + 360 - 80}" width="530" height="160" fill="${C.magenta}" opacity="0.13"/>`)
    for (const dy of [-130, -80, 80, 130]) g.push(linea(M([L(30, 360 + dy), L(560, 360 + dy)]), { color: C.magenta, sw: 2, dash: dy === -130 || dy === 130 ? "3 8" : undefined, opacidad: 0.6 }))
    g.push(linea(M([L(30, 360), L(560, 360)]), { color: C.magenta, sw: 5, flecha: "magenta" }))
    g.push(t(...L(40, 212), "zona secundaria", { size: 20, color: C.magenta, peso: 700 }))
    g.push(t(...L(40, 272), "área primaria", { size: 20, color: C.magenta, peso: 700 }))
    g.push(parrafo(...L(28, 620), "Final recta y larga, alineada con la pista, con colchón a los lados.", 660, { size: 22, color: C.suave }).svg)
  } else {
    const [cx, cy, r] = [ox + 250, oy + 500, 140]
    const pts = []
    for (let a = 180; a >= 90; a -= 10) {
      const rad = (a * Math.PI) / 180
      pts.push([cx + r * Math.cos(rad), cy - r * Math.sin(rad)])
    }
    const ruta = [L(110, 600), L(110, 500), ...pts, L(560, 360)]
    g.push(linea(M(ruta), { color: C.magenta, sw: 38, opacidad: 0.16 }))
    g.push(linea(M(ruta), { color: C.magenta, sw: 5, flecha: "magenta" }))
    g.push(t(...L(66, 420), "RF", { size: 24, peso: 700, color: C.magenta, anchor: "end" }))
    g.push(pildora(...L(700, 50), "AUTHORIZATION REQUIRED", { size: 20, anchor: "end", fill: C.acento, color: C.papel }).svg)
    g.push(parrafo(...L(170, 620), "Área lateral de evaluación de obstáculos = 2 × valor RNP, sin zona secundaria.", 520, { size: 22, color: C.tinta, peso: 700 }).svg)
  }
  return g.join("")
}

const PB13 = {
  codigo: "PB-13",
  alto: 900,
  titulo: "Lo que permite RNP AR, y lo que cuesta",
  alt: "Dos vistas en planta del mismo valle entre dos cerros, con la pista al fondo. A la izquierda, RNP APCH: una final recta y larga alineada con la pista, con una franja ancha, área primaria y zona secundaria a cada lado. A la derecha, RNP AR APCH, con el rótulo authorization required: la trayectoria rodea el cerro con un tramo RF de radio constante y entra al valle con una franja mucho más estrecha y sin zona secundaria, porque el área lateral de evaluación de obstáculos es 2 veces el valor RNP.",
  svg() {
    return lienzo({ ...this, desc: this.alt, sub: "Más precisión permite trayectorias curvas y estrechas; a cambio, desaparece el colchón lateral", cuerpo: valle(56, 160, "apch") + valle(816, 160, "ar") })
  },
}

// ─── PB-14 ──────────────────────────────────────────────────────────────────

const PB14 = {
  codigo: "PB-14",
  alto: 900,
  titulo: "El tramo RF: el arco es la trayectoria",
  alt: "Vista en planta. Del waypoint A sale un arco de radio constante en magenta hasta el waypoint B, con el centro marcado por una cruz y el mismo radio R hasta cada extremo. Un avión sigue la curva. En gris y con línea de puntos, el giro que haría el avión si anticipara el paso por un waypoint en la esquina: queda claramente fuera del arco. Al pie: la trayectoria publicada es el arco y la velocidad máxima del tramo está en la carta.",
  svg() {
    const g = []
    const [ox, oy, r] = [380, 330, 300]
    const A = [ox, oy + r]
    const B = [ox + r, oy]
    const esquina = [ox + r, oy + r]
    // El contraste: dos tramos rectos con un giro anticipado en la esquina.
    g.push(linea(M([A, esquina, B]), { color: C.gris, sw: 3, dash: "10 10" }))
    g.push(`<path d="M${esquina[0] - 120} ${esquina[1]}A120 120 0 0 0 ${esquina[0]} ${esquina[1] - 120}" fill="none" stroke="${C.suave}" stroke-width="4" stroke-dasharray="3 8"/>`)
    g.push(flyBy(...esquina, 13, { color: C.gris }))
    g.push(parrafo(esquina[0] + 30, esquina[1] + 14, "Giro anticipado en un waypoint: queda fuera del arco.", 330, { size: 22, color: C.suave }).svg)
    // El arco.
    g.push(linea(`M100 ${A[1]}L${A[0]} ${A[1]}`, { color: C.magenta, sw: 5 }))
    g.push(`<path d="M${A[0]} ${A[1]}A${r} ${r} 0 0 0 ${B[0]} ${B[1]}" fill="none" stroke="${C.magenta}" stroke-width="9"/>`)
    g.push(linea(`M${B[0]} ${B[1]}L${B[0]} 180`, { color: C.magenta, sw: 5, flecha: "magenta" }))
    g.push(linea(M([[ox, oy], A]), { color: C.tinta, sw: 2.5, dash: "4 7" }))
    g.push(linea(M([[ox, oy], B]), { color: C.tinta, sw: 2.5, dash: "4 7" }))
    g.push(linea(`M${ox - 14} ${oy}L${ox + 14} ${oy}M${ox} ${oy - 14}L${ox} ${oy + 14}`, { color: C.tinta, sw: 3 }))
    g.push(t(ox - 22, oy - 18, "centro", { size: 20, color: C.suave, anchor: "end" }))
    g.push(t(ox - 22, oy + r / 2 + 8, "R", { size: 30, peso: 700, anchor: "end" }))
    g.push(t(ox + r / 2, oy - 18, "R", { size: 30, peso: 700, anchor: "middle" }))
    g.push(flyBy(...A, 15))
    g.push(flyBy(...B, 15))
    g.push(t(A[0], A[1] + 46, "WP A", { size: 24, peso: 700, anchor: "middle" }))
    g.push(t(B[0] + 28, B[1] + 8, "WP B", { size: 24, peso: 700 }))
    const a = (-45 * Math.PI) / 180
    g.push(avion(ox + r * Math.cos(a), oy - r * Math.sin(a), 45, 1.3))
    g.push(t(ox + 40, oy + 110, "TRAMO RF", { size: 26, peso: 700, color: C.magenta }))
    g.push(t(ox + 40, oy + 140, "radio constante", { size: 22, color: C.magenta }))
    g.push(caja(1020, 280, 520, 330, { fill: C.papel, stroke: C.claro, rx: 16 }))
    g.push(parrafo(1050, 336, "La trayectoria publicada es el arco. La velocidad máxima del tramo está en la carta.", 460, { size: 28, peso: 700, color: C.acento }).svg)
    g.push(parrafo(1050, 480, "Con el radio fijo, lo que cambia con la velocidad es la inclinación necesaria para seguirlo.", 460, { size: 22, color: C.suave }).svg)
    return lienzo({ ...this, desc: this.alt, sub: "Radio fijo, centro fijo: el avión no decide dónde gira", cuerpo: g.join("") })
  },
}

// ─── PB-15 ──────────────────────────────────────────────────────────────────

function paso(ox, oy, tipo) {
  const g = []
  const L = (x, y) => [ox + x, oy + y]
  g.push(caja(ox, oy, 728, 680, { rx: 18 }))
  const fb = tipo === "fb"
  g.push(t(ox + 28, oy + 50, fb ? "FLY-BY" : "FLY-OVER", { size: 28, peso: 700, color: C.acento, espaciado: 1 }))
  // El dibujo sube un poco para que el panel no quede vacío arriba.
  g.push('<g transform="translate(0 -60)">')
  const wp = L(300, 330)
  // Las derrotas publicadas, finas y grises.
  g.push(linea(M([L(300, 640), wp, L(680, 330)]), { color: C.gris, sw: 3, dash: "10 9" }))
  const r = 110
  if (fb) {
    const ruta = `M${ox + 300} ${oy + 640}L${ox + 300} ${oy + 330 + r}A${r} ${r} 0 0 1 ${ox + 300 + r} ${oy + 330}L${ox + 680} ${oy + 330}`
    g.push(`<path d="${ruta}" fill="none" stroke="${C.magenta}" stroke-width="6" marker-end="url(#f-magenta)"/>`)
    g.push(flyBy(...wp, 17))
    g.push(cota(ox + 262, oy + 330 + r, ox + 262, oy + 336, { sw: 2.5 }))
    g.push(tl(ox + 248, oy + 392, ["anticipación:", "depende de la velocidad", "y de la altitud"], { size: 22, color: C.tinta, anchor: "end", lh: 27 }))
    g.push(parrafo(...L(400, 480), "El giro empieza antes del punto y pasa por dentro de la esquina.", 300, { size: 22, color: C.suave }).svg)
  } else {
    const pts = [L(300, 640), L(300, 420), wp, L(304, 290), L(335, 250), L(395, 238), L(450, 262), L(500, 310), L(545, 330), L(600, 330), L(680, 330)]
    g.push(`<path d="${curvaAbierta(pts)}" fill="none" stroke="${C.magenta}" stroke-width="6" marker-end="url(#f-magenta)"/>`)
    g.push(flyOver(...wp, 15))
    g.push(parrafo(...L(400, 480), "Se sobrevuela el punto y el giro empieza después, con una recuperación hasta la derrota siguiente.", 300, { size: 22, color: C.suave }).svg)
  }
  g.push(t(wp[0] - 30, wp[1] - 22, "WPT", { size: 22, peso: 700, anchor: "end" }))
  g.push("</g>")
  return g.join("")
}

const PB15 = {
  codigo: "PB-15",
  alto: 900,
  titulo: "Fly-by y fly-over: dos trayectorias distintas",
  alt: "Dos paneles con las mismas dos derrotas que se cruzan en un waypoint. En el fly-by, el punto es la estrella sin círculo y la trayectoria empieza a curvar antes del punto, por dentro de la esquina; una cota marca la anticipación, que depende de la velocidad y la altitud. En el fly-over, la estrella va dentro de un círculo y la trayectoria pasa exactamente por encima del punto, curva después y hace una recuperación hasta la derrota siguiente.",
  svg() {
    return lienzo({ ...this, desc: this.alt, sub: "La simbología del punto dice qué trayectoria espera la carta", cuerpo: paso(56, 160, "fb") + paso(816, 160, "fo") })
  },
}

export const TRAYECTORIAS = [PB11, PB12, PB13, PB14, PB15]
