import { useEffect, useLayoutEffect, useMemo, useRef, useState, type FormEvent } from "react"
import { Link, useParams } from "react-router-dom"
import { ArrowLeft, Hash, Send, Smile, Flame, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { traerCanalPorSlug, type Channel } from "@/services/comunidad"
import { TILE_COLOR, tileTint, tileBorder, accentText } from "@/lib/tileColors"

import { CHANNEL_ICON, GROUP_META, airlineInitials, airlineTileKey } from "@/lib/communityChannels"
import { useSession } from "@/hooks/useSession"
import { useMensajesCanal, type AutorCanal, type MensajeCanal, type ReaccionCanal } from "@/hooks/useMensajesCanal"
import { Button } from "@/components/ui/button"
import { UserAvatar } from "@/components/UserAvatar"

const REACTION_PALETTE = ["👍", "✈️", "🔥", "🎓", "👏", "💪"]

/** Una sola lista vacía para todo el archivo: creando una nueva en cada render,
 *  cualquier dependencia que la mire se creería que cambió. */
const SIN_REACCIONES: ReaccionCanal[] = []

export function CommunityChannel() {
  const { slug } = useParams<{ slug: string }>()
  const { user } = useSession()
  const [channel, setChannel] = useState<Channel | null>(null)
  const [input, setInput] = useState("")
  const [sending, setSending] = useState(false)
  const [loading, setLoading] = useState(true)
  const [reactionMenuFor, setReactionMenuFor] = useState<number | null>(null)
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const {
    mensajes,
    reacciones,
    autores,
    hayAnteriores,
    cargandoAnteriores,
    cargarAnteriores,
    enviar,
    alternarReaccion,
  } = useMensajesCanal(channel?.id ?? null, user?.id)

  /** Reacciones agrupadas por mensaje: se calcula cuando cambian, no con cada tecla del composer. */
  const reaccionesPorMensaje = useMemo(() => {
    const porMensaje = new Map<number, ReaccionCanal[]>()
    for (const r of reacciones) {
      const lista = porMensaje.get(r.message_id)
      if (lista) lista.push(r)
      else porMensaje.set(r.message_id, [r])
    }
    return porMensaje
  }, [reacciones])

  // ---- Load channel + initial messages
  useEffect(() => {
    if (!slug) return
    let cancelled = false
    async function load() {
      try {
        const ch = await traerCanalPorSlug(slug!)
        if (cancelled) return
        setChannel(ch)
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Canal no encontrado")
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [slug])


  // Al llegar un mensaje nuevo (el último cambia) se baja al final. Al cargar
  // anteriores (cambia el primero) se conserva lo que se estaba leyendo.
  const primerId = mensajes[0]?.id
  const ultimoId = mensajes[mensajes.length - 1]?.id
  const distanciaAlFinal = useRef<number | null>(null)

  useEffect(() => {
    if (!scrollRef.current) return
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [ultimoId])

  useLayoutEffect(() => {
    const el = scrollRef.current
    if (!el || distanciaAlFinal.current === null) return
    el.scrollTop = el.scrollHeight - distanciaAlFinal.current
    distanciaAlFinal.current = null
  }, [primerId])

  async function verAnteriores() {
    const el = scrollRef.current
    distanciaAlFinal.current = el ? el.scrollHeight - el.scrollTop : null
    if (!(await cargarAnteriores())) {
      distanciaAlFinal.current = null
      toast.error("No pudimos traer los mensajes anteriores. Inténtalo de nuevo.")
    }
  }

  async function handleSend(e: FormEvent) {
    e.preventDefault()
    const text = input.trim()
    if (!text || !channel || !user || sending) return
    setSending(true)
    setInput("")
    const error = await enviar(text)
    setSending(false)
    if (error) {
      setInput(text)
      toast.error(error)
    }
  }

  async function toggleReaction(messageId: number, emoji: string) {
    await alternarReaccion(messageId, emoji)
    setReactionMenuFor(null)
  }

  if (loading) {
    return (
      <>
        <div className="p-8 animate-pulse">
          <div className="h-8 w-48 bg-muted rounded mb-4" />
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-16 bg-muted rounded-xl" />
            ))}
          </div>
        </div>
      </>
    )
  }

  if (!channel) {
    return (
      <>
        <div className="px-6 py-12 text-center">
          <p className="text-muted-foreground">Canal no encontrado.</p>
          <Button asChild variant="outline" className="mt-4 rounded-full">
            <Link to="/app/comunidad">Volver a comunidad</Link>
          </Button>
        </div>
      </>
    )
  }

  return (
    <>
      <div className="flex flex-col h-[calc(100dvh-4rem)]">
        {/* Channel header */}
        <header className="px-4 sm:px-6 lg:px-10 py-4 border-b border-border/40 bg-background/80 backdrop-blur flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <Link
              to="/app/comunidad"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Volver a canales"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            {channel.type === "airline" ? (
              <div
                className="flex items-center justify-center h-9 w-9 rounded-lg text-[13px] font-semibold tracking-[0.02em] flex-shrink-0"
                style={{
                  background: tileTint(airlineTileKey(channel.slug)),
                  border: `1px solid ${tileBorder(airlineTileKey(channel.slug))}`,
                  color: accentText(TILE_COLOR[airlineTileKey(channel.slug)], 75),
                }}
                aria-hidden
              >
                {airlineInitials(channel.name)}
              </div>
            ) : (
              (() => {
                const Ic = CHANNEL_ICON[channel.slug] ?? GROUP_META[channel.type].icon
                const color = GROUP_META[channel.type].color
                return (
                  <div
                    className="flex items-center justify-center h-9 w-9 rounded-lg flex-shrink-0"
                    style={{
                      background: tileTint(color, 14),
                      border: `1px solid ${tileBorder(color, 22)}`,
                      color: accentText(TILE_COLOR[color], 75),
                    }}
                    aria-hidden
                  >
                    <Ic className="h-[18px] w-[18px]" />
                  </div>
                )
              })()
            )}
            <div className="min-w-0">
              <h1 className="text-[17px] sm:text-xl font-semibold tracking-tight flex items-center gap-1.5 min-w-0">
                <Hash className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <span className="truncate">{channel.name}</span>
              </h1>
              {channel.description && (
                <p className="text-[12px] text-muted-foreground truncate">
                  {channel.description}
                </p>
              )}
            </div>
          </div>
        </header>

        {/* Messages */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-10 py-6 space-y-3"
        >
          {hayAnteriores && (
            <div className="flex justify-center pb-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="rounded-full"
                onClick={verAnteriores}
                disabled={cargandoAnteriores}
              >
                {cargandoAnteriores && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                Ver mensajes anteriores
              </Button>
            </div>
          )}
          {mensajes.length === 0 ? (
            <EmptyChannel />
          ) : (
            mensajes.map((m, i) => {
              const prev = mensajes[i - 1]
              const sameAuthorAsPrev =
                prev && prev.user_id === m.user_id &&
                new Date(m.created_at).getTime() - new Date(prev.created_at).getTime() < 5 * 60_000
              return (
                <MessageBubble
                  key={m.id}
                  message={m}
                  profile={autores[m.user_id]}
                  streak={autores[m.user_id]?.current_streak ?? 0}
                  isOwn={user?.id === m.user_id}
                  compact={!!sameAuthorAsPrev}
                  reactions={reaccionesPorMensaje.get(m.id) ?? SIN_REACCIONES}
                  currentUserId={user?.id}
                  reactionMenuOpen={reactionMenuFor === m.id}
                  onToggleReactionMenu={() =>
                    setReactionMenuFor((prev) => (prev === m.id ? null : m.id))
                  }
                  onReact={(emoji) => toggleReaction(m.id, emoji)}
                />
              )
            })
          )}
        </div>

        {/* Input */}
        {/* El FAB de Wingman flota fijo abajo a la derecha (60px + 24px de
            margen), así que el composer reserva ese espacio a la derecha para
            que el botón Enviar nunca quede debajo. */}
        <div className="relative z-30 border-t border-border/40 bg-background">
          <form
            onSubmit={handleSend}
            className="px-4 sm:px-6 lg:px-10 py-4 flex items-end gap-2"
          >
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  handleSend(e as unknown as FormEvent)
                }
              }}
              rows={1}
              placeholder={`Mensaje a #${channel.name}`}
              disabled={sending}
              className="flex-1 resize-none rounded-xl border border-border bg-card px-4 py-3 text-[15px] text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 disabled:opacity-50"
              maxLength={2000}
              aria-label={`Escribir mensaje en el canal ${channel.name}`}
            />
            <Button
              type="submit"
              size="icon-lg"
              disabled={sending || !input.trim()}
              className="rounded-full h-11 w-11 border-0 text-white disabled:opacity-40 flex-shrink-0 transition-transform hover:-translate-y-0.5"
              style={{ background: "var(--av-blue-500)" }}
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
          <p className="px-4 sm:px-6 lg:px-10 pb-3 text-[12px] text-muted-foreground">
            Enter para enviar · Shift+Enter para nueva línea
          </p>
        </div>
      </div>
    </>
  )
}

