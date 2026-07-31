import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import type { ComponentType } from "react"
import {
  ArrowRight,
  Briefcase,
  Check,
  CloudSun,
  Gavel,
  Globe2,
  Hash,
  HelpCircle,
  MessageSquare,
  MessagesSquare,
  RotateCw,
  TriangleAlert,
  Trophy,
  Users,
} from "lucide-react"
import { supabase } from "@/integrations/supabase/client"
import { useSession } from "@/hooks/useSession"
import { AppLayout } from "@/components/layout/AppLayout"
import { TILE_COLOR, tileTint, tileBorder, type TileColorKey } from "@/lib/tileColors"
import { accentText } from "@/lib/notam"
import { AerodromeIcon, HoldingIcon, LocalizerIcon, WaypointIcon } from "@/components/icons/aero"
import heroPhoto from "@/assets/photos/aerolinea-piloto.jpg"

interface Channel {
  id: number
  slug: string
  name: string
  description: string | null
  type: "general" | "stage" | "subject" | "airline"
  emoji: string | null
  member_count: number
  order_index: number
}

interface MessageMeta {
  channel_id: number
  created_at: string
}

interface ChannelActivity {
  messages: number
  lastAt: string
}

/**
 * Muestra de mensajes para calcular señal de actividad por canal. Con el
 * volumen actual entra completa; si algún día se supera, el conteo sigue
 * siendo "al menos esto", nunca un número inventado.
 */
const MESSAGE_SAMPLE = 2000

type IconComponent = ComponentType<{ className?: string }>

/**
 * Icono propio por canal, en lugar del emoji que viene en la base: el emoji lo
 * dibuja el sistema operativo y rompía el lenguaje visual (misma razón por la
 * que los logros pasaron a insignias). Los símbolos de carta van donde
 * significan algo: el circuito de espera para hour building, el aeródromo como
 * destino para los candidatos.
 */
const CHANNEL_ICON: Record<string, IconComponent> = {
  general: MessagesSquare,
  logros: Trophy,
  preguntas: HelpCircle,
  empleos: Briefcase,
  "etapa-ppl": WaypointIcon,
  "etapa-cpl": LocalizerIcon,
  "etapa-horas": HoldingIcon,
  "etapa-candidatos": AerodromeIcon,
  "mat-meteorologia": CloudSun,
  "mat-reglamento": Gavel,
  "mat-icao-english": Globe2,
}

const GROUP_META: Record<
  Channel["type"],
  { title: string; description: string; color: TileColorKey; icon: IconComponent }
> = {
  general: {
    title: "General",
    description: "Conversación abierta, logros, dudas y oportunidades",
    color: "blue",
    icon: MessagesSquare,
  },
  stage: {
    title: "Por etapa",
    description: "Pilotos en tu mismo momento de carrera",
    color: "cyan",
    icon: WaypointIcon,
  },
  subject: {
    title: "Por materia",
    description: "Dudas técnicas con foco",
    color: "violet",
    icon: Gavel,
  },
  airline: {
    title: "Por aerolínea",
    description: "Preparación para postular",
    color: "amber",
    icon: AerodromeIcon,
  },
}

const GROUP_ORDER: Channel["type"][] = ["general", "stage", "subject", "airline"]

/** Canal de etapa que corresponde a cada etapa del piloto. */
const STAGE_TO_CHANNEL: Record<string, string> = {
  student_ppl: "etapa-ppl",
  ppl: "etapa-ppl",
  cpl_in_progress: "etapa-cpl",
  cpl_ready: "etapa-cpl",
  hour_building: "etapa-horas",
  instructor: "etapa-horas",
  airline_candidate: "etapa-candidatos",
}

const AIRLINE_TILE_KEYS: TileColorKey[] = ["blue", "cyan", "violet", "amber", "green", "red"]

/** Color estable por canal (sin azar en render): depende solo del slug. */
function airlineTileKey(slug: string): TileColorKey {
  let sum = 0
  for (let i = 0; i < slug.length; i += 1) sum += slug.charCodeAt(i)
  return AIRLINE_TILE_KEYS[sum % AIRLINE_TILE_KEYS.length]
}

