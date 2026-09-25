/**
 * PB-24 a PB-29: la operación. El ATC, el plan de vuelo, la MEL, el reparto en
 * cabina, la pérdida de capacidad y la carta completa.
 */
import { C, RECREACION, caja, flyBy, flyOver, leyenda, linea, lienzo, num, parrafo, partir, pista, senal, t, tl } from "../../figuras/lib.mjs"

// ─── PB-24 ──────────────────────────────────────────────────────────────────

const PB24 = {
  codigo: "PB-24",
  alto: 940,
  titulo: "Una autorización que cambia el procedimiento",
  alt: "Diagrama de flujo vertical con siete cajas: autorización del ATC, entender, colacionar, seleccionar o modificar el FMS, contrastar, ejecutar y vigilar. Junto a contrastar, tres preguntas: a qué punto exactamente, qué restricciones sobreviven y si sigue enganchada la aproximación. Una flecha vuelve de vigilar al principio: cada cambio del ATC reinicia el flujo.",
  svg() {
    const g = []
    const pasos = ["AUTORIZACIÓN DEL ATC", "ENTENDER", "COLACIONAR", "SELECCIONAR O MODIFICAR EL FMS", "CONTRASTAR", "EJECUTAR", "VIGILAR"]
    const [x, w, h, paso] = [420, 520, 80, 106]
    pasos.forEach((p, i) => {
      const y = 160 + i * paso
      const clave = i === 4
      g.push(caja(x, y, w, h, { fill: clave ? C.acento : i === 0 ? C.tinte2 : C.papel, stroke: clave ? null : C.acento2, rx: 14 }))
      g.push(t(x + w / 2, y + 50, p, { size: 26, peso: 700, color: clave ? C.papel : C.acento, anchor: "middle" }))
      if (i < pasos.length - 1) g.push(linea(`M${x + w / 2} ${y + h + 2}L${x + w / 2} ${y + paso - 6}`, { color: C.acento2, sw: 4, flecha: "acento2" }))
    })
    // La vuelta al principio.
    const yVig = 160 + 6 * paso + h / 2
    g.push(linea(`M${x} ${yVig}L${x - 70} ${yVig}L${x - 70} ${160 + h / 2}L${x - 8} ${160 + h / 2}`, { color: C.acento2, sw: 4, flecha: "acento2", dash: "12 9" }))
    g.push(tl(x - 96, 500, ["Cada cambio", "del ATC reinicia", "el flujo."], { size: 24, peso: 700, color: C.acento, anchor: "end", lh: 30 }))
    // Las preguntas del contraste.
    const yc = 160 + 4 * paso
    g.push(linea(`M${x + w} ${yc + h / 2}L${x + w + 60} ${yc + h / 2}`, { color: C.acento, sw: 3 }))
    g.push(caja(x + w + 60, yc - 60, 480, 200, { fill: C.tinte, stroke: null, rx: 14 }))
    const preguntas = ["¿A qué punto, exactamente?", "¿Qué restricciones sobreviven?", "¿Sigue enganchada la aproximación?"]
    preguntas.forEach((q, i) => {
      g.push(`<circle cx="${x + w + 92}" cy="${yc - 10 + i * 56}" r="6" fill="${C.acento}"/>`)
      g.push(t(x + w + 110, yc - 2 + i * 56, q, { size: 24, peso: 700, color: C.acento }))
    })
    return lienzo({ ...this, desc: this.alt, sub: "No se programa y se ejecuta: en el medio hay un contraste", cuerpo: g.join("") })
  },
}

// ─── PB-25 ──────────────────────────────────────────────────────────────────

