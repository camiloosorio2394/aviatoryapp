import type { EjercicioPsico } from "@/lib/psicotecnicas"

/**
 * Razonamiento numérico — 38 ejercicios de opción múltiple.
 *
 * Fuente: «Razonamiento Numérico» (documento 256486461), 40 ejercicios sobre
 * sucesiones, conteo y combinatoria, razones y proporciones, ecuaciones
 * algebraicas y figuras geométricas.
 *
 * El documento no trae clave de respuestas, así que cada una está resuelta y la
 * explicación deja el procedimiento a la vista. Los enunciados, los valores y
 * las alternativas son los del original; lo único que se restituyó son las
 * unidades al cuadrado de los ejercicios 23 y 34, que el PDF pierde al
 * extraerse porque van como superíndice.
 *
 * Quedan fuera dos del original, anotados en FUENTES.md: el 11 y el 37. Ver ahí
 * el detalle antes de darlos por perdidos.
 */
export const NUMERICO: EjercicioPsico[] = [
  {
    id: "NU-N1-01",
    categoria: "numerico",
    subcategoria: "Aplicación de porcentaje",
    nivel: "intermedio",
    enunciado:
      "Andrés desea vender su celular ganando el 20% del precio final. Si pagó por este 120 dólares, ¿a qué precio lo debería vender?",
    opciones: ["140", "144", "150", "180"],
    respuesta: 2,
    explicacion:
      "La ganancia se calcula sobre el precio final, no sobre lo que pagó. Si P es el precio de venta, la ganancia es 0,20P y lo que costó es P − 0,20P = 0,80P. Entonces 0,80P = 120 y P = 150. El error clásico es sumarle el 20% a 120 y responder 144.",
    tiempo: 60,
    fuente: "Razonamiento Numérico (256486461), ej. 1",
  },
  {
    id: "NU-N1-02",
    categoria: "numerico",
    subcategoria: "Aplicación de porcentaje",
    nivel: "intermedio",
    enunciado:
      "Carlos y Pablo tienen la misma cantidad de dinero pero Pablo pierde el 80% de su parte. Si ahora juntos poseen 2400 dólares, ¿qué cantidad de dinero guarda el que tiene menos?",
    opciones: ["300", "400", "480", "2000"],
    respuesta: 1,
    explicacion:
      "Si cada uno tenía x, a Pablo le queda el 20%, es decir 0,2x. Juntos: x + 0,2x = 1,2x = 2400, de donde x = 2000. El que tiene menos es Pablo, con 0,2 × 2000 = 400.",
    tiempo: 60,
    fuente: "Razonamiento Numérico (256486461), ej. 2",
  },
  {
    id: "NU-N1-03",
    categoria: "numerico",
    subcategoria: "Aplicación del área",
    nivel: "intermedio",
    enunciado: "Observe la siguiente figura y determine el área:",
    imagen: "/psicotecnicas/numerico/NU-N1-03.webp",
    imagenAlt:
      "Figura con forma de casa: un cuadrado de lado 2 con un triángulo encima; los cuatro lados marcados miden 2.",
    opciones: ["4 + (√3⁄2)", "4 + √3", "6", "10"],
    respuesta: 1,
    explicacion:
      "La figura se separa en un cuadrado de lado 2 y un triángulo equilátero de lado 2 apoyado encima. El cuadrado aporta 2² = 4. El triángulo equilátero de lado L tiene área (√3/4)L², que para L = 2 da (√3/4)(4) = √3. Total: 4 + √3.",
    tiempo: 60,
    fuente: "Razonamiento Numérico (256486461), ej. 3",
  },
  {
    id: "NU-N1-04",
    categoria: "numerico",
    subcategoria: "Permutación y combinación",
    nivel: "intermedio",
    enunciado: "¿Cuántos grupos de 5 letras se pueden formar de la palabra Matemáticas?",
    opciones: ["120", "144", "462", "720"],
    respuesta: 2,
    explicacion:
      "«Matemáticas» tiene 11 letras y un grupo no distingue el orden, así que es una combinación: C(11,5) = 11!/(5!·6!) = 462. Si el orden importara sería una permutación y el número sería mucho mayor.",
    tiempo: 60,
    fuente: "Razonamiento Numérico (256486461), ej. 4",
  },
  {
    id: "NU-N1-05",
    categoria: "numerico",
    subcategoria: "Razones y proporciones",
    nivel: "intermedio",
    enunciado:
      "De un depósito lleno de aceite se extrae la cuarta parte del contenido, después la mitad del resto, quedando 1500 litros. ¿Cuál es la capacidad del depósito en litros?",
    opciones: ["3000", "4000", "6000", "12000"],
    respuesta: 1,
    explicacion:
      "Tras sacar 1/4 queda 3/4 del total. Sacar la mitad de ese resto deja 3/8 del total. Entonces (3/8)·C = 1500 y C = 1500 · 8/3 = 4000 litros.",
    tiempo: 60,
    fuente: "Razonamiento Numérico (256486461), ej. 5",
  },
  {
    id: "NU-N1-06",
    categoria: "numerico",
    subcategoria: "Sucesiones numéricas",
    nivel: "avanzado",
    enunciado: "Determine el número que sigue la secuencia: 1, 1, 1, 2, 2, 3, 4, 5, 7, 9, 12, …",
    opciones: ["15", "16", "18", "21"],
    respuesta: 1,
    explicacion:
      "Cada término es la suma del que está dos lugares antes y del que está tres lugares antes: aₙ = aₙ₋₂ + aₙ₋₃. Se comprueba con 2 = 1+1, 3 = 2+1, 4 = 2+2, 5 = 3+2, 7 = 4+3, 9 = 5+4 y 12 = 7+5. El siguiente es 9 + 7 = 16.",
    tiempo: 75,
    fuente: "Razonamiento Numérico (256486461), ej. 6",
  },
  {
    id: "NU-N1-07",
    categoria: "numerico",
    subcategoria: "Relaciones numéricas",
    nivel: "intermedio",
    enunciado: "Si la mitad de n es igual al triple de m, entonces la mitad de m es:",
    opciones: ["n/12", "n/6", "n/3", "3n/4"],
    respuesta: 0,
    explicacion:
      "De n/2 = 3m se despeja m = n/6. La mitad de m es entonces (1/2)(n/6) = n/12.",
    tiempo: 60,
    fuente: "Razonamiento Numérico (256486461), ej. 7",
  },
  {
    id: "NU-N1-08",
    categoria: "numerico",
    subcategoria: "Aplicación del área",
    nivel: "intermedio",
    enunciado:
      "Un papel cuadrado de 6 cm de lado se dobla de modo que los cuatro vértices queden en el punto de intersección de las diagonales. ¿Cuál es el área, en cm², de la nueva figura resultante?",
    opciones: ["9", "12", "18", "24"],
    respuesta: 2,
    explicacion:
      "Al llevar los cuatro vértices al centro, cada esquina doblada tapa exactamente un cuarto de la superficie que ocupaba, y la figura que queda es la mitad del cuadrado original. Área = 36/2 = 18 cm². La figura resultante es otro cuadrado, girado 45°.",
    tiempo: 60,
    fuente: "Razonamiento Numérico (256486461), ej. 8",
  },
  {
    id: "NU-N1-09",
    categoria: "numerico",
    subcategoria: "Probabilidad de eventos",
    nivel: "basico",
    enunciado:
      "Víctor lanza 3 monedas al aire y obtiene los siguientes posibles resultados: E = {ccc, ccs, csc, css, scc, scs, ssc, sss}, donde C es cara y S es sello. ¿Cuál es la probabilidad de que salgan por lo menos 2 caras?",
    opciones: ["1/8", "1/4", "1/2", "3/2"],
    respuesta: 2,
    explicacion:
      "«Por lo menos 2 caras» incluye los casos de 2 y de 3: ccs, csc, scc y ccc, o sea 4 de los 8 resultados. La probabilidad es 4/8 = 1/2. La opción 3/2 se descarta sin calcular: ninguna probabilidad puede pasar de 1.",
    tiempo: 45,
    fuente: "Razonamiento Numérico (256486461), ej. 9",
  },
  {
    id: "NU-N1-10",
    categoria: "numerico",
    subcategoria: "Aplicación de porcentaje",
    nivel: "intermedio",
    enunciado:
      "Si en una hacienda existen 100 vacas y por condiciones climáticas mueren 20, ¿qué porcentaje de vacas debe aumentar el dueño para tener nuevamente las 100?",
    opciones: ["20%", "25%", "40%", "80%"],
    respuesta: 1,
    explicacion:
      "Quedan 80 y hay que reponer 20, pero el porcentaje se calcula sobre lo que hay ahora, no sobre lo que había: 20/80 = 0,25, es decir 25%. Responder 20% es leer el aumento sobre las 100 iniciales.",
    tiempo: 60,
    fuente: "Razonamiento Numérico (256486461), ej. 10",
  },
  {
    id: "NU-N1-12",
    categoria: "numerico",
    subcategoria: "Relaciones numéricas",
    nivel: "intermedio",
    enunciado:
      "El movimiento de una partícula se describe con la expresión h = −t² + 5t + c, donde h es la distancia recorrida en metros, t el tiempo en minutos y c una constante. Si una partícula recorrió 12 metros en 2 minutos, ¿cuántos metros recorrerá en 4 minutos?",
    opciones: ["6", "10", "24", "42"],
    respuesta: 1,
    explicacion:
      "Primero se halla c con el dato conocido: 12 = −(2²) + 5(2) + c = −4 + 10 + c, de donde c = 6. Con la expresión ya completa, en t = 4: h = −16 + 20 + 6 = 10 metros.",
    tiempo: 60,
    fuente: "Razonamiento Numérico (256486461), ej. 12",
  },
  {
    id: "NU-N1-13",
    categoria: "numerico",
    subcategoria: "Conversión de unidades",
    nivel: "basico",
    enunciado:
      "Para comprar el material necesario para la construcción de una carretera es necesario que su longitud sea medida en metros. Si la longitud es 38 km, 5 hm, 16 dam, ¿cuántos metros de longitud tiene?",
    opciones: ["38.210", "38.516", "38.660", "43.160"],
    respuesta: 2,
    explicacion:
      "Cada escalón de la escala vale diez veces el siguiente: 1 km = 1000 m, 1 hm = 100 m y 1 dam = 10 m. Entonces 38 000 + 500 + 160 = 38 660 metros. La trampa está en sumar las cifras como si fueran del mismo orden.",
    tiempo: 45,
    fuente: "Razonamiento Numérico (256486461), ej. 13",
  },
  {
    id: "NU-N1-14",
    categoria: "numerico",
    subcategoria: "Sucesiones alfanuméricas",
    nivel: "avanzado",
    enunciado: "Identifique el elemento que completa la serie: A1, B1, C3, E5, H8, ___ , U21",
    opciones: ["I12", "L12", "M12", "M13"],
    respuesta: 3,
    explicacion:
      "Hay que leer las dos series a la vez. Los números son Fibonacci: 1, 1, 3… en realidad 1, 1, 2, 3, 5, 8, 13, 21, y las letras ocupan exactamente esa posición en el alfabeto: A=1, B=2, C=3, E=5, H=8, ?=13, U=21. La posición 13 es la M, así que el término es M13. Las opciones con 12 rompen la serie numérica.",
    tiempo: 75,
    fuente: "Razonamiento Numérico (256486461), ej. 14",
  },
  {
    id: "NU-N1-15",
    categoria: "numerico",
    subcategoria: "Sucesiones alfanuméricas",
    nivel: "intermedio",
    enunciado: "Identifique el término que completa la sucesión: B, d, g, __, U",
    opciones: ["J", "K", "L", "N"],
    respuesta: 1,
    explicacion:
      "Se traducen las letras a su posición: B=2, d=4, g=7. Los saltos crecen de uno en uno: +2, +3, +4… El siguiente salto es +4 sobre 7, que da 11, y la undécima letra es la K.",
    tiempo: 60,
    fuente: "Razonamiento Numérico (256486461), ej. 15",
  },
  {
    id: "NU-N1-16",
    categoria: "numerico",
    subcategoria: "Aplicación del área",
    nivel: "intermedio",
    enunciado:
      "Considerando que los lados de un triángulo rectángulo miden 3 y 4 cm, calcule el número de triángulos contenidos en un rectángulo cuyos lados miden 6 y 12 cm.",
    opciones: ["4", "6", "8", "12"],
    respuesta: 3,
    explicacion:
      "El triángulo rectángulo de catetos 3 y 4 tiene área (3×4)/2 = 6 cm². El rectángulo mide 6 × 12 = 72 cm². Caben 72/6 = 12.",
    tiempo: 60,
    fuente: "Razonamiento Numérico (256486461), ej. 16",
  },
  {
    id: "NU-N1-17",
    categoria: "numerico",
    subcategoria: "Aplicación de porcentaje",
    nivel: "intermedio",
    enunciado:
      "Tengo 1600 contactos en mi red social, pero conozco solo al 25%, y solo chateo con el 10%. ¿Con cuántos no chateo?",
    opciones: ["40", "400", "1200", "1560"],
    respuesta: 3,
    explicacion:
      "Los dos porcentajes se encadenan: conozco al 25% de 1600, que son 400, y chateo con el 10% de esos 400, que son 40. Con los otros 1600 − 40 = 1560 no chateo.",
    tiempo: 60,
    fuente: "Razonamiento Numérico (256486461), ej. 17",
  },
  {
    id: "NU-N1-18",
    categoria: "numerico",
    subcategoria: "Comparación de valores",
    nivel: "basico",
    enunciado:
      "Identifique el quinto elemento después de ordenar en forma decreciente los siguientes números: 8, 1/6, 4, 3/4, 5, 1/2, 7, 1/9",
    opciones: ["1/2", "3/4", "4", "5"],
    respuesta: 1,
    explicacion:
      "Ordenados de mayor a menor: 8, 7, 5, 4, 3/4, 1/2, 1/6, 1/9. El quinto es 3/4. Conviene separar primero los enteros de las fracciones, porque toda fracción propia es menor que cualquiera de los enteros de la lista.",
    tiempo: 45,
    fuente: "Razonamiento Numérico (256486461), ej. 18",
  },
  {
    id: "NU-N1-19",
    categoria: "numerico",
    subcategoria: "Aplicación del perímetro",
    nivel: "basico",
    enunciado:
      "La base de un rectángulo es el doble de su altura. ¿Cuánto mide la base, en centímetros, si el perímetro es 60 cm?",
    opciones: ["10", "15", "20", "40"],
    respuesta: 2,
    explicacion:
      "El perímetro es 2(b + h) = 60, así que b + h = 30. Con b = 2h queda 3h = 30, h = 10 y b = 20 cm.",
    tiempo: 45,
    fuente: "Razonamiento Numérico (256486461), ej. 19",
  },
  {
    id: "NU-N1-20",
    categoria: "numerico",
    subcategoria: "Probabilidad de eventos",
    nivel: "intermedio",
    enunciado:
      "En una feria gastronómica se ofertan dos platos típicos —hornado y caldo de patas— y cuatro bebidas: jugo de tomate, chicha, limonada o gaseosa. Si quien compró un boleto debe tomar necesariamente un plato y una bebida, la probabilidad de que solicite hornado con limonada o con chicha es:",
    opciones: ["0,125", "0,250", "0,375", "0,500"],
    respuesta: 1,
    explicacion:
      "Las combinaciones posibles son 2 platos × 4 bebidas = 8, todas igual de probables. Los casos favorables son dos: hornado con limonada y hornado con chicha. La probabilidad es 2/8 = 0,25.",
    tiempo: 60,
    fuente: "Razonamiento Numérico (256486461), ej. 20",
  },
  {
    id: "NU-N1-21",
    categoria: "numerico",
    subcategoria: "Problemas lógico-matemáticos",
    nivel: "intermedio",
    enunciado:
      "En la reserva ecológica del Cuyabeno existen tapires y avestruces. El número de cabezas es 132 y el de patas es 456. Esto quiere decir que hay ___ avestruces y ___ tapires.",
    opciones: ["36; 96", "91; 41", "94; 38", "96; 36"],
    respuesta: 0,
    explicacion:
      "Cada animal aporta una cabeza: t + a = 132. Los tapires tienen 4 patas y los avestruces 2: 4t + 2a = 456, o sea 2t + a = 228. Restando la primera de esta última: t = 96 tapires, y a = 36 avestruces. Ojo al orden en que lo pide el enunciado: primero avestruces.",
    tiempo: 75,
    fuente: "Razonamiento Numérico (256486461), ej. 21",
  },
  {
    id: "NU-N1-22",
    categoria: "numerico",
    subcategoria: "Aplicación del área",
    nivel: "basico",
    enunciado:
      "Si la hipotenusa de un triángulo mide 5 cm y uno de sus catetos mide 4 cm, el área del triángulo rectángulo es:",
    opciones: ["6", "10", "12", "20"],
    respuesta: 0,
    explicacion:
      "Por Pitágoras el otro cateto mide √(25 − 16) = 3. El área de un triángulo rectángulo es el semiproducto de los catetos: (3 × 4)/2 = 6 cm². Usar la hipotenusa como si fuera un cateto lleva a 10.",
    tiempo: 45,
    fuente: "Razonamiento Numérico (256486461), ej. 22",
  },
  {
    id: "NU-N1-23",
    categoria: "numerico",
    subcategoria: "Conversión de unidades",
    nivel: "intermedio",
    enunciado:
      "Si un patio de forma rectangular tiene 6 m de ancho y 11 m de largo, ¿cuál es el área total en cm²?",
    opciones: ["66", "6 600", "660 000", "66 000 000"],
    respuesta: 2,
    explicacion:
      "Conviene pasar a centímetros antes de multiplicar: 600 cm × 1100 cm = 660 000 cm². Si se calcula el área en metros (66 m²) y luego se multiplica por 100 en vez de por 10 000, sale 6 600, que es el error que la pregunta busca.",
    tiempo: 60,
    fuente: "Razonamiento Numérico (256486461), ej. 23",
  },
  {
    id: "NU-N1-24",
    categoria: "numerico",
    subcategoria: "Probabilidad de eventos",
    nivel: "avanzado",
    enunciado:
      "Una mochila escolar contiene 4 marcadores de color negro y 6 de color azul. Se sacan 3 marcadores consecutivamente sin reposición; entonces, la probabilidad de que los dos primeros sean negros y el tercero azul es:",
    opciones: ["9%", "10%", "30%", "66,7%"],
    respuesta: 1,
    explicacion:
      "Sin reposición cambia el total en cada extracción: (4/10) × (3/9) × (6/8) = 72/720 = 0,1, es decir 10%.",
    tiempo: 75,
    fuente: "Razonamiento Numérico (256486461), ej. 24",
  },
  {
    id: "NU-N1-25",
    categoria: "numerico",
    subcategoria: "Problemas lógico-matemáticos",
    nivel: "intermedio",
    enunciado:
      "En un hotel existen lámparas de pared de 2 focos y lámparas de techo de 5 focos. El total de lámparas que posee el hotel es 108 y el total de focos es 348. ¿Cuántas lámparas de pared y de techo existen en cada planta si el hotel es de 4 pisos?",
    opciones: ["8 y 11", "16 y 11", "64 y 44", "128 y 220"],
    respuesta: 1,
    explicacion:
      "Con p + t = 108 y 2p + 5t = 348, sustituyendo p = 108 − t queda 216 + 3t = 348, así que t = 44 y p = 64. Pero la pregunta es por planta: 64/4 = 16 de pared y 44/4 = 11 de techo. La opción 64 y 44 es el total del hotel, no lo que se pide.",
    tiempo: 75,
    fuente: "Razonamiento Numérico (256486461), ej. 25",
  },
  {
    id: "NU-N1-26",
    categoria: "numerico",
    subcategoria: "Problemas lógico-matemáticos",
    nivel: "avanzado",
    enunciado:
      "Juan le dice a Pedro: «dame 180 USD y así tendré el doble del dinero que tú tienes». Pedro le contesta: «sería mejor que tú me des 150 USD y así tendremos los dos igual cantidad de dinero». ¿Cuánto tenía Pedro?",
    opciones: ["420", "840", "1140", "1980"],
    respuesta: 1,
    explicacion:
      "Lo que uno da el otro lo recibe. De la primera frase: J + 180 = 2(P − 180), o sea J = 2P − 540. De la segunda: P + 150 = J − 150, o sea J = P + 300. Igualando: 2P − 540 = P + 300 y P = 840.",
    tiempo: 90,
    fuente: "Razonamiento Numérico (256486461), ej. 26",
  },
  {
    id: "NU-N1-27",
    categoria: "numerico",
    subcategoria: "Probabilidad de eventos",
    nivel: "avanzado",
    enunciado:
      "Tres caballos (A, B y C) participan en una carrera. El caballo C tiene el doble de probabilidad de ganar que B, y B el doble que A. Calcule la probabilidad de que gane B.",
    opciones: ["1/8", "1/7", "2/7", "1/3"],
    respuesta: 2,
    explicacion:
      "Se expresa todo en función de A: B = 2A y C = 4A. Como alguno gana, A + 2A + 4A = 1, o sea 7A = 1 y A = 1/7. Entonces B = 2/7.",
    tiempo: 75,
    fuente: "Razonamiento Numérico (256486461), ej. 27",
  },
  {
    id: "NU-N1-28",
    categoria: "numerico",
    subcategoria: "Permutación y combinación",
    nivel: "basico",
    enunciado:
      "Determine los subconjuntos que se pueden obtener con las letras X, Y y Z organizados de 2 en 2.",
    opciones: ["3", "6", "8", "12"],
    respuesta: 0,
    explicacion:
      "En un subconjunto no importa el orden, así que {X,Y} y {Y,X} son el mismo: C(3,2) = 3 (XY, XZ, YZ). La respuesta 6 corresponde a las permutaciones, donde el orden sí cuenta.",
    tiempo: 45,
    fuente: "Razonamiento Numérico (256486461), ej. 28",
  },
  {
    id: "NU-N1-29",
    categoria: "numerico",
    subcategoria: "Ecuaciones de segundo grado",
    nivel: "avanzado",
    enunciado:
      "Si hace 8 años la edad de Fernando era la raíz cuadrada de la edad que tendrá dentro de 4 años, ¿cuál es su edad actual?",
    opciones: ["5", "6", "10", "12"],
    respuesta: 3,
    explicacion:
      "Con x la edad actual: x − 8 = √(x + 4). Elevando al cuadrado, x² − 17x + 60 = 0, cuyas raíces son 12 y 5. La de 5 se descarta porque haría negativa la edad de hace 8 años. Queda 12: hace 8 años tenía 4, y 4 es la raíz de 16, que es lo que tendrá en 4 años.",
    tiempo: 90,
    fuente: "Razonamiento Numérico (256486461), ej. 29",
  },
  {
    id: "NU-N1-30",
    categoria: "numerico",
    subcategoria: "Permutación y combinación",
    nivel: "intermedio",
    enunciado:
      "En un campeonato de fútbol se juega todos contra todos. Si inicialmente son 10 equipos y luego se incluyen 2 más, el número de cotejos adicionales que deben jugarse es:",
    opciones: ["4", "20", "21", "44"],
    respuesta: 2,
    explicacion:
      "Con n equipos se juegan C(n,2) partidos. Con 10: C(10,2) = 45. Con 12: C(12,2) = 66. Los adicionales son 66 − 45 = 21. Pregunta por la diferencia, no por el total.",
    tiempo: 75,
    fuente: "Razonamiento Numérico (256486461), ej. 30",
  },
  {
    id: "NU-N1-31",
    categoria: "numerico",
    subcategoria: "Ecuaciones de segundo grado",
    nivel: "intermedio",
    enunciado:
      "Si al triple de un número se le suma su cuadrado se obtiene 88, ¿cuáles son esos números?",
    opciones: ["x₁ = 3, x₂ = 9", "x₁ = 8, x₂ = −11", "x₁ = 3, x₂ = 88", "x₁ = 8, x₂ = 11"],
    respuesta: 1,
    explicacion:
      "La ecuación es x² + 3x − 88 = 0. Con la fórmula general: x = (−3 ± √(9 + 352))/2 = (−3 ± 19)/2, que da 8 y −11. Como el enunciado habla de «números» sin restringir el signo, las dos raíces valen.",
    tiempo: 60,
    fuente: "Razonamiento Numérico (256486461), ej. 31",
  },
  {
    id: "NU-N1-32",
    categoria: "numerico",
    subcategoria: "Permutación y combinación",
    nivel: "basico",
    enunciado:
      "¿De cuántas formas se pueden ordenar cinco banderas que poseen diferentes colores: roja, verde, blanca, amarilla y naranja?",
    opciones: ["20", "24", "60", "120"],
    respuesta: 3,
    explicacion:
      "Se ordenan todos los elementos y todos son distintos, así que es 5! = 5 × 4 × 3 × 2 × 1 = 120.",
    tiempo: 45,
    fuente: "Razonamiento Numérico (256486461), ej. 32",
  },
  {
    id: "NU-N1-33",
    categoria: "numerico",
    subcategoria: "Aplicación de porcentaje",
    nivel: "intermedio",
    enunciado:
      "Una compañía de construcción adquiere 100 kg de hierro y por cada kg paga 100 USD. Por una promoción de la fábrica, el hierro tiene un descuento del 10% y por ser cliente frecuente una rebaja adicional del 2%. ¿Cuál es el valor de la factura?",
    opciones: ["1 200", "8 800", "8 820", "9 800"],
    respuesta: 2,
    explicacion:
      "Los descuentos sucesivos no se suman: se aplican uno sobre el resultado del otro. De 10 000 el 10% deja 9000, y el 2% sobre 9000 deja 9000 × 0,98 = 8820. Sumar 10% + 2% = 12% daría 8800, que es la opción trampa.",
    tiempo: 60,
    fuente: "Razonamiento Numérico (256486461), ej. 33",
  },
  {
    id: "NU-N1-34",
    categoria: "numerico",
    subcategoria: "Ecuaciones de segundo grado",
    nivel: "intermedio",
    enunciado:
      "El área de una pared rectangular es 6 m². Si el largo se representa por (x − 2) y el ancho por (x − 3), ¿cuál es la dimensión del ancho?",
    opciones: ["1", "2", "3", "5"],
    respuesta: 1,
    explicacion:
      "(x − 2)(x − 3) = 6 se expande a x² − 5x + 6 = 6, es decir x² − 5x = 0 y x(x − 5) = 0. La raíz x = 0 daría lados negativos, así que x = 5. El ancho es x − 3 = 2.",
    tiempo: 60,
    fuente: "Razonamiento Numérico (256486461), ej. 34",
  },
  {
    id: "NU-N1-35",
    categoria: "numerico",
    subcategoria: "Permutación y combinación",
    nivel: "basico",
    enunciado:
      "En una clase de Matemática asisten 10 estudiantes y se requiere formar equipos de trabajo de 2 personas. ¿Cuántos equipos de trabajo diferentes se pueden formar?",
    opciones: ["2", "5", "45", "210"],
    respuesta: 2,
    explicacion:
      "Un equipo no tiene orden interno, así que es C(10,2) = (10 × 9)/2 = 45.",
    tiempo: 45,
    fuente: "Razonamiento Numérico (256486461), ej. 35",
  },
  {
    id: "NU-N1-36",
    categoria: "numerico",
    subcategoria: "Aplicación de porcentaje",
    nivel: "intermedio",
    enunciado:
      "Una costurera tiene 2 metros de tela y corta el 85% para hacer cortinas. El 50% del resto se utilizó para hacer tiras que la sujetaran. ¿Cuántos centímetros de tela sobraron?",
    opciones: ["15", "30", "85", "170"],
    respuesta: 0,
    explicacion:
      "Conviene trabajar en centímetros: 2 m = 200 cm. Tras cortar el 85% queda el 15%, es decir 30 cm. De esos 30 se usa la mitad, así que sobran 15 cm.",
    tiempo: 60,
    fuente: "Razonamiento Numérico (256486461), ej. 36",
  },
  {
    id: "NU-N1-38",
    categoria: "numerico",
    subcategoria: "Permutación y combinación",
    nivel: "intermedio",
    enunciado:
      "Se ha reunido a 8 estudiantes que obtuvieron la máxima nota en una evaluación y se ha decidido premiar con un viaje al extranjero a 3 de ellos por medio de un sorteo. ¿Cuántas opciones posibles existen de otorgar este premio?",
    opciones: ["24", "56", "336", "40 320"],
    respuesta: 1,
    explicacion:
      "El premio es el mismo para los tres, así que el orden no importa: C(8,3) = (8 × 7 × 6)/(3 × 2 × 1) = 56. El 336 corresponde a las variaciones (si los premios fueran distintos) y 40 320 es 8!.",
    tiempo: 60,
    fuente: "Razonamiento Numérico (256486461), ej. 38",
  },
  {
    id: "NU-N1-39",
    categoria: "numerico",
    subcategoria: "Conversión de unidades",
    nivel: "intermedio",
    enunciado:
      "A las 15 h 20 min 10 s parte de una ciudad con destino a otra un automóvil, tardándose 320,25 min. ¿A qué hora, minuto y segundo llegó exactamente el automóvil a su destino?",
    opciones: [
      "5 h, 20 min, 15 s",
      "15 h, 400 min, 35 s",
      "20 h, 40 min, 25 s",
      "20 h, 40 min, 35 s",
    ],
    respuesta: 2,
    explicacion:
      "320,25 min son 5 h 20 min y 0,25 min, y esa fracción son 15 segundos, no 25. Sumando a 15 h 20 min 10 s: 20 h, 40 min y 25 s.",
    tiempo: 75,
    fuente: "Razonamiento Numérico (256486461), ej. 39",
  },
  {
    id: "NU-N1-40",
    categoria: "numerico",
    subcategoria: "Aplicación del perímetro",
    nivel: "intermedio",
    enunciado:
      "La mitad del perímetro de un rectángulo es 24 m y su base mide 4 m más que su altura. Calcule el perímetro si la base disminuye a la mitad y su altura aumenta al doble.",
    opciones: ["24 m", "46 m", "54 m", "66 m"],
    respuesta: 2,
    explicacion:
      "La mitad del perímetro es b + h = 24. Con b = h + 4 queda 2h + 4 = 24, h = 10 y b = 14. La figura nueva tiene base 7 y altura 20, así que su perímetro es 2(7 + 20) = 54 m.",
    tiempo: 75,
    fuente: "Razonamiento Numérico (256486461), ej. 40",
  },
]
