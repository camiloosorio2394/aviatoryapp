/**
 * Piezas de dibujo de las figuras de las lecciones.
 *
 * Las figuras son SVG escritos a mano desde aquí, no exportados de un editor:
 * así se corrigen en el texto, se revisan en un diff y salen todas con la misma
 * paleta. El acento es el del lector de cada módulo (`.lector-pbn`,
 * `.lector-rv`… en index.css) y lo fija `tema()`; el resto es común, más el
 * magenta que usa la pantalla de navegación para la ruta activa: es el color
 * que el piloto ya asocia a «la trayectoria que el sistema está volando».
 *
 * Cada módulo tiene sus figuras en scripts/<modulo>/figuras y se dibujan con
 * `node scripts/figuras/dibujar.mjs <modulo>`.
 *
 * Todo va en unidades del lienzo: 1600 de ancho, que el lector reduce a 720 en
 * la columna y abre en grande al tocar. Por eso ningún texto baja de 22.
 */

export const ANCHO = 1600

export const C = {
  fondo: "#FCFAF6",
  papel: "#FFFFFF",
  tinta: "#231F1A",
  suave: "#6F665B",
  regla: "#E3DACB",
  acento: "#5C4520",
  acento2: "#8F7343",
  claro: "#D2BC93",
  tinte: "#F3EDE1",
  tinte2: "#E9DDC7",
  magenta: "#B0198F",
  magentaSuave: "#F4DDEF",
  gris: "#A89F94",
  grisClaro: "#EEEAE4",
  ambar: "#A86400",
  ambarSuave: "#FBEBD2",
  verde: "#2E7A4B",
  verdeSuave: "#DDEFE3",
  rojo: "#B3372B",
  rojoSuave: "#F6DEDA",
  relieve: ["#EFE7D8", "#E3D6BF", "#D4C2A4"],
  relieveLinea: "#C9B797",
  pantalla: "#161A1F",
  pantallaBorde: "#3A4048",
  pantallaTexto: "#E6EAEE",
  pantallaSuave: "#9AA3AD",
  pantallaVerde: "#5BD68F",
  pantallaCian: "#63C7E0",
  pantallaMagenta: "#E05ACB",
}

/**
 * El acento de cada módulo, sacado de su lector: `acento` es `--ln-primary`,
 * `acento2` es `--ln-bright` y `tinte` es `--ln-tint`. `claro` y `tinte2`
 * son dos escalones intermedios para rellenos y bordes suaves.
 */
export const TEMAS = {
  pbn: { acento: "#5C4520", acento2: "#8F7343", claro: "#D2BC93", tinte: "#F3EDE1", tinte2: "#E9DDC7" },
  rvsm: { acento: "#1C5750", acento2: "#4B9089", claro: "#9CC9C3", tinte: "#E5F3F1", tinte2: "#CDE5E1" },
}

/** Pone el acento de un módulo. Lo llama el índice de figuras de cada módulo al cargarse. */
export function tema(t) {
  Object.assign(C, t)
}

const FUENTE = "Arial, Helvetica, 'Liberation Sans', sans-serif"

export const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
const n = (v) => (Math.round(v * 10) / 10).toString()

// ─── Texto ──────────────────────────────────────────────────────────────────

/** Ancho aproximado de un texto en Arial, para partir líneas y medir cajas. */
export function medir(texto, size, peso = 400) {
  const negrita = peso >= 600
  let w = 0
  for (const ch of String(texto)) {
    if (ch === " ") w += 0.278
    else if ("iljI.,:;'!|".includes(ch)) w += 0.26
    else if ("ftr()[]«»".includes(ch)) w += 0.36
    else if ("mwMW".includes(ch)) w += negrita ? 0.9 : 0.85
    else if (/[0-9]/.test(ch)) w += 0.556
    else if (/[A-ZÁÉÍÓÚÑÜ]/.test(ch)) w += negrita ? 0.73 : 0.68
    else w += negrita ? 0.58 : 0.53
  }
  return w * size
}

/** Parte un texto en líneas que no pasen de `max` de ancho. */
export function partir(texto, max, size, peso = 400) {
  const palabras = String(texto).split(/\s+/)
  const lineas = []
  let actual = ""
  for (const p of palabras) {
    const prueba = actual ? `${actual} ${p}` : p
    if (actual && medir(prueba, size, peso) > max) {
      lineas.push(actual)
      actual = p
    } else actual = prueba
  }
  if (actual) lineas.push(actual)
  return lineas
}

