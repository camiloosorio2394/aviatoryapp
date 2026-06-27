import { Link } from "react-router-dom"
import {
  BookOpen,
  Mic,
  Headphones,
  Image as ImageIcon,
  Radio,
  ArrowRight,
  Clock,
  Check,
  Sparkles,
  ClipboardCheck,
  Gauge,
  Award,
} from "lucide-react"
import { AppLayout } from "@/components/layout/AppLayout"

/**
 * Módulo Inglés ICAO — estructurado según el examen TEA (Test of English for
 * Aviation, Mayflower College). 4 secciones:
 *   1. Vocabulario   (glosario + quiz)                       — LISTO
 *   2. Interview      (TEA Part 1)                           — LISTO
 *   3. Interactive Comprehension (TEA Part 2)                — LISTO (audios reales)
 *   4. Picture Description & Discussion (TEA Part 3)         — LISTO (13 pares)
 * Además: los 6 descriptores ICAO + criterios de Nivel 4/5.
 */
export function Icao() {
  return (
    <AppLayout>
      <div className="px-7 py-7 pb-20 max-w-[1240px] mx-auto">
        {/* === HERO === */}
        <section className="relative overflow-hidden rounded-2xl border border-border bg-card p-7 sm:p-8">
          <div className="grid items-center gap-7 sm:grid-cols-[1fr_auto]">
            <div>
              <div className="text-[13px] font-semibold" style={{ color: "var(--av-blue-500)" }}>
                ICAO English · TEA structure
              </div>
              <h1 className="mt-1.5 text-3xl sm:text-4xl font-extrabold tracking-[-0.03em] leading-[1.05]">
                ICAO English, built for the TEA exam
              </h1>
              <p className="text-[16px] text-muted-foreground max-w-[680px] mt-3 leading-relaxed">
                Organised exactly like the <strong className="text-foreground">Test of English for
                Aviation</strong>: 4 sections covering the two skills the exam measures —
                <strong className="text-foreground"> speaking and understanding</strong> English in an
                aviation context.
              </p>
            </div>
            <div className="hidden sm:flex flex-col items-center gap-3 pr-2">
              <div
                className="flex items-center justify-center w-[110px] h-[110px] rounded-2xl"
                style={{ background: "linear-gradient(135deg, var(--av-blue-400), var(--av-blue-500))" }}
              >
                <Radio className="h-14 w-14 text-white" strokeWidth={1.5} />
              </div>
              <div className="text-[12px] font-semibold text-muted-foreground">TEA · 25–30 min</div>
            </div>
          </div>
        </section>

        {/* === DESCRIPCIÓN DEL EXAMEN === */}
        <section className="mt-9 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <div className="text-[13px] font-semibold" style={{ color: "var(--av-blue-500)" }}>
              What the TEA is
            </div>
            <h2 className="mt-1 text-[22px] font-extrabold tracking-[-0.02em]">
              Test of English for Aviation
            </h2>
            <p className="mt-3 text-[15px] text-foreground/90 leading-relaxed">
              The TEA is an exam designed by <strong className="text-foreground">Mayflower College</strong>{" "}
              to assess the English proficiency of pilots and controllers against ICAO's language
              requirements. It assesses <strong className="text-foreground">only speaking and
              listening</strong> skills, in an aviation context —{" "}
              <strong className="text-foreground">it does not test technical knowledge or standard
              phraseology</strong>.
            </p>
            <p className="mt-3 text-[15px] text-foreground/90 leading-relaxed">
              The Part 1 interview assesses your ability to hold a spontaneous conversation in natural,
              technical and professional English. The following parts measure your listening
              comprehension and your ability to describe, compare and give opinions.
            </p>
          </div>

          <div
            className="rounded-2xl border p-5"
            style={{ borderColor: "color-mix(in oklab, var(--av-blue-500) 22%, transparent)", background: "color-mix(in oklab, var(--av-blue-500) 5%, transparent)" }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Clock className="h-4 w-4" style={{ color: "var(--av-blue-500)" }} />
              <div className="text-[14px] font-bold">Total duration: 25–30 min</div>
            </div>
            <ul className="space-y-2.5">
              <FactRow label="Part 1 · Interview" detail="7–8 min · conversation about your role" />
              <FactRow label="Part 2 · Comprehension" detail="audios of non-routine situations" />
              <FactRow label="Part 3 · Picture + Discussion" detail="describe, compare and give opinions" />
            </ul>
            <div className="mt-4 pt-3 border-t border-border/50 text-[13.5px] text-muted-foreground leading-relaxed">
              It only measures <strong className="text-foreground/90">speaking and listening</strong>. There's
              no written part and no technical aviation questions.
            </div>
          </div>
        </section>

        {/* === SIMULACRO (destacado) === */}
        <Link
          to="/app/icao/simulacro"
          className="group mt-9 block rounded-2xl border p-6 transition-all hover:-translate-y-0.5 hover:shadow-md"
          style={{
            borderColor: "color-mix(in oklab, var(--av-blue-500) 35%, transparent)",
            background: "color-mix(in oklab, var(--av-blue-500) 5%, transparent)",
          }}
        >
          <div className="flex items-center gap-5">
            <div
              className="flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, var(--av-blue-400), var(--av-blue-500))" }}
            >
              <Award className="h-7 w-7 text-white" strokeWidth={1.6} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[13px] font-semibold" style={{ color: "var(--av-blue-500)" }}>
                Put yourself to the test
              </div>
              <div className="mt-0.5 text-[20px] font-extrabold tracking-[-0.02em]">TEA Mock Exam — full test</div>
              <p className="mt-1 text-[14px] text-muted-foreground max-w-[640px]">
                All 3 parts in one go, timed, with real audios. Record yourself, answer out loud and
                self-assess on the 6 descriptors at the end.
              </p>
            </div>
            <ArrowRight className="hidden sm:block h-5 w-5 text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
          </div>
        </Link>

        {/* === LAS SECCIONES === */}
        <div className="mt-10 mb-5">
          <div className="text-[13px] font-semibold" style={{ color: "var(--av-blue-500)" }}>
            The module · 4 sections
          </div>
          <h2 className="mt-1 text-[22px] font-extrabold tracking-[-0.02em]">
            Where you train each skill
          </h2>
        </div>

        <div className="grid gap-3.5 md:grid-cols-2 lg:grid-cols-3">
          {SECTIONS.map((s) => (
            <SectionCard key={s.title} {...s} />
          ))}
        </div>

        {/* === CÓMO SE CALIFICA: 6 DESCRIPTORES + NIVELES === */}
        <div className="mt-12 mb-5">
          <div className="text-[13px] font-semibold" style={{ color: "var(--av-blue-500)" }}>
            How it's scored
          </div>
          <h2 className="mt-1 text-[22px] font-extrabold tracking-[-0.02em]">
            The 6 ICAO descriptors
          </h2>
          <p className="mt-2 text-[14.5px] text-muted-foreground max-w-[760px]">
            The TEA scores six descriptors. <strong className="text-foreground">Your final result is
            your lowest descriptor</strong>: if you get 5 in five of them and 4 in comprehension, your
            official result is ICAO 4. So being good at some isn't enough — you have to level them all up.
          </p>
        </div>

        <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
          {DESCRIPTORS.map((d) => (
            <div
              key={d.name}
              className="rounded-xl border p-4"
              style={{ borderColor: "color-mix(in oklab, var(--border) 65%, transparent)" }}
            >
              <div className="flex items-center gap-2">
                <Gauge className="h-4 w-4" style={{ color: "var(--av-blue-500)" }} />
                <div className="text-[15px] font-bold tracking-[-0.01em]">{d.name}</div>
              </div>
              <p className="mt-1 text-[13.5px] text-muted-foreground leading-snug">{d.detail}</p>
            </div>
          ))}
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <LevelPanel
            level={4}
            title="Operational"
            color="cyan"
            blurb="The legal minimum to fly international commercial. You must reach 4 in EVERY descriptor."
            traits={[
              "Holds conversations on operational topics",
              "Understands most routine communication and many non-routine ones",
              "Some grammatical errors, but they rarely affect communication",
              "Enough vocabulary to explain problems and ask for help",
              "Reasonable fluency; can ask for clarification",
            ]}
          />
          <LevelPanel
            level={5}
            title="Extended"
            color="green"
            blurb="The target level for an airline career. Minimum 5 in ALL descriptors."
            traits={[
              "Speaks with great ease and confidence",
              "Varied grammatical structures, very few errors",
              "Broad and precise vocabulary",
              "Understands almost everything, even accents and complex situations",
              "Interacts spontaneously; needs very few repetitions",
            ]}
          />
        </div>

        {/* === Wingman helper === */}
        <section
          className="mt-10 rounded-2xl border p-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-5"
          style={{
            borderColor: "color-mix(in oklab, var(--av-blue-500) 22%, transparent)",
            background: "color-mix(in oklab, var(--av-blue-500) 5%, transparent)",
          }}
        >
          <div>
            <div
              className="inline-flex items-center gap-1.5 text-[13px] font-semibold"
              style={{ color: "var(--av-blue-500)" }}
            >
              <Sparkles className="h-3.5 w-3.5" /> Practice tip
            </div>
            <h3 className="mt-1.5 text-lg font-bold">Practise out loud — and record yourself</h3>
            <p className="mt-1 text-sm text-muted-foreground max-w-[680px]">
              The TEA is oral. Reading the answers isn't enough: answer out loud, record yourself on
              your phone and listen back. It's the most uncomfortable thing and what raises your level
              fastest. In the #icao community you can ask for feedback and practise with others.
            </p>
          </div>
          <Link
            to="/app/comunidad"
            className="inline-flex items-center gap-1.5 h-10 px-4 rounded-lg text-sm font-semibold text-white border-0 flex-shrink-0 transition-transform hover:-translate-y-0.5"
            style={{ background: "var(--av-blue-500)" }}
          >
            #icao community <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </section>
      </div>
    </AppLayout>
  )
}

