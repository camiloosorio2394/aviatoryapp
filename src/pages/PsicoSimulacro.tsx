import { useEffect, useState, type ReactNode } from "react"
import { Link } from "react-router-dom"
import { ArrowLeft, Play, RotateCcw, Timer } from "lucide-react"
import { PageHeader } from "@/components/ui/page-header"
import { EstadoError } from "@/components/EstadoError"
import { PsicoCargando } from "@/components/psicotecnicas/EstadosPsico"
import { PsicoPlayer } from "@/components/psicotecnicas/PsicoPlayer"
import { PsicoResultado } from "@/components/psicotecnicas/PsicoResultado"
import { useSession } from "@/hooks/useSession"
import { itemsDeRepaso, useSesionPsico } from "@/hooks/useSesionPsico"
import { appButtonClass, appButtonStyle } from "@/lib/buttonStyles"
import {
  CATEGORIAS,
  NOTA_TIEMPOS,
  PSICO_HUB,
  SIMULACRO,
  SIMULACRO_TOTAL,
  TIEMPOS,
} from "@/lib/psicotecnicas"
import { leerPsicoLocal, mejorSimulacroRemoto } from "@/lib/psicotecnicasProgress"
import type { ParametrosPsico } from "@/services/psicotecnicas"

/** Umbral de aprobación que se anuncia antes de empezar. El informe usa el del servidor (module_thresholds). */
const APRUEBA_CON = 80

const SIMULACRO_PARAMETROS: ParametrosPsico = {
  modo: "simulacion",
  categoria: "todas",
  nivel: "todos",
  cantidad: SIMULACRO_TOTAL,
}

/**
 * Simulacro psicotécnico: 30 ejercicios, diez de cada familia, mezclados.
 *
 * Es el cierre del módulo y la razón para volver cuando ya entrenaste cada
 * familia por aparte. Va en modo simulación: sin respuestas ni explicaciones
 * durante la prueba, cronómetro por ejercicio y el informe solo al final.
 *
 * Cada intento lo sortea el servidor, así que repetirlo no es repasar las mismas
 * treinta preguntas, y la nota que queda guardada es la que él calcula.
 */
export function PsicoSimulacro() {
  const { user } = useSession()
  const psico = useSesionPsico()
  const { estado, errorAccion } = psico
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

  function empezar() {
    void psico.empezar(SIMULACRO_PARAMETROS)
  }

  if (estado.fase === "iniciando") {
    return (
      <Marco>
        <PsicoCargando texto="Preparando tu simulacro..." />
      </Marco>
    )
  }

  if (estado.fase === "error") {
    return (
      <Marco>
        <EstadoError
          titulo="No pudimos preparar el simulacro"
          mensaje={estado.error.message}
          acciones={
            <>
              <button type="button" onClick={empezar} className={appButtonClass({ size: "lg" })} style={appButtonStyle()}>
                <RotateCcw className="h-4 w-4" /> Intentar de nuevo
              </button>
              <Link to={PSICO_HUB} className={appButtonClass({ variant: "secondary", size: "lg" })}>
                Volver al módulo
              </Link>
            </>
          }
        />
      </Marco>
    )
  }

  if (estado.fase === "en_curso") {
    return (
      <Marco>
        <PsicoPlayer
          key={estado.sesion.id}
          sesion={estado.sesion}
          onCorregir={psico.corregir}
          onRegistrar={psico.registrar}
          onAplazar={psico.aplazar}
          onTerminar={() => void psico.terminar()}
          errorAccion={errorAccion}
        />
      </Marco>
    )
  }

  if (estado.fase === "terminando") {
    return (
      <Marco>
        {errorAccion ? (
          <EstadoError
            titulo="No pudimos cerrar el simulacro"
            mensaje={errorAccion.message}
            acciones={
              <>
                <button type="button" onClick={() => void psico.terminar()} className={appButtonClass({ size: "lg" })} style={appButtonStyle()}>
                  <RotateCcw className="h-4 w-4" /> Intentar de nuevo
                </button>
                <button type="button" onClick={psico.volverAConfigurar} className={appButtonClass({ variant: "secondary", size: "lg" })}>
                  Volver al inicio del simulacro
                </button>
              </>
            }
          />
        ) : (
          <PsicoCargando texto="Calculando tu resultado..." />
        )}
      </Marco>
    )
  }

  if (estado.fase === "terminada") {
    const { resultado, servidor } = estado
    const umbral = servidor.aprobacion ?? APRUEBA_CON
    const aprobado = resultado.global >= umbral
    return (
      <Marco>
        <div className="max-w-[900px] mx-auto mb-4">
          <div
            className="rounded-xl p-4 text-[15px] font-medium"
            style={{
              background: aprobado
                ? "color-mix(in oklab, var(--av-green-400) 10%, transparent)"
                : "color-mix(in oklab, var(--av-amber-400) 10%, transparent)",
              border: `1px solid color-mix(in oklab, ${
                aprobado ? "var(--av-green-400)" : "var(--av-amber-400)"
              } 28%, transparent)`,
            }}
          >
            {aprobado
              ? `Simulacro aprobado con ${resultado.global} sobre 100.`
              : `Simulacro no aprobado: ${resultado.global} sobre 100, y se aprueba con ${umbral}.`}
          </div>
        </div>
        <PsicoResultado
          resultado={resultado}
          conPuntajeGlobal
          repaso={itemsDeRepaso(estado.sesion, servidor)}
          onRepetir={empezar}
        />
      </Marco>
    )
  }

  return (
    <>
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
    </>
  )
}

function Marco({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="px-4 sm:px-7 py-6 sm:py-8 pb-16">{children}</div>
    </>
  )
}
