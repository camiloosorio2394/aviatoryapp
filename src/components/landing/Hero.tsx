import { Link } from "react-router-dom"
import {
  ArrowRight,
  PlayCircle,
  Star,
  Radio,
  GraduationCap,
  Brain,
  Video,
  Check,
} from "lucide-react"
import { Button } from "@/components/ui/button"

/**
 * Hero estilo plataforma de cursos (Platzi / Domestika / Coursera) para pilotos.
 * Izquierda: propuesta de valor + CTA + prueba social. Derecha: deck de course
 * cards (los módulos como cursos) con miniatura, progreso y lecciones.
 * Minimalista, cálido y moderno — sin mesh ni glows.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden pt-14 pb-20 sm:pt-20 sm:pb-28">
      {/* fondo sutil, calmo */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[var(--surface-soft,transparent)]" />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 right-[-10%] -z-10 h-[480px] w-[480px] rounded-full opacity-50"
        style={{ background: "radial-gradient(circle, color-mix(in oklab, var(--av-blue-400) 18%, transparent) 0%, transparent 70%)" }}
      />

      <div className="relative max-w-6xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-12 lg:gap-10 items-center">
        {/* ── Copy ── */}
        <div className="text-center lg:text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-[13px] font-medium">
            <span className="flex items-center gap-0.5 text-amber-500">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-current" />
              ))}
            </span>
            <span className="text-muted-foreground">La escuela de los pilotos de LATAM</span>
          </div>

          <h1 className="mt-5 text-[2.6rem] sm:text-6xl font-extrabold tracking-[-0.035em] leading-[1.04]">
            De estudiante a{" "}
            <span style={{ color: "var(--av-blue-500)" }}>piloto de aerolínea</span>
          </h1>

          <p className="mt-5 text-[17px] sm:text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed">
            Cursos, simulacros y práctica guiada para aprobar tus chequeos, llegar a tu nivel de
            inglés ICAO y entrar a una aerolínea. Aprendé a tu ritmo, paso a paso.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-3">
            <Button asChild size="lg" className="rounded-full text-base px-7 h-12 font-semibold">
              <Link to="/login?mode=signup">
                Empezá gratis <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full text-base px-6 h-12 font-semibold">
              <a href="#como-funciona">
                <PlayCircle className="mr-2 h-5 w-5" /> Ver cómo funciona
              </a>
            </Button>
          </div>

          {/* prueba social */}
          <div className="mt-7 flex items-center justify-center lg:justify-start gap-4 flex-wrap">
            <div className="flex -space-x-2.5">
              {["1E3A8A", "0E7490", "B45309", "4338CA", "047857"].map((c, i) => (
                <div
                  key={i}
                  className="h-9 w-9 rounded-full border-2 border-background flex items-center justify-center text-[11px] font-bold text-white"
                  style={{ background: `#${c}` }}
                >
                  {["JM", "AL", "VC", "Rd", "SP"][i]}
                </div>
              ))}
            </div>
            <div className="text-[13.5px] text-muted-foreground">
              <strong className="text-foreground">+2.000 pilotos</strong> ya estudian acá
            </div>
          </div>

          <div className="mt-5 flex items-center justify-center lg:justify-start gap-x-4 gap-y-1.5 flex-wrap text-[13px] text-muted-foreground">
            <span className="inline-flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-emerald-500" /> 7 días gratis</span>
            <span className="inline-flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-emerald-500" /> Sin tarjeta</span>
            <span className="inline-flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-emerald-500" /> Cancelás cuando quieras</span>
          </div>
        </div>

        {/* ── Deck de course cards ── */}
        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          {/* card de fondo (decorativa) */}
          <div aria-hidden className="absolute -right-3 top-6 hidden sm:block w-[88%] h-[88%] rounded-2xl border border-border bg-card/60 rotate-3" />
          <div aria-hidden className="absolute -left-3 top-3 hidden sm:block w-[88%] h-[88%] rounded-2xl border border-border bg-card/60 -rotate-2" />

          {/* card principal */}
          <div className="relative rounded-2xl border border-border bg-card overflow-hidden shadow-[0_24px_60px_-24px_rgb(0_0_0_/_22%)]">
            <CourseThumb color="var(--av-blue-500)" icon={Radio} tag="Curso · Inglés ICAO" />
            <div className="p-5">
              <div className="flex items-center gap-2 text-[12px] text-muted-foreground">
                <span className="inline-flex items-center gap-1"><Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" /> 4.9</span>
                <span>·</span>
                <span>Nivel 3 → 5</span>
                <span>·</span>
                <span>5 secciones</span>
              </div>
              <h3 className="mt-1.5 text-[17px] font-bold tracking-[-0.01em]">Inglés ICAO — examen TEA</h3>
              <p className="mt-1 text-[13px] text-muted-foreground leading-snug">
                Vocabulario, comprensión auditiva, entrevista y simulacro completo.
              </p>
              <div className="mt-4">
                <div className="flex items-center justify-between text-[12px] mb-1.5">
                  <span className="text-muted-foreground">Tu progreso</span>
                  <span className="font-semibold" style={{ color: "var(--av-blue-500)" }}>62%</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: "62%", background: "var(--av-blue-500)" }} />
                </div>
              </div>
              <button className="mt-4 w-full inline-flex items-center justify-center gap-1.5 h-10 rounded-lg text-[14px] font-semibold text-white" style={{ background: "var(--av-blue-500)" }}>
                Continuar lección <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* mini course rows flotando (otros cursos) */}
          <div className="mt-4 grid grid-cols-3 gap-2.5">
            <MiniCourse icon={GraduationCap} color="#4338CA" label="Examen PCA" pct={48} />
            <MiniCourse icon={Brain} color="#B45309" label="Psicotécnicas" pct={20} />
            <MiniCourse icon={Video} color="#0E7490" label="Entrevistas" pct={10} />
          </div>
        </div>
      </div>
    </section>
  )
}

function CourseThumb({ color, icon: Icon, tag }: { color: string; icon: React.ComponentType<{ className?: string }>; tag: string }) {
  return (
    <div
      className="relative h-36 flex items-center justify-center"
      style={{ background: `linear-gradient(135deg, ${color} 0%, color-mix(in oklab, ${color} 60%, #0b1020) 100%)` }}
    >
      <Icon className="h-12 w-12 text-white/90" />
      <span className="absolute top-3 left-3 inline-flex items-center rounded-full bg-black/25 backdrop-blur px-2.5 py-1 text-[11px] font-semibold text-white">
        {tag}
      </span>
    </div>
  )
}

function MiniCourse({ icon: Icon, color, label, pct }: { icon: React.ComponentType<{ className?: string }>; color: string; label: string; pct: number }) {
  return (
    <div className="rounded-xl border border-border bg-card p-3">
      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `color-mix(in oklab, ${color} 16%, transparent)`, color }}>
        <Icon className="h-4 w-4" />
      </div>
      <div className="mt-2 text-[12.5px] font-semibold leading-tight truncate">{label}</div>
      <div className="mt-1.5 h-1.5 rounded-full bg-muted overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${pct}%`, background: color }} />
      </div>
    </div>
  )
}
