import { useRef } from "react"
import { ArrowUpRight, CalendarDays, Check, Clock3, MapPin, X } from "lucide-react"
import type { Airline } from "@/services/aerolineas"
import type { Convocatoria } from "@/services/convocatorias"
import { LogoAerolinea } from "@/components/LogoAerolinea"
import {
  PAGINA_DE_EMPLEO,
  fechaLarga,
  nombreDelCargo,
  textoDelAviso,
  type ResumenDeConvocatorias,
} from "@/lib/convocatorias"

/**
 * El aviso de convocatoria de una aerolínea y sus requisitos.
 *
 * Los requisitos van tal como los publicó la aerolínea, con su enlace: no se
 * resumen ni se traducen. Copa publica los suyos en inglés y así se muestran,
 * con la nota de que están en inglés.
 */

/** «Abierta · Panamá» en verde, o «Pendiente por abrir». */
export function AvisoConvocatoria({ resumen }: { resumen: ResumenDeConvocatorias }) {
  const abierta = resumen.abiertas.length > 0
  const Icono = abierta ? Check : Clock3
  return (
    <span
      className="inline-flex w-fit items-center gap-1.5 rounded-full border px-2 py-0.5 text-[11px] font-medium"
      style={
        abierta
          ? {
              color: "var(--av-success-fg)",
              borderColor: "color-mix(in oklab, var(--av-success-fg) 35%, transparent)",
              background: "color-mix(in oklab, var(--av-success-fg) 9%, transparent)",
            }
          : { color: "var(--muted-foreground)", borderColor: "var(--border)" }
      }
    >
      <Icono className="h-3 w-3" aria-hidden />
      {textoDelAviso(resumen)}
    </span>
  )
}

function ListaDeRequisitos({ requisitos }: { requisitos: string[] }) {
  return (
    <ul className="m-0 mt-2 flex list-none flex-col gap-2 p-0">
      {requisitos.map((r) => (
        <li key={r} className="flex gap-2.5 text-[13.5px] leading-snug text-foreground">
          <span aria-hidden className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--marca-acento)]" />
          <span className="min-w-0">{r}</span>
        </li>
      ))}
    </ul>
  )
}

function EnlaceExterno({ href, children }: { href: string; children: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex h-10 items-center gap-2 rounded-lg bg-foreground px-4 text-[13.5px] font-semibold text-background transition-opacity hover:opacity-90"
    >
      {children}
      <ArrowUpRight className="h-4 w-4" aria-hidden />
    </a>
  )
}

function FichaConvocatoria({ c, aerolinea }: { c: Convocatoria; aerolinea: string }) {
  const lugar = [c.ciudad && c.ciudad !== c.pais ? c.ciudad : null, c.pais].filter(Boolean).join(", ")
  return (
    <section className="rounded-xl border border-border p-4">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <h3 className="m-0 text-[16px] font-semibold text-foreground">{c.cargo === "piloto" ? c.titulo : nombreDelCargo(c)}</h3>
        {lugar && (
          <span className="inline-flex items-center gap-1 text-[12.5px] text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" aria-hidden /> {lugar}
          </span>
        )}
      </div>
      {(c.publicadaEn || c.cierraEn) && (
        <p className="m-0 mt-1.5 inline-flex flex-wrap items-center gap-1.5 text-[12.5px] text-muted-foreground">
          <CalendarDays className="h-3.5 w-3.5" aria-hidden />
          {c.publicadaEn && <span>Publicada el {fechaLarga(c.publicadaEn)}</span>}
          {c.publicadaEn && c.cierraEn && <span aria-hidden>·</span>}
          {c.cierraEn && <span>cierra el {fechaLarga(c.cierraEn)}</span>}
        </p>
      )}
      {c.requisitos.length > 0 ? (
        <>
          <p className="versalitas m-0 mt-4 text-[10px] text-muted-foreground">
            Requisitos que publicó {aerolinea}
            {c.idioma === "en" ? " (en inglés)" : ""}
          </p>
          <ListaDeRequisitos requisitos={c.requisitos} />
        </>
      ) : (
        <p className="m-0 mt-3 text-[13px] text-muted-foreground">
          {aerolinea} no publicó los requisitos en lista. Están en la convocatoria.
        </p>
      )}
      <div className="mt-4">
        <EnlaceExterno href={c.url}>Ver la convocatoria</EnlaceExterno>
      </div>
    </section>
  )
}

