/**
 * Práctica del módulo Mercancías peligrosas: cuatro modos.
 *
 *   Etiquetas   → cuatro ejercicios visuales con los rombos del Apéndice 1
 *   Clasifica   → un envío, el piloto decide clase y grupo de embalaje
 *   Escenarios  → situaciones operacionales que se resuelven con las palabras
 *                 propias y después se comparan con la respuesta modelo
 *   Entrevista  → lo que podrían preguntarte, con la respuesta modelo y qué
 *                 evalúan con cada pregunta
 *
 * Todo lo normativo remite a su artículo del RAC 175. Los escenarios son
 * construidos para el curso y lo dicen; las cifras que salen de las
 * Instrucciones Técnicas (no cargadas) llevan su aviso de verificación.
 */

// ─── Etiquetas ───────────────────────────────────────────────────────────────

export interface OpcionRonda {
  texto?: string
  /** Id de rombo (ver `rombo()` en mercanciasClases). */
  imagen?: string
}

export interface Ronda {
  enunciado: string
  /** Rombo que se muestra con el enunciado, si el ejercicio es de reconocimiento. */
  imagen?: string
  opciones: OpcionRonda[]
  correcta: number
  explicacion: string
  ref?: string
}

export interface EjercicioEtiquetas {
  id: string
  titulo: string
  descripcion: string
  rondas: Ronda[]
}

const CLASES_TEXTO = {
  "2.1": "Gas inflamable · 2.1",
  "2.2": "Gas no inflamable, no tóxico · 2.2",
  "2.3": "Gas tóxico · 2.3",
  "3": "Líquido inflamable · clase 3",
  "4.1": "Sólido inflamable · 4.1",
  "4.2": "Combustión espontánea · 4.2",
  "4.3": "Peligroso mojado · 4.3",
  "5.1": "Comburente · 5.1",
  "5.2": "Peróxido orgánico · 5.2",
  "6.1": "Sustancia tóxica · 6.1",
  "6.2": "Sustancia infecciosa · 6.2",
  "8": "Corrosivo · clase 8",
  "9": "Mercancías peligrosas varias · clase 9",
}

function t(k: keyof typeof CLASES_TEXTO): OpcionRonda {
  return { texto: CLASES_TEXTO[k] }
}
function img(id: string): OpcionRonda {
  return { imagen: id }
}

