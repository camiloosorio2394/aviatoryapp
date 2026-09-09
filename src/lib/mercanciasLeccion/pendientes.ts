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
  // Nivel 5 · Casos reales y repaso
  pendiente(17, "Lo que la industria aprendió", "Cuatro accidentes, cuatro lecciones", 8),
  pendiente(18, "Lo que te exigen y veinte respuestas listas", "Instrucción y repaso", 8),
]