const PB25 = {
  codigo: "PB-25",
  alto: 900,
  titulo: "Dónde se declara la capacidad PBN",
  alt: "Recreación de un fragmento de plan de vuelo OACI. En la casilla 10, la cadena de equipo SDFGHIRWY/S, con la R resaltada. En la casilla 18, PBN/A1D2O2S2 y otro indicador. Debajo, qué significa cada descriptor: A1, RNAV 10; D2, RNAV 1 con GNSS; O2, RNP 1 básica con GNSS; S2, RNP APCH con Baro-VNAV. Tres números señalan la R, el indicador PBN/ y el descriptor S2.",
  pie: "Casilla 10 y descriptores según el Doc 4444 de la OACI, Apéndice 2. El resto de la cadena es de ejemplo.",
  anotaciones: 3,
  svg() {
    const g = [caja(56, 160, 1074, 700, { fill: C.papel, stroke: C.tinta, sw: 2, rx: 3 })]
    const mono = (x, y, s, o = {}) => `<text x="${x}" y="${y}" font-family="'Courier New', Courier, monospace" font-size="${o.size ?? 44}" font-weight="700" fill="${o.color ?? C.tinta}">${s}</text>`
    const ancho = 26.4
    g.push(t(90, 220, "10  EQUIPO Y CAPACIDADES", { size: 22, peso: 700, color: C.suave, espaciado: 1 }))
    g.push(caja(90, 240, 700, 90, { fill: C.papel, stroke: C.tinta, sw: 2, rx: 2 }))
    const eq = "SDFGHIRWY/S"
    const iR = eq.indexOf("R")
    g.push(`<rect x="${120 + iR * ancho - 4}" y="256" width="${ancho + 8}" height="60" rx="6" fill="${C.tinte2}"/>`)
    g.push(mono(120, 300, eq))
    g.push(t(90, 450, "18  OTRA INFORMACIÓN", { size: 22, peso: 700, color: C.suave, espaciado: 1 }))
    g.push(caja(90, 470, 1000, 90, { fill: C.papel, stroke: C.tinta, sw: 2, rx: 2 }))
    const otra = "PBN/A1D2O2S2 DOF/261015"
    g.push(`<rect x="${120 - 4}" y="486" width="${ancho * 4 + 8}" height="60" rx="6" fill="${C.tinte2}"/>`)
    g.push(`<rect x="${120 + 10 * ancho - 4}" y="486" width="${ancho * 2 + 8}" height="60" rx="6" fill="${C.tinte2}"/>`)
    g.push(mono(120, 530, otra))
    // Qué dice cada descriptor.
    const desc = [["A1", "RNAV 10"], ["D2", "RNAV 1 con GNSS"], ["O2", "RNP 1 básica con GNSS"], ["S2", "RNP APCH con Baro-VNAV"]]
    desc.forEach(([k, v], i) => {
      const x = 90 + (i % 2) * 500
      const y = 700 + Math.floor(i / 2) * 70
      g.push(mono(x, y, k, { size: 30, color: C.acento }))
      g.push(t(x + 60, y - 2, v, { size: 26 }))
    })
    g.push(senal(1, [120 + iR * ancho + 13, 386], [120 + iR * ancho + 13, 320]))
    g.push(senal(2, [120 + 2 * ancho, 612], [120 + 2 * ancho, 550], { r: 20 }))
    g.push(senal(3, [120 + 11 * ancho, 612], [120 + 11 * ancho, 550], { r: 20 }))
    g.push(
      leyenda(1160, 190, [
        [1, "La R de la casilla 10", "PBN aprobado. Es la declaración general; el detalle va en la 18."],
        [2, "El indicador PBN/", "Los descriptores concretos: hasta 8, y no más de 16 caracteres en total."],
        [3, "S2", "RNP APCH con Baro-VNAV: la guía vertical barométrica se declara aparte, distinta de S1."],
      ]),
    )
    return lienzo({ ...this, desc: this.alt, recreacion: "Recreación educativa · plan de ejemplo", cuerpo: g.join("") })
  },
}

// ─── PB-26 ──────────────────────────────────────────────────────────────────

