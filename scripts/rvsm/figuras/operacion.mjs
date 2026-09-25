/**
 * RV-08 a RV-14: la MEL, el plan de vuelo, el preflight, la entrada al
 * espacio, las desviaciones y la cadena que evita el level bust.
 */
import { C, avionLado, caja, cota, leyenda, linea, lienzo, parrafo, pildora, senal, t, tl } from "../../figuras/lib.mjs"

const mono = (x, y, s, o = {}) =>
  `<text x="${x}" y="${y}" font-family="'Courier New', Courier, monospace" font-size="${o.size ?? 40}" font-weight="700" fill="${o.color ?? C.tinta}"${o.anchor ? ` text-anchor="${o.anchor}"` : ""}>${s}</text>`

// ─── RV-08 ──────────────────────────────────────────────────────────────────

const RV08 = {
  codigo: "RV-08",
  alto: 900,
  titulo: "Despachable no quiere decir RVSM",
  alt: "Recreación de una entrada de MEL ficticia para el control automático de altitud, con columnas de ítem, categoría, instalados, requeridos y observaciones. Requeridos para el despacho: cero. En las observaciones, con las marcas (M) y (O), la condición: no se opera en espacio RVSM. Tres números señalan la columna de requeridos, el renglón de la restricción y las marcas (M) y (O).",
  pie: "Entrada inventada para enseñar dónde mirar; el formato cambia entre la MMEL del fabricante y la MEL de cada operador.",
  anotaciones: 3,
  svg() {
    const g = [caja(56, 170, 1074, 420, { fill: C.papel, stroke: C.tinta, sw: 2, rx: 3 })]
    const cols = [[56, 300, "ÍTEM Y SISTEMA"], [300, 390, "CAT."], [390, 520, "INSTAL."], [520, 650, "REQUER."], [650, 1130, "OBSERVACIONES O EXCEPCIONES"]]
    g.push(`<rect x="57" y="171" width="1072" height="70" fill="${C.grisClaro}"/>`)
    for (const [a, b, rot] of cols) {
      g.push(t((a + b) / 2, 214, rot, { size: 20, peso: 700, color: C.suave, anchor: "middle", espaciado: 1 }))
      if (a > 56) g.push(linea(`M${a} 170L${a} 590`, { color: C.tinta, sw: 1.5, cap: "butt" }))
    }
    g.push(linea("M56 241L1130 241", { color: C.tinta, sw: 1.5, cap: "butt" }))
    g.push(tl(76, 290, ["22-XX-01", "Control automático", "de altitud"], { size: 24, peso: 700, lh: 32 }))
    g.push(t(345, 290, "C", { size: 30, peso: 700, anchor: "middle" }))
    g.push(t(455, 290, "2", { size: 30, peso: 700, anchor: "middle" }))
    g.push(t(585, 290, "0", { size: 30, peso: 700, anchor: "middle" }))
    const y0 = 340
    const obs = ["(M) (O) Pueden estar inoperativos", "siempre que:", "a) se cumplan los procedimientos", "asociados, y", "b) no se opere en espacio RVSM."]
    g.push(`<rect x="670" y="${y0 + 4 * 34 - 26}" width="400" height="42" rx="6" fill="${C.ambarSuave}"/>`)
    g.push(tl(674, y0, obs, { size: 23, lh: 34 }))
    g.push(senal(1, [585, 420], [585, 304]))
    g.push(senal(2, [1090, y0 + 4 * 34 - 6], [1060, y0 + 4 * 34 - 6], { r: 20 }))
    g.push(senal(3, [760, 282], [720, 318]))
    g.push(
      leyenda(1160, 190, [
        [1, "Requeridos", "Cuántos hacen falta para despachar. Responde «¿sale el avión?», no «¿es RVSM?»."],
        [2, "La restricción", "Aquí la MEL retira la capacidad RVSM, con todas las letras."],
        [3, "(M) y (O)", "(M), procedimiento de mantenimiento; (O), operacional: ese lo cumple la tripulación."],
      ]),
    )
    return lienzo({ ...this, desc: this.alt, recreacion: "Entrada ficticia · con fines de enseñanza", cuerpo: g.join("") })
  },
}

// ─── RV-09 ──────────────────────────────────────────────────────────────────

