/**
 * La lección de Minimum Equipment List (MEL): 40 lecciones en cinco niveles,
 * una por capítulo de la especificación.
 *
 * Progresión: qué es la MEL → leer una entrada → del defecto al despacho →
 * impacto operacional → práctica y entrevista.
 *
 * Las lecciones se escriben por nivel en su propio archivo (nivel1.ts a
 * nivel5.ts); este solo las junta y comprueba que la numeración sea la que el
 * índice y el avance esperan. La fuente de cada nivel es docs/mel/nivel-N.md.
 *
 * ── Lección y capítulo no son lo mismo ──────────────────────────────────────
 *
 * Las lecciones van de 1 a 40 en el orden en que aparecen en los archivos,
 * y ese orden NO es el de los capítulos: el nivel 3 trae los capítulos 16 a
 * 21 y después los 33 a 36, y el nivel 5 los 30 a 32 y después los 37 a 40.
 * El avance, la base y las portadas usan el número de LECCIÓN. El capítulo
 * solo sirve para encontrar el texto en docs/mel/ y está en `MEL_CAPITULOS`.
 *
 * ════════════════════════════════════════════════════════════════════════════
 * CÓMO SE CARGA EL CONTENIDO DE UNA LECCIÓN
 * ════════════════════════════════════════════════════════════════════════════
 *
 * Cada lección es un `DocScreen` (src/lib/docBlocks.ts):
 *
 *   { n: 7, title: "Categorías de reparación A, B, C y D", kicker: "…", minutes: 6, blocks: [ … ] }
 *
 * - `n` y `title` NO se cambian: `n` es lo que se guarda como avance y lo que
 *   la base valida (1 a 40), y el título va con la portada `leccion-NN.webp`.
 * - `minutes` es la lectura estimada. Hoy vale 1 (lo que se tarda en leer el
 *   marcador); al cargar el contenido se pone el real.
 * - `blocks` se reemplaza ENTERO. Mientras sea `[EN_REDACCION]` la lección no
 *   cuenta como leída ni suma estudio del día (`leccionEnRedaccion`, abajo).
 *
 * Reglas de la casa (CLAUDE.md): nada de rayas largas en el texto (van
 * paréntesis o comillas angulares); nunca inventar entradas de MEL,
 * accidentes, cifras ni artículos. Una entrada REAL se cita con su MMEL, su
 * revisión, la página y la revisión de la página; una inventada va sobre la
 * «Aeronave de ejemplo» y rotulada como escenario de práctica. Lo que no
 * tenga fuente cargada va con un callout `verificar` que diga qué documento
 * consultar. Lo que depende del operador se dice como tal. Ver → identificar
 * → interpretar → decidir.
 *
 * ── Bloques genéricos (LessonBlock, src/lib/notamLesson.ts) ─────────────────
 *
 *   { kind: "p", text }                       párrafo; admite **negrita**
 *   { kind: "sub", text }                     subtítulo de apartado
 *   { kind: "titulo", text, sub?, n? }        corte de parte, por encima de sub
 *   { kind: "definicion", text }              concepto clave destacado
 *   { kind: "vinetas", items }                viñetas (máximo 5)
 *   { kind: "list", items, ordered? }         lista simple
 *   { kind: "quote", text, source? }          cita (una entrada, una norma)
 *   { kind: "code", text, grande?, tabular? } texto literal en mono: una
 *                                             entrada de MMEL, un asiento del
 *                                             tech log
 *   { kind: "table", head, rows }             tabla (las columnas de una entrada)
 *   { kind: "kv", items: [{ k, v }] }         pares clave y valor
 *   { kind: "glosario", titulo?, items: [{ k, v }] }
 *   { kind: "abreviaturas", titulo?, intro?, items: [{ a, v }], nota? }
 *   { kind: "secuencia", titulo?, items, numerada?, orientacion?, nota? }
 *                                             cadena para recordar: DEFECTO →
 *                                             TECH LOG → MEL → (M) → (O) → DESPACHO
 *   { kind: "pasos", items: [{ rotulo, codigo?, texto, interpretacion? }] }
 *   { kind: "apartado", titulo?, parrafos }   una pregunta y los párrafos que la contestan
 *   { kind: "callout", tone, title?, text, sellos? }
 *        tone: "info" | "tip" | "warn" | "verificar"
 *        «verificar» es el que se usa cuando la fuente no está cargada: dice
 *        qué documento consultar.
 *   { kind: "summary", title?, items }        cierre con lo que hay que llevarse
 *   { kind: "cta", texto?, destino, rotulo }  salida hacia otra parte de la app
 *
 * ── Imágenes ────────────────────────────────────────────────────────────────
 *
 * Mientras la imagen no existe va un HUECO rotulado. El rótulo lleva el código
 * MEL-NN-MM que ya traen los documentos de docs/mel/ (OJO: ahí NN es el
 * CAPÍTULO, no la lección), el tipo, la proporción y la medida en píxeles,
 * que es lo que Camilo ve en pantalla para producirla:
 *
 *   {
 *     kind: "hueco",
 *     rotulo: "MEL-01-01 · Diagrama · 16:9 · 1600×900",
 *     descripcion: "Qué tiene que mostrar y por qué.",
 *     alto: 280,
 *     ratio: "16 / 9",      // opcional, 16:9 por defecto
 *     anchoMax: 480,        // opcional, para lo que no debe ocupar la columna
 *   }
 *
 * Cuando la imagen existe: `public/modulos/mel/mel-NN-MM-nombre.webp` (NO en
 * src/assets, que entraría al precache) y el bloque pasa a
 *
 *   { kind: "figura", src, alt, ancho, alto, pie?, anchoMax? }
 *
 * Portadas: `public/modulos/mel/leccion-NN.webp` (NN es la LECCIÓN), 16:9; el
 * lector las encuentra por nombre y, si faltan, pinta su propio hueco.
 *
 * ── Bloques de curso (BloquesModulo.tsx; tipos en src/lib/docBlocks.ts) ─────
 *
 *   norma          { kind: "norma", ref?, oaci?, rac?, texto, naturaleza?, titulo? }
 *                  naturaleza: "requisito" | "recomendacion" | "explotador"
 *                              | "practica" | "pedagogico"
 *                  Aquí sirve para separar lo que es OACI, lo que es RAC, lo
 *                  que es FAA y lo que es del operador.
 *   casoReal       { kind: "casoReal", titulo, fecha, lugar?, aeronave?,
 *                    queOcurrio: string[], consecuencia, leccion, cita?, fuente?,
 *                    hueco?: { id, medida, descripcion }, imagen? }
 *                  SOLO con fuente real (informe final). Nunca uno inventado.
 *   enLaOperacion  { kind: "enLaOperacion", momento, texto, pasos?, rotulo?,
 *                    imagen?, hueco?, ves? }
 *   escenario      { kind: "escenario", titulo, situacion,
 *                    preguntas: [{ q, a }], concepto? }
 *                  Construido para el curso: sale rotulado como tal.
 *   ponAPrueba     { kind: "ponAPrueba", titulo?, preguntas: [{ q, ref?,
 *                    opciones: [{ t, ok?, fb }] }] }
 *                  Retroalimentación por opción. NO copiar preguntas de una
 *                  evaluación (lo vigila evaluacionesContenido.test.ts).
 *   fichas         { kind: "fichas", titulo?, columnas?: 1|2|3, items: [{ titulo,
 *                    ref?, puntos?, puntosRotulo?, nota?, imagen?, hueco?,
 *                    tecnica? }] }
 *
 * ── Bloques de piloto (BloquesPiloto.tsx) ──────────────────────────────────
 *
 *   reconoce          { kind: "reconoce", titulo?, intro?, imagen? | hueco?,
 *                       puntos: [{ x, y, que, significa, piloto? }] }
 *                     Imagen real con puntos numerados (x, y en %): una
 *                     página de MMEL, una etiqueta INOP, un tech log.
 *   piensaComoPiloto  { kind: "piensaComoPiloto", momento?, situacion, pregunta,
 *                       respuesta?, claves, interesa?, cierre?, rotulo?,
 *                       imagen?, hueco?, ves? }
 *                     La respuesta queda tras un botón.
 *   entrevista        { kind: "entrevista", titulo?, intro?, preguntas: [{
 *                       nivel: "concepto" | "interpretacion" | "situacion",
 *                       q, respuesta, claves?, ref? }] }
 *                     Tres niveles, sin opciones.
 *   detalleTecnico    { kind: "detalleTecnico", etiqueta?, cita?, bloques: [ … ] }
 *                     La norma completa, plegada, para que no compita con la
 *                     enseñanza. Dentro van bloques de cualquier tipo.
 *
 * Todos toman el acento grafito del lector (`.lector-notam.lector-mel`) sin
 * hacer nada.
 */

