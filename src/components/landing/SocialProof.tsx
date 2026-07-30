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
          <div className="mt-7 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
            <div className="flex w-max animate-marquee">
              {[0, 1].map((dup) => (
                <div key={dup} aria-hidden={dup === 1} className="flex items-center gap-x-14 pr-14">
                  {airlines.map((name) => (
                    <span
                      key={name}
                      className="text-xl sm:text-2xl font-bold tracking-tight text-muted-foreground/60 whitespace-nowrap hover:text-foreground transition-colors"
                    >
                      {name}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
