import { useLocation } from "react-router-dom"
import { X } from "lucide-react"
import { useWingman } from "@/hooks/useWingman"
import { WingmanPanel } from "@/components/wingman/WingmanPanel"

/**
 * Floating Wingman launcher (bottom-right) + real AI chat panel.
 *
 * Wired to the real backend: useWingman() → edge function `wingman` (Anthropic).
 * El botón abre el WingmanPanel real. Requiere ANTHROPIC_API_KEY en el proyecto
 * Supabase + `supabase functions deploy wingman` para responder; sin eso el
 * panel muestra un mensaje claro de "no configurado" (degradación elegante).
 */
export function Wingman() {
  const { state, usage, isPro, freeLimit, openWith, close, send, giveFeedback } = useWingman()
  const open = state.isOpen
  const { pathname } = useLocation()

  // El launcher es fixed y vivía en z-50, encima del botón primario de varios
  // modales y del botón Enviar del chat: se robaba el click.
  //
  // El launcher NUNCA se esconde: es el único acceso a Wingman en el chat y en
  // el quiz (ninguna de esas pantallas lo abre por su cuenta), así que
  // esconderlo dejaba al tutor inalcanzable justo donde más se necesita.
  // La solución es subirlo, no quitarlo.
  const inChatThread = /^\/app\/comunidad\/[^/]+/.test(pathname)
  const inQuiz = pathname.includes("/quiz")
  const elevado = inChatThread || inQuiz

  return (
    <>
      {/* Floating launcher */}
      <button
        type="button"
        onClick={() => (open ? close() : openWith({ kind: "general" }))}
        aria-label={open ? "Cerrar Wingman" : "Abrir Wingman"}
        className={`fixed ${elevado ? "bottom-24" : "bottom-6"} right-6 z-40 w-[60px] h-[60px] rounded-full border-0 cursor-pointer text-white flex items-center justify-center transition-transform duration-200 hover:scale-105`}
        style={{
          background:
            "linear-gradient(135deg, var(--av-cyan-300) 0%, var(--av-blue-500) 60%, var(--av-navy-900) 100%)",
          boxShadow:
            "0 16px 40px -8px oklch(0.55 0.22 264 / 60%), inset 0 1px 0 rgb(255 255 255 / 25%), 0 0 0 1px oklch(0.78 0.16 215 / 40%)",
        }}
      >
        {!open && (
          <>
            <span className="radar-pulse" />
            <span className="radar-pulse radar-pulse-delay" />
          </>
        )}
        {open ? (
          <X size={22} />
        ) : (
          <svg viewBox="0 0 24 24" width={26} height={26} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 6 L7 18 L12 9 L17 18 L21 6" />
            <circle cx={12} cy={5} r={1.2} fill="currentColor" />
          </svg>
        )}
      </button>

      {/* Real chat panel — slide-in desde la derecha, con su propio overlay */}
      {open && (
        <WingmanPanel
          state={state}
          usage={usage}
          isPro={isPro}
          freeLimit={freeLimit}
          onClose={close}
          onSend={send}
          onFeedback={giveFeedback}
        />
      )}
    </>
  )
}
