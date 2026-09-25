/**
 * PB-08 a PB-10: dónde se mira en una carta PBN.
 *
 * Son recreaciones genéricas: ni la carta de un aeródromo real ni el formato de
 * un proveedor concreto. Los nombres de punto son inventados y las cifras son
 * ilustrativas, y así lo dice el rótulo de cada figura.
 */
import { C, RECREACION, caja, flyBy, leyenda, linea, lienzo, num, pista, senal, t, tl } from "../../figuras/lib.mjs"

/** El papel de la carta: esquinas rectas y filete fino, como una carta impresa. */
const papel = (x, y, w, h) => caja(x, y, w, h, { fill: C.papel, stroke: C.tinta, sw: 2, rx: 3 })

/** Restricción de altitud con su convención: barra debajo, «o por encima»; barra encima, «o por debajo». */
function restriccion(x, y, valor, tipo) {
  const w = valor.length * 15 + 6
  let s = t(x, y, valor, { size: 26, peso: 700, anchor: "middle" })
  if (tipo === "min" || tipo === "exacta") s += linea(`M${x - w / 2} ${y + 7}L${x + w / 2} ${y + 7}`, { color: C.tinta, sw: 2.5, cap: "butt" })
  if (tipo === "max" || tipo === "exacta") s += linea(`M${x - w / 2} ${y - 24}L${x + w / 2} ${y - 24}`, { color: C.tinta, sw: 2.5, cap: "butt" })
  return s
}

/** Rótulo de derrota sobre un tramo, girado con él. */
function derrota(x1, y1, x2, y2, texto, lado = -1) {
  const a = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI
  const rot = a > 90 || a < -90 ? a + 180 : a
  const mx = (x1 + x2) / 2
  const my = (y1 + y2) / 2
  const nx = (-(y2 - y1) / Math.hypot(x2 - x1, y2 - y1)) * 22 * lado
  const ny = ((x2 - x1) / Math.hypot(x2 - x1, y2 - y1)) * 22 * lado
  return t(mx + nx, my + ny + 8, texto, { size: 22, peso: 700, anchor: "middle", rot })
}

// ─── PB-08 ──────────────────────────────────────────────────────────────────

