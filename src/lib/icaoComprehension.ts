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
// Claves Set B (transcripción Whisper + revisión). Indexadas por número de audio.
const setBKeys: Record<string, { s: Speaker; t: string; m: string }> = {
  "023": { s: "pilot", t: "The flight engineer has now recovered. We're able to continue to our original destination.", m: "El ingeniero de vuelo se recuperó; pueden continuar al destino original." },
  "024": { s: "pilot", t: "We cannot confirm the length of the delay. There is a problem with the generators.", m: "No pueden confirmar la duración de la demora; problema con los generadores." },
  "025": { s: "pilot", t: "The wife of the sick passenger has confirmed that we have the correct medication.", m: "La esposa del pasajero enfermo confirmó que tienen la medicación correcta." },
  "026": { s: "controller", t: "We can see you on the radar. Can you confirm your position?", m: "Te ven en el radar; piden confirmar posición." },
  "027": { s: "pilot", t: "The first officer has had a heart attack, requesting immediate clearance to land.", m: "El primer oficial tuvo un infarto; piden autorización inmediata para aterrizar." },
  "028": { s: "pilot", t: "We need a doctor on arrival. A passenger has fallen and is not able to move.", m: "Necesitan un médico a la llegada; un pasajero se cayó y no puede moverse." },
  "029": { s: "pilot", t: "A bag fell on a passenger's head. She has a concussion.", m: "A una pasajera le cayó un bolso en la cabeza; tiene una conmoción." },
  "030": { s: "pilot", t: "The captain is experiencing dizziness, unable to continue to destination.", m: "El capitán tiene mareos; no pueden continuar al destino." },
  "031": { s: "pilot", t: "Please request an ambulance on arrival; we'll have a doctor on board.", m: "Piden una ambulancia a la llegada; habrá un médico a bordo." },
  "032": { s: "controller", t: "Your slot has been delayed due to computer failure. We'll advise you shortly.", m: "El slot se demoró por falla de computadora; avisarán en breve." },
  "033": { s: "pilot", t: "We've been through extreme turbulence, and several passengers are injured.", m: "Pasaron turbulencia extrema; varios pasajeros heridos." },
  "034": { s: "pilot", t: "We have a medical update. The sick passenger is better now.", m: "Actualización médica: el pasajero enfermo está mejor." },
  "035": { s: "pilot", t: "The cabin crew are carrying out mouth-to-mouth resuscitation.", m: "La tripulación está haciendo respiración boca a boca." },
  "036": { s: "pilot", t: "A passenger has died, so we'll need some assistance after landing.", m: "Falleció un pasajero; necesitarán asistencia tras aterrizar." },
  "037": { s: "pilot", t: "The flight crew have food poisoning. Request return to base.", m: "La tripulación tiene intoxicación alimentaria; piden volver a base." },
  "039": { s: "pilot", t: "The sick passenger has got worse. I will need to land soon.", m: "El pasajero enfermo empeoró; necesitan aterrizar pronto." },
  "040": { s: "pilot", t: "A passenger has fallen over and broken their arm.", m: "Un pasajero se cayó y se quebró el brazo." },
  "041": { s: "pilot", t: "Two of our engines are overheating and we are losing altitude.", m: "Dos motores se recalientan y están perdiendo altitud." },
  "043": { s: "controller", t: "The runway is closed due to a flock of birds. Please use runway 02.", m: "Pista cerrada por una bandada de aves; usar pista 02." },
  "044": { s: "pilot", t: "We are running low on fuel. Can you confirm we are number one for landing?", m: "Bajos de combustible; piden confirmar que son número uno para aterrizar." },
  "045": { s: "pilot", t: "A passenger has slipped and cut their arm.", m: "Un pasajero resbaló y se cortó el brazo." },
  "046": { s: "controller", t: "There is a thunderstorm approaching the end of the runway. Hold your position.", m: "Una tormenta se acerca al final de la pista; mantené posición." },
  "047": { s: "pilot", t: "Number 1 engine is cut off, unable to maintain altitude.", m: "Motor 1 apagado; no pueden mantener altitud." },
  "049": { s: "pilot", t: "There's too much cloud cover, we can't see the runway.", m: "Demasiada nubosidad; no ven la pista." },
  "050": { s: "pilot", t: "We won't have brakes on touchdown — can we have the longest runway?", m: "No tendrán frenos al tocar; piden la pista más larga." },
  "051": { s: "controller", t: "A volcano has erupted, please change your course to 040.", m: "Erupción volcánica; cambiar rumbo a 040." },
  "052": { s: "pilot", t: "A passenger has fallen over and cut their head, request priority landing.", m: "Un pasajero se cayó y se cortó la cabeza; piden aterrizaje prioritario." },
  "053": { s: "pilot", t: "We've just come through some bad turbulence. We need to check if the passengers are okay.", m: "Pasaron turbulencia fuerte; necesitan chequear a los pasajeros." },
  "055": { s: "pilot", t: "My de-icing system is unserviceable, request descent to avoid cloud.", m: "Sistema de deshielo inoperativo; piden descender para evitar nubes." },
  "057": { s: "pilot", t: "The patient is now in a stable condition and will continue to original destination.", m: "El paciente está estable; continúan al destino original." },
  "058": { s: "controller", t: "Avoid flight below 5,000 feet. There has been a volcanic eruption.", m: "Eviten volar por debajo de 5,000 ft; hubo una erupción volcánica." },
  "059": { s: "pilot", t: "The hydraulic system has failed. We can't control the aircraft.", m: "Falló el sistema hidráulico; no pueden controlar la aeronave." },
  "061": { s: "pilot", t: "We have experienced wake turbulence — has separation been maintained?", m: "Experimentaron estela turbulenta; preguntan si se mantuvo la separación." },
  "063": { s: "pilot", t: "There's a problem with the air cooling system, I'll try to repair it.", m: "Problema con el sistema de aire acondicionado; intentarán repararlo." },
  "064": { s: "pilot", t: "Engine 3 is cut off, request priority for landing.", m: "Motor 3 apagado; piden prioridad para aterrizar." },
}
const setB: ShortAudio[] = setBFiles.map((f) => {
  const num = f.replace(/\.\w+$/, "")
  const k = setBKeys[num]
  return {
    id: `b-${num}`, label: `Audio ${num}`, audioUrl: `${BASE}/short/b/${f}`,
    ...(k ? { speaker: k.s, transcript: k.t, messageSummary: k.m } : {}),
  }
})

