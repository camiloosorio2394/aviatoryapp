import type { EjemploPsico, EjercicioPsico } from "@/lib/psicotecnicas"

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
 * Están recortadas del PDF original por scripts/psicotecnicas/extraer-figuras.mjs
 * y no se redibujaron, porque redibujar es cambiar el ejercicio.
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
      "A continuación se muestra un papel que ha sido plegado y agujereado según se muestra. Elige, entre las respuestas, la que se ajusta al papel una vez desplegado completamente:",
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
      "Indica qué figura, de las 4 opciones, corresponde a la figura descompuesta de la izquierda:",
    imagen: "/psicotecnicas/espacial/ES-E1-06.webp",
    imagenAlt:
      "Dos piezas sueltas a la izquierda y cuatro montajes posibles A a D dentro de recuadros.",
    opciones: ["A", "B", "C", "D"],
    opcionesEnImagen: true,
    respuesta: 0,
    explicacion:
      "Se montan las piezas sin girarlas más de lo que permite el enunciado y se comprueba que ninguna se solape ni sobre material. Las opciones B, C y D exigen deformar o duplicar alguna de las dos piezas; la A las usa tal cual.",
    tiempo: 45,
    fuente: "Test razonamiento espacial (670006116), ej. 6",
  },
  {
    id: "ES-E1-07",
    categoria: "espacial",
    subcategoria: "Transformación de figuras",
    nivel: "intermedio",
    enunciado:
      "Decide cuál de las 4 vistas corresponde a la figura resultante de la izquierda una vez sumadas:",
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
    enunciado: "Completa la figura con una de las opciones:",
    imagen: "/psicotecnicas/espacial/ES-E1-08.webp",
    imagenAlt:
      "Una mancha blanca sobre fondo negro a la que le falta un trozo, y cuatro parches A a D.",
    opciones: ["A", "B", "C", "D"],
    opcionesEnImagen: true,
    respuesta: 0,
    explicacion:
      "El truco es mirar el borde por donde se corta, no el interior del parche: la línea de la mancha tiene que continuar sin salto al colocar la pieza. Solo la A empalma el contorno; las demás dejan un escalón visible.",
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
      "Tres de las cuatro son el mismo fragmento del modelo girado; la cuarta está espejada, y una figura espejada no se obtiene girando en el plano. Ese es el criterio que la delata: la D.",
    tiempo: 45,
    fuente: "Test razonamiento espacial (670006116), ej. 9",
  },
  {
    id: "ES-E1-10",
    categoria: "espacial",
    subcategoria: "Relaciones espaciales",
    nivel: "intermedio",
    enunciado:
      "Al puzle le faltan dos piezas, una de ellas está a la derecha del mismo. ¿Cuál de las cuatro piezas de la derecha es la otra pieza que completa el puzle?",
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
      "Indique cuál, de las cuatro respuestas, corresponde a la figura original una vez que se le extraiga el trozo indicado:",
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
      "Indique cuál, de las cuatro respuestas, corresponde a la figura original una vez que se le extraiga el trozo indicado:",
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
      "¿Cuántas veces la figura de la izquierda taparía los huecos de la figura de la derecha?",
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
      "¿Cuántas veces la figura de la izquierda taparía los huecos de la figura de la derecha?",
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
      "En la siguiente figura, calcule la menor cantidad de cubitos que faltan para construir un cubo sólido.",
    imagen: "/psicotecnicas/espacial/ES-E2-07.webp",
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
    imagen: "/psicotecnicas/espacial/ES-E2-08.webp",
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
    imagen: "/psicotecnicas/espacial/ES-E2-09.webp",
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
    enunciado: "De acuerdo al gráfico, ¿cuál es la cantidad de puntos no visibles?",
    imagen: "/psicotecnicas/espacial/ES-E2-10.webp",
    imagenAlt: "Dos dados apilados uno sobre otro, encima de una mesa.",
    opciones: ["25", "26", "24", "22", "20"],
    respuesta: 0,
    explicacion:
      "Un dado suma 1 + 2 + 3 + 4 + 5 + 6 = 21 puntos, así que los dos juntos suman 42. No visibles son todas las caras que no se ven: las tres traseras de cada dado, la que apoya en la mesa y las dos caras que quedan pegadas entre los dos dados. Restando los 17 puntos a la vista de los 42 totales quedan 25.",
    tiempo: 75,
    fuente: "Test de razonamiento espacial (667045629), pregunta 10",
  },
]

/**
 * Ejercicios resueltos: la fuente los publica con la respuesta ya señalada, así
 * que no pueden preguntarse, pero sí enseñan. Van en el modo entrenamiento,
 * antes de que el piloto se enfrente a los que sí puntúan.
 */
