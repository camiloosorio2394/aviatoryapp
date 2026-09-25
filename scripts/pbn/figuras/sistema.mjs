/**
 * PB-16 a PB-23: lo que el sistema mide, lo que avisa y cómo se verifica.
 *
 * Las pantallas son genéricas a propósito: marco oscuro, texto monoespaciado,
 * ninguna disposición de un fabricante. Lo que se enseña es qué dato mirar, no
 * dónde lo pone un avión concreto.
 */
import { leyenda } from "./cartas.mjs"
import { C, avion, caja, cota, flyBy, linea, lienzo, parrafo, pantalla, pildora, senal, t, tl, tp } from "./lib.mjs"

const GENERICA = "Pantalla genérica · no imita a ningún fabricante"

// ─── PB-16 ──────────────────────────────────────────────────────────────────

const PB16 = {
  codigo: "PB-16",
  alto: 900,
  titulo: "La desviación lateral, en planta y en cabina",
  alt: "A la izquierda, vista en planta: la trayectoria deseada en magenta y el avión desplazado a su derecha, unidos por una cota perpendicular rotulada XTK. A la derecha, la presentación de desviación lateral en cabina, unida a la planta por una línea de puntos: la aguja está desplazada la misma proporción, hacia el lado donde queda la trayectoria.",
  svg() {
    const g = []
    const y = 450
    g.push(linea(`M100 ${y}L960 ${y}`, { color: C.magenta, sw: 6, flecha: "magenta" }))
    g.push(t(120, y - 20, "DESIRED PATH · trayectoria deseada", { size: 24, peso: 700, color: C.magenta }))
    g.push(avion(560, y + 110, 90, 1.5))
    g.push(cota(640, y + 6, 640, y + 104, { color: "tinta", sw: 3 }))
    g.push(t(660, y + 66, "XTK", { size: 32, peso: 700 }))
    g.push(t(660, y + 96, "desviación lateral", { size: 22, color: C.suave }))
    g.push(linea(`M600 ${y + 140}C760 ${y + 230} 1000 ${y + 200} 1110 ${y + 60}`, { color: C.suave, sw: 2.5, dash: "3 8" }))
    // La presentación en cabina.
    const [px, py, pw, ph] = [1110, 300, 400, 250]
    g.push(pantalla(px, py, pw, ph))
    const cx = px + pw / 2
    const cy = py + 130
    g.push(tp(cx, py + 44, "DESVIACIÓN LATERAL", { size: 22, color: C.pantallaSuave, anchor: "middle" }))
    for (const k of [-2, -1, 1, 2]) g.push(`<circle cx="${cx + k * 70}" cy="${cy}" r="9" fill="none" stroke="${C.pantallaTexto}" stroke-width="3"/>`)
    g.push(linea(`M${cx} ${cy - 40}L${cx} ${cy + 40}`, { color: C.pantallaTexto, sw: 4 }))
    g.push(`<path d="M${cx - 70} ${cy - 22}L${cx - 58} ${cy}L${cx - 70} ${cy + 22}L${cx - 82} ${cy}Z" fill="${C.pantallaMagenta}"/>`)
    g.push(tp(cx, py + 222, "avión = línea central", { size: 20, color: C.pantallaSuave, anchor: "middle" }))
    g.push(parrafo(px - 10, py + ph + 70, "La aguja marca dónde queda la trayectoria: el avión está a la derecha, la aguja a la izquierda. Se corrige hacia ella.", 420, { size: 22, color: C.tinta }).svg)
    return lienzo({ ...this, desc: this.alt, sub: "Lo que se ve en la pantalla es la misma distancia que se ve en el mapa", cuerpo: g.join("") })
  },
}

// ─── PB-17 ──────────────────────────────────────────────────────────────────

