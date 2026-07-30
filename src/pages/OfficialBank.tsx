import { useCallback, useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  FileText,
  Loader2,
  Minus,
  Plus,
  RefreshCw,
} from "lucide-react"
import * as pdfjs from "pdfjs-dist"
import workerUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url"
import { AppLayout } from "@/components/layout/AppLayout"
import { PageHeader } from "@/components/ui/page-header"
import { appButtonClass } from "@/lib/buttonStyles"
import { useOfficialBank } from "@/hooks/useOfficialBank"

/** El worker se sirve desde el propio bundle: sin CDN externo, que además
 *  fallaría con la CSP y dejaría el visor en blanco. */
pdfjs.GlobalWorkerOptions.workerSrc = workerUrl

/** Dónde recordamos la página. sessionStorage y no localStorage: la posición
 *  dura lo que dura la sesión, como pide el requisito, y no queda en el equipo. */
const PAGE_KEY = "aviatory.bancoOficial.pagina"

const ZOOM_MIN = 0.6
const ZOOM_MAX = 2.4
const ZOOM_STEP = 0.2

/**
 * Banco Oficial de Preguntas.
 *
 * Visor propio sobre pdf.js en lugar del visor nativo del navegador, que trae
 * su propia barra con descargar e imprimir y no se puede quitar.
 *
 * Sobre la protección, y conviene no engañarse: para dibujar el PDF el archivo
 * tiene que llegar al dispositivo. Lo que se hace aquí frena la copia casual
 * (sin botón de descarga, sin menú contextual, sin selección, marca de agua,
 * URL firmada que caduca), pero no resiste a alguien con la consola abierta.
 *
 * No hay buscador porque el PDF es un escaneo sin capa de texto: no existe
 * texto que buscar. Requeriría OCR previo de las 148 páginas.
 */