// Claves Set C (transcripción Whisper + revisión). Orden CD4 01..16.
const setCKeys: { s: Speaker; t: string; m: string }[] = [
  { s: "pilot", t: "A left main landing gear is jammed; we'll proceed to the holding area to carry out a complete check.", m: "Tren principal izquierdo trabado; van al área de espera para una revisión completa." },
  { s: "pilot", t: "The landing gear is down but has not locked. We intend to make a low pass near the tower to have the undercarriage checked.", m: "Tren abajo pero sin trabar; harán un low pass cerca de la torre para que revisen el tren." },
  { s: "pilot", t: "Unable to extend flaps beyond 10 degrees, request a high-speed (flapless) approach to runway 26.", m: "No pueden extender flaps más de 10°; piden aproximación de alta velocidad a la 26." },
  { s: "pilot", t: "We have aquaplaned and have two tyres blown out on the main gear. Request passenger steps and buses to take passengers to the terminal.", m: "Hicieron aquaplaning y reventaron dos neumáticos del tren principal; piden escaleras y buses para los pasajeros." },
  { s: "pilot", t: "We seem to have a nose gear tyre blowout on landing. Request a tug to tow us to the stand.", m: "Reventón de neumático del tren de nariz al aterrizar; piden un tug para remolcar al stand." },
  { s: "pilot", t: "We have a chemical fire in the cargo hold. Request emergency landing.", m: "Fuego químico en la bodega de carga; piden aterrizaje de emergencia." },
  { s: "pilot", t: "The windscreen has blown out and the cockpit has become depressurized. Request emergency landing.", m: "Se reventó el parabrisas y la cabina se despresurizó; piden aterrizaje de emergencia." },
  { s: "pilot", t: "We can't see much because it's so foggy ahead.", m: "Casi no ven por la niebla densa adelante. [transcript aprox.]" },
  { s: "controller", t: "I don't have you on my screen. Can you confirm your aircraft type, altitude and speed?", m: "No los tienen en pantalla; piden confirmar tipo de aeronave, altitud y velocidad." },
  { s: "pilot", t: "We have a system failure. Our lights are not working and our displays are down.", m: "Falla de sistema; sin luces y con las pantallas caídas." },
  { s: "pilot", t: "We have a problem. Our fuel flow is very low.", m: "El flujo de combustible está muy bajo." },
  { s: "pilot", t: "We have a problem. I'm having trouble with my landing gear.", m: "Problemas con el tren de aterrizaje." },
  { s: "pilot", t: "We have a situation. The windshield is icing up.", m: "El parabrisas se está congelando." },
  { s: "pilot", t: "We need some help. A passenger is drunk and has become unruly.", m: "Un pasajero ebrio se puso agresivo (unruly)." },
  { s: "pilot", t: "I need some help. I'm unable to release the nose gear.", m: "No pueden bajar el tren de nariz." },
  { s: "pilot", t: "We need some help. The radio has gone down.", m: "Se cayó la radio." },
]
const setC: ShortAudio[] = setCKeys.map((k, i) => {
  const n = i + 1
  return {
    id: `c-${n}`,
    label: `CD4 · ${String(n).padStart(2, "0")}`,
    audioUrl: `${BASE}/short/c/cd4-${String(n).padStart(2, "0")}.m4a`,
    speaker: k.s, transcript: k.t, messageSummary: k.m,
  }
})

