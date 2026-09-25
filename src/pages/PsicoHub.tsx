import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { ArrowLeft, ArrowRight, Check, Compass, Timer } from "lucide-react"
import heroPhoto from "@/assets/photos/psicotecnicas-mano-panel.webp"
import { Nota } from "@/components/dashboard/Nota"
import { EJEMPLOS_ESPACIAL, TEORIA_CUBO } from "@/data/psicotecnicas/aprende"
import { useInView } from "@/hooks/useInView"
import { useSession } from "@/hooks/useSession"
import {
  CATEGORIAS,
  FACTOR_NIVEL,
  MODOS,
  NIVELES,
  NOTA_TIEMPOS,
  PSICO_APRUEBA_CON,
  PSICO_HUB,
  SIMULACRO,
  SIMULACRO_TOTAL,
  TIEMPOS,
  type CategoriaPsico,
  type NivelPsico,
} from "@/lib/psicotecnicas"
import { leerPsicoLocal, mejorSimulacroRemoto, type PsicoLocal } from "@/lib/psicotecnicasProgress"
import { PSICO_TOTAL } from "@/lib/psicotecnicasConteo"

/**
 * Portada del tema Pruebas psicotécnicas (módulo Ingreso a aerolínea), con el
 * vocabulario del panel, del PCA y de Inglés ICAO.
 * Ruta: /app/aerolinea/psicotecnicas
 *
 * Tenía el aire de antes: un titular de 64 px que no se parecía a ninguno, un
 * rótulo «Sección 02» que ya no era cierto, dos botones sueltos, un color por
 * familia y otro por parte (violeta, cian, verde, azul, ámbar) que no
 * significaban nada, un «Sin intentos» en ámbar como si fuera una alerta, un
 * «Popular» sin ningún dato detrás y el aviso final en ámbar cuando solo
 * informa. En esta app el ámbar avisa y el verde es acierto: nada de eso lo era.
 *
 * El orden responde a las preguntas con las que se entra: qué hago hoy y cómo
 * voy (el hero), dónde flojeo (las familias), por dónde entro (las partes),
 * cómo sube la exigencia (los niveles) y qué hay que saber (al pie).
 *
 * Ninguna cifra está escrita a mano: ejercicios, segundos, resueltos y el
 * umbral salen del banco y de las constantes que son espejo del servidor.
 *
 * El acierto por familia es el que guarda el respaldo local
 * (`leerPsicoLocal`); el mejor simulacro llega de la cuenta. Sin dato no se
 * pinta ningún cero: se dice «Sin intentos».
 */

/** Rótulo de grupo: el mismo del panel, del PCA y de Inglés ICAO. */
const ROTULO =
  "nh-display m-0 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground"

const FAMILIAS = ["abstracto", "espacial", "numerico"] as const satisfies readonly CategoriaPsico[]
const ORDEN_NIVELES = ["basico", "intermedio", "avanzado"] as const satisfies readonly NivelPsico[]

/** La ilustración de cada parte, dibujada para el módulo. */
const PORTADA = {
  aprende: "/infografias/psicotecnicas/familia-espacial.webp",
  practica: "/infografias/psicotecnicas/familia-abstracto.webp",
  evaluacion: "/infografias/psicotecnicas/familia-numerico.webp",
  simulacro: "/infografias/psicotecnicas/portada.webp",
}

function practicar(familia?: CategoriaPsico) {
  return `${PSICO_HUB}/practica${familia ? `?categoria=${familia}` : ""}`
}

/** Segundos por ejercicio en evaluación y simulacro: el reloj de `private.psico_limite()`. */
function segundos(familia: CategoriaPsico, nivel: NivelPsico) {
  return Math.round(TIEMPOS.evaluacion[familia] * FACTOR_NIVEL[nivel])
}

/**
 * Las familias agrupadas por su reloj en un nivel: «Abstracto y espacial»
 * 45 s, «Numérico» 60 s. Se agrupa en vez de escribirlo, para que el día que
 * cambie un tiempo no quede un texto diciendo el de antes.
 */
function relojes(nivel: NivelPsico) {
  const grupos = new Map<number, string[]>()
  for (const f of FAMILIAS) {
    const s = segundos(f, nivel)
    grupos.set(s, [...(grupos.get(s) ?? []), CATEGORIAS[f].corto])
  }
  return [...grupos].map(([s, nombres]) => ({
    familias: nombres
      .map((n, i) => (i === 0 ? n : n.toLowerCase()))
      .join(", ")
      .replace(/, ([^,]*)$/, " y $1"),
    segundos: s,
  }))
}

