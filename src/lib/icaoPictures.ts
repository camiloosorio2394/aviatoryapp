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
    theme: "Security & smuggling",
    themeEn: "Security & smuggling",
    imageA: img(1),
    imageB: img(2),
    altA: "Security staff discover money hidden on a person's legs",
    altB: "Security checkpoint and baggage scanner at an airport",
    discussion: [
      "What security threats do airports face today?",
      "How effective do you think current screening methods are?",
      "Should security checks be stricter, even if they cause delays?",
      "What new technologies could improve airport security?",
    ],
  },
  {
    id: 2,
    theme: "Types of aerodromes",
    themeEn: "Types of aerodromes",
    imageA: img(3),
    imageB: img(4),
    altA: "Small coastal airport with a tower and an aircraft on a sand runway",
    altB: "Helicopter landing on a helipad by the water",
    discussion: [
      "What are the main differences between these two operating environments?",
      "What challenges does each type of facility present to pilots?",
      "Why are small or remote aerodromes important?",
      "What weather factors would most affect operations at each one?",
    ],
  },
  {
    id: 3,
    theme: "Fire on board and engine fire",
    themeEn: "Fire — cabin & engine",
    imageA: img(5),
    imageB: img(6),
    altA: "Cabin crew using an extinguisher on an overhead compartment",
    altB: "Commercial aircraft with an engine fire over the runway",
    discussion: [
      "What are the most common causes of fire on board an aircraft?",
      "How should the crew respond to each of these situations?",
      "Why is fire considered one of the most serious in-flight emergencies?",
      "What equipment and training help crews deal with fire?",
    ],
  },
  {
    id: 4,
    theme: "Emergency evacuation",
    themeEn: "Emergency evacuation",
    imageA: img(7),
    imageB: img(8),
    altA: "Passengers evacuating an aircraft over the wing on the apron",
    altB: "Damaged aircraft with firefighters responding on the runway",
    discussion: [
      "What can make an emergency evacuation succeed or fail?",
      "Why is the 90-second evacuation rule so important?",
      "What risks do passengers face during an evacuation?",
      "How can cabin crew keep passengers calm in these situations?",
    ],
  },
  {
    id: 5,
    theme: "Runway and weather conditions",
    themeEn: "Runway conditions & weather",
    imageA: img(9),
    imageB: img(10),
    altA: "Business jet landing on a wet runway with heavy spray",
    altB: "Snowplough clearing the apron with snow-covered aircraft",
    discussion: [
      "How do wet and snow-covered runways affect aircraft performance?",
      "What is aquaplaning and why is it dangerous?",
      "What precautions do crews take in poor runway conditions?",
      "How do airports prepare for winter operations?",
    ],
  },
  {
    id: 6,
    theme: "Technology: tower and simulator",
    themeEn: "Technology — tower & simulator",
    imageA: img(11),
    imageB: img(12),
    altA: "Controller in a digital/remote tower with several screens",
    altB: "Pilots in a flight simulator / training cockpit",
    discussion: [
      "How is technology changing the work of pilots and controllers?",
      "What are the benefits and risks of remote or digital towers?",
      "Why are flight simulators so important for training?",
      "Could automation ever fully replace human operators? Why or why not?",
    ],
  },
  {
    id: 7,
    theme: "Drones and model aircraft",
    themeEn: "Drones & model aircraft",
    imageA: img(13),
    imageB: img(14),
    altA: "Child with a model aircraft at a model-flying event",
    altB: "A drone flying dangerously close to an aircraft on approach",
    discussion: [
      "Why are drones a growing safety concern near airports?",
      "How should drone use be regulated?",
      "What dangers does a drone pose to a landing aircraft?",
      "How can recreational flying be made safe?",
    ],
  },
  {
    id: 8,
    theme: "Technology in different roles",
    themeEn: "Technology in different roles",
    imageA: img(15),
    imageB: img(16),
    altA: "Touchscreen digital map of an airport's ground movement",
    altB: "Cockpit of a fighter jet in flight",
    discussion: [
      "How do the demands on a controller and a military pilot differ?",
      "What role does situational awareness play in each environment?",
      "How does advanced technology support decision-making here?",
      "What kind of training does each of these roles require?",
    ],
  },
  {
    id: 9,
    theme: "Evolution of the cockpit",
    themeEn: "Evolution of the cockpit",
    imageA: img(17),
    imageB: img(18),
    altA: "Old, complex cockpit with many instruments and crew",
    altB: "Modern glass cockpit of a helicopter",
    discussion: [
      "How has the flight deck changed over the last decades?",
      "What are the advantages of modern glass cockpits?",
      "Has automation made flying safer, or created new risks?",
      "Why did aircraft move from large crews to two-pilot operations?",
    ],
  },
  {
    id: 10,
    theme: "Aircraft on the ground",
    themeEn: "Aircraft on the ground",
    imageA: img(19),
    imageB: img(20),
    altA: "Aerial view of an aircraft factory with new aircraft",
    altB: "Aerial view of many parked/stored aircraft",
    discussion: [
      "What situations lead to large numbers of aircraft being grounded?",
      "What challenges does storing aircraft for a long time create?",
      "How does aircraft production affect the aviation industry?",
      "What did the pandemic reveal about airline operations?",
    ],
  },
  {
    id: 11,
    theme: "Medical evacuation",
    themeEn: "Medical evacuation",
    imageA: img(21),
    imageB: img(22),
    altA: "Patient on a stretcher being boarded onto an air ambulance jet",
    altB: "Rescue helicopter in the snow with a rescue team",
    discussion: [
      "Why are air ambulances so important?",
      "What challenges do medical evacuation flights face?",
      "How do crews prepare for a medical emergency in flight?",
      "What factors decide whether to divert for a medical emergency?",
    ],
  },
  {
    id: 12,
    theme: "Challenging airports",
    themeEn: "Challenging airports",
    imageA: img(23),
    imageB: img(24),
    altA: "Runway built on a peninsula surrounded by mountains and sea",
    altB: "Narrow coastal runway next to the sea and a town",
    discussion: [
      "What makes some airports especially difficult to operate at?",
      "How do terrain and surrounding obstacles affect approaches?",
      "What extra preparation do pilots need for challenging airports?",
      "Should some airports require special pilot qualification?",
    ],
  },
  {
    id: 13,
    theme: "Aircraft and roads",
    themeEn: "Aircraft & roads",
    imageA: img(25),
    imageB: img(26),
    altA: "Commercial aircraft crossing a road with traffic lights stopping cars",
    altB: "Light aircraft that made an emergency landing on a motorway, with police",
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
  { label: "Describe each image", detail: "Detail by detail, foreground/background, what you see in A and in B." },
  { label: "Compare the two", detail: "Similarities and differences between the two situations." },
  { label: "Identify the risks", detail: "What dangers or safety issues appear." },
  { label: "Explain possible causes", detail: "Speculate with 'might / could / may have': what could have caused it." },
  { label: "Give your opinion", detail: "What you think about the topic and why. Justify it." },
  { label: "Discuss the topic", detail: "Answer the discussion questions, developing your ideas." },
]
