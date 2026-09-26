import { describe, expect, it } from "vitest"
import { textoDeEstado } from "@/components/dashboard/portada"
import { estadoDeDocumento, grupoDeDocumento, nombreDeDocumento } from "@/lib/licencias"

describe("portada del panel", () => {
  it("el estado de un documento sale de los días que le quedan", () => {
    expect(estadoDeDocumento(null)).toBe("sin-fecha")
    expect(estadoDeDocumento(-1)).toBe("vencido")
    expect(estadoDeDocumento(0)).toBe("por-vencer")
    expect(estadoDeDocumento(90)).toBe("por-vencer")
    expect(estadoDeDocumento(91)).toBe("vigente")
    expect(textoDeEstado("por-vencer", 42)).toBe("Vence en 42 días")
    expect(textoDeEstado("por-vencer", 1)).toBe("Vence en 1 día")
    expect(textoDeEstado("por-vencer", 0)).toBe("Vence hoy")
  })

  it("cada documento cae en su grupo y con su nombre", () => {
    expect(grupoDeDocumento("medical_class_1")).toBe("medico")
    expect(grupoDeDocumento("cpl")).toBe("licencia")
    expect(grupoDeDocumento("ifr")).toBe("otros")
    expect(nombreDeDocumento({ license_type: "medical_class_1", custom_name: null })).toBe("Médico clase 1")
    expect(nombreDeDocumento({ license_type: "other", custom_name: "Curso CRM" })).toBe("Curso CRM")
  })
})
