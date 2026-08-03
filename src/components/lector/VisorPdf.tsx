import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { Loader2, Maximize2, Minus, Plus, RefreshCw } from "lucide-react"
import * as pdfjs from "pdfjs-dist"
import workerUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url"
import { ContentGuard } from "@/components/ContentGuard"
import { appButtonClass } from "@/lib/buttonStyles"
import { usePdfFirmado } from "@/hooks/usePdfFirmado"

/**
 * El worker se sirve desde el propio bundle: sin CDN externo, que además
 * fallaría con la CSP y dejaría el visor en blanco.
 */
pdfjs.GlobalWorkerOptions.workerSrc = workerUrl

/**
 * Visor de PDF de la Biblioteca.
 *
 * Visor propio sobre pdf.js en lugar del nativo del navegador, que trae su
 * propia barra con descargar e imprimir y no se puede quitar.
 *
 * SOBRE LA PROTECCIÓN, y conviene no engañarse: para dibujar el PDF el archivo
 * tiene que llegar al dispositivo. Lo que se hace aquí impide seleccionar y
 * copiar el contenido (se dibuja a canvas y NO se monta la capa de texto de
 * pdf.js), quita el menú contextual, bloquea guardar e imprimir, y estampa el
 * correo del usuario encima. Nada de eso impide una captura de pantalla: lo que
 * de verdad desincentiva compartirla es que lleve el correo impreso.
 *
 * NO añadir `renderTextLayer` ni `TextLayer` aunque aparezcan en los ejemplos de
 * pdf.js y aunque den búsqueda dentro del documento: esa capa es exactamente lo
 * que haría el PDF copiable.
 *
 * SOBRE EL SCROLL: el documento se lee de corrido, como un reglamento, no página
 * por página. Un RAC son cientos de páginas y dibujarlas todas a canvas revienta
 * la memoria, así que se monta una caja por página con su alto real (la barra de
 * scroll es correcta desde el primer momento y no salta) y solo se dibujan las
 * cercanas a la ventana.
 */

/** Cuántas páginas se dibujan por encima y por debajo de la visible. */
const MARGEN_PAGINAS = 2

const ZOOM_MIN = 0.5
const ZOOM_MAX = 3
const ZOOM_PASO = 0.2
/** Hasta dónde llega el ajuste automático al ancho. Ver `ajustarAlAncho`. */
const AJUSTE_MAX = 1.6

interface Medida {
  ancho: number
  alto: number
}

interface VisorPdfProps {
  /** Ruta del archivo dentro del bucket privado. */
  ruta: string | null
  /**
   * Clave para recordar la posición de lectura. Se guarda el NÚMERO DE PÁGINA y
   * no el scroll en píxeles, que cambia con el ancho de la ventana y con el zoom.
   */
  claveLectura: string
  /** Alto del visor. Por defecto ocupa lo que queda de ventana. */
  alto?: string
  /**
   * Cuántas páginas tiene el documento, en cuanto pdf.js lo sabe.
   *
   * Se avisa una sola vez por documento. La Biblioteca lo aprovecha para
   * rellenar `library_items.paginas` sin que nadie lo escriba a mano.
   */
  onPaginas?: (paginas: number) => void
}

