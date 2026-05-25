import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { ArrowRight, Award, BookOpen, Flame, PlayCircle, Plane, Shield, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TextReveal } from "@/components/TextReveal"
import { TiltCard } from "@/components/TiltCard"

export function Hero() {
  // Parallax: el mockup sube/baja un poco con el scroll
  const [scrollY, setScrollY] = useState(0)
  const reduceMotion = useRef(false)

  useEffect(() => {
    reduceMotion.current =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduceMotion.current) return
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => setScrollY(window.scrollY))
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const parallaxY = Math.min(scrollY * 0.15, 80)
  const parallaxRot = Math.min(scrollY * 0.02, 8)

  return (
    <section className="relative overflow-hidden pt-16 pb-24 sm:pt-24 sm:pb-36 mesh-hero noise">
      {/* Grid overlay sutil */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04] text-blue-900 dark:opacity-[0.06] dark:text-blue-300 pattern-grid"
      />
      {/* Bottom fade to background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-40 bg-gradient-to-b from-transparent to-background"
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 text-center">
        <div className="animate-spring-up">
          <Badge
            variant="secondary"
            className="mb-7 rounded-full px-4 py-1.5 text-xs font-medium tracking-wide bg-white/60 dark:bg-white/5 backdrop-blur-xl border-white/40 dark:border-white/10"
          >
            La plataforma más completa para pilotos en Latinoamérica
          </Badge>
        </div>

        {/* Headline con letter reveal + gradient animado */}
        <h1 className="text-5xl sm:text-7xl lg:text-[5.5rem] font-bold tracking-[-0.04em] text-balance leading-[0.98]">
          <TextReveal as="span" text="De estudiante" className="block" />
          <span className="block mt-1 animate-spring-up [animation-delay:500ms]">
            <span>a </span>
            <span className="text-gradient-gold">Piloto de Aerolínea</span>
            <span>.</span>
          </span>
        </h1>

        <p className="animate-spring-up [animation-delay:1100ms] mt-8 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto text-balance leading-relaxed font-medium">
          Prepara tus chequeos de Piloto Comercial de Avión, mejora tu nivel
          de inglés ICAO, preparate para tus entrevistas psicológicas y tus
          chequeos de simulador, y avanza paso a paso hasta obtener tu primer
          empleo en aerolínea.
        </p>

        <div className="animate-spring-up [animation-delay:1300ms] mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            asChild
            size="lg"
            className="btn-apple shine-on-hover glow-on-hover rounded-full text-base px-8 h-12 border-0 font-medium"
          >
            <Link to="/login?mode=signup">
              Comenzar 7 días gratis
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            className="btn-apple-ghost rounded-full text-base px-6 h-12 font-medium"
          >
            <a href="#como-funciona">
              <PlayCircle className="mr-2 h-5 w-5" />
              Ver cómo funciona
            </a>
          </Button>
        </div>

        <p className="animate-spring-up [animation-delay:1400ms] mt-6 text-sm text-muted-foreground flex items-center justify-center gap-2 flex-wrap font-medium">
          <span className="inline-flex items-center gap-1.5">
            <Shield className="h-3.5 w-3.5" />
            Sin tarjeta de crédito
          </span>
          <span className="text-border">·</span>
          <span>Cancela cuando quieras</span>
          <span className="text-border">·</span>
          <span>Datos cifrados</span>
        </p>

        {/* Dashboard mockup con parallax + tilt */}
        <div
          className="animate-spring-up [animation-delay:1500ms] mt-20 relative"
          style={{
            transform: reduceMotion.current
              ? undefined
              : `translate3d(0, ${parallaxY * 0.3}px, 0)`,
            transition: "transform 100ms linear",
          }}
        >
          <div className="relative mx-auto max-w-5xl">
            <TiltCard
              intensity={3}
              className="rounded-2xl bg-card overflow-hidden text-left ring-1 ring-black/5 dark:ring-white/10"
            >
              <div
                className="shadow-2xl shadow-blue-500/20"
                style={{
                  boxShadow:
                    "0 50px 100px -20px rgb(37 99 235 / 25%), 0 30px 60px -30px rgb(0 0 0 / 30%), 0 1px 0 0 rgb(255 255 255 / 50%) inset",
                }}
              >
                {/* Browser chrome */}
                <div className="bg-muted/40 px-4 py-2.5 border-b border-border/60 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-red-500/70" />
                    <div className="h-3 w-3 rounded-full bg-yellow-500/70" />
                    <div className="h-3 w-3 rounded-full bg-green-500/70" />
                  </div>
                  <div className="ml-4 text-xs text-muted-foreground font-mono tabular">
                    aviatory.app/app
                  </div>
                </div>

                <div className="bg-gradient-to-br from-background via-background to-blue-50/30 dark:to-blue-950/20 p-6 sm:p-8 space-y-6">
                  {/* Profile header row */}
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="h-11 w-11 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 text-white flex items-center justify-center font-bold text-base shadow-lg shadow-blue-500/30">
                        JM
                      </div>
                      <div>
                        <div className="text-base font-extrabold italic tracking-tight">
                          Hola, futuro Capitán ✈️
                        </div>
                        <div className="text-xs text-muted-foreground tabular">
                          Candidato a aerolínea · 200 horas · Bogotá
                        </div>
                      </div>
                    </div>
                    <div className="hidden sm:flex items-center gap-2">
                      <Badge variant="secondary" className="rounded-full text-xs tabular">
                        <Flame className="h-3 w-3 mr-1 text-orange-500" />
                        14 días
                      </Badge>
                      <Badge variant="secondary" className="rounded-full text-xs">
                        ICAO 3 → 4
                      </Badge>
                    </div>
                  </div>

                  {/* Big progress card */}
                  <div className="rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-50 via-blue-50/50 to-transparent dark:from-blue-950/40 dark:via-blue-950/20 p-5 sm:p-6 relative overflow-hidden">
                    <div
                      aria-hidden
                      className="pointer-events-none absolute -top-12 -right-12 h-40 w-40 rounded-full bg-blue-500/15 blur-2xl"
                    />
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          <Plane className="h-3.5 w-3.5" /> Tu progreso a Avianca
                        </div>
                        <div className="mt-1 flex items-baseline gap-2">
                          <span
                            className="text-5xl font-bold tracking-[-0.03em] tabular bg-gradient-to-br from-blue-600 to-blue-400 bg-clip-text text-transparent"
                            style={{ transform: `rotate(${parallaxRot * 0.05}deg)` }}
                          >
                            47%
                          </span>
                          <span className="inline-flex items-center text-xs text-green-600 dark:text-green-400 font-medium">
                            <TrendingUp className="h-3 w-3 mr-0.5" />
                            +12% este mes
                          </span>
                        </div>
                      </div>
                      <svg
                        viewBox="0 0 120 40"
                        className="h-12 w-32 text-blue-600 dark:text-blue-400 hidden sm:block"
                      >
                        <defs>
                          <linearGradient id="spark-hero" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0%" stopColor="currentColor" stopOpacity="0.4" />
                            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
                          </linearGradient>
                        </defs>
                        <path
                          d="M0 32 L15 30 L30 28 L45 26 L60 20 L75 18 L90 12 L105 10 L120 5 L120 40 L0 40 Z"
                          fill="url(#spark-hero)"
                        />
                        <path
                          d="M0 32 L15 30 L30 28 L45 26 L60 20 L75 18 L90 12 L105 10 L120 5"
                          stroke="currentColor"
                          strokeWidth="2"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div className="mt-4 h-2 rounded-full bg-blue-100 dark:bg-blue-950/60 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-600 shadow-[0_0_12px_rgb(37_99_235_/_40%)]"
                        style={{ width: "47%" }}
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-3 gap-3 sm:gap-4">
                    <MiniWidget
                      icon={<BookOpen className="h-4 w-4" />}
                      label="Próximo paso"
                      value="PBN"
                      sub="12 preguntas pendientes"
                    />
                    <MiniWidget
                      icon={<Award className="h-4 w-4" />}
                      label="Materias cursadas"
                      value="7 / 15"
                      sub="Meteorología · NOTAMS · Performance"
                    />
                    <MiniWidget
                      icon={<Plane className="h-4 w-4" />}
                      label="Tiempo de curso restante"
                      value="40h"
                      sub="para postular a aerolínea"
                    />
                  </div>
                </div>
              </div>
            </TiltCard>

            <div
              aria-hidden
              className="pointer-events-none absolute -inset-8 -z-10 rounded-[3rem] bg-gradient-to-tr from-blue-600/30 via-purple-500/10 to-cyan-400/20 blur-3xl"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

function MiniWidget({
  icon,
  label,
  value,
  sub,
}: {
  icon: React.ReactNode
  label: string
  value: string
  sub: string
}) {
  return (
    <div className="rounded-xl border border-border/60 bg-card/80 backdrop-blur-sm p-4 transition-all hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground uppercase tracking-wider">
        <span className="text-blue-600 dark:text-blue-400">{icon}</span>
        {label}
      </div>
      <div className="mt-1.5 text-xl font-bold tracking-[-0.02em] tabular">{value}</div>
      <div className="mt-0.5 text-xs text-muted-foreground truncate">{sub}</div>
    </div>
  )
}
