import type { ElementType, ReactNode } from "react"
import { useInView } from "@/hooks/useInView"

interface Props {
  children: ReactNode
  as?: ElementType
  className?: string
  delay?: number      // in ms — applied via style for stagger
  direction?: "up" | "down" | "left" | "right" | "none"
  duration?: number   // in ms
}

export function Reveal({
  children,
  as: Tag = "div",
  className = "",
  delay = 0,
  direction = "up",
  duration = 700,
}: Props) {
  const { ref, inView } = useInView({ threshold: 0.12 })

  const offset =
    direction === "up"
      ? "translate3d(0, 24px, 0)"
      : direction === "down"
        ? "translate3d(0, -24px, 0)"
        : direction === "left"
          ? "translate3d(24px, 0, 0)"
          : direction === "right"
            ? "translate3d(-24px, 0, 0)"
            : "translate3d(0, 0, 0)"

  return (
    <Tag
      ref={ref}
      style={{
        transitionProperty: "opacity, transform",
        transitionDuration: `${duration}ms`,
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        transitionDelay: `${delay}ms`,
        opacity: inView ? 1 : 0,
        transform: inView ? "translate3d(0, 0, 0)" : offset,
        willChange: "opacity, transform",
      }}
      className={className}
    >
      {children}
    </Tag>
  )
}
