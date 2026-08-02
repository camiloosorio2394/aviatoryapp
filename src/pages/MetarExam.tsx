import { Link } from "react-router-dom"
import { ArrowLeft, ClipboardCheck, ShieldAlert } from "lucide-react"
import { AppLayout } from "@/components/layout/AppLayout"
import { PageHeader } from "@/components/ui/page-header"
import { QuizEngine } from "@/components/QuizEngine"
import type { QuizQuestion, QuizResultado } from "@/components/QuizEngine"
import { appButtonClass } from "@/lib/buttonStyles"
import { supabase } from "@/integrations/supabase/client"
import { registrarActividadDeEstudio } from "@/lib/activity"
import { accentText } from "@/lib/notam"
import {
  METAR_DISCLAIMERS,
  METAR_EXAM_PASS_SCORE,
  METAR_EXAM_QUESTIONS,
  readMetarProgress,
  writeMetarProgress,
} from "@/lib/metar"

/**
 * Evaluación del tema METAR (ruta /app/aerolinea/meteorologia/evaluacion).
 *
 * Cierra el tema: hasta ahora el piloto leía y decodificaba, pero nunca
 * comprobaba si había aprendido, así que el tema no podía marcarse como
 * completo. Misma mecánica y mismo mínimo que la evaluación de NOTAM.
 *
 * El intento se guarda en los dos sitios: el respaldo local siempre (la
 * evaluación funciona sin sesión y sin red) y user_metar_exam_attempts cuando
 * hay sesión, que es lo que lo hace viajar entre dispositivos y lo que dispara
 * la revisión del logro metar_master en la base.
 */
/**
 * Guarda el intento en la base. Sin sesión no hay dónde: lo local ya quedó y es
 * el caso esperado de quien estudia sin cuenta.
 */
async function persistirIntento(r: QuizResultado): Promise<void> {
  try {
    const { data } = await supabase.auth.getUser()
    const userId = data.user?.id
    if (!userId) return
    const { error } = await supabase.from("user_metar_exam_attempts").insert({
      user_id: userId,
      score: r.score,
      correct: r.aciertos,
      total: r.total,
    })
    if (error) console.warn("metar exam save", error.message)
  } catch (err) {
    console.warn("metar exam save", err)
  }
}

export function MetarExam() {
  const preguntas: QuizQuestion[] = METAR_EXAM_QUESTIONS.map((q) => ({
    id: q.id,
    pregunta: q.pregunta,
    opciones: q.opciones,
    correcta: q.correcta,
    explicacion: q.explicacion,
    referencia: q.referencia,
  }))

  function guardar(r: QuizResultado): void {
    // El respaldo local primero: se guarda siempre, aunque la red falle.
    const previo = readMetarProgress().bestExamScore
    if (previo === null || r.score > previo) {
      writeMetarProgress({ bestExamScore: r.score })
    }
    void persistirIntento(r)
    // La evaluación cuenta como día estudiado, con sus preguntas y aciertos.
    void registrarActividadDeEstudio({ questions: r.total, correct: r.aciertos })
  }

  return (
    <AppLayout>
      <div className="px-4 sm:px-7 py-6 sm:py-8 pb-12 max-w-[1280px] mx-auto">
        <Link
          to="/app/aerolinea/meteorologia"
          className="inline-flex items-center gap-1.5 text-[13px] text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Volver a Meteorología
        </Link>

        <PageHeader
          eyebrow={
            <>
              <ClipboardCheck className="h-3.5 w-3.5" /> Meteorología · Evaluación
            </>
          }
          title="Evaluación de METAR"
          subtitle={`${METAR_EXAM_QUESTIONS.length} preguntas de opción múltiple, barajadas. Cada una trae su explicación y su referencia. Apruebas con ${METAR_EXAM_PASS_SCORE} sobre 100.`}
        />

        <div
          className="mb-5 rounded-lg border-l-[3px] border-y border-r p-4 flex items-start gap-3"
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
            {METAR_DISCLAIMERS.exam}
          </p>
        </div>

        <QuizEngine
          questions={preguntas}
          passScore={METAR_EXAM_PASS_SCORE}
          backTo="/app/aerolinea/meteorologia"
          backLabel="Volver al tema"
          onFinish={guardar}
          footer={(r) =>
            r.aprobado ? null : (
              <section className="mt-6 rounded-xl surface p-6">
                <div className="text-[15px] font-semibold">Antes de volver a intentarlo</div>
                <p className="mt-1 text-[13px] text-muted-foreground leading-relaxed max-w-[680px]">
                  Mira la revisión de abajo y vuelve a las secciones que fallaste. La práctica del
                  tema te deja interpretar informes enteros con respuesta modelo, que es lo que más
                  rápido cierra los huecos.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Link
                    to="/app/aerolinea/meteorologia/practica"
                    className={appButtonClass({ variant: "secondary" })}
                  >
                    Ir a la práctica
                  </Link>
                  <Link
                    to="/app/aerolinea/meteorologia/aprende"
                    className={appButtonClass({ variant: "secondary" })}
                  >
                    Releer la lección
                  </Link>
                </div>
              </section>
            )
          }
        />
      </div>
    </AppLayout>
  )
}