export const EJERCICIOS_ETIQUETAS: EjercicioEtiquetas[] = [
  {
    id: "reconoce",
    titulo: "Reconocimiento",
    descripcion: "Se muestra la etiqueta y dices la clase o división. Sin pistas de texto: solo la imagen. Nueve rondas.",
    rondas: [
      { enunciado: "¿Qué clase o división es?", imagen: "3", opciones: [t("4.1"), t("3"), t("2.1"), t("5.1")], correcta: 1, explicacion: "Símbolo (llama) en negro o blanco sobre fondo rojo: líquido inflamable, clase 3.", ref: "Apéndice 1, Figura 1.8" },
      { enunciado: "¿Qué clase o división es?", imagen: "2-2", opciones: [t("2.1"), t("2.3"), t("2.2"), t("9")], correcta: 2, explicacion: "Fondo verde: gas no inflamable, no tóxico, división 2.2.", ref: "Apéndice 1, Figura 1.6" },
      { enunciado: "¿Qué clase o división es?", imagen: "4-3", opciones: [t("4.1"), t("4.3"), t("2.2"), t("4.2")], correcta: 1, explicacion: "Fondo azul: sustancia que en contacto con el agua emite gas inflamable, división 4.3.", ref: "Apéndice 1, Figura 1.11" },
      { enunciado: "¿Qué clase o división es?", imagen: "5-1", opciones: [t("5.2"), t("3"), t("5.1"), t("2.1")], correcta: 2, explicacion: "Llama sobre un círculo, fondo amarillo, «5.1» en el ángulo inferior: comburente.", ref: "Apéndice 1, Figura 1.12" },
      { enunciado: "¿Qué clase o división es?", imagen: "6-1", opciones: [t("6.2"), t("2.3"), t("8"), t("6.1")], correcta: 3, explicacion: "Calavera y tibias sobre fondo blanco con el «6» abajo: sustancia tóxica, división 6.1. La 2.3 lleva el mismo símbolo pero con el «2».", ref: "Apéndice 1, Figura 1.14" },
      { enunciado: "¿Qué clase o división es?", imagen: "8", opciones: [t("8"), t("6.1"), t("9"), t("4.2")], correcta: 0, explicacion: "Líquido goteando sobre una mano y una plancha, mitad superior blanca y mitad inferior negra: corrosivo, clase 8.", ref: "Apéndice 1, Figura 1.20" },
      { enunciado: "¿Qué clase o división es?", imagen: "9", opciones: [t("4.1"), t("9"), t("8"), t("6.2")], correcta: 1, explicacion: "Siete franjas verticales negras en la mitad superior, fondo blanco: mercancías peligrosas varias, clase 9. Aquí van las baterías de litio y el hielo seco.", ref: "Apéndice 1, Figura 1.21" },
      { enunciado: "¿Qué clase o división es?", imagen: "2-3", opciones: [t("6.1"), t("2.2"), t("2.3"), t("2.1")], correcta: 2, explicacion: "Calavera y tibias sobre fondo blanco con el «2» abajo: gas tóxico, división 2.3.", ref: "Apéndice 1, Figura 1.7" },
      { enunciado: "¿Qué clase o división es?", imagen: "4-2", opciones: [t("4.3"), t("4.2"), t("3"), t("4.1")], correcta: 1, explicacion: "Mitad superior blanca y mitad inferior roja, llama en negro: sustancia susceptible de combustión espontánea, división 4.2.", ref: "Apéndice 1, Figura 1.10" },
    ],
  },
  {
    id: "criterio",
    titulo: "Del artículo a la etiqueta",
    descripcion: "Se enuncia el criterio del RAC 175 y eliges la etiqueta que le corresponde entre cuatro. Ocho rondas.",
    rondas: [
      { enunciado: "Sustancia que por reacción con el agua puede inflamarse espontáneamente o despedir gases inflamables en cantidades peligrosas.", opciones: [img("4-1"), img("4-2"), img("4-3"), img("3")], correcta: 2, explicacion: "División 4.3, «peligroso mojado»: fondo azul. Con esas no se echa agua.", ref: "175.1010 (a) (4)" },
      { enunciado: "Sin ser de por sí necesariamente combustible, puede, liberando oxígeno, causar o facilitar la combustión de otras sustancias.", opciones: [img("5-2"), img("5-1"), img("3"), img("2-1")], correcta: 1, explicacion: "División 5.1, comburente: llama sobre un círculo, fondo amarillo. No arde ella: hace arder a las demás.", ref: "175.1010 (a) (5)" },
      { enunciado: "Líquidos que despiden vapores inflamables a temperaturas que no exceden de 60,5 °C en crisol cerrado.", opciones: [img("4-1"), img("2-1"), img("3"), img("5-2")], correcta: 2, explicacion: "Clase 3, líquidos inflamables: llama sobre fondo rojo. El punto de inflamación es el criterio.", ref: "175.1010 (a) (3)" },
      { enunciado: "Gases no inflamables, no tóxicos.", opciones: [img("2-1"), img("2-2"), img("2-3"), img("9")], correcta: 1, explicacion: "División 2.2: fondo verde. Es la única de las tres de gases que no lleva llama ni calavera.", ref: "Tabla E.2" },
      { enunciado: "Puede calentarse espontáneamente en las condiciones normales de transporte o al entrar en contacto con el aire, y entonces inflamarse.", opciones: [img("4-3"), img("4-1"), img("4-2"), img("5-1")], correcta: 2, explicacion: "División 4.2: mitad superior blanca, mitad inferior roja.", ref: "175.1010 (a) (4)" },
      { enunciado: "Se sabe o se cree fundadamente que contiene agentes patógenos que pueden causar enfermedades en los humanos o los animales.", opciones: [img("6-1"), img("6-2"), img("8"), img("9")], correcta: 1, explicacion: "División 6.2, infecciosa: tres medias lunas sobre un círculo y la inscripción de aviso a las autoridades sanitarias.", ref: "175.1010 (a) (6)" },
      { enunciado: "Por su acción química causa lesiones graves al entrar en contacto con tejidos vivos, o daña de consideración otras mercancías o el medio de transporte.", opciones: [img("6-1"), img("9"), img("8"), img("4-2")], correcta: 2, explicacion: "Clase 8, corrosivas. Doble criterio: tejidos vivos y carga o aeronave.", ref: "175.1010 (a) (8)" },
      { enunciado: "Presenta durante el transporte un riesgo distinto de los correspondientes a las demás clases: hielo seco, baterías de litio, material magnetizado.", opciones: [img("8"), img("2-2"), img("4-1"), img("9")], correcta: 3, explicacion: "Clase 9, mercancías peligrosas varias: siete franjas negras. La clase donde más aparecen artículos que parecen inocuos.", ref: "175.1010 (a) (9)" },
    ],
  },
  {
    id: "trampas",
    titulo: "Las trampas",
    descripcion: "Etiquetas que se confunden, lado a lado. Señala cuál es cuál. Cinco rondas.",
    rondas: [
      { enunciado: "¿Cuál es la 4.2, combustión espontánea?", opciones: [img("4-1"), img("4-2"), img("4-3")], correcta: 1, explicacion: "La 4.1 es blanca con siete franjas rojas; la 4.2, blanca arriba y roja abajo; la 4.3, azul.", ref: "Apéndice 1, Figuras 1.9 a 1.11" },
      { enunciado: "¿Cuál es la 6.2, sustancia infecciosa?", opciones: [img("6-1"), img("6-2")], correcta: 1, explicacion: "La 6.1 lleva calavera y tibias; la 6.2, tres medias lunas sobre un círculo y la inscripción de aviso a las autoridades sanitarias.", ref: "Apéndice 1, Figuras 1.14 y 1.15" },
      { enunciado: "¿Cuál es la 2.3, gas tóxico?", opciones: [img("2-2"), img("2-3")], correcta: 1, explicacion: "La 2.2 es verde con la botella; la 2.3 es blanca con calavera y tibias, como la 6.1 pero con el «2».", ref: "Apéndice 1, Figuras 1.6 y 1.7" },
      { enunciado: "¿Cuál es la 5.2, peróxido orgánico?", opciones: [img("5-1"), img("5-2")], correcta: 1, explicacion: "La 5.1 es toda amarilla; la 5.2 va roja arriba y amarilla abajo. Es la trampa de la clase 5.", ref: "Apéndice 1, Figuras 1.12 y 1.13" },
      { enunciado: "Material radiactivo: ¿cuántas franjas rojas verticales lleva la etiqueta de Categoría III-Amarilla?", opciones: [{ texto: "Una" }, { texto: "Dos" }, { texto: "Tres" }], correcta: 2, explicacion: "Una franja la I-Blanca, dos la II-Amarilla y tres la III-Amarilla. Las dos amarillas llevan además el índice de transporte.", ref: "Apéndice 1, Figuras 1.16, 6.17 y 6.18" },
    ],
  },
  {
    id: "familia",
    titulo: "Riesgo o manipulación",
    descripcion: "Doce etiquetas mezcladas. Dices si cada una dice qué es (riesgo) o cómo se trata (manipulación). Doce rondas.",
    rondas: [
      { enunciado: "Corrosivo", imagen: "8", opciones: [{ texto: "De riesgo" }, { texto: "De manipulación" }], correcta: 0, explicacion: "Dice qué es: corrosivo, clase 8. Etiqueta de riesgo (175.436 (a)).", ref: "175.436" },
      { enunciado: "«Exclusivamente en aeronaves de carga»", opciones: [{ texto: "De riesgo" }, { texto: "De manipulación" }], correcta: 1, explicacion: "Dice cómo se trata el bulto: no va en avión con pasajeros. Manipulación (175.436 (b)).", ref: "Apéndice 1, Figura 1.23" },
      { enunciado: "Material magnetizado", opciones: [{ texto: "De riesgo" }, { texto: "De manipulación" }], correcta: 1, explicacion: "Azul sobre blanco, 110 × 90 mm. Es de manipulación: indica cómo estibarlo, lejos de lo que perturbe.", ref: "Apéndice 1, Figura 1.22" },
      { enunciado: "Gas tóxico", imagen: "2-3", opciones: [{ texto: "De riesgo" }, { texto: "De manipulación" }], correcta: 0, explicacion: "Dice qué es: gas tóxico, división 2.3. Riesgo.", ref: "Apéndice 1, Figura 1.7" },
      { enunciado: "Posición del bulto (flechas)", opciones: [{ texto: "De riesgo" }, { texto: "De manipulación" }], correcta: 1, explicacion: "Rojo o negro sobre fondo contrastado, 74 × 105 mm. Dice hacia dónde va arriba: manipulación.", ref: "Apéndice 1, Figura 1.24" },
      { enunciado: "Peligroso mojado", imagen: "4-3", opciones: [{ texto: "De riesgo" }, { texto: "De manipulación" }], correcta: 0, explicacion: "Dice qué es: división 4.3. Riesgo.", ref: "Apéndice 1, Figura 1.11" },
      { enunciado: "Líquidos criogénicos", opciones: [{ texto: "De riesgo" }, { texto: "De manipulación" }], correcta: 1, explicacion: "Símbolo blanco sobre verde, 74 × 105 mm, obligatoria al manipular líquidos criogénicos. Manipulación.", ref: "Apéndice 1, Figura 1.26" },
      { enunciado: "Comburente", imagen: "5-1", opciones: [{ texto: "De riesgo" }, { texto: "De manipulación" }], correcta: 0, explicacion: "Dice qué es: comburente, división 5.1. Riesgo.", ref: "Apéndice 1, Figura 1.12" },
      { enunciado: "«Manténgase alejado del calor»", opciones: [{ texto: "De riesgo" }, { texto: "De manipulación" }], correcta: 1, explicacion: "Dice cómo se trata: lejos del calor. Manipulación. La usan la 4.1 de reacción espontánea y la 5.2.", ref: "Apéndice 1, Figura 1.27" },
      { enunciado: "Sustancia infecciosa", imagen: "6-2", opciones: [{ texto: "De riesgo" }, { texto: "De manipulación" }], correcta: 0, explicacion: "Dice qué es: infecciosa, división 6.2. Riesgo.", ref: "Apéndice 1, Figura 1.15" },
      { enunciado: "Etiqueta de baterías de litio", opciones: [{ texto: "De riesgo" }, { texto: "De manipulación" }], correcta: 1, explicacion: "El Apéndice 1 la incluye como etiqueta de manipulación (Figura 1.29). El rombo de clase 9 es el de riesgo; esta dice cómo tratar el bulto.", ref: "Apéndice 1, Figura 1.29" },
      { enunciado: "Mercancías peligrosas varias", imagen: "9", opciones: [{ texto: "De riesgo" }, { texto: "De manipulación" }], correcta: 0, explicacion: "Dice qué es: clase 9. Riesgo.", ref: "Apéndice 1, Figura 1.21" },
    ],
  },
]

