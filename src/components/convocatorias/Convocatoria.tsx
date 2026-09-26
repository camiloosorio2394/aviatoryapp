import { useRef } from "react"
import { ArrowUpRight, CalendarDays, Check, CircleHelp, Clock3, MapPin, X } from "lucide-react"
import type { Airline } from "@/services/aerolineas"
import type { Convocatoria } from "@/services/convocatorias"
import { LogoAerolinea } from "@/components/LogoAerolinea"
import {
  PAGINA_DE_EMPLEO,
  banderaDe,
  chequeosDeConvocatoria,
  fechaCorta,
  fechaLarga,
  nombreDelCargo,
  numerosDe,
  textoDeHoras,
  textoDelAviso,
  type PerfilParaConvocatoria,
  type ResumenDeConvocatorias,
} from "@/lib/convocatorias"

/**
 * Las convocatorias de las aerolíneas: la tarjeta de cada una, el aviso de la
 * aerolínea y la ventana de requisitos.
 *
 * Cada convocatoria va por separado, con su cargo y su país: JetSMART con
 * primer oficial en Argentina y capitán en Colombia son dos (Camilo,
 * 26-sep-2026). Los requisitos y las horas son los que publicó la aerolínea;
 * no se resumen ni se traducen, y lo que no publicó se dice.
 */

/** La bandera del país, pequeña. Sin bandera conocida, nada. */
export function Bandera({ pais, className = "h-3.5" }: { pais: string | null; className?: string }) {
  const src = banderaDe(pais)
  if (!src) return null
  return (
    <img
      src={src}
      alt=""
      aria-hidden
      loading="lazy"
      decoding="async"
      className={`w-auto shrink-0 rounded-[2px] shadow-[0_0_0_1px_rgb(0_0_0/0.12)] ${className}`}
    />
  )
}

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

function EnlaceExterno({ href, children, sutil = false }: { href: string; children: string; sutil?: boolean }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={
        sutil
          ? "inline-flex h-8 shrink-0 items-center gap-1.5 rounded-lg px-2.5 text-[12.5px] font-medium text-foreground transition-colors hover:bg-muted"
          : "inline-flex h-10 items-center gap-2 rounded-lg bg-foreground px-4 text-[13.5px] font-semibold text-background transition-opacity hover:opacity-90"
      }
    >
      {children}
      <ArrowUpRight className={sutil ? "h-3.5 w-3.5" : "h-4 w-4"} aria-hidden />
    </a>
  )
}

function Fechas({ c, corta = false }: { c: Convocatoria; corta?: boolean }) {
  if (!c.publicadaEn && !c.cierraEn) return null
  const f = corta ? fechaCorta : fechaLarga
  return (
    <p className="m-0 inline-flex flex-wrap items-center gap-1.5 text-[12.5px] text-muted-foreground">
      <CalendarDays className="h-3.5 w-3.5" aria-hidden />
      {c.publicadaEn && <span>{corta ? "Publicada" : "Publicada el"} {f(c.publicadaEn)}</span>}
      {c.publicadaEn && c.cierraEn && <span aria-hidden>·</span>}
      {c.cierraEn && <span>{corta ? "cierra" : "cierra el"} {f(c.cierraEn)}</span>}
    </p>
  )
}