// ────────────────────────────────────────────────────────────────────────────
function FactRow({ label, detail }: { label: string; detail: string }) {
  return (
    <li className="flex items-start gap-2">
      <Check className="flex-shrink-0 mt-0.5 h-3.5 w-3.5" style={{ color: "var(--av-blue-500)" }} strokeWidth={3} />
      <div>
        <div className="text-[14px] font-semibold leading-tight">{label}</div>
        <div className="text-[13px] text-muted-foreground leading-tight">{detail}</div>
      </div>
    </li>
  )
}

type ColorKey = "cyan" | "blue" | "violet" | "green" | "amber"
const TILE_COLOR: Record<ColorKey, string> = {
  cyan: "#0E7490",
  blue: "#2563EB",
  violet: "#7C3AED",
  green: "#047857",
  amber: "#B45309",
}

interface SectionDef {
  to: string
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>
  color: ColorKey
  part: string
  title: string
  description: string
  status: "ready" | "soon"
  cta: string
  secondary?: { to: string; label: string; icon: React.ComponentType<{ className?: string }> }
}

const SECTIONS: SectionDef[] = [
  {
    to: "/app/icao/vocabulario",
    icon: BookOpen,
    color: "cyan",
    part: "Base",
    title: "Vocabulary",
    description: "~350 searchable aviation English terms, grouped by category. The foundation of everything else. Includes a quiz to test yourself.",
    status: "ready",
    cta: "Open glossary",
    secondary: { to: "/app/icao/quiz", label: "Quiz", icon: ClipboardCheck },
  },
  {
    to: "/app/icao/interview",
    icon: Mic,
    color: "blue",
    part: "TEA · Part 1",
    title: "Interview",
    description: "The questions the examiner asks about your role and aviation. 4 sets with technical, professional model answers to capture the expected register.",
    status: "ready",
    cta: "Practise Interview",
  },
  {
    to: "/app/icao/comprension",
    icon: Headphones,
    color: "violet",
    part: "TEA · Part 2",
    title: "Interactive Comprehension",
    description: "You listen to non-routine situations and react. 2A short · 2B long · 2C interactive, with real audios from the practice material.",
    status: "ready",
    cta: "Practise comprehension",
  },
  {
    to: "/app/icao/picture-description",
    icon: ImageIcon,
    color: "green",
    part: "TEA · Part 3",
    title: "Picture Description & Discussion",
    description: "13 real image pairs: you describe, compare, spot risks, speculate on causes, give opinions and discuss the topic.",
    status: "ready",
    cta: "Practise Part 3",
  },
]

