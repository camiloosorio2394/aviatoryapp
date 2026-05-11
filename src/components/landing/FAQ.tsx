import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    q: "¿Para qué pilotos es Aviatory?",
    a: "Para pilotos LATAM (sobre todo Colombia, México, Perú, Chile, Argentina) que están en formación PPL/CPL o ya tienen su CPL y buscan llegar a una aerolínea. Si volás por hobby o sos ya capitán de aerolínea, esta no es tu app.",
  },
  {
    q: "¿Es contenido oficial de Aerocivil?",
    a: "Las preguntas siguen exactamente la estructura y temas del examen ELITE-PCA de Aerocivil Colombia, escritas por instructores certificados. No es contenido pirata: es prep, igual que Sporty's o King Schools para el FAA.",
  },
  {
    q: "¿Realmente me consiguen empleo en aerolínea?",
    a: "No. Aviatory te prepara para que cumplas los requisitos, presentes los exámenes, mejores tu inglés y armes tu hoja de vida. La aerolínea decide. Pero ningún piloto sin estos pasos llega — y la mayoría se traba justo acá.",
  },
  {
    q: "¿Qué pasa después de los 7 días gratis?",
    a: "Si no upgradeás, tu cuenta queda como Free (perfil, dashboard y 30 preguntas/mes). No te cobramos automático sin avisarte, no necesitás tarjeta para empezar.",
  },
  {
    q: "¿Cancelo cuando quiero?",
    a: "Sí, en 1 click desde tu perfil. Mantenés acceso hasta el final del período que pagaste, sin cobros sorpresa.",
  },
  {
    q: "¿Pagan con tarjeta colombiana?",
    a: "Sí. Wompi acepta tarjetas crédito/débito de bancos colombianos, PSE y Nequi. Pronto sumamos Mercado Pago para el resto de LATAM.",
  },
  {
    q: "¿Hay versión móvil?",
    a: "Aviatory funciona en cualquier navegador (móvil incluido). Estamos trabajando en apps nativas iOS y Android — los Founders las reciben primero.",
  },
  {
    q: "¿Qué hace diferente a Aviatory de AVI Examen Aviación?",
    a: "AVI es solo banco de preguntas. Aviatory es banco + ruta personalizada + inglés ICAO + requisitos por aerolínea + tutor IA + comunidad. Pensado para que llegues, no solo para que estudies.",
  },
]

export function FAQ() {
  return (
    <section className="py-24 sm:py-32">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <div className="text-center">
          <div className="inline-block text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            Preguntas frecuentes
          </div>
          <h2 className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight text-balance">
            Las dudas que probablemente tenés.
          </h2>
        </div>

        <Accordion type="single" collapsible className="mt-16 space-y-2">
          {faqs.map((f, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="rounded-2xl border border-border/60 bg-card px-6 data-[state=open]:shadow-md transition-shadow"
            >
              <AccordionTrigger className="text-left text-base font-semibold py-5 hover:no-underline">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
