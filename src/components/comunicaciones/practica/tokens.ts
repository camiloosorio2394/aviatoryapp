/**
 * Colores y clases comunes de la práctica de Comunicaciones.
 *
 * El acento es `--av-blue-500`, que la pantalla re-ancla al del módulo (como
 * hace el lector con sus temas). Así los componentes no llevan un color fijo:
 * dentro de `.lector-notam.lector-cm`, o con `--av-blue-500` puesto en la raíz
 * de la página, toman la ciruela de Comunicaciones.
 *
 * El verde es solo «correcto»; ámbar y rojo, solo alerta y error.
 */

export const ACENTO = "var(--av-blue-500)"
export const OK = "var(--av-green-400)"
export const ERROR = "var(--av-red-400)"
export const ALERTA = "var(--av-amber-400)"

/** Foco visible en cualquier control, del color del acento. */
export const FOCO =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--av-blue-500)]"

/** Botón principal (relleno del acento). */
export const BOTON_PRIMARIO = `inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border-0 px-4 text-[13.5px] font-semibold text-white transition-opacity disabled:opacity-40 ${FOCO}`

/** Botón secundario (borde). */
export const BOTON_SECUNDARIO = `inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-border px-4 text-[13.5px] font-semibold text-foreground transition-colors hover:bg-muted disabled:opacity-40 disabled:hover:bg-transparent ${FOCO}`

export function tinte(color: string, pct = 10): string {
  return `color-mix(in oklab, ${color} ${pct}%, transparent)`
}

export function borde(color: string, pct = 45): string {
  return `color-mix(in oklab, ${color} ${pct}%, transparent)`
}
