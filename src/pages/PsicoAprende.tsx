import { Link } from "react-router-dom"
import { ArrowLeft, ArrowRight, GraduationCap } from "lucide-react"
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

        <nav aria-label="Métodos por familia" className="mb-8 flex flex-wrap gap-2">
          {GUIAS.map((guia) => (
            <a key={guia.id} href={`#psico-${guia.id}`} className="rounded-full border border-border bg-card px-4 py-2 text-[13px] font-medium hover:bg-muted">
              {guia.numero} · {guia.id === "numerico" ? "Numérico" : guia.id === "espacial" ? "Espacial" : "Abstracto"}
            </a>
          ))}
        </nav>

        <div className="space-y-4">
          {GUIAS.map((guia) => (
            <section id={`psico-${guia.id}`} key={guia.id} className="scroll-mt-6 rounded-2xl border border-border bg-card p-5 sm:p-7">
              <div className="text-[12px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Método {guia.numero}</div>
              <h2 className="mt-1 text-[20px] font-semibold tracking-[-0.02em]">{guia.titulo}</h2>
              <p className="mt-1 text-[14px] text-muted-foreground">{guia.pregunta}</p>
              <ol className="mt-4 space-y-2 pl-5 text-[15px] leading-relaxed marker:font-semibold">
                {guia.pasos.map((paso) => <li key={paso}>{paso}</li>)}
              </ol>
              <p className="mt-4 rounded-xl bg-muted/50 p-3 text-[14px] leading-relaxed"><strong>Así se aplica:</strong> {guia.ejemplo}</p>
              <Link to={`${PSICO_HUB}/practica?categoria=${guia.id}`} className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-foreground hover:underline">
                Practicar {guia.id === "numerico" ? "numérico" : guia.id} <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </section>
          ))}
        </div>

        {/* === TEORÍA === */}
        <div className="mt-10 mb-4">
          <div className="text-[12px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Profundiza · espacial</div>
          <h2 className="mt-1 text-[20px] font-semibold tracking-[-0.02em]">Plegado de cubos</h2>
          <p className="mt-1 text-[15px] text-muted-foreground">Dos láminas para pasar del desarrollo plano al sólido y reconocer caras opuestas.</p>
        </div>
        <div className="space-y-4">
          {TEORIA_CUBO.map((t) => (
            <section key={t.id} className="rounded-2xl surface p-5 sm:p-7">
              <h2 className="text-[19px] font-semibold tracking-[-0.01em]">{t.titulo}</h2>
              <ImagenPsicoAmpliable src={t.imagen} alt={t.imagenAlt} />
              <p className="mt-3 text-[15px] leading-relaxed text-foreground/90">{t.pie}</p>
            </section>
          ))}
        </div>

        {/* === EJEMPLOS RESUELTOS === */}
        <div className="mt-10 mb-5">
          <div className="text-[13px] font-semibold" style={{ color: "var(--av-blue-500)" }}>
            Espacial · {EJEMPLOS_ESPACIAL.length} resueltos
          </div>
          <h2 className="mt-1 text-[20px] font-semibold tracking-[-0.02em]">
            Comprueba el método con ejemplos
          </h2>
          <p className="mt-1.5 text-[15px] text-muted-foreground max-w-[68ch]">
            La respuesta está señalada en cada figura recompuesta. Sirven para ver el
            razonamiento, no para medirte: para eso están los modos cronometrados.
          </p>
        </div>

        <div className="space-y-4">
          {EJEMPLOS_ESPACIAL.map((e) => (
            <section key={e.id} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-[15px] font-semibold">{e.titulo}</h3>
              <ImagenPsicoAmpliable src={e.imagen} alt={e.imagenAlt} />
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
