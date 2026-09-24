/**
 * Nivel 8 · Práctica y repaso (lecciones 62 a 69, capítulos 62 a 68 y el repaso de las 50 frases de la especificación).
 *
 * El cierre: la fraseología que se debe dominar, práctica de Aviation English
 * y de plain English, escenarios de entrevista, errores frecuentes de
 * hispanohablantes, qué escuchar primero, el resumen final y el repaso de
 * las 50 frases.
 *
 * Estas lecciones no usan el formato estándar de capítulo: cada una lleva el
 * suyo (SITUACIÓN / ATC / PILOT / SIGNIFICADO / ERROR COMÚN, etc.), según
 * docs/comunicaciones/nivel-8.md.
 *
 * Estado: solo el esqueleto. Cada lección lleva su título y el marcador
 * EN_REDACCION; el contenido se carga desde docs/comunicaciones/nivel-8.md
 * reemplazando `blocks` entero. El formato de los bloques y de los huecos
 * está documentado al inicio de index.ts.
 */

import type { DocScreen } from "@/lib/docBlocks"
import { EN_REDACCION } from "./enRedaccion"

export const NIVEL_8: DocScreen[] = [
  // ── 62 ──────────────────────────────────────────────────────────────────
  {
    n: 62,
    title: "Fraseología que debes dominar",
    kicker: "De la autorización IFR al CPDLC, frase por frase",
    minutes: 1,
    blocks: [EN_REDACCION],
  },
  // ── 63 ──────────────────────────────────────────────────────────────────
  {
    n: 63,
    title: "Aviation English: práctica real",
    kicker: "Situaciones progresivas, de fácil a difícil",
    minutes: 1,
    blocks: [EN_REDACCION],
  },
  // ── 64 ──────────────────────────────────────────────────────────────────
  {
    n: 64,
    title: "Plain English: práctica",
    kicker: "Escenarios sin frase estándar suficiente",
    minutes: 1,
    blocks: [EN_REDACCION],
  },
  // ── 65 ──────────────────────────────────────────────────────────────────
  {
    n: 65,
    title: "Escenarios ATC de entrevista",
    kicker: "Lo que preguntan y cómo se razona la respuesta",
    minutes: 1,
    blocks: [EN_REDACCION],
  },
  // ── 66 ──────────────────────────────────────────────────────────────────
  {
    n: 66,
    title: "Errores frecuentes de hispanohablantes",
    kicker: "Los que tienen consecuencia operacional",
    minutes: 1,
    blocks: [EN_REDACCION],
  },
  // ── 67 ──────────────────────────────────────────────────────────────────
  {
    n: 67,
    title: "Qué escuchar primero",
    kicker: "Distintivo, acción, valor, condición y lo siguiente",
    minutes: 1,
    blocks: [EN_REDACCION],
  },
  // ── 68 ──────────────────────────────────────────────────────────────────
  {
    n: 68,
    title: "Resumen final",
    kicker: "Lo que un piloto de aerolínea debe recordar",
    minutes: 1,
    blocks: [EN_REDACCION],
  },
  // ── 69 ──────────────────────────────────────────────────────────────────
  {
    n: 69,
    title: "Repaso rápido: 50 frases",
    kicker: "Frase, significado y ejemplo",
    minutes: 1,
    blocks: [EN_REDACCION],
  },
]
