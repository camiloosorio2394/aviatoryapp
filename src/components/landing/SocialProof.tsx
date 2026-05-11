import { Reveal } from "@/components/Reveal"

const airlines = ["Avianca", "LATAM", "Copa", "Wingo", "JetSmart", "SATENA"]

export function SocialProof() {
  return (
    <section className="py-12 sm:py-16 border-y border-border/40 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <Reveal>
          <p className="text-center text-xs sm:text-sm font-medium text-muted-foreground uppercase tracking-[0.18em]">
            Pilotos preparándose para postular a aerolíneas de Latinoamérica
          </p>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-10 sm:gap-x-14 gap-y-4">
            {airlines.map((name, i) => (
              <span
                key={name}
                style={{ transitionDelay: `${i * 60}ms` }}
                className="text-xl sm:text-2xl font-semibold tracking-tight text-muted-foreground/70 hover:text-foreground transition-colors"
              >
                {name}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
