import { useCallback, useEffect, useRef, useState, type FormEvent } from "react"
import { Link, useParams } from "react-router-dom"
import { ArrowLeft, Hash, Send, Smile, Flame } from "lucide-react"
import { toast } from "sonner"
import { supabase } from "@/integrations/supabase/client"
import { useSession } from "@/hooks/useSession"
import { AppLayout } from "@/components/layout/AppLayout"
import { Button } from "@/components/ui/button"
import { UserAvatar } from "@/components/UserAvatar"

interface Channel {
  id: number
  slug: string
  name: string
  description: string | null
  emoji: string | null
}

interface ProfileLite {
  id: string
  username: string | null
  full_name?: string | null
  photo_url: string | null
}

interface StreakLite {
  user_id: string
  current_streak: number
}

interface Reaction {
  message_id: number
  user_id: string
  emoji: string
}

interface Message {
  id: number
  channel_id: number
  user_id: string
  content: string
  edited_at: string | null
  created_at: string
}

const REACTION_PALETTE = ["👍", "✈️", "🔥", "🎓", "👏", "💪"]

export function CommunityChannel() {
  const { slug } = useParams<{ slug: string }>()
  const { user } = useSession()
  const [channel, setChannel] = useState<Channel | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [profiles, setProfiles] = useState<Record<string, ProfileLite>>({})
  const [streaks, setStreaks] = useState<Record<string, number>>({})
  const [reactions, setReactions] = useState<Reaction[]>([])
  const [input, setInput] = useState("")
  const [sending, setSending] = useState(false)
  const [loading, setLoading] = useState(true)
  const [reactionMenuFor, setReactionMenuFor] = useState<number | null>(null)
  const scrollRef = useRef<HTMLDivElement | null>(null)

  // ---- Load channel + initial messages
  useEffect(() => {
    if (!slug) return
    let cancelled = false
    async function load() {
      try {
        const { data: ch, error: chErr } = await supabase
          .from("community_channels")
          .select("*")
          .eq("slug", slug!)
          .single()
        if (chErr) throw chErr
        if (cancelled) return
        setChannel(ch as Channel)
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

  // ---- Initial fetch + Realtime subscription
  const fetchMessages = useCallback(async () => {
    if (!channel) return
    const { data, error } = await supabase
      .from("community_messages")
      .select("*")
      .eq("channel_id", channel.id)
      .order("created_at", { ascending: true })
      .limit(200)
    if (error) return
    setMessages((data ?? []) as Message[])
  }, [channel])

  useEffect(() => {
    if (!channel) return
    fetchMessages()

    // Realtime: nuevos mensajes en este canal
    const rt = supabase
      .channel(`channel-${channel.id}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "community_messages",
          filter: `channel_id=eq.${channel.id}`,
        },
        (payload) => {
          const m = payload.new as Message
          // Skip si ya está (optimistic UI ya lo agregó)
          setMessages((prev) =>
            prev.some((x) => x.id === m.id) ? prev : [...prev, m]
          )
        }
      )
      .on(
        "postgres_changes",
        {
          event: "DELETE",
          schema: "public",
          table: "community_messages",
          filter: `channel_id=eq.${channel.id}`,
        },
        (payload) => {
          const oldId = (payload.old as { id: number }).id
          setMessages((prev) => prev.filter((m) => m.id !== oldId))
        }
      )
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "community_reactions",
        },
        (payload) => {
          const r = payload.new as Reaction
          setReactions((prev) =>
            prev.some(
              (x) =>
                x.message_id === r.message_id &&
                x.user_id === r.user_id &&
                x.emoji === r.emoji
            )
              ? prev
              : [...prev, r]
          )
        }
      )
      .on(
        "postgres_changes",
        {
          event: "DELETE",
          schema: "public",
          table: "community_reactions",
        },
        (payload) => {
          const o = payload.old as Reaction
          setReactions((prev) =>
            prev.filter(
              (r) =>
                !(
                  r.message_id === o.message_id &&
                  r.user_id === o.user_id &&
                  r.emoji === o.emoji
                )
            )
          )
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(rt)
    }
  }, [channel, fetchMessages])

  // ---- Fetch profile + streak data for users in messages
  useEffect(() => {
    const userIds = Array.from(new Set(messages.map((m) => m.user_id)))
    const missingProfiles = userIds.filter((id) => !profiles[id])
    const missingStreaks = userIds.filter((id) => streaks[id] === undefined)

    if (missingProfiles.length > 0) {
      supabase
        .rpc("get_profile_avatars", { p_user_ids: missingProfiles })
        .then(({ data }) => {
          if (!data) return
          setProfiles((prev) => {
            const next = { ...prev }
            for (const p of data as ProfileLite[]) next[p.id] = p
            return next
          })
        })
    }
    if (missingStreaks.length > 0) {
      supabase
        .from("streaks")
        .select("user_id, current_streak")
        .in("user_id", missingStreaks)
        .then(({ data }) => {
          if (!data) return
          setStreaks((prev) => {
            const next = { ...prev }
            for (const s of data as StreakLite[]) next[s.user_id] = s.current_streak
            return next
          })
        })
    }
  }, [messages, profiles, streaks])

  // ---- Fetch reactions for messages
  useEffect(() => {
    if (messages.length === 0) {
      setReactions([])
      return
    }
    const ids = messages.map((m) => m.id)
    supabase
      .from("community_reactions")
      .select("*")
      .in("message_id", ids)
      .then(({ data }) => {
        setReactions((data ?? []) as Reaction[])
      })
  }, [messages])

  // ---- Auto-scroll to bottom on new messages
  useEffect(() => {
    if (!scrollRef.current) return
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [messages.length])

  async function handleSend(e: FormEvent) {
    e.preventDefault()
    const text = input.trim()
    if (!text || !channel || !user || sending) return
    setSending(true)
    const optimisticId = -Date.now()
    const optimistic: Message = {
      id: optimisticId,
      channel_id: channel.id,
      user_id: user.id,
      content: text,
      edited_at: null,
      created_at: new Date().toISOString(),
    }
    setMessages((prev) => [...prev, optimistic])
    setInput("")

    const { error, data } = await supabase
      .from("community_messages")
      .insert({ channel_id: channel.id, user_id: user.id, content: text })
      .select("*")
      .single()

    setSending(false)
    if (error) {
      setMessages((prev) => prev.filter((m) => m.id !== optimisticId))
      toast.error(error.message)
    } else if (data) {
      setMessages((prev) =>
        prev.map((m) => (m.id === optimisticId ? (data as Message) : m))
      )
    }
  }

  async function toggleReaction(messageId: number, emoji: string) {
    if (!user) return
    const existing = reactions.find(
      (r) => r.message_id === messageId && r.user_id === user.id && r.emoji === emoji
    )
    if (existing) {
      setReactions((prev) =>
        prev.filter(
          (r) =>
            !(r.message_id === messageId && r.user_id === user.id && r.emoji === emoji)
        )
      )
      await supabase
        .from("community_reactions")
        .delete()
        .eq("message_id", messageId)
        .eq("user_id", user.id)
        .eq("emoji", emoji)
    } else {
      const optimistic: Reaction = { message_id: messageId, user_id: user.id, emoji }
      setReactions((prev) => [...prev, optimistic])
      const { error } = await supabase
        .from("community_reactions")
        .insert({ message_id: messageId, user_id: user.id, emoji })
      if (error) {
        setReactions((prev) =>
          prev.filter(
            (r) =>
              !(r.message_id === messageId && r.user_id === user.id && r.emoji === emoji)
          )
        )
      }
    }
    setReactionMenuFor(null)
  }

  if (loading) {
    return (
      <AppLayout>
        <div className="p-8 animate-pulse">
          <div className="h-8 w-48 bg-muted rounded mb-4" />
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-16 bg-muted rounded-xl" />
            ))}
          </div>
        </div>
      </AppLayout>
    )
  }

  if (!channel) {
    return (
      <AppLayout>
        <div className="px-6 py-12 text-center">
          <p className="text-muted-foreground">Canal no encontrado.</p>
          <Button asChild variant="outline" className="mt-4 rounded-full">
            <Link to="/app/comunidad">Volver a comunidad</Link>
          </Button>
        </div>
      </AppLayout>
    )
  }

  return (
    <AppLayout>
      <div className="flex flex-col h-[calc(100vh-4rem)]">
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
            <span className="text-2xl">{channel.emoji}</span>
            <div className="min-w-0">
              <h1 className="text-lg sm:text-xl font-bold tracking-tight flex items-center gap-1.5 min-w-0">
                <Hash className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <span className="truncate">{channel.name}</span>
              </h1>
              {channel.description && (
                <p className="text-xs text-muted-foreground truncate">
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
          {messages.length === 0 ? (
            <EmptyChannel />
          ) : (
            messages.map((m, i) => {
              const prev = messages[i - 1]
              const sameAuthorAsPrev =
                prev && prev.user_id === m.user_id &&
                new Date(m.created_at).getTime() - new Date(prev.created_at).getTime() < 5 * 60_000
              return (
                <MessageBubble
                  key={m.id}
                  message={m}
                  profile={profiles[m.user_id]}
                  streak={streaks[m.user_id] ?? 0}
                  isOwn={user?.id === m.user_id}
                  compact={!!sameAuthorAsPrev}
                  reactions={reactions.filter((r) => r.message_id === m.id)}
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
        <div className="border-t border-border/40 bg-background">
          <form onSubmit={handleSend} className="px-4 sm:px-6 lg:px-10 py-4 flex items-end gap-2">
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
              className="flex-1 resize-none rounded-2xl border border-border/60 bg-card px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 disabled:opacity-50"
              maxLength={2000}
            />
            <Button
              type="submit"
              size="icon-lg"
              disabled={sending || !input.trim()}
              className="btn-apple rounded-full h-11 w-11 border-0 disabled:opacity-40 flex-shrink-0"
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
          <p className="px-4 sm:px-6 lg:px-10 pb-3 text-xs text-muted-foreground">
            Enter para enviar · Shift+Enter para nueva línea
          </p>
        </div>
      </div>
    </AppLayout>
  )
}

function EmptyChannel() {
  return (
    <div className="text-center py-12">
      <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 mb-4">
        <Hash className="h-7 w-7" />
      </div>
      <h3 className="text-base font-semibold">Sé el primero en escribir</h3>
      <p className="mt-1 text-sm text-muted-foreground max-w-sm mx-auto">
        PresÃ©ntate, haz una pregunta o comparte un avance. Tu mensaje arranca la conversación.
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
  message: Message
  profile: ProfileLite | undefined
  streak: number
  isOwn: boolean
  compact: boolean
  reactions: Reaction[]
  currentUserId: string | undefined
  reactionMenuOpen: boolean
  onToggleReactionMenu: () => void
  onReact: (emoji: string) => void
}) {
  const displayName = profile?.username
    ? `@${profile.username}`
    : profile?.full_name?.split(" ")[0] ?? "anónimo"
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
            fullName={profile?.full_name}
            size="md"
            gradient={isOwn ? "from-blue-500 to-blue-700" : "from-slate-500 to-slate-700"}
            className="!h-9 !w-9 shadow-md"
          />
        )}
      </div>
      <div className="flex-1 min-w-0">
        {!compact && (
          <div className="flex items-baseline gap-2 mb-0.5">
            <span className="text-sm font-semibold">{displayName}</span>
            {streak > 0 && (
              <span className="inline-flex items-center text-xs text-orange-600 dark:text-orange-400">
                <Flame className="h-3 w-3 mr-0.5" />
                {streak}
              </span>
            )}
            {isOwn && (
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider">tú</span>
            )}
            <span className="text-xs text-muted-foreground">{time}</span>
          </div>
        )}
        <div className="relative inline-block max-w-full">
          <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
            {message.content}
          </p>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity inline-flex items-center gap-1 ml-2 align-middle">
            <button
              type="button"
              onClick={onToggleReactionMenu}
              className="p-1 rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              aria-label="Reaccionar"
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
                className="text-base hover:scale-125 transition-transform p-0.5"
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
                className={`inline-flex items-center gap-1 text-xs rounded-full px-2 py-0.5 border transition-colors ${
                  me
                    ? "bg-blue-50 dark:bg-blue-950/40 border-blue-500/40 text-blue-700 dark:text-blue-300"
                    : "bg-muted border-transparent hover:bg-muted/80"
                }`}
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
