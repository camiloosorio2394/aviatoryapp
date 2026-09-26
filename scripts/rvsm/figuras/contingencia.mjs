/**
 * RV-15 a RV-20: el margen, la turbulencia, la contingencia, el TCAS, lo que
 * cuesta perder RVSM y el vuelo completo.
 */
import { C, avionLado, caja, cota, curvaAbierta, linea, lienzo, num, parrafo, partir, pildora, t, tl } from "../../figuras/lib.mjs"

// ─── RV-15 ──────────────────────────────────────────────────────────────────

function escena(ox, titulo, arribaFt, abajoFt) {
  const g = []
  const px = 0.4
  const [y360, y350] = [300, 700]
  const yA = y350 - arribaFt * px
  const yB = y360 + abajoFt * px
  g.push(caja(ox, 160, 480, 690, { rx: 18 }))
  g.push(t(ox + 24, 204, titulo, { size: 22, peso: 700, color: C.acento, espaciado: 0.5 }))
  g.push(linea(`M${ox + 20} ${y360}L${ox + 460} ${y360}`, { color: C.claro, sw: 2, dash: "6 8" }))
  g.push(linea(`M${ox + 20} ${y350}L${ox + 460} ${y350}`, { color: C.claro, sw: 2, dash: "6 8" }))
  g.push(t(ox + 24, y360 - 12, "FL 360", { size: 20, peso: 700, color: C.suave }))
  g.push(t(ox + 24, y350 + 30, "FL 350", { size: 20, peso: 700, color: C.suave }))
  if (arribaFt) g.push(`<rect x="${ox + 300}" y="${yA}" width="120" height="${y350 - yA}" fill="${C.rojoSuave}"/>`)
  if (abajoFt) g.push(`<rect x="${ox + 300}" y="${y360}" width="120" height="${yB - y360}" fill="${C.rojoSuave}"/>`)
  g.push(avionLado(ox + 180, yB - 8, 0.9, { izquierda: true, color: C.acento }))
  g.push(avionLado(ox + 180, yA - 8, 0.9))
  const queda = 1000 - arribaFt - abajoFt
  g.push(cota(ox + 360, yB + 6, ox + 360, yA - 6, { color: "tinta", sw: 3.5 }))
  g.push(pildora(ox + 360, (yA + yB) / 2, `${queda.toLocaleString("es-CO")} ft`, { size: 26, anchor: "middle", fill: C.papel, color: C.tinta, stroke: C.tinta }).svg)
  const perdido = arribaFt + abajoFt
  if (perdido) g.push(t(ox + 240, 800, `${Math.round(perdido / 10)} % del margen, consumido`, { size: 22, peso: 700, color: C.rojo, anchor: "middle" }))
  return g.join("")
}

const RV15 = {
  codigo: "RV-15",
  alto: 900,
  titulo: "Mil pies no es mucho",
  alt: "Tres escenas con dos aviones en FL 350 y FL 360. En la primera, la separación nominal: 1.000 ft. En la segunda, el de abajo se desplaza 300 ft hacia arriba: quedan 700 ft y el 30 % del margen aparece sombreado en rojo. En la tercera, los dos se desvían 300 ft uno hacia el otro: quedan 400 ft, el 60 % del margen consumido.",
  svg() {
    return lienzo({
      ...this,
      desc: this.alt,
      sub: "Pequeño frente a la altitud, enorme frente al margen",
      cuerpo: escena(56, "NOMINAL", 0, 0) + escena(560, "UNO SE DESVÍA 300 ft", 300, 0) + escena(1064, "LOS DOS, 300 ft CADA UNO", 300, 300),
    })
  },
}

// ─── RV-16 ──────────────────────────────────────────────────────────────────

