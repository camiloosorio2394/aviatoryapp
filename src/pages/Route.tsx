import { useEffect, useMemo, useState, type ReactNode } from "react"
import { Link } from "react-router-dom"
import { ArrowRight, ArrowUpRight, Check, Clock, Flag, Loader2, Plane, Radar, RotateCcw } from "lucide-react"
import { toast } from "sonner"
import heroFoto from "@/assets/photos/aerolinea-piloto.webp"
import {
  desmarcarItem,
  marcarItem,
  traerRuta,
  type Checklist,
  type ChecklistItem,
  type PilotStage,
} from "@/services/ruta"
import { reportarError } from "@/lib/errores"
import { useSession } from "@/hooks/useSession"
import { EstadoError } from "@/components/EstadoError"
import { appButtonClass, appButtonStyle } from "@/lib/buttonStyles"
import { STAGE_LABEL } from "@/components/dashboard/plan"
import { FilaDeAcceso } from "@/components/dashboard/AccesosDirectos"
import { CaminoDeEtapas } from "@/components/ruta/CaminoDeEtapas"
import { CATEGORIA_HITO, HERRAMIENTA_DEL_PASO, ORDEN_DE_ETAPAS } from "@/lib/miRuta"

/**
 * Mi ruta: lo que le falta al piloto para pasar de su etapa a la siguiente, con
 * el vocabulario del panel y de los módulos.
 *
 * Tenía el aire de antes: el título sin Archivo, las etapas pasadas y las
 * casillas marcadas en verde (el verde es acierto, y marcar un paso no es
 * acertar nada), «3 / 5 completos» haciendo de título de cada grupo y un
 * carril de etapas con 640 px de ancho mínimo que en el teléfono se desplazaba
 * de lado.
 *
 * El orden responde a lo que se pregunta al entrar: qué hago ahora y cuánto me
 * falta (el hero), dónde estoy en la carrera (el camino) y la lista entera,
 * en el orden en que se recorre. La lista va en orden y no agrupada: agrupar
 * por área partía la secuencia (el ground school quedaba junto a los
 * exámenes del final). El resumen por área va al lado.
 *
 * Cada paso lleva, si existe, la pantalla de la app que ayuda a cumplirlo: la
 * ruta deja de ser una lista para tachar y apunta a dónde trabajar.
 */

/** Rótulo de grupo: el mismo del panel y de los módulos. */
const ROTULO =
  "nh-display m-0 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground"

const CONTENEDOR = "notam-hub @container mx-auto max-w-[1600px] px-5 py-6 pb-16 sm:px-8 sm:py-8"

/** Los dos botones de la tarjeta de cristal del hero. */
const BOTON_BLANCO =
  "inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-full bg-white px-5 text-[13.5px] font-semibold text-[#0B1B30] transition-colors hover:bg-white/90 disabled:opacity-70"
const BOTON_CRISTAL =
  "inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 text-[13.5px] font-semibold text-white transition-colors hover:bg-white/20 disabled:opacity-70"