/** Iniciales de la aerolínea para el tile. */
function airlineInitials(name: string): string {
  const words = name
    .trim()
    .split(/\s+/)
    .filter((w) => /^[A-Za-zÁÉÍÓÚÑáéíóúñ]/.test(w))
  if (words.length === 0) return "AV"
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase()
  return (words[0].charAt(0) + words[1].charAt(0)).toUpperCase()
}

function relativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime()
  const minutes = Math.floor(diff / 60_000)
  if (minutes < 1) return "hace un momento"
  if (minutes < 60) return `hace ${minutes} min`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `hace ${hours} h`
  const days = Math.floor(hours / 24)
  if (days === 1) return "ayer"
  if (days < 30) return `hace ${days} días`
  const months = Math.floor(days / 30)
  return months <= 1 ? "hace un mes" : `hace ${months} meses`
}

export function Community() {
  const { user } = useSession()
  const [channels, setChannels] = useState<Channel[]>([])
  const [activity, setActivity] = useState<Record<number, ChannelActivity>>({})
  const [pilotStage, setPilotStage] = useState<string | null>(null)
  const [targetAirline, setTargetAirline] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [failed, setFailed] = useState(false)
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    let cancelled = false

    async function load() {
      setLoading(true)
      setFailed(false)
      const [channelsRes, messagesRes, pilotRes] = await Promise.all([
        supabase.from("community_channels").select("*").order("order_index"),
        supabase
          .from("community_messages")
          .select("channel_id, created_at")
          .order("created_at", { ascending: false })
          .limit(MESSAGE_SAMPLE),
        user
          ? supabase.from("pilot_state").select("stage, target_airline").eq("user_id", user.id).maybeSingle()
          : Promise.resolve({ data: null, error: null }),
      ])
      if (cancelled) return

      if (channelsRes.error) {
        setChannels([])
        setActivity({})
        setFailed(true)
        setLoading(false)
        return
      }

      setChannels((channelsRes.data ?? []) as Channel[])

      const pilot = pilotRes.data as { stage: string | null; target_airline: string | null } | null
      setPilotStage(pilot?.stage ?? null)
      setTargetAirline(pilot?.target_airline ?? null)

      const map: Record<number, ChannelActivity> = {}
      if (!messagesRes.error) {
        for (const row of (messagesRes.data ?? []) as MessageMeta[]) {
          const current = map[row.channel_id]
          if (current) {
            current.messages += 1
            if (Date.parse(row.created_at) > Date.parse(current.lastAt)) {
              current.lastAt = row.created_at
            }
          } else {
            map[row.channel_id] = { messages: 1, lastAt: row.created_at }
          }
        }
      }
      setActivity(map)
      setLoading(false)
    }

    load()
    return () => {
      cancelled = true
    }
  }, [reloadKey, user])

  const totalChannels = channels.length

  /** El canal con el mensaje más reciente de la muestra: la puerta de entrada. */
  const ultimoActivo = useMemo(() => {
    let best: { channel: Channel; lastAt: string } | null = null
    for (const c of channels) {
      const act = activity[c.id]
      if (!act) continue
      if (!best || Date.parse(act.lastAt) > Date.parse(best.lastAt)) {
        best = { channel: c, lastAt: act.lastAt }
      }
    }
    return best
  }, [channels, activity])

  /**
   * Tus canales: el de tu etapa (mapeo directo desde pilot_state) y el de tu
   * aerolínea objetivo si existe un canal cuyo nombre coincida. Nada de
   * sugerencias inventadas: si no hay correspondencia, la fila no aparece.
   */
  const misCanales = useMemo(() => {
    const out: { channel: Channel; motivo: string }[] = []
    if (pilotStage) {
      const slug = STAGE_TO_CHANNEL[pilotStage]
      const c = channels.find((ch) => ch.slug === slug)
      if (c) out.push({ channel: c, motivo: "Tu etapa" })
    }
    if (targetAirline) {
      const objetivo = targetAirline.trim().toLowerCase()
      const c = channels.find(
        (ch) =>
          ch.type === "airline" &&
          (ch.name.toLowerCase().includes(objetivo) || objetivo.includes(ch.name.toLowerCase()))
      )
      if (c) out.push({ channel: c, motivo: "Tu aerolínea objetivo" })
    }
    return out
  }, [channels, pilotStage, targetAirline])

  const groups = useMemo(
    () =>
      GROUP_ORDER.map((type) => ({
        type,
        list: channels
          .filter((c) => c.type === type)
          .slice()
          .sort((a, b) => {
            const actA = activity[a.id]
            const actB = activity[b.id]
            if (!!actA !== !!actB) return actA ? -1 : 1
            if (actA && actB) {
              const diff = Date.parse(actB.lastAt) - Date.parse(actA.lastAt)
              if (diff !== 0) return diff
            }
            return a.order_index - b.order_index
          }),
      })).filter((g) => g.list.length > 0),
    [channels, activity]
  )

  const comunidadVacia = totalChannels > 0 && Object.keys(activity).length === 0

  return (
    <AppLayout>
      <div className="px-4 sm:px-7 py-6 sm:py-8 pb-12 max-w-[1280px] mx-auto">
        {/* Hero de módulo */}
        <section className="relative overflow-hidden rounded-xl mb-6">
          <img src={heroPhoto} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover" />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgb(11 16 32 / 90%) 0%, color-mix(in oklab, var(--av-blue-500) 34%, rgb(11 16 32 / 86%)) 100%)",
            }}
          />
          <div className="relative px-6 py-7 sm:px-8 sm:py-9">
            <div className="text-[13px] font-semibold text-white/70">
              Comunidad{totalChannels > 0 ? ` · ${totalChannels} canales` : ""}
            </div>
            <h1 className="mt-1 text-[24px] sm:text-[32px] font-semibold tracking-[-0.03em] leading-[1.1] text-white max-w-[640px]">
              Ningún piloto llega a la cabina solo
            </h1>
            <p className="mt-2 mb-0 text-[15px] text-white/75 max-w-[560px] leading-relaxed">
              Pilotos LATAM organizados por etapa, materia y aerolínea.
            </p>
            {ultimoActivo && (
              <Link
                to={`/app/comunidad/${ultimoActivo.channel.slug}`}
                className="mt-5 inline-flex items-center gap-2.5 rounded-full border border-white/25 bg-white/12 backdrop-blur-sm h-10 pl-4 pr-3 text-[13px] font-semibold text-white transition-transform hover:-translate-y-0.5"
              >
                <MessageSquare className="h-3.5 w-3.5" style={{ color: "var(--av-amber-400)" }} />
                La conversación sigue en {ultimoActivo.channel.name} · {relativeTime(ultimoActivo.lastAt)}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            )}
            {comunidadVacia && (
              <p className="mt-5 mb-0 inline-flex items-center gap-2 text-[13px] font-semibold text-white/80">
                <MessageSquare className="h-3.5 w-3.5" style={{ color: "var(--av-amber-400)" }} />
                Los canales están recién abiertos: el primer mensaje pone tu nombre en la historia.
              </p>
            )}
          </div>
        </section>

        {loading ? (
          <div className="space-y-4 animate-pulse">
            <div className="h-[92px] bg-muted rounded-xl" />
            <div className="grid lg:grid-cols-2 gap-4">
              <div className="h-[300px] bg-muted rounded-xl" />
              <div className="h-[300px] bg-muted rounded-xl" />
              <div className="h-[240px] bg-muted rounded-xl" />
              <div className="h-[240px] bg-muted rounded-xl" />
            </div>
          </div>
        ) : failed ? (
          <LoadFailed onRetry={() => setReloadKey((k) => k + 1)} />
        ) : totalChannels === 0 ? (
          <NoChannelsYet />
        ) : (
          <>
            {/* Tus canales: la página abre con tus salas, no con un directorio */}
            {misCanales.length > 0 && (
              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                {misCanales.map(({ channel, motivo }) => (
                  <MyChannelCard
                    key={channel.id}
                    channel={channel}
                    motivo={motivo}
                    activity={activity[channel.id]}
                  />
                ))}
              </div>
            )}

            {/* Directorio: un panel por grupo, canales como filas */}
            <div className="grid lg:grid-cols-2 gap-4 items-start">
              {groups.map(({ type, list }) => (
                <GroupPanel key={type} type={type} list={list} activity={activity} />
              ))}
            </div>
          </>
        )}

        <p className="mt-8 mb-0 flex items-start gap-2.5 text-[13px] text-muted-foreground leading-relaxed">
          <Check className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: "var(--av-blue-500)" }} />
          <span>
            <span className="font-semibold text-foreground">Normas: </span>
            tono respetuoso y profesional. No compartas preguntas literales de exámenes ni contenido
            pirata. Moderación: <span className="font-semibold">hola@aviatory.app</span>.
          </span>
        </p>
      </div>
    </AppLayout>
  )
}

