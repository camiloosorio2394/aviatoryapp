import { Link } from "react-router-dom"
import { ArrowLeft, ArrowRight, ChevronDown, GraduationCap } from "lucide-react"
import { PageHeader } from "@/components/ui/page-header"
import { appButtonClass, appButtonStyle } from "@/lib/buttonStyles"
import { PSICO_HUB } from "@/lib/psicotecnicas"
import { EJEMPLOS_ESPACIAL, TEORIA_CUBO } from "@/data/psicotecnicas/aprende"
import { ImagenPsicoAmpliable } from "@/components/psicotecnicas/ImagenPsicoAmpliable"

const GUIAS = [
  {
    id: "abstracto",
    numero: "01",
    titulo: "Abstracto · separa los cambios",
    pregunta: "¿Qué atributo cambia en cada casilla?",
    pasos: [
      "Cuenta elementos antes de mirar su orientación o color.",
      "Sigue cada atributo por filas y columnas; busca una regla que explique todas las casillas conocidas.",
      "Comprueba la opción elegida contra la última fila y la última columna, no solo contra la casilla vecina.",
    ],
    ejemplo: "Si los brazos de una figura siguen 1, 2, 3, 4, 3, 2, 1, 2, el siguiente debe tener 3. El giro no importa si la serie no lo justifica.",
  },
  {
    id: "espacial",
    numero: "02",
    titulo: "Espacial · conserva las relaciones",
    pregunta: "¿Qué caras o bordes siguen juntos al girar?",
    pasos: [
      "Marca primero las caras opuestas: nunca pueden verse juntas en una esquina del cubo.",
      "Elige una cara como referencia y sigue el sentido de sus símbolos al plegar.",
      "Descarta reflejos: un dibujo puede tener las caras correctas y estar invertido.",
    ],
    ejemplo: "Si dos caras son opuestas en el desarrollo, cualquier alternativa que las muestre como vecinas queda descartada sin plegar todo el sólido.",
  },
  {
    id: "numerico",
    numero: "03",
    titulo: "Numérico · identifica la operación",
    pregunta: "¿Se repite un salto, una proporción o dos recorridos?",
    pasos: [
      "Resta términos consecutivos. Si los saltos no explican la serie, prueba divisiones.",
      "Si tampoco hay una regla única, separa posiciones impares y pares o agrupa en ternas.",
      "Aplica la regla al menos dos veces antes de calcular el término que falta.",
    ],
    ejemplo: "En 3, 6, 10, 15 los saltos son +3, +4 y +5. Sigue +6, así que la respuesta es 21.",
  },
] as const

