/**
 * Práctica del módulo Mercancías peligrosas: cuatro modos.
 *
 *   Etiquetas   → ejercicios visuales por rondas con los rombos: primero los
 *                 cuatro de conjunto, después uno por clase y los de
 *                 especificación, manipulación y marcas
 *   Clasifica   → un envío, el piloto decide clase y grupo de embalaje
 *   Escenarios  → situaciones operacionales que se resuelven conectando cada
 *                 elemento con lo que le corresponde, y después se comparan
 *                 con la respuesta modelo
 *   Entrevista  → lo que podrían preguntarte, con la respuesta modelo y qué
 *                 evalúan con cada pregunta
 *
 * Sin citas de artículo, como el resto del módulo: cada dato se comprobó
 * contra el LAR 175 y, cuando la regla es de ahí, contra las Instrucciones
 * Técnicas. Lo que solo existe en un reglamento nacional se dice como tal.
 * Los escenarios son
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
  "1": "Explosivos · clase 1",
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
  "7": "Material radiactivo · clase 7",
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
      { enunciado: "¿Qué clase o división es?", imagen: "3", opciones: [t("3"), t("4.1"), t("2.1"), t("5.1")], correcta: 0, explicacion: "Símbolo (llama) en negro o blanco sobre fondo rojo: líquido inflamable, clase 3." },
      { enunciado: "¿Qué clase o división es?", imagen: "2-2", opciones: [t("2.1"), t("2.2"), t("2.3"), t("9")], correcta: 1, explicacion: "Fondo verde: gas no inflamable, no tóxico, división 2.2." },
      { enunciado: "¿Qué clase o división es?", imagen: "4-3", opciones: [t("4.1"), t("2.1"), t("4.3"), t("4.2")], correcta: 2, explicacion: "Fondo azul: sustancia que en contacto con el agua emite gas inflamable, división 4.3." },
      { enunciado: "¿Qué clase o división es?", imagen: "5-1", opciones: [t("5.1"), t("5.2"), t("3"), t("2.1")], correcta: 0, explicacion: "Llama sobre un círculo, fondo amarillo, «5.1» en el ángulo inferior: comburente." },
      { enunciado: "¿Qué clase o división es?", imagen: "6-1", opciones: [t("6.2"), t("2.3"), t("6.1"), t("8")], correcta: 2, explicacion: "Calavera y tibias sobre fondo blanco con el «6» abajo: sustancia tóxica, división 6.1. La 2.3 lleva el mismo símbolo pero con el «2»." },
      { enunciado: "¿Qué clase o división es?", imagen: "8", opciones: [t("6.1"), t("8"), t("9"), t("4.2")], correcta: 1, explicacion: "Líquido goteando sobre una mano y una plancha, mitad superior blanca y mitad inferior negra: corrosivo, clase 8." },
      { enunciado: "¿Qué clase o división es?", imagen: "9", opciones: [t("4.1"), t("8"), t("6.2"), t("9")], correcta: 3, explicacion: "Siete franjas verticales negras en la mitad superior, fondo blanco: mercancías peligrosas varias, clase 9. Aquí van las baterías de litio y el hielo seco." },
      { enunciado: "¿Qué clase o división es?", imagen: "2-3", opciones: [t("6.1"), t("2.2"), t("2.3"), t("2.1")], correcta: 2, explicacion: "Calavera y tibias sobre fondo blanco con el «2» abajo: gas tóxico, división 2.3." },
      { enunciado: "¿Qué clase o división es?", imagen: "4-2", opciones: [t("4.3"), t("3"), t("4.1"), t("4.2")], correcta: 3, explicacion: "Mitad superior blanca y mitad inferior roja, llama en negro: sustancia susceptible de combustión espontánea, división 4.2." },
    ],
  },
  {
    id: "criterio",
    titulo: "Del criterio a la etiqueta",
    descripcion: "Se enuncia el criterio de las Instrucciones Técnicas y eliges la etiqueta que le corresponde entre cuatro. Ocho rondas.",
    rondas: [
      { enunciado: "Sustancia que por reacción con el agua puede inflamarse espontáneamente o despedir gases inflamables en cantidades peligrosas.", opciones: [img("4-3"), img("4-1"), img("4-2"), img("3")], correcta: 0, explicacion: "División 4.3, «peligroso mojado»: fondo azul. Con esas no se echa agua." },
      { enunciado: "Sin ser de por sí necesariamente combustible, puede, liberando oxígeno, causar o facilitar la combustión de otras sustancias.", opciones: [img("5-2"), img("3"), img("2-1"), img("5-1")], correcta: 3, explicacion: "División 5.1, comburente: llama sobre un círculo, fondo amarillo. No arde ella: hace arder a las demás." },
      { enunciado: "Líquidos que despiden vapores inflamables a temperaturas que no exceden de 60,5 °C en crisol cerrado.", opciones: [img("4-1"), img("3"), img("2-1"), img("5-2")], correcta: 1, explicacion: "Clase 3, líquidos inflamables: llama sobre fondo rojo. El punto de inflamación es el criterio." },
      { enunciado: "Gases no inflamables, no tóxicos.", opciones: [img("2-1"), img("2-3"), img("2-2"), img("9")], correcta: 2, explicacion: "División 2.2: fondo verde. Es la única de las tres de gases que no lleva llama ni calavera." },
      { enunciado: "Puede calentarse espontáneamente en las condiciones normales de transporte o al entrar en contacto con el aire, y entonces inflamarse.", opciones: [img("4-3"), img("4-1"), img("5-1"), img("4-2")], correcta: 3, explicacion: "División 4.2: mitad superior blanca, mitad inferior roja." },
      { enunciado: "Se sabe o se cree fundadamente que contiene agentes patógenos que pueden causar enfermedades en los humanos o los animales.", opciones: [img("6-1"), img("8"), img("6-2"), img("9")], correcta: 2, explicacion: "División 6.2, infecciosa: tres medias lunas sobre un círculo y la inscripción de aviso a las autoridades sanitarias." },
      { enunciado: "Por su acción química causa lesiones graves al entrar en contacto con tejidos vivos, o daña de consideración otras mercancías o el medio de transporte.", opciones: [img("8"), img("6-1"), img("9"), img("4-2")], correcta: 0, explicacion: "Clase 8, corrosivas. Doble criterio: tejidos vivos y carga o aeronave." },
      { enunciado: "Presenta durante el transporte un riesgo distinto de los correspondientes a las demás clases: hielo seco, baterías de litio, material magnetizado.", opciones: [img("8"), img("9"), img("2-2"), img("4-1")], correcta: 1, explicacion: "Clase 9, mercancías peligrosas varias: siete franjas negras. La clase donde más aparecen artículos que parecen inocuos." },
    ],
  },
  {
    id: "trampas",
    titulo: "Las trampas",
    descripcion: "Etiquetas que se confunden, lado a lado. Señala cuál es cuál. Cinco rondas.",
    rondas: [
      { enunciado: "¿Cuál es la 4.2, combustión espontánea?", opciones: [img("4-1"), img("4-2"), img("4-3")], correcta: 1, explicacion: "La 4.1 es blanca con siete franjas rojas; la 4.2, blanca arriba y roja abajo; la 4.3, azul." },
      { enunciado: "¿Cuál es la 6.2, sustancia infecciosa?", opciones: [img("6-1"), img("6-2")], correcta: 1, explicacion: "La 6.1 lleva calavera y tibias; la 6.2, tres medias lunas sobre un círculo y la inscripción de aviso a las autoridades sanitarias." },
      { enunciado: "¿Cuál es la 2.3, gas tóxico?", opciones: [img("2-2"), img("2-3")], correcta: 1, explicacion: "La 2.2 es verde con la botella; la 2.3 es blanca con calavera y tibias, como la 6.1 pero con el «2»." },
      { enunciado: "¿Cuál es la 5.2, peróxido orgánico?", opciones: [img("5-1"), img("5-2")], correcta: 1, explicacion: "La 5.1 es toda amarilla; la 5.2 va roja arriba y amarilla abajo. Es la trampa de la clase 5." },
      { enunciado: "Material radiactivo: ¿cuántas franjas rojas verticales lleva la etiqueta de Categoría III-Amarilla?", opciones: [{ texto: "Una" }, { texto: "Dos" }, { texto: "Tres" }], correcta: 2, explicacion: "Una franja la I-Blanca, dos la II-Amarilla y tres la III-Amarilla. Las dos amarillas llevan además el índice de transporte." },
    ],
  },
  {
    id: "familia",
    titulo: "Riesgo o manipulación",
    descripcion: "Doce etiquetas mezcladas. Dices si cada una dice qué es (riesgo) o cómo se trata (manipulación). Doce rondas.",
    rondas: [
      { enunciado: "Corrosivo", imagen: "8", opciones: [{ texto: "De riesgo" }, { texto: "De manipulación" }], correcta: 0, explicacion: "Dice qué es: corrosivo, clase 8. Etiqueta de riesgo." },
      { enunciado: "«Exclusivamente en aeronaves de carga»", opciones: [{ texto: "De riesgo" }, { texto: "De manipulación" }], correcta: 1, explicacion: "Dice cómo se trata el bulto: no va en avión con pasajeros. Manipulación." },
      { enunciado: "Material magnetizado", opciones: [{ texto: "De riesgo" }, { texto: "De manipulación" }], correcta: 1, explicacion: "Azul sobre blanco, 110 × 90 mm. Es de manipulación: indica cómo estibarlo, lejos de lo que perturbe." },
      { enunciado: "Gas tóxico", imagen: "2-3", opciones: [{ texto: "De riesgo" }, { texto: "De manipulación" }], correcta: 0, explicacion: "Dice qué es: gas tóxico, división 2.3. Riesgo." },
      { enunciado: "Posición del bulto (flechas)", opciones: [{ texto: "De riesgo" }, { texto: "De manipulación" }], correcta: 1, explicacion: "Rojo o negro sobre fondo contrastado, 74 × 105 mm. Dice hacia dónde va arriba: manipulación." },
      { enunciado: "Peligroso mojado", imagen: "4-3", opciones: [{ texto: "De riesgo" }, { texto: "De manipulación" }], correcta: 0, explicacion: "Dice qué es: división 4.3. Riesgo." },
      { enunciado: "Líquidos criogénicos", opciones: [{ texto: "De riesgo" }, { texto: "De manipulación" }], correcta: 1, explicacion: "Símbolo blanco sobre verde, 74 × 105 mm, obligatoria al manipular líquidos criogénicos. Manipulación." },
      { enunciado: "Comburente", imagen: "5-1", opciones: [{ texto: "De riesgo" }, { texto: "De manipulación" }], correcta: 0, explicacion: "Dice qué es: comburente, división 5.1. Riesgo." },
      { enunciado: "«Manténgase alejado del calor»", opciones: [{ texto: "De riesgo" }, { texto: "De manipulación" }], correcta: 1, explicacion: "Dice cómo se trata: lejos del calor. Manipulación. La usan la 4.1 de reacción espontánea y la 5.2." },
      { enunciado: "Sustancia infecciosa", imagen: "6-2", opciones: [{ texto: "De riesgo" }, { texto: "De manipulación" }], correcta: 0, explicacion: "Dice qué es: infecciosa, división 6.2. Riesgo." },
      { enunciado: "Etiqueta de baterías de litio", opciones: [{ texto: "De riesgo" }, { texto: "De manipulación" }], correcta: 1, explicacion: "El reglamento la incluye como etiqueta de manipulación. El rombo de clase 9 es el de riesgo; esta dice cómo tratar el bulto." },
      { enunciado: "Mercancías peligrosas varias", imagen: "9", opciones: [{ texto: "De riesgo" }, { texto: "De manipulación" }], correcta: 0, explicacion: "Dice qué es: clase 9. Riesgo." },
    ],
  },

  // ── Leer la etiqueta: fondo, símbolo y número ───────────────────────────
  {
    id: "fondo",
    titulo: "El fondo: qué dice el color",
    descripcion: "Solo el color y el símbolo, sin número. Dices qué clase o división es, o si el fondo no alcanza. Seis rondas.",
    rondas: [
      { enunciado: "Fondo verde con una botella de gas en negro o blanco.", opciones: [t("2.2"), t("2.1"), t("2.3"), t("9")], correcta: 0, explicacion: "Fondo verde: gas no inflamable, no tóxico, división 2.2. Es la única de las tres de gases sin llama ni calavera." },
      { enunciado: "Fondo azul con una llama en negro o blanco.", opciones: [t("4.1"), t("4.3"), t("4.2"), t("2.1")], correcta: 1, explicacion: "Fondo azul: división 4.3, sustancia que en contacto con el agua desprende gases inflamables. Es la única etiqueta azul." },
      { enunciado: "Fondo anaranjado con una bomba haciendo explosión, en negro.", opciones: [t("5.1"), t("9"), t("4.1"), t("1")], correcta: 3, explicacion: "Fondo anaranjado: clase 1, explosivos. En la etiqueta se insertan la división y el grupo de compatibilidad." },
      { enunciado: "Fondo amarillo con una llama sobre un círculo, en negro.", opciones: [t("3"), t("5.2"), t("2.1"), t("5.1")], correcta: 3, explicacion: "Llama sobre un círculo y fondo amarillo: comburente, división 5.1. El «5.1» va en el ángulo inferior." },
      { enunciado: "Mitad superior roja y mitad inferior amarilla.", opciones: [t("5.2"), t("4.2"), t("5.1"), t("8")], correcta: 0, explicacion: "Peróxido orgánico, división 5.2. La 4.2 también va partida, pero al revés: blanca arriba y roja abajo." },
      {
        enunciado: "Fondo rojo con una llama. ¿Alcanza el fondo para decir la clase?",
        opciones: [
          { texto: "Sí: llama sobre rojo solo puede ser la clase 3" },
          { texto: "No: la división 2.1 y la clase 3 comparten llama y fondo rojo" },
          { texto: "No: el fondo rojo es de la división 4.2" },
        ],
        correcta: 1,
        explicacion: "Gas inflamable (2.1) y líquido inflamable (clase 3) comparten símbolo y fondo. Quien las separa es el número del ángulo inferior.",
      },
    ],
  },
  {
    id: "simbolo",
    titulo: "El símbolo: qué dice el dibujo",
    descripcion: "Se describe el símbolo como lo especifica la norma y dices a qué etiqueta pertenece. Seis rondas.",
    rondas: [
      { enunciado: "Tres medias lunas sobre un círculo, en negro sobre fondo blanco.", opciones: [t("6.1"), t("9"), t("2.3"), t("6.2")], correcta: 3, explicacion: "Sustancia infecciosa, división 6.2. Lleva además la inscripción de aviso a las autoridades sanitarias." },
      { enunciado: "Siete franjas verticales en la mitad superior, en negro sobre fondo blanco.", opciones: [t("4.1"), t("9"), t("8"), t("6.1")], correcta: 1, explicacion: "Mercancías peligrosas varias, clase 9. La 4.1 también lleva siete franjas, pero rojas y en toda la etiqueta." },
      { enunciado: "Líquido goteando de dos tubos de ensayo sobre una mano y una plancha de metal.", opciones: [t("8"), t("6.1"), t("5.1"), t("4.3")], correcta: 0, explicacion: "Corrosivo, clase 8. El símbolo dibuja el doble criterio: ataca tejidos vivos y ataca materiales." },
      { enunciado: "Un trébol en negro, con el «7» en el ángulo inferior.", opciones: [t("5.1"), t("9"), t("7"), t("1")], correcta: 2, explicacion: "Material radiactivo, clase 7. La categoría se lee después, en el fondo y en las franjas rojas." },
      { enunciado: "Una botella de gas en negro o blanco.", opciones: [t("2.1"), t("2.3"), t("2.2"), t("3")], correcta: 2, explicacion: "Gas no inflamable, no tóxico, división 2.2, sobre fondo verde. La 2.1 lleva llama y la 2.3, calavera." },
      {
        enunciado: "Calavera y tibias cruzadas en negro sobre fondo blanco. ¿Cuántas etiquetas llevan ese símbolo?",
        opciones: [{ texto: "Solo la 6.1" }, { texto: "La 6.1 y la 2.3" }, { texto: "La 6.1, la 6.2 y la 2.3" }],
        correcta: 1,
        explicacion: "La 6.1 (sustancia tóxica) y la 2.3 (gas tóxico) comparten símbolo y fondo. La 6.2 lleva las tres medias lunas, no la calavera.",
      },
    ],
  },
  {
    id: "numero",
    titulo: "El número del ángulo inferior",
    descripcion: "Cuando dos etiquetas comparten símbolo, el número decide. Cinco rondas.",
    rondas: [
      { enunciado: "Calavera y tibias sobre fondo blanco, con el «2» en el ángulo inferior.", opciones: [t("6.1"), t("2.2"), t("6.2"), t("2.3")], correcta: 3, explicacion: "Gas tóxico, división 2.3." },
      { enunciado: "Calavera y tibias sobre fondo blanco, con el «6» en el ángulo inferior.", opciones: [t("2.3"), t("6.1"), t("6.2"), t("8")], correcta: 1, explicacion: "Sustancia tóxica, división 6.1. Mismo dibujo que la 2.3: solo cambia el número." },
      { enunciado: "Llama sobre fondo rojo, con el «3» en el ángulo inferior.", opciones: [t("2.1"), t("4.2"), t("3"), t("4.1")], correcta: 2, explicacion: "Líquido inflamable, clase 3." },
      { enunciado: "Llama sobre fondo rojo, con el «2» en el ángulo inferior.", opciones: [t("3"), t("2.1"), t("2.2"), t("4.2")], correcta: 1, explicacion: "Gas inflamable, división 2.1. Mismo dibujo y mismo fondo que la clase 3." },
      {
        enunciado: "Ves un dibujo pegado al bulto, sin número en el ángulo inferior. ¿Qué es?",
        opciones: [
          { texto: "Una etiqueta de riesgo mal impresa" },
          { texto: "Una marca o etiqueta de manipulación" },
          { texto: "Una etiqueta de clase 9, que no lleva número" },
        ],
        correcta: 1,
        explicacion: "La regla que resume la lección 06: un rombo con número en la esquina inferior es riesgo; un rectángulo o un dibujo sin número es manipulación. La clase 9 sí lleva su número.",
      },
    ],
  },

  // ── Clase por clase ────────────────────────────────────────────────────
  {
    id: "clase1",
    titulo: "Clase 1: las seis divisiones",
    descripcion: "Se enuncia el tipo de peligro y eliges la división. No es una escala del 1 al 6. Seis rondas.",
    rondas: [
      { enunciado: "Peligro de explosión en masa.", opciones: [{ texto: "División 1.2" }, { texto: "División 1.3" }, { texto: "División 1.4" }, { texto: "División 1.1" }], correcta: 3, explicacion: "División 1.1." },
      { enunciado: "Peligro de proyección, pero no de explosión en masa.", opciones: [{ texto: "División 1.1" }, { texto: "División 1.5" }, { texto: "División 1.2" }, { texto: "División 1.6" }], correcta: 2, explicacion: "División 1.2." },
      { enunciado: "Peligro de incendio y peligro menor de explosión o de proyección, o ambos, pero no de explosión en masa.", opciones: [{ texto: "División 1.2" }, { texto: "División 1.3" }, { texto: "División 1.4" }, { texto: "División 1.5" }], correcta: 1, explicacion: "División 1.3." },
      { enunciado: "No presentan peligro apreciable.", opciones: [{ texto: "División 1.4" }, { texto: "División 1.3" }, { texto: "División 1.5" }, { texto: "División 1.6" }], correcta: 0, explicacion: "División 1.4. Es la que lleva la etiqueta anaranjada con las cifras grandes y el grupo de compatibilidad." },
      { enunciado: "Sustancias muy insensibles que tienen peligro de explosión en masa.", opciones: [{ texto: "División 1.4" }, { texto: "División 1.6" }, { texto: "División 1.1" }, { texto: "División 1.5" }], correcta: 3, explicacion: "División 1.5. Insensible no quiere decir inofensivo: vuelve a aparecer el peligro de explosión en masa." },
      { enunciado: "Objetos sumamente insensibles que no tienen peligro de explosión en masa.", opciones: [{ texto: "División 1.5" }, { texto: "División 1.2" }, { texto: "División 1.6" }, { texto: "División 1.3" }], correcta: 2, explicacion: "División 1.6. Las divisiones describen el tipo de peligro, no una escala creciente." },
    ],
  },
  {
    id: "clase1-aire",
    titulo: "Clase 1: qué vuela y qué no",
    descripcion: "Lo que la propia etiqueta de explosivo advierte sobre el transporte aéreo. Cuatro rondas.",
    rondas: [
      { enunciado: "Además de la división, ¿qué se inserta en la etiqueta de explosivo?", opciones: [{ texto: "El grupo de embalaje" }, { texto: "El grupo de compatibilidad" }, { texto: "El número ONU" }], correcta: 1, explicacion: "El grupo de compatibilidad. La clase 1 no lleva grupo de embalaje." },
      { enunciado: "Un bulto con etiqueta de división 1.1 o 1.2, ¿se transporta por vía aérea?", opciones: [{ texto: "Sí, en aeronave de carga" }, { texto: "Normalmente no" }, { texto: "Sí, si va segregado" }], correcta: 1, explicacion: "La advertencia va en la etiqueta: normalmente esos bultos no pueden transportarse por vía aérea." },
      { enunciado: "¿Y los que llevan las etiquetas de las divisiones 1.5 y 1.6?", opciones: [{ texto: "Normalmente tampoco" }, { texto: "Sí, sin condiciones" }, { texto: "Solo con etiqueta CAO" }], correcta: 0, explicacion: "Llevan la misma advertencia: normalmente no se transportan por vía aérea." },
      { enunciado: "¿Basta con saber que un envío es «explosivo» para saber si puede volar?", opciones: [{ texto: "Sí" }, { texto: "No: hacen falta la división y el grupo de compatibilidad" }], correcta: 1, explicacion: "Algunas divisiones y grupos de compatibilidad están prohibidos o tienen condiciones especiales. Sin esos dos datos la pregunta no tiene respuesta." },
    ],
  },
  {
    id: "clase2",
    titulo: "Clase 2: los tres gases",
    descripcion: "El color separa a la 2.2; el número separa a la 2.3. Cinco rondas.",
    rondas: [
      { enunciado: "¿Qué división es?", imagen: "2-1", opciones: [t("2.1"), t("2.2"), t("2.3"), t("3")], correcta: 0, explicacion: "Gas inflamable, división 2.1: llama sobre fondo rojo, con el «2» en el ángulo inferior." },
      { enunciado: "Aerosoles, extintores, oxígeno, butano y objetos cargados con gas. ¿Qué clase?", opciones: [{ texto: "Clase 3" }, { texto: "Clase 2" }, { texto: "Clase 9" }, { texto: "Clase 8" }], correcta: 1, explicacion: "Todos son ejemplos de la clase 2. La división depende de si el gas es inflamable, tóxico, o ninguna de las dos." },
      { enunciado: "¿Lleva grupo de embalaje la clase 2?", opciones: [{ texto: "Sí, las tres divisiones" }, { texto: "No" }, { texto: "Solo la 2.3" }], correcta: 1, explicacion: "No. La clase 2 no tiene grupo de embalaje, como tampoco lo tienen la clase 1 y la clase 7." },
      { enunciado: "La 2.2, ¿qué símbolo y qué fondo lleva?", opciones: [{ texto: "Llama sobre fondo verde" }, { texto: "Botella de gas sobre fondo verde" }, { texto: "Botella de gas sobre fondo azul" }], correcta: 1, explicacion: "Símbolo (botella de gas) en negro o blanco, fondo verde." },
      { enunciado: "La 2.3 comparte símbolo y fondo con la 6.1. ¿Qué las distingue?", opciones: [{ texto: "El tamaño de la etiqueta" }, { texto: "El número del ángulo inferior" }, { texto: "El color del símbolo" }], correcta: 1, explicacion: "Calavera y tibias en negro sobre fondo blanco las dos: la 2.3 lleva el «2» y la 6.1 el «6»." },
    ],
  },
  {
    id: "clase3y4",
    titulo: "Clase 3 y clase 4: rojas, menos una",
    descripcion: "Cuatro etiquetas de la misma familia visual y la que se sale. Cinco rondas.",
    rondas: [
      { enunciado: "¿Qué propiedad clasifica a un líquido en la clase 3?", opciones: [{ texto: "Su punto de inflamación" }, { texto: "Su densidad" }, { texto: "Su número ONU" }], correcta: 0, explicacion: "Despide vapores inflamables a temperaturas que no exceden de 60,5 °C en crisol cerrado. Lo que clasifica es la propiedad, no el nombre comercial del producto." },
      { enunciado: "Fondo blanco con siete franjas rojas verticales y una llama en negro.", opciones: [t("4.2"), t("4.3"), t("9"), t("4.1")], correcta: 3, explicacion: "Sólido inflamable, división 4.1." },
      { enunciado: "Mitad superior blanca, mitad inferior roja, llama en negro.", opciones: [t("4.1"), t("4.2"), t("4.3"), t("5.2")], correcta: 1, explicacion: "Combustión espontánea, división 4.2: puede calentarse sola en las condiciones normales de transporte." },
      { enunciado: "De la clase 3 y las tres divisiones de la clase 4, ¿cuál no tiene rojo?", opciones: [t("4.1"), t("4.2"), t("4.3"), t("3")], correcta: 2, explicacion: "La 4.3 es azul. Es la señal de que ahí el agua es el problema, no la solución." },
      { enunciado: "¿Lleva grupo de embalaje la clase 4?", opciones: [{ texto: "Sí, salvo las sustancias de reacción espontánea de la 4.1" }, { texto: "No, ninguna división" }, { texto: "Solo la 4.3" }], correcta: 0, explicacion: "La clase 4 lleva grupo de embalaje, salvo las sustancias de reacción espontánea de la división 4.1." },
    ],
  },
  {
    id: "clase5",
    titulo: "Clase 5: comburente o peróxido",
    descripcion: "Las dos amarillas, y por qué no son lo mismo. Cuatro rondas.",
    rondas: [
      { enunciado: "¿Cuál es la 5.1, comburente?", opciones: [img("5-1"), img("5-2")], correcta: 0, explicacion: "La 5.1 es toda amarilla, con la llama sobre un círculo y el «5.1» en el ángulo inferior. La 5.2 va roja arriba y amarilla abajo." },
      { enunciado: "Una sustancia comburente, ¿arde ella misma?", opciones: [{ texto: "Siempre" }, { texto: "No necesariamente: libera oxígeno y hace arder a las demás" }], correcta: 1, explicacion: "Sin ser de por sí necesariamente combustible, puede causar o facilitar la combustión de otras sustancias liberando oxígeno." },
      { enunciado: "¿Lleva grupo de embalaje la clase 5?", opciones: [{ texto: "Sí, salvo la división 5.2" }, { texto: "No" }, { texto: "Solo la 5.2" }], correcta: 0, explicacion: "La clase 5 lleva grupo de embalaje, salvo la división 5.2, los peróxidos orgánicos." },
      { enunciado: "¿Qué etiqueta de manipulación se asocia a la 5.2?", opciones: [{ texto: "Material magnetizado" }, { texto: "Manténgase alejado del calor" }, { texto: "Líquidos criogénicos" }], correcta: 1, explicacion: "«Manténgase alejado del calor» la usan la 4.1 de reacción espontánea y la 5.2." },
    ],
  },
  {
    id: "clase6",
    titulo: "Clase 6: tóxica o infecciosa",
    descripcion: "Dos divisiones que no se parecen en nada salvo en el número. Cinco rondas.",
    rondas: [
      { enunciado: "¿Cuál es la 6.1, sustancia tóxica?", opciones: [img("6-1"), img("6-2")], correcta: 0, explicacion: "Calavera y tibias cruzadas en negro sobre fondo blanco." },
      { enunciado: "¿Qué símbolo lleva la 6.2?", opciones: [{ texto: "Calavera y tibias" }, { texto: "Tres medias lunas sobre un círculo" }, { texto: "Un trébol" }], correcta: 1, explicacion: "Tres medias lunas sobre un círculo, en negro sobre fondo blanco, con el «6» en el ángulo inferior." },
      { enunciado: "La 6.2 lleva una inscripción en la parte superior. ¿A quién manda advertir?", opciones: [{ texto: "Al expedidor" }, { texto: "A las autoridades sanitarias" }, { texto: "Al comandante" }], correcta: 1, explicacion: "«Sustancia infecciosa. En caso de averías o fugas, adviértase inmediatamente a las autoridades sanitarias»." },
      { enunciado: "¿Lleva grupo de embalaje la clase 6?", opciones: [{ texto: "Sí, salvo la división 6.2" }, { texto: "No" }, { texto: "Solo la 6.2" }], correcta: 0, explicacion: "La clase 6 lleva grupo de embalaje, salvo la división 6.2." },
      { enunciado: "¿Qué número lleva la 6.2 en el ángulo inferior?", opciones: [{ texto: "6.2" }, { texto: "6" }, { texto: "Ninguno" }], correcta: 1, explicacion: "El «6». La división se reconoce por el símbolo y la inscripción, no por un número distinto." },
    ],
  },
  {
    id: "clase7",
    titulo: "Clase 7: las tres categorías",
    descripcion: "La única clase cuya etiqueta cambia según el bulto, no según la sustancia. Cinco rondas.",
    rondas: [
      { enunciado: "Fondo blanco y una sola franja roja detrás de la palabra «Radioactivo».", opciones: [{ texto: "Categoría I-Blanca" }, { texto: "Categoría II-Amarilla" }, { texto: "Categoría III-Amarilla" }], correcta: 0, explicacion: "Categoría I-Blanca: trébol en negro, fondo blanco, «7» en el ángulo inferior y los textos «Radioactivo», «Contenido…» y «Actividad…»." },
      { enunciado: "Mitad superior amarilla con borde blanco, dos franjas rojas e índice de transporte.", opciones: [{ texto: "Categoría I-Blanca" }, { texto: "Categoría II-Amarilla" }, { texto: "Categoría III-Amarilla" }], correcta: 1, explicacion: "Categoría II-Amarilla. El índice de transporte va en un recuadro negro." },
      { enunciado: "¿Cuántas franjas rojas lleva la Categoría III-Amarilla?", opciones: [{ texto: "Una" }, { texto: "Dos" }, { texto: "Tres" }], correcta: 2, explicacion: "Tres. Es igual a la Categoría II con una franja más." },
      { enunciado: "¿Qué determina la categoría de la etiqueta?", opciones: [{ texto: "La cantidad de material" }, { texto: "El nivel de radiación en la superficie del bulto y el índice de transporte" }, { texto: "El tipo de aeronave" }], correcta: 1, explicacion: "A mayor categoría, mayores son las condiciones de control aplicables." },
      { enunciado: "¿Lleva grupo de embalaje la clase 7?", opciones: [{ texto: "Sí" }, { texto: "No" }], correcta: 1, explicacion: "No. Como la clase 1 y la clase 2, la clase 7 no tiene grupo de embalaje." },
    ],
  },
  {
    id: "clase8y9",
    titulo: "Clase 8 y clase 9: las dos en blanco y negro",
    descripcion: "Se parecen de lejos y no tienen nada que ver. Cinco rondas.",
    rondas: [
      { enunciado: "Fondo blanco en la mitad superior y negro con borde blanco en la mitad inferior.", opciones: [t("9"), t("8"), t("2.3"), t("4.2")], correcta: 1, explicacion: "Corrosivo, clase 8." },
      { enunciado: "Fondo blanco con siete franjas verticales negras en la mitad superior.", opciones: [t("8"), t("4.1"), t("6.2"), t("9")], correcta: 3, explicacion: "Mercancías peligrosas varias, clase 9." },
      { enunciado: "¿Qué dos etiquetas llevan siete franjas verticales?", opciones: [{ texto: "La 4.1 y la clase 9" }, { texto: "La clase 8 y la clase 9" }, { texto: "La 6.2 y la clase 9" }], correcta: 0, explicacion: "La 4.1 las lleva rojas y en toda la etiqueta; la clase 9, negras y solo en la mitad superior." },
      { enunciado: "Baterías de litio, hielo seco, material magnetizado, motores de combustión interna y asbesto.", opciones: [{ texto: "Clase 8" }, { texto: "Clase 9" }, { texto: "Clase 4" }], correcta: 1, explicacion: "Todos son ejemplos de la clase 9: presentan un riesgo distinto de los de las demás clases." },
      { enunciado: "¿Es la clase 9 la clase de lo que sobra, sin peligro real?", opciones: [{ texto: "Sí, por eso está al final" }, { texto: "No: reúne riesgos que no cubren las otras ocho" }], correcta: 1, explicacion: "Es donde están las baterías de litio y el hielo seco. Que el riesgo no encaje en otra clase no lo hace menor." },
    ],
  },

  // ── Especificación, manipulación y marcas ──────────────────────────────
  {
    id: "spec",
    titulo: "La especificación, al pie de la letra",
    descripcion: "Se lee la especificación del Apéndice y eliges la etiqueta que describe. Cinco rondas.",
    rondas: [
      { enunciado: "Símbolo (llama) en negro. Fondo blanco con siete franjas rojas verticales.", opciones: [img("4-1"), img("3"), img("4-2"), img("9")], correcta: 0, explicacion: "División 4.1, sólido inflamable." },
      { enunciado: "Símbolo (botella de gas) en negro o blanco. Fondo verde.", opciones: [img("2-1"), img("2-3"), img("4-3"), img("2-2")], correcta: 3, explicacion: "División 2.2, gas no inflamable, no tóxico." },
      { enunciado: "Símbolo (llama) en negro o blanco. Fondo azul.", opciones: [img("4-1"), img("4-3"), img("2-2"), img("5-1")], correcta: 1, explicacion: "División 4.3, peligroso mojado." },
      { enunciado: "Símbolo en negro. Fondo blanco en la mitad superior y negro con borde blanco en la mitad inferior.", opciones: [img("9"), img("6-1"), img("8"), img("4-2")], correcta: 2, explicacion: "Clase 8, corrosivo." },
      { enunciado: "Símbolo (tres medias lunas sobre un círculo) e inscripción en negro. Fondo blanco. Número 6 en el ángulo inferior.", opciones: [img("6-1"), img("6-2"), img("2-3"), img("9")], correcta: 1, explicacion: "División 6.2, sustancia infecciosa." },
    ],
  },
  {
    id: "manipulacion",
    titulo: "Las seis de manipulación",
    descripcion: "No llevan número de clase porque no describen un riesgo, sino un cuidado. Seis rondas.",
    rondas: [
      { enunciado: "Color negro sobre fondo anaranjado, 120 × 110 mm.", opciones: [{ texto: "Exclusivamente en aeronaves de carga" }, { texto: "Material magnetizado" }, { texto: "Posición del bulto" }], correcta: 0, explicacion: "La etiqueta CAO. Los bultos que la llevan no se estiban en una aeronave ocupada por pasajeros." },
      { enunciado: "Color azul sobre fondo blanco, 110 × 90 mm.", opciones: [{ texto: "Líquidos criogénicos" }, { texto: "Material magnetizado" }, { texto: "Baterías de litio" }], correcta: 1, explicacion: "Material magnetizado. Dice cómo estibarlo, no qué es." },
      { enunciado: "Color rojo o negro sobre fondo contrastado, 74 × 105 mm, con flechas.", opciones: [{ texto: "Posición del bulto" }, { texto: "Manténgase alejado del calor" }, { texto: "Exclusivamente en aeronaves de carga" }], correcta: 0, explicacion: "Posición del bulto: las flechas indican hacia dónde va «arriba», y van en dos caras verticales opuestas." },
      { enunciado: "Símbolo blanco sobre fondo verde, 74 × 105 mm.", opciones: [{ texto: "Material magnetizado" }, { texto: "Líquidos criogénicos" }, { texto: "Gas no inflamable, 2.2" }], correcta: 1, explicacion: "Líquidos criogénicos: su uso es obligatorio cuando se manipulen. No la confundas con el rombo verde de la 2.2, que sí es de riesgo." },
      { enunciado: "¿A qué etiquetas de riesgo acompaña «Manténgase alejado del calor»?", opciones: [{ texto: "A la 4.1 de reacción espontánea y a la 5.2" }, { texto: "A la clase 8 y a la clase 9" }, { texto: "A la 2.2 y a la 2.3" }], correcta: 0, explicacion: "Son las que la norma asocia a ese cuidado." },
      { enunciado: "La etiqueta de baterías de litio, ¿de qué familia es?", opciones: [{ texto: "De riesgo" }, { texto: "De manipulación" }], correcta: 1, explicacion: "La norma la incluye entre las de manipulación; el rombo de clase 9 es el de riesgo. Ediciones posteriores de las Instrucciones Técnicas la reemplazaron por la marca de batería de litio y la etiqueta 9A: verifica la edición en vigor." },
    ],
  },
  {
    id: "medidas",
    titulo: "Las medidas del Apéndice",
    descripcion: "Cuando la norma da una dimensión, es un dato, no un adorno. Cuatro rondas.",
    rondas: [
      { enunciado: "¿Qué etiqueta mide 120 × 110 mm?", opciones: [{ texto: "Material magnetizado" }, { texto: "Exclusivamente en aeronaves de carga" }, { texto: "Posición del bulto" }], correcta: 1, explicacion: "La CAO, en negro sobre fondo anaranjado." },
      { enunciado: "¿Y cuál mide 110 × 90 mm?", opciones: [{ texto: "Material magnetizado" }, { texto: "Líquidos criogénicos" }, { texto: "Posición del bulto" }], correcta: 0, explicacion: "Material magnetizado, en azul sobre fondo blanco." },
      { enunciado: "¿Qué dos etiquetas miden 74 × 105 mm?", opciones: [{ texto: "Posición del bulto y líquidos criogénicos" }, { texto: "CAO y material magnetizado" }, { texto: "Baterías de litio y calor" }], correcta: 0, explicacion: "Las dos comparten dimensión." },
      { enunciado: "En la etiqueta de 100 × 100 mm de la división 1.4, ¿qué tamaño tienen las cifras?", opciones: [{ texto: "Unos 30 mm de altura y 5 mm de espesor" }, { texto: "Unos 10 mm de altura" }, { texto: "La norma no lo dice" }], correcta: 0, explicacion: "Fondo anaranjado y cifras en negro de unos 30 mm de altura y 5 mm de espesor. Las de la 1.5 y la 1.6 usan la misma numeración." },
    ],
  },
  {
    id: "marcas",
    titulo: "Marcas que no son etiquetas",
    descripcion: "Lo demás que lleva pegado un bulto, y qué te dice cada cosa. Cinco rondas.",
    rondas: [
      { enunciado: "«4GV/X17.3/S/18» junto al símbolo de la ONU.", opciones: [{ texto: "Marca de especificación del embalaje" }, { texto: "Número ONU de la mercancía" }, { texto: "Número de guía aérea" }], correcta: 0, explicacion: "Identifica un embalaje certificado según una especificación de diseño: tipo, grupo de embalaje que admite, estado de la materia y masa máxima. Su diseño pasó los ensayos de caída, apilamiento y presión interna." },
      { enunciado: "Un pez y un árbol muertos.", opciones: [{ texto: "Sustancia infecciosa" }, { texto: "Contaminante del medio ambiente" }, { texto: "Peligroso mojado" }], correcta: 1, explicacion: "Marca de peligro para el medio ambiente, especialmente el acuático. Acompaña al riesgo principal; no lo sustituye." },
      { enunciado: "Expedidor, destinatario y número de guía aérea.", opciones: [{ texto: "Etiqueta de expedición" }, { texto: "Documento de transporte" }, { texto: "NOTOC" }], correcta: 0, explicacion: "Es la trazabilidad del bulto desde su origen hasta su destino. No dice nada del riesgo." },
      { enunciado: "Un rombo con una «Y» en el centro.", opciones: [{ texto: "Cantidad exceptuada" }, { texto: "Cantidad limitada por vía aérea" }, { texto: "Grupo de embalaje" }], correcta: 1, explicacion: "La marca Y señala el régimen de cantidad limitada. No autoriza por sí sola el envío: la entrada debe permitir una instrucción «Y» y el bulto cumplir sus límites." },
      { enunciado: "Una entrada con código E0.", opciones: [{ texto: "Admite cantidad exceptuada" }, { texto: "No admite el régimen de cantidad exceptuada" }, { texto: "Es una marca de manipulación" }], correcta: 1, explicacion: "E0 significa que no se admite ese régimen. Los códigos E1 a E5 fijan límites por envase interior y bulto exterior." },
    ],
  },
  {
    id: "principal",
    titulo: "Riesgo principal y riesgo secundario",
    descripcion: "Un bulto puede llevar más de un rombo, y no dicen lo mismo. Cuatro rondas.",
    rondas: [
      { enunciado: "Un bulto lleva el rombo de clase 8 y, al lado, el de calavera con el «6» en el ángulo. ¿Qué significa?", opciones: [{ texto: "Dos envíos distintos en el mismo bulto" }, { texto: "Corrosivo como riesgo principal y tóxico como riesgo secundario" }, { texto: "Un error de etiquetado" }], correcta: 1, explicacion: "Es el bulto de la lección 06: el riesgo principal es el de clase 8 y el de 6.1 aparece como secundario." },
      { enunciado: "¿Puede un bulto llevar varias etiquetas de riesgo y varias de manipulación a la vez?", opciones: [{ texto: "Sí, según la mercancía y las condiciones de transporte" }, { texto: "No: una de cada" }], correcta: 0, explicacion: "Un mismo bulto puede llevar varias indicaciones de ambas familias." },
      { enunciado: "¿Cuál de las dos familias te dice qué hay dentro?", opciones: [{ texto: "La de riesgo" }, { texto: "La de manipulación" }], correcta: 0, explicacion: "La de riesgo identifica el peligro con el símbolo y el número de clase o división. La de manipulación dice cómo tratar el bulto." },
      { enunciado: "¿Qué pregunta responde una etiqueta de manipulación?", opciones: [{ texto: "Qué es" }, { texto: "Cómo se trata" }, { texto: "Cuánto pesa" }], correcta: 1, explicacion: "Posición, temperatura, tipo de aeronave: cuidados, no riesgos." },
    ],
  },
  {
    id: "no-vuela",
    titulo: "Cuándo el bulto se queda en tierra",
    descripcion: "Las etiquetas también deciden qué no sale. Cuatro rondas.",
    rondas: [
      { enunciado: "Una etiqueta se desprendió en la rampa. ¿Puede reponerla el explotador?", opciones: [{ texto: "Nunca" }, { texto: "Sí: debe poseer etiquetas adecuadas para su reposición" }, { texto: "Solo el expedidor" }], correcta: 1, explicacion: "El explotador que cuenta con la autorización para transportar mercancías peligrosas debe poseer etiquetas de reposición para los casos de desprendimiento o deterioro." },
      { enunciado: "Nadie sabe cuál era la etiqueta que se cayó. ¿Qué pasa?", opciones: [{ texto: "Se repone la más parecida" }, { texto: "No se transporta la mercancía" }, { texto: "Se anota en el NOTOC y sale" }], correcta: 1, explicacion: "Es una de las pocas veces que la norma dice «no se transportará» sin condiciones: si no se tiene la certeza de cuál etiqueta corresponde, el bulto se queda." },
      { enunciado: "Aparece un bulto con la etiqueta «Exclusivamente en aeronaves de carga» en un vuelo de pasajeros.", opciones: [{ texto: "Puede ir si queda lejos de la cabina" }, { texto: "No se estiba en una aeronave ocupada por pasajeros" }, { texto: "Puede ir si el expedidor lo autoriza" }], correcta: 1, explicacion: "Ni la posición ni una autorización del expedidor lo habilitan." },
      { enunciado: "Un bulto con la etiqueta de la división 1.2.", opciones: [{ texto: "Normalmente no se transporta por vía aérea" }, { texto: "Va en carguero sin condiciones" }, { texto: "Va en bodega delantera" }], correcta: 0, explicacion: "La advertencia va en la propia etiqueta de explosivo, para las divisiones 1.1 y 1.2." },
    ],
  },
  {
    id: "envios",
    titulo: "Del envío a la clase",
    descripcion: "Lo que llega a la bodega con su nombre comercial, y qué clase le corresponde. Seis rondas.",
    rondas: [
      { enunciado: "Pintura para mantenimiento en latas metálicas de 5 litros.", opciones: [{ texto: "Clase 3" }, { texto: "Clase 8" }, { texto: "Clase 9" }, { texto: "Clase 5" }], correcta: 0, explicacion: "Clase 3: los disolventes tienen punto de inflamación por debajo de 60,5 °C. Lo que clasifica es la propiedad, no que se llame pintura." },
      { enunciado: "Un palé de baterías de ion litio que viajan solas, como carga.", opciones: [{ texto: "Clase 3" }, { texto: "Clase 8" }, { texto: "Clase 9" }, { texto: "Clase 4" }], correcta: 2, explicacion: "Clase 9, y sin grupo de embalaje. No son clase 3 ni clase 8: es el error que más se repite." },
      { enunciado: "Hielo seco para mantener frías unas muestras médicas.", opciones: [{ texto: "Clase 9" }, { texto: "Clase 2" }, { texto: "Clase 5" }, { texto: "Clase 6" }], correcta: 0, explicacion: "Clase 9. El hielo seco es dióxido de carbono sólido." },
      { enunciado: "Isótopos médicos para un hospital.", opciones: [{ texto: "Clase 6" }, { texto: "Clase 9" }, { texto: "Clase 7" }, { texto: "Clase 5" }], correcta: 2, explicacion: "Clase 7, material radiactivo. La categoría de la etiqueta se determina después, según el bulto." },
      { enunciado: "Municiones y pirotecnia.", opciones: [{ texto: "Clase 1" }, { texto: "Clase 4" }, { texto: "Clase 5" }, { texto: "Clase 9" }], correcta: 0, explicacion: "Clase 1, explosivos. Sin la división y el grupo de compatibilidad no se sabe si puede volar." },
      { enunciado: "Material magnetizado.", opciones: [{ texto: "Clase 9" }, { texto: "Clase 2" }, { texto: "Clase 7" }, { texto: "No es mercancía peligrosa" }], correcta: 0, explicacion: "Clase 9. Además lleva su etiqueta de manipulación, azul sobre blanco, que dice cómo estibarlo." },
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
      "La pintura tiene disolventes con punto de inflamación por debajo de 60,5 °C en crisol cerrado, así que es líquido inflamable. Lo que la clasifica es esa propiedad, no que se llame pintura: el reglamento colombiano la cita como ejemplo de la clase 3.",
    embalaje: "UN 1263 es su número ONU y suele ir con grupo de embalaje II o III según el punto de inflamación (Instrucciones Técnicas, verificar edición vigente).",
  },
  {
    id: "c2",
    texto: "Un palé con baterías de ion litio que viajan solas, como carga, en un vuelo que lleva pasajeros.",
    clase: "9",
    ge: false,
    respuesta: "Clase 9, sin grupo de embalaje. Y en ese vuelo no viaja.",
    explicacion:
      "Es el caso que más se falla: las baterías de litio no son clase 3 ni clase 8, son clase 9 y no llevan grupo de embalaje. Lo que gobierna su transporte es la instrucción de embalaje y el estado de carga. Como carga suelta están prohibidas en aeronave de pasajeros desde 2016.",
    embalaje: "UN 3480, solo aeronave de carga y con estado de carga no mayor al 30 % (Instrucciones Técnicas, verificar edición vigente).",
  },
  {
    id: "c3",
    texto: "Una caja con hielo seco usada para mantener frías unas muestras médicas durante el vuelo.",
    clase: "9",
    ge: false,
    respuesta: "Clase 9, sin grupo de embalaje.",
    explicacion:
      "El hielo seco es dióxido de carbono sólido: no arde ni es tóxico, pero sublima y desplaza el oxígeno en un espacio cerrado. Ese riesgo no encaja en ninguna de las otras ocho clases, y el reglamento colombiano lo nombra como ejemplo de la 9.",
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
      "Es un sólido inflamable, pero lo que importa es la división: la 4.3 desprende gas inflamable en contacto con el agua. Si hay un incidente, echar agua empeora las cosas: la división no es un detalle administrativo, es el dato que cambia la respuesta.",
    embalaje: "Va bajo aceite justamente para aislarlo de la humedad del aire.",
  },
  {
    id: "c5",
    texto: "Cuarenta cajas de desodorante en aerosol para una cadena de tiendas.",
    clase: "2",
    ge: false,
    respuesta: "Clase 2, gases: los aerosoles están en la definición. Sin grupo de embalaje.",
    explicacion:
      "La definición de la clase 2 nombra expresamente los aerosoles. La división depende del propelente: 2.1 si es inflamable, 2.2 si no. Los gases no llevan grupo de embalaje.",
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
      "Un extintor es un objeto cargado con gas comprimido. El CO₂ no es inflamable ni tóxico: división 2.2. Lo que empuja es la presión.",
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
      "No arde por sí solo, pero libera oxígeno y facilita la combustión de lo que tenga al lado. Por eso se segrega de los inflamables. La 5.1 sí lleva grupo de embalaje; la 5.2 no.",
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
      "«Se sabe o se cree fundadamente que contienen agentes patógenos» es la definición de la 6.2, que no lleva grupo de embalaje. Y ojo con el hielo seco que suele acompañarlas: es clase 9 y va aparte.",
    embalaje: "Las de riesgo menor van como UN 3373, sustancia biológica Categoría B (Instrucciones Técnicas, verificar).",
  },
  {
    id: "c9",
    texto: "Garrafas de ácido sulfúrico para el mantenimiento de baterías, en un envío industrial.",
    clase: "8",
    ge: true,
    respuesta: "Clase 8, corrosiva, con grupo de embalaje.",
    explicacion:
      "Causa lesiones graves a los tejidos vivos y, si se escapa, daña otras mercancías y el propio avión. Doble criterio, doble razón para el embalaje homologado y la segregación.",
    embalaje: "UN 1830, ácido sulfúrico, grupo de embalaje II.",
  },
  {
    id: "c10",
    texto: "Un motor de combustión interna, drenado, que viaja como repuesto para un generador.",
    clase: "9",
    ge: false,
    respuesta: "Clase 9: el reglamento colombiano lo nombra como ejemplo de objeto de esa clase.",
    explicacion:
      "Los motores de combustión interna figuran entre los ejemplos de objetos de la clase 9. Aunque vaya drenado puede conservar residuos de combustible, batería o aceite, y por eso sigue siendo mercancía peligrosa y no «repuestos».",
    embalaje: "Ediciones posteriores de las Instrucciones Técnicas reclasifican los motores según el combustible que usan: verifica la edición vigente antes de citar el UN.",
  },
]

// ─── Escenarios ──────────────────────────────────────────────────────────────

/**
 * Una pareja del ejercicio: a la izquierda algo que aparece en el escenario, a
 * la derecha lo que le corresponde. Las dos mitades van cortas a propósito:
 * son fichas que se tocan con el pulgar, no frases que se leen.
 */
