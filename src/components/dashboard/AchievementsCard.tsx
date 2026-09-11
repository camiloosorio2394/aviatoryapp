import { Link } from "react-router-dom"
import { ArrowRight, Trophy } from "lucide-react"
import { SectionTitle } from "@/components/ui/section-title"
import { accentText } from "@/lib/tileColors"
import { badgeForCode } from "@/lib/achievementBadges"
import type { Achievement } from "@/components/dashboard/tipos"
import { DAILY_ACTION } from "@/components/dashboard/plan"
import { EmptyState } from "@/components/dashboard/EmptyState"

/**
 * Logros como colección visible, no como fichas sueltas.
 *
 * El diseño anterior eran emojis flotando sobre cuatro gradientes, sin nombre a
 * la vista y con el "próximo" en gris lavado. Se veían ocho medallas y nada
 * más: ni cuántas hay, ni cuáles faltan, ni por qué querría uno la siguiente.
 * Ahora se ve la colección entera, lo desbloqueado en el color de su nivel y lo
 * pendiente en silueta con borde punteado, cada uno con su nombre. Ver los
 * huecos es lo que empuja a llenarlos; esconderlos no motivaba nada.
 */
export function AchievementsCard({
  unlocked,
  all,
  loading,
}: {
  unlocked: Achievement[]
  all: Achievement[]
  loading: boolean
}) {
  /** Color de nivel desde tokens. Los gradientes a mano eran cuatro superficies
   *  que no existían en ninguna otra parte de la app. */
  const TIER_COLOR: Record<Achievement["tier"], string> = {
    bronze: "color-mix(in oklab, var(--av-amber-400) 45%, var(--av-red-400))",
    silver: "var(--muted-foreground)",
    gold: "var(--av-amber-400)",
    platinum: "var(--av-cyan-400)",
  }
  const TIER_LABEL: Record<Achievement["tier"], string> = {
    bronze: "Bronce",
    silver: "Plata",
    gold: "Oro",
    platinum: "Platino",
  }

  const unlockedCodes = new Set(unlocked.map((a) => a.code))
  const next = all.find((a) => !unlockedCodes.has(a.code)) ?? null
  const shown = all.slice(0, 12)
  const pct = all.length > 0 ? Math.round((unlockedCodes.size / all.length) * 100) : 0

  return (
    <div className="rounded-xl surface p-5">
      <SectionTitle
        icon={Trophy}
        eyebrow="Logros"
        title={loading ? "Cargando tu colección" : `${unlockedCodes.size} de ${all.length} desbloqueados`}
        right={
          <Link
            to="/app/perfil"
            className="text-[12px] font-semibold inline-flex items-center gap-1 hover:gap-2 transition-[color,background-color,border-color,box-shadow]"
            style={{ color: "var(--av-blue-500)" }}
          >
            Ver todos <ArrowRight className="h-3 w-3" />
          </Link>
        }
      />

      {loading ? (
        <div className="h-[180px] rounded-xl bg-muted animate-pulse" />
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
          {/* Cuánto llevas de la colección, en una barra real */}
          <div className="h-1.5 rounded-full overflow-hidden bg-muted mb-6">
            <div
              className="h-full rounded-full transition-[width] duration-700"
              style={{ width: `${pct}%`, background: "var(--av-amber-400)" }}
            />
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 gap-x-3 gap-y-4">
            {shown.map((a) => {
              const isUnlocked = unlockedCodes.has(a.code)
              const Badge = badgeForCode(a.code)
              return (
                <div
                  key={a.code}
                  className="flex flex-col items-center text-center gap-2 min-w-0"
                  title={`${a.name}: ${a.description}${isUnlocked ? "" : " (pendiente)"}`}
                >
                  <div
                    className="flex items-center justify-center w-12 h-12 rounded-full"
                    style={
                      isUnlocked
                        ? {
                            background: `color-mix(in oklab, ${TIER_COLOR[a.tier]} 14%, transparent)`,
                            border: `1.5px solid color-mix(in oklab, ${TIER_COLOR[a.tier]} 55%, transparent)`,
                            color: accentText(TIER_COLOR[a.tier], 80),
                          }
                        : {
                            background: "var(--muted)",
                            border: "1.5px dashed var(--border)",
                            color: "var(--muted-foreground)",
                          }
                    }
                  >
                    <Badge className="h-[22px] w-[22px]" />
                  </div>
                  <div
                    className={`w-full text-[12px] leading-tight line-clamp-2 ${
                      isUnlocked ? "font-semibold text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {a.name}
                  </div>
                </div>
              )
            })}
          </div>

          {next && (
            <>
              <div className="div-dotted my-4" />
              <div className="flex items-start gap-3">
                <span
                  className="chip flex-shrink-0 mt-1"
                  style={{
                    color: accentText(TIER_COLOR[next.tier]),
                    background: `color-mix(in oklab, ${TIER_COLOR[next.tier]} 12%, transparent)`,
                    borderColor: `color-mix(in oklab, ${TIER_COLOR[next.tier]} 32%, transparent)`,
                  }}
                >
                  {TIER_LABEL[next.tier]}
                </span>
                <p className="m-0 text-[13px] text-muted-foreground leading-snug">
                  <span className="font-semibold text-foreground">Siguiente: {next.name}.</span>{" "}
                  {next.description}
                </p>
              </div>
            </>
          )}
        </>
      )}
    </div>
  )
}