const RV09 = {
  codigo: "RV-09",
  alto: 900,
  titulo: "Dónde vive RVSM en el plan de vuelo",
  alt: "Recreación de un fragmento de plan de vuelo OACI con las casillas 7 a 10: identificación AVY101, reglas y tipo de vuelo IS, tipo de aeronave y estela A320/M, y en la casilla 10 la cadena de equipo SDFGHIRWY/S con la W resaltada. Tres números señalan la W, el resto de la cadena y la casilla 7.",
  pie: "Plan de ejemplo, con identificación ficticia. La W de la casilla 10 es la del Doc 4444 de la OACI.",
  anotaciones: 3,
  svg() {
    const g = [caja(56, 170, 1074, 560, { fill: C.papel, stroke: C.tinta, sw: 2, rx: 3 })]
    const casillas = [
      [90, 330, "7  IDENTIFICACIÓN", "AVY101"],
      [350, 520, "8  REGLAS · TIPO", "I S"],
      [540, 800, "9  AERONAVE · ESTELA", "A320/M"],
    ]
    for (const [a, b, rot, v] of casillas) {
      g.push(t(a, 250, rot, { size: 20, peso: 700, color: C.suave, espaciado: 0.5 }))
      g.push(caja(a, 268, b - a, 84, { fill: C.papel, stroke: C.tinta, sw: 2, rx: 2 }))
      g.push(mono(a + 20, 324, v))
    }
    g.push(t(90, 440, "10  EQUIPO Y CAPACIDADES", { size: 20, peso: 700, color: C.suave, espaciado: 0.5 }))
    g.push(caja(90, 458, 700, 84, { fill: C.papel, stroke: C.tinta, sw: 2, rx: 2 }))
    const eq = "SDFGHIRWY/S"
    const ancho = 24
    const iW = eq.indexOf("W")
    g.push(`<rect x="${110 + iW * ancho - 3}" y="470" width="${ancho + 6}" height="60" rx="6" fill="${C.tinte2}"/>`)
    g.push(mono(110, 514, eq))
    g.push(senal(1, [110 + iW * ancho + 12, 620], [110 + iW * ancho + 12, 540]))
    g.push(senal(2, [230, 620], [230, 540]))
    g.push(senal(3, [210, 400], [210, 352]))
    g.push(
      leyenda(1160, 190, [
        [1, "La W", "Declara capacidad RVSM: con ella el ATS decide si te aplica 1.000 ft. Es una declaración, no una autorización."],
        [2, "El resto de la cadena", "Las demás capacidades. La W convive con ellas; no las sustituye."],
        [3, "Casilla 7", "La identificación. Si la matrícula es otra, va en la información complementaria."],
      ]),
    )
    return lienzo({ ...this, desc: this.alt, recreacion: "Recreación educativa · plan de ejemplo", cuerpo: g.join("") })
  },
}

// ─── RV-10 ──────────────────────────────────────────────────────────────────

