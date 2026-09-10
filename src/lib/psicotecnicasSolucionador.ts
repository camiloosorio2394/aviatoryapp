/**
 * El solucionador de series de figuras.
 *
 * Existe por un problema concreto: el cuadernillo A2 (`455247140`) trae 61
 * ejercicios y **ninguna hoja de respuestas**. Por eso llevaba desde el 8 de
 * septiembre extraído pero sin cargar —resolverlos a ojo y publicarlos habría
 * sido peor que no tenerlos, porque un banco de entrenamiento con respuestas
 * equivocadas enseña al revés—.
 *
 * Dibujar las figuras cambia el problema. Cuando la casilla deja de ser un
 * pixel y pasa a ser «flecha hacia arriba en el cuadrante 1», la regla de la
 * serie se puede buscar: se prueba una familia cerrada de transformaciones
 * contra los pares de casillas que sí se conocen, y solo cuenta la que explica
 * **todos** los pares. La respuesta ya no es la que alguien creyó ver, sino la
 * única que se deduce de la regla que gobierna el resto de la serie.
 *
 * Lo que este módulo NO hace, y es deliberado:
 *
 * - No inventa reglas nuevas para encajar un ejercicio. Si ninguna de la
 *   familia explica la serie, el ejercicio sale con `motivo` y se queda fuera
 *   del banco.
 * - No se conforma con un solo par de apoyo. Una regla confirmada por una
 *   única pareja de casillas no es una regla: es una coincidencia. Se piden
 *   dos, como mínimo.
 * - No resuelve empates. Si dos reglas explican la serie y predicen casillas
 *   distintas, el ejercicio es ambiguo en el original y también sale fuera.
 *
 * Lo usa `scripts/psicotecnicas/verificar-figuras.mjs`. La aplicación no lo
 * importa: en la app la respuesta ya está decidida y guardada.
 */

import type { Casilla, Celda, Cuadrante, Elemento, Figura, Sentido } from "./psicotecnicasFiguras"
import { esIncognita } from "./psicotecnicasFiguras"

// ────────────────────────────────────────────────────────────────────────────
// La familia de transformaciones
//
// Cerrada y pequeña a propósito. Son los movimientos que estos cuadernillos
// usan de verdad —girar la rejilla, reflejarla, invertir el sentido de las
// flechas— y nada más. Ampliarla para que entre un ejercicio rebelde es
// justamente la trampa que hace que un banco parezca verificado sin estarlo.

type MapaCuadrantes = Record<Cuadrante, Cuadrante>
type MapaSentidos = Record<Sentido, Sentido>

interface Geometria {
  nombre: string
  cuadrantes: MapaCuadrantes
  sentidos: MapaSentidos
}

const SIN_GIRO: MapaSentidos = {
  arriba: "arriba",
  abajo: "abajo",
  izquierda: "izquierda",
  derecha: "derecha",
}

/** Un cuarto de vuelta en el sentido del reloj, aplicado al sentido. */
const GIRO_90: MapaSentidos = {
  arriba: "derecha",
  derecha: "abajo",
  abajo: "izquierda",
  izquierda: "arriba",
}

const GIRO_180: MapaSentidos = {
  arriba: "abajo",
  abajo: "arriba",
  izquierda: "derecha",
  derecha: "izquierda",
}

const GIRO_270: MapaSentidos = {
  arriba: "izquierda",
  izquierda: "abajo",
  abajo: "derecha",
  derecha: "arriba",
}

/** Espejo sobre el eje vertical: cambia izquierda por derecha, no arriba. */
const ESPEJO_V: MapaSentidos = {
  arriba: "arriba",
  abajo: "abajo",
  izquierda: "derecha",
  derecha: "izquierda",
}

/** Espejo sobre el eje horizontal. */
const ESPEJO_H: MapaSentidos = {
  arriba: "abajo",
  abajo: "arriba",
  izquierda: "izquierda",
  derecha: "derecha",
}

