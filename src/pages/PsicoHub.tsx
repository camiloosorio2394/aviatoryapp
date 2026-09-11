import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { ArrowLeft, ArrowRight, Brain, GraduationCap, Target, Timer } from "lucide-react"
import { Rotulo } from "@/components/ui/rotulo"
import { CourseCard } from "@/components/ui/course-card"
import type { CourseCardProps } from "@/components/ui/course-card"
import heroPhoto from "@/assets/photos/psicotecnicas-mano-panel.jpg"
import { useInView } from "@/hooks/useInView"
import { useSession } from "@/hooks/useSession"
import {
  CATEGORIAS,
  MODOS,
  NIVELES,
  NOTA_TIEMPOS,
  SIMULACRO,
  SIMULACRO_TOTAL,
  TIEMPOS,
  type CategoriaPsico,
} from "@/lib/psicotecnicas"
import { leerPsicoLocal, mejorSimulacroRemoto } from "@/lib/psicotecnicasProgress"
import { PSICO_TOTAL } from "@/lib/psicotecnicasConteo"

/**
 * Portada del tema Pruebas psicotécnicas (módulo Ingreso a aerolínea).
 * Ruta: /app/aerolinea/psicotecnicas
 *
 * Responde tres preguntas en este orden, y ese orden **es** el diseño: qué es
 * esta sección, cómo vas, por dónde entras. Sigue el patrón de la portada de
 * NOTAM —hero con la foto a sangre bajo un velo navy, franja de avance de una
 * sola caja y las partes en `CourseCard`— para que las dos se lean como la
 * misma casa con otro contenido.
 *
 * Ninguna cifra está escrita a mano: los totales salen del banco, así que si
 * mañana entran los ejercicios que faltan por cargar, la pantalla lo dice
 * sola.
 *
 * El avance que hay es el que hay: mientras la migración del módulo siga sin
 * aplicar (ver `docs/PENDIENTES_CAMILO.md` §8.6) los intentos solo viven en
 * `localStorage`, así que la franja enseña el último acierto por familia y no
 * un recuento de ejercicios resueltos que hoy no existe. Antes eso que
 * inventar una cifra.
 */

/** La ilustración de cada parte, dibujada para el módulo. */
const MEDIA = {
  aprende: "/infografias/psicotecnicas/familia-espacial.webp",
  practica: "/infografias/psicotecnicas/familia-abstracto.webp",
  evaluacion: "/infografias/psicotecnicas/familia-numerico.webp",
  simulacro: "/infografias/psicotecnicas/portada.webp",
}

const COLOR_FAMILIA: Record<CategoriaPsico, string> = {
  abstracto: "var(--av-violet-400)",
  espacial: "var(--av-cyan-400)",
  numerico: "var(--av-green-400)",
}

const FAMILIAS = ["abstracto", "espacial", "numerico"] as const