export function VisorPdf({
  ruta,
  claveLectura,
  alto = "calc(100vh - 300px)",
  onPaginas,
}: VisorPdfProps) {
  const { url, loading: firmando, error, retry } = usePdfFirmado(ruta)
  const [doc, setDoc] = useState<pdfjs.PDFDocumentProxy | null>(null)
  const [medidas, setMedidas] = useState<Medida[]>([])
  const [fallo, setFallo] = useState(false)
  const [escala, setEscala] = useState(1)
  const [ajustado, setAjustado] = useState(true)
  const [visible, setVisible] = useState(1)

  const scroller = useRef<HTMLDivElement | null>(null)
  // El aviso del número de páginas se manda una sola vez por documento: el
  // efecto se vuelve a lanzar al refirmar la URL y no hay que repetirlo.
  const avisadas = useRef(false)
  const cajas = useRef<Map<number, HTMLDivElement>>(new Map())
  const lienzos = useRef<Map<number, HTMLCanvasElement>>(new Map())
  const tareas = useRef<Map<number, pdfjs.RenderTask>>(new Map())
  const dibujadas = useRef<Set<number>>(new Set())
  const restaurado = useRef(false)

  const clave = `aviatory.lector.${claveLectura}`
  const total = medidas.length

  // ── Cargar el documento y medir todas las páginas a escala 1 ──────────────
  useEffect(() => {
    if (!url) return
    let cancelado = false

    const tarea = pdfjs.getDocument({ url, disableAutoFetch: false })
    tarea.promise
      .then(async (d) => {
        if (cancelado) return
        const ms: Medida[] = []
        for (let n = 1; n <= d.numPages; n++) {
          const p = await d.getPage(n)
          const v = p.getViewport({ scale: 1 })
          ms.push({ ancho: v.width, alto: v.height })
        }
        if (cancelado) return
        setDoc(d)
        setMedidas(ms)
        if (!avisadas.current) {
          avisadas.current = true
          onPaginas?.(d.numPages)
        }
      })
      .catch(() => {
        if (!cancelado) setFallo(true)
      })

    return () => {
      cancelado = true
      void tarea.destroy()
    }
  }, [url, onPaginas])

  // ── Ajustar al ancho ──────────────────────────────────────────────────────
  const ajustarAlAncho = useCallback(() => {
    const cont = scroller.current
    if (!cont || medidas.length === 0) return
    // 32px de aire a los lados para que la página no toque el borde.
    const disponible = cont.clientWidth - 32
    // Tope al ajustar: en una pantalla ancha, encajar una carta al ancho da un
    // 200 por ciento, y a esa escala cada lienzo pesa decenas de megas sin que
    // se lea mejor. Quien quiera más, tiene el botón de acercar.
    setEscala(Math.max(ZOOM_MIN, Math.min(AJUSTE_MAX, disponible / medidas[0].ancho)))
  }, [medidas])

  useEffect(() => {
    if (!ajustado) return
    ajustarAlAncho()
    const onResize = () => ajustarAlAncho()
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [ajustado, ajustarAlAncho])

  /**
   * Libera el lienzo de una página que ya está lejos, para no acumular memoria.
   *
   * NO se protege con `dibujadas.has(n)`: `dibujar` reserva el lienzo (que es
   * donde se va la memoria) ANTES de renderizar, así que un render cancelado
   * deja el lienzo reservado. Con la guarda puesta, esos no se liberaban nunca.
   */
  const soltar = useCallback((n: number) => {
    tareas.current.get(n)?.cancel()
    tareas.current.delete(n)
    const lienzo = lienzos.current.get(n)
    if (lienzo) {
      lienzo.width = 0
      lienzo.height = 0
      lienzo.style.width = ""
      lienzo.style.height = ""
    }
    dibujadas.current.delete(n)
  }, [])

  // ── Dibujar una página ────────────────────────────────────────────────────
  const dibujar = useCallback(
    async (n: number) => {
      if (!doc || dibujadas.current.has(n)) return
      const lienzo = lienzos.current.get(n)
      if (!lienzo) return
      dibujadas.current.add(n)

      const p = await doc.getPage(n)
      // Pedir la página es asíncrono, y en ese hueco el lector puede haberse
      // alejado y haberla soltado. Sin esta comprobación se reservaría el
      // lienzo de una página que ya nadie va a mirar, y quedaría huérfano.
      if (!dibujadas.current.has(n)) return
      const vista = p.getViewport({ scale: escala })
      // devicePixelRatio para que no se vea borroso en pantallas densas, pero
      // solo mientras la escala sea pequeña: a partir de 1.5 el propio zoom ya
      // da resolución de sobra y multiplicarla otra vez cuadruplica la memoria
      // del lienzo sin diferencia visible.
      const dpr = escala > 1.5 ? 1 : Math.min(window.devicePixelRatio || 1, 2)
      lienzo.width = Math.floor(vista.width * dpr)
      lienzo.height = Math.floor(vista.height * dpr)
      lienzo.style.width = `${Math.floor(vista.width)}px`
      lienzo.style.height = `${Math.floor(vista.height)}px`

      const ctx = lienzo.getContext("2d")
      if (!ctx) return
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      tareas.current.get(n)?.cancel()
      // Sin capa de texto: el contenido son píxeles y no hay nada que copiar.
      const tarea = p.render({ canvasContext: ctx, viewport: vista })
      tareas.current.set(n, tarea)
      try {
        await tarea.promise
      } catch {
        // Cancelado: no es un error que mostrar. Se suelta entero en vez de
        // solo sacarlo del registro, porque si el registro y el lienzo se
        // desincronizan, el bucle de liberación (que recorre el registro) ya
        // nunca vuelve a visitar esa página y su lienzo queda reservado.
        //
        // Pero SOLO si este sigue siendo el render vigente. Al ajustar la
        // escala se cancela el render en curso y se lanza otro para la misma
        // página; sin esta comprobación, el `catch` del cancelado borraba lo
        // que el nuevo acababa de dibujar y el documento se abría en blanco.
        if (tareas.current.get(n) === tarea) soltar(n)
      }
    },
    [doc, escala, soltar]
  )

  /**
   * Decide qué páginas deben estar dibujadas ahora mismo.
   *
   * Lo llaman el IntersectionObserver (que es el camino eficiente) y también el
   * scroll y el redimensionado, que son el respaldo: si el observador no
   * dispara, esto sigue calculando bien qué se ve, y el visor no se queda en
   * blanco.
   */
  const recalcular = useCallback(() => {
    const cont = scroller.current
    if (!cont || total === 0) return
    const arriba = cont.scrollTop
    const abajo = arriba + cont.clientHeight

    let primera = total
    let ultima = 1
    for (const [n, caja] of cajas.current) {
      const top = caja.offsetTop
      const bot = top + caja.offsetHeight
      if (bot >= arriba && top <= abajo) {
        primera = Math.min(primera, n)
        ultima = Math.max(ultima, n)
      }
    }
    if (primera > ultima) return

    setVisible(primera)
    const desde = Math.max(1, primera - MARGEN_PAGINAS)
    const hasta = Math.min(total, ultima + MARGEN_PAGINAS)

    for (let n = desde; n <= hasta; n++) void dibujar(n)
    for (const n of [...dibujadas.current]) {
      if (n < desde || n > hasta) soltar(n)
    }
  }, [total, dibujar, soltar])

  // ── Observador y respaldo por scroll ──────────────────────────────────────
  useEffect(() => {
    const cont = scroller.current
    if (!cont || total === 0) return

    const obs = new IntersectionObserver(() => recalcular(), {
      root: cont,
      rootMargin: "200px 0px",
    })
    for (const caja of cajas.current.values()) obs.observe(caja)

    let pendiente = false
    const onScroll = () => {
      if (pendiente) return
      pendiente = true
      window.setTimeout(() => {
        pendiente = false
        recalcular()
      }, 120)
    }
    cont.addEventListener("scroll", onScroll, { passive: true })
    recalcular()

    return () => {
      obs.disconnect()
      cont.removeEventListener("scroll", onScroll)
    }
  }, [total, recalcular])

  // Al cambiar el zoom hay que redibujar todo con la escala nueva.
  useEffect(() => {
    for (const n of [...dibujadas.current]) soltar(n)
    recalcular()
  }, [escala, soltar, recalcular])

  // ── Recordar y restaurar la página ────────────────────────────────────────
  useEffect(() => {
    if (total === 0 || restaurado.current) return
    restaurado.current = true
    const guardada = Number(sessionStorage.getItem(clave))
    if (guardada > 1 && guardada <= total) irA(guardada)
    // irA es estable para este uso: solo se llama una vez al montar.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total, clave])

  useEffect(() => {
    if (total > 0) sessionStorage.setItem(clave, String(visible))
  }, [visible, total, clave])

  function irA(n: number): void {
    const caja = cajas.current.get(Math.min(Math.max(n, 1), total || 1))
    const cont = scroller.current
    if (!caja || !cont) return
    cont.scrollTop = caja.offsetTop - 8
    recalcular()
  }

  const paginas = useMemo(
    () => medidas.map((m, i) => ({ n: i + 1, ancho: m.ancho * escala, alto: m.alto * escala })),
    [medidas, escala]
  )

  if (firmando) {
    return <Estado icono={<Loader2 className="h-6 w-6 animate-spin" />} titulo="Abriendo el documento" />
  }
  if (error === "missing") {
    return (
      <Estado
        titulo="El documento todavía no está cargado"
        cuerpo="El archivo aún no se ha subido al almacenamiento. En cuanto esté, aparece aquí sin que tengas que hacer nada."
      />
    )
  }
  if (error || fallo) {
    return (
      <Estado
        titulo="No pudimos abrir el documento"
        cuerpo="El enlace pudo haber caducado. Inténtalo de nuevo."
        accion={
          <button
            type="button"
            onClick={() => {
              setFallo(false)
              void retry()
            }}
            className={appButtonClass({ variant: "secondary" }, "mt-4 cursor-pointer")}
          >
            <RefreshCw className="h-4 w-4" /> Reintentar
          </button>
        }
      />
    )
  }

  return (
    <ContentGuard>
      <div className="surface rounded-xl overflow-hidden">
        {/* Barra de control. Sin anterior y siguiente: el scroll es la navegación. */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-3">
          <div className="flex items-center gap-2">
            <label htmlFor="ir-a-pagina" className="text-[13px] text-muted-foreground">
              Página
            </label>
            <input
              id="ir-a-pagina"
              type="number"
              min={1}
              max={total || 1}
              value={visible}
              onChange={(e) => irA(Number(e.target.value))}
              className="h-9 w-[72px] rounded-lg border border-border bg-background px-2 text-[13px] tabular-nums text-center"
            />
            <span className="text-[13px] text-muted-foreground tabular-nums">
              {total ? `de ${total}` : "cargando"}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <Control
              onClick={() => {
                setAjustado(false)
                setEscala((z) => Math.max(ZOOM_MIN, +(z - ZOOM_PASO).toFixed(2)))
              }}
              disabled={escala <= ZOOM_MIN}
              label="Alejar"
            >
              <Minus className="h-4 w-4" />
            </Control>
            <span className="tabular-nums text-[13px] text-muted-foreground px-2 min-w-[52px] text-center">
              {Math.round(escala * 100)}%
            </span>
            <Control
              onClick={() => {
                setAjustado(false)
                setEscala((z) => Math.min(ZOOM_MAX, +(z + ZOOM_PASO).toFixed(2)))
              }}
              disabled={escala >= ZOOM_MAX}
              label="Acercar"
            >
              <Plus className="h-4 w-4" />
            </Control>
            <Control
              onClick={() => {
                setAjustado(true)
                ajustarAlAncho()
              }}
              label="Ajustar al ancho"
            >
              <Maximize2 className="h-4 w-4" />
            </Control>
          </div>
        </div>

        {/* Las páginas, de corrido */}
        <div
          ref={scroller}
          className="relative overflow-auto bg-muted/40 select-none"
          onContextMenu={(e) => e.preventDefault()}
          onDragStart={(e) => e.preventDefault()}
          style={{ height: alto }}
        >
          <div className="flex flex-col items-center gap-3 py-4">
            {paginas.map((p) => (
              <div
                key={p.n}
                ref={(el) => {
                  if (el) cajas.current.set(p.n, el)
                  else cajas.current.delete(p.n)
                }}
                data-pagina={p.n}
                className="relative bg-white rounded-md shadow-sm"
                style={{ width: p.ancho, height: p.alto }}
              >
                <canvas
                  ref={(el) => {
                    if (el) lienzos.current.set(p.n, el)
                    else lienzos.current.delete(p.n)
                  }}
                  className="block"
                />
              </div>
            ))}
            {total === 0 && (
              <div className="flex items-center gap-2 py-16 text-muted-foreground">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span className="text-[15px]">Midiendo el documento</span>
              </div>
            )}
          </div>

          {/* Indicador flotante */}
          {total > 0 && (
            <div
              aria-live="polite"
              className="pointer-events-none sticky bottom-3 mx-auto w-max rounded-full px-3 py-1.5 text-[12px] font-medium tabular-nums text-white"
              style={{ background: "rgb(11 16 32 / 78%)" }}
            >
              Página {visible} de {total}
            </div>
          )}
        </div>
      </div>
    </ContentGuard>
  )
}

function Control({
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

function Estado({
  icono,
  titulo,
  cuerpo,
  accion,
}: {
  icono?: React.ReactNode
  titulo: string
  cuerpo?: string
  accion?: React.ReactNode
}) {
  return (
    <section className="surface rounded-xl p-8 text-center">
      <div className="mx-auto flex items-center justify-center w-12 h-12 rounded-lg border border-border bg-muted text-muted-foreground">
        {icono ?? <Loader2 className="h-6 w-6" />}
      </div>
      <h2 className="mt-4 text-[17px] font-semibold tracking-[-0.015em]">{titulo}</h2>
      {cuerpo && (
        <p className="mt-2 text-[15px] text-muted-foreground max-w-[460px] mx-auto leading-relaxed">
          {cuerpo}
        </p>
      )}
      {accion}
    </section>
  )
}
