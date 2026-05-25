import { useEffect, useRef, useState } from "react"
import { X, Send } from "lucide-react"

interface Message {
  role: "user" | "assistant"
  text: string
  typing?: boolean
}

/**
 * Floating Wingman AI assistant.
 * Bottom-right cyan-glow button with radar pulse. Click to open chat panel.
 *
 * TODO when integrating: replace the mocked `setTimeout` reply with a call to your
 *   `useWingman()` hook / Supabase RPC. The component is intentionally dumb about
 *   transport — it just renders messages and emits user input via `onSend`.
 */
export function Wingman() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: "Hola Capitán 👋 Estuve revisando tus quizzes. ¿En qué te ayudo hoy?",
    },
  ])
  const [input, setInput] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [messages, open])

  function send() {
    const text = input.trim()
    if (!text) return
    setMessages((m) => [...m, { role: "user", text }])
    setInput("")
    setMessages((m) => [...m, { role: "assistant", text: "…", typing: true }])
    // MOCK reply — replace with your real call to Wingman
    setTimeout(() => {
      setMessages((m) => {
        const next = [...m]
        next[next.length - 1] = {
          role: "assistant",
          text:
            "Para vientos cruzados en aproximación, descomponé el viento en componente lateral y de frente. Si la lateral excede el límite del POH, no aterricés. Para C172 el límite demostrado es 15 nudos.",
        }
        return next
      })
    }, 1200)
  }

  return (
    <>
      {/* Floating button */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Cerrar Wingman" : "Abrir Wingman"}
        className="fixed bottom-6 right-6 z-50 w-[60px] h-[60px] rounded-full border-0 cursor-pointer text-white flex items-center justify-center transition-transform duration-200 hover:scale-105"
        style={{
          background:
            "linear-gradient(135deg, var(--av-cyan-300) 0%, var(--av-blue-500) 60%, var(--av-navy-900) 100%)",
          boxShadow:
            "0 16px 40px -8px oklch(0.55 0.22 264 / 60%), inset 0 1px 0 rgb(255 255 255 / 25%), 0 0 0 1px oklch(0.78 0.16 215 / 40%)",
        }}
      >
        {/* Radar pulse */}
        <span className="radar-pulse" />
        <span className="radar-pulse radar-pulse-delay" />
        {open ? (
          <X size={22} />
        ) : (
          <svg viewBox="0 0 24 24" width={26} height={26} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 6 L7 18 L12 9 L17 18 L21 6" />
            <circle cx={12} cy={5} r={1.2} fill="currentColor" />
          </svg>
        )}
      </button>

      {open && (
        <>
          <div
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40"
            aria-hidden
          />
          <div
            className="anim-scale-in fixed bottom-[100px] right-6 z-50 w-[400px] h-[540px] flex flex-col overflow-hidden bg-card border border-border rounded-[20px]"
            style={{
              boxShadow: "0 32px 64px -12px rgb(15 22 41 / 30%), 0 0 0 1px var(--border)",
              transformOrigin: "bottom right",
            }}
          >
            {/* Header */}
            <div
              className="relative px-[18px] py-4 border-b border-border text-white overflow-hidden"
              style={{
                background: "linear-gradient(180deg, var(--av-navy-900) 0%, var(--av-navy-950) 100%)",
              }}
            >
              <div className="cockpit-grid absolute inset-0 opacity-30" />
              <div className="relative flex items-center gap-3">
                <div
                  className="flex items-center justify-center"
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 10,
                    background:
                      "linear-gradient(135deg, var(--av-cyan-300), var(--av-blue-500))",
                    boxShadow:
                      "0 0 0 3px oklch(0.78 0.16 215 / 25%), 0 8px 20px -8px oklch(0.78 0.16 215 / 60%)",
                  }}
                >
                  <svg viewBox="0 0 24 24" width={20} height={20} fill="white">
                    <path d="M3 6 L7 18 L12 9 L17 18 L21 6 L17 14 L12 5 L7 14 Z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="font-bold text-[15px] tracking-[-0.02em]">Wingman</div>
                  <div
                    className="mono text-[11px] flex items-center gap-1"
                    style={{ color: "var(--av-cyan-300)" }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{
                        background: "var(--av-green-400)",
                        boxShadow: "0 0 6px var(--av-green-400)",
                      }}
                    />
                    Online · GPT-aviation
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="w-7 h-7 rounded-md flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10"
                  aria-label="Cerrar"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 flex flex-col gap-3"
            >
              {messages.map((m, i) => (
                <Bubble key={i} m={m} />
              ))}
            </div>

            {/* Suggestions */}
            <div className="px-4 pb-3 flex gap-1.5 flex-wrap">
              {["¿Por qué fallé esta pregunta?", "Resumime Meteorología", "Practiquemos ICAO 4 → 5"].map((q) => (
                <button
                  key={q}
                  type="button"
                  className="chip cursor-pointer h-6 text-[11px] font-medium"
                  onClick={() => setInput(q)}
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="p-3.5 border-t border-border flex gap-2 items-center bg-muted/30">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") send()
                }}
                placeholder="Preguntale a Wingman…"
                className="flex-1 h-[38px] px-3.5 rounded-lg border border-border bg-background outline-none text-foreground text-[13px]"
              />
              <button
                type="button"
                onClick={send}
                className="w-[38px] h-[38px] flex items-center justify-center rounded-lg text-white border-0 cursor-pointer"
                style={{
                  background:
                    "linear-gradient(180deg, var(--av-blue-400) 0%, var(--av-blue-500) 100%)",
                  boxShadow:
                    "0 1px 0 rgb(255 255 255 / 18%) inset, 0 8px 20px -6px oklch(0.55 0.22 264 / 45%)",
                }}
                aria-label="Enviar"
              >
                <Send size={14} />
              </button>
            </div>
          </div>
        </>
      )}
    </>
  )
}

function Bubble({ m }: { m: Message }) {
  if (m.role === "user") {
    return (
      <div className="flex justify-end">
        <div
          className="max-w-[85%] px-3.5 py-2.5 text-white text-[13px] leading-relaxed"
          style={{
            background: "linear-gradient(135deg, var(--av-blue-400), var(--av-blue-500))",
            borderRadius: "14px 14px 4px 14px",
            boxShadow: "0 4px 12px -4px oklch(0.55 0.22 264 / 30%)",
          }}
        >
          {m.text}
        </div>
      </div>
    )
  }
  return (
    <div className="flex gap-2.5">
      <div
        className="flex-shrink-0 w-7 h-7 flex items-center justify-center"
        style={{
          borderRadius: 8,
          background: "linear-gradient(135deg, var(--av-cyan-300), var(--av-blue-500))",
        }}
      >
        <svg viewBox="0 0 24 24" width={14} height={14} fill="white">
          <path d="M3 6 L7 18 L12 9 L17 18 L21 6 L17 14 L12 5 L7 14 Z" />
        </svg>
      </div>
      <div
        className="max-w-[85%] px-3.5 py-2.5 text-foreground text-[13px] leading-relaxed bg-muted/50 border border-border"
        style={{ borderRadius: "14px 14px 14px 4px" }}
      >
        {m.typing ? <TypingDots /> : m.text}
      </div>
    </div>
  )
}

function TypingDots() {
  return (
    <span className="inline-flex gap-1 py-1">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-muted-foreground"
          style={{ animation: `pulse 1.2s ${i * 150}ms infinite alternate` }}
        />
      ))}
    </span>
  )
}