function atributosTexto(o) {
  const a = [`font-size="${o.size ?? 26}"`]
  if ((o.peso ?? 400) !== 400) a.push(`font-weight="${o.peso}"`)
  a.push(`fill="${o.color ?? C.tinta}"`)
  if (o.anchor && o.anchor !== "start") a.push(`text-anchor="${o.anchor}"`)
  if (o.espaciado) a.push(`letter-spacing="${o.espaciado}"`)
  if (o.italica) a.push(`font-style="italic"`)
  if (o.opacidad) a.push(`opacity="${o.opacidad}"`)
  return a.join(" ")
}

/** Un texto de una línea. */
export function t(x, y, texto, o = {}) {
  const rot = o.rot ? ` transform="rotate(${o.rot} ${n(x)} ${n(y)})"` : ""
  return `<text x="${n(x)}" y="${n(y)}" ${atributosTexto(o)}${rot}>${esc(texto)}</text>`
}

/** Varias líneas ya partidas. `lh` es el interlineado en unidades del lienzo. */
export function tl(x, y, lineas, o = {}) {
  const lh = o.lh ?? Math.round((o.size ?? 26) * 1.3)
  const spans = lineas.map((l, i) => `<tspan x="${n(x)}" dy="${i === 0 ? 0 : lh}">${esc(l)}</tspan>`).join("")
  return `<text x="${n(x)}" y="${n(y)}" ${atributosTexto(o)}>${spans}</text>`
}

/** Un párrafo partido a `max`. Devuelve el SVG y la altura que ocupa. */
export function parrafo(x, y, texto, max, o = {}) {
  const lineas = partir(texto, max, o.size ?? 26, o.peso ?? 400)
  const lh = o.lh ?? Math.round((o.size ?? 26) * 1.3)
  return { svg: tl(x, y, lineas, { ...o, lh }), alto: lh * lineas.length, lineas: lineas.length }
}

// ─── Formas ─────────────────────────────────────────────────────────────────

export function caja(x, y, w, h, o = {}) {
  const a = [`x="${n(x)}" y="${n(y)}" width="${n(w)}" height="${n(h)}"`]
  a.push(`rx="${o.rx ?? 16}"`)
  a.push(`fill="${o.fill ?? C.papel}"`)
  if (o.stroke !== null) a.push(`stroke="${o.stroke ?? C.regla}" stroke-width="${o.sw ?? 3}"`)
  if (o.dash) a.push(`stroke-dasharray="${o.dash}"`)
  return `<rect ${a.join(" ")}/>`
}

export function linea(d, o = {}) {
  const a = [`d="${d}" fill="none" stroke="${o.color ?? C.tinta}" stroke-width="${o.sw ?? 4}"`]
  a.push(`stroke-linecap="${o.cap ?? "round"}" stroke-linejoin="round"`)
  if (o.dash) a.push(`stroke-dasharray="${o.dash}"`)
  if (o.flecha) a.push(`marker-end="url(#f-${o.flecha})"`)
  if (o.inicio) a.push(`marker-start="url(#f-${o.inicio})"`)
  if (o.opacidad) a.push(`opacity="${o.opacidad}"`)
  return `<path ${a.join(" ")}/>`
}

/**
 * Flechas disponibles como marcador, por nombre de color. El color se lee de
 * `C` al dibujar, no al cargar, para que tome el acento que puso `tema()`.
 */
const FLECHAS = ["tinta", "acento", "acento2", "magenta", "suave", "ambar", "gris", "verde", "rojo"]

function defsFlechas() {
  return FLECHAS.map(
    (k) =>
      `<marker id="f-${k}" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="5.5" markerHeight="5.5" orient="auto-start-reverse"><path d="M0 0 10 5 0 10z" fill="${C[k]}"/></marker>`,
  ).join("")
}

/** Cota con flechas en los dos extremos. */
export function cota(x1, y1, x2, y2, o = {}) {
  const color = o.color ?? "suave"
  return linea(`M${n(x1)} ${n(y1)}L${n(x2)} ${n(y2)}`, { color: C[color], sw: o.sw ?? 3, flecha: color, inicio: color })
}

/** El círculo numerado de una figura anotada. */
export function num(x, y, k, o = {}) {
  const r = o.r ?? 22
  return (
    `<circle cx="${n(x)}" cy="${n(y)}" r="${r}" fill="${o.fill ?? C.acento}" stroke="${C.papel}" stroke-width="3"/>` +
    t(x, y + r * 0.38, String(k), { size: Math.round(r * 1.05), peso: 700, color: C.papel, anchor: "middle" })
  )
}

