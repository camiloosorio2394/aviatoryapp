import type { EjercicioPsico } from "@/lib/psicotecnicas"
import { FIGURAS_A1 } from "./figurasA1"
import { LAMINAS_LIMPIAS } from "./laminasLimpias"

/**
 * Razonamiento abstracto — 20 ejercicios de series de figuras.
 *
 * Fuente: «Razonamiento Abstracto — Series de figuras» (documento 554759531,
 * Centro de Nivelación MARPID), que trae su propia hoja de soluciones para los
 * veinte. Todos comparten formato: una matriz de tres por tres a la que le
 * falta la última casilla y cinco alternativas, de la A a la E.
 *
 * Las respuestas son las del documento. Las explicaciones nombran qué atributos
 * varían en cada matriz y con qué método se aísla cada uno, que es como se
 * resuelven de verdad estos ejercicios: no adivinando la figura entera, sino
 * separando las dos o tres cosas que cambian y siguiéndolas por filas y
 * columnas hasta ver cuál es la combinación que todavía no ha salido.
 */

const ENUNCIADO = "¿Qué figura continúa la serie?"
const OPCIONES = ["A", "B", "C", "D", "E"]

/** Todos comparten enunciado y formato, así que la ficha se arma con esto. */
function serie(
  n: number,
  subcategoria: string,
  nivel: EjercicioPsico["nivel"],
  respuesta: number,
  imagenAlt: string,
  explicacion: string
): EjercicioPsico {
  const id = `AB-A1-${String(n).padStart(2, "0")}`
  // Los que ya están dibujados llevan su figura y sus alternativas sueltas;
  // los que todavía no, siguen con el recorte y sus opciones dentro del pixel.
  const figura = FIGURAS_A1[id]
  // Mientras una lámina no esté dibujada se enseña su recorte, y del recorte
  // se enseña la versión sin el logotipo de Facebook cuando se pudo quitar sin
  // morder el ejercicio. El original se queda en el repositorio como prueba.
  const lamina = LAMINAS_LIMPIAS.has(id) ? `${id}-limpio` : id
  return {
    id,
    categoria: "abstracto",
    subcategoria,
    nivel,
    enunciado: ENUNCIADO,
    imagen: `/psicotecnicas/abstracto/${lamina}.webp`,
    imagenAlt,
    opciones: OPCIONES,
    ...(figura ? { figura } : { opcionesEnImagen: true }),
    respuesta,
    explicacion,
    tiempo: nivel === "basico" ? 45 : nivel === "intermedio" ? 60 : 75,
    fuente: `Razonamiento Abstracto — Series de figuras (554759531), problema ${String(n).padStart(2, "0")}/20`,
  }
}

/** Cierre común: cómo se ataca una matriz de tres por tres. */
const METODO =
  "El método es siempre el mismo: se separa cada atributo y se sigue por filas y por columnas; " +
  "la casilla que falta es la combinación que todavía no ha aparecido."

