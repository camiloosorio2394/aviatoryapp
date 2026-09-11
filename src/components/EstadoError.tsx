import type { ReactNode } from "react"
import { AlertTriangle } from "lucide-react"

/**
 * Algo falló al cargar: qué pasó, en palabras del piloto, y qué hacer.
 * `acciones` son los botones; el mensaje nunca es el error técnico.
 */
export function EstadoError({ titulo, mensaje, acciones }: { titulo: string; mensaje: string; acciones: ReactNode }) {
  return (
    <section className="max-w-[900px] mx-auto rounded-2xl surface p-6 sm:p-8" role="alert">
      <div className="flex items-start gap-3">
        <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" style={{ color: "var(--av-amber-400)" }} aria-hidden />
        <div className="min-w-0">
          <div className="text-[17px] font-semibold tracking-[-0.01em]">{titulo}</div>
          <p className="mt-1 text-[15px] text-muted-foreground leading-relaxed">{mensaje}</p>
        </div>
      </div>
      <div className="mt-5 flex flex-wrap gap-2">{acciones}</div>
    </section>
  )
}
