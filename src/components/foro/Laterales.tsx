import { Link, NavLink } from "react-router-dom"
import { CircleHelp, MessageSquareQuote, MessagesSquare, PenLine, Radar, ShieldCheck, Sparkles } from "lucide-react"
import { InsigniaLogro } from "@/components/logros/InsigniaLogro"
import { IconoMarca } from "@/components/marca/Icono"
import { UserAvatar } from "@/components/UserAvatar"
import { PlacaCategoria } from "@/components/foro/Piezas"
import { LogoDeAerolinea } from "@/components/foro/TarjetaPublicacion"
import {
  CATEGORIAS_FORO,
  haceCuanto,
  rutaCategoria,
  rutaPublicacion,
  type CategoriaForo,
  type ClaveCategoria,
  type TendenciasForo,
} from "@/lib/foro"

/** La portada de la comunidad, o la de una categoría. */
export function CabeceraForo({
  categoria,
  usuario,
  foto,
}: {
  categoria: CategoriaForo | null
  usuario: string | null
  foto: string | null
}) {
  const publicar = (clave?: ClaveCategoria) => `/app/comunidad/publicar${clave ? `?categoria=${clave}` : ""}`
  return (
    <header className="relative overflow-hidden rounded-[28px] surface p-5 sm:p-7">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 120% at 100% 0%, color-mix(in oklab, var(--marca-acento) 14%, transparent), transparent 70%)",
        }}
      />
      <div className="relative flex flex-col gap-5 @4xl:flex-row @4xl:items-end @4xl:justify-between">
        <div className="flex min-w-0 items-center gap-4">
          {categoria ? (
            <PlacaCategoria clave={categoria.clave} tamano={60} />
          ) : (
            <span className="placa-icono grid h-[60px] w-[60px] shrink-0 place-items-center rounded-2xl">
              <IconoMarca nombre="comunidad" className="h-11 w-11" />
            </span>
          )}
          <div className="min-w-0">
            <p className="rotulo-mono m-0 text-[10.5px] text-muted-foreground">
              {categoria ? (
                <Link to={rutaCategoria(null)} className="hover:underline">
                  Comunidad
                </Link>
              ) : (
                "Comunidad de pilotos"
              )}
            </p>
            <h1 className="display-archivo m-0 mt-1.5 text-[30px] font-extrabold leading-[1.05] text-foreground sm:text-[36px]">
              {categoria ? categoria.nombre : "Comunidad"}
            </h1>
            <p className="m-0 mt-2 max-w-[560px] text-[14px] leading-relaxed text-muted-foreground">
              {categoria
                ? categoria.descripcion
                : "Convocatorias, entrevistas, cursos y avisos de pilotos que van para el mismo lado que tú. Lo que a uno le sirvió, le sirve al siguiente."}
            </p>
          </div>
        </div>
      </div>

      {/* El compositor, a un toque. */}
      <div className="relative mt-5 flex flex-col gap-2.5 @2xl:flex-row @2xl:items-center">
        <Link
          to={publicar(categoria?.clave)}
          className="flex min-w-0 flex-1 items-center gap-3 rounded-2xl border border-border bg-background px-3.5 py-3 text-[14px] text-muted-foreground transition-colors hover:border-foreground/25"
        >
          <UserAvatar username={usuario} photoUrl={foto} size="sm" />
          <span className="truncate">{categoria ? `Publica en ${categoria.nombre}` : "¿Qué quieres contarle a los pilotos?"}</span>
          <PenLine className="ml-auto h-4 w-4 shrink-0" aria-hidden />
        </Link>
        {!categoria && (
          <div className="flex gap-2 overflow-x-auto pr-10 [mask-image:linear-gradient(to_right,#000_calc(100%-48px),transparent)] @2xl:pr-0 @2xl:[mask-image:none]">
            {[
              { clave: "avisos" as const, nombre: "Aviso rápido", icono: Radar },
              { clave: "entrevistas" as const, nombre: "Experiencia", icono: MessageSquareQuote },
              { clave: "preguntas" as const, nombre: "Pregunta", icono: CircleHelp },
            ].map((a) => (
              <Link
                key={a.clave}
                to={publicar(a.clave)}
                className="inline-flex h-11 shrink-0 items-center gap-2 rounded-2xl border border-border bg-background px-3.5 text-[13px] font-semibold text-foreground transition-colors hover:bg-muted"
              >
                <a.icono className="h-4 w-4" style={{ color: "var(--marca-acento)" }} aria-hidden />
                {a.nombre}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  )
}

/** El menú de categorías: columna en pantallas anchas, fila deslizable en el celular. */
export function MenuCategorias({
  activa,
  tendencias,
}: {
  activa: ClaveCategoria | null
  tendencias: TendenciasForo | null
}) {
  const semana = new Map(tendencias?.categorias.map((c) => [c.clave, c.semana]) ?? [])
  const clase = (activo: boolean) =>
    `flex min-w-0 items-center gap-2.5 rounded-2xl px-2.5 py-2 text-[13.5px] transition-colors ${
      activo ? "bg-foreground/[0.06] font-semibold text-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"
    }`
  return (
    <nav aria-label="Categorías de la comunidad" className="min-w-0">
      {/* Hasta pantallas muy anchas: fila de pastillas que se desliza. El
          borde derecho se desvanece para que se vea que sigue. */}
      <ul className="m-0 flex list-none gap-2 overflow-x-auto p-0 pb-1 pr-12 [mask-image:linear-gradient(to_right,#000_calc(100%-56px),transparent)] @7xl:hidden">
        <li className="shrink-0">
          <Link
            to={rutaCategoria(null)}
            className={`inline-flex h-10 items-center gap-2 rounded-full border px-3.5 text-[13px] font-semibold ${
              activa === null ? "border-foreground bg-foreground text-background" : "border-border bg-card text-foreground"
            }`}
          >
            <Sparkles className="h-4 w-4" aria-hidden /> Todo
          </Link>
        </li>
        {CATEGORIAS_FORO.map((c) => (
          <li key={c.clave} className="shrink-0">
            <Link
              to={rutaCategoria(c.clave)}
              className={`inline-flex h-10 items-center gap-2 rounded-full border pl-1.5 pr-3.5 text-[13px] font-semibold ${
                activa === c.clave ? "border-foreground bg-foreground text-background" : "border-border bg-card text-foreground"
              }`}
            >
              <PlacaCategoria clave={c.clave} tamano={28} />
              {c.nombre}
            </Link>
          </li>
        ))}
      </ul>

      {/* Muy ancha: columna. */}
      <div className="hidden @7xl:block">
        <p className="rotulo-mono m-0 px-2.5 text-[10.5px] text-muted-foreground">Categorías</p>
        <ul className="m-0 mt-2 flex list-none flex-col gap-0.5 p-0">
          <li>
            <NavLink to={rutaCategoria(null)} end className={({ isActive }) => clase(isActive && activa === null)}>
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-muted text-foreground">
                <Sparkles className="h-4 w-4" aria-hidden />
              </span>
              <span className="truncate">Todo</span>
            </NavLink>
          </li>
          {CATEGORIAS_FORO.map((c) => (
            <li key={c.clave}>
              <Link to={rutaCategoria(c.clave)} className={clase(activa === c.clave)} aria-current={activa === c.clave ? "page" : undefined}>
                <PlacaCategoria clave={c.clave} tamano={32} />
                <span className="min-w-0 flex-1 truncate">{c.nombre}</span>
                {(semana.get(c.clave) ?? 0) > 0 && (
                  <span className="shrink-0 text-[11px] font-semibold tabular-nums text-muted-foreground" title="Publicaciones esta semana">
                    {semana.get(c.clave)}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>

        {tendencias && tendencias.aerolineas.length > 0 && (
          <>
            <p className="rotulo-mono m-0 mt-7 px-2.5 text-[10.5px] text-muted-foreground">Aerolíneas en conversación</p>
            <ul className="m-0 mt-2 flex list-none flex-col gap-0.5 p-0">
              {tendencias.aerolineas.map((a) => (
                <li key={a.id}>
                  <Link
                    to={`${rutaCategoria(activa)}?aerolinea=${a.id}`}
                    className="flex items-center justify-between gap-2 rounded-2xl px-2.5 py-2 transition-colors hover:bg-muted"
                  >
                    <LogoDeAerolinea aerolinea={a} className="h-[18px]" />
                    <span className="shrink-0 text-[11px] font-semibold tabular-nums text-muted-foreground">{a.publicaciones}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}

        <Link
          to="/app/comunidad/salas"
          className="mt-7 flex items-center gap-2.5 rounded-2xl px-2.5 py-2 text-[13px] text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <MessagesSquare className="h-4 w-4" aria-hidden /> Salas de chat
        </Link>
      </div>
    </nav>
  )
}

/** A la derecha: los avisos que siguen vigentes y las normas. */
export function PanelLateral({ tendencias }: { tendencias: TendenciasForo | null }) {
  const avisos = tendencias?.avisos ?? []
  return (
    <aside className="flex min-w-0 flex-col gap-4" aria-label="Avisos y normas de la comunidad">

      <section className="rounded-3xl surface p-5" aria-labelledby="foro-avisos">
        <div className="flex items-center gap-2.5">
          <PlacaCategoria clave="avisos" tamano={30} />
          <h2 id="foro-avisos" className="rotulo-mono m-0 text-[10.5px] text-muted-foreground">
            Avisos activos
          </h2>
        </div>
        {avisos.length === 0 ? (
          <p className="m-0 mt-3 text-[13px] leading-relaxed text-muted-foreground">
            Nada vigente por ahora. Si ves que una aerolínea abrió proceso o está llamando, avísale a los demás.
          </p>
        ) : (
          <ol className="m-0 mt-3 flex list-none flex-col gap-1 p-0">
            {avisos.map((a) => (
              <li key={a.id}>
                <Link to={rutaPublicacion(a)} className="block rounded-2xl p-2.5 transition-colors hover:bg-muted">
                  {a.aerolinea && <LogoDeAerolinea aerolinea={a.aerolinea} className="h-4" />}
                  <span className="mt-1.5 line-clamp-2 block text-[13px] font-semibold leading-snug text-foreground">{a.titulo}</span>
                  <span className="mt-1 block text-[11.5px] text-muted-foreground">
                    <span style={{ color: "var(--av-success-fg)" }}>
                      {a.confirmaciones} {a.confirmaciones === 1 ? "confirma" : "confirman"}
                    </span>
                    {a.ciudad ? ` · ${a.ciudad}` : ""} · {haceCuanto(a.creada_en)}
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        )}
        <Link
          to="/app/comunidad/publicar?categoria=avisos"
          className="mt-3 inline-flex items-center gap-1.5 text-[12.5px] font-semibold hover:underline"
          style={{ color: "var(--marca-acento)" }}
        >
          <Radar className="h-3.5 w-3.5" aria-hidden /> Dar un aviso
        </Link>
      </section>

      <section className="rounded-3xl surface p-5" aria-labelledby="foro-normas">
        <div className="flex items-center gap-2.5">
          <InsigniaLogro code="foro-normas" nivel="silver" conseguido tamano={30} icono={ShieldCheck} forma="hito" />
          <h2 id="foro-normas" className="rotulo-mono m-0 text-[10.5px] text-muted-foreground">
            Normas de la comunidad
          </h2>
        </div>
        <ul className="m-0 mt-3 flex list-none flex-col gap-2 p-0 text-[13px] leading-snug text-muted-foreground">
          <li>Cuenta lo que te pasó a ti, con detalles que le sirvan al siguiente.</li>
          <li>Convocatorias con el enlace oficial de la aerolínea.</li>
          <li>Nada de datos personales de otros ni documentos internos.</li>
          <li>Todos van para la misma cabina: sin ataques ni burlas.</li>
        </ul>
        <p className="m-0 mt-3 text-[12px] text-muted-foreground">
          Lo que tres pilotos reportan se oculta mientras lo revisamos.
        </p>
      </section>
    </aside>
  )
}
