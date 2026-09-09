/**
 * Pruebas psicotécnicas: tipos, tiempos y la lógica de armar una sesión.
 *
 * El módulo entrena las tres familias de razonamiento que aparecen en los
 * procesos de selección de pilotos —abstracto, espacial y numérico— con
 * ejercicios extraídos de material real, no redactados aquí. Cada ejercicio
 * declara de qué documento salió (`fuente`), y el banco vive en
 * `src/data/psicotecnicas/`.
 *
 * Los tiempos son parámetros de entrenamiento, no cifras oficiales de ninguna
 * aerolínea: se cambian en TIEMPOS sin tocar un solo ejercicio, que es
 * exactamente la razón de que estén separados del banco.
 */

export type CategoriaPsico = "abstracto" | "espacial" | "numerico"
export type NivelPsico = "basico" | "intermedio" | "avanzado"
export type ModoPsico = "entrenamiento" | "evaluacion" | "simulacion"

/** Ficha de un ejercicio. Lo que no se sabe de la fuente, no se inventa. */
export interface EjercicioPsico {
  /** Único y estable: la categoría, el documento y el número dentro de él. */
  id: string
  categoria: CategoriaPsico
  /** Habilidad concreta que trabaja, decidida ejercicio por ejercicio. */
  subcategoria: string
  nivel: NivelPsico
  enunciado: string
  /** Ruta bajo /public. Los de figuras no se entienden sin ella. */
  imagen?: string
  /** Descripción de la figura para lectores de pantalla. */
  imagenAlt?: string
  /**
   * Etiquetas de las opciones. Cuando la figura ya trae las suyas dibujadas
   * (el caso de casi todo el material espacial y abstracto) van solo las
   * letras y `opcionesEnImagen` avisa de que no hay que repetirlas debajo.
   */
  opciones: string[]
  opcionesEnImagen?: boolean
  /** Índice dentro de `opciones`. */
  respuesta: number
  explicacion: string
  /** Segundos de referencia del propio ejercicio. */
  tiempo: number
  /** Documento del que se extrajo, para poder auditarlo. */
  fuente: string
}

/** Ejemplo resuelto: la fuente ya trae marcada la respuesta, así que enseña. */
export interface EjemploPsico {
  id: string
  categoria: CategoriaPsico
  titulo: string
  imagen: string
  imagenAlt: string
  respuesta: string
  fuente: string
}

// ────────────────────────────────────────────────────────────────────────────
// Tiempos

/**
 * Segundos por ejercicio, por modo y categoría.
 *
 * Entrenamiento va con el mismo minuto para todo: ahí el cronómetro orienta,
 * no castiga. Evaluación aprieta y distingue por familia, porque un numérico
 * exige operar y un espacial se resuelve o no se resuelve de un vistazo.
 */
export const TIEMPOS: Record<ModoPsico, Record<CategoriaPsico, number>> = {
  entrenamiento: { abstracto: 60, espacial: 60, numerico: 60 },
  evaluacion: { abstracto: 45, espacial: 45, numerico: 60 },
  simulacion: { abstracto: 45, espacial: 45, numerico: 60 },
}

/**
 * Cuánto se estira o se encoge el tiempo según el nivel.
 *
 * La progresión del módulo no es solo "ejercicios más difíciles": es el mismo
 * ejercicio con menos tiempo. Primero precisión, luego velocidad, al final
 * precisión bajo presión.
 */
export const FACTOR_NIVEL: Record<NivelPsico, number> = {
  basico: 1.35,
  intermedio: 1,
  avanzado: 0.75,
}

/** Segundos que le tocan a un ejercicio en un modo y nivel dados. */
export function tiempoDe(
  ejercicio: EjercicioPsico,
  modo: ModoPsico,
  nivel: NivelPsico | "todos"
): number {
  const base = TIEMPOS[modo][ejercicio.categoria]
  // En entrenamiento el nivel no aprieta el reloj: se entra a aprender.
  if (modo === "entrenamiento") return base
  const factor = nivel === "todos" ? FACTOR_NIVEL[ejercicio.nivel] : FACTOR_NIVEL[nivel]
  return Math.round(base * factor)
}

/** La nota legal que acompaña a todo lo que lleve cronómetro. */
export const NOTA_TIEMPOS =
  "Los tiempos de entrenamiento utilizados por Aviatory son parámetros de práctica diseñados " +
  "para desarrollar velocidad y precisión. Los tiempos, cantidad de ejercicios y metodología " +
  "pueden variar según la aerolínea, proveedor de evaluación y proceso de selección."

// ────────────────────────────────────────────────────────────────────────────
// Catálogo

export const CATEGORIAS: Record<
  CategoriaPsico,
  { nombre: string; corto: string; descripcion: string; evalua: string[] }
