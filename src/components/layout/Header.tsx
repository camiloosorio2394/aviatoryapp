import { useEffect, useState } from "react"
import { Link, NavLink } from "react-router-dom"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LogoIsotype } from "@/components/Logo"

const navLinks = [
  { to: "/", label: "Inicio" },
  { to: "/pricing", label: "Planes" },
  { to: "/contact", label: "Contacto" },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Lock scroll when mobile open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileOpen])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/75 backdrop-blur-2xl border-b border-border/40 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 h-24 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-3 transition-transform hover:scale-[1.02]"
          aria-label="Aviatory: inicio"
        >
          {/*
            Isotipo real de marca: el asset ya trae su propio squircle azul, su
            brillo y su borde, así que va solo (sin caja ni gradiente extra).
            El radio en px iguala el del SVG (22% de 44px) para que el redondeo
            de CSS no recorte la esquina azul.
          */}
          <LogoIsotype
            variant="color"
            alt=""
            className="h-11 w-11 flex-shrink-0 rounded-[10px] shadow-md"
          />
          <span className="text-2xl font-bold tracking-tight">Aviatory</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                `relative px-4 py-2 text-[16px] font-semibold tracking-tight rounded-full transition-all ${
                  isActive
                    ? "text-foreground bg-foreground/[0.06]"
                    : "text-muted-foreground hover:text-foreground hover:bg-foreground/[0.04]"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="rounded-full h-11 px-5 text-[16px] font-semibold"
          >
            <Link to="/login">Iniciar sesión</Link>
          </Button>
          <Button
            asChild
            size="sm"
            className="btn-apple rounded-full h-11 px-6 text-[16px] border-0 font-semibold"
          >
            <Link to="/login?mode=signup">Comenzar gratis</Link>
          </Button>
        </div>

        <button
          type="button"
          className="md:hidden p-2 -mr-2 text-foreground"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur-2xl">
          <div className="px-6 py-6 space-y-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `block py-3 text-lg font-semibold transition-colors ${
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <div className="pt-4 mt-2 border-t border-border/40 flex flex-col gap-2.5">
              <Button
                asChild
                variant="outline"
                size="lg"
                className="w-full rounded-full h-12 text-base"
              >
                <Link to="/login" onClick={() => setMobileOpen(false)}>
                  Iniciar sesión
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                className="btn-apple w-full rounded-full h-12 text-base border-0"
              >
                <Link to="/login?mode=signup" onClick={() => setMobileOpen(false)}>
                  Comenzar gratis
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