/** Número con su guía hasta el punto que señala. */
export function senal(k, [bx, by], [px, py], o = {}) {
  return (
    linea(`M${n(bx)} ${n(by)}L${n(px)} ${n(py)}`, { color: o.color ?? C.acento, sw: 2.5 }) +
    `<circle cx="${n(px)}" cy="${n(py)}" r="5" fill="${o.color ?? C.acento}"/>` +
    num(bx, by, k, o)
  )
}

/** Píldora de texto: una etiqueta con fondo. */
export function pildora(x, y, texto, o = {}) {
  const size = o.size ?? 22
  const peso = o.peso ?? 700
  const w = medir(texto, size, peso) + (o.pad ?? 16) * 2 + (o.espaciado ? texto.length * o.espaciado : 0)
  const h = size + 16
  const x0 = o.anchor === "middle" ? x - w / 2 : o.anchor === "end" ? x - w : x
  return {
    svg:
      caja(x0, y - h / 2, w, h, { rx: h / 2, fill: o.fill ?? C.tinte, stroke: o.stroke ?? null, sw: 2 }) +
      t(x0 + w / 2, y + size * 0.36, texto, { size, peso, color: o.color ?? C.acento, anchor: "middle", espaciado: o.espaciado }),
    w,
  }
}

// ─── Símbolos de carta ──────────────────────────────────────────────────────

/** Waypoint fly-by: la estrella de cuatro puntas de las cartas. */
export function flyBy(x, y, s = 15, o = {}) {
  const k = s * 0.28
  const d = `M${n(x)} ${n(y - s)}L${n(x + k)} ${n(y - k)}L${n(x + s)} ${n(y)}L${n(x + k)} ${n(y + k)}L${n(x)} ${n(y + s)}L${n(x - k)} ${n(y + k)}L${n(x - s)} ${n(y)}L${n(x - k)} ${n(y - k)}Z`
  return `<path d="${d}" fill="${o.fill ?? C.papel}" stroke="${o.color ?? C.tinta}" stroke-width="${o.sw ?? 2.5}" stroke-linejoin="round"/>`
}

/** Waypoint fly-over: la misma estrella dentro de un círculo. */
export function flyOver(x, y, s = 15, o = {}) {
  return `<circle cx="${n(x)}" cy="${n(y)}" r="${n(s * 1.25)}" fill="${C.papel}" stroke="${o.color ?? C.tinta}" stroke-width="${o.sw ?? 2.5}"/>` + flyBy(x, y, s, o)
}

/** VOR: hexágono con su punto. */
export function vor(x, y, s = 18, o = {}) {
  const pts = []
  for (let i = 0; i < 6; i++) {
    const a = (Math.PI / 3) * i
    pts.push(`${n(x + s * Math.cos(a))},${n(y + s * Math.sin(a))}`)
  }
  const color = o.color ?? C.tinta
  return `<polygon points="${pts.join(" ")}" fill="${o.fill ?? C.papel}" stroke="${color}" stroke-width="${o.sw ?? 3}"/><circle cx="${n(x)}" cy="${n(y)}" r="${n(s * 0.18)}" fill="${color}"/>`
}

/** Silueta de avión en planta, con el morro hacia `rumbo` grados (0 = arriba). */
export function avion(x, y, rumbo = 0, escala = 1, o = {}) {
  const d =
    "M0 -30C3 -30 4 -26 4 -20L4 -6L30 6L30 11L4 5L4 18L11 24L11 28L0 25.5L-11 28L-11 24L-4 18L-4 5L-30 11L-30 6L-4 -6L-4 -20C-4 -26 -3 -30 0 -30Z"
  const relleno = o.hueco ? "none" : (o.fill ?? C.tinta)
  const trazo = o.hueco ? ` stroke="${o.color ?? C.tinta}" stroke-width="${n(2.2 / escala)}" stroke-dasharray="${n(5 / escala)} ${n(4 / escala)}"` : ""
  return `<path d="${d}" fill="${relleno}"${trazo} transform="translate(${n(x)} ${n(y)}) rotate(${n(rumbo)}) scale(${escala})"/>`
}

