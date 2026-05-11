import { useEffect, useRef, useState, type FormEvent } from "react"
import { Link } from "react-router-dom"
import { Send, X, ThumbsUp, ThumbsDown, Sparkles, AlertCircle, Crown } from "lucide-react"
import { LogoIsotype } from "@/components/Logo"
import { Button } from "@/components/ui/button"
import type { WingmanMessage, WingmanState } from "@/hooks/useWingman"

interface Props {
  state: WingmanState
  usage: number | null
  isPro: boolean
  freeLimit: number
  onClose: () => void
  onSend: (text?: string) => void | Promise<void>
  onFeedback: (msg: WingmanMessage, value: "thumbs_up" | "thumbs_down") => void | Promise<void>
}

export function WingmanPanel({
  state,
  usage,
  isPro,
  freeLimit,
  onClose,
  onSend,
  onFeedback,
}: Props) {
  const [input, setInput] = useState("")
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const autoSentRef = useRef(false)

  // Auto-scroll on new message
  useEffect(() => {
    if (!scrollRef.current) return
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [state.messages])

  // First open with context → auto-send to get the explanation
  useEffect(() => {
    if (!state.isOpen) {
      autoSentRef.current = false
      return
    }
    if (
      state.isOpen &&
      state.context &&
      state.messages.length === 0 &&
      !state.sending &&
      !autoSentRef.current
    ) {
      autoSentRef.current = true
      onSend()
    }
  }, [state.isOpen, state.context, state.messages.length, state.sending, onSend])

  // ESC to close
  useEffect(() => {
    if (!state.isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [state.isOpen, onClose])

  if (!state.isOpen) return null

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!input.trim() || state.sending) return
    onSend(input.trim())
    setInput("")
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-background/60 backdrop-blur-sm animate-in fade-in duration-150"
        onClick={onClose}
        aria-hidden
      />

      {/* Panel */}
      <aside
        className="fixed inset-y-0 right-0 z-50 w-full sm:w-[440px] bg-card border-l border-border/60 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300"
        role="dialog"
        aria-label="Wingman, tu copiloto IA"
      >
        {/* Header */}
        <header className="flex items-center gap-3 px-5 py-4 border-b border-border/40">
          <div className="relative">
            <LogoIsotype variant="color" className="h-9 w-9 rounded-lg shadow-md" />
            <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-green-500 ring-2 ring-card" />
          </div>
          <div className="flex-1">
            <h2 className="text-base font-semibold leading-tight">Wingman</h2>
            <p className="text-xs text-muted-foreground">Tu copiloto IA en aeronáutica</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 -mr-2 text-muted-foreground hover:text-foreground rounded-md hover:bg-muted transition-colors"
            aria-label="Cerrar Wingman"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        {/* Messages */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto px-5 py-4 space-y-4 bg-gradient-to-b from-blue-50/30 to-background dark:from-blue-950/20"
        >
          {state.messages.length === 0 && !state.sending && state.bannerError === null && (
            <EmptyState />
          )}

          {state.bannerError && <BannerError message={state.bannerError} isPro={isPro} />}

          {state.messages.map((m) => (
            <MessageBubble
              key={m.id}
              message={m}
              onFeedback={(value) => onFeedback(m, value)}
            />
          ))}
        </div>

        {/* Footer: usage indicator + input */}
        <div className="border-t border-border/40 bg-background">
          {!isPro && usage !== null && (
            <div className="px-5 pt-3 pb-1 flex items-center justify-between text-xs">
              <span className="text-muted-foreground">
                {usage}/{freeLimit} explicaciones gratis este mes
              </span>
              {usage >= Math.max(freeLimit - 2, 0) && (
                <Link
                  to="/pricing"
                  className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline font-medium"
                >
                  <Crown className="h-3 w-3" />
                  Upgradeá a Pro
                </Link>
              )}
            </div>
          )}
          {isPro && (
            <div className="px-5 pt-3 pb-1 flex items-center gap-1.5 text-xs text-blue-600 dark:text-blue-400">
              <Crown className="h-3 w-3" />
              Pro · explicaciones ilimitadas
            </div>
          )}

          <form onSubmit={handleSubmit} className="p-3 flex items-end gap-2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  handleSubmit(e as unknown as FormEvent)
                }
              }}
              rows={1}
              placeholder="Preguntale algo a Wingman…"
              disabled={state.sending || state.bannerError !== null}
              className="flex-1 resize-none rounded-2xl border border-border/60 bg-card px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 disabled:opacity-50"
            />
            <Button
              type="submit"
              size="icon-lg"
              disabled={
                state.sending || !input.trim() || state.bannerError !== null
              }
              className="btn-apple rounded-full h-11 w-11 border-0 disabled:opacity-40"
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </aside>
    </>
  )
}

