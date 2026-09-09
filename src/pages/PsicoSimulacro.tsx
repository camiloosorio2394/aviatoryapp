import { useCallback, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { ArrowLeft, Play, Timer } from "lucide-react"
import { AppLayout } from "@/components/layout/AppLayout"
import { PageHeader } from "@/components/ui/page-header"
import { PsicoPlayer } from "@/components/psicotecnicas/PsicoPlayer"
import { PsicoResultado } from "@/components/psicotecnicas/PsicoResultado"
import { appButtonClass, appButtonStyle } from "@/lib/buttonStyles"
import { useSession } from "@/hooks/useSession"
import {
  CATEGORIAS,
  NOTA_TIEMPOS,
  PSICO_HUB,
  SIMULACRO,
  SIMULACRO_TOTAL,
  TIEMPOS,
  type EjercicioPsico,
  type RespuestaPsico,
  type ResultadoPsico,
  armarSimulacro,
  calcularResultado,
} from "@/lib/psicotecnicas"
import { BANCO } from "@/data/psicotecnicas"
import { guardarSesion, leerPsicoLocal, mejorSimulacroRemoto } from "@/lib/psicotecnicasProgress"

/** Umbral de aprobación del simulacro. Espejo de module_thresholds. */
const APRUEBA_CON = 80

/**
 * Simulacro psicotécnico: 30 ejercicios, diez de cada familia, mezclados.
 *
 * Es el cierre del módulo y la razón para volver cuando ya entrenaste cada
 * familia por aparte. Va en modo simulación: sin respuestas ni explicaciones
 * durante la prueba, cronómetro por ejercicio y el informe solo al final.
 *
 * Cada intento sortea ejercicios distintos, así que repetirlo no es repasar las
 * mismas treinta preguntas.
 */
export function PsicoSimulacro() {
  const { user } = useSession()
  const [tanda, setTanda] = useState<EjercicioPsico[] | null>(null)
  const [resultado, setResultado] = useState<ResultadoPsico | null>(null)
  // Se guardan también las respuestas: son las que dejan repasar los
  // fallados en el informe, con su figura y su explicación.
  const [respuestas, setRespuestas] = useState<RespuestaPsico[] | null>(null)
  const [mejor, setMejor] = useState<number | null>(() => leerPsicoLocal().mejorSimulacro)

  // Con sesión, la base manda: el respaldo local solo sabe de este dispositivo.
  useEffect(() => {
    if (!user) return
    let cancelado = false
    void (async () => {
      const remoto = await mejorSimulacroRemoto(user.id)
      if (cancelado || remoto === null) return
      setMejor((local) => Math.max(local ?? 0, remoto))
    })()
    return () => {
      cancelado = true
    }
  }, [user])

  const empezar = useCallback(() => {
    setResultado(null)
    setRespuestas(null)
    setTanda(armarSimulacro(BANCO))
  }, [])

  const terminar = useCallback((respuestas: RespuestaPsico[]) => {
    const r = calcularResultado(respuestas)
    setRespuestas(respuestas)
    setResultado(r)
    setTanda(null)
    setMejor((previo) => Math.max(previo ?? 0, r.global))
    void guardarSesion({
      modo: "simulacion",
      nivel: "todos",
      categoria: "todas",
      resultado: r,
    })
  }, [])

  if (tanda) {
    return (
      <AppLayout>
        <div className="px-4 sm:px-7 py-6 sm:py-8 pb-16">
          <PsicoPlayer
            ejercicios={tanda}
            modo="simulacion"
            nivel="todos"
            onTerminar={terminar}
          />
        </div>
      </AppLayout>
    )
  }

  if (resultado) {
    return (
      <AppLayout>
        <div className="px-4 sm:px-7 py-6 sm:py-8 pb-16">
          <div className="max-w-[900px] mx-auto mb-4">
            <div
              className="rounded-xl p-4 text-[15px] font-medium"
              style={{
                background:
                  resultado.global >= APRUEBA_CON
                    ? "color-mix(in oklab, var(--av-green-400) 10%, transparent)"
                    : "color-mix(in oklab, var(--av-amber-400) 10%, transparent)",
                border: `1px solid color-mix(in oklab, ${
                  resultado.global >= APRUEBA_CON ? "var(--av-green-400)" : "var(--av-amber-400)"
                } 28%, transparent)`,
              }}
            >
              {resultado.global >= APRUEBA_CON
                ? `Simulacro aprobado con ${resultado.global} sobre 100.`
                : `Simulacro no aprobado: ${resultado.global} sobre 100, y se aprueba con ${APRUEBA_CON}.`}
            </div>
          </div>
          <PsicoResultado
            resultado={resultado} conPuntajeGlobal
            ejercicios={tanda ?? undefined}
            respuestas={respuestas ?? undefined}
            onRepetir={empezar}
          />
        </div>
      </AppLayout>
    )
  }

  return (
    <AppLayout>
      <div className="px-4 sm:px-7 py-6 sm:py-8 pb-16 max-w-[820px] mx-auto">
        <Link
          to={PSICO_HUB}
          className="inline-flex items-center gap-1.5 text-[13px] text-muted-foreground hover:text-foreground mb-4"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Pruebas psicotécnicas
        </Link>

        <PageHeader
          eyebrow={
            <>
              <Timer className="h-3.5 w-3.5" /> Simulación
            </>
          }
          title="Simulacro psicotécnico"
          subtitle="Las tres familias mezcladas, sin decirte de cuál es cada ejercicio. Como en un proceso de selección real."
        />

        <div className="rounded-2xl surface p-6">
          <div className="grid gap-3 sm:grid-cols-3">
            {(["abstracto", "espacial", "numerico"] as const).map((c) => (
              <div key={c} className="rounded-xl border border-border p-4">
                <div className="text-[22px] font-semibold tabular-nums leading-none">
                  {SIMULACRO[c]}
                </div>
                <div className="mt-1.5 text-[13px] text-muted-foreground">
                  {CATEGORIAS[c].nombre}
                </div>
              </div>
            ))}
          </div>

          <ul className="mt-6 space-y-2 text-[15px] text-foreground/90">
            <li>
              <strong className="font-semibold">{SIMULACRO_TOTAL} ejercicios</strong> barajados
              entre sí, distintos en cada intento.
            </li>
            <li>
              Cronómetro por ejercicio: {TIEMPOS.simulacion.abstracto} s en abstracto y espacial,{" "}
              {TIEMPOS.simulacion.numerico} s en numérico. Al agotarse pasa solo y cuenta como no
              respondido.
            </li>
            <li>Sin respuestas ni explicaciones durante la prueba: el informe llega al final.</li>
            <li>
              Se aprueba con <strong className="font-semibold">{APRUEBA_CON} sobre 100</strong> de
              resultado global, que pesa un 70% la precisión y un 30% la velocidad.
            </li>
          </ul>

          <div className="mt-6 pt-5 border-t border-border">
            <p className="text-[13px] text-muted-foreground">
              {mejor === null
                ? "Sin presentar todavía."
                : mejor >= APRUEBA_CON
                  ? `Tu mejor resultado: ${mejor} sobre 100 · aprobado.`
                  : `Tu mejor resultado: ${mejor} sobre 100 · apruebas con ${APRUEBA_CON}.`}
            </p>
            <button
              type="button"
              onClick={empezar}
              className={appButtonClass({ size: "lg" }, "mt-4")}
              style={appButtonStyle()}
            >
              <Play className="h-4 w-4" />
              {mejor === null ? "Presentar el simulacro" : "Volver a presentarlo"}
            </button>
          </div>
        </div>

        <p className="mt-5 text-[13px] text-muted-foreground leading-relaxed">{NOTA_TIEMPOS}</p>
      </div>
    </AppLayout>
  )
}