const PB17 = {
  codigo: "PB-17",
  alto: 900,
  titulo: "Tres errores que se suman: PDE, NSE y FTE",
  alt: "Diagrama de convergencia. Tres cajas a la izquierda: PDE, trayectoria definida frente a deseada, que se considera despreciable; NSE, posición verdadera frente a estimada, que vigila el sistema; y FTE, el control del avión frente a lo mandado, que vigila la tripulación. Las tres flechas convergen en TSE, posición verdadera frente a deseada, la suma vectorial de las tres. Debajo, el reparto: el sistema alerta del NSE y la tripulación vigila el FTE en la desviación lateral.",
  svg() {
    const g = []
    const cajas = [
      ["PDE", "Trayectoria definida frente a deseada", "Se considera despreciable", C.gris],
      ["NSE", "Posición verdadera frente a estimada", "La vigila el sistema", C.acento],
      ["FTE", "Control del avión frente a lo mandado", "La vigila la tripulación", C.acento2],
    ]
    cajas.forEach(([sig, que, quien, color], i) => {
      const y = 170 + i * 150
      g.push(caja(56, y, 600, 124, { fill: C.papel, stroke: color, sw: 3, rx: 14 }))
      g.push(t(84, y + 52, sig, { size: 36, peso: 700, color }))
      g.push(t(190, y + 50, que, { size: 24, peso: 700 }))
      g.push(t(190, y + 86, quien, { size: 22, color: C.suave, italica: i === 0 }))
      g.push(linea(`M656 ${y + 62}C800 ${y + 62} 860 ${400} 990 ${400}`, { color, sw: 4, flecha: i === 0 ? "gris" : i === 1 ? "acento" : "acento2" }))
    })
    g.push(caja(1000, 300, 544, 200, { fill: C.acento, stroke: null, rx: 16 }))
    g.push(t(1036, 366, "TSE", { size: 48, peso: 700, color: C.papel }))
    g.push(t(1036, 412, "Posición verdadera frente a deseada", { size: 26, peso: 700, color: C.papel }))
    g.push(t(1036, 454, "Suma vectorial de los tres", { size: 22, color: C.tinte2 }))
    g.push(caja(56, 660, 734, 130, { fill: C.tinte, stroke: null, rx: 14 }))
    g.push(t(84, 710, "EL SISTEMA", { size: 20, peso: 700, color: C.suave, espaciado: 1.5 }))
    g.push(t(84, 752, "Alerta del NSE.", { size: 30, peso: 700, color: C.acento }))
    g.push(caja(810, 660, 734, 130, { fill: C.tinte, stroke: null, rx: 14 }))
    g.push(t(838, 710, "LA TRIPULACIÓN", { size: 20, peso: 700, color: C.suave, espaciado: 1.5 }))
    g.push(t(838, 752, "Vigila el FTE en la desviación lateral.", { size: 30, peso: 700, color: C.acento }))
    return lienzo({ ...this, desc: this.alt, sub: "El error total sale de tres fuentes, y cada una tiene quien la vigila", cuerpo: g.join("") })
  },
}

// ─── PB-18 ──────────────────────────────────────────────────────────────────

const PB18 = {
  codigo: "PB-18",
  alto: 900,
  titulo: "RNP frente a ANP: la comparación del sistema",
  alt: "Recreación de una página genérica de FMS con dos renglones separados: RNP con el valor 1.0 y ANP con el valor 0.08, y debajo una zona de mensajes vacía. Tres números señalan el renglón RNP, el renglón ANP y la zona de mensajes.",
  anotaciones: 3,
  svg() {
    const g = []
    const [x, y, w, h] = [140, 190, 760, 620]
    g.push(pantalla(x, y, w, h))
    g.push(tp(x + w / 2, y + 60, "NAV PERFORMANCE", { size: 30, anchor: "middle" }))
    g.push(tp(x + 60, y + 170, "RNP", { size: 26, color: C.pantallaSuave }))
    g.push(tp(x + 60, y + 230, "1.0", { size: 56, color: C.pantallaVerde }))
    g.push(tp(x + 60, y + 330, "ANP", { size: 26, color: C.pantallaSuave }))
    g.push(tp(x + 60, y + 390, "0.08", { size: 56, color: C.pantallaVerde }))
    g.push(`<rect x="${x + 40}" y="${y + 470}" width="${w - 80}" height="100" rx="6" fill="none" stroke="${C.pantallaBorde}" stroke-width="3" stroke-dasharray="10 8"/>`)
    g.push(tp(x + w / 2, y + 530, "(sin mensajes)", { size: 22, color: C.pantallaSuave, anchor: "middle" }))
    g.push(senal(1, [960, 390], [x + 230, y + 212]))
    g.push(senal(2, [960, 560], [x + 260, y + 372]))
    g.push(senal(3, [960, 720], [x + w - 40, y + 520]))
    g.push(
      leyenda(1060, 200, [
        [1, "RNP: lo requerido", "Lo fija el procedimiento o el espacio aéreo; automático o manual."],
        [2, "ANP: lo estimado", "Incertidumbre de posición, no el error real. También EPU o EPE; en algunos aviones no se muestra."],
        [3, "Mensajes", "Aquí saldría la alerta. La norma exige la alerta, no el número."],
      ], 480),
    )
    return lienzo({ ...this, desc: this.alt, recreacion: GENERICA, cuerpo: g.join("") })
  },
}