export const SHORT_AUDIO_SETS: ShortAudioSet[] = [
  { key: "a", title: "Set A · Track 1–16", note: "16 clips cortos", items: setA,
    keyNote: "Claves: transcripción automática (Whisper) + revisión manual. El speaker se infiere del contenido." },
  { key: "b", title: "Set B · 023–064", note: `${setB.length} clips`, items: setB,
    keyNote: "Claves: transcripción automática (Whisper) + revisión manual. El speaker se infiere del contenido." },
  { key: "c", title: "Set C · CD4 01–16", note: "16 clips", items: setC,
    keyNote: "Claves: transcripción automática (Whisper) + revisión manual. El speaker se infiere del contenido." },
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
  /** resumen (para las narrativas largas L14-16, que no son problema/pedido/detalles) */
  summary?: string
  /** transcripción Whisper + revisión */
  transcript?: string
  /** true si tenemos clave */
  hasKey: boolean
}

const _LONG_AUDIOS: LongAudio[] = [
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
  {
    id: 14,
    audioUrl: `${BASE}/long/14-track06.mp3`,
    title: "Narrativa: MD-83 confunde luces cerca de Dublín",
    speaker: "pilot",
    summary: "Pasaje de comprensión (largo). La 28 estaba cerrada por mantenimiento, así que un MD-83 cerca de Dublín fue autorizado a una aproximación VOR/DME a la 34. A unas 5 NM y 1900 ft empezó a desviarse a la izquierda porque la tripulación confundió las luces de un hotel con las de aproximación. El comandante, desconcertado por la falta de luces de borde de pista, consultó a la torre; el controlador (distraído con mantenimiento) notó la desviación tarde y ordenó girar y trepar a 2000 ft. Iniciaron go-around a 580 ft y luego aterrizaron por ILS en la 16 sin más incidentes.",
    hasKey: true,
  },
  {
    id: 15,
    audioUrl: `${BASE}/long/15-track15.mp3`,
    title: "Narrativa: pérdida de separación (airprox) en Heathrow",
    speaker: "controller",
    summary: "Pasaje de comprensión (largo). Un MD-81 desde Dinamarca entró al holding LAM antes de aproximar a Heathrow. Dos minutos después, un B737-400 desde Ámsterdam fue instruido a esperar en el mismo punto. El MD-81 descendió a FL140 y el B737 a FL150 (colación correcta). El mínimo es 1000 ft de separación vertical, pero a las 16:44 la separación vertical cayó a 100 ft y la horizontal a ~750 m. Los controladores estaban atendiendo otros vuelos; el sistema STCA (short-term conflict alert) los alertó y el B737 volvió a trepar a FL150.",
    hasKey: true,
  },
  {
    id: 16,
    audioUrl: `${BASE}/long/16-track41.mp3`,
    title: "Intercambio ATC real: fuego de motor en pista",
    speaker: "pilot",
    summary: "Diálogo real torre–piloto–bomberos. Una aeronave ('Hatchery 339A heavy') tiene el motor derecho en llamas; va a detenerse tras vacar la pista. Coordinan con el servicio de bomberos (que pasa a otra frecuencia), confirman el motor apagado y las dos botellas extintoras descargadas, y echan espuma. El fuego parecía estar en el tailpipe; deciden no evacuar pasajeros por el momento.",
    hasKey: true,
  },
]

// Transcripciones (Whisper + revisión) por id de audio largo.
const LONG_TRANSCRIPTS: Record<number, string> = {
  1: "Migratory bird movements have been reported in the vicinity of the approach path to runway 23 left.",
  2: "The last flight to land reported severe wind shear half a mile from the threshold of runway 15 right, with a sudden drop in airspeed of 20 knots.",
  3: "Line up and wait. Vehicle crossing the upwind end of the runway.",
  4: "It looks like the Delta 767 at stand 39A has some impact damage under its right forward passenger door.",
  5: "Maintenance work has been conducted on the far end of runway 04. As a result, the landing distance available has been reduced by 300 metres, to 2710 metres.",
  6: "We have had a momentary power cut and we are showing nothing on our radar screens for the moment.",
  7: "Request push back negative — there is a spillage on the ramp behind you. Hold position, anticipate a 10-minute delay.",
  8: "Regional 259 is 2 miles from touchdown; an MD-83 has just entered the active runway.",
  9: "Regional 319, Tower — is your rear cargo compartment closed and locked? From here it seems that the locking lever is not flush.",
  10: "Runway 07 right is blocked by an aircraft which has not vacated. Lufthansa 338 is on short final.",
  11: "Tower, JetBlue 1638, we are on Kilo heading for runway 10 left. There appears to be a suspicious-looking man on foot carrying a large bag on Mike.",
  12: "We have just heard a loud thud and felt a slight vibration. Can you see if anything has impacted us?",
  13: "Varig 221, cleared to enter the holding pattern at Madrid, Flight Level 090, expect approximately 30 minutes delay due to heavy traffic.",
}

