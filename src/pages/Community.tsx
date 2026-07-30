import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { Hash, ArrowRight, Check, MessageSquare, Users, TriangleAlert, RotateCw } from "lucide-react"
import { supabase } from "@/integrations/supabase/client"
import { AppLayout } from "@/components/layout/AppLayout"
import { TILE_COLOR, tileTint, tileBorder, type TileColorKey } from "@/lib/tileColors"
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
 * Muestra de mensajes que traemos para calcular señal de actividad por canal.
 * Con el volumen actual entra completa; si algún día se supera, el conteo se
 * muestra igual porque siempre es "al menos esto", nunca un número inventado.
 */
const MESSAGE_SAMPLE = 2000

const GROUP_LABELS: Record<Channel["type"], { title: string; description: string }> = {
  general: { title: "General", description: "Conversación abierta, logros, dudas y oportunidades" },
  stage: { title: "Por etapa", description: "Encuentra pilotos en tu mismo momento de carrera" },
  subject: { title: "Por materia", description: "Dudas técnicas con foco en una materia" },
  airline: { title: "Por aerolínea", description: "Preparación específica para postular a una aerolínea" },
}

const GROUP_ORDER: Channel["type"][] = ["general", "stage", "subject", "airline"]

const AIRLINE_TILE_KEYS: TileColorKey[] = ["blue", "cyan", "violet", "amber", "green", "red"]

/** Color estable por canal (sin azar en render): depende solo del slug. */
function airlineTileKey(slug: string): TileColorKey {
  let sum = 0
  for (let i = 0; i < slug.length; i += 1) sum += slug.charCodeAt(i)
  return AIRLINE_TILE_KEYS[sum % AIRLINE_TILE_KEYS.length]
}

/** Iniciales de la aerolínea para el tile (reemplaza los emojis de bandera). */
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
  const [channels, setChannels] = useState<Channel[]>([])
  const [activity, setActivity] = useState<Record<number, ChannelActivity>>({})
  const [loading, setLoading] = useState(true)
  const [failed, setFailed] = useState(false)
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    let cancelled = false

    async function load() {
      setLoading(true)
      setFailed(false)
      const [channelsRes, messagesRes] = await Promise.all([
        supabase.from("community_channels").select("*").order("order_index"),
        supabase
          .from("community_messages")
          .select("channel_id, created_at")
          .order("created_at", { ascending: false })
          .limit(MESSAGE_SAMPLE),
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
  }, [reloadKey])

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

  /** Cada grupo ordenado por actividad real: primero lo que se movió último. */
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
            const msgs = (actB?.messages ?? 0) - (actA?.messages ?? 0)
            if (msgs !== 0) return msgs
            return a.order_index - b.order_index
          }),
      })).filter((g) => g.list.length > 0),
    [channels, activity]
  )

  return (
    <AppLayout>
      <div className="px-4 sm:px-7 py-6 sm:py-8 pb-12 max-w-[1280px] mx-auto">
        {/* Hero de módulo, como el de ICAO y el dashboard: la comunidad era la
            única sección grande sin identidad propia. Las cifras son reales:
            canales publicados y mensajes de la muestra reciente. */}
        <section className="relative overflow-hidden rounded-xl mb-7">
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
              Pilotos LATAM organizados por etapa, materia y aerolínea. Entra a un canal para escribir.
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
          </div>
        </section>

        {loading ? (
          <div className="space-y-6 animate-pulse">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <div className="h-6 w-40 bg-muted rounded" />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  <div className="h-24 bg-muted rounded-xl" />
                  <div className="h-24 bg-muted rounded-xl" />
                  <div className="h-24 bg-muted rounded-xl" />
                </div>
              </div>
            ))}
          </div>
        ) : failed ? (
          <LoadFailed onRetry={() => setReloadKey((k) => k + 1)} />
        ) : totalChannels === 0 ? (
          <NoChannelsYet />
        ) : (
          <div className="space-y-9">
            {groups.map(({ type, list }) => {
              const meta = GROUP_LABELS[type]
              return (
                <section key={type}>
                  <div className="mb-3.5">
                    <div
                      className="inline-flex items-center gap-1.5 text-[13px] font-semibold"
                      style={{ color: "var(--av-blue-500)" }}
                    >
                      <Hash className="h-[11px] w-[11px]" />
                      {list.length === 1 ? "1 canal" : `${list.length} canales`}
                    </div>
                    <h2 className="mt-0.5 text-[17px] font-semibold text-foreground tracking-[-0.02em]">
                      {meta.title}
                    </h2>
                    <p className="text-[12px] text-muted-foreground mt-0.5">{meta.description}</p>
                  </div>
                  <div className="stagger grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {list.map((c) => (
                      <ChannelCard key={c.id} channel={c} activity={activity[c.id]} />
                    ))}
                  </div>
                </section>
              )
            })}
          </div>
        )}

        <div className="mt-8 rounded-xl surface p-5 flex gap-3 items-start">
          <Check
            className="h-5 w-5 flex-shrink-0 mt-0.5"
            style={{ color: "var(--av-blue-500)" }}
          />
          <div>
            <h3 className="text-[15px] font-semibold text-foreground">Normas de la comunidad</h3>
            <p className="mt-1 text-[15px] text-muted-foreground leading-relaxed">
              Tono respetuoso y profesional. No compartas preguntas literales de exámenes ni contenido pirata.
              Si necesitas moderación, escríbenos a <span className="font-semibold">hola@aviatory.app</span>.
            </p>
          </div>
        </div>
      </div>
    </AppLayout>
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
        style={{ background: tileTint("amber"), color: TILE_COLOR.amber }}
      >
        <TriangleAlert className="h-5 w-5" />
      </div>
      <div className="flex-1">
        <h3 className="text-[17px] font-semibold text-foreground">No pudimos cargar los canales</h3>
        <p className="mt-1 text-[15px] text-muted-foreground leading-relaxed max-w-[560px]">
          Puede ser tu conexión o una caída momentánea. Vuelve a intentar en un segundo. Si sigue igual,
          escríbenos a <span className="font-semibold">hola@aviatory.app</span>.
        </p>
        <button
          type="button"
          onClick={onRetry}
          className="mt-3 inline-flex items-center gap-1.5 h-9 px-3.5 rounded-lg border border-border bg-background text-[13px] font-semibold text-foreground hover:bg-muted transition-colors"
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
        style={{ background: tileTint("blue"), color: TILE_COLOR.blue }}
      >
        <Hash className="h-6 w-6" />
      </div>
      <h3 className="text-[17px] font-semibold text-foreground">Los canales abren pronto</h3>
      <p className="mt-1 text-[15px] text-muted-foreground max-w-sm mx-auto leading-relaxed">
        Estamos armando los espacios por etapa, materia y aerolínea. Cuando abran, los vas a ver aquí y vas
        a poder escribir de inmediato.
      </p>
    </div>
  )
}