/**
 * Silueta de avión de perfil, con el morro a la derecha (o a la izquierda con
 * `o.izquierda`). Mide unas 124 unidades de largo a escala 1; `y` es la
 * línea del fuselaje, que es la que marca el nivel.
 */
export function avionLado(x, y, escala = 1, o = {}) {
  const cuerpo =
    "M-58 -2L-50 -30L-40 -30L-27 -6L40 -6C52 -6 60 -3 63 1C60 6 52 8 40 8L-52 8C-58 8 -61 4 -58 -2Z"
  const cola = "M-60 1L-40 1L-44 5L-60 5Z"
  const ala = "M-10 3L18 3L8 13L-4 13Z"
  const color = o.color ?? C.tinta
  const giro = (o.rot ? ` rotate(${n(o.rot)})` : "") + (o.izquierda ? " scale(-1 1)" : "")
  const abrir = `<g transform="translate(${n(x)} ${n(y)}) scale(${escala})${giro}"`
  if (o.hueco) {
    const trazo = `fill="none" stroke="${color}" stroke-width="${n(2.2 / escala)}" stroke-dasharray="${n(5 / escala)} ${n(4 / escala)}"`
    return `${abrir}><path d="${cuerpo}" ${trazo}/><path d="${ala}" ${trazo}/></g>`
  }
  return (
    `${abrir}>` +
    `<path d="${cuerpo}" fill="${color}"/>` +
    `<path d="${cola}" fill="${color}"/>` +
    `<path d="${ala}" fill="${color}" opacity="0.75"/>` +
    `<ellipse cx="4" cy="15" rx="10" ry="4" fill="${color}"/>` +
    `<path d="M45 -3L53 -3L56 0L47 0Z" fill="${C.papel}"/>` +
    "</g>"
  )
}

/** Pista en planta: rectángulo girado, con el eje en trazos. */
export function pista(x1, y1, x2, y2, ancho = 18, o = {}) {
  const dx = x2 - x1
  const dy = y2 - y1
  const L = Math.hypot(dx, dy)
  const a = (Math.atan2(dy, dx) * 180) / Math.PI
  const cx = (x1 + x2) / 2
  const cy = (y1 + y2) / 2
  let s = `<g transform="translate(${n(cx)} ${n(cy)}) rotate(${n(a)})">`
  s += `<rect x="${n(-L / 2)}" y="${n(-ancho / 2)}" width="${n(L)}" height="${ancho}" rx="2" fill="${o.fill ?? C.tinta}"/>`
  s += `<line x1="${n(-L / 2 + 8)}" y1="0" x2="${n(L / 2 - 8)}" y2="0" stroke="${C.papel}" stroke-width="2" stroke-dasharray="8 7"/>`
  s += "</g>"
  if (o.rotulo) s += t(o.rotulo.x, o.rotulo.y, o.rotulo.texto, { size: 22, peso: 700, color: C.tinta, anchor: o.rotulo.anchor ?? "middle" })
  return s
}

// ─── Relieve ────────────────────────────────────────────────────────────────

/** Curva cerrada suave que pasa por los puntos (Catmull-Rom a Bézier). */
export function curvaCerrada(pts) {
  const k = pts.length
  let d = `M${n(pts[0][0])} ${n(pts[0][1])}`
  for (let i = 0; i < k; i++) {
    const p0 = pts[(i - 1 + k) % k]
    const p1 = pts[i]
    const p2 = pts[(i + 1) % k]
    const p3 = pts[(i + 2) % k]
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6]
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6]
    d += `C${n(c1[0])} ${n(c1[1])} ${n(c2[0])} ${n(c2[1])} ${n(p2[0])} ${n(p2[1])}`
  }
  return d + "Z"
}

/** Curva abierta suave que pasa por los puntos. */
export function curvaAbierta(pts) {
  let d = `M${n(pts[0][0])} ${n(pts[0][1])}`
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)]
    const p1 = pts[i]
    const p2 = pts[i + 1]
    const p3 = pts[Math.min(pts.length - 1, i + 2)]
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6]
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6]
    d += `C${n(c1[0])} ${n(c1[1])} ${n(c2[0])} ${n(c2[1])} ${n(p2[0])} ${n(p2[1])}`
  }
  return d
}

/**
 * Un cerro con curvas de nivel: tres manchas cerradas, cada una más pequeña y
 * más oscura. La forma sale de la semilla, así que el mismo cerro se repite
 * idéntico en los dos paneles de una comparación.
 */
