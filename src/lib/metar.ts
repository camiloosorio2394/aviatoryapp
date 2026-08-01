/**
 * Módulo METAR: capa de datos y decodificador.
 *
 * Fuentes del contenido:
 *   - Leyenda para lectura de METAR y TAF (Volar3.com, material de curso).
 *   - Briefing para pilotos: METAR (Erick De Paz, Meteorólogo Clase III OMM),
 *     que trae la plantilla completa del informe.
 *   - La norma de referencia es el Anexo 3 de la OACI y el Manual de claves
 *     No. 306 de la OMM: las fuentes de curso se marcan como material didáctico.
 *
 * Estructura de la sección (misma línea que el módulo NOTAM):
 *   1. Aprende        → METAR_LESSON (metarLesson.ts)
 *   2. Decodificador  → parseMetar() + tablas de códigos
 *   3. Práctica       → pronto
 *   4. Evaluación     → pronto
 */

import { METAR_LESSON_TOTAL } from "@/lib/metarLesson"

// ─── Tablas de códigos (leyenda del curso, normalizada) ──────────────────────

/** Fenómenos meteorológicos (el "qué cae o qué oscurece"). */
export const PHENOMENA: Record<string, string> = {
  DZ: "llovizna",
  RA: "lluvia",
  SN: "nieve",
  SG: "gránulos de nieve",
  IC: "cristales de hielo",
  // El manual M1 trae PE (bolas de hielo); la clave vigente usa PL. El curso
  // enseña lo que dice el manual; PL queda como grupo no reconocido hasta
  // validar la actualización con instructor (ver src/data/metar/FUENTES.md).
  PE: "bolas de hielo",
  GR: "granizo",
  GS: "granizo pequeño",
  UP: "precipitación desconocida",
  BR: "neblina",
  FG: "niebla",
  FU: "humo",
  VA: "ceniza volcánica",
  DU: "polvo en extensión",
  SA: "arena",
  HZ: "bruma (calima)",
  PY: "rocío",
  PO: "remolinos de polvo o arena",
  SQ: "turbonada",
  FC: "nube embudo (tornado si es +FC)",
  SS: "tormenta de arena",
  DS: "tormenta de polvo",
}

/** Descriptores (el "cómo se presenta el fenómeno"). */
export const DESCRIPTORS: Record<string, string> = {
  MI: "baja",
  BC: "bancos",
  PR: "parcial",
  DR: "deriva (ventisca baja)",
  BL: "ventarrón (levantado por el viento)",
  SH: "chubascos",
  // TS no aparece en las tablas de los manuales del curso, pero sin él no se
  // lee un +TSRA real: viene de la clave estándar del Anexo 3, marcado para
  // validar con instructor (ver src/data/metar/FUENTES.md, punto 1).
  TS: "tormenta eléctrica",
  FZ: "sobreenfriado (engelante)",
}

/** Calificadores de intensidad y posición. */
export const QUALIFIERS: Record<string, string> = {
  "-": "ligero",
  "( )": "moderado (sin signo)",
  "+": "fuerte",
  "++": "muy fuerte",
  VC: "en la vecindad del aeródromo, no sobre la estación",
  RE: "reciente (ocurrió desde la última observación)",
}

/** Cobertura de nubes, en octavos de cielo. */
export const CLOUD_COVER: Record<string, { label: string; octas: string }> = {
  SKC: { label: "cielo despejado", octas: "0/8" },
  FEW: { label: "nubes escasas", octas: "1/8 a 2/8" },
  SCT: { label: "nubes dispersas", octas: "3/8 a 4/8" },
  BKN: { label: "nubosidad fragmentada", octas: "5/8 a 7/8" },
  OVC: { label: "cielo cubierto", octas: "8/8" },
  NSC: { label: "sin nubes significativas", octas: "" },
  CLR: { label: "despejado (estación automática)", octas: "0/8" },
}

/** Nubes convectivas que el METAR reporta aparte: son las que sacuden el avión. */
export const CONVECTIVE: Record<string, string> = {
  CB: "cumulonimbos",
  TCU: "torrecúmulos (cúmulo de gran desarrollo)",
}