// Cuadrantes: 0=sup-izq 1=sup-der 2=inf-izq 3=inf-der
const GEOMETRIAS: Geometria[] = [
  { nombre: "igual", cuadrantes: { 0: 0, 1: 1, 2: 2, 3: 3 }, sentidos: SIN_GIRO },
  { nombre: "giro de 90°", cuadrantes: { 0: 1, 1: 3, 3: 2, 2: 0 }, sentidos: GIRO_90 },
  { nombre: "giro de 180°", cuadrantes: { 0: 3, 1: 2, 2: 1, 3: 0 }, sentidos: GIRO_180 },
  { nombre: "giro de 270°", cuadrantes: { 0: 2, 2: 3, 3: 1, 1: 0 }, sentidos: GIRO_270 },
  { nombre: "espejo vertical", cuadrantes: { 0: 1, 1: 0, 2: 3, 3: 2 }, sentidos: ESPEJO_V },
  { nombre: "espejo horizontal", cuadrantes: { 0: 2, 2: 0, 1: 3, 3: 1 }, sentidos: ESPEJO_H },
]

export interface Transformacion {
  nombre: string
  aplicar: (celda: Celda) => Celda
}

/**
 * Las doce transformaciones: cada geometría, con el sentido de las flechas
 * respetado o invertido.
 *
 * La inversión del sentido va aparte de la geometría porque en estos
 * cuadernillos aparece sola constantemente: la rejilla se queda quieta y lo
 * único que cambia es hacia dónde apuntan las flechas.
 */
const FAMILIA: Transformacion[] = GEOMETRIAS.flatMap((g) =>
  [false, true].map((invertir) => ({
    nombre: invertir ? `${g.nombre} + sentido invertido` : g.nombre,
    aplicar: (celda: Celda): Celda => ({
      ...celda,
      elementos: celda.elementos.map((el): Elemento => {
        // Solo la flecha tiene cuadrante y sentido que girar. Lo demás —el
        // triángulo, el mástil, el trazo de esquina— se mueve con la celda
        // entera y no cambia bajo estas transformaciones.
        if (el.tipo !== "flecha") return el
        const sentido = g.sentidos[el.sentido]
        return {
          ...el,
          cuadrante: g.cuadrantes[el.cuadrante],
          sentido: invertir ? GIRO_180[sentido] : sentido,
        }
      }),
    }),
  }))
)

// ────────────────────────────────────────────────────────────────────────────
// Combinaciones
//
// La otra mitad del repertorio de estos cuadernillos: la tercera casilla de
// cada fila sale de las dos primeras. La unión —lo que está en cualquiera de
// las dos— y la diferencia simétrica —lo que está en una y no en la otra— son
// las dos que aparecen; la segunda es la que hace que un elemento repetido
// desaparezca, que es el truco clásico de la familia.

interface Combinacion {
  nombre: string
  aplicar: (a: Celda, b: Celda) => Celda
}

/** Clave de un elemento suelto, para poder tratarlos como conjunto. */
function claveElemento(el: Elemento): string {
  return JSON.stringify(el, Object.keys(el).sort())
}

function combinar(a: Celda, b: Celda, quedarse: (enA: boolean, enB: boolean) => boolean): Celda {
  const mapa = new Map<string, Elemento>()
  for (const el of [...a.elementos, ...b.elementos]) mapa.set(claveElemento(el), el)

  const clavesA = new Set(a.elementos.map(claveElemento))
  const clavesB = new Set(b.elementos.map(claveElemento))

  return {
    ...a,
    elementos: [...mapa].filter(([k]) => quedarse(clavesA.has(k), clavesB.has(k))).map(([, el]) => el),
  }
}

const COMBINACIONES: Combinacion[] = [
  { nombre: "unión de las dos primeras", aplicar: (a, b) => combinar(a, b, (x, y) => x || y) },
  {
    nombre: "lo que está en una y no en la otra",
    aplicar: (a, b) => combinar(a, b, (x, y) => x !== y),
  },
]

// ────────────────────────────────────────────────────────────────────────────
// Comparación

