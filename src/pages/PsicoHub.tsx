import { Link } from "react-router-dom"
import {
  ArrowRight,
  Brain,
  Compass,
  Gauge,
  GraduationCap,
  Sigma,
  Timer,
} from "lucide-react"
import { AppLayout } from "@/components/layout/AppLayout"
import { PageHeader } from "@/components/ui/page-header"
import { appButtonClass, appButtonStyle } from "@/lib/buttonStyles"
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
import { BANCO_TOTAL, TOTALES, subcategoriasDe } from "@/data/psicotecnicas"

const ICONO: Record<CategoriaPsico, React.ComponentType<{ className?: string }>> = {
  abstracto: Brain,
  espacial: Compass,
  numerico: Sigma,
}

/**
 * La ilustración de cada familia, dibujada para el módulo.
 *
 * Van en public y no en assets para quedar fuera del precache de la PWA: son
 * material de una sección concreta, igual que las infografías de NOTAM y de
 * Mercancías. Se generan con scripts/psicotecnicas/generar-visuales.mjs.
 */
const ILUSTRACION: Record<CategoriaPsico, string> = {
  abstracto: "/infografias/psicotecnicas/familia-abstracto.webp",
  espacial: "/infografias/psicotecnicas/familia-espacial.webp",
  numerico: "/infografias/psicotecnicas/familia-numerico.webp",
}

const ALT: Record<CategoriaPsico, string> = {
  abstracto:
    "Matriz de tres por tres con figuras que ganan un lado y giran en cada casilla; la última está vacía.",
  espacial: "El desarrollo en cruz de un cubo y, al lado, el cubo ya plegado.",
  numerico: "La serie 3, 6, 12, 24 con el salto ×2 marcado, y el término siguiente en blanco.",
}

const COLOR: Record<CategoriaPsico, string> = {
  abstracto: "var(--av-violet-400)",
  espacial: "var(--av-cyan-400)",
  numerico: "var(--av-green-400)",
}

/**
 * Portada del módulo de pruebas psicotécnicas.
 *
 * Ordena la entrada en el orden en que conviene recorrerla: primero qué son
 * estas pruebas y qué no promete Aviatory, después las tres familias con lo que
 * hay cargado de cada una, luego los tres modos y al final el simulacro.
 *
 * Todas las cifras salen del banco, no de un texto a mano: si mañana entran los
 * ejercicios que faltan por cargar, la pantalla lo dice sola.
 */