/** Grupos de tendencia y otros indicadores del informe. */
export const TREND_CODES: Record<string, string> = {
  NOSIG: "sin cambio significativo previsto en las próximas 2 horas",
  BECMG: "cambio esperado (becoming)",
  TEMPO: "fluctuaciones temporales",
  PROB: "probabilidad (PROB30, PROB40)",
  FM: "comienzo de un cambio significativo (from)",
  NSW: "fin del tiempo significativo",
  CAVOK: "techo y visibilidad OK: visibilidad de 10 km o más, sin nubes por debajo de 5000 ft ni CB/TCU, sin fenómenos significativos",
  RMK: "comentario (remark)",
  AUTO: "observación automatizada, sin observador humano",
  COR: "corrección a una observación anterior",
  SPECI: "informe especial: algo cambió fuerte antes de la próxima hora",
  WS: "cizalladura del viento reportada",
}

/** Otros códigos de la leyenda (M1): aparecen en METAR, TAF y sus comentarios. */
export const OTHERS: Record<string, string> = {
  AMD: "pronóstico enmendado",
  AO1: "observación automatizada sin discriminador de precipitación",
  AO2: "observación automatizada con discriminador de precipitación",
  COR: "corrección a la observación",
  LDG: "aterrizaje",
  NO: "no disponible",
  R: "pista (en el grupo RVR)",
  RWY: "pista",
  RMK: "comentario",
  SLP: "presión a nivel del mar",
  SM: "milla terrestre (statute mile)",
  SPECI: "reporte especial",
  TKOF: "despegue",
  VV: "visibilidad vertical",
  TX: "temperatura máxima (en TAF)",
  TN: "temperatura mínima (en TAF)",
}

// ─── Decodificador ───────────────────────────────────────────────────────────

export interface MetarToken {
  /** El grupo tal como viene en el informe */
  raw: string
  /** Nombre del grupo (Estación, Viento, Visibilidad...) */
  grupo: string
  /** Lectura en español */
  decoded: string
  /** true si el token no se pudo interpretar */
  unknown?: boolean
}

const DIRECCIONES = [
  "norte", "nornoreste", "noreste", "estenoreste", "este", "estesureste",
  "sureste", "sursureste", "sur", "sursuroeste", "suroeste", "oestesuroeste",
  "oeste", "oestenoroeste", "noroeste", "nornoroeste",
]

function windDirLabel(deg: number): string {
  return DIRECCIONES[Math.round((deg % 360) / 22.5) % 16]
}

const WEATHER_RE = new RegExp(
  "^(\\+|-)?(VC)?(" + Object.keys(DESCRIPTORS).join("|") + ")?(" +
    Object.keys(PHENOMENA).join("|") + ")+$"
)

function decodeWeather(token: string): string | null {
  if (!WEATHER_RE.test(token)) return null
  let rest = token
  const parts: string[] = []
  if (rest.startsWith("+")) { parts.push("fuerte"); rest = rest.slice(1) }
  else if (rest.startsWith("-")) { parts.push("ligero"); rest = rest.slice(1) }
  let vecindad = false
  if (rest.startsWith("VC")) { vecindad = true; rest = rest.slice(2) }
  const desc = Object.keys(DESCRIPTORS).find((d) => rest.startsWith(d))
  if (desc) { rest = rest.slice(desc.length) }
  const fen: string[] = []
  while (rest.length >= 2) {
    const code = rest.slice(0, 2)
    if (!PHENOMENA[code]) return null
    fen.push(PHENOMENA[code])
    rest = rest.slice(2)
  }
  if (rest.length > 0 || fen.length === 0) return null
  const cuerpo = [desc ? DESCRIPTORS[desc] : null, fen.join(" con ")].filter(Boolean).join(" de ")
  return [parts.join(" "), cuerpo, vecindad ? "en la vecindad del aeródromo" : null]
    .filter(Boolean)
    .join(" ")
    .trim()
}

/**
 * Decodifica un METAR grupo por grupo. Tolera mayúsculas o minúsculas y
 * espacios repetidos. Lo que no reconoce lo marca, no lo inventa: un grupo
 * desconocido se muestra como "sin decodificar" para que el piloto lo revise
 * contra la fuente.
 */
