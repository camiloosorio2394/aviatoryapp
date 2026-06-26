/**
 * TEA — Part 2: Interactive Comprehension. AUDIOS REALES.
 *
 * Los audios los compartió Cami y están hosteados en Supabase Storage
 * (bucket público `icao-audio`, subidos con scripts/upload-icao-audio.mjs).
 *
 *   2A — Short Audios: 3 sets (A: Track 1-16, B: 023-041, C: CD4 01-16) = 50 clips.
 *   2B — Long Audios: 13 con contenido conocido (del nombre del archivo) + 3 extra.
 *   2C — Interactive Response: 6 tracks (11-16).
 *
 * PENDIENTE: transcripts y clave de respuestas de los Short (2A) e Interactive
 * (2C) — vienen del material "TEA Materials" que el usuario subirá después. Por
 * ahora son práctica de escucha (escuchás y respondés vos). Los Long (2B) sí
 * traen problema/pedido/detalles derivados del contenido del audio.
 */

export type Speaker = "pilot" | "controller"

const BASE =
  "https://gvwqmfxphsbmbrhyjcmk.supabase.co/storage/v1/object/public/icao-audio"

// ─── 2A · SHORT AUDIOS (3 sets) ──────────────────────────────────────────────
export interface ShortAudio {
  id: string
  label: string
  audioUrl: string
}

export interface ShortAudioSet {
  key: "a" | "b" | "c"
  title: string
  note: string
  items: ShortAudio[]
}

const setA: ShortAudio[] = Array.from({ length: 16 }, (_, i) => {
  const n = i + 1
  return {
    id: `a-${n}`,
    label: `Track ${n}`,
    audioUrl: `${BASE}/short/a/track-${String(n).padStart(2, "0")}.mp3`,
  }
})

const setBFiles = [
  "023.wav", "024.wav", "025.wav", "026.wav", "027.wav", "028.wav", "029.wav",
  "030.wav", "031.wav", "032.wav", "033.mp3", "034.mp3", "035.mp3", "036.mp3",
  "037.mp3", "039.mp3", "040.mp3", "041.mp3",
]
const setB: ShortAudio[] = setBFiles.map((f) => {
  const num = f.replace(/\.\w+$/, "")
  return { id: `b-${num}`, label: `Audio ${num}`, audioUrl: `${BASE}/short/b/${f}` }
})

const setC: ShortAudio[] = Array.from({ length: 16 }, (_, i) => {
  const n = i + 1
  return {
    id: `c-${n}`,
    label: `CD4 · ${String(n).padStart(2, "0")}`,
    audioUrl: `${BASE}/short/c/cd4-${String(n).padStart(2, "0")}.m4a`,
  }
})

export const SHORT_AUDIO_SETS: ShortAudioSet[] = [
  { key: "a", title: "Set A · Track 1–16", note: "16 clips cortos", items: setA },
  { key: "b", title: "Set B · 023–041", note: "18 clips", items: setB },
  { key: "c", title: "Set C · CD4 01–16", note: "16 clips", items: setC },
]

export const SHORT_AUDIO_TOTAL =
  SHORT_AUDIO_SETS.reduce((acc, s) => acc + s.items.length, 0)

// ─── 2B · LONG AUDIOS ────────────────────────────────────────────────────────
export interface LongAudio {
  id: number
  audioUrl: string
  title: string
  speaker?: Speaker
  problem?: string
  request?: string
  details?: string[]
  /** true si tenemos clave (problema/pedido/detalles); false para los extra */
  hasKey: boolean
}

