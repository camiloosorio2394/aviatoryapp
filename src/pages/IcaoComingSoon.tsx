import { Link } from "react-router-dom"
import { ArrowLeft, Clock, Check } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { AppLayout } from "@/components/layout/AppLayout"

/**
 * Plantilla de "Pronto" para las partes del TEA que todavía no tienen el flujo
 * interactivo, pero que SÍ tienen valor pedagógico explicado (qué evalúa la
 * parte, cómo es, qué practicar). Reutilizada por Interactive Comprehension,
 * Picture Description y Discussion.
 */
export interface IcaoComingSoonProps {
  badge: string
  icon: LucideIcon
  title: string
  intro: string
  whatItIs: string[]
  howToPrepare: string[]
  color: "violet" | "green" | "amber"
}

const COLOR: Record<IcaoComingSoonProps["color"], string> = {
  violet: "var(--av-violet-400)",
  green: "var(--av-green-400)",
  amber: "var(--av-amber-400)",
}

export function IcaoComingSoon({ badge, icon: Icon, title, intro, whatItIs, howToPrepare, color }: IcaoComingSoonProps) {
  const c = COLOR[color]
  return (
    <AppLayout>
      <div className="px-7 py-7 pb-20 max-w-[900px] mx-auto">
        <Link
          to="/app/icao"
          className="inline-flex items-center gap-1.5 text-[12px] text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Volver al módulo Inglés ICAO
        </Link>

        <div className="flex items-start gap-5">
          <div
            className="flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center"
            style={{
              background: `color-mix(in oklab, ${c} 16%, transparent)`,
              border: `1px solid color-mix(in oklab, ${c} 35%, transparent)`,
              color: c,
            }}
          >
            <Icon className="h-7 w-7" strokeWidth={1.6} />
          </div>
          <div>
            <div
              className="mono inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.16em] px-2 py-1 rounded-full"
              style={{
                color: c,
                background: `color-mix(in oklab, ${c} 12%, transparent)`,
                border: `1px solid color-mix(in oklab, ${c} 30%, transparent)`,
              }}
            >
              <Clock className="h-3 w-3" /> {badge} · PRONTO
            </div>
            <h1 className="mt-3 text-[32px] font-extrabold tracking-[-0.03em] leading-[1.05]">
              {title}
            </h1>
          </div>
        </div>

        <p className="mt-5 text-[15px] leading-relaxed text-foreground/85 max-w-[700px]">
          {intro}
        </p>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <section
            className="rounded-2xl border p-5"
            style={{ borderColor: "color-mix(in oklab, var(--border) 70%, transparent)" }}
          >
            <h2 className="text-[14px] font-bold tracking-[-0.01em] mb-3">Qué evalúa esta parte</h2>
            <ul className="space-y-2">
              {whatItIs.map((t) => (
                <li key={t} className="flex items-start gap-2 text-[13px] text-foreground/80 leading-relaxed">
                  <Check className="flex-shrink-0 mt-0.5 h-3.5 w-3.5" style={{ color: c }} strokeWidth={3} />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </section>

          <section
            className="rounded-2xl border p-5"
            style={{ borderColor: "color-mix(in oklab, var(--border) 70%, transparent)" }}
          >
            <h2 className="text-[14px] font-bold tracking-[-0.01em] mb-3">Cómo ir preparándote ya</h2>
            <ul className="space-y-2">
              {howToPrepare.map((t) => (
                <li key={t} className="flex items-start gap-2 text-[13px] text-foreground/80 leading-relaxed">
                  <Check className="flex-shrink-0 mt-0.5 h-3.5 w-3.5" style={{ color: c }} strokeWidth={3} />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div
          className="mt-8 rounded-2xl border p-5 flex items-center gap-3"
          style={{
            borderColor: `color-mix(in oklab, ${c} 25%, transparent)`,
            background: `color-mix(in oklab, ${c} 6%, transparent)`,
          }}
        >
          <Clock className="flex-shrink-0 h-4.5 w-4.5" style={{ color: c }} />
          <div className="text-[13px] text-foreground/80">
            El flujo interactivo de esta parte está en construcción. Mientras tanto, usá el{" "}
            <Link to="/app/icao/vocabulario" className="font-semibold underline" style={{ color: c }}>
              glosario
            </Link>{" "}
            y el{" "}
            <Link to="/app/icao/interview" className="font-semibold underline" style={{ color: c }}>
              Interview
            </Link>{" "}
            para ganar fluidez.
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