// ─── PB-19 ──────────────────────────────────────────────────────────────────

function escenario(oy, alerta) {
  const g = []
  const yc = oy + 160
  g.push(caja(56, oy, 1488, 272, { rx: 16, fill: C.papel }))
  g.push(t(84, oy + 44, alerta ? "LA PERFORMANCE ESTIMADA YA NO SATISFACE LA REQUERIDA" : "PERFORMANCE ESTIMADA DENTRO DEL LÍMITE REQUERIDO", { size: 22, peso: 700, color: C.acento, espaciado: 1 }))
  for (const s of [-1, 1]) g.push(linea(`M120 ${yc + s * 70}L1180 ${yc + s * 70}`, { color: C.acento2, sw: 3 }))
  g.push(t(1180, yc - 82, "límite requerido", { size: 20, color: C.acento2, anchor: "end" }))
  g.push(linea(`M120 ${yc}L1180 ${yc}`, { color: C.magenta, sw: 5, flecha: "magenta" }))
  const r = alerta ? 108 : 38
  g.push(`<circle cx="660" cy="${yc}" r="${r}" fill="${alerta ? C.ambar : C.acento2}" opacity="0.14" stroke="${alerta ? C.ambar : C.acento2}" stroke-width="3" stroke-dasharray="${alerta ? "6 8" : "none"}"/>`)
  g.push(avion(660, yc, 90, 1.1))
  g.push(t(660 + r + 14, yc + 40, "incertidumbre estimada", { size: 20, color: alerta ? C.ambar : C.suave }))
  const p = pildora(1360, yc, alerta ? "ALERTA" : "NORMAL", { size: 28, anchor: "middle", fill: alerta ? C.ambarSuave : C.verdeSuave, color: alerta ? C.ambar : C.verde, pad: 30 })
  g.push(p.svg)
  return g.join("")
}

const PB19 = {
  codigo: "PB-19",
  alto: 960,
  titulo: "Cuando la performance estimada ya no alcanza",
  alt: "Dos escenarios con la misma trayectoria y el mismo límite requerido. Arriba, la incertidumbre de posición estimada cabe dentro del límite y el indicador dice normal. Abajo, la incertidumbre es más ancha que el límite: el avión se ve sobre la trayectoria, pero el indicador dice alerta. Al pie, la secuencia de actuación en siete pasos: reconocer, volar el avión, contrastar la posición, QRH y SOP, qué capacidad queda, si se cumple lo exigido e informar al ATC.",
  svg() {
    const g = [escenario(156, false), escenario(446, true)]
    const pasos = [["Reconocer", "la alerta"], ["Volar", "el avión"], ["Contrastar", "la posición"], ["QRH", "y SOP"], ["Qué capacidad", "queda"], ["¿Se cumple", "lo exigido?"], ["Informar", "al ATC"]]
    const w = 196
    pasos.forEach(([a, b], i) => {
      const x = 56 + i * (w + 16)
      const clave = i === 5
      g.push(caja(x, 744, w, 104, { fill: clave ? C.acento : C.tinte, stroke: null, rx: 12 }))
      g.push(t(x + 16, 776, String(i + 1), { size: 20, peso: 700, color: clave ? C.tinte2 : C.acento2 }))
      g.push(tl(x + w / 2, 800, [a, b], { size: 22, peso: 700, color: clave ? C.papel : C.acento, anchor: "middle", lh: 27 }))
    })
    g.push(t(56, 896, "El paso 6 es el que se contesta en el briefing: hay que saber antes qué exige el procedimiento.", { size: 22, color: C.suave }))
    return lienzo({ ...this, desc: this.alt, sub: "El avión puede verse sobre la trayectoria y aun así no cumplir: eso es lo que avisa la alerta", cuerpo: g.join("") })
  },
}

// ─── PB-20 ──────────────────────────────────────────────────────────────────

