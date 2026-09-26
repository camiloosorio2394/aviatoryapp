import { useEffect, useMemo, useState } from "react"
import { Check, RotateCcw } from "lucide-react"
import { useSession } from "@/hooks/useSession"
import { reportarError } from "@/lib/errores"
import { appButtonClass, appButtonStyle } from "@/lib/buttonStyles"
import { EstadoError } from "@/components/EstadoError"
import { useRachaEnBarra } from "@/components/layout/rachaEnBarra"
import { traerInicioPanel, traerTarjetasPanel } from "@/services/panel"
import type { Achievement, ActivityDay, Streak } from "@/components/dashboard/tipos"
import { ActivityHeatmap } from "@/components/dashboard/ActivityHeatmap"
import { InsigniaLogro } from "@/components/logros/InsigniaLogro"
import { PlacaIcono } from "@/components/marca/Icono"
import {
  GRUPOS_DE_HITOS,
  MODULOS_DE_LOGROS,
  NOMBRE_DEL_NIVEL,
  NOMBRE_DEL_TIPO,
  tipoDeLogro,
  type NivelDeLogro,
} from "@/lib/logros"

type Filtro = "todos" | "ganados" | "pendientes"

const FILTROS: { clave: Filtro; nombre: string }[] = [
  { clave: "todos", nombre: "Todos" },
  { clave: "ganados", nombre: "Ganados" },
  { clave: "pendientes", nombre: "Por ganar" },
]

const NIVELES: NivelDeLogro[] = ["bronze", "silver", "gold", "platinum"]

/** Los códigos que tienen grupo; el resto cae en «Otros». */
const CONOCIDOS = new Set([...GRUPOS_DE_HITOS.flatMap((g) => g.codigos), ...MODULOS_DE_LOGROS.flatMap((m) => m.codigos)])

/** «12 sep 2026», en la hora de Bogotá. */
const fecha = new Intl.DateTimeFormat("es-CO", { timeZone: "America/Bogota", day: "numeric", month: "short", year: "numeric" })

/** AAAA-MM-DD de hoy en Bogotá, que es con lo que la base cierra el día. */
function hoyEnBogota(): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "America/Bogota", year: "numeric", month: "2-digit", day: "2-digit" }).format(
    new Date(),
  )
}

/**
 * Logros y actividad: la colección de insignias y la constancia, que antes
 * vivían al fondo del panel («Tu preparación») y ahora tienen su página.
 *
 * Arriba lo que se mueve cada día (la racha y el mapa de actividad); abajo la
 * colección, por grupos y por módulo, con el recorrido lección, práctica,
 * evaluación y dominio de cada módulo en una sola fila.
 */
export function Logros() {
  const { user } = useSession()
  const [estado, setEstado] = useState<"cargando" | "listo" | "fallo">("cargando")
  const [intento, setIntento] = useState(0)
  const [logros, setLogros] = useState<Achievement[]>([])
  const [ganados, setGanados] = useState<Map<string, string | undefined>>(new Map())
  const [actividad, setActividad] = useState<ActivityDay[]>([])
  const [racha, setRacha] = useState<Streak | null>(null)
  const [usuario, setUsuario] = useState<string | null>(null)

  useEffect(() => {
    if (!user) return
    let cancelado = false
    Promise.all([traerTarjetasPanel(), traerInicioPanel()])
      .then(([tarjetas, inicio]) => {
        if (cancelado) return
        setLogros(tarjetas.logros)
        setGanados(new Map(tarjetas.desbloqueados.map((a) => [a.code, a.unlocked_at])))
        setActividad(tarjetas.actividad)
        setRacha(inicio.racha)
        setUsuario(inicio.perfil?.username ?? null)
        setEstado("listo")
      })
      .catch((err) => {
        reportarError("logros: carga", err)
        if (!cancelado) setEstado("fallo")
      })
    return () => {
      cancelado = true
    }
  }, [user, intento])

  useRachaEnBarra(estado === "listo" ? (racha?.current_streak ?? 0) : undefined)

  if (estado === "fallo") {
    return (
      <div className="@container mx-auto max-w-[1400px] px-5 py-6 pb-16 sm:px-8 sm:py-8">
        <EstadoError
          titulo="No pudimos cargar tus logros"
          mensaje="Revisa tu conexión e inténtalo de nuevo. Lo que ganaste está guardado."
          acciones={
            <button
              type="button"
              onClick={() => {
                setEstado("cargando")
                setIntento((n) => n + 1)
              }}
              className={appButtonClass({ size: "lg" })}
              style={appButtonStyle()}
            >
              <RotateCcw className="h-4 w-4" /> Intentar de nuevo
            </button>
          }
        />
      </div>
    )
  }

  return (
    <VistaLogros
      cargando={estado === "cargando"}
      logros={logros}
      ganados={ganados}
      actividad={actividad}
      racha={racha}
      usuario={usuario}
    />
  )
}

