import type { ReactNode } from "react"
import {
  BookMarked,
  Check,
  CheckCircle2,
  ListChecks,
  Loader2,
} from "lucide-react"
import { accentText } from "@/lib/tileColors"
import { ACENTO, VERDE_CON_TEXTO } from "@/components/mercancias/practica/comun"

// ─── Piezas ──────────────────────────────────────────────────────────────────

/**
 * Los puntos que un briefing sobre el caso debería tocar. Se leen, no se
 * tildan: el escenario ya se resolvió conectando, así que aquí no queda nada
 * que autoevaluar.
 */
export function PuntosModelo({ puntos }: { puntos: string[] }) {
  return (
    <div className="mt-5">
      <div className="flex items-center gap-1.5 text-[13px] font-semibold">
        <ListChecks className="h-4 w-4" style={{ color: ACENTO }} />
        Lo que tenía que salir
      </div>
      <p className="mt-1 mb-2.5 text-[12px] text-muted-foreground leading-relaxed">
        En una entrevista, estos son los puntos que esperan oírte decir sobre este caso.
      </p>
      <ul className="m-0 p-0 list-none space-y-1.5">
        {puntos.map((p, i) => (
          <li key={i} className="flex items-start gap-2.5 rounded-lg border border-border p-2.5">
            <Check className="mt-[3px] h-3.5 w-3.5 flex-shrink-0" strokeWidth={3} style={{ color: "var(--av-green-400)" }} />
            <span className="text-[13px] leading-snug text-foreground/90">{p}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function MarcarResuelto({
  isDone,
  saving,
  onDone,
  label = "Marcar como resuelto",
  done = "Ya lo marcaste como resuelto",
}: {
  isDone: boolean
  saving: boolean
  onDone: () => void
  label?: string
  done?: string
}) {
  return (
    <div className="mt-5 pt-4 border-t border-border">
      <div className="flex items-start gap-2 text-[12px] text-muted-foreground leading-relaxed">
        <BookMarked className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
        <span>Fuente: LAR 175 (Enmienda 4), Instrucciones Técnicas y las lecciones del módulo.</span>
      </div>
      {isDone ? (
        <div
          className="mt-3 inline-flex items-center gap-1.5 h-11 px-4 rounded-xl text-[13px] font-semibold w-full justify-center"
          style={{
            color: accentText("var(--av-green-400)"),
            background: "color-mix(in oklab, var(--av-green-400) 10%, transparent)",
            border: "1px solid color-mix(in oklab, var(--av-green-400) 32%, transparent)",
          }}
        >
          <CheckCircle2 className="h-4 w-4" /> {done}
        </div>
      ) : (
        <button
          onClick={onDone}
          disabled={saving}
          className="mt-3 w-full inline-flex items-center justify-center gap-2 h-11 px-4 rounded-xl text-[15px] font-semibold text-white border-0 transition-transform hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0"
          style={{ background: VERDE_CON_TEXTO }}
        >
          {saving ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Guardando
            </>
          ) : (
            <>
              <Check className="h-4 w-4" strokeWidth={3} /> {label}
            </>
          )}
        </button>
      )}
    </div>
  )
}

export function ModeButton({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: ReactNode; label: string }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className="inline-flex items-center justify-center gap-2 h-11 px-3 rounded-lg text-[13px] font-semibold transition-colors text-center"
      style={{ background: active ? ACENTO : "transparent", color: active ? "white" : "var(--muted-foreground)" }}
    >
      {icon}
      <span className="truncate">{label}</span>
    </button>
  )
}