function Contenido({ aerolinea, resumen }: { aerolinea: Airline; resumen: ResumenDeConvocatorias }) {
  const nombre = aerolinea.name.replace(/ Colombia$/, "")
  const abiertas = [...resumen.abiertas, ...resumen.otrasAbiertas]
  if (abiertas.length > 0) {
    return (
      <div className="flex flex-col gap-3">
        {abiertas.map((c) => (
          <FichaConvocatoria key={c.id} c={c} aerolinea={nombre} />
        ))}
      </div>
    )
  }
  const ref = resumen.referencia
  const pagina = aerolinea.code ? PAGINA_DE_EMPLEO[aerolinea.code] : undefined
  return (
    <div>
      <p className="m-0 text-[14px] text-foreground">
        Hoy {nombre} no tiene convocatoria de piloto abierta.
        {ref ? "" : " En cuanto abra una, aquí aparecen sus requisitos."}
      </p>
      {ref && (
        <section className="mt-4 rounded-xl border border-border p-4">
          <p className="versalitas m-0 text-[10px] text-muted-foreground">
            {ref.tipo === "pagina"
              ? `Lo que pide en su página de pilotos`
              : `Su última convocatoria${ref.cerradaEn ? `, cerrada el ${fechaLarga(ref.cerradaEn)}` : ""}`}
          </p>
          <h3 className="m-0 mt-1.5 text-[16px] font-semibold text-foreground">{ref.cargo === "piloto" ? ref.titulo : nombreDelCargo(ref)}</h3>
          <ListaDeRequisitos requisitos={ref.requisitos} />
          <p className="m-0 mt-3 text-[12.5px] text-muted-foreground">Sirven para ir preparando los documentos mientras abre.</p>
        </section>
      )}
      {(ref?.url ?? pagina) && (
        <div className="mt-4">
          <EnlaceExterno href={(ref?.url ?? pagina) as string}>Ver su página de empleo</EnlaceExterno>
        </div>
      )}
    </div>
  )
}

/** El botón «Ver requisitos» con su ventana. */
export function BotonRequisitos({ aerolinea, resumen }: { aerolinea: Airline; resumen: ResumenDeConvocatorias }) {
  const ventana = useRef<HTMLDialogElement>(null)
  const titulo = `requisitos-${aerolinea.id}`
  return (
    <>
      <button
        type="button"
        onClick={() => ventana.current?.showModal()}
        className="inline-flex h-8 shrink-0 items-center rounded-lg border border-border bg-card px-3 text-[12.5px] font-medium text-foreground transition-colors hover:bg-muted"
      >
        Ver requisitos
      </button>
      <dialog
        ref={ventana}
        aria-labelledby={titulo}
        // Un clic en el fondo cierra; un clic dentro de la ventana, no.
        onClick={(e) => {
          if (e.target === e.currentTarget) e.currentTarget.close()
        }}
        className="m-auto max-h-[85dvh] w-[min(560px,calc(100vw-32px))] overflow-hidden rounded-2xl border border-border bg-card p-0 text-foreground shadow-[0_24px_64px_-24px_rgb(8_20_36/0.45)] backdrop:bg-[rgb(8_20_36/0.55)]"
      >
        <div className="flex max-h-[85dvh] flex-col">
          <header className="flex items-center gap-3 border-b border-border px-5 py-4">
            <LogoAerolinea aerolinea={aerolinea} />
            <h2 id={titulo} className="titular m-0 min-w-0 flex-1 truncate text-[19px] font-medium">
              Convocatoria y requisitos
            </h2>
            <button
              type="button"
              onClick={() => ventana.current?.close()}
              aria-label="Cerrar"
              className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <X className="h-4 w-4" aria-hidden />
            </button>
          </header>
          <div className="overflow-y-auto px-5 py-5">
            <Contenido aerolinea={aerolinea} resumen={resumen} />
            <p className="m-0 mt-5 text-[11.5px] leading-relaxed text-muted-foreground">
              Aviatory revisa el portal de empleo de cada aerolínea cada 6 horas. Los requisitos van tal como ella los
              publicó; la convocatoria de su sitio es la que vale.
            </p>
          </div>
        </div>
      </dialog>
    </>
  )
}