/**
 * Firma de una celda, con los elementos ordenados.
 *
 * Dos celdas son la misma figura aunque sus elementos estén escritos en otro
 * orden: el orden de la lista es cómo se transcribió, no lo que se ve.
 */
export function firma(celda: Celda, libres?: Set<string>): string {
  if (!libres?.size) return celda.elementos.map(claveElemento).sort().join("|")
  const sinLibres = (el: Elemento) => {
    const copia = { ...(el as unknown as Record<string, unknown>) }
    for (const clave of libres) if (clave.startsWith(`${el.tipo}.`)) delete copia[clave.slice(el.tipo.length + 1)]
    return JSON.stringify(copia, Object.keys(copia).sort())
  }
  return celda.elementos.map(sinLibres).sort().join("|")
}

export function mismaCelda(a: Celda, b: Celda): boolean {
  return firma(a) === firma(b)
}

// ────────────────────────────────────────────────────────────────────────────
// La búsqueda

export interface Regla {
  /** Cada cuántas casillas se aplica. 1 = seguidas; 2 = series entrelazadas. */
  salto: number
  transformacion: string
  /** Cuántos pares de casillas conocidas confirman la regla. */
  apoyos: number
}

export type Diagnostico =
  | { estado: "resuelto"; opcion: number; reglas: Regla[] }
  | { estado: "sin-regla"; motivo: string }
  | { estado: "ambiguo"; motivo: string }

/** Mínimo de apoyos que tiene que reunir una regla para tenerse en pie. */
const APOYOS_MINIMOS = 2

/** Saltos que se prueban: seguidas, alternas y de tres en tres. */
const SALTOS = [1, 2, 3]

/** Una casilla candidata a ocupar el hueco, y las reglas que la proponen. */
interface Candidata {
  celda: Celda
  reglas: Regla[]
  /**
   * Atributos que ninguna regla de la familia explica, como `grupo-simbolos
   * .orientacion` en el ejercicio 12 de A1.
   *
   * La predicción se emite sin ellos y valen cualquier cosa al enfrentarla a
   * las alternativas. No es un agujero: si más de una alternativa encaja con
   * lo que sí se dedujo, `dictaminar` lo llama ambiguo y el ejercicio no sale.
   * Lo único que cambia es que un atributo que la matriz no hace variar por
   * filas ni por columnas deje de tumbar la deducción entera.
   */
  libres: Set<string>
}

/** Añade una predicción a la lista, juntándola con las que ya coinciden. */
function proponer(
  candidatas: Map<string, Candidata>,
  celda: Celda,
  regla: Regla,
  libres: Set<string> = new Set()
) {
  const clave = firma(celda, libres)
  const previa = candidatas.get(clave)
  if (previa) previa.reglas.push(regla)
  else candidatas.set(clave, { celda, reglas: [regla], libres })
}

/**
 * El veredicto, una vez reunidas todas las predicciones.
 *
 * Una regla que predice una casilla que no está entre las alternativas no
 * contradice nada: sencillamente este ejercicio no la usa. Lo que sí es una
 * contradicción, y saca al ejercicio del banco, es que dos reglas que explican
 * la figura apunten a **alternativas distintas**: ahí el original es ambiguo y
 * no hay respuesta que defender.
 */
function dictaminar(candidatas: Candidata[], opciones: Celda[]): Diagnostico {
  if (candidatas.length === 0) {
    return {
      estado: "sin-regla",
      motivo:
        "ninguna regla de la familia explica la figura con al menos " +
        `${APOYOS_MINIMOS} apoyos`,
    }
  }

  const senaladas = new Map<number, Regla[]>()
  for (const c of candidatas) {
    const suya = firma(c.celda, c.libres)
    const encajan = opciones
      .map((o, i) => (firma(o, c.libres) === suya ? i : -1))
      .filter((i) => i >= 0)
    if (encajan.length > 1) {
      return {
        estado: "ambiguo",
        motivo: `las alternativas ${encajan.map((i) => i + 1).join(" y ")} son la misma figura`,
      }
    }
    if (encajan.length === 1) {
      senaladas.set(encajan[0], [...(senaladas.get(encajan[0]) ?? []), ...c.reglas])
    }
  }

  if (senaladas.size === 0) {
    return {
      estado: "sin-regla",
      motivo: "las reglas que explican la figura predicen una casilla que no está entre las alternativas",
    }
  }

  if (senaladas.size > 1) {
    const cuales = [...senaladas]
      .map(([i, reglas]) => `la ${i + 1} por «${reglas[0].transformacion}»`)
      .join(" y ")
    return {
      estado: "ambiguo",
      motivo: `dos reglas explican la figura y señalan alternativas distintas: ${cuales}`,
    }
  }

  const [opcion, reglas] = [...senaladas][0]
  return { estado: "resuelto", opcion, reglas }
}

