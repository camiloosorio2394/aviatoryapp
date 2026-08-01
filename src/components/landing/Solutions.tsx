import { Brain, Globe2, Plane, BookOpen, Video, Sparkles } from "lucide-react"
import { Reveal } from "@/components/Reveal"
import { CourseCard } from "@/components/ui/course-card"
import icaoPhoto from "@/assets/photos/icao-night-cockpit.jpg"
import pcaPhoto from "@/assets/photos/pca-flightdeck.jpg"
import psicoPhoto from "@/assets/photos/psicotecnicas-mano-panel.jpg"
import entrevistasPhoto from "@/assets/photos/entrevistas-interview.jpg"
import aerolineaPhoto from "@/assets/photos/aerolinea-piloto.jpg"
import wingmanPhoto from "@/assets/photos/wingman-cockpit-dusk.jpg"

/**
 * Catálogo de cursos: los módulos de Aviatory presentados como cursos
 * (miniatura fotográfica + meta + descripción + CTA), estilo plataforma de cursos.
 *
 * La tarjeta vive en `components/ui/course-card.tsx` porque el mismo patrón lo
 * usan los hubs de cada tema de Ingreso a aerolínea (NOTAM, METAR).
 * Fotos: Unsplash License (uso comercial sin atribución), créditos en docs.
 */
const COURSES: {
  title: string
  blurb: string
  icon: React.ComponentType<{ className?: string }>
  color: string
  meta: string
  photo: string
  highlight?: boolean
  soon?: boolean
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
    blurb: "Banco de preguntas estilo examen con explicaciones. Practica por materia o simulacro con tiempo real.",
    icon: BookOpen,
    color: "#4338CA",
    meta: "Por materia · Simulacro oficial",
    photo: pcaPhoto,
  },
  {
    title: "Psicotécnicas",
    blurb: "Prepárate para las evaluaciones psicológicas con tests y práctica guiada.",
    icon: Brain,
    color: "#B45309",
    meta: "Tests + práctica",
    photo: psicoPhoto,
    soon: true,
  },
  {
    title: "Simulador de entrevistas",
    blurb: "HR, técnica y video-entrevista. Grábate, practica y llega listo el día que cuenta.",
    icon: Video,
    color: "#0E7490",
    meta: "HR · Técnica · Video",
    photo: entrevistasPhoto,
    soon: true,
  },
  {
    title: "Ingreso a aerolínea",
    blurb: "Empieza por NOTAM: lección, decodificador del Doc 8400 y práctica con avisos reales de la Aerocivil. Requisitos por aerolínea, muy pronto.",
    icon: Plane,
    color: "#7C3AED",
    meta: "NOTAM disponible",
    photo: aerolineaPhoto,
  },
  {
    title: "Wingman: tu tutor IA",
    blurb: "Te explica cada pregunta que fallas, en español, con la teoría y un tip para recordarla. 24/7.",
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
              seguimiento. Avanzas a tu ritmo y ves tu progreso en cada uno.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {COURSES.map((c, i) => (
            <Reveal key={c.title} as="div" delay={i * 70}>
              <CourseCard {...c} metaCaps />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
