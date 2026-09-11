/**
 * Psicotécnicas calificadas en el servidor.
 *
 * Los ejercicios, el reloj y la nota viven en la base: psico_iniciar sortea la
 * tanda y entrega solo lo que se ve durante el ejercicio, psico_responder mide
 * el tiempo y registra cada respuesta una vez (en entrenamiento devuelve la
 * corrección), psico_aplazar reinicia el reloj de un ejercicio que se deja para
 * el final y psico_terminar calcula precisión, velocidad y global y guarda el
 * intento. Ver supabase/migrations/20260911161250_psicotecnicas_en_el_servidor.sql.
 */

import type { CategoriaPsico, ModoPsico, NivelPsico, RespuestaPsico } from "@/lib/psicotecnicas"
import type { Figura } from "@/lib/psicotecnicasFiguras"
import { entero, enteroONulo, esObjeto, llamarRpc, texto, textoONulo, type Crudo } from "@/services/rpc"

/** Lo que el piloto ve mientras resuelve: sin id, familia, respuesta ni explicación. */
export interface EjercicioEnPantalla {
  posicion: number
  enunciado: string
  opciones: string[]
  /** Las letras ya vienen dibujadas en la imagen: los botones van sin texto repetido. */
  opcionesEnImagen: boolean
  imagen: string | null
  imagenAlt: string | null
  figura: Figura | null
  /** Segundos que tiene este ejercicio en este modo y nivel. */
  limite: number
}

export interface SesionPsico {
  id: string
  modo: ModoPsico
  ejercicios: EjercicioEnPantalla[]
}

/** Lo que se revela de un ejercicio al corregirlo. */
export interface SolucionPsico {
  /** Id estable del ejercicio, para reportar un problema con él. */
  id: string
  /** Índice de la opción correcta. */
  respuesta: number
  explicacion: string
  subcategoria: string
  fuente: string | null
}

export interface CorreccionPsico extends SolucionPsico {
  correcta: boolean
}

export interface RespuestaRegistradaPsico {
  posicion: number
  /** null: se acabó el tiempo sin responder, o llegó con el reloj vencido. */
  opcion: number | null
  segundos: number
  limite: number
  /** Solo en entrenamiento. */
  correccion: CorreccionPsico | null
}

export interface ResultadoPsicoServidor {
  total: number
  correctas: number
  porcentaje: number
  velocidad: number
  global: number
  /** Umbral del simulacro (module_thresholds). */
  aprobacion: number | null
  /** Por posición, con el id del ejercicio: lo que usa calcularResultado(). */
  respuestas: RespuestaPsico[]
  /** Por posición. */
  soluciones: Map<number, SolucionPsico>
}

/** Un ejercicio de la tanda con lo que se respondió y su solución, para repasarlo. */
export interface ItemRepaso {
  ejercicio: EjercicioEnPantalla
  respuesta: RespuestaPsico
  solucion: SolucionPsico
}

export interface ParametrosPsico {
  modo: ModoPsico
  categoria: CategoriaPsico | "todas"
  nivel: NivelPsico | "todos"
  /** Se ignora en el simulacro, que siempre es de 30. */
  cantidad: number
}

// ─── Lectura ─────────────────────────────────────────────────────────────────

const MODOS: readonly ModoPsico[] = ["entrenamiento", "evaluacion", "simulacion"]
const CATEGORIAS: readonly CategoriaPsico[] = ["abstracto", "espacial", "numerico"]

function figuraDe(v: unknown): Figura | null {
  if (v === null || v === undefined) return null
  // La figura la dibuja psicotecnicasFiguras; aquí basta con que tenga su forma general.
  if (!esObjeto(v) || !Array.isArray(v.celdas) || !Array.isArray(v.opciones)) {
    throw new Error("figura con forma inesperada")
  }
  if (v.tipo !== "serie-lineal" && v.tipo !== "matriz-3x3") throw new Error("figura de tipo desconocido")
  return v as unknown as Figura
}

function solucionDe(o: Crudo): SolucionPsico {
  return {
    id: texto(o.id),
    respuesta: entero(o.respuesta),
    explicacion: typeof o.explicacion === "string" ? o.explicacion : "",
    subcategoria: typeof o.subcategoria === "string" ? o.subcategoria : "",
    fuente: textoONulo(o.fuente),
  }
}