/**
 * La lección del módulo: teoría del cubo y ejercicios ya resueltos.
 *
 * Existe por una razón concreta: una de las fuentes de espacial publica sus
 * ejercicios con la respuesta marcada encima de la opción correcta, así que no
 * se pueden preguntar. Las figuras se recompusieron para enseñar antes de que
 * el reloj empiece a correr.
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
          subtitle="Tres formas de razonar, tres métodos distintos. Aprende a reconocer la regla antes de correr contra el reloj."
        />

        <nav id="ruta-aprende" aria-label="Ruta de aprendizaje" className="mb-10 grid gap-3 sm:grid-cols-3">
          {[
            { numero: "01", titulo: "Reconoce la regla", detalle: "Tres métodos", destino: "metodos" },
            { numero: "02", titulo: "Mira cómo se pliega", detalle: `${TEORIA_CUBO.length} láminas`, destino: "cubos" },
            { numero: "03", titulo: "Comprueba tu criterio", detalle: `${EJEMPLOS_ESPACIAL.length} ejemplos`, destino: "ejemplos" },
          ].map((etapa) => (
            <a
              key={etapa.numero}
              href={`#psico-${etapa.destino}`}
              className="group flex items-start gap-3 rounded-2xl surface surface-lift p-4 focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              <span className="nh-display text-[12px] font-semibold tabular-nums" style={{ color: "var(--av-blue-500)" }}>
                {etapa.numero}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[15px] font-semibold leading-tight">{etapa.titulo}</span>
                <span className="mt-1 block text-[12px] text-muted-foreground">{etapa.detalle}</span>
              </span>
              <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" aria-hidden />
            </a>
          ))}
        </nav>

        <section id="psico-metodos" className="scroll-mt-6" aria-labelledby="titulo-metodos">
          <div className="mb-4">
            <div className="nh-display text-[11px] font-semibold uppercase tracking-[0.16em]" style={{ color: "var(--av-blue-500)" }}>
              Etapa 01 de 03 · fundamentos
            </div>
            <h2 id="titulo-metodos" className="mt-1 text-[22px] font-semibold tracking-[-0.02em]">Reconoce la regla</h2>
            <p className="mt-1 text-[15px] text-muted-foreground">Elige la familia que quieres trabajar y aplica sus pasos antes de mirar el reloj.</p>
          </div>
          <div className="space-y-4">
            {GUIAS.map((guia) => (
              <article key={guia.id} className="rounded-2xl surface p-5 sm:p-7">
                <div className="text-[12px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Método {guia.numero}</div>
                <h3 className="mt-1 text-[20px] font-semibold tracking-[-0.02em]">{guia.titulo}</h3>
                <p className="mt-1 text-[14px] text-muted-foreground">{guia.pregunta}</p>
                <ol className="mt-4 space-y-2 pl-5 text-[15px] leading-relaxed marker:font-semibold">
                  {guia.pasos.map((paso) => <li key={paso}>{paso}</li>)}
                </ol>
                <p className="mt-4 rounded-xl bg-muted/50 p-3 text-[14px] leading-relaxed"><strong>Así se aplica:</strong> {guia.ejemplo}</p>
                <Link to={`${PSICO_HUB}/practica?categoria=${guia.id}`} className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-foreground hover:underline">
                  Practicar {guia.id === "numerico" ? "numérico" : guia.id} <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section id="psico-cubos" className="mt-10 scroll-mt-6" aria-labelledby="titulo-cubos">
          <div className="mb-4">
            <div className="nh-display text-[11px] font-semibold uppercase tracking-[0.16em]" style={{ color: "var(--av-blue-500)" }}>
              Etapa 02 de 03 · demostración espacial
            </div>
            <h2 id="titulo-cubos" className="mt-1 text-[22px] font-semibold tracking-[-0.02em]">Mira cómo se pliega</h2>
            <p className="mt-1 text-[15px] text-muted-foreground">Del desarrollo plano al cubo: identifica las caras opuestas antes de elegir una opción.</p>
          </div>
          <div className="space-y-4">
            {TEORIA_CUBO.map((t) => (
              <article key={t.id} className="rounded-2xl surface p-5 sm:p-7">
                <h3 className="text-[19px] font-semibold tracking-[-0.01em]">{t.titulo}</h3>
                <ImagenPsicoAmpliable src={t.imagen} alt={t.imagenAlt} />
                <p className="mt-3 text-[15px] leading-relaxed text-foreground/90">{t.pie}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="psico-ejemplos" className="mt-10 scroll-mt-6" aria-labelledby="titulo-ejemplos">
          <div className="mb-5">
            <div className="nh-display text-[11px] font-semibold uppercase tracking-[0.16em]" style={{ color: "var(--av-blue-500)" }}>
              Etapa 03 de 03 · {EJEMPLOS_ESPACIAL.length} ejemplos resueltos
            </div>
            <h2 id="titulo-ejemplos" className="mt-1 text-[22px] font-semibold tracking-[-0.02em]">Comprueba tu criterio</h2>
            <p className="mt-1.5 max-w-[68ch] text-[15px] text-muted-foreground">
              Abre los ejemplos que quieras revisar. La respuesta está señalada en la figura recompuesta;
              úsala para seguir el razonamiento, no para medir tu velocidad.
            </p>
          </div>
          <div className="space-y-3">
            {EJEMPLOS_ESPACIAL.map((e, i) => (
              <details key={e.id} open={i === 0 ? true : undefined} className="group rounded-2xl surface">
                <summary className="flex cursor-pointer list-none items-center gap-3 p-5 marker:hidden sm:px-7 [&::-webkit-details-marker]:hidden">
                  <span className="nh-display text-[12px] font-semibold tabular-nums" style={{ color: "var(--av-blue-500)" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0 flex-1 text-[16px] font-semibold">{e.titulo}</span>
                  <span className="hidden text-[12px] text-muted-foreground sm:inline group-open:hidden">Ver razonamiento</span>
                  <span className="hidden text-[12px] text-muted-foreground sm:group-open:inline">Ocultar razonamiento</span>
                  <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" aria-hidden />
                </summary>
                <div className="border-t border-border/70 px-5 pb-5 sm:px-7 sm:pb-7">
                  <ImagenPsicoAmpliable src={e.imagen} alt={e.imagenAlt} />
                  <p className="mt-3 text-[15px] leading-relaxed text-foreground/90">{e.respuesta}</p>
                  <p className="mt-2 text-[13px] text-muted-foreground">{e.fuente}</p>
                </div>
              </details>
            ))}
          </div>
        </section>

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
