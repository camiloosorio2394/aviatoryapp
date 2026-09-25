import { useState } from "react"
import { ZoomIn, ZoomOut } from "lucide-react"

interface Props {
  src: string
  alt: string
  loading?: "eager" | "lazy"
}

/** Conserva la lámina completa; si los detalles son pequeños permite panorámica horizontal. */
export function ImagenPsicoAmpliable({ src, alt, loading = "lazy" }: Props) {
  const [ampliada, setAmpliada] = useState(false)

  return (
    <div className="mt-4">
      <div className="overflow-x-auto rounded-xl border border-border bg-white p-3">
        <img
          src={src}
          alt={alt}
          className={ampliada ? "mx-auto h-auto w-[900px] max-w-none" : "mx-auto h-auto max-w-full"}
          loading={loading}
        />
      </div>
      <button
        type="button"
        aria-expanded={ampliada}
        onClick={() => setAmpliada((valor) => !valor)}
        className="mt-2 inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-[13px] font-medium text-foreground/80 hover:bg-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        {ampliada ? <ZoomOut className="h-4 w-4" /> : <ZoomIn className="h-4 w-4" />}
        {ampliada ? "Ajustar figura" : "Ampliar figura"}
      </button>
    </div>
  )
}
