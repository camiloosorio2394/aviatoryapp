import { useState } from "react"
import { Link } from "react-router-dom"
import { AlertTriangle, ArrowRight, Check, Share2 } from "lucide-react"
import { toast } from "sonner"
import { Llama } from "@/components/racha/Llama"
import { NOMBRE_DEL_NIVEL as NOMBRE_DE_LA_LLAMA, nivelDeRacha } from "@/components/racha/nivelDeRacha"
import { InsigniaLogro } from "@/components/logros/InsigniaLogro"
import { useAlMontar } from "@/components/logros/useAlMontar"
import type { Achievement, ActivityDay } from "@/components/dashboard/tipos"
import { shareStreak } from "@/lib/shareStreak"
import { appButtonClass } from "@/lib/buttonStyles"
import { XP_DE_NIVEL, estiloDeMetal, semanaEnCurso, type Mision } from "@/lib/logros"

/**
 * La racha: la llama grande (la misma de la barra, con sus niveles), los
 * días de esta semana y, si hoy todavía no estudió, el aviso para salvarla.
 */
export function TarjetaRacha({
  cargando,
  dias,
  mejor,
  actividad,
  hoy,
  enRiesgo,
  usuario,
  hrefDiario,
}: {
  cargando: boolean
  dias: number
  mejor: number
  actividad: ActivityDay[]
  /** AAAA-MM-DD de hoy en Bogotá. */
  hoy: string
  enRiesgo: boolean
  usuario: string | null
  hrefDiario: string
}) {
  const [compartiendo, setCompartiendo] = useState(false)
  const nivel = nivelDeRacha(cargando ? 0 : dias)
  const semana = semanaEnCurso(actividad, hoy)
  const activos = actividad.filter((d) => d.activities_count > 0)
  const delMes = activos.filter((d) => d.date.startsWith(hoy.slice(0, 7))).length

  async function compartir() {
    setCompartiendo(true)
    try {
      const via = await shareStreak(dias, usuario)
      if (via === "download") toast.success("Imagen descargada: súbela a tu historia o compártela donde quieras")
    } catch {
      toast.error("No pudimos generar la imagen")
    } finally {
      setCompartiendo(false)
    }
  }

  return (
    <section className="flex min-w-0 flex-col rounded-3xl surface p-5 sm:p-6" aria-labelledby="logros-racha">
      <div className="flex items-center justify-between gap-3">
        <h2 id="logros-racha" className="logros-rotulo m-0 text-[11px] text-muted-foreground">
          Racha
        </h2>
        {!cargando && dias > 0 && (
          <button
            type="button"
            onClick={() => void compartir()}
            disabled={compartiendo}
            className="inline-flex h-8 items-center gap-1.5 rounded-full border border-border bg-background px-3 text-[12px] font-semibold text-foreground transition-colors hover:bg-muted disabled:opacity-60"
          >
            <Share2 className="h-3.5 w-3.5" aria-hidden />
            {compartiendo ? "Generando" : "Compartir"}
          </button>
        )}
      </div>

      <div className="mt-4 flex items-center gap-4">
        <div className="logros-racha grid h-[88px] w-[88px] shrink-0 place-items-center rounded-[26px]" data-nivel={nivel}>
          <Llama className="racha-llama" />
        </div>
        <div className="min-w-0">
          <p className="logros-display m-0 text-[46px] font-extrabold leading-none text-foreground">
            {cargando ? "…" : dias}
            <span className="ml-2 text-[16px] font-semibold text-muted-foreground">{dias === 1 ? "día" : "días"}</span>
          </p>
          <p className="m-0 mt-2 text-[13px] text-muted-foreground">
            {cargando ? "Cargando tu racha" : dias > 0 ? NOMBRE_DE_LA_LLAMA[nivel] : "Estudia hoy y se enciende"}
          </p>
        </div>
      </div>

      <ol className="m-0 mt-6 grid list-none grid-cols-7 gap-1.5 p-0" aria-label="Esta semana">
        {semana.map((d) => (
          <li key={d.dia} className="flex min-w-0 flex-col items-center gap-1.5">
            <span
              data-activo={d.activo}
              className={`logros-dia grid h-10 w-full max-w-[44px] place-items-center rounded-xl ${
                d.activo ? "" : "bg-muted text-muted-foreground"
              } ${d.esHoy && !d.activo ? "ring-2 ring-inset ring-[color:var(--marca-acento)]/50" : ""} ${d.futuro ? "opacity-45" : ""}`}
            >
              {d.activo ? <Check className="h-4 w-4" strokeWidth={2.4} aria-hidden /> : null}
            </span>
            <span className={`text-[11px] ${d.esHoy ? "font-bold text-foreground" : "text-muted-foreground"}`}>{d.letra}</span>
            <span className="sr-only">
              {d.esHoy ? "hoy, " : ""}
              {d.activo ? "estudiaste" : d.futuro ? "todavía no llega" : "sin estudio"}
            </span>
          </li>
        ))}
      </ol>

      <dl className="m-0 mt-5 grid grid-cols-3 gap-3 border-t border-border pt-4">
        <Cifra rotulo="Mejor racha" valor={cargando ? "…" : `${mejor}`} nota={mejor === 1 ? "día" : "días"} />
        <Cifra rotulo="Este mes" valor={cargando ? "…" : `${delMes}`} nota={delMes === 1 ? "día" : "días"} />
        <Cifra rotulo="12 semanas" valor={cargando ? "…" : `${activos.length}`} nota={activos.length === 1 ? "día" : "días"} />
      </dl>

      {/* Ámbar porque es un aviso de verdad: si no estudia hoy, la pierde. */}
      {enRiesgo && (
        <div
          className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl p-3.5"
          style={{ background: "color-mix(in oklab, var(--av-warn-fg) 9%, transparent)" }}
        >
          <div className="min-w-0">
            <p className="m-0 inline-flex items-center gap-2 text-[13.5px] font-semibold" style={{ color: "var(--av-warn-fg)" }}>
              <AlertTriangle className="h-4 w-4" aria-hidden /> Tu racha está en riesgo
            </p>
            <p className="m-0 mt-0.5 text-[12.5px] text-muted-foreground">Si no estudias hoy se reinicia. Con una pregunta la salvas.</p>
          </div>
          <Link to={hrefDiario} className={appButtonClass({ variant: "secondary" })}>
            Salvarla <ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
        </div>
      )}
    </section>
  )
}