const RV10 = {
  codigo: "RV-10",
  alto: 900,
  titulo: "La toma estática, en el preflight",
  alt: "Esquema del fuselaje delantero de un reactor, de costado, con la toma estática marcada por un círculo y la zona del revestimiento a su alrededor sombreada. Al lado, lo que se busca: superficie limpia y sin obstrucción; revestimiento sin abolladuras ni reparaciones que alteren el flujo; y sin cinta, sellante ni pintura sobre la toma o su entorno.",
  svg() {
    const g = []
    // Fuselaje.
    g.push(`<path d="M80 540C80 430 190 360 360 346L940 340L940 700L360 700C200 700 80 640 80 540Z" fill="${C.grisClaro}" stroke="${C.gris}" stroke-width="3"/>`)
    g.push(`<path d="M190 430L250 400L330 392L318 440L200 452Z" fill="${C.tinta}" opacity="0.85"/>`)
    g.push(`<path d="M340 390L400 386L396 436L330 440Z" fill="${C.tinta}" opacity="0.85"/>`)
    g.push(`<rect x="560" y="400" width="96" height="200" rx="18" fill="none" stroke="${C.gris}" stroke-width="3"/>`)
    for (const x of [720, 800, 880]) g.push(`<rect x="${x}" y="420" width="34" height="46" rx="14" fill="${C.papel}" stroke="${C.gris}" stroke-width="2"/>`)
    g.push(linea("M100 610C300 660 700 668 940 666", { color: C.gris, sw: 2 }))
    // La zona y la toma.
    g.push(`<ellipse cx="440" cy="560" rx="120" ry="80" fill="${C.tinte}" stroke="${C.acento}" stroke-width="3" stroke-dasharray="8 8"/>`)
    g.push(`<rect x="412" y="538" width="56" height="44" rx="8" fill="${C.papel}" stroke="${C.tinta}" stroke-width="2.5"/>`)
    for (const [dx, dy] of [[-12, -8], [12, -8], [-12, 8], [12, 8]]) g.push(`<circle cx="${440 + dx}" cy="${560 + dy}" r="4.5" fill="${C.tinta}"/>`)
    g.push(`<circle cx="440" cy="560" r="44" fill="none" stroke="${C.ambar}" stroke-width="5"/>`)
    g.push(linea("M470 520L560 250", { color: C.ambar, sw: 3 }))
    g.push(t(560, 236, "TOMA ESTÁTICA", { size: 24, peso: 700, color: C.ambar }))
    g.push(t(300, 690, "zona a su alrededor", { size: 22, color: C.acento, peso: 700 }))
    // Qué se busca.
    g.push(t(1000, 250, "QUÉ SE BUSCA", { size: 20, peso: 700, color: C.suave, espaciado: 1.5 }))
    const items = ["Superficie limpia y sin obstrucción.", "Revestimiento sin abolladuras ni reparaciones que alteren el flujo.", "Sin cinta, sellante ni pintura sobre la toma o su entorno."]
    let y = 290
    for (const i of items) {
      const p = parrafo(1030, y + 38, i, 480, { size: 24, peso: 700, color: C.acento })
      g.push(caja(1000, y, 540, p.alto + 34, { fill: C.tinte, stroke: null, rx: 12 }))
      g.push(p.svg)
      y += p.alto + 54
    }
    return lienzo({ ...this, desc: this.alt, sub: "En RVSM, lo que altera el flujo junto a la toma altera la altitud que se mide", cuerpo: g.join("") })
  },
}

// ─── RV-11 ──────────────────────────────────────────────────────────────────

const RV11 = {
  codigo: "RV-11",
  alto: 900,
  titulo: "La puerta se cruza con la capacidad confirmada",
  alt: "Perfil de ascenso de izquierda a derecha, con una línea gruesa en FL 290 rotulada puerta de entrada RVSM. Antes de la línea, un recuadro con la secuencia de verificación: capacidad, sistemas, altímetros, mantenimiento del nivel, reporte de altitud, meteorología y autorización, con la nota de que es un resumen educativo y que manda el SOP, el FCOM y el QRH del operador. Al otro lado de la línea, en el espacio RVSM, el avión ya nivelado.",
  svg() {
    const g = []
    const puerta = 430
    g.push(`<rect x="600" y="160" width="944" height="${puerta - 160}" fill="${C.tinte}"/>`)
    g.push(t(1520, 200, "ESPACIO RVSM", { size: 24, peso: 700, color: C.acento, anchor: "end", espaciado: 1.5 }))
    g.push(linea("M300 860L1000 330L1544 330", { color: C.gris, sw: 4, dash: "12 10" }))
    g.push(linea(`M600 ${puerta}L1544 ${puerta}`, { color: C.acento, sw: 8 }))
    g.push(t(1520, puerta + 44, "FL 290 · PUERTA DE ENTRADA RVSM", { size: 26, peso: 700, color: C.acento, anchor: "end" }))
    g.push(avionLado(760, 510, 0.9, { rot: -37 }))
    g.push(avionLado(1300, 322, 0.9))
    // La secuencia.
    g.push(caja(80, 170, 470, 470, { fill: C.papel, stroke: C.acento, sw: 3, rx: 16 }))
    g.push(t(110, 214, "ANTES DE FL 290", { size: 22, peso: 700, color: C.acento, espaciado: 1.5 }))
    const pasos = ["Capacidad", "Sistemas", "Altímetros", "Mantenimiento del nivel", "Reporte de altitud", "Meteorología", "Autorización"]
    pasos.forEach((p, i) => {
      const y = 262 + i * 46
      g.push(`<circle cx="124" cy="${y - 8}" r="16" fill="${C.acento}"/>`)
      g.push(t(124, y - 1, String(i + 1), { size: 20, peso: 700, color: C.papel, anchor: "middle" }))
      g.push(t(154, y, p, { size: 24, peso: 700 }))
    })
    g.push(parrafo(110, 592, "Resumen educativo: seguir siempre el SOP, el FCOM y el QRH del operador.", 420, { size: 20, color: C.suave, italica: true }).svg)
    g.push(linea(`M550 ${puerta - 40}L592 ${puerta - 8}`, { color: C.acento, sw: 3, flecha: "acento" }))
    g.push(parrafo(960, 620, "Si algo falla antes, se pide una autorización que evite el espacio. Dentro, se comunica y se coordina.", 560, { size: 24, color: C.tinta }).svg)
    return lienzo({ ...this, desc: this.alt, sub: "Antes de cruzar se confirma; lo que pasa después se gestiona con otras reglas", cuerpo: g.join("") })
  },
}