const PB20 = {
  codigo: "PB-20",
  alto: 900,
  titulo: "Tres datos de la base de navegación",
  alt: "Recreación de una página genérica de estado de la base de datos de navegación: NAV DATA BASE, ACTIVE con el ciclo 2610, EFFECTIVE FROM 01OCT26 y EFFECTIVE TO 28OCT26. Tres números señalan el ciclo activo, la fecha de entrada en vigor y la fecha de fin.",
  pie: "El ciclo 2610 es real: rige del 1 al 28 de octubre de 2026, y el 2611 entra el 29. La página es genérica.",
  anotaciones: 3,
  svg() {
    const g = []
    const [x, y, w, h] = [140, 190, 760, 600]
    g.push(pantalla(x, y, w, h))
    g.push(tp(x + w / 2, y + 60, "NAV DATA BASE", { size: 32, anchor: "middle" }))
    const filas = [
      ["ACTIVE", "2610"],
      ["EFFECTIVE FROM", "01OCT26"],
      ["EFFECTIVE TO", "28OCT26"],
    ]
    filas.forEach(([k, v], i) => {
      const yy = y + 170 + i * 140
      g.push(tp(x + 60, yy, k, { size: 26, color: C.pantallaSuave }))
      g.push(tp(x + 60, yy + 56, v, { size: 48, color: C.pantallaVerde }))
      g.push(senal(i + 1, [960, yy + 36], [x + 60 + v.length * 30 + 20, yy + 40]))
    })
    g.push(
      leyenda(1060, 200, [
        [1, "ACTIVE", "Qué base está en uso. Se confirma al inicializar el sistema."],
        [2, "EFFECTIVE FROM", "Desde cuándo vale. Una base que aún no entró en vigor no es la actual."],
        [3, "EFFECTIVE TO", "Hasta cuándo. Si el vuelo cruza esta fecha, se aplica el procedimiento del operador."],
      ], 480),
    )
    return lienzo({ ...this, desc: this.alt, recreacion: GENERICA, cuerpo: g.join("") })
  },
}

// ─── PB-21 ──────────────────────────────────────────────────────────────────

const PB21 = {
  codigo: "PB-21",
  alto: 900,
  titulo: "Autorización, carta y FMS: las tres se contrastan",
  alt: "Un triángulo con la autorización del ATC arriba, la carta abajo a la izquierda y el FMS abajo a la derecha, y en el centro un círculo rotulado contraste. Junto a cada lado, el error típico de ese par: entre autorización y carta, se vuela lo que se esperaba y no lo autorizado; entre carta y FMS, lo cargado no es lo publicado; entre autorización y FMS, se ejecuta antes de comparar.",
  svg() {
    const g = []
    const A = [800, 230]
    const B = [400, 740]
    const D = [1200, 740]
    const centro = [800, 570]
    g.push(`<path d="M${A[0]} ${A[1]}L${B[0]} ${B[1]}L${D[0]} ${D[1]}Z" fill="${C.tinte}" stroke="${C.acento2}" stroke-width="4" stroke-linejoin="round"/>`)
    for (const v of [A, B, D]) g.push(linea(`M${centro[0]} ${centro[1]}L${v[0]} ${v[1]}`, { color: C.claro, sw: 3, dash: "6 8" }))
    g.push(`<circle cx="${centro[0]}" cy="${centro[1]}" r="92" fill="${C.acento}"/>`)
    g.push(t(centro[0], centro[1] + 10, "CONTRASTE", { size: 26, peso: 700, color: C.papel, anchor: "middle", espaciado: 1 }))
    const vertice = ([x, y], texto, w) => caja(x - w / 2, y - 40, w, 80, { fill: C.papel, stroke: C.acento, sw: 3, rx: 14 }) + t(x, y + 10, texto, { size: 28, peso: 700, color: C.acento, anchor: "middle" })
    g.push(vertice(A, "AUTORIZACIÓN DEL ATC", 420))
    g.push(vertice(B, "CARTA", 220))
    g.push(vertice(D, "FMS", 220))
    g.push(parrafo(560, 420, "Se vuela lo que se esperaba, no lo autorizado.", 300, { size: 24, color: C.rojo, anchor: "end", peso: 700 }).svg)
    g.push(parrafo(1040, 420, "Se ejecuta antes de comparar.", 300, { size: 24, color: C.rojo, peso: 700 }).svg)
    g.push(t(800, 830, "Lo cargado no es lo publicado.", { size: 24, color: C.rojo, anchor: "middle", peso: 700 }))
    return lienzo({ ...this, desc: this.alt, sub: "Cada par tiene su error típico; el hábito es comparar las tres antes de ejecutar", cuerpo: g.join("") })
  },
}

