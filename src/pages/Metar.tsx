import { useState } from "react"
import { Link } from "react-router-dom"
import { ArrowLeft, BookOpen, ClipboardCheck, ScanSearch, Target } from "lucide-react"
import { AppLayout } from "@/components/layout/AppLayout"
import { PageHeader } from "@/components/ui/page-header"
import { CourseCard } from "@/components/ui/course-card"
import type { CourseCardProps } from "@/components/ui/course-card"
import { readMetarProgress } from "@/lib/metar"
import { METAR_LESSON_TOTAL } from "@/lib/metarLesson"
import aprendePhoto from "@/assets/photos/metar-leccion-nubes.jpg"
import decodificadorPhoto from "@/assets/photos/metar-decodificador-manga.jpg"
import practicaPhoto from "@/assets/photos/metar-practica-cabina-nubes.jpg"
import evaluacionPhoto from "@/assets/photos/metar-evaluacion-escritorio.jpg"

/**
 * Hub del tema Meteorología operacional (módulo Ingreso a aerolínea).
 * Ruta: /app/aerolinea/meteorologia
 *
 * v1: METAR con lección y decodificador. Práctica y evaluación van como
 * "Pronto" y el TAF tendrá su propia lección: el hub no promete nada que no
 * exista. El progreso de la lección es local por ahora (ver migración
 * 20260731020000_metar_progreso.sql, pendiente de aplicar).
 *
 * Las partes se presentan con la tarjeta de curso compartida, la misma del
 * catálogo de la portada y del hub de NOTAM.
 */

export function Metar() {
  // El progreso local no cambia durante la visita al hub: leerlo una vez basta.
  const [lessonRead] = useState(() => readMetarProgress().lessonScreens.length)

  const partes: CourseCardProps[] = [
    {
      to: "/app/aerolinea/meteorologia/aprende",
      icon: BookOpen,
      color: "var(--av-blue-500)",
      meta: `${METAR_LESSON_TOTAL} secciones de lectura`,
      title: "Aprende",
      blurb:
        "Qué es un METAR y cómo leerlo grupo por grupo: viento, visibilidad, tiempo presente, nubes, QNH y tendencias.",
      cta: "Abrir la lección",
      photo: aprendePhoto,
      status:
        lessonRead === 0
          ? "Sin empezar"
          : lessonRead >= METAR_LESSON_TOTAL
            ? "Lección completa"
            : `${lessonRead} de ${METAR_LESSON_TOTAL} secciones leídas`,
      done: lessonRead >= METAR_LESSON_TOTAL,
    },
    {
      to: "/app/aerolinea/meteorologia/decodificador",
      icon: ScanSearch,
      color: "var(--av-cyan-400)",
      meta: "Con la leyenda completa del curso",
      title: "Decodificador",
      blurb:
        "Pega cualquier METAR y te lo desarma grupo por grupo. Trae las tablas de fenómenos, descriptores, nubes y tendencias con buscador.",
      cta: "Abrir el decodificador",
      photo: decodificadorPhoto,
      status: "Consulta libre, sin límite",
    },
    // Las dos que faltan no llevan pie de estado: el chip "Pronto" y el CTA ya
    // lo dicen, y una tercera repetición solo hace ruido.
    {
      icon: Target,
      color: "var(--av-violet-400)",
      meta: "Con informes reales y respuesta modelo",
      title: "Práctica",
      blurb: "Interpretarás informes reales con respuesta modelo, como en la práctica de NOTAM.",
      photo: practicaPhoto,
      soon: true,
    },
    {
      icon: ClipboardCheck,
      color: "var(--av-amber-400)",
      meta: "Con explicación por pregunta",
      title: "Evaluación",
      blurb: "Opción múltiple con explicación por pregunta, al estilo de la evaluación de NOTAM.",
      photo: evaluacionPhoto,
      soon: true,
    },
  ]

  return (
    <AppLayout>
      <div className="px-4 sm:px-7 py-6 sm:py-8 pb-12 max-w-[1180px] mx-auto">
        <PageHeader
          eyebrow="Ingreso a aerolínea · Meteorología operacional"
          title="METAR: el estado del cielo en una línea"
          subtitle="La lectura obligada del briefing junto al NOTAM. Hoy: lección completa y decodificador. El TAF tendrá su propia lección."
          actions={
            <Link
              to="/app/aerolinea"
              className="inline-flex items-center gap-1.5 h-10 px-4 rounded-full text-[13px] font-semibold border border-border bg-card text-foreground transition-colors hover:bg-muted"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Volver a Prep aerolínea
            </Link>
          }
        />

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {partes.map((p) => (
            <CourseCard key={p.title} {...p} />
          ))}
        </div>
      </div>
    </AppLayout>
  )
}