// ─── RV-12 ──────────────────────────────────────────────────────────────────

const RV12 = {
  codigo: "RV-12",
  alto: 900,
  titulo: "AAD, TVE y ASE: tres distancias distintas",
  alt: "Un avión en crucero y tres líneas horizontales: el nivel asignado, FL 350, continuo; la altitud que el transpondedor transmite, de trazo y punto; y la altitud que el avión vuela de verdad, de puntos, donde está el avión. Tres cotas: AAD, entre el nivel asignado y lo que transmite el transpondedor, es lo que ve el ATC; TVE, entre el nivel asignado y la altitud real, es la separación real que se pierde; ASE, entre lo transmitido y lo real, es el error de medición, invisible en cabina.",
  svg() {
    const g = []
    const [asig, trans, real] = [330, 450, 570]
    g.push(linea(`M120 ${asig}L1040 ${asig}`, { color: C.acento, sw: 6 }))
    g.push(linea(`M120 ${trans}L1040 ${trans}`, { color: C.tinta, sw: 3, dash: "18 8 3 8" }))
    g.push(linea(`M120 ${real}L1040 ${real}`, { color: C.tinta, sw: 3, dash: "3 8" }))
    g.push(t(130, asig - 16, "NIVEL ASIGNADO · FL 350", { size: 24, peso: 700, color: C.acento }))
    g.push(t(130, trans - 16, "ALTITUD QUE EL TRANSPONDEDOR TRANSMITE", { size: 22, peso: 700 }))
    g.push(t(130, real + 40, "ALTITUD QUE EL AVIÓN VUELA DE VERDAD", { size: 22, peso: 700 }))
    g.push(avionLado(560, real - 10, 1))
    const cotas = [
      [760, asig, real, "TVE", "tinta"],
      [880, asig, trans, "AAD", "acento"],
      [1000, trans, real, "ASE", "ambar"],
    ]
    for (const [x, a, b, sig, color] of cotas) {
      g.push(cota(x, a + 6, x, b - 6, { color, sw: 3.5 }))
      g.push(t(x - 12, (sig === "TVE" ? (a + trans) / 2 : (a + b) / 2) + 8, sig, { size: 24, peso: 700, color: C[color], anchor: "end" }))
    }
    const defs = [
      ["AAD", "acento", "Lo que ve el ATC: el nivel transmitido frente al asignado."],
      ["TVE", "tinta", "La separación real que se pierde: la altitud verdadera frente a la asignada."],
      ["ASE", "ambar", "El error de medición del sistema altimétrico. Invisible en cabina."],
    ]
    defs.forEach(([sig, color, texto], i) => {
      const y = 250 + i * 150
      g.push(caja(1100, y, 444, 130, { fill: C.papel, stroke: C[color], sw: 3, rx: 14 }))
      g.push(t(1126, y + 44, sig, { size: 30, peso: 700, color: C[color] }))
      g.push(parrafo(1126, y + 80, texto, 400, { size: 21, color: C.tinta }).svg)
    })
    return lienzo({ ...this, desc: this.alt, sub: "Una de las preguntas de entrevista que más separa a los candidatos", cuerpo: g.join("") })
  },
}

// ─── RV-13 ──────────────────────────────────────────────────────────────────

