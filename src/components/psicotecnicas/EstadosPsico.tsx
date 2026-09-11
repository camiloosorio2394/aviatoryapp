import { Loader2 } from "lucide-react"

/** Mientras el servidor sortea la tanda o calcula el informe. */
export function PsicoCargando({ texto }: { texto: string }) {
  return (
    <section
      className="max-w-[900px] mx-auto rounded-2xl surface p-8 flex flex-col items-center gap-3 text-muted-foreground"
      role="status"
      aria-live="polite"
    >
      <Loader2 className="h-5 w-5 animate-spin" />
      <span className="text-[13px]">{texto}</span>
    </section>
  )
}