// ─── PB-22 ──────────────────────────────────────────────────────────────────

const PB22 = {
  codigo: "PB-22",
  alto: 940,
  titulo: "El contraste carta-FMS, renglón por renglón",
  alt: "Recreación de una página genérica de plan de vuelo del FMS con la SID KILAB 1A de la pista 09 cargada: un encabezado con la pista y el procedimiento, un renglón con la transición MORUS y cinco renglones de puntos con su derrota y su distancia; uno lleva la restricción de velocidad de 230 nudos y otros dos, las de altitud. Cinco números señalan la pista, el nombre del procedimiento, la transición, la columna de puntos y derrotas, y una restricción de altitud.",
  pie: "Es la misma salida de la figura de la SID de este módulo, para que se pueda comparar punto por punto. Nombres y distancias ficticios.",
  anotaciones: 5,
  svg() {
    const g = []
    const [x, y, w, h] = [120, 180, 820, 690]
    g.push(pantalla(x, y, w, h))
    g.push(tp(x + 40, y + 56, "RWY09", { size: 30, color: C.pantallaTexto }))
    g.push(tp(x + 240, y + 56, "KILAB1A", { size: 30, color: C.pantallaTexto }))
    g.push(tp(x + 40, y + 116, "TRANS", { size: 24, color: C.pantallaSuave }))
    g.push(tp(x + 190, y + 116, "MORUS", { size: 28, color: C.pantallaCian }))
    g.push(linea(`M${x + 30} ${y + 144}L${x + w - 30} ${y + 144}`, { color: C.pantallaBorde, sw: 2 }))
    for (const [cx, k] of [[40, "DERROTA"], [190, "PUNTO"], [400, "DIST"], [560, "VEL/ALT"]]) g.push(tp(x + cx, y + 184, k, { size: 22, color: C.pantallaSuave }))
    const filas = [
      ["090°", "OLTAR", "4", "230/-----"],
      ["047°", "PUXEM", "6", "---/5000A"],
      ["028°", "RIBOS", "5", "---/9000B"],
      ["072°", "KILAB", "7", ""],
      ["064°", "MORUS", "31", ""],
    ]
    filas.forEach(([d, p, dist, r], i) => {
      const yy = y + 250 + i * 84
      g.push(tp(x + 40, yy, d, { size: 28, color: C.pantallaVerde }))
      g.push(tp(x + 190, yy, p, { size: 30, color: C.pantallaTexto }))
      g.push(tp(x + 400, yy, `${dist} NM`, { size: 26, color: C.pantallaSuave }))
      if (r) g.push(tp(x + 560, yy, r, { size: 26, color: C.pantallaCian }))
    })
    // Los números van pegados a lo que señalan, dentro de la pantalla.
    g.push(senal(1, [x + 178, y + 46], [x + 140, y + 46], { r: 18 }))
    g.push(senal(2, [x + 410, y + 46], [x + 374, y + 46], { r: 18 }))
    g.push(senal(3, [x + 322, y + 106], [x + 284, y + 106], { r: 18 }))
    g.push(senal(4, [x + 320, y + 176], [x + 290, y + 176], { r: 18 }))
    g.push(senal(5, [x + 748, y + 326], [x + 712, y + 326], { r: 18 }))
    g.push(
      leyenda(1070, 190, [
        [1, "Pista", "Tiene que ser la autorizada. Otra pista es otro procedimiento."],
        [2, "Procedimiento", "Se compara con la autorización, no con lo que se esperaba."],
        [3, "Transición", "La equivocada, con la SID correcta, cambia la trayectoria. Es la que más se escapa."],
        [4, "Puntos y derrotas", "Secuencia y rumbos contra la carta."],
        [5, "Restricción", "Leída en la carta no basta: tiene que estar aquí."],
      ], 470),
    )
    return lienzo({ ...this, desc: this.alt, recreacion: GENERICA, cuerpo: g.join("") })
  },
}