/** Card destacada de "tus canales": tinte del grupo y el motivo visible. */
function MyChannelCard({
  channel,
  motivo,
  activity,
}: {
  channel: Channel
  motivo: string
  activity: ChannelActivity | undefined
}) {
  const meta = GROUP_META[channel.type]
  const Ic = CHANNEL_ICON[channel.slug] ?? meta.icon
  return (
    <Link
      to={`/app/comunidad/${channel.slug}`}
      className="surface-lift group flex items-center gap-4 rounded-xl border p-4"
      style={{
        borderColor: tileBorder(meta.color, 34),
        background: tileTint(meta.color, 6),
      }}
    >
      <div
        className="flex items-center justify-center h-11 w-11 rounded-lg flex-shrink-0"
        style={{
          background: tileTint(meta.color, 16),
          border: `1px solid ${tileBorder(meta.color, 26)}`,
          color: accentText(TILE_COLOR[meta.color], 75),
        }}
      >
        <Ic className="h-5 w-5" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-[12px] font-semibold" style={{ color: accentText(TILE_COLOR[meta.color]) }}>
          {motivo}
        </div>
        <div className="flex items-center gap-1.5 mt-0.5">
          <Hash className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
          <span className="text-[15px] font-semibold text-foreground truncate">{channel.name}</span>
        </div>
        <div className="text-[13px] text-muted-foreground mt-0.5 truncate">
          {activity
            ? `${activity.messages === 1 ? "1 mensaje" : `${activity.messages} mensajes`} · ${relativeTime(activity.lastAt)}`
            : "Preséntate: tu cohorte se arma aquí"}
        </div>
      </div>
      <ArrowRight className="h-4 w-4 text-muted-foreground flex-shrink-0 transition-transform group-hover:translate-x-0.5" />
    </Link>
  )
}

