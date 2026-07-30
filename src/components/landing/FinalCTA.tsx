import { Link } from "react-router-dom"
import { ArrowRight, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LogoIsotype } from "@/components/Logo"
import { Reveal } from "@/components/Reveal"
import ctaPhoto from "@/assets/photos/cta-cockpit-dawn.jpg"

export function FinalCTA() {
  return (
    <section className="py-20 sm:py-28 bg-background">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl px-8 py-16 sm:px-16 sm:py-20 text-center">
            {/* Cabina al amanecer de fondo + velo azul oscuro para legibilidad */}
            <img
              src={ctaPhoto}
              alt=""
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
              style={{ objectPosition: "50% 30%" }}
            />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(135deg, rgb(11 16 32 / 84%) 0%, color-mix(in oklab, var(--av-blue-500) 40%, rgb(11 16 32 / 82%)) 100%)",
              }}
            />
            <div className="relative">
              <LogoIsotype variant="color" className="h-14 w-14 mx-auto rounded-2xl" />

              <h2 className="mt-7 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-[-0.03em] text-white leading-[1.05] text-balance">
                Tu próximo vuelo empieza con un clic
              </h2>
              <p className="mt-4 text-[16px] sm:text-lg text-blue-100 max-w-xl mx-auto text-balance leading-relaxed">
                Súmate a los pilotos que dejaron de estudiar en círculos y empezaron a avanzar con
                rumbo claro.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Button
                  asChild
                  size="lg"
                  className="rounded-xl text-[15px] px-7 h-12 bg-white text-blue-700 hover:bg-white/90 border-0 font-semibold"
                >
                  <Link to="/login?mode=signup">
                    Comenzar mi prueba gratis
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  className="rounded-xl text-[15px] px-6 h-12 bg-white/10 text-white hover:bg-white/20 border border-white/25 font-semibold"
                >
                  <Link to="/pricing">Ver planes</Link>
                </Button>
              </div>

              <p className="mt-6 text-[13px] text-blue-100/80 flex items-center justify-center gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1.5">
                  <Shield className="h-3.5 w-3.5" />
                  Sin tarjeta
                </span>
                <span className="text-blue-200/40">·</span>
                <span>7 días gratis</span>
                <span className="text-blue-200/40">·</span>
                <span>Cancelas cuando quieras</span>
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
