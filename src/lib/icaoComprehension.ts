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
  /** clave (cuando existe): transcripción + quién habla + resumen del mensaje */
  transcript?: string
  speaker?: Speaker
  messageSummary?: string
}

export interface ShortAudioSet {
  key: "a" | "b" | "c"
  title: string
  note: string
  /** nota sobre el origen de las claves (ej: transcripción auto + revisión) */
  keyNote?: string
  items: ShortAudio[]
}

// Set A — claves derivadas de transcripción Whisper (base.en) + revisión manual.
// Orden = Track 1..16. speaker inferido del contenido (algunos marcados aprox.).
const setAKeys: { transcript: string; speaker: Speaker; summary: string }[] = [
  { transcript: "Unknown traffic is ahead of us. We are descending immediately.", speaker: "pilot",
    summary: "Tráfico desconocido adelante; descienden de inmediato para evitarlo." },
  { transcript: "We had a problem with our radio, so we couldn't call you.", speaker: "pilot",
    summary: "Tuvieron una falla de radio y por eso no pudieron llamar." },
  { transcript: "We're ready to push back, so remove the wheel chocks.", speaker: "pilot",
    summary: "Listos para pushback; piden retirar los chocks (tacos) de las ruedas." },
  { transcript: "There are banks of snow on the runway. It will take 30 minutes to remove them.", speaker: "controller",
    summary: "Bancos de nieve en la pista; tomará 30 minutos removerlos." },
  { transcript: "Your destination does not have fire and rescue services — divert to your alternate.", speaker: "controller",
    summary: "El destino no tiene servicios de bomberos/rescate; desviar al alternativo." },
  { transcript: "The woman has given birth. Mother and baby will require attention on arrival.", speaker: "pilot",
    summary: "Una pasajera dio a luz; madre y bebé necesitarán atención médica a la llegada." },
  { transcript: "We have a cracked windshield. Can we have technical support here to examine it?", speaker: "pilot",
    summary: "Parabrisas fisurado (cracked); piden soporte técnico para revisarlo." },
  { transcript: "We just saw a collision between two aircraft to our left. Do you have any information?", speaker: "pilot",
    summary: "Vieron una colisión entre dos aeronaves a su izquierda; piden información." },
  { transcript: "Our sick passenger is feeling better. The cabin crew are monitoring her.", speaker: "pilot",
    summary: "El pasajero enfermo está mejor; la tripulación de cabina la monitorea." },
  { transcript: "We were told that there is dense fog at our destination. Can we have a weather update?", speaker: "pilot",
    summary: "Les reportaron niebla densa en destino; piden una actualización meteorológica." },
  { transcript: "We have a problem. We need to get some medical help.", speaker: "pilot",
    summary: "Tienen un problema y necesitan ayuda médica." },
  { transcript: "We have a situation. The computers are causing problems again.", speaker: "pilot",
    summary: "Las computadoras están dando problemas otra vez." },
  { transcript: "We have a problem — it's gone dark.", speaker: "pilot",
    summary: "Se quedaron a oscuras (pérdida de iluminación/pantallas). [speaker aprox.]" },
  { transcript: "We need some help. We can't do all this work — it's too much.", speaker: "controller",
    summary: "Sobrecarga de trabajo; piden ayuda. [speaker aprox.]" },
  { transcript: "We need some help. We're having trouble starting the engine.", speaker: "pilot",
    summary: "Tienen problemas para arrancar el motor." },
  { transcript: "We need some help. We think the man has a weapon.", speaker: "pilot",
    summary: "Creen que un hombre tiene un arma a bordo (amenaza de seguridad)." },
]

const setA: ShortAudio[] = setAKeys.map((k, i) => {
  const n = i + 1
  return {
    id: `a-${n}`,
    label: `Track ${n}`,
    audioUrl: `${BASE}/short/a/track-${String(n).padStart(2, "0")}.mp3`,
    transcript: k.transcript,
    speaker: k.speaker,
    messageSummary: k.summary,
  }
})

