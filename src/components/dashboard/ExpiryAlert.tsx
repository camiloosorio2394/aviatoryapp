import { Link } from "react-router-dom"
import { AlertTriangle, ArrowRight } from "lucide-react"
import { accentText } from "@/lib/tileColors"

/**
 * Aviso de documento por vencer.
 *
 * Es el único dato del dashboard con consecuencia legal: con el médico vencido
 * un piloto no vuela, por bien que lleve los quizzes. Por eso rompe la retícula
 * y va en su propia franja, con el color del token semántico y no del acento.
 */
export function ExpiryAlert({
  item,
}: {
  item: { id: string; license_type: string; custom_name: string | null; days: number }
}) {
  const vencido = item.days < 0
  const nombre = item.custom_name ?? item.license_type
  const color = vencido || item.days <= 30 ? "var(--av-red-400)" : "var(--av-amber-400)"
  const texto = vencido
    ? `Venció hace ${Math.abs(item.days)} ${Math.abs(item.days) === 1 ? "día" : "días"}`
    : item.days === 0
      ? "Vence hoy"
      : `Vence en ${item.days} ${item.days === 1 ? "día" : "días"}`

  return (
    <Link
      to="/app/vencimientos"
      className="surface-lift mb-6 flex items-center justify-between gap-4 rounded-xl border p-4"
      style={{
        borderColor: `color-mix(in oklab, ${color} 38%, transparent)`,
        background: `color-mix(in oklab, ${color} 7%, transparent)`,
      }}
    >
      <div className="flex items-center gap-3 min-w-0">
        <span className="flex-shrink-0" style={{ color: accentText(color, 75) }}>
          <AlertTriangle className="h-5 w-5" />
        </span>
        <div className="min-w-0">
          <div className="text-[15px] font-semibold text-foreground truncate">
            {nombre}: {texto.toLowerCase()}
          </div>
          <div className="text-[13px] text-muted-foreground">
            Renuévalo antes de que te deje en tierra.
          </div>
        </div>
      </div>
      <ArrowRight className="hidden sm:block h-4 w-4 flex-shrink-0 text-muted-foreground" />
    </Link>
  )
}
