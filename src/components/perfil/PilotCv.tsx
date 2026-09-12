import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import { docAccent, docTint } from "@/lib/docSheet"
import { FuenteChip } from "@/components/perfil/FuenteChip"
import { cvDate, cvDaysUntil } from "@/components/perfil/datos"
import type { CertRow } from "@/components/perfil/tipos"

/**
 * La hoja de vida en papel, pensada para el ojo de un reclutador.
 *
 * La regla que la ordena: separar lo que Aviatory midió (simulacros, práctica,
 * constancia, bitácora) de lo que el piloto declaró (horas, licencias). Esa
 * distinción es la que ninguna hoja de vida en PDF puede ofrecer, y es el
 * argumento para que más adelante las aerolíneas contraten por aquí.
 * Reutiliza la hoja de lectura del módulo NOTAM (.doc-sheet).
 */
export function PilotCv({
  photoUrl,
  fullName,
  username,
  country,
  stage,
  stageLabel,
  totalHours,
  hoursPic,
  horasVerificadas,
  horasVerificadasEn,
  flightCount,
  licenses,
  targetAirline,
  icaoLevel,
  icaoSource,
  icaoTakenAt,
  certs,
  achUnlocked,
  achTotal,
  lastFlight,
  pcaBest,
  quizzes,
  longestStreak,
}: {
  photoUrl: string | null
  fullName: string
  username: string
  country: string
  stage: string
  stageLabel: string | null
  /** Carrera completa: horas previas más bitácora, tal como la calcula la base. */
  totalHours: number | null
  hoursPic: number | null
  horasVerificadas: boolean
  horasVerificadasEn: string | null
  flightCount: number
  licenses: string[]
  targetAirline: string
  icaoLevel: number | null
  icaoSource: "mock" | "estimate" | null
  icaoTakenAt: string | null
  certs: CertRow[]
  achUnlocked: number
  achTotal: number
  lastFlight: string | null
  pcaBest: number | null
  quizzes: number
  longestStreak: number
}) {
  const nombre = fullName.trim() || username.trim() || "Piloto Aviatory"
  const icaoVerificado = icaoSource === "mock" && icaoLevel !== null
  const diasUltimoVuelo = lastFlight !== null ? -cvDaysUntil(lastFlight) : null

  /**
   * Completitud de la hoja: cuenta solo campos que un reclutador espera ver.
   * Cada uno es un dato real presente o ausente, no una estimación.
   */
  const checklist: { label: string; ok: boolean }[] = [
    { label: "foto", ok: Boolean(photoUrl) },
    { label: "nombre", ok: fullName.trim().length > 0 },
    { label: "país", ok: country.trim().length > 0 },
    { label: "etapa", ok: Boolean(stage) },
    { label: "horas declaradas", ok: (totalHours ?? 0) > 0 },
    { label: "licencias", ok: licenses.length > 0 },
    { label: "certificados con vigencia", ok: certs.some((c) => c.expires_date) },
    { label: "inglés ICAO por simulacro", ok: icaoVerificado },
    { label: "bitácora con vuelos", ok: flightCount > 0 },
    { label: "aerolínea objetivo", ok: targetAirline.trim().length > 0 },
  ]
  const completos = checklist.filter((c) => c.ok).length
  const completitud = Math.round((completos / checklist.length) * 100)
  const faltantes = checklist.filter((c) => !c.ok).map((c) => c.label)

  return (
    <article className="doc-sheet rounded-xl px-5 sm:px-8 py-6 sm:py-8">
      {/* Completitud: lo primero que ve el piloto es qué le falta para que un
          reclutador vea una hoja completa. Solo campos reales. */}
      <div className="pb-5 border-b doc-rule">
        <div className="flex items-baseline justify-between gap-3">
          <div className="text-[12px] font-semibold uppercase tracking-[0.14em] doc-muted">
            Hoja lista para reclutador
          </div>
          <span className="tabular-nums text-[20px] font-semibold">{completitud}%</span>
        </div>
        <div className="mt-2 h-1.5 rounded-full overflow-hidden" style={{ background: "color-mix(in oklab, var(--doc-fg) 10%, var(--doc-bg))" }}>
          <div
            className="h-full rounded-full transition-[width] duration-700"
            style={{ width: `${completitud}%`, background: docAccent("var(--av-blue-500)", 70) }}
          />
        </div>
        {faltantes.length > 0 && (
          <p className="mt-2 mb-0 text-[13px] doc-muted">
            Te falta: {faltantes.join(", ")}.
          </p>
        )}
      </div>

      {/* Encabezado del documento */}
      <header className="py-5 border-b doc-rule">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-center gap-4 min-w-0">
            {photoUrl ? (
              <img
                src={photoUrl}
                alt=""
                className="h-16 w-16 rounded-full object-cover border doc-rule flex-shrink-0"
              />
            ) : (
              <div
                className="h-16 w-16 rounded-full flex items-center justify-center text-[22px] font-semibold flex-shrink-0"
                style={{ background: docTint("var(--av-blue-500)", 12), color: docAccent("var(--av-blue-500)", 60) }}
              >
                {(nombre[0] ?? "P").toUpperCase()}
              </div>
            )}
            <div className="min-w-0">
              <div className="text-[12px] font-semibold uppercase tracking-[0.14em] doc-muted">
                Hoja de vida de piloto
              </div>
              <h2 className="mt-0.5 mb-0 text-[24px] font-semibold tracking-[-0.02em] leading-tight">
                {nombre}
              </h2>
              <div className="mt-0.5 text-[13px] doc-muted">
                {username ? `@${username}` : ""}
                {username && country ? " · " : ""}
                {country}
              </div>
            </div>
          </div>
          {stage && stageLabel && (
            <div className="text-right">
              <div className="text-[12px] doc-muted">Etapa</div>
              <div className="text-[15px] font-semibold">{stageLabel}</div>
              {targetAirline && <div className="text-[13px] doc-muted">Objetivo: {targetAirline}</div>}
            </div>
          )}
        </div>
      </header>

      {/* Verificado por Aviatory: lo que la app midió, con fecha. Es la parte
          que una aerolínea no puede conseguir en un PDF. */}
      <div className="py-5 border-b doc-rule">
        <div className="flex items-center gap-2.5 mb-3">
          <span className="text-[12px] font-semibold uppercase tracking-[0.12em] doc-muted">
            Desempeño medido
          </span>
          <FuenteChip verificado />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <div className="text-[12px] doc-muted">Inglés ICAO (simulacro TEA)</div>
            <div className="tabular-nums text-[20px] font-semibold">
              {icaoVerificado ? icaoLevel : "—"}
            </div>
            <div className="text-[12px] doc-muted">
              {icaoVerificado && icaoTakenAt
                ? cvDate(icaoTakenAt.slice(0, 10))
                : icaoVerificado
                  ? "medido"
                  : "sin simulacro"}
            </div>
          </div>
          <div>
            <div className="text-[12px] doc-muted">Mejor examen PCA</div>
            <div className="tabular-nums text-[20px] font-semibold">{pcaBest ?? "—"}</div>
            <div className="text-[12px] doc-muted">{pcaBest !== null ? "sobre 100" : "sin intentos"}</div>
          </div>
          <div>
            <div className="text-[12px] doc-muted">Quizzes resueltos</div>
            <div className="tabular-nums text-[20px] font-semibold">{quizzes > 0 ? quizzes : "—"}</div>
            <div className="text-[12px] doc-muted">{quizzes > 0 ? "en el banco por materia" : "ninguno aún"}</div>
          </div>
          <div>
            <div className="text-[12px] doc-muted">Mejor racha de estudio</div>
            <div className="tabular-nums text-[20px] font-semibold">
              {longestStreak > 0 ? `${longestStreak} d` : "—"}
            </div>
            <div className="text-[12px] doc-muted">
              {achTotal > 0 ? `${achUnlocked} de ${achTotal} logros` : "constancia"}
            </div>
          </div>
        </div>
      </div>

      {/* Bitácora: la recencia es lo primero que mira un reclutador */}
      <div className="py-5 border-b doc-rule">
        <div className="flex items-center gap-2.5 mb-3">
          <span className="text-[12px] font-semibold uppercase tracking-[0.12em] doc-muted">
            Bitácora en Aviatory
          </span>
          <FuenteChip verificado />
        </div>
        {flightCount === 0 ? (
          <p className="m-0 text-[13px] doc-muted">
            Sin vuelos registrados. La bitácora se llena en Logbook y aquí aparece la recencia.
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div>
              <div className="text-[12px] doc-muted">Vuelos</div>
              <div className="tabular-nums text-[20px] font-semibold">{flightCount}</div>
            </div>
            <div>
              <div className="text-[12px] doc-muted">Último vuelo</div>
              <div className="tabular-nums text-[20px] font-semibold">
                {diasUltimoVuelo === null ? "—" : diasUltimoVuelo === 0 ? "Hoy" : `Hace ${diasUltimoVuelo} d`}
              </div>
            </div>
            <div>
              <div className="text-[12px] doc-muted">Fecha</div>
              <div className="text-[15px] font-semibold">{cvDate(lastFlight)}</div>
            </div>
          </div>
        )}
      </div>

      {/* Declarado por el piloto */}
      <div className="py-5 border-b doc-rule">
        <div className="flex items-center gap-2.5 mb-3">
          <span className="text-[12px] font-semibold uppercase tracking-[0.12em] doc-muted">
            Experiencia declarada
          </span>
          <FuenteChip verificado={false} />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <div className="text-[12px] doc-muted">Horas totales</div>
            <div className="tabular-nums text-[20px] font-semibold">{horas(totalHours)}</div>
            {horasVerificadas && (
              <div className="mt-1 flex items-center gap-1.5">
                <FuenteChip verificado />
                <span className="text-[11px] doc-muted">{cvDate(diaDe(horasVerificadasEn))}</span>
              </div>
            )}
          </div>
          <div>
            <div className="text-[12px] doc-muted">Horas PIC</div>
            <div className="tabular-nums text-[20px] font-semibold">{horas(hoursPic)}</div>
          </div>
          <div className="col-span-2">
            <div className="text-[12px] doc-muted">Licencias</div>
            {licenses.length > 0 ? (
              <div className="mt-1 flex flex-wrap gap-2">
                {licenses.map((l) => (
                  <span key={l} className="mono text-[13px] font-semibold px-2.5 py-1 rounded-md border doc-rule doc-soft">
                    {l}
                  </span>
                ))}
              </div>
            ) : (
              <div className="text-[15px] font-semibold doc-muted">—</div>
            )}
          </div>
        </div>
      </div>

      {/* Certificados y vigencias, desde Vencimientos */}
      <div className="py-5 border-b doc-rule">
        <div className="flex items-center gap-2.5 mb-2">
          <span className="text-[12px] font-semibold uppercase tracking-[0.12em] doc-muted">
            Certificados y vigencias
          </span>
          <FuenteChip verificado={false} />
        </div>
        {certs.length === 0 ? (
          <p className="m-0 text-[13px] doc-muted">
            Aún no registras certificados. Se agregan en la sección Vencimientos y aparecen aquí solos.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[440px] border-collapse text-left">
              <thead>
                <tr>
                  {["Documento", "Emitido", "Vence", "Estado"].map((h) => (
                    <th key={h} className="py-2 pr-4 border-b doc-rule doc-muted text-[11px] font-bold uppercase tracking-[0.07em]">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {certs.map((c) => {
                  const dias = c.expires_date ? cvDaysUntil(c.expires_date) : null
                  const estado =
                    dias === null
                      ? { label: "Sin vencimiento", color: "var(--doc-muted, #6a6e76)" }
                      : dias < 0
                        ? { label: "Vencido", color: "var(--av-danger-fg)" }
                        : dias <= 90
                          ? { label: `Vence en ${dias} d`, color: "var(--av-warn-fg)" }
                          : { label: "Vigente", color: "var(--av-success-fg)" }
                  return (
                    <tr key={c.id} className="border-b doc-rule last:border-b-0">
                      <td className="py-2.5 pr-4 text-[13px] font-semibold">
                        {c.custom_name ?? c.license_type}
                      </td>
                      <td className="py-2.5 pr-4 tabular-nums text-[13px] doc-muted">{cvDate(c.issued_date)}</td>
                      <td className="py-2.5 pr-4 tabular-nums text-[13px] doc-muted">{cvDate(c.expires_date)}</td>
                      <td className="py-2.5 pr-4 text-[13px] font-semibold" style={{ color: estado.color }}>
                        {estado.label}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
        <Link
          to="/app/vencimientos"
          className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-semibold"
          style={{ color: docAccent("var(--av-blue-500)", 60) }}
        >
          Gestionar certificados en Vencimientos <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* Pie */}
      <footer className="pt-4 flex flex-wrap items-center justify-between gap-3">
        <div className="text-[13px] doc-muted">
          Lo marcado como verificado lo midió Aviatory con fecha; lo declarado lo escribiste tú.
        </div>
        <div className="text-[12px] doc-muted">
          Visible solo para ti. Compartirla con la comunidad y con aerolíneas: pronto.
        </div>
      </footer>
    </article>
  )
}

/** Las horas con un decimal, o la raya cuando no hay nada que mostrar. */
function horas(valor: number | null): string {
  return valor === null || valor === 0 ? "—" : valor.toFixed(1)
}

/** El día de un instante del servidor, para que lo formatee cvDate. */
function diaDe(iso: string | null): string | null {
  return iso ? iso.slice(0, 10) : null
}
