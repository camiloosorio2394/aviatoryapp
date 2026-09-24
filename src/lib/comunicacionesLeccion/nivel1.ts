/**
 * Nivel 1 · Fundamentos (lecciones 01 a 07, capítulos 1 a 7 de la especificación).
 *
 * Antes de la primera frase: para qué se habla por radio, con quién, con qué
 * disciplina, y cómo se deletrean letras, números y distintivos. Todo lo que
 * viene después se apoya en esto.
 *
 * Estado: solo el esqueleto. Cada lección lleva su título y el marcador
 * EN_REDACCION; el contenido se carga desde docs/comunicaciones/nivel-1.md
 * reemplazando `blocks` entero. El formato de los bloques y de los huecos
 * está documentado al inicio de index.ts.
 */

import type { DocScreen } from "@/lib/docBlocks"
import { EN_REDACCION } from "./enRedaccion"

export const NIVEL_1: DocScreen[] = [
  // ── 01 ──────────────────────────────────────────────────────────────────
  {
    n: 1,
    title: "Para qué sirven las comunicaciones",
    kicker: "Claridad, brevedad y precisión entre piloto y ATC",
    minutes: 1,
    blocks: [EN_REDACCION],
  },
  // ── 02 ──────────────────────────────────────────────────────────────────
  {
    n: 2,
    title: "Servicios y dependencias ATC",
    kicker: "De Delivery a Ground: quién te habla en cada fase",
    minutes: 1,
    blocks: [EN_REDACCION],
  },
  // ── 03 ──────────────────────────────────────────────────────────────────
  {
    n: 3,
    title: "Principios de radiotelefonía",
    kicker: "Escuchar, pensar y después transmitir",
    minutes: 1,
    blocks: [EN_REDACCION],
  },
  // ── 04 ──────────────────────────────────────────────────────────────────
  {
    n: 4,
    title: "El alfabeto fonético OACI",
    kicker: "De Alfa a Zulu, y cuándo se usa",
    minutes: 1,
    blocks: [EN_REDACCION],
  },
  // ── 05 ──────────────────────────────────────────────────────────────────
  {
    n: 5,
    title: "Números en la radio",
    kicker: "Niveles, rumbos, frecuencias, códigos y QNH",
    minutes: 1,
    blocks: [EN_REDACCION],
  },
  // ── 06 ──────────────────────────────────────────────────────────────────
  {
    n: 6,
    title: "Distintivos de llamada",
    kicker: "Matrículas, designadores y distintivos parecidos",
    minutes: 1,
    blocks: [EN_REDACCION],
  },
  // ── 07 ──────────────────────────────────────────────────────────────────
  {
    n: 7,
    title: "Cómo se arma una transmisión",
    kicker: "A quién llamas, quién eres y qué quieres",
    minutes: 1,
    blocks: [EN_REDACCION],
  },
]
