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
  // Nivel 2 · Identificación
  pendiente(5, "Las nueve clases", "El sistema de clasificación", 9),
  pendiente(6, "Etiquetas: de riesgo y de manipulación", "Qué es y cómo se trata", 8),
  pendiente(7, "Grupos de embalaje y cantidades", "Cuánto cuidado exige", 6),
  pendiente(8, "Baterías de litio", "El artículo más frecuente", 7),
  // Nivel 3 · Transporte aéreo
  pendiente(9, "Los cuatro niveles de permiso", "¿Puede volar?", 6),
  pendiente(10, "Los límites que solo están en Colombia", "Lo que un curso genérico no dice", 7),
  pendiente(11, "Pasajeros y tripulantes", "Lo que sube a cabina", 8),
  pendiente(12, "Mercancías peligrosas ocultas", "Lo que nadie declaró", 6),
  // Nivel 4 · Situaciones del piloto
  pendiente(13, "De la aceptación a la bodega", "UPS 6 y la estiba", 8),
  pendiente(14, "El NOTOC", "La información al piloto al mando", 8),
  pendiente(15, "Emergencia en vuelo", "Asiana 991 y el procedimiento", 8),
  pendiente(16, "Notificar: qué, a quién y por qué", "Sucesos y SMS", 6),
  // Nivel 5 · Casos reales y repaso
  pendiente(17, "Lo que la industria aprendió", "Cuatro accidentes, cuatro lecciones", 8),
  pendiente(18, "Lo que te exigen y veinte respuestas listas", "Instrucción y repaso", 8),
]
