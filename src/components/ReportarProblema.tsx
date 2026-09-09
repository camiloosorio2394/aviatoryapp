import { useState } from "react"
import { Check, Flag, Loader2, X } from "lucide-react"
import { MOTIVOS, type MotivoReporte, enviarReporte } from "@/lib/reportes"

/**
 * «¿Algo mal en esta pregunta?»
 *
 * Va debajo del ejercicio y no en el pie de la aplicación, y esa es toda la
 * diferencia: aquí la pantalla ya sabe qué ficha está mirando, así que el
 * reporte sale con su identificador sin que el piloto tenga que copiarlo. Un
 * aviso que dice «una imagen se ve mal» no se puede arreglar; uno que dice
 * «ES-E2-10, la figura está cortada» lleva directo al archivo.
 *
 * Cuatro motivos de un toque y un campo libre opcional. Cuatro toques son un
 * reporte; un formulario largo es un reporte que nadie manda.
 *
 * Sirve para cualquier módulo: recibe cuál es y qué ficha, y no sabe nada de
 * psicotécnicas.
 */
export function ReportarProblema({
  modulo,
  ejercicioId,
  extra,
}: {
  modulo: string
  ejercicioId?: string
  /** Lo que había en pantalla y ayuda a reproducirlo. */
  extra?: Record<string, unknown>
}) {
  const [abierto, setAbierto] = useState(false)
  const [motivo, setMotivo] = useState<MotivoReporte | null>(null)
  const [detalle, setDetalle] = useState("")
  const [enviando, setEnviando] = useState(false)
  const [enviado, setEnviado] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function mandar() {
    if (!motivo) return
    setEnviando(true)
    setError(null)
    const r = await enviarReporte({ modulo, ejercicioId, motivo, detalle, extra })
    setEnviando(false)
    if (r.ok) setEnviado(true)
    else setError(r.error ?? "No pudimos enviarlo.")
  }

  if (enviado) {
    return (
      <p className="mt-4 flex items-center gap-1.5 text-[13px] text-muted-foreground">
        <Check className="h-3.5 w-3.5" style={{ color: "var(--av-green-400)" }} />
        Gracias. Lo revisamos{ejercicioId ? ` (${ejercicioId})` : ""}.
      </p>
    )
  }

  if (!abierto) {
    return (
      <button
        type="button"
        onClick={() => setAbierto(true)}
        className="mt-4 inline-flex items-center gap-1.5 text-[13px] text-muted-foreground transition-colors hover:text-foreground"
      >
        <Flag className="h-3.5 w-3.5" />
        ¿Algo mal en esta pregunta?
      </button>
    )
  }

  return (
    <div className="mt-4 rounded-xl border border-border bg-card p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-[15px] font-semibold">¿Qué pasa con esta pregunta?</div>
          {ejercicioId && (
            <p className="mt-0.5 text-[12px] text-muted-foreground">
              Se envía junto a{" "}
              <span className="font-mono font-medium text-foreground">{ejercicioId}</span>, que es
              lo que nos deja encontrarla.
            </p>
          )}
        </div>
        <button
          type="button"
          onClick={() => setAbierto(false)}
          className="p-1 text-muted-foreground transition-colors hover:text-foreground"
          aria-label="Cerrar"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {MOTIVOS.map((m) => {
          const elegido = motivo === m.valor
          return (
            <button
              key={m.valor}
              type="button"
              onClick={() => setMotivo(m.valor)}
              aria-pressed={elegido}
              className="rounded-xl border px-3 py-2.5 text-left transition-colors"
              style={{
                borderColor: elegido ? "var(--av-blue-500)" : "var(--border)",
                background: elegido
                  ? "color-mix(in oklab, var(--av-blue-500) 10%, transparent)"
                  : undefined,
              }}
            >
              <div className="text-[14px] font-medium">{m.etiqueta}</div>
              <div className="mt-0.5 text-[12px] leading-snug text-muted-foreground">{m.ayuda}</div>
            </button>
          )
        })}
      </div>

      <textarea
        value={detalle}
        onChange={(e) => setDetalle(e.target.value.slice(0, 1000))}
        rows={2}
        placeholder="Si quieres, cuéntanos más (opcional)"
        className="mt-3 w-full resize-none rounded-xl border border-border bg-background px-3 py-2 text-[14px] outline-none focus:border-blue-500"
      />

      {error && (
        <p className="mt-2 text-[13px] text-red-600 dark:text-red-400">{error}</p>
      )}

      <div className="mt-3 flex items-center gap-2">
        <button
          type="button"
          onClick={mandar}
          disabled={!motivo || enviando}
          className="inline-flex min-h-[40px] items-center gap-2 rounded-[10px] px-4 text-[14px] font-semibold text-white transition-colors disabled:cursor-not-allowed disabled:opacity-50"
          style={{ background: "var(--av-blue-500)" }}
        >
          {enviando ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Enviando…
            </>
          ) : (
            "Enviar"
          )}
        </button>
        <button
          type="button"
          onClick={() => setAbierto(false)}
          className="text-[14px] text-muted-foreground transition-colors hover:text-foreground"
        >
          Cancelar
        </button>
      </div>
    </div>
  )
}
