/**
 * Práctica del módulo MEL: los tipos de los seis ejercicios y cómo se califica
 * cada uno.
 *
 * Aquí no hay contenido: solo la forma de los datos y la corrección, que son
 * funciones puras (se prueban sin pantalla). Los ítems viven en
 * `melPracticaDatos.ts` y los componentes en `components/mel/practica/`.
 *
 * Una entrada de MEL (`EntradaMel`) es REAL o INVENTADA:
 * - Real: texto literal de una MMEL de la FAA, con su cita en `fuente`
 *   («MMEL FAA A318-A321, Rev 32, 34-42-04, p. 34-20»). Es la lista maestra
 *   del tipo, no la MEL de un operador.
 * - Inventada: sin `fuente`. No se atribuye a ningún avión ni operador; la
 *   numeración va en secciones que no existen en las MMEL cargadas (XX-85 a
 *   XX-89 en capítulos ATA reales). La pantalla la rotula «Aeronave de ejemplo».
 *
 * Los plazos de las categorías A, B, C y D son los del sistema FAA (PL-25
 * Rev 24). El RAC no los define: en Colombia rigen los de la MEL aprobada del
 * operador. La pantalla lo dice en «Calcula el plazo».
 */

// ─── Lo común ────────────────────────────────────────────────────────────────

export type CategoriaMel = "A" | "B" | "C" | "D"
export type ProcedimientoMel = "M" | "O"

/**
 * Una fila de la tabla. Airbus pone las alternativas de alivio como filas sin
 * letra y los sub-ítems como «1)»; Boeing, como «01A», «01-02». Una fila sin
 * `categoria` es solo un rótulo (un sub-ítem que agrupa las filas siguientes).
 */
export interface FilaMel {
  /** Secuencia propia de la fila, si la tiene: «16-01», «01-02A». */
  secuencia?: string
  /** Sub-ítem o configuración: «1) Landing Lights», «(-600/-700/-800)». */
  subitem?: string
  categoria?: CategoriaMel
  /** Columna 2. «-» es número variable (PL-25, Dash). */
  instalados?: string
  /** Columna 3. */
  requeridos?: string
  /** Lo que va entre paréntesis al inicio de Remarks: (M), (O) o los dos. */
  procedimientos?: ProcedimientoMel[]
  /** Remarks or Exceptions, sin el (M)(O) del principio. */
  observaciones?: string
  /** Cada NOTE, sin la palabra «NOTE:». */
  notas?: string[]
}

export interface EntradaMel {
  /** «34-42-04» (Airbus), «26-16» (Boeing: capítulo y secuencia) o «29-85-01». */
  codigo: string
  /** Capítulo ATA: número y título tal como los trae la MMEL («34», «Navigation»). */
  ata: { numero: string; titulo: string }
  /** Nombre del ítem, en inglés como en la MEL. */
  titulo: string
  /** «***»: instalado en algunos aviones del tipo, no en todos (PL-25). Solo MMEL. */
  tripleAsterisco?: boolean
  filas: FilaMel[]
  /**
   * Cita de la MMEL si la entrada es real, p. ej.
   * «MMEL FAA A318-A321, Rev 32, 34-42-04, p. 34-20 (rev. 32, 07/30/2025)».
   * Sin cita, la entrada es inventada y se muestra como «Aeronave de ejemplo».
   */
  fuente?: string
}

/** Separa «a) … b) …» de Remarks en renglones, como en la MEL. */
export function partirProvisos(texto: string): string[] {
  return texto.split(/\s(?=[a-j]\) )/)
}

export function esEntradaReal(e: EntradaMel): boolean {
  return typeof e.fuente === "string" && e.fuente.length > 0
}

/** Lo común a todos los ejercicios. */
export interface EjercicioMelBase {
  /** Único dentro de su tipo. Sirve de clave de progreso. */
  id: string
  /** De dónde sale lo que sostiene la respuesta (PL-25, MMEL, RAC, 8900.1…). */
  fuente: string
  explicacion: string
}

/** Lo que un ejercicio le devuelve a la página. */
export interface ResultadoEjercicio {
  aciertos: number
  total: number
}

