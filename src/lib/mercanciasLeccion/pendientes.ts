/**
 * Lecciones del temario que todavía se están escribiendo.
 *
 * Van en el índice desde ya, con su número y su título, para que el temario
 * completo se vea y el progreso se guarde con la numeración definitiva. Cada
 * una se reemplaza por su contenido en su nivel (nivel2.ts, nivel3.ts…) y sale
 * de aquí.
 */

import type { DocScreen } from "@/lib/docBlocks"

function pendiente(n: number, title: string, kicker: string, minutes: number): DocScreen {
  return {
    n,
    title,
    kicker,
    minutes,
    blocks: [
      {
        kind: "callout",
        tone: "info",
        title: "Lección en redacción",
        text: "Esta lección se está escribiendo con el RAC 175 al lado. Mientras tanto puedes seguir con la que viene: el índice y el progreso ya tienen la numeración definitiva.",
      },
    ],
  }
}

export const PENDIENTES: DocScreen[] = [
  // Nivel 4 · Situaciones del piloto
  pendiente(13, "De la aceptación a la bodega", "South African 295 y la estiba", 8),
  pendiente(14, "El NOTOC", "La información al piloto al mando", 8),
  pendiente(15, "Emergencia en vuelo", "Asiana 991 y el procedimiento", 8),
  pendiente(16, "Notificar: qué, a quién y por qué", "Sucesos y SMS", 6),
  // Nivel 5 · Casos reales y repaso
  pendiente(17, "Lo que la industria aprendió", "Cuatro accidentes, cuatro lecciones", 8),
  pendiente(18, "Lo que te exigen y veinte respuestas listas", "Instrucción y repaso", 8),
]