export const ABSTRACTO: EjercicioPsico[] = [
  serie(
    1,
    "Secuencias de figuras",
    "basico",
    2,
    "Matriz de rectángulos con un triángulo inscrito; varían un segmento vertical desde el vértice y unos trazos cortos en las esquinas de la base.",
    `Solo cambian dos cosas: si está o no el segmento vertical que baja del vértice, y en qué esquinas de la base aparecen los trazos cortos. Siguiendo ambas por separado, la casilla vacía pide la combinación de la C. ${METODO}`
  ),
  serie(
    2,
    "Secuencias de figuras",
    "basico",
    3,
    "Matriz de rombos inscritos en rectángulos, con líneas interiores que se añaden y se quitan.",
    `El rombo es fijo; lo que se mueve son las líneas de dentro, que se van añadiendo en un orden constante y girando de lado. La D es la única que continúa las dos cosas a la vez. ${METODO}`
  ),
  serie(
    3,
    "Matrices",
    "intermedio",
    4,
    "Matriz con un cuadrado central, puntos negros y cuadraditos negros que cambian de posición alrededor.",
    `Hay tres elementos independientes: el cuadrado central, los puntos y los cuadraditos negros, y cada uno tiene su propio recorrido por el marco. Conviene tapar dos y seguir solo el tercero. La combinación pendiente es la E. ${METODO}`
  ),
  serie(
    4,
    "Transformaciones",
    "intermedio",
    0,
    "Matriz con una pieza alargada que gira y cambia de relleno: rayado, punteado o blanco.",
    `Dos atributos a la vez: la orientación de la pieza —que gira un cuarto de vuelta cada paso— y su relleno, que rota entre rayado, punteado y blanco. La A es la que cierra las dos series. ${METODO}`
  ),
  serie(
    5,
    "Patrones",
    "basico",
    1,
    "Matriz de rectángulos divididos, con zonas en negro, en rayado vertical o en blanco.",
    `Aquí lo único que cambia es cómo se reparte el rectángulo y con qué relleno: negro, rayado o blanco. Las nueve casillas agotan las combinaciones, y la que falta es la B. ${METODO}`
  ),
  serie(
    6,
    "Alternancia",
    "intermedio",
    2,
    "Matriz con una forma semicircular arriba —negra, blanca o rayada— y un gancho debajo que cambia de lado.",
    `Dos atributos que corren en paralelo: el relleno de la forma de arriba (negro, blanco, rayado) y hacia qué lado abre el gancho de abajo. Cruzando ambos, falta la C. ${METODO}`
  ),
  serie(
    7,
    "Matrices",
    "intermedio",
    0,
    "Matriz con un triángulo, una cruz pequeña y una barra negra que aparecen en distintas posiciones y tamaños.",
    `Tres elementos —triángulo, cruz y barra negra— y cada fila los reparte de otra manera, pero ninguno se repite dos veces en la misma posición dentro de una fila. Con esa restricción, la casilla vacía solo admite la A. ${METODO}`
  ),
  serie(
    8,
    "Patrones",
    "intermedio",
    3,
    "Matriz de rectángulos cruzados por sus diagonales, con sectores rellenos en negro o en rayado vertical.",
    `Las diagonales dividen cada rectángulo en cuatro sectores y lo que cambia es cuál se rellena y con qué: negro o rayado. Se sigue primero el sector y después el relleno. Falta la D. ${METODO}`
  ),
  serie(
    9,
    "Alternancia",
    "intermedio",
    4,
    "Matriz con un círculo negro que cambia de posición y de tamaño, y un triángulo negro que se invierte.",
    `El círculo y el triángulo llevan cada uno su propio ciclo: el círculo sube y baja, el triángulo alterna la punta hacia arriba y hacia abajo. La E es la que cumple los dos ciclos. ${METODO}`
  ),
  serie(
    10,
    "Transformaciones",
    "intermedio",
    1,
    "Matriz de rectángulos con líneas diagonales y un triángulo pequeño que cambia de posición y de relleno.",
    `El armazón de diagonales se mantiene y lo que viaja es el triángulo pequeño, que además cambia entre negro y rayado. Siguiendo su recorrido y su relleno, la respuesta es la B. ${METODO}`
  ),
  serie(
    11,
    "Matrices",
    "avanzado",
    0,
    "Matriz de cuadros con una letra (A, C o D), un lomo redondeado con relleno blanco, rayado o negro, y un tallo que a veces lleva barra.",
    `Tres atributos, y el tercero está fuera del recuadro. La letra y el relleno del lomo van como un sudoku: las tres letras y los tres rellenos en cada fila y en cada columna, sin repetirse. Eso ya pide la A con el lomo rayado. Falta mirar el tallo que cuelga de cada cuadro: la barra del final aparece dos veces por fila y dos por columna, así que a la casilla vacía le toca sin barra, y ahí se cae la D. ${METODO}`
  ),
  serie(
    12,
    "Patrones",
    "avanzado",
    4,
    "Matriz con grupos de asteriscos, vigas y líneas —verticales, en diagonal y horizontales— en cantidades de tres, cuatro y cinco.",
    `Dos sudokus encima del mismo tablero. El símbolo —asterisco, viga, línea— sale una vez en cada fila y en cada columna; la cantidad hace lo mismo con el tres, el cuatro y el cinco. Conviene contar antes de mirar la forma. En la fila del hueco ya están el cuatro y el cinco, y en su columna el cinco y el cuatro: solo cabe el tres, y el símbolo que falta es la línea. La E es tres líneas. ${METODO}`
  ),
  serie(
    13,
    "Matrices",
    "avanzado",
    3,
    "Matriz con un círculo cortado por una cuerda y tres formas pequeñas —triángulo, cuadrado y circunferencia— colocadas alrededor.",
    `El círculo con su cuerda es el fondo; lo que hay que seguir son las tres formas pequeñas, cada una con su recorrido. Son tres series a la vez, y por eso conviene resolverlas de una en una. Queda la D. ${METODO}`
  ),
  serie(
    14,
    "Secuencias de figuras",
    "intermedio",
    1,
    "Matriz de circunferencias divididas en sectores, con un número dentro y un sector negro que gira.",
    `Aquí hay una pista numérica: los números avanzan de uno en uno leyendo la matriz en orden, y a la vez el sector negro gira una posición fija en cada paso. El número que toca y la posición del sector coinciden solo en la B. ${METODO}`
  ),
  serie(
    15,
    "Rotación de elementos",
    "avanzado",
    2,
    "Matriz con una cruz de la que salen trazos cortos en los extremos, en distintas orientaciones.",
    `Todas las casillas son la misma figura girada; lo difícil es que hay poco a lo que agarrarse. Conviene fijar un trazo concreto —el más largo, por ejemplo— y medir cuánto gira de casilla a casilla. Con ese giro constante, la respuesta es la C. ${METODO}`
  ),
  serie(
    16,
    "Patrones",
    "intermedio",
    1,
    "Matriz de rectángulos partidos en cuatro cuadrantes, rellenos con rayado diagonal, cuadrícula o blanco.",
    `Cada casilla reparte tres rellenos —rayado, cuadrícula y blanco— entre los cuadrantes, y lo que rota es en qué cuadrante cae cada uno. Siguiendo la rotación, falta la B. ${METODO}`
  ),
  serie(
    17,
    "Transformaciones",
    "avanzado",
    2,
    "Matriz con una figura alargada rematada en puntas, con rellenos y elementos interiores que cambian.",
    `La silueta apenas varía: lo que cambia es lo que lleva dentro y hacia dónde apunta el remate. Hay que separar el contenido interior de la orientación de la punta y seguirlos aparte. La C es la que encaja en las dos. ${METODO}`
  ),
  serie(
    18,
    "Matrices",
    "avanzado",
    3,
    "Matriz de rectángulos con diagonales, una letra (A, B o C), un triángulo negro y un punto que se desplazan.",
    `Tres atributos independientes: la letra, en qué sector cae el triángulo negro y dónde está el punto. Cada uno se repite una vez por fila y una por columna. Cruzando los tres, la casilla vacía solo admite la D. ${METODO}`
  ),
  serie(
    19,
    "Matrices",
    "avanzado",
    4,
    "Matriz de rectángulos con una diagonal, un número variable de puntos y una figura angular pequeña.",
    `Dos series a la vez: cuántos puntos hay —que sube y baja siguiendo su propio ritmo— y dónde se coloca la figura angular respecto de la diagonal. Contar primero y mirar la posición después evita perderse. Queda la E. ${METODO}`
  ),
  serie(
    20,
    "Matrices",
    "avanzado",
    0,
    "Matriz con un triángulo negro, zonas rayadas, y pequeños círculos y cuadrados unidos por una línea.",
    `Es la más cargada de la serie: conviven el triángulo negro, el rayado, y la pareja de círculo y cuadrado enlazados. Con tantos elementos, la única forma de no perderse es taparlos todos menos uno y seguir ese hasta el final, y repetir. La combinación que falta es la A. ${METODO}`
  ),
]