export interface ConexionMP {
  izquierda: string
  derecha: string
}

export interface EscenarioMP {
  id: string
  titulo: string
  situacion: string
  /** Lo que el piloto tiene que decidir, en preguntas. */
  preguntas: string[]
  /**
   * El ejercicio. El escenario se resuelve conectando cada elemento con lo que
   * le corresponde; cuando están todas, se abre la respuesta modelo.
   */
  conexiones: ConexionMP[]
  /** La respuesta modelo. */
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
    conexiones: [
      { izquierda: "El power bank", derecha: "Solo en cabina, con los terminales protegidos" },
      { izquierda: "El portátil, si baja a bodega", derecha: "Apagado y protegido contra activación accidental" },
      { izquierda: "El respaldo de lo que dices", derecha: "Instrucciones Técnicas y procedimiento del explotador" },
      { izquierda: "El pasajero no acepta", derecha: "La maleta no baja" },
      { izquierda: "Bajó así y se descubre después", derecha: "Mercancía no permitida en el equipaje: se notifica" },
    ],
    modelo:
      "El power bank es una batería de repuesto: va solo en cabina, con los terminales protegidos, nunca en bodega. El portátil puede bajar si va apagado y protegido contra activación accidental. Eso sale de lo que las Instrucciones Técnicas permiten a los pasajeros y del procedimiento del explotador; no es una opinión de la tripulación. Si el pasajero no lo acepta, la maleta no baja: la norma prohíbe al explotador permitir mercancías peligrosas en el equipaje salvo lo que las Instrucciones autorizan. Si baja como está y se descubre después, es una mercancía no permitida en el equipaje y se notifica.",
    puntos: ["Power bank = repuesto = solo cabina, terminales protegidos", "Portátil a bodega apagado y protegido", "Respaldo: Instrucciones Técnicas y procedimiento del explotador", "Si no acepta, la maleta no baja", "Si baja y se descubre: notificación"],
  },
  {
    id: "grupo",
    titulo: "El grupo de embalaje que no coincide",
    situacion:
      "Briefing. El NOTOC muestra UN 1263, pintura, clase 3, grupo de embalaje II, dos bultos en la bodega trasera. La declaración del expedidor que te muestran dice grupo de embalaje III para el mismo envío.",
    preguntas: ["¿Firmas el NOTOC?", "¿Por qué importa una diferencia entre II y III?", "¿Qué tiene que pasar para que el envío salga?"],
    conexiones: [
      { izquierda: "NOTOC dice II, declaración dice III", derecha: "Discrepancia abierta: no se firma" },
      { izquierda: "Qué gradúa el grupo de embalaje", derecha: "El peligro dentro de la clase" },
      { izquierda: "Qué fija el grupo de embalaje", derecha: "El embalaje exigido y la cantidad por bulto" },
      { izquierda: "Cuándo se firma la información al piloto", derecha: "Antes de que las mercancías se transporten" },
      { izquierda: "Si el dato no se puede aclarar", derecha: "El envío no sale" },
    ],
    modelo:
      "No se firma con una discrepancia abierta. El grupo de embalaje gradúa el peligro dentro de la clase y fija qué embalaje exige y cuánta cantidad admite por bulto: un II no es un III. La información al piloto al mando se firma antes de que las mercancías se transporten y firmar es dejar constancia de que sabes qué llevas. El envío sale cuando el explotador aclara con la declaración cuál es el dato correcto y corrige el documento que esté mal; si no se puede aclarar, no sale. Si el envío ya voló con información incorrecta, se notifica.",
    puntos: ["No se firma con discrepancia", "El grupo cambia embalaje y cantidad admitida", "La firma es previa al transporte", "Se aclara con la declaración del expedidor o no sale", "Voló mal: notificación"],
  },
  {
    id: "cao",
    titulo: "Un bulto CAO en un vuelo de pasajeros",
    situacion:
      "Vuelo de pasajeros. En el NOTOC aparece un envío con la marca «Cargo Aircraft Only». El agente dice que va bien estibado en la bodega delantera, lejos de la cabina, y que el expedidor autorizó por escrito.",
    preguntas: ["¿Sale ese bulto?", "¿Cambia algo la posición o la autorización del expedidor?", "¿Qué tienes que asegurarte tú?"],
    conexiones: [
      { izquierda: "La marca «Cargo Aircraft Only»", derecha: "No se estiba en aeronave ocupada por pasajeros" },
      { izquierda: "Bodega delantera, lejos de la cabina", derecha: "La posición no lo arregla" },
      { izquierda: "La autorización escrita del expedidor", derecha: "No habilita lo que la norma prohíbe" },
      { izquierda: "Antes de firmar el NOTOC", derecha: "Comprobar que ningún CAO va en el vuelo" },
      { izquierda: "Si el bulto aparece igual", derecha: "Se baja y queda registrado por qué" },
    ],
    modelo:
      "No sale. Los bultos con la etiqueta «Exclusivamente en aeronaves de carga» no se estiban en una aeronave ocupada por pasajeros. La posición no lo arregla y el expedidor no puede autorizar lo que la norma prohíbe. Comprobar que ningún CAO va en un vuelo con pasajeros es parte de lo que revisas antes de firmar la información al piloto al mando. Si aparece, el envío se baja y queda registrado por qué.",
    puntos: ["CAO nunca en aeronave con pasajeros", "Ni la posición ni el expedidor lo habilitan", "Es una comprobación previa a la firma del NOTOC", "El envío se baja"],
  },
  {
    id: "humo",
    titulo: "Humo en cabina con un corrosivo en la bodega",
    situacion:
      "Crucero. Olor químico y humo tenue en el galley trasero. El NOTOC declara un envío de clase 8 en la bodega posterior y uno de 6.1 en la delantera.",
    preguntas: ["¿Qué hace primero la cabina de mando?", "¿Qué consultas y qué usas?", "¿A quién informas y cuándo?", "¿Qué queda después de aterrizar?"],
    conexiones: [
      { izquierda: "Lo primero, siempre", derecha: "Volar: máscaras, oxígeno y control del humo según el QRH" },
      { izquierda: "Qué identifica la carga en vuelo", derecha: "El NOTOC, al alcance del comandante" },
      { izquierda: "Qué se consulta para actuar", derecha: "La información de respuesta de emergencia" },
      { izquierda: "La cabina de pasajeros", derecha: "Equipo de respuesta: bolsas, ligaduras y guantes largos" },
      { izquierda: "Tan pronto la situación lo permita", derecha: "Declarar la emergencia e informar al ATS" },
      { izquierda: "Después de aterrizar", derecha: "Información a los servicios de emergencia y notificación" },
    ],
    modelo:
      "Primero se vuela: máscaras, oxígeno, control de la aeronave y del humo según el QRH. Después se identifica con el NOTOC, que está al alcance del comandante en vuelo: un corrosivo en la bodega posterior, la más cercana al humo. Se consulta la información de respuesta de emergencia, que debe estar disponible de inmediato, y la cabina de pasajeros usa el equipo de respuesta (bolsas, ligaduras, guantes largos de goma). Se declara la emergencia y se informa al ATS tan pronto la situación lo permita para que avise a la administración aeroportuaria; se desvía al aeródromo adecuado más cercano. Después, el explotador entrega la información a los servicios de emergencia y se notifica el incidente.",
    puntos: ["Volar primero", "Identificar con el NOTOC", "Guía de emergencia y equipo de respuesta", "Declarar e informar al ATS tan pronto se pueda", "Desviar; después, información a servicios y notificación"],
  },
  {
    id: "comat",
    titulo: "Cajas de la compañía que no están en el NOTOC",
    situacion:
      "Veinte minutos antes de la salida ves en la bodega seis cajas marcadas «AOG PARTS – COMPANY MATERIAL» que no aparecen en el NOTOC ni en el manifiesto de mercancías peligrosas.",
    preguntas: ["¿Qué te dice esa marca?", "¿Qué preguntas antes de firmar?", "¿Firmas?"],
    conexiones: [
      { izquierda: "«Company material»", derecha: "COMAT: propiedad del explotador, en su propio provecho" },
      { izquierda: "COMAT que es mercancía peligrosa", derecha: "Sigue todas las reglas, incluido el NOTOC" },
      { izquierda: "«Repuestos» como descripción", derecha: "Descripción general: obliga a preguntar" },
      { izquierda: "Un envío con mercancías peligrosas", derecha: "Necesita documento de transporte e inspección" },
      { izquierda: "Mientras no se aclare el contenido", derecha: "No se firma" },
    ],
    modelo:
      "«Company material» es COMAT: propiedad del explotador que viaja en su propio provecho. Si algo de eso está clasificado como mercancía peligrosa (un generador de oxígeno, una batería, un aerosol) es COMAT peligroso y sigue todas las reglas, incluida la información al piloto al mando. «Repuestos» es una descripción general que debe hacer dudar. Antes de firmar se pregunta qué contienen y quién las aceptó: un envío con mercancías peligrosas necesita documento de transporte e inspección. No se firma hasta aclararlo; si el contenido no es peligroso y queda registrado, se firma; si lo es, entra al NOTOC o no sale. Es ValuJet contado desde tu asiento.",
    puntos: ["COMAT y COMAT peligroso", "Descripción general = pregunta", "Aceptación exige documento e inspección", "No se firma hasta aclarar", "Si es peligroso: al NOTOC o no sale"],
  },
  {
    id: "etiqueta",
    titulo: "La etiqueta que se despegó en la rampa",
    situacion:
      "Durante el walkaround ves en la plataforma un bulto para tu vuelo con la etiqueta de riesgo medio despegada y con el número UN legible. El agente dice que la pega y ya.",
    preguntas: ["¿Puede reponerla el explotador?", "¿Con qué condición?", "¿Y si no está claro cuál etiqueta va?"],
    conexiones: [
      { izquierda: "Etiqueta desprendida o deteriorada", derecha: "El explotador autorizado la repone" },
      { izquierda: "Con qué datos se repone", derecha: "Los del documento de transporte" },
      { izquierda: "Sin certeza de cuál corresponde", derecha: "No se transporta la mercancía" },
      { izquierda: "Quién pega la etiqueta", derecha: "El explotador, no la tripulación" },
      { izquierda: "Lo que sí te corresponde", derecha: "No firmar por un bulto que nadie sabe qué es" },
    ],
    modelo:
      "Sí puede: el explotador autorizado debe tener etiquetas de reposición para los casos de desprendimiento o deterioro y las reemplaza conforme a los datos del documento de transporte. La condición es esa: que el documento diga cuál es. Si no se tiene la certeza de cuál etiqueta corresponde, no se transporta la mercancía. Tú no pegas etiquetas, pero no firmas por un bulto que nadie sabe qué es.",
    puntos: ["Reposición permitida", "Según el documento de transporte", "Sin certeza, no vuela", "La etiqueta es parte del acondicionamiento exigido"],
  },
  {
    id: "monomotor",
    titulo: "Combustible en un monomotor",
    situacion:
      "Operas un monomotor de carga en el Vichada. Te piden llevar tres canecas de gasolina de aviación para un aeródromo remoto, junto con otros repuestos.",
    preguntas: ["¿Puedes llevar la gasolina?", "¿Y los repuestos, si alguno es mercancía peligrosa de otra clase?", "¿De dónde sale esa regla?"],
    conexiones: [
      { izquierda: "Clase 3 combustibles en monomotor", derecha: "Prohibida en Colombia" },
      { izquierda: "Las demás clases en monomotor", derecha: "Requieren aprobación de la autoridad" },
      { izquierda: "Lo que la autoridad verifica", derecha: "Las condiciones de seguridad del explotador" },
      { izquierda: "Lo que la autoridad puede excluir", derecha: "Los aeródromos donde no aprueba" },
      { izquierda: "De dónde sale la regla", derecha: "Añadido nacional, no del Anexo 18" },
    ],
    modelo:
      "La gasolina no, pero por una regla que no está en el Anexo 18: es un añadido nacional. En Colombia se prohíbe la clase 3 combustibles en aeronaves monomotores, salvo las excepciones para pasajeros y tripulantes; las demás clases en monomotor requieren aprobación de la autoridad, que verifica las condiciones de seguridad del explotador y determina en qué aeródromos no la aprueba. Por eso no aparece en los cursos genéricos, y por eso tienes que abrir el reglamento de tu país: el mecanismo que permite estos añadidos está en el propio LAR, y lo que cada Estado añade se notifica a la OACI.",
    puntos: ["Colombia: clase 3 combustibles prohibida en monomotor", "Otras clases: aprobación de la autoridad", "La autoridad puede excluir aeródromos", "Es un añadido nacional, no del Anexo 18: busca el de tu país"],
  },
  {
    id: "silla",
    titulo: "La silla de ruedas con batería de litio",
    situacion:
      "Un pasajero con movilidad reducida embarca con su silla de ruedas eléctrica. La silla lleva una batería de ion litio. El agente pregunta si la batería va instalada en la silla o la retiran.",
    preguntas: ["¿Es mercancía peligrosa?", "¿Dónde se resuelve qué hacer con la batería?", "¿Qué debe saber el comandante?"],
    conexiones: [
      { izquierda: "La batería de ion litio", derecha: "Clase 9, sin grupo de embalaje" },
      { izquierda: "La ayuda de movilidad con batería", derecha: "Excepción de pasajeros de las Instrucciones Técnicas" },
      { izquierda: "De qué dependen las condiciones", derecha: "Del tipo de batería y de si se retira o no" },
      { izquierda: "Los vatios-hora exactos", derecha: "Se verifican en la edición vigente" },
      { izquierda: "El comandante", derecha: "Debe saber que se transporta y dónde va" },
    ],
    modelo:
      "Sí: es una batería de ion litio, clase 9, sin grupo de embalaje. Las ayudas de movilidad con batería son una de las excepciones para pasajeros que regulan las Instrucciones Técnicas, con condiciones que dependen del tipo de batería y de si se retira o no: esas condiciones y los vatios-hora exactos hay que verificarlos en la edición vigente y en el procedimiento del explotador. Lo que el comandante debe saber es que se transporta y dónde va: para las ayudas de movilidad con batería de litio las Instrucciones exigen informar al piloto al mando, y la operación debe reflejarlo en el NOTOC o en el documento que use el explotador.",
    puntos: ["Batería de litio = clase 9, sin grupo de embalaje", "Excepción de pasajeros de las Instrucciones Técnicas: verificar edición", "Condiciones según tipo de batería y si se retira", "El comandante debe saber que va y dónde"],
  },
  {
    id: "averia",
    titulo: "Un bulto llegó mojado",
    situacion:
      "Turnaround en destino. El agente de rampa te comenta que uno de los bultos de mercancías peligrosas «venía mojado por fuera» y que ya lo bajaron.",
    preguntas: ["¿Qué tiene que hacer el explotador además de bajarlo?", "¿Qué preguntas tú?", "¿Es un suceso?"],
    conexiones: [
      { izquierda: "Un bulto con averías o pérdidas", derecha: "Se descarga" },
      { izquierda: "El resto del envío", derecha: "Se comprueba que esté en condiciones" },
      { izquierda: "La zona donde iba estibado", derecha: "Se inspecciona por si hubo daño" },
      { izquierda: "La contaminación en la aeronave", derecha: "Se elimina sin demora" },
      { izquierda: "La integridad del embalaje vulnerada", derecha: "Incidente imputable: se notifica" },
    ],
    modelo:
      "Un bulto con averías o pérdidas se descarga, y el explotador se asegura de que el resto del envío esté en condiciones y de que ningún otro bulto quedó contaminado; toda contaminación peligrosa en la aeronave se elimina sin demora. Al descargar, si hay pérdidas se inspecciona la zona donde iba estibado para ver si hubo daño. Lo que preguntas es qué era y qué había al lado: un corrosivo mojando otra carga es otro problema. Es un incidente imputable a mercancías peligrosas, porque hubo una manifestación de que se vulneró la integridad de un embalaje, y se notifica.",
    puntos: ["Descargar y revisar el resto del envío", "Inspeccionar la zona de estiba", "Eliminar la contaminación", "Qué era y qué tenía al lado", "Incidente imputable: se notifica"],
  },
  {
    id: "dispensa",
    titulo: "Animales vivos infectados para un laboratorio",
    situacion:
      "Un instituto de investigación quiere enviar por tu aerolínea animales vivos infectados para un estudio. Tu jefe de operaciones te pregunta qué papel necesitan.",
    preguntas: ["¿En qué nivel de permiso caen?", "¿Aprobación o dispensa?", "¿Quién la pide y quién la da?"],
    conexiones: [
      { izquierda: "Animales vivos infectados", derecha: "Prohibidos salvo dispensa de la autoridad" },
      { izquierda: "La aprobación", derecha: "Solo existe si las Instrucciones la prevén para ese caso" },
      { izquierda: "Quién otorga la dispensa", derecha: "La autoridad de aviación civil" },
      { izquierda: "Quién la solicita", derecha: "El explotador" },
      { izquierda: "Lo prohibido en todas las circunstancias", derecha: "Nunca se dispensa" },
    ],
    modelo:
      "Los animales vivos infectados están nombrados expresamente entre las mercancías prohibidas salvo dispensa de la autoridad. No es un caso de aprobación: la aprobación solo existe cuando las Instrucciones Técnicas dicen que ese caso puede transportarse con aprobación; si no hay esa referencia, lo que procede es la dispensa. La dispensa la otorga la autoridad de aviación civil, la solicita el explotador y procede por extrema urgencia, cuando otro modo de transporte no es apropiado o cuando cumplirlo todo sería contrario al interés público, siempre con un nivel de seguridad equivalente y nunca para lo prohibido en todas las circunstancias.",
    puntos: ["Prohibido salvo dispensa", "Aprobación solo si las Instrucciones la prevén", "Dispensa: la da la autoridad (en Colombia, la Secretaría de Seguridad Aérea)", "La pide el explotador", "Nunca para lo prohibido en todos los casos"],
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
  { n: 1, pregunta: "¿Qué es una mercancía peligrosa?", respuesta: "Todo objeto o sustancia que pueda constituir un riesgo para la salud, la seguridad, los bienes o el medio ambiente y que figure en la lista de las Instrucciones Técnicas o esté clasificado conforme a ellas. Dos mitades: riesgo y estar en la lista o ser clasificable.", evaluan: "Que la definición no sea «cosas que explotan»: que sepas que hay lista y criterios." },
  { n: 2, pregunta: "¿Cuál es el marco normativo?", respuesta: "Cuatro capas, una dentro de otra: el Anexo 18 al Convenio de Chicago, las Instrucciones Técnicas (Doc 9284) que lo desarrollan, el LAR 175 que el SRVSOP elaboró con fundamento en el Anexo 18 para la región, y el reglamento de cada Estado, que en Colombia es el RAC 175. El reglamento fija el qué y las Instrucciones el cómo.", evaluan: "Que conozcas la jerarquía y que el reglamento remite a las Instrucciones en casi cada artículo." },
  { n: 3, pregunta: "¿Cuántas clases hay y cómo se asigna una?", respuesta: "Nueve. Una sola por mercancía, según el peligro o el más importante de los peligros que represente. El resto es riesgo secundario y se ve en el etiquetado.", evaluan: "Que sepas que es una clase, no varias, y qué es el riesgo secundario." },
  { n: 4, pregunta: "¿Cuál es la diferencia entre clase y división?", respuesta: "La clase es el riesgo principal, del 1 al 9; la división es el subtipo dentro de la clase, con punto: 2.1 es un gas inflamable dentro de la clase 2. La división cambia la respuesta en emergencia: 4.3 y agua, por ejemplo.", evaluan: "Que no digas «clase 2.1»." },
  { n: 5, pregunta: "¿En qué clase están las baterías de litio y qué grupo de embalaje llevan?", respuesta: "Clase 9, y no llevan grupo de embalaje. Lo que gobierna su transporte es la instrucción de embalaje y el estado de carga. Casi todo el mundo las ubica en la 3 o en la 8.", evaluan: "La pregunta que más se falla. Que no dudes." },
  { n: 6, pregunta: "¿Qué es el grupo de embalaje?", respuesta: "El grado de peligro dentro de la clase: I gran peligro, II intermedio, III escaso. Va en romanos. No aplica a las clases 1, 2 y 7, ni a la 5.2, la 6.2 ni las sustancias de reacción espontánea de la 4.1.", evaluan: "Que sepas que no todas las clases lo llevan." },
  { n: 7, pregunta: "¿Qué diferencia una etiqueta de riesgo de una de manipulación?", respuesta: "La de riesgo dice qué es (se requiere para la mayoría de las mercancías de todas las clases); la de manipulación dice cómo se trata el bulto (se requiere para algunas): CAO, posición, magnetizado, criogénicos, litio.", evaluan: "Que distingas el rombo de la señal de manipulación." },
  { n: 8, pregunta: "¿Qué se hace con un bulto cuya etiqueta se despegó?", respuesta: "El explotador la repone conforme al documento de transporte; si no hay certeza de cuál corresponde, no se transporta la mercancía.", evaluan: "Que digas las dos mitades: se repone, y sin certeza no vuela." },
  { n: 9, pregunta: "¿Cuáles son los niveles de permiso para transportar una mercancía peligrosa?", respuesta: "Prohibido en todos los casos; prohibido salvo dispensa; permitido con aprobación cuando las Instrucciones lo prevén; permitido cumpliendo las Instrucciones. Antes de todo, el criterio material: lo que explota, arde o emite vapores peligrosos en condiciones normales no vuela.", evaluan: "Que conozcas la escala y que la lista no es exhaustiva." },
  { n: 10, pregunta: "¿Qué diferencia hay entre aprobación, dispensa y excepción?", respuesta: "La aprobación la da la autoridad cuando las Instrucciones Técnicas prevén que ese caso puede ir con aprobación; la dispensa la da también la autoridad y exime de lo previsto en las Instrucciones cuando no existe esa referencia, por extrema urgencia, porque otro modo no sea apropiado o por interés público; la excepción no se pide a nadie: ya está escrita en la norma.", evaluan: "Que separes tres palabras que casi todos mezclan." },
  { n: 11, pregunta: "¿Qué limitaciones añade tu país por su cuenta?", respuesta: "Primero el mecanismo: cada Estado notifica sus diferencias a la OACI y se publican en las Instrucciones; el explotador debe cumplir las de los Estados que opera o sobrevuela y el expedidor las de todos los involucrados. Después el ejemplo: Colombia prohíbe todo en aviación civil privada y la clase 3 combustibles en monomotores, y exige autorización del Servicio Geológico Colombiano para el radiactivo; Brasil pide portugués en las marcas domésticas y aprobación de la CNEN para el radiactivo. Ten lista la de tu reglamento.", evaluan: "Que sepas que existen, dónde se publican y cuál te aplica a ti." },
  { n: 12, pregunta: "¿Qué puede llevar un pasajero y dónde está escrito?", respuesta: "La regla es prohibición general; la única excepción es la tabla de las Instrucciones Técnicas con lo que puede llevar un pasajero, cumpliendo todos sus requisitos. Los tripulantes tienen la misma regla. Repuestos y power banks solo en cabina; las cifras exactas, en la edición vigente.", evaluan: "Que no cites cifras de memoria como si fueran norma: que sepas dónde están." },
  { n: 13, pregunta: "¿Qué es una mercancía peligrosa oculta?", respuesta: "Carga declarada con descripción general que debió declararse como peligrosa, o mercancía prohibida o en exceso en el equipaje, en la persona o en el correo. «Repuestos», «muestras», «material de la compañía» son las descripciones que deben hacer dudar.", evaluan: "Que conectes la definición con ValuJet." },
  { n: 14, pregunta: "¿Qué condiciones exige el reglamento para aceptar mercancías peligrosas?", respuesta: "Documento de transporte debidamente diligenciado e inspección del bulto conforme a las Instrucciones, con lista de verificación. Y el explotador necesita la autorización en sus OpSpecs.", evaluan: "Que sepas que la aceptación tiene dos condiciones acumulativas." },
  { n: 15, pregunta: "¿Qué prohibiciones de estiba debe conocer el comandante?", respuesta: "Nada de mercancías peligrosas en la cabina de pasajeros ni en el puesto de pilotaje; ningún bulto «Exclusivamente en aeronaves de carga» en un avión con pasajeros; y en carguero, esos bultos donde un tripulante pueda verlos, manipularlos y separarlos en vuelo.", evaluan: "Las tres. Y la razón: South African 295." },
  { n: 16, pregunta: "¿Qué es la segregación y de dónde sale?", respuesta: "Que los bultos capaces de reaccionar peligrosamente entre sí no se estiben juntos ni donde puedan entrar en contacto si hay pérdidas. Se aplica la tabla de segregación de las Instrucciones, y otra específica para los explosivos. El radiactivo va separado de personas, animales vivos y películas no reveladas.", evaluan: "Que sepas que existe una tabla y que el criterio es «si hay pérdidas»." },
  { n: 17, pregunta: "¿Qué es el NOTOC y qué exige la norma sobre él?", respuesta: "La información escrita al piloto al mando sobre las mercancías peligrosas a bordo. Por escrito, lo antes posible antes de la salida, firmada por el comandante antes de que se transporten, al alcance durante el vuelo, a disposición de los aeródromos de última salida y próxima llegada, con copia conservada en tierra, y en inglés además de los idiomas del Estado de origen en transporte internacional.", evaluan: "Los siete requisitos. Es la pregunta central." },
  { n: 18, pregunta: "¿Cuándo firma el comandante el NOTOC?", respuesta: "Antes de que las mercancías sean transportadas. No en crucero, no al llegar.", evaluan: "Que no dudes en el momento." },
  { n: 19, pregunta: "¿Qué revisas antes de firmar?", respuesta: "Que estén el NOTOC y la declaración del expedidor; que ningún CAO vaya en un vuelo con pasajeros y nada en cabina; que el UN, la designación, la clase, el grupo de embalaje y la cantidad coincidan entre la declaración, el NOTOC y la lista; y dónde va cada bulto y qué tiene al lado. Si no cuadra, no se firma.", evaluan: "Que la firma sea una verificación y no un recibido." },
  { n: 20, pregunta: "¿Qué exige el reglamento que exista antes de una emergencia con mercancías peligrosas?", respuesta: "Información de respuesta disponible de inmediato para el piloto al mando, tripulación al corriente de las medidas, y el equipo de respuesta a bordo con instrucción para usarlo.", evaluan: "Que separes lo que es información de lo que es equipo." },
  { n: 21, pregunta: "¿Cuál es el contenido mínimo del equipo de respuesta de emergencia?", respuesta: "Bolsas grandes de polietileno de buena calidad, ligaduras para las bolsas y guantes largos de goma. Es de contención, no de extinción.", evaluan: "Dato de examen, literal." },
  { n: 22, pregunta: "Hay humo en cabina y sospechas de la carga. ¿Qué haces?", respuesta: "Volar primero: control, oxígeno, humo según el QRH. Identificar con el NOTOC, que está al alcance en vuelo. Contener con el QRH y el equipo. Declarar e informar al ATS tan pronto la situación lo permita, para que avise a la administración aeroportuaria. Desviar al aeródromo adecuado más cercano. Después, informar a los servicios de emergencia y notificar.", evaluan: "El orden de las decisiones y que el aviso al ATS no es opcional." },
  { n: 23, pregunta: "¿Qué se notifica y a quién?", respuesta: "Accidentes e incidentes; mercancías no declaradas o mal declaradas en carga o correo; no permitidas en equipaje o en la persona; y lo transportado mal cargado, segregado o sin información al piloto al mando. Se notifica a las autoridades que corresponda del Estado del explotador y del Estado donde ocurrió el suceso: en un vuelo internacional pueden ser dos. Descubrir una oculta ya es un suceso.", evaluan: "Que sepas que se notifica aunque no haya pasado nada." },
  { n: 24, pregunta: "¿Qué relación hay entre mercancías peligrosas y el SMS?", respuesta: "El transporte de mercancías peligrosas entra en el ámbito de aplicación del SMS del explotador: no es un trámite aparte. Y las autoridades recopilan hasta los incumplimientos que no llegan a incidente ni accidente, para trabajar de forma predictiva y proactiva.", evaluan: "Que veas la notificación como dato del sistema, no como castigo." },
  { n: 25, pregunta: "¿Cada cuánto debe recibir instrucción un piloto en mercancías peligrosas?", respuesta: "Como mínimo cada 24 meses, verificada o impartida al contratar, y el explotador mantiene el programa tenga o no autorización para transportarlas. Además está en el reglamento de licencias de cada país: en Colombia se exige dentro de los entrenamientos periódicos, con frecuencia no mayor a dos años, y figura entre los conocimientos del piloto comercial y del de línea aérea. Las horas por cargo las fija cada reglamento nacional y las aprueba la autoridad.", evaluan: "Que sepas que es un requisito reglamentario, no una política de la aerolínea." },
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