// ─── Clasifica ───────────────────────────────────────────────────────────────

export interface CasoMP {
  id: string
  /** La situación, tal como llegaría. */
  texto: string
  /** Clase correcta, "1" a "9". */
  clase: string
  /** División, si la hay. */
  division?: string
  /** Si le aplica grupo de embalaje. */
  ge: boolean
  /** La respuesta en una línea, lo que habría que decir. */
  respuesta: string
  /** Por qué, y qué es lo que se suele fallar. */
  explicacion: string
  /** Nota de embalaje o transporte, cuando aporta. Con su aviso si sale de las Instrucciones. */
  embalaje?: string
}

export const CASOS: CasoMP[] = [
  {
    id: "c1",
    texto: "Un envío de pintura para mantenimiento, en latas metálicas de 5 litros. En la guía figura como «Paint».",
    clase: "3",
    ge: true,
    respuesta: "Clase 3, líquido inflamable, con grupo de embalaje.",
    explicacion:
      "La pintura tiene disolventes con punto de inflamación por debajo de 60,5 °C en crisol cerrado, así que es líquido inflamable. Lo que la clasifica es esa propiedad, no que se llame pintura: el RAC la cita como ejemplo de la clase 3 (175.1010 (a) (3)).",
    embalaje: "UN 1263 es su número ONU y suele ir con grupo de embalaje II o III según el punto de inflamación (Tabla 3-1, verificar edición).",
  },
  {
    id: "c2",
    texto: "Un palé con baterías de ion litio que viajan solas, como carga, en un vuelo que lleva pasajeros.",
    clase: "9",
    ge: false,
    respuesta: "Clase 9, sin grupo de embalaje. Y en ese vuelo no viaja.",
    explicacion:
      "Es el caso que más se falla: las baterías de litio no son clase 3 ni clase 8, son clase 9 y no llevan grupo de embalaje (175.426 (a)). Lo que gobierna su transporte es la instrucción de embalaje y el estado de carga. Como carga suelta están prohibidas en aeronave de pasajeros desde 2016.",
    embalaje: "UN 3480, solo aeronave de carga y con estado de carga no mayor al 30 % (Instrucciones Técnicas, verificar edición vigente).",
  },
  {
    id: "c3",
    texto: "Una caja con hielo seco usada para mantener frías unas muestras médicas durante el vuelo.",
    clase: "9",
    ge: false,
    respuesta: "Clase 9, sin grupo de embalaje.",
    explicacion:
      "El hielo seco es dióxido de carbono sólido: no arde ni es tóxico, pero sublima y desplaza el oxígeno en un espacio cerrado. Ese riesgo no encaja en ninguna de las otras ocho clases, y el RAC lo nombra como ejemplo de la 9 (175.1010 (a) (9)).",
    embalaje: "UN 1845. El embalaje tiene que dejar salir el gas: cerrarlo hermético es el error.",
  },
  {
    id: "c4",
    texto: "Un envío de sodio metálico para un laboratorio. Se declara en recipientes sellados bajo aceite mineral.",
    clase: "4",
    division: "4.3",
    ge: true,
    respuesta: "Clase 4, división 4.3, con grupo de embalaje.",
    explicacion:
      "Es un sólido inflamable, pero lo que importa es la división: la 4.3 desprende gas inflamable en contacto con el agua (175.1010 (a) (4)). Si hay un incidente, echar agua empeora las cosas: la división no es un detalle administrativo, es el dato que cambia la respuesta.",
    embalaje: "Va bajo aceite justamente para aislarlo de la humedad del aire.",
  },
  {
    id: "c5",
    texto: "Cuarenta cajas de desodorante en aerosol para una cadena de tiendas.",
    clase: "2",
    ge: false,
    respuesta: "Clase 2, gases: los aerosoles están en la definición. Sin grupo de embalaje.",
    explicacion:
      "El 175.1010 (a) (2) nombra los aerosoles expresamente entre los gases. La división depende del propelente: 2.1 si es inflamable, 2.2 si no. Los gases no llevan grupo de embalaje (175.426 (a)).",
    embalaje: "UN 1950, aerosoles. Con propelente inflamable, división 2.1.",
  },
  {
    id: "c6",
    texto: "Seis extintores de incendio con dióxido de carbono, repuestos para un hangar.",
    clase: "2",
    division: "2.2",
    ge: false,
    respuesta: "Clase 2, división 2.2, sin grupo de embalaje.",
    explicacion:
      "Un extintor es un objeto cargado con gas comprimido (175.1010 (a) (2)). El CO₂ no es inflamable ni tóxico: división 2.2. Lo que empuja es la presión.",
    embalaje: "UN 1044, extintores.",
  },
  {
    id: "c7",
    texto: "Sacos de nitrato de amonio para uso agrícola, sin otras sustancias mezcladas.",
    clase: "5",
    division: "5.1",
    ge: true,
    respuesta: "Clase 5, división 5.1, comburente, con grupo de embalaje.",
    explicacion:
      "No arde por sí solo, pero libera oxígeno y facilita la combustión de lo que tenga al lado (175.1010 (a) (5)). Por eso se segrega de los inflamables (175.525). La 5.1 sí lleva grupo de embalaje; la 5.2 no.",
    embalaje: "UN 2067 para el fertilizante a base de nitrato de amonio.",
  },
  {
    id: "c8",
    texto: "Muestras de un laboratorio clínico que, según el remitente, «probablemente contienen un virus» y van a un centro de diagnóstico.",
    clase: "6",
    division: "6.2",
    ge: false,
    respuesta: "Clase 6, división 6.2, sustancia infecciosa, sin grupo de embalaje.",
    explicacion:
      "«Se sabe o se cree fundadamente que contienen agentes patógenos» es la definición de la 6.2 (175.1010 (a) (6)). La 6.2 no lleva grupo de embalaje (175.426 (a)). Y ojo con el hielo seco que suele acompañarlas: es clase 9 y va aparte.",
    embalaje: "Las de riesgo menor van como UN 3373, sustancia biológica Categoría B (Instrucciones Técnicas, verificar).",
  },
  {
    id: "c9",
    texto: "Garrafas de ácido sulfúrico para el mantenimiento de baterías, en un envío industrial.",
    clase: "8",
    ge: true,
    respuesta: "Clase 8, corrosiva, con grupo de embalaje.",
    explicacion:
      "Causa lesiones graves a los tejidos vivos y, si se escapa, daña otras mercancías y el propio avión (175.1010 (a) (8)). Doble criterio, doble razón para el embalaje homologado y la segregación.",
    embalaje: "UN 1830, ácido sulfúrico, grupo de embalaje II.",
  },
  {
    id: "c10",
    texto: "Un motor de combustión interna, drenado, que viaja como repuesto para un generador.",
    clase: "9",
    ge: false,
    respuesta: "Clase 9: el RAC lo nombra como ejemplo de objeto de esa clase.",
    explicacion:
      "El 175.1010 (a) (9) cita los motores de combustión interna entre los objetos de la clase 9. Aunque vaya drenado puede conservar residuos de combustible, batería o aceite, y por eso sigue siendo mercancía peligrosa y no «repuestos».",
    embalaje: "Ediciones posteriores de las Instrucciones Técnicas reclasifican los motores según el combustible que usan: verifica la edición vigente antes de citar el UN.",
  },
]