const RV16 = {
  codigo: "RV-16",
  alto: 900,
  titulo: "Onda de montaña: el avión se mueve sin que nada falle",
  alt: "Perfil de una cordillera de costado con el viento entrando desde la izquierda. Las líneas de corriente suben al pasar la cresta y siguen ondulando corriente abajo, cada vez menos. Un avión en crucero dentro de la zona ondulada, con dos siluetas por encima y por debajo de su posición y una cota: desplazamiento vertical inducido. Una línea de puntos marca el nivel autorizado. Etiquetas: viento perpendicular a la cordillera, flujo ondulatorio corriente abajo, y el nivel se mantiene con dificultad aunque el avión esté sano.",
  svg() {
    const g = []
    const suelo = 820
    g.push(`<path d="M60 ${suelo}L220 ${suelo}C300 ${suelo - 60} 360 600 450 560C540 600 620 ${suelo - 70} 760 ${suelo}L1544 ${suelo}L1544 860L60 860Z" fill="${C.relieve[1]}" stroke="${C.relieveLinea}" stroke-width="3"/>`)
    // Líneas de corriente: suben sobre la cresta y ondulan, cada vez menos.
    for (const [k, y0] of [[0, 300], [1, 390], [2, 470], [3, 530]].map((p) => p)) {
      const pts = []
      for (let x = 70; x <= 1530; x += 20) {
        const cresta = 110 * Math.exp(-(((x - 450) / 150) ** 2)) * (1 - k * 0.12 + 0.36)
        const onda = x > 520 ? (70 - k * 6) * Math.sin(((x - 520) / 300) * Math.PI * 2) * Math.exp(-(x - 520) / 1100) : 0
        pts.push([x, y0 + 40 - cresta * (0.5 + k * 0.18) - onda])
      }
      g.push(`<path d="${curvaAbierta(pts)}" fill="none" stroke="${C.acento2}" stroke-width="3" opacity="${0.55 + k * 0.1}"/>`)
    }
    g.push(linea("M80 262L250 262", { color: C.acento, sw: 5, flecha: "acento" }))
    g.push(tl(80, 206, ["viento perpendicular", "a la cordillera"], { size: 22, peso: 700, color: C.acento, lh: 26 }))
    g.push(t(760, 230, "flujo ondulatorio corriente abajo", { size: 22, peso: 700, color: C.acento2 }))
    // El avión y su desplazamiento.
    const [ax, ay] = [1180, 430]
    g.push(linea(`M960 ${ay}L1520 ${ay}`, { color: C.tinta, sw: 2.5, dash: "3 8" }))
    g.push(t(966, ay - 12, "nivel autorizado", { size: 20, color: C.suave }))
    g.push(avionLado(ax, ay - 70, 0.9, { hueco: true, color: C.ambar }))
    g.push(avionLado(ax, ay + 70, 0.9, { hueco: true, color: C.ambar }))
    g.push(avionLado(ax, ay - 6, 0.9))
    g.push(cota(ax + 100, ay - 76, ax + 100, ay + 64, { color: "ambar", sw: 3 }))
    g.push(tl(ax + 118, ay - 124, ["desplazamiento", "vertical inducido"], { size: 22, peso: 700, color: C.ambar, lh: 26 }))
    g.push(caja(840, 640, 700, 90, { fill: C.papel, stroke: C.claro, rx: 14 }))
    g.push(t(1190, 695, "El nivel se mantiene con dificultad aunque el avión esté sano.", { size: 22, peso: 700, color: C.acento, anchor: "middle" }))
    return lienzo({ ...this, desc: this.alt, sub: "Por eso obliga a comunicar, aunque a bordo todo funcione", cuerpo: g.join("") })
  },
}

// ─── RV-17 ──────────────────────────────────────────────────────────────────