function SectionCard({ to, icon: Icon, color, part, title, description, status, cta, secondary }: SectionDef) {
  const c = TILE_COLOR[color]
  return (
    <div
      className="card card-hover rounded-2xl border p-5 flex flex-col gap-3"
      style={{ borderColor: `color-mix(in oklab, ${c} ${status === "ready" ? "32%" : "22%"}, transparent)` }}
    >
      <div className="flex items-start justify-between">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center"
          style={{
            background: `color-mix(in oklab, ${c} 14%, transparent)`,
            border: `1px solid color-mix(in oklab, ${c} 32%, transparent)`,
            color: c,
          }}
        >
          <Icon className="h-5 w-5" strokeWidth={2} />
        </div>
        {status === "ready" ? (
          <span
            className="text-[11px] font-semibold px-2 py-0.5 rounded-full"
            style={{ color: "#047857", background: "color-mix(in oklab, #047857 12%, transparent)" }}
          >
            Ready
          </span>
        ) : (
          <span
            className="text-[11px] font-semibold px-2 py-0.5 rounded-full"
            style={{ color: "var(--muted-foreground)", background: "color-mix(in oklab, var(--border) 40%, transparent)" }}
          >
            Soon
          </span>
        )}
      </div>

      <div>
        <div className="text-[11px] font-bold uppercase tracking-[0.1em]" style={{ color: c }}>
          {part}
        </div>
        <div className="mt-0.5 text-[17px] font-extrabold tracking-[-0.02em]">{title}</div>
        <p className="mt-1 text-[14px] text-muted-foreground leading-relaxed">{description}</p>
      </div>

      <div className="mt-auto pt-1 flex items-center gap-2">
        <Link
          to={to}
          className="inline-flex items-center gap-1 text-[14px] font-semibold"
          style={{ color: c }}
        >
          {cta} <ArrowRight className="h-3 w-3" />
        </Link>
        {secondary && (
          <>
            <span className="text-border">·</span>
            <Link
              to={secondary.to}
              className="inline-flex items-center gap-1 text-[14px] font-semibold text-muted-foreground hover:text-foreground transition-colors"
            >
              <secondary.icon className="h-3 w-3" /> {secondary.label}
            </Link>
          </>
        )}
      </div>
    </div>
  )
}