export function porcentaje(r: ResultadoEjercicio): number {
  return r.total > 0 ? Math.round((r.aciertos / r.total) * 100) : 0
}

/** El resultado de una parte calificada por separado. */
export interface ResultadoParte {
  id: string
  ok: boolean
}

/** Aciertos sobre total de un juego de partes. */
export function sumarPartes(partes: readonly ResultadoParte[]): ResultadoEjercicio {
  return { aciertos: partes.filter((p) => p.ok).length, total: partes.length }
}

/** ¿Eligió exactamente las correctas? (orden indiferente, sin repetidos). */
export function mismaSeleccion(elegidas: readonly number[], correctas: readonly number[]): boolean {
  const a = new Set(elegidas)
  const b = new Set(correctas)
  if (a.size !== b.size) return false
  for (const x of a) if (!b.has(x)) return false
  return true
}

// ─── Decisiones de despacho ──────────────────────────────────────────────────

/** Las tres respuestas posibles: no hay solo «sí» o «no». */
export type DecisionDespacho = "si" | "no" | "falta"

export const DECISIONES: readonly { valor: DecisionDespacho; texto: string }[] = [
  { valor: "si", texto: "Sí, cumpliendo las condiciones" },
  { valor: "no", texto: "No" },
  { valor: "falta", texto: "Falta información" },
]

// ─── a) Lee la entrada ───────────────────────────────────────────────────────

/** Las partes de una entrada que el piloto puede tocar. */
export type ParteEntrada =
  | "codigo"
  | "item"
  | "categoria"
  | "instalados"
  | "requeridos"
  | "procedimientos"
  | "observaciones"
  | "nota"

export const NOMBRE_PARTE: Record<ParteEntrada, string> = {
  codigo: "Número de ítem",
  item: "Ítem",
  categoria: "Categoría (columna 1)",
  instalados: "Instalados (columna 2)",
  requeridos: "Requeridos para despacho (columna 3)",
  procedimientos: "(M) / (O)",
  observaciones: "Remarks or Exceptions",
  nota: "NOTE",
}

/** Lo que se pregunta en un paso de respuesta. */
export type CampoLectura =
  | "sistema"
  | "ata"
  | "configuracion"
  | "categoria"
  | "plazo"
  | "instalados"
  | "requeridos"
  | "m"
  | "o"
  | "condiciones"

/** «Toca en la tabla…»: se responde tocando la parte de la entrada. */
export interface PasoToca {
  tipo: "toca"
  id: string
  enunciado: string
  parte: ParteEntrada
}

/** Pregunta de opciones; si `correctas` trae más de una, se marcan varias. */
export interface PasoElige {
  tipo: "elige"
  id: string
  campo: CampoLectura
  enunciado: string
  opciones: string[]
  correctas: number[]
}

export type PasoLectura = PasoToca | PasoElige

export interface EjLeeLaEntrada extends EjercicioMelBase {
  tipo: "leeLaEntrada"
  /** Una línea de contexto: qué dice el tech log, qué avión es. */
  contexto: string
  entrada: EntradaMel
  /** Índice en `entrada.filas` de la fila que se lee (se resalta). */
  fila: number
  pasos: PasoLectura[]
}

export type RespuestaPaso = ParteEntrada | number[]

export function calificarPasoLectura(paso: PasoLectura, respuesta: RespuestaPaso | undefined): boolean {
  if (respuesta === undefined) return false
  if (paso.tipo === "toca") return respuesta === paso.parte
  return Array.isArray(respuesta) && mismaSeleccion(respuesta, paso.correctas)
}

/** Un resultado por paso (por campo). */
export function calificarLectura(ej: EjLeeLaEntrada, respuestas: Record<string, RespuestaPaso | undefined>): ResultadoParte[] {
  return ej.pasos.map((p) => ({ id: p.id, ok: calificarPasoLectura(p, respuestas[p.id]) }))
}

// ─── b) ¿Podemos salir? ──────────────────────────────────────────────────────

export interface RazonMel {
  texto: string
  /** ¿Es una razón que sostiene la decisión correcta? */
  correcta: boolean
}

