import { Brain, Globe2, Plane, BookOpen, Video, Sparkles, Star, ArrowRight } from "lucide-react"
import { Reveal } from "@/components/Reveal"
import icaoPhoto from "@/assets/photos/icao-night-cockpit.jpg"
import pcaPhoto from "@/assets/photos/pca-flightdeck.jpg"
import psicoPhoto from "@/assets/photos/psicotecnicas-mano-panel.jpg"
import entrevistasPhoto from "@/assets/photos/entrevistas-interview.jpg"
import aerolineaPhoto from "@/assets/photos/aerolinea-piloto.jpg"
import wingmanPhoto from "@/assets/photos/wingman-cockpit-dusk.jpg"

/**
 * Catálogo de cursos — los módulos de Aviatory presentados como cursos
 * (miniatura fotográfica + meta + descripción + CTA), estilo plataforma de cursos.
 * Fotos: Unsplash License (uso comercial sin atribución) — créditos en docs.
 */
const COURSES: {
  title: string
  blurb: string
  icon: React.ComponentType<{ className?: string }>
  color: string
  meta: string
  photo: string
  highlight?: boolean
}[] = [
  {
    title: "Inglés ICAO: examen TEA",
    blurb: "Vocabulario, comprensión auditiva, entrevista, descripción de imágenes y un simulacro completo.",
    icon: Globe2,
    color: "#2563EB",
    meta: "5 secciones · Nivel 3 → 5",
    photo: icaoPhoto,
    highlight: true,
  },
  {
    title: "Examen PCA Aerocivil",
    blurb: "Banco de preguntas estilo examen con explicaciones. Practicá por materia o simulacro con tiempo real.",
    icon: BookOpen,
    color: "#4338CA",
    meta: "Por materia · Simulacro oficial",
    photo: pcaPhoto,
  },
  {
    title: "Psicotécnicas",
    blurb: "Preparate para las evaluaciones psicológicas con tests y práctica guiada.",
    icon: Brain,
    color: "#B45309",
    meta: "Tests + práctica",
    photo: psicoPhoto,
  },
  {
    title: "Simulador de entrevistas",
    blurb: "HR, técnica y video-entrevista. Grabate, practicá y llegá listo el día que cuenta.",
    icon: Video,
    color: "#0E7490",
    meta: "HR · Técnica · Video",
    photo: entrevistasPhoto,
  },
  {
    title: "Ingreso a aerolínea",
    blurb: "Requisitos por aerolínea: Avianca, LATAM, Copa, Wingo, JetSmart. Sabés qué te falta para postular.",
    icon: Plane,
    color: "#7C3AED",
    meta: "Requisitos por aerolínea",
    photo: aerolineaPhoto,
  },
  {
    title: "Wingman: tu tutor IA",
    blurb: "Te explica cada pregunta que fallás, en español, con la teoría y un tip para recordarla. 24/7.",
    icon: Sparkles,
    color: "#0891B2",
    meta: "Asistente · siempre disponible",
    photo: wingmanPhoto,
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
  photo,
  highlight,
}: {
  title: string
  blurb: string
  icon: React.ComponentType<{ className?: string }>
  color: string
  meta: string
  photo: string
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
      {/* thumbnail fotográfico con tinte del color del curso */}
      <div className="relative h-36 overflow-hidden">
        <img
          src={photo}
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to top, color-mix(in oklab, ${color} 45%, rgb(11 16 32 / 88%)) 0%, rgb(11 16 32 / 12%) 55%, transparent 100%)`,
          }}
        />
        <span
          className="absolute bottom-3 left-3 flex h-9 w-9 items-center justify-center rounded-lg backdrop-blur-sm"
          style={{ background: "rgb(11 16 32 / 45%)" }}
        >
          <Icon className="h-4.5 w-4.5 text-white" />
        </span>
        {highlight && (
          <span
            className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold text-white shadow-sm"
            style={{ background: "linear-gradient(135deg, oklch(0.8 0.14 85), oklch(0.63 0.15 65))" }}
          >
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
