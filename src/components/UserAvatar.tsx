import type { CSSProperties } from "react"

interface Props {
  username?: string | null
  fullName?: string | null
  email?: string | null
  photoUrl?: string | null
  size?: "xs" | "sm" | "md" | "lg" | "xl"
  gradient?: string
  ring?: boolean
  className?: string
  style?: CSSProperties
}

const sizeClasses: Record<NonNullable<Props["size"]>, string> = {
  xs: "h-6 w-6 text-[12px]",
  sm: "h-8 w-8 text-[12px]",
  md: "h-10 w-10 text-[15px]",
  lg: "h-12 w-12 text-[17px]",
  xl: "h-16 w-16 text-xl",
}

export function UserAvatar({
  username,
  fullName,
  email,
  photoUrl,
  size = "md",
  gradient = "from-blue-500 to-blue-700",
  ring = false,
  className = "",
  style,
}: Props) {
  const source = username ?? fullName ?? email ?? "?"
  const initials = (source[0] ?? "?").toUpperCase()
  const sizeClass = sizeClasses[size]
  const ringClass = ring ? "ring-2 ring-white dark:ring-card shadow-md" : ""

  if (photoUrl) {
    return (
      <img
        src={photoUrl}
        alt={username ?? fullName ?? "Avatar"}
        loading="lazy"
        className={`${sizeClass} ${ringClass} rounded-full object-cover bg-muted flex-shrink-0 ${className}`}
        style={style}
      />
    )
  }

  return (
    <div
      className={`${sizeClass} ${ringClass} flex-shrink-0 rounded-full bg-gradient-to-br ${gradient} text-white font-semibold flex items-center justify-center ${className}`}
      aria-label={username ?? fullName ?? "Avatar"}
      style={style}
    >
      {initials}
    </div>
  )
}
