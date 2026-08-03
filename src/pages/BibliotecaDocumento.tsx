import { useCallback, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { ArrowLeft, ExternalLink, FileText } from "lucide-react"
import { AppLayout } from "@/components/layout/AppLayout"
import { PageHeader } from "@/components/ui/page-header"
import { VisorPdf } from "@/components/lector/VisorPdf"
import { appButtonClass } from "@/lib/buttonStyles"
import {
  contarApertura,
  fechaEdicion,
  fetchItem,
  guardarPaginas,
  type ItemBiblioteca,
} from "@/lib/biblioteca"

/**
 * Ficha de un documento de la Biblioteca, con su visor.
 * Ruta: /app/biblioteca/:slug
 *
 * La edición y el enlace a la fuente oficial van arriba y siempre visibles, no
 * al pie: es material que caduca y el piloto tiene que saber qué está leyendo
 * mientras lo lee.
 */
export function BibliotecaDocumento() {
  const { slug = "" } = useParams()
  const [item, setItem] = useState<ItemBiblioteca | null>(null)
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    let cancelado = false
    void (async () => {
      const r = await fetchItem(slug)
      if (cancelado) return
      setItem(r)
      setCargando(false)
      if (r) void contarApertura(r.id)
    })()
    return () => {
      cancelado = true
    }
  }, [slug])

  // El número de páginas no lo escribe nadie a mano: pdf.js ya lo sabe al abrir
  // el documento. Solo se guarda la primera vez, cuando está en null.
  const onPaginas = useCallback(
    (paginas: number) => {
      if (!item || item.paginas !== null) return
      void guardarPaginas(item.id, paginas)
    },
    [item]
  )

  if (cargando) {
    return (
      <AppLayout>
        <div className="px-4 sm:px-7 py-6 sm:py-8 max-w-[1280px] mx-auto">
          <div className="h-8 w-64 rounded bg-muted animate-pulse" aria-hidden />
          <div className="mt-6 surface rounded-xl h-[420px] animate-pulse" aria-hidden />
        </div>
      </AppLayout>
    )
  }

  if (!item) {
    return (
      <AppLayout>
        <div className="px-4 sm:px-7 py-6 sm:py-8 max-w-[1280px] mx-auto">
          <Volver />
          <section className="surface rounded-xl p-8 text-center">
            <h1 className="text-[20px] font-semibold">Ese documento no está en la biblioteca</h1>
            <p className="mt-2 text-[15px] text-muted-foreground max-w-[480px] mx-auto leading-relaxed">
              Puede que se haya retirado o que el enlace esté mal. Mira la biblioteca completa para
              encontrar lo que buscas.
            </p>
            <Link
              to="/app/biblioteca"
              className={appButtonClass({ variant: "secondary" }, "mt-5")}
            >
              Ver la biblioteca
            </Link>
          </section>
        </div>
      </AppLayout>
    )
  }

  const fecha = fechaEdicion(item.published_at)

  return (
    <AppLayout>
      <div className="px-4 sm:px-7 py-6 sm:py-8 pb-12 max-w-[1280px] mx-auto">
        <Volver />

        <PageHeader
          eyebrow={
            <>
              <FileText className="h-3.5 w-3.5" /> {item.source ?? "Documento"}
            </>
          }
          title={item.title}
          subtitle={item.description ?? undefined}
          actions={
            item.embed_url ? (
              <a
                href={item.embed_url}
                target="_blank"
                rel="noreferrer noopener"
                className={appButtonClass({ variant: "secondary", size: "lg" })}
              >
                Fuente oficial <ExternalLink className="h-4 w-4" />
              </a>
            ) : undefined
          }
        />

        {/* La salvaguarda de edición. No es un pie de página: va antes del
            documento y dice con qué edición se está leyendo. */}
        <div
          className="mb-5 rounded-xl border-l-[3px] border-y border-r p-4"
          style={{
            borderColor: "color-mix(in oklab, var(--av-amber-400) 26%, transparent)",
            borderLeftColor: "color-mix(in oklab, var(--av-amber-400) 55%, transparent)",
            background: "color-mix(in oklab, var(--av-amber-400) 7%, transparent)",
          }}
        >
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1 text-[13px]">
            <span className="font-semibold text-foreground">
              {item.version ?? "Edición sin indicar"}
            </span>
            {fecha && (
              <>
                <span className="text-muted-foreground" aria-hidden>
                  ·
                </span>
                <span className="text-muted-foreground">{fecha}</span>
              </>
            )}
          </div>
          <p className="m-0 mt-1.5 text-[13px] leading-relaxed text-foreground/85 max-w-[760px]">
            Esta es la edición con la que el documento está cargado, y puede no ser la vigente: las
            normas se enmiendan. Antes de aplicar un límite o un listado, verifica la edición en
            vigor en la fuente oficial.
          </p>
        </div>

        {item.file_url ? (
          <VisorPdf ruta={item.file_url} claveLectura={item.slug} onPaginas={onPaginas} />
        ) : (
          <section className="surface rounded-xl p-8 text-center">
            <h2 className="text-[17px] font-semibold">Este documento no se aloja en Aviatory</h2>
            <p className="mt-2 text-[15px] text-muted-foreground max-w-[520px] mx-auto leading-relaxed">
              Es una ficha de referencia: se consulta en la fuente oficial, que va enlazada arriba.
            </p>
          </section>
        )}
      </div>
    </AppLayout>
  )
}

function Volver() {
  return (
    <Link
      to="/app/biblioteca"
      className="inline-flex items-center gap-1.5 text-[13px] text-muted-foreground hover:text-foreground transition-colors mb-4"
    >
      <ArrowLeft className="h-3.5 w-3.5" /> Volver a la Biblioteca
    </Link>
  )
}
