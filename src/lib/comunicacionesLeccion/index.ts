/**
 * La lección de Comunicaciones aeronáuticas y gestión ATC: 69 lecciones en
 * ocho niveles (los 68 capítulos de la especificación y el repaso de las 50
 * frases como lección 69).
 *
 * Progresión: fundamentos → el idioma → autorizaciones y superficie → en ruta
 * y llegada → vigilancia, contingencias y emergencias → data link y operación
 * oceánica → situaciones no normales y factores humanos → práctica y repaso.
 *
 * Las lecciones se escriben por nivel en su propio archivo (nivel1.ts a
 * nivel8.ts); este solo las junta y comprueba que la numeración sea la que el
 * índice y el avance esperan. La fuente de cada nivel es
 * docs/comunicaciones/nivel-N.md.
 *
 * ════════════════════════════════════════════════════════════════════════════
 * CÓMO SE CARGA EL CONTENIDO DE UNA LECCIÓN
 * ════════════════════════════════════════════════════════════════════════════
 *
 * Cada lección es un `DocScreen` (src/lib/docBlocks.ts):
 *
 *   { n: 12, title: "Readback y hearback", kicker: "…", minutes: 6, blocks: [ … ] }
 *
 * - `n` y `title` NO se cambian: `n` es lo que se guarda como avance y lo que
 *   la base valida (1 a 69), y el título va con la portada `leccion-NN.webp`.
 * - `minutes` es la lectura estimada. Hoy vale 1 (lo que se tarda en leer el
 *   marcador); al cargar el contenido se pone el real.
 * - `blocks` se reemplaza ENTERO. Mientras sea `[EN_REDACCION]` la lección no
 *   cuenta como leída ni suma estudio del día (`leccionEnRedaccion`, abajo).
 *
 * Reglas de la casa (CLAUDE.md): nada de rayas largas en el texto (van
 * paréntesis o comillas angulares); nunca inventar fraseología, accidentes,
 * cifras ni artículos; lo que no tenga fuente cargada va como escenario de
 * práctica o con un callout `verificar` que diga qué documento consultar. El
 * ATC y el piloto hablan en inglés dentro de `code`/`quote`; la explicación va
 * en español. Ver → identificar → interpretar → decidir.
 *
 * ── Bloques genéricos (LessonBlock, src/lib/notamLesson.ts) ─────────────────
 *
 *   { kind: "p", text }                       párrafo; admite **negrita**
 *   { kind: "sub", text }                     subtítulo de apartado
 *   { kind: "titulo", text, sub?, n? }        corte de parte, por encima de sub
 *   { kind: "definicion", text }              concepto clave destacado
 *   { kind: "vinetas", items }                viñetas (máximo 5)
 *   { kind: "list", items, ordered? }         lista simple
 *   { kind: "quote", text, source? }          cita (una transmisión, una norma)
 *   { kind: "code", text, grande?, tabular? } transmisión literal en mono:
 *                                             «Bogota Ground, Aviatory 452, …»
 *   { kind: "table", head, rows }             tabla
 *   { kind: "kv", items: [{ k, v }] }         pares clave y valor (frase → significado)
 *   { kind: "glosario", titulo?, items: [{ k, v }] }
 *   { kind: "abreviaturas", titulo?, intro?, items: [{ a, v }], nota? }
 *   { kind: "secuencia", titulo?, items, numerada?, orientacion?, nota? }
 *                                             cadena para recordar: HEAR → READBACK → SET…
 *   { kind: "pasos", items: [{ rotulo, codigo?, texto, interpretacion? }] }
 *   { kind: "apartado", titulo?, parrafos }   una pregunta y los párrafos que la contestan
 *   { kind: "callout", tone, title?, text, sellos? }
 *        tone: "info" | "tip" | "warn" | "verificar"
 *        «verificar» es el que se usa cuando la fuente no está cargada
 *        (Doc 4444 cap. 14, Doc 10037…): dice qué documento consultar.
 *   { kind: "summary", title?, items }        cierre con lo que hay que llevarse
 *   { kind: "cta", texto?, destino, rotulo }  salida hacia otra parte de la app
 *
 * ── Imágenes ────────────────────────────────────────────────────────────────
 *
 * Mientras la imagen no existe va un HUECO rotulado. El rótulo lleva el código
 * CM-NN-MM (lección y número de imagen dentro de ella), el tipo, la proporción
 * y la medida en píxeles, que es lo que Camilo ve en pantalla para producirla:
 *
 *   {
 *     kind: "hueco",
 *     rotulo: "CM-16-01 · Diagrama · 16:9 · 1600×900",
 *     descripcion: "Qué tiene que mostrar y por qué: calles A, B y C, el punto
 *       de espera y la pista, con la autorización de rodaje dibujada.",
 *     alto: 280,
 *     ratio: "16 / 9",      // opcional, 16:9 por defecto
 *     anchoMax: 480,        // opcional, para lo que no debe ocupar la columna
 *   }
 *
 * Cuando la imagen existe: `public/modulos/comunicaciones/cm-NN-MM-nombre.webp`
 * (NO en src/assets, que entraría al precache) y el bloque pasa a
 *
 *   { kind: "figura", src, alt, ancho, alto, pie?, anchoMax? }
 *
 * Portadas: `public/modulos/comunicaciones/leccion-NN.webp`, 16:9; el lector
 * las encuentra por nombre y, si faltan, pinta su propio hueco.
 *
 * ── Bloques de curso (BloquesModulo.tsx; tipos en src/lib/docBlocks.ts) ─────
 *
 *   norma          { kind: "norma", ref?, oaci?, rac?, texto, naturaleza?, titulo? }
 *                  naturaleza: "requisito" | "recomendacion" | "explotador"
 *                              | "practica" | "pedagogico"
 *                  Aquí sirve para separar lo que es OACI de lo que es
 *                  procedimiento nacional o del explotador.
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
 *                  Con `hueco: { id: "CM-11-02", medida: "1:1 · 800×800",
 *                  descripcion }` en cada item, la ficha va con imagen.
 *
 * ── Bloques de piloto (BloquesPiloto.tsx) ──────────────────────────────────
 *
 *   reconoce          { kind: "reconoce", titulo?, intro?, imagen? | hueco?,
 *                       puntos: [{ x, y, que, significa, piloto? }] }
 *                     Imagen real con puntos numerados (x, y en %): una
 *                     pantalla CPDLC, un panel de audio, un transpondedor.
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
 * Todos toman el acento ciruela del lector (`.lector-notam.lector-cm`) sin
 * hacer nada.
 */

