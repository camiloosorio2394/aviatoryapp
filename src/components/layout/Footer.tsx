import { Link } from "react-router-dom"
import { LogoHorizontal } from "@/components/Logo"

const cols = [
  {
    title: "Producto",
    links: [
      { to: "/", label: "Cómo funciona" },
      { to: "/pricing", label: "Planes y precios" },
      { to: "/login?mode=signup", label: "Empezar gratis" },
    ],
  },
  {
    title: "Recursos",
    links: [
      { to: "/contact", label: "Contacto" },
      { to: "/", label: "Preguntas frecuentes" },
      { to: "/", label: "Comunidad" },
    ],
  },
  {
    title: "Legal",
    links: [
      { to: "/terminos", label: "Términos y condiciones" },
      { to: "/privacidad", label: "Política de privacidad" },
      { to: "/privacidad", label: "Política de cookies" },
    ],
  },
]

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          <div className="col-span-2 md:col-span-1 space-y-4">
            <LogoHorizontal className="h-7 w-auto" />
            <p className="text-sm text-muted-foreground max-w-xs">
              De estudiante piloto a candidato de aerolínea. Tu copiloto digital.
            </p>
          </div>
          {cols.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold text-foreground mb-4">{col.title}</h3>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Aviatory. Todos los derechos reservados.
          </p>
          <p className="text-xs text-muted-foreground">
            Hecho en Colombia para pilotos LATAM
          </p>
        </div>
      </div>
    </footer>
  )
}
