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
      state.context.kind !== "general" &&
      state.messages.length === 0 &&
      !state.sending &&
      !autoSentRef.current
    ) {
      // Solo auto-enviamos cuando hay una pregunta concreta que explicar
      // (quiz_explain / study_help). En modo "general" el usuario escribe.
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

  // El panel ocupa toda la pantalla en móvil: si el body sigue scrolleando
  // detrás, el chat se mueve al hacer scroll. Lo bloqueamos mientras está
  // abierto (mismo patrón que el Header público).
  useEffect(() => {
    if (!state.isOpen) return
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = ""
    }
  }, [state.isOpen])

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
            <span
              className="absolute -top-1 -right-1 h-3 w-3 rounded-full ring-2 ring-card"
              style={{ background: "var(--av-green-400)" }}
            />
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
          className="flex-1 overflow-y-auto px-5 py-4 space-y-4"
          style={{
            background:
              "linear-gradient(180deg, color-mix(in oklab, var(--av-blue-500) 7%, var(--background)) 0%, var(--background) 45%)",
          }}
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
                  className="inline-flex items-center gap-1 text-primary hover:underline font-medium"
                >
                  <Crown className="h-3 w-3" />
                  Pasa a Pro
                </Link>
              )}
            </div>
          )}
          {isPro && (
            <div className="px-5 pt-3 pb-1 flex items-center gap-1.5 text-xs text-primary">
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
              placeholder="Pregúntale algo a Wingman…"
              aria-label="Mensaje para Wingman"
              disabled={state.sending || state.bannerError !== null}
              className="flex-1 resize-none rounded-2xl border border-border/60 bg-card px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 disabled:opacity-50"
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
      {/* Mismo azul que el launcher que abre el panel */}
      <div
        className="inline-flex items-center justify-center h-12 w-12 rounded-2xl text-white mb-4"
        style={{
          background:
            "linear-gradient(135deg, var(--av-cyan-300) 0%, var(--av-blue-500) 60%, var(--av-navy-900) 100%)",
          boxShadow: "0 12px 28px -10px oklch(0.55 0.22 264 / 55%)",
        }}
      >
        <Sparkles className="h-6 w-6" />
      </div>
      <h3 className="text-base font-semibold">Wingman te está escuchando</h3>
      <p className="mt-1 text-sm text-muted-foreground max-w-xs mx-auto">
        Pregúntale lo que sea sobre la materia que estás estudiando. Te explica
        en español y en aviador.
      </p>
    </div>
  )
}

function BannerError({ message, isPro }: { message: string; isPro: boolean }) {
  const isLimit = message.toLowerCase().includes("límite")
  const accent = isLimit ? "var(--av-blue-500)" : "var(--av-amber-400)"
  return (
    <div
      className="rounded-2xl border p-4"
      style={{
        borderColor: `color-mix(in oklab, ${accent} 30%, transparent)`,
        background: `color-mix(in oklab, ${accent} 10%, var(--card))`,
      }}
    >
      <div className="flex items-start gap-3">
        <AlertCircle
          className="h-5 w-5 flex-shrink-0"
          style={{ color: isLimit ? "var(--av-blue-500)" : "var(--av-warn-fg)" }}
        />
        <div>
          <p className="text-sm leading-relaxed">{message}</p>
          {isLimit && !isPro && (
            <Link
              to="/pricing"
              className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
            >
              <Crown className="h-3 w-3" /> Pasa a Pro
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
        <div
          className="max-w-[85%] rounded-2xl rounded-tr-md text-white px-4 py-2.5 text-sm leading-relaxed shadow-sm"
          style={{ background: "var(--av-blue-500)" }}
        >
          {message.content || "…"}
        </div>
      </div>
    )
  }

  if (message.pending) {
    return (
      <div className="flex justify-start">
        <div className="max-w-[85%] rounded-2xl rounded-tl-md bg-card border border-border/40 px-4 py-3">
          <div className="flex items-center gap-1.5">
            <span
              className="h-2 w-2 rounded-full animate-bounce [animation-delay:-0.3s]"
              style={{ background: "var(--av-blue-500)" }}
            />
            <span
              className="h-2 w-2 rounded-full animate-bounce [animation-delay:-0.15s]"
              style={{ background: "var(--av-blue-500)" }}
            />
            <span
              className="h-2 w-2 rounded-full animate-bounce"
              style={{ background: "var(--av-blue-500)" }}
            />
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
            message.error ? "" : "border-border/40 bg-card"
          }`}
          style={
            message.error
              ? {
                  borderColor: "color-mix(in oklab, var(--av-red-400) 35%, transparent)",
                  background: "color-mix(in oklab, var(--av-red-400) 10%, var(--card))",
                  color: "var(--av-danger-fg)",
                }
              : undefined
          }
        >
          {message.content}
        </div>
        {!message.error && (
          <div className="flex items-center gap-1 pl-1">
            <button
              type="button"
              onClick={() => onFeedback("thumbs_up")}
              className="p-1.5 rounded-md transition-colors text-muted-foreground hover:bg-muted"
              style={
                message.feedback === "thumbs_up"
                  ? {
                      background: "color-mix(in oklab, var(--av-green-400) 16%, transparent)",
                      color: "var(--av-success-fg)",
                    }
                  : undefined
              }
              aria-label="Útil"
              aria-pressed={message.feedback === "thumbs_up"}
            >
              <ThumbsUp className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={() => onFeedback("thumbs_down")}
              className="p-1.5 rounded-md transition-colors text-muted-foreground hover:bg-muted"
              style={
                message.feedback === "thumbs_down"
                  ? {
                      background: "color-mix(in oklab, var(--av-red-400) 16%, transparent)",
                      color: "var(--av-danger-fg)",
                    }
                  : undefined
              }
              aria-label="No útil"
              aria-pressed={message.feedback === "thumbs_down"}
            >
              <ThumbsDown className="h-3.5 w-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