/** La familia más floja, si hay con qué compararla: con una sola no la hay. */
function masFloja(local: PsicoLocal): CategoriaPsico | null {
  const probadas = FAMILIAS.filter((f) => local.ultimoPorCategoria[f] !== undefined)
  if (probadas.length < 2) return null
  return probadas.reduce((a, b) =>
    (local.ultimoPorCategoria[b] ?? 0) < (local.ultimoPorCategoria[a] ?? 0) ? b : a
  )
}

/**
 * La acción del hero: una sola, y la que toca. Sin nada hecho, una tanda de
 * práctica; con una familia sin probar, esa; con las tres probadas, la más
 * floja.
 */
function recomendar(local: PsicoLocal, floja: CategoriaPsico | null) {
  const sinProbar = FAMILIAS.find((f) => local.ultimoPorCategoria[f] === undefined)
  const alguna = FAMILIAS.some((f) => local.ultimoPorCategoria[f] !== undefined)
  if (alguna && sinProbar) {
    return {
      rotulo: "Te falta probar",
      titulo: CATEGORIAS[sinProbar].nombre,
      detalle: "Todavía no tienes una tanda de esta familia",
      to: practicar(sinProbar),
      cta: "Entrenar",
    }
  }
  if (floja) {
    return {
      rotulo: "Refuerza la más floja",
      titulo: CATEGORIAS[floja].nombre,
      detalle: `${local.ultimoPorCategoria[floja]} % de acierto en tu última tanda`,
      to: practicar(floja),
      cta: "Entrenar",
    }
  }
  return {
    rotulo: "Empieza por aquí",
    titulo: "Una tanda de práctica",
    detalle: "El reloj orienta y no te saca: ves la explicación al instante",
    to: practicar(),
    cta: "Empezar",
  }
}

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

  const floja = masFloja(local)
  const siguiente = recomendar(local, floja)
  const relojBase = relojes("intermedio")

  const partes: Parte[] = [
    {
      parte: "Parte 1",
      titulo: "Aprende",
      meta: `3 métodos · ${TEORIA_CUBO.length} láminas y ${EJEMPLOS_ESPACIAL.length} resueltos`,
      descripcion:
        "Una ruta clara para leer patrones abstractos, plegar figuras y resolver series numéricas; después, ejemplos espaciales resueltos.",
      portada: PORTADA.aprende,
      to: `${PSICO_HUB}/aprende`,
      cta: "Ver la lección",
      estado: "Sin cronómetro, a tu ritmo",
    },
    {
      parte: "Parte 2",
      titulo: "Práctica",
      meta: `${PSICO_TOTAL} ejercicios · ${TIEMPOS.entrenamiento.abstracto}\u00a0s recomendados`,
      descripcion: MODOS.entrenamiento.descripcion,
      portada: PORTADA.practica,
      to: practicar(),
      cta: "Entrenar",
      estado: "El reloj orienta, no castiga",
    },
    {
      parte: "Parte 3",
      titulo: "Evaluación",
      // Sin espacios que partan: el renglón se corta en el punto medio, no entre
      // la familia y su tiempo ni entre la cifra y la unidad.
      meta: relojBase.map((r) => `${r.familias}\u00a0${r.segundos}\u00a0s`).join(" · "),
      descripcion: MODOS.evaluacion.descripcion,
      portada: PORTADA.evaluacion,
      to: `${PSICO_HUB}/evaluacion`,
      cta: "Presentar evaluación",
      estado: "Con el reloj apretado",
    },
    {
      parte: "Parte 4",
      titulo: "Simulacro",
      meta: `${SIMULACRO_TOTAL} ejercicios · ${SIMULACRO.abstracto} de cada familia`,
      descripcion: MODOS.simulacion.descripcion,
      portada: PORTADA.simulacro,
      to: `${PSICO_HUB}/simulacro`,
      cta: "Ir al simulacro",
      estado:
        mejorSimulacro === null
          ? "Sin presentar todavía"
          : mejorSimulacro >= PSICO_APRUEBA_CON
            ? `Tu mejor resultado: ${mejorSimulacro} sobre 100 · aprobado`
            : `Tu mejor resultado: ${mejorSimulacro} sobre 100 · apruebas con ${PSICO_APRUEBA_CON}`,
      avance: mejorSimulacro,
      cargando: loading,
    },
  ]

  return (
    <div className="notam-hub psico-hub @container mx-auto max-w-[1600px] px-5 py-6 pb-16 sm:px-8 sm:py-8">
      <Link
        to="/app/aerolinea"
        className="mb-4 inline-flex items-center gap-1.5 text-[13px] text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-3.5 w-3.5" aria-hidden /> Volver a Ingreso a aerolínea
      </Link>

      {/* El hero de las portadas de módulo: la foto bajo el velo navy, el
          titular en Archivo, la acción que toca en su tarjeta de cristal y, a
          la derecha, el panel con el mejor simulacro. */}
      <section className="relative overflow-hidden rounded-[18px] shadow-[0_1px_2px_rgba(11,27,48,0.08)]">
        <img
          src={heroPhoto}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: "center 55%" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(105deg, rgba(8,20,36,.93) 0%, rgba(8,20,36,.82) 42%, rgba(8,20,36,.62) 72%, rgba(8,20,36,.48) 100%)",
          }}
        />

        <div className="relative grid gap-6 px-6 py-6 sm:px-10 sm:py-8 @4xl:grid-cols-[minmax(0,1fr)_minmax(0,272px)] @4xl:gap-10">
          <div className="min-w-0 self-center">
            <div className="flex flex-wrap items-center gap-3">
              <span className="nh-display text-[11px] font-semibold uppercase tracking-[0.16em] text-[#7FB2F2]">
                Módulo
              </span>
              <span className="hidden h-3 w-px bg-white/20 @md:block" aria-hidden />
              <span className="nh-display inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/78">
                <Timer className="h-3.5 w-3.5" aria-hidden /> {FAMILIAS.length} familias · {PSICO_TOTAL} ejercicios
              </span>
            </div>

            <h1 className="nh-display mt-3 text-[32px] font-bold leading-none tracking-[-0.03em] text-white sm:text-[38px] @5xl:text-[44px]">
              Pruebas psicotécnicas
            </h1>
            <p className="mt-3 mb-0 max-w-[58ch] text-[15px] leading-[1.55] text-white/85">
              Razonamiento abstracto, espacial y numérico contra el reloj. Las aerolíneas las piden porque miden
              cómo piensas cuando el tiempo aprieta.
            </p>

            {/* Una sola acción, la que toca: empezar, probar la familia que
                falta o reforzar la más floja. */}
            <div className="mt-6 flex max-w-[560px] flex-col gap-4 rounded-[14px] border border-white/15 bg-[rgba(6,17,31,0.55)] p-4 backdrop-blur-[6px] @lg:flex-row @lg:items-center @lg:justify-between">
              <div className="min-w-0">
                <div className="nh-display text-[10px] font-semibold uppercase tracking-[0.16em] text-[#7FB2F2]">
                  {siguiente.rotulo}
                </div>
                <div className="mt-1.5 text-[15px] font-semibold leading-snug text-white">{siguiente.titulo}</div>
                <div className="mt-0.5 text-[12.5px] text-white/78">{siguiente.detalle}</div>
              </div>
              <Link
                to={siguiente.to}
                className="inline-flex h-10 shrink-0 items-center justify-center gap-2 self-start rounded-full bg-white px-5 text-[13.5px] font-semibold text-[#0B1B30] transition-colors hover:bg-white/90 @lg:self-auto"
              >
                {siguiente.cta}
                <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </Link>
            </div>
          </div>

          <PanelDelSimulacro cargando={loading} mejor={mejorSimulacro} />
        </div>
      </section>

      <FranjaFamilias local={local} floja={floja} />

      <section className="mt-8" aria-labelledby="psico-partes">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h2 id="psico-partes" className={ROTULO}>
            Las cuatro partes
          </h2>
          <span className="text-[12.5px] text-muted-foreground">En orden, o donde quieras entrar</span>
        </div>
        {/* Cuatro tarjetas: dos columnas en tableta, cuatro cuando hay sitio.
            Nunca tres, que con cuatro deja una huérfana. */}
        <div className="mt-3 grid grid-cols-1 gap-4 @xl:grid-cols-2 @5xl:grid-cols-4">
          {partes.map((p) => (
            <TarjetaParte key={p.to} {...p} />
          ))}
        </div>
      </section>

      <Niveles />

      {/* Lo que el módulo no promete, al pie: importa, pero no es lo primero
          que necesita quien llega a entrenar. Informa, no alerta, así que va en
          tinta neutra y no en ámbar. */}
      <section className="mt-8" aria-labelledby="psico-antes">
        <h2 id="psico-antes" className={ROTULO}>
          Antes de empezar
        </h2>
        <div className="mt-3 grid grid-cols-1 gap-3 @3xl:grid-cols-2">
          {/* El panorama de las nueve categorías cuelga de aquí y no del menú:
              es el contexto de esta nota (qué más te pueden poner), no un
              módulo aparte. */}
          <Nota
            icon={Compass}
            titulo="Una preparación, no la prueba oficial"
            linea="Cada aerolínea y cada proveedor de evaluación usa su propia prueba. Aquí se entrena la capacidad y el trabajo contra el reloj."
            to="/app/psicotecnicas"
            toLabel="Qué otras pruebas usan las aerolíneas"
          />
          <Nota icon={Timer} titulo="Los tiempos son de práctica" linea={NOTA_TIEMPOS} />
        </div>
      </section>
    </div>
  )
}