export function cerro(cx, cy, rx, ry, semilla = 1, niveles = 3) {
  let s = ""
  for (let k = 0; k < niveles; k++) {
    const f = 1 - k * 0.3
    const pts = []
    for (let i = 0; i < 12; i++) {
      const a = (Math.PI * 2 * i) / 12
      const ruido = 1 + 0.13 * Math.sin(a * 3 + semilla * 1.7 + k) + 0.08 * Math.cos(a * 5 + semilla * 2.3)
      pts.push([cx + Math.cos(a) * rx * f * ruido, cy + Math.sin(a) * ry * f * ruido])
    }
    s += `<path d="${curvaCerrada(pts)}" fill="${C.relieve[Math.min(k, 2)]}" stroke="${C.relieveLinea}" stroke-width="1.5"/>`
  }
  return s
}

/** Pantalla genérica de aviónica: marco oscuro, sin imitar a ningún fabricante. */
export function pantalla(x, y, w, h) {
  return (
    `<rect x="${n(x - 14)}" y="${n(y - 14)}" width="${n(w + 28)}" height="${n(h + 28)}" rx="22" fill="#2A2E34"/>` +
    `<rect x="${n(x)}" y="${n(y)}" width="${n(w)}" height="${n(h)}" rx="10" fill="${C.pantalla}" stroke="${C.pantallaBorde}" stroke-width="2"/>`
  )
}

/** Texto monoespaciado de pantalla. */
export function tp(x, y, texto, o = {}) {
  const a = [`x="${n(x)}" y="${n(y)}" font-family="'Courier New', Courier, monospace" font-size="${o.size ?? 28}" font-weight="${o.peso ?? 700}" fill="${o.color ?? C.pantallaTexto}"`]
  if (o.anchor) a.push(`text-anchor="${o.anchor}"`)
  return `<text ${a.join(" ")}>${esc(texto)}</text>`
}

// ─── Figuras anotadas ───────────────────────────────────────────────────────

export const RECREACION = "Recreación educativa · no es una carta real"

/** La columna de la derecha: qué señala cada número, en pocas palabras. */
export function leyenda(x, y, items, ancho = 384) {
  const g = [t(x, y, "QUÉ SEÑALA CADA NÚMERO", { size: 20, peso: 700, color: C.suave, espaciado: 1.5 })]
  let yy = y + 44
  for (const [k, titulo, texto] of items) {
    g.push(num(x + 20, yy + 2, k, { r: 20 }))
    const lt = partir(titulo, ancho - 56, 24, 700)
    g.push(tl(x + 56, yy + 10, lt, { size: 24, peso: 700, lh: 29 }))
    let h = lt.length * 29
    if (texto) {
      const lx = partir(texto, ancho - 56, 22)
      g.push(tl(x + 56, yy + 10 + h, lx, { size: 22, color: C.suave, lh: 27 }))
      h += lx.length * 27
    }
    yy += Math.max(h, 44) + 20
  }
  return g.join("")
}

// ─── Lienzo ─────────────────────────────────────────────────────────────────

/**
 * La figura completa: fondo, título, subtítulo, código y, si hace falta, el
 * rótulo de recreación. `desc` va en el <desc> del SVG y es el mismo texto que
 * el lector usa de `alt`.
 */
export function lienzo({ codigo, titulo, sub, desc, alto = 900, cuerpo, recreacion }) {
  const partes = [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${ANCHO}" height="${alto}" viewBox="0 0 ${ANCHO} ${alto}" role="img" aria-labelledby="titulo desc" font-family="${FUENTE}">`,
    `<title id="titulo">${esc(titulo)}</title>`,
    `<desc id="desc">${esc(desc)}</desc>`,
    `<defs>${defsFlechas()}</defs>`,
    `<rect width="${ANCHO}" height="${alto}" rx="24" fill="${C.fondo}"/>`,
    t(56, 84, titulo, { size: 44, peso: 700 }),
  ]
  if (sub) partes.push(t(56, 124, sub, { size: 24, color: C.suave }))
  if (recreacion) {
    const p = pildora(ANCHO - 56, 72, recreacion, { anchor: "end", size: 20, fill: C.tinte, color: C.acento })
    partes.push(p.svg)
  }
  partes.push(cuerpo)
  partes.push(t(ANCHO - 40, alto - 24, codigo, { size: 20, color: C.gris, anchor: "end", peso: 700, espaciado: 1 }))
  partes.push("</svg>")
  return partes.join("\n") + "\n"
}