const PB08 = {
  codigo: "PB-08",
  alto: 900,
  titulo: "Dónde mirar en una SID PBN",
  alt: "Recreación de una carta de salida RNAV. Arriba a la derecha, dos recuadros apilados: el recuadro PBN, con RNAV 1 y los sensores admitidos, y debajo el de equipo requerido. En planta, la pista 09 y cuatro waypoints de nombre ficticio unidos por la derrota, con sus rumbos, dos restricciones de altitud y una de velocidad. Cinco números señalan el recuadro PBN, el de equipo, un punto fly-by, una restricción de altitud y la derrota entre dos puntos.",
  anotaciones: 5,
  svg() {
    const g = [papel(56, 150, 1074, 710)]
    g.push(t(84, 200, "SALIDA NORMALIZADA POR INSTRUMENTOS · SID", { size: 22, peso: 700, color: C.suave, espaciado: 1 }))
    g.push(t(84, 244, "RNAV KILAB 1A", { size: 36, peso: 700 }))
    g.push(t(84, 280, "RWY 09", { size: 26, peso: 700, color: C.suave }))
    // Los dos recuadros, el PBN primero.
    g.push(caja(780, 168, 322, 110, { fill: C.papel, stroke: C.tinta, sw: 2.5, rx: 2 }))
    g.push(t(798, 198, "PBN", { size: 22, peso: 700, color: C.suave, espaciado: 1 }))
    g.push(t(798, 232, "RNAV 1", { size: 26, peso: 700 }))
    g.push(t(798, 264, "GNSS o DME/DME/IRU", { size: 22, peso: 700 }))
    g.push(caja(780, 288, 322, 84, { fill: C.papel, stroke: C.tinta, sw: 2.5, rx: 2 }))
    g.push(t(798, 318, "EQUIPO REQUERIDO", { size: 22, peso: 700, color: C.suave, espaciado: 1 }))
    g.push(t(798, 352, "Vigilancia ATS", { size: 24, peso: 700 }))

    const der = [270, 790]
    const pts = { OLTAR: [400, 790], PUXEM: [540, 660], RIBOS: [620, 510], KILAB: [830, 440] }
    g.push(pista(130, 790, 270, 790, 18))
    g.push(t(200, 830, "RWY 09", { size: 22, peso: 700, anchor: "middle" }))
    const ruta = [der, pts.OLTAR, pts.PUXEM, pts.RIBOS, pts.KILAB]
    g.push(linea(ruta.map(([x, y], i) => `${i ? "L" : "M"}${x} ${y}`).join(""), { color: C.tinta, sw: 4 }))
    g.push(linea(`M${pts.KILAB[0]} ${pts.KILAB[1]}L1000 410`, { color: C.tinta, sw: 4, flecha: "tinta" }))
    g.push(derrota(...der, ...pts.OLTAR, "090°", 1))
    g.push(derrota(...pts.OLTAR, ...pts.PUXEM, "047°"))
    g.push(derrota(...pts.PUXEM, ...pts.RIBOS, "028°", 1))
    g.push(derrota(...pts.RIBOS, ...pts.KILAB, "072°"))
    for (const [nombre, [x, y]] of Object.entries(pts)) {
      g.push(flyBy(x, y, 15))
      g.push(t(x + 24, y + 32, nombre, { size: 24, peso: 700 }))
    }
    g.push(restriccion(620, 742, "5000", "min"))
    g.push(restriccion(548, 520, "9000", "max"))
    g.push(t(320, 762, "MAX 230 KT", { size: 22, peso: 700, anchor: "middle" }))
    g.push(t(1010, 440, "en ruta", { size: 22, color: C.suave }))

    g.push(senal(1, [740, 222], [780, 222]))
    g.push(senal(2, [740, 330], [780, 330]))
    g.push(senal(3, [470, 600], [528, 650]))
    g.push(senal(4, [720, 760], [660, 736]))
    g.push(senal(5, [780, 560], [725, 478]))

    g.push(
      leyenda(1160, 190, [
        [1, "Recuadro PBN", "La especificación y los sensores: lo obligatorio."],
        [2, "Equipo requerido", "Lo de tierra o del aeropuerto, aparte."],
        [3, "Punto fly-by", "El giro se anticipa: cambia la trayectoria."],
        [4, "Restricción de altitud", "Se verifica cargada en el FMS."],
        [5, "Derrota publicada", "La referencia contra la que se compara el FMS."],
      ]),
    )
    return lienzo({ ...this, desc: this.alt, recreacion: RECREACION, cuerpo: g.join("") })
  },
}

// ─── PB-09 ──────────────────────────────────────────────────────────────────