export function OfficialBank() {
  const { url, loading: signing, error, retry } = useOfficialBank()
  const [doc, setDoc] = useState<pdfjs.PDFDocumentProxy | null>(null)
  const [numPages, setNumPages] = useState(0)
  const [page, setPage] = useState(() => Number(sessionStorage.getItem(PAGE_KEY)) || 1)
  const [zoom, setZoom] = useState(1)
  const [loadError, setLoadError] = useState(false)

  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const taskRef = useRef<pdfjs.RenderTask | null>(null)

  // Cargar el documento cuando llega la URL firmada
  useEffect(() => {
    if (!url) return
    let cancelled = false

    const task = pdfjs.getDocument({ url, disableAutoFetch: false })
    task.promise
      .then((d) => {
        if (cancelled) return
        setDoc(d)
        setNumPages(d.numPages)
        setPage((p) => Math.min(Math.max(p, 1), d.numPages))
      })
      .catch(() => !cancelled && setLoadError(true))

    return () => {
      cancelled = true
      void task.destroy()
    }
  }, [url])

  // Dibujar la página actual
  useEffect(() => {
    if (!doc || !canvasRef.current) return
    let cancelled = false

    doc.getPage(page).then((p) => {
      if (cancelled) return
      const canvas = canvasRef.current
      if (!canvas) return

      // devicePixelRatio para que no se vea borroso en pantallas densas
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const viewport = p.getViewport({ scale: zoom })
      canvas.width = Math.floor(viewport.width * dpr)
      canvas.height = Math.floor(viewport.height * dpr)
      canvas.style.width = `${Math.floor(viewport.width)}px`
      canvas.style.height = `${Math.floor(viewport.height)}px`

      const ctx = canvas.getContext("2d")
      if (!ctx) return
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      taskRef.current?.cancel()
      const task = p.render({ canvasContext: ctx, viewport })
      taskRef.current = task
      task.promise
        .catch(() => {
          /* cancelado al cambiar de página: no es un error que mostrar */
        })
    })

    return () => {
      cancelled = true
      taskRef.current?.cancel()
    }
  }, [doc, page, zoom])

  useEffect(() => {
    sessionStorage.setItem(PAGE_KEY, String(page))
  }, [page])

  const go = useCallback(
    (delta: number) => setPage((p) => Math.min(Math.max(p + delta, 1), numPages || 1)),
    [numPages],
  )

  // Flechas del teclado para pasar página, como en cualquier lector
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return
      if (e.key === "ArrowRight" || e.key === "PageDown") go(1)
      if (e.key === "ArrowLeft" || e.key === "PageUp") go(-1)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [go])

  return (
    <AppLayout>
      <div className="px-4 sm:px-7 py-6 sm:py-8 pb-12 max-w-[1280px] mx-auto">
        <PageHeader
          eyebrow={
            <>
              <FileText className="h-4 w-4" /> Documento oficial
            </>
          }
          title="Banco Oficial de Preguntas"
          subtitle="El banco que la Aerocivil usa en sus exámenes de conocimiento, para consultar dentro de Aviatory y verificar cualquier pregunta contra la fuente."
          actions={
            <Link to="/app/pca" className={appButtonClass({ variant: "secondary" })}>
              Ir al Examen PCA <ArrowRight className="h-4 w-4" />
            </Link>
          }
        />

        {signing ? (
          <ViewerState icon={<Loader2 className="h-6 w-6 animate-spin" />} title="Abriendo el documento" />
        ) : error === "missing" ? (
          <ViewerState
            title="El documento todavía no está cargado"
            body="El banco oficial aún no se ha subido al almacenamiento. En cuanto esté, aparece aquí sin que tengas que hacer nada."
          />
        ) : error || loadError ? (
          <ViewerState
            title="No pudimos abrir el documento"
            body="El enlace pudo haber caducado. Inténtalo de nuevo."
            action={
              <button
                type="button"
                onClick={() => { setLoadError(false); void retry() }}
                className={appButtonClass({ variant: "secondary" }, "mt-4 cursor-pointer")}
              >
                <RefreshCw className="h-4 w-4" /> Reintentar
              </button>
            }
          />
        ) : (
          <div className="surface rounded-xl overflow-hidden">
            {/* Barra de control */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-3">
              <div className="flex items-center gap-1">
                <ControlButton onClick={() => go(-1)} disabled={page <= 1} label="Página anterior">
                  <ChevronLeft className="h-4 w-4" />
                </ControlButton>
                <span className="tabular-nums text-[13px] text-muted-foreground px-2 min-w-[92px] text-center">
                  {numPages ? `${page} de ${numPages}` : "Cargando"}
                </span>
                <ControlButton onClick={() => go(1)} disabled={!numPages || page >= numPages} label="Página siguiente">
                  <ChevronRight className="h-4 w-4" />
                </ControlButton>
              </div>

              <div className="flex items-center gap-1">
                <ControlButton
                  onClick={() => setZoom((z) => Math.max(ZOOM_MIN, +(z - ZOOM_STEP).toFixed(1)))}
                  disabled={zoom <= ZOOM_MIN}
                  label="Alejar"
                >
                  <Minus className="h-4 w-4" />
                </ControlButton>
                <span className="tabular-nums text-[13px] text-muted-foreground px-2 min-w-[52px] text-center">
                  {Math.round(zoom * 100)}%
                </span>
                <ControlButton
                  onClick={() => setZoom((z) => Math.min(ZOOM_MAX, +(z + ZOOM_STEP).toFixed(1)))}
                  disabled={zoom >= ZOOM_MAX}
                  label="Acercar"
                >
                  <Plus className="h-4 w-4" />
                </ControlButton>
              </div>
            </div>

            {/* Lienzo. select-none y sin menú contextual: no evita una captura
                de pantalla, pero sí el copiado y el guardado con un clic. */}
            <div
              className="relative overflow-auto bg-muted/40 p-4 sm:p-6 flex justify-center select-none"
              onContextMenu={(e) => e.preventDefault()}
              onDragStart={(e) => e.preventDefault()}
              style={{ maxHeight: "calc(100vh - 260px)" }}
            >
              <div className="relative">
                <canvas ref={canvasRef} className="block rounded-md shadow-sm" />

                {/* Marca de agua. Va sobre el lienzo y no dentro del render para
                    que no se pueda quitar recortando la imagen del canvas. */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
                >
                  <span
                    className="text-[64px] font-semibold tracking-[0.2em] rotate-[-30deg] whitespace-nowrap"
                    style={{ color: "rgb(0 0 0 / 6%)" }}
                  >
                    AVIATORY
                  </span>
                </div>

              </div>
            </div>
          </div>
        )}

        <p className="mt-4 text-[13px] text-muted-foreground max-w-[720px]">
          Documento publicado por la Aeronáutica Civil de Colombia. Se muestra dentro de Aviatory
          para consulta y verificación.
        </p>
      </div>
    </AppLayout>
  )
}

function ControlButton({
  onClick,
  disabled,
  label,
  children,
}: {
  onClick: () => void
  disabled?: boolean
  label: string
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      className="inline-flex items-center justify-center h-9 w-9 rounded-lg border border-border bg-background text-foreground transition-colors hover:bg-muted disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
    >
      {children}
    </button>
  )
}

function ViewerState({
  icon,
  title,
  body,
  action,
}: {
  icon?: React.ReactNode
  title: string
  body?: string
  action?: React.ReactNode
}) {
  return (
    <section className="surface rounded-xl p-8 text-center">
      <div className="mx-auto flex items-center justify-center w-12 h-12 rounded-lg border border-border bg-muted text-muted-foreground">
        {icon ?? <FileText className="h-6 w-6" />}
      </div>
      <h2 className="mt-4 text-[17px] font-semibold tracking-[-0.015em]">{title}</h2>
      {body && (
        <p className="mt-2 text-[15px] text-muted-foreground max-w-[460px] mx-auto leading-relaxed">
          {body}
        </p>
      )}
      {action}
    </section>
  )
}
