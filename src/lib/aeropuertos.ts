/**
 * Módulo Aeropuertos: los datos que comparten el lector, el catálogo y la
 * tarjeta de «Ingreso a aerolínea».
 *
 * Aquí solo vive lo que es dato: rutas, niveles, totales y el respaldo local del
 * avance. El contenido está en aeropuertosLeccion/.
 *
 * Es un módulo **visual**: el texto de cada lección cabe en unas 150 palabras y
 * lo que enseña son las imágenes. Por eso las lecciones llevan muchos huecos
 * rotulados mientras Camilo va generando las fotos.
 *
 * La norma es **solo OACI**: Anexo 14, Volumen I, 9.ª edición (2022) con la
 * Enmienda 18, aplicable desde el 27 de noviembre de 2025. Ni FAA ni RAC como
 * base; lo nacional solo se nombra cuando es una diferencia real.
 */

import type { LectorNivel } from "@/components/lesson/LectorLeccion"

/** Nombre del módulo, tal como aparece en la miga del lector. */
export const AP_TITULO = "Aeropuertos"

/** Las fuentes normativas, en una línea. */
export const AP_FUENTES = "Anexo 14 Vol. I y Anexo 4 de la OACI"

/**
 * Edición de la que sale el material, a la vista y no en una nota al pie: la
 * Enmienda 18 cambió cosas que todavía no están en los libros de estudio.
 */
export const AP_VIGENCIA = "Anexo 14 Vol. I · 9.ª edición (2022), Enmienda 18"

/** Ruta del módulo. */
export const AP_HUB = "/app/aerolinea/aeropuertos"
/** La lección, con el lector genérico. */
export const AP_APRENDE = `${AP_HUB}/aprende`
/** El catálogo visual: todas las señales, letreros, luces y balizas. */
export const AP_CATALOGO = `${AP_HUB}/catalogo`

/** Los cinco niveles, con el número de su primera lección. */
export const AP_NIVELES: LectorNivel[] = [
  { titulo: "Nivel 1 · Cómo se lee un aeropuerto", desde: 1 },
  { titulo: "Nivel 2 · Lo pintado en el suelo", desde: 5 },
  { titulo: "Nivel 3 · Letreros y balizas", desde: 9 },
  { titulo: "Nivel 4 · Luces", desde: 13 },
  { titulo: "Nivel 5 · Operar", desde: 18 },
]

/**
 * Total de lecciones. Va fijo y no importado para que la tarjeta del hub no
 * arrastre el contenido entero; `leccionesConteo.test.ts` lo compara.
 */
export const AP_LECTURA_TOTAL = 22

// ─── Avance, solo en este navegador ──────────────────────────────────────────

/**
 * De momento el avance no sube a la base: el módulo todavía no tiene tabla ni
 * RPC. El SQL está escrito y espera a que Camilo lo corra; mientras tanto, lo
 * leído vive en este navegador y no se pierde al recargar. Cuando la tabla
 * exista, esto se cambia por `crearProgresoModulo` como en Mercancías.
 */
const LS_KEY = "aviatory.aeropuertos.progress"

export interface AeropuertosProgreso {
  /** Números de lección leída, 1 a AP_LECTURA_TOTAL. */
  lessonScreens: number[]
}

export function readAeropuertosLocal(): AeropuertosProgreso {
  try {
    const raw = localStorage.getItem(LS_KEY)
    if (!raw) return { lessonScreens: [] }
    const p = JSON.parse(raw) as Partial<AeropuertosProgreso>
    return { lessonScreens: Array.isArray(p.lessonScreens) ? p.lessonScreens : [] }
  } catch {
    return { lessonScreens: [] }
  }
}

export function writeAeropuertosLocal(lessonScreens: number[]): void {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify({ lessonScreens }))
  } catch {
    /* localStorage bloqueado (incógnito): el avance queda en memoria */
  }
}

export function markAeropuertosLeccion(n: number): void {
  const { lessonScreens } = readAeropuertosLocal()
  if (lessonScreens.includes(n)) return
  writeAeropuertosLocal([...lessonScreens, n].sort((a, b) => a - b))
}