function EmptyChannel() {
  return (
    <div className="text-center py-12">
      <div
        className="inline-flex items-center justify-center h-14 w-14 rounded-2xl mb-4"
        style={{ background: tileTint("blue"), color: TILE_COLOR.blue }}
      >
        <Hash className="h-7 w-7" />
      </div>
      <h3 className="text-[17px] font-semibold text-foreground">Sé el primero en escribir</h3>
      <p className="mt-1 text-[15px] text-muted-foreground max-w-sm mx-auto">
        Preséntate, haz una pregunta o comparte un avance. Tu mensaje arranca la conversación.
      </p>
    </div>
  )
}

function MessageBubble({
  message,
  profile,
  streak,
  isOwn,
  compact,
  reactions,
  currentUserId,
  reactionMenuOpen,
  onToggleReactionMenu,
  onReact,
}: {
  message: MensajeCanal
  profile: AutorCanal | undefined
  streak: number
  isOwn: boolean
  compact: boolean
  reactions: ReaccionCanal[]
  currentUserId: string | undefined
  reactionMenuOpen: boolean
  onToggleReactionMenu: () => void
  onReact: (emoji: string) => void
}) {
  const displayName = profile?.username ? `@${profile.username}` : "anónimo"
  const time = new Date(message.created_at).toLocaleTimeString("es-CO", {
    hour: "2-digit",
    minute: "2-digit",
  })

  // Group reactions by emoji
  const groupedReactions = reactions.reduce<Record<string, { count: number; me: boolean }>>(
    (acc, r) => {
      if (!acc[r.emoji]) acc[r.emoji] = { count: 0, me: false }
      acc[r.emoji].count += 1
      if (r.user_id === currentUserId) acc[r.emoji].me = true
      return acc
    },
    {}
  )

  return (
    <div className={`flex gap-3 group ${compact ? "mt-0.5" : "mt-4"}`}>
      <div className="w-9 flex-shrink-0">
        {!compact && (
          <UserAvatar
            photoUrl={profile?.photo_url}
            username={profile?.username}
            size="md"
            gradient={isOwn ? "from-blue-500 to-blue-700" : "from-slate-500 to-slate-700"}
            className="!h-9 !w-9 shadow-md"
          />
        )}
      </div>
      <div className="flex-1 min-w-0">
        {!compact && (
          <div className="flex items-baseline gap-2 mb-0.5">
            <span className="text-[15px] font-semibold">{displayName}</span>
            {streak > 0 && (
              <span className="chip chip-amber" title={`${streak} días de racha`}>
                <Flame className="h-3 w-3" />
                {streak}
              </span>
            )}
            {isOwn && (
              <span className="text-[12px] text-muted-foreground uppercase tracking-wider">tú</span>
            )}
            <span className="text-[12px] text-muted-foreground">{time}</span>
          </div>
        )}
        <div className="relative inline-block max-w-full">
          <p className="text-[15px] leading-relaxed whitespace-pre-wrap break-words">
            {message.content}
          </p>
          {/* Visible siempre en touch. En desktop aparece con hover o foco, y
              mientras está oculto no recibe clicks (antes dejaba un target
              invisible pegado al mensaje que abría el menú por accidente). */}
          <div className="inline-flex items-center gap-1 ml-2 align-middle transition-opacity opacity-100 md:opacity-0 md:pointer-events-none md:group-hover:opacity-100 md:group-hover:pointer-events-auto md:focus-within:opacity-100 md:focus-within:pointer-events-auto">
            <button
              type="button"
              onClick={onToggleReactionMenu}
              className="p-1 rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              aria-label="Reaccionar a este mensaje"
              aria-expanded={reactionMenuOpen}
            >
              <Smile className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {reactionMenuOpen && (
          <div className="mt-1 inline-flex items-center gap-1 rounded-full border border-border/60 bg-card px-2 py-1 shadow-md">
            {REACTION_PALETTE.map((emoji) => (
              <button
                key={emoji}
                type="button"
                onClick={() => onReact(emoji)}
                className="text-[17px] hover:scale-125 transition-transform p-0.5"
                aria-label={`Reaccionar con ${emoji}`}
              >
                {emoji}
              </button>
            ))}
          </div>
        )}

        {Object.keys(groupedReactions).length > 0 && (
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {Object.entries(groupedReactions).map(([emoji, { count, me }]) => (
              <button
                key={emoji}
                type="button"
                onClick={() => onReact(emoji)}
                className={`chip transition-opacity hover:opacity-80 ${me ? "chip-cyan" : ""}`}
                aria-pressed={me}
                aria-label={`Reaccionar con ${emoji}`}
              >
                <span>{emoji}</span>
                <span className="font-medium">{count}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
