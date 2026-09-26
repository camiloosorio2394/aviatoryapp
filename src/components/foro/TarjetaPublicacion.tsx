import { Link } from "react-router-dom"
import { Check, MapPin, MessageCircle, Radar, X } from "lucide-react"
import { LogoAerolinea } from "@/components/LogoAerolinea"
import { Autor, BotonCompartir, PlacaCategoria, Votos } from "@/components/foro/Piezas"
import {
  categoriaForo,
  haceCuanto,
  partesConEnlaces,
  rutaCategoria,
  rutaPublicacion,
  type AerolineaForo,
  type PublicacionForo,
} from "@/lib/foro"

/** El logo de la aerolínea de una publicación, con el componente de siempre. */
export function LogoDeAerolinea({ aerolinea, className = "h-5" }: { aerolinea: AerolineaForo; className?: string }) {
  return <LogoAerolinea aerolinea={{ name: aerolinea.nombre, code: aerolinea.codigo, brand_color: aerolinea.color }} className={className} />
}

/**
 * Texto de un piloto: respeta los saltos de línea y vuelve enlaces las
 * direcciones, sin innerHTML. Los enlaces salen `nofollow ugc`: son de
 * usuarios, y Google pide marcarlos así.
 */
export function TextoConEnlaces({ texto, className = "" }: { texto: string; className?: string }) {
  return (
    <p className={`m-0 whitespace-pre-line break-words ${className}`}>
      {partesConEnlaces(texto).map((parte, i) =>
        parte.enlace ? (
          <a
            key={i}
            href={parte.enlace}
            target="_blank"
            rel="nofollow ugc noopener noreferrer"
            className="relative z-10 font-medium underline decoration-from-font underline-offset-2"
            style={{ color: "var(--marca-acento)" }}
          >
            {parte.texto}
          </a>
        ) : (
          <span key={i}>{parte.texto}</span>
        ),
      )}
    </p>
  )
}

/**
 * «¿Sigue vigente?»: el corazón de los avisos rápidos, como el «¿sigue ahí?»
 * de Waze. Cada piloto dice sí o ya no, una vez; su autor no se confirma a sí
 * mismo.
 */
export function AvisoVigencia({
  publicacion,
  onConfirmar,
}: {
  publicacion: PublicacionForo
  onConfirmar: (sigue: boolean | null) => void
}) {
  const { vigente, confirmaciones, desmentidos, mi_confirmacion: mia, es_mia } = publicacion
  return (
    <div className="relative z-10 mt-3.5 flex flex-wrap items-center gap-x-3 gap-y-2 rounded-2xl border border-border bg-muted/40 px-3.5 py-2.5">
      <span
        className="inline-flex items-center gap-2 text-[12.5px] font-semibold"
        style={{ color: vigente ? "var(--av-success-fg)" : "var(--muted-foreground)" }}
      >
        <span
          className={`h-2 w-2 rounded-full ${vigente ? "animate-pulse" : ""}`}
          style={{ background: vigente ? "var(--av-success-fg)" : "var(--muted-foreground)" }}
          aria-hidden
        />
        {vigente ? "Vigente" : "Probablemente ya no aplica"}
      </span>
      <span className="text-[12px] text-muted-foreground">
        {confirmaciones} {confirmaciones === 1 ? "lo confirma" : "lo confirman"}
        {desmentidos > 0 ? ` · ${desmentidos} ya no` : ""}
      </span>
      {!es_mia && (
        <span className="ml-auto flex items-center gap-1.5">
          <span className="mr-0.5 text-[12px] text-muted-foreground">¿Sigue vigente?</span>
          <button
            type="button"
            onClick={() => onConfirmar(mia === true ? null : true)}
            aria-pressed={mia === true}
            className={`inline-flex h-7 items-center gap-1 rounded-full px-2.5 text-[12px] font-semibold transition-colors ${
              mia === true ? "text-white" : "bg-background text-foreground ring-1 ring-inset ring-border hover:bg-muted"
            }`}
            style={mia === true ? { background: "var(--av-success-fg)" } : undefined}
          >
            <Check className="h-3.5 w-3.5" aria-hidden /> Sí
          </button>
          <button
            type="button"
            onClick={() => onConfirmar(mia === false ? null : false)}
            aria-pressed={mia === false}
            className={`inline-flex h-7 items-center gap-1 rounded-full px-2.5 text-[12px] font-semibold transition-colors ${
              mia === false ? "bg-foreground text-background" : "bg-background text-foreground ring-1 ring-inset ring-border hover:bg-muted"
            }`}
          >
            <X className="h-3.5 w-3.5" aria-hidden /> Ya no
          </button>
        </span>
      )}
    </div>
  )
}