// ─── Escenarios ──────────────────────────────────────────────────────────────

export interface EscenarioMP {
  id: string
  titulo: string
  situacion: string
  /** Lo que el piloto tiene que decidir, en preguntas. */
  preguntas: string[]
  /** La respuesta modelo, con sus artículos. */
  modelo: string
  puntos: string[]
}

export const ESCENARIOS: EscenarioMP[] = [
  {
    id: "puerta",
    titulo: "El power bank en la maleta que baja a bodega",
    situacion:
      "Embarque de un vuelo lleno. La auxiliar te avisa que van a bajar a bodega diez maletas de mano por falta de espacio. Un pasajero se niega a sacar nada de la suya: dice que solo lleva ropa, el portátil y un power bank.",
    preguntas: ["¿Qué puede ir en esa maleta a bodega y qué no?", "¿Qué le dices al pasajero y con qué respaldo?", "¿Qué pasa si la maleta baja como está?"],
    modelo:
      "El power bank es una batería de repuesto: va solo en cabina, con los terminales protegidos, nunca en bodega. El portátil puede bajar si va apagado y protegido contra activación accidental. Eso es la Tabla 8-1 de las Instrucciones Técnicas, a la que remite el 175.715, y el procedimiento del explotador; no es una opinión de la tripulación. Si el pasajero no lo acepta, la maleta no baja: el 175.220 (c) prohíbe al explotador permitir mercancías peligrosas en el equipaje salvo lo que las Instrucciones autorizan. Si baja como está y se descubre después, es una mercancía no permitida en el equipaje y se notifica (175.625 (c)).",
    puntos: ["Power bank = repuesto = solo cabina, terminales protegidos", "Portátil a bodega apagado y protegido", "Respaldo: Tabla 8-1 (175.715) y procedimiento del explotador", "Si no acepta, la maleta no baja (175.220 (c))", "Si baja y se descubre: notificación (175.625 (c))"],
  },
  {
    id: "grupo",
    titulo: "El grupo de embalaje que no coincide",
    situacion:
      "Briefing. El NOTOC muestra UN 1263, pintura, clase 3, grupo de embalaje II, dos bultos en la bodega trasera. La declaración del expedidor que te muestran dice grupo de embalaje III para el mismo envío.",
    preguntas: ["¿Firmas el NOTOC?", "¿Por qué importa una diferencia entre II y III?", "¿Qué tiene que pasar para que el envío salga?"],
    modelo:
      "No se firma con una discrepancia abierta. El grupo de embalaje gradúa el peligro dentro de la clase (175.426 (a)) y fija qué embalaje exige y cuánta cantidad admite por bulto: un II no es un III. La información al piloto al mando se firma antes de que las mercancías se transporten (175.515 (a) (1)) y firmar es dejar constancia de que sabes qué llevas. El envío sale cuando el explotador aclara con la declaración cuál es el dato correcto y corrige el documento que esté mal; si no se puede aclarar, no sale. Si el envío ya voló con información incorrecta, se notifica (175.625 (d)).",
    puntos: ["No se firma con discrepancia", "El grupo cambia embalaje y cantidad admitida (175.426)", "La firma es previa al transporte (175.515 (a) (1))", "Se aclara con la declaración del expedidor o no sale", "Voló mal: notificación (175.625 (d))"],
  },
  {
    id: "cao",
    titulo: "Un bulto CAO en un vuelo de pasajeros",
    situacion:
      "Vuelo de pasajeros. En el NOTOC aparece un envío con la marca «Cargo Aircraft Only». El agente dice que va bien estibado en la bodega delantera, lejos de la cabina, y que el expedidor autorizó por escrito.",
    preguntas: ["¿Sale ese bulto?", "¿Cambia algo la posición o la autorización del expedidor?", "¿Qué tienes que asegurarte tú?"],
    modelo:
      "No sale. Los bultos con la etiqueta «Exclusivamente en aeronaves de carga» no se estiban en una aeronave ocupada por pasajeros (Capítulo F, Carga y estiba, (c)). La posición no lo arregla y el expedidor no puede autorizar lo que la norma prohíbe. Comprobar que ningún CAO va en un vuelo con pasajeros es parte de lo que revisas antes de firmar la información al piloto al mando (175.515). Si aparece, el envío se baja y queda registrado por qué.",
    puntos: ["CAO nunca en aeronave con pasajeros (Cap. F (c))", "Ni la posición ni el expedidor lo habilitan", "Es una comprobación previa a la firma del NOTOC", "El envío se baja"],
  },
  {
    id: "humo",
    titulo: "Humo en cabina con un corrosivo en la bodega",
    situacion:
      "Crucero. Olor químico y humo tenue en el galley trasero. El NOTOC declara un envío de clase 8 en la bodega posterior y uno de 6.1 en la delantera.",
    preguntas: ["¿Qué hace primero la cabina de mando?", "¿Qué consultas y qué usas?", "¿A quién informas y cuándo?", "¿Qué queda después de aterrizar?"],
    modelo:
      "Primero se vuela: máscaras, oxígeno, control de la aeronave y del humo según el QRH. Después se identifica con el NOTOC, que está al alcance del comandante en vuelo (175.515 (a) (2)): un corrosivo en la bodega posterior, la más cercana al humo. Se consulta la información de respuesta de emergencia, que debe estar disponible de inmediato (175.620 (b) (1), Doc 9481), y la cabina de pasajeros usa el equipo de respuesta (bolsas, ligaduras, guantes largos de goma, 175.620 (d) (1)). Se declara la emergencia y se informa al ATS tan pronto la situación lo permita para que avise a la administración aeroportuaria (175.620 (e)); se desvía al aeródromo adecuado más cercano. Después, el explotador entrega la información a los servicios de emergencia (175.620 (f) y (g)) y se notifica el incidente (175.625 (a)).",
    puntos: ["Volar primero", "Identificar con el NOTOC (175.515 (a) (2))", "Doc 9481 y equipo de respuesta (175.620 (b) y (d))", "Declarar e informar al ATS tan pronto se pueda (175.620 (e))", "Desviar; después, información a servicios y notificación"],
  },
  {
    id: "comat",
    titulo: "Cajas de la compañía que no están en el NOTOC",
    situacion:
      "Veinte minutos antes de la salida ves en la bodega seis cajas marcadas «AOG PARTS – COMPANY MATERIAL» que no aparecen en el NOTOC ni en el manifiesto de mercancías peligrosas.",
    preguntas: ["¿Qué te dice esa marca?", "¿Qué preguntas antes de firmar?", "¿Firmas?"],
    modelo:
      "«Company material» es COMAT: propiedad del explotador que viaja en su propio provecho (175.001 (a) (10)). Si algo de eso está clasificado como mercancía peligrosa (un generador de oxígeno, una batería, un aerosol) es COMAT peligroso (175.001 (a) (11)) y sigue todas las reglas, incluida la información al piloto al mando. «Repuestos» es una descripción general que debe hacer dudar (175.610 (a) (1)). Antes de firmar se pregunta qué contienen y quién las aceptó: un envío con mercancías peligrosas necesita documento de transporte e inspección (175.514). No se firma hasta aclararlo; si el contenido no es peligroso y queda registrado, se firma; si lo es, entra al NOTOC o no sale. Es ValuJet contado desde tu asiento.",
    puntos: ["COMAT y COMAT peligroso (175.001 (a) (10) y (11))", "Descripción general = pregunta (175.610 (a))", "Aceptación exige documento e inspección (175.514)", "No se firma hasta aclarar", "Si es peligroso: al NOTOC o no sale"],
  },
  {
    id: "etiqueta",
    titulo: "La etiqueta que se despegó en la rampa",
    situacion:
      "Durante el walkaround ves en la plataforma un bulto para tu vuelo con la etiqueta de riesgo medio despegada y con el número UN legible. El agente dice que la pega y ya.",
    preguntas: ["¿Puede reponerla el explotador?", "¿Con qué condición?", "¿Y si no está claro cuál etiqueta va?"],
    modelo:
      "Sí puede: el explotador autorizado debe tener etiquetas de reposición para los casos de desprendimiento o deterioro (175.435 (b)) y las reemplaza conforme a los datos del documento de transporte (175.438 (e)). La condición es esa: que el documento diga cuál es. Si no se tiene la certeza de cuál etiqueta corresponde, no se transporta la mercancía (175.435 (b)). Tú no pegas etiquetas, pero no firmas por un bulto que nadie sabe qué es.",
    puntos: ["Reposición permitida (175.435 (b))", "Según el documento de transporte (175.438 (e))", "Sin certeza, no vuela", "La etiqueta es parte del acondicionamiento exigido (175.220 (b))"],
  },
  {
    id: "monomotor",
    titulo: "Combustible en un monomotor",
    situacion:
      "Operas un monomotor de carga en el Vichada. Te piden llevar tres canecas de gasolina de aviación para un aeródromo remoto, junto con otros repuestos.",
    preguntas: ["¿Puedes llevar la gasolina?", "¿Y los repuestos, si alguno es mercancía peligrosa de otra clase?", "¿De dónde sale esa regla?"],
    modelo:
      "La gasolina no: por razones de seguridad el RAC 175 prohíbe el transporte de mercancías peligrosas de la clase 3 combustibles en aeronaves monomotores, salvo lo que el 175.715 permite a pasajeros y tripulantes (175.115 (b)). Otras clases en monomotor requieren aprobación de la UAEAC, que verifica las condiciones de seguridad del explotador y determina los aeródromos donde no aprueba esa operación (175.115 (c)). Es una limitación propia del RAC 175, no del Anexo 18: por eso no aparece en los cursos genéricos.",
    puntos: ["Clase 3 combustibles prohibida en monomotor (175.115 (b))", "Otras clases: aprobación de la UAEAC (175.115 (c))", "La UAEAC puede excluir aeródromos", "Es una regla colombiana, no del Anexo 18"],
  },
  {
    id: "silla",
    titulo: "La silla de ruedas con batería de litio",
    situacion:
      "Un pasajero con movilidad reducida embarca con su silla de ruedas eléctrica. La silla lleva una batería de ion litio. El agente pregunta si la batería va instalada en la silla o la retiran.",
    preguntas: ["¿Es mercancía peligrosa?", "¿Dónde se resuelve qué hacer con la batería?", "¿Qué debe saber el comandante?"],
    modelo:
      "Sí: es una batería de ion litio, clase 9, sin grupo de embalaje. Las ayudas de movilidad con batería son una de las excepciones para pasajeros que las Instrucciones Técnicas regulan en la Tabla 8-1, con condiciones que dependen del tipo de batería y de si se retira o no (175.715): esas condiciones y los vatios-hora exactos hay que verificarlos en la edición vigente y en el procedimiento del explotador. Lo que el comandante debe saber es que se transporta y dónde va: para las ayudas de movilidad con batería de litio las Instrucciones exigen informar al piloto al mando, y la operación debe reflejarlo en el NOTOC o en el documento que use el explotador.",
    puntos: ["Batería de litio = clase 9, sin grupo de embalaje", "Excepción de pasajeros: Tabla 8-1 (175.715), verificar edición", "Condiciones según tipo de batería y si se retira", "El comandante debe saber que va y dónde"],
  },
  {
    id: "averia",
    titulo: "Un bulto llegó mojado",
    situacion:
      "Turnaround en destino. El agente de rampa te comenta que uno de los bultos de mercancías peligrosas «venía mojado por fuera» y que ya lo bajaron.",
    preguntas: ["¿Qué tiene que hacer el explotador además de bajarlo?", "¿Qué preguntas tú?", "¿Es un suceso?"],
    modelo:
      "Un bulto con averías o pérdidas se descarga, y el explotador se asegura de que el resto del envío esté en condiciones y de que ningún otro bulto quedó contaminado (175.615 (b)); toda contaminación peligrosa en la aeronave se elimina sin demora (175.615 (c)). Al descargar, si hay pérdidas se inspecciona la zona donde iba estibado para ver si hubo daño (Capítulo F, (h)). Lo que preguntas es qué era y qué había al lado: un corrosivo mojando otra carga es otro problema. Es un incidente imputable a mercancías peligrosas, porque hubo una manifestación de que se vulneró la integridad de un embalaje (175.001 (a) (25)), y se notifica (175.625 (a)).",
    puntos: ["Descargar y revisar el resto del envío (175.615 (b))", "Inspeccionar la zona de estiba (Cap. F (h))", "Eliminar la contaminación (175.615 (c))", "Qué era y qué tenía al lado", "Incidente imputable: se notifica (175.625 (a))"],
  },
  {
    id: "dispensa",
    titulo: "Animales vivos infectados para un laboratorio",
    situacion:
      "Un instituto de investigación quiere enviar por tu aerolínea animales vivos infectados para un estudio. Tu jefe de operaciones te pregunta qué papel necesitan.",
    preguntas: ["¿En qué nivel de permiso caen?", "¿Aprobación o dispensa?", "¿Quién la pide y quién la da?"],
    modelo:
      "Los animales vivos infectados están nombrados expresamente entre las mercancías prohibidas salvo dispensa (175.112 (a) (2)). No es un caso de aprobación: la aprobación solo existe cuando las Instrucciones Técnicas dicen que ese caso puede transportarse con aprobación (175.001 (a) (4)); si no hay esa referencia, lo que procede es la dispensa (nota del 175.001 (a) (4)). La dispensa la otorga la Secretaría de Seguridad Aérea de la UAEAC (175.001 (a) (13)), la solicita el explotador (obligaciones del explotador de servicios aéreos, numeral 9) y procede por extrema urgencia, cuando otro modo no es apropiado o por interés público, con un nivel de seguridad equivalente y nunca para lo prohibido en todas las circunstancias (175.020 (g)).",
    puntos: ["Prohibido salvo dispensa (175.112 (a) (2))", "Aprobación solo si las Instrucciones la prevén", "Dispensa: Secretaría de Seguridad Aérea (175.001 (a) (13))", "La pide el explotador", "Nunca para lo prohibido en todos los casos (175.020 (g))"],
  },
]