/** Lo que se ve, sin la carga: así se prueba y se revisa con datos de ejemplo. */
export function VistaLogros({
  cargando,
  logros,
  ganados,
  actividad,
  racha,
  usuario,
}: {
  cargando: boolean
  logros: Achievement[]
  /** Código del logro ganado y cuándo. */
  ganados: Map<string, string | undefined>
  actividad: ActivityDay[]
  racha: Streak | null
  usuario: string | null
}) {
  const [filtro, setFiltro] = useState<Filtro>("todos")
  const porCodigo = useMemo(() => new Map(logros.map((a) => [a.code, a])), [logros])
  const otros = logros.filter((a) => !CONOCIDOS.has(a.code)).map((a) => a.code)
  const total = logros.length
  const nGanados = logros.filter((a) => ganados.has(a.code)).length
  const pct = total ? Math.round((nGanados / total) * 100) : 0
  const visible = (code: string) =>
    filtro === "todos" || (filtro === "ganados" ? ganados.has(code) : !ganados.has(code))

  const diasActivos = actividad.filter((d) => d.activities_count > 0)
  const mes = hoyEnBogota().slice(0, 7)
  const diasDelMes = diasActivos.filter((d) => d.date.startsWith(mes)).length
  const racha0 = racha?.current_streak ?? 0
  const enRiesgo = racha0 > 0 && !!racha?.last_activity_date && racha.last_activity_date !== hoyEnBogota()

  return (
    <div className="@container mx-auto max-w-[1400px] px-5 py-6 pb-20 sm:px-8 sm:py-10">
      {/* ── Encabezado ─────────────────────────────────────────────────── */}
      <header className="flex flex-col gap-6 @4xl:flex-row @4xl:items-end @4xl:justify-between">
        <div className="min-w-0">
          <p className="versalitas m-0 text-[10.5px] text-muted-foreground">Tu colección</p>
          <h1 className="titular m-0 mt-2 text-[40px] font-semibold leading-none text-foreground sm:text-[48px]">Logros</h1>
          <p className="m-0 mt-3 max-w-[560px] text-[15px] leading-relaxed text-muted-foreground">
            Cada insignia marca algo que ya hiciste en tu preparación. La forma dice qué fue (lección, práctica, evaluación
            o el módulo entero) y el metal, cuánto costó.
          </p>
        </div>
        <ul className="m-0 flex list-none flex-wrap gap-2 p-0" aria-label="Logros por nivel">
          {NIVELES.map((nivel) => {
            const delNivel = logros.filter((a) => a.tier === nivel)
            if (!cargando && delNivel.length === 0) return null
            const suyos = delNivel.filter((a) => ganados.has(a.code)).length
            return (
              <li key={nivel} className="flex items-center gap-2.5 rounded-full surface py-1.5 pl-1.5 pr-3.5">
                <InsigniaLogro code="nivel" nivel={nivel} conseguido tamano={28} />
                <span className="text-[12.5px] text-muted-foreground">
                  <span className="font-semibold text-foreground">{NOMBRE_DEL_NIVEL[nivel]}</span>{" "}
                  <span className="tabular">
                    {suyos}/{delNivel.length}
                  </span>
                </span>
              </li>
            )
          })}
        </ul>
      </header>

      <div className="mt-6">
        <div className="flex items-baseline justify-between text-[13px]">
          <span className="text-muted-foreground">
            {cargando ? "Cargando tu colección" : (
              <>
                <span className="titular text-[22px] font-semibold text-foreground">{nGanados}</span> de {total} ganados
              </>
            )}
          </span>
          <span className="tabular font-semibold text-foreground">{pct} %</span>
        </div>
        <div
          className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted"
          role="progressbar"
          aria-label="Logros ganados"
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div className="h-full rounded-full transition-[width] duration-700" style={{ width: `${pct}%`, background: "var(--marca-acento)" }} />
        </div>
      </div>

      {/* ── Actividad ──────────────────────────────────────────────────── */}
      <section className="mt-12" aria-labelledby="logros-actividad">
        <h2 id="logros-actividad" className="titular m-0 text-[26px] font-semibold text-foreground">
          Tu actividad
        </h2>
        <div className="mt-4 grid grid-cols-1 gap-4 @4xl:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)]">
          <ActivityHeatmap
            data={actividad}
            loading={cargando}
            streakAtRisk={enRiesgo}
            longestStreak={racha?.longest_streak ?? 0}
            streakDays={racha0}
            username={usuario}
          />
          <div className="flex min-w-0 flex-col rounded-2xl surface p-5">
            <div className="flex items-center gap-3.5">
              <PlacaIcono nombre="materias" className="h-12 w-12" />
              <h3 className="titular m-0 text-[18px] font-semibold text-foreground">Constancia</h3>
            </div>
            <dl className="m-0 mt-5 grid grid-cols-2 gap-x-4 gap-y-5">
              <Cifra rotulo="Racha actual" valor={cargando ? "…" : `${racha0}`} nota={racha0 === 1 ? "día" : "días"} />
              <Cifra
                rotulo="Mejor racha"
                valor={cargando ? "…" : `${racha?.longest_streak ?? 0}`}
                nota={(racha?.longest_streak ?? 0) === 1 ? "día" : "días"}
              />
              <Cifra rotulo="Este mes" valor={cargando ? "…" : `${diasDelMes}`} nota={diasDelMes === 1 ? "día de estudio" : "días de estudio"} />
              <Cifra rotulo="12 semanas" valor={cargando ? "…" : `${diasActivos.length}`} nota={diasActivos.length === 1 ? "día activo" : "días activos"} />
            </dl>
          </div>
        </div>
      </section>

      {/* ── Colección ──────────────────────────────────────────────────── */}
      <section className="mt-14" aria-labelledby="logros-coleccion">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 id="logros-coleccion" className="titular m-0 text-[26px] font-semibold text-foreground">
            La colección
          </h2>
          <div className="flex rounded-full surface p-1" role="group" aria-label="Filtrar logros">
            {FILTROS.map((f) => (
              <button
                key={f.clave}
                type="button"
                onClick={() => setFiltro(f.clave)}
                aria-pressed={filtro === f.clave}
                className={`rounded-full px-3.5 py-1.5 text-[12.5px] font-semibold transition-colors duration-200 ${
                  filtro === f.clave ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {f.nombre}
              </button>
            ))}
          </div>
        </div>

        {cargando ? (
          <div className="mt-6 grid grid-cols-1 gap-4 @3xl:grid-cols-2 @6xl:grid-cols-3">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-[150px] animate-pulse rounded-2xl bg-muted" />
            ))}
          </div>
        ) : (
          <>
            {[...GRUPOS_DE_HITOS, ...(otros.length ? [{ clave: "otros", titulo: "Otros", bajada: "", codigos: otros }] : [])].map((g) => {
              const codigos = g.codigos.filter((c) => porCodigo.has(c) && visible(c))
              if (codigos.length === 0) return null
              return (
                <div key={g.clave} className="mt-10">
                  <h3 className="titular m-0 text-[20px] font-semibold text-foreground">{g.titulo}</h3>
                  {g.bajada && <p className="m-0 mt-1 text-[13px] text-muted-foreground">{g.bajada}</p>}
                  <ul className="m-0 mt-4 grid list-none grid-cols-1 gap-3 p-0 @xl:grid-cols-2 @5xl:grid-cols-3 @7xl:grid-cols-4">
                    {codigos.map((c) => (
                      <TarjetaLogro key={c} logro={porCodigo.get(c)!} ganadoEl={ganados.get(c)} ganado={ganados.has(c)} />
                    ))}
                  </ul>
                </div>
              )
            })}

            <div className="mt-12">
              <h3 className="titular m-0 text-[20px] font-semibold text-foreground">Ingreso a aerolínea</h3>
              <p className="m-0 mt-1 text-[13px] text-muted-foreground">
                Cada módulo tiene su recorrido: leer la lección, hacer la práctica, aprobar la evaluación y, con las tres,
                el dominio.
              </p>
              <ul className="m-0 mt-4 grid list-none grid-cols-1 gap-3 p-0 @3xl:grid-cols-2 @6xl:grid-cols-3">
                {MODULOS_DE_LOGROS.map((m) => {
                  const suyos = m.codigos.filter((c) => porCodigo.has(c))
                  if (suyos.length === 0 || !suyos.some(visible)) return null
                  const hechos = suyos.filter((c) => ganados.has(c)).length
                  return (
                    <li key={m.clave} className="min-w-0 rounded-2xl surface p-5">
                      <div className="flex items-baseline justify-between gap-3">
                        <span className="titular min-w-0 truncate text-[19px] font-semibold text-foreground">{m.titulo}</span>
                        <span
                          className="tabular shrink-0 text-[12px] font-semibold"
                          style={{ color: hechos === suyos.length ? "var(--av-success-fg)" : "var(--muted-foreground)" }}
                        >
                          {hechos} de {suyos.length}
                        </span>
                      </div>
                      <ol className="m-0 mt-4 flex list-none items-start justify-between gap-2 p-0">
                        {suyos.map((c) => {
                          const logro = porCodigo.get(c)!
                          const ganado = ganados.has(c)
                          return (
                            <li
                              key={c}
                              className="flex min-w-0 flex-1 flex-col items-center gap-2 text-center"
                              title={`${logro.name}: ${logro.description}`}
                            >
                              <InsigniaLogro code={c} nivel={logro.tier} conseguido={ganado} tamano={58} />
                              <span className={`text-[11.5px] leading-tight ${ganado ? "font-semibold text-foreground" : "text-muted-foreground"}`}>
                                {NOMBRE_DEL_TIPO[tipoDeLogro(c)]}
                              </span>
                              <span className="sr-only">
                                {logro.name}, {ganado ? "ganado" : "por ganar"}
                              </span>
                            </li>
                          )
                        })}
                      </ol>
                    </li>
                  )
                })}
              </ul>
            </div>
          </>
        )}
      </section>
    </div>
  )
}

function Cifra({ rotulo, valor, nota }: { rotulo: string; valor: string; nota: string }) {
  return (
    <div className="min-w-0">
      <dt className="text-[12px] text-muted-foreground">{rotulo}</dt>
      <dd className="m-0 mt-1 flex items-baseline gap-1.5">
        <span className="titular tabular text-[32px] font-semibold leading-none text-foreground">{valor}</span>
        <span className="truncate text-[12px] text-muted-foreground">{nota}</span>
      </dd>
    </div>
  )
}

function TarjetaLogro({ logro, ganado, ganadoEl }: { logro: Achievement; ganado: boolean; ganadoEl: string | undefined }) {
  return (
    <li className="flex min-w-0 items-center gap-4 rounded-2xl surface p-4">
      <InsigniaLogro code={logro.code} nivel={logro.tier} conseguido={ganado} tamano={64} />
      <div className="min-w-0">
        <p className={`m-0 text-[14.5px] font-semibold leading-snug ${ganado ? "text-foreground" : "text-foreground/80"}`}>{logro.name}</p>
        <p className="m-0 mt-0.5 line-clamp-2 text-[12.5px] leading-snug text-muted-foreground">{logro.description}</p>
        <p className="m-0 mt-1.5 flex items-center gap-1 text-[11.5px] font-medium">
          {ganado ? (
            <span className="inline-flex items-center gap-1" style={{ color: "var(--av-success-fg)" }}>
              <Check className="h-3.5 w-3.5" aria-hidden />
              {ganadoEl ? `Ganado el ${fecha.format(new Date(ganadoEl))}` : "Ganado"}
            </span>
          ) : (
            <span className="text-muted-foreground">{NOMBRE_DEL_NIVEL[logro.tier]} · por ganar</span>
          )}
        </p>
      </div>
    </li>
  )
}