export function parseMetar(raw: string): MetarToken[] {
  const tokens = raw.trim().toUpperCase().split(/\s+/).filter(Boolean)
  const out: MetarToken[] = []
  let enRemark = false
  let enTendencia = false

  for (const t of tokens) {
    // Después de RMK todo es comentario libre
    if (enRemark) {
      out.push({ raw: t, grupo: "Comentario", decoded: "texto libre del observador" })
      continue
    }

    if (t === "METAR" || t === "SPECI") {
      out.push({
        raw: t,
        grupo: "Tipo de informe",
        decoded: t === "METAR" ? "informe meteorológico de rutina" : TREND_CODES.SPECI,
      })
      continue
    }
    if (t === "AUTO" || t === "COR" || t === "NOSIG" || t === "NSW" || t === "CAVOK") {
      out.push({
        raw: t,
        grupo: t === "CAVOK" ? "Visibilidad y nubes" : t === "NOSIG" || t === "NSW" ? "Tendencia" : "Modificador",
        decoded: TREND_CODES[t],
      })
      continue
    }
    if (t === "BECMG" || t === "TEMPO" || /^PROB\d{2}$/.test(t) || /^FM\d{2,6}$/.test(t)) {
      enTendencia = true
      const base = t.startsWith("PROB")
        ? `probabilidad del ${t.slice(4)} por ciento`
        : t.startsWith("FM")
          ? `cambio significativo desde las ${t.slice(2)}`
          : TREND_CODES[t]
      out.push({ raw: t, grupo: "Tendencia", decoded: base })
      continue
    }
    if (t === "RMK") {
      enRemark = true
      out.push({ raw: t, grupo: "Comentario", decoded: TREND_CODES.RMK })
      continue
    }

    // Estación OACI: 4 letras al inicio
    if (/^[A-Z]{4}$/.test(t) && out.filter((o) => o.grupo === "Estación").length === 0 && !DESCRIPTORS[t.slice(0,2)]) {
      const colombia = t.startsWith("SK") ? " (Colombia)" : ""
      out.push({ raw: t, grupo: "Estación", decoded: `aeródromo ${t}${colombia}` })
      continue
    }

    // Día y hora: 260800Z
    const mTime = t.match(/^(\d{2})(\d{2})(\d{2})Z$/)
    if (mTime) {
      out.push({
        raw: t,
        grupo: "Día y hora",
        decoded: `día ${mTime[1]} a las ${mTime[2]}:${mTime[3]} UTC (en Colombia, resta 5 horas)`,
      })
      continue
    }

    // Viento: 27010KT, 27010G25KT, VRB03KT, 00000KT, también MPS
    const mWind = t.match(/^(VRB|\d{3})(\d{2,3})(G(\d{2,3}))?(KT|MPS)$/)
    if (mWind) {
      const unidad = mWind[5] === "KT" ? "nudos" : "metros por segundo"
      let d: string
      if (mWind[1] === "VRB") d = "de dirección variable"
      else if (mWind[1] === "000" && Number(mWind[2]) === 0) d = "en calma"
      else d = `del ${windDirLabel(Number(mWind[1]))} (${Number(mWind[1])}°)`
      const rafaga = mWind[4] ? `, con ráfagas de ${Number(mWind[4])} ${unidad}` : ""
      const vel = Number(mWind[2]) === 0 && mWind[1] === "000" ? "" : ` a ${Number(mWind[2])} ${unidad}`
      out.push({ raw: t, grupo: "Viento", decoded: `viento ${d}${vel}${rafaga}` })
      continue
    }

    // Variación de dirección del viento: 160V240
    const mVar = t.match(/^(\d{3})V(\d{3})$/)
    if (mVar) {
      out.push({
        raw: t,
        grupo: "Viento",
        decoded: `dirección variando entre ${Number(mVar[1])}° y ${Number(mVar[2])}° (varía 60° o más)`,
      })
      continue
    }

    // Visibilidad en metros: 9999, 0800; o en millas terrestres: 6SM, 1/2SM
    if (/^\d{4}$/.test(t) && out.some((o) => o.grupo === "Viento")) {
      const m = Number(t)
      out.push({
        raw: t,
        grupo: "Visibilidad",
        decoded: m === 9999 ? "visibilidad de 10 km o más" : `visibilidad horizontal de ${m} metros`,
      })
      continue
    }
    const mSM = t.match(/^(\d+|\d+\/\d+|\d+ \d+\/\d+)SM$/)
    if (mSM) {
      out.push({
        raw: t,
        grupo: "Visibilidad",
        decoded: `visibilidad de ${mSM[1]} millas terrestres (formato de EE. UU.; 1 SM = 1609 m)`,
      })
      continue
    }

    // RVR: R28L/1200, R28C/3600FT, con tendencia U/D/N
    const mRvr = t.match(/^R(\d{2})([LCR])?\/([PM])?(\d{4})(FT)?([UDN])?$/)
    if (mRvr) {
      const pista = `pista ${mRvr[1]}${mRvr[2] === "L" ? " izquierda" : mRvr[2] === "C" ? " central" : mRvr[2] === "R" ? " derecha" : ""}`
      const prefijo = mRvr[3] === "P" ? "más de " : mRvr[3] === "M" ? "menos de " : ""
      const unidad = mRvr[5] ? "pies" : "metros"
      const tend = mRvr[6] === "U" ? ", mejorando" : mRvr[6] === "D" ? ", empeorando" : mRvr[6] === "N" ? ", sin cambio" : ""
      out.push({
        raw: t,
        grupo: "Alcance visual en pista",
        decoded: `RVR de la ${pista}: ${prefijo}${Number(mRvr[4])} ${unidad}${tend}`,
      })
      continue
    }

    // Tiempo presente: -RA, +TSRA, VCSH, FZFG, RERA...
    if (t.startsWith("RE") && decodeWeather(t.slice(2))) {
      out.push({ raw: t, grupo: "Tiempo reciente", decoded: `reciente: ${decodeWeather(t.slice(2))}` })
      continue
    }
    const wx = decodeWeather(t)
    if (wx) {
      out.push({ raw: t, grupo: "Tiempo presente", decoded: wx })
      continue
    }

    // Nubes: FEW010, BKN012CB, OVC220, VV002, NSC, SKC, CLR
    const mCloud = t.match(/^(FEW|SCT|BKN|OVC)(\d{3})(CB|TCU)?$/)
    if (mCloud) {
      const capa = CLOUD_COVER[mCloud[1]]
      const altura = Number(mCloud[2]) * 100
      const conv = mCloud[3] ? `, ${CONVECTIVE[mCloud[3]]}` : ""
      out.push({
        raw: t,
        grupo: "Nubes",
        decoded: `${capa.label} (${capa.octas}) a ${altura.toLocaleString("es-CO")} pies${conv}`,
      })
      continue
    }
    if (t === "NSC" || t === "SKC" || t === "CLR") {
      out.push({ raw: t, grupo: "Nubes", decoded: CLOUD_COVER[t].label })
      continue
    }
    const mVV = t.match(/^VV(\d{3})$/)
    if (mVV) {
      out.push({
        raw: t,
        grupo: "Nubes",
        decoded: `visibilidad vertical de ${Number(mVV[1]) * 100} pies (cielo oscurecido, sin base de nubes definida)`,
      })
      continue
    }

    // Temperatura y punto de rocío: 20/12, M02/M04
    const mTemp = t.match(/^(M)?(\d{2})\/(M)?(\d{2})$/)
    if (mTemp) {
      const temp = (mTemp[1] ? -1 : 1) * Number(mTemp[2])
      const dew = (mTemp[3] ? -1 : 1) * Number(mTemp[4])
      const cerca = temp - dew <= 3 ? " (muy cerca: atento a niebla o nubes bajas)" : ""
      out.push({
        raw: t,
        grupo: "Temperatura y rocío",
        decoded: `temperatura ${temp} °C, punto de rocío ${dew} °C${cerca}`,
      })
      continue
    }

    // QNH: Q1012 (hPa) o A2980 (pulgadas de mercurio)
    const mQ = t.match(/^Q(\d{4})$/)
    if (mQ) {
      out.push({ raw: t, grupo: "QNH", decoded: `ajuste altimétrico ${Number(mQ[1])} hectopascales` })
      continue
    }
    const mA = t.match(/^A(\d{4})$/)
    if (mA) {
      out.push({
        raw: t,
        grupo: "QNH",
        decoded: `ajuste altimétrico ${(Number(mA[1]) / 100).toFixed(2)} pulgadas de mercurio (formato de EE. UU.)`,
      })
      continue
    }

    // Cizalladura: WS R28, WS ALL RWY (llega tokenizado)
    if (t === "WS" || t === "ALL" || t === "RWY" || /^R\d{2}[LCR]?$/.test(t)) {
      out.push({ raw: t, grupo: "Cizalladura", decoded: "cizalladura del viento reportada en pista" })
      continue
    }

    // Horarios de tendencia: 1216, TL, AT
    if (enTendencia && /^\d{4}$/.test(t)) {
      out.push({ raw: t, grupo: "Tendencia", decoded: `entre las ${t.slice(0, 2)}:00 y las ${t.slice(2)}:00 UTC` })
      continue
    }

    out.push({ raw: t, grupo: "Sin decodificar", decoded: "grupo no reconocido: revísalo contra la leyenda", unknown: true })
  }
  return out
}