const PB26 = {
  codigo: "PB-26",
  alto: 900,
  titulo: "En la MEL, la decisión está en las observaciones",
  alt: "Recreación de una entrada de MEL ficticia para un receptor GNSS, con cinco columnas: ítem y sistema, categoría de reparación C, dos instalados, uno requerido para el despacho, y las observaciones, que empiezan con el símbolo (O) de procedimiento operacional y dicen que no se permiten las operaciones que exijan dos receptores. Cinco números señalan la columna del sistema, el número requerido, el (O), la columna de observaciones y el renglón que quita una capacidad de navegación.",
  pie: "Entrada inventada para enseñar dónde mirar. El formato de columnas cambia entre la MMEL del fabricante y la MEL de cada operador.",
  anotaciones: 5,
  svg() {
    const g = [caja(56, 170, 1074, 420, { fill: C.papel, stroke: C.tinta, sw: 2, rx: 3 })]
    const cols = [[56, 290, "ÍTEM Y SISTEMA"], [290, 380, "CAT."], [380, 510, "INSTAL."], [510, 640, "REQUER."], [640, 1130, "OBSERVACIONES O EXCEPCIONES"]]
    g.push(`<rect x="57" y="171" width="1072" height="70" fill="${C.grisClaro}"/>`)
    for (const [a, b, rot] of cols) {
      g.push(t((a + b) / 2, 214, rot, { size: 20, peso: 700, color: C.suave, anchor: "middle", espaciado: 1 }))
      if (a > 56) g.push(linea(`M${a} 170L${a} 590`, { color: C.tinta, sw: 1.5, cap: "butt" }))
    }
    g.push(linea("M56 241L1130 241", { color: C.tinta, sw: 1.5, cap: "butt" }))
    g.push(tl(76, 290, ["34-XX-01", "Receptor GNSS"], { size: 24, peso: 700, lh: 32 }))
    g.push(t(335, 290, "C", { size: 30, peso: 700, anchor: "middle" }))
    g.push(t(445, 290, "2", { size: 30, peso: 700, anchor: "middle" }))
    g.push(t(575, 290, "1", { size: 30, peso: 700, anchor: "middle" }))
    const obs = ["(O) Uno puede estar inoperativo", "siempre que:", "a) se cumpla el procedimiento", "operacional asociado, y", "b) no se hagan operaciones que", "exijan dos receptores GNSS."]
    // Las observaciones bajan un renglón para dejar sitio al número del (O).
    const y0 = 340
    g.push(`<rect x="660" y="${y0 + 4 * 34 - 26}" width="360" height="${2 * 34 + 8}" rx="6" fill="${C.ambarSuave}"/>`)
    g.push(tl(664, y0, obs, { size: 23, lh: 34 }))
    g.push(senal(1, [173, 420], [173, 330]))
    g.push(senal(2, [575, 400], [575, 304]))
    g.push(senal(3, [740, 280], [690, 312]))
    g.push(senal(4, [1100, 206], [1078, 206], { r: 18 }))
    g.push(senal(5, [1080, y0 + 4 * 34 + 12], [1026, y0 + 4 * 34 + 12]))
    g.push(
      leyenda(1160, 190, [
        [1, "Sistema e ítem", "Lo que se busca, pero no lo que decide."],
        [2, "Requeridos", "Cuántos para despachar. Despachar no es conservar todas las capacidades."],
        [3, "(O)", "Hay un procedimiento operacional asociado: ahí suele estar la restricción real."],
        [4, "Observaciones", "Lo que queda limitado. Es lo que se salta quien solo mira si sale."],
        [5, "La restricción", "El renglón que quita una capacidad PBN con el avión despachable."],
      ]),
    )
    return lienzo({ ...this, desc: this.alt, recreacion: "Entrada ficticia · con fines de enseñanza", cuerpo: g.join("") })
  },
}

// ─── PB-27 ──────────────────────────────────────────────────────────────────

const PB27 = {
  codigo: "PB-27",
  alto: 700,
  titulo: "Seleccionar, verificar, ejecutar, vigilar",
  alt: "Cuatro bloques en fila, cada uno más oscuro que el anterior: seleccionar, desde la base de datos y nunca a mano; verificar, contra la carta y lo hace otro; ejecutar, el punto sin retorno; y vigilar, la desviación lateral, el progreso, el valor RNP y los avisos. Entre verificar y ejecutar, una barra vertical marca el límite.",
  svg() {
    const g = []
    const bloques = [
      ["SELECCIONAR", "Desde la base de datos, nunca a mano.", C.tinte2, C.acento],
      ["VERIFICAR", "Contra la carta, y lo hace otro.", C.claro, C.acento],
      ["EJECUTAR", "El punto sin retorno.", C.acento2, C.papel],
      ["VIGILAR", "Desviación lateral, progreso, valor RNP y avisos.", C.acento, C.papel],
    ]
    const w = 300
    const gap = 96
    const x0 = (1600 - (4 * w + 3 * gap)) / 2
    bloques.forEach(([nombre, texto, fondo, color], i) => {
      const x = x0 + i * (w + gap)
      g.push(caja(x, 300, w, 170, { fill: fondo, stroke: null, rx: 16 }))
      g.push(t(x + w / 2, 400, nombre, { size: 32, peso: 700, color, anchor: "middle" }))
      g.push(parrafo(x + w / 2, 530, texto, w - 20, { size: 24, anchor: "middle", color: C.tinta }).svg)
      if (i < 3) g.push(linea(`M${x + w + 10} 385L${x + w + gap - 12} 385`, { color: C.acento, sw: 7, flecha: "acento" }))
    })
    const xb = x0 + 2 * w + gap + gap / 2
    g.push(`<rect x="${xb - 6}" y="230" width="12" height="320" rx="6" fill="${C.tinta}"/>`)
    g.push(t(xb, 212, "EL LÍMITE: nada se ejecuta sin verificar", { size: 24, peso: 700, color: C.tinta, anchor: "middle" }))
    return lienzo({ ...this, desc: this.alt, sub: "Cuatro pasos para gestionar el FMS, con la frontera marcada", cuerpo: g.join("") })
  },
}