const RV17 = {
  codigo: "RV-17",
  alto: 1020,
  titulo: "Si se pierde RVSM en vuelo",
  alt: "Diagrama de flujo de ocho bloques con tres llaves a la izquierda: aviar, navegar y comunicar. Falla de sistema RVSM; controlar la aeronave, mantener el nivel en lo posible, vigilar tráfico y encender luces; identificar la falla; QRH y SOP; y la decisión, conserva capacidad RVSM. Si sí, continuar vigilando la altitud. Si no, informar al ATC con unable RVSM due equipment, solicitar o aceptar una nueva autorización y avisar cuando ya no haga falta.",
  svg() {
    const g = []
    const [x, w] = [500, 620]
    const cx = x + w / 2
    const bloque = (y, h, lineas, clave) => {
      g.push(caja(x, y, w, h, { fill: clave ? C.tinte2 : C.papel, stroke: C.acento2, sw: 3, rx: 14 }))
      g.push(tl(cx, y + h / 2 + 9 - (lineas.length - 1) * 14, lineas, { size: 24, peso: 700, color: C.acento, anchor: "middle", lh: 28 }))
    }
    const flecha = (y1, y2) => g.push(linea(`M${cx} ${y1 + 2}L${cx} ${y2 - 4}`, { color: C.acento2, sw: 4, flecha: "acento2" }))
    bloque(160, 64, ["FALLA DE SISTEMA RVSM"], true)
    flecha(224, 246)
    bloque(246, 96, ["CONTROLAR LA AERONAVE", "Mantener el nivel en lo posible;", "vigilar tráfico y encender luces"])
    flecha(342, 364)
    bloque(364, 64, ["IDENTIFICAR LA FALLA"])
    flecha(428, 450)
    bloque(450, 64, ["QRH Y SOP"])
    flecha(514, 536)
    const [dy, dh] = [606, 140]
    g.push(`<path d="M${cx} ${dy - dh / 2}L${cx + 330} ${dy}L${cx} ${dy + dh / 2}L${cx - 330} ${dy}Z" fill="${C.acento}"/>`)
    g.push(t(cx, dy + 9, "¿CONSERVA CAPACIDAD RVSM?", { size: 24, peso: 700, color: C.papel, anchor: "middle" }))
    g.push(linea(`M${cx + 330} ${dy}L1250 ${dy}`, { color: C.verde, sw: 4, flecha: "verde" }))
    g.push(t(cx + 370, dy - 14, "SÍ", { size: 24, peso: 700, color: C.verde }))
    g.push(caja(1260, dy - 50, 284, 100, { fill: C.verdeSuave, stroke: null, rx: 14 }))
    g.push(tl(1402, dy - 6, ["CONTINUAR", "Vigilar la altitud"], { size: 22, peso: 700, color: C.verde, anchor: "middle", lh: 30 }))
    flecha(dy + dh / 2, dy + dh / 2 + 34)
    g.push(t(cx + 16, dy + dh / 2 + 26, "NO", { size: 24, peso: 700, color: C.acento }))
    bloque(710, 80, ["INFORMAR AL ATC", "«unable RVSM due equipment»"])
    flecha(790, 812)
    bloque(812, 64, ["SOLICITAR O ACEPTAR NUEVA AUTORIZACIÓN"])
    flecha(876, 898)
    bloque(898, 64, ["AVISAR CUANDO YA NO HAGA FALTA"])
    // Las tres llaves.
    const llave = (y1, y2, rot) => {
      const xL = x - 40
      g.push(`<path d="M${xL} ${y1}Q${xL - 20} ${y1} ${xL - 20} ${y1 + 20}L${xL - 20} ${(y1 + y2) / 2 - 16}Q${xL - 20} ${(y1 + y2) / 2} ${xL - 36} ${(y1 + y2) / 2}Q${xL - 20} ${(y1 + y2) / 2} ${xL - 20} ${(y1 + y2) / 2 + 16}L${xL - 20} ${y2 - 20}Q${xL - 20} ${y2} ${xL} ${y2}" fill="none" stroke="${C.acento}" stroke-width="3.5"/>`)
      g.push(t(xL - 50, (y1 + y2) / 2 + 10, rot, { size: 28, peso: 700, color: C.acento, anchor: "end", espaciado: 2 }))
    }
    llave(160, 342, "AVIAR")
    llave(364, 514, "NAVEGAR")
    llave(536, 962, "COMUNICAR")
    return lienzo({ ...this, desc: this.alt, sub: "Una estructura para ordenar la respuesta; lo que manda es el QRH y el SOP", cuerpo: g.join("") })
  },
}