export function Route() {
  const { user } = useSession()
  const [stage, setStage] = useState<PilotStage | null>(null)
  const [checklist, setChecklist] = useState<Checklist | null>(null)
  const [items, setItems] = useState<ChecklistItem[]>([])
  const [completedIds, setCompletedIds] = useState<Set<number>>(new Set())
  const [loading, setLoading] = useState(true)
  /** No se pudo leer la etapa o la checklist: se ofrece reintentar. */
  const [fallo, setFallo] = useState(false)
  const [intento, setIntento] = useState(0)
  const [togglingId, setTogglingId] = useState<number | null>(null)

  useEffect(() => {
    if (!user) return
    let cancelled = false

    async function load() {
      try {
        const ruta = await traerRuta(user!.id)
        if (cancelled) return
        setStage(ruta.etapa)
        setChecklist(ruta.checklist)
        setItems(ruta.items)
        setCompletedIds(ruta.completados)
      } catch (err) {
        reportarError("ruta", err)
        if (!cancelled) setFallo(true)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [user, intento])

  async function toggleItem(item: ChecklistItem) {
    if (!user || togglingId === item.id) return
    setTogglingId(item.id)
    const isCompleted = completedIds.has(item.id)
    setCompletedIds((prev) => {
      const next = new Set(prev)
      if (isCompleted) next.delete(item.id)
      else next.add(item.id)
      return next
    })

    try {
      if (isCompleted) {
        await desmarcarItem(user.id, item.id)
      } else {
        await marcarItem(user.id, item.id)
        // El hito se reconoce por su categoría. Antes se buscaba el 🎉 en el
        // título, pero en la base va en la descripción, y el aviso no salía.
        if (item.category === CATEGORIA_HITO) {
          toast.success("Hito conseguido", { description: item.description ?? undefined })
        }
      }
    } catch (err) {
      setCompletedIds((prev) => {
        const next = new Set(prev)
        if (isCompleted) next.add(item.id)
        else next.delete(item.id)
        return next
      })
      toast.error(err instanceof Error ? err.message : "No pudimos guardar")
    } finally {
      setTogglingId(null)
    }
  }

  /** Cuánto lleva de cada área, en el orden en que aparecen. El hito no es un área. */
  const areas = useMemo(() => {
    const map = new Map<string, { hechos: number; total: number }>()
    for (const item of items) {
      const cat = item.category ?? "General"
      if (cat === CATEGORIA_HITO) continue
      const a = map.get(cat) ?? { hechos: 0, total: 0 }
      a.total += 1
      if (completedIds.has(item.id)) a.hechos += 1
      map.set(cat, a)
    }
    return Array.from(map, ([nombre, a]) => ({ nombre, ...a }))
  }, [items, completedIds])

  if (loading) return <Esqueleto />

  if (fallo) {
    return (
      <div className={CONTENEDOR}>
        <EstadoError
          titulo="No pudimos cargar tu ruta"
          mensaje="Revisa tu conexión e inténtalo de nuevo. Tu avance está guardado."
          acciones={
            <button
              type="button"
              onClick={() => {
                setFallo(false)
                setLoading(true)
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

  if (!stage) return <SinEtapa />
  if (!checklist) return <SinLista etapa={stage} />

  const hechos = items.filter((i) => completedIds.has(i.id)).length
  const total = items.length
  const completa = total > 0 && hechos === total
  // Lo siguiente es el primer paso pendiente en el orden de la lista.
  const siguiente = items.find((i) => !completedIds.has(i.id)) ?? null
  const herramienta = siguiente ? HERRAMIENTA_DEL_PASO[siguiente.key] : undefined
  const ultimaEtapa = ORDEN_DE_ETAPAS.indexOf(stage) === ORDEN_DE_ETAPAS.length - 1

  return (
    <div className={CONTENEDOR}>
      <Hero
        etapa={stage}
        titulo={checklist.name}
        descripcion={checklist.description}
        panel={<PanelDeAvance hechos={hechos} total={total} etapa={stage} />}
        accion={
          // Una lista sin pasos no se da por cumplida: no se muestra acción.
          total === 0 ? undefined : (completa || !siguiente) && ultimaEtapa ? (
            // En la última etapa no hay ruta siguiente que abrir.
            <TarjetaDeCristal
              rotulo="Ruta completa"
              titulo="Cumpliste la última etapa"
              detalle="Es el final de la ruta: no hay una etapa siguiente que abrir."
            />
          ) : completa || !siguiente ? (
            <TarjetaDeCristal
              rotulo="Etapa completa"
              titulo="Cumpliste toda la lista de esta etapa"
              detalle="Actualiza tu etapa en tu perfil para abrir la ruta siguiente."
            >
              <Link to="/app/perfil" className={BOTON_BLANCO}>
                Actualizar etapa <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </Link>
            </TarjetaDeCristal>
          ) : (
            <TarjetaDeCristal
              rotulo={hechos === 0 ? "Empieza por aquí" : "Lo siguiente"}
              titulo={siguiente.title}
              detalle={siguiente.description}
            >
              {herramienta && (
                <Link to={herramienta.to} className={BOTON_BLANCO}>
                  {herramienta.verbo} <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                </Link>
              )}
              <button
                type="button"
                onClick={() => toggleItem(siguiente)}
                disabled={togglingId === siguiente.id}
                className={herramienta ? BOTON_CRISTAL : BOTON_BLANCO}
              >
                {togglingId === siguiente.id ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden />
                ) : (
                  <Check className="h-3.5 w-3.5" aria-hidden />
                )}
                Ya lo cumplí
              </button>
            </TarjetaDeCristal>
          )
        }
      />

      <section className="mt-8" aria-labelledby="ruta-camino">
        <h2 id="ruta-camino" className={ROTULO}>
          Tu camino
        </h2>
        <div className="mt-3">
          <CaminoDeEtapas etapa={stage} />
        </div>
      </section>

      <section className="mt-8" aria-labelledby="ruta-pasos">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h2 id="ruta-pasos" className={ROTULO}>
            Los pasos de esta etapa
          </h2>
          <span className="text-[12.5px] text-muted-foreground">Marca lo que ya cumpliste: queda en tu cuenta</span>
        </div>
        {/* La lista y, al lado, el resumen por área. En pantalla ancha el
            resumen acompaña al bajar; en el teléfono va después de la lista. */}
        <div className="mt-3 grid grid-cols-1 items-start gap-4 @4xl:grid-cols-[minmax(0,1fr)_minmax(0,320px)]">
          <ol className="m-0 list-none overflow-hidden rounded-2xl surface p-0">
            {items.map((item, i) => (
              <FilaDePaso
                key={item.id}
                item={item}
                hecho={completedIds.has(item.id)}
                guardando={togglingId === item.id}
                ultima={i === items.length - 1}
                onAlternar={() => toggleItem(item)}
              />
            ))}
          </ol>
          <PorArea areas={areas} />
        </div>
      </section>
    </div>
  )
}

// ─── Piezas ─────────────────────────────────────────────────────────────────

/**
 * El hero de las portadas: la foto bajo el velo navy, el titular en Archivo, la
 * acción en su tarjeta de cristal y, a la derecha, el panel con el avance.
 */
function Hero({
  etapa,
  titulo,
  descripcion,
  accion,
  panel,
}: {
  etapa?: PilotStage
  titulo: string
  descripcion?: string | null
  accion?: ReactNode
  panel?: ReactNode
}) {
  const indice = etapa ? ORDEN_DE_ETAPAS.indexOf(etapa) : -1
  return (
    <section className="relative overflow-hidden rounded-[18px] shadow-[0_1px_2px_rgba(11,27,48,0.08)]">
      <img
        src={heroFoto}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: "center 30%" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(105deg, rgba(8,20,36,.93) 0%, rgba(8,20,36,.82) 42%, rgba(8,20,36,.62) 72%, rgba(8,20,36,.48) 100%)",
        }}
      />

      <div
        className={`relative grid gap-6 px-6 py-6 sm:px-10 sm:py-8 ${
          panel ? "@4xl:grid-cols-[minmax(0,1fr)_minmax(0,272px)] @4xl:gap-10" : ""
        }`}
      >
        <div className="min-w-0 self-center">
          <div className="flex flex-wrap items-center gap-3">
            <span className="nh-display text-[11px] font-semibold uppercase tracking-[0.16em] text-[#7FB2F2]">
              Mi ruta
            </span>
            {etapa && (
              <>
                <span className="hidden h-3 w-px bg-white/20 @md:block" aria-hidden />
                <span className="nh-display inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/78">
                  <Plane className="h-3.5 w-3.5" aria-hidden /> Etapa {indice + 1} de {ORDEN_DE_ETAPAS.length} ·{" "}
                  {STAGE_LABEL[etapa]}
                </span>
              </>
            )}
          </div>

          <h1 className="nh-display mt-3 text-[32px] font-bold leading-none tracking-[-0.03em] text-white sm:text-[38px] @5xl:text-[44px]">
            {titulo}
          </h1>
          {descripcion && (
            <p className="mt-3 mb-0 max-w-[58ch] text-[15px] leading-[1.55] text-white/85">{descripcion}</p>
          )}
          {accion}
        </div>
        {panel}
      </div>
    </section>
  )
}

/** La acción del hero: qué es, una línea que la explica y sus botones. */
function TarjetaDeCristal({
  rotulo,
  titulo,
  detalle,
  children,
}: {
  rotulo: string
  titulo: string
  detalle?: string | null
  /** Los botones. Sin ellos, la tarjeta solo informa. */
  children?: ReactNode
}) {
  return (
    <div className="mt-6 flex max-w-[640px] flex-col gap-4 rounded-[14px] border border-white/15 bg-[rgba(6,17,31,0.55)] p-4 backdrop-blur-[6px] @xl:flex-row @xl:items-center @xl:justify-between">
      <div className="min-w-0">
        <div className="nh-display text-[10px] font-semibold uppercase tracking-[0.16em] text-[#7FB2F2]">{rotulo}</div>
        <div className="mt-1.5 text-[15px] font-semibold leading-snug text-white">{titulo}</div>
        {detalle && <div className="mt-0.5 text-[12.5px] text-white/78">{detalle}</div>}
      </div>
      {children && <div className="flex shrink-0 flex-wrap items-center gap-2">{children}</div>}
    </div>
  )
}

/** El panel de cristal: cuántos pasos lleva de esta etapa y qué viene después. */
function PanelDeAvance({ hechos, total, etapa }: { hechos: number; total: number; etapa: PilotStage }) {
  const pct = total > 0 ? Math.round((hechos / total) * 100) : 0
  const indice = ORDEN_DE_ETAPAS.indexOf(etapa)
  const despues = ORDEN_DE_ETAPAS[indice + 1]
  return (
    <div className="self-start overflow-hidden rounded-[14px] border border-white/15 bg-[rgba(6,17,31,0.62)] backdrop-blur-[6px] @4xl:self-center">
      <div className="px-4 pb-4 pt-4">
        <div className="nh-display text-[10px] font-semibold uppercase tracking-[0.16em] text-white/72">
          Tu avance en esta etapa
        </div>
        {/* Sin nada marcado, el número es lo que hay por delante: un «0» el
            primer día se lee como un veredicto. */}
        <div className="mt-1 flex items-baseline gap-2">
          <span className="nh-display tabular text-[52px] font-bold leading-none tracking-[-0.04em] text-white">
            {hechos > 0 ? hechos : total}
          </span>
          <span className="text-[13px] font-semibold text-white/78">
            {hechos > 0 ? `de ${total} pasos` : "pasos en esta etapa"}
          </span>
        </div>
        <div
          hidden={hechos === 0}
          className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/15"
          role="progressbar"
          aria-label="Avance en esta etapa"
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div className="h-full rounded-full bg-white transition-[width] duration-500" style={{ width: `${pct}%` }} />
        </div>
      </div>
      <dl className="m-0 border-t border-white/10 px-4 py-3 text-[12px] leading-[1.5]">
        <div className="flex items-baseline justify-between gap-3">
          <dt className="text-white/72">Etapa</dt>
          <dd className="tabular m-0 font-semibold text-white/90">
            {indice + 1} de {ORDEN_DE_ETAPAS.length}
          </dd>
        </div>
        {despues && (
          <div className="mt-1 flex items-baseline justify-between gap-3">
            <dt className="text-white/72">Después</dt>
            <dd className="m-0 text-right font-semibold text-white/90">{STAGE_LABEL[despues]}</dd>
          </div>
        )}
      </dl>
    </div>
  )
}

/**
 * Un paso de la lista, en dos renglones: el título y, debajo, su área y su
 * detalle. La casilla y el texto son un solo botón; la herramienta que ayuda a
 * cumplirlo va aparte, porque un enlace no puede vivir dentro de un botón.
 *
 * Marcado va en tinta y no en verde, y sin tachar: tachado se lee peor, y la
 * casilla llena ya dice que está hecho. El contorno de la casilla vacía llega
 * al 3:1 que pide un control.
 */
function FilaDePaso({
  item,
  hecho,
  guardando,
  ultima,
  onAlternar,
}: {
  item: ChecklistItem
  hecho: boolean
  guardando: boolean
  ultima: boolean
  onAlternar: () => void
}) {
  const herramienta = HERRAMIENTA_DEL_PASO[item.key]
  const hito = item.category === CATEGORIA_HITO
  return (
    <li
      className={`flex flex-col gap-2 px-4 py-3 transition-colors hover:bg-muted/40 sm:px-5 @xl:flex-row @xl:items-center @xl:gap-4 ${
        ultima ? "" : "border-b border-border"
      }`}
    >
      <button
        type="button"
        role="checkbox"
        aria-checked={hecho}
        onClick={onAlternar}
        disabled={guardando}
        className="flex min-w-0 flex-1 items-start gap-3.5 rounded-lg text-left outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
      >
        <span
          aria-hidden
          className="mt-px grid h-5 w-5 shrink-0 place-items-center rounded-[6px] transition-colors"
          style={
            hecho
              ? { background: "var(--foreground)", color: "var(--background)" }
              : { border: "1.5px solid color-mix(in oklab, var(--foreground) 50%, transparent)" }
          }
        >
          {guardando ? (
            <Loader2 className="h-3 w-3 animate-spin" style={{ color: hecho ? undefined : "var(--foreground)" }} />
          ) : hecho ? (
            <Check className="h-3.5 w-3.5" strokeWidth={3} />
          ) : null}
        </span>
        <span className="min-w-0">
          <span
            className={`block text-[14px] font-semibold leading-snug tracking-[-0.01em] ${
              hecho ? "text-muted-foreground" : "text-foreground"
            }`}
          >
            {item.title}
          </span>
          <span className="mt-0.5 block text-[12.5px] leading-snug text-muted-foreground">
            <span className="inline-flex items-center gap-1 font-semibold">
              {hito && <Flag className="h-3 w-3" aria-hidden />}
              {item.category ?? "General"}
            </span>
            {item.description && <> · {item.description}</>}
          </span>
        </span>
      </button>
      {herramienta && (
        <Link
          to={herramienta.to}
          className="ml-[34px] inline-flex shrink-0 items-center gap-1 self-start rounded-full border border-border px-2.5 py-1 text-[12px] font-semibold text-foreground transition-colors hover:bg-muted @xl:ml-0 @xl:self-center"
        >
          {herramienta.nombre} <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
        </Link>
      )}
    </li>
  )
}

/** Cuánto lleva de cada área. Una sola serie por fila, en tinta. */
function PorArea({ areas }: { areas: { nombre: string; hechos: number; total: number }[] }) {
  return (
    <aside className="rounded-2xl surface p-5 @4xl:sticky @4xl:top-[88px]" aria-labelledby="ruta-areas">
      <h3 id="ruta-areas" className="m-0 text-[15px] font-semibold tracking-[-0.01em] text-foreground">
        Por área
      </h3>
      <p className="m-0 mt-0.5 text-[12.5px] text-muted-foreground">Cuánto llevas de cada parte de la etapa</p>
      <ul className="m-0 mt-4 flex list-none flex-col gap-3 p-0">
        {areas.map((a) => (
          <li key={a.nombre}>
            <div className="flex items-baseline justify-between gap-3">
              <span className="truncate text-[13px] text-foreground">{a.nombre}</span>
              <span className="tabular shrink-0 text-[12.5px] font-semibold text-muted-foreground">
                {a.hechos} de {a.total}
              </span>
            </div>
            <div className="mt-1.5 h-1.5 overflow-hidden rounded-r-[3px] bg-muted" aria-hidden>
              <div
                className="h-full rounded-r-[3px] transition-[width] duration-500"
                style={{ width: `${a.total > 0 ? (a.hechos / a.total) * 100 : 0}%`, background: "var(--foreground)" }}
              />
            </div>
          </li>
        ))}
      </ul>
    </aside>
  )
}

/** Sin etapa no hay lista que armar: se pide la etapa, sin reproches. */
function SinEtapa() {
  return (
    <div className={CONTENEDOR}>
      <Hero
        titulo="Tu ruta empieza por tu etapa"
        descripcion="Dinos en qué punto de tu carrera estás y te armamos la lista de lo que te falta para llegar a la siguiente."
        accion={
          <TarjetaDeCristal
            rotulo="Un paso antes"
            titulo="Elige tu etapa en tu perfil"
            detalle="De estudiante PPL a candidato a aerolínea: son siete."
          >
            <Link to="/app/perfil" className={BOTON_BLANCO}>
              Elegir mi etapa <ArrowRight className="h-3.5 w-3.5" aria-hidden />
            </Link>
          </TarjetaDeCristal>
        }
      />
    </div>
  )
}

/**
 * Una etapa sin lista todavía (hoy, piloto comercial e instructor). Se dice
 * tal cual y se ofrece lo que sí cuenta para cualquier piloto con licencia: las
 * horas, dónde calificas y la preparación de la entrevista.
 */
function SinLista({ etapa }: { etapa: PilotStage }) {
  return (
    <div className={CONTENEDOR}>
      <Hero
        etapa={etapa}
        titulo={STAGE_LABEL[etapa]}
        descripcion="La lista de esta etapa todavía está en preparación. Mientras tanto, esto cuenta igual para tu carrera."
      />

      <section className="mt-8" aria-labelledby="ruta-camino">
        <h2 id="ruta-camino" className={ROTULO}>
          Tu camino
        </h2>
        <div className="mt-3">
          <CaminoDeEtapas etapa={etapa} />
        </div>
      </section>

      <section className="mt-8" aria-labelledby="ruta-mientras">
        <h2 id="ruta-mientras" className={ROTULO}>
          Mientras tanto
        </h2>
        <div className="mt-3 grid grid-cols-1 gap-3 @2xl:grid-cols-3">
          <FilaDeAcceso
            to="/app/logbook"
            titulo="Registra tus horas"
            detalle="Las horas son el requisito que más pesa al postular a una aerolínea"
            icon={Clock}
          />
          <FilaDeAcceso
            to="/app/match"
            titulo="Para cuál calificas"
            detalle="Tus horas, licencias e inglés contra los requisitos de cada aerolínea"
            icon={Radar}
          />
          <FilaDeAcceso
            to="/app/aerolinea"
            titulo="Ingreso a aerolínea"
            detalle="Los temas de la entrevista técnica, con práctica y evaluación"
            icon={Plane}
          />
        </div>
      </section>
    </div>
  )
}

/** El esqueleto copia la forma de la pantalla para que nada salte al cargar. */
function Esqueleto() {
  return (
    <div className={CONTENEDOR} aria-busy="true" aria-label="Cargando tu ruta">
      <div className="h-[430px] animate-pulse rounded-[18px] bg-muted @4xl:h-[300px]" />
      <div className="mt-8 h-3 w-24 animate-pulse rounded bg-muted" />
      <div className="mt-3 h-[96px] animate-pulse rounded-2xl bg-muted @2xl:h-[128px]" />
      <div className="mt-8 h-3 w-40 animate-pulse rounded bg-muted" />
      <div className="mt-3 grid grid-cols-1 gap-4 @4xl:grid-cols-[minmax(0,1fr)_minmax(0,320px)]">
        <div className="h-[560px] animate-pulse rounded-2xl bg-muted" />
        <div className="hidden h-[300px] animate-pulse rounded-2xl bg-muted @4xl:block" />
      </div>
    </div>
  )
}