// ─── PB-28 ──────────────────────────────────────────────────────────────────

const PB28 = {
  codigo: "PB-28",
  alto: 1140,
  titulo: "Perder la capacidad PBN: el flujo",
  alt: "Diagrama de flujo vertical: la capacidad PBN se degrada; controlar el avión; identificar el mensaje o la falla; contrastar la posición; aplicar QRH y SOP; determinar qué capacidad de navegación queda; y la pregunta decisiva, se puede seguir cumpliendo la especificación exigida. Si la respuesta es sí, continuar y seguir vigilando. Si es no, informar al ATC, solicitar autorización alternativa y usar la capacidad de navegación disponible. A la izquierda, tres notas: el mensaje concreto está en el FCOM y el QRH; qué capacidad queda depende de la especificación; y la pregunta decisiva se contestó en el briefing.",
  svg() {
    const g = []
    const cajas = ["LA CAPACIDAD PBN SE DEGRADA", "CONTROLAR EL AVIÓN", "IDENTIFICAR EL MENSAJE O LA FALLA", "CONTRASTAR LA POSICIÓN", "APLICAR QRH Y SOP", "DETERMINAR QUÉ CAPACIDAD DE NAVEGACIÓN QUEDA"]
    const [x, w, h, paso] = [500, 680, 64, 86]
    cajas.forEach((c, i) => {
      const y = 160 + i * paso
      g.push(caja(x, y, w, h, { fill: i === 0 ? C.tinte2 : C.papel, stroke: C.acento2, rx: 12 }))
      g.push(t(x + w / 2, y + 41, c, { size: 22, peso: 700, color: C.acento, anchor: "middle" }))
      g.push(linea(`M${x + w / 2} ${y + h + 2}L${x + w / 2} ${y + paso - 4}`, { color: C.acento2, sw: 4, flecha: "acento2" }))
    })
    // La pregunta.
    const [cx, cy, dw, dh] = [x + w / 2, 160 + 6 * paso + 84, 680, 168]
    g.push(`<path d="M${cx} ${cy - dh / 2}L${cx + dw / 2} ${cy}L${cx} ${cy + dh / 2}L${cx - dw / 2} ${cy}Z" fill="${C.acento}"/>`)
    g.push(tl(cx, cy - 16, ["¿SE PUEDE SEGUIR CUMPLIENDO", "LA ESPECIFICACIÓN EXIGIDA?"], { size: 24, peso: 700, color: C.papel, anchor: "middle", lh: 32 }))
    // Sí.
    g.push(linea(`M${cx + dw / 2} ${cy}L${1262} ${cy}`, { color: C.verde, sw: 4, flecha: "verde" }))
    g.push(t((cx + dw / 2 + 1262) / 2, cy - 16, "SÍ", { size: 24, peso: 700, color: C.verde, anchor: "middle" }))
    g.push(caja(1272, cy - 50, 272, 100, { fill: C.verdeSuave, stroke: null, rx: 14 }))
    g.push(tl(1408, cy - 6, ["Continuar y", "seguir vigilando"], { size: 24, peso: 700, color: C.verde, anchor: "middle", lh: 30 }))
    // No.
    g.push(linea(`M${cx} ${cy + dh / 2}L${cx} ${cy + dh / 2 + 44}`, { color: C.acento, sw: 4, flecha: "acento" }))
    g.push(t(cx + 16, cy + dh / 2 + 32, "NO", { size: 24, peso: 700, color: C.acento }))
    const no = ["INFORMAR AL ATC", "SOLICITAR AUTORIZACIÓN ALTERNATIVA", "USAR LA CAPACIDAD DE NAVEGACIÓN DISPONIBLE"]
    no.forEach((c, i) => {
      const y = cy + dh / 2 + 54 + i * 66
      g.push(caja(x - 20, y, w + 40, 56, { fill: C.tinte, stroke: C.acento, rx: 12 }))
      g.push(t(cx, y + 37, c, { size: 22, peso: 700, color: C.acento, anchor: "middle" }))
    })
    // Las tres notas.
    const nota = (y, texto, yAncla) => {
      const p = parrafo(80, y + 34, texto, 380, { size: 22, color: C.tinta })
      return caja(56, y, 420, p.alto + 32, { fill: C.papel, stroke: C.claro, rx: 12 }) + p.svg + linea(`M476 ${yAncla}L${x - 6} ${yAncla}`, { color: C.claro, sw: 2.5, dash: "3 6" })
    }
    g.push(nota(160 + 2 * paso - 6, "El mensaje concreto está en el FCOM y el QRH.", 160 + 2 * paso + h / 2))
    g.push(nota(160 + 5 * paso - 20, "Depende de la especificación: las fuentes admitidas no son las mismas.", 160 + 5 * paso + h / 2))
    g.push(nota(cy - 40, "Esto se contestó en el briefing.", cy))
    return lienzo({ ...this, desc: this.alt, sub: "Sirve en cualquier fase y con cualquier especificación", cuerpo: g.join("") })
  },
}