/** Panel de grupo: encabezado con identidad y los canales como filas. */
function GroupPanel({
  type,
  list,
  activity,
}: {
  type: Channel["type"]
  list: Channel[]
  activity: Record<number, ChannelActivity>
}) {
  const meta = GROUP_META[type]
  const GroupIcon = meta.icon
  return (
    <section className="rounded-xl surface overflow-hidden">
      <header className="px-4 py-3.5 border-b border-border flex items-center gap-3">
        <div
          className="flex items-center justify-center h-9 w-9 rounded-lg flex-shrink-0"
          style={{
            background: tileTint(meta.color, 14),
            border: `1px solid ${tileBorder(meta.color, 22)}`,
            color: accentText(TILE_COLOR[meta.color], 75),
          }}
        >
          <GroupIcon className="h-[18px] w-[18px]" />
        </div>
        <div className="min-w-0">
          <h2 className="m-0 text-[15px] font-semibold text-foreground tracking-[-0.015em]">
            {meta.title}
          </h2>
          <p className="m-0 text-[12px] text-muted-foreground truncate">{meta.description}</p>
        </div>
        <span className="ml-auto tabular-nums text-[12px] font-semibold text-muted-foreground">
          {list.length}
        </span>
      </header>

      {list.map((c, i) => (
        <ChannelRow key={c.id} channel={c} activity={activity[c.id]} last={i === list.length - 1} />
      ))}
    </section>
  )
}

