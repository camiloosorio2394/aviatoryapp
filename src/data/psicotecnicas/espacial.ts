import type { EjercicioPsico } from "@/lib/psicotecnicas"

/**
 * Razonamiento espacial — 18 ejercicios.
 *
 * Dos fuentes, y cada una aporta lo que puede:
 *
 * — «Test razonamiento espacial» (670006116), 14 preguntas con su clave al
 *   final del documento. Es la columna vertebral de la categoría: plegado de
 *   cubos, vistas, encajes, sustracción de volumen y composición de áreas.
 *
 * — «Test de razonamiento espacial» (667045629), del que solo entran cuatro.
 *   Ese material viene con la respuesta ya marcada encima de las opciones, así
 *   que la mayoría no sirve como pregunta: se ve la solución antes de pensarla.
 *   Los cuatro que sí entran son los que llevan las opciones en una lista de
 *   texto aparte de la figura, de modo que la figura se recorta limpia y las
 *   alternativas se transcriben. Los demás viven en EJEMPLOS_ESPACIAL, que es
 *   lo que de verdad son: ejercicios resueltos.
 *
 * Las figuras son el ejercicio: sin ellas el enunciado no se puede responder.
 * Los recortes salen del PDF original por scripts/psicotecnicas/extraer-figuras.mjs.
 * E1-01 a E1-14 son excepciones visuales: se redibujaron desde las páginas 1
 * a 5 para separar y ampliar las alternativas sin cambiar su respuesta.
 */