// ─── Entrevista ──────────────────────────────────────────────────────────────

export interface PreguntaEntrevista {
  n: number
  pregunta: string
  respuesta: string
  /** Qué está midiendo el entrevistador con esa pregunta. */
  evaluan: string
}

export const ENTREVISTA: PreguntaEntrevista[] = [
  { n: 1, pregunta: "¿Qué es una mercancía peligrosa?", respuesta: "Todo objeto o sustancia que pueda constituir un riesgo para la salud, la seguridad, los bienes o el medio ambiente y que figure en la lista de las Instrucciones Técnicas o esté clasificado conforme a ellas (175.001 (a) (31)). Dos mitades: riesgo y estar en la lista o ser clasificable.", evaluan: "Que la definición no sea «cosas que explotan»: que sepas que hay lista y criterios." },
  { n: 2, pregunta: "¿Cuál es el marco normativo en Colombia?", respuesta: "Anexo 18 de la OACI, las Instrucciones Técnicas (Doc 9284), el LAR 175 del SRVSOP y el RAC 175, adoptado por la Resolución 00478 de 2016, que deroga el RAC 10. El RAC fija el qué y las Instrucciones el cómo.", evaluan: "Que conozcas la jerarquía y que el RAC 175 remite a las Instrucciones." },
  { n: 3, pregunta: "¿Cuántas clases hay y cómo se asigna una?", respuesta: "Nueve. Una sola por mercancía, según el peligro o el más importante de los peligros que represente (175.1010 (a)). El resto es riesgo secundario y se ve en el etiquetado.", evaluan: "Que sepas que es una clase, no varias, y qué es el riesgo secundario." },
  { n: 4, pregunta: "¿Cuál es la diferencia entre clase y división?", respuesta: "La clase es el riesgo principal, del 1 al 9; la división es el subtipo dentro de la clase, con punto: 2.1 es un gas inflamable dentro de la clase 2. La división cambia la respuesta en emergencia: 4.3 y agua, por ejemplo.", evaluan: "Que no digas «clase 2.1»." },
  { n: 5, pregunta: "¿En qué clase están las baterías de litio y qué grupo de embalaje llevan?", respuesta: "Clase 9, y no llevan grupo de embalaje. Lo que gobierna su transporte es la instrucción de embalaje y el estado de carga. Casi todo el mundo las ubica en la 3 o en la 8.", evaluan: "La pregunta que más se falla. Que no dudes." },
  { n: 6, pregunta: "¿Qué es el grupo de embalaje?", respuesta: "El grado de peligro dentro de la clase: I gran peligro, II intermedio, III escaso (175.426 (a)). Va en romanos. No aplica a las clases 1, 2 y 7, ni a la 5.2, la 6.2 ni las sustancias de reacción espontánea de la 4.1.", evaluan: "Que sepas que no todas las clases lo llevan." },
  { n: 7, pregunta: "¿Qué diferencia una etiqueta de riesgo de una de manipulación?", respuesta: "La de riesgo dice qué es (se requiere para la mayoría de las mercancías de todas las clases); la de manipulación dice cómo se trata el bulto (se requiere para algunas): CAO, posición, magnetizado, criogénicos, litio (175.436).", evaluan: "Que distingas el rombo de la señal de manipulación." },
  { n: 8, pregunta: "¿Qué se hace con un bulto cuya etiqueta se despegó?", respuesta: "El explotador la repone conforme al documento de transporte (175.438 (e)); si no hay certeza de cuál corresponde, no se transporta la mercancía (175.435 (b)).", evaluan: "Que digas las dos mitades: se repone, y sin certeza no vuela." },
  { n: 9, pregunta: "¿Cuáles son los niveles de permiso para transportar una mercancía peligrosa?", respuesta: "Prohibido en todos los casos (175.114); prohibido salvo dispensa (175.112); permitido con aprobación cuando las Instrucciones lo prevén (175.020 (f)); permitido cumpliendo las Instrucciones (175.011). Antes de todo, el criterio material del 175.110 (a): lo que explota, arde o emite vapores peligrosos en condiciones normales no vuela.", evaluan: "Que conozcas la escala y que la lista no es exhaustiva." },
  { n: 10, pregunta: "¿Qué diferencia hay entre aprobación, dispensa y excepción?", respuesta: "La aprobación la da la UAEAC cuando las Instrucciones Técnicas prevén que ese caso puede ir con aprobación (175.001 (a) (4)); la dispensa la da la Secretaría de Seguridad Aérea y exime de lo previsto en las Instrucciones cuando no hay esa referencia (175.001 (a) (13)); la excepción no se pide: ya está escrita en la norma (175.001 (a) (20)).", evaluan: "Que separes tres palabras que casi todos mezclan." },
  { n: 11, pregunta: "¿Qué limitaciones propias tiene Colombia?", respuesta: "Aviación civil privada: nada (175.115 (a)). Monomotores: nada de clase 3 combustibles, y las demás clases con aprobación de la UAEAC (175.115 (b) y (c)). Correo: solo muestras de pacientes, infecciosas con hielo seco y declaración, y radiactivo de muy baja actividad (175.125 (f)). Radiactivo: autorización del Servicio Geológico Colombiano (175.536).", evaluan: "Que sepas lo que un curso genérico no enseña." },
  { n: 12, pregunta: "¿Qué puede llevar un pasajero y dónde está escrito?", respuesta: "La regla es prohibición general (175.151); la única excepción es la Tabla 8-1 de las Instrucciones Técnicas, cumpliendo todos sus requisitos (175.715). Los tripulantes tienen la misma regla. Repuestos y power banks solo en cabina; las cifras exactas, en la edición vigente.", evaluan: "Que no cites cifras de memoria como si fueran norma: que sepas dónde están." },
  { n: 13, pregunta: "¿Qué es una mercancía peligrosa oculta?", respuesta: "Carga declarada con descripción general que debió declararse como peligrosa, o mercancía prohibida o en exceso en el equipaje, en la persona o en el correo (175.001 (a) (32)). «Repuestos», «muestras», «material de la compañía» son las descripciones que deben hacer dudar.", evaluan: "Que conectes la definición con ValuJet." },
  { n: 14, pregunta: "¿Qué condiciones exige el reglamento para aceptar mercancías peligrosas?", respuesta: "Documento de transporte debidamente diligenciado e inspección del bulto conforme a las Instrucciones, con lista de verificación (175.510, 175.512 y 175.514). Y el explotador necesita la autorización en sus OpSpecs (175.020 (a)).", evaluan: "Que sepas que la aceptación tiene dos condiciones acumulativas." },
  { n: 15, pregunta: "¿Qué prohibiciones de estiba debe conocer el comandante?", respuesta: "Nada de mercancías peligrosas en la cabina de pasajeros ni en el puesto de pilotaje; ningún bulto «Exclusivamente en aeronaves de carga» en un avión con pasajeros; y en carguero, esos bultos donde un tripulante pueda verlos, manipularlos y separarlos en vuelo (Capítulo F, Carga y estiba, (b) a (e)).", evaluan: "Las tres. Y la razón: South African 295." },
  { n: 16, pregunta: "¿Qué es la segregación y de dónde sale?", respuesta: "Que los bultos capaces de reaccionar peligrosamente entre sí no se estiben juntos ni donde puedan entrar en contacto si hay pérdidas (175.525 (a)). Se aplica la Tabla 7-1 de las Instrucciones y la 7-2 para explosivos (175.530). El radiactivo va separado de personas, animales vivos y películas no reveladas.", evaluan: "Que sepas que existe una tabla y que el criterio es «si hay pérdidas»." },
  { n: 17, pregunta: "¿Qué es el NOTOC y qué exige el RAC 175 sobre él?", respuesta: "La información escrita al piloto al mando sobre las mercancías peligrosas a bordo. Por escrito, lo antes posible antes de la salida, firmada por el comandante antes de que se transporten, al alcance durante el vuelo, a disposición de los aeródromos de última salida y próxima llegada, con copia en tierra, y en inglés en transporte internacional (175.515).", evaluan: "Los siete requisitos. Es la pregunta central." },
  { n: 18, pregunta: "¿Cuándo firma el comandante el NOTOC?", respuesta: "Antes de que las mercancías sean transportadas (175.515 (a) (1)). No en crucero, no al llegar.", evaluan: "Que no dudes en el momento." },
  { n: 19, pregunta: "¿Qué revisas antes de firmar?", respuesta: "Que estén el NOTOC y la declaración del expedidor; que ningún CAO vaya en un vuelo con pasajeros y nada en cabina; que el UN, la designación, la clase, el grupo de embalaje y la cantidad coincidan entre la declaración, el NOTOC y la lista; y dónde va cada bulto y qué tiene al lado. Si no cuadra, no se firma.", evaluan: "Que la firma sea una verificación y no un recibido." },
  { n: 20, pregunta: "¿Qué exige el reglamento que exista antes de una emergencia con mercancías peligrosas?", respuesta: "Información de respuesta disponible de inmediato para el piloto al mando (Doc 9481), tripulación al corriente de las medidas, y el equipo de respuesta a bordo con instrucción para usarlo (175.620 (b) y (d)).", evaluan: "Que separes lo que es información de lo que es equipo." },
  { n: 21, pregunta: "¿Cuál es el contenido mínimo del equipo de respuesta de emergencia?", respuesta: "Bolsas grandes de polietileno de buena calidad, ligaduras para las bolsas y guantes largos de goma (175.620 (d) (1)). Es de contención, no de extinción.", evaluan: "Dato de examen, literal." },
  { n: 22, pregunta: "Hay humo en cabina y sospechas de la carga. ¿Qué haces?", respuesta: "Volar primero: control, oxígeno, humo según el QRH. Identificar con el NOTOC, que está al alcance en vuelo. Contener con el QRH y el equipo. Declarar e informar al ATS tan pronto la situación lo permita, para que avise a la administración aeroportuaria (175.620 (e)). Desviar al aeródromo adecuado más cercano. Después, informar a los servicios de emergencia y notificar.", evaluan: "El orden de las decisiones y que el aviso al ATS no es opcional." },
  { n: 23, pregunta: "¿Qué se notifica y a quién?", respuesta: "Accidentes e incidentes; mercancías no declaradas o mal declaradas en carga o correo; no permitidas en equipaje o en la persona; y lo transportado mal cargado, segregado o sin información al piloto al mando (175.625). En Colombia, a la UAEAC. Descubrir una oculta ya es un suceso (175.001 (a) (41)).", evaluan: "Que sepas que se notifica aunque no haya pasado nada." },
  { n: 24, pregunta: "¿Qué relación hay entre mercancías peligrosas y el SMS?", respuesta: "El manejo de mercancías peligrosas se cumple con los principios de la gestión de la seguridad operacional del RAC 22 y los programas se integran al SMS del explotador (175.028). La UAEAC recopila hasta los eventos que no son accidente ni incidente para procesos predictivos (175.632).", evaluan: "Que veas la notificación como dato del sistema, no como castigo." },
  { n: 25, pregunta: "¿Cada cuánto debe recibir instrucción un piloto en mercancías peligrosas?", respuesta: "Como mínimo cada 24 meses (175.310 (a)), verificada al contratar (175.310 (b)); el RAC 2 exige el curso dentro de los entrenamientos periódicos con frecuencia no mayor a dos años (2.2.1.1.6 (e)) y el RAC 61 lo pone entre los conocimientos del piloto comercial y del de línea aérea. La intensidad la fija la Tabla C.1 y la aprueba la UAEAC.", evaluan: "Que sepas que es un requisito reglamentario en tres partes de los RAC, no de la aerolínea." },
]