export function leerSesionPsico(datos: unknown): SesionPsico {
  if (!esObjeto(datos) || !Array.isArray(datos.ejercicios)) throw new Error("sesión con forma inesperada")
  const modo = datos.modo as ModoPsico
  if (!MODOS.includes(modo)) throw new Error("modo desconocido")
  return {
    id: texto(datos.sesion),
    modo,
    ejercicios: datos.ejercicios.map((e) => {
      if (!esObjeto(e) || !Array.isArray(e.opciones)) throw new Error("ejercicio con forma inesperada")
      return {
        posicion: entero(e.posicion),
        enunciado: texto(e.enunciado),
        opciones: e.opciones.map(texto),
        opcionesEnImagen: e.opciones_en_imagen === true,
        imagen: textoONulo(e.imagen),
        imagenAlt: textoONulo(e.imagen_alt),
        figura: figuraDe(e.figura),
        limite: entero(e.limite),
      }
    }),
  }
}

export function leerRespuestaPsico(datos: unknown): RespuestaRegistradaPsico {
  if (!esObjeto(datos)) throw new Error("respuesta con forma inesperada")
  return {
    posicion: entero(datos.posicion),
    opcion: enteroONulo(datos.opcion),
    segundos: entero(datos.segundos),
    limite: entero(datos.limite),
    correccion: "respuesta" in datos ? { ...solucionDe(datos), correcta: datos.correcta === true } : null,
  }
}

export function leerResultadoPsico(datos: unknown): ResultadoPsicoServidor {
  if (!esObjeto(datos) || !Array.isArray(datos.respuestas) || !Array.isArray(datos.revision)) {
    throw new Error("resultado con forma inesperada")
  }
  const soluciones = new Map<number, SolucionPsico>()
  for (const r of datos.revision) {
    if (!esObjeto(r)) throw new Error("revisión con forma inesperada")
    soluciones.set(entero(r.posicion), solucionDe(r))
  }
  return {
    total: entero(datos.total),
    correctas: entero(datos.correctas),
    porcentaje: entero(datos.porcentaje),
    velocidad: entero(datos.velocidad),
    global: entero(datos.global),
    aprobacion: enteroONulo(datos.aprobacion),
    soluciones,
    respuestas: datos.respuestas.map((r) => {
      if (!esObjeto(r)) throw new Error("respuesta con forma inesperada")
      const posicion = entero(r.posicion)
      const categoria = r.categoria as CategoriaPsico
      if (!CATEGORIAS.includes(categoria)) throw new Error("categoría desconocida")
      const solucion = soluciones.get(posicion)
      if (!solucion) throw new Error("respuesta sin su solución")
      return {
        id: solucion.id,
        categoria,
        elegida: enteroONulo(r.elegida),
        correcta: r.correcta === true,
        segundos: entero(r.segundos),
        limite: entero(r.limite),
      }
    }),
  }
}

// ─── Llamadas ────────────────────────────────────────────────────────────────

export function iniciarPsico({ modo, categoria, nivel, cantidad }: ParametrosPsico): Promise<SesionPsico> {
  return llamarRpc(
    "psico_iniciar",
    { p_modo: modo, p_categoria: categoria, p_nivel: nivel, p_cantidad: modo === "simulacion" ? null : cantidad },
    leerSesionPsico,
  )
}

/**
 * `opcion` null cuando se acabó el tiempo. `segundosEnPantalla` solo cuenta en
 * entrenamiento, y el servidor nunca acepta más que el tiempo real.
 */
export function responderPsico(
  sesion: string,
  posicion: number,
  opcion: number | null,
  segundosEnPantalla: number,
): Promise<RespuestaRegistradaPsico> {
  return llamarRpc(
    "psico_responder",
    { p_sesion: sesion, p_posicion: posicion, p_opcion: opcion, p_segundos: Math.max(0, Math.round(segundosEnPantalla)) },
    leerRespuestaPsico,
  )
}

export function aplazarPsico(sesion: string, posicion: number): Promise<void> {
  return llamarRpc("psico_aplazar", { p_sesion: sesion, p_posicion: posicion }, () => undefined)
}

export function terminarPsico(sesion: string): Promise<ResultadoPsicoServidor> {
  return llamarRpc("psico_terminar", { p_sesion: sesion }, leerResultadoPsico)
}