// ─── RV-18 ──────────────────────────────────────────────────────────────────

const RV18 = {
  codigo: "RV-18",
  alto: 900,
  titulo: "RVSM separa; el TCAS actúa cuando eso falla",
  alt: "Dos aviones en niveles RVSM adyacentes, separados 1.000 ft, con el rótulo lo que RVSM garantiza. A la derecha, una porción de ND genérico con el tráfico próximo y su altitud relativa, +10, y una escala vertical genérica con la banda de resolución del TCAS, con el rótulo lo que actúa cuando esa garantía falló. Al pie, destacado: una RA se vuela, aunque contradiga la autorización del ATC.",
  svg() {
    const g = []
    const [y360, y350] = [290, 570]
    g.push(linea(`M80 ${y360}L800 ${y360}`, { color: C.claro, sw: 2, dash: "6 8" }))
    g.push(linea(`M80 ${y350}L800 ${y350}`, { color: C.claro, sw: 2, dash: "6 8" }))
    g.push(t(90, y360 - 14, "FL 360", { size: 22, peso: 700, color: C.suave }))
    g.push(t(90, y350 + 34, "FL 350", { size: 22, peso: 700, color: C.suave }))
    g.push(avionLado(480, y360 - 8, 1, { izquierda: true, color: C.acento }))
    g.push(avionLado(330, y350 - 8, 1))
    g.push(cota(580, y360 + 6, 580, y350 - 6, { color: "tinta", sw: 3.5 }))
    g.push(t(600, (y360 + y350) / 2 - 6, "1.000 ft", { size: 26, peso: 700 }))
    g.push(t(600, (y360 + y350) / 2 + 26, "lo que RVSM garantiza", { size: 22, peso: 700, color: C.acento }))
    // ND.
    const [nx, ny, nw, nh] = [900, 190, 300, 320]
    g.push(`<rect x="${nx - 12}" y="${ny - 12}" width="${nw + 24}" height="${nh + 24}" rx="18" fill="#2A2E34"/><rect x="${nx}" y="${ny}" width="${nw}" height="${nh}" rx="8" fill="${C.pantalla}"/>`)
    g.push(`<path d="M${nx + 30} ${ny + nh - 40}A120 120 0 0 1 ${nx + nw - 30} ${ny + nh - 40}" fill="none" stroke="${C.pantallaBorde}" stroke-width="2" stroke-dasharray="6 8"/>`)
    g.push(`<path d="M${nx + nw / 2} ${ny + nh - 64}L${nx + nw / 2 + 14} ${ny + nh - 34}L${nx + nw / 2 - 14} ${ny + nh - 34}Z" fill="none" stroke="${C.pantallaTexto}" stroke-width="3"/>`)
    const [tx, ty] = [nx + nw / 2 + 40, ny + 120]
    g.push(`<path d="M${tx} ${ty - 14}L${tx + 14} ${ty}L${tx} ${ty + 14}L${tx - 14} ${ty}Z" fill="${C.pantallaTexto}"/>`)
    g.push(`<text x="${tx}" y="${ty - 24}" font-family="'Courier New', Courier, monospace" font-size="22" font-weight="700" fill="${C.pantallaTexto}" text-anchor="middle">+10</text>`)
    g.push(t(nx + nw / 2, ny + nh + 50, "Tráfico próximo: +10 es 1.000 ft por encima", { size: 20, color: C.suave, anchor: "middle" }))
    // Escala vertical con la banda de resolución.
    const [sx, sy, sw2, sh] = [1300, 190, 180, 320]
    g.push(`<rect x="${sx - 12}" y="${sy - 12}" width="${sw2 + 24}" height="${sh + 24}" rx="18" fill="#2A2E34"/><rect x="${sx}" y="${sy}" width="${sw2}" height="${sh}" rx="8" fill="${C.pantalla}"/>`)
    g.push(`<rect x="${sx + 60}" y="${sy + 20}" width="40" height="130" fill="#D64545"/>`)
    g.push(`<rect x="${sx + 60}" y="${sy + 170}" width="40" height="60" fill="${C.pantallaVerde}"/>`)
    for (let k = 0; k <= 6; k++) g.push(linea(`M${sx + 110} ${sy + 20 + k * 46}L${sx + 130} ${sy + 20 + k * 46}`, { color: C.pantallaSuave, sw: 2 }))
    g.push(linea(`M${sx + 40} ${sy + 200}L${sx + 120} ${sy + 200}`, { color: C.pantallaTexto, sw: 4 }))
    g.push(tl(sx + sw2 / 2, sy + sh + 50, ["Banda de resolución", "del TCAS (RA)"], { size: 20, color: C.suave, anchor: "middle", lh: 24 }))
    g.push(t(1190, 620, "lo que actúa cuando esa garantía falló", { size: 24, peso: 700, color: C.rojo, anchor: "middle" }))
    g.push(caja(56, 700, 1488, 100, { fill: C.acento, stroke: null, rx: 16 }))
    g.push(t(800, 764, "Una RA se vuela, aunque contradiga la autorización del ATC.", { size: 32, peso: 700, color: C.papel, anchor: "middle" }))
    return lienzo({ ...this, desc: this.alt, recreacion: "Pantallas genéricas · no imitan a ningún fabricante", cuerpo: g.join("") })
  },
}

