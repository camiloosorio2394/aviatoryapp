import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { ArrowRight, ExternalLink, FileText, Info, Library as LibraryIcon } from "lucide-react"
import { AppLayout } from "@/components/layout/AppLayout"
import { PageHeader } from "@/components/ui/page-header"
import { appButtonClass } from "@/lib/buttonStyles"
import { IconoCategoria } from "@/components/biblioteca/IconoCategoria"
import {
  type CategoriaBiblioteca,
  type ItemBiblioteca,
  colorDeCategoria,
  fechaEdicion,
  fetchBiblioteca,
  MODULO_DE_CATEGORIA,
} from "@/lib/biblioteca"

/**
 * Biblioteca: la bibliografía de cada módulo.
 *
 * Las categorías son los módulos, no categorías temáticas: el piloto que está
 * estudiando NOTAM quiere la bibliografía de NOTAM, no una carpeta llamada
 * "Manuales".
 *
 * En material normativo la versión es la mitad de la información, así que cada
 * ficha muestra su edición junto al título y el enlace a la fuente oficial al
 * lado del botón de abrir, no escondido en un pie.
 */
export function Library() {
  const [datos, setDatos] = useState<{
    categorias: CategoriaBiblioteca[]
    items: ItemBiblioteca[]
  } | null>(null)
  const [cargando, setCargando] = useState(true)
  const [fallo, setFallo] = useState(false)

  useEffect(() => {
    let cancelado = false
    void (async () => {
      const r = await fetchBiblioteca()
      if (cancelado) return
      if (r) setDatos(r)
      else setFallo(true)
      setCargando(false)
    })()
    return () => {
      cancelado = true
    }
  }, [])

  const categorias = datos?.categorias ?? []
  const items = datos?.items ?? []
  const conDocumentos = categorias.filter((c) => items.some((i) => i.category_id === c.id))
  const vacias = categorias.filter((c) => !items.some((i) => i.category_id === c.id))

  return (
    <AppLayout>
      <div className="px-4 sm:px-7 py-6 sm:py-8 pb-12 max-w-[1280px] mx-auto">
        <PageHeader
          eyebrow={
            <>
              <LibraryIcon className="h-3.5 w-3.5" /> Biblioteca
            </>
          }
          title="La bibliografía de cada módulo"
          subtitle="Los reglamentos y documentos de referencia que respaldan lo que estudias, ordenados por el módulo del que salen."
        />

        <aside
          className="mb-7 rounded-xl border-l-[3px] border-y border-r p-4 flex items-start gap-3"
          style={{
            borderColor: "color-mix(in oklab, var(--av-amber-400) 26%, transparent)",
            borderLeftColor: "color-mix(in oklab, var(--av-amber-400) 55%, transparent)",
            background: "color-mix(in oklab, var(--av-amber-400) 7%, transparent)",
          }}
        >
          <Info
            className="shrink-0 mt-0.5 h-4 w-4"
            style={{ color: "var(--av-amber-400)" }}
            aria-hidden
          />
          <p className="m-0 text-[13px] leading-relaxed text-foreground/85 max-w-[820px]">
            Las normas se enmiendan. Cada documento muestra la edición exacta con la que está
            cargado, que puede no ser la vigente. Antes de aplicar un límite o un listado, verifica
            la edición en vigor en la fuente oficial, que va enlazada en cada ficha.
          </p>
        </aside>

        {cargando ? (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="surface rounded-xl h-[188px] animate-pulse" aria-hidden />
            ))}
          </div>
        ) : fallo ? (
          <section className="surface rounded-xl p-8 text-center">
            <h2 className="text-[17px] font-semibold">No pudimos cargar la biblioteca</h2>
            <p className="mt-2 text-[15px] text-muted-foreground">
              Vuelve a intentarlo en un momento.
            </p>
          </section>
        ) : conDocumentos.length === 0 ? (
          <section className="surface rounded-xl p-8 text-center">
            <h2 className="text-[17px] font-semibold">Todavía no hay documentos</h2>
            <p className="mt-2 text-[15px] text-muted-foreground max-w-[520px] mx-auto leading-relaxed">
              La bibliografía se va cargando a medida que se publica cada módulo. En cuanto haya
              documentos, aparecen aquí.
            </p>
          </section>
        ) : (
          <div className="flex flex-col gap-9">
            {conDocumentos.map((c) => (
              <Categoria
                key={c.id}
                categoria={c}
                items={items.filter((i) => i.category_id === c.id)}
              />
            ))}
          </div>
        )}

        {/* Estado vacío honesto: los módulos sin bibliografía se dicen, no se
            esconden ni se rellenan con tarjetas fantasma. */}
        {!cargando && !fallo && vacias.length > 0 && (
          <section className="mt-9 rounded-xl surface p-5">
            <div className="text-[13px] font-semibold">Sin bibliografía todavía</div>
            <p className="mt-1.5 text-[13px] text-muted-foreground leading-relaxed max-w-[680px]">
              {vacias.map((c) => c.name).join(", ")}. Se cargan a medida que cada módulo publica sus
              fuentes.
            </p>
          </section>
        )}
      </div>
    </AppLayout>
  )
}