const PB09 = {
  codigo: "PB-09",
  alto: 1000,
  titulo: "Qué mirar en una aproximación RNP",
  alt: "Recreación de una carta de aproximación RNP a la pista 09: título arriba, recuadro PBN a la derecha, vista en planta con IAF, dos puntos intermedios, FAF, pista y frustrada hacia un circuito de espera, perfil vertical con la altitud del FAF y la DA, y abajo la caja de mínimos con tres líneas y el bloque de notas. Seis números señalan el título, el recuadro PBN, el FAF, la frustrada, la caja de mínimos y las notas.",
  anotaciones: 6,
  svg() {
    const g = [papel(56, 150, 1074, 810)]
    // Cabecera.
    g.push(t(84, 206, "RNP RWY 09", { size: 40, peso: 700 }))
    g.push(t(84, 240, "Aproximación por instrumentos", { size: 22, color: C.suave }))
    g.push(caja(740, 168, 364, 92, { fill: C.papel, stroke: C.tinta, sw: 2.5, rx: 2 }))
    g.push(t(758, 198, "PBN", { size: 22, peso: 700, color: C.suave, espaciado: 1 }))
    g.push(t(758, 234, "RNP APCH · GNSS", { size: 24, peso: 700 }))
    g.push(linea("M56 274L1130 274", { color: C.tinta, sw: 2, cap: "butt" }))

    // Planta.
    const y = 470
    const P = { IAF: [150, y], IWP: [300, y], IF: [450, y], FAF: [610, y] }
    const nombres = { IAF: "ASMIR", IWP: "BOLTE", IF: "CUREN", FAF: "DAMOX" }
    g.push(linea(`M150 ${y}L810 ${y}`, { color: C.tinta, sw: 4 }))
    g.push(pista(810, y, 900, y, 16))
    // Frustrada: sigue al frente, sube y gira a la espera.
    g.push(linea(`M900 ${y}L980 ${y}C1020 ${y} 1030 ${y - 40} 1030 ${y - 70}L1030 ${y - 84}`, { color: C.tinta, sw: 3.5, dash: "12 9", flecha: "tinta" }))
    g.push(`<path d="M1030 ${y - 90}L1030 ${y - 150}A28 28 0 0 1 1086 ${y - 150}L1086 ${y - 90}A28 28 0 0 1 1030 ${y - 90}" fill="none" stroke="${C.tinta}" stroke-width="3"/>`)
    g.push(flyBy(1030, y - 90, 13))
    g.push(t(1008, y - 96, "MAHF", { size: 20, peso: 700, anchor: "end" }))
    for (const [k, [x, yy]] of Object.entries(P)) {
      g.push(flyBy(x, yy, 15))
      g.push(t(x, yy - 30, k, { size: 22, peso: 700, color: C.suave, anchor: "middle" }))
      g.push(t(x, yy + 44, nombres[k], { size: 22, peso: 700, anchor: "middle" }))
    }
    g.push(t(860, y + 44, "RWY 09", { size: 20, peso: 700, anchor: "middle" }))

    // Perfil.
    const suelo = 700
    g.push(linea(`M100 ${suelo}L1100 ${suelo}`, { color: C.suave, sw: 2 }))
    g.push(`<rect x="810" y="${suelo - 6}" width="90" height="8" fill="${C.tinta}"/>`)
    g.push(linea(`M300 590L610 590L810 ${suelo - 14}`, { color: C.tinta, sw: 4 }))
    g.push(linea(`M610 578L610 ${suelo}`, { color: C.suave, sw: 2, dash: "4 6" }))
    g.push(t(610, 572, "FAF · 3000", { size: 22, peso: 700, anchor: "middle" }))
    g.push(linea(`M700 ${suelo - 36}L900 ${suelo - 36}`, { color: C.tinta, sw: 2, dash: "10 7" }))
    g.push(t(910, suelo - 30, "DA", { size: 22, peso: 700 }))
    g.push(linea(`M762 ${suelo - 36}L850 ${suelo - 96}`, { color: C.tinta, sw: 3, dash: "10 8", flecha: "tinta" }))
    g.push(t(700, 626, "3.0°", { size: 22, color: C.suave }))
    g.push(linea(`M56 720L1130 720`, { color: C.tinta, sw: 2, cap: "butt" }))

    // Mínimos y notas.
    g.push(t(84, 756, "MÍNIMOS", { size: 20, peso: 700, color: C.suave, espaciado: 1 }))
    const filas = [
      ["LPV", "DA 1450 (250)", "750 m"],
      ["LNAV/VNAV", "DA 1560 (360)", "1200 m"],
      ["LNAV", "MDA 1620 (420)", "1600 m"],
    ]
    filas.forEach(([l, a, v], i) => {
      const yy = 800 + i * 48
      g.push(t(84, yy, l, { size: 24, peso: 700 }))
      g.push(t(270, yy, a, { size: 24 }))
      g.push(t(500, yy, v, { size: 24 }))
    })
    g.push(linea(`M620 720L620 960`, { color: C.tinta, sw: 2, cap: "butt" }))
    g.push(t(644, 756, "NOTAS", { size: 20, peso: 700, color: C.suave, espaciado: 1 }))
    g.push(tl(644, 796, ["1. Baro-VNAV no autorizado fuera", "de los límites de temperatura", "publicados.", "2. Ajuste altimétrico: QNH local."], { size: 22, lh: 32 }))

    g.push(senal(1, [360, 192], [326, 192]))
    g.push(senal(2, [700, 214], [740, 214]))
    g.push(senal(3, [690, 370], [620, 456]))
    g.push(senal(4, [980, 560], [960, 474]))
    g.push(senal(5, [236, 750], [196, 750]))
    g.push(senal(6, [770, 750], [730, 750]))

    g.push(
      leyenda(1160, 190, [
        [1, "Título", "Sigue la convención de quien publica; no dice solo qué exige."],
        [2, "Recuadro PBN", "Especificación, sensores y valor RNP mínimo. Obligatorio."],
        [3, "FAF", "A 2 NM de aquí, el sistema ya está en modo aproximación."],
        [4, "Frustrada", "Tiene su propio requisito de navegación."],
        [5, "Mínimos", "Cada línea pide una capacidad del avión y del operador."],
        [6, "Notas", "Aquí están las limitaciones, como la de temperatura."],
      ]),
    )
    return lienzo({ ...this, desc: this.alt, recreacion: RECREACION, cuerpo: g.join("") })
  },
}