// ─── RV-19 ──────────────────────────────────────────────────────────────────

function iconoCadena(k, x, y) {
  const c = C.acento
  if (k === 0) return `<path d="M${x} ${y - 26}L${x + 28} ${y + 22}L${x - 28} ${y + 22}Z" fill="none" stroke="${C.ambar}" stroke-width="5" stroke-linejoin="round"/>` + t(x, y + 16, "!", { size: 28, peso: 700, color: C.ambar, anchor: "middle" })
  if (k === 1) return linea(`M${x - 40} ${y - 20}L${x - 10} ${y - 20}L${x + 20} ${y + 16}L${x + 42} ${y + 16}`, { color: c, sw: 5, flecha: "acento" }) + linea(`M${x - 44} ${y + 2}L${x + 44} ${y + 2}`, { color: C.gris, sw: 2, dash: "4 6" })
  if (k === 2) return `<path d="M${x - 34} ${y + 18}A34 34 0 0 1 ${x + 34} ${y + 18}" fill="none" stroke="${c}" stroke-width="5"/>` + linea(`M${x} ${y + 18}L${x + 22} ${y - 8}`, { color: C.rojo, sw: 5 })
  return t(x - 10, y + 12, "kg", { size: 30, peso: 700, color: c, anchor: "middle" }) + linea(`M${x + 30} ${y - 22}L${x + 30} ${y + 20}`, { color: C.rojo, sw: 5, flecha: "rojo" })
}