import type { DocScreen } from "@/lib/docBlocks"
import { EN_REDACCION } from "./enRedaccion"
import { NIVEL_1 } from "./nivel1"
import { NIVEL_2 } from "./nivel2"
import { NIVEL_3 } from "./nivel3"
import { NIVEL_4 } from "./nivel4"
import { NIVEL_5 } from "./nivel5"
import { NIVEL_6 } from "./nivel6"
import { NIVEL_7 } from "./nivel7"
import { NIVEL_8 } from "./nivel8"

export const CM_LECCIONES: DocScreen[] = [
  ...NIVEL_1,
  ...NIVEL_2,
  ...NIVEL_3,
  ...NIVEL_4,
  ...NIVEL_5,
  ...NIVEL_6,
  ...NIVEL_7,
  ...NIVEL_8,
]

// La numeración es la que se guarda como avance: si un archivo se desordena,
// mejor caerse al arrancar que marcar leída la lección equivocada.
CM_LECCIONES.forEach((s, i) => {
  if (s.n !== i + 1) throw new Error(`comunicacionesLeccion: la lección ${s.n} está en la posición ${i + 1}`)
})

export const CM_LECCION_TOTAL = CM_LECCIONES.length

export const CM_MINUTOS = CM_LECCIONES.reduce((t, s) => t + s.minutes, 0)

/**
 * true si la lección `n` todavía es solo el marcador. El lector no la cuenta
 * como leída: un piloto que pasa por 69 páginas vacías no ha estudiado nada, y
 * el día que llegue el contenido tiene que poder leerla por primera vez.
 */
export function leccionEnRedaccion(n: number): boolean {
  const s = CM_LECCIONES[n - 1]
  return !s || (s.blocks.length === 1 && s.blocks[0] === EN_REDACCION)
}

export { EN_REDACCION }
