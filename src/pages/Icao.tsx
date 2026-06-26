import { Link } from "react-router-dom"
import {
  BookOpen,
  Mic,
  Headphones,
  Image as ImageIcon,
  MessagesSquare,
  Radio,
  ArrowRight,
  Clock,
  Check,
  Sparkles,
  ClipboardCheck,
} from "lucide-react"
import { AppLayout } from "@/components/layout/AppLayout"

/**
 * Módulo Inglés ICAO — estructurado según el examen TEA (Test of English for
 * Aviation, Mayflower College). 5 secciones:
 *   1. Vocabulario   (glosario + quiz)            — LISTO
 *   2. Interview      (TEA Part 1)                 — LISTO
 *   3. Interactive Comprehension (TEA Part 2)      — Pronto
 *   4. Picture Description (TEA Part 3a)           — Pronto
 *   5. Discussion     (TEA Part 3b)                — Pronto
 */
export function Icao() {
  return (
    <AppLayout>
      <div className="px-7 py-7 pb-20 max-w-[1240px] mx-auto">
        {/* === HERO === */}
        <section
          className="cockpit anim-fade-up relative overflow-hidden rounded-3xl border p-9"
          style={{
            borderColor: "oklch(0.32 0.04 250 / 0.6)",
            boxShadow: "var(--shadow-navy), inset 0 1px 0 rgb(255 255 255 / 7%)",
          }}
        >
          <div className="cockpit-grid absolute inset-0 opacity-60" />
          <div
            className="absolute inset-0"
            style={{ background: "radial-gradient(at 80% 0%, oklch(0.78 0.16 215 / 25%) 0%, transparent 50%)" }}
          />
          <div className="relative grid items-center gap-8" style={{ gridTemplateColumns: "1fr auto" }}>
            <div>
              <div
                className="mono inline-flex items-center gap-1.5 text-[11px] font-bold tracking-[0.18em] uppercase px-2.5 py-1 rounded-full"
                style={{
                  color: "var(--av-cyan-300)",
                  background: "oklch(0.78 0.16 215 / 12%)",
                  border: "1px solid oklch(0.78 0.16 215 / 30%)",
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: "var(--av-amber-400)", boxShadow: "0 0 8px var(--av-amber-400)" }}
                />
                MÓDULO INGLÉS ICAO · ESTRUCTURA TEA
              </div>
              <h1 className="mt-4 mb-1.5 text-[42px] font-extrabold tracking-[-0.04em] text-white leading-[1.05]">
                Inglés ICAO,{" "}
                <span
                  style={{
                    background: "linear-gradient(135deg, var(--av-cyan-300), white)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  preparado para el examen TEA
                </span>
              </h1>
              <p className="text-[16px] text-white/75 max-w-[680px] mt-3 leading-relaxed">
                Organizado exactamente como el <strong className="text-white">Test of English for
                Aviation</strong>: 5 secciones que cubren las dos habilidades que el examen mide —
                <strong className="text-white"> hablar y comprender</strong> inglés en contexto
                aeronáutico.
              </p>
            </div>
            <div className="flex flex-col items-center gap-3 pr-2">
              <div
                className="flex items-center justify-center w-[120px] h-[120px] rounded-2xl"
                style={{
                  background: "linear-gradient(135deg, var(--av-cyan-300), var(--av-blue-500))",
                  boxShadow:
                    "0 16px 40px -8px oklch(0.55 0.22 264 / 60%), inset 0 1px 0 rgb(255 255 255 / 25%)",
                }}
              >
                <Radio className="h-14 w-14 text-white" strokeWidth={1.5} />
              </div>
              <div className="mono text-[10px] tracking-[0.16em] text-white/50">TEA · 25–30 MIN</div>
            </div>
          </div>
        </section>

        {/* === DESCRIPCIÓN DEL EXAMEN === */}
        <section className="mt-9 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <div className="mono text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--av-cyan-400)]">
              QUÉ ES EL TEA
            </div>
            <h2 className="mt-1 text-[22px] font-extrabold tracking-[-0.02em]">
              Test of English for Aviation
            </h2>
            <p className="mt-3 text-[14px] text-foreground/80 leading-relaxed">
              El TEA es un examen diseñado por <strong className="text-foreground">Mayflower College</strong>{" "}
              para evaluar la competencia en inglés de pilotos y controladores según los requisitos
              lingüísticos de la ICAO. Evalúa <strong className="text-foreground">exclusivamente las
              habilidades de hablar y comprender</strong> inglés, en un contexto aeronáutico —{" "}
              <strong className="text-foreground">sin medir conocimientos técnicos ni fraseología
              estándar</strong>.
            </p>
            <p className="mt-3 text-[14px] text-foreground/80 leading-relaxed">
              La entrevista de la Parte 1 busca evaluar tu capacidad para mantener una conversación
              espontánea usando un inglés natural, técnico y profesional. Las partes siguientes miden
              tu comprensión auditiva y tu capacidad de describir, comparar y opinar.
            </p>
          </div>

          <div
            className="rounded-2xl border p-5"
            style={{ borderColor: "color-mix(in oklab, var(--av-cyan-400) 25%, transparent)", background: "color-mix(in oklab, var(--av-cyan-400) 5%, transparent)" }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Clock className="h-4 w-4 text-[var(--av-cyan-400)]" />
              <div className="text-[13px] font-bold">Duración total: 25–30 min</div>
            </div>
            <ul className="space-y-2.5">
              <FactRow label="Parte 1 · Interview" detail="7–8 min · conversación sobre tu rol" />
              <FactRow label="Parte 2 · Comprehension" detail="audios de situaciones no rutinarias" />
              <FactRow label="Parte 3 · Picture + Discussion" detail="describir, comparar y opinar" />
            </ul>
            <div className="mt-4 pt-3 border-t border-border/50 text-[12px] text-muted-foreground leading-relaxed">
              Solo mide <strong className="text-foreground/80">speaking y listening</strong>. No hay
              parte escrita ni preguntas técnicas de aeronáutica.
            </div>
          </div>
        </section>

        {/* === LAS 5 SECCIONES === */}
        <div className="mt-10 mb-5">
          <div className="mono text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--av-cyan-400)]">
            EL MÓDULO · 5 SECCIONES
          </div>
          <h2 className="mt-1 text-[22px] font-extrabold tracking-[-0.02em]">
            Por dónde entrenás cada habilidad
          </h2>
        </div>

        <div className="grid gap-3.5 md:grid-cols-2 lg:grid-cols-3">
          {SECTIONS.map((s) => (
            <SectionCard key={s.title} {...s} />
          ))}
        </div>

        {/* === Wingman helper === */}
        <section
          className="mt-10 rounded-2xl border p-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-5"
          style={{
            borderColor: "oklch(0.78 0.16 215 / 25%)",
            background:
              "linear-gradient(135deg, oklch(0.78 0.16 215 / 8%) 0%, oklch(0.55 0.22 264 / 10%) 100%)",
          }}
        >
          <div>
            <div
              className="mono inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[0.16em] uppercase"
              style={{ color: "var(--av-cyan-400)" }}
            >
              <Sparkles className="h-3 w-3" /> Tip de práctica
            </div>
            <h3 className="mt-1.5 text-lg font-bold">Practicá en voz alta — y grabate</h3>
            <p className="mt-1 text-sm text-muted-foreground max-w-[680px]">
              El TEA es oral. Leer las respuestas no alcanza: respondé en voz alta, grabate con el
              celular y escuchate. Es lo más incómodo y lo que más rápido te sube el nivel. En la
              comunidad #icao podés pedir feedback y practicar con otros.
            </p>
          </div>
          <Link
            to="/app/comunidad"
            className="av-shine inline-flex items-center gap-1.5 h-10 px-4 rounded-lg text-sm font-semibold text-white border-0 flex-shrink-0"
            style={{
              background: "linear-gradient(180deg, var(--av-blue-400) 0%, var(--av-blue-500) 100%)",
              boxShadow:
                "0 1px 0 rgb(255 255 255 / 18%) inset, 0 10px 24px -8px oklch(0.55 0.22 264 / 45%)",
            }}
          >
            Comunidad #icao <ArrowRight className="h-3.5 w-3.5" />
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
      <Check className="flex-shrink-0 mt-0.5 h-3.5 w-3.5 text-[var(--av-cyan-400)]" strokeWidth={3} />
      <div>
        <div className="text-[12.5px] font-semibold leading-tight">{label}</div>
        <div className="text-[11.5px] text-muted-foreground leading-tight">{detail}</div>
      </div>
    </li>
  )
}

type ColorKey = "cyan" | "blue" | "violet" | "green" | "amber"
const TILE_COLOR: Record<ColorKey, string> = {
  cyan: "var(--av-cyan-400)",
  blue: "var(--av-blue-500)",
  violet: "var(--av-violet-400)",
  green: "var(--av-green-400)",
  amber: "var(--av-amber-400)",
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
    title: "Vocabulario",
    description: "~350 términos de aviation English buscables, agrupados por categoría. La base de todo lo demás. Incluye un quiz para autoevaluarte.",
    status: "ready",
    cta: "Abrir glosario",
    secondary: { to: "/app/icao/quiz", label: "Quiz", icon: ClipboardCheck },
  },
  {
    to: "/app/icao/interview",
    icon: Mic,
    color: "blue",
    part: "TEA · Part 1",
    title: "Interview",
    description: "Las preguntas que hace el examinador sobre tu rol y la aviación. 4 sets con respuestas modelo técnicas y profesionales para captar el registro esperado.",
    status: "ready",
    cta: "Practicar Interview",
  },
  {
    to: "/app/icao/comprension",
    icon: Headphones,
    color: "violet",
    part: "TEA · Part 2",
    title: "Interactive Comprehension",
    description: "Escuchás situaciones no rutinarias y reaccionás. Comprensión auditiva pura, con ruido y acentos. Flujo interactivo en construcción.",
    status: "soon",
    cta: "Ver de qué se trata",
  },
  {
    to: "/app/icao/picture-description",
    icon: ImageIcon,
    color: "green",
    part: "TEA · Part 3",
    title: "Picture Description",
    description: "Describís y comparás imágenes de entornos aeronáuticos sin quedarte en silencio. Vocabulario descriptivo y fluidez sostenida.",
    status: "soon",
    cta: "Ver de qué se trata",
  },
  {
    to: "/app/icao/discussion",
    icon: MessagesSquare,
    color: "amber",
    part: "TEA · Part 3",
    title: "Discussion",
    description: "Conversación abierta sobre temas de aviación: das opinión, argumentás, especulás. El nivel más alto de fluidez del examen.",
    status: "soon",
    cta: "Ver de qué se trata",
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
            className="mono text-[9px] font-bold uppercase tracking-[0.12em] px-2 py-0.5 rounded-full"
            style={{ color: "var(--av-green-400)", background: "color-mix(in oklab, var(--av-green-400) 12%, transparent)" }}
          >
            Listo
          </span>
        ) : (
          <span
            className="mono text-[9px] font-bold uppercase tracking-[0.12em] px-2 py-0.5 rounded-full"
            style={{ color: "var(--muted-foreground)", background: "color-mix(in oklab, var(--border) 40%, transparent)" }}
          >
            Pronto
          </span>
        )}
      </div>

      <div>
        <div className="mono text-[9px] font-bold uppercase tracking-[0.14em]" style={{ color: c }}>
          {part}
        </div>
        <div className="mt-0.5 text-[16px] font-extrabold tracking-[-0.02em]">{title}</div>
        <p className="mt-1 text-[12.5px] text-muted-foreground leading-relaxed">{description}</p>
      </div>

      <div className="mt-auto pt-1 flex items-center gap-2">
        <Link
          to={to}
          className="inline-flex items-center gap-1 text-[12.5px] font-semibold"
          style={{ color: c }}
        >
          {cta} <ArrowRight className="h-3 w-3" />
        </Link>
        {secondary && (
          <>
            <span className="text-border">·</span>
            <Link
              to={secondary.to}
              className="inline-flex items-center gap-1 text-[12.5px] font-semibold text-muted-foreground hover:text-foreground transition-colors"
            >
              <secondary.icon className="h-3 w-3" /> {secondary.label}
            </Link>
          </>
        )}
      </div>
    </div>
  )
}