// ─── Sub componentes ─────────────────────────────────────────────────────────

/**
 * El panel de cristal: el mejor simulacro, sobre 100 de resultado global. Bajo
 * el umbral va en ámbar, porque ahí sí es un aviso: todavía no aprobaría. La
 * fila de abajo dice con cuánto se aprueba y la línea del número dice cuánto
 * falta, para que el color nunca sea lo único que lo cuenta.
 */
function PanelDelSimulacro({ cargando, mejor }: { cargando: boolean; mejor: number | null }) {
  const aprobado = mejor !== null && mejor >= PSICO_APRUEBA_CON
  return (
    <div className="self-start overflow-hidden rounded-[14px] border border-white/15 bg-[rgba(6,17,31,0.62)] backdrop-blur-[6px] @4xl:self-center">
      <div className="px-4 pb-4 pt-4">
        <div className="nh-display text-[10px] font-semibold uppercase tracking-[0.16em] text-white/72">
          Tu mejor simulacro
        </div>
        {cargando ? (
          <div className="mt-2.5 h-12 w-24 animate-pulse rounded bg-white/15" aria-hidden />
        ) : mejor === null ? (
          <>
            <p className="m-0 mt-2 text-[14px] leading-snug text-white/85">
              Preséntalo y aquí verás tu resultado.
            </p>
            <Link
              to={`${PSICO_HUB}/simulacro`}
              className="mt-3 inline-flex h-9 items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-3.5 text-[13px] font-semibold text-white transition-colors hover:bg-white/20"
            >
              Ir al simulacro <ArrowRight className="h-3.5 w-3.5" aria-hidden />
            </Link>
          </>
        ) : (
          <>
            <div className="mt-1 flex items-baseline gap-2">
              <span
                className="nh-display tabular text-[52px] font-bold leading-none tracking-[-0.04em]"
                style={{ color: aprobado ? "#fff" : "var(--av-amber-400)" }}
              >
                {mejor}
              </span>
              <span className="text-[13px] font-semibold text-white/78">sobre 100</span>
            </div>
            <div className="mt-1.5 inline-flex items-center gap-1 text-[12.5px] font-semibold text-white/85">
              {aprobado ? (
                <>
                  <Check className="h-3.5 w-3.5" style={{ color: "var(--av-green-400)" }} aria-hidden /> Aprobado
                </>
              ) : (
                `Te faltan ${PSICO_APRUEBA_CON - mejor} para aprobar`
              )}
            </div>
          </>
        )}
      </div>
      {!cargando && (
        <dl className="m-0 border-t border-white/10 px-4 py-3 text-[12px] leading-[1.5]">
          <div className="flex items-baseline justify-between gap-3">
            <dt className="text-white/72">Se aprueba con</dt>
            <dd className="tabular m-0 font-semibold text-white/90">{PSICO_APRUEBA_CON} sobre 100</dd>
          </div>
          <div className="mt-1 flex items-baseline justify-between gap-3">
            <dt className="text-white/72">El simulacro</dt>
            <dd className="tabular m-0 font-semibold text-white/90">{SIMULACRO_TOTAL} ejercicios</dd>
          </div>
        </dl>
      )}
    </div>
  )
}

