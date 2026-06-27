import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Reveal } from "@/components/Reveal"

const faqs = [
  {
    q: "¿Para qué pilotos es Aviatory?",
    a: "Para pilotos en formación PPL o CPL en Latinoamérica (principalmente Colombia, México, Perú, Chile, Argentina), y para pilotos con CPL que buscan llegar a una aerolínea. Si vuelas por hobby o ya eres capitán de aerolínea, esta no es tu app.",
  },
  {
    q: "¿El contenido es oficial de Aerocivil?",
    a: "Las preguntas siguen la estructura y los temas del examen ELITE-PCA de Aerocivil Colombia, escritas por instructores certificados. No es contenido copiado: es preparación, igual que Sporty's o King Schools para el FAA.",
  },
  {
    q: "¿Aviatory me consigue empleo en aerolínea?",
    a: "No. Aviatory te prepara para que cumplas los requisitos, presentes los exámenes, mejores tu inglés y armes tu hoja de vida. La aerolínea decide. Pero ningún piloto sin estos pasos llega — y la mayoría se traba justo aquí.",
  },
  {
    q: "¿Qué pasa después de los 7 días gratis?",
    a: "Si no haces upgrade, tu cuenta queda como Free (perfil, dashboard y 30 preguntas/mes). No te cobramos en automático sin avisarte, no necesitas tarjeta para empezar.",
  },
  {
    q: "¿Puedo cancelar cuando quiera?",
    a: "Sí, en un clic desde tu perfil. Mantienes acceso hasta el final del período que pagaste, sin cobros sorpresa.",
  },
  {
    q: "¿Aceptan tarjetas latinoamericanas?",
    a: "Sí. Wompi acepta tarjetas de crédito y débito de bancos colombianos, PSE y Nequi. Pronto sumamos Mercado Pago y Stripe para el resto de Latinoamérica.",
  },
  {
    q: "¿Hay app móvil?",
    a: "Aviatory funciona en cualquier navegador, móvil incluido. Estamos trabajando en apps nativas para iOS y Android — los Founders las reciben primero.",
  },
  {
    q: "¿Mis datos están seguros?",
    a: "Sí. Tu data se almacena cifrada en Supabase (proveedor con cumplimiento SOC 2). Nunca compartimos tu información personal con aerolíneas ni terceros. Puedes exportar o eliminar tu cuenta en cualquier momento.",
  },
]

export function FAQ() {
  return (
    <section className="py-20 sm:py-28 section-soft">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <div className="mb-10">
          <Reveal>
            <div className="text-[13px] font-semibold" style={{ color: "var(--av-blue-500)" }}>
              Preguntas frecuentes
            </div>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-[-0.03em] leading-[1.05]">
              Lo que probablemente te estás preguntando
            </h2>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <Accordion type="single" collapsible className="space-y-2.5">
            {faqs.map((f, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="rounded-2xl border border-border bg-card px-6"
              >
                <AccordionTrigger className="text-left text-[15px] font-semibold py-5 hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-[14px] text-muted-foreground leading-relaxed pb-5">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  )
}