// ─── PB-29 ──────────────────────────────────────────────────────────────────

const PB29 = {
  codigo: "PB-29",
  alto: 1580,
  titulo: "Una carta PBN completa",
  alt: "Recreación de una carta de aproximación RNP AR a la pista 09 que ocupa todo el ancho: título arriba a la izquierda; recuadro de equipo requerido y recuadro PBN arriba a la derecha; en planta, IAF, un tramo RF con su velocidad máxima, el FAF con su altitud, la pista y la frustrada hacia un circuito de espera; debajo, el perfil vertical; y abajo, el bloque de notas a la izquierda y la caja de mínimos con tres valores RNP a la derecha. Doce números señalan título, recuadro PBN, equipo requerido, pista, un punto fly-by, el tramo RF, una restricción de altitud, una de velocidad, la derrota, el valor RNP, las notas y la frustrada; debajo de la carta, qué significa cada uno.",
  anotaciones: 12,
  svg() {
    const g = [caja(56, 150, 1488, 930, { fill: C.papel, stroke: C.tinta, sw: 2, rx: 3 })]
    // Cabecera.
    g.push(t(84, 214, "RNP RWY 09 (AR)", { size: 42, peso: 700 }))
    g.push(t(84, 250, "Aproximación por instrumentos", { size: 22, color: C.suave }))
    g.push(caja(820, 164, 300, 96, { fill: C.papel, stroke: C.tinta, sw: 2.5, rx: 2 }))
    g.push(t(838, 194, "EQUIPO REQUERIDO", { size: 20, peso: 700, color: C.suave, espaciado: 1 }))
    g.push(t(838, 234, "Vigilancia ATS", { size: 24, peso: 700 }))
    g.push(caja(1140, 164, 386, 96, { fill: C.papel, stroke: C.tinta, sw: 2.5, rx: 2 }))
    g.push(t(1158, 194, "PBN", { size: 20, peso: 700, color: C.suave, espaciado: 1 }))
    g.push(t(1158, 226, "RNP AR APCH · RF requerido", { size: 22, peso: 700 }))
    g.push(t(1158, 252, "GNSS · RNP 0.30 mínimo", { size: 22, peso: 700 }))
    g.push(linea("M56 280L1544 280", { color: C.tinta, sw: 2, cap: "butt" }))

    // Planta.
    const yf = 600
    const iaf = [480, 350]
    const bolte = [480, 440]
    const r = 160
    const curen = [640, yf]
    const damox = [840, yf]
    const umbral = [1020, yf]
    g.push(linea(`M${iaf[0]} ${iaf[1]}L${bolte[0]} ${bolte[1]}`, { color: C.tinta, sw: 4 }))
    g.push(`<path d="M${bolte[0]} ${bolte[1]}A${r} ${r} 0 0 0 ${curen[0]} ${curen[1]}" fill="none" stroke="${C.tinta}" stroke-width="5"/>`)
    g.push(linea(`M${curen[0]} ${yf}L${umbral[0]} ${yf}`, { color: C.tinta, sw: 4 }))
    g.push(pista(umbral[0], yf, 1120, yf, 16))
    g.push(t(1070, yf + 40, "RWY 09", { size: 22, peso: 700, anchor: "middle" }))
    g.push(`<path d="M1120 ${yf}L1200 ${yf}C1250 ${yf} 1270 ${yf - 30} 1270 ${yf - 70}L1270 ${yf - 100}" fill="none" stroke="${C.tinta}" stroke-width="3.5" stroke-dasharray="12 9" marker-end="url(#f-tinta)"/>`)
    g.push(`<path d="M1270 ${yf - 110}L1270 ${yf - 180}A30 30 0 0 1 1330 ${yf - 180}L1330 ${yf - 110}A30 30 0 0 1 1270 ${yf - 110}" fill="none" stroke="${C.tinta}" stroke-width="3"/>`)
    g.push(flyOver(1270, yf - 110, 12))
    g.push(t(1250, yf - 104, "MAHF", { size: 20, peso: 700, anchor: "end" }))
    g.push(t(1530, yf - 70, "FRUSTRADA · RNP 1.0", { size: 20, peso: 700, color: C.suave, anchor: "end" }))
    g.push(flyBy(...iaf, 14))
    g.push(t(iaf[0] + 26, iaf[1] + 8, "ASMIR", { size: 22, peso: 700 }))
    g.push(t(iaf[0] + 26, iaf[1] - 20, "IAF", { size: 20, peso: 700, color: C.suave }))
    g.push(flyBy(...bolte, 14))
    g.push(t(bolte[0] - 26, bolte[1] + 8, "BOLTE", { size: 22, peso: 700, anchor: "end" }))
    g.push(flyBy(...curen, 14))
    g.push(t(curen[0], yf + 44, "CUREN", { size: 22, peso: 700, anchor: "middle" }))
    g.push(t(curen[0], yf - 26, "IF", { size: 20, peso: 700, color: C.suave, anchor: "middle" }))
    g.push(flyBy(...damox, 14))
    g.push(t(damox[0], yf + 44, "DAMOX", { size: 22, peso: 700, anchor: "middle" }))
    g.push(t(damox[0] - 28, yf - 22, "FAF", { size: 20, peso: 700, color: C.suave, anchor: "end" }))
    // Restricciones y derrotas.
    g.push(t(400, iaf[1] + 8, "4000", { size: 24, peso: 700, anchor: "middle" }))
    g.push(linea(`M372 ${iaf[1] + 15}L428 ${iaf[1] + 15}`, { color: C.tinta, sw: 2.5, cap: "butt" }))
    g.push(t(470, 402, "180°", { size: 22, peso: 700, anchor: "end" }))
    g.push(t(560, 470, "RF", { size: 26, peso: 700 }))
    g.push(t(560, 500, "MAX 180 KT", { size: 20, peso: 700 }))
    g.push(t(damox[0], yf - 58, "3000", { size: 22, peso: 700, anchor: "middle" }))
    g.push(linea(`M814 ${yf - 80}L866 ${yf - 80}M814 ${yf - 52}L866 ${yf - 52}`, { color: C.tinta, sw: 2.5, cap: "butt" }))
    g.push(t(740, yf + 34, "090°", { size: 22, peso: 700, anchor: "middle" }))

    // Perfil.
    const suelo = 830
    g.push(linea("M56 680L1544 680", { color: C.tinta, sw: 1.5, cap: "butt" }))
    g.push(linea(`M300 ${suelo}L1300 ${suelo}`, { color: C.suave, sw: 2 }))
    g.push(`<rect x="1020" y="${suelo - 6}" width="100" height="8" fill="${C.tinta}"/>`)
    g.push(linea(`M640 740L840 740L1020 ${suelo - 12}`, { color: C.tinta, sw: 4 }))
    g.push(linea(`M840 730L840 ${suelo}`, { color: C.suave, sw: 2, dash: "4 6" }))
    g.push(t(840, 722, "DAMOX · 3000", { size: 20, peso: 700, anchor: "middle" }))
    g.push(linea(`M900 ${suelo - 30}L1100 ${suelo - 30}`, { color: C.tinta, sw: 2, dash: "10 7" }))
    g.push(t(1110, suelo - 24, "DA", { size: 20, peso: 700 }))
    g.push(linea(`M964 ${suelo - 30}L1040 ${suelo - 80}`, { color: C.tinta, sw: 3, dash: "10 8", flecha: "tinta" }))
    g.push(linea("M56 856L1544 856", { color: C.tinta, sw: 1.5, cap: "butt" }))

    // Notas y mínimos.
    g.push(t(84, 892, "NOTAS", { size: 20, peso: 700, color: C.suave, espaciado: 1 }))
    const notas = ["1. Solo con autorización específica del operador.", "2. Baro-VNAV no autorizado fuera de los límites", "de temperatura publicados.", "3. Ajuste altimétrico: solo QNH del aeródromo."]
    g.push(tl(84, 930, notas, { size: 22, lh: 32 }))
    g.push(linea("M720 856L720 1080", { color: C.tinta, sw: 1.5, cap: "butt" }))
    g.push(t(748, 892, "MÍNIMOS", { size: 20, peso: 700, color: C.suave, espaciado: 1 }))
    const minimos = [["RNP 0.30", "DA 1620 (420)", "1600 m"], ["RNP 0.15", "DA 1560 (360)", "1400 m"], ["RNP 0.10", "DA 1520 (320)", "1200 m"]]
    minimos.forEach(([a, b, c], i) => {
      const y = 936 + i * 50
      g.push(t(748, y, a, { size: 24, peso: 700 }))
      g.push(t(960, y, b, { size: 24 }))
      g.push(t(1200, y, c, { size: 24 }))
    })

    // Los doce números.
    const marcas = [
      [1, [500, 204], [466, 204]],
      [2, [1100, 300], [1160, 262]],
      [3, [790, 212], [820, 212]],
      [4, [1070, yf + 76], [1070, yf + 48]],
      [5, [940, yf - 60], [852, yf - 10]],
      [6, [420, 520], [508, 520]],
      [7, [330, 316], [376, 340]],
      [8, [720, 462], [684, 492]],
      [9, [740, yf - 60], [740, yf - 4]],
      [10, [900, 928], [866, 928]],
      [11, [196, 886], [166, 886]],
      [12, [1420, yf + 40], [1236, yf - 12]],
    ]
    for (const [k, b, p] of marcas) g.push(senal(k, b, p, { r: 20 }))

    // Qué significa cada número, debajo de la carta.
    const items = [
      [1, "Título", "La clase de procedimiento; no dice solo qué exige."],
      [2, "Recuadro PBN", "Especificación, sensores y valor RNP mínimo. Obligatorio."],
      [3, "Equipo requerido", "Lo de tierra o del aeropuerto, aparte."],
      [4, "Pista", "Lo que se carga tiene que ser exactamente esto."],
      [5, "Punto fly-by", "El giro se anticipa."],
      [6, "Tramo RF", "Arco de radio constante: capacidad listada y velocidad máxima."],
      [7, "Restricción de altitud", "Se verifica cargada en el FMS."],
      [8, "Restricción de velocidad", "En un RF es parte del diseño."],
      [9, "Derrota", "La referencia contra la que se compara el FMS."],
      [10, "Valor con dos decimales", "0.30 o menos: operación con autorización requerida."],
      [11, "Notas", "Temperatura, ajuste altimétrico y condiciones."],
      [12, "Frustrada", "Su propio requisito de navegación."],
    ]
    items.forEach(([k, titulo, texto], i) => {
      const col = i % 3
      const fila = Math.floor(i / 3)
      const x = 56 + col * 500
      const y = 1134 + fila * 104
      g.push(num(x + 20, y, k, { r: 20 }))
      g.push(t(x + 54, y + 8, titulo, { size: 24, peso: 700 }))
      g.push(tl(x + 54, y + 38, partir(texto, 420, 21), { size: 21, color: C.suave, lh: 26 }))
    })
    return lienzo({ ...this, desc: this.alt, sub: "En el orden en que se mira", recreacion: RECREACION, cuerpo: g.join("") })
  },
}

export const OPERACION = [PB24, PB25, PB26, PB27, PB28, PB29]