const RV13 = {
  codigo: "RV-13",
  alto: 900,
  titulo: "Una desviación grande se come el margen",
  alt: "Dos aviones de costado en niveles RVSM adyacentes. El de arriba, en FL 360, nivel autorizado y mantenido. El de abajo tiene autorizado FL 350, marcado con una línea de puntos, pero vuela por encima de ella y ascendiendo. Una cota marca la desviación vertical entre el nivel autorizado y el real; otra, a la derecha, el margen real que queda entre los dos aviones, visiblemente menor que los 1.000 ft nominales.",
  svg() {
    const g = []
    const [fl360, fl350, realY] = [330, 640, 490]
    g.push(linea(`M120 ${fl360}L1480 ${fl360}`, { color: C.acento, sw: 3 }))
    g.push(linea(`M120 ${fl350}L1480 ${fl350}`, { color: C.tinta, sw: 3, dash: "3 9" }))
    g.push(t(130, fl360 - 18, "FL 360 · nivel autorizado y mantenido", { size: 24, peso: 700, color: C.acento }))
    g.push(t(130, fl350 + 40, "FL 350 · NIVEL AUTORIZADO", { size: 24, peso: 700 }))
    g.push(avionLado(1000, fl360 - 10, 1.05, { izquierda: true, color: C.acento }))
    g.push(avionLado(640, realY - 6, 1.05, { rot: -7 }))
    g.push(t(560, realY - 50, "NIVEL REAL", { size: 22, peso: 700, anchor: "end" }))
    g.push(`<rect x="380" y="${realY}" width="60" height="${fl350 - realY}" fill="${C.rojoSuave}"/>`)
    g.push(cota(410, realY + 6, 410, fl350 - 6, { color: "rojo", sw: 3.5 }))
    g.push(tl(370, realY + 64, ["DESVIACIÓN", "VERTICAL"], { size: 22, peso: 700, color: C.rojo, anchor: "end", lh: 27 }))
    g.push(cota(1240, fl360 + 6, 1240, realY - 6, { color: "ambar", sw: 3.5 }))
    g.push(tl(1260, (fl360 + realY) / 2, ["margen real", "restante"], { size: 22, peso: 700, color: C.ambar, lh: 27 }))
    g.push(cota(1420, fl360 + 6, 1420, fl350 - 6, { color: "suave", sw: 2.5 }))
    g.push(tl(1410, fl350 - 90, ["1.000 ft", "nominales"], { size: 20, color: C.suave, anchor: "end", lh: 24 }))
    return lienzo({ ...this, desc: this.alt, sub: "No es un error abstracto: es la distancia que separa a dos aviones reales", cuerpo: g.join("") })
  },
}

// ─── RV-14 ──────────────────────────────────────────────────────────────────

const RV14 = {
  codigo: "RV-14",
  alto: 900,
  titulo: "La cadena que evita el level bust",
  alt: "Diagrama de flujo de siete bloques con el responsable de cada uno: autorización ATC, los dos escuchan; colación, el PM; selección de altitud, el PM; verificación cruzada, PF y PM, destacada como el eslabón que más se salta; ejecución, el PF; nivelación dentro de 150 ft, el PF; y vigilancia del nivel, los dos.",
  svg() {
    const g = []
    const pasos = [
      ["AUTORIZACIÓN ATC", "LOS DOS ESCUCHAN"],
      ["COLACIÓN", "PM"],
      ["SELECCIÓN DE ALTITUD", "PM"],
      ["VERIFICACIÓN CRUZADA", "PF Y PM"],
      ["EJECUCIÓN", "PF"],
      ["NIVELACIÓN · dentro de 150 ft", "PF"],
      ["VIGILANCIA DEL NIVEL", "LOS DOS"],
    ]
    const [x, w, h, paso] = [470, 560, 70, 96]
    pasos.forEach(([p, quien], i) => {
      const y = 160 + i * paso
      const clave = i === 3
      g.push(caja(x, y, w, h, { fill: clave ? C.acento : C.papel, stroke: clave ? null : C.acento2, sw: 3, rx: 14 }))
      g.push(t(x + w / 2, y + 45, p, { size: 26, peso: 700, color: clave ? C.papel : C.acento, anchor: "middle" }))
      g.push(pildora(x + w + 30, y + h / 2, quien, { size: 20, fill: C.tinte, color: C.acento }).svg)
      if (i < pasos.length - 1) g.push(linea(`M${x + w / 2} ${y + h + 2}L${x + w / 2} ${y + paso - 4}`, { color: C.acento2, sw: 4, flecha: "acento2" }))
    })
    const yk = 160 + 3 * paso + h / 2
    g.push(linea(`M${x - 8} ${yk}L${x - 70} ${yk}`, { color: C.rojo, sw: 3 }))
    g.push(tl(x - 84, yk - 6, ["El eslabón que", "más se salta"], { size: 26, peso: 700, color: C.rojo, anchor: "end", lh: 32 }))
    return lienzo({ ...this, desc: this.alt, sub: "Una secuencia con responsables, no una cuestión de atención individual", cuerpo: g.join("") })
  },
}

export const OPERACION = [RV08, RV09, RV10, RV11, RV12, RV13, RV14]