export const LONG_AUDIOS: LongAudio[] = [
  {
    id: 1,
    audioUrl: `${BASE}/long/01-birds-23l.wav`,
    title: "Aves migratorias cerca de la 23L",
    speaker: "controller",
    problem: "Bandada de aves migratorias reportada en cercanías de la trayectoria de aproximación.",
    request: "Aviso/precaución a las aeronaves en aproximación.",
    details: ["Aves migratorias", "En la vecindad de la approach path", "Pista 23L"],
    hasKey: true,
  },
  {
    id: 2,
    audioUrl: `${BASE}/long/02-windshear-15r.wav`,
    title: "Wind shear severo en la 15R",
    speaker: "controller",
    problem: "El último avión en aterrizar reportó wind shear severo.",
    request: "Precaución en la aproximación a la 15R.",
    details: ["A media milla del umbral de la 15R", "Pérdida de 20 nudos", "Reporte del tráfico anterior"],
    hasKey: true,
  },
  {
    id: 3,
    audioUrl: `${BASE}/long/03-vehicle-crossing.wav`,
    title: "Line up and wait — vehículo cruzando",
    speaker: "controller",
    problem: "Vehículo cruzando el extremo a favor del viento (upwind) de la pista.",
    request: "Line up and wait (alinearse y esperar).",
    details: ["Instrucción: line up and wait", "Vehículo cruzando el upwind end de la pista"],
    hasKey: true,
  },
  {
    id: 4,
    audioUrl: `${BASE}/long/04-delta767-stand39.wav`,
    title: "Posible daño en Delta 767, stand 39",
    problem: "Aparente daño por impacto en un Delta 767 en el stand 39.",
    request: "Reporte/coordinación por daño en la puerta delantera derecha de pasajeros.",
    details: ["Delta 767", "Stand 39", "Daño por impacto", "Puerta delantera derecha de pax"],
    hasKey: true,
  },
  {
    id: 5,
    audioUrl: `${BASE}/long/05-rw04-distance-reduced.wav`,
    title: "Obras en la 04, distancia reducida",
    speaker: "controller",
    problem: "Obras en el extremo lejano de la pista 04.",
    request: "Aviso: distancia de aterrizaje reducida.",
    details: ["Obras far end rw 04", "Landing distance reducida 300 m", "Disponible: 2710 m"],
    hasKey: true,
  },
  {
    id: 6,
    audioUrl: `${BASE}/long/06-power-cut-radar.wav`,
    title: "Corte de energía, radar sin imagen",
    speaker: "controller",
    problem: "Corte de energía momentáneo.",
    request: "Aviso: pantallas de radar sin nada por el momento.",
    details: ["Power cut momentáneo", "Radar screens sin imagen por ahora"],
    hasKey: true,
  },
  {
    id: 7,
    audioUrl: `${BASE}/long/07-spillage-ramp.wav`,
    title: "Derrame en rampa, pushback negado",
    speaker: "controller",
    problem: "Derrame (spillage) en la rampa por detrás.",
    request: "Pushback negado por el momento.",
    details: ["Request pushback: negativo", "Derrame en la rampa detrás", "Anticipar ~10 min de demora"],
    hasKey: true,
  },
  {
    id: 8,
    audioUrl: `${BASE}/long/08-md83-active-rwy.wav`,
    title: "MD83 entró a pista activa (incursión)",
    speaker: "controller",
    problem: "Un MD83 acaba de entrar a la pista activa.",
    request: "Atención: tráfico Reg 259 en aproximación.",
    details: ["Reg 259 en aproximación", "MD83 entró a la pista activa", "Riesgo de incursión en pista"],
    hasKey: true,
  },
  {
    id: 9,
    audioUrl: `${BASE}/long/09-cargo-door.wav`,
    title: "Puerta de carga: palanca no flush",
    problem: "La puerta de carga trasera está cerrada y trabada, pero la palanca de traba no parece quedar al ras (flush).",
    request: "Verificación del cierre de la puerta de carga.",
    details: ["Reg319", "Rear cargo door cerrada y trabada", "Locking lever no parece flush"],
    hasKey: true,
  },
  {
    id: 10,
    audioUrl: `${BASE}/long/10-rw07r-blocked.wav`,
    title: "07R bloqueada, Luft 338 en final",
    speaker: "controller",
    problem: "La pista 07R está bloqueada por una aeronave que no la liberó.",
    request: "Atención: Lufthansa 338 en short final.",
    details: ["07R bloqueada por aeronave que no vacó", "Lufthansa 338 en short final"],
    hasKey: true,
  },
  {
    id: 11,
    audioUrl: `${BASE}/long/11-suspicious-man.wav`,
    title: "Hombre sospechoso en taxiway Mike",
    speaker: "pilot",
    problem: "Reporte de un hombre sospechoso con un bolso en el taxiway Mike (posible security).",
    request: "Reporte a la torre.",
    details: ["JB1638 en taxiway Kilo rumbo a 10L", "Hombre sospechoso con bolso en taxiway Mike"],
    hasKey: true,
  },
  {
    id: 12,
    audioUrl: `${BASE}/long/12-thud-vibrations.wav`,
    title: "Golpe fuerte y vibraciones",
    speaker: "pilot",
    problem: "La tripulación escuchó un golpe fuerte (thud) y sintió vibraciones.",
    request: "Reporte a la torre.",
    details: ["PH 458", "Loud thud", "Vibraciones"],
    hasKey: true,
  },
  {
    id: 13,
    audioUrl: `${BASE}/long/13-varig-hold.wav`,
    title: "Varig en holding sobre Madrid",
    speaker: "controller",
    problem: "Varig en patrón de espera estándar sobre Madrid.",
    request: "Aviso: esperar ~30 min de demora.",
    details: ["Standard hold pattern Madrid", "FL090", "Expect 30 min delay"],
    hasKey: true,
  },
  { id: 14, audioUrl: `${BASE}/long/14-track06.mp3`, title: "Audio largo extra (Track 06)", hasKey: false },
  { id: 15, audioUrl: `${BASE}/long/15-track15.mp3`, title: "Audio largo extra (Track 15)", hasKey: false },
  { id: 16, audioUrl: `${BASE}/long/16-track41.mp3`, title: "Audio largo extra (Track 41)", hasKey: false },
]

// ─── 2C · INTERACTIVE RESPONSE ───────────────────────────────────────────────
export interface InteractiveItem {
  id: number
  label: string
  audioUrl: string
}

export const INTERACTIVE_ITEMS: InteractiveItem[] = Array.from({ length: 6 }, (_, i) => {
  const n = i + 11 // tracks 11..16
  return { id: n, label: `Track ${n}`, audioUrl: `${BASE}/interactive/${n}.mp3` }
})