> = {
  abstracto: {
    nombre: "Razonamiento abstracto",
    corto: "Abstracto",
    descripcion:
      "Encontrar la regla que gobierna un conjunto de figuras y aplicarla. Mide capacidad de " +
      "inferencia con material que no depende de lo que hayas estudiado.",
    evalua: [
      "Identificación de patrones",
      "Secuencias lógicas",
      "Relaciones entre figuras",
      "Transformaciones",
      "Rotaciones y cambios de posición",
      "Figura que completa la secuencia",
      "Elementos que no siguen el patrón",
    ],
  },
  espacial: {
    nombre: "Razonamiento espacial",
    corto: "Espacial",
    descripcion:
      "Manipular objetos en la cabeza: plegar, girar, mirar desde otro lado. Es la familia más " +
      "cercana a lo que hace un piloto leyendo instrumentos y orientándose en el espacio.",
    evalua: [
      "Orientación espacial",
      "Rotación mental",
      "Visualización tridimensional",
      "Relaciones entre objetos",
      "Cubos y dados",
      "Transformación de figuras",
      "Posiciones y perspectivas",
    ],
  },
  numerico: {
    nombre: "Razonamiento numérico",
    corto: "Numérico",
    descripcion:
      "Operar rápido y bien con números y relaciones. Aquí el reloj pesa más que en ninguna otra " +
      "familia, porque casi siempre hay que calcular antes de decidir.",
    evalua: [
      "Secuencias numéricas",
      "Relaciones matemáticas",
      "Patrones numéricos",
      "Operaciones bajo presión de tiempo",
      "Comparación de valores",
      "Razonamiento lógico-matemático",
      "Resolución rápida de problemas",
    ],
  },
}

export const NIVELES: Record<NivelPsico, { nombre: string; descripcion: string }> = {
  basico: {
    nombre: "Básico",
    descripcion: "Más tiempo por ejercicio y los enunciados de menor complejidad. Aquí se busca acertar.",
  },
  intermedio: {
    nombre: "Intermedio",
    descripcion: "Tiempo de referencia y complejidad media. Aquí se busca acertar rápido.",
  },
  avanzado: {
    nombre: "Avanzado",
    descripcion: "Un cuarto menos de tiempo y los ejercicios más duros. Aquí se busca no fallar con prisa.",
  },
}

export const MODOS: Record<ModoPsico, { nombre: string; descripcion: string }> = {
  entrenamiento: {
    nombre: "Entrenamiento",
    descripcion:
      "El cronómetro corre y te avisa, pero no te saca: si te pasas del tiempo recomendado puedes " +
      "seguir respondiendo y queda registrado. Ves la respuesta y la explicación al instante.",
  },
  evaluacion: {
    nombre: "Evaluación",
    descripcion:
      "Tiempos exigentes por ejercicio. Al agotarse el reloj se pasa al siguiente y el ejercicio " +
      "cuenta como no respondido.",
  },
  simulacion: {
    nombre: "Simulación",
    descripcion:
      "Prueba completa con las tres familias mezcladas. Sin respuestas ni explicaciones durante la " +
      "prueba: los resultados se ven al final, como en un proceso real.",
  },
}

// ────────────────────────────────────────────────────────────────────────────
// Composición del simulacro

/** Reparto del Simulacro Psicotécnico: 10 de cada familia, 30 en total. */
export const SIMULACRO = { abstracto: 10, espacial: 10, numerico: 10 } as const
export const SIMULACRO_TOTAL =
  SIMULACRO.abstracto + SIMULACRO.espacial + SIMULACRO.numerico

// ────────────────────────────────────────────────────────────────────────────
// Selección

/** Baraja sin tocar el arreglo de entrada (Fisher-Yates). */
export function barajar<T>(items: readonly T[]): T[] {
  const copia = [...items]
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copia[i], copia[j]] = [copia[j], copia[i]]
  }
  return copia
}

export interface FiltroPsico {
  categoria: CategoriaPsico | "todas"
  nivel: NivelPsico | "todos"
}

export function filtrar(
  banco: readonly EjercicioPsico[],
  { categoria, nivel }: FiltroPsico
): EjercicioPsico[] {
  return banco.filter(
    (e) =>
      (categoria === "todas" || e.categoria === categoria) &&
      (nivel === "todos" || e.nivel === nivel)
  )
}

/**
 * Arma una tanda de ejercicios sin repetir dentro de la sesión.
 *
 * Si el filtro deja menos de los pedidos, devuelve los que haya: es preferible
 * una tanda corta a rellenarla repitiendo, que es justo lo que arruina la
 * medición.
 */
export function armarTanda(
  banco: readonly EjercicioPsico[],
  filtro: FiltroPsico,
  cantidad: number
): EjercicioPsico[] {
  return barajar(filtrar(banco, filtro)).slice(0, cantidad)
}

/**
 * Arma el simulacro: 10 de cada familia, barajadas entre sí para que no vengan
 * por bloques. Si a una familia le faltan ejercicios se completa con las otras,
 * de modo que el simulacro siempre tenga 30 mientras el banco dé para ello.
 */
