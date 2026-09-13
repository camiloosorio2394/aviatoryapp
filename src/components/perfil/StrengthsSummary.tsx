import { Link } from "react-router-dom"
import { ArrowRight, Check, TrendingUp } from "lucide-react"
import { SectionTitle } from "@/components/ui/section-title"
import { DIM_ADVICE } from "@/components/perfil/datos"
import type { Skill } from "@/components/perfil/tipos"

export function StrengthsSummary({ strengths, gaps }: { strengths: Skill[]; gaps: Skill[] }) {
  return (
    <div className="rounded-2xl surface p-6">
      <SectionTitle icon={TrendingUp} eyebrow="Resumen" title="Fortalezas y debilidades" />
      <div className="grid gap-6 sm:grid-cols-2 mt-1">
        <div>
          <div className="mb-2.5">
            <span className="chip chip-green">Tus fortalezas</span>
          </div>
          {strengths.length === 0 ? (
            <p className="text-[13px] text-muted-foreground leading-relaxed">
              Todavía no hay datos suficientes para destacar fortalezas. Empieza por los próximos
              pasos que te sugerimos.
            </p>
          ) : (
            <ul className="space-y-2">
              {strengths.map((s) => (
                <li key={s.key} className="flex items-start gap-2 text-[13px]">
                  <Check className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: "var(--av-green-400)" }} strokeWidth={3} />
                  <span>
                    <span className="font-semibold text-foreground">{s.label}</span>
                    <span className="text-muted-foreground"> · {s.raw} ({Math.round(s.value)}%)</span>
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div>
          <div className="mb-2.5">
            <span className="chip chip-amber">Próximos pasos</span>
          </div>
          {gaps.length === 0 ? (
            <p className="text-[13px] text-muted-foreground leading-relaxed">
              Vas muy bien: no hay debilidades marcadas ahora mismo.
            </p>
          ) : (
            <ul className="space-y-3">
              {gaps.map((s) => {
                const adv = DIM_ADVICE[s.key]
                return (
                  <li key={s.key} className="text-[13px]">
                    <div>
                      <span className="font-semibold text-foreground">{s.label}</span>
                      <span className="text-muted-foreground"> · {s.raw}</span>
                    </div>
                    {adv && (
                      <Link
                        to={adv.href}
                        className="inline-flex items-center gap-1 text-[13px] font-semibold mt-0.5"
                        style={{ color: "var(--av-blue-500)" }}
                      >
                        {adv.cta} <ArrowRight className="h-3 w-3" />
                      </Link>
                    )}
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
