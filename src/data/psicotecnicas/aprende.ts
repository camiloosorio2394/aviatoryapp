import type { EjemploPsico } from "@/lib/psicotecnicas"

// Material de la lección de razonamiento espacial. Vive aparte del banco
// (espacial.ts) porque la app lo importa: el banco lo sirve el servidor.

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
    imagen: "/psicotecnicas/espacial/ES-E2-ejemplo-04-limpio.webp",
    imagenAlt: "Desarrollo de un cubo con los números 1, 2, 3, 4 y 6, y cuatro cubos plegados.",
    respuesta:
      "La A. Al plegar, la cara del 1 y la del 3 quedan opuestas, así que ningún cubo puede mostrar las dos a la vez.",
    fuente: "Test de razonamiento espacial (667045629), pregunta 1",
  },
  {
    id: "EJ-E2-05",
    categoria: "espacial",
    titulo: "Despliegue de un dado por puntos",
    imagen: "/psicotecnicas/espacial/ES-E2-ejemplo-05-limpio.webp",
    imagenAlt: "Desarrollo de un dado marcado con puntos y cuatro dados plegados.",
    respuesta:
      "La C. En un dado las caras opuestas suman siete, y esa regla descarta sola tres de las cuatro alternativas.",
    fuente: "Test de razonamiento espacial (667045629), pregunta 2",
  },
  {
    id: "EJ-E2-06",
    categoria: "espacial",
    titulo: "Despliegue con flechas y símbolos",
    imagen: "/psicotecnicas/espacial/ES-E2-ejemplo-06-limpio.webp",
    imagenAlt: "Desarrollo con un cuadrado, un triángulo y dos flechas, y cuatro cubos plegados.",
    respuesta:
      "La D. Con las flechas no basta con que la cara sea la correcta: tiene que apuntar hacia donde queda al cerrar el cubo.",
    fuente: "Test de razonamiento espacial (667045629), pregunta 3",
  },
  {
    id: "EJ-E2-07",
    categoria: "espacial",
    titulo: "Despliegue con cuatro símbolos",
    imagen: "/psicotecnicas/espacial/ES-E2-ejemplo-07-limpio.webp",
    imagenAlt: "Desarrollo con triángulo, círculo, estrella y cuadrado, y cuatro cubos plegados.",
    respuesta:
      "La C. Se comprueba con un par de caras contiguas: las que en el desarrollo comparten arista tienen que seguir compartiéndola en el cubo.",
    fuente: "Test de razonamiento espacial (667045629), pregunta 4",
  },
  {
    id: "EJ-E2-08",
    categoria: "espacial",
    titulo: "Del cubo al desarrollo",
    imagen: "/psicotecnicas/espacial/ES-E2-ejemplo-08-limpio.webp",
    imagenAlt: "Un cubo con las caras divididas en triángulos negros y cinco desarrollos posibles.",
    respuesta:
      "La A. Aquí el camino es el inverso: se parte del cubo y se busca el desarrollo, vigilando la orientación de cada triángulo.",
    fuente: "Test de razonamiento espacial (667045629), pregunta 5",
  },
  {
    id: "EJ-E2-09",
    categoria: "espacial",
    titulo: "Qué sólido forma el desarrollo",
    imagen: "/psicotecnicas/espacial/ES-E2-ejemplo-09-limpio.webp",
    imagenAlt: "Un desarrollo con puntos, cruz, línea y asterisco, y cinco sólidos posibles.",
    respuesta:
      "La B. Con cinco alternativas conviene descartar por pares de caras opuestas antes de intentar plegar entero.",
    fuente: "Test de razonamiento espacial (667045629), pregunta 6",
  },
  {
    id: "EJ-E2-14",
    categoria: "espacial",
    titulo: "Rotación de 90 grados",
    imagen: "/psicotecnicas/espacial/ES-E2-ejemplo-14-limpio.webp",
    imagenAlt: "Dos siluetas de perro en un recuadro y cuatro rotaciones posibles.",
    respuesta:
      "La B. Girar no es reflejar: dos de las opciones son la figura espejada, que nunca se obtiene rotando en el plano.",
    fuente: "Test de razonamiento espacial (667045629), pregunta 11",
  },
  {
    id: "EJ-E2-15",
    categoria: "espacial",
    titulo: "Despliegue de una caja",
    imagen: "/psicotecnicas/espacial/ES-E2-ejemplo-15-limpio.webp",
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