function Categoria({
  categoria,
  items,
}: {
  categoria: CategoriaBiblioteca
  items: ItemBiblioteca[]
}) {
  const color = colorDeCategoria(categoria.color)
  const alModulo = MODULO_DE_CATEGORIA[categoria.slug]

  return (
    <section id={categoria.slug}>
      <div className="mb-4 flex items-center gap-3">
        <span
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
          style={{ background: `color-mix(in oklab, ${color} 14%, transparent)`, color }}
        >
          <IconoCategoria nombre={categoria.icon_name} className="h-4.5 w-4.5" />
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="text-[17px] font-semibold tracking-[-0.01em]">{categoria.name}</h2>
          {categoria.description && (
            <p className="text-[13px] text-muted-foreground">{categoria.description}</p>
          )}
        </div>
        {alModulo && (
          <Link
            to={alModulo}
            className="shrink-0 text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Ir al módulo
          </Link>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {items.map((i) => (
          <Ficha key={i.id} item={i} color={color} />
        ))}
      </div>
    </section>
  )
}

function Ficha({ item, color }: { item: ItemBiblioteca; color: string }) {
  const esPdf = item.type === "pdf"
  const fecha = fechaEdicion(item.published_at)

  return (
    <article className="surface surface-lift rounded-xl p-5 flex flex-col">
      <div className="flex items-center gap-2">
        <span
          className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12px] font-medium"
          style={
            esPdf
              ? { background: `color-mix(in oklab, ${color} 12%, transparent)`, color }
              : { background: "var(--muted)", color: "var(--muted-foreground)" }
          }
        >
          {esPdf ? <FileText className="h-3 w-3" /> : <Info className="h-3 w-3" />}
          {esPdf ? "Documento" : "Referencia"}
        </span>
        {item.source && (
          <span className="text-[12px] text-muted-foreground truncate">{item.source}</span>
        )}
      </div>

      <h3 className="mt-2.5 text-[15px] font-semibold leading-snug">{item.title}</h3>

      {/* La edición va SIEMPRE junto al título. Nunca solo el nombre del
          documento: en material normativo la versión es media información. */}
      <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[12px] text-muted-foreground">
        <span className="font-medium text-foreground/80">
          {item.version ?? "Edición sin indicar"}
        </span>
        <span aria-hidden>·</span>
        <span>{fecha ?? "Fecha sin indicar"}</span>
      </div>

      {item.description && (
        <p className="mt-2.5 text-[13px] text-muted-foreground leading-relaxed">
          {item.description}
        </p>
      )}

      <div className="mt-auto pt-4 flex flex-wrap items-center gap-2">
        {esPdf && (
          <Link
            to={`/app/biblioteca/${item.slug}`}
            className={appButtonClass({ variant: "secondary", size: "md" })}
          >
            Abrir <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        )}
        {/* El enlace oficial va AL LADO del botón de abrir, no en un pie. */}
        {item.embed_url && (
          <a
            href={item.embed_url}
            target="_blank"
            rel="noreferrer noopener"
            className={appButtonClass({ variant: esPdf ? "ghost" : "secondary", size: "md" })}
          >
            Fuente oficial <ExternalLink className="h-3.5 w-3.5" />
          </a>
        )}
      </div>
    </article>
  )
}