/** Fila de canal: icono, nombre y descripción, actividad a la derecha. */
function ChannelRow({
  channel,
  activity,
  last,
}: {
  channel: Channel
  activity: ChannelActivity | undefined
  last: boolean
}) {
  const meta = GROUP_META[channel.type]
  const isAirline = channel.type === "airline"
  const tileKey = isAirline ? airlineTileKey(channel.slug) : meta.color
  const Ic = CHANNEL_ICON[channel.slug] ?? meta.icon

  return (
    <Link
      to={`/app/comunidad/${channel.slug}`}
      className={`flex items-center gap-3.5 px-4 py-3 transition-colors hover:bg-muted/60 ${
        last ? "" : "border-b border-border"
      }`}
    >
      {isAirline ? (
        <span
          className="flex items-center justify-center h-9 w-9 rounded-lg text-[13px] font-semibold tracking-[0.02em] flex-shrink-0"
          style={{
            background: tileTint(tileKey),
            border: `1px solid ${tileBorder(tileKey)}`,
            color: accentText(TILE_COLOR[tileKey], 75),
          }}
          aria-hidden
        >
          {airlineInitials(channel.name)}
        </span>
      ) : (
        <Ic className="h-[20px] w-[20px] text-muted-foreground flex-shrink-0" />
      )}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <Hash className="h-3 w-3 text-muted-foreground flex-shrink-0" />
          <span className="text-[15px] font-semibold text-foreground truncate">{channel.name}</span>
        </div>
        {channel.description && (
          <div className="text-[13px] text-muted-foreground truncate mt-0.5">{channel.description}</div>
        )}
      </div>
      <div className="text-right flex-shrink-0 hidden sm:block">
        {activity ? (
          <>
            <div className="tabular-nums text-[13px] font-semibold text-foreground">
              {activity.messages === 1 ? "1 mensaje" : `${activity.messages} mensajes`}
            </div>
            <div className="text-[12px] text-muted-foreground">{relativeTime(activity.lastAt)}</div>
          </>
        ) : channel.member_count > 0 ? (
          <div className="inline-flex items-center gap-1 text-[12px] font-semibold text-muted-foreground">
            <Users className="h-3 w-3" />
            {channel.member_count}
          </div>
        ) : null}
      </div>
      <ArrowRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
    </Link>
  )
}

function LoadFailed({ onRetry }: { onRetry: () => void }) {
  return (
    <div
      className="rounded-xl border p-6 flex flex-col sm:flex-row gap-4 items-start"
      style={{ borderColor: tileBorder("amber"), background: tileTint("amber", 8) }}
    >
      <div
        className="flex items-center justify-center h-11 w-11 rounded-xl flex-shrink-0"
        style={{ background: tileTint("amber"), color: accentText(TILE_COLOR.amber, 75) }}
      >
        <TriangleAlert className="h-5 w-5" />
      </div>
      <div className="flex-1">
        <h3 className="text-[17px] font-semibold text-foreground">No pudimos cargar los canales</h3>
        <p className="mt-1 text-[15px] text-muted-foreground leading-relaxed max-w-[560px]">
          Puede ser tu conexión o una caída momentánea. Vuelve a intentar en un segundo. Si sigue
          igual, escríbenos a <span className="font-semibold">hola@aviatory.app</span>.
        </p>
        <button
          type="button"
          onClick={onRetry}
          className="mt-3 inline-flex items-center gap-1.5 h-9 px-3.5 rounded-full border border-border bg-background text-[13px] font-semibold text-foreground hover:bg-muted transition-colors"
        >
          <RotateCw className="h-3.5 w-3.5" /> Reintentar
        </button>
      </div>
    </div>
  )
}

function NoChannelsYet() {
  return (
    <div className="rounded-xl surface p-8 text-center">
      <div
        className="inline-flex items-center justify-center h-12 w-12 rounded-xl mb-3"
        style={{ background: tileTint("blue"), color: accentText(TILE_COLOR.blue, 75) }}
      >
        <Hash className="h-6 w-6" />
      </div>
      <h3 className="text-[17px] font-semibold text-foreground">Los canales abren pronto</h3>
      <p className="mt-1 text-[15px] text-muted-foreground max-w-sm mx-auto leading-relaxed">
        Estamos armando los espacios por etapa, materia y aerolínea. Cuando abran, los vas a ver aquí
        y vas a poder escribir de inmediato.
      </p>
    </div>
  )
}