export const ESPACIAL: EjercicioPsico[] = [
  {
    id: "ES-E1-01",
    categoria: "espacial",
    subcategoria: "Desarrollo de objetos",
    nivel: "intermedio",
    enunciado: "¿Qué figura corresponde al cubo desplegado?",
    imagen: "/psicotecnicas/espacial/ES-E1-01.webp",
    imagenAlt:
      "Un cubo con una estrella de cuatro puntas, un triángulo negro y dos cuadros pequeños, y cuatro desarrollos en cruz como alternativas A a D.",
    opciones: ["A", "B", "C", "D"],
    opcionesEnImagen: true,
    respuesta: 2,
    explicacion:
      "El método es descartar, no imaginar el cubo entero de una vez. Se toman dos caras que en el cubo compartan arista y se comprueba si en el desarrollo pueden llegar a tocarse; además, dos caras opuestas del cubo nunca pueden aparecer pegadas en el desarrollo. Aplicando eso a la posición relativa de la estrella, el triángulo negro y los dos cuadros pequeños, la única que sobrevive es la C.",
    tiempo: 45,
    fuente: "Test razonamiento espacial (670006116), ej. 1",
  },
  {
    id: "ES-E1-02",
    categoria: "espacial",
    subcategoria: "Relaciones espaciales",
    nivel: "basico",
    enunciado: "Indica qué figura, entre las mostradas, encaja en el hueco de la figura de la izquierda.",
    imagen: "/psicotecnicas/espacial/ES-E1-02.webp",
    imagenAlt:
      "Un recuadro oscuro con un hueco en forma de cinta con dos remates, y cuatro figuras candidatas A a D con pequeñas diferencias entre sí.",
    opciones: ["A", "B", "C", "D"],
    opcionesEnImagen: true,
    respuesta: 2,
    explicacion:
      "El hueco y la pieza son la misma silueta, así que conviene fijar un detalle pequeño y comparar solo ese: el remate cuadrado del extremo derecho y el grosor de la cinta. Tres opciones cambian uno de los dos; la C reproduce el hueco exactamente.",
    tiempo: 45,
    fuente: "Test razonamiento espacial (670006116), ej. 2",
  },
  {
    id: "ES-E1-03",
    categoria: "espacial",
    subcategoria: "Cubos",
    nivel: "intermedio",
    enunciado: "¿Qué figura corresponde al cubo una vez plegado?",
    imagen: "/psicotecnicas/espacial/ES-E1-03.webp",
    imagenAlt:
      "Un desarrollo plano con un triángulo negro y dos cuadros pequeños, y cuatro cubos ya plegados como alternativas A a D.",
    opciones: ["A", "B", "C", "D"],
    opcionesEnImagen: true,
    respuesta: 2,
    explicacion:
      "Al plegar hay que vigilar el sentido de giro: una cara puede aparecer con el dibujo correcto pero espejado, y eso la invalida. Siguiendo hacia dónde queda el vértice del triángulo negro respecto de los dos cuadros al cerrar el cubo, la C es la única con la orientación posible.",
    tiempo: 45,
    fuente: "Test razonamiento espacial (670006116), ej. 3",
  },
  {
    id: "ES-E1-04",
    categoria: "espacial",
    subcategoria: "Perspectiva",
    nivel: "intermedio",
    enunciado: "¿Qué vista corresponde a la dirección indicada en la pieza de la izquierda?",
    imagen: "/psicotecnicas/espacial/ES-E1-04.webp",
    imagenAlt:
      "Una pieza tridimensional escalonada con una flecha que indica la dirección de observación, y cuatro vistas planas A a D.",
    opciones: ["A", "B", "C", "D"],
    opcionesEnImagen: true,
    respuesta: 0,
    explicacion:
      "En una vista, lo que se dibuja es la silueta más las aristas que quedan de frente; la profundidad desaparece. Proyectando la pieza en la dirección de la flecha, el escalón se convierte en una línea horizontal interior y el contorno queda rectangular: eso es la A.",
    tiempo: 45,
    fuente: "Test razonamiento espacial (670006116), ej. 4",
  },
  {
    id: "ES-E1-05",
    categoria: "espacial",
    subcategoria: "Transformación de figuras",
    nivel: "avanzado",
    enunciado:
      "Tras doblar y perforar el papel como indica la figura, ¿cómo quedan los agujeros al abrirlo por completo?",
    imagen: "/psicotecnicas/espacial/ES-E1-05.webp",
    imagenAlt:
      "Un papel doblado en diagonal con perforaciones, y cuatro cuadrículas A a D con distintas distribuciones de agujeros.",
    opciones: ["A", "B", "C", "D"],
    opcionesEnImagen: true,
    respuesta: 0,
    explicacion:
      "Cada pliegue duplica los agujeros por simetría respecto de la línea de doblez, así que conviene desplegar mentalmente en orden inverso, un doblez a la vez. Cada agujero hecho sobre el papel doblado aparece reflejado al otro lado del eje. La distribución simétrica resultante es la A.",
    tiempo: 60,
    fuente: "Test razonamiento espacial (670006116), ej. 5",
  },
  {
    id: "ES-E1-06",
    categoria: "espacial",
    subcategoria: "Desarrollo de objetos",
    nivel: "intermedio",
    enunciado:
      "¿Qué montaje se puede formar con las tres piezas de la izquierda, sin cambiar sus formas?",
    imagen: "/psicotecnicas/espacial/ES-E1-06.webp",
    imagenAlt:
      "Tres piezas sueltas a la izquierda y cuatro montajes posibles A a D dentro de recuadros.",
    opciones: ["A", "B", "C", "D"],
    opcionesEnImagen: true,
    respuesta: 0,
    explicacion:
      "Se montan las tres piezas conservando sus contornos y se comprueba que ninguna se solape ni sobre material. Las opciones B, C y D alteran o colocan mal algún trazo; la A conserva la combinación mostrada.",
    tiempo: 45,
    fuente: "Test razonamiento espacial (670006116), ej. 6",
  },
  {
    id: "ES-E1-07",
    categoria: "espacial",
    subcategoria: "Transformación de figuras",
    nivel: "intermedio",
    enunciado:
      "Si superpones los dos trazos de la izquierda sin girarlos, ¿qué figura obtienes?",
    imagen: "/psicotecnicas/espacial/ES-E1-07.webp",
    imagenAlt:
      "Dos trazos curvos a la izquierda que deben superponerse, y cuatro resultados posibles A a D.",
    opciones: ["A", "B", "C", "D"],
    opcionesEnImagen: true,
    respuesta: 0,
    explicacion:
      "Sumar figuras es superponerlas conservando la posición de cada una: no se gira ni se reescala nada. Al encajar los dos trazos en su sitio, el perfil que sale es el de la A; las otras tres alteran la posición relativa de una de las dos partes.",
    tiempo: 45,
    fuente: "Test razonamiento espacial (670006116), ej. 7",
  },
  {
    id: "ES-E1-08",
    categoria: "espacial",
    subcategoria: "Relaciones espaciales",
    nivel: "basico",
    enunciado: "¿Qué opción reproduce la silueta blanca del modelo?",
    imagen: "/psicotecnicas/espacial/ES-E1-08.webp",
    imagenAlt:
      "Una silueta blanca sobre fondo oscuro y cuatro siluetas negras A a D para comparar.",
    opciones: ["A", "B", "C", "D"],
    opcionesEnImagen: true,
    respuesta: 0,
    explicacion:
      "Hay que comparar la silueta completa, incluidos los salientes pequeños y los dos puntos separados de abajo. A conserva esas posiciones y tamaños; en las demás cambia al menos uno de esos detalles.",
    tiempo: 45,
    fuente: "Test razonamiento espacial (670006116), ej. 8",
  },
  {
    id: "ES-E1-09",
    categoria: "espacial",
    subcategoria: "Rotación mental",
    nivel: "intermedio",
    enunciado: "¿Qué figura no coincide con el modelo?",
    imagen: "/psicotecnicas/espacial/ES-E1-09.webp",
    imagenAlt:
      "Un modelo de hexágonos blancos y negros a la izquierda y cuatro tiras A a D, una de las cuales no encaja.",
    opciones: ["A", "B", "C", "D"],
    opcionesEnImagen: true,
    respuesta: 3,
    explicacion:
      "A, B y C reproducen franjas del modelo. En D, la separación blanca entre la punta de la figura superior y la figura inferior es mayor que en la franja correspondiente; esa distancia la delata.",
    tiempo: 45,
    fuente: "Test razonamiento espacial (670006116), ej. 9",
  },
  {
    id: "ES-E1-10",
    categoria: "espacial",
    subcategoria: "Relaciones espaciales",
    nivel: "intermedio",
    enunciado:
      "Al puzle le faltan dos piezas. Una ya está identificada a la derecha: ¿cuál de las otras cuatro completa el espacio restante?",
    imagen: "/psicotecnicas/espacial/ES-E1-10.webp",
    imagenAlt:
      "Un puzle incompleto, la pieza que ya se sabe que encaja, y cuatro candidatas A a D.",
    opciones: ["A", "B", "C", "D"],
    opcionesEnImagen: true,
    respuesta: 2,
    explicacion:
      "Primero se coloca la pieza que ya viene dada: eso fija qué salientes y entrantes quedan libres en el hueco restante. La pieza buscada tiene que ser el negativo exacto de ese hueco en sus cuatro lados, y solo la C lo cumple.",
    tiempo: 60,
    fuente: "Test razonamiento espacial (670006116), ej. 10",
  },
  {
    id: "ES-E1-11",
    categoria: "espacial",
    subcategoria: "Visualización tridimensional",
    nivel: "avanzado",
    enunciado:
      "Si retiras el fragmento señalado de la pieza original, ¿qué forma queda?",
    imagen: "/psicotecnicas/espacial/ES-E1-11.webp",
    imagenAlt:
      "Una pieza tridimensional original, el trozo que se le extrae, y cuatro resultados posibles A a D.",
    opciones: ["A", "B", "C", "D"],
    opcionesEnImagen: true,
    respuesta: 1,
    explicacion:
      "Restar volumen deja huecos, y el hueco tiene exactamente la forma del trozo extraído. Conviene localizar dónde encajaba el trozo en la pieza y comprobar en cada opción que la cavidad tenga esa forma y esa posición, no solo un vacío parecido. La B es la única que coincide.",
    tiempo: 60,
    fuente: "Test razonamiento espacial (670006116), ej. 11",
  },
  {
    id: "ES-E1-12",
    categoria: "espacial",
    subcategoria: "Visualización tridimensional",
    nivel: "avanzado",
    enunciado:
      "¿Cuál es el sólido que queda tras extraer el fragmento indicado?",
    imagen: "/psicotecnicas/espacial/ES-E1-12.webp",
    imagenAlt:
      "Una pieza tridimensional con un cilindro, el trozo extraído, y cuatro resultados posibles A a D.",
    opciones: ["A", "B", "C", "D"],
    opcionesEnImagen: true,
    respuesta: 3,
    explicacion:
      "Mismo procedimiento que el anterior, pero aquí el trozo se lleva parte del cilindro: hay que comprobar tanto la cavidad prismática como lo que queda del cuerpo redondo. La D es la única que respeta las dos cosas a la vez.",
    tiempo: 60,
    fuente: "Test razonamiento espacial (670006116), ej. 12",
  },
  {
    id: "ES-E1-13",
    categoria: "espacial",
    subcategoria: "Relaciones espaciales",
    nivel: "intermedio",
    enunciado:
      "Si usas la pieza de la izquierda como unidad de superficie, ¿cuántas necesitas para cubrir las zonas blancas de la derecha?",
    imagen: "/psicotecnicas/espacial/ES-E1-13.webp",
    imagenAlt:
      "Un triángulo gris a la izquierda y, a la derecha, un rectángulo con varios huecos blancos de formas angulosas.",
    opciones: ["4", "5", "6", "7"],
    respuesta: 2,
    explicacion:
      "No se cuentan los huecos: se compara superficie. Se toma el triángulo como unidad y se ve cuántas veces cabe en el área blanca total, admitiendo que se le gire y que un hueco grande se cubra con varias copias. El resultado son 6.",
    tiempo: 60,
    fuente: "Test razonamiento espacial (670006116), ej. 13",
  },
  {
    id: "ES-E1-14",
    categoria: "espacial",
    subcategoria: "Relaciones espaciales",
    nivel: "avanzado",
    enunciado:
      "¿Cuántas copias de la pieza de la izquierda equivalen al área blanca total de la figura derecha?",
    imagen: "/psicotecnicas/espacial/ES-E1-14.webp",
    imagenAlt:
      "Un paralelogramo alargado a la izquierda y, a la derecha, un rectángulo gris con huecos blancos en forma de estrella y cuñas.",
    opciones: ["8", "7", "6", "5"],
    respuesta: 1,
    explicacion:
      "Igual que el anterior, por área y no por número de huecos: la pieza es más estrecha, así que entra varias veces en cada hueco grande. Cubriendo toda la superficie blanca salen 7.",
    tiempo: 60,
    fuente: "Test razonamiento espacial (670006116), ej. 14",
  },
  {
    id: "ES-E2-07",
    categoria: "espacial",
    subcategoria: "Cubos",
    nivel: "intermedio",
    enunciado:
      "¿Cuántos cubitos faltan, como mínimo, para completar un cubo sólido que contenga toda esta figura?",
    imagen: "/psicotecnicas/espacial/ES-E2-07-limpio.webp",
    imagenAlt: "Un montaje de seis cubitos formando una figura en ele sobre dos niveles.",
    opciones: ["12", "17", "19", "20", "21"],
    respuesta: 4,
    explicacion:
      "El cubo sólido más pequeño que puede contener la figura es de 3 × 3 × 3, es decir 27 cubitos. La figura tiene 6, así que faltan 27 − 6 = 21. La clave está en no dar por buena una caja de 2 × 2 × 2: la pieza es demasiado larga para caber en ella.",
    tiempo: 60,
    fuente: "Test de razonamiento espacial (667045629), pregunta 7",
  },
  {
    id: "ES-E2-08",
    categoria: "espacial",
    subcategoria: "Cubos",
    nivel: "intermedio",
    enunciado: "¿Cuántos cubos se pueden contar en la siguiente figura?",
    imagen: "/psicotecnicas/espacial/ES-E2-08-limpio.webp",
    imagenAlt: "Un montaje escalonado de cubos en varios niveles, visto en perspectiva.",
    opciones: ["15", "16", "17", "18", "19"],
    respuesta: 2,
    explicacion:
      "Se cuenta por capas, de abajo hacia arriba, y no de un vistazo. En un montaje en perspectiva siempre hay cubos que sostienen a los de arriba y no se ven: si un cubo está apoyado en el aire, debajo hay otro que hay que sumar. El total es 17.",
    tiempo: 60,
    fuente: "Test de razonamiento espacial (667045629), pregunta 8",
  },
  {
    id: "ES-E2-09",
    categoria: "espacial",
    subcategoria: "Cubos",
    nivel: "intermedio",
    enunciado: "¿Cuántos cubos se emplearon en la siguiente construcción?",
    imagen: "/psicotecnicas/espacial/ES-E2-09-limpio.webp",
    imagenAlt: "Una construcción de cubos con huecos, algunos en sombra, vista en perspectiva.",
    opciones: ["17", "18", "16", "13", "14"],
    respuesta: 4,
    explicacion:
      "Aquí los huecos son la trampa: la construcción no es un bloque lleno y hay que descontar lo que falta, capa por capa. Contando lo que realmente hay, incluidos los cubos ocultos que sirven de apoyo, se emplearon 14.",
    tiempo: 60,
    fuente: "Test de razonamiento espacial (667045629), pregunta 9",
  },
  {
    id: "ES-E2-10",
    categoria: "espacial",
    subcategoria: "Dados",
    nivel: "avanzado",
    enunciado: "Entre los dos dados, ¿cuántos puntos hay en las caras que no se ven?",
    imagen: "/psicotecnicas/espacial/ES-E2-10-limpio.webp",
    imagenAlt: "Dos dados apilados sobre una mesa: cada frente muestra cinco puntos, cada lado derecho tres y la cara superior visible uno.",
    opciones: ["25", "26", "24", "22", "20"],
    respuesta: 0,
    explicacion:
      "Cada dado suma 1 + 2 + 3 + 4 + 5 + 6 = 21 puntos; entre los dos hay 42. En la lámina se ven cinco caras: dos frentes de 5, dos lados de 3 y una cara superior de 1. Eso suma 5 + 5 + 3 + 3 + 1 = 17 puntos visibles. Los demás, incluidas las caras de contacto y las que miran hacia atrás o hacia la mesa, suman 42 − 17 = 25.",
    tiempo: 75,
    fuente: "Test de razonamiento espacial (667045629), pregunta 10",
  },
]