export function PsicoHub() {
  return (
    <AppLayout>
      <div className="px-4 sm:px-7 py-6 sm:py-8 pb-16 max-w-[1180px] mx-auto">
        <PageHeader
          eyebrow={
            <>
              <Gauge className="h-3.5 w-3.5" /> Ingreso a aerolínea
            </>
          }
          title="Pruebas psicotécnicas"
          subtitle="Ejercicios cronometrados de razonamiento abstracto, espacial y numérico, con dificultad y presión de tiempo que van subiendo."
          actions={
            <Link
              to="/app/aerolinea/psicotecnicas/simulacro"
              className={appButtonClass({ size: "lg" })}
              style={appButtonStyle()}
            >
              <Timer className="h-4 w-4" /> Simulacro psicotécnico
            </Link>
          }
        />

        {/* === QUÉ SON === */}
        <section className="rounded-2xl surface p-6 sm:p-8">
          <div className="max-w-[72ch] space-y-4 text-[15px] leading-relaxed text-foreground/90">
            <p>
              Las pruebas psicotécnicas hacen parte de diferentes procesos de selección de pilotos
              y buscan evaluar capacidades cognitivas relacionadas con el desempeño bajo presión
              de tiempo.
            </p>
            <p>
              En este tipo de evaluaciones pueden encontrarse ejercicios de razonamiento abstracto,
              razonamiento espacial, razonamiento numérico, percepción, memoria, atención y otras
              capacidades cognitivas.
            </p>
            <p>
              En Aviatory entrenas estas habilidades con ejercicios cronometrados, subiendo
              progresivamente el nivel de dificultad y reduciendo el tiempo disponible para
              responder.
            </p>
          </div>

          <div
            className="mt-6 rounded-xl p-4 text-[13px] leading-relaxed"
            style={{
              background: "color-mix(in oklab, var(--av-amber-400) 8%, transparent)",
              border: "1px solid color-mix(in oklab, var(--av-amber-400) 26%, transparent)",
            }}
          >
            <strong className="font-semibold text-foreground">Importante:</strong> los ejercicios
            incluidos corresponden al material de entrenamiento de los documentos de referencia.
            El módulo es una herramienta de preparación y no representa una prueba oficial de una
            aerolínea específica. Las pruebas de selección varían bastante entre aerolíneas y
            proveedores de evaluación, así que el objetivo aquí es desarrollar la capacidad
            cognitiva y acostumbrarte a trabajar contra el reloj.
          </div>
        </section>

        {/* === LAS TRES FAMILIAS === */}
        <div className="mt-10 mb-5">
          <div className="text-[13px] font-semibold" style={{ color: "var(--av-blue-500)" }}>
            Categorías · 3
          </div>
          <h2 className="mt-1 text-[20px] font-semibold tracking-[-0.02em]">
            Las tres familias que vas a entrenar
          </h2>
          <p className="mt-1.5 text-[15px] text-muted-foreground max-w-[68ch]">
            {BANCO_TOTAL} ejercicios cargados, todos extraídos de material real de preparación.
            Cada uno lleva su respuesta y su explicación.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {(Object.keys(CATEGORIAS) as CategoriaPsico[]).map((c) => {
            const Icono = ICONO[c]
            const subs = subcategoriasDe(c)
            return (
              <div
                key={c}
                className="rounded-2xl border border-border bg-card overflow-hidden flex flex-col"
              >
                {/* La ilustración dice de qué va la familia antes de que se lea
                    una palabra: una matriz con un hueco, un cubo y su
                    desarrollo, una serie que se duplica. */}
                <img
                  src={ILUSTRACION[c]}
                  alt={ALT[c]}
                  width={480}
                  height={480}
                  className="w-full h-[150px] object-cover object-center"
                  loading="lazy"
                />
                <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{
                      background: `color-mix(in oklab, ${COLOR[c]} 14%, transparent)`,
                      border: `1px solid color-mix(in oklab, ${COLOR[c]} 30%, transparent)`,
                      color: COLOR[c],
                    }}
                  >
                    <Icono className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[15px] font-semibold leading-tight">
                      {CATEGORIAS[c].nombre}
                    </div>
                    <div className="text-[13px] text-muted-foreground tabular-nums">
                      {TOTALES[c]} ejercicios
                    </div>
                  </div>
                </div>

                <p className="mt-3 text-[13px] text-muted-foreground leading-relaxed">
                  {CATEGORIAS[c].descripcion}
                </p>

                <div className="mt-4">
                  <div className="text-[13px] font-semibold text-foreground/80">
                    Habilidades cargadas
                  </div>
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    {subs.map((s) => (
                      <span key={s} className="chip text-[12px]">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-auto pt-5">
                  <Link
                    to={`/app/aerolinea/psicotecnicas/practica?categoria=${c}`}
                    className={appButtonClass({ variant: "secondary" }, "w-full")}
                  >
                    Entrenar {CATEGORIAS[c].corto.toLowerCase()}{" "}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* === MODOS === */}
        <div className="mt-10 mb-5">
          <div className="text-[13px] font-semibold" style={{ color: "var(--av-blue-500)" }}>
            Modos · 3
          </div>
          <h2 className="mt-1 text-[20px] font-semibold tracking-[-0.02em]">
            El reloj no aprieta igual en los tres
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <ModoCard
            nombre={MODOS.entrenamiento.nombre}
            descripcion={MODOS.entrenamiento.descripcion}
            tiempos={`${TIEMPOS.entrenamiento.abstracto} s recomendados por ejercicio`}
            to="/app/aerolinea/psicotecnicas/practica"
            cta="Entrenar"
          />
          <ModoCard
            nombre={MODOS.evaluacion.nombre}
            descripcion={MODOS.evaluacion.descripcion}
            tiempos={`Abstracto y espacial ${TIEMPOS.evaluacion.abstracto} s · numérico ${TIEMPOS.evaluacion.numerico} s`}
            to="/app/aerolinea/psicotecnicas/evaluacion"
            cta="Presentar evaluación"
          />
          <ModoCard
            nombre={MODOS.simulacion.nombre}
            descripcion={MODOS.simulacion.descripcion}
            tiempos={`${SIMULACRO_TOTAL} ejercicios: ${SIMULACRO.abstracto} de cada familia`}
            to="/app/aerolinea/psicotecnicas/simulacro"
            cta="Ir al simulacro"
          />
        </div>

        {/* === NIVELES === */}
        <div className="mt-10 rounded-2xl surface p-6 sm:p-8">
          <div className="text-[13px] font-semibold" style={{ color: "var(--av-blue-500)" }}>
            Progresión
          </div>
          <h2 className="mt-1 text-[20px] font-semibold tracking-[-0.02em]">
            Precisión, después velocidad, después precisión bajo presión
          </h2>
          <p className="mt-1.5 text-[15px] text-muted-foreground max-w-[68ch]">
            Subir de nivel no es solo cambiar de ejercicios: es hacer los mismos con menos tiempo.
            En evaluación, el nivel multiplica el reloj.
          </p>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            {(["basico", "intermedio", "avanzado"] as const).map((n, i) => (
              <div key={n} className="rounded-xl border border-border p-4">
                <div className="text-[13px] font-semibold" style={{ color: "var(--av-blue-500)" }}>
                  Nivel {i + 1}
                </div>
                <div className="mt-0.5 text-[15px] font-semibold">{NIVELES[n].nombre}</div>
                <p className="mt-1 text-[13px] text-muted-foreground leading-relaxed">
                  {NIVELES[n].descripcion}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* === APRENDE === */}
        <section className="mt-4 rounded-2xl surface p-6 flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div>
            <div
              className="inline-flex items-center gap-1.5 text-[13px] font-semibold"
              style={{ color: "var(--av-blue-500)" }}
            >
              <GraduationCap className="h-3.5 w-3.5" /> Antes de cronometrarte
            </div>
            <h3 className="mt-1.5 text-[17px] font-semibold">
              Cómo se resuelve un cubo desplegado
            </h3>
            <p className="mt-1 text-[15px] text-muted-foreground max-w-[62ch]">
              Las reglas que resuelven la mitad de los ejercicios espaciales, y ocho ejercicios ya
              resueltos paso a paso. Sin reloj.
            </p>
          </div>
          <Link
            to="/app/aerolinea/psicotecnicas/aprende"
            className={appButtonClass({ variant: "secondary", size: "lg" })}
          >
            Ver la lección <ArrowRight className="h-4 w-4" />
          </Link>
        </section>

        <p className="mt-6 text-[13px] text-muted-foreground leading-relaxed max-w-[76ch]">
          {NOTA_TIEMPOS}
        </p>
      </div>
    </AppLayout>
  )
}

function ModoCard({
  nombre,
  descripcion,
  tiempos,
  to,
  cta,
}: {
  nombre: string
  descripcion: string
  tiempos: string
  to: string
  cta: string
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 flex flex-col">
      <div className="text-[15px] font-semibold">{nombre}</div>
      <p className="mt-1.5 text-[13px] text-muted-foreground leading-relaxed">{descripcion}</p>
      <div className="mt-3 flex items-start gap-1.5 text-[13px] text-foreground/80">
        <Timer className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" style={{ color: "var(--av-blue-500)" }} />
        <span>{tiempos}</span>
      </div>
      <div className="mt-auto pt-5">
        <Link to={to} className={appButtonClass({ variant: "secondary" }, "w-full")}>
          {cta} <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  )
}