export interface EjPodemosSalir extends EjercicioMelBase {
  tipo: "podemosSalir"
  titulo: string
  /** Lo que reporta la tripulación o trae el tech log. */
  defecto: string
  entrada: EntradaMel
  /** La fila que usó (o que debería usar) mantenimiento. */
  fila: number
  /** Estado del diferido: (M), placard, fecha, extensión… Una línea cada uno. */
  estado: string[]
  /** El vuelo: hora, ruta, meteorología, plan. */
  vuelo: string[]
  decision: DecisionDespacho
  /** Si la decisión es «sí», qué hay que cumplir. Se muestra al corregir. */
  cumpliendo?: string
  /** Lista para elegir; varias pueden ser correctas. */
  razones: RazonMel[]
}

export interface ResultadoPodemosSalir extends ResultadoEjercicio {
  decisionOk: boolean
  /** Por razón: ¿quedó bien marcada o bien sin marcar? */
  razones: boolean[]
  razonesOk: boolean
}

/** Dos puntos: la decisión y el juego de razones completo. */
export function calificarPodemosSalir(
  ej: Pick<EjPodemosSalir, "decision" | "razones">,
  decision: DecisionDespacho | null,
  elegidas: readonly number[],
): ResultadoPodemosSalir {
  const set = new Set(elegidas)
  const razones = ej.razones.map((r, i) => set.has(i) === r.correcta)
  const decisionOk = decision === ej.decision
  const razonesOk = razones.every(Boolean)
  return { decisionOk, razones, razonesOk, aciertos: Number(decisionOk) + Number(razonesOk), total: 2 }
}

// ─── c) Calcula el plazo ─────────────────────────────────────────────────────

/** Días calendario de cada categoría en el sistema FAA (PL-25 Rev 24). */
export const DIAS_CATEGORIA: Record<Exclude<CategoriaMel, "A">, number> = { B: 3, C: 10, D: 120 }

/** Cuándo se anotó en el tech log. `huso` es el de la hora dada (−5 para Colombia, 0 si ya es UTC). */
export interface RegistroMel {
  /** «2026-01-26» */
  fecha: string
  /** «10:00» */
  hora: string
  huso: number
}

export interface TramoPlazo {
  id: string
  /** «BOG-MDE» */
  ruta: string
  /** Horas de vuelo del tramo. */
  horas: number
  /** Volado ya, desde que se difirió. */
  hecho?: boolean
}

export type PlazoMel =
  /** B, C, D (días de la categoría) o A en días calendario (`dias` obligatorio). */
  | { unidad: "calendario"; dias?: number }
  /** A en flight-days: solo cuentan los días en que se inicia al menos un vuelo. */
  | { unidad: "diasDeVuelo"; dias: number; /** Fechas en que el avión inicia al menos un vuelo. */ fechasConVuelo: string[] }
  /** A en vuelos, horas de vuelo o lo que ocurra primero: corre desde que se difiere. */
  | { unidad: "vuelosHoras"; vuelos?: number; horas?: number; tramos: TramoPlazo[] }

export interface EjCalculaElPlazo extends EjercicioMelBase {
  tipo: "calculaElPlazo"
  situacion: string
  entrada?: EntradaMel
  fila?: number
  categoria: CategoriaMel
  plazo: PlazoMel
  /** Solo para los plazos en días. */
  registro?: RegistroMel
  /** Referencia horaria del operador (8900.1 4-685B2)b)). */
  cuenta: "UTC" | "local"
  /**
   * En días: fechas y horas «AAAA-MM-DDTHH:MM» para elegir, con la buena entre
   * ellas. En vuelos u horas se deja vacío: las opciones son los tramos.
   */
  opciones: string[]
}

const MS_DIA = 86_400_000

function aMs(fecha: string, hora = "00:00"): number {
  const [a, m, d] = fecha.split("-").map(Number)
  const [h, mi] = hora.split(":").map(Number)
  return Date.UTC(a, m - 1, d, h, mi)
}

function aFecha(ms: number): string {
  return new Date(ms).toISOString().slice(0, 10)
}

export function sumarDias(fecha: string, n: number): string {
  return aFecha(aMs(fecha) + n * MS_DIA)
}