export const EJEMPLOS_ESPACIAL: EjemploPsico[] = [
  {
    id: "EJ-E2-04",
    categoria: "espacial",
    titulo: "Despliegue de un cubo con números",
    imagen: "/psicotecnicas/espacial/ES-E2-ejemplo-04.webp",
    imagenAlt: "Desarrollo de un cubo con los números 1, 2, 3, 4 y 6, y cuatro cubos plegados.",
    respuesta:
      "La A. Al plegar, la cara del 1 y la del 3 quedan opuestas, así que ningún cubo puede mostrar las dos a la vez.",
    fuente: "Test de razonamiento espacial (667045629), pregunta 1",
  },
  {
    id: "EJ-E2-05",
    categoria: "espacial",
    titulo: "Despliegue de un dado por puntos",
    imagen: "/psicotecnicas/espacial/ES-E2-ejemplo-05.webp",
    imagenAlt: "Desarrollo de un dado marcado con puntos y cuatro dados plegados.",
    respuesta:
      "La C. En un dado las caras opuestas suman siete, y esa regla descarta sola tres de las cuatro alternativas.",
    fuente: "Test de razonamiento espacial (667045629), pregunta 2",
  },
  {
    id: "EJ-E2-06",
    categoria: "espacial",
    titulo: "Despliegue con flechas y símbolos",
    imagen: "/psicotecnicas/espacial/ES-E2-ejemplo-06.webp",
    imagenAlt: "Desarrollo con un cuadrado, un triángulo y dos flechas, y cuatro cubos plegados.",
    respuesta:
      "La D. Con las flechas no basta con que la cara sea la correcta: tiene que apuntar hacia donde queda al cerrar el cubo.",
    fuente: "Test de razonamiento espacial (667045629), pregunta 3",
  },
  {
    id: "EJ-E2-07",
    categoria: "espacial",
    titulo: "Despliegue con cuatro símbolos",
    imagen: "/psicotecnicas/espacial/ES-E2-ejemplo-07.webp",
    imagenAlt: "Desarrollo con triángulo, círculo, estrella y cuadrado, y cuatro cubos plegados.",
    respuesta:
      "La C. Se comprueba con un par de caras contiguas: las que en el desarrollo comparten arista tienen que seguir compartiéndola en el cubo.",
    fuente: "Test de razonamiento espacial (667045629), pregunta 4",
  },
  {
    id: "EJ-E2-08",
    categoria: "espacial",
    titulo: "Del cubo al desarrollo",
    imagen: "/psicotecnicas/espacial/ES-E2-ejemplo-08.webp",
    imagenAlt: "Un cubo con las caras divididas en triángulos negros y cinco desarrollos posibles.",
    respuesta:
      "La A. Aquí el camino es el inverso: se parte del cubo y se busca el desarrollo, vigilando la orientación de cada triángulo.",
    fuente: "Test de razonamiento espacial (667045629), pregunta 5",
  },
  {
    id: "EJ-E2-09",
    categoria: "espacial",
    titulo: "Qué sólido forma el desarrollo",
    imagen: "/psicotecnicas/espacial/ES-E2-ejemplo-09.webp",
    imagenAlt: "Un desarrollo con puntos, cruz, línea y asterisco, y cinco sólidos posibles.",
    respuesta:
      "La B. Con cinco alternativas conviene descartar por pares de caras opuestas antes de intentar plegar entero.",
    fuente: "Test de razonamiento espacial (667045629), pregunta 6",
  },
  {
    id: "EJ-E2-14",
    categoria: "espacial",
    titulo: "Rotación de 90 grados",
    imagen: "/psicotecnicas/espacial/ES-E2-ejemplo-14.webp",
    imagenAlt: "Dos siluetas de perro en un recuadro y cuatro rotaciones posibles.",
    respuesta:
      "La B. Girar no es reflejar: dos de las opciones son la figura espejada, que nunca se obtiene rotando en el plano.",
    fuente: "Test de razonamiento espacial (667045629), pregunta 11",
  },
  {
    id: "EJ-E2-15",
    categoria: "espacial",
    titulo: "Despliegue de una caja",
    imagen: "/psicotecnicas/espacial/ES-E2-ejemplo-15.webp",
    imagenAlt: "Desarrollo de una caja con caras trapezoidales y cuatro cajas formadas.",
    respuesta:
      "La C. Cuando las caras no son cuadradas hay que mirar también las proporciones: la caja resultante conserva el ancho de cada trapecio.",
    fuente: "Test de razonamiento espacial (667045629), pregunta 12",
  },
]

/**
 * Las dos láminas de teoría de la lección.
 *
 * Están dibujadas para Aviatory, no recortadas de la fuente. La 667045629
 * enseña lo mismo, pero con la marca de agua de su autor encima y con la
 * numeración de caras de su propio ejemplo; aquí el desarrollo va con las tres
 * parejas opuestas en su color, que es lo que hace la regla evidente de un
 * vistazo. Se generan con scripts/psicotecnicas/generar-visuales.mjs.
 */
export const TEORIA_CUBO = [
  {
    id: "TE-CUBO-01",
    titulo: "Del cubo al desarrollo",
    imagen: "/modulos/psicotecnicas/cubo-desarrollo.webp",
    imagenAlt:
      "Cuatro pasos: el cubo plegado, la cara de arriba levantándose, una cara lateral abatida, y el desarrollo en cruz.",
    pie: "Ver la transición completa es lo que permite después hacerla de cabeza, en los dos sentidos. Casi todo el razonamiento espacial de un proceso de selección es esta operación, con prisa.",
  },
  {
    id: "TE-CUBO-02",
    titulo: "Qué caras no pueden ir juntas",
    imagenAlt:
      "Desarrollo en cruz con las caras 1 a 6; las parejas opuestas 1-6, 2-4 y 3-5 van cada una de un color, y ninguna pareja aparece en casillas contiguas.",
    imagen: "/modulos/psicotecnicas/cubo-caras-opuestas.webp",
    pie: "La regla que resuelve la mitad de estos ejercicios: al plegar, las caras opuestas nunca quedan juntas. En esta cruz se oponen 1 con 6, 2 con 4 y 3 con 5, y por eso ninguna pareja del mismo color está pegada. Si una alternativa muestra dos caras de la misma pareja a la vez, se descarta sin plegar nada.",
  },
]