const RV19 = {
  codigo: "RV-19",
  alto: 900,
  titulo: "Lo que cuesta perder RVSM",
  alt: "Cadena de izquierda a derecha: pérdida de capacidad RVSM; salida del espacio, normalmente por debajo de FL 290; mayor consumo por hora; predicción al destino revisada; y la decisión, conserva alterno más reserva final. Si sí, continuar vigilando. Si no, replanificar con el despacho.",
  svg() {
    const g = []
    const pasos = [
      ["PÉRDIDA DE CAPACIDAD RVSM", ""],
      ["SALIDA DEL ESPACIO", "normalmente por debajo de FL 290"],
      ["MAYOR CONSUMO POR HORA", ""],
      ["PREDICCIÓN AL DESTINO REVISADA", ""],
    ]
    const w = 250
    pasos.forEach(([tit, sub], i) => {
      const x = 56 + i * (w + 44)
      g.push(caja(x, 330, w, 240, { fill: C.papel, stroke: C.acento2, sw: 3, rx: 16 }))
      g.push(iconoCadena(i, x + w / 2, 400))
      const p = parrafo(x + w / 2, 470, tit, w - 30, { size: 22, peso: 700, color: C.acento, anchor: "middle" })
      g.push(p.svg)
      if (sub) g.push(parrafo(x + w / 2, 470 + p.alto + 4, sub, w - 30, { size: 20, color: C.suave, anchor: "middle" }).svg)
      g.push(linea(`M${x + w + 6} 450L${x + w + 38} 450`, { color: C.acento, sw: 5, flecha: "acento" }))
    })
    const [cx, cy] = [1360, 450]
    g.push(`<path d="M${cx} ${cy - 130}L${cx + 180} ${cy}L${cx} ${cy + 130}L${cx - 180} ${cy}Z" fill="${C.acento}"/>`)
    g.push(tl(cx, cy - 22, ["¿CONSERVA", "ALTERNO +", "RESERVA FINAL?"], { size: 22, peso: 700, color: C.papel, anchor: "middle", lh: 28 }))
    g.push(linea(`M${cx} ${cy - 130}L${cx} ${cy - 196}`, { color: C.verde, sw: 4, flecha: "verde" }))
    g.push(caja(cx - 190, 170, 380, 70, { fill: C.verdeSuave, stroke: null, rx: 14 }))
    g.push(t(cx, 214, "SÍ · continuar vigilando", { size: 24, peso: 700, color: C.verde, anchor: "middle" }))
    g.push(linea(`M${cx} ${cy + 130}L${cx} ${cy + 196}`, { color: C.rojo, sw: 4, flecha: "rojo" }))
    g.push(caja(cx - 190, 650, 380, 70, { fill: C.rojoSuave, stroke: null, rx: 14 }))
    g.push(t(cx, 694, "NO · replanificar con el despacho", { size: 22, peso: 700, color: C.rojo, anchor: "middle" }))
    g.push(t(56, 820, "La falla es técnica; la decisión termina siendo de combustible. Ver el módulo de Gestión del combustible.", { size: 22, color: C.suave }))
    return lienzo({ ...this, desc: this.alt, sub: "Una falla técnica en crucero termina en una decisión de combustible", cuerpo: g.join("") })
  },
}

// ─── RV-20 ──────────────────────────────────────────────────────────────────