/**
 * Las tres familias con su último acierto.
 *
 * La pregunta es una sola, «dónde flojeo», así que la forma es de énfasis y no
 * categórica: la más floja va en azul y las otras en gris, como el dominio del
 * PCA en el panel (mismos tonos, comprobados con el validador en los dos
 * temas). La más floja lleva además su rótulo escrito: el color nunca es lo
 * único que lo dice. Con una sola familia probada no hay a quién comparar y
 * todas van en gris.
 *
 * Sin intentos no hay barra en cero, que se leería como «0 % de acierto»: hay
 * el carril vacío, para que las tres celdas midan lo mismo, y la invitación.
 *
 * Entra con el carril de NOTAM: las barras se trazan al llegar a pantalla, una
 * detrás de otra.
 */
function FranjaFamilias({ local, floja }: { local: PsicoLocal; floja: CategoriaPsico | null }) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.3 })

  return (
    <section className="mt-8" aria-labelledby="psico-familias">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h2 id="psico-familias" className={ROTULO}>
          Tus tres familias
        </h2>
        <span className="text-[12.5px] text-muted-foreground">Acierto en tu última tanda</span>
      </div>
      <div
        ref={ref}
        className={`ln-aparece${inView ? " ln-visible" : ""} mt-3 grid grid-cols-1 overflow-hidden rounded-2xl surface @2xl:grid-cols-3 [--dp-enfasis:var(--av-blue-500)] [--dp-contexto:#858a93] dark:[--dp-enfasis:var(--av-blue-400)] dark:[--dp-contexto:#6c717a]`}
      >
        {FAMILIAS.map((familia, i) => {
          const acierto = local.ultimoPorCategoria[familia]
          const enfasis = familia === floja
          return (
            <Link
              key={familia}
              to={practicar(familia)}
              className={[
                "group flex min-w-0 flex-col px-5 py-4 transition-colors hover:bg-muted/50 focus-visible:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring",
                // Divisores finos: una sola pieza con tres celdas, no tres tarjetas.
                i > 0 ? "border-t border-border @2xl:border-l @2xl:border-t-0" : "",
              ].join(" ")}
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-[15px] font-semibold tracking-[-0.01em] text-foreground">
                  {CATEGORIAS[familia].corto}
                </span>
                {enfasis && (
                  <span className="shrink-0 rounded-full border border-border px-2 py-0.5 text-[11px] font-semibold text-foreground">
                    La más floja
                  </span>
                )}
              </div>
              <div className="mt-2 flex h-[30px] items-end gap-1.5">
                {acierto === undefined ? (
                  <span className="text-[13px] font-medium text-muted-foreground">Sin intentos</span>
                ) : (
                  <>
                    <span className="nh-display tabular text-[30px] font-bold leading-none tracking-[-0.03em] text-foreground">
                      {acierto}
                    </span>
                    <span className="text-[13px] font-semibold text-muted-foreground">% de acierto</span>
                  </>
                )}
              </div>
              {/* 8 px, extremo redondeado y cuadrado en la base, que es de
                  donde crece. La pista es el 0-100 entero. La cifra ya está
                  escrita encima: la barra no necesita leerse en voz alta. */}
              <div className="mt-3 h-2 overflow-hidden rounded-r-[4px] bg-muted" aria-hidden>
                {acierto !== undefined && (
                  <div
                    className="ln-carril h-full rounded-r-[4px]"
                    style={{
                      width: `${Math.max(acierto, 2)}%`,
                      background: enfasis ? "var(--dp-enfasis)" : "var(--dp-contexto)",
                      // Escalonado: se trazan en orden y así se ve cuál va más corta.
                      transitionDelay: `${120 + i * 130}ms`,
                    }}
                  />
                )}
              </div>
              <span className="mt-3 inline-flex items-center gap-1 text-[13px] font-semibold text-foreground">
                {acierto === undefined ? "Empezar" : "Seguir entrenando"}
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </span>
            </Link>
          )
        })}
      </div>
    </section>
  )
}

