/**
 * Nivel 5 · Práctica y entrevista (lecciones 34 a 40, capítulos 30 a 32 y 37 a 40 de la especificación).
 *
 * Se usa todo lo anterior: una entrada real leída flecha por flecha, casos
 * para decidir si se sale o no, casos operacionales con entradas reales, los
 * errores que más se oyen en entrevista, lo que hay que llevar memorizado,
 * las preguntas típicas en inglés y un simulador de diez ejercicios.
 *
 * OJO: los capítulos de este nivel no son correlativos. La lección es el
 * orden del archivo; el capítulo va en el comentario de cada una (y en
 * MEL_CAPITULOS de index.ts), solo para encontrar su texto.
 *
 * Estado: solo el esqueleto. Cada lección lleva su título y el marcador
 * EN_REDACCION; el contenido se carga desde docs/mel/nivel-5.md
 * reemplazando `blocks` entero. El formato de los bloques y de los huecos
 * está documentado al inicio de index.ts.
 */

import type { DocScreen } from "@/lib/docBlocks"
import { EN_REDACCION } from "./enRedaccion"

export const NIVEL_5: DocScreen[] = [
  // ── 34 · capítulo 30 ────────────────────────────────────────────────────
  {
    n: 34,
    title: "Una entrada real, flecha por flecha",
    kicker: "Ejemplo visual completo",
    minutes: 1,
    blocks: [EN_REDACCION],
  },
  // ── 35 · capítulo 31 ────────────────────────────────────────────────────
  {
    n: 35,
    title: "¿Podemos salir?",
    kicker: "Casos para decidir con la MEL en la mano",
    minutes: 1,
    blocks: [EN_REDACCION],
  },
  // ── 36 · capítulo 32 ────────────────────────────────────────────────────
  {
    n: 36,
    title: "Casos operacionales",
    kicker: "Seis situaciones con entradas reales",
    minutes: 1,
    blocks: [EN_REDACCION],
  },
  // ── 37 ──────────────────────────────────────────────────────────────────
  {
    n: 37,
    title: "Errores frecuentes en entrevista",
    kicker: "Lo que más se oye y por qué está mal",
    minutes: 1,
    blocks: [EN_REDACCION],
  },
  // ── 38 ──────────────────────────────────────────────────────────────────
  {
    n: 38,
    title: "Lo que un piloto debe memorizar",
    kicker: "Lo mínimo que no se consulta",
    minutes: 1,
    blocks: [EN_REDACCION],
  },
  // ── 39 ──────────────────────────────────────────────────────────────────
  {
    n: 39,
    title: "Preguntas típicas de entrevista",
    kicker: "Lo que preguntan, en inglés y en español",
    minutes: 1,
    blocks: [EN_REDACCION],
  },
  // ── 40 ──────────────────────────────────────────────────────────────────
  {
    n: 40,
    title: "Mini simulador de MEL",
    kicker: "Diez ejercicios para cerrar el módulo",
    minutes: 1,
    blocks: [EN_REDACCION],
  },
]