/** Índices de las casillas conocidas y del hueco. */
function localizarHueco(celdas: Casilla[]): number | string {
  const huecos = celdas.map((c, i) => (esIncognita(c) ? i : -1)).filter((i) => i >= 0)
  if (huecos.length !== 1) return `la figura tiene ${huecos.length} incógnitas, y se espera una`
  return huecos[0]
}

/**
 * Reglas de recorrido: la casilla siguiente sale de la anterior por una
 * transformación fija. Sirve para la serie en línea y, dentro de la matriz,
 * para recorrer filas y columnas.
 */
function reglasDeRecorrido(
  celdas: Casilla[],
  hueco: number,
  candidatas: Map<string, Candidata>,
  etiqueta = ""
) {
  const conocida = (i: number): Celda | null => {
    if (i < 0 || i >= celdas.length) return null
    const c = celdas[i]
    return esIncognita(c) ? null : c
  }

  for (const salto of SALTOS) {
    for (const t of FAMILIA) {
      let apoyos = 0
      let falla = false

      for (let i = 0; i + salto < celdas.length; i++) {
        const desde = conocida(i)
        const hasta = conocida(i + salto)
        if (!desde || !hasta) continue // el par toca la incógnita: no dice nada
        if (mismaCelda(t.aplicar(desde), hasta)) apoyos++
        else {
          falla = true
          break
        }
      }

      if (falla || apoyos < APOYOS_MINIMOS) continue

      const origen = conocida(hueco - salto)
      if (!origen) continue

      proponer(candidatas, t.aplicar(origen), {
        salto,
        transformacion: etiqueta ? `${t.nombre} ${etiqueta}` : t.nombre,
        apoyos,
      })
    }
  }
}

/**
 * Reglas de combinación dentro de la matriz: la tercera casilla de cada fila
 * —o de cada columna— sale de las dos primeras.
 */
function reglasDeCombinacion(celdas: Casilla[], hueco: number, candidatas: Map<string, Candidata>) {
  const porFilas = [0, 1, 2].map((f) => [f * 3, f * 3 + 1, f * 3 + 2])
  const porColumnas = [0, 1, 2].map((c) => [c, c + 3, c + 6])

  for (const [etiqueta, lineas] of [
    ["por filas", porFilas],
    ["por columnas", porColumnas],
  ] as const) {
    for (const comb of COMBINACIONES) {
      let apoyos = 0
      let falla = false
      let linea: number[] | null = null

      for (const l of lineas) {
        if (l.includes(hueco)) {
          linea = l
          continue
        }
        const [a, b, c] = l.map((i) => celdas[i])
        if (esIncognita(a) || esIncognita(b) || esIncognita(c)) continue
        if (mismaCelda(comb.aplicar(a, b), c)) apoyos++
        else {
          falla = true
          break
        }
      }

      if (falla || apoyos < APOYOS_MINIMOS || !linea) continue

      // Solo se predice cuando el hueco es la casilla que la regla calcula: la
      // tercera. Despejar hacia atrás una unión no tiene solución única, y
      // fingir que la tiene es exactamente como se cuela una respuesta mala.
      if (linea[2] !== hueco) continue
      const [a, b] = linea.map((i) => celdas[i])
      if (esIncognita(a) || esIncognita(b)) continue

      proponer(candidatas, comb.aplicar(a, b), {
        salto: 0,
        transformacion: `${comb.nombre}, ${etiqueta}`,
        apoyos,
      })
    }
  }
}

