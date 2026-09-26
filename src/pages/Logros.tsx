import { useEffect, useMemo, useState } from "react"
import { RotateCcw } from "lucide-react"
import { useSession } from "@/hooks/useSession"
import { reportarError } from "@/lib/errores"
import { appButtonClass, appButtonStyle } from "@/lib/buttonStyles"
import { EstadoError } from "@/components/EstadoError"
import { useRachaEnBarra } from "@/components/layout/rachaEnBarra"
import { traerInicioPanel, traerTarjetasPanel } from "@/services/panel"
import type { Achievement, ActivityDay, Streak } from "@/components/dashboard/tipos"
import { ActivityHeatmap } from "@/components/dashboard/ActivityHeatmap"
import { DAILY_ACTION } from "@/components/dashboard/plan"
import { TarjetaPiloto } from "@/components/logros/TarjetaPiloto"
import { Misiones, TarjetaRacha } from "@/components/logros/Constancia"
import { ComoSeGana, RutaDeModulo, Trofeo } from "@/components/logros/Vitrina"
import {
  GRUPOS_DE_HITOS,
  MODULOS_DE_LOGROS,
  esReciente,
  proximasMisiones,
  rangoDePiloto,
  xpGanada,
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

/** AAAA-MM-DD de hoy en Bogotá, que es con lo que la base cierra el día. */
function hoyEnBogota(): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "America/Bogota", year: "numeric", month: "2-digit", day: "2-digit" }).format(
    new Date(),
  )
}