/**
 * El day of discovery en la referencia del operador. Si cuenta en UTC y la
 * hora se dio local, se convierte (21:30 en Bogotá, UTC−5, es 02:30 UTC del
 * día siguiente).
 */
export function diaDeDescubrimiento(registro: RegistroMel, cuenta: "UTC" | "local"): string {
  if (cuenta === "local") return registro.fecha
  return aFecha(aMs(registro.fecha, registro.hora) - registro.huso * 3_600_000)
}

/** Días del plazo en calendario: los de la categoría, o los que diga el ítem A. */
export function diasDelPlazo(ej: Pick<EjCalculaElPlazo, "categoria" | "plazo">): number | null {
  if (ej.plazo.unidad === "calendario") {
    if (ej.categoria === "A") return ej.plazo.dias ?? null
    return DIAS_CATEGORIA[ej.categoria]
  }
  if (ej.plazo.unidad === "diasDeVuelo") return ej.plazo.dias
  return null
}

/**
 * Último día del plazo en días calendario, excluyendo el day of discovery.
 * PL-25: registrado el 26 de enero a las 10:00, B vence a las 2359 del 29 y C
 * a las 2359 del 5 de febrero.
 */
export function ultimoDiaCalendario(descubrimiento: string, dias: number): string {
  return sumarDias(descubrimiento, dias)
}

/**
 * Último flight-day: el N-ésimo día, después del day of discovery, en que se
 * inicia al menos un vuelo. `null` si lo programado no alcanza.
 */
export function ultimoDiaDeVuelo(descubrimiento: string, dias: number, fechasConVuelo: readonly string[]): string | null {
  const validas = [...new Set(fechasConVuelo)].filter((f) => f > descubrimiento).sort()
  return validas.length >= dias ? validas[dias - 1] : null
}

/** Los días que cuentan, en orden (para mostrar la cuenta al corregir). */
export function diasContados(ej: EjCalculaElPlazo): string[] {
  if (!ej.registro || ej.plazo.unidad === "vuelosHoras") return []
  const desc = diaDeDescubrimiento(ej.registro, ej.cuenta)
  if (ej.plazo.unidad === "diasDeVuelo") {
    return [...new Set(ej.plazo.fechasConVuelo)].filter((f) => f > desc).sort().slice(0, ej.plazo.dias)
  }
  const n = diasDelPlazo(ej) ?? 0
  return Array.from({ length: n }, (_, i) => sumarDias(desc, i + 1))
}

export interface CuentaTramo {
  tramo: TramoPlazo
  /** Vuelos y horas acumulados desde que se difirió, incluido este. */
  vuelos: number
  horas: number
  permitido: boolean
}

/**
 * Cuenta de vuelos y horas desde el diferido (PL-25: para vuelos, tramos,
 * ciclos u horas, el intervalo empieza cuando se difiere el ítem). Con «o lo
 * que ocurra primero», un tramo se puede volar solo si al terminarlo no pasa
 * ninguno de los dos límites; el primero que pasa cierra la cuenta.
 */
export function cuentaTramos(plazo: Extract<PlazoMel, { unidad: "vuelosHoras" }>): CuentaTramo[] {
  let vuelos = 0
  let horas = 0
  let cerrado = false
  return plazo.tramos.map((tramo) => {
    vuelos += 1
    horas = Math.round((horas + tramo.horas) * 100) / 100
    const dentro =
      (plazo.vuelos === undefined || vuelos <= plazo.vuelos) && (plazo.horas === undefined || horas <= plazo.horas)
    if (!dentro) cerrado = true
    return { tramo, vuelos, horas, permitido: !cerrado }
  })
}

export const NINGUN_TRAMO = "ninguno"

/** Las opciones que ve el piloto: las del dato o, en vuelos, los tramos pendientes y «ninguno». */
export function opcionesPlazo(ej: EjCalculaElPlazo): string[] {
  if (ej.plazo.unidad !== "vuelosHoras") return ej.opciones
  return [...ej.plazo.tramos.filter((t) => !t.hecho).map((t) => t.id), NINGUN_TRAMO]
}