// ────────────────────────────────────────────────────────────────────────────
// Reglas por atributo
//
// La familia más común del A1, y la que las explicaciones del banco llaman
// «como en un sudoku»: la matriz no mueve la figura entera, mueve **cada
// atributo por su cuenta**. Uno se queda constante en cada fila, otro reparte
// sus tres valores sin repetirlos, y la casilla que falta es la combinación
// que todavía no ha salido.
//
// Por eso aquí no se compara la casilla completa: se descompone en atributos,
// se le busca regla a cada uno, y solo si **todos** la tienen se propone una
// casilla. Si un atributo se queda sin regla, la matriz no se resuelve por
// aquí: es preferible no pronunciarse a inventar la mitad.

const FILAS = [0, 1, 2].map((f) => [f * 3, f * 3 + 1, f * 3 + 2])
const COLUMNAS = [0, 1, 2].map((c) => [c, c + 3, c + 6])

/** El reparto de valores de una línea, ordenado, para poder comparar líneas. */
function reparto(valores: string[]): string {
  return [...valores].sort().join("|")
}

interface ReglaAtributo {
  valor: string
  nombre: string
  apoyos: number
}

/**
 * Busca la regla de un atributo sobre la retícula de tres por tres.
 *
 * Dos reglas, y las dos tienen que cuadrar en filas **y** en columnas cuando
 * les toca. Si las dos se sostienen y predicen valores distintos, se devuelve
 * nada: el atributo es ambiguo y con eso la matriz entera lo es.
 */
/**
 * Lo que se sabe de un atributo.
 *
 * `null` es «ninguna regla de la familia lo explica»: el atributo queda libre y
 * la predicción sale sin él. `"contradictorio"` es otra cosa muy distinta —dos
 * reglas se sostienen y señalan valores distintos—, y eso no se deja pasar: un
 * atributo que dice dos cosas a la vez saca al ejercicio del banco.
 */
type Veredicto = ReglaAtributo | null | "contradictorio"