function ChannelCard({ channel, activity }: { channel: Channel; activity: ChannelActivity | undefined }) {
  const isAirline = channel.type === "airline"
  const tileKey = airlineTileKey(channel.slug)

  return (
    <Link
      to={`/app/comunidad/${channel.slug}`}
      className="surface-lift group block rounded-xl surface p-4"
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "color-mix(in oklab, var(--av-blue-500) 50%, transparent)"
        e.currentTarget.style.boxShadow = "0 4px 16px color-mix(in oklab, var(--av-blue-500) 18%, transparent)"
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--border)"
        e.currentTarget.style.boxShadow = "none"
      }}
    >
      <div className="flex items-start gap-3">
        {isAirline ? (
          <div
            className="flex-shrink-0 flex items-center justify-center h-9 w-9 rounded-lg text-[13px] font-semibold tracking-[0.02em]"
            style={{
              background: tileTint(tileKey),
              border: `1px solid ${tileBorder(tileKey)}`,
              color: TILE_COLOR[tileKey],
            }}
            aria-hidden
          >
            {airlineInitials(channel.name)}
          </div>
        ) : (
          <div className="flex-shrink-0 text-[24px] leading-9" aria-hidden>
            {channel.emoji ?? "#"}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <Hash className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
            <h3 className="font-semibold text-[15px] truncate text-foreground">{channel.name}</h3>
          </div>
          {channel.description && (
            <p className="mt-1 text-[12px] text-muted-foreground leading-relaxed line-clamp-2">
              {channel.description}
            </p>
          )}

          <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1.5">
            {activity ? (
              <>
                <span className="inline-flex items-center gap-1 text-[12px] font-semibold text-muted-foreground">
                  <MessageSquare className="h-3 w-3" />
                  {activity.messages === 1 ? "1 mensaje" : `${activity.messages} mensajes`}
                </span>
                <span className="text-[12px] text-muted-foreground">
                  {relativeTime(activity.lastAt)}
                </span>
              </>
            ) : (
              <span className="chip chip-cyan">Sé el primero</span>
            )}
            {channel.member_count > 0 && (
              <span className="inline-flex items-center gap-1 text-[12px] font-semibold text-muted-foreground">
                <Users className="h-3 w-3" />
                {channel.member_count}
              </span>
            )}
          </div>

          <div
            className="mt-3 inline-flex items-center gap-1 text-[13px] font-semibold"
            style={{ color: "var(--av-blue-500)" }}
          >
            {activity ? "Entrar al canal" : "Abrir la conversación"} <ArrowRight className="h-3 w-3" />
          </div>
        </div>
      </div>
    </Link>
  )
}