function FichaConvocatoria({ c, aerolinea }: { c: Convocatoria; aerolinea: string }) {
  const lugar = [c.ciudad && c.ciudad !== c.pais ? c.ciudad : null, c.pais].filter(Boolean).join(", ")
  const horas = textoDeHoras(numerosDe(c), c.pais)
  return (
    <section className="rounded-xl border border-border p-4">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <h3 className="m-0 text-[16px] font-semibold text-foreground">{c.cargo === "piloto" ? c.titulo : nombreDelCargo(c)}</h3>
        {lugar && (
          <span className="inline-flex items-center gap-1.5 text-[12.5px] text-muted-foreground">
            <Bandera pais={c.pais} /> {lugar}
          </span>
        )}
      </div>
      <div className="mt-1.5">
        <Fechas c={c} />
      </div>
      {horas && (
        <p className="m-0 mt-2 text-[12.5px] text-foreground/85">
          <span className="font-medium">Horas mínimas:</span> {horas}
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

function Contenido({
  aerolinea,
  abiertas,
  referencia,
}: {
  aerolinea: Airline
  abiertas: Convocatoria[]
  referencia: Convocatoria | null
}) {
  const nombre = aerolinea.name.replace(/ Colombia$/, "")
  if (abiertas.length > 0) {
    return (
      <div className="flex flex-col gap-3">
        {abiertas.map((c) => (
          <FichaConvocatoria key={c.id} c={c} aerolinea={nombre} />
        ))}
      </div>
    )
  }
  const pagina = aerolinea.code ? PAGINA_DE_EMPLEO[aerolinea.code] : undefined
  return (
    <div>
      <p className="m-0 text-[14px] text-foreground">
        Hoy {nombre} no tiene convocatoria de piloto abierta.
        {referencia ? "" : " En cuanto abra una, aquí aparecen sus requisitos."}
      </p>
      {referencia && (
        <section className="mt-4 rounded-xl border border-border p-4">
          <p className="versalitas m-0 text-[10px] text-muted-foreground">
            {referencia.tipo === "pagina"
              ? "Lo que pide en su página de pilotos"
              : `Su última convocatoria${referencia.cerradaEn ? `, cerrada el ${fechaLarga(referencia.cerradaEn)}` : ""}`}
          </p>
          <h3 className="m-0 mt-1.5 text-[16px] font-semibold text-foreground">
            {referencia.cargo === "piloto" ? referencia.titulo : nombreDelCargo(referencia)}
          </h3>
          <ListaDeRequisitos requisitos={referencia.requisitos} />
          <p className="m-0 mt-3 text-[12.5px] text-muted-foreground">Sirven para ir preparando los documentos mientras abre.</p>
        </section>
      )}
      {(referencia?.url ?? pagina) && (
        <div className="mt-4">
          <EnlaceExterno href={(referencia?.url ?? pagina) as string}>Ver su página de empleo</EnlaceExterno>
        </div>
      )}
    </div>
  )
}

/** El botón «Ver requisitos» con su ventana: de una convocatoria, o de la aerolínea si no tiene abiertas. */
export function BotonRequisitos({
  aerolinea,
  abiertas,
  referencia = null,
  clave,
}: {
  aerolinea: Airline
  abiertas: Convocatoria[]
  referencia?: Convocatoria | null
  /** Distingue la ventana cuando hay varias de la misma aerolínea en la pantalla. */
  clave: string
}) {
  const ventana = useRef<HTMLDialogElement>(null)
  const titulo = `requisitos-${clave}`
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
              {abiertas.length > 0 ? "Convocatoria y requisitos" : "Requisitos"}
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
            <Contenido aerolinea={aerolinea} abiertas={abiertas} referencia={referencia} />
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

/**
 * Una convocatoria abierta: la aerolínea, el país con su bandera, el cargo,
 * las fechas y lo que pide frente a lo que tiene el piloto.
 */
export function TarjetaConvocatoria({
  convocatoria: c,
  aerolinea,
  piloto,
}: {
  convocatoria: Convocatoria
  aerolinea: Airline
  piloto: PerfilParaConvocatoria
}) {
  const chequeos = chequeosDeConvocatoria(c, piloto)
  return (
    <article className="surface flex min-w-0 flex-col rounded-2xl p-5">
      <div className="flex items-center justify-between gap-3">
        <LogoAerolinea aerolinea={aerolinea} />
        {c.pais && (
          <span className="inline-flex min-w-0 items-center gap-1.5 text-[12px] text-muted-foreground">
            <Bandera pais={c.pais} />
            <span className="truncate">{c.pais}</span>
          </span>
        )}
      </div>
      <h3 className="m-0 mt-3.5 text-[17px] font-semibold tracking-[-0.01em] text-foreground">
        {c.cargo === "piloto" ? c.titulo : nombreDelCargo(c)}
      </h3>
      <div className="mt-1">
        <Fechas c={c} corta />
      </div>
      <ul className="m-0 mt-4 flex list-none flex-col gap-2 p-0">
        {chequeos.length === 0 && (
          <li className="flex items-center gap-2 text-[12.5px] text-muted-foreground">
            <CircleHelp className="h-3.5 w-3.5 shrink-0" aria-hidden />
            No publica horas ni nivel de inglés: revisa sus requisitos.
          </li>
        )}
        {chequeos.map((ch) => (
          <li key={ch.etiqueta} className="flex items-center justify-between gap-3 text-[12.5px]">
            <span className="text-muted-foreground">{ch.etiqueta}</span>
            <span className="flex items-center gap-2">
              <span className="cifra text-[13px] text-foreground">Pide {ch.pide}</span>
              <span
                className="rounded-full px-2 py-0.5 text-[11px] font-medium"
                style={
                  ch.cumple === null
                    ? { color: "var(--muted-foreground)", background: "var(--muted)" }
                    : ch.cumple
                      ? { color: "var(--av-success-fg)", background: "color-mix(in oklab, var(--av-success-fg) 11%, transparent)" }
                      : { color: "var(--av-warn-fg)", background: "color-mix(in oklab, var(--av-warn-fg) 12%, transparent)" }
                }
              >
                {ch.cumple === null ? ch.tienes : `Tienes ${ch.tienes}`}
              </span>
            </span>
          </li>
        ))}
      </ul>
      <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-5">
        <BotonRequisitos aerolinea={aerolinea} abiertas={[c]} clave={`c${c.id}`} />
        <EnlaceExterno href={c.url} sutil>
          Postularme
        </EnlaceExterno>
      </div>
    </article>
  )
}

/** Una aerolínea sin convocatoria abierta: su aviso y lo último que se le conoce. */
export function TarjetaSinConvocatoria({ aerolinea, resumen }: { aerolinea: Airline; resumen: ResumenDeConvocatorias }) {
  return (
    <article className="surface flex min-w-0 flex-col gap-3 rounded-2xl p-5">
      <div className="flex items-center justify-between gap-3">
        <LogoAerolinea aerolinea={aerolinea} />
        <span className="inline-flex min-w-0 items-center gap-1.5 text-[12px] text-muted-foreground">
          <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden />
          <span className="truncate">{aerolinea.country}</span>
        </span>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <AvisoConvocatoria resumen={resumen} />
        <BotonRequisitos aerolinea={aerolinea} abiertas={[]} referencia={resumen.referencia} clave={`a${aerolinea.id}`} />
      </div>
    </article>
  )
}