function reglaDeAtributo(valores: (string | null)[], hueco: number): Veredicto {
  const candidatas: ReglaAtributo[] = []

  // 1 · Constante a lo largo de cada fila (o de cada columna).
  for (const [nombre, lineas] of [
    ["constante en cada fila", FILAS],
    ["constante en cada columna", COLUMNAS],
  ] as const) {
    const linea = lineas.find((l) => l.includes(hueco))!
    const otras = lineas.filter((l) => l !== linea)
    const uniforme = (l: number[]) => {
      const vs = l.map((i) => valores[i]).filter((v): v is string => v !== null)
      return vs.length > 0 && vs.every((v) => v === vs[0])
    }
    if (!otras.every(uniforme) || !uniforme(linea)) continue
    const valor = linea.map((i) => valores[i]).find((v): v is string => v !== null)!
    candidatas.push({ valor, nombre, apoyos: otras.length })
  }

  // 2 · Mismo reparto de valores en todas las filas y en todas las columnas.
  //     Cubre el sudoku de tres valores distintos y también los reparto como
  //     «dos sí y uno no», que es como se comportan los atributos de sí o no.
  const completa = (l: number[]) => l.every((i) => valores[i] !== null)
  const filasEnteras = FILAS.filter(completa)
  const columnasEnteras = COLUMNAS.filter(completa)

  if (filasEnteras.length >= 2 && columnasEnteras.length >= 2) {
    const repartos = [...filasEnteras, ...columnasEnteras].map((l) =>
      reparto(l.map((i) => valores[i] as string))
    )
    if (repartos.every((r) => r === repartos[0])) {
      const esperado = repartos[0].split("|")
      /** Lo que le falta a la línea del hueco para tener el reparto completo. */
      const loQueFalta = (linea: number[]): string | null => {
        const restantes = [...esperado]
        for (const i of linea) {
          const v = valores[i]
          if (v === null) continue
          const donde = restantes.indexOf(v)
          if (donde < 0) return null
          restantes.splice(donde, 1)
        }
        return restantes.length === 1 ? restantes[0] : null
      }
      const porFila = loQueFalta(FILAS.find((l) => l.includes(hueco))!)
      const porColumna = loQueFalta(COLUMNAS.find((l) => l.includes(hueco))!)
      if (porFila !== null && porFila === porColumna) {
        candidatas.push({
          valor: porFila,
          nombre: "mismo reparto en cada fila y en cada columna",
          apoyos: filasEnteras.length + columnasEnteras.length,
        })
      }
    }
  }

  // 3 · Mismo reparto en cada fila, aunque las columnas no lo cumplan (o al
  //     revés). Es más floja que la 2 y por eso pide más para valer: que el
  //     reparto sean tres valores **distintos**. Un reparto de dos valores
  //     —«dos sí y un no»— repetido en tres filas se da por casualidad
  //     demasiado a menudo; tres valores distintos en las tres filas, no.
  //
  //     Existe porque el cuadernillo la usa: en la matriz 19 los puntos van 0,
  //     2 y 4 en cada fila y las columnas no dicen nada. Vale dos apoyos, los
  //     justos, para que en el verificador se vea que la figura se sostiene
  //     sobre un solo eje.
  for (const [nombre, lineas] of [
    ["mismo reparto en cada fila, no en las columnas", FILAS],
    ["mismo reparto en cada columna, no en las filas", COLUMNAS],
  ] as const) {
    const enteras = lineas.filter(completa)
    if (enteras.length < 2) continue
    const repartos = enteras.map((l) => reparto(l.map((i) => valores[i] as string)))
    if (!repartos.every((r) => r === repartos[0])) continue
    const esperado = repartos[0].split("|")
    if (new Set(esperado).size !== 3) continue
    const restantes = [...esperado]
    let cabe = true
    for (const i of lineas.find((l) => l.includes(hueco))!) {
      const v = valores[i]
      if (v === null) continue
      const donde = restantes.indexOf(v)
      if (donde < 0) cabe = false
      else restantes.splice(donde, 1)
    }
    if (cabe && restantes.length === 1) {
      candidatas.push({ valor: restantes[0], nombre, apoyos: 2 })
    }
  }

  if (candidatas.length === 0) return null
  // Si dos reglas se sostienen y no coinciden, el atributo dice dos cosas a la
  // vez. Eso no es no saber: es que la transcripción o la figura están mal.
  if (candidatas.some((c) => c.valor !== candidatas[0].valor)) return "contradictorio"
  return candidatas.sort((a, b) => b.apoyos - a.apoyos)[0]
}

/** Las claves de un elemento, sin el discriminante. */
function clavesDe(el: Elemento): string[] {
  return Object.keys(el).filter((k) => k !== "tipo").sort()
}

