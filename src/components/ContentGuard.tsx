import { useEffect, type ReactNode } from "react"
import { useSession } from "@/hooks/useSession"

/**
 * Protección de contenido sensible (ej. el glosario de vocabulario, que es
 * material de Cami que no queremos que se exporte en masa).
 *
 * Qué hace:
 * - Bloquea selección de texto, copy/cut, menú contextual y los atajos
 *   Cmd/Ctrl + C/X/A/S/P (copiar, cortar, seleccionar todo, guardar, imprimir).
 * - Oculta el contenido al imprimir (@media print) — evita "guardar como PDF".
 * - Superpone un watermark diagonal con el email del usuario: no impide una
 *   captura de pantalla (ningún navegador permite bloquearlas), pero deja la
 *   identidad del usuario impresa en cualquier screenshot, lo que desincentiva
 *   compartirlo.
 *
 * Los inputs (ej. el buscador) siguen funcionando: las protecciones se saltean
 * cuando el foco está en un campo de texto.
 */
function isEditable(t: EventTarget | null): boolean {
  const el = t as HTMLElement | null
  return !!el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.isContentEditable)
}

export function ContentGuard({ children }: { children: ReactNode }) {
  const { user } = useSession()
  const label = user?.email ?? "Aviatory"

  useEffect(() => {
    const block = (e: Event) => { if (!isEditable(e.target)) e.preventDefault() }
    const onKey = (e: KeyboardEvent) => {
      if (isEditable(e.target)) return
      const k = e.key.toLowerCase()
      if ((e.metaKey || e.ctrlKey) && ["c", "x", "a", "s", "p"].includes(k)) e.preventDefault()
    }
    document.addEventListener("contextmenu", block)
    document.addEventListener("copy", block)
    document.addEventListener("cut", block)
    document.addEventListener("selectstart", block)
    document.addEventListener("keydown", onKey)
    document.body.classList.add("content-guarded")
    return () => {
      document.removeEventListener("contextmenu", block)
      document.removeEventListener("copy", block)
      document.removeEventListener("cut", block)
      document.removeEventListener("selectstart", block)
      document.removeEventListener("keydown", onKey)
      document.body.classList.remove("content-guarded")
    }
  }, [])

  // Watermark: email repetido en diagonal, vía SVG tile (pointer-events none).
  const svg =
    `<svg xmlns='http://www.w3.org/2000/svg' width='340' height='200'>` +
    `<text x='0' y='110' font-size='13' fill='rgba(130,130,140,0.16)' ` +
    `transform='rotate(-22 170 100)' font-family='-apple-system,sans-serif'>${escapeXml(label)}</text></svg>`
  const bg = `url("data:image/svg+xml,${encodeURIComponent(svg)}")`

  return (
    <div
      className="content-guard relative select-none"
      style={{ WebkitUserSelect: "none", userSelect: "none" }}
    >
      {children}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-20 print:hidden"
        style={{ backgroundImage: bg, backgroundRepeat: "repeat" }}
      />
    </div>
  )
}

function escapeXml(s: string): string {
  return s.replace(/[<>&'"]/g, (c) =>
    ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" }[c] as string),
  )
}