const setBFiles = [
  // 023-041 (carpeta SHORT AUDIOS)
  "023.wav", "024.wav", "025.wav", "026.wav", "027.wav", "028.wav", "029.wav",
  "030.wav", "031.wav", "032.wav", "033.mp3", "034.mp3", "035.mp3", "036.mp3",
  "037.mp3", "039.mp3", "040.mp3", "041.mp3",
  // 043-064 (carpeta TEA Materials — continúan el set)
  "043.wav", "044.wav", "045.wav", "046.wav", "047.wav", "049.wav", "050.wav",
  "051.wav", "052.wav", "053.wav", "055.mp3", "057.mp3", "058.mp3", "059.mp3",
  "061.mp3", "063.mp3", "064.mp3",
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
  { key: "a", title: "Set A · Track 1–16", note: "16 clips cortos", items: setA,
    keyNote: "Claves: transcripción automática (Whisper) + revisión manual. El speaker se infiere del contenido." },
  { key: "b", title: "Set B · 023–064", note: `${setB.length} clips`, items: setB },
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

// ─── FRASES MODELO DEL WORKBOOK ──────────────────────────────────────────────
// Del libro "ICAO WORKTHEMES BOOK" (Aviation English Now 2022), págs 247-249.
// Son frases-ejemplo OFICIALES del tipo de mensaje que aparece en el examen —
// NO el transcript 1:1 de cada audio numerado. Sirven como modelo para practicar
// "what is the message?" (2A) y "ask questions + advice" (2C).

/** 2A — "What is the message?" — 30 mensajes modelo del workbook. */
export const SAMPLE_MESSAGES_2A: string[] = [
  "I cannot hear what you are saying. Please say each word twice.",
  "We can smell smoke from the toilets. We think a passenger has a cigarette.",
  "We've just gone through some bad turbulence. We need to check if the passengers are OK.",
  "The first officer has a severe head injury. Request diversion to the nearest aerodrome.",
  "There are vehicles close to the runway. Standby for instructions.",
  "The aerodrome is now in sight, we can continue visually.",
  "We are evacuating because of smoke, call the fire brigade.",
  "Departure delayed, because one passenger is suffering an injury.",
  "We had radio interference, could you repeat the last message.",
  "Our take-off is going to be delayed, because a passenger is receiving first aid.",
  "Destination airport runway closed because they're clearing the runway.",
  "The traffic that just crossed our heading from left to right was too close — what is happening?",
  "There is a thunderstorm ahead — you need to turn right on an easterly heading.",
  "We tried to restart the engine but it's not responding.",
  "We have a pax on board with heart problems, request emergency descent for priority landing.",
  "There is an airport with a tower 8 miles south of your position, do you have enough fuel?",
  "He appears to be concussed and has severe bruising.",
  "I can see debris on the right-hand side of the runway near the threshold.",
  "We need to get away before quiet hours.",
  "The flaps are frozen and need freeing.",
  "I'll get the ground crew to wipe the grease off the glass.",
  "The brake light is blinking on and off, I don't think the gear locked down either.",
  "I'm having difficulty veering left, I can only use asymmetrical thrust.",
  "I think we are going to be forced to ditch in a field.",
  "Adopt landing configuration to control speed and height.",
  "We have a drunken passenger on board; we need the police to meet us on arrival.",
  "We have been hit by hailstones in the last 10 minutes, the wings appear damaged.",
  "The runway is cleared for a belly landing — alert the fire and rescue service please.",
  "The engines are not running smoothly — we are diverting to the nearest airport.",
  "It's been raining, and the runway is slippery, we'll need the longest runway available.",
]

/** 2C — "Ask questions + give advice" — 25 escenarios modelo del workbook. */
export const SAMPLE_SCENARIOS_2C: string[] = [
  "We have a problem... we cannot move.",
  "We have a problem... there is a man shouting at me.",
  "We have a problem… one of the passengers is being sick.",
  "We have a problem… some of the passengers are missing.",
  "We have a problem… a passenger is unconscious.",
  "We have a problem… an alarm has just started.",
  "We have a problem, we're still struggling to get a slot.",
  "We have a problem — the brake light is blinking.",
  "We have a problem — a passenger has had a bag fall on his head.",
  "We have a problem… a man has just punched a member of the cabin crew.",
  "We have a problem… a passenger is complaining of acute stomach ache.",
  "We have a problem, we need medical help.",
  "We have a problem; we think we have crashed into something.",
  "We need some help… we can't hear anything.",
  "We need some help… we're feeling very stressed.",
  "We need some help… the computer system has gone down.",
  "We need some help, a man's bags have been stolen.",
  "We need some help; we have a woman here who is very upset.",
  "We need some help, the passenger is trembling and coughing and seems to be short of breath.",
  "We need some help, we can't get the computer to work.",
  "We need some help; the passenger has lost consciousness and is still bleeding.",
  "We need some help… the galley floor appears to be very hot.",
  "We need some help… a passenger has just hit the purser.",
  "We need some help… we have skidded off the runway into a ditch.",
  "We need some help. We have a passenger who is trembling and shaking.",
]
