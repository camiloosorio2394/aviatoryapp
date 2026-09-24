/**
 * Nivel 7 · Situaciones no normales y factores humanos (lecciones 51 a 61, capítulos 51 a 61 de la especificación).
 *
 * Cuando la frase estándar no alcanza y cuando el que falla es el oído: plain
 * English para lo no normal, pedir aclaración, sesgo de expectativa,
 * distintivos parecidos y cómo se reparte la radio en la cabina.
 *
 * Estado: solo el esqueleto. Cada lección lleva su título y el marcador
 * EN_REDACCION; el contenido se carga desde docs/comunicaciones/nivel-7.md
 * reemplazando `blocks` entero. El formato de los bloques y de los huecos
 * está documentado al inicio de index.ts.
 */

import type { DocScreen } from "@/lib/docBlocks"
import { EN_REDACCION } from "./enRedaccion"

export const NIVEL_7: DocScreen[] = [
  // ── 51 ──────────────────────────────────────────────────────────────────
  {
    n: 51,
    title: "Comunicaciones en situaciones anormales",
    kicker: "Fraseología donde exista y plain English donde no",
    minutes: 1,
    blocks: [EN_REDACCION],
  },
  // ── 52 ──────────────────────────────────────────────────────────────────
  {
    n: 52,
    title: "Inglés para lo no normal",
    kicker: "Problema, capacidad, necesidad e intenciones",
    minutes: 1,
    blocks: [EN_REDACCION],
  },
  // ── 53 ──────────────────────────────────────────────────────────────────
  {
    n: 53,
    title: "Cómo pedir aclaración",
    kicker: "SAY AGAIN, CONFIRM y VERIFY sin vergüenza",
    minutes: 1,
    blocks: [EN_REDACCION],
  },
  // ── 54 ──────────────────────────────────────────────────────────────────
  {
    n: 54,
    title: "Acentos y escucha",
    kicker: "Estrategias para una frecuencia difícil",
    minutes: 1,
    blocks: [EN_REDACCION],
  },
  // ── 55 ──────────────────────────────────────────────────────────────────
  {
    n: 55,
    title: "Sesgo de expectativa",
    kicker: "Oír lo que se esperaba en vez de lo que se dijo",
    minutes: 1,
    blocks: [EN_REDACCION],
  },
  // ── 56 ──────────────────────────────────────────────────────────────────
  {
    n: 56,
    title: "Distintivos parecidos",
    kicker: "Cuando la autorización era para otro",
    minutes: 1,
    blocks: [EN_REDACCION],
  },
  // ── 57 ──────────────────────────────────────────────────────────────────
  {
    n: 57,
    title: "Transmisiones bloqueadas",
    kicker: "Dos a la vez y un dato perdido",
    minutes: 1,
    blocks: [EN_REDACCION],
  },
  // ── 58 ──────────────────────────────────────────────────────────────────
  {
    n: 58,
    title: "Cabina estéril y comunicaciones",
    kicker: "Conversaciones que tapan la radio",
    minutes: 1,
    blocks: [EN_REDACCION],
  },
  // ── 59 ──────────────────────────────────────────────────────────────────
  {
    n: 59,
    title: "PF y PM en las comunicaciones",
    kicker: "Quién habla, quién escucha y quién verifica",
    minutes: 1,
    blocks: [EN_REDACCION],
  },
  // ── 60 ──────────────────────────────────────────────────────────────────
  {
    n: 60,
    title: "Gestión de autorizaciones en cabina",
    kicker: "Escuchar, colacionar, seleccionar, verificar y ejecutar",
    minutes: 1,
    blocks: [EN_REDACCION],
  },
  // ── 61 ──────────────────────────────────────────────────────────────────
  {
    n: 61,
    title: "Errores comunes",
    kicker: "Los que se repiten y cómo se evitan",
    minutes: 1,
    blocks: [EN_REDACCION],
  },
]