// ────────────────────────────────────────────────────────────────────────────
// DESCRIPTORES + NIVELES
// ────────────────────────────────────────────────────────────────────────────
const DESCRIPTORS: { name: string; detail: string }[] = [
  { name: "Pronunciation", detail: "Clarity of pronunciation and ease of being understood." },
  { name: "Structure", detail: "Correct grammar and sentence construction." },
  { name: "Vocabulary", detail: "Range and accuracy of vocabulary, both aviation and general." },
  { name: "Fluency", detail: "Speaking continuously and naturally, with few unnecessary pauses." },
  { name: "Comprehension", detail: "Understanding spoken messages, even with accents or unexpected situations." },
  { name: "Interactions", detail: "Keeping the conversation going, responding, asking for clarification and managing the exchange." },
]

function LevelPanel({ level, title, color, blurb, traits }: { level: number; title: string; color: ColorKey; blurb: string; traits: string[] }) {
  const c = TILE_COLOR[color]
  return (
    <div
      className="rounded-2xl border p-5"
      style={{ borderColor: `color-mix(in oklab, ${c} 30%, transparent)`, background: `color-mix(in oklab, ${c} 5%, transparent)` }}
    >
      <div className="flex items-baseline gap-2">
        <div className="text-[36px] font-extrabold tracking-[-0.04em] leading-none" style={{ color: c }}>
          {level}
        </div>
        <div>
          <div className="text-[16px] font-bold tracking-[-0.01em]">ICAO {level} · {title}</div>
          <div className="text-[12px] text-muted-foreground">
            minimum {level} in every descriptor
          </div>
        </div>
      </div>
      <p className="mt-2 text-[14px] text-foreground/90 leading-relaxed">{blurb}</p>
      <ul className="mt-3 space-y-1.5">
        {traits.map((t) => (
          <li key={t} className="flex items-start gap-2 text-[13.5px] text-foreground/90">
            <Check className="flex-shrink-0 mt-0.5 h-3.5 w-3.5" style={{ color: c }} strokeWidth={3} />
            <span>{t}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