// ─── PB-10 ──────────────────────────────────────────────────────────────────

const PB10 = {
  codigo: "PB-10",
  alto: 900,
  titulo: "La caja de mínimos no es un menú",
  alt: "Recreación de una caja de mínimos de una aproximación RNP con cuatro líneas y columnas por categoría de aeronave A, B, C y D. LPV con DA 1450 (250) y 750 m; LNAV/VNAV con DA 1560 (360) y 1200 m; LNAV con MDA 1620 (420); y circuito, con MDA de 1620 a 1900 según la categoría. Cuatro números señalan cada línea. Las cifras son ilustrativas.",
  pie: "Cifras ilustrativas, para un aeródromo de 1200 ft de elevación. Las alturas y visibilidades mínimas de circuito por categoría siguen el patrón de los PANS-OPS; las de una carta real se leen en la carta.",
  anotaciones: 4,
  svg() {
    const g = [papel(56, 170, 1074, 650)]
    const cols = [300, 510, 715, 920]
    g.push(t(84, 236, "MÍNIMOS", { size: 22, peso: 700, color: C.suave, espaciado: 1.5 }))
    g.push(t(84, 796, "DA o MDA en ft, altura entre paréntesis; debajo, la visibilidad", { size: 20, color: C.suave }))
    ;["A", "B", "C", "D"].forEach((c, i) => {
      g.push(t(cols[i] + 90, 236, `CAT ${c}`, { size: 24, peso: 700, anchor: "middle" }))
    })
    const filas = [
      ["LPV", "DA", [["1450 (250)", "750 m"]]],
      ["LNAV/VNAV", "DA", [["1560 (360)", "1200 m"]]],
      ["LNAV", "MDA", [["1620 (420)", "1200 m"], ["1620 (420)", "1200 m"], ["1620 (420)", "1600 m"], ["1620 (420)", "1600 m"]]],
      ["CIRCLING", "MDA", [["1620 (420)", "1900 m"], ["1700 (500)", "2800 m"], ["1800 (600)", "3700 m"], ["1900 (700)", "4600 m"]]],
    ]
    filas.forEach(([nombre, tipo, celdas], r) => {
      const y = 280 + r * 118
      g.push(linea(`M56 ${y}L1130 ${y}`, { color: C.tinta, sw: 1.5, cap: "butt" }))
      g.push(t(130, y + 56, nombre, { size: 28, peso: 700 }))
      g.push(t(130, y + 90, tipo, { size: 22, color: C.suave, peso: 700 }))
      if (celdas.length === 1) {
        g.push(t(715, y + 56, celdas[0][0], { size: 28, anchor: "middle" }))
        g.push(t(715, y + 90, celdas[0][1], { size: 24, color: C.suave, anchor: "middle" }))
        g.push(linea(`M310 ${y + 48}L560 ${y + 48}`, { color: C.claro, sw: 2, dash: "2 8" }))
        g.push(linea(`M870 ${y + 48}L1100 ${y + 48}`, { color: C.claro, sw: 2, dash: "2 8" }))
      } else {
        celdas.forEach(([a, v], i) => {
          g.push(t(cols[i] + 90, y + 56, a, { size: 26, anchor: "middle" }))
          g.push(t(cols[i] + 90, y + 90, v, { size: 22, color: C.suave, anchor: "middle" }))
        })
      }
      g.push(num(92, y + 58, r + 1, { r: 20 }))
    })
    g.push(
      leyenda(1160, 190, [
        [1, "LPV", "Exige aumentación satelital aprobada. Se vuela a DA."],
        [2, "LNAV/VNAV", "Guía vertical, normalmente Baro-VNAV. DA, con límite de temperatura."],
        [3, "LNAV", "Solo lateral, a MDA. Es adonde se baja si falta la guía vertical."],
        [4, "CIRCLING", "Nunca más bajo que la LNAV directa."],
      ]),
    )
    return lienzo({ ...this, desc: this.alt, sub: "A cada línea se llega por una capacidad concreta del avión y del operador", recreacion: RECREACION, cuerpo: g.join("") })
  },
}

export const CARTAS = [PB08, PB09, PB10]