// ─── Ejemplos para el decodificador ──────────────────────────────────────────

/** Ejemplos de práctica redactados para Aviatory. No son informes vigentes. */
export const METAR_EXAMPLES: { label: string; metar: string }[] = [
  {
    label: "Bogotá, mañana típica de sabana",
    metar: "METAR SKBO 261300Z 09006KT 9999 SCT023 BKN080 14/09 Q1027 NOSIG",
  },
  {
    label: "Rionegro con lluvia y tormenta",
    metar: "METAR SKRG 262000Z 27012G22KT 240V300 4000 +TSRA BKN015CB OVC070 17/16 Q1019 TEMPO 2000 RA",
  },
  {
    label: "Costa con calima y viento variable",
    metar: "METAR SKBQ 261800Z VRB03KT 6000 HZ FEW020 31/25 Q1010 NOSIG",
  },
  {
    label: "Niebla al amanecer con RVR",
    metar: "SPECI SKPP 261045Z 00000KT 0400 R19/0800U FG VV002 09/09 Q1029",
  },
]

export const METAR_DISCLAIMER =
  "Los ejemplos son material de práctica redactado para Aviatory con formato real: no son informes vigentes y jamás deben usarse para operar. Consulta siempre el METAR oficial del servicio meteorológico."

// ─── Volumen del contenido ───────────────────────────────────────────────────

