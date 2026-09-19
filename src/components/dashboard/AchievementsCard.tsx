import { Link } from "react-router-dom"
import { ArrowRight, Trophy } from "lucide-react"
import { badgeForCode } from "@/lib/achievementBadges"
import type { Achievement } from "@/components/dashboard/tipos"
import { DAILY_ACTION } from "@/components/dashboard/plan"
import { EmptyState } from "@/components/dashboard/EmptyState"

/**
 * Logros como colección visible, no como fichas sueltas: la colección entera,
 * lo desbloqueado marcado y lo pendiente en silueta con borde punteado, cada
 * uno con su nombre. Ver los huecos es lo que empuja a llenarlos.
 *
 * Monocromo, como los módulos. Antes cada nivel tenía su color, y bronce y oro
 * eran ámbar y rojo, que en esta app significan alerta y error: una medalla de
 * oro se leía como un aviso. El nivel va ahora como escala ordinal —el borde se
 * oscurece de bronce a platino— y además escrito en su nombre, así que nunca
 * depende solo del color.
 */
const PESO_DEL_NIVEL: Record<Achievement["tier"], number> = {
  bronze: 22,
  silver: 40,
  gold: 62,
  platinum: 88,
}

const NOMBRE_DEL_NIVEL: Record<Achievement["tier"], string> = {
  bronze: "Bronce",
  silver: "Plata",
  gold: "Oro",
  platinum: "Platino",
}

export function AchievementsCard({
  unlocked,
  all,
  loading,
}: {
  unlocked: Achievement[]
  all: Achievement[]
  loading: boolean
}) {
  const desbloqueados = new Set(unlocked.map((a) => a.code))
  const siguiente = all.find((a) => !desbloqueados.has(a.code)) ?? null
  const visibles = all.slice(0, 12)
  const pct = all.length > 0 ? Math.round((desbloqueados.size / all.length) * 100) : 0

  return (
    <div className="@container flex h-full flex-col rounded-2xl surface p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="m-0 text-[15px] font-semibold tracking-[-0.01em] text-foreground">Logros</h3>
          <p className="m-0 mt-0.5 text-[12.5px] text-muted-foreground">
            {loading ? "Cargando tu colección" : `${desbloqueados.size} de ${all.length} desbloqueados`}
          </p>
        </div>
        <Link
          to="/app/perfil"
          className="inline-flex shrink-0 items-center gap-1 text-[12.5px] font-semibold text-foreground transition-[gap] hover:gap-2"
        >
          Ver todos <ArrowRight className="h-3.5 w-3.5" aria-hidden />
        </Link>
      </div>

      {loading ? (
        <div className="mt-4 h-[150px] rounded-xl bg-muted animate-pulse" />
      ) : all.length === 0 ? (
        <EmptyState
          icon={Trophy}
          title="La colección se está preparando"
          line="Vuelve más tarde: aquí van a aparecer los logros."
          cta="Empezar quiz de hoy"
          href={DAILY_ACTION.href}
        />
      ) : (
        <>
          {/* Cuánto llevas de la colección. Tinta neutra: es un recuento, no
              un aviso ni un acierto. */}
          <div
            className="mt-4 h-1.5 overflow-hidden rounded-full bg-muted"
            role="progressbar"
            aria-label="Logros desbloqueados"
            aria-valuenow={pct}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="h-full rounded-full transition-[width] duration-700"
              style={{ width: `${pct}%`, background: "var(--foreground)" }}
            />
          </div>

          <ul className="m-0 mt-5 grid list-none grid-cols-3 gap-x-3 gap-y-4 p-0 @lg:grid-cols-6">
            {visibles.map((a) => {
              const conseguido = desbloqueados.has(a.code)
              const Medalla = badgeForCode(a.code)
              return (
                <li
                  key={a.code}
                  className="flex min-w-0 flex-col items-center gap-2 text-center"
                  title={`${a.name} · ${NOMBRE_DEL_NIVEL[a.tier]}: ${a.description}${conseguido ? "" : " (pendiente)"}`}
                >
                  <span
                    className="flex h-12 w-12 items-center justify-center rounded-full"
                    style={
                      conseguido
                        ? {
                            background: "var(--muted)",
                            border: `1.5px solid color-mix(in oklab, var(--foreground) ${PESO_DEL_NIVEL[a.tier]}%, transparent)`,
                            color: "var(--foreground)",
                          }
                        : {
                            background: "transparent",
                            border: "1.5px dashed var(--border)",
                            color: "var(--muted-foreground)",
                          }
                    }
                  >
                    <Medalla className="h-[22px] w-[22px]" />
                  </span>
                  <span
                    className={`line-clamp-2 w-full text-[12px] leading-tight ${
                      conseguido ? "font-semibold text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {a.name}
                  </span>
                  <span className="sr-only">
                    {NOMBRE_DEL_NIVEL[a.tier]}, {conseguido ? "desbloqueado" : "pendiente"}
                  </span>
                </li>
              )
            })}
          </ul>

          {siguiente && (
            <div className="mt-5 flex items-start gap-3 border-t border-border pt-4">
              <span className="mt-px inline-flex shrink-0 items-center rounded-full border border-border px-2 py-0.5 text-[11px] font-semibold text-foreground">
                {NOMBRE_DEL_NIVEL[siguiente.tier]}
              </span>
              <p className="m-0 text-[13px] leading-snug text-muted-foreground">
                <span className="font-semibold text-foreground">Siguiente: {siguiente.name}.</span>{" "}
                {siguiente.description}
              </p>
            </div>
          )}
        </>
      )}
    </div>
  )
}
