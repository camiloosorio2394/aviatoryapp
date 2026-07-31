import { useState } from "react"
import { Link } from "react-router-dom"
import type { ComponentType } from "react"
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2, ClipboardCheck, ScanSearch, Target } from "lucide-react"
import { AppLayout } from "@/components/layout/AppLayout"
import { PageHeader } from "@/components/ui/page-header"
import { accentText } from "@/lib/notam"
import { readMetarProgress } from "@/lib/metar"
import { METAR_LESSON_TOTAL } from "@/lib/metarLesson"

/**
 * Hub del tema Meteorología operacional (módulo Ingreso a aerolínea).
 * Ruta: /app/aerolinea/meteorologia
 *
 * v1: METAR con lección y decodificador. Práctica y evaluación van como
 * "Pronto" y el TAF tendrá su propia lección: el hub no promete nada que no
 * exista. El progreso de la lección es local por ahora (ver migración
 * 20260731020000_metar_progreso.sql, pendiente de aplicar).
 */

interface Parte {
  to?: string
  icon: ComponentType<{ className?: string }>
  color: string
  eyebrow: string
  title: string
  description: string
  estado: string
  hecho: boolean
}

export function Metar() {
  // El progreso local no cambia durante la visita al hub: leerlo una vez basta.
  const [lessonRead] = useState(() => readMetarProgress().lessonScreens.length)

  const partes: Parte[] = [
    {
      to: "/app/aerolinea/meteorologia/aprende",
      icon: BookOpen,
      color: "var(--av-blue-500)",
      eyebrow: `${METAR_LESSON_TOTAL} secciones`,
      title: "Aprende",
      description:
        "Qué es un METAR y cómo leerlo grupo por grupo: viento, visibilidad, tiempo presente, nubes, QNH y tendencias.",
      estado:
        lessonRead === 0
          ? "Sin empezar"
          : lessonRead >= METAR_LESSON_TOTAL
            ? "Lección completa"
            : `${lessonRead} de ${METAR_LESSON_TOTAL} secciones leídas`,
      hecho: lessonRead >= METAR_LESSON_TOTAL,
    },
    {
      to: "/app/aerolinea/meteorologia/decodificador",
      icon: ScanSearch,
      color: "var(--av-cyan-400)",
      eyebrow: "Con la leyenda completa del curso",
      title: "Decodificador",
      description:
        "Pega cualquier METAR y te lo desarma grupo por grupo. Trae las tablas de fenómenos, descriptores, nubes y tendencias con buscador.",
      estado: "Consulta libre, sin límite",
      hecho: false,
    },
    {
      icon: Target,
      color: "var(--av-violet-400)",
      eyebrow: "En construcción",
      title: "Práctica",
      description: "Interpretarás informes reales con respuesta modelo, como en la práctica de NOTAM.",
      estado: "Pronto",
      hecho: false,
    },
    {
      icon: ClipboardCheck,
      color: "var(--av-amber-400)",
      eyebrow: "En construcción",
      title: "Evaluación",
      description: "Opción múltiple con explicación por pregunta, al estilo de la evaluación de NOTAM.",
      estado: "Pronto",
      hecho: false,
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

        <div className="grid gap-4 sm:grid-cols-2">
          {partes.map((p) => {
            const Ic = p.icon
            const inner = (
              <>
                <div className="flex items-start justify-between gap-3">
                  <div
                    className="flex items-center justify-center w-10 h-10 rounded-lg flex-shrink-0"
                    style={{
                      background: `color-mix(in oklab, ${p.color} 14%, transparent)`,
                      border: `1px solid color-mix(in oklab, ${p.color} 24%, transparent)`,
                      color: accentText(p.color, 75),
                    }}
                  >
                    <Ic className="h-5 w-5" />
                  </div>
                  {p.hecho && (
                    <span className="chip chip-green">
                      <CheckCircle2 className="h-3 w-3" /> Completo
                    </span>
                  )}
                  {!p.to && <span className="chip">Pronto</span>}
                </div>
                <div className="mt-3 text-[12px] text-muted-foreground">{p.eyebrow}</div>
                <h2 className="mt-0.5 text-[17px] font-semibold text-foreground tracking-[-0.021em]">
                  {p.title}
                </h2>
                <p className="mt-1 text-[13px] text-muted-foreground leading-snug flex-1">
                  {p.description}
                </p>
                <div className="mt-4 pt-3.5 border-t border-border flex items-center justify-between">
                  <span
                    className="text-[13px] font-semibold"
                    style={{ color: p.to ? accentText(p.color) : "var(--muted-foreground)" }}
                  >
                    {p.estado}
                  </span>
                  {p.to && (
                    <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                  )}
                </div>
              </>
            )

            return p.to ? (
              <Link key={p.title} to={p.to} className="surface-lift group flex flex-col rounded-xl surface p-5">
                {inner}
              </Link>
            ) : (
              <div key={p.title} className="flex flex-col rounded-xl surface p-5 opacity-80">
                {inner}
              </div>
            )
          })}
        </div>
      </div>
    </AppLayout>
  )
}