// ─── Totales y claves de progreso ────────────────────────────────────────────

/** Clave de progreso de cada ejercicio. Los casos conservan "c1"… por compatibilidad con lo guardado. */
export const claveEtiquetas = (id: string) => `etq-${id}`
export const claveCaso = (id: string) => id
export const claveEscenario = (id: string) => `esc-${id}`
export const claveEntrevista = (n: number) => `ent-${n}`

export const PRACTICA_TOTALES = {
  etiquetas: EJERCICIOS_ETIQUETAS.length,
  casos: CASOS.length,
  escenarios: ESCENARIOS.length,
  entrevista: ENTREVISTA.length,
}

export const PRACTICA_TOTAL =
  PRACTICA_TOTALES.etiquetas + PRACTICA_TOTALES.casos + PRACTICA_TOTALES.escenarios + PRACTICA_TOTALES.entrevista

// ─── Chequeo heredado ────────────────────────────────────────────────────────
// Las cinco preguntas del chequeo anterior siguen alimentando el simulacro de
// aerolínea (airlineMock.ts) hasta que el banco de la evaluación las reemplace.

export interface PreguntaMP {
  id: string
  texto: string
  /** Lección del módulo de la que sale, para poder volver a repasarla. */
  ref: string
  ops: string[]
  /** Índice de la correcta dentro de `ops`. */
  ok: number
  /** Por qué esa es la buena. */
  explica: string
}