const RV20 = {
  codigo: "RV-20",
  alto: 1240,
  titulo: "Un vuelo completo, con RVSM de principio a fin",
  alt: "Perfil de un vuelo desde el despegue en Bogotá hasta un destino internacional, con la franja entre FL 290 y FL 410 sombreada como espacio RVSM. Once marcadores numerados: preflight, plan de vuelo, ascenso, altitud de transición, puerta RVSM en FL 290, nivelado en FL 370, chequeo altimétrico cada hora, turbulencia con la llamada unable RVSM due turbulence, posible falla y su contingencia, salida del espacio RVSM al descender por FL 290, y postvuelo con la anotación en el libro. Debajo, qué se hace en cada uno.",
  svg() {
    const g = []
    const [f410, f290, f370, suelo] = [260, 420, 305, 760]
    g.push(`<rect x="56" y="${f410}" width="1488" height="${f290 - f410}" fill="${C.tinte}"/>`)
    g.push(t(80, f410 + 34, "ESPACIO RVSM · FL 290 a FL 410", { size: 22, peso: 700, color: C.acento, espaciado: 1 }))
    g.push(linea(`M56 ${f290}L1544 ${f290}`, { color: C.acento, sw: 3 }))
    g.push(t(66, f290 - 10, "FL 290", { size: 20, peso: 700, color: C.acento }))
    // Terreno: la sabana de Bogotá en alto, a la izquierda.
    g.push(`<path d="M56 ${suelo}L56 650L110 640L230 640C300 640 330 690 420 720C520 752 700 ${suelo} 900 ${suelo}L1544 ${suelo}L1544 800L56 800Z" fill="${C.relieve[1]}" stroke="${C.relieveLinea}" stroke-width="2"/>`)
    const perfil = [[110, 640], [230, 640], [640, f370], [1260, f370], [1500, suelo]]
    g.push(linea(perfil.map(([x, y], i) => `${i ? "L" : "M"}${x} ${y}`).join(""), { color: C.tinta, sw: 5 }))
    g.push(t(150, 680, "BOGOTÁ", { size: 22, peso: 700, anchor: "middle" }))
    g.push(t(1480, suelo + 30, "DESTINO", { size: 22, peso: 700, anchor: "middle" }))
    g.push(t(780, f370 - 14, "FL 370", { size: 22, peso: 700, anchor: "middle" }))
    const enAscenso = (y) => 230 + ((640 - y) / (640 - f370)) * 410
    const enDescenso = (y) => 1260 + ((y - f370) / (suelo - f370)) * 240
    const marcas = [
      [1, 120, 640],
      [2, 190, 640],
      [3, enAscenso(560), 560],
      [4, enAscenso(490), 490],
      [5, enAscenso(f290), f290],
      [6, 700, f370],
      [7, 860, f370],
      [8, 1010, f370],
      [9, 1150, f370],
      [10, enDescenso(f290), f290],
      [11, 1500, suelo],
    ]
    for (const [k, x, y] of marcas) {
      const arriba = k === 1 || k === 2 || k === 11 ? -44 : k === 10 ? 44 : -44
      g.push(linea(`M${x} ${y}L${x} ${y + arriba + (arriba < 0 ? 22 : -22)}`, { color: C.acento, sw: 2.5 }))
      g.push(`<circle cx="${x}" cy="${y}" r="7" fill="${C.acento}"/>`)
      g.push(num(x, y + arriba, k, { r: 20 }))
    }
    // Turbulencia en el 8.
    g.push(`<path d="M960 ${f370 + 44}q12 -14 24 0t24 0t24 0t24 0" fill="none" stroke="${C.ambar}" stroke-width="3"/>`)
    const items = [
      "Preflight: libro técnico, tomas estáticas y altímetros.",
      "Plan de vuelo: la W en la casilla 10.",
      "Ascenso.",
      "Altitud de transición: 1013,25 hPa.",
      "Puerta RVSM en FL 290: las verificaciones de entrada.",
      "Nivelado en FL 370.",
      "Chequeo altimétrico, cada hora.",
      "Turbulencia: «unable RVSM due turbulence».",
      "Posible falla: el flujo de contingencia.",
      "Salida del espacio RVSM al descender por FL 290.",
      "Postvuelo: la anotación en el libro.",
    ]
    items.forEach((texto, i) => {
      const col = i % 3
      const fila = Math.floor(i / 3)
      const x = 56 + col * 500
      const y = 870 + fila * 88
      g.push(num(x + 20, y, i + 1, { r: 20 }))
      g.push(tl(x + 54, y + 8, partir(texto, 420, 22), { size: 22, lh: 27 }))
    })
    return lienzo({ ...this, desc: this.alt, sub: "Dónde aparece cada procedimiento del módulo dentro de una operación real", cuerpo: g.join("") })
  },
}

export const CONTINGENCIA = [RV15, RV16, RV17, RV18, RV19, RV20]
