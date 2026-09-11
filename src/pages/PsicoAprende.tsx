import { Link } from "react-router-dom"
import { ArrowLeft, ArrowRight, GraduationCap } from "lucide-react"
import { PageHeader } from "@/components/ui/page-header"
import { appButtonClass, appButtonStyle } from "@/lib/buttonStyles"
import { PSICO_HUB } from "@/lib/psicotecnicas"
import { EJEMPLOS_ESPACIAL, TEORIA_CUBO } from "@/data/psicotecnicas/aprende"

/**
 * La lección del módulo: teoría del cubo y ejercicios ya resueltos.
 *
 * Existe por una razón concreta: una de las fuentes de espacial publica sus
 * ejercicios con la respuesta marcada encima de la opción correcta, así que no
 * se pueden preguntar. En vez de tirarlos, se usan para lo único que pueden
 * hacer bien, que es enseñar antes de que el reloj empiece a correr.
 *
 * Aquí no hay cronómetro ni puntaje. Es la pantalla a la que se entra antes.
 */
export function PsicoAprende() {
  return (
    <>
      <div className="px-4 sm:px-7 py-6 sm:py-8 pb-16 max-w-[980px] mx-auto">
        <Link
          to={PSICO_HUB}
          className="inline-flex items-center gap-1.5 text-[13px] text-muted-foreground hover:text-foreground mb-4"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Pruebas psicotécnicas
        </Link>

        <PageHeader
          eyebrow={
            <>
              <GraduationCap className="h-3.5 w-3.5" /> Sin reloj
            </>
          }
          title="Antes de cronometrarte"
          subtitle="El cubo es la figura que más aparece en razonamiento espacial. Estas dos reglas y ocho ejercicios resueltos te ahorran la mitad del trabajo."
        />

        {/* === TEORÍA === */}
        <div className="space-y-4">
          {TEORIA_CUBO.map((t) => (
            <section key={t.id} className="rounded-2xl surface p-5 sm:p-7">
              <h2 className="text-[19px] font-semibold tracking-[-0.01em]">{t.titulo}</h2>
              <div className="mt-4 rounded-xl border border-border bg-white p-3 overflow-x-auto">
                <img
                  src={t.imagen}
                  alt={t.imagenAlt}
                  className="mx-auto max-w-full h-auto"
                  loading="lazy"
                />
              </div>
              <p className="mt-3 text-[15px] leading-relaxed text-foreground/90">{t.pie}</p>
            </section>
          ))}
        </div>

        {/* === EJEMPLOS RESUELTOS === */}
        <div className="mt-10 mb-5">
          <div className="text-[13px] font-semibold" style={{ color: "var(--av-blue-500)" }}>
            Resueltos · {EJEMPLOS_ESPACIAL.length}
          </div>
          <h2 className="mt-1 text-[20px] font-semibold tracking-[-0.02em]">
            Ocho ejercicios con la respuesta a la vista
          </h2>
          <p className="mt-1.5 text-[15px] text-muted-foreground max-w-[68ch]">
            En estos la respuesta viene señalada en la propia figura, tal como los publica la
            fuente. Sirven para ver el razonamiento, no para medirte: para eso están los modos
            cronometrados.
          </p>
        </div>

        <div className="space-y-4">
          {EJEMPLOS_ESPACIAL.map((e) => (
            <section key={e.id} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-[15px] font-semibold">{e.titulo}</h3>
              <div className="mt-3 rounded-xl border border-border bg-white p-3 overflow-x-auto">
                <img
                  src={e.imagen}
                  alt={e.imagenAlt}
                  className="mx-auto max-w-full h-auto"
                  loading="lazy"
                />
              </div>
              <p className="mt-3 text-[15px] leading-relaxed text-foreground/90">{e.respuesta}</p>
              <p className="mt-2 text-[13px] text-muted-foreground">{e.fuente}</p>
            </section>
          ))}
        </div>

        <section className="mt-8 rounded-2xl surface p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-[17px] font-semibold">Ahora sí, con reloj</h3>
            <p className="mt-1 text-[15px] text-muted-foreground max-w-[60ch]">
              El modo entrenamiento sigue corrigiendo al momento y explicando cada respuesta, pero
              ya te mide el tiempo.
            </p>
          </div>
          <Link
            to="/app/aerolinea/psicotecnicas/practica?categoria=espacial"
            className={appButtonClass({ size: "lg" })}
            style={appButtonStyle()}
          >
            Entrenar espacial <ArrowRight className="h-4 w-4" />
          </Link>
        </section>
      </div>
    </>
  )
}