export function armarSimulacro(banco: readonly EjercicioPsico[]): EjercicioPsico[] {
  const elegidos: EjercicioPsico[] = []
  const usados = new Set<string>()

  for (const categoria of ["abstracto", "espacial", "numerico"] as const) {
    const tanda = armarTanda(banco, { categoria, nivel: "todos" }, SIMULACRO[categoria])
    for (const e of tanda) {
      elegidos.push(e)
      usados.add(e.id)
    }
  }

  if (elegidos.length < SIMULACRO_TOTAL) {
    const resto = barajar(banco.filter((e) => !usados.has(e.id)))
    elegidos.push(...resto.slice(0, SIMULACRO_TOTAL - elegidos.length))
  }

  return barajar(elegidos)
}

// ────────────────────────────────────────────────────────────────────────────
// Resultados

/** Lo que se guarda de cada ejercicio contestado. */
export interface RespuestaPsico {
  id: string
  categoria: CategoriaPsico
  /** Índice elegido, o null si se quedó sin responder. */
  elegida: number | null
  correcta: boolean
  /** Segundos que tardó. */
  segundos: number
  /** Segundos que tenía. */
  limite: number
}

export interface ResumenCategoria {
  categoria: CategoriaPsico
  total: number
  correctas: number
  porcentaje: number
}

export interface ResultadoPsico {
  total: number
  correctas: number
  incorrectas: number
  sinResponder: number
  porcentaje: number
  /** Promedios en segundos. */
  tiempoPromedio: number
  tiempoCorrectas: number
  tiempoIncorrectas: number
  dentroDeTiempo: number
  fueraDeTiempo: number
  porCategoria: ResumenCategoria[]
  /** Puntaje de velocidad: cuánto del tiempo disponible sobró, en porcentaje. */
  velocidad: number
  /** Igual que `porcentaje`, con nombre de proceso de selección. */
  precision: number
  /** Media de precisión y velocidad, que es lo que mide una psicotécnica. */
  global: number
  fortaleza: CategoriaPsico | null
  porMejorar: CategoriaPsico | null
}

function promedio(xs: number[]): number {
  if (xs.length === 0) return 0
  return Math.round(xs.reduce((a, b) => a + b, 0) / xs.length)
}

export function calcularResultado(respuestas: readonly RespuestaPsico[]): ResultadoPsico {
  const total = respuestas.length
  const contestadas = respuestas.filter((r) => r.elegida !== null)
  const correctas = respuestas.filter((r) => r.correcta)
  const incorrectas = contestadas.filter((r) => !r.correcta)
  const sinResponder = total - contestadas.length

  const porcentaje = total === 0 ? 0 : Math.round((correctas.length / total) * 100)

  const porCategoria: ResumenCategoria[] = (
    ["abstracto", "espacial", "numerico"] as const
  )
    .map((categoria) => {
      const dela = respuestas.filter((r) => r.categoria === categoria)
      const ok = dela.filter((r) => r.correcta).length
      return {
        categoria,
        total: dela.length,
        correctas: ok,
        porcentaje: dela.length === 0 ? 0 : Math.round((ok / dela.length) * 100),
      }
    })
    .filter((c) => c.total > 0)

  // La velocidad premia el tiempo que sobró, y solo cuenta lo que se respondió:
  // dejar preguntas en blanco no puede leerse como haber ido rápido.
  const margenes = contestadas.map((r) =>
    r.limite === 0 ? 0 : Math.max(0, Math.min(1, (r.limite - r.segundos) / r.limite))
  )
  const velocidad = margenes.length === 0 ? 0 : Math.round(promedio(margenes.map((m) => m * 100)))

  const conNota = [...porCategoria].sort((a, b) => b.porcentaje - a.porcentaje)

  return {
    total,
    correctas: correctas.length,
    incorrectas: incorrectas.length,
    sinResponder,
    porcentaje,
    tiempoPromedio: promedio(contestadas.map((r) => r.segundos)),
    tiempoCorrectas: promedio(correctas.map((r) => r.segundos)),
    tiempoIncorrectas: promedio(incorrectas.map((r) => r.segundos)),
    dentroDeTiempo: respuestas.filter((r) => r.elegida !== null && r.segundos <= r.limite).length,
    fueraDeTiempo: respuestas.filter((r) => r.elegida !== null && r.segundos > r.limite).length,
    porCategoria,
    velocidad,
    precision: porcentaje,
    global: Math.round(porcentaje * 0.7 + velocidad * 0.3),
    // Con una sola categoría no hay fortaleza ni debilidad que comparar.
    fortaleza: conNota.length > 1 ? conNota[0].categoria : null,
    porMejorar: conNota.length > 1 ? conNota[conNota.length - 1].categoria : null,
  }
}

/** Nivel alcanzado según el acierto, para el pie del resultado. */
export function nivelAlcanzado(porcentaje: number): string {
  if (porcentaje >= 90) return "Sobresaliente"
  if (porcentaje >= 75) return "Competitivo"
  if (porcentaje >= 60) return "En desarrollo"
  return "Requiere entrenamiento"
}

export const PSICO_HUB = "/app/aerolinea/psicotecnicas"
