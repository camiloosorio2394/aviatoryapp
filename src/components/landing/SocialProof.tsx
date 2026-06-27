import { Reveal } from "@/components/Reveal"

const airlines = ["Avianca", "LATAM", "Copa", "Wingo", "JetSmart", "SATENA"]

export function SocialProof() {
  return (
    <section className="relative py-12 sm:py-16 border-y border-border bg-card">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <Reveal>
          <p className="text-center text-[13px] font-medium text-muted-foreground">
            Pilotos preparándose para postular a aerolíneas de Latinoamérica
          </p>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-10 sm:gap-x-14 gap-y-4">
            {airlines.map((name) => (
              <span
                key={name}
                className="text-xl sm:text-2xl font-bold tracking-tight text-muted-foreground/60 hover:text-foreground transition-colors"
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