interface Parte {
  parte: string
  titulo: string
  meta: string
  descripcion: string
  portada: string
  to: string
  cta: string
  estado: string
  /** Mejor resultado sobre 100. Solo el simulacro lo tiene. */
  avance?: number | null
  cargando?: boolean
}

/**
 * Una parte del tema: la portada ilustrada arriba y, debajo, lo mismo que las
 * partes de Inglés ICAO. Neutra: las cuatro ilustraciones ya las distinguen, y
 * un color por parte no significaba nada.
 *
 * Las ilustraciones son cuadradas (y la del simulacro, 3:2) y están dibujadas
 * sobre el mismo navy: van enteras, centradas sobre ese navy, en vez de
 * recortarlas y perder el cubo o la secuencia.
 *
 * El título es el enlace y se estira sobre toda la tarjeta; el anillo de foco
 * se dibuja en la tarjeta, que es lo que se ve.
 */
function TarjetaParte({ parte, titulo, meta, descripcion, portada, to, cta, estado, avance, cargando }: Parte) {
  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl surface surface-lift has-[a:focus-visible]:ring-2 has-[a:focus-visible]:ring-ring">
      <div className="relative aspect-[16/9] shrink-0 overflow-hidden bg-[#07121e]">
        <img
          src={portada}
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full object-contain transition-transform duration-300 group-hover:scale-[1.03]"
          style={{ transitionTimingFunction: "var(--ease-av)" }}
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <span className="nh-display text-[10.5px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          {parte}
        </span>
        <h3 className="m-0 mt-1 text-[17px] font-semibold tracking-[-0.02em] text-foreground">
          <Link to={to} className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none">
            {titulo}
          </Link>
        </h3>
        <div className="mt-1 text-[12px] font-medium text-muted-foreground">{meta}</div>
        <p className="m-0 mt-2 text-[13px] leading-relaxed text-muted-foreground">{descripcion}</p>

        {/* El pie: el estado y, si hay resultado, su barra. Una barra vacía
            diría «vas perdiendo» cuando lo que pasa es que no lo has hecho. */}
        <div className="mt-auto pt-4">
          <div className="border-t border-border pt-3">
            {cargando ? (
              <span className="block h-4 w-40 animate-pulse rounded bg-muted" aria-hidden />
            ) : (
              <>
                {typeof avance === "number" && avance > 0 && (
                  <div
                    className="mb-2 h-1.5 overflow-hidden rounded-r-[3px] bg-muted"
                    role="progressbar"
                    aria-label={`Mejor resultado en ${titulo}`}
                    aria-valuenow={avance}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  >
                    <div
                      className="h-full rounded-r-[3px] transition-[width]"
                      style={{ width: `${Math.min(avance, 100)}%`, background: "var(--foreground)" }}
                    />
                  </div>
                )}
                <p className="m-0 text-[12px] leading-snug text-muted-foreground">{estado}</p>
              </>
            )}
          </div>
          <span className="mt-3 inline-flex items-center gap-1 text-[13px] font-semibold text-foreground">
            {cta} <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </span>
        </div>
      </div>
    </div>
  )
}

