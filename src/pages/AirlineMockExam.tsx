import { useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { ArrowLeft, ClipboardCheck, Play, ShieldAlert, Timer } from "lucide-react"
import { AppLayout } from "@/components/layout/AppLayout"
import { PageHeader } from "@/components/ui/page-header"
import { SectionTitle } from "@/components/ui/section-title"
import { QuizEngine } from "@/components/QuizEngine"
import type { QuizQuestion, QuizResultado } from "@/components/QuizEngine"
import { appButtonClass, appButtonStyle } from "@/lib/buttonStyles"
import { registrarActividadDeEstudio } from "@/lib/activity"
import {
  AIRLINE_MOCK_PASS_SCORE,
  guardarIntentoSimulacro,
  readAirlineMockLocal,
} from "@/lib/airlineMock"
import { EXAM_QUESTIONS, accentText, shuffle } from "@/lib/notam"
import { METAR_EXAM_QUESTIONS } from "@/lib/metar"

/**
 * Simulacro de entrevista técnica (ruta /app/aerolinea/simulacro).
 *
 * El módulo no tenía cierre. El TEA sí: su simulacro reúne las tres partes y
 * es lo que da una razón para volver cuando ya leíste todo. Este es el
 * equivalente para Ingreso a aerolínea.
 *
 * Mezcla los bancos de los temas ABIERTOS, sin repartos fijos por tema: si
 * mañana entra Performance, sus preguntas entran solas al sorteo. Cada
 * pregunta se etiqueta con su tema, y el informe final dice por tema cómo
 * fuiste, que es lo que de verdad orienta el repaso.
 *
 * El mínimo es más alto que el de una evaluación de tema (85 contra 80): en una
 * prueba técnica de aerolínea no se aprueba raspando.
 *
 * Cada intento se guarda (respaldo local y user_airline_mock_attempts): sin eso
 * el simulacro era la única pieza del módulo que olvidaba todo al salir de la
 * pantalla, y la que da la razón para volver es justo esta.
 */

const PASS_SCORE = AIRLINE_MOCK_PASS_SCORE
const TOTAL_PREGUNTAS = 25

/** Bancos de los temas abiertos. Añadir un tema es añadir una línea aquí. */
const BANCOS: { tema: string; ruta: string; preguntas: QuizQuestion[] }[] = [
  {
    tema: "NOTAM",
    ruta: "/app/aerolinea/notam",
    preguntas: EXAM_QUESTIONS.map((q) => ({
      id: `notam-${q.id}`,
      pregunta: q.pregunta,
      opciones: q.opciones,
      correcta: q.correcta,
      explicacion: q.explicacion,
      referencia: q.referencia,
      origen: "NOTAM",
    })),
  },
  {
    tema: "Meteorología",
    ruta: "/app/aerolinea/meteorologia",
    preguntas: METAR_EXAM_QUESTIONS.map((q) => ({
      id: `metar-${q.id}`,
      pregunta: q.pregunta,
      opciones: q.opciones,
      correcta: q.correcta,
      explicacion: q.explicacion,
      referencia: q.referencia,
      origen: "Meteorología",
    })),
  },
]

const BANCO_COMPLETO: QuizQuestion[] = BANCOS.flatMap((b) => b.preguntas)

export function AirlineMockExam() {
  const [empezado, setEmpezado] = useState(false)
  const [semilla, setSemilla] = useState(0)
  // El mejor puntaje previo se lee del respaldo local al montar: es lo que
  // convierte la pantalla de arranque en un marcador que hay que superar.
  const [mejorPrevio] = useState(() => readAirlineMockLocal().bestScore)

  // Se sortea del banco entero, no por cupos: así el simulacro representa el
  // peso real de cada tema en el material que hay cargado.
  const preguntas = useMemo(
    () => shuffle(BANCO_COMPLETO, semilla || undefined).slice(0, TOTAL_PREGUNTAS),
    [semilla]
  )

  function guardar(r: QuizResultado): void {
    void guardarIntentoSimulacro({ score: r.score, correct: r.aciertos, total: r.total })
    void registrarActividadDeEstudio({ questions: r.total, correct: r.aciertos })
  }

  return (
    <AppLayout>
      <div className="px-4 sm:px-7 py-6 sm:py-8 pb-12 max-w-[1280px] mx-auto">
        <Link
          to="/app/aerolinea"
          className="inline-flex items-center gap-1.5 text-[13px] text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Volver a Ingreso a aerolínea
        </Link>

        <PageHeader
          eyebrow={
            <>
              <ClipboardCheck className="h-3.5 w-3.5" /> Ingreso a aerolínea · Simulacro
            </>
          }
          title="Simulacro de entrevista técnica"
          subtitle={`${TOTAL_PREGUNTAS} preguntas mezcladas de todos los temas abiertos, como en una prueba técnica real: no te avisan de qué va cada una. Apruebas con ${PASS_SCORE} sobre 100.`}
        />

        {!empezado ? (
          <>
            <section className="rounded-xl surface p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center gap-5">
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
                  style={{
                    background: "color-mix(in oklab, var(--av-blue-500) 14%, transparent)",
                    color: accentText("var(--av-blue-500)", 75),
                  }}
                >
                  <Timer className="h-6 w-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-[17px] font-semibold tracking-[-0.01em]">
                    {mejorPrevio === null ? "Antes de empezar" : "Tu marca a superar"}
                  </h2>
                  <p className="mt-1 text-[13px] text-muted-foreground leading-relaxed max-w-[640px]">
                    {mejorPrevio !== null && (
                      <>
                        Tu mejor puntaje es{" "}
                        <span className="tabular font-semibold text-foreground">
                          {mejorPrevio}
                        </span>{" "}
                        sobre 100
                        {mejorPrevio >= PASS_SCORE ? ", aprobado. " : `, y apruebas con ${PASS_SCORE}. `}
                      </>
                    )}
                    Las preguntas salen del banco de los temas que ya estudiaste y vienen
                    revueltas, sin decirte de cuál es cada una. Responde de corrido, como en la
                    prueba: al final tienes el resultado por tema y la revisión completa.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setSemilla(Math.floor(Math.random() * 2 ** 31) || 1)
                    setEmpezado(true)
                  }}
                  className={appButtonClass({ size: "lg" }, "shrink-0")}
                  style={appButtonStyle()}
                >
                  <Play className="h-4 w-4" />{" "}
                  {mejorPrevio === null ? "Empezar el simulacro" : "Volver a presentarlo"}
                </button>
              </div>
            </section>

            <section className="mt-6">
              <SectionTitle
                eyebrow="De dónde salen"
                title="Los temas que entran hoy"
                hint="Cada tema que se abra entra solo al sorteo, sin tocar esta pantalla."
              />
              <div className="grid gap-3 sm:grid-cols-2">
                {BANCOS.map((b) => (
                  <Link key={b.tema} to={b.ruta} className="surface-lift rounded-xl surface p-5">
                    <div className="text-[15px] font-semibold">{b.tema}</div>
                    <div className="mt-0.5 text-[13px] text-muted-foreground">
                      {b.preguntas.length} preguntas en el banco
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            <div
              className="mt-6 rounded-lg border-l-[3px] border-y border-r p-4 flex items-start gap-3"
              style={{
                borderColor: "color-mix(in oklab, var(--av-amber-400) 26%, transparent)",
                borderLeftColor: "color-mix(in oklab, var(--av-amber-400) 55%, transparent)",
                background: "color-mix(in oklab, var(--av-amber-400) 7%, transparent)",
              }}
            >
              <ShieldAlert
                className="shrink-0 mt-0.5 h-4 w-4"
                style={{ color: accentText("var(--av-amber-400)", 75) }}
                aria-hidden
              />
              <p className="m-0 text-[13px] leading-relaxed text-foreground/85">
                Preguntas de práctica redactadas para Aviatory. No son preguntas oficiales de
                ninguna aerolínea ni reproducen ningún proceso de selección real.
              </p>
            </div>
          </>
        ) : (
          <QuizEngine
            key={semilla}
            questions={preguntas}
            passScore={PASS_SCORE}
            backTo="/app/aerolinea"
            backLabel="Volver al módulo"
            onFinish={guardar}
            footer={() => <PorTema preguntas={preguntas} />}
          />
        )}
      </div>
    </AppLayout>
  )
}

/**
 * Qué temas entraron en ESTE intento y adónde ir a repasar.
 *
 * El desglose de aciertos por tema exigiría que el motor devolviera la
 * respuesta de cada pregunta, y eso ata el motor al informe. La revisión de
 * abajo ya dice cuáles fallaste y de qué tema es cada una, así que aquí basta
 * con dejar el camino de vuelta a cada tema.
 */
function PorTema({ preguntas }: { preguntas: QuizQuestion[] }) {
  const conteo = new Map<string, number>()
  for (const q of preguntas) {
    const t = q.origen ?? "Otros"
    conteo.set(t, (conteo.get(t) ?? 0) + 1)
  }

  return (
    <section className="mt-6 rounded-xl surface p-6">
      <div className="text-[15px] font-semibold">Adónde volver</div>
      <p className="mt-1 text-[13px] text-muted-foreground leading-relaxed max-w-[680px]">
        Este intento trajo{" "}
        {[...conteo.entries()].map(([t, n], i, arr) => (
          <span key={t}>
            <span className="font-medium text-foreground">
              {n} de {t}
            </span>
            {i < arr.length - 2 ? ", " : i === arr.length - 2 ? " y " : ""}
          </span>
        ))}
        . Mira la revisión de abajo: cada pregunta dice de qué tema es y qué sección la explica.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {BANCOS.map((b) => (
          <Link key={b.tema} to={b.ruta} className={appButtonClass({ variant: "secondary" })}>
            Repasar {b.tema}
          </Link>
        ))}
      </div>
    </section>
  )
}