/**
 * Logros: la sala de trofeos. Arriba la tarjeta del piloto (nivel, XP, la
 * colección y los metales); después lo que se mueve cada día (la racha) al
 * lado de lo que tiene más cerca (las misiones); abajo la vitrina, por grupos
 * y con el recorrido de cada módulo, y al final la actividad y cómo se lee un
 * trofeo.
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

  useRachaEnBarra(estado === "listo" ? (racha?.current_streak ?? 0) : undefined, racha?.longest_streak)

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
  const ganado = (code: string) => ganados.has(code)
  const otros = logros.filter((a) => !CONOCIDOS.has(a.code)).map((a) => a.code)
  const total = logros.length
  const nGanados = logros.filter((a) => ganado(a.code)).length
  const visible = (code: string) => filtro === "todos" || (filtro === "ganados" ? ganado(code) : !ganado(code))
  const conteo: Record<Filtro, number> = { todos: total, ganados: nGanados, pendientes: total - nGanados }

  const rango = rangoDePiloto(xpGanada(logros, ganado))
  const metales = NIVELES.map((nivel) => {
    const delNivel = logros.filter((a) => a.tier === nivel)
    return { nivel, ganados: delNivel.filter((a) => ganado(a.code)).length, total: delNivel.length }
  }).filter((m) => cargando || m.total > 0)

  const hoy = hoyEnBogota()
  const dias = racha?.current_streak ?? 0
  const enRiesgo = dias > 0 && !!racha?.last_activity_date && racha.last_activity_date !== hoy
  const misiones = proximasMisiones({
    existe: (c) => porCodigo.has(c),
    ganado,
    racha: dias,
    hrefDiario: DAILY_ACTION.href,
    maximo: 4,
  })

  const grupos = [...GRUPOS_DE_HITOS, ...(otros.length ? [{ clave: "otros", titulo: "Otros", bajada: "", codigos: otros }] : [])]
  const rutas = MODULOS_DE_LOGROS.filter((m) => {
    const suyos = m.codigos.filter((c) => porCodigo.has(c))
    return suyos.length > 0 && suyos.some(visible)
  })
  const nadaQueMostrar = !cargando && grupos.every((g) => !g.codigos.some((c) => porCodigo.has(c) && visible(c))) && rutas.length === 0

  return (
    <div className="@container mx-auto max-w-[1400px] px-5 py-6 pb-20 sm:px-8 sm:py-8">
      <TarjetaPiloto cargando={cargando} usuario={usuario} rango={rango} ganados={nGanados} total={total} metales={metales} />

      <div className="mt-5 grid grid-cols-1 gap-5 @4xl:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)]">
        <TarjetaRacha
          cargando={cargando}
          dias={dias}
          mejor={racha?.longest_streak ?? 0}
          actividad={actividad}
          hoy={hoy}
          enRiesgo={enRiesgo}
          usuario={usuario}
          hrefDiario={DAILY_ACTION.href}
        />
        <Misiones cargando={cargando} misiones={misiones} porCodigo={porCodigo} />
      </div>

      {/* ── Vitrina ────────────────────────────────────────────────────── */}
      <section className="mt-14" aria-labelledby="logros-vitrina">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="logros-rotulo m-0 text-[11px] text-muted-foreground">La colección</p>
            <h2 id="logros-vitrina" className="logros-display m-0 mt-1.5 text-[30px] font-extrabold leading-none text-foreground">
              Vitrina
            </h2>
          </div>
          <div className="flex rounded-full surface p-1" role="group" aria-label="Filtrar trofeos">
            {FILTROS.map((f) => (
              <button
                key={f.clave}
                type="button"
                onClick={() => setFiltro(f.clave)}
                aria-pressed={filtro === f.clave}
                className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[12.5px] font-semibold transition-colors duration-200 ${
                  filtro === f.clave ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {f.nombre}
                {!cargando && <span className="logros-display text-[11.5px] opacity-60">{conteo[f.clave]}</span>}
              </button>
            ))}
          </div>
        </div>

        {cargando ? (
          <div className="mt-6 grid grid-cols-2 gap-3 @3xl:grid-cols-3 @5xl:grid-cols-4 @7xl:grid-cols-5">
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
              <div key={i} className="h-[250px] animate-pulse rounded-3xl bg-muted" />
            ))}
          </div>
        ) : nadaQueMostrar ? (
          <p className="m-0 mt-8 rounded-3xl surface p-6 text-center text-[14px] text-muted-foreground">
            {filtro === "ganados"
              ? "Todavía no tienes trofeos. Tu primera misión está arriba."
              : "Los ganaste todos. No queda nada por ganar."}
          </p>
        ) : (
          <>
            <div className="logros-grupos mt-10 flex flex-wrap gap-x-3 gap-y-10">
            {grupos.map((g) => {
              const codigos = g.codigos.filter((c) => porCodigo.has(c) && visible(c))
              const n = codigos.length
              if (n === 0) return null
              // Crece con sus trofeos y no pasa de 260 px por trofeo: un grupo de
              // dos solo en su fila no se estira a lo ancho de la página.
              return (
                <div
                  key={g.clave}
                  className="min-w-0"
                  style={{
                    flex: `${n} 1 calc(${n} * var(--trofeo) + ${n - 1} * 12px)`,
                    maxWidth: `calc(${n} * 260px + ${n - 1} * 12px)`,
                  }}
                >
                  <h3 className="logros-display m-0 text-[19px] font-bold text-foreground">{g.titulo}</h3>
                  {g.bajada && <p className="m-0 mt-1 text-[13px] text-muted-foreground">{g.bajada}</p>}
                  <ul
                    className="m-0 mt-4 grid list-none gap-3 p-0"
                    style={{ gridTemplateColumns: "repeat(auto-fit, minmax(var(--trofeo), 1fr))" }}
                  >
                    {codigos.map((c) => (
                      <Trofeo
                        key={c}
                        logro={porCodigo.get(c)!}
                        ganado={ganado(c)}
                        ganadoEl={ganados.get(c)}
                        nuevo={esReciente(ganados.get(c))}
                      />
                    ))}
                  </ul>
                </div>
              )
            })}
            </div>

            {rutas.length > 0 && (
              <div className="mt-12">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="logros-display m-0 text-[19px] font-bold text-foreground">Ingreso a aerolínea</h3>
                  <p className="m-0 text-[13px] text-muted-foreground">
                    Leer la lección, hacer la práctica, aprobar la evaluación y, con las tres, el dominio.
                  </p>
                </div>
                <ul className="m-0 mt-4 grid list-none grid-cols-1 gap-3 p-0 @3xl:grid-cols-2 @5xl:grid-cols-3">
                  {rutas.map((m) => (
                    <RutaDeModulo key={m.clave} modulo={m} porCodigo={porCodigo} ganado={ganado} />
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
      </section>

      <div className="mt-14 grid grid-cols-1 gap-5 @4xl:grid-cols-2">
        <ActivityHeatmap data={actividad} loading={cargando} />
        <ComoSeGana />
      </div>
    </div>
  )
}
