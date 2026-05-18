import { useInView } from "@/hooks/useInView"

interface Props {
  text: string
  className?: string
  delayMs?: number
  staggerMs?: number
  as?: "h1" | "h2" | "h3" | "span" | "div"
}

/**
 * Reveals text character-by-character with a small per-letter delay.
 * Preserves whitespace and gracefully handles ARIA (the screen reader
 * reads the full string from the wrapper, individual spans hidden).
 */
export function TextReveal({
  text,
  className = "",
  delayMs = 0,
  staggerMs = 22,
  as: Tag = "span",
}: Props) {
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.3 })

  const Wrapper = Tag as React.ElementType

  return (
    <Wrapper
      ref={ref}
      className={`letter-reveal ${className}`}
      aria-label={text}
    >
      {Array.from(text).map((char, i) => (
        <span
          key={i}
          aria-hidden
          style={{
            animationDelay: inView ? `${delayMs + i * staggerMs}ms` : "999999s",
            animationPlayState: inView ? "running" : "paused",
            whiteSpace: char === " " ? "pre" : "normal",
          }}
        >
          {char}
        </span>
      ))}
    </Wrapper>
  )
}
