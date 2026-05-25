import type React from "react"
import { useSession } from "@/hooks/useSession"

interface Props {
  children: React.ReactNode
  className?: string
  /** Show a subtle watermark with the user's email + short id. */
  watermark?: boolean
}

/**
 * Wraps content that should NOT be easily copy/pasted by the user.
 *
 * Protection levels applied:
 *   1. CSS `user-select: none` — blocks click-and-drag selection.
 *   2. `onContextMenu` prevented — blocks right-click → Copy.
 *   3. `onCopy` / `onCut` prevented — blocks Ctrl+C / Ctrl+X.
 *   4. Watermark (optional, on by default) — subtle text with the
 *      logged-in user's email + short user_id at the bottom-right
 *      of the protected area. If a user screenshots and shares it,
 *      we can identify them.
 *
 * NOT bulletproof — a determined user with DevTools can still
 * extract the underlying HTML. But this stops 95% of casual copying
 * and adds traceability via the watermark.
 */
export function ProtectedContent({
  children,
  className = "",
  watermark = true,
}: Props) {
  const { user } = useSession()
  const email = user?.email ?? ""
  const shortId = user?.id ? user.id.slice(0, 8) : ""

  return (
    <div
      className={`relative select-none ${className}`}
      onContextMenu={(e) => e.preventDefault()}
      onCopy={(e) => e.preventDefault()}
      onCut={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
    >
      {children}

      {watermark && email && (
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-2 right-3 text-[10px] tabular text-muted-foreground/30 select-none"
        >
          {email} · {shortId}
        </div>
      )}
    </div>
  )
}