// ─── PB-23 ──────────────────────────────────────────────────────────────────

const PB23 = {
  codigo: "PB-23",
  alto: 960,
  titulo: "La pantalla puede verse normal",
  alt: "Recreación de una pantalla de navegación en modo mapa: la derrota en magenta con tres waypoints y el avión centrado sobre ella, rotulado posición presentada. Desplazada a un lado, una segunda silueta de puntos rotulada posición según datos crudos y reporte del ATC, unida a la primera por una flecha doble: discrepancia. Al margen, tres indicios: el reloj del avión, el viento y la velocidad respecto al suelo, y que la sintonización automática no seleccione la radioayuda cercana. Al pie, la pregunta: ¿tiene sentido la posición que me está mostrando el sistema?",
  svg() {
    const g = []
    const [x, y, w, h] = [120, 180, 800, 640]
    g.push(pantalla(x, y, w, h))
    const av = [x + 400, y + 560]
    // Arcos de alcance y rumbo.
    for (const r of [180, 360]) g.push(`<path d="M${av[0] - r} ${av[1]}A${r} ${r} 0 0 1 ${av[0] + r} ${av[1]}" fill="none" stroke="${C.pantallaBorde}" stroke-width="2" stroke-dasharray="6 8"/>`)
    g.push(`<path d="M${av[0] - 420} ${av[1] - 150}A450 450 0 0 1 ${av[0] + 420} ${av[1] - 150}" fill="none" stroke="${C.pantallaSuave}" stroke-width="2"/>`)
    const ruta = [[av[0], av[1]], [x + 420, y + 380], [x + 500, y + 230], [x + 640, y + 110]]
    g.push(linea(ruta.map(([a, b], i) => `${i ? "L" : "M"}${a} ${b}`).join(""), { color: C.pantallaMagenta, sw: 5 }))
    for (const [nombre, p] of [["TENPA", ruta[1]], ["VUDEX", ruta[2]], ["SARIP", ruta[3]]]) {
      g.push(flyBy(p[0], p[1], 13, { fill: C.pantalla, color: C.pantallaTexto }))
      g.push(tp(p[0] + 24, p[1] + 8, nombre, { size: 22, color: C.pantallaTexto }))
    }
    g.push(`<path d="M${av[0]} ${av[1] - 30}L${av[0] + 20} ${av[1] + 18}L${av[0] - 20} ${av[1] + 18}Z" fill="none" stroke="${C.pantallaTexto}" stroke-width="4" stroke-linejoin="round"/>`)
    g.push(tp(av[0] + 36, av[1] + 10, "POSICIÓN PRESENTADA", { size: 20, color: C.pantallaTexto }))
    const falso = [x + 170, y + 470]
    g.push(avion(falso[0], falso[1], 0, 1.2, { hueco: true, color: C.ambar }))
    g.push(cota(falso[0] + 44, falso[1] + 20, av[0] - 34, av[1] - 4, { color: "ambar", sw: 3 }))
    g.push(tp(x + 250, y + 610, "discrepancia", { size: 22, color: C.ambar }))
    g.push(tl(x + 40, y + 380, ["POSICIÓN SEGÚN DATOS", "CRUDOS Y REPORTE", "DEL ATC"], { size: 20, peso: 700, color: C.ambar, lh: 25 }))
    // Indicios.
    g.push(t(1000, 210, "INDICIOS QUE NO CUADRAN", { size: 20, peso: 700, color: C.suave, espaciado: 1.5 }))
    const indicios = ["El reloj del avión", "El viento y la velocidad respecto al suelo", "La sintonización automática no selecciona la radioayuda cercana"]
    let yy = 240
    for (const i of indicios) {
      const p = parrafo(1024, yy + 40, i, 480, { size: 24, peso: 700, color: C.acento })
      g.push(caja(1000, yy, 544, p.alto + 34, { fill: C.tinte, stroke: null, rx: 12 }))
      g.push(p.svg)
      yy += p.alto + 54
    }
    g.push(t(800, 900, "¿Tiene sentido la posición que me está mostrando el sistema?", { size: 34, peso: 700, color: C.acento, anchor: "middle" }))
    return lienzo({ ...this, desc: this.alt, recreacion: GENERICA, cuerpo: g.join("") })
  },
}

export const SISTEMA = [PB16, PB17, PB18, PB19, PB20, PB21, PB22, PB23]
