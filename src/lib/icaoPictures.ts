/**
 * TEA — Part 3: Picture Description & Discussion.
 *
 * 13 pares de imágenes (26 fotos) del material "NEW PICTURES" que compartió
 * Cami, hosteadas en Supabase Storage (bucket público `icao-images`, subidas
 * con scripts/upload-icao-pictures.mjs).
 *
 * En el examen, el examinador muestra DOS imágenes relacionadas y el candidato
 * debe: describir cada una, compararlas, identificar riesgos, explicar posibles
 * causas, dar opiniones y conversar sobre el tema. Las preguntas de discusión
 * de cada par son guía de práctica (no las exactas del examen).
 */

const BASE =
  "https://gvwqmfxphsbmbrhyjcmk.supabase.co/storage/v1/object/public/icao-images/part3"

const img = (n: number) => `${BASE}/${String(n).padStart(2, "0")}.jpg`

export interface PicturePair {
  id: number
  theme: string
  /** tema en inglés (como lo nombraría el examinador) */
  themeEn: string
  imageA: string
  imageB: string
  altA: string
  altB: string
  /** preguntas de discusión para practicar después de describir/comparar */
  discussion: string[]
}

export const PICTURE_PAIRS: PicturePair[] = [
  {
    id: 1,
    theme: "Seguridad y contrabando",
    themeEn: "Security & smuggling",
    imageA: img(1),
    imageB: img(2),
    altA: "Personal de seguridad descubre dinero oculto en las piernas de una persona",
    altB: "Control de seguridad y escáner de equipaje en un aeropuerto",
    discussion: [
      "What security threats do airports face today?",
      "How effective do you think current screening methods are?",
      "Should security checks be stricter, even if they cause delays?",
      "What new technologies could improve airport security?",
    ],
  },
  {
    id: 2,
    theme: "Tipos de aeródromos",
    themeEn: "Types of aerodromes",
    imageA: img(3),
    imageB: img(4),
    altA: "Pequeño aeropuerto costero con torre y avión en pista de arena",
    altB: "Helicóptero aterrizando en un helipuerto junto al agua",
    discussion: [
      "What are the main differences between these two operating environments?",
      "What challenges does each type of facility present to pilots?",
      "Why are small or remote aerodromes important?",
      "What weather factors would most affect operations at each one?",
    ],
  },
  {
    id: 3,
    theme: "Fuego a bordo y en motor",
    themeEn: "Fire — cabin & engine",
    imageA: img(5),
    imageB: img(6),
    altA: "Tripulación de cabina usando un extintor sobre un compartimento superior",
    altB: "Avión comercial con fuego en el motor sobre la pista",
    discussion: [
      "What are the most common causes of fire on board an aircraft?",
      "How should the crew respond to each of these situations?",
      "Why is fire considered one of the most serious in-flight emergencies?",
      "What equipment and training help crews deal with fire?",
    ],
  },
  {
    id: 4,
    theme: "Evacuación de emergencia",
    themeEn: "Emergency evacuation",
    imageA: img(7),
    imageB: img(8),
    altA: "Pasajeros evacuando un avión por el ala en la plataforma",
    altB: "Avión dañado con bomberos respondiendo en la pista",
    discussion: [
      "What can make an emergency evacuation succeed or fail?",
      "Why is the 90-second evacuation rule so important?",
      "What risks do passengers face during an evacuation?",
      "How can cabin crew keep passengers calm in these situations?",
    ],
  },
  {
    id: 5,
    theme: "Pista y condiciones meteorológicas",
    themeEn: "Runway conditions & weather",
    imageA: img(9),
    imageB: img(10),
    altA: "Jet ejecutivo aterrizando en pista mojada con gran rociado de agua",
    altB: "Máquina quitanieve despejando la plataforma con aviones nevados",
    discussion: [
      "How do wet and snow-covered runways affect aircraft performance?",
      "What is aquaplaning and why is it dangerous?",
      "What precautions do crews take in poor runway conditions?",
      "How do airports prepare for winter operations?",
    ],
  },
  {
    id: 6,
    theme: "Tecnología: torre y simulador",
    themeEn: "Technology — tower & simulator",
    imageA: img(11),
    imageB: img(12),
    altA: "Controlador en una torre digital/remota con varias pantallas",
    altB: "Pilotos en un simulador de vuelo / cabina de entrenamiento",
    discussion: [
      "How is technology changing the work of pilots and controllers?",
      "What are the benefits and risks of remote or digital towers?",
      "Why are flight simulators so important for training?",
      "Could automation ever fully replace human operators? Why or why not?",
    ],
  },
  {
    id: 7,
    theme: "Drones y aeromodelismo",
    themeEn: "Drones & model aircraft",
    imageA: img(13),
    imageB: img(14),
    altA: "Niño en un avión de aeromodelismo en un evento de modelos",
    altB: "Un dron volando peligrosamente cerca de un avión en aproximación",
    discussion: [
      "Why are drones a growing safety concern near airports?",
      "How should drone use be regulated?",
      "What dangers does a drone pose to a landing aircraft?",
      "How can recreational flying be made safe?",
    ],
  },
  {
    id: 8,
    theme: "Tecnología en distintos roles",
    themeEn: "Technology in different roles",
    imageA: img(15),
    imageB: img(16),
    altA: "Mapa digital táctil del movimiento en tierra de un aeropuerto",
    altB: "Cabina de un avión de combate en vuelo",
    discussion: [
      "How do the demands on a controller and a military pilot differ?",
      "What role does situational awareness play in each environment?",
      "How does advanced technology support decision-making here?",
      "What kind of training does each of these roles require?",
    ],
  },
  {
    id: 9,
    theme: "Evolución del cockpit",
    themeEn: "Evolution of the cockpit",
    imageA: img(17),
    imageB: img(18),
    altA: "Cabina antigua y compleja con muchos instrumentos y tripulación",
    altB: "Cabina moderna de cristal (glass cockpit) de un helicóptero",
    discussion: [
      "How has the flight deck changed over the last decades?",
      "What are the advantages of modern glass cockpits?",
      "Has automation made flying safer, or created new risks?",
      "Why did aircraft move from large crews to two-pilot operations?",
    ],
  },
  {
    id: 10,
    theme: "Aviones en tierra",
    themeEn: "Aircraft on the ground",
    imageA: img(19),
    imageB: img(20),
    altA: "Vista aérea de una fábrica de aviones con aeronaves nuevas",
    altB: "Vista aérea de muchos aviones estacionados/almacenados",
    discussion: [
      "What situations lead to large numbers of aircraft being grounded?",
      "What challenges does storing aircraft for a long time create?",
      "How does aircraft production affect the aviation industry?",
      "What did the pandemic reveal about airline operations?",
    ],
  },
  {
    id: 11,
    theme: "Evacuación médica",
    themeEn: "Medical evacuation",
    imageA: img(21),
    imageB: img(22),
    altA: "Paciente en camilla siendo embarcado en un jet ambulancia",
    altB: "Helicóptero de rescate en la nieve con equipo de rescatistas",
    discussion: [
      "Why are air ambulances so important?",
      "What challenges do medical evacuation flights face?",
      "How do crews prepare for a medical emergency in flight?",
      "What factors decide whether to divert for a medical emergency?",
    ],
  },
  {
    id: 12,
    theme: "Aeropuertos desafiantes",
    themeEn: "Challenging airports",
    imageA: img(23),
    imageB: img(24),
    altA: "Pista construida sobre una península rodeada de montañas y mar",
    altB: "Pista costera estrecha junto al mar y un pueblo",
    discussion: [
      "What makes some airports especially difficult to operate at?",
      "How do terrain and surrounding obstacles affect approaches?",
      "What extra preparation do pilots need for challenging airports?",
      "Should some airports require special pilot qualification?",
    ],
  },
  {
    id: 13,
    theme: "Aviones y carreteras",
    themeEn: "Aircraft & roads",
    imageA: img(25),
    imageB: img(26),
    altA: "Avión comercial cruzando una carretera con semáforos deteniendo autos",
    altB: "Avioneta que aterrizó de emergencia en una autopista con policía",
    discussion: [
      "What risks appear when aircraft and road traffic share space?",
      "What might cause a pilot to make an emergency landing on a road?",
      "How should authorities manage an aircraft on a public road?",
      "What does each picture tell us about unusual operations?",
    ],
  },
]

/** Pasos de la tarea en la Parte 3 (iguales para todos los pares). */
export const PART3_TASK_STEPS: { label: string; detail: string }[] = [
  { label: "Describí cada imagen", detail: "Detalle a detalle, foreground/background, qué ves en A y en B." },
  { label: "Compará las dos", detail: "Similitudes y diferencias entre ambas situaciones." },
  { label: "Identificá los riesgos", detail: "Qué peligros o problemas de seguridad aparecen." },
  { label: "Explicá posibles causas", detail: "Especulá con 'might / could / may have': qué pudo provocarlo." },
  { label: "Dá tu opinión", detail: "Qué pensás del tema y por qué. Justificá." },
  { label: "Conversá sobre el tema", detail: "Respondé las preguntas de discusión desarrollando ideas." },
]