export const LONG_AUDIOS: LongAudio[] = _LONG_AUDIOS.map((a) => ({
  ...a,
  transcript: a.transcript ?? LONG_TRANSCRIPTS[a.id],
}))

// ─── 2C · INTERACTIVE RESPONSE ───────────────────────────────────────────────
export interface InteractiveItem {
  id: number
  label: string
  audioUrl: string
  /** transcripción de la situación (Whisper + revisión) */
  transcript?: string
  /** preguntas modelo para obtener más info */
  questions?: string[]
  /** consejos/recomendaciones modelo */
  advice?: string[]
}

const interactiveKeys: { transcript: string; questions: string[]; advice: string[] }[] = [
  {
    transcript: "We have a problem. The brakes don't feel right.",
    questions: [
      "Are the brakes failing completely, or just feeling spongy?",
      "Do you have any hydraulic warnings?",
      "Are you airborne or on the ground, and how much runway is left?",
      "How many people and how much fuel on board?",
    ],
    advice: [
      "Run the abnormal brake / hydraulic checklist.",
      "Request the longest available runway with emergency services on standby.",
      "Use alternate braking and reverse thrust to help stop.",
      "Reduce landing weight if airborne and time allows.",
    ],
  },
  {
    transcript: "We have a situation — some passengers are complaining.",
    questions: [
      "What exactly are the passengers complaining about?",
      "Is it a safety issue or a comfort issue?",
      "Is anyone unwell or becoming aggressive?",
      "Does the cabin crew have it under control?",
    ],
    advice: [
      "Have the cabin crew identify the cause and reassure passengers.",
      "Separate or restrain anyone who becomes disruptive.",
      "If it's technical (smell, temperature), investigate and report.",
      "Keep the flight deck informed.",
    ],
  },
  {
    transcript: "We have a problem. There is a strong smell in the cabin.",
    questions: [
      "What does the smell resemble — smoke, fumes, fuel, electrical?",
      "Is there any visible smoke or haze?",
      "Are any passengers or crew feeling unwell?",
      "Which part of the cabin is affected?",
    ],
    advice: [
      "Treat any smell of smoke/fumes as a possible fire; don oxygen masks if needed.",
      "Run the smoke/fumes checklist and isolate suspected electrical sources.",
      "Consider a precautionary diversion with emergency services standing by.",
      "Prepare the cabin in case an evacuation is required.",
    ],
  },
  {
    transcript: "We need some help. I could not understand what he said.",
    questions: [
      "Which message or instruction did you not understand?",
      "Would you like me to say it again, more slowly?",
      "Are you experiencing radio interference or a weak signal?",
      "Do you need it spelled out, each word twice?",
    ],
    advice: [
      "Ask the controller to 'say again' slowly, word by word.",
      "Use standard phraseology and read back to confirm.",
      "Relay through another aircraft or change frequency if the signal is poor.",
      "Never act on an instruction you haven't fully understood.",
    ],
  },
  {
    transcript: "We need some help. It is difficult to steer the vehicle.",
    questions: [
      "Is it a nosewheel steering problem on the ground?",
      "Are you able to stop safely where you are?",
      "Is a taxiway or runway blocked because of you?",
      "Do you need a tow vehicle?",
    ],
    advice: [
      "Stop in a safe position and set the parking brake.",
      "Request a tug/tow to move the aircraft.",
      "Inform ATC so they can manage other traffic around you.",
      "Have engineering inspect the nosewheel steering.",
    ],
  },
  {
    transcript: "We need some help. A woman has had a fit.",
    questions: [
      "Is the passenger conscious and breathing now?",
      "Is there a doctor or medical professional on board?",
      "Was she injured during the seizure?",
      "Do you need medical assistance on arrival?",
    ],
    advice: [
      "Protect her from injury; don't restrain her movements during the seizure.",
      "Call for any medical professional on board and contact MedLink.",
      "Give first aid and monitor her airway and breathing.",
      "Request medical assistance on arrival; consider a diversion if serious.",
    ],
  },
]

export const INTERACTIVE_ITEMS: InteractiveItem[] = interactiveKeys.map((k, i) => {
  const n = i + 11 // tracks 11..16
  return { id: n, label: `Track ${n}`, audioUrl: `${BASE}/interactive/${n}.mp3`, ...k }
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