export const PREGUNTAS: PreguntaMP[] = [
  {
    id: "p1",
    texto: "¿En qué clase están las baterías de litio?",
    ref: "08",
    ops: ["Clase 3, líquidos inflamables", "Clase 8, corrosivas", "Clase 9, mercancías varias"],
    ok: 2,
    explica: "Clase 9. Es la respuesta que más se falla en entrevista, casi siempre ubicándolas en la 3 o en la 8.",
  },
  {
    id: "p2",
    texto: "Un pasajero quiere llevar un power bank en su maleta facturada. ¿Puede?",
    ref: "11",
    ops: ["Sí, si va apagado y protegido", "No: las baterías de repuesto van solo en cabina", "Sí, si no pasa de 100 Wh"],
    ok: 1,
    explica: "No. Las baterías de repuesto y los power banks van únicamente en cabina, con los terminales protegidos contra cortocircuito.",
  },
  {
    id: "p3",
    texto: "¿Qué es el NOTOC?",
    ref: "14",
    ops: ["La declaración que firma el expedidor", "La información escrita al comandante sobre las mercancías peligrosas a bordo", "El listado de la IATA con todas las sustancias"],
    ok: 1,
    explica: "Es la información escrita al piloto al mando (175.515). La declaración del expedidor es otro documento, y es la fuente con la que se arma.",
  },
  {
    id: "p4",
    texto: "En el NOTOC de un vuelo con pasajeros aparece un bulto marcado «Cargo Aircraft Only». ¿Qué haces?",
    ref: "13",
    ops: ["Lo acepto si va estibado lejos de la cabina", "Lo acepto si el expedidor lo aprueba por escrito", "No sale: ese bulto no puede ir en una aeronave con pasajeros"],
    ok: 2,
    explica: "No sale. Un bulto de solo aeronaves de carga está prohibido en un vuelo con pasajeros (Capítulo F, Carga y estiba, (c)).",
  },
  {
    id: "p5",
    texto: "Hay humo en cabina y sospechas de la carga peligrosa. ¿Qué va primero?",
    ref: "15",
    ops: ["Informar al ATC qué mercancía llevas", "Volar la aeronave y gestionar el humo", "Consultar el NOTOC para identificar la sustancia"],
    ok: 1,
    explica: "Primero se vuela. Identificar con el NOTOC y avisar al ATS vienen enseguida, pero después (175.620 (e)).",
  },
]