/**
 * La respuesta buena. En días: «AAAA-MM-DDT23:59» del último día. En vuelos u
 * horas: el id del último tramo pendiente que se puede volar, o «ninguno».
 */
export function respuestaPlazo(ej: EjCalculaElPlazo): string | null {
  if (ej.plazo.unidad === "vuelosHoras") {
    const pendientes = cuentaTramos(ej.plazo).filter((c) => !c.tramo.hecho && c.permitido)
    return pendientes.length ? pendientes[pendientes.length - 1].tramo.id : NINGUN_TRAMO
  }
  if (!ej.registro) return null
  const desc = diaDeDescubrimiento(ej.registro, ej.cuenta)
  const dias = diasDelPlazo(ej)
  if (dias === null) return null
  const ultimo =
    ej.plazo.unidad === "diasDeVuelo"
      ? ultimoDiaDeVuelo(desc, dias, ej.plazo.fechasConVuelo)
      : ultimoDiaCalendario(desc, dias)
  return ultimo ? `${ultimo}T23:59` : null
}

export function calificarPlazo(ej: EjCalculaElPlazo, elegida: string | null): boolean {
  return elegida !== null && elegida === respuestaPlazo(ej)
}

const MESES = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"]
const DIAS_SEMANA = ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"]

/** «2026-02-05» → «jue 5 feb 2026». Sin Intl: igual en cualquier navegador. */
export function formatoFecha(fecha: string): string {
  const d = new Date(aMs(fecha))
  return `${DIAS_SEMANA[d.getUTCDay()]} ${d.getUTCDate()} ${MESES[d.getUTCMonth()]} ${d.getUTCFullYear()}`
}

/** «2026-02-05T23:59» → «jue 5 feb 2026, 23:59». */
export function formatoFechaHora(valor: string): string {
  const [fecha, hora = ""] = valor.split("T")
  return hora ? `${formatoFecha(fecha)}, ${hora}` : formatoFecha(fecha)
}

// ─── d) Combinados ───────────────────────────────────────────────────────────

export interface ItemAbierto {
  entrada: EntradaMel
  fila: number
  /** «Diferido ayer, (M) firmado.» */
  estado: string
}

export interface EjCombinados extends EjercicioMelBase {
  tipo: "combinados"
  titulo: string
  items: ItemAbierto[]
  vuelo: string[]
  decision: DecisionDespacho
  cumpliendo?: string
  /** ¿Qué cruza los ítems? Una sola buena. */
  dependencia: { opciones: string[]; correcta: number }
}

export interface ResultadoCombinados extends ResultadoEjercicio {
  decisionOk: boolean
  dependenciaOk: boolean
}

export function calificarCombinados(
  ej: Pick<EjCombinados, "decision" | "dependencia">,
  decision: DecisionDespacho | null,
  dependencia: number | null,
): ResultadoCombinados {
  const decisionOk = decision === ej.decision
  const dependenciaOk = dependencia === ej.dependencia.correcta
  return { decisionOk, dependenciaOk, aciertos: Number(decisionOk) + Number(dependenciaOk), total: 2 }
}

// ─── e) Busca el ítem ────────────────────────────────────────────────────────

export interface CapituloAta {
  numero: string
  titulo: string
}

export interface ItemIndice {
  codigo: string
  titulo: string
}

export interface EjBuscaElItem extends EjercicioMelBase {
  tipo: "buscaElItem"
  /** Lo que ve o le reportan al piloto. */
  sintoma: string
  capitulos: CapituloAta[]
  /** `numero` del capítulo bueno. */
  capitulo: string
  /** Ítems del capítulo bueno, como los muestra el índice. */
  items: ItemIndice[]
  /** `codigo` del ítem bueno. */
  item: string
}

/** Dos partes: el capítulo y el ítem. */
export function calificarBusqueda(ej: EjBuscaElItem, capitulo: string | null, item: string | null): ResultadoParte[] {
  return [
    { id: "capitulo", ok: capitulo === ej.capitulo },
    { id: "item", ok: item === ej.item },
  ]
}

// ─── f) Impacto operacional ──────────────────────────────────────────────────

export type CapacidadMel =
  | "rvsm"
  | "catIIIII"
  | "edto"
  | "pbn"
  | "performance"
  | "combustible"
  | "meteorologia"
  | "ninguna"