/**
 * Una publicación en el feed. Toda la tarjeta abre la publicación (el enlace
 * del título se estira sobre ella); los botones van por encima con z-10.
 */
export function TarjetaPublicacion({
  publicacion: p,
  donde,
  onVotar,
  onConfirmar,
}: {
  publicacion: PublicacionForo
  donde: "publica" | "app"
  onVotar: (valor: -1 | 0 | 1) => void
  onConfirmar: (sigue: boolean | null) => void
}) {
  const categoria = categoriaForo(p.categoria)
  const ruta = rutaPublicacion(p, donde)
  const esAviso = p.categoria === "avisos"
  return (
    <article
      className={`group relative min-w-0 rounded-3xl surface p-4 transition-[border-color,box-shadow] duration-200 hover:border-foreground/15 hover:shadow-[0_12px_28px_-18px_rgb(0_0_0_/_22%)] sm:p-5 ${
        esAviso && p.vigente === false ? "opacity-75" : ""
      }`}
    >
      <div className="flex min-w-0 items-center gap-2 text-[12.5px] text-muted-foreground">
        <PlacaCategoria clave={p.categoria} tamano={26} />
        <Link to={rutaCategoria(p.categoria, donde)} className="relative z-10 shrink-0 font-semibold text-foreground hover:underline">
          {categoria?.nombre ?? p.categoria}
        </Link>
        <span aria-hidden>·</span>
        <span className="min-w-0 truncate">
          <Autor autor={p.autor} />
        </span>
        <span aria-hidden className="shrink-0">·</span>
        <time dateTime={p.creada_en} className="shrink-0">
          {haceCuanto(p.creada_en)}
        </time>
        {p.aerolinea && (
          <span className="ml-auto hidden shrink-0 pl-2 sm:inline-flex">
            <LogoDeAerolinea aerolinea={p.aerolinea} className="h-[18px]" />
          </span>
        )}
      </div>

      {esAviso && (
        <p className="rotulo-mono m-0 mt-3 inline-flex items-center gap-1.5 text-[10.5px]" style={{ color: "var(--marca-acento)" }}>
          <Radar className="h-3.5 w-3.5" aria-hidden /> Aviso rápido
          {p.ciudad && (
            <span className="inline-flex items-center gap-1 text-muted-foreground">
              <MapPin className="h-3 w-3" aria-hidden /> {p.ciudad}
            </span>
          )}
        </p>
      )}

      <h3 className={`m-0 text-[17px] font-semibold leading-snug text-foreground sm:text-[18px] ${esAviso ? "mt-1.5" : "mt-3"}`}>
        <Link to={ruta} className="after:absolute after:inset-0 after:rounded-3xl after:content-['']">
          {p.titulo}
        </Link>
      </h3>

      {p.cuerpo && (
        <TextoConEnlaces
          texto={p.recortado ? `${p.cuerpo.trimEnd()}…` : p.cuerpo}
          className="mt-1.5 line-clamp-3 text-[14px] leading-relaxed text-muted-foreground"
        />
      )}

      {p.aerolinea && (
        <span className="mt-3 inline-flex sm:hidden">
          <LogoDeAerolinea aerolinea={p.aerolinea} className="h-4" />
        </span>
      )}

      {esAviso && <AvisoVigencia publicacion={p} onConfirmar={onConfirmar} />}

      <div className="mt-3.5 flex flex-wrap items-center gap-1.5">
        <Votos puntos={p.puntos} miVoto={p.mi_voto} onVotar={onVotar} compacto />
        <Link
          to={`${ruta}#comentarios`}
          className="relative z-10 inline-flex h-8 items-center gap-1.5 rounded-full px-3 text-[12.5px] font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <MessageCircle className="h-3.5 w-3.5" aria-hidden />
          {p.comentarios} {p.comentarios === 1 ? "comentario" : "comentarios"}
        </Link>
        <BotonCompartir ruta={ruta} titulo={p.titulo} />
      </div>
    </article>
  )
}
