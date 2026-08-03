import { useEffect, type ReactNode } from "react"

/**
 * Protección de contenido sensible (ej. el glosario de vocabulario, o los
 * documentos de la Biblioteca, que no queremos que se exporten en masa).
 *
 * Qué hace:
 * - Bloquea selección de texto, copy/cut, menú contextual y los atajos
 *   Cmd/Ctrl + C/X/A/S/P (copiar, cortar, seleccionar todo, guardar, imprimir).
 * - Oculta el contenido al imprimir (@media print), o sea que no se puede
 *   "guardar como PDF".
 * - Superpone una marca de agua diagonal de Aviatory. No impide una captura de
 *   pantalla, que ningún navegador permite bloquear, pero deja la marca encima
 *   de cualquier recorte que salga de aquí.
 *
 * La marca dice Aviatory y no el correo del usuario. Estampar el correo
 * identifica a quien filtra y desincentiva más, pero convierte cada captura que
 * el piloto hace para estudiar en un documento con su dato personal encima, y
 * eso es de la app, no del usuario. Decisión de Camilo del 3 de agosto.
 *
 * Los inputs (ej. el buscador) siguen funcionando: las protecciones se saltean
 * cuando el foco está en un campo de texto.
 */
/**
 * La marca de agua, como mosaico SVG en diagonal.
 *
 * Es constante a propósito: no depende del usuario ni de la sesión, así que se
 * calcula una vez y no en cada render. Archivo es la tipografía de titulares de
 * la marca y ya viene cargada por `index.html`.
 */
const MARCA_AGUA = (() => {
  const svg =
    `<svg xmlns='http://www.w3.org/2000/svg' width='300' height='180'>` +
    `<text x='0' y='100' font-size='15' font-weight='600' letter-spacing='1.4' ` +
    `fill='rgba(130,130,140,0.16)' transform='rotate(-22 150 90)' ` +
    `font-family='Archivo,-apple-system,sans-serif'>Aviatory</text></svg>`
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`
})()

function isEditable(t: EventTarget | null): boolean {
  const el = t as HTMLElement | null
  return !!el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.isContentEditable)
}

export function ContentGuard({ children }: { children: ReactNode }) {
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

  return (
    <div
      className="content-guard relative select-none"
      style={{ WebkitUserSelect: "none", userSelect: "none" }}
    >
      {children}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-20 print:hidden"
        style={{ backgroundImage: MARCA_AGUA, backgroundRepeat: "repeat" }}
      />
    </div>
  )
}