export const CAPACIDADES: readonly { valor: CapacidadMel; texto: string }[] = [
  { valor: "rvsm", texto: "RVSM" },
  { valor: "catIIIII", texto: "Aproximación CAT II / III" },
  { valor: "edto", texto: "EDTO (ETOPS)" },
  { valor: "pbn", texto: "PBN / RNP" },
  { valor: "performance", texto: "Performance" },
  { valor: "combustible", texto: "Combustible" },
  { valor: "meteorologia", texto: "Meteorología" },
  { valor: "ninguna", texto: "Ninguna" },
]

export interface EjImpactoOperacional extends EjercicioMelBase {
  tipo: "impactoOperacional"
  contexto: string
  entrada: EntradaMel
  fila: number
  /** Las que afecta. «ninguna» va sola. */
  afecta: CapacidadMel[]
  /** Por qué, para cada capacidad que conviene comentar al corregir. */
  porQue?: Partial<Record<CapacidadMel, string>>
}

export interface ResultadoImpacto extends ResultadoEjercicio {
  /** Por capacidad: acertada (marcada y afecta), omitida (no marcada y afecta), sobra (marcada y no afecta). */
  estado: Partial<Record<CapacidadMel, "acierto" | "omitida" | "sobra">>
  ok: boolean
}

/**
 * Aciertos sobre la unión de lo esperado y lo marcado: marcar todo no suma, y
 * no marcar nada da cero.
 */
export function calificarImpacto(ej: Pick<EjImpactoOperacional, "afecta">, marcadas: readonly CapacidadMel[]): ResultadoImpacto {
  const esperadas = new Set(ej.afecta)
  const dadas = new Set(marcadas)
  const estado: ResultadoImpacto["estado"] = {}
  let aciertos = 0
  for (const c of new Set([...esperadas, ...dadas])) {
    if (esperadas.has(c) && dadas.has(c)) {
      estado[c] = "acierto"
      aciertos++
    } else if (esperadas.has(c)) estado[c] = "omitida"
    else estado[c] = "sobra"
  }
  const total = new Set([...esperadas, ...dadas]).size
  return { estado, aciertos, total, ok: aciertos === total && total > 0 }
}

/** Marcar «ninguna» quita las demás, y marcar otra quita «ninguna». */
export function alternarCapacidad(marcadas: readonly CapacidadMel[], c: CapacidadMel): CapacidadMel[] {
  if (marcadas.includes(c)) return marcadas.filter((x) => x !== c)
  if (c === "ninguna") return ["ninguna"]
  return [...marcadas.filter((x) => x !== "ninguna"), c]
}

// ─── Todos ───────────────────────────────────────────────────────────────────

export type EjercicioMel =
  | EjLeeLaEntrada
  | EjPodemosSalir
  | EjCalculaElPlazo
  | EjCombinados
  | EjBuscaElItem
  | EjImpactoOperacional

export type TipoEjercicioMel = EjercicioMel["tipo"]

export const NOMBRE_TIPO_MEL: Record<TipoEjercicioMel, string> = {
  leeLaEntrada: "Lee la entrada",
  podemosSalir: "¿Podemos salir?",
  calculaElPlazo: "Calcula el plazo",
  combinados: "Ítems combinados",
  buscaElItem: "Busca el ítem",
  impactoOperacional: "Impacto operacional",
}

/** Clave de progreso de un ítem, para el catálogo y la base. Nunca a mano. */
export function claveEjercicioMel(ej: Pick<EjercicioMel, "tipo" | "id">): string {
  return `mel-${ej.tipo}-${ej.id}`
}

/** Las entradas que muestra un ejercicio (para verificar datos y citas). */
export function entradasDe(ej: EjercicioMel): EntradaMel[] {
  switch (ej.tipo) {
    case "leeLaEntrada":
    case "podemosSalir":
    case "impactoOperacional":
      return [ej.entrada]
    case "calculaElPlazo":
      return ej.entrada ? [ej.entrada] : []
    case "combinados":
      return ej.items.map((i) => i.entrada)
    case "buscaElItem":
      return []
  }
}
