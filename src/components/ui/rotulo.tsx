import type { ReactNode } from "react"

/**
 * Micro-rótulo en mono y mayúscula. Es el patrón del rediseño para nombrar un
 * bloque sin gastar un titular. Va contra la regla general de sentence case a
 * propósito: decisión explícita de Camilo del 3 de agosto, tomada del rediseño
 * aprobado. Nació en la portada de NOTAM y se comparte desde aquí para que la
 * lección y las pantallas que vengan usen exactamente la misma pieza.
 */
export function Rotulo({ children }: { children: ReactNode }) {
  return (
    <div className="mono text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
      {children}
    </div>
  )
}

/** Separador vertical de las tiras de metadatos. */
export function Filete() {
  return (
    <span aria-hidden="true" style={{ color: "var(--border)" }}>
      |
    </span>
  )
}