function Cifra({ rotulo, valor, nota }: { rotulo: string; valor: string; nota: string }) {
  return (
    <div className="min-w-0">
      <dt className="truncate text-[11.5px] text-muted-foreground">{rotulo}</dt>
      <dd className="m-0 mt-1 flex items-baseline gap-1">
        <span className="logros-display text-[24px] font-bold leading-none text-foreground">{valor}</span>
        <span className="truncate text-[11.5px] text-muted-foreground">{nota}</span>
      </dd>
    </div>
  )
}

/**
 * Las misiones: los trofeos que tiene más cerca, con lo que lleva, lo que
 * vale y el enlace a donde se ganan.
 */
export function Misiones({
  cargando,
  misiones,
  porCodigo,
}: {
  cargando: boolean
  misiones: Mision[]
  porCodigo: Map<string, Achievement>
}) {
  const montado = useAlMontar()
  return (
    <section className="flex min-w-0 flex-col rounded-3xl surface p-5 sm:p-6" aria-labelledby="logros-misiones">
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
        <h2 id="logros-misiones" className="logros-rotulo m-0 text-[11px] text-muted-foreground">
          Próximas misiones
        </h2>
        <span className="text-[12px] text-muted-foreground">Lo que tienes más cerca</span>
      </div>

      {cargando ? (
        <div className="mt-4 flex flex-col gap-2.5">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-[84px] animate-pulse rounded-2xl bg-muted" />
          ))}
        </div>
      ) : misiones.length === 0 ? (
        <p className="m-0 mt-4 text-[13.5px] text-muted-foreground">Ganaste todo lo que se puede medir. Lo que queda está en la vitrina.</p>
      ) : (
        <ol className="m-0 mt-4 flex list-none flex-col gap-2.5 p-0">
          {misiones.map((m) => {
            const logro = porCodigo.get(m.code)
            if (!logro) return null
            const pct = m.meta ? Math.round((m.actual / m.meta) * 100) : 0
            return (
              <li key={m.code} data-metal style={estiloDeMetal(logro.tier)}>
                <Link
                  to={m.href}
                  className="group flex items-center gap-4 rounded-2xl border border-border p-3 pr-3.5 transition-colors duration-200 hover:border-[color:var(--metal-cuerpo)] hover:bg-muted/40"
                >
                  <span className="logros-pedestal shrink-0">
                    <InsigniaLogro code={logro.code} nivel={logro.tier} conseguido={false} tamano={56} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
                      <span className="truncate text-[14.5px] font-semibold text-foreground">{logro.name}</span>
                      <span className="logros-pastilla logros-rotulo rounded-full px-2 py-0.5 text-[9.5px]">+{XP_DE_NIVEL[logro.tier]} XP</span>
                    </span>
                    <span className="mt-0.5 block truncate text-[12.5px] text-muted-foreground">{m.detalle}</span>
                    <span
                      className="mt-2 block h-1.5 overflow-hidden rounded-full bg-muted"
                      role="progressbar"
                      aria-label={`Avance de ${logro.name}`}
                      aria-valuenow={m.actual}
                      aria-valuemin={0}
                      aria-valuemax={m.meta}
                    >
                      <span
                        className="logros-llenado block h-full rounded-full"
                        style={{
                          width: `${montado ? pct : 0}%`,
                          background: "linear-gradient(90deg, var(--marca-acento), #8fb6e3)",
                        }}
                      />
                    </span>
                  </span>
                  <span
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-muted text-foreground transition-transform duration-200 group-hover:translate-x-0.5"
                    aria-hidden
                  >
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              </li>
            )
          })}
        </ol>
      )}
    </section>
  )
}