export function PsicoHub() {
  const { user, isLoading: sessionLoading } = useSession()
  const [local, setLocal] = useState(() => leerPsicoLocal())
  const [mejorRemoto, setMejorRemoto] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (sessionLoading) return
    let cancelado = false

    async function cargar() {
      setLocal(leerPsicoLocal())
      if (!user) {
        if (!cancelado) setLoading(false)
        return
      }
      // Si la consulta falla no se rompe la pantalla: queda el respaldo local.
      const mejor = await mejorSimulacroRemoto(user.id).catch(() => null)
      if (cancelado) return
      setMejorRemoto(mejor)
      setLoading(false)
    }

    void cargar()
    return () => {
      cancelado = true
    }
  }, [user, sessionLoading])

  /** El mejor simulacro, venga de la cuenta o del respaldo local. */
  const mejorSimulacro = useMemo(() => {
    const candidatos = [mejorRemoto, local.mejorSimulacro].filter(
      (n): n is number => typeof n === "number"
    )
    return candidatos.length > 0 ? Math.max(...candidatos) : null
  }, [mejorRemoto, local.mejorSimulacro])

  const partes: CourseCardProps[] = [
    {
      title: "Aprende",
      blurb:
        "Las reglas que resuelven la mitad de los ejercicios espaciales, y ocho ejercicios ya resueltos paso a paso. Sin reloj.",
      icon: GraduationCap,
      color: "var(--av-cyan-400)",
      meta: "Lección · cubos y desarrollos",
      photo: MEDIA.aprende,
      to: "/app/aerolinea/psicotecnicas/aprende",
      cta: "Ver la lección",
      status: "Sin cronómetro",
    },
    {
      title: "Práctica",
      blurb: MODOS.entrenamiento.descripcion,
      icon: Brain,
      color: "var(--av-violet-400)",
      meta: `${PSICO_TOTAL} ejercicios · ${TIEMPOS.entrenamiento.abstracto} s recomendados`,
      photo: MEDIA.practica,
      to: "/app/aerolinea/psicotecnicas/practica",
      cta: "Entrenar",
      status: local.sesiones > 0 ? `${local.sesiones} tandas terminadas` : "Empieza por aquí",
      statusLoading: loading,
    },
    {
      title: "Evaluación",
      blurb: MODOS.evaluacion.descripcion,
      icon: Target,
      color: "var(--av-blue-500)",
      meta: `Abstracto y espacial ${TIEMPOS.evaluacion.abstracto} s · numérico ${TIEMPOS.evaluacion.numerico} s`,
      photo: MEDIA.evaluacion,
      to: "/app/aerolinea/psicotecnicas/evaluacion",
      cta: "Presentar evaluación",
      status: "Con el reloj apretado",
    },
    {
      title: "Simulacro",
      blurb: MODOS.simulacion.descripcion,
      icon: Timer,
      color: "var(--av-amber-400)",
      meta: `${SIMULACRO_TOTAL} ejercicios · ${SIMULACRO.abstracto} de cada familia`,
      photo: MEDIA.simulacro,
      to: "/app/aerolinea/psicotecnicas/simulacro",
      cta: "Ir al simulacro",
      status: mejorSimulacro === null ? "Sin intentos" : `Tu mejor resultado: ${mejorSimulacro}%`,
      progress: mejorSimulacro ?? undefined,
      statusLoading: loading,
      highlight: true,
    },
  ]

  return (
    <>
      <div className="psico-hub mx-auto max-w-[1280px] px-5 py-9 pb-24 sm:px-8 sm:py-11">
        <Link
          to="/app/aerolinea"
          className="mb-4 inline-flex items-center gap-1.5 text-[13px] text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Volver a Ingreso a aerolínea
        </Link>

        {/* Hero de sección. La foto va a sangre bajo un velo navy: el título
            tiene que leerse sobre cualquier zona de la imagen, y por eso el
            velo es un degradado y no una opacidad plana. El panel de avance
            vive dentro del hero porque "qué es esto" y "cómo voy" son la misma
            pregunta al llegar. */}
        <section className="relative overflow-hidden rounded-[18px] shadow-[0_1px_2px_rgba(11,27,48,0.08)]">
          <img
            src={heroPhoto}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(105deg, rgba(8,20,36,.90) 0%, rgba(8,20,36,.76) 40%, rgba(8,20,36,.50) 70%, rgba(8,20,36,.30) 100%)",
            }}
            aria-hidden
          />

          <div className="relative grid gap-8 px-7 pb-10 pt-9 sm:px-12 sm:pb-12 sm:pt-11 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] lg:gap-10">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-3">
                <span className="ph-display text-[11px] font-semibold uppercase tracking-[0.16em] text-[#7FB2F2]">
                  Sección 02
                </span>
                <span className="h-3 w-px bg-white/20" aria-hidden />
                <span className="ph-display text-[11px] font-semibold uppercase tracking-[0.16em] text-white/60">
                  Ingreso a aerolínea
                </span>
              </div>

              <h1 className="ph-display mt-4 text-[42px] font-bold leading-none tracking-[-0.03em] text-white sm:text-[52px] lg:text-[64px]">
                Pruebas psicotécnicas
              </h1>

              <p className="mt-5 max-w-[56ch] text-[17px] leading-[1.6] text-white/80">
                Razonamiento abstracto, espacial y numérico contra el reloj. Las aerolíneas las
                piden porque miden cómo piensas cuando el tiempo aprieta, que es la mitad del
                trabajo en cabina.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Link
                  to="/app/aerolinea/psicotecnicas/practica"
                  className="inline-flex min-h-[48px] items-center gap-2 rounded-[10px] px-6 text-[15px] font-semibold text-white shadow-[0_6px_18px_rgba(10,26,47,0.35)] transition-colors"
                  style={{ background: "var(--av-blue-500)" }}
                >
                  <Brain className="h-4 w-4" /> Empezar a practicar
                </Link>
                <Link
                  to="/app/aerolinea/psicotecnicas/simulacro"
                  className="inline-flex min-h-[48px] items-center gap-2 whitespace-nowrap rounded-[10px] border border-white/25 px-5 text-[15px] font-medium text-white/90 transition-colors hover:border-white/60 hover:text-white"
                >
                  <Timer className="h-4 w-4" /> Hacer el simulacro
                </Link>
              </div>
            </div>

            {/* Panel de avance. Cristal sobre la foto, no tarjeta blanca: una
                superficie clara aquí partiría el hero en dos pantallas. */}
            <div className="self-start rounded-[14px] border border-white/15 bg-[rgba(6,17,31,0.62)] px-5 py-[18px] backdrop-blur-[6px] lg:min-w-[230px]">
              <div className="ph-display text-[10px] font-semibold uppercase tracking-[0.16em] text-white/55">
                Tu avance
              </div>
              {loading ? (
                <>
                  <div className="mt-3 h-9 w-24 animate-pulse rounded bg-white/15" />
                  <div className="mt-4 h-1 animate-pulse rounded-sm bg-white/15" />
                </>
              ) : mejorSimulacro === null ? (
                <>
                  <div className="mt-2 text-[15px] font-semibold leading-tight text-white">
                    Todavía sin simulacro
                  </div>
                  <div className="mt-4 h-1 rounded-sm bg-white/15" aria-hidden />
                </>
              ) : (
                <>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="ph-display tabular text-[40px] font-bold leading-none text-white">
                      {mejorSimulacro}%
                    </span>
                    <span className="text-[13px] text-white/60">en el simulacro</span>
                  </div>
                  <div
                    className="mt-4 h-1 overflow-hidden rounded-sm bg-white/15"
                    role="progressbar"
                    aria-valuenow={mejorSimulacro}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label="Mejor resultado en el simulacro psicotécnico"
                  >
                    <div
                      className="h-full rounded-sm transition-[width]"
                      style={{ width: `${mejorSimulacro}%`, background: "#4E9BF5" }}
                    />
                  </div>
                </>
              )}
              <p className="mt-3 text-[12px] leading-[1.5] text-white/55">
                {user
                  ? "Se guarda en tu cuenta a medida que avanzas."
                  : "Inicia sesión para guardar tu avance en la cuenta."}
              </p>
            </div>
          </div>
        </section>

        {/* Franja de avance. El separador entre celdas es el hueco de un píxel
            de la retícula sobre el color del borde: una sola caja con tres
            celdas, y no tres tarjetas sueltas. */}
        <FranjaFamilias local={local} cargando={loading} />

        {/* Las 4 partes */}
        <section className="pt-14">
          <Rotulo>La sección · 4 partes</Rotulo>
          <h2 className="ph-display mt-1.5 text-[24px] font-semibold leading-tight tracking-[-0.021em]">
            Por dónde vas a pasar
          </h2>
          <p className="mt-1.5 max-w-[60ch] text-[15px] text-muted-foreground">
            El orden recomendado es de arriba abajo, pero puedes entrar a cualquiera.
          </p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {partes.map((p) => (
              <CourseCard key={p.to} {...p} />
            ))}
          </div>
        </section>

        {/* Progresión de niveles */}
        <section className="mt-14 rounded-[14px] border border-border bg-card p-6 sm:p-8">
          <Rotulo>Progresión</Rotulo>
          <h2 className="ph-display mt-1.5 text-[24px] font-semibold leading-tight tracking-[-0.021em]">
            Precisión, después velocidad, después precisión bajo presión
          </h2>
          <p className="mt-1.5 max-w-[68ch] text-[15px] text-muted-foreground">
            Subir de nivel no es solo cambiar de ejercicios: es hacer los mismos con menos tiempo.
            En evaluación, el nivel multiplica el reloj.
          </p>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            {(["basico", "intermedio", "avanzado"] as const).map((n, i) => (
              <div key={n} className="rounded-[12px] border border-border p-4">
                <div className="text-[13px] font-semibold" style={{ color: "var(--av-blue-500)" }}>
                  Nivel {i + 1}
                </div>
                <div className="ph-display mt-0.5 text-[15px] font-semibold">
                  {NIVELES[n].nombre}
                </div>
                <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">
                  {NIVELES[n].descripcion}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Lo que el módulo no promete. Va al final y no al principio: importa,
            pero no es lo primero que necesita saber quien llega a entrenar. */}
        <div
          className="mt-6 rounded-[12px] p-4 text-[13px] leading-relaxed"
          style={{
            background: "color-mix(in oklab, var(--av-amber-400) 8%, transparent)",
            border: "1px solid color-mix(in oklab, var(--av-amber-400) 26%, transparent)",
          }}
        >
          <strong className="font-semibold text-foreground">Importante:</strong> el módulo es una
          herramienta de preparación y no representa la prueba oficial de ninguna aerolínea. Las
          pruebas de selección varían bastante entre aerolíneas y proveedores de evaluación, así
          que el objetivo aquí es desarrollar la capacidad cognitiva y acostumbrarte a trabajar
          contra el reloj.{" "}
          {/* El panorama de las nueve categorías cuelga de aquí y ya no del
              menú: es el contexto de la frase anterior —qué más te pueden
              poner—, no un módulo aparte. */}
          <Link
            to="/app/psicotecnicas"
            className="font-medium underline underline-offset-2 transition-colors hover:text-foreground"
          >
            Qué otras pruebas usan las aerolíneas
          </Link>
          .
        </div>

        <p className="mt-6 max-w-[76ch] text-[13px] leading-relaxed text-muted-foreground">
          {NOTA_TIEMPOS}
        </p>
      </div>
    </>
  )
}