/**
 * Cuántas claves trae la leyenda del decodificador, contadas de las tablas
 * reales y no a mano: si mañana se agrega un fenómeno, la cifra que ve el
 * usuario se mueve sola.
 */
export const METAR_LEGEND_TOTAL =
  Object.keys(PHENOMENA).length +
  Object.keys(DESCRIPTORS).length +
  Object.keys(QUALIFIERS).length +
  Object.keys(CLOUD_COVER).length +
  Object.keys(CONVECTIVE).length +
  Object.keys(TREND_CODES).length +
  Object.keys(OTHERS).length

// ─── Progreso ────────────────────────────────────────────────────────────────
// El respaldo local es lo que hace que la lección funcione sin sesión. La
// verdad entre dispositivos vive en user_metar_progress: ver lib/metarProgress.

const LS_KEY = "aviatory.metar.progress"

export interface MetarLocalProgress {
  lessonScreens: number[]
}

export function readMetarProgress(): MetarLocalProgress {
  try {
    const raw = localStorage.getItem(LS_KEY)
    if (!raw) return { lessonScreens: [] }
    const parsed = JSON.parse(raw) as Partial<MetarLocalProgress>
    return { lessonScreens: Array.isArray(parsed.lessonScreens) ? parsed.lessonScreens : [] }
  } catch {
    return { lessonScreens: [] }
  }
}

export function writeMetarProgress(patch: Partial<MetarLocalProgress>): void {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify({ ...readMetarProgress(), ...patch }))
  } catch {
    /* localStorage bloqueado (incógnito): el progreso queda en memoria */
  }
}

export interface MetarResumen {
  lessonRead: number
  lessonPct: number
  /** Avance del tema completo, 0 a 100. */
  overall: number
  empty: boolean
}

/**
 * Resume el avance del tema METAR.
 *
 * Hoy el tema es solo la lección y el decodificador, y el decodificador es una
 * herramienta de consulta libre: no se completa. Así que el avance del tema ES
 * el de la lección. Cuando existan la práctica y la evaluación, esta función
 * pasa a promediar los tres, igual que `resumirNotam`, y las dos pantallas que
 * la usan se enteran solas.
 */
export function resumirMetar(progreso: { lessonScreens: number[] }): MetarResumen {
  const lessonRead = Math.min(progreso.lessonScreens.length, METAR_LESSON_TOTAL)
  const lessonPct = Math.round((lessonRead / METAR_LESSON_TOTAL) * 100)
  return { lessonRead, lessonPct, overall: lessonPct, empty: lessonRead === 0 }
}