/**
 * Los tres niveles, con los segundos que de verdad marca el reloj en cada uno.
 * Subir de nivel no es solo cambiar de ejercicios: es hacer los mismos con
 * menos tiempo.
 */
function Niveles() {
  return (
    <section className="mt-8" aria-labelledby="psico-niveles">
      <h2 id="psico-niveles" className={ROTULO}>
        Tres niveles
      </h2>
      <div className="mt-3 overflow-hidden rounded-2xl surface">
        <div className="border-b border-border px-5 py-4">
          <div className="text-[15px] font-semibold tracking-[-0.01em] text-foreground">
            Precisión, después velocidad, después precisión bajo presión
          </div>
          <p className="m-0 mt-0.5 text-[12.5px] leading-relaxed text-muted-foreground">
            En evaluación y en el simulacro, el nivel fija el reloj de cada ejercicio. En práctica siempre tienes{" "}
            {TIEMPOS.entrenamiento.abstracto}&nbsp;s.
          </p>
        </div>
        <ol className="m-0 grid list-none grid-cols-1 p-0 @2xl:grid-cols-3">
          {ORDEN_NIVELES.map((nivel, i) => (
            <li
              key={nivel}
              className={`min-w-0 px-5 py-4 ${i > 0 ? "border-t border-border @2xl:border-l @2xl:border-t-0" : ""}`}
            >
              <div className="nh-display text-[10.5px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Nivel {i + 1}
              </div>
              <div className="mt-1 text-[16px] font-semibold tracking-[-0.01em] text-foreground">
                {NIVELES[nivel].nombre}
              </div>
              <dl className="m-0 mt-3 grid grid-cols-[minmax(0,1fr)_auto] gap-x-4 gap-y-1 text-[12.5px]">
                {relojes(nivel).map((r) => (
                  <div key={r.familias} className="contents">
                    <dt className="text-muted-foreground">{r.familias}</dt>
                    <dd className="tabular m-0 text-right font-semibold text-foreground">{r.segundos}&nbsp;s</dd>
                  </div>
                ))}
              </dl>
              <p className="m-0 mt-3 text-[12.5px] leading-relaxed text-muted-foreground">
                {NIVELES[nivel].descripcion}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