// ─── Sub componentes ─────────────────────────────────────────────────────────

/**
 * La franja de las tres familias.
 *
 * Una sola caja con tres celdas —el separador es el hueco de un píxel de la
 * retícula sobre el color del borde—, no tres tarjetas sueltas. Entra con el
 * carril de NOTAM: las tres barras se trazan al llegar a pantalla, una detrás
 * de otra, y eso enseña de un golpe dónde estás flojo sin tener que escribirlo.
 */
function FranjaFamilias({
  local,
  cargando,
}: {
  local: ReturnType<typeof leerPsicoLocal>
  cargando: boolean
}) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.3 })

  return (
    <div
      ref={ref}
      className={`ln-aparece${inView ? " ln-visible" : ""} mt-6 grid gap-px overflow-hidden rounded-[14px] border border-border bg-border [grid-template-columns:repeat(auto-fit,minmax(240px,1fr))]`}
    >
      {FAMILIAS.map((familia, i) => {
        const acierto = local.ultimoPorCategoria[familia]
        return (
          <div key={familia} className="bg-card px-6 py-[22px]">
            <div className="flex items-center justify-between gap-3">
              <span className="ph-display text-[16px] font-semibold">
                {CATEGORIAS[familia].corto}
              </span>
              {cargando ? (
                <span className="h-4 w-14 animate-pulse rounded bg-muted" />
              ) : acierto === undefined ? (
                // El sello no puede partirse en dos líneas: sin esto, "Sin
                // intentos" rompe la altura de la celda y descuadra la franja.
                <span className="ph-sello shrink-0 whitespace-nowrap rounded-[5px] px-[9px] py-[3px] text-[13px] font-medium">
                  Sin intentos
                </span>
              ) : (
                <span className="tabular text-[14px]" style={{ color: COLOR_FAMILIA[familia] }}>
                  {acierto}% de acierto
                </span>
              )}
            </div>
            <div
              className="mt-3 h-[5px] overflow-hidden rounded-[3px] bg-muted"
              role="progressbar"
              aria-valuenow={cargando ? undefined : (acierto ?? 0)}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`Último acierto en ${CATEGORIAS[familia].corto}`}
            >
              <div
                className="ln-carril h-full rounded-[3px]"
                style={{
                  width: `${acierto ?? 0}%`,
                  background: COLOR_FAMILIA[familia],
                  // Escalonado: las tres barras no se trazan a la vez, se leen
                  // en orden y así se ve cuál va más corta.
                  transitionDelay: `${120 + i * 130}ms`,
                }}
              />
            </div>
            {/* La celda no se queda en el dato: lleva a arreglarlo. Un «Sin
                intentos» sin salida es un reproche; con el enlace al lado es
                una invitación, y de paso ahorra volver arriba a buscar el
                botón. Lo que había aquí antes —cuántos ejercicios hay
                cargados— es inventario nuestro, no algo que le sirva a quien
                entrena. */}
            <Link
              to={`/app/aerolinea/psicotecnicas/practica?categoria=${familia}`}
              className="mt-3 inline-flex items-center gap-1 text-[13px] font-medium transition-colors hover:underline"
              style={{ color: COLOR_FAMILIA[familia] }}
            >
              {acierto === undefined ? "Empezar" : "Seguir entrenando"}
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        )
      })}
    </div>
  )
}