function reglasPorAtributo(
  celdas: Casilla[],
  hueco: number,
  candidatas: Map<string, Candidata>
) {
  if (celdas.length !== 9) return

  const conocidas = celdas.map((c) => (esIncognita(c) ? null : c))
  const tipos = new Set<string>()
  for (const c of conocidas) if (c) for (const el of c.elementos) tipos.add(el.tipo)

  // Esta familia describe figuras compuestas —un elemento con varios
  // atributos—, no montones de piezas sueltas del mismo tipo. Con dos
  // elementos del mismo tipo en una casilla no hay «el valor del atributo».
  for (const c of conocidas) {
    if (!c) continue
    for (const tipo of tipos) {
      if (c.elementos.filter((el) => el.tipo === tipo).length > 1) return
    }
  }

  const elementos: Elemento[] = []
  const nombres: string[] = []
  const libres = new Set<string>()
  let apoyos = 0

  for (const tipo of [...tipos].sort()) {
    const deCada = conocidas.map((c) => c?.elementos.find((el) => el.tipo === tipo) ?? null)

    // ¿Está o no está? También es un atributo.
    const presencia = reglaDeAtributo(
      conocidas.map((c, i) => (c === null ? null : deCada[i] ? "sí" : "no")),
      hueco
    )
    if (!presencia || presencia === "contradictorio") return
    apoyos += presencia.apoyos
    if (presencia.valor === "no") {
      nombres.push(`${tipo}: no está (${presencia.nombre})`)
      continue
    }

    const muestra = deCada.find((el): el is Elemento => el !== null)
    if (!muestra) return

    const armado: Record<string, unknown> = { tipo }
    let deducidos = 0
    for (const clave of clavesDe(muestra)) {
      const crudos = new Map<string, unknown>()
      const valores = deCada.map((el, i) => {
        if (conocidas[i] === null) return null
        if (!el) return "—"
        const bruto = (el as unknown as Record<string, unknown>)[clave]
        const texto = JSON.stringify(bruto) ?? "—"
        crudos.set(texto, bruto)
        return texto
      })
      const regla = reglaDeAtributo(valores, hueco)
      if (regla === "contradictorio") return
      if (!regla || !crudos.has(regla.valor)) {
        // Ninguna regla de la familia explica este atributo. Antes eso tumbaba
        // la figura entera; ahora se apunta como libre y la predicción sale sin
        // él. Lo que decide sigue siendo lo deducido: si con eso encaja más de
        // una alternativa, `dictaminar` lo llama ambiguo.
        libres.add(`${tipo}.${clave}`)
        nombres.push(`${clave}: sin regla, se deja libre`)
        continue
      }
      armado[clave] = crudos.get(regla.valor)
      nombres.push(`${clave}: ${regla.nombre}`)
      apoyos += regla.apoyos
      deducidos++
    }
    // Un elemento del que no se dedujo ni un atributo no es una predicción, es
    // un hueco con nombre. Con eso no se firma nada.
    if (clavesDe(muestra).length > 0 && deducidos === 0) return
    elementos.push(armado as unknown as Elemento)
  }

  if (elementos.length === 0) return

  const molde = conocidas.find((c): c is Celda => c !== null)!
  proponer(
    candidatas,
    { ...molde, elementos },
    { salto: 0, transformacion: `atributo a atributo — ${nombres.join("; ")}`, apoyos },
    libres
  )
}

/**
 * Deduce qué alternativa completa la figura.
 *
 * Devuelve el índice de la opción solo cuando las reglas que explican la
 * figura señalan una y la misma alternativa. Cualquier otra cosa —ninguna
 * regla, reglas que señalan alternativas distintas, alternativas repetidas—
 * sale como diagnóstico de por qué el ejercicio no se puede publicar.
 */
export function resolverFigura(figura: Figura): Diagnostico {
  const hueco = localizarHueco(figura.celdas)
  if (typeof hueco === "string") return { estado: "sin-regla", motivo: hueco }

  const candidatas = new Map<string, Candidata>()

  if (figura.tipo === "serie-lineal") {
    reglasDeRecorrido(figura.celdas, hueco, candidatas)
  } else {
    reglasPorAtributo(figura.celdas, hueco, candidatas)
    reglasDeCombinacion(figura.celdas, hueco, candidatas)

    // La matriz también se recorre: por su fila y por su columna.
    const fila = Math.floor(hueco / 3)
    const columna = hueco % 3
    reglasDeRecorrido(
      figura.celdas.slice(fila * 3, fila * 3 + 3),
      columna,
      candidatas,
      "a lo largo de la fila"
    )
    reglasDeRecorrido(
      [figura.celdas[columna], figura.celdas[columna + 3], figura.celdas[columna + 6]],
      fila,
      candidatas,
      "a lo largo de la columna"
    )
  }

  return dictaminar([...candidatas.values()], figura.opciones)
}

/** Atajo para las series en línea, que es como se probó el método. */
export function resolverSerie(celdas: Casilla[], opciones: Celda[]): Diagnostico {
  return resolverFigura({ tipo: "serie-lineal", celdas, opciones })
}
