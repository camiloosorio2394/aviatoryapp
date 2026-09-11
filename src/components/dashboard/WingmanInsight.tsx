import { Link } from "react-router-dom"
import { Radar, Lightbulb } from "lucide-react"
import { appButtonClass } from "@/lib/buttonStyles"
import type { PilotStage } from "@/components/dashboard/tipos"
import { FIRST_ACTION } from "@/components/dashboard/plan"

export function WingmanInsight({
  stage,
  recentAttempts,
  icao,
  icaoMeasured,
}: {
  stage: PilotStage | null
  recentAttempts: number
  icao: number | null
  icaoMeasured: boolean
}) {
  const insight = (() => {
    /** Sin nivel medido Wingman no tiene con qué personalizar, así que refuerza
     *  la acción primaria en vez de abrir un tercer destino. */
    if (!icaoMeasured) {
      return {
        title: "Empieza por el test inicial",
        body: "Son unos 15 minutos. Con tu nivel medido puedo decirte qué materia atacar primero y qué tan lejos estás de aerolínea.",
        cta: FIRST_ACTION.cta,
        href: FIRST_ACTION.href,
      }
    }
    if (recentAttempts === 0) {
      return {
        title: "Empieza con Meteorología",
        body: "Es la materia más densa y la que más cae en el examen Aerocivil. Si la dominas primero, el resto fluye.",
        cta: "Comenzar Meteo",
        href: "/app/pca/quiz/meteorologia",
      }
    }
    if (icao && icao < 4) {
      return {
        title: "Sube tu inglés ICAO a 4",
        body: "Tienes todo lo técnico pero el inglés te está frenando. Esta semana enfoca 30 min/día en ICAO English.",
        cta: "Practicar inglés",
        href: "/app/pca",
      }
    }
    if (stage === "hour_building" || stage === "airline_candidate") {
      return {
        title: "Tu CV está rezagado",
        body: "Tienes horas y exámenes, pero faltan los detalles. Pasa 20 min puliendo tu hoja de vida.",
        cta: "Ver requisitos",
        href: "/app/match",
      }
    }
    return {
      title: "Diversifica las materias",
      body: "Llevas varios quizzes de la misma materia. Prueba otra: tu cerebro consolida mejor con variedad.",
      cta: "Ver materias",
      href: "/app/pca",
    }
  })()

  return (
    <div className="relative overflow-hidden rounded-xl surface p-5">
      <div className="relative">
        <div className="inline-flex items-center gap-2 text-[13px] text-muted-foreground">
          <Radar className="h-3 w-3" /> Insight de Wingman
        </div>
        <h3 className="mt-3 text-[17px] font-semibold tracking-[-0.02em] text-foreground">{insight.title}</h3>
        <p className="mt-2 text-[15px] text-muted-foreground leading-relaxed">{insight.body}</p>
        <Link
          to={insight.href}
          className={appButtonClass({ variant: "secondary" }, "mt-4")}
        >
          <Lightbulb className="h-3 w-3" /> {insight.cta}
        </Link>
      </div>
    </div>
  )
}