import type { DocScreen } from "@/lib/docBlocks"
import { EN_REDACCION } from "./enRedaccion"
import { NIVEL_1 } from "./nivel1"
import { NIVEL_2 } from "./nivel2"
import { NIVEL_3 } from "./nivel3"
import { NIVEL_4 } from "./nivel4"
import { NIVEL_5 } from "./nivel5"

export const MEL_LECCIONES: DocScreen[] = [...NIVEL_1, ...NIVEL_2, ...NIVEL_3, ...NIVEL_4, ...NIVEL_5]

// La numeración es la que se guarda como avance: si un archivo se desordena,
// mejor caerse al arrancar que marcar leída la lección equivocada.
MEL_LECCIONES.forEach((s, i) => {
  if (s.n !== i + 1) throw new Error(`melLeccion: la lección ${s.n} está en la posición ${i + 1}`)
})

export const MEL_LECCION_TOTAL = MEL_LECCIONES.length

export const MEL_MINUTOS = MEL_LECCIONES.reduce((t, s) => t + s.minutes, 0)

/**
 * El capítulo de la especificación (el «## N.» de docs/mel/nivel-N.md) de cada
 * lección: `MEL_CAPITULOS[n - 1]` es el capítulo de la lección `n`. Es solo
 * para encontrar el texto fuente; nada en la app guarda ni muestra el capítulo.
 */
export const MEL_CAPITULOS: readonly number[] = [
  // Nivel 1 · lecciones 1 a 3
  1, 2, 3,
  // Nivel 2 · lecciones 4 a 15
  4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
  // Nivel 3 · lecciones 16 a 25
  16, 17, 18, 19, 20, 21, 33, 34, 35, 36,
  // Nivel 4 · lecciones 26 a 33
  22, 23, 24, 25, 26, 27, 28, 29,
  // Nivel 5 · lecciones 34 a 40
  30, 31, 32, 37, 38, 39, 40,
]

/**
 * true si la lección `n` todavía es solo el marcador. El lector no la cuenta
 * como leída: un piloto que pasa por 40 páginas vacías no ha estudiado nada, y
 * el día que llegue el contenido tiene que poder leerla por primera vez.
 */
export function leccionEnRedaccion(n: number): boolean {
  const s = MEL_LECCIONES[n - 1]
  return !s || (s.blocks.length === 1 && s.blocks[0] === EN_REDACCION)
}

export { EN_REDACCION }
