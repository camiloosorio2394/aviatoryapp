import { Brain, Globe2, Plane, BookOpen, Video, Sparkles, Star, ArrowRight } from "lucide-react"
import { Reveal } from "@/components/Reveal"

/**
 * Catálogo de cursos — los módulos de Aviatory presentados como cursos
 * (miniatura + meta + descripción + CTA), estilo plataforma de cursos.
 */
const COURSES: {
  title: string
  blurb: string
  icon: React.ComponentType<{ className?: string }>
  color: string
  meta: string
  highlight?: boolean
}[] = [
  {
    title: "Inglés ICAO: examen TEA",
    blurb: "Vocabulario, comprensión auditiva, entrevista, descripción de imágenes y un simulacro completo.",
    icon: Globe2,
    color: "#2563EB",
    meta: "5 secciones · Nivel 3 → 5",
    highlight: true,
  },
  {
    title: "Examen PCA Aerocivil",
    blurb: "Banco de preguntas estilo examen con explicaciones. Practicá por materia o simulacro con tiempo real.",
    icon: BookOpen,
    color: "#4338CA",
    meta: "Por materia · Simulacro oficial",
  },
  {
    title: "Psicotécnicas",
    blurb: "Preparate para las evaluaciones psicológicas con tests y práctica guiada.",
    icon: Brain,
    color: "#B45309",
    meta: "Tests + práctica",
  },
  {
    title: "Simulador de entrevistas",
    blurb: "HR, técnica y video-entrevista. Grabate, practicá y llegá listo el día que cuenta.",
    icon: Video,
    color: "#0E7490",
    meta: "HR · Técnica · Video",
  },
  {
    title: "Ingreso a aerolínea",
    blurb: "Requisitos por aerolínea: Avianca, LATAM, Copa, Wingo, JetSmart. Sabés qué te falta para postular.",
    icon: Plane,
    color: "#7C3AED",
    meta: "Requisitos por aerolínea",
  },
  {
    title: "Wingman: tu tutor IA",
    blurb: "Te explica cada pregunta que fallás, en español, con la teoría y un tip para recordarla. 24/7.",
    icon: Sparkles,
    color: "#0891B2",
    meta: "Asistente · siempre disponible",
  },
]

export function Solutions() {
  return (
    <section className="relative py-20 sm:py-28 bg-background">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <Reveal>
            <div className="text-[13px] font-semibold" style={{ color: "var(--av-blue-500)" }}>
              Los cursos
            </div>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-[-0.03em] leading-[1.05]">
              Todo lo que te separa de la cabina, en cursos
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-3 text-[16px] text-muted-foreground leading-relaxed">
              Cada parte de tu camino a la aerolínea es un curso con su propia ruta, práctica y
              seguimiento. Avanzás a tu ritmo y ves tu progreso en cada uno.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {COURSES.map((c, i) => (
            <Reveal key={c.title} as="div" delay={i * 70}>
              <CourseCard {...c} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function CourseCard({
  title,
  blurb,
  icon: Icon,
  color,
  meta,
  highlight,
}: {
  title: string
  blurb: string
  icon: React.ComponentType<{ className?: string }>
  color: string
  meta: string
  highlight?: boolean
}) {
  return (
    <div
      className="group h-full rounded-2xl border bg-card overflow-hidden transition-all hover:-translate-y-1"
      style={{
        borderColor: highlight ? `color-mix(in oklab, ${color} 45%, transparent)` : "var(--border)",
        boxShadow: "0 1px 2px rgb(0 0 0 / 4%)",
      }}
    >
      {/* thumbnail */}
      <div
        className="relative h-32 flex items-center justify-center"
        style={{ background: `linear-gradient(135deg, ${color} 0%, color-mix(in oklab, ${color} 58%, #0b1020) 100%)` }}
      >
        <Icon className="h-11 w-11 text-white/90 transition-transform duration-300 group-hover:scale-110" />
        {highlight && (
          <span className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-white/90 px-2 py-0.5 text-[11px] font-bold" style={{ color }}>
            <Star className="h-3 w-3 fill-current" /> Popular
          </span>
        )}
      </div>

      <div className="p-5">
        <div className="mono text-[11px] uppercase tracking-[0.1em] text-muted-foreground">{meta}</div>
        <h3 className="mt-1.5 text-[17px] font-bold tracking-[-0.01em]">{title}</h3>
        <p className="mt-1.5 text-[13.5px] text-muted-foreground leading-relaxed">{blurb}</p>
        <div className="mt-4 inline-flex items-center gap-1 text-[14px] font-semibold" style={{ color }}>
          Ver curso <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </div>
      </div>
    </div>
  )
}