function EmptyState() {
  return (
    <div className="text-center py-8">
      <div className="inline-flex items-center justify-center h-12 w-12 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-lg shadow-blue-500/30 mb-4">
        <Sparkles className="h-6 w-6" />
      </div>
      <h3 className="text-base font-semibold">Wingman te está escuchando</h3>
      <p className="mt-1 text-sm text-muted-foreground max-w-xs mx-auto">
        Preguntale lo que sea sobre la materia que estás estudiando. Te explica
        en español y en aviador.
      </p>
    </div>
  )
}

function BannerError({ message, isPro }: { message: string; isPro: boolean }) {
  const isLimit = message.toLowerCase().includes("límite")
  return (
    <div
      className={`rounded-2xl border p-4 ${
        isLimit
          ? "border-blue-500/30 bg-blue-50 dark:bg-blue-950/30"
          : "border-amber-500/30 bg-amber-50 dark:bg-amber-950/30"
      }`}
    >
      <div className="flex items-start gap-3">
        <AlertCircle
          className={`h-5 w-5 flex-shrink-0 ${
            isLimit ? "text-blue-600 dark:text-blue-400" : "text-amber-600 dark:text-amber-400"
          }`}
        />
        <div>
          <p className="text-sm leading-relaxed">{message}</p>
          {isLimit && !isPro && (
            <Link
              to="/pricing"
              className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline"
            >
              <Crown className="h-3 w-3" /> Upgradeá a Pro
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

function MessageBubble({
  message,
  onFeedback,
}: {
  message: WingmanMessage
  onFeedback: (v: "thumbs_up" | "thumbs_down") => void
}) {
  const isUser = message.role === "user"

  if (isUser) {
    return (
      <div className="flex justify-end">
        <div className="max-w-[85%] rounded-2xl rounded-tr-md bg-blue-600 text-white px-4 py-2.5 text-sm leading-relaxed shadow-sm">
          {message.content || "—"}
        </div>
      </div>
    )
  }

  if (message.pending) {
    return (
      <div className="flex justify-start">
        <div className="max-w-[85%] rounded-2xl rounded-tl-md bg-card border border-border/40 px-4 py-3">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-blue-500 animate-bounce [animation-delay:-0.3s]" />
            <span className="h-2 w-2 rounded-full bg-blue-500 animate-bounce [animation-delay:-0.15s]" />
            <span className="h-2 w-2 rounded-full bg-blue-500 animate-bounce" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex justify-start">
      <div className="max-w-[90%] space-y-2">
        <div
          className={`rounded-2xl rounded-tl-md border px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
            message.error
              ? "border-red-300 bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-300"
              : "border-border/40 bg-card"
          }`}
        >
          {message.content}
        </div>
        {!message.error && (
          <div className="flex items-center gap-1 pl-1">
            <button
              type="button"
              onClick={() => onFeedback("thumbs_up")}
              className={`p-1.5 rounded-md transition-colors ${
                message.feedback === "thumbs_up"
                  ? "bg-green-100 dark:bg-green-950/40 text-green-700 dark:text-green-300"
                  : "text-muted-foreground hover:bg-muted"
              }`}
              aria-label="Útil"
            >
              <ThumbsUp className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={() => onFeedback("thumbs_down")}
              className={`p-1.5 rounded-md transition-colors ${
                message.feedback === "thumbs_down"
                  ? "bg-red-100 dark:bg-red-950/40 text-red-700 dark:text-red-300"
                  : "text-muted-foreground hover:bg-muted"
              }`}
              aria-label="No útil"
            >
              <ThumbsDown className="h-3.5 w-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
